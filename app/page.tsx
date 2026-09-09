"use client";

import { useRef, type MouseEvent } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Container from "../components/Container";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/motion/Reveal";
import SectionHeader from "../components/SectionHeader";
import SceneDecor from "../components/motion/SceneDecor";
import { FadeUp, HeroLine } from "../components/motion/HeroReveal";
import { smoothScrollTo } from "../components/motion/SmoothScroll";
import HeroGlow from "../components/motion/HeroGlow";
import HeroStatusCard from "../components/HeroStatusCard";
import FolioCorners from "../components/decor/FolioCorners";
import Bow from "../components/decor/Bow";
import LaceDivider from "../components/decor/LaceDivider";
import Pearl from "../components/decor/Pearl";
import Magnetic from "../components/motion/Magnetic";
import { getFeaturedProjects } from "../lib/projects";
import { site } from "../lib/site";
import { usePrefersReducedMotion } from "../components/motion/usePrefersReducedMotion";
import { navigateWithViewTransition } from "../components/motion/viewTransitionNav";
import { useRouter } from "next/navigation";

const focus = [
  [
    "01",
    "Agent algorithms",
    "Post-training, harness policy, latent actions — making agents cheaper and less fragile on long runs.",
  ],
  [
    "02",
    "Agent applications",
    "LangGraph workflows, RAG, tool calling, and the product layer that has to survive real networks.",
  ],
  [
    "03",
    "Systems underneath",
    "Services, queues, transactions. The parts that still work when there is no model in the loop.",
  ],
];

