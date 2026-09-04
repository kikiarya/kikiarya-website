export type GraphEdge = {
  id: string;
  from: string;
  to: string;
};

export type HoverOverride = {
  nodes: string[];
  edges: string[];
  annotations?: string[];
};

export type HoverSet = {
  nodes: Set<string>;
  edges: Set<string>;
  annotations: Set<string>;
};

const EMPTY: HoverSet = {
  nodes: new Set(),
  edges: new Set(),
  annotations: new Set(),
};

function toSet(values: Iterable<string>): Set<string> {
  return new Set(values);
}

/** Resolve highlight from an authored override, else the 1-hop neighborhood. */
export function resolveHover(
  activeId: string | null,
  edges: GraphEdge[],
  overrides: Record<string, HoverOverride>,
): HoverSet {
  if (!activeId) return EMPTY;

  const authored = overrides[activeId];
  if (authored) {
    return {
      nodes: toSet(authored.nodes),
      edges: toSet(authored.edges),
      annotations: toSet(authored.annotations ?? []),
    };
  }

  const nodes = new Set<string>([activeId]);
  const edgeIds = new Set<string>();
  for (const edge of edges) {
    if (edge.from === activeId || edge.to === activeId) {
      edgeIds.add(edge.id);
      nodes.add(edge.from);
      nodes.add(edge.to);
    }
  }
  return { nodes, edges: edgeIds, annotations: new Set() };
}
