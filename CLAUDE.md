# Dennis Heinz — Personal Site

Personal portfolio and blog. Astro static site, served via nginx + Cloudflare.

## Stack

- **Astro 6** — static site generator (`.astro` → HTML at build time)
- **Tailwind CSS v4** — utility-first styling
- **CVA** — type-safe component variants (`class-variance-authority`)
- **React** — kept only for OG image generation (Satori in `src/pages/og/` and `src/lib/og.ts`). Never rendered on pages, never shipped to the client.
- **Vanilla JS / TS** — for interactivity (see scaling tiers below)
- **Preact** — reserved escape hatch for genuinely stateful interactive widgets

## Philosophy

Static HTML first. JavaScript is fine, but **no framework runtime ships to the client by default** — React's ~40 KB overhead buys nothing on static pages.

The actual rule, stated precisely: **no `client:*` directive on React components, ever.** React stays at build time only (OG images, Satori). For client-side behavior, scale up through the tiers below — start at Tier 1, only move up when the current tier hurts.

## Interactivity Scaling Tiers

The site grows in interactivity by climbing this ladder, never by skipping rungs.

### Tier 1 — Inline `<script>` in `.astro` files

**Use for:** one-off, page-specific behavior. A single toggle, a smooth-scroll link, a copy-to-clipboard button on one page.

**Cost:** zero framework bytes. Whatever you write is what ships.

```astro
<button id="copy-btn">Copy</button>
<script>
  document.getElementById("copy-btn")?.addEventListener("click", () => {
    navigator.clipboard.writeText(location.href);
  });
</script>
```

**Promote to Tier 2 when:** the same logic appears in two places, the inline block grows past ~30 lines, or you find yourself wanting types.

### Tier 2 — `src/scripts/*.ts` imported via `<script>` from `.astro`

**Use for:** reusable or non-trivial client logic. Mobile nav behavior, theme toggle, blog-post enhancements (copy-code buttons, heading anchors), form validation.

**Cost:** zero framework bytes. Astro bundles, minifies, and tree-shakes these — what ships is your own code only.

```astro
---
// in a .astro component
---

<script>
  import { initMobileNav } from "../scripts/mobile-nav";
  initMobileNav();
</script>
```

```ts
// src/scripts/mobile-nav.ts
export function initMobileNav() {
  // typed, testable, reusable
}
```

**Promote to Tier 3 when:** you need genuine reactive state across many DOM nodes (e.g., search-as-you-type filtering a list, a multi-step form with derived values, a pricing calculator). If you're manually re-querying the DOM and reconciling state, you've outgrown Tier 2.

### Tier 3 — Preact island via `client:visible` / `client:idle`

**Use for:** stateful interactive widgets where reactive rendering is the simplest correct model. Search-as-you-type, pricing calculators, embedded demos.

**Cost:** ~3 KB of Preact runtime, loaded only on pages that use it, only when the island is in view (with `client:visible`).

```astro
---
import SearchWidget from "../components/islands/SearchWidget.tsx";
---

<SearchWidget client:visible posts={posts} />
```

**Rules:**

- Preact islands live in `src/components/islands/` so they're visually distinct from static `.astro` components.
- Never use a Preact island for something a Tier 2 script could do — the bytes are real.
- One island per concern. Don't build a giant island that wraps the whole page.

### What's banned

- **No `client:*` directive on React components.** Preact only, when an island is needed.
- **No Alpine.js or similar declarative reactivity libraries** — they sit in an awkward middle (heavier than Tier 2, less capable than Tier 3).
- **No `.tsx` in page templates.** `.tsx` exists only in `src/pages/og/` (Satori, build-time) and `src/components/islands/` (Preact, when justified).

## Project Structure

