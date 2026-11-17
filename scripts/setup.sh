#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
node --version
npm --version
command -v chromium >/dev/null
command -v ffmpeg >/dev/null
command -v ffprobe >/dev/null
npm ci --no-audit --no-fund
npm run browser:ensure
npm run typecheck
