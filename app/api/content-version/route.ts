import { contentVersion, publishedContent, contentHref } from "../../../lib/notes";
export const dynamic = "force-static";
export function GET() {
  return Response.json({ version: contentVersion, revision: process.env.PUBLISH_REVISION || "local", paths: publishedContent.map(contentHref) });
}
