"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Tag from "./Tag";
import MetricRow from "./MetricRow";
import type { Project } from "../lib/projects";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.18 } }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.06, 0.24), ease }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group grid md:grid-cols-[5rem_minmax(0,1fr)_auto] gap-4 md:gap-8 items-start py-8 md:py-10 px-4 -mx-4 rounded-2xl border-t border-[var(--sakura-line-soft)] transition-[background-color,transform] duration-300 hover:bg-[var(--sakura-surface-soft)] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--sakura-accent-deep)]"
      >
        <span className="font-display text-3xl tabular-nums text-[var(--sakura-muted-soft)] transition-colors duration-300 group-hover:text-[var(--sakura-accent-deep)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <p className="eyebrow mb-3">
            {project.venue ?? project.categoryTags.slice(0, 2).join(" · ")}
          </p>
          <h3 className="font-display text-card-title font-normal">
            <span className="bg-gradient-to-r from-[var(--sakura-accent-deep)] to-[var(--sakura-accent-deep)] bg-no-repeat bg-left-bottom bg-[length:0%_1px] transition-[background-size] duration-[450ms] group-hover:bg-[length:100%_1px]">
              {project.cardTitle ?? project.title}
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
          Open{" "}
          <ArrowUpRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </Link>
    </motion.article>
  );
}
