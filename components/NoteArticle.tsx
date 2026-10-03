import Link from "next/link";
import Container from "./Container";
import { contentHref, type Note } from "../lib/notes";
export default function NoteArticle({ note }: { note: Note }) {
  const reading = note.kind === "reading";
  return <article className="note-article pb-24 pt-32 md:pt-40"><Container>
    <Link href={reading ? "/bookshelf" : "/notes"} className="note-back">← {reading ? "返回阅读札记" : "返回博客"}</Link>
    <header className="note-article-header">
      <div className="note-meta"><time dateTime={note.date}>{note.dateLabel}</time><span>{note.readingTime}</span></div>
      <h1>{note.titleZh || note.title}</h1>
      {note.titleZh ? <p className="note-article-title-zh">{note.title}</p> : null}
      <p className="note-article-lede">{note.excerpt}</p>
      <div className="note-tags">{note.tags.map(tag => <Link key={tag} href={`${reading ? "/bookshelf" : "/notes"}?tag=${encodeURIComponent(tag)}`}>{tag}</Link>)}</div>
    </header>
    <div className="note-article-layout">
      <div className="note-prose">{note.sections.map((section, index) => <section key={index} id={`section-${index + 1}`} className="scroll-mt-28"><h2>{section.heading}</h2>{section.paragraphs.map((paragraph, i) => <p key={i} className="whitespace-pre-wrap">{paragraph}</p>)}</section>)}</div>
      <aside className="note-linked-work">
        <nav aria-label="文章目录"><p className="eyebrow">本文目录</p><ol className="mt-4 space-y-3">{note.sections.map((s, i) => <li key={i}><a href={`${contentHref(note)}#section-${i + 1}`}>{s.heading}</a></li>)}</ol></nav>
        {note.linkedProject ? <div className="mt-8"><p className="eyebrow">文中提到的项目</p><Link href={note.linkedProject.href}>{note.linkedProject.label} ↗</Link></div> : null}
        {note.source ? <div className="mt-8"><p className="eyebrow">摘抄来源</p><p>{note.source.title}{note.source.author ? ` · ${note.source.author}` : ""}</p>{note.source.location ? <p>{note.source.location}</p> : null}{note.source.url ? <a href={note.source.url} target="_blank" rel="noreferrer">阅读原文 ↗</a> : null}</div> : null}
      </aside>
    </div>
  </Container></article>;
}
