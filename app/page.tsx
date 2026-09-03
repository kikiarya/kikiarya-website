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
import Bow from "../components/decor/Bow";
import SilkRibbon from "../components/decor/SilkRibbon";
import RoseWindow from "../components/decor/RoseWindow";
import Pearl from "../components/decor/Pearl";
import { getFeaturedProjects } from "../lib/projects";
import { site } from "../lib/site";
import { usePrefersReducedMotion } from "../components/motion/usePrefersReducedMotion";

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

const beyond = [
  [
    "A garden in Unity",
    "I once built a walk-through classical garden — falling leaves, a waterfall, courtyards from old poems. It is still the reason this site is pink.",
  ],
  [
    "Group work, the other kind",
    "Student-union years: twenty people, one deadline, nobody is a git conflict but it feels like one.",
  ],
  [
    "Two hemispheres",
    "Grew up in China; live in Sydney now. Seasons have been backwards since 2024. I have given up correcting them.",
  ],
];

export default function Home() {
  const reduce = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0.2, 0.65], [0, -12]);
  const heroFade = useTransform(scrollYProgress, [0.2, 0.45], [1, 0]);

  const handleViewWork = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    smoothScrollTo("#work");
  };

  return (
    <>
      <section ref={heroRef} className="relative min-h-[92vh] pt-36 md:pt-44 flex items-center">
        <Container>
          <motion.div
            className="grid lg:grid-cols-[1fr_18rem] gap-16 items-end"
            style={reduce ? undefined : { y: heroY }}
          >
            <div>
              <FadeUp delay={0.1}>
                <p className="eyebrow mb-7">Hi, I&apos;m Kiki</p>
              </FadeUp>
              <h1 className="font-display text-hero font-light text-balance">
                <HeroLine text="LLM Agents," delay={0.24} />
                <HeroLine text="Post-training," delay={0.36} />
                <HeroLine
                  text="and AI Systems."
                  delay={0.48}
                  className="text-[var(--sakura-accent-deep)]"
                />
              </h1>
              <motion.div style={reduce ? undefined : { opacity: heroFade }}>
                <FadeUp delay={0.82}>
                  <p className="mt-10 max-w-2xl text-lg md:text-xl leading-8 text-[var(--sakura-ink-soft)]">
                    Master&apos;s student at the University of Sydney, finishing December 2026.
                    Recent work: coding-agent post-training and OpenClaw runtime compression. Last
                    summer at AIsphere on PixVerse Game — live video that follows what the player
                    types.
                  </p>
                </FadeUp>
                <FadeUp delay={0.96}>
                  <div className="mt-10 flex flex-wrap gap-3">
                    <a href="#work" onClick={handleViewWork} className="button-primary">
                      View work <ArrowUpRight size={15} />
                    </a>
                    <a
                      href={site.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="button-ghost"
                    >
                      <Github size={15} /> GitHub
                    </a>
                    <Link href="/resume" className="button-ghost">
                      Resume
                    </Link>
                  </div>
                </FadeUp>
              </motion.div>
            </div>
            <FadeUp delay={1.08} className="hidden lg:block pb-3">
              <motion.div
                className="relative overflow-hidden sakura-glass rounded-[2rem] p-8"
                whileHover={
                  reduce
                    ? undefined
                    : { y: -4, boxShadow: "0 14px 36px -18px rgba(169,71,109,.35)" }
                }
                transition={
                  reduce
                    ? { duration: 0.2 }
                    : { type: "spring", stiffness: 320, damping: 26 }
                }
              >
                <RoseWindow
                  size={220}
                  className="pointer-events-none absolute -right-16 -top-16 text-[var(--sakura-accent-deep)] opacity-[0.1]"
                />
                <div
                  aria-hidden="true"
                  className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center"
                >
                  <Bow
                    size={72}
                    variant="soft"
                    className="text-[var(--sakura-accent-deep)]"
                  />
                  <Pearl
                    size={8}
                    className="absolute right-0 top-3 text-[var(--sakura-accent)]"
                  />
                </div>
                <p className="eyebrow">Now</p>
                <p className="font-display text-2xl mt-3 leading-snug">
                  Open to agent algorithm and AI engineering roles
                </p>
                <p className="mt-4 font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-muted)]">
                  Graduating Dec 2026
                </p>
                <SilkRibbon
                  width={150}
                  className="mt-6 text-[var(--sakura-accent)]"
                />
              </motion.div>
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
                <div className="group bg-[var(--sakura-bg-deep)]/80 p-8 md:p-10 h-full">
                  <span className="font-display text-4xl tabular-nums text-[var(--sakura-muted-soft)] transition-colors duration-300 group-hover:text-[var(--sakura-accent-deep)]">
                    {number}
                  </span>
                  <h3 className="font-display text-card-title mt-12">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--sakura-ink-soft)]">{copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-36">
        <Container>
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
            <SectionHeader
              eyebrow="Beyond code"
              title="A few non-technical facts"
              description="Not a tech stack."
              ornament
            />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-10 md:gap-14">
            {beyond.map(([title, copy], i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="border-t border-[var(--sakura-line)] pt-7 h-full">
                  <h3 className="font-display text-card-title">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--sakura-ink-soft)]">{copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-36 section-rule">
        <Container>
          <Reveal>
            <div className="sakura-glass rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row justify-between md:items-end gap-10">
              <div>
                <p className="eyebrow">Contact</p>
                <h2 className="font-display text-chapter mt-5">Get in touch</h2>
              </div>
              <a href={`mailto:${site.email}`} className="button-primary">
                {site.email} <ArrowUpRight size={15} />
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
