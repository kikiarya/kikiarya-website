import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MotionProvider from "../components/motion/MotionProvider";
import RouteVeilProvider from "../components/motion/RouteVeil";
import EntryGate from "../components/motion/EntryGate";
import PetalCursor from "../components/motion/PetalCursor";
import PetalField from "../components/motion/PetalField";
import SmoothScroll from "../components/motion/SmoothScroll";

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

export const metadata: Metadata = {
  title: {
    default: "Kikiarya — AI & Software Engineering",
    template: "%s — Kikiarya",
  },
  description:
    "Kikiarya (Chen Qiyue) — AI and software engineering. Projects with honest write-ups, a resume, and a bit about the person behind them.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="noise font-body">
        <MotionProvider>
          <RouteVeilProvider>
            <SmoothScroll />
            <PetalField />
            <PetalCursor />
            <EntryGate />
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </RouteVeilProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
