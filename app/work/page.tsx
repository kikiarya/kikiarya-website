import Container from "../../components/Container";
import ProjectIndex from "../../components/ProjectIndex";

export const metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <div className="pt-36 md:pt-44 pb-20">
      <Container>
        <header className="max-w-4xl mb-20">
          <p className="eyebrow">02 · Work</p>
          <h1 className="font-display text-[clamp(3.5rem,8vw,7.5rem)] font-light leading-[.88] tracking-[-.045em] mt-6">
            Projects
          </h1>
          <p className="mt-9 max-w-2xl text-lg leading-8 text-[var(--sakura-ink-soft)]">
            AI products, machine learning, and software systems. Open any item for details.
          </p>
        </header>
        <ProjectIndex />
      </Container>
    </div>
  );
}
