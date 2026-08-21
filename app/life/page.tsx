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
            The person behind the commits — kept intentionally small.
          </p>
        </header>

        <div className="space-y-24 max-w-3xl">
          <Reveal>
            <section>
              <p className="eyebrow mb-7">About</p>
              <div className="space-y-5 text-base leading-8 text-[var(--sakura-ink-soft)]">
                <p>
                  Nanjing raised me; Sydney is where I live now. My seasons have been upside down
                  since 2024, and I&apos;ve stopped trying to fix that.
                </p>
                <p>
                  In undergrad I built a walk-through classical Chinese garden in Unity — falling
                  leaves, a waterfall, scenery drawn from imagery in old poems. It won a national
                  design prize, and it&apos;s part of why this site is pink.
                </p>
                <p>
                  Years of class-committee and student-union work taught me the other kind of
                  engineering: getting twenty people and one deadline to arrive at the same place.
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
