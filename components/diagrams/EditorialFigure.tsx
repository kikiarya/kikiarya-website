"use client";

import dynamic from "next/dynamic";
import type { ProjectDiagram } from "../../lib/projects";
import DiagramPlate from "./DiagramPlate";

function SceneSkeleton() {
  return (
    <div
      className="mt-7 h-48 rounded-[1.15rem] bg-[var(--sakura-paper-soft)] md:mt-8"
      aria-hidden="true"
    />
  );
}

const CodingAgentDiagram = dynamic(() => import("./CodingAgentDiagram"), {
  ssr: false,
  loading: SceneSkeleton,
});
const LatentMemoryDiagram = dynamic(() => import("./LatentMemoryDiagram"), {
  ssr: false,
  loading: SceneSkeleton,
});
const LatentActionDiagram = dynamic(() => import("./LatentActionDiagram"), {
  ssr: false,
  loading: SceneSkeleton,
});

const FIGURES = {
  "coding-agent": {
    title: "Coding Agent Policy Optimization",
    subtitle: "Failure-aware post-training for repository-level coding agents.",
    Scene: CodingAgentDiagram,
  },
  "latent-memory": {
    title: (
      <>
        <span className="text-[var(--sakura-accent-deep)]">LatentMemory</span>
        <span className="text-[var(--sakura-ink)]">
          {" "}
          — OpenClaw LLM Agent Runtime Optimization
        </span>
      </>
    ),
    subtitle: "Compress context, preserve state, and recover long-horizon agent tasks.",
    Scene: LatentMemoryDiagram,
  },
  "latent-action": {
    title: (
      <>
        <span className="text-[var(--sakura-accent-deep)]">Latent Action</span>
        {" "}
        Reparameterization
      </>
    ),
    subtitle: "Shorten the agent decision path with compact latent actions.",
    Scene: LatentActionDiagram,
  },
} as const;

export default function EditorialFigure({ diagram }: { diagram: ProjectDiagram }) {
  if (!diagram.figure) return null;
  const figure = FIGURES[diagram.figure];
  const Scene = figure.Scene;

  return (
    <DiagramPlate title={figure.title} subtitle={figure.subtitle} caption={diagram.caption}>
      <Scene />
    </DiagramPlate>
  );
}
