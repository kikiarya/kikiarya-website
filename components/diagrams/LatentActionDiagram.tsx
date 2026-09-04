"use client";

import { DiagramArrow } from "./DiagramArrow";
import {
  DiagramBracket,
  DiagramCard,
  DiagramChain,
  DiagramFrame,
  DiagramPanel,
  DiagramPlaque,
} from "./DiagramCard";
import { DiagramScene, useDiagram } from "./DiagramScene";
import type { GraphEdge, HoverOverride } from "./hover";
import {
  FunnelDotsIcon,
  GaugeIcon,
  LatentClusterIcon,
  RouteFlagIcon,
  ShieldCheckIcon,
  SpeechDocIcon,
  ThinkHeadIcon,
  TokenListIcon,
  TwoPathsIcon,
  WrenchIcon,
} from "./icons";

const BEFORE_NODES = ["think1", "text1", "tool1", "think2", "text2", "tool2"];
const BEFORE_EDGES = ["think1-text1", "text1-tool1", "tool1-think2", "think2-text2", "text2-tool2"];
const AFTER_NODES = ["latent1", "toolA", "latent2", "toolB"];
const AFTER_EDGES = ["latent1-toolA", "toolA-latent2", "latent2-toolB"];
const REPARAM_NODES = ["reparam", "transition", "entropy", "distill"];

const EDGES: GraphEdge[] = [
  { id: "think1-text1", from: "think1", to: "text1" },
  { id: "text1-tool1", from: "text1", to: "tool1" },
  { id: "tool1-think2", from: "tool1", to: "think2" },
  { id: "think2-text2", from: "think2", to: "text2" },
  { id: "text2-tool2", from: "text2", to: "tool2" },
  { id: "before-reparam", from: "tool2", to: "reparam" },
  { id: "reparam-after", from: "reparam", to: "latent1" },
  { id: "latent1-toolA", from: "latent1", to: "toolA" },
  { id: "toolA-latent2", from: "toolA", to: "latent2" },
  { id: "latent2-toolB", from: "latent2", to: "toolB" },
];

const reparamOverride: HoverOverride = {
  nodes: [...REPARAM_NODES, "tool2", "latent1"],
  edges: ["before-reparam", "reparam-after"],
};

const OVERRIDES: Record<string, HoverOverride> = {
  before: {
    nodes: ["before", ...BEFORE_NODES],
    edges: BEFORE_EDGES,
    annotations: ["longer"],
  },
  after: {
    nodes: ["after", ...AFTER_NODES],
    edges: AFTER_EDGES,
    annotations: ["shorter"],
  },
  reparam: reparamOverride,
  transition: reparamOverride,
  entropy: reparamOverride,
  distill: reparamOverride,
  "plaque-tokens": {
    nodes: ["plaque-tokens", ...AFTER_NODES],
    edges: AFTER_EDGES,
  },
  "plaque-inference": {
    nodes: ["plaque-inference", ...AFTER_NODES],
    edges: AFTER_EDGES,
  },
  "plaque-capability": {
    nodes: ["plaque-capability", "tool1", "tool2", "toolA", "toolB"],
    edges: ["text1-tool1", "text2-tool2", "latent1-toolA", "latent2-toolB"],
  },
};

const CHAIN_COPY = {
  think1: {
    title: "Think",
    path: "Think → Textual Action",
    body: "A reasoning span in plain text. Cheap to read, expensive to keep generating on every cycle.",
  },
  text1: {
    title: "Textual Action",
    path: "Think → Textual Action → Tool",
    body: "The verb is written out in full — retrieve, read, click — even when it barely changes from the last turn.",
  },
  tool1: {
    title: "Tool",
    path: "Textual Action → Tool",
    body: "The external call still needs exact arguments. Those stay in text so the tool remains executable.",
  },
  think2: {
    title: "Think",
    path: "Tool → Think → Textual Action",
    body: "Another reasoning hop. The before-path repeats this cycle until the decision trajectory is long.",
  },
  text2: {
    title: "Textual Action",
    path: "Think → Textual Action → Tool",
    body: "Same class of low-entropy verb, written again. This is what latent actions are for.",
  },
  tool2: {
    title: "Tool",
    path: "Textual Action → Tool → Reparameterization",
    body: "The last tool in the long chain. Query params stay text; the repeated verb is what gets compressed.",
  },
  latent1: {
    title: "Latent Action",
    path: "Latent Action → Tool",
    body: "A compact learned token stands in for the repeated verb. Shorter to generate; the tool still runs.",
  },
  toolA: {
    title: "Tool",
    path: "Latent Action → Tool → Latent Action",
    body: "Same wrench as before. Arguments never went into the latent, so execution does not break.",
  },
  latent2: {
    title: "Latent Action",
    path: "Tool → Latent Action → Tool",
    body: "The short path again. Two latents replace a six-step textual walk.",
  },
  toolB: {
    title: "Tool",
    path: "Latent Action → Tool",
    body: "The after-path still ends on a real tool call. Capability is what we keep.",
  },
} as const;

