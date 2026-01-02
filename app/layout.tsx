import React from "react";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Metadata for SEO (Next.js specific)
export const metadata = {
  title: "Qiyue Chen | Senior Full-Stack Engineer",
  description: "Systems-focused Full Stack Engineer specializing in distributed architecture and AI products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="noise selection:bg-blue-100 antialiased">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}