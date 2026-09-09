"use client";

import { motion } from "framer-motion";
import Pearl from "./Pearl";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";

const ease = [0.16, 1, 0.3, 1] as const;

/** Print furniture: a margin tick or a pearl hairline. Not a card, not a sprig. */
export default function FolioRule({
  direction = "horizontal",
  className = "",
}: {
  direction?: "horizontal" | "vertical";
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();

  if (direction === "vertical") {
    return (
      <svg
        className={`h-full overflow-visible text-[var(--sakura-accent-deep)] ${className}`}
        width="8"
        height="100%"
        viewBox="0 0 8 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <motion.line
          x1="4"
          y1="0"
          x2="4"
          y2="100"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0, opacity: 0.25 }}
          whileInView={{ pathLength: 1, opacity: 0.45 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: reduce ? 0.01 : 0.9, ease }}
        />
      </svg>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 text-[var(--sakura-accent-deep)] ${className}`}
      aria-hidden="true"
    >
      <svg className="h-[2px] flex-1 overflow-visible" viewBox="0 0 100 2" preserveAspectRatio="none">
        <motion.line
          x1="0"
          y1="1"
          x2="100"
          y2="1"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0, opacity: 0.25 }}
          whileInView={{ pathLength: 1, opacity: 0.4 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: reduce ? 0.01 : 0.7, ease }}
        />
      </svg>
      <Pearl size={6} />
      <svg className="h-[2px] flex-1 overflow-visible" viewBox="0 0 100 2" preserveAspectRatio="none">
        <motion.line
          x1="0"
          y1="1"
          x2="100"
          y2="1"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0, opacity: 0.25 }}
          whileInView={{ pathLength: 1, opacity: 0.4 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: reduce ? 0.01 : 0.7, delay: reduce ? 0 : 0.08, ease }}
        />
      </svg>
    </div>
  );
}
