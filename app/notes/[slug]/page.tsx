import { notFound } from "next/navigation";
import NoteArticle from "../../../components/NoteArticle";
import { getNote, notes } from "../../../lib/notes";
export const dynamicParams = false;
export function generateStaticParams() { return notes.map(note => ({ slug: note.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const note = getNote((await params).slug);
  return note ? { title: note.titleZh || note.title, description: note.excerpt } : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const note = getNote((await params).slug);
  if (!note) notFound();
  return <NoteArticle note={note} />;
}
