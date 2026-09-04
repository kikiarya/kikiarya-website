"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

const ease = [0.16, 1, 0.3, 1] as const;

/** Letterhead unfolds once on first view. Paper, not a stamp. */
export default function ResumeUnfold({ children }: { children: ReactNode }) {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0.35, clipPath: "inset(0 0 100% 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: reduce ? 0.15 : 1.05, ease }}
    >
      {children}
    </motion.div>
  );
}
