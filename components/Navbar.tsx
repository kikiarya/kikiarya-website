"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Container from "./Container";

const links = [
  { number: "01", name: "Index", detail: "Home", href: "/" },
  { number: "02", name: "Work", detail: "Projects & Research", href: "/work" },
  { number: "03", name: "Résumé", detail: "Education & Experience", href: "/resume" },
  { number: "04", name: "Contact", detail: "Get in Touch", href: "/contact" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled ? "sakura-glass border-x-0 border-t-0" : "bg-transparent"
        }`}
      >
        <Container className="h-20 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-2xl tracking-[-.04em]"
            aria-label="Kikiarya home"
          >
            Kikiarya<span className="text-[var(--sakura-accent-deep)]">.</span>
          </Link>
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href) ||
                    (link.href === "/work" && pathname.startsWith("/projects"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-2 font-mono text-[10px] uppercase tracking-[.14em] ${
                    active
                      ? "text-[var(--sakura-accent-deep)]"
                      : "text-[var(--sakura-muted)] hover:text-[var(--sakura-ink)]"
                  }`}
                >
                  <span className="mr-2 opacity-60">{link.number}</span>
                  {link.name}
                  {active ? (
                    <motion.span
                      layoutId="nav-line"
                      className="absolute inset-x-0 bottom-0 h-px bg-[var(--sakura-accent-deep)] origin-left"
                      transition={{ duration: 0.45, ease }}
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={() => setOpen(true)}
            className="md:hidden min-h-11 min-w-11 inline-flex items-center justify-center"
            aria-label="Open navigation"
            aria-expanded={open}
          >
            <Menu size={20} />
          </button>
        </Container>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 bg-[var(--sakura-bg-deep)]/96 backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <Container className="min-h-screen py-6 flex flex-col">
              <div className="flex justify-between items-center">
                <span className="font-display text-2xl">Index</span>
                <button
                  autoFocus
                  onClick={() => setOpen(false)}
                  className="min-h-11 min-w-11 inline-flex items-center justify-center"
                  aria-label="Close navigation"
                >
                  <X size={22} />
                </button>
              </div>
              <nav className="my-auto" aria-label="Mobile navigation">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.08 + i * 0.07, ease }}
                  >
                    <Link
                      href={link.href}
                      className="grid grid-cols-[3rem_1fr] gap-4 py-5 border-b border-[var(--sakura-line-soft)]"
                    >
                      <span className="font-mono text-xs text-[var(--sakura-accent-deep)]">
                        {link.number}
                      </span>
                      <span>
                        <strong className="font-display text-4xl font-normal block">
                          {link.name}
                        </strong>
                        <small className="text-[var(--sakura-muted)]">{link.detail}</small>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
