"use client";

import type { MouseEvent } from "react";
import Container from "./Container";
import { useMotionScene } from "./motion/MotionProvider";
import ShortcutHint from "./ShortcutHint";
import { site } from "../lib/site";

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
          className="inline-flex items-center font-display text-lg transition-colors duration-200 hover:text-[var(--sakura-accent-deep)]"
          aria-label="Back to cover"
        >
          Kikiarya.
        </a>
        <div className="font-mono text-meta uppercase tracking-[.12em] flex flex-wrap items-center gap-5">
          <a
            href={`mailto:${site.email}`}
            className="transition-colors duration-200 hover:text-[var(--sakura-accent-deep)]"
          >
            Email
          </a>
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="transition-colors duration-200 hover:text-[var(--sakura-accent-deep)]"
          >
            GitHub
          </a>
          <span className="hidden md:inline-flex items-center gap-2 text-[var(--sakura-muted-soft)]">
            <ShortcutHint />
          </span>
          <span className="tabular-nums">© 2026</span>
          <span className="tabular-nums">Updated Aug 2026</span>
        </div>
      </Container>
    </footer>
  );
}
