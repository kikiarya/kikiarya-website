"use client";

import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useMotionScene } from "./MotionProvider";
import WorldEntry from "./WorldEntry";
import CoverTypewriter from "./CoverTypewriter";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import PetalField from "./PetalField";
import { CoverSweep } from "./CoverAtmosphere";

const ease = [0.2, 0.7, 0.2, 1] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function EntryGate() {
  const { phase, enter, enterWork, arriveFrom } = useMotionScene();
  const router = useRouter();
  const reduce = usePrefersReducedMotion();
  const visible = phase === "entry" || phase === "entering";
  const entering = phase === "entering";
  const arrivingBack = arriveFrom === "world";
  const instant = arrivingBack || reduce;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const [desktop, setDesktop] = useState(false);

  const goWorld = (href: string) => {
    if (phase !== "entry") return;
    enter();
    router.push(href);
  };

  useLayoutEffect(() => {
    if (!visible) return;
    window.scrollTo(0, 0);
  }, [visible]);

  useEffect(() => {
    const fine = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const sync = () => setDesktop(fine.matches);
    sync();
    fine.addEventListener("change", sync);
    return () => fine.removeEventListener("change", sync);
  }, []);

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

  const dollyIn = entering && !reduce;
  const introDelay = (base: number) => (instant ? 0 : base);

  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <motion.div
          key="entry-gate"
          role="dialog"
          aria-modal="true"
          aria-label="Enter Kikiarya"
          className="fixed inset-0 z-[70] overflow-hidden bg-[var(--sakura-bg)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.2 : 0.2, ease }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center will-change-transform"
            initial={
              reduce
                ? { opacity: 0 }
                : arrivingBack
                  ? { opacity: 0, scale: 1.08 }
                  : { opacity: 0, scale: 1 }
            }
            animate={
              dollyIn
                ? { opacity: 0, scale: 1.08 }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: reduce ? 0.25 : 0.7, ease }}
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

            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[5]"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 42%, rgba(82, 58, 68, 0.1) 100%)",
              }}
              animate={{ opacity: entering ? 0.45 : 0.14 }}
              transition={{ duration: reduce ? 0.2 : 0.7, ease }}
            />

            <PetalField nested />

            <div className="relative z-10 px-6 text-center">
              <motion.h1
                className="font-display text-[clamp(3.2rem,7vw,6.8rem)] font-light leading-none tracking-[-.04em]"
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                whileHover={reduce || entering ? undefined : { y: -2 }}
                transition={{ duration: reduce ? 0.25 : 0.7, delay: introDelay(0.45), ease }}
              >
                Kikiarya<span className="text-[var(--sakura-accent-deep)]">.</span>
              </motion.h1>

              <motion.p
                className="mx-auto mt-7 whitespace-nowrap font-display text-xl italic leading-snug text-[var(--sakura-ink-soft)] md:text-2xl"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0.25 : 0.55, delay: introDelay(0.8), ease }}
              >
                Desire is the prophet of the soul.
              </motion.p>

              <CoverTypewriter
                text="「欲望是灵魂的先知。」"
                delay={1200}
                entering={entering}
                instant={instant}
              />

              <motion.div
                className="mt-14 flex justify-center"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0.2 : 0.45, delay: introDelay(1.05), ease }}
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
                  Explore my work
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
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, delay: introDelay(1.22), ease }}
              >
                · ○ ·
              </motion.p>
            </div>

            <motion.div
              className="absolute bottom-[4.6rem] left-0 right-0 z-10 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduce ? 0.25 : 0.55, delay: introDelay(0.28), ease }}
            >
              <div className="flex flex-col items-center gap-3"><WorldEntry onNavigate={goWorld} /><button onClick={() => goWorld("/life")} className="text-sm text-[var(--sakura-ink-soft)]">Personal space ↗</button></div>
            </motion.div>
          </motion.div>

          <CoverSweep active={entering && !reduce} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
