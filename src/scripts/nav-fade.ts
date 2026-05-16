export function initNavFade() {
  const el = document.querySelector<HTMLElement>("[data-nav-fade]");
  if (!el) return;
  requestAnimationFrame(() => {
    el.classList.add("is-visible");
  });
}
