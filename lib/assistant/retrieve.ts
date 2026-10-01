import { knowledgeChunks } from "./knowledge";
import type { RetrievedChunk } from "./types";

function normalize(value: string) {
  return value
    .toLocaleLowerCase()
    .normalize("NFKC")
    .replace(/[^a-z0-9+#.\-\u4e00-\u9fff\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function englishTokens(value: string) {
  return normalize(value)
    .split(" ")
    .filter((token) => token.length >= 2 && !["what", "which", "about", "does", "with", "the", "and"].includes(token));
}

export function retrieveKnowledge(question: string, limit = 4): RetrievedChunk[] {
  const normalizedQuestion = normalize(question);
  const tokens = englishTokens(question);

  return knowledgeChunks
    .map((chunk) => {
      const title = normalize(chunk.title);
      const content = normalize(chunk.content);
      let score = 0;

      for (const keyword of chunk.keywords) {
        const normalizedKeyword = normalize(keyword);
        if (normalizedKeyword && normalizedQuestion.includes(normalizedKeyword)) {
          score += normalizedKeyword.includes(" ") || normalizedKeyword.length > 5 ? 7 : 4;
        }
      }

      for (const token of tokens) {
        if (title.includes(token)) score += 3;
        else if (content.includes(token)) score += 1;
      }

      return { ...chunk, score };
    })
    .filter((chunk) => chunk.score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(2, Math.min(limit, 4)));
}

