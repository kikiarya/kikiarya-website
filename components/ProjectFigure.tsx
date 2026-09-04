"use client";

import { useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import type { ProjectDiagram } from "../lib/projects";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

const ease = [0.16, 1, 0.3, 1] as const;

function Connector({ active }: { active?: boolean }) {
  const reduce = usePrefersReducedMotion();
  return (
    <svg
      className={`hidden sm:block shrink-0 ${
        active ? "text-[var(--sakura-accent-deep)]" : "text-[var(--sakura-accent)]"
      }`}
      width="48"
      height="16"
      viewBox="0 0 48 16"
      aria-hidden="true"
    >
      <motion.line
        x1="2"
        y1="8"
        x2="38"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0.35 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: reduce ? 0.01 : 0.7, ease }}
      />
      <motion.polyline
        points="32,3 40,8 32,13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: reduce ? 0.01 : 0.45, delay: reduce ? 0 : 0.35, ease }}
      />
    </svg>
  );
}

function ExplorableSteps({ diagram }: { diagram: ProjectDiagram }) {
  const reduce = usePrefersReducedMotion();
  const steps = diagram.steps ?? [];
  const [active, setActive] = useState(0);
  const current = steps[active];

  const onKey = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      setActive((value) => Math.min(value + 1, steps.length - 1));
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      setActive((value) => Math.max(value - 1, 0));
    }
  };

  return (
    <div onKeyDown={onKey}>
      <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-stretch gap-3">
        {steps.map((step, index) => (
          <div key={step.label} className="contents">
            {index > 0 ? <Connector active={index <= active} /> : null}
            <motion.button
              type="button"
              aria-pressed={index === active}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              className={`flex-1 min-w-[9rem] rounded-2xl border px-5 py-5 text-left transition-colors duration-200 ${
                index === active
                  ? "border-[var(--sakura-line)] bg-[var(--sakura-surface-soft)]"
                  : "border-[var(--sakura-line-soft)] bg-[var(--sakura-bg-deep)]/70 opacity-55 hover:opacity-100"
              }`}
              initial={reduce ? false : { y: 24 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: reduce ? 0.15 : 0.55, delay: reduce ? 0 : index * 0.08, ease }}
            >
              <p className="font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-muted)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="font-display text-xl leading-tight mt-2">{step.label}</p>
            </motion.button>
          </div>
        ))}
      </div>
      {current?.detail ? (
        <motion.p
          key={current.label}
          className="mt-6 font-display text-2xl md:text-[1.65rem] leading-snug text-[var(--sakura-ink)]"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0.12 : 0.4, ease }}
        >
          {current.detail}
        </motion.p>
      ) : null}
    </div>
  );
}

export default function ProjectFigure({ diagram }: { diagram: ProjectDiagram }) {
  const reduce = usePrefersReducedMotion();
  const kindLabel =
    diagram.kind === "architecture"
      ? "Fig. Architecture"
      : diagram.kind === "pipeline"
        ? "Fig. Pipeline"
        : "Fig. Evaluation";

  return (
    <figure className="sakura-glass rounded-3xl p-6 md:p-8">
      <p className="eyebrow">{kindLabel}</p>
      {diagram.explorable && diagram.steps?.length ? (
        <ExplorableSteps diagram={diagram} />
      ) : diagram.steps ? (
        <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-stretch gap-3">
          {diagram.steps.map((step, index) => (
            <div key={step.label} className="contents sm:contents">
              {index > 0 ? <Connector /> : null}
              <motion.div
                className="flex-1 min-w-[9rem] rounded-2xl border border-[var(--sakura-line-soft)] bg-[var(--sakura-bg-deep)]/70 px-5 py-5"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: reduce ? 0.15 : 0.55, delay: reduce ? 0 : index * 0.08, ease }}
              >
                <p className="font-display text-xl leading-tight">{step.label}</p>
                {step.detail ? (
                  <p className="mt-2 text-sm leading-6 text-[var(--sakura-ink-soft)]">{step.detail}</p>
                ) : null}
              </motion.div>
            </div>
          ))}
        </div>
      ) : null}
      {diagram.bars ? (
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {diagram.bars.map((bar, index) => (
            <motion.div
              key={bar.label}
              className={`rounded-2xl border px-5 py-5 ${
                bar.highlight
                  ? "border-[var(--sakura-line)] bg-[var(--sakura-surface-soft)]"
                  : "border-[var(--sakura-line-soft)] bg-[var(--sakura-bg-deep)]/70"
              }`}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: reduce ? 0.15 : 0.55, delay: reduce ? 0 : index * 0.08, ease }}
            >
              <p className="font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-muted)]">
                {bar.label}
              </p>
              <p className="font-display text-2xl mt-3 leading-snug">{bar.caption}</p>
            </motion.div>
          ))}
        </div>
      ) : null}
      <figcaption className="mt-6 font-display italic text-base leading-7 text-[var(--sakura-ink-soft)]">
        {diagram.caption}
      </figcaption>
    </figure>
  );
}
