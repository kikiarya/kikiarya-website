"use client";

import Pearl from "../decor/Pearl";
import { DiagramArrow, DiagramSvgEdge } from "./DiagramArrow";
import {
  DiagramCard,
  DiagramFrame,
  DiagramNote,
  DiagramPlaque,
} from "./DiagramCard";
import { DiagramScene, useDiagram } from "./DiagramScene";
import type { GraphEdge, HoverOverride } from "./hover";
import {
  BarChartRiseIcon,
  DatabaseCheckIcon,
  EyeFocusIcon,
  FunnelDotsIcon,
  MountainFlagIcon,
  RetryIcon,
  RouteFlagIcon,
  ShieldCheckIcon,
  TrendDownIcon,
  TrendUpIcon,
} from "./icons";

const EDGES: GraphEdge[] = [
  { id: "long-growth", from: "longTask", to: "contextGrowth" },
  { id: "growth-runtime", from: "contextGrowth", to: "runtime" },
  { id: "runtime-continue", from: "runtime", to: "continue" },
  { id: "checkpoint-recovery", from: "checkpoint", to: "recovery" },
  { id: "recovery-continue", from: "recovery", to: "continue" },
];

const RUNTIME_NODES = ["runtime", "observer", "compression", "checkpoint", "recovery"];

const OVERRIDES: Record<string, HoverOverride> = {
  longTask: {
    nodes: ["longTask", "contextGrowth"],
    edges: ["long-growth"],
    annotations: ["explosion"],
  },
  contextGrowth: {
    nodes: ["longTask", "contextGrowth", "runtime"],
    edges: ["long-growth", "growth-runtime"],
    annotations: ["explosion"],
  },
  runtime: {
    nodes: [...RUNTIME_NODES, "continue"],
    edges: ["growth-runtime", "runtime-continue", "checkpoint-recovery", "recovery-continue"],
    annotations: ["summaries"],
  },
  observer: {
    nodes: ["observer", "runtime"],
    edges: [],
  },
  compression: {
    nodes: ["compression", "runtime"],
    edges: [],
    annotations: ["summaries"],
  },
  checkpoint: {
    nodes: ["checkpoint", "recovery"],
    edges: ["checkpoint-recovery"],
  },
  recovery: {
    nodes: ["checkpoint", "recovery", "continue"],
    edges: ["checkpoint-recovery", "recovery-continue"],
  },
  continue: {
    nodes: ["runtime", "continue"],
    edges: ["runtime-continue"],
    annotations: ["stable"],
  },
  "plaque-tokens": {
    nodes: ["plaque-tokens", "compression"],
    edges: [],
  },
  "plaque-success": {
    nodes: ["plaque-success", "continue"],
    edges: ["runtime-continue"],
  },
  "plaque-recovery": {
    nodes: ["plaque-recovery", "checkpoint", "recovery"],
    edges: ["checkpoint-recovery"],
  },
};

const COPY = {
  longTask: {
    title: "Long task",
    path: "Long task → Context growth",
    body: "A long-horizon OpenClaw run: many tools, many turns, and a context window that never wants to shrink.",
  },
  contextGrowth: {
    title: "Context growth",
    path: "Long task → Context growth → LatentMemory Runtime",
    body: "Every tool result stays in the prompt until something breaks. That is the explosion the runtime is built to watch.",
  },
  runtime: {
    title: "LatentMemory Runtime",
    path: "Context growth → Runtime → Continue execution",
    body: "The session layer: observe growth, compress what the task no longer needs, checkpoint, recover.",
  },
  observer: {
    title: "Context Observer",
    body: "Watches token growth and task progress so compression fires on state, not on a fixed turn count.",
  },
  compression: {
    title: "Compression",
    path: "structured summaries + special tokens",
    body: "History folds into executable task state. Repeated system-prompt spans go through a LoRA shortcut.",
  },
  checkpoint: {
    title: "Checkpoint",
    path: "Checkpoint → Recovery",
    body: "A snapshot of the last good execution state, taken before the risky step — not after the crash.",
  },
  recovery: {
    title: "Recovery",
    path: "Checkpoint → Recovery → Continue execution",
    body: "On a fault, restore the checkpoint and keep going. The session survives instead of restarting from turn one.",
  },
  continue: {
    title: "Continue execution",
    path: "Runtime → Continue execution",
    body: "The long-horizon task picks up with compact memory still in the loop.",
  },
  "plaque-tokens": {
    title: "Context Tokens",
    body: "Context tokens down 46.7% versus native OpenClaw. Compression is keyed on task state, not a hard cut.",
    evaluationHref: "#evaluation",
  },
  "plaque-success": {
    title: "Task Success",
    body: "Task success after compression up 8.4pp. The agent still knows where it was.",
    evaluationHref: "#evaluation",
  },
  "plaque-recovery": {
    title: "Failure Recovery",
    path: "Checkpoint → Recovery",
    body: "Recovery rate up 83.3pp under injected faults. That is the point of the checkpoint.",
    evaluationHref: "#evaluation",
  },
} as const;

