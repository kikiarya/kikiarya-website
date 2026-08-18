"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Projects scene atmosphere (ui-motion-plan2 §8): extremely subtle rings and
 * blurred sakura glow behind content sections. Decorative only — content
 * stays at 100% prominence, forms at ~8-15%.
 */
export default function SceneDecor({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

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
    </div>
  );
}
