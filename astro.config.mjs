import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Public URL of the deployed site, including any sub-path. Canonical URLs,
// sitemap and robots.txt use this. Override for GitHub Pages project sites
// (e.g. https://owner.github.io/repo/).
const siteUrl = new URL(process.env.SITE_URL ?? "https://cyfers.dev/");

export default defineConfig({
  site: siteUrl.origin,
  base: siteUrl.pathname,
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [sitemap()],
});
