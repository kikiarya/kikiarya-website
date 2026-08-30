"use client";

import { motion } from "framer-motion";
import LaceDivider from "../decor/LaceDivider";

const ease = [0.2, 0.7, 0.2, 1] as const;

function PetalMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((angle) => (
        <path
          key={angle}
          d="M12 3.2C14.1 5.3 14.1 8.6 12 10.6C9.9 8.6 9.9 5.3 12 3.2Z"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}

/** Long sash that enters from off-canvas — not a bow, not the Hero ribbon. */
export function CoverRibbon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 220"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M-40 198C48 168 92 132 148 128c62-4 78 28 132 22 54-6 78-44 148-38 48 4 86 28 152 8"
        strokeWidth="1.15"
      />
      <path
        d="M-40 198C48 168 92 132 148 128c62-4 78 28 132 22 54-6 78-44 148-38 48 4 86 28 152 8"
        strokeWidth="7"
        opacity="0.12"
      />
      <path d="M268 148c18 16 34 18 52 10" strokeWidth="0.9" opacity="0.5" />
    </svg>
  );
}

const OPENING = [
  { x: -18, y: -28, r: -28, s: 18, delay: 0.16 },
  { x: 22, y: -16, r: 18, s: 14, delay: 0.22 },
  { x: -26, y: 10, r: -12, s: 12, delay: 0.28 },
  { x: 16, y: 22, r: 32, s: 15, delay: 0.2 },
  { x: 4, y: -34, r: 8, s: 11, delay: 0.34 },
];

const IDLE = [
  { left: "8%", top: "18%", size: 13, dur: 18, drift: 10 },
  { left: "86%", top: "28%", size: 11, dur: 22, drift: 8 },
  { left: "12%", top: "72%", size: 12, dur: 20, drift: 9 },
  { left: "78%", top: "68%", size: 10, dur: 24, drift: 7 },
  { left: "48%", top: "8%", size: 9, dur: 26, drift: 6 },
];

export function CoverOpeningPetals({
  reduce,
  entering,
}: {
  reduce: boolean;
  entering: boolean;
}) {
  if (reduce) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {OPENING.map((petal, i) => (
        <motion.span
          key={i}
          className="absolute text-[var(--sakura-accent-deep)]"
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.4, rotate: 0 }}
          animate={
            entering
              ? { opacity: 0, scale: 0.8 }
              : {
                  opacity: [0, 0.45, 0],
                  x: petal.x * 7,
                  y: petal.y * 6,
                  rotate: petal.r,
                  scale: 1,
                }
          }
          transition={{
            duration: entering ? 0.35 : 0.72,
            delay: entering ? 0 : petal.delay,
            ease,
          }}
        >
          <PetalMark size={petal.s} />
        </motion.span>
      ))}
    </div>
  );
}

export function CoverIdlePetals({
  reduce,
  entering,
  parallax,
  mobile,
}: {
  reduce: boolean;
  entering: boolean;
  parallax: { x: number; y: number };
  mobile: boolean;
}) {
  const list = mobile ? IDLE.slice(0, 3) : IDLE;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {list.map((petal, i) => (
        <motion.span
          key={i}
          className="absolute text-[var(--sakura-accent)]"
          style={{ left: petal.left, top: petal.top }}
          initial={{ opacity: 0 }}
          animate={
            entering
              ? { opacity: 0 }
              : reduce
                ? { opacity: 0.22 }
                : {
                    opacity: 0.22,
                    x: parallax.x * 5,
                    y: [0, -petal.drift, 0],
                  }
          }
          transition={
            reduce
              ? { duration: 0.4, delay: 1.4 }
              : {
                  opacity: { duration: 0.8, delay: 1.4, ease },
                  x: { duration: 1.2, ease: "easeOut" },
                  y: { duration: petal.dur, repeat: Infinity, ease: "easeInOut" },
                }
          }
        >
          <PetalMark size={petal.size} />
        </motion.span>
      ))}
    </div>
  );
}

export function CoverRibbonLayer({
  reduce,
  entering,
  parallax,
  compact,
  side = "left",
}: {
  reduce: boolean;
  entering: boolean;
  parallax: { x: number; y: number };
  compact: boolean;
  side?: "left" | "right";
}) {
  const mirror = side === "right";

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-[16%] w-[78vw] max-w-[640px] text-[var(--sakura-accent-deep)] md:bottom-[18%] md:w-[62vw] ${
        mirror ? "-right-[14%]" : "-left-[14%]"
      }`}
      animate={{ x: parallax.x * (mirror ? -3.5 : 3.5) }}
      transition={{ duration: 1.15, ease: "easeOut" }}
    >
      <motion.div
        style={{ originX: 0.5, originY: 0.5 }}
        initial={{ opacity: 0, scaleX: mirror ? -1 : 1 }}
        animate={
          entering
            ? { opacity: 0, scaleX: mirror ? -1 : 1 }
            : {
                opacity: 0.1,
                scaleX: mirror ? -1 : 1,
                y: reduce ? 0 : [-3, 3, -3],
                rotate: reduce ? 0 : [-0.3, 0.3, -0.3],
              }
        }
        transition={
          reduce
            ? { duration: 0.5, delay: 1.32, ease }
            : {
                opacity: { duration: 0.7, delay: 1.32, ease },
                scaleX: { duration: 0 },
                y: { duration: 7.5, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 7.5, repeat: Infinity, ease: "easeInOut" },
              }
        }
      >
        <CoverRibbon className={compact ? "w-[120%] max-w-none" : "w-[140%] max-w-none"} />
      </motion.div>
    </motion.div>
  );
}

export function CoverLace({
  reduce,
  entering,
}: {
  reduce: boolean;
  entering: boolean;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-[3.35rem] opacity-40"
      initial={{ opacity: 0 }}
      animate={entering ? { opacity: 0 } : { opacity: 0.4 }}
      transition={{ duration: reduce ? 0.3 : 0.7, delay: reduce ? 0 : 1.4, ease }}
    >
      <LaceDivider scallop={16} picots={false} className="opacity-50" />
    </motion.div>
  );
}

export function CoverSweep({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[80] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-y-[-10%] -left-1/3 w-[160%]"
        style={{
          background:
            "linear-gradient(105deg, transparent 8%, rgba(255,236,241,.55) 28%, rgba(249,231,237,.94) 48%, rgba(169,71,109,.18) 52%, rgba(255,247,248,.96) 62%, transparent 88%)",
        }}
        initial={{ x: "-70%", rotate: -8 }}
        animate={{ x: "55%", rotate: -4 }}
        transition={{ duration: 0.68, ease }}
      />
    </motion.div>
  );
}
