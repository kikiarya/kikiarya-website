"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const ease = [0.2, 0.7, 0.2, 1] as const;

/** Types the Chinese motto once, then stops. Cover only. */
export default function CoverTypewriter({
  text,
  delay = 1200,
  entering,
  instant,
}: {
  text: string;
  delay?: number;
  entering: boolean;
  instant?: boolean;
}) {
  const reduce = usePrefersReducedMotion();
  const skip = reduce || instant;
  const [shown, setShown] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (entering) return;
    if (skip) {
      setShown(text);
      setTyping(false);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    timers.push(
      window.setTimeout(() => {
        if (cancelled) return;
        setTyping(true);
        setShown("");
        let i = 0;
        const tick = () => {
          if (cancelled) return;
          i += 1;
          setShown(text.slice(0, i));
          if (i < text.length) {
            timers.push(window.setTimeout(tick, 78 + Math.random() * 36));
          } else {
            setTyping(false);
          }
        };
        tick();
      }, delay)
    );

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [text, delay, skip, entering]);

  return (
    <motion.p
      lang="zh-Hans"
      className="font-cover-cjk mx-auto mt-3 max-w-md text-lg leading-snug text-[var(--sakura-ink-soft)] md:text-xl"
      initial={{ opacity: 0 }}
      animate={entering ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: reduce || instant ? 0.2 : 0.45, delay: skip ? 0 : 0.04, ease }}
    >
      {shown}
      {typing ? (
        <span
          aria-hidden="true"
          className="ml-[2px] inline-block h-[0.85em] w-px translate-y-[0.08em] bg-[var(--sakura-accent-deep)] align-middle"
        />
      ) : null}
    </motion.p>
  );
}
