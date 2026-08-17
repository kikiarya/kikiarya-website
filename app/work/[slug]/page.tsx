import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Container from "../../../components/Container";
import Tag from "../../../components/Tag";
import DemoFrame from "../../../components/DemoFrame";
import { getProjectBySlug, projects } from "../../../lib/projects";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="pt-32 md:pt-40 pb-20">
      <Container>
        <Link href="/work" className="button-ghost mb-14">
          <ArrowLeft size={14} /> Back to work
        </Link>
        <header className="max-w-5xl">
          <p className="eyebrow">{project.categoryTags.join(" · ")}</p>
          <h1 className="font-display text-[clamp(3.5rem,8vw,7.5rem)] font-light leading-[.88] tracking-[-.05em] mt-6">
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
            {project.systemDesign ? (
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
            {project.results ? (
              <Content title="Evaluation & outcome">
                <blockquote className="border-l-[3px] border-[var(--sakura-accent-deep)] pl-7 font-display text-3xl leading-tight">
                  {project.results}
                </blockquote>
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
              <p className="eyebrow">Technology</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {project.techStack.map((item) => (
                  <Tag key={item} label={item} />
                ))}
              </div>
              <div className="mt-8 space-y-3">
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
      <h2 className="font-display text-4xl md:text-5xl font-light mb-8">{title}</h2>
      <div className="space-y-6 leading-8 text-[var(--sakura-ink-soft)]">{children}</div>
    </section>
  );
}
