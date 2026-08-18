"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Programmatic scene scroll used by "View work" (ui-motion-plan2 §7.4). */
export function smoothScrollTo(selector: string) {
  const target = document.querySelector<HTMLElement>(selector);
  if (!target) return;
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduced) {
    target.scrollIntoView();
    return;
  }
  if (window.__lenis) {
    window.__lenis.scrollTo(target, {
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

/** Lenis inertia scrolling — desktop fine-pointer only, off under reduced motion (§17). */
export default function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const lenis = new Lenis({ lerp: 0.1 });
    window.__lenis = lenis;

    let frame = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, [reduce]);

  return null;
}
