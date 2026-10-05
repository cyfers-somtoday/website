import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const sitemapIndex = new URL(`${base}/sitemap-index.xml`, site);
  const sitemapAlias = new URL(`${base}/sitemap.xml`, site);
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${sitemapIndex}\nSitemap: ${sitemapAlias}\n`,
    {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    },
  );
};
