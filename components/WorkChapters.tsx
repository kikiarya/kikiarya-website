"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

export default function WorkChapters({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const nodes = [...root.querySelectorAll<HTMLElement>("[data-chapter]")];
    if (!nodes.length) return;

    setLabel(nodes[0]?.dataset.chapter ?? "");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const next = visible[0]?.target;
        if (next instanceof HTMLElement && next.dataset.chapter) {
          setLabel(next.dataset.chapter);
        }
      },
      { rootMargin: "-28% 0px -52% 0px", threshold: [0, 0.2, 0.6] }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="relative">
      {label ? (
        <p
          aria-hidden="true"
          className={`sticky top-20 z-10 -mx-1 mb-10 py-2.5 font-mono text-meta uppercase tracking-[.14em] text-[var(--sakura-accent-deep)] ${
            reduce ? "bg-[var(--sakura-bg)]" : "bg-[var(--sakura-bg)]/80 backdrop-blur-sm"
          }`}
        >
          {label}
        </p>
      ) : null}
      {children}
    </div>
  );
}
