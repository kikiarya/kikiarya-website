"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/** Slow blush orb. Rests on the CTA row; eases toward the pointer. */
export default function HeroGlow({
  target,
  anchor,
}: {
  target: RefObject<HTMLElement | null>;
  anchor?: RefObject<HTMLElement | null>;
}) {
  const reduce = usePrefersReducedMotion();
  const x = useMotionValue(0.22);
  const y = useMotionValue(0.78);
  const restX = useRef(0.22);
  const restY = useRef(0.78);
  const sx = useSpring(x, { stiffness: 18, damping: 28, mass: 1.4 });
  const sy = useSpring(y, { stiffness: 18, damping: 28, mass: 1.4 });
  const left = useTransform(sx, (v) => `${v * 100}%`);
  const top = useTransform(sy, (v) => `${v * 100}%`);
  const ticking = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const node = target.current;
    if (!node) return;

    const syncRest = () => {
      const cta = anchor?.current;
      if (!cta) return;
      const hero = node.getBoundingClientRect();
      const box = cta.getBoundingClientRect();
      if (hero.width < 1 || hero.height < 1) return;
      restX.current = (box.left + box.width / 2 - hero.left) / hero.width;
      restY.current = (box.top + box.height / 2 - hero.top) / hero.height;
    };

    syncRest();
    x.set(restX.current);
    y.set(restY.current);
    const settled = window.setTimeout(syncRest, 200);

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

    const onLeave = () => {
      x.set(restX.current);
      y.set(restY.current);
    };

    node.addEventListener("pointermove", onMove, { passive: true });
    node.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", syncRest);
    return () => {
      window.clearTimeout(settled);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", syncRest);
    };
  }, [reduce, target, anchor, x, y]);

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
