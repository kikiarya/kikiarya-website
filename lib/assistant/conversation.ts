import type { AssistantResponse, PreviousTurn } from "./types";
export type ConversationTurn = { id: string; question: string; response?: AssistantResponse; error?: string };

export function readConversation(raw: string | null): ConversationTurn[] {
  try {
    const parsed: unknown = JSON.parse(raw ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(-20).flatMap(value => {
      if (!value || typeof value.id !== "string" || typeof value.question !== "string") return [];
      const turn: ConversationTurn = { id: value.id.slice(0, 100), question: Array.from(value.question as string).slice(0, 300).join("") };
      if (value.response && typeof value.response.answer === "string" && ["ai", "local"].includes(value.response.mode) && Array.isArray(value.response.sources)) {
        const sources = value.response.sources.filter(source => source && typeof source.id === "string" && typeof source.title === "string" && typeof source.href === "string" && (/^\/(?!\/)/.test(source.href) || /^https?:\/\//.test(source.href))).slice(0, 4);
        turn.response = { answer: value.response.answer.slice(0, 12000), mode: value.response.mode, sources, knowledgeVersion: value.response.knowledgeVersion };
      } else turn.error = typeof value.error === "string" ? value.error.slice(0, 300) : "上次回答被中断，可以重试。";
      return [turn];
    });
  } catch { return []; }
}

export function conversationHistory(turns: ConversationTurn[]): PreviousTurn[] {
  const completed = turns.filter(turn => turn.response);
  const version = completed.at(-1)?.response?.knowledgeVersion;
  return completed.filter(turn => turn.response!.knowledgeVersion === version).slice(-3).map(turn => ({
    question: turn.question, answer: turn.response!.answer.slice(0, 1200), sourceIds: turn.response!.sources.map(source => source.id).slice(0, 4),
  }));
}
