"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectMetric } from "../lib/projects";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function format(metric: ProjectMetric, current: number) {
  const n = metric.decimals > 0 ? current.toFixed(metric.decimals) : String(Math.round(current));
  return `${metric.prefix}${n}${metric.suffix}`;
}

function MetricValue({ metric, active }: { metric: ProjectMetric; active: boolean }) {
  const reduce = usePrefersReducedMotion();
  const [display, setDisplay] = useState(() =>
    reduce ? format(metric, metric.numeric) : format(metric, 0)
  );

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setDisplay(format(metric, metric.numeric));
      return;
    }
    const duration = 720;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setDisplay(format(metric, metric.numeric * easeOut(t)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, metric, reduce]);

  return (
    <span className="font-display text-2xl md:text-[1.65rem] tabular-nums leading-none text-[var(--sakura-accent-deep)]">
      {display}
    </span>
  );
}

export default function MetricRow({ metrics }: { metrics: ProjectMetric[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <ul
      ref={ref}
      className="mt-6 flex flex-wrap gap-x-8 gap-y-4"
      aria-label="Key results"
    >
      {metrics.map((metric) => (
        <li key={metric.label} className="flex flex-col gap-1.5 min-w-[5.5rem]">
          <MetricValue metric={metric} active={active} />
          <span className="font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-muted)]">
            {metric.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
