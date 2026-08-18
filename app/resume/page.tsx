import { Download, Mail, MapPin } from "lucide-react";
import Container from "../../components/Container";
import Tag from "../../components/Tag";
import Reveal from "../../components/motion/Reveal";

export const metadata = { title: "Résumé" };

const skills = [
  "Python",
  "Java",
  "JavaScript / TypeScript",
  "PyTorch",
  "LLM Agent",
  "Prompt Engineering",
  "PEFT / LoRA",
  "Node.js",
  "Spring Boot",
  "gRPC",
  "Docker",
  "RabbitMQ",
];

export default function ResumePage() {
  return (
    <div className="pt-36 md:pt-44 pb-20">
      <Container>
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-16 border-b border-[var(--sakura-line-soft)]">
          <div>
            <p className="eyebrow">03 · Résumé</p>
            <h1 className="font-display text-hero font-light mt-5">Kikiarya</h1>
            <div className="mt-7 flex flex-wrap gap-5 text-sm text-[var(--sakura-ink-soft)]">
              <span className="flex items-center gap-2">
                <MapPin size={14} /> Sydney, Australia
              </span>
              <a href="mailto:kikiarya@163.com" className="flex items-center gap-2">
                <Mail size={14} /> kikiarya@163.com
              </a>
            </div>
          </div>
          <a href="/陈绮玥简历.pdf" className="button-primary">
            <Download size={15} /> Download PDF
          </a>
        </header>

        <div className="grid lg:grid-cols-[15rem_minmax(0,1fr)] gap-14 lg:gap-24 py-20">
          <aside>
            <nav
              aria-label="Résumé sections"
              className="lg:sticky lg:top-28 flex lg:flex-col flex-wrap gap-3 font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-muted)] [&>a]:transition-colors [&>a]:duration-200 [&>a:hover]:text-[var(--sakura-accent-deep)]"
            >
              <a href="#profile">Profile</a>
              <a href="#education">Education</a>
              <a href="#experience">Experience</a>
              <a href="#research">Research</a>
              <a href="#projects">Projects</a>
              <a href="#skills">Skills</a>
            </nav>
          </aside>

          <div className="space-y-24">
            <ResumeSection id="profile" title="Profile">
              <p className="font-display text-2xl md:text-3xl italic leading-snug text-[var(--sakura-ink-soft)]">
                MSc Computer Science at the University of Sydney (software engineering · data science
                &amp; AI). Experience in AI full-stack products, LLM agent runtimes, and backend
                systems.
              </p>
            </ResumeSection>

            <ResumeSection id="education" title="Education">
              <Entry
                meta="Jul 2024 – Dec 2026 · Sydney"
                title="University of Sydney"
                subtitle="Master of Computer Science — dual streams: Software Engineering; Data Science & AI. WAM 80+ (High Distinction)."
              />
              <Entry
                meta="Sep 2020 – Jun 2024 · Nanjing"
                title="Nanjing Normal University (211)"
                subtitle="BSc Computer Science & Technology. GPA 3.48/4.0 (top 25%). Excellent undergraduate graduate; university first-class scholarship; excellent thesis."
              />
            </ResumeSection>

            <ResumeSection id="experience" title="Experience">
              <Entry
                meta="Dec 2025 – Feb 2026"
                title="AIsphere (爱诗科技) · AI Full-stack Intern"
                subtitle="Real-time AI video product: FastAPI, Next.js, WebSocket, Agora/WebRTC. Worked on LLM prompt / world-context generation, session lifecycle, and reliability under weak network (timeouts, WS drops, state recovery)."
              />
              <Entry
                meta="Jul 2022 – Sep 2022"
                title="Jiangsu Ruiyun Industrial Internet · Java Engineer"
                subtitle="Smart agriculture / livestock monitoring platform: IoT data, online metrics, bug fixes and feature work on existing modules."
              />
              <Entry
                meta="Jun 2021 – Jul 2021"
                title="Ruifeng IT · Product Manager Assistant"
                subtitle="Competitive research and requirements for a smart irrigation platform; assisted with flows, prototypes, and UI."
              />
            </ResumeSection>

            <ResumeSection id="research" title="Research">
              <Entry
                meta="May 2026 · CoRR"
                title="Latent Action Reparameterization for Efficient Agent Inference"
                subtitle="Co-author. CoRR abs/2605.18597. Latent action spaces to cut action tokens and wall-clock inference time for LLM agents under a fixed compute budget."
              />
            </ResumeSection>

            <ResumeSection id="projects" title="Selected Projects">
              <Entry
                meta="Graduation design · 2026"
                title="LatentMemory"
                subtitle="Token efficiency and context reliability for OpenClaw. Latent prompt compression + compaction recovery; TriviaQA and fault-injection results documented on the project page."
              />
              <Entry
                meta="Full-stack AI · 2025"
                title="HSC Power AI Learning Platform"
                subtitle="Plans, question generation, grading, feedback — React, Node, Supabase, OpenAI."
              />
              <Entry
                meta="Distributed systems · 2025"
                title="E-commerce Microservices"
                subtitle="Saga, compensation, gRPC, RabbitMQ, Docker Compose."
              />
            </ResumeSection>

            <ResumeSection id="skills" title="Technical Skills">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Tag key={skill} label={skill} />
                ))}
              </div>
            </ResumeSection>
          </div>
        </div>
      </Container>
    </div>
  );
}

function ResumeSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <Reveal>
        <p className="eyebrow mb-7">{title}</p>
        <div className="space-y-12">{children}</div>
      </Reveal>
    </section>
  );
}

function Entry({
  meta,
  title,
  subtitle,
}: {
  meta: string;
  title: string;
  subtitle: string;
}) {
  return (
    <article className="grid md:grid-cols-[12rem_1fr] gap-3 md:gap-8 border-t border-[var(--sakura-line-soft)] pt-7">
      <p className="font-mono text-meta tabular-nums uppercase tracking-[.1em] text-[var(--sakura-muted)]">
        {meta}
      </p>
      <div>
        <h3 className="font-display text-card-title">{title}</h3>
        <p className="mt-2 leading-7 text-[var(--sakura-ink-soft)]">{subtitle}</p>
      </div>
    </article>
  );
}
