"use client";

import { useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import type { ProjectTrajectory } from "../lib/projects";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function TrajectoryReplay({
  trajectory,
  featured = false,
}: {
  trajectory: ProjectTrajectory;
  featured?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(
    () => featured && trajectory.kind === "coding-agent"
  );
  const reduce = usePrefersReducedMotion();
  const scrubId = useId();
  const step = trajectory.steps[index];
  const pauseOn = trajectory.kind === "coding-agent" ? trajectory.steps.length - 1 : -1;

  useEffect(() => {
    if (reduce || !playing) return;
    if (index >= pauseOn && pauseOn >= 0) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => {
      setIndex((value) => Math.min(value + 1, trajectory.steps.length - 1));
    }, 1400);
    return () => window.clearTimeout(id);
  }, [index, pauseOn, playing, reduce, trajectory.steps.length]);

  if (!step) return null;
  const progress = trajectory.steps.length > 1 ? index / (trajectory.steps.length - 1) : 1;
  const pausedHere = !playing && pauseOn >= 0 && index === pauseOn;

  const jump = (next: number) => {
    setPlaying(false);
    setIndex(next);
  };

  return (
    <figure className={`sakura-glass rounded-3xl ${featured ? "eval-theater p-7 md:p-10" : "p-6 md:p-8"}`}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="eyebrow">{featured ? "Fig. Eval theater" : "Fig. Pipeline"}</p>
        <p className="font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-muted)]">
          {pausedHere ? "Paused · recover" : trajectory.label}
        </p>
      </div>

      <div className="mt-8">
        <label className="sr-only" htmlFor={scrubId}>
          Scrub illustrative trajectory
        </label>
        <input
          id={scrubId}
          type="range"
          min={0}
          max={trajectory.steps.length - 1}
          step={1}
          value={index}
          onChange={(event) => jump(Number(event.target.value))}
          className="trajectory-range w-full"
          style={{
            background: `linear-gradient(to right, var(--sakura-accent-deep) ${progress * 100}%, var(--sakura-line-soft) ${progress * 100}%)`,
          }}
          aria-valuetext={`${step.time} ${step.title}`}
        />
      </div>

      <ol className="mt-6 flex flex-wrap gap-2">
        {trajectory.steps.map((item, i) => {
          const active = i === index;
          return (
            <li key={item.title}>
              <button
                type="button"
                onClick={() => jump(i)}
                aria-current={active ? "step" : undefined}
                className={`min-h-11 rounded-full border px-4 font-mono text-meta uppercase tracking-[.1em] transition-colors duration-200 ${
                  active
                    ? "border-transparent bg-[var(--sakura-accent-deep)] text-white"
                    : "border-[var(--sakura-line-soft)] bg-[var(--sakura-surface-soft)] text-[var(--sakura-ink-soft)] hover:text-[var(--sakura-accent-deep)]"
                }`}
              >
                {item.time} · {item.title}
              </button>
            </li>
          );
        })}
      </ol>

      <motion.div
        key={step.title}
        className="mt-8 grid lg:grid-cols-[7rem_minmax(0,1fr)] gap-4 lg:gap-8"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0.15 : 0.4, ease }}
      >
        <p className="font-mono text-meta tabular-nums uppercase tracking-[.12em] text-[var(--sakura-accent-deep)] pt-1">
          {step.time}
        </p>
        <div>
          <h3 className="font-display text-card-title">{step.title}</h3>
          <p className="mt-3 leading-7 text-[var(--sakura-ink-soft)]">{step.detail}</p>
          {trajectory.kind === "lar" && (step.textAction || step.latentAction) ? (
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[var(--sakura-line-soft)] bg-[var(--sakura-bg-deep)]/70 p-4">
                <p className="eyebrow">Text action</p>
                <p className="mt-3 font-mono text-sm leading-6 break-all">{step.textAction}</p>
              </div>
              <div className="rounded-2xl border border-[var(--sakura-line)] bg-[var(--sakura-surface-soft)] p-4">
                <p className="eyebrow">Latent action</p>
                <p className="mt-3 font-mono text-sm leading-6 break-all">{step.latentAction}</p>
              </div>
            </div>
          ) : null}
        </div>
      </motion.div>

      <figcaption className="mt-8 font-display italic text-base leading-7 text-[var(--sakura-ink-soft)]">
        {trajectory.kind === "lar"
          ? "Same trace, shorter verbs. Tool arguments stay in text."
          : pausedHere
            ? "The interesting step: recover instead of looping the same tools."
            : "Locate, edit, test, recover — one illustrative loop, not a raw log."}
      </figcaption>
    </figure>
  );
}
