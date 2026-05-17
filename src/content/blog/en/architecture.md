---
title: "The Stack Behind This Site"
description: "Astro, Tailwind, CVA, React at build time only — and a three-tier ladder for interactivity. Why every decision traces back to the same rule: no framework bytes to the client."
pubDate: 2026-05-14
---

This site is an Astro project. Static HTML, served via nginx and Cloudflare.

No React in the browser. No Alpine. No Vue. The only JavaScript that reaches the user is the JavaScript I wrote myself.

## The Stack

**Astro 6** is the foundation. Every `.astro` component is compiled to HTML at build time. The browser receives finished HTML — no runtime, no hydration overhead.

**Tailwind CSS v4** for styling. Utility-first, no separate CSS system needed.

**CVA** (`class-variance-authority`) for component variants. Instead of conditional class strings in the template, I define variants once in a type-safe CVA config — compile errors instead of runtime surprises.

**React** is in the dependencies but never shipped to the browser. It runs exclusively during the build to generate Open Graph images. I use [Satori](https://www.npmjs.com/package/satori) for that: JSX in, SVG out, then rendered to PNG. Satori expects React. So React is in the dependencies, but there are no `client:*` directives on React components.

## Interactivity in Three Tiers

Even a static site sometimes needs JavaScript. The question is: how little is enough?

I follow a ladder with three rungs and always start at the bottom.

### Tier 1 — Inline `<script>` in the `.astro` file

For single, page-specific actions: a copy button, a toggle, an event handler.

```astro
<button id="copy-btn">Copy link</button>
<script>
  document.getElementById("copy-btn")?.addEventListener("click", () => {
    navigator.clipboard.writeText(location.href);
  });
</script>
```

No runtime, no abstraction. What I write is what ships.

### Tier 2 — TypeScript in `src/scripts/`

Once the same logic is needed in more than one place, or I want types, the code moves into its own `.ts` file.

```ts
// src/scripts/mobile-nav.ts
export function initMobileNav() {
  const btn = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
  const menu = document.querySelector<HTMLElement>("[data-nav-menu]");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => {
    const open = menu.dataset.open === "true";
    menu.dataset.open = String(!open);
    btn.setAttribute("aria-expanded", String(!open));
  });
}
```

Astro bundles, minifies, and tree-shakes this automatically. Still zero framework bytes.

### Tier 3 — only when necessary

If Tier 2 isn't enough, vanilla JS is still the first question. Only when reactive state across many DOM nodes becomes unavoidable does a framework enter the picture — and then something small like Preact (~3 KB) rather than full React (~40 KB).

## The Core Rule

React in the dependency tree and no React in the browser is not a contradiction. It's simply a question of which side of the build boundary code lives on.

For a content site, the build boundary is the most important boundary there is. What stays there costs the user nothing.

My other project, [Lumina](https://lumina.dennisheinz.com), follows a different logic: reactive state there is unavoidable, so it uses a full framework frontend.
