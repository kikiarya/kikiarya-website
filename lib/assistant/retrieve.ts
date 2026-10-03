import { knowledgeChunks } from "./knowledge";
import type { PreviousTurn, RetrievedChunk } from "./types";


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
  const han = normalize(question).match(/[\u4e00-\u9fff]+/g) ?? [];
  const chinesePairs = [...new Set(han.flatMap(word => Array.from({ length: Math.max(0, word.length - 1) }, (_, i) => word.slice(i, i + 2))))];

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

      score += Math.min(6, chinesePairs.filter(pair => title.includes(pair) || content.includes(pair)).length);
      return { ...chunk, score };
    })
    .filter((chunk) => chunk.score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(2, Math.min(limit, 4)));
}


// Context only selects public sources. Client-supplied answers are never evidence.

export function retrieveConversation(question: string, history: PreviousTurn[] = []) {

  const direct = retrieveKnowledge(question);

  const normalized = normalize(question);

  const projects = knowledgeChunks.filter(chunk => chunk.id.startsWith("project:"));

  const mentionedProjects = projects.filter(chunk =>

    [chunk.title, chunk.id.slice(8).replace(/-/g, " "), ...chunk.keywords.filter(word => /lar|openclaw|coding agent|career copilot|hsc|pixverse/i.test(word))]

      .some(alias => alias.length >= 3 && normalized.includes(normalize(alias)))

  );

  const followup = /这个|它|该项目|刚才|上面|继续|再说|详细|具体|为什么|怎么实现|怎么做|难点|更多|^(那|然后)|\b(it|this|that|more|detail|why|how)\b/i.test(question);

  if (mentionedProjects.length) {
    const focus = /怎么|如何|原理|机制|架构|恢复|失败|\b(how|mechanism|recovery)\b/i.test(question) ? "mechanism"
      : /背景|为什么|解决什么|\b(why|background)\b/i.test(question) ? "context"
      : /效果|结果|验证|测试|\b(results|evaluation)\b/i.test(question) ? "results" : undefined;
    if (focus) {
      const focused = knowledgeChunks.filter(chunk => mentionedProjects.some(project => chunk.id === `project-detail:${project.id.slice(8)}:${focus}`));
      if (focused.length) return { chunks: focused.map(chunk => ({ ...chunk, score: 10 })), needsClarification: false };
    }
    const selected = direct.filter(chunk => mentionedProjects.some(project => chunk.href === project.href || (/(github|源码|仓库|repo)/i.test(question) && chunk.id === `repository:${project.id.slice(8)}`)));
    return { chunks: selected.length ? selected : direct, needsClarification: false };
  }
  if (!followup) return { chunks: direct, needsClarification: false };

  const previous = [...history].reverse().find(turn => turn.sourceIds.some(id => knowledgeChunks.some(chunk => chunk.id === id && chunk.kind !== "navigation")));

  if (!previous) return { chunks: /这个|它|该项目|\b(it|this|that)\b/i.test(question) ? [] : direct, needsClarification: /这个|它|该项目|\b(it|this|that)\b/i.test(question) || direct.length === 0 };

  const sources = knowledgeChunks.filter(chunk => previous.sourceIds.includes(chunk.id) && chunk.kind !== "navigation");

  const topics = new Set(sources.filter(chunk => chunk.kind === "project" || chunk.kind === "article")

    .map(chunk => chunk.id.startsWith("article:") ? chunk.id.split(":").slice(0, 2).join(":") : `project:${chunk.id.split(":")[1]}`));

  if (topics.size > 1 && /这个|它|该项目|\b(it|this|that)\b/i.test(question)) return { chunks: [], needsClarification: true };

  const scoped = knowledgeChunks.filter(chunk => sources.some(source => source.id.startsWith("article:")

    ? chunk.id.startsWith(source.id.split(":").slice(0, 2).join(":") + ":") : chunk.href === source.href || (source.id.startsWith("repository:") && chunk.id.split(":")[1] === source.id.split(":")[1])));

  const scopedScores = scoped.map(chunk => ({ ...chunk, score: chunk.keywords.reduce((score, keyword) => score + (normalized.includes(normalize(keyword)) ? 4 : 0), 0) }));
  const detailed = scopedScores.filter(chunk => chunk.id.startsWith("project-detail:") && chunk.score >= 4).sort((a, b) => b.score - a.score);
  if (detailed.length) return { chunks: detailed.slice(0, 1), needsClarification: false };
  const ranked = direct.filter(chunk => scoped.some(source => source.id === chunk.id));

  return { chunks: (ranked.length ? ranked : sources.map(chunk => ({ ...chunk, score: 4 }))).slice(0, 4), needsClarification: false };

}

