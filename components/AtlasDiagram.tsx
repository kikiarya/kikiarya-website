"use client";

import { useId } from "react";

type Diagram = {
  kind: string; title: string; note: string;
  nodes?: string[][]; edges?: (string | number)[][];
  actors?: string[]; messages?: (string | number)[][];
};

export default function AtlasDiagram({ diagram }: { diagram: Diagram }) {
  const id = useId().replace(/:/g, "");
  const arrow = `${id}-arrow`;
  const sequence = diagram.kind === "sequence";
  const nodes = diagram.nodes ?? [];
  const actors = diagram.actors ?? [];
  const messages = diagram.messages ?? [];
  const height = sequence ? Math.max(650, 280 + messages.length * 66) : Math.max(540, 240 * Math.ceil(nodes.length / 3) + 60);
  const position = (index: number) => ({ x: 40 + index % 3 * 325, y: 130 + Math.floor(index / 3) * 240 });
  const actorX = (index: number) => actors.length <= 1 ? 500 : 170 + index * 660 / (actors.length - 1);

  return (
    <svg className="atlas-diagram block w-full min-w-[760px]" xmlns="http://www.w3.org/2000/svg" width={1000} height={height} viewBox={`0 0 1000 ${height}`} role="img" aria-labelledby={`${id}-title ${id}-desc`}>
      <title id={`${id}-title`}>{diagram.title}</title>
      <desc id={`${id}-desc`}>{diagram.note}</desc>
      <defs><marker id={arrow} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8" fill="none" className="atlas-arrow" /></marker></defs>
      <rect width="1000" height={height} rx="24" className="atlas-background" />
      <g fontFamily="Segoe UI,Microsoft YaHei,sans-serif" className="atlas-text">
        <text x="38" y="48" fontSize="23" fontWeight="600">{diagram.title}</text>
        <text x="38" y="78" fontSize="12" className="atlas-secondary">系统图谱 · 架构、机制与失败边界</text>
        {sequence ? <>
          {actors.map((actor, index) => <g key={index}>
            <rect x={actorX(index) - 120} y="104" width="240" height="54" rx="12" className="atlas-highlight" />
            <text x={actorX(index)} y="138" textAnchor="middle" fontSize="18">{actor}</text>
            <path d={`M${actorX(index)} 170 V${height - 40}`} className="atlas-lifeline" strokeDasharray="5 7" />
          </g>)}
          {messages.map(([from, to, label], index) => {
            const x = actorX(Number(from)), target = actorX(Number(to)), y = 213 + index * 66;
            const self = from === to;
            return <g key={index}>
              <path d={self ? `M${x} ${y} h65 v24 h-65` : `M${x} ${y} H${target}`} className="atlas-edge" markerEnd={`url(#${arrow})`} />
              <text x={self ? Math.min(x + 65, 960) : (x + target) / 2} y={y - 12} textAnchor={self ? "end" : "middle"} fontSize="14">{index + 1}. {label}</text>
            </g>;
          })}
        </> : <>
          {(diagram.edges ?? []).map(([from, to, label], index) => {
            const a = position(Number(from)), b = position(Number(to));
            let path: string, x: number, y: number;
            if (a.y === b.y) {
              const start = b.x > a.x ? a.x + 270 : a.x, end = b.x > a.x ? b.x : b.x + 270;
              const reverse = (diagram.edges ?? []).some(edge => edge[0] === to && edge[1] === from);
              const offset = reverse ? (b.x > a.x ? 12 : -12) : 0;
              path = `M${start} ${a.y + 49 + offset} H${end}`; x = (start + end) / 2; y = a.y + 38 + offset;
            } else {
              const start = a.y < b.y ? a.y + 98 : a.y, end = a.y < b.y ? b.y : b.y + 98, middle = (start + end) / 2;
              path = `M${a.x + 135} ${start} V${middle} H${b.x + 135} V${end}`;
              x = (a.x + b.x) / 2 + 135; y = middle - 9;
            }
            return <g key={index}><path d={path} className="atlas-edge" markerEnd={`url(#${arrow})`} /><text x={x} y={y} textAnchor="middle" fontSize="12" className="atlas-edge-label">{label}</text></g>;
          })}
          {nodes.map(([title, detail], index) => {
            const { x, y } = position(index);
            return <g key={index}>
              <rect x={x} y={y} width="270" height="98" rx="15" className={index === nodes.length - 1 ? "atlas-node atlas-highlight" : "atlas-node"} />
              <text x={x + 18} y={y + 34} fontSize="18" fontWeight="600">{title}</text>
              <text x={x + 18} y={y + 65} fontSize="13" className="atlas-secondary">{detail}</text>
            </g>;
          })}
        </>}
      </g>
    </svg>
  );
}
