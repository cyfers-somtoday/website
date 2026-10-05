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
npm run dev       # http://localhost:4321/
npm run check     # astro check (types + templates)
npm run build     # static output in dist/
npm run preview   # serve dist/
```

## Site URL and base path

Canonical URLs, Open Graph URLs, `robots.txt` and the sitemap come from `SITE_URL`
(default: `https://cyfers.dev/`). Its path becomes Astro's `base`, so internal links match where
the site is hosted (root domain vs a sub-path).

```bash
SITE_URL=https://cyfers.example/ npm run build   # root domain → base "/"
SITE_URL=https://owner.github.io/website/ npm run build   # GitHub Pages project site
```

Internal links must go through `href()` from `src/site.ts` so the base path is applied.

## Deploy

Production is **https://cyfers.dev/** — Cloudflare Worker `cyfers-website` (Workers Static Assets).
There is **no** GitHub Actions deploy workflow; CI/CD is [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
connected to this GitHub repo. Set `SITE_URL` at build time to the final public URL.

**Manual deploy (local):** assets-only Worker via `wrangler.jsonc` (`assets.directory` `./dist`,
plus an empty `previews: {}` block so Workers Builds can run `wrangler preview` on PRs):

```bash
npm run deploy   # defaults to SITE_URL=https://cyfers.dev/
# override: SITE_URL=https://YOUR-DOMAIN/ npm run deploy
```

Local Workers preview: `SITE_URL=http://127.0.0.1:8787/ npm run cf:preview`.  
No `@astrojs/cloudflare` adapter — the site is static.

### Workers Builds (auto-deploy on `main`)

Expected dashboard settings for Worker **cyfers-website**:

| Setting | Value |
| --- | --- |
| Repository | `cyfers-somtoday/website` |
| Production branch | `main` |
| Root directory | `/` (repo root) |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` (not `npm run deploy` — that would build twice) |
| Preview command | `npx wrangler preview` |
| Build var `SITE_URL` | unset, or `https://cyfers.dev/` — **never** the old GitHub Pages URL |

Every push to `main` (including PR merges) should create a production build, then deploy.
PR branches use preview builds when enabled.

**If a push to `main` does not ship:**

1. [Cloudflare dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **cyfers-website**.
2. Open **Deployments** (or **Builds**) and check the latest row for that commit.
3. If status is **Canceled** / **Failed**: open the build → **Retry** (or push a new commit to `main`).
4. **Settings** → **Builds** → **Branch control**: production branch must be **`main`**.
5. **Settings** → **Builds**: confirm build/deploy commands match the table above; clear any
   `SITE_URL` build variable that still points at `*.github.io/website/`.
6. GitHub → org **cyfers-somtoday** → **Settings** → **GitHub Apps** (or
   https://github.com/organizations/cyfers-somtoday/settings/installations) → **Cloudflare Workers & Pages**
   → repository access includes **website** (or “All repositories”).
7. Optional recovery: **Settings** → **Builds** → **Deploy Hooks** → create a hook for `main`,
   then `curl -X POST "<hook-url>"` to force a production build without a new commit.
8. Last resort without Builds: from a machine with Wrangler auth, `npm run deploy` in this repo.

**Cloudflare Pages / Netlify** (not used for cyfers.dev): build `npm run build`, output `dist`,
env `SITE_URL`.

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
- Production domain is `https://cyfers.dev/` (default `SITE_URL`); override only for other hosts.
