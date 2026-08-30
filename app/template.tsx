"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "../components/motion/usePrefersReducedMotion";

const ease = [0.16, 1, 0.3, 1] as const;

/** New-page entrance behind the dissolving Route Veil (ui-motion-plan2 §14). */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.15 : 0.5, delay: 0.08, ease }}
    >
      {children}
    </motion.div>
  );
}