export default function LatentMemoryDiagram() {
  return (
    <DiagramScene edges={EDGES} overrides={OVERRIDES} copy={COPY}>
      <div className="relative">
        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <DiagramSvgEdge
            edgeId="growth-runtime"
            d="M 18 28 C 24 28, 26 36, 32 36"
          />
          <DiagramSvgEdge
            edgeId="runtime-continue"
            d="M 78 40 C 84 40, 86 32, 92 32"
          />
        </svg>

        <div className="grid items-center gap-4 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.4fr)_minmax(0,0.78fr)]">
          <div>
            <DiagramNote annotationId="explosion" className="mb-2">
              context explosion
            </DiagramNote>
            <DiagramCard id="longTask" label="Long task" icon={<RouteFlagIcon />} />
            <div className="my-1 flex justify-center">
              <DiagramArrow edgeId="long-growth" direction="down" />
            </div>
            <DiagramCard
              id="contextGrowth"
              label="Context growth"
              icon={<BarChartRiseIcon />}
            />
          </div>

          <RuntimePanel />

          <div>
            <DiagramNote annotationId="stable" className="mb-2 text-right md:text-left">
              stable long-horizon execution
            </DiagramNote>
            <div className="mb-1 flex justify-center md:hidden">
              <DiagramArrow edgeId="runtime-continue" direction="down" />
            </div>
            <DiagramCard
              id="continue"
              label="Continue execution"
              icon={<MountainFlagIcon />}
            />
          </div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <DiagramPlaque
            id="plaque-tokens"
            value="−46.7%"
            label="Context Tokens"
            icon={<TrendDownIcon />}
          />
          <DiagramPlaque
            id="plaque-success"
            value="+8.4pp"
            label="Task Success"
            icon={<TrendUpIcon />}
          />
          <DiagramPlaque
            id="plaque-recovery"
            value="+83.3pp"
            label="Failure Recovery"
            icon={<ShieldCheckIcon />}
          />
        </div>
      </div>
    </DiagramScene>
  );
}

function RuntimePanel() {
  const { bind } = useDiagram();

  return (
    <div className="relative">
      <DiagramFrame id="runtime" className="px-3 py-3 md:px-4 md:py-4">
        <button
          type="button"
          className="w-full"
          {...bind("runtime")}
        >
          <p className="text-center font-display text-lg text-[var(--sakura-accent-deep)] md:text-xl">
            LatentMemory Runtime
          </p>
        </button>
        <div className="relative mt-3 grid grid-cols-2 gap-2">
          <DiagramCard id="observer" label="Context Observer" icon={<EyeFocusIcon />} size="sm" />
          <DiagramCard id="compression" label="Compression" icon={<FunnelDotsIcon />} size="sm" />
          <DiagramCard
            id="checkpoint"
            label="Checkpoint"
            icon={<DatabaseCheckIcon />}
            size="sm"
          />
          <DiagramCard id="recovery" label="Recovery" icon={<RetryIcon />} size="sm" />
          <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--sakura-accent)]">
            <Pearl size={10} />
          </span>
        </div>
      </DiagramFrame>
      <div className="mt-2 flex justify-end">
        <DiagramNote annotationId="summaries" className="max-w-[11rem] text-right leading-4">
          structured summaries
          <br />+ special tokens
        </DiagramNote>
      </div>
    </div>
  );
}
