import React from "react";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Metadata for SEO (Next.js specific)
export const metadata = {
  title: "陈绮玥 | Qiyue Chen | Computer Science Student",
  description: "Computer Science student at University of Sydney, passionate about full-stack development, machine learning, and distributed systems.",
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