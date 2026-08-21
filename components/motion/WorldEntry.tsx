"use client";

import { useState, type FocusEvent, type MouseEvent } from "react";
import { motion } from "framer-motion";

/** Editorial, floating easing — soft and deliberate, never snappy. */
const easeWorld = [0.22, 1, 0.36, 1] as const;

/** Minimal five-petal sakura mark. */
function SakuraFlower() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((angle) => (
        <path
          key={angle}
          d="M12 3.2C14.1 5.3 14.1 8.6 12 10.6C9.9 8.6 9.9 5.3 12 3.2Z"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
      <circle cx="12" cy="12" r="1.7" />
    </svg>
  );
}

function WorldLink({
  label,
  href,
  side,
  open,
  onNavigate,
}: {
  label: string;
  href: string;
  side: "left" | "right";
  open: boolean;
  onNavigate: (href: string) => void;
}) {
  const closedX = side === "left" ? 10 : -10;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate(href);
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={`group absolute top-1/2 -translate-y-1/2 font-mono text-meta uppercase tracking-[.18em] text-[var(--sakura-ink-soft)] ${
        side === "left" ? "right-[calc(50%+46px)]" : "left-[calc(50%+46px)]"
      }`}
      initial={false}
      animate={
        open
          ? { opacity: 0.65, x: 0 }
          : { opacity: 0, x: closedX }
      }
      whileHover={{ opacity: 1, y: -2 }}
      transition={{
        duration: open ? 0.55 : 0.42,
        delay: open ? 0.1 : 0,
        ease: easeWorld,
      }}
      style={{ pointerEvents: open ? "auto" : "none" }}
    >
      {label}
      <span className="absolute -bottom-1.5 left-1/2 h-px w-4 -translate-x-1/2 origin-center scale-x-0 bg-[var(--sakura-accent-deep)] transition-transform duration-300 group-hover:scale-x-100" />
    </motion.a>
  );
}

/**
 * Second-world entrance on the Entry Gate (Unseen `UNSEEN ◉ WORLD`,
 * translated to Sakura): a single flower at rest; hover releases NOTES and
 * LIFE from behind it; leave folds everything back into one flower.
 */
export default function WorldEntry({
  onNavigate,
}: {
  onNavigate: (href: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpen(false);
    }
  };

  return (
    <div
      className="relative flex h-16 w-[280px] items-center justify-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={handleBlur}
    >
      <WorldLink label="Notes" href="/notes" side="left" open={open} onNavigate={onNavigate} />

      {/* Central flower — the anchor; inverts on hover, never moves */}
      <motion.button
        type="button"
        aria-expanded={open}
        aria-label="Personal world — Notes and Life"
        onClick={() => setOpen((value) => !value)}
        className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full border backdrop-blur-sm"
        initial={false}
        animate={{
          scale: open ? 1.05 : 1,
          backgroundColor: open ? "#8f3d5d" : "rgba(255,252,253,0.88)",
          borderColor: open ? "rgba(143,61,93,0.55)" : "rgba(177,79,113,0.16)",
        }}
        transition={{ duration: 0.2, ease: easeWorld }}
        style={{ boxShadow: "0 12px 32px -14px rgba(169,71,109,.3)" }}
      >
        <motion.span
          className="inline-flex"
          initial={false}
          animate={{ color: open ? "#fff7f8" : "#a9476d" }}
          transition={{ duration: 0.25, ease: easeWorld }}
        >
          <SakuraFlower />
        </motion.span>
      </motion.button>

      <WorldLink label="Life" href="/life" side="right" open={open} onNavigate={onNavigate} />
    </div>
  );
}
