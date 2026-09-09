"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Pearl from "./decor/Pearl";
import { smoothScrollTo } from "./motion/SmoothScroll";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

const ease = [0.16, 1, 0.3, 1] as const;

const signals = [
  { key: "01", text: "LAR · TriviaQA 80.09% · action tokens −27.1%" },
  { key: "02", text: "Coding agent · recover, don't loop the same tools" },
  { key: "03", text: "OpenClaw · compress the long run into task state" },
  { key: "04", text: "PixVerse · live video that follows what you type" },
];

/** Quiet instrument strip. Cycles real work — not a dashboard ticker. */
export default function HeroSignal() {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const signal = signals[index] ?? signals[0];

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % signals.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <button
      type="button"
      onClick={() => smoothScrollTo("#trace")}
      className="mt-8 flex max-w-xl items-center gap-3 text-left transition-colors duration-200 hover:text-[var(--sakura-accent-deep)]"
      aria-label="Play an illustrative agent run"
    >
      <span className="sakura-live-pulse text-[var(--sakura-accent-deep)]">
        <Pearl size={8} />
      </span>
      <span className="relative min-h-[1.25rem] min-w-0 flex-1 overflow-hidden">
        {reduce ? (
          <span className="font-mono text-[0.68rem] uppercase tracking-[.14em] text-[var(--sakura-muted)]">
            {signals[0]?.text}
          </span>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={signal.key}
              className="block truncate font-mono text-[0.68rem] uppercase tracking-[.14em] text-[var(--sakura-muted)]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.38, ease }}
            >
              <span className="text-[var(--sakura-accent-deep)]">{signal.key}</span>
              <span className="mx-2 text-[var(--sakura-line-strong)]">/</span>
              {signal.text}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    </button>
  );
}
