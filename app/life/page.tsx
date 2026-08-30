import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "../../components/Container";
import Reveal from "../../components/motion/Reveal";
import SceneDecor from "../../components/motion/SceneDecor";

export const metadata = { title: "Life" };

export default function LifePage() {
  return (
    <div className="relative pt-36 md:pt-44 pb-20">
      <SceneDecor />
      <Container className="relative">
        <header className="max-w-4xl mb-20">
          <p className="eyebrow">Life · How I live</p>
          <h1 className="font-display text-hero font-light text-balance mt-6">Life</h1>
          <p className="mt-9 max-w-2xl text-lg leading-8 text-[var(--sakura-ink-soft)]">
            A short page. I would rather keep it that way.
          </p>
        </header>

        <div className="space-y-24 max-w-3xl">
          <Reveal>
            <section>
              <p className="eyebrow mb-7">About</p>
              <div className="space-y-5 text-base leading-8 text-[var(--sakura-ink-soft)]">
                <p>
                  Grew up in China; live in Sydney now. Seasons have been backwards since 2024. I
                  have given up correcting them.
                </p>
                <p>
                  In undergrad I built a walk-through classical garden in Unity — falling leaves, a
                  waterfall, courtyards from old poems. It is still why this site is pink.
                </p>
                <p>
                  Student-union years taught a different kind of engineering: twenty people, one
                  deadline, nobody is a git conflict but it feels like one.
                </p>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <p className="eyebrow mb-7">Now</p>
              <div className="sakura-glass rounded-3xl p-7">
                <p className="font-display text-2xl leading-snug">
                  Finishing my master&apos;s at the University of Sydney, building my graduation
                  project, and looking for software engineering and AI roles.
                </p>
                <p className="font-mono text-meta uppercase tracking-[.12em] text-[var(--sakura-muted)] mt-5">
                  Updated Aug 2026
                </p>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <p className="eyebrow mb-7">Favorites</p>
              <p className="text-base leading-8 text-[var(--sakura-ink-soft)]">
                Books live on their own shelf.
              </p>
              <Link href="/bookshelf" className="button-ghost mt-6">
                Visit the bookshelf <ArrowUpRight size={15} />
              </Link>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <p className="eyebrow mb-7">Photos &amp; Travel</p>
              <p className="text-base leading-8 text-[var(--sakura-ink-soft)]">
                Someday — once I find a way to share places without sharing coordinates.
              </p>
            </section>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
