#!/usr/bin/env bash
# Builds the Route B content pack for the NiYA HSE taster: a PDF of the 8 lessons
# (practice answers marked) + the final quiz sheet, and PNG copies of the diagrams,
# for NiYA to build the course in its own course builder (learn.niya.gov.ng runs
# Rocket LMS) when the SCORM package can't be uploaded.
# Content comes from backend/src/marketing/niya-hse-taster/, so it always matches
# the SCORM package and the /niya-hse-taster/ preview.
#
# Usage: scripts/build-niya-hse-taster-pack.sh [output-dir]
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/backend/src/marketing/niya-hse-taster"
PACK="$ROOT/scripts/niya-hse-pack"
OUT="${1:-$ROOT/niya-hse-taster-content-pack}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
NAME="Paleon-HSE-Taster-Content-Pack"

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
cp -R "$SRC/images" "$WORK/images"
cp "$PACK/pack.css" "$PACK/pack.js" "$WORK/"

# Quiz questions and scenario feedback, lifted from taster.js as-is.
python3 - "$SRC/taster.js" "$WORK/data.js" <<'PY'
import re, sys
js = open(sys.argv[1]).read()
q = re.search(r"var QUESTIONS = (\[.*?\n  \]);", js, re.S)
s = re.search(r"var SCN_FEEDBACK = (\{.*?\n  \});", js, re.S)
assert q and s, "QUESTIONS / SCN_FEEDBACK not found in taster.js"
open(sys.argv[2], "w").write("window.PACK = { QUESTIONS: %s, SCN: %s };\n" % (q.group(1), s.group(1)))
PY

sed -e 's#<link rel="stylesheet" href="taster.css">#<link rel="stylesheet" href="pack.css">#' \
    -e 's#<script src="taster.js"></script>#<script src="data.js"></script><script src="pack.js"></script>#' \
    "$SRC/index.html" > "$WORK/index.html"
grep -q 'pack.js' "$WORK/index.html" || { echo "Could not swap in pack.js" >&2; exit 1; }

mkdir -p "$OUT/images"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --allow-file-access-from-files \
  --virtual-time-budget=5000 --print-to-pdf="$OUT/$NAME.pdf" "file://$WORK/index.html" 2>/dev/null

for f in "$SRC"/images/*.svg; do
  rsvg-convert -w 1560 -b white "$f" -o "$OUT/images/$(basename "${f%.svg}").png"
done

rm -f "$OUT/$NAME.zip"
(cd "$OUT" && zip -X -q -r "$NAME.zip" "$NAME.pdf" images)
echo "Built $OUT"
ls -la "$OUT" "$OUT/images"
