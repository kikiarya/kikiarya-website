"use client";

import { motion } from "framer-motion";
import type { ProjectDiagram } from "../lib/projects";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

const ease = [0.16, 1, 0.3, 1] as const;

function Connector() {
  const reduce = usePrefersReducedMotion();
  return (
    <svg
      className="hidden sm:block shrink-0 text-[var(--sakura-accent)]"
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
      {diagram.steps ? (
        <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-stretch gap-3">
          {diagram.steps.map((step, index) => (
            <div key={step.label} className="contents sm:contents">
              {index > 0 ? <Connector /> : null}
              <motion.div
                className="flex-1 min-w-[9rem] rounded-2xl border border-[var(--sakura-line-soft)] bg-[var(--sakura-bg-deep)]/70 px-5 py-5"
                initial={reduce ? false : { opacity: 0, y: 10 }}
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
              initial={reduce ? false : { opacity: 0, y: 10 }}
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
