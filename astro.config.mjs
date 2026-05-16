import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

export default defineConfig({
  site: "https://dennisheinz.com",
  trailingSlash: "always",
  redirects: {
    "/": "/de/",
    "/about/": "/de/about/",
    "/blog/": "/de/blog/",
    "/blog/architecture/": "/de/blog/architecture/",
    "/impressum/": "/de/impressum/",
    "/datenschutz/": "/de/datenschutz/",
  },
  integrations: [sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: "always",
    format: "directory",
  },
});
