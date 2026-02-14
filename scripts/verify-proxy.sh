#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://127.0.0.1:8787/proxy}"
TOKEN="${PROXY_TOKEN:-secret}"
ORIGIN="${ORIGIN:-https://austinhumphrey.com}"

run_case() {
  local name="$1"
  local expected_status="$2"
  local url="$3"
  local auth_header="${4:-Bearer $TOKEN}"

  echo "--- $name"
  status=$(curl -sS -o /tmp/proxy_case_body.txt -w "%{http_code}" \
    -H "Origin: $ORIGIN" \
    -H "Authorization: $auth_header" \
    "$url")
  cat /tmp/proxy_case_body.txt
  echo
  if [[ "$status" != "$expected_status" ]]; then
    echo "Expected $expected_status, got $status" >&2
    exit 1
  fi
}

run_case "blocked upstream" "403" "$BASE_URL?target=https://example.org/private"
run_case "missing auth" "401" "$BASE_URL?target=https://statsapi.mlb.com/api/v1/schedule" ""

# Note: The timeout test below depends on a long-running MLB API query.
# It may fail due to network issues or if the API behavior changes.
# To skip this potentially flaky test (e.g. in CI), comment out the line below.
run_case "timeout path" "504" "$BASE_URL?target=https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=1900-01-01&endDate=2100-01-01"
run_case "successful proxy" "200" "$BASE_URL?target=https://statsapi.mlb.com/api/v1/schedule"

echo "All proxy verification cases passed."
