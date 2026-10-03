export type RichText = { text: string; href?: string; bold?: boolean; italic?: boolean; strikethrough?: boolean; underline?: boolean; code?: boolean };
export type ContentBlock = {
  id: string;
  type: "paragraph" | "heading_1" | "heading_2" | "heading_3" | "quote" | "bulleted_list_item" | "numbered_list_item" | "code" | "callout" | "divider" | "image" | "table";
  text?: RichText[];
  children?: ContentBlock[];
  language?: string;
  src?: string;
  width?: number;
  height?: number;
  caption?: RichText[];
  rows?: RichText[][][];
  columnHeader?: boolean;
  rowHeader?: boolean;
};
