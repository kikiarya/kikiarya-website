import { NextResponse } from "next/server";
import { buildLocalAnswer } from "../../../lib/assistant/local-answer";
import { enhanceAnswer, isModelConfigured } from "../../../lib/assistant/model";
import {
  cacheKey,
  checkVisitorLimit,
  claimModelBudget,
  getCachedAnswer,
  isRedisAvailable,
  normalizeQuestion,
  setCachedAnswer,
  visitorId,
} from "../../../lib/assistant/rate-limit";
import { knowledgeVersion } from "../../../lib/assistant/knowledge";
import { retrieveConversation } from "../../../lib/assistant/retrieve";
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

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Expected a JSON object." }, { status: 400 });
  }
  const question = typeof body.question === "string" ? body.question.trim() : "";
  if (!question || Array.from(question).length > 300) {
    return NextResponse.json({ error: "Question must contain 1–300 characters." }, { status: 400 });
  }
  const submitted = Array.isArray(body.history) ? body.history.slice(-3) : body.previousTurn ? [body.previousTurn] : [];
  const history = submitted.filter(isPreviousTurn).map(turn => ({
    question: turn.question.slice(0, 300), answer: turn.answer.slice(0, 1200),
    sourceIds: turn.sourceIds.slice(0, 4).map(id => id.slice(0, 200)),
  }));

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

  const { chunks, needsClarification } = retrieveConversation(question, history);
  const local = needsClarification ? {
    mode: "local" as const, answer: "你想继续了解哪个项目或哪篇文章？告诉我名称，我就沿着它继续查找。", sources: [],
  } : buildLocalAnswer(question, chunks);
  const key = cacheKey(
    `${normalizeQuestion(question)}:${JSON.stringify(history)}:${isModelConfigured() && isRedisAvailable() ? "ai" : "local"}`,
    knowledgeVersion,
    []
  );
  const cached = await getCachedAnswer(key);
  if (cached) return NextResponse.json({ ...cached, remaining: limit.remaining });

  let response = local;
  let globalRemaining: number | undefined;
  if (chunks.length && isModelConfigured() && isRedisAvailable()) {
    try {
      const budget = await claimModelBudget();
      globalRemaining = budget.remaining;
      if (budget.allowed) response = await enhanceAnswer(question, local, chunks.filter(chunk => local.sources.some(source => source.id === chunk.id)), history);
    } catch {
      response = local;
    }
  }

  const result = {
    ...response,
    knowledgeVersion,
    remaining: { ...limit.remaining, global: globalRemaining },
  };
  await setCachedAnswer(key, result, history.length ? 3_600 : 604_800);
  return NextResponse.json(result);
}
