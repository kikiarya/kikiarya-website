"use client";

import type { MouseEvent } from "react";
import Container from "./Container";
import { useMotionScene } from "./motion/MotionProvider";

export default function Footer() {
  const { isCover, returnToCover } = useMotionScene();

  const handleCover = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    returnToCover();
  };

  return (
    <footer
      className="mt-24 border-t border-[var(--sakura-line-soft)]"
      aria-hidden={isCover}
      style={{ pointerEvents: isCover ? "none" : "auto" }}
    >
      <Container className="py-10 flex flex-col sm:flex-row justify-between gap-4 text-[var(--sakura-muted)]">
        <a
          href="/"
          onClick={handleCover}
          className="font-display text-lg transition-colors duration-200 hover:text-[var(--sakura-accent-deep)]"
          aria-label="Back to cover"
        >
          Kikiarya.
        </a>
        <div className="font-mono text-meta uppercase tracking-[.12em] flex flex-wrap gap-5">
          <a
            href="mailto:kikiarya@163.com"
            className="transition-colors duration-200 hover:text-[var(--sakura-accent-deep)]"
          >
            Email
          </a>
          <span className="tabular-nums">© 2026</span>
          <span className="tabular-nums">Updated Aug 2026</span>
        </div>
      </Container>
    </footer>
  );
}
