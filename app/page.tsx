"use client";

import { useRef, type MouseEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import Container from "../components/Container";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/motion/Reveal";
import SectionHeader from "../components/SectionHeader";
import SceneDecor from "../components/motion/SceneDecor";
import { FadeUp, HeroLine } from "../components/motion/HeroReveal";
import { smoothScrollTo } from "../components/motion/SmoothScroll";
import { getFeaturedProjects } from "../lib/projects";

const focus = [
  [
    "01",
    "AI & Agent Systems",
    "Getting LLMs to do useful work: prompts, tool calls, agent loops, and the plumbing around them that nobody sees but everybody feels.",
  ],
  [
    "02",
    "Applied Machine Learning",
    "Training and evaluating models on real data, then being honest about what the numbers actually say.",
  ],
  [
    "03",
    "Software Systems",
    "The backbone underneath: APIs, message queues, transactions, and frontends that don't fight the user.",
  ],
];

const beyond = [
  [
    "Classical things",
    "In undergrad I built a walk-through classical Chinese garden in Unity — falling leaves, a waterfall, scenery drawn from imagery in old poems. It won a national design prize, and it's part of why this site looks the way it does.",
  ],
  [
    "Organising people",
    "Years of class-committee and student-union work taught me the other kind of engineering: getting twenty people and one deadline to arrive at the same place.",
  ],
  [
    "Two cities",
    "Nanjing raised me; Sydney is where I live now. My seasons have been upside down since 2024, and I've stopped trying to fix that.",
  ],
];

export default function Home() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  // Hero → Work scene transition (§7): scroll progress drives the hero out
  // while the Projects scene fades in below.
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
                <p className="eyebrow mb-7">Hi, I&apos;m Kiki · Sydney</p>
              </FadeUp>
              <h1 className="font-display text-hero font-light text-balance">
                <HeroLine text="AI applications," delay={0.24} />
                <HeroLine text="machine learning," delay={0.36} />
                <HeroLine
                  text="software engineering."
                  delay={0.48}
                  className="text-[var(--sakura-accent-deep)]"
                />
              </h1>
              <motion.div style={reduce ? undefined : { opacity: heroFade }}>
                <FadeUp delay={0.82}>
                  <p className="mt-10 max-w-2xl text-lg md:text-xl leading-8 text-[var(--sakura-ink-soft)]">
                    I&apos;m a master&apos;s student at the University of Sydney, finishing at the
                    end of 2026. Last summer I helped build a real-time AI video product at
                    AIsphere — mostly making it survive bad networks. I like my software fast and
                    my interfaces soft pink.
                  </p>
                </FadeUp>
                <FadeUp delay={0.96}>
                  <div className="mt-10 flex flex-wrap gap-3">
                    <a href="#work" onClick={handleViewWork} className="button-primary">
                      View work <ArrowUpRight size={15} />
                    </a>
                    <a href="/陈绮玥简历.pdf" className="button-ghost">
                      Download resume <Download size={15} />
                    </a>
                  </div>
                </FadeUp>
              </motion.div>
            </div>
            <FadeUp delay={1.08} className="hidden lg:block pb-3">
              <motion.div
                className="sakura-glass rounded-[2rem] p-8"
                whileHover={
                  reduce
                    ? undefined
                    : { y: -2, boxShadow: "0 14px 36px -18px rgba(169,71,109,.35)" }
                }
                transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
              >
                <div
                  aria-hidden="true"
                  className="mx-auto mb-10 h-28 w-28 rounded-full border border-[var(--sakura-line-strong)] relative"
                >
                  <span className="absolute -right-5 top-10 h-11 w-11 rounded-full bg-[var(--sakura-surface-soft)] border border-[var(--sakura-line)]" />
                </div>
                <p className="eyebrow">Based in</p>
                <p className="font-display text-2xl mt-3 leading-snug">Sydney, Australia</p>
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
                description="The projects I still like. Each one has a proper write-up — what it is, what broke, and what I'd do differently."
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
              description="Roughly everything I make falls somewhere between these three."
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
                title="Currently in Sydney"
                description="The short version of what I'm up to. The long version lives on the resume page."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-8">
                <div className="border-l-2 border-[var(--sakura-accent)] pl-7">
                  <p className="eyebrow">Internship · Dec 2025 – Feb 2026</p>
                  <h3 className="font-display text-card-title mt-3">AIsphere · AI Full-stack</h3>
                  <p className="mt-3 text-[var(--sakura-ink-soft)] leading-7">
                    Real-time AI video over WebRTC. I spent most of my time on the unglamorous
                    part: keeping sessions alive when the network isn&apos;t.
                  </p>
                </div>
                <div className="border-l-2 border-[var(--sakura-line)] pl-7">
                  <p className="eyebrow">Education · Jul 2024 – Dec 2026</p>
                  <h3 className="font-display text-card-title mt-3">University of Sydney</h3>
                  <p className="mt-3 text-[var(--sakura-ink-soft)] leading-7">
                    Master of Computer Science · WAM 80+ (HD)
                  </p>
                </div>
                <div className="sakura-glass rounded-3xl p-7">
                  <p className="eyebrow">Status</p>
                  <p className="font-display text-2xl mt-3 leading-snug">
                    Looking for software engineering and AI roles — graduating December 2026.
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
              description="Because a person is not a tech stack."
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
              <a href="mailto:kikiarya@163.com" className="button-primary">
                kikiarya@163.com <ArrowUpRight size={15} />
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
