import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "../../components/Container";
import Reveal from "../../components/motion/Reveal";
import SceneDecor from "../../components/motion/SceneDecor";
import { notes } from "../../lib/notes";

export const metadata = {
  title: "Notes",
  description: "Field notes on agents, recovery, post-training, and reliable AI systems.",
};

export default async function NotesPage({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const { tag } = await searchParams;
  const filtered = tag ? notes.filter(note => note.tags.includes(tag)) : notes;
  const [featured, ...rest] = filtered;

  return (
    <div className="notes-page relative pb-24 pt-36 md:pt-44">
      <SceneDecor />
      <Container className="relative">
        <header className="notes-header">
          <div>
            <p className="eyebrow">Notes / 个人博客</p>
            <h1>Working notes,<br />kept in public.</h1>
          </div>
          <p>
            写写做项目时遇到的问题、试过的方法，以及后来想明白的事。也聊 Agent、后训练和研究之外的日常。
          </p>
        </header>

        <nav aria-label="按标签浏览" className="flex flex-wrap gap-4 mb-10"><Link href="/notes" aria-current={!tag ? "page" : undefined}>全部</Link>{[...new Set(notes.flatMap(note => note.tags))].map(item => <Link key={item} href={`/notes?tag=${encodeURIComponent(item)}`} aria-current={tag === item ? "page" : undefined}>{item}</Link>)}<a href="/rss.xml">RSS ↗</a></nav>
        {!filtered.length ? <p>这个标签下还没有文章。</p> : null}
        {featured ? (
          <Reveal>
            <Link href={`/notes/${featured.slug}`} className="note-featured group">
              <div className="note-index-mark">{featured.number}</div>
              <div className="note-featured-copy">
                <div className="note-meta">
                  <span>{featured.dateLabel}</span>
                  <span>{featured.readingTime}</span>
                </div>
                <p className="note-signal">{featured.signal}</p>
                <h2>{featured.title}</h2>
                <p className="note-title-zh">{featured.titleZh}</p>
                <p className="note-excerpt">{featured.excerpt}</p>
                <div className="note-tags">
                  {featured.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
              <span className="note-open">阅读全文 <ArrowUpRight size={15} /></span>
            </Link>
          </Reveal>
        ) : null}

        <div className="notes-grid">
          {rest.map((note, index) => (
            <Reveal key={note.slug} delay={0.08 + index * 0.07}>
              <Link href={`/notes/${note.slug}`} className="note-card group">
                <div className="note-meta"><span>{note.number}</span><span>{note.dateLabel}</span></div>
                <p className="note-signal">{note.signal}</p>
                <h2>{note.title}</h2>
                <p className="note-title-zh">{note.titleZh}</p>
                <p className="note-excerpt">{note.excerpt}</p>
                <div className="note-card-footer">
                  <span>{note.readingTime}</span>
                  <ArrowUpRight size={15} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
