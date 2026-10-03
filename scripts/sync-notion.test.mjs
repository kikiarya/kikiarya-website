import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { convertPage, syncContent, collectBlocks, extractProjectLabels } from "./sync-notion.mjs";
const rt = s => ({ type: "rich_text", rich_text: [{ plain_text: s }] });
const page = (slug = "test-note", status = "已发布") => ({ id: slug, last_edited_time: "2026-10-02T00:00:00Z", properties: {
  Title: { type: "title", title: [{ plain_text: "失败之后怎么恢复" }] }, Slug: rt(slug), Kind: { type: "select", select: { name: "博客" } }, Status: { type: "select", select: { name: status } },
  Published: { type: "date", date: { start: "2026-10-02" } }, AllowAssistant: { type: "checkbox", checkbox: false }, Project: rt("coding-agent"),
} });
const blocks = [{ type: "heading_2", heading_2: { rich_text: [{ plain_text: "重新规划" }] } }, { type: "paragraph", paragraph: { rich_text: [{ plain_text: "保存进度，重新读取发生变化的文件。" }] } }];
const labels = new Map([["coding-agent", "Coding Agent"]]);
test("published conversion keeps section, source and opt-in permission", () => {
  const p = page(); p.properties.SourceTitle = rt("原文"); p.properties.SourceURL = { type: "url", url: "https://example.com/article" };
  const result = convertPage(p, blocks, labels);
  assert.equal(result.allowAssistant, false); assert.equal(result.sections[0].heading, "重新规划"); assert.equal(result.linkedProject.href, "/work/coding-agent"); assert.equal(result.source.url, "https://example.com/article");
  assert.equal(convertPage(page("draft", "草稿"), [], labels), null);
});
test("reject invalid slug, unknown project, invalid date, unsupported blocks and unsafe URL", () => {
  assert.throws(() => convertPage(page("../private"), blocks, labels));
  assert.throws(() => convertPage(page(), blocks, new Map()));
  const p = page(); p.properties.Published.date.start = "2026-02-31"; assert.throws(() => convertPage(p, blocks, labels));
  assert.throws(() => convertPage(page(), [{ type: "image" }], labels));
  const q = page(); q.properties.SourceURL = { type: "url", url: "javascript:alert(1)" }; assert.throws(() => convertPage(q, blocks, labels));
});
test("nested blocks and pagination are fully read", async () => {
  const calls = [];
  const api = async path => { calls.push(path); if (path.includes("nested")) return { results: [blocks[1]], has_more: false }; if (path.includes("start_cursor")) return { results: [blocks[1]], has_more: false }; return { results: [{ ...blocks[0], id: "nested", has_children: true }], has_more: true, next_cursor: "next" }; };
  assert.equal((await collectBlocks(api, "root")).length, 3); assert.equal(calls.length, 3);
});
test("atomic snapshot replacement, removals and failure preservation", async () => {
  const dir = await mkdtemp(join(tmpdir(), "kiki-content-")); const output = join(dir, "snapshot.json");
  try {
    const api = async path => path.includes("/query") ? { results: [page(), page("draft", "草稿")], has_more: false } : { results: blocks, has_more: false };
    const initial = await syncContent({ api, sourceId: "source", projectLabels: labels, output });
    assert.equal(initial.posts.length, 1); const old = await readFile(output, "utf8");
    await assert.rejects(syncContent({ api: async () => { throw new Error("offline"); }, sourceId: "source", projectLabels: labels, output })); assert.equal(await readFile(output, "utf8"), old);
    await assert.rejects(syncContent({ api: async path => path.includes("/query") ? { results: [page(), page()], has_more: false } : { results: blocks, has_more: false }, sourceId: "source", projectLabels: labels, output })); assert.equal(await readFile(output, "utf8"), old);
    const empty = await syncContent({ api: async () => ({ results: [], has_more: false }), sourceId: "source", projectLabels: labels, output }); assert.deepEqual(empty.posts, []); assert.notEqual(empty.version, initial.version);
  } finally { await rm(dir, { recursive: true, force: true }); }
});

test("project labels include quoted JSON-style keys", () => { assert.deepEqual([...extractProjectLabels('slug: "a", title: "A", "slug": "b", "title": "B"')], [["a", "A"], ["b", "B"]]); });
