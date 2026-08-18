"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Ambient petal field: a handful of soft sakura petals floating around the
 * viewport edges. Gentle flutter, slow wander, light scroll parallax, and a
 * graceful drift away from the pointer. Desktop-only, fully disabled under
 * prefers-reduced-motion. Deliberately sparse and quiet (§16 / §23:
 * atmosphere supports, never competes with content).
 */

const REPEL_RADIUS = 120;
const REPEL_STRENGTH = 30;

function PetalShape({ size, fill }: { size: number; fill: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22C8.5 17 5.6 12.4 6.3 8.3C6.9 4.7 9.3 2.7 11 4L12 4.9L13 4C14.7 2.7 17.1 4.7 17.7 8.3C18.4 12.4 15.5 17 12 22Z"
        fill={fill}
      />
    </svg>
  );
}

type FieldConfig = {
  x: number; // anchor, vw %
  y: number; // anchor, vh %
  size: number;
  opacity: number;
  fill: string;
  wander: number; // seconds per wander loop
  orbit: number; // wander radius px
  sway: number; // seconds per rotation sway
  flap: number; // seconds per wing flap
  spin: number; // base rotation deg
  parallax: number; // scroll factor
};

const FIELD: FieldConfig[] = [
  // top-left cluster
  { x: 5, y: 8, size: 20, opacity: 0.38, fill: "var(--sakura-accent-deep)", wander: 16, orbit: 34, sway: 4.2, flap: 2.1, spin: -22, parallax: 0.05 },
  { x: 11, y: 14, size: 14, opacity: 0.28, fill: "var(--sakura-accent)", wander: 19, orbit: 42, sway: 4.8, flap: 2.4, spin: 36, parallax: 0.08 },
  { x: 3, y: 26, size: 11, opacity: 0.2, fill: "rgba(216,132,159,.7)", wander: 17, orbit: 28, sway: 4, flap: 1.9, spin: 148, parallax: 0.06 },
  // top sprinkle
  { x: 44, y: 6, size: 12, opacity: 0.22, fill: "var(--sakura-accent)", wander: 20, orbit: 46, sway: 5, flap: 2.3, spin: 210, parallax: 0.04 },
  // top-right cluster
  { x: 89, y: 10, size: 18, opacity: 0.34, fill: "var(--sakura-accent-deep)", wander: 15, orbit: 32, sway: 4.4, flap: 2, spin: 24, parallax: 0.06 },
  { x: 94, y: 20, size: 13, opacity: 0.24, fill: "var(--sakura-accent)", wander: 18, orbit: 40, sway: 4.6, flap: 2.2, spin: 254, parallax: 0.09 },
  { x: 84, y: 4, size: 10, opacity: 0.18, fill: "rgba(216,132,159,.65)", wander: 16.5, orbit: 26, sway: 4.1, flap: 1.85, spin: 120, parallax: 0.03 },
  // left edge
  { x: 6, y: 56, size: 13, opacity: 0.22, fill: "var(--sakura-accent)", wander: 21, orbit: 38, sway: 4.9, flap: 2.35, spin: 330, parallax: 0.08 },
  { x: 2, y: 80, size: 15, opacity: 0.26, fill: "var(--sakura-accent-deep)", wander: 18.5, orbit: 44, sway: 4.5, flap: 2.15, spin: 232, parallax: 0.11 },
  // right edge
  { x: 92, y: 52, size: 14, opacity: 0.24, fill: "var(--sakura-accent)", wander: 17.5, orbit: 36, sway: 4.3, flap: 2.05, spin: 48, parallax: 0.07 },
  { x: 96, y: 72, size: 11, opacity: 0.18, fill: "rgba(216,132,159,.6)", wander: 19.5, orbit: 30, sway: 4.7, flap: 2.25, spin: 286, parallax: 0.05 },
  { x: 88, y: 90, size: 16, opacity: 0.28, fill: "var(--sakura-accent-deep)", wander: 20.5, orbit: 48, sway: 5.1, flap: 2.4, spin: 104, parallax: 0.1 },
];

function FieldPetal({
  config,
  index,
  mx,
  my,
  scrollY,
}: {
  config: FieldConfig;
  index: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  scrollY: MotionValue<number>;
}) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const center = useRef({ cx: -9999, cy: -9999 });

  useEffect(() => {
    const measure = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (rect) {
        center.current = {
          cx: rect.left + rect.width / 2,
          cy: rect.top + rect.height / 2,
        };
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Graceful drift away from the pointer inside the repel radius
  const repelRawX = useTransform([mx, my], (values: number[]) => {
    const [px, py] = values;
    const { cx, cy } = center.current;
    const dx = cx - px;
    const dy = cy - py;
    const d = Math.hypot(dx, dy);
    if (d === 0 || d > REPEL_RADIUS) return 0;
    return (dx / d) * REPEL_STRENGTH * (1 - d / REPEL_RADIUS);
  });
  const repelRawY = useTransform([mx, my], (values: number[]) => {
    const [px, py] = values;
    const { cx, cy } = center.current;
    const dx = cx - px;
    const dy = cy - py;
    const d = Math.hypot(dx, dy);
    if (d === 0 || d > REPEL_RADIUS) return 0;
    return (dy / d) * REPEL_STRENGTH * (1 - d / REPEL_RADIUS);
  });
  const repelX = useSpring(repelRawX, { stiffness: 90, damping: 18 });
  const repelY = useSpring(repelRawY, { stiffness: 90, damping: 18 });

  const parallaxY = useTransform(scrollY, (v) => -v * config.parallax);

  const r = config.orbit;
  const phase = index * 1.1;

  return (
    <div
      ref={anchorRef}
      className="absolute"
      style={{ left: `${config.x}%`, top: `${config.y}%` }}
    >
      <motion.div style={{ y: parallaxY }}>
        <motion.div style={{ x: repelX, y: repelY, opacity: config.opacity }}>
          {/* Slow floating path around the anchor */}
          <motion.div
            animate={{
              x: [0, r * 0.7, -r * 0.5, r * 0.3, 0],
              y: [0, -r * 0.5, r * 0.6, -r * 0.7, 0],
            }}
            transition={{
              duration: config.wander,
              repeat: Infinity,
              ease: "easeInOut",
              delay: phase,
            }}
          >
            {/* Soft sway + light flutter */}
            <motion.div
              animate={{
                rotate: [config.spin - 12, config.spin + 12, config.spin - 12],
              }}
              transition={{
                duration: config.sway,
                repeat: Infinity,
                ease: "easeInOut",
                delay: phase * 0.5,
              }}
            >
              <motion.div
                animate={{ scaleX: [1, 0.74, 1] }}
                transition={{
                  duration: config.flap,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: phase * 0.3,
                }}
              >
                <PetalShape size={config.size} fill={config.fill} />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function PetalField() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const { scrollY } = useScroll();

  useEffect(() => {
    const desktop = window.matchMedia(
      "(min-width: 768px) and (pointer: fine)"
    ).matches;
    setEnabled(desktop && !reduce);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (event: PointerEvent) => {
      mx.set(event.clientX);
      my.set(event.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, mx, my]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1]">
      {FIELD.map((config, index) => (
        <FieldPetal
          key={index}
          config={config}
          index={index}
          mx={mx}
          my={my}
          scrollY={scrollY}
        />
      ))}
    </div>
  );
}
