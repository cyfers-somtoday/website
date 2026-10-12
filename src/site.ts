export const repos = {
  app: "https://github.com/cyfers-somtoday/somtoday-login",
  releases: "https://github.com/cyfers-somtoday/somtoday-login/releases/latest",
  allReleases: "https://github.com/cyfers-somtoday/somtoday-login/releases",
  issues: "https://github.com/cyfers-somtoday/somtoday-login/issues",
  plugins: "https://github.com/cyfers-somtoday/cyfer-plugins",
  pluginGuide:
    "https://github.com/cyfers-somtoday/somtoday-login/blob/main/docs/plugins.md",
  org: "https://github.com/cyfers-somtoday",
};

export const releaseApi =
  "https://api.github.com/repos/cyfers-somtoday/somtoday-login/releases/latest";

/** Tracks downloads and redirects to the latest GitHub release asset. */
export const downloadApi = "https://api.hijmanssam.dev/cyfers/downloads";

export type DownloadPlatform = "win" | "mac" | "lin";

/** Primary installer assets → downloads API `platform` query param. */
export const assetPlatform = {
  exe: "win",
  dmg: "mac",
  appimage: "lin",
} as const satisfies Record<string, DownloadPlatform>;

export type TrackedAsset = keyof typeof assetPlatform;

export function downloadHref(platform: DownloadPlatform): string {
  return `${downloadApi}?platform=${platform}`;
}

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Prefix a site-relative path ("/features/") with the configured base path. */
export function href(path: string): string {
  return `${base}${path}`;
}

export const nav = [
  { label: "Home", path: "/" },
  { label: "Features", path: "/features/" },
  { label: "Download", path: "/download/" },
  { label: "FAQ", path: "/faq/" },
  { label: "Privacy", path: "/privacy/" },
];
