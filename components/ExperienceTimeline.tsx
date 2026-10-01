"use client";

import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

const ease = [0.16, 1, 0.3, 1] as const;

type ExperienceEntry = {
  date: string;
  title: string;
  copy: string;
  facts: string[];
  detail: {
    problem: string;
    action: string;
    evidence: string;
  };
  href?: string;
  linkLabel?: string;
};

const entries: ExperienceEntry[] = [
  {
    date: "Dec 2025 — Feb 2026",
    title: "AIsphere · PixVerse Game",
    href: "/work/pixverse-realtime-agent",
    linkLabel: "Explore the interaction architecture ↗",
    copy: "Interactive video that follows what the player types. Prompt and context built from game state, segmented generation, and session recovery when a network or generation fails.",
    facts: [
      "Player text → task state",
      "Segmented video generation",
      "Session recovery on failure",
    ],
    detail: {
      problem: "Interactive generation has to preserve the player’s intent while video segments and network events arrive over time.",
      action: "Worked on WebSocket / Session / GenerationTask synchronization, Suggestion frontend and backend, and LLM task-branch context and output handling.",
      evidence: "Architecture reconstructed from historical internship notes. The public diagrams distinguish personal work from proposed failure-handling designs.",
    },
  },
  {
    date: "Jul 2024 — Dec 2026",
    title: "University of Sydney",
    copy: "Master of Computer Science. Software engineering, data science & AI. Currently exploring how agents learn better actions and retain useful state.",
    facts: [
      "Master of Computer Science",
      "Software Engineering + Data Science & AI",
      "Graduating December 2026",
    ],
    detail: {
      problem: "Connect model-level research with the software and data systems needed to make agent behavior observable and recoverable.",
      action: "Combined the Software Engineering and Data Science & AI streams with research and system-building projects.",
      evidence: "Degree, study period, project record, and public résumé are linked from this site.",
    },
    href: "/resume",
    linkLabel: "Education & experience ↗",
  },
];

export default function ExperienceTimeline() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start 78%", "end 42%"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.45,
  });

  return (
    <div ref={rootRef} id="experience-list" className="experience-timeline">
      <span className="experience-track" aria-hidden="true">
        <motion.span style={{ scaleY: reduce ? 1 : lineProgress }} />
      </span>
      <div className="experience-list">
        {entries.map((entry, index) => (
          <motion.article
            key={entry.title}
            className="experience-entry"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.42 }}
            transition={{ duration: reduce ? 0.15 : 0.68, delay: index * 0.08, ease }}
          >
            <span className="experience-node" aria-hidden="true" />
            <p className="eyebrow experience-date">{entry.date}</p>
            <div>
              <h3>{entry.title}</h3>
              <p>{entry.copy}</p>
              <ul className="experience-facts" aria-label={`${entry.title} key facts`}>
                {entry.facts.map((fact) => <li key={fact}>{fact}</li>)}
              </ul>
              <button
                type="button"
                className="experience-detail-trigger"
                aria-expanded={expanded === entry.title}
                onClick={() => setExpanded((current) => current === entry.title ? null : entry.title)}
              >
                View case details / 查看详情
                <ChevronDown size={15} aria-hidden="true" />
              </button>
              <AnimatePresence initial={false}>
                {expanded === entry.title ? (
                  <motion.div
                    className="experience-detail"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                    transition={{ duration: reduce ? 0.12 : 0.35, ease }}
                  >
                    <dl>
                      <div><dt>Problem / 问题</dt><dd>{entry.detail.problem}</dd></div>
                      <div><dt>Action / 做法</dt><dd>{entry.detail.action}</dd></div>
                      <div><dt>Evidence / 证据</dt><dd>{entry.detail.evidence}</dd></div>
                    </dl>
                    {entry.href && entry.linkLabel ? (
                      <Link href={entry.href} className="studio-link mt-4">
                        {entry.linkLabel}
                      </Link>
                    ) : null}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
