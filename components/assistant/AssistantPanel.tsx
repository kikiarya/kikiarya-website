"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Copy, RotateCcw, Send, Trash2, X } from "lucide-react";
import type { AssistantResponse } from "../../lib/assistant/types";
import { readConversation, conversationHistory, type ConversationTurn } from "../../lib/assistant/conversation";

type PetStatus = "idle" | "waving" | "running" | "review";
const STORAGE_KEY = "portfolio-assistant-chat-v2";
const suggestedQuestions = ["Kikiarya 主要做什么方向？", "Coding Agent 如何从失败中恢复？", "哪个项目最能体现 RAG 或 Agent 编排？", "LAR 和 Stateful Runtime 有什么区别？"];
function storedSessionId() {
  const key = "portfolio-assistant-session-v1";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const next = window.crypto.randomUUID();
  window.localStorage.setItem(key, next);
  return next;
}

function storedClientRequest() {
  const key = "portfolio-assistant-rate-v1";
  const now = Date.now();
  const stored = window.localStorage.getItem(key);
  let values: number[] = [];
  try {
    const parsed = stored ? (JSON.parse(stored) as unknown) : [];
    values = Array.isArray(parsed) && parsed.every((value) => typeof value === "number") ? parsed : [];
  } catch {
    window.localStorage.removeItem(key);
  }
  const day = values.filter((value) => now - value < 86_400_000);
  const minute = day.filter((value) => now - value < 60_000);
  if (minute.length >= 2) return { ok: false, message: "请求有点快，请一分钟后再试。" };
  if (day.length >= 10) return { ok: false, message: "今天已经聊了 10 次，明天再来吧。也可以点下面的链接继续看项目。" };
  day.push(now);
  window.localStorage.setItem(key, JSON.stringify(day));
  return { ok: true, message: "" };
}


function sessionId() {
  try { return storedSessionId(); } catch { return "anonymous"; }
}
function claimClientRequest() {
  try { return storedClientRequest(); } catch { return { ok: true, message: "" }; }
}

