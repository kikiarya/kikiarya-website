import Container from "../../components/Container";
import ProjectIndex from "../../components/ProjectIndex";
import SceneDecor from "../../components/motion/SceneDecor";

export const metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <div className="relative pt-36 md:pt-44 pb-20">
      <SceneDecor />
      <Container className="relative">
        <header className="max-w-4xl mb-20">
          <p className="eyebrow">02 · Work</p>
          <h1 className="font-display text-hero font-light text-balance mt-6">Projects</h1>
          <p className="mt-9 max-w-2xl text-lg leading-8 text-[var(--sakura-ink-soft)]">
            Things I&apos;ve built for courses, internships, and myself. Every write-up says what
            actually happened, including the parts that broke.
          </p>
        </header>
        <ProjectIndex />
      </Container>
    </div>
  );
}
