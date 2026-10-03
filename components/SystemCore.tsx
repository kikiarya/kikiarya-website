"use client";

import { useState } from "react";
import Link from "next/link";

const systems = [
  {
    key: "observe",
    label: "Observe",
    labelZh: "感知",
    signal: "Input → context",
    description: "Parse the task, retrieve relevant evidence, and make uncertainty visible before acting.",
    descriptionZh: "先理解任务、查找依据，再把不确定之处标出来。",
    slug: "ai-career-copilot",
  },
  {
    key: "decide",
    label: "Decide",
    labelZh: "决策",
    signal: "State → action",
    description: "Choose the next action from task state, feedback, and prior attempts.",
    descriptionZh: "结合当前状态、执行反馈和此前尝试，决定下一步。",
    slug: "latent-action-reparameterization",
  },
  {
    key: "act",
    label: "Act",
    labelZh: "执行",
    signal: "Intent → tool",
    description: "Cross the tool boundary with exact arguments and a deliberately small action surface.",
    descriptionZh: "保留精确参数，只开放完成任务所需的工具操作。",
    slug: "coding-agent-policy-optimization",
  },
  {
    key: "verify",
    label: "Verify",
    labelZh: "验证",
    signal: "Result → evidence",
    description: "Check the outcome against tests, evidence, and the boundary of what the run can prove.",
    descriptionZh: "用测试和证据核对结果，同时说明结论的适用范围。",
    slug: "openclaw-stateful-agent-runtime",
  },
  {
    key: "recover",
    label: "Recover",
    labelZh: "恢复",
    signal: "Failure → replan",
    description: "Checkpoint useful state so a failed run can replan instead of restarting from zero.",
    descriptionZh: "保存失败前的有效进度，让下一次尝试不必从头开始。",
    slug: "coding-agent-policy-optimization",
  },
] as const;

type SystemKey = (typeof systems)[number]["key"];

export default function SystemCore() {
  const [active, setActive] = useState(0);
  const activeSystem = systems[active] ?? systems[0];

  const nodeClass = (...keys: SystemKey[]) =>
    `runtime-node${keys.includes(activeSystem.key) ? " is-active" : ""}`;
  const edgeClass = (...keys: SystemKey[]) =>
    `runtime-edge${keys.includes(activeSystem.key) ? " is-active" : ""}`;

  return (
    <div className="system-core">
      <div className="eyebrow">Agent runtime</div>

      <div className="core-runtime">
        <div className="runtime-legend" aria-hidden="true">
          <span><i /> Runtime online</span>
          <span>Recoverable state</span>
        </div>

        <svg viewBox="0 0 520 296" aria-hidden="true" className="core-runtime-map">
          <defs>
            <pattern id="runtime-grid" width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M18 0H0V18" className="runtime-grid-line" />
            </pattern>
            <linearGradient id="runtime-active" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="var(--sakura-accent)" stopOpacity=".28" />
              <stop offset="1" stopColor="var(--sakura-bg-deep)" stopOpacity=".38" />
            </linearGradient>
          </defs>

          <rect x="1" y="1" width="518" height="294" rx="24" className="runtime-map-surface" />
          <rect x="1" y="1" width="518" height="294" rx="24" fill="url(#runtime-grid)" opacity=".62" />

          <path d="M122 112H174" className={edgeClass("observe", "decide")} />
          <path d="M278 95H358" className={edgeClass("decide", "act")} />
          <path d="M410 130V177" className={edgeClass("act", "verify")} />
          <path d="M358 211H278" className={edgeClass("verify", "recover")} />
          <path d="M226 177V132" className={edgeClass("recover", "decide")} />
          <path d="M388 130C363 153 320 160 278 160" className="runtime-edge runtime-edge-failure" />

          <g className={nodeClass("observe")}>
            <rect x="28" y="78" width="94" height="68" rx="14" />
            <text x="44" y="99" className="runtime-node-index">00 / INPUT</text>
            <text x="44" y="124" className="runtime-node-title">OBSERVE</text>
            <circle cx="105" cy="125" r="4" className="runtime-node-dot" />
          </g>

          <g className={nodeClass("decide")}>
            <rect x="174" y="61" width="104" height="71" rx="15" />
            <text x="190" y="84" className="runtime-node-index">01 / DECIDE</text>
            <text x="190" y="111" className="runtime-node-title">DECIDE</text>
          </g>

          <g className={nodeClass("act")}>
            <rect x="358" y="61" width="104" height="69" rx="15" />
            <text x="374" y="84" className="runtime-node-index">02 / ACT</text>
            <text x="374" y="109" className="runtime-node-title">ACT</text>
          </g>

          <g className={nodeClass("verify")}>
            <rect x="358" y="177" width="104" height="68" rx="15" />
            <text x="374" y="200" className="runtime-node-index">03 / CHECK</text>
            <text x="374" y="226" className="runtime-node-title">VERIFY</text>
          </g>

          <g className={nodeClass("recover")}>
            <rect x="174" y="177" width="104" height="68" rx="15" />
            <text x="190" y="200" className="runtime-node-index">04 / REPLAN</text>
            <text x="190" y="226" className="runtime-node-title">RECOVER</text>
          </g>

          <g className="runtime-recovery-badge">
            <rect x="278" y="143" width="80" height="34" rx="17" />
            <circle cx="294" cy="160" r="4" />
            <text x="306" y="164">REPLAN</text>
          </g>

          <text x="28" y="273" className="runtime-foot-label">FAILURE BECOMES STATE, NOT A RESTART.</text>
          <text x="462" y="273" textAnchor="end" className="runtime-foot-count">04 EVENTS</text>
        </svg>

        <div className="runtime-readout" aria-live="polite">
          <span>{String(active + 1).padStart(2, "0")} / Runtime loop · 运行循环</span>
          <strong>{activeSystem.signal}</strong>
        </div>
      </div>

      <div className="core-tabs" aria-label="Explore the agent runtime loop / 查看 Agent 运行循环">
        {systems.map((system, index) => (
          <button
            key={system.key}
            aria-pressed={active === index}
            aria-label={`${system.label} / ${system.labelZh}`}
            onClick={() => setActive(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{system.label}</span>
            <small lang="zh-CN">{system.labelZh}</small>
          </button>
        ))}
      </div>

      <p className="core-description">
        {activeSystem.description}
        <span lang="zh-CN">{activeSystem.descriptionZh}</span>
      </p>
      <Link className="studio-link" href={`/work/${activeSystem.slug}`}>
        Explore {activeSystem.label.toLowerCase()} · <span lang="zh-CN">查看相关项目</span>{" "}
        <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
