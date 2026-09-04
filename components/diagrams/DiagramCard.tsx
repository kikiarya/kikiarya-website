"use client";

import type { ReactNode } from "react";
import { DiagramArrow } from "./DiagramArrow";
import { useDiagram } from "./DiagramScene";

export function DiagramCard({
  id,
  label,
  icon,
  size = "md",
  align = "center",
}: {
  id: string;
  label: string;
  icon: ReactNode;
  size?: "sm" | "md" | "lg";
  align?: "center" | "left";
}) {
  const { sourceId, highlight, bind } = useDiagram();
  const active = highlight.nodes.has(id);
  const source = sourceId === id;
  const pad = size === "lg" ? "px-3.5 py-3.5" : size === "sm" ? "px-2.5 py-2.5" : "px-3 py-3";

  return (
    <button
      type="button"
      data-diagram-active={active ? "true" : "false"}
      data-diagram-source={source ? "true" : "false"}
      className={`diagram-card w-full ${pad} ${
        align === "left" ? "text-left" : "text-center"
      }`}
      {...bind(id)}
    >
      <span
        className={`flex text-[var(--sakura-accent-deep)] ${
          align === "left" ? "justify-start" : "justify-center"
        }`}
      >
        {icon}
      </span>
      <span
        className={`mt-1.5 block font-display leading-tight text-[var(--sakura-ink)] ${
          size === "sm" ? "text-[0.78rem]" : "text-[0.88rem]"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

export function DiagramPlaque({
  id,
  label,
  icon,
  value,
}: {
  id: string;
  label: string;
  icon: ReactNode;
  value?: string;
}) {
  const { sourceId, highlight, bind } = useDiagram();
  const active = highlight.nodes.has(id);
  const source = sourceId === id;

  return (
    <button
      type="button"
      data-diagram-active={active ? "true" : "false"}
      data-diagram-source={source ? "true" : "false"}
      className="diagram-plaque w-full text-left"
      {...bind(id)}
    >
      <span className="diagram-plaque-pearl" aria-hidden="true" />
      <span className="flex items-center gap-3">
        <span className="text-[var(--sakura-accent-deep)]">{icon}</span>
        <span className="min-w-0">
          {value ? (
            <span className="block font-display text-2xl leading-none text-[var(--sakura-accent-deep)]">
              {value}
            </span>
          ) : null}
          <span
            className={`block font-display leading-snug text-[var(--sakura-ink)] ${
              value ? "mt-1 text-[0.92rem]" : "text-[0.98rem]"
            }`}
          >
            {label}
          </span>
        </span>
      </span>
    </button>
  );
}

export function DiagramFrame({
  id,
  className = "",
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  const { highlight } = useDiagram();
  const active = highlight.nodes.has(id);

  return (
    <div className={`diagram-panel ${className}`} data-diagram-active={active ? "true" : "false"}>
      {children}
    </div>
  );
}

export function DiagramPanel({
  id,
  className = "",
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  const { sourceId, highlight, bind } = useDiagram();
  const active = highlight.nodes.has(id);
  const source = sourceId === id;

  return (
    <button
      type="button"
      data-diagram-active={active ? "true" : "false"}
      data-diagram-source={source ? "true" : "false"}
      className={`diagram-panel w-full text-left ${className}`}
      {...bind(id)}
    >
      {children}
    </button>
  );
}

export function DiagramNote({
  annotationId,
  children,
  className = "",
}: {
  annotationId: string;
  children: ReactNode;
  className?: string;
}) {
  const { highlight } = useDiagram();
  const active = highlight.annotations.has(annotationId);

  return (
    <p className={`diagram-note ${className}`} data-diagram-active={active ? "true" : "false"}>
      {children}
    </p>
  );
}

export function DiagramBracket({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  const { highlight, bind } = useDiagram();
  const active = highlight.nodes.has(id) || highlight.annotations.has(id);

  return (
    <button type="button" className="mt-1 w-full px-1" {...bind(id)}>
      <div className="diagram-bracket h-3" data-diagram-active={active ? "true" : "false"} />
      <span
        className="diagram-note mt-1.5 block text-center"
        data-diagram-active={active ? "true" : "false"}
      >
        {label}
      </span>
    </button>
  );
}

export function DiagramChain({
  items,
  stack = false,
}: {
  items: {
    id: string;
    label: string;
    icon: ReactNode;
    edgeId?: string;
    dashed?: boolean;
    size?: "sm" | "md" | "lg";
  }[];
  stack?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-stretch gap-1.5 ${
        stack ? "" : "md:flex-row md:items-center"
      }`}
    >
      {items.map((item, index) => (
        <div key={item.id} className="contents">
          {index > 0 && item.edgeId ? (
            <div className="flex items-center justify-center">
              {stack ? (
                <DiagramArrow edgeId={item.edgeId} direction="down" dashed={item.dashed} />
              ) : (
                <>
                  <span className="md:hidden">
                    <DiagramArrow edgeId={item.edgeId} direction="down" dashed={item.dashed} />
                  </span>
                  <span className="hidden md:block">
                    <DiagramArrow edgeId={item.edgeId} direction="right" dashed={item.dashed} />
                  </span>
                </>
              )}
            </div>
          ) : null}
          <div className={`min-w-0 ${stack ? "" : "md:flex-1"}`}>
            <DiagramCard id={item.id} label={item.label} icon={item.icon} size={item.size} />
          </div>
        </div>
      ))}
    </div>
  );
}
