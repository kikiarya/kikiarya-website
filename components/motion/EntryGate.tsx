"use client";

import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useMotionScene } from "./MotionProvider";
import WorldEntry from "./WorldEntry";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import {
  CoverIdlePetals,
  CoverLace,
  CoverOpeningPetals,
  CoverRibbonLayer,
  CoverSweep,
} from "./CoverAtmosphere";

const ease = [0.2, 0.7, 0.2, 1] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function EntryGate() {
  const { phase, enter, enterWork } = useMotionScene();
  const router = useRouter();
  const reduce = usePrefersReducedMotion();
  const visible = phase === "entry" || phase === "entering";
  const entering = phase === "entering";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const [desktop, setDesktop] = useState(false);
  const [compact, setCompact] = useState(false);

  const goWorld = (href: string) => {
    if (phase !== "entry") return;
    enter();
    router.push(href);
  };

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [visible]);

  useEffect(() => {
    const fine = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const narrow = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      setDesktop(fine.matches);
      setCompact(narrow.matches);
    };
    sync();
    fine.addEventListener("change", sync);
    narrow.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      narrow.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!visible || reduce || !desktop) return;
    const onMove = (event: globalThis.PointerEvent) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2;
      const ny = (event.clientY / window.innerHeight - 0.5) * 2;
      setParallax({ x: nx, y: ny });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [visible, reduce, desktop]);

  const handleMagnet = (event: PointerEvent<HTMLButtonElement>) => {
    if (reduce || !desktop || entering) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    setMagnet({
      x: clamp(dx * 0.18, -6, 6),
      y: clamp(dy * 0.18, -5, 5),
    });
  };

  const resetMagnet = () => setMagnet({ x: 0, y: 0 });

  const handleEnter = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (entering) return;
    enterWork();
  };

  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <motion.div
          key="entry-gate"
          role="dialog"
          aria-modal="true"
          aria-label="Enter Kikiarya"
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden"
          style={{ background: "var(--sakura-bg-gradient)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.2 : 0.45, ease }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-[-12%]"
            style={{
              background:
                "radial-gradient(circle at 24% 24%, rgba(255,255,255,.72), transparent 22%), radial-gradient(circle at 72% 28%, rgba(216,132,159,.26), transparent 30%), radial-gradient(circle at 62% 78%, rgba(255,221,230,.6), transparent 32%)",
              filter: "blur(36px)",
              animation: reduce ? undefined : "sakura-breath 14s ease-in-out infinite alternate",
            }}
          />

          <CoverOpeningPetals reduce={reduce} entering={entering} />
          <CoverIdlePetals
            reduce={reduce}
            entering={entering}
            parallax={desktop && !reduce ? parallax : { x: 0, y: 0 }}
            mobile={compact}
          />
          <CoverRibbonLayer
            side="left"
            reduce={reduce}
            entering={entering}
            parallax={desktop && !reduce ? parallax : { x: 0, y: 0 }}
            compact={compact}
          />
          <CoverRibbonLayer
            side="right"
            reduce={reduce}
            entering={entering}
            parallax={desktop && !reduce ? parallax : { x: 0, y: 0 }}
            compact={compact}
          />
          <CoverLace reduce={reduce} entering={entering} />

          <div className="relative z-10 px-6 text-center">
            <motion.h1
              className="font-display text-[clamp(3.2rem,7vw,6.8rem)] font-light leading-none tracking-[-.04em]"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={
                entering
                  ? { opacity: 0, y: -6, filter: "blur(2px)" }
                  : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              transition={{ duration: reduce ? 0.25 : 0.7, delay: reduce ? 0 : 0.45, ease }}
            >
              Kikiarya<span className="text-[var(--sakura-accent-deep)]">.</span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-7 whitespace-nowrap font-display text-xl italic leading-snug text-[var(--sakura-ink-soft)] md:text-2xl"
              initial={{ opacity: 0, y: reduce ? 0 : 6 }}
              animate={entering ? { opacity: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0.25 : 0.55, delay: reduce ? 0.05 : 0.8, ease }}
            >
              The things I make live here.
            </motion.p>

            <motion.div
              className="mt-14 flex justify-center"
              initial={{ opacity: 0, y: reduce ? 0 : 6 }}
              animate={entering ? { opacity: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0.2 : 0.45, delay: reduce ? 0.08 : 1.05, ease }}
            >
              <motion.button
                ref={buttonRef}
                autoFocus
                onClick={handleEnter}
                disabled={entering}
                onPointerMove={handleMagnet}
                onPointerLeave={resetMagnet}
                className="button-primary group"
                animate={{ x: magnet.x, y: magnet.y, scale: entering ? 0.99 : 1 }}
                whileHover={
                  reduce ? undefined : { scale: 1.015, boxShadow: "0 12px 28px -12px rgba(169,71,109,.48)" }
                }
                transition={{ duration: 0.28, ease }}
              >
                Enter
                <ArrowDownRight
                  size={15}
                  className="transition-transform duration-300 ease-out group-hover:translate-x-[3px] group-hover:translate-y-[3px]"
                />
              </motion.button>
            </motion.div>

            <motion.p
              aria-hidden="true"
              className="mt-8 font-display text-sm tracking-[0.45em] text-[var(--sakura-accent)]/45"
              initial={{ opacity: 0 }}
              animate={entering ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.45, delay: reduce ? 0.1 : 1.22, ease }}
            >
              · ○ ·
            </motion.p>
          </div>

          <motion.div
            className="absolute bottom-[4.6rem] left-0 right-0 z-10 flex justify-center"
            initial={{ opacity: 0 }}
            animate={entering ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: reduce ? 0.25 : 0.55, delay: reduce ? 0.12 : 0.28, ease }}
          >
            <WorldEntry onNavigate={goWorld} />
          </motion.div>

          <motion.p
            className="absolute bottom-7 left-0 right-0 z-10 text-center font-mono text-meta uppercase tracking-[.22em] text-[var(--sakura-muted)]"
            initial={{ opacity: 0 }}
            animate={entering ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: reduce ? 0.2 : 0.5, delay: reduce ? 0.12 : 1.65, ease }}
          >
            Sydney · AI &amp; Software · 2026
          </motion.p>

          <CoverSweep active={entering && !reduce} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
