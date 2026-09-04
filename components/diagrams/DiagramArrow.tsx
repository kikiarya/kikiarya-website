"use client";

import { useDiagram } from "./DiagramScene";

export function DiagramArrow({
  edgeId,
  direction = "right",
  dashed = false,
}: {
  edgeId: string;
  direction?: "right" | "down";
  dashed?: boolean;
}) {
  const { highlight } = useDiagram();
  const active = highlight.edges.has(edgeId);
  const horizontal = direction === "right";

  return (
    <svg
      className="diagram-edge-svg shrink-0"
      width={horizontal ? 28 : 16}
      height={horizontal ? 16 : 28}
      viewBox={horizontal ? "0 0 28 16" : "0 0 16 28"}
      aria-hidden="true"
      data-diagram-active={active ? "true" : "false"}
      data-diagram-dashed={dashed ? "true" : "false"}
    >
      {horizontal ? (
        <>
          <line x1="1" y1="8" x2="20" y2="8" />
          <polyline points="16,3.5 22.5,8 16,12.5" />
        </>
      ) : (
        <>
          <line x1="8" y1="1" x2="8" y2="20" />
          <polyline points="3.5,16 8,22.5 12.5,16" />
        </>
      )}
    </svg>
  );
}

export function DiagramSvgEdge({
  edgeId,
  d,
  dashed = false,
}: {
  edgeId: string;
  d: string;
  dashed?: boolean;
}) {
  const { highlight } = useDiagram();
  const active = highlight.edges.has(edgeId);

  return (
    <path
      d={d}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="diagram-edge-path"
      data-diagram-active={active ? "true" : "false"}
      data-diagram-dashed={dashed ? "true" : "false"}
    />
  );
}

export function DiagramMarkerDefs() {
  return (
    <defs>
      <marker
        id="diagram-arrow-flow"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto"
      >
        <path d="M1 1.5 8.5 5 1 8.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </marker>
      <marker
        id="diagram-arrow-feedback"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto"
      >
        <path d="M1 1.5 8.5 5 1 8.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </marker>
      <marker
        id="diagram-arrow-active"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto"
      >
        <path d="M1 1.5 8.5 5 1 8.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </marker>
    </defs>
  );
}
