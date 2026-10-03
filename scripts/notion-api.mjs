export function createNotionApi(token, { fetcher = fetch, sleep = ms => new Promise(r => setTimeout(r, ms)) } = {}) {
  return async (path, options = {}) => {
    for (let attempt = 0; attempt < 4; attempt++) {
      await sleep(350);
      let response;
      try {
        response = await fetcher(`https://api.notion.com/v1${path}`, { ...options, signal: AbortSignal.timeout(30_000), headers: { Authorization: `Bearer ${token}`, "Notion-Version": "2025-09-03", "Content-Type": "application/json" } });
      } catch { if (attempt === 3) throw new Error("Notion network request failed after retries"); await sleep(1000 * 2 ** attempt); continue; }
      if (response.ok) return response.json();
      if (attempt === 3 || response.status !== 429 && response.status < 500) throw new Error(`Notion HTTP ${response.status}`);
      const retry = response.headers.get("retry-after");
      const delay = retry ? (/^\d+(\.\d+)?$/.test(retry) ? Number(retry) * 1000 : Date.parse(retry) - Date.now()) : 1000 * 2 ** attempt;
      if (!Number.isFinite(delay) || delay > 120_000) throw new Error("Notion retry delay exceeds this run; retry later");
      await response.body?.cancel();
      await sleep(Math.max(0, delay));
    }
  };
}
