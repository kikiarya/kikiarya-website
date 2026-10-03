// Transpile only project TypeScript in this test process; production uses Next.js.
const fs = require("node:fs");
const ts = require("typescript");
require.extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true, resolveJsonModule: true },
}).outputText, filename);
const test = require("node:test");
const assert = require("node:assert/strict");
const { retrieveConversation } = require("../lib/assistant/retrieve.ts");
const { knowledgeChunks } = require("../lib/assistant/knowledge.ts");
const { readConversation, conversationHistory } = require("../lib/assistant/conversation.ts");
const { buildArticleKnowledge } = require("../lib/assistant/article-knowledge.ts");
const coding = knowledgeChunks.find(chunk => chunk.id.startsWith("project:") && /coding-agent/.test(chunk.id));
const lar = knowledgeChunks.find(chunk => chunk.id.startsWith("project:") && chunk.title === "LAR");
const turn = ids => ({ question: "介绍项目", answer: "不可信的客户端文本", sourceIds: ids });

test("followup stays with the previously cited project", () => {
  const result = retrieveConversation("这个项目怎么实现？", [turn([coding.id, `repository:${coding.id.slice(8)}`, "profile:overview"])]);
  assert.equal(result.needsClarification, false);
  assert.ok(result.chunks.length);
  assert.ok(result.chunks.every(chunk => chunk.href === coding.href));
  assert.ok(result.chunks[0].id.endsWith(":mechanism"));
});
test("explicit project switches topic", () => {
  const result = retrieveConversation("LAR 怎么实现？", [turn([coding.id])]);
  assert.ok(result.chunks.length);
  assert.ok(result.chunks.every(chunk => chunk.href === lar.href));
});
test("ambiguous project reference asks for clarification", () => {
  assert.equal(retrieveConversation("这个项目的难点是什么？", [turn([coding.id, lar.id])]).needsClarification, true);
  assert.equal(retrieveConversation("这个项目怎么实现？", []).needsClarification, true);
});
test("invented source IDs never create knowledge", () => {
  const result = retrieveConversation("它怎么实现？", [turn(["private:invented"])]);
  assert.equal(result.needsClarification, true);
  assert.equal(result.chunks.length, 0);
});
test("unrelated question does not inherit project context", () => {
  const result = retrieveConversation("怎么联系 Kikiarya？", [turn([coding.id])]);
  assert.ok(result.chunks.some(chunk => chunk.id === "navigation:contact"));
});
test("stored conversation is bounded, survives reload and rejects unsafe links", () => {
  assert.deepEqual(readConversation("invalid"), []);
  const records = Array.from({ length: 25 }, (_, i) => ({ id: String(i), question: "你好", response: { mode: "local", answer: "回答", knowledgeVersion: "v1", sources: [{ id: "bad", title: "bad", href: "javascript:alert(1)" }, { id: coding.id, title: coding.title, href: coding.href }] } }));
  const restored = readConversation(JSON.stringify(records));
  assert.equal(restored.length, 20); assert.equal(restored[0].id, "5");
  assert.equal(restored[0].response.sources.length, 1);
  assert.equal(conversationHistory(restored).length, 3);
  assert.match(readConversation(JSON.stringify([{ id: "pending", question: "问题" }]))[0].error, /中断/);
});
test("new knowledge version excludes older conversation context", () => {
  const result = conversationHistory([{ id: "1", question: "旧问题", response: { mode: "local", answer: "旧回答", sources: [], knowledgeVersion: "v1" } }, { id: "2", question: "新问题", response: { mode: "local", answer: "新回答", sources: [], knowledgeVersion: "v2" } }]);
  assert.equal(result.length, 1); assert.equal(result[0].question, "新问题");
});
test("article opt-in, edits, withdrawal and section references update knowledge", () => {
  const article = { slug: "reading-test", title: "阅读札记", kind: "reading", date: "2026-10-02", tags: ["恢复"], allowAssistant: true, sections: [{ heading: "恢复机制", paragraphs: ["旧内容"] }] };
  assert.equal(buildArticleKnowledge([{ ...article, allowAssistant: false }], "v1").length, 0);
  const initial = buildArticleKnowledge([article], "v1");
  assert.equal(initial[0].href, "/bookshelf/reading-test#section-1");
  const updated = buildArticleKnowledge([{ ...article, sections: [{ heading: "恢复机制", paragraphs: ["新内容"] }] }], "v2");
  assert.equal(updated[0].answerSummaryZh, "新内容"); assert.equal(updated[0].version, "v2");
  assert.deepEqual(buildArticleKnowledge([], "v3"), []);
});

test("first mechanism question selects mechanism instead of background", () => {
  const result = retrieveConversation("Coding Agent 如何从失败中恢复？");
  assert.equal(result.chunks[0].id, `project-detail:${coding.id.slice(8)}:mechanism`);
});
