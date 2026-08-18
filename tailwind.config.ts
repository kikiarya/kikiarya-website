
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--sakura-bg)",
        foreground: "var(--sakura-ink)",
        accent: "var(--sakura-accent-deep)",
        border: "var(--sakura-line-soft)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Songti SC", "STSong", "Noto Serif SC", "Georgia", "serif"],
        body: ["var(--font-body)", "PingFang SC", "Noto Sans SC", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        hero: ["var(--fs-hero)", { lineHeight: ".92", letterSpacing: "-.045em" }],
        chapter: ["var(--fs-chapter)", { lineHeight: "1.02", letterSpacing: "-.035em" }],
        "card-title": ["var(--fs-title)", { lineHeight: "1.2" }],
        meta: ["var(--fs-meta)", { lineHeight: "1.4" }],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.02em",
        widest: "0.2em",
      },
    },
  },
  plugins: [],
};
export default config;