```
src/
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── blog.astro            # Blog list — reads from content collections
│   ├── blog/[slug].astro     # Individual posts — dynamic static paths
│   ├── datenschutz.astro
│   ├── impressum.astro
│   └── og/[slug].png.ts      # OG image generation (Satori / React, build-time only)
├── layouts/
│   └── Base.astro            # Global wrapper: SEO, structured data, fonts
├── components/
│   ├── Nav.astro
│   ├── Footer.astro
│   ├── ui/                   # Reusable static components (Button, Badge, …)
│   ├── sections/             # Page sections (Hero, CTA, …)
│   └── islands/              # Preact islands — Tier 3 only
├── content/
│   └── blog/                 # Markdown blog posts (*.md)
├── scripts/                  # Tier 2 — reusable client TS, bundled by Astro
├── styles/
│   └── global.css
├── lib/
│   ├── og.ts                 # OG image renderer (build-time)
│   └── utils.ts              # cn() helper
└── content.config.ts         # Content collection schema
```

## Component Rules

| Type                  | Location                         | Format              | JS shipped        |
| --------------------- | -------------------------------- | ------------------- | ----------------- |
| Static UI             | `components/ui/`, `sections/`    | `.astro` + CVA      | 0 bytes           |
| One-off interactivity | inside the relevant `.astro`     | inline `<script>`   | just your code    |
| Reusable client logic | `src/scripts/*.ts`               | TS, imported        | just your code    |
| Stateful widget       | `components/islands/*.tsx`       | Preact + `client:*` | ~3 KB + your code |
| OG generation (build) | `src/pages/og/`, `src/lib/og.ts` | React + Satori      | 0 bytes (server)  |

## UI Primitives (`components/ui/`)

Reusable static components follow a strict pattern so the design system stays coherent and AI-generated additions match what's already there.

### The pattern

```astro
---
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("base classes shared by every variant", {
  variants: {
    variant: { default: "...", outline: "...", ghost: "..." },
    size: { sm: "...", md: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "md" },
});

interface Props extends VariantProps<typeof buttonVariants> {
  class?: string;
}

const { variant, size, class: className } = Astro.props;
---

<button class={cn(buttonVariants({ variant, size }), className)}>
  <slot />
</button>
```

### Rules

- **CVA + `cn()` is the only way to do variants.** Don't write scoped `<style>` blocks for color/spacing variants — they bypass the token system and can't be type-checked.
- **Always extend `VariantProps<typeof xVariants>`.** This is the whole reason CVA exists here. Compile-time errors beat runtime debugging.
- **Always accept `class?: string`** and merge it with `cn()` last so callers can override.
- **Always set `defaultVariants`** for every variant key. No undefined-prop branches.
- **Colors must come from semantic tokens** (`bg-primary`, `text-foreground`, `border-border`, …). These resolve to CSS variables defined in `src/styles/global.css` and flip automatically in dark mode.
  - Never inline `oklch(...)`, `#hex`, or raw Tailwind palette utilities like `bg-blue-500`. If you need a new color, add a `--token` to `global.css` and wire it through `@theme inline` first.
- **Scoped `<style>` is still fine** for non-token CSS that has nothing to do with the design system: one-off animations, `:has()` tricks, complex layout that would be ugly as utilities. Mix freely with CVA — they don't conflict.

### Adding a new primitive

1. Create `src/components/ui/Foo.astro` following the pattern above.
2. If you need a new color/spacing/radius token, add it to `:root` and the dark `:root` in `global.css`, then expose it under `@theme inline`.
3. If a variant feels like it wants conditional logic (e.g. `disabled` styling that depends on another prop), reach for `compoundVariants` in the CVA config — don't fall back to ternaries in the template.

## Blog Posts

Stored in `src/content/blog/*.md`. Required frontmatter:

```md
---
title: "Post title"
description: "One-sentence summary"
pubDate: 2024-01-15
---
```

`updatedDate` is optional. Pages auto-generate at `/blog/[slug]/`.

## Layout

The global layout is `src/layouts/Base.astro` (not `Layout.astro`).
It handles: `<head>`, canonical URL, OG tags, JSON-LD structured data, fonts.

## Build & Deploy

```bash
npm run build   # outputs to ./dist/
```

nginx serves `./dist/`. Cloudflare in front for CDN + HTTPS.
