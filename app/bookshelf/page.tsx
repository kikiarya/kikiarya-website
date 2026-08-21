import Container from "../../components/Container";
import Reveal from "../../components/motion/Reveal";
import SceneDecor from "../../components/motion/SceneDecor";
import { getBooksByStatus, type Book } from "../../lib/books";

export const metadata = { title: "Bookshelf" };

const sections: { status: Book["status"]; label: string; blurb: string }[] = [
  {
    status: "reading",
    label: "Reading now",
    blurb: "Open on my desk, progress not guaranteed.",
  },
  {
    status: "read",
    label: "Finished",
    blurb: "Books I actually finished and would hand to a friend.",
  },
  {
    status: "next",
    label: "Up next",
    blurb: "The antilibrary — waiting patiently on the shelf.",
  },
];

export default function BookshelfPage() {
  return (
    <div className="relative pt-36 md:pt-44 pb-20">
      <SceneDecor />
      <Container className="relative">
        <header className="max-w-4xl mb-20">
          <p className="eyebrow">04 · Bookshelf</p>
          <h1 className="font-display text-hero font-light text-balance mt-6">Bookshelf</h1>
          <p className="mt-9 max-w-2xl text-lg leading-8 text-[var(--sakura-ink-soft)]">
            Not everything I do is code. This is what I&apos;ve been reading — kept honest, one
            line per book.
          </p>
        </header>

        <div className="space-y-24">
          {sections.map(({ status, label, blurb }) => {
            const shelf = getBooksByStatus(status);
            if (!shelf.length) return null;
            return (
              <section key={status}>
                <Reveal>
                  <p className="eyebrow mb-2">{label}</p>
                  <p className="text-sm text-[var(--sakura-muted)] mb-8">{blurb}</p>
                  <div>
                    {shelf.map((book) => (
                      <BookRow key={book.title} book={book} />
                    ))}
                  </div>
                </Reveal>
              </section>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

function BookRow({ book }: { book: Book }) {
  return (
    <article className="grid md:grid-cols-[minmax(0,18rem)_1fr] gap-2 md:gap-10 border-t border-[var(--sakura-line-soft)] py-7">
      <div>
        <h3 className="font-display text-card-title leading-snug">{book.title}</h3>
        <p className="mt-1.5 font-mono text-meta uppercase tracking-[.1em] text-[var(--sakura-muted)]">
          {book.author}
          {book.year ? <span className="tabular-nums"> · {book.year}</span> : null}
          {book.tag ? ` · ${book.tag}` : null}
        </p>
      </div>
      {book.note ? (
        <p className="text-base leading-7 text-[var(--sakura-ink-soft)] md:pt-1">{book.note}</p>
      ) : null}
    </article>
  );
}
