"use client";

import { useEffect, useRef, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ProjectMetric } from "../lib/projects";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function format(metric: ProjectMetric, current: number) {
  const n = metric.decimals > 0 ? current.toFixed(metric.decimals) : String(Math.round(current));
  return `${metric.prefix}${n}${metric.suffix}`;
}

export function MetricValue({
  metric,
  active,
  size = "card",
}: {
  metric: ProjectMetric;
  active: boolean;
  size?: "card" | "folio" | "seal";
}) {
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
    <span
      className={`font-display tabular-nums leading-none text-[var(--sakura-accent-deep)] ${
        size === "folio"
          ? "text-[clamp(1.85rem,3.2vw,2.75rem)]"
          : size === "seal"
            ? "text-[1.15rem] md:text-[1.25rem]"
            : "text-2xl md:text-[1.65rem]"
      }`}
    >
      {display}
    </span>
  );
}

export default function MetricRow({
  metrics,
  className = "mt-6",
  size = "card",
}: {
  metrics: ProjectMetric[];
  className?: string;
  size?: "card" | "folio";
}) {
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
      className={cn("flex flex-wrap gap-x-8 gap-y-4", className)}
      aria-label="Key results"
    >
      {metrics.map((metric) => (
        <li key={metric.label} className="flex flex-col gap-1.5 min-w-[5.5rem]">
          <MetricValue metric={metric} active={active} size={size} />
          <span className="font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-muted)]">
            {metric.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
