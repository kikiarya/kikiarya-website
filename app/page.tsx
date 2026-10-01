import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "../components/Container";
import ExperienceTimeline from "../components/ExperienceTimeline";
import ProjectCard from "../components/ProjectCard";
import SystemCore from "../components/SystemCore";
import TraceTheater from "../components/TraceTheater";
import TechnicalThroughline from "../components/TechnicalThroughline";
import Reveal from "../components/motion/Reveal";
import { getFeaturedProjects } from "../lib/projects";
import { site } from "../lib/site";

export default function Home() {
  return <>
    <section className="studio-hero"><Container><div className="studio-hero-grid">
      <div><p className="eyebrow mb-6">Kiki / Research & engineering</p><h1>I build agents<br/>that act, recover,<br/>and <em>improve.</em></h1><p className="studio-intro">Master’s student at the University of Sydney. Exploring agent post-training, runtime reliability, and interactive AI systems.</p><div className="flex flex-wrap gap-3 mt-7"><a href="#work" className="button-primary">View selected work <ArrowUpRight size={15}/></a><Link href="/resume" className="button-ghost">Resume</Link><a href={site.githubUrl} className="button-ghost" target="_blank" rel="noreferrer">GitHub ↗</a></div><p className="hero-footnote"><span/> Open to AI engineering roles · Graduating Dec 2026</p></div>
      <SystemCore/>
    </div></Container></section>
    <section id="work" className="studio-section selected-work-chapter">
      <Container>
        <Reveal>
          <div className="studio-section-heading">
            <div><p className="eyebrow">01 / Selected work · 精选项目</p><h2>Ideas, made executable.</h2></div>
            <Link href="/work" className="studio-link">All projects / 全部项目 ↗</Link>
          </div>
        </Reveal>
        {getFeaturedProjects().map((project,index)=><ProjectCard key={project.slug} project={project} index={index}/>) }
      </Container>
    </section>
    <section id="experience" className="studio-section studio-experience">
      <Container>
        <Reveal><div className="studio-section-heading"><div><p className="eyebrow">02 / Experience · 实践经历</p><h2>From models to real systems.</h2></div></div></Reveal>
        <TechnicalThroughline />
        <ExperienceTimeline />
      </Container>
    </section>
    <section id="mechanism" className="studio-section mechanism-chapter">
      <Container>
        <Reveal>
          <div className="studio-section-heading mechanism-heading">
            <div><p className="eyebrow">03 / Mechanism · 机制拆解</p><h2>How LAR actually works.</h2></div>
            <p className="section-aside">Scroll to trace the run.<br/>滚动追踪，点击节点可手动查看。</p>
          </div>
        </Reveal>
        <TraceTheater/>
      </Container>
    </section>
    <section id="contact" className="studio-section contact-chapter">
      <Container>
        <Reveal>
          <div className="studio-contact"><div><p className="eyebrow">04 / Contact · 联系我</p><h2>Good systems start<br/>with a conversation.</h2><p>Agent research, AI engineering, or an interesting idea.</p></div><a className="button-primary" href={`mailto:${site.email}`}>{site.email} ↗</a></div>
          <div className="personal-links"><span>A little beyond the work</span><Link href="/life">Life ↗</Link><Link href="/bookshelf">Bookshelf ↗</Link></div>
        </Reveal>
      </Container>
    </section>
  </>;
}
