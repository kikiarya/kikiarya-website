"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ProjectTrajectory } from "../lib/projects";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

const ease = [0.16, 1, 0.3, 1] as const;
const LAR_STEP_MS = 1700;
const LAR_HOLD_MS = 2400;

const SCRIPT_INDEX: Record<string, string> = {
  "t₁": "T1",
  "t₂": "T2",
  "t₃": "T3",
};

function StepScript({
  time,
  className = "",
}: {
  time: string;
  className?: string;
}) {
  const mark = SCRIPT_INDEX[time] ?? time;
  return (
    <span className={`font-script leading-none ${className}`}>
      {mark}
    </span>
  );
}

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
  const rootRef = useRef<HTMLElement>(null);
  const userStopped = useRef(false);
  const step = trajectory.steps[index];
  const last = trajectory.steps.length - 1;
  const pauseOn = trajectory.kind === "coding-agent" ? last : -1;
  const isLar = trajectory.kind === "lar";

  useEffect(() => {
    if (!isLar || reduce) return;
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry || userStopped.current) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.32) {
          setPlaying(true);
        } else {
          setPlaying(false);
        }
      },
      { threshold: [0.2, 0.32, 0.55] }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [isLar, reduce]);

  useEffect(() => {
    if (reduce || !playing) return;
    if (trajectory.kind === "coding-agent" && index >= pauseOn && pauseOn >= 0) {
      setPlaying(false);
      return;
    }
    if (isLar && index >= last) {
      const hold = window.setTimeout(() => {
        if (userStopped.current) return;
        setIndex(0);
      }, LAR_HOLD_MS);
      return () => window.clearTimeout(hold);
    }
    const id = window.setTimeout(() => {
      setIndex((value) => Math.min(value + 1, last));
    }, isLar ? LAR_STEP_MS : 1400);
    return () => window.clearTimeout(id);
  }, [index, isLar, last, pauseOn, playing, reduce, trajectory.kind]);

  if (!step) return null;
  const progress = trajectory.steps.length > 1 ? index / (trajectory.steps.length - 1) : 1;
  const pausedHere = !playing && pauseOn >= 0 && index === pauseOn;

  const jump = (next: number) => {
    userStopped.current = true;
    setPlaying(false);
    setIndex(next);
  };

  return (
    <figure
      ref={rootRef}
      className={`sakura-glass rounded-3xl ${featured ? "eval-theater p-7 md:p-10" : "p-6 md:p-8"}`}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="eyebrow">{featured ? "Fig. Eval theater" : "Fig. Pipeline"}</p>
        <p className="font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-muted)]">
          {pausedHere
            ? "Paused · recover"
            : isLar && playing
              ? "Playing"
              : trajectory.label}
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
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 transition-colors duration-200 ${
                  active
                    ? "border-transparent bg-[var(--sakura-accent-deep)] text-white"
                    : "border-[var(--sakura-line-soft)] bg-[var(--sakura-surface-soft)] text-[var(--sakura-ink-soft)] hover:text-[var(--sakura-accent-deep)]"
                }`}
              >
                {trajectory.kind === "lar" ? (
                  <>
                    <StepScript
                      time={item.time}
                      className={active ? "text-[1.55rem] text-white" : "text-[1.55rem] text-[var(--sakura-accent-deep)]"}
                    />
                    <span className="font-mono text-meta uppercase tracking-[.1em]">
                      {item.title}
                    </span>
                  </>
                ) : (
                  <span className="font-mono text-meta uppercase tracking-[.1em]">
                    {item.time} · {item.title}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>

      <motion.div
        key={step.title}
        className={`mt-8 grid gap-4 lg:gap-8 ${
          trajectory.kind === "lar"
            ? "lg:grid-cols-[5.5rem_minmax(0,1fr)]"
            : "lg:grid-cols-[7rem_minmax(0,1fr)]"
        }`}
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0.15 : 0.4, ease }}
      >
        {trajectory.kind === "lar" ? (
          <StepScript time={step.time} className="pt-1 text-[3.15rem] text-[var(--sakura-accent-deep)] md:text-[3.6rem]" />
        ) : (
          <p className="font-mono text-meta tabular-nums uppercase tracking-[.12em] text-[var(--sakura-accent-deep)] pt-1">
            {step.time}
          </p>
        )}
        <div>
          <h3 className="font-display text-card-title">{step.title}</h3>
          <p className="mt-3 leading-7 text-[var(--sakura-ink-soft)]">{step.detail}</p>
          {trajectory.kind === "lar" && (step.textAction || step.latentAction) ? (
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[var(--sakura-line-soft)] bg-[var(--sakura-bg-deep)]/70 p-4">
                <p className="font-display italic text-base text-[var(--sakura-accent-deep)]">
                  Text action
                </p>
                <p className="mt-3 font-display text-[1.2rem] italic leading-snug text-[var(--sakura-ink)] break-words">
                  {step.textAction}
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--sakura-line)] bg-[var(--sakura-surface-soft)] p-4">
                <p className="font-display italic text-base text-[var(--sakura-accent-deep)]">
                  Latent action
                </p>
                <p className="mt-3 font-display text-[1.2rem] italic leading-snug text-[var(--sakura-ink)] break-words">
                  {step.latentAction}
                </p>
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
