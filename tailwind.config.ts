
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
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "PingFang SC", "Noto Sans SC", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
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
