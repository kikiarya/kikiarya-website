"use client";

import { useState } from "react";
import AtlasDiagram from "./AtlasDiagram";
import atlas from "../lib/project-atlas.json";

export default function ProjectSystemAtlas({ slug }: { slug: string }) {
  const [selected, setSelected] = useState(0);
  const project = atlas.find((item) => item.slug === slug);
  if (!project) return null;
  const diagram = project.diagrams[selected];
  return (
    <section aria-label={`${project.title} architecture atlas`} className="min-w-0 overflow-hidden rounded-3xl border border-[var(--sakura-line-soft)] bg-[var(--sakura-bg-deep)] text-[var(--sakura-ink)]">
      <div className="border-b border-[var(--sakura-line-soft)] p-5 md:p-7">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--sakura-accent-deep)]">Engineering atlas · 03 views</p>
        <p className="mt-3 text-sm">{project.status}</p>
        <div className="mt-5 flex flex-wrap gap-2" aria-label="Diagram views">
          {project.diagrams.map((item, index) => (
            <button key={item.key} type="button" aria-pressed={selected === index}
              onClick={() => setSelected(index)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sakura-accent-deep)] ${selected === index ? "border-[var(--sakura-accent-deep)] bg-[var(--sakura-accent-deep)] text-white" : "border-[var(--sakura-line)] bg-[var(--sakura-surface-soft)] text-[var(--sakura-ink-soft)] hover:bg-[var(--sakura-paper-soft)]"}`}>
              {['01 架构', '02 机制', '03 失败边界'][index]}
            </button>
          ))}
        </div>
      </div>
      <figure>
        <div className="overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--sakura-accent-deep)]" tabIndex={0} aria-label="Architecture diagram; scroll horizontally on small screens">
          <AtlasDiagram diagram={diagram} />
        </div>
        <figcaption className="space-y-4 border-t border-[var(--sakura-line-soft)] p-5 text-sm leading-7 md:p-7" aria-live="polite">
          <h3 className="text-lg font-semibold">{diagram.title}</h3>
          <p>{diagram.note}</p>
          <details>
            <summary className="cursor-pointer font-medium">查看文字说明与依据</summary>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              {'nodes' in diagram && diagram.nodes?.map(([title, detail]) => <li key={title}>{title}：{detail}</li>)}
              {'messages' in diagram && diagram.messages?.map((message, index) => <li key={index}>{String(message[2])}</li>)}
            </ol>
            <p className="mt-3 break-words text-xs text-[var(--sakura-muted)]">依据：{diagram.sources.join(' · ')}</p>
          </details>
          <a href={diagram.asset} download className="inline-block font-medium underline underline-offset-4">下载 SVG ↗</a>
          <span className="ml-4 text-xs text-[var(--sakura-muted)] sm:hidden">左右滑动可查看完整图</span>
        </figcaption>
      </figure>
    </section>
  );
}
