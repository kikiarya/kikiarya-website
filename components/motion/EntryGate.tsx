"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useMotionScene } from "./MotionProvider";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Entry Gate (ui-motion-plan2 §2-3): a quiet "foyer" shown once per browser
 * session before the index. Clicking ENTER plays the Sakura aperture
 * transition, then the gate dissolves and the home opening sequence begins.
 */
export default function EntryGate() {
  const { phase, enter } = useMotionScene();
  const reduce = useReducedMotion();
  const visible = phase === "entry" || phase === "entering";
  const entering = phase === "entering";

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="entry-gate"
          role="dialog"
          aria-modal="true"
          aria-label="Enter Kikiarya"
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden"
          style={{ background: "var(--sakura-bg-gradient)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.5, ease }}
        >
          {/* Sakura glow, breathing (§2.2) */}
          <div
            aria-hidden="true"
            className="absolute inset-[-12%]"
            style={{
              background:
                "radial-gradient(circle at 24% 24%, rgba(255,255,255,.72), transparent 22%), radial-gradient(circle at 72% 28%, rgba(216,132,159,.26), transparent 30%), radial-gradient(circle at 62% 78%, rgba(255,221,230,.6), transparent 32%)",
              filter: "blur(36px)",
              animation: reduce
                ? undefined
                : "sakura-breath 14s ease-in-out infinite alternate",
            }}
          />

          {/* Two faint decorative forms, very slow drift */}
          <motion.div
            aria-hidden="true"
            className="absolute right-[12%] top-[16%] h-44 w-44 rounded-full border border-[var(--sakura-line)]"
            animate={reduce ? undefined : { y: [0, -10, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-[14%] left-[10%] h-24 w-24 rounded-full border border-[var(--sakura-line-soft)]"
            style={{ background: "rgba(255,227,235,.4)" }}
            animate={reduce ? undefined : { y: [0, 8, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Sakura aperture bloom, expands on ENTER (§3.3) */}
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-80 w-80 -ml-40 -mt-40 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,247,249,.96) 0%, rgba(216,132,159,.4) 46%, transparent 72%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={entering ? { scale: 9, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.62, delay: 0.12, ease }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-40 w-40 -ml-20 -mt-20 rounded-full border border-[var(--sakura-accent)]"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={entering ? { scale: 10, opacity: [0, 0.5, 0] } : { scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease }}
          />

          {/* Content */}
          <motion.div
            className="relative px-6 text-center"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={
              entering
                ? { opacity: 0, y: -8, transition: { duration: 0.4, delay: 0.08, ease } }
                : { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.1, ease } }
            }
          >
            <h1 className="font-display text-[clamp(3.2rem,7vw,6.8rem)] font-light leading-none tracking-[-.04em]">
              Kikiarya<span className="text-[var(--sakura-accent-deep)]">.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-md font-display text-xl italic leading-snug text-[var(--sakura-ink-soft)] md:text-2xl">
              A quiet interface for AI, software and experiments.
            </p>
            <button
              autoFocus
              onClick={enter}
              disabled={entering}
              className="button-primary mt-14"
            >
              Enter <ArrowDownRight size={15} />
            </button>
          </motion.div>

          <motion.p
            className="absolute bottom-9 left-0 right-0 text-center font-mono text-meta uppercase tracking-[.22em] text-[var(--sakura-muted)]"
            initial={{ opacity: 0 }}
            animate={
              entering
                ? { opacity: 0, transition: { duration: 0.3, ease } }
                : { opacity: 1, transition: { duration: 0.9, delay: 0.5, ease } }
            }
          >
            Sydney · AI &amp; Software · 2026
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
