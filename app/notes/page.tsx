import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "../../components/Container";
import Reveal from "../../components/motion/Reveal";
import SceneDecor from "../../components/motion/SceneDecor";
import FloralSprig from "../../components/decor/FloralSprig";

export const metadata = { title: "Notes" };

export default function NotesPage() {
  return (
    <div className="relative pt-36 md:pt-44 pb-20">
      <SceneDecor />
      <Container className="relative">
        <header className="max-w-4xl mb-16">
          <p className="eyebrow">Notes · What I think</p>
          <h1 className="font-display text-hero font-light text-balance mt-6">Notes</h1>
          <p className="mt-9 max-w-2xl text-lg leading-8 text-[var(--sakura-ink-soft)]">
            A garden, not a blog. Empty until something is worth planting.
          </p>
        </header>

        <Reveal>
          <div className="sakura-glass rounded-[2rem] p-8 md:p-12 max-w-xl">
            <FloralSprig
              size={56}
              className="text-[var(--sakura-accent)] mb-8"
            />
            <p className="eyebrow">Seed</p>
            <p className="font-display text-2xl md:text-3xl mt-4 leading-snug">
              Nothing planted yet.
            </p>
            <p className="mt-4 text-base leading-7 text-[var(--sakura-ink-soft)]">
              When the first note exists, it will grow a line to Work.
            </p>
            <svg
              className="mt-8 mb-2 text-[var(--sakura-line)]"
              width="2"
              height="48"
              aria-hidden="true"
            >
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="48"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeDasharray="3 5"
              />
            </svg>
            <Link
              href="/work/latent-action-reparameterization"
              className="font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-muted)] transition-colors duration-200 hover:text-[var(--sakura-accent-deep)]"
            >
              Will connect to Work · LAR
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <Link href="/bookshelf" className="button-ghost mt-10">
            Visit the bookshelf <ArrowUpRight size={15} />
          </Link>
        </Reveal>
      </Container>
    </div>
  );
}
