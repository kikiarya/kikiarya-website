"use client";

import { smoothScrollTo } from "../motion/SmoothScroll";

export type NodeCopy = {
  title: string;
  body: string;
  path?: string;
  evaluationHref?: string;
};

export default function DiagramReadout({
  copy,
}: {
  copy: NodeCopy;
}) {
  return (
    <div
      className="diagram-readout mt-6 rounded-[1.15rem] border border-[var(--sakura-line)] bg-[var(--sakura-paper-soft)] px-5 py-4"
      aria-live="polite"
    >
      <p className="font-display text-xl leading-snug text-[var(--sakura-ink)]">{copy.title}</p>
      {copy.path ? (
        <p className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-[.14em] text-[var(--sakura-accent-deep)]">
          {copy.path}
        </p>
      ) : null}
      <p className="mt-3 text-sm leading-7 text-[var(--sakura-ink-soft)]">{copy.body}</p>
      {copy.evaluationHref ? (
        <button
          type="button"
          className="mt-3 font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-accent-deep)] underline-offset-4 hover:underline"
          onClick={(event) => {
            event.stopPropagation();
            smoothScrollTo(copy.evaluationHref!);
          }}
        >
          See evaluation
        </button>
      ) : null}
    </div>
  );
}
