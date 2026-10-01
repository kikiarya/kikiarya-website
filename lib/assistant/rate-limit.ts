import "server-only";

import { createHash, createHmac } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { AssistantResponse } from "./types";

type Bucket = { minute: number[]; day: number[] };

const localVisitors = new Map<string, Bucket>();
const localCache = new Map<string, { expiresAt: number; value: AssistantResponse }>();
const localUsage = new Map<string, number>();

let redis: Redis | null | undefined;
let minuteLimiter: Ratelimit | null;
let dayLimiter: Ratelimit | null;

export function isRedisConfigured() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

function getRedis() {
  if (redis !== undefined) return redis;
  if (!isRedisConfigured()) {
    redis = null;
    return redis;
  }
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
  return redis;
}

function getLimiters() {
  const client = getRedis();
  if (!client) return null;
  minuteLimiter ??= new Ratelimit({
    redis: client,
    limiter: Ratelimit.slidingWindow(2, "1 m"),
    prefix: "portfolio-assistant:minute",
  });
  dayLimiter ??= new Ratelimit({
    redis: client,
    limiter: Ratelimit.fixedWindow(10, "1 d"),
    prefix: "portfolio-assistant:day",
  });
  return { minuteLimiter, dayLimiter };
}

export function visitorId(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip") || "local";
  const session = request.headers.get("x-portfolio-session") || "anonymous";
  const value = `${ip}:${session}`;
  const secret = process.env.ASSISTANT_HASH_SECRET;
  return secret
    ? createHmac("sha256", secret).update(value).digest("hex")
    : createHash("sha256").update(value).digest("hex");
}

export async function checkVisitorLimit(identifier: string) {
  const limiters = getLimiters();
  if (limiters) {
    const minute = await limiters.minuteLimiter.limit(identifier);
    if (!minute.success) return { ok: false, retryAfter: minute.reset, remaining: { minute: 0 } };
    const day = await limiters.dayLimiter.limit(identifier);
    if (!day.success) return { ok: false, retryAfter: day.reset, remaining: { minute: minute.remaining, day: 0 } };
    return { ok: true, remaining: { minute: minute.remaining, day: day.remaining } };
  }

  const now = Date.now();
  const bucket = localVisitors.get(identifier) ?? { minute: [], day: [] };
  bucket.minute = bucket.minute.filter((timestamp) => now - timestamp < 60_000);
  bucket.day = bucket.day.filter((timestamp) => now - timestamp < 86_400_000);
  if (bucket.minute.length >= 2 || bucket.day.length >= 10) {
    localVisitors.set(identifier, bucket);
    return {
      ok: false,
      retryAfter: bucket.minute.length >= 2 ? bucket.minute[0] + 60_000 : bucket.day[0] + 86_400_000,
      remaining: { minute: Math.max(0, 2 - bucket.minute.length), day: Math.max(0, 10 - bucket.day.length) },
    };
  }
  bucket.minute.push(now);
  bucket.day.push(now);
  localVisitors.set(identifier, bucket);
  return { ok: true, remaining: { minute: 2 - bucket.minute.length, day: 10 - bucket.day.length } };
}

export function cacheKey(normalizedQuestion: string, version: string, previousSourceIds: string[]) {
  return createHash("sha256")
    .update(`${version}:${normalizedQuestion}:${previousSourceIds.join(",")}`)
    .digest("hex");
}

export async function getCachedAnswer(key: string) {
  const client = getRedis();
  if (client) return client.get<AssistantResponse>(`portfolio-assistant:cache:${key}`);
  const cached = localCache.get(key);
  if (!cached || cached.expiresAt < Date.now()) {
    localCache.delete(key);
    return null;
  }
  return cached.value;
}

export async function setCachedAnswer(key: string, value: AssistantResponse, seconds = 604_800) {
  const client = getRedis();
  if (client) {
    await client.set(`portfolio-assistant:cache:${key}`, value, { ex: seconds });
    return;
  }
  localCache.set(key, { value, expiresAt: Date.now() + seconds * 1000 });
}

function secondsUntilUtcDayEnds() {
  const now = new Date();
  const end = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
  return Math.max(60, Math.ceil((end - now.getTime()) / 1000));
}

function secondsUntilUtcMonthEnds() {
  const now = new Date();
  const end = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1);
  return Math.max(60, Math.ceil((end - now.getTime()) / 1000));
}

export async function claimModelBudget() {
  const client = getRedis();
  if (!client) return { allowed: false, remaining: 0 };

  const now = new Date();
  const dayKey = `portfolio-assistant:usage:day:${now.toISOString().slice(0, 10)}`;
  const monthKey = `portfolio-assistant:usage:month:${now.toISOString().slice(0, 7)}`;
  const dayLimit = Number(process.env.ASSISTANT_DAILY_GLOBAL_LIMIT ?? 100);
  const monthLimit = Number(process.env.ASSISTANT_MONTHLY_LIMIT ?? 2500);

  const [dayCount, monthCount] = await Promise.all([client.incr(dayKey), client.incr(monthKey)]);
  if (dayCount === 1) await client.expire(dayKey, secondsUntilUtcDayEnds());
  if (monthCount === 1) await client.expire(monthKey, secondsUntilUtcMonthEnds());

  const allowed = dayCount <= dayLimit && monthCount <= monthLimit;
  return { allowed, remaining: Math.max(0, dayLimit - dayCount) };
}

export function normalizeQuestion(question: string) {
  return question.toLocaleLowerCase().normalize("NFKC").replace(/\s+/g, " ").trim();
}

