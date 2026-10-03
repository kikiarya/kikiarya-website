import Link from "next/link";
import { readingNotes, contentHref } from "../../lib/notes";
import Container from "../../components/Container";
import Reveal from "../../components/motion/Reveal";
import SceneDecor from "../../components/motion/SceneDecor";

export const metadata = {
  title: "阅读札记 · Bookshelf",
  description: "留下读过的句子，也记下自己的想法。文章摘抄、读书笔记与阅读分享。",
};

export default async function BookshelfPage({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const { tag } = await searchParams;
  const entries = tag ? readingNotes.filter(note => note.tags.includes(tag)) : readingNotes;
  return (
    <div className="relative pt-36 md:pt-44 pb-20">
      <SceneDecor />
      <Container className="relative">
        <header className="max-w-4xl mb-16">
          <p className="eyebrow">Bookshelf / 阅读札记</p>
          <h1 className="font-display text-hero font-light text-balance mt-6">读到这里，<br />想记下来。</h1>
          <p className="mt-9 max-w-2xl text-lg leading-8 text-[var(--sakura-ink-soft)]">
            有时是一段文字，有时是一本书带来的新想法。把值得再读的句子留下，也写下它为什么打动我。
          </p>
        </header>
        <nav aria-label="按标签浏览" className="flex flex-wrap gap-4 mb-10"><Link href="/bookshelf">全部</Link>{[...new Set(readingNotes.flatMap(note => note.tags))].map(item => <Link key={item} href={`/bookshelf?tag=${encodeURIComponent(item)}`}>{item}</Link>)}<a href="/rss.xml">RSS ↗</a></nav>
        {entries.map(note => <Link className="block border-t border-[var(--sakura-line-soft)] py-8" key={note.slug} href={contentHref(note)}><p className="eyebrow">{note.dateLabel} · {note.readingTime}</p><h2 className="text-2xl mt-4">{note.title}</h2><p className="mt-3 leading-7">{note.excerpt}</p></Link>)}
        {!entries.length ? <Reveal>
          <section className="max-w-3xl border-t border-[var(--sakura-line-soft)] py-10">
            <p className="eyebrow">摘抄 · 读书笔记 · 阅读分享</p>
            <h2 className="font-display text-2xl mt-5">第一篇札记，还在酝酿。</h2>
            <p className="mt-4 leading-8 text-[var(--sakura-ink-soft)]">这里暂时留白。等有想分享的文字，再慢慢添上。</p>
          </section>
        </Reveal> : null}
      </Container>
    </div>
  );
}
