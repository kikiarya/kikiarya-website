import { notFound } from "next/navigation";
import NoteArticle from "../../../components/NoteArticle";
import { getNote, notes } from "../../../lib/notes";
import { articleMetadata } from "../../../lib/content/metadata";
export const dynamicParams = false;
export function generateStaticParams() { return notes.map(note => ({ slug: note.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const note = getNote((await params).slug);
  return note ? articleMetadata(note) : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const note = getNote((await params).slug);
  if (!note) notFound();
  return <NoteArticle note={note} />;
}
