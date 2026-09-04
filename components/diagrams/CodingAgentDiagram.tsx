"use client";

import type { ReactNode } from "react";
import Sparkle from "../decor/Sparkle";
import { DiagramArrow, DiagramSvgEdge } from "./DiagramArrow";
import {
  DiagramCard,
  DiagramChain,
  DiagramNote,
  DiagramPanel,
  DiagramPlaque,
} from "./DiagramCard";
import { DiagramScene, useDiagram } from "./DiagramScene";
import type { GraphEdge, HoverOverride } from "./hover";
import {
  BalanceScaleIcon,
  BookPencilIcon,
  BrainIcon,
  BrainUpIcon,
  CheckCircleIcon,
  CodeBracketsIcon,
  ContainerIcon,
  CubeIcon,
  EyeFocusIcon,
  GaugeIcon,
  RepoGitIcon,
  RetryIcon,
  RouteFlagIcon,
  ShieldCheckIcon,
  ShieldExclaimIcon,
  TerminalGearIcon,
  TrophyIcon,
  WarningTriangleIcon,
} from "./icons";

const EDGES: GraphEdge[] = [
  { id: "task-policy", from: "task", to: "policy" },
  { id: "policy-tool", from: "policy", to: "tool" },
  { id: "tool-repo", from: "tool", to: "repo" },
  { id: "repo-obs", from: "repo", to: "observation" },
  { id: "obs-complete", from: "observation", to: "completion" },
  { id: "obs-fail", from: "observation", to: "failureDetection" },
  { id: "fail-recovery", from: "failureDetection", to: "recovery" },
  { id: "recovery-policy", from: "recovery", to: "policy" },
  { id: "success-sft", from: "successTrajectories", to: "sft" },
  { id: "failtraj-sft", from: "failureTrajectories", to: "sft" },
  { id: "sft-grpo", from: "sft", to: "grpo" },
  { id: "grpo-updated", from: "grpo", to: "updatedAgent" },
  { id: "updated-policy", from: "updatedAgent", to: "policy" },
];

const OVERRIDES: Record<string, HoverOverride> = {
  task: {
    nodes: ["task", "policy"],
    edges: ["task-policy"],
  },
  policy: {
    nodes: ["task", "policy", "tool"],
    edges: ["task-policy", "policy-tool"],
  },
  tool: {
    nodes: ["policy", "tool", "repo"],
    edges: ["policy-tool", "tool-repo"],
  },
  repo: {
    nodes: ["tool", "repo", "observation"],
    edges: ["tool-repo", "repo-obs"],
  },
  observation: {
    nodes: ["repo", "observation", "completion", "failureDetection"],
    edges: ["repo-obs", "obs-complete", "obs-fail"],
  },
  completion: {
    nodes: ["observation", "completion"],
    edges: ["obs-complete"],
  },
  failureDetection: {
    nodes: ["observation", "failureDetection", "recovery"],
    edges: ["obs-fail", "fail-recovery"],
  },
  recovery: {
    nodes: ["failureDetection", "recovery", "policy"],
    edges: ["fail-recovery", "recovery-policy"],
    annotations: ["continue"],
  },
  successTrajectories: {
    nodes: ["successTrajectories", "sft"],
    edges: ["success-sft"],
  },
  failureTrajectories: {
    nodes: ["failureTrajectories", "sft"],
    edges: ["failtraj-sft"],
  },
  sft: {
    nodes: ["successTrajectories", "failureTrajectories", "sft", "grpo"],
    edges: ["success-sft", "failtraj-sft", "sft-grpo"],
  },
  grpo: {
    nodes: ["sft", "grpo", "updatedAgent"],
    edges: ["sft-grpo", "grpo-updated"],
  },
  updatedAgent: {
    nodes: ["grpo", "updatedAgent", "policy"],
    edges: ["grpo-updated", "updated-policy"],
  },
  fixedSetup: {
    nodes: ["fixedSetup"],
    edges: [],
  },
  "plaque-complete": {
    nodes: ["plaque-complete", "completion"],
    edges: ["obs-complete"],
  },
  "plaque-recovery": {
    nodes: ["plaque-recovery", "failureDetection", "recovery", "policy"],
    edges: ["fail-recovery", "recovery-policy"],
    annotations: ["continue"],
  },
  "plaque-cost": {
    nodes: ["plaque-cost", "grpo", "updatedAgent"],
    edges: ["sft-grpo", "grpo-updated"],
  },
};

