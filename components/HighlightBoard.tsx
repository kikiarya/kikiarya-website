"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Bow from "./decor/Bow";
import LaceDivider from "./decor/LaceDivider";
import Pearl from "./decor/Pearl";
import WaxSeal from "./decor/WaxSeal";
import { MetricValue } from "./MetricRow";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";
import type { ProjectMetric } from "../lib/projects";

const ease = [0.16, 1, 0.3, 1] as const;
const STEP_MS = 2400;
const HOLD_MS = 2800;

function isOutcomeLine(text: string) {
  return /\d(?:\.\d+)?%|→|\+\d/.test(text);
}

export default function HighlightBoard({
  items,
  metrics,
}: {
  items: string[];
  metrics?: ProjectMetric[];
}) {
  const glance = metrics?.length ? metrics : undefined;
  const steps =
    glance && items.length
      ? items.filter((item, index) => !(index === items.length - 1 && isOutcomeLine(item)))
      : items;
  const last = Math.max(steps.length - 1, 0);
  const reduce = usePrefersReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const userStopped = useRef(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [counted, setCounted] = useState(false);
  const step = steps[index] ?? steps[0];

  useEffect(() => {
    if (reduce || !steps.length) return;
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.32) {
          setCounted(true);
          if (!userStopped.current) setPlaying(true);
        } else {
          setPlaying(false);
        }
      },
      { threshold: [0.2, 0.32, 0.55] }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduce, steps.length]);

  useEffect(() => {
    if (reduce || !playing || steps.length < 2) return;
    if (index >= last) {
      const hold = window.setTimeout(() => {
        if (userStopped.current) return;
        setIndex(0);
      }, HOLD_MS);
      return () => window.clearTimeout(hold);
    }
    const id = window.setTimeout(() => {
      setIndex((value) => Math.min(value + 1, last));
    }, STEP_MS);
    return () => window.clearTimeout(id);
  }, [index, last, playing, reduce, steps.length]);

  if (!step) return null;

  const jump = (next: number) => {
    userStopped.current = true;
    setPlaying(false);
    setIndex(next);
  };

  return (
    <figure ref={rootRef} className="diagram-plate">
      <div className="diagram-plate-lace diagram-plate-lace-top" aria-hidden="true">
        <LaceDivider scallop={16} picots />
      </div>
      <div className="diagram-plate-lace diagram-plate-lace-bottom" aria-hidden="true">
        <LaceDivider scallop={16} picots />
      </div>
      <div className="pointer-events-none absolute left-5 top-5 text-[var(--sakura-accent)]">
        <Pearl size={7} />
      </div>
      <div className="pointer-events-none absolute right-5 top-5 text-[var(--sakura-accent)]">
        <Pearl size={7} />
      </div>
      <div className="pointer-events-none absolute bottom-5 left-5 text-[var(--sakura-accent)]">
        <Pearl size={7} />
      </div>
      <div className="pointer-events-none absolute bottom-5 right-5 text-[var(--sakura-accent)]">
        <Pearl size={7} />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-2 z-[1] -translate-x-1/2 text-[var(--sakura-accent-deep)]">
        <Bow size={34} variant="soft" />
      </div>

      <div className="diagram-plate-inner">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <p className="eyebrow">Fig. Build</p>
          <p className="font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-muted)]">
            {reduce ? "Still" : playing ? "Playing" : "Paused"}
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-7">
          <WaxSeal size={118} active>
            <span className="text-[2.4rem] md:text-[2.75rem]">
              {String(index + 1).padStart(2, "0")}
            </span>
          </WaxSeal>
          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                className="min-h-[3.25rem] font-display text-[1.35rem] italic leading-[1.45] text-[var(--sakura-ink)] md:text-[1.55rem]"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduce ? 0.12 : 0.4, ease }}
              >
                {step}
              </motion.blockquote>
            </AnimatePresence>
            {glance ? (
              <ul className="mt-8 grid grid-cols-3 justify-items-center gap-x-3 gap-y-6 pt-1">
                {glance.map((metric, i) => (
                  <motion.li
                    key={metric.label}
                    animate={reduce ? undefined : { y: [0, -16, 0] }}
                    transition={{
                      duration: 3.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.55,
                    }}
                  >
                    <WaxSeal size={88} caption={metric.label} active={counted}>
                      <MetricValue metric={metric} active={counted} size="seal" />
                    </WaxSeal>
                  </motion.li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        {steps.length > 1 ? (
          <ol className="mt-9 flex flex-wrap gap-2">
            {steps.map((item, i) => {
              const on = i === index;
              return (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={on ? "step" : undefined}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 transition-colors duration-200 ${
                      on
                        ? "border-transparent bg-[var(--sakura-accent-deep)] text-white"
                        : "border-[var(--sakura-line-soft)] bg-[var(--sakura-surface-soft)] text-[var(--sakura-ink-soft)] hover:text-[var(--sakura-accent-deep)]"
                    }`}
                  >
                    <span className="font-display text-lg leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Pearl size={6} className={on ? "text-white" : "text-[var(--sakura-accent)]"} />
                  </button>
                </li>
              );
            })}
          </ol>
        ) : null}

        <figcaption className="mt-7 font-display italic text-base leading-7 text-[var(--sakura-ink-soft)]">
          How it was built. A mark holds a step; otherwise it turns on its own.
        </figcaption>
      </div>
    </figure>
  );
}
