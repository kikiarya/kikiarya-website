"use client";

import MetricRow from "./MetricRow";
import type { ProjectMetric } from "../lib/projects";

/** Newspaper dateline of metrics — not a glass card. */
export default function FolioMasthead({ metrics }: { metrics: ProjectMetric[] }) {
  return (
    <div className="border-y border-[var(--sakura-line-soft)] py-6 md:py-7">
      <p className="eyebrow">At a glance</p>
      <MetricRow
        metrics={metrics}
        size="folio"
        className="mt-5 grid w-full grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] gap-x-10 gap-y-5"
      />
    </div>
  );
}
