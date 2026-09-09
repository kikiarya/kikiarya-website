"use client";

import { useState, type PointerEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Spring magnet for things the cursor touches. Atmosphere stays slow; this can be felt. */
export default function Magnetic({
  children,
  className = "",
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = usePrefersReducedMotion();
  const [delta, setDelta] = useState({ x: 0, y: 0 });

  const onMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    setDelta({
      x: clamp(dx * 0.18, -max, max),
      y: clamp(dy * 0.18, -max, max),
    });
  };

  return (
    <motion.span
      className={`inline-flex ${className}`}
      onPointerMove={onMove}
      onPointerLeave={() => setDelta({ x: 0, y: 0 })}
      animate={{ x: delta.x, y: delta.y }}
      transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.55 }}
    >
      {children}
    </motion.span>
  );
}
