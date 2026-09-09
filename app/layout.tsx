import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Inter, JetBrains_Mono, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MotionProvider from "../components/motion/MotionProvider";
import RouteVeilProvider from "../components/motion/RouteVeil";
import EntryGate from "../components/motion/EntryGate";
import PetalCursor from "../components/motion/PetalCursor";
import PetalField from "../components/motion/PetalField";
import SmoothScroll from "../components/motion/SmoothScroll";
import SpecularRoot from "../components/motion/SpecularRoot";
import CommandPalette from "../components/CommandPalette";
import SiteFrame from "../components/SiteFrame";
import { site } from "../lib/site";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

/** Cover Chinese motto only — Song serif, not applied site-wide. */
const coverCjk = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cover-cjk",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: ["Songti SC", "STSong"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"
  ),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} ${script.variable} ${coverCjk.variable}`}
      suppressHydrationWarning
    >
      <body className="noise font-body">
        <MotionProvider>
          <RouteVeilProvider>
            <SmoothScroll />
            <SpecularRoot />
            <PetalField />
            <PetalCursor />
            <EntryGate />
            <SiteFrame>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </SiteFrame>
            <CommandPalette />
          </RouteVeilProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
