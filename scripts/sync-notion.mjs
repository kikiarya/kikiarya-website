import { readFile, writeFile, rename, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { convertBlocks, toSections } from "./notion-blocks.mjs";
import { materializeImages } from "./notion-media.mjs";
import { createNotionApi } from "./notion-api.mjs";

const text = (parts = []) => parts.map(p => p.plain_text ?? p.text?.content ?? "").join("");
const value = (p) => p?.type === "title" ? text(p.title) : p?.type === "rich_text" ? text(p.rich_text) : p?.type === "select" ? p.select?.name : p?.type === "status" ? p.status?.name : p?.type === "url" ? p.url : "";
export function extractProjectLabels(source) {
  return new Map([...source.matchAll(/"?slug"?:\s*"([^"]+)"[\s\S]*?"?title"?:\s*"([^"]+)"/g)].map(m => [m[1], m[2]]));
}
export function safeUrl(url) {
  if (!url) return undefined;
  const parsed = new URL(url);
  if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Source URL must use http or https");
  return parsed.href;
}

export function convertPage(page, blocks, projectLabels = new Map()) {
  const p = page.properties;
  if (page.archived || page.in_trash || value(p.Status) !== "已发布") return null;
  const title = value(p.Title)?.trim();
  const slug = value(p.Slug)?.trim();
  const kind = value(p.Kind);
  const date = p.Published?.date?.start?.slice(0, 10);
  if (!title || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug ?? "")) throw new Error("Published content needs Title and a lowercase Slug");
  if (!["博客", "阅读札记"].includes(kind)) throw new Error(`Unknown Kind: ${kind}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date ?? "") || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0,10) !== date) throw new Error("Published date is required");
  if (p.AllowAssistant?.type !== "checkbox") throw new Error("AllowAssistant checkbox is required");
  const sections = toSections(convertBlocks(blocks));
  if (!sections.some(s => s.paragraphs.some(p => p.trim()) || s.blocks.some(b => b.type === "image"))) throw new Error("Published content must not be empty");
  const project = value(p.Project)?.trim();
  if (project && !projectLabels.has(project)) throw new Error(`Unknown project slug: ${project}`);
  const sourceTitle = value(p.SourceTitle)?.trim();
  if (kind === "阅读札记") {
    for (const section of sections) {
      if (section.heading === "原文摘抄") section.role = "excerpt";
      if (section.heading === "我的感想") section.role = "reflection";
    }
    if (sections.some(s => s.role === "excerpt") && !sourceTitle) throw new Error("原文摘抄 requires SourceTitle");
  }
  const sourceUrl = safeUrl(value(p.SourceURL));
  const excerpt = value(p.Summary)?.trim() || sections.flatMap(s => s.paragraphs).join(" ").slice(0, 140) || title;
  return {
    pageId: page.id, slug, title, titleZh: "", number: "", kind: kind === "博客" ? "blog" : "reading",
    excerpt, date, dateLabel: date, updatedAt: page.last_edited_time,
    readingTime: `约 ${Math.max(1, Math.ceil(sections.reduce((n, s) => n + s.paragraphs.join("").length, 0) / 600))} 分钟`,
    tags: (p.Tags?.multi_select ?? []).map(t => t.name), signal: kind === "博客" ? "项目记录与随想" : "阅读札记",
    allowAssistant: p.AllowAssistant.checkbox === true,
    ...(project ? { linkedProject: { label: projectLabels.get(project), href: `/work/${project}` } } : {}),
    ...(sourceTitle ? { source: { title: sourceTitle, author: value(p.SourceAuthor), url: sourceUrl, location: value(p.SourceLocation) } } : {}),
    sections,
  };
}

export async function collectPages(api, sourceId) {
  const pages = [];
  const seen = new Set();
  let cursor;
  do {
    const result = await api(`/data_sources/${sourceId}/query`, { method: "POST", body: JSON.stringify({ page_size: 100, ...(cursor ? { start_cursor: cursor } : {}) }) });
    pages.push(...result.results);
    cursor = result.has_more ? result.next_cursor : null;
    if (result.has_more && !cursor) throw new Error("Missing page cursor");
    if (cursor && seen.has(cursor)) throw new Error("Repeated page cursor");
    if (cursor) seen.add(cursor);
  } while (cursor);
  return pages;
}
export async function collectBlocks(api, id, depth = 0) {
  if (depth > 12) throw new Error("Block nesting is too deep");
  const blocks = [];
  const seen = new Set();
  let cursor;
  do {
    const result = await api(`/blocks/${id}/children?page_size=100${cursor ? `&start_cursor=${encodeURIComponent(cursor)}` : ""}`);
    for (const block of result.results) {
      blocks.push({ ...block, ...(block.has_children ? { children: await collectBlocks(api, block.id, depth + 1) } : {}) });
    }
    cursor = result.has_more ? result.next_cursor : null;
    if (result.has_more && !cursor) throw new Error("Missing block cursor");
    if (cursor && seen.has(cursor)) throw new Error("Repeated block cursor");
    if (cursor) seen.add(cursor);
  } while (cursor);
  return blocks;
}
export async function syncContent({ api, sourceId, projectLabels, output, dryRun = false, mediaDirectory = resolve("public/notion-media"), previous }) {
  const pages = await collectPages(api, sourceId);
  const posts = [];
  const slugs = new Set();
  for (const page of pages) {
    if (page.archived || page.in_trash || value(page.properties.Status) !== "已发布") continue;
    let post;
    try { post = convertPage(page, await collectBlocks(api, page.id), projectLabels); }
    catch (error) { throw new Error(`Page ${page.id}: ${error.message}`); }
    const old = previous?.posts?.find(p => p.pageId === post.pageId);
    if (old && (old.slug !== post.slug || old.kind !== post.kind)) throw new Error(`Page ${page.id}: published Slug/Kind cannot change without a migration`);
    for (const section of post.sections) await materializeImages(section.blocks, mediaDirectory, { dryRun });
    if (slugs.has(post.slug)) throw new Error(`Duplicate slug: ${post.slug}`);
    slugs.add(post.slug);
    posts.push(post);
  }
  posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
  posts.forEach((p, i) => { p.number = String(i + 1).padStart(2, "0"); });
  const version = createHash("sha256").update(JSON.stringify({ schemaVersion: 2, posts })).digest("hex").slice(0, 16);
  const snapshot = { enabled: true, schemaVersion: 2, version, posts };
  if (dryRun) return snapshot;
  await mkdir(dirname(output), { recursive: true });
  const temporary = `${output}.${process.pid}.tmp`;
  await writeFile(temporary, JSON.stringify(snapshot, null, 2) + "\n", "utf8");
  await rename(temporary, output);
  return snapshot;
}

async function main() {
  const token = process.env.NOTION_TOKEN;
  const sourceId = process.env.NOTION_DATA_SOURCE_ID;
  if (!token || !sourceId) throw new Error("Set NOTION_TOKEN and NOTION_DATA_SOURCE_ID in .env.local");
  if (!/^[a-f0-9-]{32,36}$/i.test(sourceId)) throw new Error("Invalid Notion data source ID");
  const projectSource = await readFile(resolve("lib/projects.ts"), "utf8");
  const labels = extractProjectLabels(projectSource);
  const api = createNotionApi(token);
  const previous = JSON.parse(await readFile(resolve("lib/content/notion-snapshot.json"), "utf8"));
  const dryRun = process.argv.includes("--dry-run");
  if (!dryRun && !previous.enabled && process.env.NOTION_ACTIVATE !== "true") throw new Error("First sync needs NOTION_ACTIVATE=true after migration review; use --dry-run first");
  const result = await syncContent({ api, sourceId, projectLabels: labels, output: resolve("lib/content/notion-snapshot.json"), dryRun, previous });
  const allowed = result.posts.filter(post => post.allowAssistant);
  const sections = allowed.reduce((count, post) => count + post.sections.length, 0);
  console.log(`Synced ${result.posts.length} published entries; assistant: ${allowed.length} entries / ${sections} sections; version ${result.version}`);
  if (dryRun) console.log("Dry run only; snapshot and media were not written.");
  console.log("Rebuild and deploy to update website pages and assistant knowledge together.");
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
