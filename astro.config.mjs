import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Public URL of the deployed site, including any sub-path (GitHub Pages project
// sites live under /<repo>/). Canonical URLs, sitemap and robots.txt use this.
const siteUrl = new URL(
  process.env.SITE_URL ?? "https://cyfers-somtoday.github.io/website/",
);

export default defineConfig({
  site: siteUrl.origin,
  base: siteUrl.pathname,
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [sitemap()],
});
