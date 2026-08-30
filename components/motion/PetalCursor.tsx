"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { useMotionScene } from "./MotionProvider";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], label, summary";
const NATIVE_CURSOR_SELECTOR =
  "input, textarea, select, iframe, [contenteditable='true'], [contenteditable='']";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

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

/**
 * Refined petal cursor: one elegant lead petal plus two soft trailing petals.
 * Quiet when still — the flow only appears with movement. Trailing petals
 * fade out while hovering interactive elements so the pointer stays precise.
 */
const TRAIL = [
  { size: 18, opacity: 0.92, fill: "var(--sakura-accent-deep)", stiffness: 820, damping: 55 },
  { size: 13, opacity: 0.45, fill: "var(--sakura-accent)", stiffness: 420, damping: 42 },
  { size: 10, opacity: 0.26, fill: "rgba(216,132,159,.75)", stiffness: 240, damping: 34 },
] as const;

type TrailConfig = (typeof TRAIL)[number];

function TrailPetal({
  config,
  index,
  x,
  y,
  tilt,
  hidden,
  hovering,
  pressed,
}: {
  config: TrailConfig;
  index: number;
  x: MotionValue<number>;
  y: MotionValue<number>;
  tilt: MotionValue<number>;
  hidden: boolean;
  hovering: boolean;
  pressed: boolean;
}) {
  const sx = useSpring(x, {
    stiffness: config.stiffness,
    damping: config.damping,
    mass: 0.55,
  });
  const sy = useSpring(y, {
    stiffness: config.stiffness,
    damping: config.damping,
    mass: 0.55,
  });
  const sTilt = useSpring(tilt, { stiffness: 200, damping: 24 });
  const lead = index === 0;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0"
      style={{ x: sx, y: sy, zIndex: 48 - index }}
    >
      <motion.div
        style={{
          marginLeft: -config.size / 2,
          marginTop: -config.size / 2,
          rotate: sTilt,
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: hidden ? 0 : hovering && !lead ? 0 : config.opacity,
          scale: lead ? (pressed ? 0.82 : hovering ? 1.25 : 1) : 1,
        }}
        transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      >
        <PetalShape size={config.size} fill={config.fill} />
      </motion.div>
    </motion.div>
  );
}

type Ghost = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rotate: number;
  size: number;
  duration: number;
};

/**
 * Petal Cursor (ui-motion-plan2 §4): desktop-only custom pointer, active once
 * the visitor has entered. Native cursor returns on text-editing surfaces,
 * touch devices, and under prefers-reduced-motion.
 */
export default function PetalCursor() {
  const { cursorActive } = useMotionScene();
  const reduce = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [ghosts, setGhosts] = useState<Ghost[]>([]);
  const ghostId = useRef(0);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const tilt = useMotionValue(-10);

  useEffect(() => {
    setEnabled(
      Boolean(cursorActive) &&
        !reduce &&
        window.matchMedia("(pointer: fine)").matches
    );
  }, [cursorActive, reduce]);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("petal-cursor-on");

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      tilt.set(clamp(-10 + event.movementX * 0.7, -26, 8));
      setHidden(false);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target || !(target instanceof Element)) return;
      setHidden(Boolean(target.closest(NATIVE_CURSOR_SELECTOR)));
      setHovering(Boolean(target.closest(INTERACTIVE_SELECTOR)));
    };

    const onDown = (event: PointerEvent) => {
      setPressed(true);
      // A couple of falling petals as click feedback (§4.4)
      setGhosts((current) => {
        if (current.length >= 6) return current;
        const burst: Ghost[] = Array.from({ length: 2 }, () => ({
          id: ++ghostId.current,
          x: event.clientX,
          y: event.clientY,
          dx: (Math.random() - 0.5) * 56,
          dy: 22 + Math.random() * 30,
          rotate: 70 + Math.random() * 110,
          size: 9 + Math.random() * 6,
          duration: 0.5 + Math.random() * 0.2,
        }));
        return [...current, ...burst];
      });
    };

    const onUp = () => setPressed(false);
    const onLeave = () => setHidden(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      document.body.classList.remove("petal-cursor-on");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y, tilt]);

  if (!enabled) return null;

  return (
    <>
      {TRAIL.map((config, index) => (
        <TrailPetal
          key={index}
          config={config}
          index={index}
          x={x}
          y={y}
          tilt={tilt}
          hidden={hidden}
          hovering={hovering}
          pressed={pressed}
        />
      ))}

      <AnimatePresence>
        {ghosts.map((ghost) => (
          <motion.div
            key={ghost.id}
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[47]"
            style={{ marginLeft: -ghost.size / 2, marginTop: -ghost.size / 2 }}
            initial={{ x: ghost.x, y: ghost.y, opacity: 0.35, scale: 1, rotate: 0 }}
            animate={{
              x: ghost.x + ghost.dx,
              y: ghost.y + ghost.dy,
              opacity: 0,
              scale: 1.25,
              rotate: ghost.rotate,
            }}
            transition={{ duration: ghost.duration, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() =>
              setGhosts((current) => current.filter((g) => g.id !== ghost.id))
            }
          >
            <PetalShape size={ghost.size} fill="var(--sakura-accent)" />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
