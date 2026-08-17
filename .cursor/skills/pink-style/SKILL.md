---
name: pink-style
description: >-
  Apply the pink-style "Unseen" / pink-style frontend design system when
  styling or redesigning kikiarya-website. Use when the user mentions pink-style,
  Unseen style, pink-style theme, pink glassmorphism UI, or asks to restyle
  the portfolio to match the Xiaohongshu / Nocturne-Memory-Core aesthetic.
---

# pink-style UI Design Skill

Apply this skill whenever modifying layout, colors, typography, animations, or components on **kikiarya-website**.

## Before editing code

1. Read [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) — the single source of truth for tokens, components, and constraints.
2. Match existing Next.js patterns: Tailwind CSS, Framer Motion, `components/`, `app/globals.css`.
3. Prefer CSS variables in `globals.css` for theme tokens; extend Tailwind config only when needed.
4. Keep changes scoped — restyle, don't rewrite unrelated pages.

## Implementation priorities

When restyling the portfolio, apply in this order:

1. **Theme tokens** — CSS variables (`--bg`, `--accent-deep`, etc.) in `globals.css`
2. **Typography** — load Cormorant Garamond + Inter + JetBrains Mono in `layout.tsx`
3. **Global atmosphere** — gradient background, blur orbs, optional noise overlay
4. **Shell components** — `Navbar`, `Footer`, `Container`
5. **Page sections** — Hero, cards, buttons, tags
6. **Micro-interactions** — soft fade-up reveals, no sharp/bouncy motion

## Adaptation for portfolio (not desktop app)

This site is a **personal portfolio**, not the full pink-style desktop shell. Adapt as follows:

| pink-style desktop | Portfolio adaptation |
|------------------|----------------------|
| macOS window chrome | Skip — use normal web layout |
| Left icon sidebar | Convert to top `Navbar` with glass blur |
| Model tabs (Claude/Codex) | Skip or repurpose as section nav |
| Right illustration panel | Optional decorative element on Hero only |
| Chat / Pulse panels | Skip unless building a blog/journal feature |
| pink-style colors + glass cards | **Apply everywhere** |
| Cormorant titles + mono labels | **Apply everywhere** |

## Do / Don't (quick)

**Do:** blush pink palette, glass panels, 14–20px card radius, serif display titles, mono uppercase labels, soft 150–500ms transitions.

**Don't:** slate-900 hero, corporate blue accents, sharp corners, dense dashboards, Material elevation shadows, Inter-only typography.

## Reference

- Full design spec: [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)
- Source inspiration: [Nocturne-Memory-Core](https://github.com/Pyruslili/Nocturne-Memory-Core) `dashboard.html` (`sakura-milk` source theme)
- Current stack: Next.js 14, Tailwind 3, Framer Motion, Lucide icons
