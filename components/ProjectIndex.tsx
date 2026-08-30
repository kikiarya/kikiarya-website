"use client";

import { useDeferredValue, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { projects } from "../lib/projects";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

const ease = [0.16, 1, 0.3, 1] as const;

const filters = [
  "All",
  "AI / Agent",
  "Machine Learning",
  "Software Engineering",
  "Research / Coursework",
];

function matches(category: string, tags: string[]) {
  const value = tags.join(" ").toLowerCase();
  if (category === "All") return true;
  if (category === "AI / Agent") return /ai product|ai \/ agent|openai|agent/.test(value);
  if (category === "Machine Learning") return /ai\/ml|data\/ml|research/.test(value);
  if (category === "Software Engineering")
    return /full-stack|distributed|backend|mean|interactive/.test(value);
  return /research|data\/ml|distributed|full-stack|ai \/ agent|interactive/.test(value);
}

export default function ProjectIndex() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.toLowerCase());
  const reduce = usePrefersReducedMotion();

  const filtered = projects.filter(
    (project) =>
      matches(filter, project.categoryTags) &&
      `${project.title} ${project.shortDescription} ${project.techStack.join(" ")}`
        .toLowerCase()
        .includes(deferredQuery)
  );

  return (
    <>
      <div className="mb-14 flex flex-col lg:flex-row gap-6 justify-between lg:items-center">
        <div className="flex flex-wrap gap-2" aria-label="Project filters">
          {filters.map((item) => {
            const active = filter === item;
            return (
              <button
                key={item}
                onClick={() => setFilter(item)}
                aria-pressed={active}
                className={`relative min-h-11 rounded-full border px-4 font-mono text-meta uppercase tracking-[.1em] transition-colors duration-200 ${
                  active
                    ? "border-transparent text-white"
                    : "bg-[var(--sakura-surface-soft)] border-[var(--sakura-line-soft)] text-[var(--sakura-ink-soft)] hover:text-[var(--sakura-accent-deep)] hover:border-[var(--sakura-line)]"
                }`}
              >
                {active && !reduce ? (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-[var(--sakura-accent-deep)]"
                    transition={{ duration: 0.45, ease }}
                  />
                ) : active ? (
                  <span className="absolute inset-0 rounded-full bg-[var(--sakura-accent-deep)]" />
                ) : null}
                <span className="relative z-10">{item}</span>
              </button>
            );
          })}
        </div>
        <label className="relative block w-full lg:w-80">
          <span className="sr-only">Search projects</span>
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--sakura-muted)]"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects"
            className="w-full min-h-11 rounded-full border border-[var(--sakura-line-soft)] bg-[var(--sakura-bg-deep)] pl-11 pr-5 text-sm placeholder:text-[var(--sakura-muted)] transition-shadow duration-200 focus:ring-2 focus:ring-[var(--sakura-accent)]"
          />
        </label>
      </div>
      <div aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.length ? (
            filtered.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease }}
              className="py-24 text-center font-mono text-meta text-[var(--sakura-muted)]"
            >
              No projects match this filter.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
