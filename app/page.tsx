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
      <div><p className="eyebrow mb-6">Kiki / Research & engineering · 研究与工程</p><h1>I build agents<br/>that act, recover,<br/>and <em>improve.</em></h1><p className="studio-intro">我在悉尼大学读计算机科学硕士，关注 Agent 后训练、运行时可靠性，以及能与人互动的 AI 系统。</p><div className="flex flex-wrap gap-3 mt-7"><a href="#work" className="button-primary">View work / 查看项目 <ArrowUpRight size={15}/></a><Link href="/resume" className="button-ghost">Resume / 简历</Link><a href={site.githubUrl} className="button-ghost" target="_blank" rel="noreferrer">GitHub ↗</a></div><p className="hero-footnote"><span/> 正在寻找 AI 工程岗位 · 预计 2026 年 11 月毕业</p></div>
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
        {getFeaturedProjects().map((project,index)=><ProjectCard key={project.slug} project={project} index={index} compact/>) }
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
            <p className="section-aside">Scroll to trace the run.<br/>向下滚动查看流程，也可以点击节点切换。</p>
          </div>
        </Reveal>
        <TraceTheater/>
      </Container>
    </section>
    <section id="contact" className="studio-section contact-chapter">
      <Container>
        <Reveal>
          <div className="studio-contact"><div><p className="eyebrow">04 / Contact · 联系我</p><h2>Good systems start<br/>with a conversation.</h2><p>想聊 Agent 研究、AI 工程，或是一个有意思的想法，欢迎来信。</p></div><a className="button-primary" href={`mailto:${site.email}`}>{site.email} ↗</a></div>
          <div className="personal-links"><span>项目之外，也记些日常</span><Link href="/life">Life ↗</Link><Link href="/bookshelf">Bookshelf / 阅读札记 ↗</Link></div>
        </Reveal>
      </Container>
    </section>
  </>;
}
