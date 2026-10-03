import type { Note } from "../notes";
import type { KnowledgeChunk } from "./types";

export function buildArticleKnowledge(posts: Note[], version: string): KnowledgeChunk[] {
  return posts.filter(note => note.allowAssistant === true).flatMap(note => note.sections.map((section, index) => ({
    id: `article:${note.slug}:${index}`, title: `${note.titleZh || note.title} · ${section.heading}`,
    href: `${note.kind === "reading" ? "/bookshelf" : "/notes"}/${note.slug}#section-${index + 1}`, kind: "article" as const,
    answerSummary: section.paragraphs.join("\n\n"), answerSummaryZh: section.paragraphs.join("\n\n"),
    facts: [{ label: "文章", value: note.titleZh || note.title }, { label: "更新", value: note.updatedAt ?? note.date }],
    content: [note.title, note.titleZh, section.heading, ...section.paragraphs, ...note.tags].join(" "),
    keywords: [note.title, note.titleZh, section.heading, ...note.tags].filter(Boolean), version,
  })));
}
