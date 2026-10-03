export const plain = (parts = []) => parts.map(p => p.plain_text ?? p.text?.content ?? "").join("");

export function linkUrl(value) {
  if (!value) return undefined;
  const url = new URL(value);
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) throw new Error("Links must use http or https without credentials");
  return url.href;
}

function rich(parts = []) {
  return parts.map(p => {
    if (p.type && !["text", "mention"].includes(p.type)) throw new Error(`Unsupported rich text: ${p.type}`);
    return { text: plain([p]), ...(p.href || p.text?.link?.url ? { href: linkUrl(p.href || p.text.link.url) } : {}),
      ...Object.fromEntries(["bold", "italic", "strikethrough", "underline", "code"].filter(k => p.annotations?.[k]).map(k => [k, true])) };
  });
}

export function convertBlocks(blocks, parent = "body") {
  return blocks.filter(b => !b.archived && !b.in_trash).map((block, index) => {
    const id = block.id || `${parent}-${index}`;
    const type = block.type;
    const body = block[type];
    if (!body) throw new Error(`Invalid block ${id}: ${type}`);
    const base = { id, type };
    if (["paragraph", "heading_1", "heading_2", "heading_3", "quote", "bulleted_list_item", "numbered_list_item", "code", "callout"].includes(type)) {
      return { ...base, text: rich(body.rich_text), ...(type === "code" ? { language: body.language || "plain text" } : {}),
        ...(block.children?.length ? { children: convertBlocks(block.children, id) } : {}) };
    }
    if (type === "divider") return base;
    if (type === "image") {
      const src = linkUrl(body.file?.url || body.external?.url);
      if (!src) throw new Error(`Image ${id} has no URL`);
      return { ...base, src, caption: rich(body.caption) };
    }
    if (type === "table") {
      const rows = (block.children || []).filter(b => !b.archived && !b.in_trash).map(row => {
        if (row.type !== "table_row" || row.table_row?.cells?.length !== body.table_width) throw new Error(`Invalid table row ${row.id}`);
        return row.table_row.cells.map(rich);
      });
      if (!rows.length) throw new Error(`Empty table ${id}`);
      return { ...base, rows, columnHeader: !!body.has_column_header, rowHeader: !!body.has_row_header };
    }
    throw new Error(`Unsupported block ${id}: ${type}`);
  });
}

export function blockText(block) {
  const own = block.rows ? block.rows.map(row => row.map(cell => cell.map(p => p.text).join("")).join(" | ")).join("\n")
    : (block.text || block.caption || []).map(p => p.text).join("");
  return [own, ...(block.children || []).map(blockText)].filter(Boolean).join("\n");
}

export function toSections(blocks) {
  const sections = [];
  let current = { id: "body", heading: "正文", paragraphs: [], blocks: [] };
  for (const block of blocks) {
    if (/^heading_[123]$/.test(block.type)) {
      if (current.blocks.length || current.id !== "body") sections.push(current);
      current = { id: `block-${block.id}`, heading: blockText(block), level: Number(block.type.slice(-1)), paragraphs: [], blocks: [] };
      // Notion headings may have children (toggle headings).
      for (const child of block.children || []) { current.blocks.push(child); current.paragraphs.push(blockText(child)); }
    } else { current.blocks.push(block); const value = blockText(block); if (value) current.paragraphs.push(value); }
  }
  if (current.blocks.length || current.id !== "body") sections.push(current);
  return sections;
}
