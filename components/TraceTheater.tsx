"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import DiagramPlate from "./diagrams/DiagramPlate";
import DiagramReadout from "./diagrams/DiagramReadout";
import {
  BrainIcon,
  EyeFocusIcon,
  GaugeIcon,
  RetryIcon,
  TerminalGearIcon,
} from "./diagrams/icons";
import { MetricValue } from "./MetricRow";
import Magnetic from "./motion/Magnetic";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";
import { navigateWithViewTransition } from "./motion/viewTransitionNav";
import type { ProjectMetric } from "../lib/projects";

const ease = [0.16, 1, 0.3, 1] as const;
const STEP_MS = 2100;
const HOLD_MS = 2800;
const PATH = "M80,118 C168,48 208,48 280,52 S412,138 500,132 S638,52 720,56 S848,118 920,112";
const LAR_HREF = "/work/latent-action-reparameterization";

const METRICS: ProjectMetric[] = [
  { numeric: 80.09, prefix: "", suffix: "%", decimals: 2, label: "TriviaQA" },
  { numeric: 27.1, prefix: "−", suffix: "%", decimals: 1, label: "Action tokens" },
  { numeric: 17.5, prefix: "+", suffix: "%", decimals: 1, label: "Throughput" },
];

type Station = {
  id: string;
  time: string;
  title: string;
  body: string;
  path: string;
  x: number;
  y: number;
  icon: ReactNode;
};

const STATIONS: Station[] = [
  {
    id: "observe",
    time: "t0",
    title: "Observe",
    path: "trace → tokens",
    body: "Long runs spend their budget on the same verbs — retrieve, read, think — over and over.",
    x: 8,
    y: 59,
    icon: <EyeFocusIcon size={18} />,
  },
  {
    id: "fold",
    time: "t1",
    title: "Fold",
    path: "text → latent",
    body: "LAR collapses those high-frequency spans into learnable latent actions. Shorter to generate.",
    x: 28,
    y: 26,
    icon: <BrainIcon size={18} />,
  },
  {
    id: "keep",
    time: "t2",
    title: "Keep",
    path: "tools stay text",
    body: "Query strings and tool arguments stay in plaintext, so search and edit still execute.",
    x: 50,
    y: 66,
    icon: <TerminalGearIcon size={18} />,
  },
  {
    id: "recover",
    time: "t3",
    title: "Recover",
    path: "harness policy",
    body: "When a tool fails, the interesting step is recover — not looping the same call.",
    x: 72,
    y: 28,
    icon: <RetryIcon size={18} />,
  },
  {
    id: "measure",
    time: "t4",
    title: "Measure",
    path: "Qwen3-8B · TriviaQA",
    body: "Same tools, cheaper verbs. TriviaQA 67.40% → 80.09%, action tokens −27.1%, throughput +17.5%.",
    x: 92,
    y: 56,
    icon: <GaugeIcon size={18} />,
  },
];

const LAST = STATIONS.length - 1;

function InkRunner({
  pathRef,
  progress,
  glowId,
}: {
  pathRef: RefObject<SVGPathElement | null>;
  progress: ReturnType<typeof useSpring>;
  glowId: string;
}) {
  const x = useMotionValue(80);
  const y = useMotionValue(118);

  useEffect(() => {
    const sync = (value: number) => {
      const el = pathRef.current;
      if (!el) return;
      const len = el.getTotalLength();
      if (len < 1) return;
      const point = el.getPointAtLength(Math.min(1, Math.max(0, value)) * len);
      x.set(point.x);
      y.set(point.y);
    };
    sync(progress.get());
    return progress.on("change", sync);
  }, [pathRef, progress, x, y]);

  return (
    <motion.circle
      r="5.5"
      fill="var(--sakura-accent-deep)"
      filter={`url(#${glowId})`}
      style={{ cx: x, cy: y }}
    />
  );
}

