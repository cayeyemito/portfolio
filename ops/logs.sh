#!/usr/bin/env bash
# Summarise CloudFront access logs: top 4xx/5xx errors by status and path.
#
#   ops/logs.sh <logs-bucket> [days]     download the last N days (default 1) and summarise
#   ops/logs.sh --dir <folder>           summarise .gz logs already on disk
#
# CloudFront standard log columns: 8 = cs-uri-stem, 9 = sc-status.
set -euo pipefail

usage() {
  sed -n '2,6p' "$0" | sed 's/^# \{0,1\}//'
  exit 1
}

[[ $# -ge 1 ]] || usage

if [[ $1 == "--dir" ]]; then
  [[ $# -eq 2 ]] || usage
  dir=$2
else
  bucket=$1
  days=${2:-1}
  dir=$(mktemp -d)
  trap 'rm -rf "$dir"' EXIT
  # Log file names contain the date: <dist-id>.YYYY-MM-DD-HH.<id>.gz (GNU date).
  includes=()
  for i in $(seq 0 "$days"); do
    includes+=(--include "*.$(date -u -d "-${i} days" +%Y-%m-%d)-*")
  done
  aws s3 sync "s3://${bucket}/cloudfront/" "$dir" --quiet --exclude "*" "${includes[@]}"
fi

shopt -s nullglob
files=("$dir"/*.gz)
if [[ ${#files[@]} -eq 0 ]]; then
  echo "No hay logs en $dir"
  exit 0
fi

echo "Ficheros: ${#files[@]}"
echo
echo "Peticiones por código de estado:"
zcat "${files[@]}" | grep -v '^#' | awk -F'\t' '{ print $9 }' | sort | uniq -c | sort -rn
echo
echo "Top 20 errores (peticiones, código, ruta):"
zcat "${files[@]}" | grep -v '^#' | awk -F'\t' '$9 >= 400 { print $9, $8 }' \
  | sort | uniq -c | sort -rn | head -20
