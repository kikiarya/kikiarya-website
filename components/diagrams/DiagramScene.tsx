"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import DiagramReadout, { type NodeCopy } from "./DiagramReadout";
import {
  resolveHover,
  type GraphEdge,
  type HoverOverride,
  type HoverSet,
} from "./hover";

type DiagramContextValue = {
  sourceId: string | null;
  pinned: string | null;
  highlight: HoverSet;
  bind: (id: string) => {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
    onClick: (event: MouseEvent) => void;
  };
};

const DiagramContext = createContext<DiagramContextValue | null>(null);

export function useDiagram() {
  const value = useContext(DiagramContext);
  if (!value) {
    throw new Error("useDiagram must be used inside DiagramScene");
  }
  return value;
}

export function DiagramScene({
  edges,
  overrides,
  copy,
  children,
}: {
  edges: GraphEdge[];
  overrides: Record<string, HoverOverride>;
  copy: Record<string, NodeCopy>;
  children: ReactNode;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const [pin, setPin] = useState<string | null>(null);
  const sourceId = hover ?? pin;
  const highlight = useMemo(
    () => resolveHover(sourceId, edges, overrides),
    [sourceId, edges, overrides],
  );
  const pinnedCopy = pin ? copy[pin] : null;

  const bind = useCallback((id: string) => {
    return {
      onMouseEnter: () => setHover(id),
      onMouseLeave: () => setHover(null),
      onFocus: () => setHover(id),
      onBlur: () => setHover(null),
      onClick: (event: MouseEvent) => {
        event.stopPropagation();
        setPin((current) => (current === id ? null : id));
      },
    };
  }, []);

  const value = useMemo(
    () => ({ sourceId, pinned: pin, highlight, bind }),
    [sourceId, pin, highlight, bind],
  );

  return (
    <DiagramContext.Provider value={value}>
      <div className="diagram-scene" onClick={() => setPin(null)}>
        {children}
        {pinnedCopy ? <DiagramReadout copy={pinnedCopy} /> : (
          <p className="mt-5 text-center font-display text-sm italic text-[var(--sakura-muted)]">
            Click a node to read what it does.
          </p>
        )}
      </div>
    </DiagramContext.Provider>
  );
}

export function isNodeActive(highlight: HoverSet, id: string) {
  return highlight.nodes.has(id);
}

export function isEdgeActive(highlight: HoverSet, id: string) {
  return highlight.edges.has(id);
}

export function isAnnotationActive(highlight: HoverSet, id: string) {
  return highlight.annotations.has(id);
}
