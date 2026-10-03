import type { Metadata } from "next";
import { contentHref, type Note } from "../notes";
export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
}
export function articleMetadata(note: Note): Metadata {
  const title = note.titleZh || note.title;
  const url = new URL(contentHref(note), siteUrl()).href;
  return { title, description: note.excerpt, alternates: { canonical: url },
    openGraph: { type: "article", title, description: note.excerpt, url, publishedTime: note.date, modifiedTime: note.updatedAt || note.date, tags: note.tags },
    twitter: { card: "summary_large_image", title, description: note.excerpt } };
}
