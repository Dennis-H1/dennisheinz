export function initThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  function isDark(): boolean {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  btn.addEventListener("click", () => {
    const dark = !isDark();
    localStorage.setItem("theme", dark ? "dark" : "light");
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  });
}
