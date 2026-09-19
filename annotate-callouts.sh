#!/usr/bin/env bash
set -euo pipefail

INPUT="rethink-human-agent-collaboration.png"
OVERLAY="$(mktemp -t callouts)"
OUTPUT="rethink-human-agent-collaboration-callouts.png"

# Callout positions use the original 3598x2256 image coordinates.
CALLOUT_1_X=190
CALLOUT_1_Y=170
CALLOUT_1_COLOR="#7c3aed"
CALLOUT_1_BORDER="#fff"

CALLOUT_2_X=1180
CALLOUT_2_Y=450
CALLOUT_2_COLOR="#2563eb"
CALLOUT_2_BORDER="#FFF"

CALLOUT_3_X=450
CALLOUT_3_Y=1320
CALLOUT_3_COLOR="#d97706"
CALLOUT_3_BORDER="#fff"

CALLOUT_4A_X=3000
CALLOUT_4A_Y=600
CALLOUT_4A_COLOR="#16a34a"
CALLOUT_4A_BORDER="#fff"

CALLOUT_4B_X=3000
CALLOUT_4B_Y=1750
CALLOUT_4B_COLOR="#16a34a"
CALLOUT_4B_BORDER="#fff"

CALLOUT_4C_X=1500
CALLOUT_4C_Y=1100
CALLOUT_4C_COLOR="#16a34a"
CALLOUT_4C_BORDER="#fff"

cat > "$OVERLAY" <<SVG
<svg xmlns="http://www.w3.org/2000/svg"
     width="3598" height="2256" viewBox="0 0 3598 2256">

  <!-- Callout 1: one or dozens of sessions -->
  <circle cx="${CALLOUT_1_X}" cy="${CALLOUT_1_Y}" r="42"
          fill="${CALLOUT_1_COLOR}" stroke="${CALLOUT_1_BORDER}" stroke-width="8"/>
  <text x="${CALLOUT_1_X}" y="$((CALLOUT_1_Y + 16))" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="52"
        font-weight="700" fill="#fff">1</text>

  <!-- Callout 2: lead agent -->
  <circle cx="${CALLOUT_2_X}" cy="${CALLOUT_2_Y}" r="42"
          fill="${CALLOUT_2_COLOR}" stroke="${CALLOUT_2_BORDER}" stroke-width="8"/>
  <text x="${CALLOUT_2_X}" y="$((CALLOUT_2_Y + 16))" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="52"
        font-weight="700" fill="#fff">2</text>

  <!-- Callout 3: pinned helper -->
  <circle cx="${CALLOUT_3_X}" cy="${CALLOUT_3_Y}" r="42"
          fill="${CALLOUT_3_COLOR}" stroke="${CALLOUT_3_BORDER}" stroke-width="8"/>
  <text x="${CALLOUT_3_X}" y="$((CALLOUT_3_Y + 16))" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="52"
        font-weight="700" fill="#fff">3</text>

  <!-- Callout 4a: Claude terminal -->
  <circle cx="${CALLOUT_4A_X}" cy="${CALLOUT_4A_Y}" r="42"
          fill="${CALLOUT_4A_COLOR}" stroke="${CALLOUT_4A_BORDER}" stroke-width="8"/>
  <text x="${CALLOUT_4A_X}" y="$((CALLOUT_4A_Y + 16))" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="52"
        font-weight="700" fill="#fff">4</text>

  <!-- Callout 4b: Codex terminal -->
  <circle cx="${CALLOUT_4B_X}" cy="${CALLOUT_4B_Y}" r="42"
          fill="${CALLOUT_4B_COLOR}" stroke="${CALLOUT_4B_BORDER}" stroke-width="8"/>
  <text x="${CALLOUT_4B_X}" y="$((CALLOUT_4B_Y + 16))" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="52"
        font-weight="700" fill="#fff">4</text>

  <!-- Callout 4c: empty Buddy area -->
  <!--circle cx="${CALLOUT_4C_X}" cy="${CALLOUT_4C_Y}" r="42"
          fill="${CALLOUT_4C_COLOR}" stroke="${CALLOUT_4C_BORDER}" stroke-width="8"/>
  <text x="${CALLOUT_4C_X}" y="$((CALLOUT_4C_Y + 16))" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="52"
        font-weight="700" fill="#fff">4</text -->
</svg>
SVG

magick "$INPUT" \
  \( -background none "$OVERLAY" \) \
  -compose over -composite "$OUTPUT"

rm "$OVERLAY"
echo "Created $OUTPUT"
