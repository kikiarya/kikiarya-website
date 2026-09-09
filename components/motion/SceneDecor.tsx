"use client";

import { motion } from "framer-motion";
import Pearl from "../decor/Pearl";
import SilkRibbon from "../decor/SilkRibbon";
import Sparkle from "../decor/Sparkle";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Section atmosphere: slow rings and glow, plus a few plate ornaments.
 * Content stays primary; these sit at ~8–15% presence.
 */
export default function SceneDecor({ className = "" }: { className?: string }) {
  const reduce = usePrefersReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute -right-28 top-14 h-96 w-96 rounded-full border border-[var(--sakura-line-soft)]"
        style={{ opacity: 0.5 }}
        animate={reduce ? undefined : { y: [0, -18, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-6 top-64 h-24 w-24 rounded-full border border-[var(--sakura-line-soft)]"
        style={{ opacity: 0.4 }}
        animate={reduce ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-36 bottom-6 h-[26rem] w-[26rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(216,132,159,.13), transparent 64%)",
          filter: "blur(18px)",
        }}
        animate={reduce ? undefined : { y: [0, 14, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-[8%] top-[18%] hidden w-[42%] text-[var(--sakura-accent-deep)] md:block"
        style={{ opacity: 0.22 }}
        animate={reduce ? undefined : { x: [0, 8, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      >
        <SilkRibbon width={220} flowing={!reduce} />
      </motion.div>
      <motion.span
        className="absolute right-[12%] top-[22%] text-[var(--sakura-accent)]"
        animate={reduce ? { opacity: 0.35 } : { opacity: [0.28, 0.55, 0.28] }}
        transition={reduce ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Pearl size={8} />
      </motion.span>
      <motion.span
        className="absolute bottom-[18%] left-[14%] text-[var(--sakura-accent)]"
        animate={reduce ? { opacity: 0.3 } : { opacity: [0.22, 0.5, 0.22], y: [0, -6, 0] }}
        transition={reduce ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkle size={11} points={4} />
      </motion.span>
    </div>
  );
}
