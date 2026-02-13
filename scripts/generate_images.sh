#!/usr/bin/env bash
# generate_images.sh — Generate hero, OG card, and poster images via OpenAI Image API.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_DIR="${SCRIPT_DIR}/../public/assets"

usage() {
  cat <<EOF
Usage: $(basename "$0") [OPTIONS]

Generate portfolio images using the OpenAI Image API.

Options:
  -h, --help    Show this help message and exit

Environment:
  OPENAI_API_KEY  (required) Your OpenAI API key

Output:
  public/assets/hero.png       Hero banner image
  public/assets/og-card.png    Open Graph social card
  public/assets/poster.png     Poster / splash image
EOF
  exit 0
}

# Parse arguments
for arg in "$@"; do
  case "$arg" in
    -h|--help) usage ;;
  esac
done

if [ -z "${OPENAI_API_KEY:-}" ]; then
  echo "Error: OPENAI_API_KEY environment variable is required." >&2
  echo "Run with --help for usage information." >&2
  exit 1
fi

if ! command -v python3 &>/dev/null; then
  echo "Error: python3 is required for JSON escaping but was not found." >&2
  exit 1
fi

mkdir -p "${OUTPUT_DIR}"

generate_image() {
  local prompt="$1"
  local output_file="$2"
  local size="${3:-1024x1024}"

  echo "Generating ${output_file}..."

  local response
  response=$(curl -s https://api.openai.com/v1/images/generations \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${OPENAI_API_KEY}" \
    -d "{
      \"model\": \"dall-e-3\",
      \"prompt\": $(printf '%s' "$prompt" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))'),
      \"n\": 1,
      \"size\": \"${size}\",
      \"response_format\": \"url\"
    }")

  local url
  url=$(echo "$response" | python3 -c "import json,sys; print(json.load(sys.stdin)['data'][0]['url'])" 2>/dev/null)

  if [ -z "$url" ]; then
    echo "Error: Failed to generate ${output_file}. API response:" >&2
    echo "$response" >&2
    return 1
  fi

  curl -s -o "${OUTPUT_DIR}/${output_file}" "$url"
  echo "Saved ${OUTPUT_DIR}/${output_file}"
}

generate_image \
  "A sleek, modern hero banner for a sports intelligence and product strategy portfolio. Dark charcoal background with burnt-orange accent lines. Minimal, professional, tech-forward aesthetic. No text." \
  "hero.png" \
  "1792x1024"

generate_image \
  "An Open Graph social card for Austin Humphrey's portfolio — sports analytics and AI theme. Dark background, clean layout, burnt-orange accents. Professional and modern. No text." \
  "og-card.png" \
  "1792x1024"

generate_image \
  "A poster-style splash image for a personal portfolio site. Theme: sports intelligence, data analytics, and AI. Midnight-dark tones with burnt-orange highlights. Elegant and minimal. No text." \
  "poster.png" \
  "1024x1024"

echo "All images generated successfully."
