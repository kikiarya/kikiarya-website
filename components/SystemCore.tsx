"use client";

import { useState } from "react";
import Link from "next/link";

const systems = [
  {
    label: "Policy",
    description: "Learning better actions from experience.",
    slug: "latent-action-reparameterization",
  },
  {
    label: "Tools",
    description: "Turning decisions into verified changes.",
    slug: "coding-agent-policy-optimization",
  },
  {
    label: "Memory",
    description: "Keeping the state that makes recovery possible.",
    slug: "openclaw-stateful-agent-runtime",
  },
];

const ACCENT = "#a9476d";
const ACCENT_SOFT = "#d8849f";
const LINE = "rgba(177, 79, 113, 0.22)";
const MUTE = "rgba(154, 113, 126, 0.72)";

export default function SystemCore() {
  const [active, setActive] = useState(0);

  return (
    <div className="system-core">
      <div className="flex justify-between eyebrow">
        <span>System anatomy</span>
        <span>FIG. 001</span>
      </div>
      <svg viewBox="0 0 440 320" aria-hidden="true" className="core-art">
        <defs>
          <linearGradient id="core-petal" x2="1" y2="1">
            <stop stopColor="#e8bad2" stopOpacity=".75" />
            <stop offset="1" stopColor={ACCENT_SOFT} stopOpacity=".18" />
          </linearGradient>
          <radialGradient id="core-center" cx="50%" cy="42%" r="70%">
            <stop stopColor="#fffdfd" />
            <stop offset=".72" stopColor="#fff7f8" />
            <stop offset="1" stopColor="#f6dfe7" />
          </radialGradient>
        </defs>
        <circle cx="220" cy="160" r="122" fill="none" stroke="rgba(177, 79, 113, 0.12)" />
        <circle cx="220" cy="160" r="147" fill="none" stroke="rgba(177, 79, 113, 0.12)" strokeDasharray="2 11" />
        {[{ angle: -6, scale: 1 }, { angle: 113, scale: 0.93 }, { angle: 236, scale: 1.06 }].map(
          ({ angle, scale }, i) => (
          <g key={angle} transform={`rotate(${angle} 220 160) scale(${scale}) translate(${(1 - scale) * 220} ${(1 - scale) * 160})`}>
            <path
              d="M220 160C104 145 115 15 179 35C229 49 255 109 220 160Z"
              fill="url(#core-petal)"
              stroke={active === i ? ACCENT : MUTE}
              strokeWidth={active === i ? 2 : 1}
            />
            <path
              d="M220 160Q176 115 179 52"
              fill="none"
              stroke={active === i ? ACCENT : MUTE}
              strokeDasharray={active === i ? undefined : "2 4"}
            />
            <circle
              cx="179"
              cy="52"
              r={active === i ? 6 : 4}
              fill={active === i ? ACCENT : ACCENT_SOFT}
            />
          </g>
        ))}
        <circle cx="220" cy="160" r="33" fill="url(#core-center)" stroke="rgba(169, 71, 109, 0.42)" />
        <circle cx="220" cy="160" r="27" fill="none" stroke="rgba(169, 71, 109, 0.14)" />
        <path d="M210 160h20M220 150v20" stroke={ACCENT} strokeWidth="1.35" strokeLinecap="round" />
      </svg>
      <div className="core-tabs" aria-label="Explore system layers">
        {systems.map((s, i) => (
          <button
            key={s.label}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>
      <p className="core-description">{systems[active]?.description}</p>
      <Link className="studio-link" href={`/work/${systems[active]?.slug}`}>
        Explore {systems[active]?.label.toLowerCase()}{" "}
        <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
