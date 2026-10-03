import { lookup } from "node:dns/promises";
import { request } from "node:https";
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

// Only globally routable IPv4 destinations; pin DNS results into the TLS connection.
export function publicIPv4(address) {
  const parts = address.split(".").map(Number);
  if (parts.length !== 4 || parts.some(n => !Number.isInteger(n) || n < 0 || n > 255)) return false;
  const [a, b, c] = parts;
  return !(a === 0 || a === 10 || a === 127 || a >= 224 || a === 169 && b === 254 || a === 172 && b >= 16 && b <= 31 || a === 192 && (b === 168 || b === 0 || b === 2) || a === 100 && b >= 64 && b <= 127 || a === 198 && (b === 18 || b === 19 || b === 51 && c === 100) || a === 203 && b === 0 && c === 113);
}

export async function downloadImage(source, redirects = 0) {
  const url = new URL(source);
  if (url.protocol !== "https:" || url.username || url.password || url.port && url.port !== "443") throw new Error("Images require public HTTPS URLs");
  if (redirects > 3) throw new Error("Too many image redirects");
  const addresses = await lookup(url.hostname, { family: 4, all: true });
  if (!addresses.length || addresses.some(a => !publicIPv4(a.address))) throw new Error("Image address is not public");
  const limit = 10 * 1024 * 1024;
  return new Promise((resolve, reject) => {
    const req = request(url, { signal: AbortSignal.timeout(30_000), lookup: (_host, options, callback) => {
      const address = addresses[0];
      if (options.all) callback(null, [address]); else callback(null, address.address, 4);
    } }, response => {
      if ([301, 302, 303, 307, 308].includes(response.statusCode)) {
        response.resume();
        if (!response.headers.location) { reject(new Error("Image redirect has no location")); return; }
        downloadImage(new URL(response.headers.location, url).href, redirects + 1).then(resolve, reject); return;
      }
      if (response.statusCode !== 200 || !/^image\/(png|jpeg|webp|gif)(;|$)/i.test(response.headers["content-type"] || "")) { response.resume(); reject(new Error("Image must be PNG, JPEG, WebP or GIF")); return; }
      let size = 0; const chunks = [];
      response.on("data", chunk => { size += chunk.length; if (size > limit) req.destroy(new Error("Image exceeds 10 MB")); else chunks.push(chunk); });
      response.on("error", reject);
      response.on("end", () => resolve(Buffer.concat(chunks)));
    });
    req.on("error", () => reject(new Error("Image download failed or exceeded limits")));
    req.end();
  });
}

export async function materializeImages(blocks, directory, { dryRun = false, download = downloadImage } = {}) {
  for (const block of blocks) {
    if (block.type === "image") {
      try {
        const buffer = await download(block.src);
        // Decode and re-encode rather than trusting a file extension or MIME header.
        const { data, info } = await sharp(buffer, { limitInputPixels: 40_000_000, animated: false }).rotate().webp({ quality: 88 }).toBuffer({ resolveWithObject: true });
        const name = `${createHash("sha256").update(data).digest("hex")}.webp`;
        if (!dryRun) { await mkdir(directory, { recursive: true }); await writeFile(join(directory, name), data); }
        block.src = `/notion-media/${name}`; block.width = info.width; block.height = info.height;
      } catch (error) { throw new Error(`Image block ${block.id}: ${error.message}`); }
    }
    if (block.children) await materializeImages(block.children, directory, { dryRun, download });
  }
}
