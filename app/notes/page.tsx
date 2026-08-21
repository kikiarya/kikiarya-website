import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "../../components/Container";
import Reveal from "../../components/motion/Reveal";
import SceneDecor from "../../components/motion/SceneDecor";
import Tag from "../../components/Tag";

export const metadata = { title: "Notes" };

const topics = ["AI & Tech", "Design", "Random thoughts", "Bookmarks & Finds"];

export default function NotesPage() {
  return (
    <div className="relative pt-36 md:pt-44 pb-20">
      <SceneDecor />
      <Container className="relative">
        <header className="max-w-4xl mb-16">
          <p className="eyebrow">Notes · What I think</p>
          <h1 className="font-display text-hero font-light text-balance mt-6">Notes</h1>
          <p className="mt-9 max-w-2xl text-lg leading-8 text-[var(--sakura-ink-soft)]">
            Thoughts in progress — planted small, tended slowly. Not a feed, more like a garden
            that grows at its own pace.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Tag key={topic} label={topic} />
            ))}
          </div>
        </header>

        <Reveal>
          <div className="sakura-glass rounded-[2rem] p-8 md:p-12 max-w-2xl">
            <p className="eyebrow">Status</p>
            <p className="font-display text-2xl md:text-3xl mt-4 leading-snug">
              Nothing published yet — the first notes are still being written.
            </p>
            <p className="mt-4 text-base leading-7 text-[var(--sakura-ink-soft)]">
              Meanwhile, the bookshelf is already alive.
            </p>
            <Link href="/bookshelf" className="button-ghost mt-8">
              Visit the bookshelf <ArrowUpRight size={15} />
            </Link>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
