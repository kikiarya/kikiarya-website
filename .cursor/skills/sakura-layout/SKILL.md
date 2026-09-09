---
name: sakura-layout
description: >-
  Compose hierarchy, spacing, page grids, sticky headers, and reusable
  components on kikiarya-website without changing the pink-style look.
  Use when the user mentions layout, hierarchy, spacing, section headers,
  sticky bars, empty space beside figures, work-page structure, measure,
  typography scale, or which component to reuse.
---

# Sakura Layout

This skill owns **structure**. [pink-style](../pink-style/SKILL.md) owns **look**.

Do not invent a palette, a second font stack, or a new signature ornament. Tokens stay `--sakura-*` in `app/globals.css`. Atmosphere, glass, petals, and cover styling stay in pink-style.

If both skills apply: follow pink-style for color / type / motion *feel*; follow this file for where things sit, how large they are, and which existing component to reuse.

## Before editing

1. Reuse a component from the catalog below. New files only when nothing fits.
2. Cover / `EntryGate` is out of scope unless the user named the cover.
3. Do not restyle unrelated pages. Match `Container`, `SectionHeader`, `sakura-glass`, and existing work-detail patterns.

## Hierarchy

One voice, four roles. Do not flatten them.

| Role | Where | How |
|------|--------|-----|
| Wordmark | Cover, navbar, footer | `font-display`, site name `Kikiarya.` |
| Page title | Index pages, work H1 | `font-display text-hero font-light` |
| Section title | Home / index bands | `SectionHeader` → `text-chapter` |
| Running chapter | `/work/[slug]` while reading | Compact in-flow header, **not** `text-chapter` |
| Card / figure title | Cards, diagram plates | `font-display` ~`text-2xl` / `text-card-title` |
| Body | Prose | Inter, `leading-[1.65]`, `--sakura-ink-soft` |
| Eyebrow | Kicker above a title | `.eyebrow` (mono, uppercase, tracking, accent-deep) |
| Meta | Dates, venues, shortcuts | `font-mono text-meta uppercase tracking-[.12em]` |
| Script | LAR T1/T2/T3 only | `font-script` (Great Vibes). Nowhere else. |

`text-chapter` (`clamp(2.6rem, 5.5vw, 5.4rem)`) is for **landing on a section**. Work-detail chapters use a compact in-flow header. Do **not** `sticky top-20` them: the band under the navbar reads as empty pink when the title sticks.

Work-detail chapter header:

```tsx
<header className="mb-5">
  <p className="eyebrow">{chapter}</p>
  <h2 className="mt-1.5 font-display text-[clamp(1.7rem,2.6vw,2.35rem)] font-light leading-tight">
    {title}
  </h2>
</header>
```

`WorkChapters` is a `min-w-0` wrapper only — no second chapter label.

## Shell

```
fixed Navbar  h-20  z-40  top-0
main
  index pages:     pt-36 md:pt-44
  work article:    pt-28 md:pt-32   (long scroll; running headers)
  Container        max-w-[1440px] mx-auto px-[var(--page-pad)]
Footer             mt-24, ornament rule, mono links
```

`--page-pad` is `clamp(1.25rem, 4.2vw, 5rem)`. That *is* the outer margin. Do not add another 5rem of unused column inside the container.

Sticky offsets: resume TOC `top-28`. Work chapter titles stay in flow. Never leave a stuck bar that sits `top-20` with empty canvas above it.

Z (do not invent new layers):

| Layer | z |
|-------|---|
| Atmosphere, petals, scene decor | 0–5, pointer-events none |
| Page content | 10 |
| Navbar | 40 |
| Noise overlay | 50 |
| Command palette / route veil | above nav |

## Measure and columns

**Prose is narrow. Figures are wide.** Never the reverse.

- Body / intro: `max-w-xl` to `max-w-2xl`, `leading-[1.65]`
- Lists / pull quotes: `max-w-3xl`
- Editorial figures, `diagram-plate`, `TrajectoryReplay`, demo frames: **full article column** (`min-w-0`, no `max-w` on the plate)

### The empty-right rule

If a figure sits in the left track of `lg:grid-cols-[1fr_16rem]` (or `20rem`) with a sticky aside, the aside becomes a strip of unused pink. That is a layout bug, not “the figure should be bigger.”

**Put asides next to the page title, not next to figures.**

| Pattern | Use when | Example |
|---------|----------|---------|
| Title + aside (header only) | Meta, arXiv, bibtex, tags | `/work/[slug]` header grid `lg:grid-cols-[minmax(0,1fr)_16.5rem]` |
| Full-width article | Long figures, chapter prose | Work body after the meta row |
| Nav + prose | Aside is a short TOC; right column is text | `/resume` `lg:grid-cols-[15rem_minmax(0,1fr)]` |
| Title + thin status | Home hero only | `lg:grid-cols-[minmax(0,1fr)_6.25rem_17.5rem]` |

On work chapters, constrain siblings, not the section:

