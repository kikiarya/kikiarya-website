import { notFound } from "next/navigation";
import NoteArticle from "../../../components/NoteArticle";
import { readingNotes } from "../../../lib/notes";
export const dynamicParams = false;
export function generateStaticParams() { return readingNotes.map(note => ({ slug: note.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = readingNotes.find(note => note.slug === slug);
  return note ? { title: note.title, description: note.excerpt } : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = readingNotes.find(note => note.slug === slug);
  if (!note) notFound();
  return <NoteArticle note={note} />;
}