export default function TraceTheater() {
  const reduce = usePrefersReducedMotion();
  const router = useRouter();
  const glowId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const userStopped = useRef(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const progress = useSpring(0, { stiffness: 48, damping: 18, mass: 0.7 });
  const station = STATIONS[index] ?? STATIONS[0];
  const drawn = LAST > 0 ? index / LAST : 1;

  useEffect(() => {
    progress.set(reduce ? 1 : drawn);
  }, [drawn, progress, reduce]);

  useEffect(() => {
    if (reduce) return;
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry || userStopped.current) return;
        setPlaying(entry.isIntersecting && entry.intersectionRatio >= 0.32);
      },
      { threshold: [0.2, 0.32, 0.55] }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (reduce || !playing) return;
    if (index >= LAST) {
      const hold = window.setTimeout(() => {
        if (userStopped.current) return;
        setIndex(0);
      }, HOLD_MS);
      return () => window.clearTimeout(hold);
    }
    const id = window.setTimeout(() => {
      setIndex((value) => Math.min(value + 1, LAST));
    }, STEP_MS);
    return () => window.clearTimeout(id);
  }, [index, playing, reduce]);

  const jump = (next: number) => {
    userStopped.current = true;
    setPlaying(false);
    setIndex(next);
  };

  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      jump(Math.min(index + 1, LAST));
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      jump(Math.max(index - 1, 0));
    }
  };

  return (
    <div ref={rootRef}>
      <DiagramPlate
        eyebrow="Fig. A run"
        title="Compress the verbs. Keep the tools."
        subtitle="An illustrative agent trace — played on paper, not a log."
        caption="Same idea as LAR: high-frequency text folds into latents; arguments stay executable."
      >
        <div
          tabIndex={0}
          onKeyDown={onKey}
          className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--sakura-accent-deep)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--sakura-bg-deep)] rounded-2xl"
          aria-label="Illustrative agent run"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <p className="font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-muted)]">
              {reduce ? "Still" : playing ? "Playing" : "Paused"}
              <span className="mx-2 text-[var(--sakura-line-strong)]">·</span>
              {station.time} {station.title}
            </p>
            <p className="hidden font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-muted-soft)] md:block">
              ← → to step
            </p>
          </div>

          <div className="relative mt-6 hidden min-h-[17rem] md:block">
            <svg
              viewBox="0 0 1000 200"
              className="h-auto w-full overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <filter id={glowId} x="-20%" y="-40%" width="140%" height="180%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d={PATH}
                fill="none"
                stroke="var(--sakura-line-soft)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <motion.path
                d={PATH}
                fill="none"
                stroke="var(--sakura-accent-deep)"
                strokeWidth="1.85"
                strokeLinecap="round"
                pathLength={1}
                initial={false}
                animate={{ strokeDashoffset: reduce ? 0 : 1 - drawn }}
                transition={{ duration: reduce ? 0 : 0.7, ease }}
                style={{ strokeDasharray: 1 }}
              />
              <path ref={pathRef} d={PATH} fill="none" stroke="none" />
              {!reduce ? (
                <InkRunner pathRef={pathRef} progress={progress} glowId={glowId} />
              ) : null}
            </svg>

            {STATIONS.map((item, i) => {
              const active = i === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => jump(i)}
                  aria-current={active ? "step" : undefined}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                >
                  <span
                    className={`grid size-11 place-items-center rounded-full border transition-[border-color,background,transform,box-shadow] duration-300 ${
                      active
                        ? "scale-110 border-[var(--sakura-accent-deep)] bg-[var(--sakura-bg-deep)] text-[var(--sakura-accent-deep)] shadow-[0_8px_20px_rgba(138,51,88,0.12)]"
                        : "border-[var(--sakura-line)] bg-[var(--sakura-bg-deep)] text-[var(--sakura-muted)] hover:border-[var(--sakura-accent)] hover:text-[var(--sakura-accent-deep)]"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`font-mono text-[0.62rem] uppercase tracking-[.14em] ${
                      active ? "text-[var(--sakura-accent-deep)]" : "text-[var(--sakura-muted)]"
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          <ol className="mt-6 space-y-2 md:hidden">
            {STATIONS.map((item, i) => {
              const active = i === index;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={active ? "step" : undefined}
                    className={`flex min-h-11 w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors duration-200 ${
                      active
                        ? "border-[var(--sakura-accent-deep)] bg-[var(--sakura-paper-soft)]"
                        : "border-[var(--sakura-line-soft)] bg-[var(--sakura-bg-deep)]/70"
                    }`}
                  >
                    <span className="text-[var(--sakura-accent-deep)]">{item.icon}</span>
                    <span className="font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-muted)]">
                      {item.time}
                    </span>
                    <span className="font-display text-lg">{item.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <motion.div
            key={station.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.12 : 0.32, ease }}
          >
            <DiagramReadout
              copy={{
                title: station.title,
                path: `${station.time} · ${station.path}`,
                body: station.body,
              }}
            />
          </motion.div>

          {index === LAST ? (
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-4" aria-label="LAR results">
              {METRICS.map((metric) => (
                <li key={metric.label} className="flex min-w-[5.5rem] flex-col gap-1.5">
                  <MetricValue metric={metric} active size="card" />
                  <span className="font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-muted)]">
                    {metric.label}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-7">
            <Magnetic>
              <Link
                href={LAR_HREF}
                className="button-ghost"
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  navigateWithViewTransition(router, LAR_HREF, reduce);
                }}
              >
                Open LAR <ArrowUpRight size={15} />
              </Link>
            </Magnetic>
          </div>
        </div>
      </DiagramPlate>
    </div>
  );
}
