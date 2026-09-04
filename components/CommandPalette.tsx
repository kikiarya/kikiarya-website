"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { projects } from "../lib/projects";
import { site } from "../lib/site";
import { useVeilNavigate } from "./motion/RouteVeil";
import { useMotionScene } from "./motion/MotionProvider";

export const PALETTE_OPEN_EVENT = "kikiarya:open-palette";

export function openCommandPalette() {
  window.dispatchEvent(new Event(PALETTE_OPEN_EVENT));
}

type PaletteItem = {
  href: string;
  title: string;
  hint: string;
  answer?: string;
  keywords?: string[];
};

const pages: PaletteItem[] = [
  { href: "/", title: "Index", hint: "Home" },
  { href: "/work", title: "Work", hint: "All projects" },
  { href: "/resume", title: "Resume", hint: "Education and experience" },
  { href: "/contact", title: "Contact", hint: "Email" },
  { href: "/notes", title: "Notes", hint: "Writing" },
];

const citations: PaletteItem[] = [
  {
    href: "/work/latent-action-reparameterization",
    title: "LAR",
    hint: "Paper",
    answer: "LAR is under review at NeurIPS 2026.",
    keywords: ["lar", "neurips", "paper", "arxiv", "latent"],
  },
  {
    href: "/work/coding-agent-policy-optimization",
    title: "Coding agent",
    hint: "Latest",
    answer: "Joint optimization: +6pp resolve, ~+10pp recovery, −15% tool calls.",
    keywords: ["coding", "swe", "harness"],
  },
  {
    href: "/work/openclaw-stateful-agent-runtime",
    title: "OpenClaw",
    hint: "Runtime",
    answer: "Long OpenClaw runs fold into task state — fewer tokens, better recovery.",
    keywords: ["openclaw", "runtime", "compression"],
  },
  {
    href: "/resume",
    title: "Resume",
    hint: "Graduation",
    answer: "Master's at the University of Sydney, graduating December 2026.",
    keywords: ["resume", "cv", "graduation", "graduating", "sydney", "intern"],
  },
  {
    href: "/contact",
    title: "Email",
    hint: "Contact",
    answer: site.email,
    keywords: ["email", "mail", "contact", "write"],
  },
];

function matches(item: PaletteItem, q: string) {
  if (item.title.toLowerCase().includes(q) || item.hint.toLowerCase().includes(q)) return true;
  if (item.answer?.toLowerCase().includes(q)) return true;
  return item.keywords?.some((word) => word.includes(q) || q.includes(word)) ?? false;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useVeilNavigate();
  const { isCover } = useMotionScene();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const catalog: PaletteItem[] = [
      ...projects.map((project) => ({
        href: `/work/${project.slug}`,
        title: project.cardTitle ?? project.title,
        hint: project.venue ?? project.shortDescription,
      })),
      ...pages,
    ];
    if (!q) return catalog;
    const seen = new Set<string>();
    return [...citations, ...catalog].filter((item) => {
      if (!matches(item, q)) return false;
      const key = `${item.href}:${item.answer ?? item.title}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const go = useCallback(
    (href: string) => {
      close();
      navigate(href);
    },
    [close, navigate]
  );

  useEffect(() => {
    const onOpen = () => {
      if (isCover) return;
      setOpen(true);
    };
    window.addEventListener(PALETTE_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(PALETTE_OPEN_EVENT, onOpen);
  }, [isCover]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (isCover) return;
      const target = event.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }
      if (!open) return;
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((value) => Math.min(value + 1, Math.max(filtered.length - 1, 0)));
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((value) => Math.max(value - 1, 0));
        return;
      }
      if (event.key === "Enter" && !typing) {
        const item = filtered[active];
        if (item) {
          event.preventDefault();
          go(item.href);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, filtered, go, isCover, open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const id = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
      window.cancelAnimationFrame(id);
    };
  }, [open]);

  if (!open || isCover) return null;

  const citing = query.trim().length > 0;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[18vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[var(--sakura-bg-deep)]/55 backdrop-blur-sm"
        aria-label="Close search"
        onClick={close}
      />
      <div className="relative w-full max-w-xl sakura-glass rounded-[1.75rem] overflow-hidden">
        <div className="flex items-center gap-3 px-5 border-b border-[var(--sakura-line-soft)]">
          <Search size={16} className="text-[var(--sakura-muted)]" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                const item = filtered[active];
                if (item) {
                  event.preventDefault();
                  go(item.href);
                }
              }
            }}
            placeholder="Search work, resume, notes"
            className="w-full min-h-14 bg-transparent text-base placeholder:text-[var(--sakura-muted)]"
          />
        </div>
        <ul className="max-h-[min(22rem,50vh)] overflow-y-auto py-2" role="listbox">
          {filtered.length ? (
            filtered.map((item, index) => (
              <li key={`${item.href}-${item.title}-${item.answer ?? ""}`}>
                <button
                  type="button"
                  role="option"
                  aria-selected={index === active}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => go(item.href)}
                  className={`flex w-full items-baseline justify-between gap-4 px-5 py-3 text-left transition-colors duration-150 ${
                    index === active ? "bg-[var(--sakura-surface-soft)]" : ""
                  }`}
                >
                  <span className="min-w-0">
                    <span className="font-display text-xl leading-tight block">
                      {citing && item.answer ? item.answer : item.title}
                    </span>
                    {citing && item.answer ? (
                      <span className="mt-1 block font-mono text-meta uppercase tracking-[.1em] text-[var(--sakura-muted)]">
                        {item.title}
                      </span>
                    ) : null}
                  </span>
                  <span className="font-mono text-meta uppercase tracking-[.1em] text-[var(--sakura-muted)] truncate max-w-[40%] shrink-0">
                    {citing && item.answer ? "Open" : item.hint}
                  </span>
                </button>
              </li>
            ))
          ) : (
            <li className="px-5 py-8 text-center font-mono text-meta text-[var(--sakura-muted)]">
              Nothing matches.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