const COPY = {
  task: {
    title: "Task",
    path: "Task → Agent Policy",
    body: "A repository-level coding task comes in — usually a failing test and a repo to search.",
  },
  policy: {
    title: "Agent Policy",
    path: "Task → Agent Policy → Tool Call",
    body: "The model decides the next tool: search, edit, run tests, or stop. This is what post-training updates.",
  },
  tool: {
    title: "Tool Call",
    path: "Agent Policy → Tool Call → Repo Environment",
    body: "The harness turns that decision into a real command — grep, patch, pytest — inside a budget.",
  },
  repo: {
    title: "Repo Environment",
    path: "Tool Call → Repo Environment → Observation",
    body: "Docker plus git. Files change. Tests run. The environment answers with diffs and logs, not vibes.",
  },
  observation: {
    title: "Observation",
    path: "Repo → Observation → Completion or Failure Detection",
    body: "The agent reads what happened. Success can end the loop. Failure is kept as signal, not a reason to start over.",
  },
  completion: {
    title: "Task Completion",
    path: "Observation → Task Completion",
    body: "Tests are green, or close enough that the verifier accepts the patch. The run stops.",
  },
  failureDetection: {
    title: "Failure Detection",
    path: "Observation → Failure Detection → Recovery",
    body: "Progress detection notices a loop, a crash, or a test that went backwards — before the agent burns the budget.",
  },
  recovery: {
    title: "Recovery",
    path: "Failure Detection → Recovery → Agent Policy",
    body: "The harness detects a failed run, restores the last green checkpoint, and continues under the same policy.",
  },
  successTrajectories: {
    title: "Success Trajectories",
    path: "Success Trajectories → Policy-aware SFT",
    body: "Runs that solved the task. They teach the policy what a good locate–edit–test loop looks like.",
  },
  failureTrajectories: {
    title: "Failure Trajectories",
    path: "Failure Trajectories → Policy-aware SFT",
    body: "Failed runs are not discarded. They are the failure-aware half of the training set.",
  },
  sft: {
    title: "Policy-aware SFT",
    path: "Trajectories → SFT → GRPO",
    body: "LoRA-SFT on mixed success and failure traces, so the model learns both the happy path and the recoveries.",
  },
  grpo: {
    title: "GRPO",
    path: "SFT → GRPO → Updated Agent",
    body: "Group-relative policy optimization with rewards for resolve, tests, recovery, and cost.",
  },
  updatedAgent: {
    title: "Updated Agent",
    path: "GRPO → Updated Agent → Agent Policy",
    body: "The new weights go back into the same loop. Next inference run starts from a better policy.",
  },
  fixedSetup: {
    title: "Fixed setup",
    body: "Model, harness, tools, and inference budget stay constant so the ablation is about policy, not the stack.",
  },
  "plaque-complete": {
    title: "Task Completion",
    path: "Observation → Task Completion",
    body: "Joint optimization solved 3 more tasks than base on 50 SWE-bench Verified items (+6pp).",
    evaluationHref: "#evaluation",
  },
  "plaque-recovery": {
    title: "Failure Recovery",
    path: "Failure Detection → Recovery → Agent Policy",
    body: "Recovery rate up about 10pp. Failed tool calls become training signal instead of a restart.",
    evaluationHref: "#evaluation",
  },
  "plaque-cost": {
    title: "Cost-aware Evaluation",
    path: "SFT → GRPO → Updated Agent",
    body: "Average tool calls down 15%. The reward cares about cost, not only whether the patch landed.",
    evaluationHref: "#evaluation",
  },
} as const;

function CompletionIcon() {
  return (
    <span className="relative inline-flex">
      <CheckCircleIcon />
      <Sparkle
        size={9}
        className="absolute -right-1.5 -top-1 text-[var(--sakura-accent-deep)]"
      />
      <Sparkle
        size={7}
        className="absolute -left-1.5 top-0 text-[var(--sakura-accent)]"
      />
    </span>
  );
}

function UpArrow({ edgeId }: { edgeId: string }) {
  const { highlight } = useDiagram();
  const active = highlight.edges.has(edgeId);
  return (
    <svg
      className="diagram-edge-svg"
      width="16"
      height="20"
      viewBox="0 0 16 20"
      aria-hidden="true"
      data-diagram-active={active ? "true" : "false"}
    >
      <line x1="8" y1="18" x2="8" y2="5" />
      <polyline points="3.5,9 8,3.5 12.5,9" />
    </svg>
  );
}

