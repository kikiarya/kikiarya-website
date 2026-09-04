"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Bow from "./decor/Bow";
import SilkRibbon from "./decor/SilkRibbon";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";
import { smoothScrollTo } from "./motion/SmoothScroll";
import { navigateWithViewTransition } from "./motion/viewTransitionNav";

const ease = [0.16, 1, 0.3, 1] as const;

const rows = [
  {
    label: "Seeking",
    value: "Agent algorithms · AI engineering",
    href: "/resume",
  },
  {
    label: "Paper",
    value: "LAR · NeurIPS 2026 under review",
    href: "/work/latent-action-reparameterization",
    preview: "TriviaQA 80.09%",
  },
  {
    label: "Latest",
    value: "Coding agent · OpenClaw",
    href: "#work",
    preview: "+6pp resolve · Coding agent",
  },
  {
    label: "Graduation",
    value: "December 2026",
  },
];

export default function HeroStatusCard() {
  const reduce = usePrefersReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const router = useRouter();

  return (
    <motion.aside
      className="relative sakura-glass rounded-[1.75rem] px-6 py-6"
      animate={reduce ? undefined : { y: [0, -4, 0] }}
      transition={
        reduce
          ? undefined
          : { duration: 7.2, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow">Status</p>
        <motion.div
          aria-hidden="true"
          className="text-[var(--sakura-accent-deep)]"
          animate={
            reduce
              ? undefined
              : { rotate: [-5, 6, -3, 5, -5], y: [0, -2, 1, -2, 0] }
          }
          transition={
            reduce
              ? undefined
              : {
                  duration: 4.8,
                  repeat: Infinity,
                  ease: [0.34, 1.4, 0.64, 1],
                }
          }
        >
          <Bow size={28} variant="soft" />
        </motion.div>
      </div>

      <ul className="mt-6 space-y-0">
        {rows.map((row) => {
          const body = (
            <>
              <p className="font-mono text-[0.68rem] uppercase tracking-[.14em] text-[var(--sakura-muted)]">
                {row.label}
              </p>
              <p className="mt-1 font-display text-[1.15rem] leading-snug">{row.value}</p>
              <AnimatePresence>
                {row.preview && hovered === row.label ? (
                  <motion.p
                    key={row.preview}
                    className="mt-2 font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-accent-deep)]"
                    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: reduce ? 0.1 : 0.28, ease }}
                  >
                    {row.preview}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </>
          );
          return (
            <li
              key={row.label}
              className="border-t border-[var(--sakura-line-soft)] py-3.5 first:border-t-0 first:pt-0 last:pb-0"
              onMouseEnter={() => setHovered(row.label)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(row.label)}
              onBlur={() => setHovered(null)}
            >
              {row.href?.startsWith("#") ? (
                <a
                  href={row.href}
                  className="block transition-colors duration-200 hover:text-[var(--sakura-accent-deep)]"
                  onClick={(event) => {
                    event.preventDefault();
                    if (row.href) smoothScrollTo(row.href);
                  }}
                >
                  {body}
                </a>
              ) : row.href ? (
                <Link
                  href={row.href}
                  className="block transition-colors duration-200 hover:text-[var(--sakura-accent-deep)]"
                  onClick={(event) => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                    if (!row.href.startsWith("/work/")) return;
                    event.preventDefault();
                    navigateWithViewTransition(router, row.href, reduce);
                  }}
                >
                  {body}
                </Link>
              ) : (
                body
              )}
            </li>
          );
        })}
      </ul>

      <p className="font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-muted)] mt-5">
        Updated Aug 2026
      </p>
      <SilkRibbon
        width={132}
        flowing={!reduce}
        className="mt-4 text-[var(--sakura-accent)]"
      />
    </motion.aside>
  );
}
