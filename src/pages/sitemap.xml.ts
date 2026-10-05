import type { APIRoute } from "astro";

/**
 * Alias for crawlers that probe /sitemap.xml.
 * Astro's @astrojs/sitemap integration emits sitemap-index.xml + sitemap-0.xml.
 */
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const child = new URL(`${base}/sitemap-0.xml`, site);
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    `<sitemap><loc>${child.href}</loc></sitemap>` +
    `</sitemapindex>\n`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
