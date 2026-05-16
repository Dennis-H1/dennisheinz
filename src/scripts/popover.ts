let initialized = false;

export function initPopovers() {
  if (initialized) return;
  initialized = true;

  const getAll = () =>
    Array.from(document.querySelectorAll<HTMLDetailsElement>("[data-popover]"));

  document.addEventListener("click", (e) => {
    const target = e.target as Node;
    for (const p of getAll()) {
      if (!p.contains(target)) p.open = false;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    for (const p of getAll()) p.open = false;
  });

  document.addEventListener(
    "toggle",
    (e) => {
      const t = e.target as HTMLElement | null;
      if (!t || !(t instanceof HTMLDetailsElement)) return;
      if (!t.matches("[data-popover]")) return;
      if (!t.open) return;
      for (const p of getAll()) {
        if (p !== t) p.open = false;
      }
    },
    true,
  );
}
