#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT_DIR}"
pass() { echo -e "\033[0;32m[PASS]\033[0m Gate $1: $2"; }
fail() { echo -e "\033[0;31m[FAIL]\033[0m Gate $1: $2"; exit 1; }

echo "--- Gate 1: package ---"
test -f package.json || fail 1 "package.json missing"
grep -q '"create-hw-agent"' package.json || fail 1 "bin missing"
pass 1 "package locked"

echo "--- Gate 2: unit ---"
node --test tests/scaffold.test.js || fail 2 "tests failed"
pass 2 "scaffold tests passed"

echo "--- Gate 3: docs ---"
grep -q "npx @zesun33/create-hw-agent" README.md || fail 3 "README missing one-step"
grep -q "mcpServers" README.md || fail 3 "README missing mcpServers"
pass 3 "docs ok"

echo -e "\033[0;32m=== All Gates Cleared: hw-agent-scaffold Verified ===\033[0m"
