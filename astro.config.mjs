import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://dennisheinz.com",
  integrations: [sitemap()],
  build: {
    inlineStylesheets: "always",
  },
});
