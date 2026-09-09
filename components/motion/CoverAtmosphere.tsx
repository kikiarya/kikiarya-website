"use client";

import { motion } from "framer-motion";

const ease = [0.2, 0.7, 0.2, 1] as const;

export function CoverSweep({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[80] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.42 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-y-[-10%] -left-1/3 w-[160%]"
        style={{
          background:
            "linear-gradient(105deg, transparent 8%, rgba(255,236,241,.35) 28%, rgba(249,231,237,.55) 48%, rgba(169,71,109,.1) 52%, rgba(255,247,248,.5) 62%, transparent 88%)",
        }}
        initial={{ x: "-70%", rotate: -8 }}
        animate={{ x: "55%", rotate: -4 }}
        transition={{ duration: 0.68, ease }}
      />
    </motion.div>
  );
}
