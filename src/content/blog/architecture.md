---
title: "Der Stack hinter dieser Seite"
description: "Astro, Tailwind, CVA, React nur zur Build-Zeit – und eine dreistufige Leiter für Interaktivität. Warum jede Entscheidung auf derselben Grundregel basiert: kein Framework-Byte zum Client."
pubDate: 2026-05-14
---

Diese Seite ist ein Astro-Projekt. Statisches HTML, ausgeliefert über nginx und Cloudflare.

Kein React im Browser. Kein Alpine. Kein Vue. Das einzige JavaScript, das beim Nutzer landet, ist das JavaScript, das ich selbst geschrieben habe.

## Der Stack

**Astro 6** ist das Fundament. Jede `.astro`-Komponente wird zur Build-Zeit zu HTML kompiliert. Der Browser bekommt fertiges HTML, keine Runtime, keine Hydration-Arbeit.

**Tailwind CSS v4** für Styling. Utility-first, kein separates CSS-System nötig.

**CVA** (`class-variance-authority`) für Komponenten-Varianten. Statt bedingter Klassen im Template definiere ich Varianten einmal typsicher im CVA-Config, Compile-Fehler statt Runtime-Überraschungen.

**React** steht in den Dependencies, wird aber nie an den Browser ausgeliefert. Es läuft ausschließlich während des Builds, um Open-Graph-Bilder zu generieren. Ich nutze dafür [Satori](https://www.npmjs.com/package/satori): JSX rein, SVG raus, anschließend zu PNG gerendert. Satori erwartet React. Also steht React in den Dependencies, aber `client:*`-Direktiven auf React-Komponenten gibt es nicht.

## Interaktivität in drei Stufen

Natürlich braucht auch eine statische Seite manchmal JavaScript. Die Frage ist: wie wenig reicht?

Ich halte mich an eine Leiter mit drei Stufen und fange immer unten an.

### Stufe 1 — Inline `<script>` in der `.astro`-Datei

Für einzelne, seitenspezifische Aktionen: ein Copy-Button, ein Toggle, ein Event-Handler.

```astro
<button id="copy-btn">Link kopieren</button>
<script>
  document.getElementById("copy-btn")?.addEventListener("click", () => {
    navigator.clipboard.writeText(location.href);
  });
</script>
```

Keine Runtime, keine Abstraktion. Was ich schreibe, ist was ausgeliefert wird.

### Stufe 2 — TypeScript in `src/scripts/`

Sobald dieselbe Logik mehrfach gebraucht wird oder ich Typen vermisse, wandert der Code in eine eigene `.ts`-Datei.

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

Astro bundelt, minifiziert und tree-shakt das automatisch. Immer noch kein Framework-Byte.

### Stufe 3 — nur wenn nötig

Wenn Stufe 2 nicht mehr reicht, bleibt Vanilla JS immer die erste Frage. Erst wenn reaktiver State über viele DOM-Knoten hinweg unvermeidlich wird, kommt ein Framework ins Spiel, dann aber etwas Kleines wie Preact (~3 KB) statt volles React (~40 KB).

## Die Grundregel

React im Dependency-Tree und kein React im Browser ist kein Widerspruch. Es ist nur die Frage, auf welcher Seite der Build-Grenze Code lebt.

Für eine Content-Seite ist die Build-Grenze die wichtigste Grenze überhaupt. Was dort bleibt, kostet den Nutzer nichts.
