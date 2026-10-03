import { createHmac, timingSafeEqual } from "node:crypto";

export function validSignature(raw, signature, secret) {
  if (!secret || !/^sha256=[a-f0-9]{64}$/.test(signature || "")) return false;
  const expected = `sha256=${createHmac("sha256", secret).update(raw).digest("hex")}`;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export async function handleWebhook(request, env, fetcher = fetch) {
  const reply = (status, state) => Response.json({ state }, { status, headers: { "Cache-Control": "no-store" } });
  if (!env.NOTION_WEBHOOK_SECRET || !env.NOTION_WORKSPACE_ID || !env.NOTION_SUBSCRIPTION_ID || !env.PUBLISH_GITHUB_TOKEN || !env.PUBLISH_GITHUB_REPOSITORY || !env.PUBLISH_GITHUB_REF) return reply(503, "not-configured");
  if (!/^[\w.-]+\/[\w.-]+$/.test(env.PUBLISH_GITHUB_REPOSITORY)) return reply(503, "not-configured");
  // Bound streamed bodies too: Content-Length alone is not sufficient.
  const reader = request.body?.getReader();
  if (!reader) return reply(400, "empty");
  const chunks = []; let size = 0;
  for (;;) {
    const { done, value } = await reader.read(); if (done) break;
    size += value.length;
    if (size > 256 * 1024) { await reader.cancel(); return reply(413, "too-large"); }
    chunks.push(value);
  }
  const raw = Buffer.concat(chunks);
  if (!validSignature(raw, request.headers.get("x-notion-signature"), env.NOTION_WEBHOOK_SECRET)) return reply(401, "invalid-signature");
  let event;
  try { event = JSON.parse(raw.toString("utf8")); } catch { return reply(400, "invalid-json"); }
  if (!event || typeof event !== "object") return reply(400, "invalid-event");
  if (event.workspace_id !== env.NOTION_WORKSPACE_ID || event.subscription_id !== env.NOTION_SUBSCRIPTION_ID) return reply(403, "wrong-subscription");
  if (typeof event.id !== "string" || !/^[\w-]{1,128}$/.test(event.id)) return reply(400, "invalid-event-id");
  if (!/^(page|data_source|database)\./.test(event.type || "")) return reply(200, "ignored");
  // GitHub durably accepts the job before we acknowledge Notion. Every job reads only
  // the configured data source; event IDs/ancestors never decide what is published.
  try {
    const response = await fetcher(`https://api.github.com/repos/${env.PUBLISH_GITHUB_REPOSITORY}/actions/workflows/publish-content.yml/dispatches`, {
      method: "POST", signal: AbortSignal.timeout(15_000),
      headers: { Authorization: `Bearer ${env.PUBLISH_GITHUB_TOKEN}`, Accept: "application/vnd.github+json", "Content-Type": "application/json", "X-GitHub-Api-Version": "2022-11-28" },
      body: JSON.stringify({ ref: env.PUBLISH_GITHUB_REF, inputs: { event_id: event.id } }),
    });
    if (!response.ok) return reply(502, "dispatch-failed");
    return reply(202, "queued");
  } catch { return reply(502, "dispatch-failed"); }
}
