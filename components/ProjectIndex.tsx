"use client";

import { useDeferredValue, useState } from "react";
import { Search } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { projects } from "../lib/projects";

const filters = ["All", "AI / Agent", "Machine Learning", "Software Engineering", "Research / Coursework"];
function matches(category: string, tags: string[]) {
  const value = tags.join(" ").toLowerCase();
  if (category === "All") return true;
  if (category === "AI / Agent") return /ai product|ai \/ agent|openai|agent/.test(value);
  if (category === "Machine Learning") return /ai\/ml|data\/ml|research/.test(value);
  if (category === "Software Engineering") return /full-stack|distributed|backend|mean/.test(value);
  return /research|data\/ml|distributed|full-stack|ai \/ agent/.test(value);
}

export default function ProjectIndex() {
  const [filter, setFilter] = useState("All"); const [query, setQuery] = useState(""); const deferredQuery = useDeferredValue(query.toLowerCase());
  const filtered = projects.filter(project => matches(filter, project.categoryTags) && `${project.title} ${project.shortDescription} ${project.techStack.join(" ")}`.toLowerCase().includes(deferredQuery));
  return <><div className="mb-14 flex flex-col lg:flex-row gap-6 justify-between lg:items-center"><div className="flex flex-wrap gap-2" aria-label="Project filters">{filters.map(item => <button key={item} onClick={() => setFilter(item)} aria-pressed={filter === item} className={`min-h-11 rounded-full border px-4 font-mono text-[10px] uppercase tracking-[.1em] ${filter === item ? "bg-[var(--sakura-accent-deep)] text-white border-transparent" : "bg-[var(--sakura-surface-soft)] border-[var(--sakura-line-soft)] text-[var(--sakura-ink-soft)]"}`}>{item}</button>)}</div><label className="relative block w-full lg:w-80"><span className="sr-only">Search projects</span><Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--sakura-muted)]" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search projects" className="w-full min-h-11 rounded-full border border-[var(--sakura-line-soft)] bg-[var(--sakura-bg-deep)] pl-11 pr-5 text-sm placeholder:text-[var(--sakura-muted)] focus:ring-2 focus:ring-[var(--sakura-accent)]" /></label></div><div aria-live="polite">{filtered.length ? filtered.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />) : <p className="py-24 text-center font-mono text-xs text-[var(--sakura-muted)]">No projects match this filter.</p>}</div></>;
}
