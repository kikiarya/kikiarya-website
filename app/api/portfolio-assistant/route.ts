import { NextResponse } from "next/server";
import { buildLocalAnswer } from "../../../lib/assistant/local-answer";
import { enhanceAnswer, isModelConfigured } from "../../../lib/assistant/model";
import {
  cacheKey,
  checkVisitorLimit,
  claimModelBudget,
  getCachedAnswer,
  isRedisConfigured,
  normalizeQuestion,
  setCachedAnswer,
  visitorId,
} from "../../../lib/assistant/rate-limit";
import { knowledgeVersion } from "../../../lib/assistant/knowledge";
import { retrieveKnowledge } from "../../../lib/assistant/retrieve";
import type { AssistantRequest, PreviousTurn } from "../../../lib/assistant/types";

export const runtime = "nodejs";

function isPreviousTurn(value: unknown): value is PreviousTurn {
  if (!value || typeof value !== "object") return false;
  const turn = value as Record<string, unknown>;
  return (
    typeof turn.question === "string" &&
    typeof turn.answer === "string" &&
    Array.isArray(turn.sourceIds) &&
    turn.sourceIds.every((id) => typeof id === "string")
  );
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Origin not allowed." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Expected JSON." }, { status: 415 });
  }

  let body: AssistantRequest;
  try {
    body = (await request.json()) as AssistantRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const question = typeof body.question === "string" ? body.question.trim() : "";
  if (!question || question.length > 300) {
    return NextResponse.json({ error: "Question must contain 1–300 characters." }, { status: 400 });
  }
  const previousTurn = isPreviousTurn(body.previousTurn)
    ? {
        question: body.previousTurn.question.slice(0, 300),
        answer: body.previousTurn.answer.slice(0, 1_200),
        sourceIds: body.previousTurn.sourceIds.slice(0, 4),
      }
    : undefined;

  const limit = await checkVisitorLimit(visitorId(request));
  if (!limit.ok) {
    return NextResponse.json(
      {
        error: "Rate limit reached.",
        retryAfter: limit.retryAfter,
        remaining: limit.remaining,
      },
      { status: 429 }
    );
  }

  const chunks = retrieveKnowledge(question);
  const local = buildLocalAnswer(question, chunks, previousTurn);
  const key = cacheKey(
    normalizeQuestion(question),
    knowledgeVersion,
    previousTurn?.sourceIds ?? []
  );
  const cached = await getCachedAnswer(key);
  if (cached) return NextResponse.json({ ...cached, remaining: limit.remaining });

  let response = local;
  let globalRemaining: number | undefined;
  if (chunks.length && isModelConfigured() && isRedisConfigured()) {
    try {
      const budget = await claimModelBudget();
      globalRemaining = budget.remaining;
      if (budget.allowed) response = await enhanceAnswer(question, local, chunks, previousTurn);
    } catch {
      response = local;
    }
  }

  const result = {
    ...response,
    remaining: { ...limit.remaining, global: globalRemaining },
  };
  await setCachedAnswer(key, result, previousTurn ? 3_600 : 604_800);
  return NextResponse.json(result);
}

