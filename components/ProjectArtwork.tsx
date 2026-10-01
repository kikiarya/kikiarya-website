"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

const PLATES = [
  "01 / LATENT ACTIONS",
  "02 / EXECUTE · RECOVER",
  "03 / STATIC COMPRESSION",
] as const;

function Chip({
  children,
  tone = "plain",
}: {
  children: ReactNode;
  tone?: "plain" | "fill" | "soft";
}) {
  const toneClass =
    tone === "fill"
      ? "border-transparent bg-[var(--sakura-accent-deep)] text-white"
      : tone === "soft"
        ? "border-[var(--sakura-line)] bg-[color-mix(in_srgb,var(--sakura-accent)_14%,white)] text-[var(--sakura-accent-deep)]"
        : "border-[var(--sakura-line-soft)] bg-[var(--sakura-bg-deep)] text-[var(--sakura-ink)]";

  return (
    <span
      className={`inline-flex min-h-8 items-center justify-center rounded-xl border px-2.5 font-mono text-[0.62rem] uppercase tracking-[.08em] ${toneClass}`}
    >
      {children}
    </span>
  );
}

function Arrow() {
  return (
    <span aria-hidden="true" className="font-mono text-[0.7rem] text-[var(--sakura-muted)]">
      →
    </span>
  );
}

function MotionPanel({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.div
      className={`project-art-panel${wide ? " project-art-panel-wide" : ""}`}
      whileInView={reduce ? undefined : { y: [0, -5, 0] }}
      viewport={{ amount: 0.6 }}
      transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function LarPreview() {
  return (
    <div className="project-art-scene">
      <div className="project-art-col">
        <p className="project-art-label">Before</p>
        <Chip>Think</Chip>
        <Chip>Text</Chip>
        <Chip>Tool</Chip>
        <p className="project-art-note">long verbs</p>
      </div>

      <div className="project-art-bridge">
        <Arrow />
        <MotionPanel>
          <p className="project-art-label">Reparam</p>
          <Chip tone="soft">Filter</Chip>
          <Chip tone="fill">Distill</Chip>
          <Chip tone="soft">Keep args</Chip>
        </MotionPanel>
        <Arrow />
      </div>

      <div className="project-art-col">
        <p className="project-art-label">After</p>
        <Chip tone="fill">Latent</Chip>
        <Chip>Tool</Chip>
        <Chip tone="fill">Latent</Chip>
        <Chip>Tool</Chip>
        <p className="project-art-note">−27.1% tokens</p>
      </div>
    </div>
  );
}

function CodingPreview() {
  return (
    <div className="project-art-scene">
      <div className="project-art-col">
        <p className="project-art-label">Execute</p>
        <Chip>Task</Chip>
        <Chip tone="fill">Policy</Chip>
        <Chip>Tool</Chip>
        <Chip>Repo</Chip>
      </div>

      <div className="project-art-bridge">
        <Arrow />
        <MotionPanel>
          <p className="project-art-label">On fail</p>
          <Chip tone="soft">Observation</Chip>
          <Chip tone="fill">Recover</Chip>
          <p className="project-art-note">↺ back to policy</p>
        </MotionPanel>
        <Arrow />
      </div>

      <div className="project-art-col">
        <p className="project-art-label">Result</p>
        <Chip>Complete</Chip>
        <p className="project-art-note">+6pp resolve</p>
        <p className="project-art-note">−15% calls</p>
      </div>
    </div>
  );
}

function MemoryPreview() {
  return (
    <div className="project-art-scene">
      <div className="project-art-col">
        <Chip>Static prompt</Chip>
        <span aria-hidden="true" className="text-center text-[var(--sakura-muted)]">
          ↓
        </span>
        <Chip tone="soft">Repeated spans</Chip>
      </div>

      <div className="project-art-bridge">
        <Arrow />
        <MotionPanel wide>
          <p className="project-art-label">OpenClaw Compression</p>
          <div className="project-art-row">
            <Chip>Mine</Chip>
            <Chip tone="fill">Compress</Chip>
          </div>
          <div className="project-art-row">
            <Chip tone="soft">LoRA + KL</Chip>
            <Chip tone="soft">Evaluate</Chip>
          </div>
        </MotionPanel>
        <Arrow />
      </div>

      <div className="project-art-col">
        <Chip tone="fill">Strict EM</Chip>
        <p className="project-art-note">Quality / token cost</p>
      </div>
    </div>
  );
}

export default function ProjectArtwork({ index }: { index: number }) {
  const plate = index % 3;

  return (
    <div className={`project-art art-${plate}`} aria-hidden="true">
      {plate === 0 ? <LarPreview /> : plate === 1 ? <CodingPreview /> : <MemoryPreview />}
      <span>{PLATES[plate]}</span>
    </div>
  );
}
