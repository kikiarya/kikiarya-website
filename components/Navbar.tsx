"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Container from "./Container";
import { useVeilNavigate } from "./motion/RouteVeil";
import { useMotionScene } from "./motion/MotionProvider";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";
import SearchTrigger from "./SearchTrigger";
import ThemeToggle from "./theme/ThemeToggle";

const siteLinks = [
  { number: "01", name: "Overview", zh: "概览", detail: "Profile & selected work / 关于我与精选项目", href: "/" },
  { number: "02", name: "Work", zh: "项目", detail: "Projects & research / 项目与研究", href: "/work" },
  { number: "03", name: "Resume", zh: "简历", detail: "Education & experience / 教育背景与工作经历", href: "/resume" },
  { number: "04", name: "Notes", zh: "博客", detail: "Writing & reflections / 项目记录与随想", href: "/notes" },
  { number: "05", name: "Life", zh: "生活", detail: "Personal side / 生活与阅读", href: "/life" },
  { number: "06", name: "Contact", zh: "联系", detail: "Get in touch / 联系方式", href: "/contact" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = usePrefersReducedMotion();
  const { sceneReady, isCover, returnToCover } = useMotionScene();
  const navigate = useVeilNavigate();
  const links = siteLinks;
  const worldLabel = "Explore / 页面导航";

  const handleNav =
    (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      navigate(href);
    };

  const handleCover = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setOpen(false);
    returnToCover();
  };

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
      <motion.header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled ? "sakura-glass border-x-0 border-t-0" : "bg-transparent"
        }`}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
        animate={
          sceneReady && !isCover
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: -14 }
        }
        transition={{ duration: reduce ? 0.15 : 0.7, ease }}
        style={{
          pointerEvents: sceneReady && !isCover ? "auto" : "none",
          position: "fixed",
        }}
        aria-hidden={isCover || !sceneReady}
      >
        <Container className="h-20 flex items-center justify-between">
          <a
            href="/"
            onClick={handleCover}
            className="font-display text-2xl tracking-[-.04em]"
            aria-label="Back to cover"
          >
            Kikiarya<span className="text-[var(--sakura-accent-deep)]">.</span>
          </a>
          <div className="hidden md:flex items-center gap-3 xl:gap-5">
            <nav aria-label={`${worldLabel} navigation`} className="flex items-center gap-4 xl:gap-6">
            {links.map((link) => {
              const active = (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)) ||
                (link.href === "/work" && pathname.startsWith("/projects")) ||
                (link.href === "/notes" && pathname.startsWith("/blog")) ||
                (link.href === "/life" && pathname.startsWith("/bookshelf"));
              const className = `group relative py-2 font-mono text-meta uppercase tracking-[.12em] transition-colors duration-200 ${
                active
                  ? "text-[var(--sakura-accent-deep)]"
                  : "text-[var(--sakura-muted)] hover:text-[var(--sakura-ink)]"
              }`;
              const content = (
                <>
                  <span className="mr-2 tabular-nums opacity-60 transition-opacity duration-200 group-hover:opacity-100">
                    {link.number}
                  </span>
                  {link.name}<small className="nav-label-zh" lang="zh-CN">{link.zh}</small>
                  {active ? (
                    <motion.span
                      layoutId="nav-line"
                      className="absolute inset-x-0 bottom-0 h-px bg-[var(--sakura-accent-deep)] origin-left"
                      transition={{ duration: 0.45, ease }}
                    />
                  ) : null}
                </>
              );
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleNav(link.href)}
                  aria-current={active ? "page" : undefined}
                  className={className}
                >
                  {content}
                </Link>
              );
            })}
            </nav>
            <SearchTrigger />
            <ThemeToggle />
          </div>
          <div className="md:hidden flex items-center">
            <SearchTrigger compact />
            <ThemeToggle />
            <button
              onClick={() => setOpen(true)}
              className="min-h-11 min-w-11 inline-flex items-center justify-center"
              aria-label="Open navigation"
              aria-expanded={open}
            >
              <Menu size={20} />
            </button>
          </div>
        </Container>
      </motion.header>

      <AnimatePresence>
        {open && !isCover ? (
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
                <span className="font-display text-2xl">{worldLabel}</span>
                <div className="flex items-center gap-1">
                  <ThemeToggle />
                  <button
                    autoFocus
                    onClick={() => setOpen(false)}
                    className="min-h-11 min-w-11 inline-flex items-center justify-center"
                    aria-label="Close navigation"
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>
              <nav className="my-auto" aria-label={`Mobile ${worldLabel} navigation`}>
                <motion.div
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.08, ease }}
                >
                  <a
                    href="/"
                    onClick={handleCover}
                    className="group grid grid-cols-[3rem_1fr] gap-4 py-5 border-b border-[var(--sakura-line-soft)]"
                  >
                    <span className="font-mono text-meta tabular-nums text-[var(--sakura-accent-deep)]">
                      ✿
                    </span>
                    <span>
                      <strong className="font-display text-4xl font-normal block">
                        Cover
                      </strong>
                      <small className="text-[var(--sakura-muted)]">Back to the entrance</small>
                    </span>
                  </a>
                </motion.div>
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.15 + i * 0.07, ease }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleNav(link.href)}
                      className="group grid grid-cols-[3rem_1fr] gap-4 py-5 border-b border-[var(--sakura-line-soft)]"
                    >
                      <span className="font-mono text-meta tabular-nums text-[var(--sakura-accent-deep)] transition-transform duration-200 group-hover:translate-x-1">
                        {link.number}
                      </span>
                      <span>
                        <strong className="font-display text-4xl font-normal block">
                          {link.name} <small className="mobile-nav-zh" lang="zh-CN">{link.zh}</small>
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
