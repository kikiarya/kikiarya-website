import type { Metadata } from "next";
import Script from "next/script";
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
import DraggablePet from "../components/assistant/DraggablePet";
import { site } from "../lib/site";

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
    <html lang="en" suppressHydrationWarning>
      <body className="noise font-body">
        <Script
          id="kikiarya-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(() => {
              const key = "kikiarya-color-theme-v1";
              let saved = null;
              try { saved = localStorage.getItem(key); } catch {}
              const theme = saved === "light" || saved === "dark"
                ? saved
                : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
              const root = document.documentElement;
              root.dataset.theme = theme;
              root.dataset.themeReady = "true";
              root.style.colorScheme = theme;
            })();`,
          }}
        />
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
            <DraggablePet />
          </RouteVeilProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
