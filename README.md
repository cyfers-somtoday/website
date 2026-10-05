# Cyfers website

Marketing site for [Cyfers](https://github.com/cyfers-somtoday/somtoday-login), the unofficial
desktop Somtoday client for Dutch secondary-school students. Dutch-first copy, static output.

Built with [Astro](https://astro.build) (static output, no client framework). Fonts (Syne,
IBM Plex Sans) are self-hosted via Fontsource, so the site makes no third-party requests except
one: the download page asks the GitHub API for the latest release.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/features/` | Features |
| `/download/` | Download (per-OS installers, steps, unsigned-build notes) |
| `/privacy/` | Privacy & gegevens |
| `/faq/` | Veelgestelde vragen |

Also generated: `404.html`, `robots.txt`, `sitemap-index.xml`.

Not built yet (later/optional in the content outline): `/plugins`, `/voor-makers`, `/changelog`,
`/over`, `/veiligheid`.

## Develop

Requires Node 22+.

```bash
npm install
npm run dev       # http://localhost:4321/website/
npm run check     # astro check (types + templates)
npm run build     # static output in dist/
npm run preview   # serve dist/
```

## Site URL and base path

Canonical URLs, Open Graph URLs, `robots.txt` and the sitemap come from `SITE_URL`
(default: `https://cyfers-somtoday.github.io/website/`). Its path becomes Astro's `base`, so all
internal links work on a GitHub Pages project site as well as on a root domain.

```bash
SITE_URL=https://cyfers.example/ npm run build   # root domain → base "/"
```

Internal links must go through `href()` from `src/site.ts` so the base path is applied.

## Deploy

The output in `dist/` is plain static files; any static host works (GitHub Pages, Cloudflare
Workers Static Assets, Netlify). Set `SITE_URL` at build time to the final public URL.

**GitHub Pages (included workflow):**

1. Repo → Settings → Pages → Source: **GitHub Actions**.
2. Repo → Settings → Secrets and variables → Actions → Variables:
   - `DEPLOY_PAGES` = `true` (turns on `.github/workflows/deploy-pages.yml`)
   - `SITE_URL` = final URL, e.g. `https://cyfers.example/` (optional; defaults to the Pages project URL)
3. Push to `main` (or run the workflow manually).

For a custom domain on Pages, also add `public/CNAME` containing the domain.

**Cloudflare Workers (Static Assets):** assets-only Worker via `wrangler.jsonc` (`assets.directory`
`./dist`). Build with the final public URL, then deploy:

```bash
SITE_URL=https://YOUR-DOMAIN/ npm run deploy   # build + wrangler deploy
# or: SITE_URL=… npm run build && npx wrangler deploy
```

Local Workers preview: `SITE_URL=http://127.0.0.1:8787/ npm run cf:preview`.  
No `@astrojs/cloudflare` adapter — the site is static. Set `SITE_URL` at build time (do not keep
the GitHub Pages default if the Worker serves the domain root). For CI, use [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/) with build `npm run build` and deploy
`npx wrangler deploy`.

**Cloudflare Pages / Netlify:** build command `npm run build`, output directory `dist`,
environment variable `SITE_URL`.

After the first deploy: add the site to Google Search Console and submit `sitemap-index.xml`.

## Downloads

Installer file names contain the version, so the download page never hard-codes one. Buttons link
to `releases/latest` on GitHub by default; a small script then asks the GitHub API for the latest
release of `cyfers-somtoday/somtoday-login` and swaps in direct asset links, sizes and the version
number. Without JavaScript (or if the API is rate-limited), the buttons still go to the release page.

## Assets

- `public/favicon-32.png`, `apple-touch-icon.png`, `icon-512.png`: resized from the app icon
  (`somtoday-login/electron-assets/icon.png`).
- `src/components/CapMark.astro`: the same cap glyph traced as SVG strokes, used as the hero visual.
- `public/og.jpg`: social preview, rendered from `scripts/og/og.html` with
  `./scripts/og/render.sh` (needs Chrome/Chromium and `npm install`).

**Missing: real product screenshots.** None exist yet, so the site uses the brand mark plus a
clearly labelled schematic of the app window (`AppSchematic.astro`), and no fake screenshots. When
screenshots are available (see the shot list in the content outline: Overzicht, sidebar, Cijfers,
Rooster, Huiswerk, Marketplace, SSO), the schematic on Home and the feature rows are the places to
swap them in. Use anonymised data.

## Before launch

- Privacy page has `TODO(juridisch)` HTML comments: legal review, responsible party/contact,
  hosting/server logs.
- “Gratis” is stated on Home, Download and FAQ; confirm that it stays true.
- Choose the final domain and set `SITE_URL`.
