import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Container from "../../../components/Container";
import Tag from "../../../components/Tag";
import DemoFrame from "../../../components/DemoFrame";
import ProjectFigure from "../../../components/ProjectFigure";
import TrajectoryReplay from "../../../components/TrajectoryReplay";
import CopyBibtex from "../../../components/CopyBibtex";
import { getProjectBySlug, getAllProjectSlugs } from "../../../lib/projects";
import { site } from "../../../lib/site";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Work" };
  return {
    title: project.cardTitle ?? project.title,
    description: project.shortDescription,
  };
}

export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const architecture = project.diagrams?.filter((item) => item.kind === "architecture") ?? [];
  const pipelineFigures = project.trajectory
    ? []
    : (project.diagrams?.filter((item) => item.kind === "pipeline") ?? []);
  const evaluation = project.diagrams?.filter((item) => item.kind === "evaluation") ?? [];
  const arxivUrl = project.arxivId ? `https://arxiv.org/abs/${project.arxivId}` : undefined;

  return (
    <article className="pt-32 md:pt-40 pb-20">
      {project.arxivId ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ScholarlyArticle",
              name: project.title,
              author: { "@type": "Person", name: site.name },
              datePublished: "2026-05",
              identifier: `arXiv:${project.arxivId}`,
              url: arxivUrl,
              creativeWorkStatus: "UnderReview",
              description: project.shortDescription,
            }),
          }}
        />
      ) : null}
      <Container>
        <Link href="/work" className="button-ghost mb-14">
          <ArrowLeft size={14} /> Back to work
        </Link>
        <header className="max-w-5xl">
          <p className="eyebrow">{project.venue ?? project.categoryTags.join(" · ")}</p>
          {project.cardTitle ? (
            <p className="font-mono text-meta uppercase tracking-[.14em] text-[var(--sakura-muted)] mt-5">
              {project.cardTitle}
            </p>
          ) : null}
          <h1 className="font-display text-hero font-light text-balance mt-6">
            {project.title}
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-8 text-[var(--sakura-ink-soft)]">
            {project.shortDescription}
          </p>
        </header>
        <div className="my-20 grid sm:grid-cols-3 gap-px bg-[var(--sakura-line-soft)] border border-[var(--sakura-line-soft)] rounded-3xl overflow-hidden">
          <Meta
            label="Role"
            value={project.role || "Student project · contribution documented below"}
          />
          <Meta label="Type" value={project.categoryTags.join(" / ")} />
          <Meta label="Core stack" value={project.techStack.slice(0, 3).join(" · ")} />
        </div>
        <div className="grid lg:grid-cols-[minmax(0,1fr)_20rem] gap-16">
          <div className="space-y-20">
            <Content title="Context & problem">
              <p>{project.context || project.longDescription}</p>
              {project.context ? <p>{project.longDescription}</p> : null}
            </Content>
            {architecture.length || pipelineFigures.length || project.trajectory ? (
              <Content title="System approach">
                {project.systemDesign ? <p>{project.systemDesign}</p> : null}
                <div className="space-y-8">
                  {architecture.map((diagram) => (
                    <ProjectFigure key={diagram.caption} diagram={diagram} />
                  ))}
                  {project.trajectory ? (
                    <TrajectoryReplay trajectory={project.trajectory} />
                  ) : null}
                  {pipelineFigures.map((diagram) => (
                    <ProjectFigure key={diagram.caption} diagram={diagram} />
                  ))}
                </div>
              </Content>
            ) : project.systemDesign ? (
              <Content title="System approach">
                <p>{project.systemDesign}</p>
                {project.llmWorkflow ? (
                  <div className="sakura-glass rounded-3xl p-7 mt-8">
                    <p className="eyebrow">Workflow</p>
                    <p className="font-display text-2xl mt-3">{project.llmWorkflow}</p>
                  </div>
                ) : null}
              </Content>
            ) : null}
            <Content title="Key implementation">
              <ol className="space-y-5">
                {project.highlights.map((item, index) => (
                  <li key={item} className="grid grid-cols-[2rem_1fr] gap-4">
                    <span className="font-display text-2xl text-[var(--sakura-accent-deep)]">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </Content>
            {evaluation.length || project.results ? (
              <Content title="Evaluation & outcome">
                {evaluation.map((diagram) => (
                  <ProjectFigure key={diagram.caption} diagram={diagram} />
                ))}
                {project.results ? (
                  <blockquote className="border-l-[3px] border-[var(--sakura-accent-deep)] pl-7 font-display text-3xl leading-tight">
                    {project.results}
                  </blockquote>
                ) : null}
              </Content>
            ) : null}
            {project.demoUrl ? (
              <Content title="Live environment">
                <DemoFrame url={project.demoUrl} title={project.title} />
              </Content>
            ) : null}
          </div>
          <aside>
            <div className="sticky top-28 sakura-glass rounded-3xl p-7">
              {project.venue ? (
                <>
                  <p className="eyebrow">Venue</p>
                  <p className="font-display text-2xl mt-3 leading-snug">{project.venue}</p>
                </>
              ) : (
                <p className="eyebrow">Technology</p>
              )}
              <div className="flex flex-wrap gap-2 mt-5">
                {project.techStack.map((item) => (
                  <Tag key={item} label={item} />
                ))}
              </div>
              <div className="mt-8 space-y-3">
                {arxivUrl ? (
                  <a className="button-primary w-full" href={arxivUrl} target="_blank" rel="noreferrer">
                    <ExternalLink size={14} /> arXiv:{project.arxivId}
                  </a>
                ) : null}
                {project.bibtex ? <CopyBibtex bibtex={project.bibtex} /> : null}
                {project.repoUrl ? (
                  <a
                    className="button-ghost w-full"
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github size={14} /> Repository
                  </a>
                ) : null}
                {project.demoUrl ? (
                  <a
                    className="button-primary w-full"
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={14} /> Live demo
                  </a>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[var(--sakura-bg-deep)]/85 p-6">
      <span className="eyebrow">{label}</span>
      <p className="mt-3 text-sm leading-6">{value}</p>
    </div>
  );
}

function Content({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-chapter font-light mb-8">{title}</h2>
      <div className="space-y-6 leading-8 text-[var(--sakura-ink-soft)]">{children}</div>
    </section>
  );
}