```tsx
<div className="space-y-6 leading-[1.65] text-[var(--sakura-ink-soft)] [&>p]:max-w-2xl [&>ol]:max-w-3xl [&>blockquote]:max-w-3xl">
  {children}
</div>
```

Home / index section gaps can stay large (`mb-20`, `space-y-24`). Work chapters: `space-y-16`. Do not copy DESIGN-SYSTEM’s “8–10rem between everything” onto a figure page.

## Page recipes

### Cover

`components/motion/EntryGate.tsx`. Do not restyle from this skill.

### Home `/`

- Hero: `min-h-[92vh] pt-36`, `FolioCorners`, `HeroLine`, magnetic CTAs.
- Bands: `SectionHeader` + content. `SceneDecor` is atmosphere, not a layout column.
- Featured work: `ProjectCard` list, not a dashboard grid.

### Index (`/work`, `/notes`, `/life`, `/bookshelf`)

```
eyebrow → text-hero → max-w-xl lede → OrnamentRule → content
```

### Work detail `/work/[slug]`

```
Back link
[ title block | venue / arXiv / bibtex aside ]
meta row (Role / Type / Stack) — full width
chapters (full width):
  compact in-flow header
  prose (max-w-2xl)
  Key implementation: build theater (`HighlightBoard` paper plate, wax seals, autoplay) — not glass cards, not a magazine type dump
  figures (full column; metric bars `auto-fit` so 3 cards fill the plate)
```

Chapter order is already in `app/work/[slug]/page.tsx`. Keep `data-chapter` on sections. `scroll-mt-20` on sections.

### Resume `/resume`

Left mono TOC + right letter. Sticky TOC is allowed because the right column is prose.

## Component catalog

Reuse these. Do not duplicate their look in one-off markup.

**Shell:** `Container`, `Navbar`, `Footer`, `SectionHeader`

**Work:** `WorkChapters` (width wrapper only), `HighlightBoard` (Fig. Build theater), `WaxSeal`, `FolioMasthead`, `ProjectCard`, `ProjectIndex`, `ProjectFigure`, `WorkEditorialFigure`, `TrajectoryReplay`, `CopyBibtex`, `DemoFrame`, `Tag`, `MetricRow`

**Diagrams:** `DiagramPlate` (paper figure, not a second glass card), `DiagramScene`, `DiagramCard` / `DiagramChain` / `DiagramPlaque`, `DiagramReadout`. Hover accents the path; do not dim siblings.

**Decor (the signature set — do not add a new family):** `OrnamentRule`, `FolioRule`, `FolioCorners`, `Bow`, `LaceDivider`, `Pearl`, `Sparkle`, `SilkRibbon`, `WaxSeal`. Never add `FloralSprig` or branch/twig ornaments.

**Motion:** `Reveal`, `HeroLine` / `FadeUp`, `Magnetic`, `SceneDecor`, `PetalField` / `PetalCursor`. Respect `usePrefersReducedMotion`. Do not reintroduce `document.startViewTransition` (it aborted in Chrome).

**Buttons:** `.button-primary` / `.button-ghost` (pill, min-height 44px). Surfaces: `.sakura-glass`.

New UI: extend one of the above. A figure belongs in `DiagramPlate`, not a generic `sakura-glass` card.

## Spatial taste (adapted, not generic)

Borrowed from strong frontend-design skills, **locked to this site**:

- **World is already chosen:** blush folio / journal, not SaaS, not terracotta-cream, not dark+acid.
- **Signature is already chosen:** lace, bow, pearl, ornament rule. One quiet mark per block. Never a sakura sprig or branch. Chanel rule: if a section has a bow *and* lace *and* a ribbon, remove one.
- **Structure is information:** eyebrows and `01 / 02` exist because chapters are a sequence. Do not number decorative cards that are not a sequence.
- **Bold in one place:** the plate or the title, not both screaming. Running headers stay quiet so the figure can be wide. Key implementation is a Fig. Build theater (one paper plate, wax-seal index, one sentence at a time), never a grid of glass cards.
- **Empty space is a column bug or leftover padding**, not a call for more illustration. `SceneDecor` lives on index pages; do not use the girl panel as a reason to leave a 20rem track beside a figure.

## Checklist

Before finishing a layout change:

- [ ] Tokens are `--sakura-*`. No new hex palette.
- [ ] Titles use the hierarchy table (hero / chapter / compact running).
- [ ] Prose is measured; figures span the article column.
- [ ] No sticky aside beside a figure.
- [ ] Work chapters are not sticky. Metric/figure grids fill the plate (`auto-fit`).
- [ ] Existing component reused, or a one-line reason it could not be.
- [ ] Cover untouched unless asked.
- [ ] Reduced motion still works.

## Related

- Visual language: [pink-style](../pink-style/SKILL.md) and [DESIGN-SYSTEM.md](../pink-style/DESIGN-SYSTEM.md)
- Live tokens: `app/globals.css` (`--sakura-*`, `--fs-*`, `.eyebrow`, `.sakura-glass`)
- Work structure: `app/work/[slug]/page.tsx`
