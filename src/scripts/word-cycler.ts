export function initWordCycler() {
  const els = document.querySelectorAll<HTMLElement>("[data-word-cycler]");
  if (els.length === 0) return;

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  for (const el of els) {
    let words: string[] = [];
    try {
      words = JSON.parse(el.dataset.words ?? "[]");
    } catch {
      words = [];
    }
    if (words.length === 0) continue;

    const intervalMs = Number(el.dataset.interval ?? 2000);
    let index = 0;
    el.textContent = words[0]!;

    setInterval(() => {
      const next = (index + 1) % words.length;
      if (reduceMotion) {
        el.textContent = words[next]!;
        index = next;
        return;
      }
      el.classList.add("is-leaving");
      window.setTimeout(() => {
        el.textContent = words[next]!;
        el.classList.remove("is-leaving");
        index = next;
      }, 220);
    }, intervalMs);
  }
}