export default function Home() {
  const reduce = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0.2, 0.65], [0, -32]);
  const heroFade = useTransform(scrollYProgress, [0.2, 0.45], [1, 0]);

  const handleViewWork = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    smoothScrollTo("#work");
  };

  return (
    <>
      <section ref={heroRef} className="relative min-h-[92vh] pt-36 md:pt-44 flex items-center">
        <HeroGlow target={heroRef} />
        <FolioCorners className="mx-[min(4vw,2.5rem)] my-8" />
        <Container className="relative z-10">
          <motion.div
            className="grid lg:grid-cols-[minmax(0,1fr)_6.25rem_17.5rem] gap-8 xl:gap-10 items-end"
            style={reduce ? undefined : { y: heroY }}
          >
            <div>
              <FadeUp delay={0.1}>
                <p className="eyebrow mb-7">Hi, I&apos;m Kiki</p>
              </FadeUp>
              <h1 className="font-display text-hero font-light text-balance">
                <HeroLine text="LLM Agents," delay={0.24} hoverLift />
                <HeroLine text="Post-training," delay={0.36} hoverLift />
                <HeroLine
                  text="and AI Systems."
                  delay={0.48}
                  className="text-[var(--sakura-accent-deep)]"
                  hoverLift
                  hoverDeepen
                />
              </h1>
              <motion.div style={reduce ? undefined : { opacity: heroFade }}>
                <FadeUp delay={0.82}>
                  <p className="mt-10 max-w-xl text-lg md:text-xl leading-[1.65] text-[var(--sakura-ink-soft)]">
                    Master&apos;s student at the University of Sydney, finishing December 2026.
                    Recent work: coding-agent post-training and OpenClaw runtime compression. Last
                    summer at AIsphere on PixVerse Game — live video that follows what the player
                    types.
                  </p>
                </FadeUp>
                <FadeUp delay={0.96}>
                  <div className="mt-10 flex flex-wrap gap-3">
                    <Magnetic>
                      <a href="#work" onClick={handleViewWork} className="button-primary">
                        View work <ArrowUpRight size={15} />
                      </a>
                    </Magnetic>
                    <Magnetic>
                      <a
                        href={site.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="button-ghost"
                      >
                        <Github size={15} /> GitHub
                      </a>
                    </Magnetic>
                    <Magnetic>
                      <Link href="/resume" className="button-ghost">
                        Resume
                      </Link>
                    </Magnetic>
                  </div>
                </FadeUp>
              </motion.div>
            </div>
            <FadeUp
              delay={1.35}
              className="hidden lg:flex flex-col justify-end pb-6"
            >
              <motion.div
                className="flex flex-col gap-3"
                animate={reduce ? undefined : { y: [0, -5, 0] }}
                transition={
                  reduce
                    ? undefined
                    : { duration: 9, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <span
                  aria-hidden="true"
                  className="ml-1 h-10 w-px bg-[var(--sakura-line)]"
                />
                <Link
                  href="/work/latent-action-reparameterization"
                  className="font-mono text-[0.62rem] uppercase tracking-[.2em] leading-5 text-[var(--sakura-muted-soft)] transition-colors duration-200 hover:text-[var(--sakura-accent-deep)]"
                  onClick={(event) => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                    event.preventDefault();
                    navigateWithViewTransition(
                      router,
                      "/work/latent-action-reparameterization",
                      reduce
                    );
                  }}
                >
                  01
                  <br />
                  LAR
                  <br />
                  under review
                </Link>
              </motion.div>
            </FadeUp>
            <FadeUp delay={1.55} className="mt-8 lg:mt-0 pb-3">
              <HeroStatusCard />
            </FadeUp>
          </motion.div>
        </Container>
      </section>

      <section id="work" className="relative py-24 md:py-36 scroll-mt-24">
        <SceneDecor />
        <Container className="relative">
          <Reveal>
            <div className="flex items-end justify-between gap-8">
              <SectionHeader
                eyebrow="Selected work"
                title="Featured projects"
                description="A paper under review, coding-agent post-training, and runtime compression."
              />
              <Link href="/work" className="hidden sm:inline-flex button-ghost shrink-0">
                All work <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
          {getFeaturedProjects().map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </Container>
      </section>

      <section className="py-24 md:py-36 section-rule">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Focus"
              title="What I work on"
              description="Three things I spend time on. They overlap."
            />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-[var(--sakura-line-soft)] border border-[var(--sakura-line-soft)] rounded-[2rem] overflow-hidden">
            {focus.map(([number, title, copy], i) => (
              <Reveal key={number} delay={i * 0.08}>
                <div className="group relative bg-[var(--sakura-bg-deep)]/80 p-8 md:p-10 h-full">
                  <span className="pointer-events-none absolute right-7 top-7 text-[var(--sakura-accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-80">
                    <Pearl size={7} />
                  </span>
                  <span className="font-display text-4xl tabular-nums text-[var(--sakura-muted-soft)] transition-colors duration-300 group-hover:text-[var(--sakura-accent-deep)]">
                    {number}
                  </span>
                  <h3 className="font-display text-2xl mt-12">{title}</h3>
                  <p className="mt-4 text-sm leading-[1.65] text-[var(--sakura-ink-soft)]">{copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative py-24 md:py-36">
        <SceneDecor />
        <Container className="relative">
          <div className="grid lg:grid-cols-2 gap-16">
            <Reveal>
              <SectionHeader
                eyebrow="Now"
                title="Internship and graduation"
                description="Graduation project and one internship."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-8">
                <div className="border-l-2 border-[var(--sakura-accent)] pl-7">
                  <p className="eyebrow">Internship · Dec 2025 – Feb 2026</p>
                  <h3 className="font-display text-card-title mt-3">AIsphere · PixVerse Game</h3>
                  <p className="mt-3 text-[var(--sakura-ink-soft)] leading-7">
                    Generative interactive games: player text → task state → segmented video → live
                    stream. Prompt and context built from game state; session recovery when the
                    network or generation failed mid-run.
                  </p>
                </div>
                <div className="border-l-2 border-[var(--sakura-line)] pl-7">
                  <p className="eyebrow">Education · Jul 2024 – Dec 2026</p>
                  <h3 className="font-display text-card-title mt-3">University of Sydney</h3>
                  <p className="mt-3 text-[var(--sakura-ink-soft)] leading-7">
                    Master of Computer Science. Dual stream: software engineering, and data
                    science &amp; AI.
                  </p>
                </div>
                <div className="sakura-glass rounded-3xl p-7">
                  <p className="eyebrow">Status</p>
                  <p className="font-display text-2xl mt-3 leading-snug">
                    Looking for agent algorithm and AI engineering roles — graduating December 2026.
                  </p>
                  <p className="font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-muted)] mt-5">
                    Updated Aug 2026
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-36 section-rule">
        <Container>
          <Reveal>
            <div className="relative sakura-glass rounded-[2rem] md:rounded-[3rem] px-8 pb-8 pt-14 md:px-16 md:pb-16 md:pt-20 flex flex-col md:flex-row justify-between md:items-end gap-10 overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1 z-[1] -translate-x-1/2 text-[var(--sakura-accent-deep)]"
              >
                <Bow size={36} variant="soft" />
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-10 top-7 opacity-45">
                <LaceDivider scallop={16} picots />
              </div>
              <div>
                <p className="eyebrow">Contact</p>
                <h2 className="font-display text-chapter mt-5">Get in touch</h2>
              </div>
              <Magnetic>
                <a href={`mailto:${site.email}`} className="button-primary">
                  {site.email} <ArrowUpRight size={15} />
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
