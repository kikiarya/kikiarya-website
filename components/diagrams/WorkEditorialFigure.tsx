"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { ProjectDiagram } from "../../lib/projects";

function PlateSkeleton() {
  return (
    <div className="diagram-plate min-h-[22rem]" aria-hidden="true">
      <div className="diagram-plate-inner">
        <p className="eyebrow">Fig. Architecture</p>
        <div className="mt-8 h-40 rounded-2xl bg-[var(--sakura-paper-soft)]" />
      </div>
    </div>
  );
}

const EditorialFigure = dynamic(() => import("./EditorialFigure"), {
  ssr: false,
  loading: PlateSkeleton,
});

export default function WorkEditorialFigure({ diagram }: { diagram: ProjectDiagram }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const show = () => {
      if (!cancelled) setReady(true);
    };
    const idleId =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(show, { timeout: 400 })
        : undefined;
    const timeoutId =
      idleId === undefined ? window.setTimeout(show, 0) : undefined;
    return () => {
      cancelled = true;
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  if (!ready) return <PlateSkeleton />;
  return <EditorialFigure diagram={diagram} />;
}
