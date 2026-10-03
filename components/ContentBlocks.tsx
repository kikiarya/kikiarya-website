import Image from "next/image";
import type { ReactNode } from "react";
import type { ContentBlock, RichText } from "../lib/content/blocks";

function Rich({ parts = [] }: { parts?: RichText[] }) {
  return <>{parts.map((part, i) => {
    let node: ReactNode = part.text;
    if (part.code) node = <code>{node}</code>;
    if (part.bold) node = <strong>{node}</strong>;
    if (part.italic) node = <em>{node}</em>;
    if (part.strikethrough) node = <s>{node}</s>;
    if (part.underline) node = <u>{node}</u>;
    if (part.href && /^https?:\/\//i.test(part.href)) node = <a href={part.href} target="_blank" rel="noopener noreferrer">{node}</a>;
    return <span key={i}>{node}</span>;
  })}</>;
}

export default function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  const result: ReactNode[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const content = <Rich parts={block.text} />;
    const children = block.children?.length ? <ContentBlocks blocks={block.children} /> : null;
    if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
      const items: ReactNode[] = [];
      const type = block.type;
      do {
        const item = blocks[i];
        items.push(<li key={item.id}><Rich parts={item.text} />{item.children?.length ? <ContentBlocks blocks={item.children} /> : null}</li>);
        i++;
      } while (i < blocks.length && blocks[i].type === type);
      i--;
      result.push(type === "bulleted_list_item" ? <ul key={block.id}>{items}</ul> : <ol key={block.id}>{items}</ol>);
      continue;
    }
    let node: ReactNode;
    switch (block.type) {
      case "heading_1": node = <h2>{content}</h2>; break;
      case "heading_2": node = <h3>{content}</h3>; break;
      case "heading_3": node = <h4>{content}</h4>; break;
      case "quote": node = <blockquote>{content}{children}</blockquote>; break;
      case "callout": node = <aside className="article-callout">{content}{children}</aside>; break;
      case "code": node = <div className="article-code"><span className="article-code-language">{block.language}</span><pre tabIndex={0}><code>{block.text?.map(p => p.text).join("")}</code></pre></div>; break;
      case "divider": node = <hr />; break;
      case "image": node = <figure><a href={block.src} target="_blank" rel="noopener noreferrer"><Image src={block.src!} alt={block.caption?.map(p => p.text).join("") || "文章配图"} width={block.width || 1200} height={block.height || 800} sizes="(max-width: 768px) 90vw, 760px" unoptimized /></a>{block.caption?.length ? <figcaption><Rich parts={block.caption} /></figcaption> : null}</figure>; break;
      case "table": node = <div className="article-table" role="region" aria-label="文章表格" tabIndex={0}><table><tbody>{block.rows?.map((row, r) => <tr key={r}>{row.map((cell, c) => block.columnHeader && r === 0 || block.rowHeader && c === 0 ? <th key={c} scope={block.columnHeader && r === 0 ? "col" : "row"}><Rich parts={cell} /></th> : <td key={c}><Rich parts={cell} /></td>)}</tr>)}</tbody></table></div>; break;
      default: node = <><p className="whitespace-pre-wrap">{content}</p>{children}</>;
    }
    result.push(<div key={block.id} id={`block-${block.id}`} className="article-block scroll-mt-28">{node}</div>);
  }
  return <>{result}</>;
}
