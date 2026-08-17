# pink-style UI — Design System Reference

> **Purpose:** Single source of truth for restyling `kikiarya-website` to the pink-style "Unseen" / pink-style aesthetic.
>
> **Inspiration:** Xiaohongshu post by Pyruslili · [Nocturne-Memory-Core](https://github.com/Pyruslili/Nocturne-Memory-Core) `dashboard.html` theme `sakura-milk`

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Layout — Desktop App Shell](#4-layout--desktop-app-shell)
5. [Layout — Portfolio Adaptation](#5-layout--portfolio-adaptation)
6. [Component Specifications](#6-component-specifications)
7. [Visual Effects & Atmosphere](#7-visual-effects--atmosphere)
8. [Animation Guidelines](#8-animation-guidelines)
9. [Tailwind / CSS Implementation](#9-tailwind--css-implementation)
10. [Anti-Patterns](#10-anti-patterns)
11. [Master Design Prompt](#11-master-design-prompt)

---

## 1. Design Philosophy

### Core identity

- **Anti-SaaS / Anti-B-end:** No data tables, KPI cards, admin panels, or generic startup landing pages.
- **Personal digital sanctuary:** Feels like a private journal terminal, AI companion app, or memory archive — not a productivity tool.
- **"Unseen" style:** Low contrast, generous whitespace, decorative illustration woven into functional UI.
- **Glassmorphism + organic shapes:** Frosted translucent panels over soft pastel gradients; extremely rounded corners.

### Emotional tone

Dreamy · soft · feminine · artistic · deliberate · unhurried · literary

### What makes it distinct from current site

| Current (kikiarya-website) | Target (pink-style) |
|------------------------------|-------------------|
| Slate-900 / blue-600 accents | Blush pink / raspberry `#ca6f91` |
| Sharp tracking-tighter sans hero | Cormorant serif display + Inter body |
| White cards, gray borders | Glass panels, pink-tinted borders |
| Engineering portfolio tone | Personal sanctuary / journal tone |

---

## 2. Color System

Theme name: **`pink-style`** (adapted from the Nocturne Memory Core `sakura-milk` palette)

### CSS Variables (copy into `globals.css`)

```css
:root {
  /* Backgrounds */
  --pink-style-bg: #f9e9ed;
  --pink-style-bg-deep: #fff7f8;
  --pink-style-bg-gradient: linear-gradient(150deg, #fff7f8 0%, #f9e7ec 58%, #f4dce4 100%);

  /* Glass surfaces */
  --pink-style-surface: rgba(255, 249, 250, 0.72);
  --pink-style-surface-soft: rgba(255, 227, 235, 0.52);
  --pink-style-card: rgba(255, 250, 251, 0.78);
  --pink-style-paper-soft: rgba(255, 236, 241, 0.58);
  --pink-style-tint: rgba(255, 247, 249, 0.78);
  --pink-style-tint-soft: rgba(255, 231, 238, 0.54);

  /* Text */
  --pink-style-ink: rgba(82, 58, 68, 0.94);
  --pink-style-ink-soft: rgba(92, 65, 76, 0.84);
  --pink-style-mute: rgba(134, 98, 111, 0.68);
  --pink-style-mute-soft: rgba(154, 113, 126, 0.50);

  /* Accent */
  --pink-style-accent: #d8849f;
  --pink-style-accent-deep: #ca6f91;
  --pink-style-continuity: #c98763;

  /* Borders */
  --pink-style-line: rgba(214, 132, 159, 0.22);
  --pink-style-line-soft: rgba(214, 132, 159, 0.13);
  --pink-style-line-strong: rgba(214, 132, 159, 0.34);

  /* Semantic */
  --pink-style-positive: #8daf8c;
  --pink-style-cool: #8fa9c7;
  --pink-style-warning: #d39b86;
  --pink-style-negative: #b96f7c;

  /* Typography */
  --pink-style-font-display: "Cormorant Infant", "Cormorant Garamond", Georgia, serif;
  --pink-style-font-body: Inter, "PingFang SC", system-ui, sans-serif;
  --pink-style-font-mono: "JetBrains Mono", monospace;
  --pink-style-font-number: "Cormorant Garamond", Georgia, serif;
}
```

### Color usage rules

| Role | Token | Usage |
|------|-------|-------|
| Page background | `--pink-style-bg-gradient` | Full viewport |
| Floating panels | `--pink-style-surface` + blur | Navbar, cards, modals |
| Primary text | `--pink-style-ink` | Headings, body |
| Secondary text | `--pink-style-ink-soft` | Descriptions, subtitles |
| Labels / metadata | `--pink-style-mute` | Eyebrows, timestamps, caps labels |
| Primary button | `--pink-style-accent-deep` | CTA, active nav, user bubbles |
| Secondary button | `--pink-style-surface-soft` + border | Ghost buttons |
| Hover tint | `rgba(216, 132, 159, 0.09)` | Buttons, nav items |
| Active tint | `color-mix(in srgb, var(--pink-style-accent) 12%, var(--pink-style-surface-soft))` | Selected list items |

### Ambient background orbs

```css
body::after {
  content: "";
  position: fixed;
  inset: -12%;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.56), transparent 20%),
    radial-gradient(circle at 72% 22%, rgba(216, 132, 159, 0.24), transparent 28%),
    radial-gradient(circle at 68% 76%, rgba(255, 221, 230, 0.50), transparent 30%);
  filter: blur(36px);
  opacity: 0.78;
}
```

---

## 3. Typography

### Font stack

| Role | Family | Weight | Notes |
|------|--------|--------|-------|
| Display / Logo | Cormorant Infant, Cormorant Garamond | 300 | Hero titles, section headers |
| Body | Inter, PingFang SC | 300–400 | Paragraphs, UI text |
| Labels / Meta | JetBrains Mono | 400 | Uppercase, wide tracking |
| Numbers | Cormorant Garamond | 300 | oldstyle-nums |

### Google Fonts import

```
Cormorant+Infant:ital,wght@0,300;0,400;1,300
Cormorant+Garamond:ital,wght@0,300;0,400;1,300
Inter:wght@300;400;500
JetBrains+Mono:wght@400
```

### Scale

| Token | Size | Usage |
|-------|------|-------|
| `--fs-hero` | `clamp(4.8rem, 10vw, 10.5rem)` | Landing title |
| `--fs-chapter` | `clamp(2.8rem, 6vw, 5.8rem)` | Page titles |
| `--fs-section` | `clamp(1.15rem, 1.55vw, 1.45rem)` | Section headers |
| `--fs-card-title` | `1.16rem` | Card headings |
| `--fs-body` | `0.92rem` | Body copy |
| `--fs-body-sm` | `0.82rem` | Secondary copy |
| `--fs-meta` | `0.72rem` | Metadata |
| `--fs-label` | `0.68rem` | Tab labels |
| `--fs-micro` | `0.62rem` | Eyebrows, kickers |

### Typography rules

- **Logo "pink-style" / site name:** serif, weight 300, letter-spacing `-0.04em`
- **Eyebrow labels:** mono, uppercase, letter-spacing `0.22em–0.24em`, color `--pink-style-mute`
- **Hero line-height:** `0.78` for display titles
- **Body line-height:** `1.65`
- **Italic subtitles:** use for poetic secondary lines (e.g. "Still Becoming")
- **Avoid:** all-caps sans-serif heroes, `tracking-tighter` on Inter display text

---

## 4. Layout — Desktop App Shell

Reference for full pink-style desktop UI (Xiaohongshu screenshots). Use when building app-like views or understanding the original design.

### Main window

- Centered floating window, max-width ~1200px, aspect ~16:10
- `border-radius: 40px–60px`
- `border: 1px solid rgba(214, 132, 159, 0.22)`
- `backdrop-filter: blur(22px) saturate(112%)`
- Soft diffuse shadow — no harsh drop shadows
- Background: `var(--pink-style-surface)`

### Window chrome (macOS-style)

- Top-left: traffic lights — red `#ff5f57`, yellow `#febc2e`, green `#28c840`, 12px, gap 8px
- Top-right: optional crown or status icon

### Left sidebar (icon nav)

- Width: 56–64px, semi-transparent column
- Icons: thin stroke, 18px, in 32px circular containers
- Items: Home, Grid, Terminal, Cat (active = accent fill), Pulse, Document, Settings
- Active: `--pink-style-accent-deep` icon + `rgba(216,132,159,0.09)` background
- Bottom: sun/moon theme toggle

### Top header bar

- Brand "pink-style" left, serif, wide tracking
- Horizontal tabs: "Noxbuild GPT 3.9", "Claude", "Codex", "Grok"
- Tab style: mono uppercase, active = accent underline (1px, scaleX animation)
- Sticky, `backdrop-filter: blur(22px)`, bottom border `--pink-style-line-soft`

### Main content area

- Padding: `clamp(1.25rem, 4.2vw, 5rem)`
- Modes: chat view, form view, hero/landing, data panel

### Right decorative panel

- Width: 280–320px
- Top: weather widget in glass card ("27°C · Clear · Rain")
- Bottom: classical/anime illustration (angel on heart pedestal)
- Floating thin line-art hearts: `rgba(216, 132, 159, 0.38)`

---

## 5. Layout — Portfolio Adaptation

Map pink-style patterns to `kikiarya-website` pages without the full desktop shell.

### Global shell

```
┌─────────────────────────────────────────────┐
│  Navbar (glass, sticky, blur 22px)          │
├─────────────────────────────────────────────┤
│                                             │
│  Hero — Cormorant title + blush gradient bg │
│                                             │
│  Sections — glass cards on soft pink canvas │
│                                             │
├─────────────────────────────────────────────┤
│  Footer (minimal, mono labels)              │
└─────────────────────────────────────────────┘
```

### Page mapping

| Page | pink-style elements to apply |
|------|---------------------------|
| `/` Home | Hero with serif title, glass project cards, skill tags as soft pills |
| `/projects` | Filter pills (999px radius), glass search input, card grid |
| `/projects/[slug]` | Nearfield-style content blocks, highlight cards with left accent border |
| `/resume` | Two-column editorial layout, mono section labels, accent tags |
| `/blog` | Nearfield diary card placeholder → future journal entries |

### Spacing

- Page padding: `clamp(1.25rem, 4.2vw, 5rem)` (alias `--page-pad`)
- Section gap: `8rem–10rem` vertical between major sections
- Card gap: `gap-x-10 gap-y-20` (keep current grid rhythm)
- Content max-width: `1440px` container, text blocks `max-w-3xl`

---

## 6. Component Specifications

### Glass panel (base)

```css
.pink-style-glass {
  background: var(--pink-style-card);
  border: 1px solid var(--pink-style-line-soft);
  border-radius: 14px; /* cards: 14–20px, window: 40px+ */
  backdrop-filter: blur(22px) saturate(112%);
}
```

### Navbar

- Fixed top, `py-4` when scrolled / `py-8` at top
- Scrolled state: `background: rgba(255,249,250,0.70)`, `backdrop-blur-xl`, border-bottom `--pink-style-line-soft`
- Logo: serif, accent dot in `--pink-style-accent-deep`
- Nav links: mono `10px`, uppercase, tracking `0.1em`, active underline in accent

### Primary button

- Background: `--pink-style-accent-deep` (#ca6f91)
- Text: white, weight 500, uppercase, tracking `0.08em`
- Shape: `border-radius: 999px` (pill) or `14px` (rect)
- Padding: `14px 24px` / `py-3.5 px-8`
- Hover: `scale(1.02–1.05)`, darken 5%, 150–200ms
- Example labels: "View Work", "Let Them Meet", "Download PDF"

### Secondary / ghost button

- Background: transparent or `--pink-style-surface-soft`
- Border: `1px solid var(--pink-style-line-soft)`
- Text: `--pink-style-ink-soft`
- Hover: border `--pink-style-line`, background `rgba(216,132,159,0.09)`

### Project card

- Image area: gradient fallback using category colors tinted toward pink palette
- Body: glass card, `border-radius: 20px`
- Title: serif or semibold sans, hover → `--pink-style-accent-deep`
- Tags: pill shape, `--pink-style-surface-soft` background, mono `10px`

### Tag / chip

- `border-radius: 999px`
- Background: `--pink-style-surface-soft`
- Border: `1px solid var(--pink-style-line-soft)`
- Font: mono, `0.62rem–0.72rem`, uppercase, tracking `0.08em`

### Section header (eyebrow + title)

- Eyebrow: mono, `--pink-style-accent` or `--pink-style-mute`, uppercase, tracking `0.3em–0.4em`
- Title: Cormorant or semibold, `--pink-style-ink`, tracking tight
- Description: `--pink-style-ink-soft`, `0.92rem`, max-width `28rem`

### Chat bubble (if used)

- User: bg `--pink-style-accent-deep`, white text
- AI: bg `--pink-style-paper-soft`, text `--pink-style-ink`
- Radius: `20px` on three corners, `6px` on avatar-adjacent corner
- Padding: `12px 18px`

### Input / search

- Shape: pill (`border-radius: 999px`) or `12px` rounded rect
- Background: white or `--pink-style-surface-soft`
- Border: `1px solid var(--pink-style-line-soft)`
- Focus: ring `2px rgba(216,132,159,0.20)`, border `--pink-style-accent`
- Placeholder: `--pink-style-mute`

### Pulse / progress bar (optional)

- Track: `--pink-style-surface-soft`, height 6px, radius 999px
- Fill: gradient `--pink-style-accent` → `--pink-style-accent-deep`
- Label: mono `0.72rem`, uppercase

### Nearfield / diary card

- Glass card, date header in mono uppercase
- Body prose: `0.92rem`, line-height `1.65`, `--pink-style-ink-soft`
- Supports Chinese and English

---

## 7. Visual Effects & Atmosphere

### Glassmorphism (required on elevated surfaces)

```css
backdrop-filter: blur(22px) saturate(112%);
-webkit-backdrop-filter: blur(22px) saturate(112%);
background: rgba(255, 249, 250, 0.72);
border: 1px solid rgba(214, 132, 159, 0.13);
```

Lighter panels: `blur(8px)`

### Background layer stack

1. Base gradient: `#fff7f8 → #f9e7ec → #f4dce4`
2. Radial orbs with `blur(36px)`, slow breathing animation
3. Noise overlay: SVG `feTurbulence`, opacity `0.08`, `mix-blend-mode: multiply`
4. Optional: sakura petals falling, color `rgba(202, 111, 145, 0.48)`

### Noise texture

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.08;
  background-image: url("data:image/svg+xml,...feTurbulence...");
  mix-blend-mode: multiply;
}
```

### Decorative elements (use sparingly on portfolio)

- Thin line-art hearts
- Hollow circle (moon) above hero title
- Optional corner illustration — do not block content
- Small cat mascot icon near CTAs (optional Easter egg)

### Selection color

```css
::selection {
  background: rgba(216, 132, 159, 0.32);
  color: var(--pink-style-ink);
}
```

---

## 8. Animation Guidelines

### Principles

- Soft, slow, unhurried — never snappy or bouncy
- Prefer fade + translateY over scale-heavy motion
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for reveals

### Standard animations

| Name | Duration | Usage |
|------|----------|-------|
| `revealUp` | 1s | Section entrance, fade + translateY(20px→0) |
| `revealDown` | 1s | Topbar entrance |
| `titleIn` | 1.25s | Hero title |
| `cosmicBreath` | 16s alternate infinite | Background orbs |
| `tabUnderline` | 0.5s | Active tab indicator scaleX |
| Hover scale | 150–200ms | Buttons, cards: scale(1.02–1.05) |

### Framer Motion defaults (for this project)

```tsx
// Reveal
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}

// Nav underline (keep layoutId pattern)
transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
```

### Avoid

- Bounce easing
- Duration < 100ms on layout changes
- Parallax overload
- Flashy gradient animations on text

---

## 9. Tailwind / CSS Implementation

### Extend `tailwind.config.ts`

```ts
theme: {
  extend: {
    colors: {
      pinkStyle: {
        bg: '#f9e9ed',
        'bg-deep': '#fff7f8',
        ink: 'rgba(82, 58, 68, 0.94)',
        'ink-soft': 'rgba(92, 65, 76, 0.84)',
        mute: 'rgba(134, 98, 111, 0.68)',
        accent: '#d8849f',
        'accent-deep': '#ca6f91',
        line: 'rgba(214, 132, 159, 0.22)',
        'line-soft': 'rgba(214, 132, 159, 0.13)',
      },
    },
    fontFamily: {
      display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      body: ['Inter', '"PingFang SC"', 'system-ui', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'monospace'],
    },
    borderRadius: {
      'pink-style-window': '40px',
      'pink-style-card': '20px',
      'pink-style-panel': '14px',
    },
    backdropBlur: {
      pinkStyle: '22px',
    },
  },
},
```

### Utility classes to add in `globals.css`

```css
@layer utilities {
  .pink-style-glass {
    @apply bg-[rgba(255,249,250,0.72)] border border-[rgba(214,132,159,0.13)]
           backdrop-blur-[22px] backdrop-saturate-[112%];
  }
  .pink-style-eyebrow {
    @apply font-mono text-[10px] uppercase tracking-[0.3em] text-pink-style-mute;
  }
  .pink-style-btn-primary {
    @apply bg-pink-style-accent-deep text-white font-medium uppercase tracking-widest
           rounded-full px-8 py-3.5 transition-all duration-200
           hover:scale-105 active:scale-95;
  }
}
```

### Icon style

- Library: Lucide React (already in project)
- Stroke width: 1.5–2
- Size: 14–18px for UI, 64px for decorative card icons
- Color: `--pink-style-mute` default, `--pink-style-accent-deep` on active/hover

---

## 10. Anti-Patterns

Do **not** introduce these when applying pink-style styling:

| ❌ Avoid | ✅ Use instead |
|---------|----------------|
| `bg-slate-900` hero/buttons | `--pink-style-accent-deep` or `--pink-style-ink` |
| `text-blue-600` accents | `--pink-style-accent-deep` |
| `border-gray-100/200` | `--pink-style-line-soft` |
| Sharp `rounded-md` (4–6px) on cards | `rounded-[14px]`–`rounded-[20px]` |
| Inter-only display headings | Cormorant Garamond |
| Dense shadow `shadow-xl` | Glass blur + thin border |
| KPI cards, charts with axes | Editorial prose blocks |
| "Dashboard" copy tone | Journal / archive tone |
| Dark mode as default | pink-style light theme |
| Stock photo heroes | Gradient + optional surreal illustration |

---

## 11. Master Design Prompt

Copy this block when asking an AI to generate or refactor UI components.

---

```markdown
# pink-style UI — "Unseen" Personal Desktop Aesthetic

Design a interface inspired by the pink-style "Unseen" design language. This is NOT a corporate SaaS dashboard — it should feel like a dreamy, private digital sanctuary: soft, feminine, artistic, and deeply personalized.

## Design Philosophy

- Anti-SaaS: avoid boxy grids, data tables, admin panels, or generic startup landing pages
- Personal sanctuary aesthetic: private journal terminal, AI companion app, or memory archive
- "Unseen" style: low contrast, generous whitespace, decorative illustration integrated into functional UI
- Glassmorphism throughout: frosted translucent panels floating over soft pastel gradients
- Organic shapes: extremely rounded corners (40px–60px on main window, 14px–20px on cards, 999px on pills/buttons)

## Color Palette — "pink-style" Theme

**Backgrounds:**
- `--bg`: #f9e9ed
- `--bg-deep`: #fff7f8
- Gradient: linear-gradient(150deg, #fff7f8 0%, #f9e7ec 58%, #f4dce4 100%)
- Ambient orbs: radial-gradient at 20%/72%/68% with rgba(216,132,159,*) and rgba(255,221,230,*), filter blur(36px)

**Surfaces (Glass):**
- `--surface`: rgba(255, 249, 250, 0.72)
- `--surface-soft`: rgba(255, 227, 235, 0.52)
- `--card`: rgba(255, 250, 251, 0.78)

**Text:**
- `--ink`: rgba(82, 58, 68, 0.94)
- `--ink-soft`: rgba(92, 65, 76, 0.84)
- `--mute`: rgba(134, 98, 111, 0.68)

**Accent:**
- `--accent`: #d8849f
- `--accent-deep`: #ca6f91 (primary buttons, active states)
- `--continuity-accent`: #c98763

**Borders:**
- `--line`: rgba(214, 132, 159, 0.22)
- `--line-soft`: rgba(214, 132, 159, 0.13)

## Typography

- Display/Logo: "Cormorant Infant", "Cormorant Garamond" — weight 300, letter-spacing -0.04em
- Body: Inter, "PingFang SC" — weight 300–400, line-height 1.65
- Labels: "JetBrains Mono" — 0.62–0.72rem, uppercase, letter-spacing 0.13–0.24em
- Numbers: Cormorant Garamond, oldstyle-nums

## Layout — Desktop App Shell

- Centered window, border-radius 40–60px, border 1px rgba(214,132,159,0.22)
- backdrop-filter: blur(22px) saturate(112%)
- macOS traffic lights top-left (12px circles)
- Left sidebar: 56–64px, thin stroke icons, active = accent-deep
- Top tabs: mono uppercase, active underline scaleX animation
- Right panel: weather widget + classical/anime illustration

## Components

**Chat bubbles:** user = #ca6f91 + white text; AI = rgba(255,236,241,0.58); asymmetric radius 20px/6px

**Input bar:** pill shape, border-radius 999px, white bg, +/mic/send icons

**Primary button:** #ca6f91 bg, white text, uppercase, border-radius 14px or 999px, hover scale(1.02)

**Glass cards:** rgba(255,250,251,0.78), border 1px line-soft, radius 14–20px, blur 8–22px

**Pulse bars:** 6px height, 999px radius, fill accent→accent-deep

## Visual Effects

- Glass: backdrop-filter blur(22px) saturate(112%)
- Background: gradient + blur orbs + noise overlay (opacity 0.08)
- Optional: sakura petals rgba(202,111,145,0.48)
- Animations: revealUp 1s, cosmicBreath 16s, soft hover scale 150–200ms
- NO bounce, NO sharp transitions

## Avoid

- Dark mode default, sharp 4px corners, high-contrast black/white
- Generic blue (#007bff), Material shadows, data tables
- Inter-only typography, "Dashboard/Analytics" copy
- Stock photo heroes, hamburger mobile nav on desktop views

## Tech Stack

React + TypeScript + Tailwind CSS + Framer Motion + Lucide icons
Fonts: Cormorant Garamond + Inter + JetBrains Mono
```

---

## Changelog

| Date | Note |
|------|------|
| 2026-08-12 | Initial spec from Xiaohongshu screenshots + Nocturne-Memory-Core `sakura-milk` CSS tokens |