export default function AssistantPanel({ side, onClose, onStatus }: {
  side: "left" | "right"; onClose: () => void; onStatus: (status: PetStatus) => void;
}) {
  const [question, setQuestion] = useState("");
  const [turns, setTurns] = useState<ConversationTurn[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [copied, setCopied] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try { setTurns(readConversation(window.sessionStorage.getItem(STORAGE_KEY))); } catch { /* Storage can be disabled. */ }
    setReady(true);
    inputRef.current?.focus();
    return () => {
      controllerRef.current?.abort();
      controllerRef.current = null;
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  useEffect(() => {
    if (!ready) return;
    try { window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(turns.slice(-20))); } catch { /* Keep in-memory chat usable. */ }
  }, [turns, ready]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ block: "nearest" }); }, [turns, pending, error]);

  const ask = async (nextQuestion: string, retryId?: string) => {
    const clean = nextQuestion.trim();
    if (!clean || controllerRef.current || !ready || Array.from(clean).length > 300) return;
    const limit = claimClientRequest();
    if (!limit.ok) { setError(limit.message); return; }
    const id = retryId ?? window.crypto.randomUUID();
    const history = conversationHistory(retryId ? turns.slice(0, turns.findIndex(turn => turn.id === retryId)) : turns);
    const controller = new AbortController();
    controllerRef.current = controller;
    setTurns(current => retryId ? current.map(turn => turn.id === id ? { id, question: clean } : turn) : [...current, { id, question: clean }].slice(-20));
    setQuestion(""); setPending(true); setError(""); onStatus("running");
    try {
      const result = await fetch("/api/portfolio-assistant", {
        method: "POST", signal: controller.signal,
        headers: { "content-type": "application/json", "x-portfolio-session": sessionId() },
        body: JSON.stringify({ question: clean, history }),
      });
      const payload = await result.json() as AssistantResponse & { error?: string; retryAfter?: number };
      if (!result.ok) {
        if (result.status === 429) {
          const seconds = Math.max(1, Math.ceil(((payload.retryAfter ?? Date.now() + 60000) - Date.now()) / 1000));
          throw new Error(`聊得有点快，请约 ${seconds} 秒后再试。`);
        }
        throw new Error("暂时没连上，请稍后重试。");
      }
      if (typeof payload.answer !== "string" || !Array.isArray(payload.sources)) throw new Error("回答未能完整送达，请重试。");
      if (controller.signal.aborted) throw new Error("已停止这次回答。");
      setTurns(current => current.map(turn => turn.id === id ? { ...turn, response: payload } : turn));
      onStatus("review");
    } catch (requestError) {
      if (controllerRef.current !== controller) return;
      const message = controller.signal.aborted ? "已停止这次回答。" : requestError instanceof Error ? requestError.message : "暂时没连上，请稍后重试。";
      setTurns(current => current.map(turn => turn.id === id ? { ...turn, error: message } : turn));
      onStatus("idle");
    } finally {
      if (controllerRef.current === controller) { controllerRef.current = null; setPending(false); }
    }
  };
  const clear = () => {
    controllerRef.current?.abort(); controllerRef.current = null;
    setTurns([]); setPending(false); setError(""); setQuestion(""); onStatus("idle");
    inputRef.current?.focus();
  };
  const copy = async (turn: ConversationTurn) => {
    try {
      await navigator.clipboard.writeText(turn.response!.answer);
      setCopied(turn.id);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(""), 2000);
    } catch { setError("没能复制，可以直接选中回答文字复制。"); }
  };
  const submit = (event: FormEvent) => { event.preventDefault(); void ask(question); };

  return (
    <section className={`assistant-panel assistant-panel-${side}`} role="dialog" aria-label="Kikiarya 个人助手">
      <header className="assistant-panel-header">
        <div><p className="eyebrow">个人助手</p><h2>Ask Kiki</h2></div>
        <div className="assistant-toolbar">
          <button type="button" onClick={clear} disabled={!turns.length} aria-label="清空对话" title="清空对话"><Trash2 size={16} /></button>
          <button type="button" onClick={onClose} aria-label="关闭个人助手"><X size={18} /></button>
        </div>
      </header>
      <div className="assistant-panel-body" role="log" aria-label="对话记录" aria-live="polite" aria-relevant="additions text">
        {!turns.length ? <div className="assistant-welcome">
          <p>你好，我是 Kikiarya 的网站小助手。想了解项目怎么做、遇到过什么问题，或她关注哪些技术，都可以问我。</p>
          <p className="assistant-storage-note">对话仅保存在当前浏览器标签页，可随时清空。</p>
          <div className="assistant-suggestions">{suggestedQuestions.map(item => <button key={item} type="button" onClick={() => void ask(item)} disabled={!ready || pending}>{item}<ArrowUpRight size={13} aria-hidden="true" /></button>)}</div>
        </div> : turns.map(turn => <div className="assistant-turn" key={turn.id}>
          <div className="assistant-question"><span className="sr-only">你：</span>{turn.question}</div>
          {turn.response ? <article className="assistant-answer">
            <p className="assistant-mode">根据本站资料回答</p>
            <div>{turn.response.answer}</div>
            {turn.response.sources.length > 0 ? <div className="assistant-sources"><p>相关资料</p>{turn.response.sources.map(source => <a key={`${source.id}:${source.href}`} href={source.href} onClick={onClose}>{source.title}<ArrowUpRight size={13} aria-hidden="true" /></a>)}</div> : null}
            <button className="assistant-copy" type="button" onClick={() => void copy(turn)}><Copy size={13} />{copied === turn.id ? "已复制" : "复制回答"}</button>
          </article> : turn.error ? <div className="assistant-error"><p>{turn.error}</p><button type="button" disabled={pending} onClick={() => void ask(turn.question, turn.id)}><RotateCcw size={13} /> 重试</button></div> : <p className="assistant-thinking" role="status">正在查找相关资料…</p>}
        </div>)}
        {error ? <div className="assistant-error" role="status">{error}</div> : null}
        <div ref={bottomRef} />
      </div>
      <form className="assistant-form" onSubmit={submit}>
        <label htmlFor="portfolio-question">{turns.length ? "继续问，也可以换个话题" : "想问点什么？"}</label>
        <textarea ref={inputRef} id="portfolio-question" value={question} onChange={event => setQuestion(Array.from(event.target.value).slice(0, 300).join(""))} placeholder="例如：这个项目遇到过什么难点？" rows={2} disabled={pending || !ready} />
        <div><span>{Array.from(question).length}/300</span>{pending ? <button type="button" onClick={() => controllerRef.current?.abort()}>停止回答<X size={14} /></button> : <button type="submit" disabled={!question.trim() || !ready}>发送<Send size={14} /></button>}</div>
      </form>
    </section>
  );
}
