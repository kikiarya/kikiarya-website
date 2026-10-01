import type { AssistantResponse, PreviousTurn, RetrievedChunk } from "./types";

function isChinese(value: string) {
  return /[\u4e00-\u9fff]/.test(value);
}

function uniqueSources(chunks: RetrievedChunk[]) {
  return chunks.slice(0, 3).map(({ id, title, href, kind }) => ({ id, title, href, kind }));
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
        ? "这个问题超出了本站公开作品集的范围，所以我不会调用模型猜答案。你可以问我项目机制、技术方向、实习经历或对应的公开证据。"
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
      ? `${selected[0].title}：${summaries[0]}\n\n${selected[1].title}：${summaries[1]}\n\n它们的主要区别在于解决问题的层次不同；可以打开下面的项目来源查看机制与证据。`
      : `${selected[0].title}: ${summaries[0]}\n\n${selected[1].title}: ${summaries[1]}\n\nThey operate at different layers of the problem. Open the sources below for the mechanism and evidence behind each one.`;
  } else if (selected.length === 1) {
    const facts = selected[0].facts.slice(0, 2).map((fact) => `${fact.label}: ${fact.value}`).join(" · ");
    answer = `${summaries[0]}\n\n${facts}`;
  } else {
    answer = zh
      ? `与这个问题最相关的是：\n\n${selected.map((chunk, index) => `${index + 1}. ${chunk.title}：${zh ? chunk.answerSummaryZh : chunk.answerSummary}`).join("\n\n")}`
      : `The most relevant work is:\n\n${selected.map((chunk, index) => `${index + 1}. ${chunk.title}: ${chunk.answerSummary}`).join("\n\n")}`;
  }

  if (previousTurn && /继续|更多|more|detail|why|怎么/.test(normalized)) {
    answer += zh
      ? "\n\n这是基于上一轮主题继续检索的结果；上下文只保留最近一轮。"
      : "\n\nThis continues the previous topic; only the latest turn is retained.";
  }

  return { mode: "local", answer, sources: uniqueSources(selected) };
}

