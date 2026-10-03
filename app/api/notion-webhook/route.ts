import { handleWebhook } from "../../../lib/publishing/webhook.mjs";
export const runtime = "nodejs";
export async function POST(request: Request) {
  return handleWebhook(request, process.env);
}
