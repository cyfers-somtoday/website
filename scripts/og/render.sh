#!/usr/bin/env bash
# Re-render public/og.jpg from scripts/og/og.html. Needs Chrome/Chromium and `npm install` (for fonts).
set -euo pipefail
TMP_PNG="$(mktemp --suffix=.png)"
cd "$(dirname "$0")/../.."
CHROME="${CHROME:-$(command -v google-chrome || command -v chromium || command -v chromium-browser)}"
# Headless Chrome can hang after writing the screenshot, so a timeout (exit 124) counts as success.
timeout 30 "$CHROME" --headless=new --no-first-run --user-data-dir="$(mktemp -d)" --disable-gpu --hide-scrollbars --allow-file-access-from-files \
  --window-size=1200,630 --screenshot="$TMP_PNG" "file://$PWD/scripts/og/og.html" || [ $? -eq 124 ]
node -e "require(\"sharp\")(process.argv[1]).jpeg({ quality: 85, mozjpeg: true }).toFile(\"public/og.jpg\")" "$TMP_PNG"
