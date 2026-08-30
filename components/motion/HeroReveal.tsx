"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useSceneReady } from "./MotionProvider";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Grouped mask reveal (ui-motion-plan2 §6): the line is the group, words are
 * the second-level stagger. No per-letter animation. Reveals are held until
 * the Entry Gate hands the scene over (sceneReady).
 */
export function HeroLine({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const ready = useSceneReady();
  const reduce = usePrefersReducedMotion();
  const words = text.split(" ");

  return (
    <span className={`block ${className}`}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden pb-[.1em] -mb-[.1em] align-bottom"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={reduce ? { opacity: 0 } : { opacity: 0.4, y: "105%" }}
            animate={
              ready
                ? reduce
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0 }
                : undefined
            }
            transition={{
              duration: reduce ? 0.15 : 1,
              delay: reduce ? 0 : delay + index * 0.045,
              ease,
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ready = useSceneReady();
  const reduce = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      animate={ready ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: reduce ? 0.15 : 0.9,
        delay: reduce ? 0 : delay,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}
