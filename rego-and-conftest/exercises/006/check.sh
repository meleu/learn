#!/usr/bin/env bash
# check.sh — Runs conftest over manifests/ with policy/ and compares every
# tagged message against the lesson 6 answer table.
#
# Usage: ./check.sh [K8S-NN ...]    (no arguments checks every requirement)
#
# Keys only on the [K8S-NN] tag, the FAIL/WARN level, the file, and how many
# messages; the wording after the tag is yours.

set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
readonly SCRIPT_DIR
readonly -a ALL_IDS=(K8S-01 K8S-02 K8S-03 K8S-04 K8S-05 K8S-06 K8S-07)

# "ID LEVEL FILE" -> number of messages expected. Anything absent expects 0.
declare -rA EXPECTED=(
  ["K8S-01 WARN manifests/frontend-svc.yaml"]=1
  ["K8S-02 FAIL manifests/api.yaml"]=1
  ["K8S-02 FAIL manifests/debug-pod.yaml"]=1
  ["K8S-03 FAIL manifests/api.yaml"]=1
  ["K8S-03 FAIL manifests/database.yaml"]=1
  ["K8S-04 FAIL manifests/debug-pod.yaml"]=1
  ["K8S-04 FAIL manifests/web.yaml"]=2
  ["K8S-05 FAIL manifests/debug-pod.yaml"]=1
  ["K8S-05 FAIL manifests/web.yaml"]=2
  ["K8S-06 FAIL manifests/debug-pod.yaml"]=1
  ["K8S-07 WARN manifests/api.yaml"]=1
)

readonly GREEN=$'\e[32m' RED=$'\e[31m' DIM=$'\e[2m' RESET=$'\e[0m'

check::die() {
  printf '%s%s%s\n' "$RED" "$*" "$RESET" >&2
  exit 2
}

# Prints one requirement's result lines; returns 1 if any line is wrong.
check::requirement() {
  local -r id="$1"
  local -n actual_ref="$2"
  local key
  local -a keys=()
  local ok=0

  for key in "${!EXPECTED[@]}" "${!actual_ref[@]}"; do
    [[ "$key" == "$id "* ]] && keys+=("$key")
  done

  # A requirement with no tagged messages at all has not been written yet.
  local attempted=0
  for key in "${!actual_ref[@]}"; do
    [[ "$key" == "$id "* ]] && attempted=1
  done
  if ((attempted == 0)); then
    printf '  %s·  %s  no [%s] messages at all: not written yet, or passing silently%s\n' \
      "$DIM" "$id" "$id" "$RESET"
    return 1
  fi

  local -A seen=()
  local level file want got
  while IFS= read -r key; do
    [[ -n "${seen[$key]:-}" ]] && continue
    seen[$key]=1
    read -r _ level file <<<"$key"
    want="${EXPECTED[$key]:-0}"
    got="${actual_ref[$key]:-0}"
    if ((want == got)); then
      printf '  %s✓%s  %s  %s  %-28s %d message(s)\n' \
        "$GREEN" "$RESET" "$id" "$level" "$file" "$got"
    else
      printf '  %s✗%s  %s  %s  %-28s expected %d, got %d\n' \
        "$RED" "$RESET" "$id" "$level" "$file" "$want" "$got"
      ok=1
    fi
  done < <(printf '%s\n' "${keys[@]}" | sort)

  return "$ok"
}

main() {
  cd -- "$SCRIPT_DIR"
  command -v conftest >/dev/null || check::die "conftest is not on PATH"
  [[ -d policy ]] || check::die "no policy/ directory next to check.sh yet"

  local -a ids=("$@")
  ((${#ids[@]} > 0)) || ids=("${ALL_IDS[@]}")

  local output
  output="$(conftest test --no-color -p policy manifests/ 2>&1 || true)"

  if [[ "$output" == *"Error:"* ]]; then
    printf '%s\n' "$output" >&2
    check::die "conftest did not run the policy (see the error above)"
  fi
  if [[ "$output" =~ (^|$'\n')0\ tests ]]; then
    check::die "0 tests: no deny/warn rule ran. Is the package 'main'?"
  fi

  local -A actual=()
  local -a untagged=()
  local line
  local -r pattern='^(FAIL|WARN) - ([^ ]+) - [^ ]+ - (.*)$'
  local -r tag='^\[(K8S-[0-9]{2})\]'
  while IFS= read -r line; do
    [[ "$line" =~ $pattern ]] || continue
    local level="${BASH_REMATCH[1]}" file="${BASH_REMATCH[2]}" msg="${BASH_REMATCH[3]}"
    if [[ "$msg" =~ $tag ]]; then
      local key="${BASH_REMATCH[1]} $level $file"
      actual[$key]=$((${actual[$key]:-0} + 1))
    else
      untagged+=("$line")
    fi
  done <<<"$output"

  local status=0 id
  for id in "${ids[@]}"; do
    check::requirement "$id" actual || status=1
  done

  if ((${#untagged[@]} > 0)); then
    printf '\n  %s✗%s  messages without a [K8S-NN] tag at the start:\n' "$RED" "$RESET"
    printf '       %s\n' "${untagged[@]}"
    status=1
  fi

  if ((status == 0)); then
    printf '\n%sAll checked requirements match.%s\n' "$GREEN" "$RESET"
  fi
  return "$status"
}

main "$@"
