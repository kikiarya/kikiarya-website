"use client";

import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "kikiarya-color-theme-v1";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  root.dataset.themeChanging = "true";
  window.setTimeout(() => {
    delete root.dataset.themeChanging;
  }, 260);
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const toggleTheme = () => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const next: Theme = current === "dark" ? "light" : "dark";
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The visual toggle still works when storage is unavailable.
    }
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle ${className}`}
      aria-label="Toggle light and dark theme / 切换浅色和深色模式"
      title="Toggle theme / 切换主题"
    >
      <Moon className="theme-icon theme-icon-moon" size={17} aria-hidden="true" />
      <Sun className="theme-icon theme-icon-sun" size={17} aria-hidden="true" />
    </button>
  );
}
