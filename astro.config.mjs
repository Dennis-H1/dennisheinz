import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://dennisheinz.com",
  trailingSlash: "always",
  integrations: [sitemap()],
  build: {
    inlineStylesheets: "always",
    format: "directory",
  },
});