const COPY = {
  ...CHAIN_COPY,
  before: {
    title: "Before",
    path: "Think → Text → Tool → Think → Text → Tool",
    body: "The long decision path: repeated textual reasoning and action generation before every tool.",
  },
  after: {
    title: "After",
    path: "Latent Action → Tool → Latent Action → Tool",
    body: "The short path. Compact latents replace the high-frequency verbs; tools stay in plain text.",
  },
  reparam: {
    title: "Reparameterization",
    path: "Before → Reparameterization → After",
    body: "Transition-equivalent actions, entropy filtering, then distillation into a latent-action vocabulary.",
  },
  transition: {
    title: "Transition-equivalent actions",
    path: "Before → Reparameterization → After",
    body: "Two surface forms that reach the same next state can share one latent. The tool still sees the arguments it needs.",
  },
  entropy: {
    title: "Entropy filtering",
    path: "Before → Reparameterization → After",
    body: "High-frequency, low-entropy verbs are the ones worth collapsing. Rare, high-entropy spans stay in text.",
  },
  distill: {
    title: "Trajectory distillation",
    path: "Before → Reparameterization → After",
    body: "LoRA plus trajectory-level KL against the full-text teacher. The student learns the short path without dropping tools.",
  },
  "plaque-tokens": {
    title: "Fewer action tokens",
    path: "Latent Action → Tool",
    body: "Action tokens down 27.1% on Qwen3-8B TriviaQA. The verbs got shorter; the queries did not vanish.",
    evaluationHref: "#evaluation",
  },
  "plaque-inference": {
    title: "Faster inference",
    path: "Latent Action → Tool",
    body: "Throughput 127.8 → 150.2 tokens/s (+17.5%). Fewer tokens to emit before the next tool.",
    evaluationHref: "#evaluation",
  },
  "plaque-capability": {
    title: "Preserved task capability",
    body: "TriviaQA 67.40% → 80.09%. Tools stay executable because arguments never left plain text.",
    evaluationHref: "#evaluation",
  },
} as const;

export default function LatentActionDiagram() {
  return (
    <DiagramScene edges={EDGES} overrides={OVERRIDES} copy={COPY}>
      <div className="grid items-start gap-5 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.9fr)_auto_minmax(0,0.95fr)] md:items-stretch">
        <section>
          <DiagramPanel id="before" className="mb-3 px-3 py-2">
            <p className="font-display text-xl text-[var(--sakura-accent-deep)]">Before</p>
          </DiagramPanel>
          <DiagramChain
            stack
            items={[
              { id: "think1", label: "Think", icon: <ThinkHeadIcon />, size: "sm" },
              {
                id: "text1",
                label: "Textual Action",
                icon: <SpeechDocIcon />,
                edgeId: "think1-text1",
                size: "sm",
              },
              {
                id: "tool1",
                label: "Tool",
                icon: <WrenchIcon />,
                edgeId: "text1-tool1",
                size: "sm",
              },
              {
                id: "think2",
                label: "Think",
                icon: <ThinkHeadIcon />,
                edgeId: "tool1-think2",
                size: "sm",
              },
              {
                id: "text2",
                label: "Textual Action",
                icon: <SpeechDocIcon />,
                edgeId: "think2-text2",
                size: "sm",
              },
              {
                id: "tool2",
                label: "Tool",
                icon: <WrenchIcon />,
                edgeId: "text2-tool2",
                size: "sm",
              },
            ]}
          />
          <DiagramBracket id="before" label="longer decision path" />
        </section>

        <div className="hidden items-center md:flex">
          <DiagramArrow edgeId="before-reparam" direction="right" />
        </div>

        <section className="flex flex-col">
          <div className="mb-2 flex justify-center md:hidden">
            <DiagramArrow edgeId="before-reparam" direction="down" />
          </div>
          <DiagramFrame id="reparam" className="flex-1 px-3 py-3 md:px-4 md:py-4">
            <ReparamTitle />
            <div className="mt-3 space-y-2">
              <DiagramCard
                id="transition"
                label="Transition-equivalent actions"
                icon={<TwoPathsIcon />}
                size="sm"
              />
              <DiagramCard
                id="entropy"
                label="Entropy filtering"
                icon={<FunnelDotsIcon />}
                size="sm"
              />
              <DiagramCard
                id="distill"
                label="Trajectory distillation"
                icon={<RouteFlagIcon />}
                size="sm"
              />
            </div>
          </DiagramFrame>
          <div className="mt-2 flex justify-center md:hidden">
            <DiagramArrow edgeId="reparam-after" direction="down" />
          </div>
        </section>

        <div className="hidden items-center md:flex">
          <DiagramArrow edgeId="reparam-after" direction="right" />
        </div>

        <section>
          <DiagramPanel id="after" className="mb-3 px-3 py-2">
            <p className="font-display text-xl text-[var(--sakura-accent-deep)]">After</p>
          </DiagramPanel>
          <DiagramChain
            stack
            items={[
              {
                id: "latent1",
                label: "Latent Action",
                icon: <LatentClusterIcon />,
                size: "sm",
              },
              {
                id: "toolA",
                label: "Tool",
                icon: <WrenchIcon />,
                edgeId: "latent1-toolA",
                size: "sm",
              },
              {
                id: "latent2",
                label: "Latent Action",
                icon: <LatentClusterIcon />,
                edgeId: "toolA-latent2",
                size: "sm",
              },
              {
                id: "toolB",
                label: "Tool",
                icon: <WrenchIcon />,
                edgeId: "latent2-toolB",
                size: "sm",
              },
            ]}
          />
          <DiagramBracket id="after" label="shorter decision path" />
        </section>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <DiagramPlaque
          id="plaque-tokens"
          label="Fewer action tokens"
          icon={<TokenListIcon />}
        />
        <DiagramPlaque
          id="plaque-inference"
          label="Faster inference"
          icon={<GaugeIcon />}
        />
        <DiagramPlaque
          id="plaque-capability"
          label="Preserved task capability"
          icon={<ShieldCheckIcon />}
        />
      </div>
    </DiagramScene>
  );
}

function ReparamTitle() {
  const { bind } = useDiagram();
  return (
    <button type="button" className="w-full" {...bind("reparam")}>
      <p className="text-center font-display text-lg text-[var(--sakura-accent-deep)] md:text-xl">
        Reparameterization
      </p>
    </button>
  );
}
