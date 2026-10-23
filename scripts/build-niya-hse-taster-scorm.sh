#!/usr/bin/env bash
# Packages the NiYA HSE taster course (backend/src/marketing/niya-hse-taster/) as a
# SCORM 1.2 zip for upload to an LMS such as learn.niya.gov.ng. The same files are
# served as the preview at paleontraining.com/niya-hse-taster/.
#
# Usage: scripts/build-niya-hse-taster-scorm.sh [output.zip]
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/backend/src/marketing/niya-hse-taster"
OUT="${1:-$ROOT/niya-hse-taster-scorm12.zip}"
OUT="$(cd "$(dirname "$OUT")" && pwd)/$(basename "$OUT")"

# Every file listed in the manifest must exist, and nothing else is shipped.
FILES=$(grep -o 'file href="[^"]*"' "$SRC/imsmanifest.xml" | sed 's/file href="//; s/"$//')
for f in $FILES; do
  [ -f "$SRC/$f" ] || { echo "Missing file listed in imsmanifest.xml: $f" >&2; exit 1; }
done

rm -f "$OUT"
cd "$SRC"
# imsmanifest.xml must sit at the root of the zip.
zip -X -q "$OUT" imsmanifest.xml $FILES
echo "Built $OUT"
unzip -l "$OUT"
