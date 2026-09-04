import { Mail, MapPin } from "lucide-react";
import Container from "../../components/Container";
import Tag from "../../components/Tag";
import Reveal from "../../components/motion/Reveal";
import ResumeUnfold from "../../components/ResumeUnfold";

export const metadata = { title: "Resume" };

const skills = [
  "Python",
  "Java",
  "TypeScript / JavaScript",
  "SQL",
  "C / C++",
  "PyTorch",
  "LoRA / GRPO",
  "LangChain / LangGraph",
  "RAG",
  "FastAPI",
  "Next.js",
  "Node.js",
  "Spring Boot",
  "gRPC",
  "RabbitMQ",
  "Docker",
  "MySQL",
  "Redis",
  "Supabase",
  "WebRTC",
];

export default function ResumePage() {
  return (
    <div className="pt-36 md:pt-44 pb-20">
      <Container>
        <ResumeUnfold>
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-16 border-b border-[var(--sakura-line-soft)]">
          <div>
            <p className="eyebrow">03 · Resume</p>
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
          <p className="hidden sm:block max-w-[9rem] font-mono text-meta uppercase tracking-[.12em] leading-5 text-[var(--sakura-muted)]">
            Letterhead. PDF when a public copy is ready.
          </p>
        </header>

        <div className="grid lg:grid-cols-[15rem_minmax(0,1fr)] gap-14 lg:gap-24 py-20">
          <aside>
            <nav
              aria-label="Resume sections"
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
                Master&apos;s student in computer science at the University of Sydney, graduating
                December 2026. Recent work: agent post-training, harness policy for coding agents,
                long-horizon runtime compression — plus the full-stack side that ships prompts and
                keeps sessions alive over a bad network.
              </p>
            </ResumeSection>

            <ResumeSection id="education" title="Education">
              <Entry
                meta="Jul 2024 – Dec 2026 · Sydney"
                title="University of Sydney"
                subtitle="Master of Computer Science — software engineering, and data science & AI. Coursework in enterprise architecture, model-based software engineering, web apps, software quality, machine learning, and data engineering."
              />
              <Entry
                meta="Sep 2020 – Jun 2024"
                title="Nanjing Normal University"
                subtitle="BSc Computer Science & Technology. Undergraduate thesis on reinforcement learning for simulated network attack–defense."
              />
            </ResumeSection>

            <ResumeSection id="experience" title="Experience">
              <Entry
                meta="Dec 2025 – Feb 2026"
                title="AIsphere · AI Full-stack Intern"
                subtitle="PixVerse Game — generative interactive games where player text, game state, and live video evolve together. Built the chain from prompt generation → task state update → segmented video → WebRTC stream. FastAPI, Next.js, WebSocket, Agora/WebRTC. Task orchestration, context management, dynamic prompt assembly from state. Model-output compatibility, graceful degradation. Session sync, rollback, and recovery for timeouts, dropped connections, and generation failures."
              />
              <Entry
                meta="Jul 2022 – Sep 2022"
                title="Ruiyun · Java intern"
                subtitle="Smart agriculture / irrigation IoT on Spring Boot, MySQL, Redis. Sensor ingest, environment monitoring, irrigation scheduling, remote pump and valve control. Offline detection, alerts, and task state when devices dropped or jobs failed."
              />
              <Entry
                meta="Jun 2021 – Jul 2021"
                title="Ruifeng IT · Product assistant"
                subtitle="Competitor research for a smart irrigation platform. Requirements, flows, and prototypes for monitoring and control scenarios."
              />
            </ResumeSection>

            <ResumeSection id="research" title="Research">
              <Entry
                meta="Feb – Jul 2026 · third author"
                title="Latent Action Reparameterization for Efficient Agent Inference"
                subtitle="NeurIPS 2026 under review · arXiv:2605.18597. Fine-grained text actions make agent trajectories long and expensive. LAR compresses high-frequency, low-entropy action spans into learnable latent actions while keeping query params and tool calls executable. Built latent-action vocabulary from trajectories via frequency/entropy filtering; LoRA + trajectory-level KL distillation; GRPO experiments on training stability. Evaluated on TriviaQA, KodCode, Mind2Web — action equivalence, compression strength, unseen-task transfer, Qwen3-32B scaling. Qwen3-8B on TriviaQA: accuracy 67.40% → 80.09%, action tokens −27.1%; throughput 127.8 → 150.2 tokens/s (+17.5%). Transfers to HumanEval and Qwen3-32B."
              />
            </ResumeSection>

            <ResumeSection id="projects" title="Selected Projects">
              <Entry
                meta="May – Aug 2026"
                title="Coding Agent Policy Optimization"
                subtitle="Repo-level coding agent. LoRA-SFT + GRPO on Qwen2.5-Coder-7B from failure-aware trajectories; harness adjusts tools, context, and verification by state. Joint optimization on SWE-bench Verified: +6pp resolve rate, ~10pp recovery, −15% tool calls."
              />
              <Entry
                meta="Mar – Jul 2026"
                title="OpenClaw Stateful Agent Runtime"
                subtitle="Task-state compression and checkpoint recovery for long OpenClaw runs. LoRA/KL system-prompt compression on Qwen3-8B. Context tokens −46.7%, post-compression success +8.4pp, recovery +83.3pp vs. baselines."
              />
              <Entry
                meta="Sep – Dec 2025"
                title="HSC Power"
                subtitle="LangGraph multi-agent tutoring: diagnosis → plan → practice → evaluation. RAG + tool calling with schema constraints. React, Express, Supabase."
              />
              <Entry
                meta="Sep – Nov 2025"
                title="E-commerce Microservices"
                subtitle="Four Spring Boot services, Saga compensation, gRPC, RabbitMQ, Docker Compose."
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
        </ResumeUnfold>
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
