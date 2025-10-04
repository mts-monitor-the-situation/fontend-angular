#!/usr/bin/env bash
set -euo pipefail

HTML_ROOT=/usr/share/nginx/html

# If a template exists, replace placeholders with env vars at container start.
TEMPLATE="$HTML_ROOT/assets/app-config.js.template"
TARGET="$HTML_ROOT/assets/app-config.js"

if [ -f "$TEMPLATE" ]; then
  echo "[entrypoint] Generating runtime config at $TARGET from $TEMPLATE"
  mkdir -p "$(dirname "$TARGET")"
  envsubst < "$TEMPLATE" > "$TARGET"
fi

exec "$@"
