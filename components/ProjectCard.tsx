"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Tag from "./Tag";
import ProjectArtwork from "./ProjectArtwork";
import MetricRow from "./MetricRow";
import type { Project } from "../lib/projects";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";
import {
  navigateWithViewTransition,
} from "./motion/viewTransitionNav";
import { workTitleVtName } from "../lib/workTitle";

const ease = [0.16, 1, 0.3, 1] as const;

function evidenceStrip(project: Project) {
  return [
    { label: "Problem / 问题", value: project.context ?? project.shortDescription },
    { label: "Mechanism / 机制", value: project.llmWorkflow ?? project.highlights[0] },
    { label: "Evidence / 证据", value: project.results ?? project.highlights.at(-1) ?? "See case study" },
  ];
}

const overviewDescriptions: Record<string, string> = {
  "latent-action-reparameterization": "将重复的 Agent 动作压缩为潜在表示，减少生成开销，并保留工具执行所需的参数。",
  "coding-agent-policy-optimization": "一起优化代码 Agent 的模型与运行环境，让失败后的重试、重新规划和恢复更有效。",
  "openclaw-stateful-agent-runtime": "压缩反复出现的静态提示词，观察生成成本与回答质量之间的取舍。",
};

export default function ProjectCard({ project, index, compact = false }: { project: Project; index: number; compact?: boolean }) {
  const router = useRouter();
  const reduce = usePrefersReducedMotion();
  const href = `/work/${project.slug}`;
  const title = project.cardTitle ?? project.title;

  if (project.featured) {
    const artworkIndex =
      project.slug === "latent-action-reparameterization"
        ? 0
        : project.slug === "coding-agent-policy-optimization"
          ? 1
          : 2;

    return (
      <motion.article
        className="project-featured-shell"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.24 }}
        transition={{ duration: reduce ? 0.15 : 0.72, delay: Math.min(index * 0.08, 0.16), ease }}
      >
        <Link href={href} className={`project-featured group ${compact ? "project-featured-overview" : ""}`}>
          <ProjectArtwork index={artworkIndex} minimal={compact} />
          <div>
            <p className="eyebrow mb-4">{project.venue ?? project.categoryTags.join(" / ")}</p>
            <h3>{title}</h3>
            {project.cardTitle && !compact ? (
              <p className="mt-2 text-sm text-[var(--sakura-muted)]">{project.title}</p>
            ) : null}
            <p className="mt-4 text-[var(--sakura-ink-soft)]">{compact ? overviewDescriptions[project.slug] ?? project.shortDescription : project.shortDescription}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.slice(0, 3).map((item) => (
                <Tag key={item} label={item} />
              ))}
            </div>
            {!compact ? <dl className="project-evidence-strip">
              {evidenceStrip(project).map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl> : null}
            <span className="studio-link mt-4">
              Read case study · <span lang="zh-CN">阅读案例</span> ↗
            </span>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.18 } }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.06, 0.24), ease }}
    >
      <Link
        href={href}
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          navigateWithViewTransition(router, href, reduce);
        }}
        className="group grid md:grid-cols-[5rem_minmax(0,1fr)_auto] gap-4 md:gap-8 items-start py-8 md:py-10 px-4 -mx-4 rounded-2xl border-t border-[var(--sakura-line-soft)] transition-[background-color,transform] duration-300 hover:bg-[var(--sakura-surface-soft)] hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[var(--sakura-accent-deep)]"
      >
        <span className="font-display text-3xl tabular-nums text-[var(--sakura-muted-soft)] transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-[var(--sakura-accent-deep)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <p className="eyebrow mb-3">
            {project.venue ?? project.categoryTags.slice(0, 2).join(" · ")}
          </p>
          <h3
            className="font-display text-card-title font-normal"
            style={{ viewTransitionName: workTitleVtName(project.slug) }}
          >
            <span className="bg-gradient-to-r from-[var(--sakura-accent-deep)] to-[var(--sakura-accent-deep)] bg-no-repeat bg-left-bottom bg-[length:0%_1px] transition-[background-size] duration-[450ms] group-hover:bg-[length:100%_1px]">
              {title}
            </span>
          </h3>
          {project.cardTitle ? (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--sakura-muted)]">
              {project.title}
            </p>
          ) : null}
          <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--sakura-ink-soft)]">
            {project.shortDescription}
          </p>
          {project.metrics?.length ? <MetricRow metrics={project.metrics} /> : null}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((item) => (
              <Tag key={item} label={item} />
            ))}
          </div>
        </div>
        <span className="hidden md:flex items-center gap-3 font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-muted)] transition-colors duration-300 group-hover:text-[var(--sakura-accent-deep)]">
          Open / <span lang="zh-CN">查看</span>{" "}
          <ArrowUpRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </Link>
    </motion.article>
  );
}
