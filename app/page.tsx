"use client";

import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import Container from "../components/Container";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import { FadeUp, HeroLine } from "../components/HeroReveal";
import { getFeaturedProjects } from "../lib/projects";

const focus = [
  [
    "01",
    "AI & Agent Systems",
    "Model workflows, tool use, and product features that call LLMs.",
  ],
  [
    "02",
    "Applied Machine Learning",
    "Feature work, training, evaluation, and comparing models on a defined task.",
  ],
  [
    "03",
    "Software Systems",
    "APIs, messaging, transactions, and full-stack apps.",
  ],
];

export default function Home() {
  return (
    <>
      <section className="min-h-[92vh] pt-36 md:pt-44 flex items-center">
        <Container>
          <div className="grid lg:grid-cols-[1fr_18rem] gap-16 items-end">
            <div>
              <FadeUp>
                <p className="eyebrow mb-7">Kikiarya · Computer Science</p>
              </FadeUp>
              <h1 className="font-display text-[clamp(3.6rem,8.5vw,8.8rem)] font-light leading-[.88] tracking-[-.045em]">
                <HeroLine delay={0.08}>AI applications,</HeroLine>
                <HeroLine delay={0.2}>machine learning,</HeroLine>
                <HeroLine delay={0.32} className="text-[var(--sakura-accent-deep)]">
                  software engineering.
                </HeroLine>
              </h1>
              <FadeUp delay={0.5}>
                <p className="mt-10 max-w-2xl text-lg md:text-xl leading-8 text-[var(--sakura-ink-soft)]">
                  MSc Computer Science at the University of Sydney (software engineering · data
                  science &amp; AI). Recently interned at AIsphere on real-time AI video.
                </p>
              </FadeUp>
              <FadeUp delay={0.62}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Link href="/work" className="button-primary">
                    View work <ArrowUpRight size={15} />
                  </Link>
                  <a href="/陈绮玥简历.pdf" className="button-ghost">
                    Download résumé <Download size={15} />
                  </a>
                </div>
              </FadeUp>
            </div>
            <FadeUp delay={0.7} className="hidden lg:block pb-3">
              <div className="sakura-glass rounded-[2rem] p-8">
                <div
                  aria-hidden="true"
                  className="mx-auto mb-10 h-28 w-28 rounded-full border border-[var(--sakura-line-strong)] relative"
                >
                  <span className="absolute -right-5 top-10 h-11 w-11 rounded-full bg-[var(--sakura-surface-soft)] border border-[var(--sakura-line)]" />
                </div>
                <p className="eyebrow">Based in</p>
                <p className="font-display text-2xl mt-3 leading-snug">Sydney, Australia</p>
              </div>
            </FadeUp>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-36">
        <Container>
          <Reveal>
            <div className="flex items-end justify-between gap-8">
              <SectionHeader
                eyebrow="Selected work"
                title="Featured projects"
                description="A short list across AI products, ML research, and backend systems."
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
              description="Three directions that show up most in my projects."
            />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-[var(--sakura-line-soft)] border border-[var(--sakura-line-soft)] rounded-[2rem] overflow-hidden">
            {focus.map(([number, title, copy], i) => (
              <Reveal key={number} delay={i * 0.08}>
                <div className="bg-[var(--sakura-bg-deep)]/80 p-8 md:p-10 h-full">
                  <span className="font-display text-4xl text-[var(--sakura-muted-soft)]">{number}</span>
                  <h3 className="font-display text-3xl mt-12">{title}</h3>
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
                description="MSc at the University of Sydney. Open to software engineering and AI application roles."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-8">
                <div className="border-l-2 border-[var(--sakura-accent)] pl-7">
                  <p className="eyebrow">Internship · Dec 2025 – Feb 2026</p>
                  <h3 className="font-display text-3xl mt-3">AIsphere · AI Full-stack</h3>
                  <p className="mt-3 text-[var(--sakura-ink-soft)] leading-7">
                    Real-time AI video: FastAPI, Next.js, WebSocket / WebRTC. Prompt &amp; session
                    work, plus reliability under weak network.
                  </p>
                </div>
                <div className="border-l-2 border-[var(--sakura-line)] pl-7">
                  <p className="eyebrow">Education · Jul 2024 – Dec 2026</p>
                  <h3 className="font-display text-3xl mt-3">University of Sydney</h3>
                  <p className="mt-3 text-[var(--sakura-ink-soft)] leading-7">
                    Master of Computer Science · WAM 80+ (HD)
                  </p>
                </div>
                <div className="sakura-glass rounded-3xl p-7">
                  <p className="eyebrow">Status</p>
                  <p className="font-display text-2xl mt-3 leading-snug">
                    Open to software engineering and AI application roles.
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[.12em] text-[var(--sakura-muted)] mt-5">
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
            <div className="sakura-glass rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row justify-between md:items-end gap-10">
              <div>
                <p className="eyebrow">Contact</p>
                <h2 className="font-display text-5xl md:text-7xl mt-5 leading-none">
                  Get in touch
                </h2>
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
