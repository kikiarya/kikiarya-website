import "server-only";

import { generateText } from "ai";
import type { AssistantResponse, PreviousTurn, RetrievedChunk } from "./types";

export function isModelConfigured() {
  return Boolean(process.env.AI_GATEWAY_API_KEY && process.env.AI_MODEL);
}

export async function enhanceAnswer(
  question: string,
  local: AssistantResponse,
  chunks: RetrievedChunk[],
  history: PreviousTurn[] = []
): Promise<AssistantResponse> {
  if (!isModelConfigured()) return local;

  const allowedFacts = chunks.map((chunk) => ({
    id: chunk.id,
    title: chunk.title,
    summary: chunk.answerSummary,
    summaryZh: chunk.answerSummaryZh,
    facts: chunk.facts,
  }));

  const { text } = await generateText({
    model: process.env.AI_MODEL!,
    instructions:
      "You are the concise guide for Kikiarya's public portfolio. Answer only from ALLOWED_FACTS. Do not add claims, metrics, links, employers, dates, or capabilities that are absent. Match the user's main language. Use natural, conversational Chinese for Chinese questions. Do not infer facts from the previous turn; it is only conversational context. Return 2-4 short paragraphs, without a Sources section. If evidence is insufficient, preserve the local refusal.",
    prompt: JSON.stringify({
      question,
      history: history.map(turn => ({ question: turn.question, answer: turn.answer.slice(0, 800) })),
      localDraft: local.answer,
      allowedFacts,
    }),
    maxOutputTokens: 250,
    temperature: 0.2,
    maxRetries: 0,
    timeout: 8_000,
  });

  const answer = text.trim();
  if (!answer) return local;
  return { ...local, answer, mode: "ai" };
}

