"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** Slow blush orb that eases toward the pointer. Hero atmosphere only. */
export default function HeroGlow({ target }: { target: RefObject<HTMLElement | null> }) {
  const reduce = usePrefersReducedMotion();
  const x = useMotionValue(0.72);
  const y = useMotionValue(0.22);
  const sx = useSpring(x, { stiffness: 18, damping: 28, mass: 1.4 });
  const sy = useSpring(y, { stiffness: 18, damping: 28, mass: 1.4 });
  const left = useTransform(sx, (v) => `${v * 100}%`);
  const top = useTransform(sy, (v) => `${v * 100}%`);
  const ticking = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const node = target.current;
    if (!node) return;

    const onMove = (event: PointerEvent) => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        x.set((event.clientX - rect.left) / rect.width);
        y.set((event.clientY - rect.top) / rect.height);
        ticking.current = false;
      });
    };

    node.addEventListener("pointermove", onMove, { passive: true });
    return () => node.removeEventListener("pointermove", onMove);
  }, [reduce, target, x, y]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
    >
      <motion.div
        className="absolute h-[28rem] w-[28rem] -ml-[14rem] -mt-[14rem] rounded-full"
        style={{
          left,
          top,
          background:
            "radial-gradient(circle, rgba(216,132,159,.22) 0%, rgba(216,132,159,.08) 38%, transparent 68%)",
          filter: "blur(12px)",
        }}
      />
    </motion.div>
  );
}
