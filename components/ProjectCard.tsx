"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Tag from "./Tag";
import type { Project } from "../lib/projects";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <motion.article layout initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: .7, delay: Math.min(index * .06, .24), ease: [0.16, 1, 0.3, 1] }}>
    <Link href={`/work/${project.slug}`} className="group grid md:grid-cols-[5rem_minmax(0,1fr)_auto] gap-4 md:gap-8 items-start py-8 md:py-10 border-t border-[var(--sakura-line-soft)] focus-visible:ring-2 focus-visible:ring-[var(--sakura-accent-deep)] rounded-sm">
      <span className="font-display text-3xl text-[var(--sakura-muted-soft)]">{String(index + 1).padStart(2, "0")}</span>
      <div><p className="eyebrow mb-3">{project.categoryTags.slice(0, 2).join(" · ")}</p><h3 className="font-display text-3xl md:text-4xl font-normal leading-tight group-hover:text-[var(--sakura-accent-deep)] transition-colors">{project.title}</h3><p className="mt-3 max-w-2xl text-sm md:text-base leading-7 text-[var(--sakura-ink-soft)]">{project.shortDescription}</p><div className="mt-5 flex flex-wrap gap-2">{project.techStack.slice(0, 4).map(item => <Tag key={item} label={item} />)}</div></div>
      <span className="hidden md:flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.12em] text-[var(--sakura-muted)] group-hover:text-[var(--sakura-accent-deep)]">Open <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
    </Link>
  </motion.article>;
}
