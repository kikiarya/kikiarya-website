"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

const COVERS = [
  {
    label: "01 / RESEARCH PAPER",
    identity: "NEURIPS 2026 · POSTER",
    footer: "TEXT ACTIONS → LATENT ACTIONS",
    metric: "−27.1% action tokens",
  },
  {
    label: "02 / AGENT RUNTIME",
    identity: "FAILURE-AWARE",
    footer: "FAIL → REPLAN → VERIFY",
    metric: "+6pp resolve rate",
  },
  {
    label: "03 / CONTEXT STUDY",
    identity: "OPENCLAW",
    footer: "REPEATED CONTEXT → COMPACT TOKENS",
    metric: "quality / cost",
  },
] as const;

function LarPreview() {
  return (
    <div className="project-cover project-cover-lar">
      <p className="project-cover-kicker">Compress the verbs. Keep the tools.</p>
      <motion.div
        className="project-cover-monogram"
        initial={{ opacity: 0.28, y: 6 }}
        whileInView={{ opacity: 0.72, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.9 }}
      >
        LAR
      </motion.div>
      <div className="trajectory-glimpse">
        <span>THINK</span><span>READ</span><span>RETRIEVE</span><i />
        <strong>LATENT</strong><b>TOOL</b><strong>LATENT</strong><b>TOOL</b>
      </div>
    </div>
  );
}

function CodingPreview() {
  const reduce = usePrefersReducedMotion();

  return (
    <div className="project-cover project-cover-coding">
      <p className="project-cover-kicker">A failed run still has useful state.</p>
      <div className="recovery-window">
        <div className="recovery-window-bar"><i /><i /><i /><span>agent-run / 004</span></div>
        <div className="recovery-log">
          <span><b>01</b> locate failing test</span>
          <span className="is-failed"><b>02</b> test failed</span>
          <motion.span
            className="is-recovery"
            animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          ><b>03</b> restore checkpoint · replan</motion.span>
          <span className="is-passed"><b>04</b> verification passed</span>
        </div>
      </div>
    </div>
  );
}

function MemoryPreview() {
  return (
    <div className="project-cover project-cover-compression">
      <p className="project-cover-kicker">The prompt repeats. The representation does not.</p>
      <div className="compression-contrast">
        <div className="context-stack" aria-hidden="true">
          <i /><i /><i /><i /><i />
          <span>STATIC CONTEXT</span>
        </div>
        <span className="compression-mark">→</span>
        <div className="compact-stack" aria-hidden="true">
          <strong>&lt;seg_1&gt;</strong>
          <strong>&lt;seg_2&gt;</strong>
          <span>TOOL ARGS STAY TEXT</span>
        </div>
      </div>
    </div>
  );
}

function OverviewCover({ index }: { index: number }) {
  const captions = ["更短的动作，照常执行", "失败之后，接着做", "把重复的上下文收起来"];
  return <div className={`project-art overview-art overview-art-${index}`} aria-hidden="true">
    <span className="overview-art-number">0{index + 1}</span>
    <div className="overview-art-symbol">
      {index === 0 ? <span className="overview-lar">LAR<span className="overview-lar-rule" /></span>
        : index === 1 ? <svg viewBox="0 0 240 160" fill="none"><path d="M65 45 25 80l40 35M175 45l40 35-40 35" className="overview-code-bracket" /><path d="M143 59a31 31 0 1 0 5 37M143 59v-20M143 59h-20" className="overview-code-recovery" /></svg>
        : <div className="overview-paper-stack"><span /><span /><span><i /><i /><i /></span></div>}
    </div>
    <p className="overview-art-caption">{captions[index]}</p>
  </div>;
}

export default function ProjectArtwork({ index, minimal = false }: { index: number; minimal?: boolean }) {
  if (minimal) return <OverviewCover index={index % 3} />;
  const plate = index % COVERS.length;
  const meta = COVERS[plate];

  return (
    <div className={`project-art art-${plate}`} data-art={plate} aria-hidden="true">
      <div className="project-art-grid" />
      <div className="project-art-topline">
        <span>{meta.label}</span>
        <span>{meta.identity}</span>
      </div>
      <div className="project-art-body">
        {plate === 0 ? <LarPreview /> : plate === 1 ? <CodingPreview /> : <MemoryPreview />}
      </div>
      <div className="project-art-caption">
        <span>{meta.footer}</span>
        <strong>{meta.metric}</strong>
      </div>
    </div>
  );
}