export default function CodingAgentDiagram() {
  return (
    <DiagramScene edges={EDGES} overrides={OVERRIDES} copy={COPY}>
      <div className="relative">
        <svg
          className="pointer-events-none absolute inset-x-0 top-0 hidden h-[58%] w-full md:block"
          viewBox="0 0 100 58"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <DiagramSvgEdge
            edgeId="recovery-policy"
            dashed
            d="M 84 36 C 70 50, 28 50, 22 16"
          />
        </svg>
        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <DiagramSvgEdge
            edgeId="updated-policy"
            dashed
            d="M 90 78 C 97 70, 97 20, 28 16"
          />
        </svg>

        <div className="flex flex-col gap-1.5 md:flex-row md:items-center">
          <div className="min-w-0 md:flex-[1.15]">
            <DiagramChain
              items={[
                { id: "task", label: "Task", icon: <RouteFlagIcon /> },
                {
                  id: "policy",
                  label: "Agent Policy",
                  icon: <BrainIcon />,
                  edgeId: "task-policy",
                },
                {
                  id: "tool",
                  label: "Tool Call",
                  icon: <TerminalGearIcon />,
                  edgeId: "policy-tool",
                },
                {
                  id: "repo",
                  label: "Repo Environment",
                  icon: <RepoGitIcon />,
                  edgeId: "tool-repo",
                },
              ]}
            />
          </div>
          <div className="flex justify-center md:px-1">
            <span className="md:hidden">
              <DiagramArrow edgeId="repo-obs" direction="down" />
            </span>
            <span className="hidden md:block">
              <DiagramArrow edgeId="repo-obs" direction="right" />
            </span>
          </div>
          <div className="md:w-[18%] md:shrink-0">
            <div className="hidden flex-col items-stretch gap-1 md:flex">
              <DiagramCard
                id="completion"
                label="Task Completion"
                icon={<CompletionIcon />}
                size="sm"
              />
              <div className="flex justify-center">
                <UpArrow edgeId="obs-complete" />
              </div>
              <DiagramCard id="observation" label="Observation" icon={<EyeFocusIcon />} />
            </div>
            <div className="md:hidden">
              <DiagramCard id="observation" label="Observation" icon={<EyeFocusIcon />} />
              <div className="my-1 flex justify-center">
                <DiagramArrow edgeId="obs-complete" direction="down" />
              </div>
              <DiagramCard
                id="completion"
                label="Task Completion"
                icon={<CompletionIcon />}
                size="sm"
              />
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-col items-stretch gap-1.5 md:mt-2 md:flex-row md:items-center md:justify-end">
          <div className="flex justify-center md:mr-2">
            <DiagramArrow edgeId="obs-fail" direction="down" dashed />
          </div>
          <div className="md:w-[42%] md:shrink-0">
            <DiagramChain
              items={[
                {
                  id: "failureDetection",
                  label: "Failure Detection",
                  icon: <ShieldExclaimIcon />,
                  size: "sm",
                  dashed: true,
                },
                {
                  id: "recovery",
                  label: "Recovery",
                  icon: <RetryIcon />,
                  edgeId: "fail-recovery",
                  size: "sm",
                  dashed: true,
                },
              ]}
            />
          </div>
        </div>

        <div className="mt-2 flex flex-col items-end gap-1 md:mt-1 md:items-center">
          <DiagramNote annotationId="continue">Continue</DiagramNote>
          <p className="diagram-note md:hidden">→ Agent Policy</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] md:items-stretch">
          <DiagramPanel id="fixedSetup" className="px-4 py-4">
            <p className="font-display text-lg text-[var(--sakura-accent-deep)]">Fixed setup</p>
            <ul className="mt-3 space-y-2.5">
              <SetupRow icon={<CubeIcon size={16} />} label="Qwen2.5-Coder-7B" />
              <SetupRow icon={<ContainerIcon size={16} />} label="Harness / Docker" />
              <SetupRow icon={<CodeBracketsIcon size={16} />} label="Tool protocol" />
              <SetupRow icon={<GaugeIcon size={16} />} label="Inference budget" />
            </ul>
          </DiagramPanel>

          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <DiagramCard
                id="successTrajectories"
                label="Success Trajectories"
                icon={<TrophyIcon />}
                size="sm"
              />
              <DiagramCard
                id="failureTrajectories"
                label="Failure Trajectories"
                icon={<WarningTriangleIcon />}
                size="sm"
              />
            </div>
            <div className="flex items-center justify-center">
              <span className="md:hidden">
                <DiagramArrow edgeId="success-sft" direction="down" />
              </span>
              <span className="hidden md:block">
                <DiagramArrow edgeId="success-sft" direction="right" />
              </span>
            </div>
            <div className="min-w-0 flex-[1.85]">
              <DiagramChain
                items={[
                  { id: "sft", label: "Policy-aware SFT", icon: <BookPencilIcon />, size: "sm" },
                  {
                    id: "grpo",
                    label: "GRPO",
                    icon: <BalanceScaleIcon />,
                    edgeId: "sft-grpo",
                    size: "sm",
                  },
                  {
                    id: "updatedAgent",
                    label: "Updated Agent",
                    icon: <BrainUpIcon />,
                    edgeId: "grpo-updated",
                    size: "sm",
                  },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <DiagramPlaque
            id="plaque-complete"
            label="Task Completion"
            icon={<CheckCircleIcon />}
          />
          <DiagramPlaque
            id="plaque-recovery"
            label="Failure Recovery"
            icon={<ShieldCheckIcon />}
          />
          <DiagramPlaque
            id="plaque-cost"
            label="Cost-aware Evaluation"
            icon={<BalanceScaleIcon />}
          />
        </div>
      </div>
    </DiagramScene>
  );
}

function SetupRow({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <li className="flex items-center gap-2.5 text-sm text-[var(--sakura-ink-soft)]">
      <span className="text-[var(--sakura-accent-deep)]">{icon}</span>
      <span>{label}</span>
    </li>
  );
}
