#!/usr/bin/env bash
set -euo pipefail

INPUT="rethink-human-agent-collaboration.png"
OVERLAY="$(mktemp -t callouts)"
OUTPUT="rethink-human-agent-collaboration-callouts.png"

# Callout positions use the original 3598x2256 image coordinates.
CALLOUT_1_X=1299
CALLOUT_1_Y=450
CALLOUT_1_COLOR="#2563eb"
CALLOUT_1_BORDER="#FFF"

CALLOUT_2_X=450
CALLOUT_2_Y=1140
CALLOUT_2_COLOR="#d97706"
CALLOUT_2_BORDER="#fff"

CALLOUT_3A_X=3000
CALLOUT_3A_Y=500
CALLOUT_3A_COLOR="#16a34a"
CALLOUT_3A_BORDER="#fff"

CALLOUT_3B_X=3000
CALLOUT_3B_Y=1850
CALLOUT_3B_COLOR="#16a34a"
CALLOUT_3B_BORDER="#fff"

CALLOUT_3C_X=1500
CALLOUT_3C_Y=1100
CALLOUT_3C_COLOR="#16a34a"
CALLOUT_3C_BORDER="#fff"

cat > "$OVERLAY" <<SVG
<svg xmlns="http://www.w3.org/2000/svg"
     width="3598" height="2256" viewBox="0 0 3598 2256">

  <!-- Callout 1: lead agent -->
  <circle cx="${CALLOUT_1_X}" cy="${CALLOUT_1_Y}" r="42"
          fill="${CALLOUT_1_COLOR}" stroke="${CALLOUT_1_BORDER}" stroke-width="8"/>
  <text x="${CALLOUT_1_X}" y="$((CALLOUT_1_Y + 16))" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="52"
        font-weight="700" fill="#fff">1</text>

  <!-- Callout 2: pinned helper -->
  <circle cx="${CALLOUT_2_X}" cy="${CALLOUT_2_Y}" r="42"
          fill="${CALLOUT_2_COLOR}" stroke="${CALLOUT_2_BORDER}" stroke-width="8"/>
  <text x="${CALLOUT_2_X}" y="$((CALLOUT_2_Y + 16))" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="52"
        font-weight="700" fill="#fff">2</text>

  <!-- Callout 3a: Claude terminal -->
  <circle cx="${CALLOUT_3A_X}" cy="${CALLOUT_3A_Y}" r="42"
          fill="${CALLOUT_3A_COLOR}" stroke="${CALLOUT_3A_BORDER}" stroke-width="8"/>
  <text x="${CALLOUT_3A_X}" y="$((CALLOUT_3A_Y + 16))" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="52"
        font-weight="700" fill="#fff">3</text>

  <!-- Callout 3b: Codex terminal -->
  <circle cx="${CALLOUT_3B_X}" cy="${CALLOUT_3B_Y}" r="42"
          fill="${CALLOUT_3B_COLOR}" stroke="${CALLOUT_3B_BORDER}" stroke-width="8"/>
  <text x="${CALLOUT_3B_X}" y="$((CALLOUT_3B_Y + 16))" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="52"
        font-weight="700" fill="#fff">3</text>

  <!-- Callout 3c: empty Buddy area -->
  <!--circle cx="${CALLOUT_3C_X}" cy="${CALLOUT_3C_Y}" r="42"
          fill="${CALLOUT_3C_COLOR}" stroke="${CALLOUT_3C_BORDER}" stroke-width="8"/>
  <text x="${CALLOUT_3C_X}" y="$((CALLOUT_3C_Y + 16))" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="52"
        font-weight="700" fill="#fff">3</text -->
</svg>
SVG

magick "$INPUT" \
  \( -background none "$OVERLAY" \) \
  -compose over -composite "$OUTPUT"

rm "$OVERLAY"
echo "Created $OUTPUT"
