"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { useMotionScene } from "./motion/MotionProvider";

/** Hides and freezes the site while Cover is up so it cannot be scrolled into. */
export default function SiteFrame({ children }: { children: ReactNode }) {
  const { isCover } = useMotionScene();

  useLayoutEffect(() => {
    const html = document.documentElement;
    if (!isCover) {
      html.classList.remove("cover-locked");
      document.body.style.overflow = "";
      window.__lenis?.start();
      return;
    }

    html.classList.add("cover-locked");
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    window.__lenis?.stop();

    const block = (event: Event) => {
      event.preventDefault();
    };
    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });

    return () => {
      html.classList.remove("cover-locked");
      document.body.style.overflow = "";
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
    };
  }, [isCover]);

  return (
    <div
      className="min-h-screen flex flex-col"
      inert={isCover ? true : undefined}
      aria-hidden={isCover}
      style={isCover ? { visibility: "hidden" } : undefined}
    >
      {children}
    </div>
  );
}
