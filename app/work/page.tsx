import Container from "../../components/Container";
import ProjectIndex from "../../components/ProjectIndex";
import SceneDecor from "../../components/motion/SceneDecor";
import OrnamentRule from "../../components/decor/OrnamentRule";

export const metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <div className="relative pt-28 md:pt-32 pb-20">
      <SceneDecor />
      <Container className="relative">
        <header className="max-w-4xl mb-12">
          <p className="eyebrow">02 · Work</p>
          <div className="mt-6">
            <h1 className="font-display text-hero font-light text-balance">Projects</h1>
          </div>
          <p className="mt-9 max-w-xl text-lg leading-[1.65] text-[var(--sakura-ink-soft)]">
            Agent training, runtime compression, multi-agent apps, and a few systems projects.
            Repositories stay private; write-ups live here.
          </p>
          <OrnamentRule className="mt-10 max-w-sm" />
        </header>
        <ProjectIndex />
      </Container>
    </div>
  );
}
