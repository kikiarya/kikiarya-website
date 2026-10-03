import type { MetadataRoute } from "next";
import { publishedContent, contentHref } from "../lib/notes";
import { siteUrl } from "../lib/content/metadata";
import { projects } from "../lib/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteUrl()).href;
  return [...["/", "/work", "/notes", "/bookshelf", "/contact", "/resume"].map(path => ({ url: url(path) })),
    ...projects.map(project => ({ url: url(`/work/${project.slug}`) })),
    ...publishedContent.map(note => ({ url: url(contentHref(note)), lastModified: note.updatedAt || note.date }))];
}
