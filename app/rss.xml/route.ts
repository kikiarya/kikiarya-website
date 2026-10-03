import { publishedContent, contentHref } from "../../lib/notes";
const escape = (text: string) => text.replace(/[<>&"']/g, char => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" }[char]!));
export function GET(request: Request) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  const url = (path: string) => escape(new URL(path, base).href);
  const items = publishedContent.map(note => `<item><title>${escape(note.titleZh || note.title)}</title><link>${url(contentHref(note))}</link><guid isPermaLink="true">${url(contentHref(note))}</guid><description>${escape(note.excerpt)}</description><pubDate>${new Date(note.date).toUTCString()}</pubDate>${note.tags.map(tag => `<category>${escape(tag)}</category>`).join("")}</item>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Kikiarya · 博客与阅读札记</title><link>${url("/notes")}</link><description>项目记录、阅读札记与随想</description>${items}</channel></rss>`, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
