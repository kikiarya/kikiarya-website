import type { AssistantResponse, PreviousTurn, RetrievedChunk } from "./types";

function isChinese(value: string) {
  return /[\u4e00-\u9fff]/.test(value);
}

function uniqueSources(chunks: RetrievedChunk[]) {
  return [...new Map(chunks.map(chunk => [chunk.href, chunk])).values()].slice(0, 3).map(({ id, title, href, kind }) => ({ id, title, href, kind }));
}

export function buildLocalAnswer(
  question: string,
  chunks: RetrievedChunk[],
  previousTurn?: PreviousTurn
): AssistantResponse {
  const zh = isChinese(question);

  if (!chunks.length) {
    return {
      mode: "local",
      answer: zh
        ? "这个问题不在本站公开内容的范围内，因此我不会调用模型猜测。你可以继续问项目原理、技术方向、实习经历或公开依据。"
        : "That is outside this public portfolio, so I will not call a model to guess. Ask me about a project, technical direction, experience, or the evidence shown on this site.",
      sources: [
        { id: "navigation:work", title: zh ? "查看全部项目" : "View all work", href: "/work", kind: "navigation" },
        { id: "navigation:resume", title: zh ? "查看简历" : "View resume", href: "/resume", kind: "navigation" },
        { id: "navigation:contact", title: zh ? "联系 Kikiarya" : "Contact Kikiarya", href: "/contact", kind: "navigation" },
      ],
    };
  }

  const normalized = question.toLocaleLowerCase();
  const comparison = /区别|比较|不同|difference|compare|\bvs\.?\b|versus/.test(normalized);
  const selected = comparison ? chunks.slice(0, 2) : chunks.slice(0, 3);
  const summaries = selected.map((chunk) => (zh ? chunk.answerSummaryZh : chunk.answerSummary));

  let answer: string;
  if (comparison && selected.length > 1) {
    answer = zh
      ? `${selected[0].title}：${summaries[0]}\n\n${selected[1].title}：${summaries[1]}\n\n二者解决的是不同层面的问题。你可以打开下方项目，继续查看各自的实现原理与证据。`
      : `${selected[0].title}: ${summaries[0]}\n\n${selected[1].title}: ${summaries[1]}\n\nThey operate at different layers of the problem. Open the sources below for the mechanism and evidence behind each one.`;
  } else if (selected.length === 1) {
    const facts = selected[0].facts.slice(0, 2).map((fact) => `${fact.label}: ${fact.value}`).join(" · ");
    answer = facts ? `${summaries[0]}\n\n${facts}` : summaries[0];
  } else {
    answer = zh
      ? `找到这些相关资料：\n\n${selected.map((chunk, index) => `${index + 1}. ${chunk.title}：${zh ? chunk.answerSummaryZh : chunk.answerSummary}`).join("\n\n")}`
      : `The most relevant sources are:\n\n${selected.map((chunk, index) => `${index + 1}. ${chunk.title}: ${chunk.answerSummary}`).join("\n\n")}`;
  }

  return { mode: "local", answer, sources: uniqueSources(selected) };
}
