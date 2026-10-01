"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Send, X } from "lucide-react";
import type {
  AssistantResponse,
  PreviousTurn,
} from "../../lib/assistant/types";

type PetStatus = "idle" | "waving" | "running" | "review";

const suggestedQuestions = [
  "Kikiarya 主要做什么方向？",
  "Coding Agent 如何从失败中恢复？",
  "哪个项目最能体现 RAG 或 Agent orchestration？",
  "LAR 和 Stateful Runtime 有什么区别？",
];

function sessionId() {
  const key = "portfolio-assistant-session-v1";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const next = window.crypto.randomUUID();
  window.localStorage.setItem(key, next);
  return next;
}

function claimClientRequest() {
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
  if (day.length >= 10) return { ok: false, message: "今天的 10 次提问已经用完，项目导航仍然可以继续使用。" };
  day.push(now);
  window.localStorage.setItem(key, JSON.stringify(day));
  return { ok: true, message: "" };
}

export default function AssistantPanel({
  side,
  onClose,
  onStatus,
}: {
  side: "left" | "right";
  onClose: () => void;
  onStatus: (status: PetStatus) => void;
}) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<AssistantResponse | null>(null);
  const [previousTurn, setPreviousTurn] = useState<PreviousTurn | undefined>();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const counter = Array.from(question).length;

  useEffect(() => {
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const ask = async (nextQuestion: string) => {
    const clean = nextQuestion.trim();
    if (!clean || pending || Array.from(clean).length > 300) return;
    const clientLimit = claimClientRequest();
    if (!clientLimit.ok) {
      setError(clientLimit.message);
      return;
    }

    setQuestion(clean);
    setPending(true);
    setError("");
    onStatus("running");

    try {
      const result = await fetch("/api/portfolio-assistant", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-portfolio-session": sessionId(),
        },
        body: JSON.stringify({ question: clean, previousTurn }),
      });
      const payload = (await result.json()) as AssistantResponse & { error?: string };
      if (!result.ok) throw new Error(payload.error || "Assistant request failed.");

      setResponse(payload);
      setPreviousTurn({
        question: clean,
        answer: payload.answer,
        sourceIds: payload.sources.map((source) => source.id),
      });
      setQuestion("");
      onStatus("review");
    } catch (requestError) {
      setError(
        requestError instanceof Error && requestError.message === "Rate limit reached."
          ? "提问次数达到限制，稍后再试。你仍然可以使用下面的项目导航。"
          : "助手暂时没有连接成功。你仍然可以直接查看项目、简历或联系页面。"
      );
      onStatus("idle");
    } finally {
      setPending(false);
    }
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    void ask(question);
  };

  return (
    <section className={`assistant-panel assistant-panel-${side}`} role="dialog" aria-label="Portfolio assistant">
      <header className="assistant-panel-header">
        <div>
          <p className="eyebrow">Portfolio guide / 作品集助手</p>
          <h2>Ask Kiki</h2>
        </div>
        <button type="button" onClick={onClose} aria-label="Close portfolio assistant">
          <X size={18} />
        </button>
      </header>

      <div className="assistant-panel-body" aria-live="polite">
        {!response ? (
          <div className="assistant-welcome">
            <p>我只回答本站公开的项目、经历和技术方向，并为每个答案附上来源。</p>
            <div className="assistant-suggestions">
              {suggestedQuestions.map((item) => (
                <button key={item} type="button" onClick={() => void ask(item)} disabled={pending}>
                  {item}<ArrowUpRight size={13} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <article className="assistant-answer">
            <p className="assistant-mode">
              {response.mode === "ai" ? "AI enhanced · 基于本站资料" : "Local guide · 根据本站公开内容整理"}
            </p>
            <div>{response.answer}</div>
            <div className="assistant-sources">
              <p>Sources / 对应内容</p>
              {response.sources.map((source) => (
                <a key={`${source.id}:${source.href}`} href={source.href} onClick={onClose}>
                  {source.title}<ArrowUpRight size={13} aria-hidden="true" />
                </a>
              ))}
            </div>
          </article>
        )}

        {error ? (
          <div className="assistant-error">
            <p>{error}</p>
            <div>
              <a href="/work">Work / 项目</a>
              <a href="/resume">Resume / 简历</a>
              <a href="/contact">Contact / 联系</a>
            </div>
          </div>
        ) : null}
      </div>

      <form className="assistant-form" onSubmit={submit}>
        <label htmlFor="portfolio-question">Ask about the portfolio / 问一个作品集问题</label>
        <textarea
          ref={inputRef}
          id="portfolio-question"
          value={question}
          onChange={(event) => setQuestion(Array.from(event.target.value).slice(0, 300).join(""))}
          placeholder="例如：哪个项目体现了 Agent recovery？"
          rows={3}
          disabled={pending}
        />
        <div>
          <span>{counter}/300</span>
          <button type="submit" disabled={!question.trim() || pending}>
            {pending ? "Searching…" : "Ask"}<Send size={14} aria-hidden="true" />
          </button>
        </div>
      </form>
    </section>
  );
}
