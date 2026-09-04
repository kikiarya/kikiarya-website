"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * 8–16px glass highlight that follows the pointer. No tilt, no extra scale.
 */
export default function SpecularRoot() {
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let current: HTMLElement | null = null;

    const clear = () => {
      if (!current) return;
      current.style.removeProperty("--spot-x");
      current.style.removeProperty("--spot-y");
      current = null;
    };

    const onMove = (event: PointerEvent) => {
      const next = (event.target as HTMLElement | null)?.closest?.(
        ".sakura-glass"
      ) as HTMLElement | null;
      if (current && current !== next) clear();
      if (!next) return;
      current = next;
      const box = next.getBoundingClientRect();
      next.style.setProperty("--spot-x", `${event.clientX - box.left}px`);
      next.style.setProperty("--spot-y", `${event.clientY - box.top}px`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", clear);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", clear);
      clear();
    };
  }, [reduce]);

  return null;
}
