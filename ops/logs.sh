#!/usr/bin/env bash
# Summarise the site's access logs (Log Analytics): top 4xx/5xx errors by status and path.
#
#   ops/logs.sh <workspace-id> [days]    query the last N days (default 1) with the az CLI
#   ops/logs.sh --file <tsv>             summarise an export already on disk
#
# One request per line, tab separated: status, path.
set -euo pipefail

usage() {
  sed -n '2,7p' "$0" | sed 's/^# \{0,1\}//'
  exit 1
}

[[ $# -ge 1 ]] || usage

if [[ $1 == "--file" ]]; then
  [[ $# -eq 2 ]] || usage
  tsv=$2
else
  workspace=$1
  days=${2:-1}
  tsv=$(mktemp)
  trap 'rm -f "$tsv"' EXIT
  query="StorageBlobLogs
    | where TimeGenerated > ago(${days}d)
    | project Status = toint(StatusCode), Path = tostring(parse_url(Uri).Path)"
  az monitor log-analytics query --workspace "$workspace" --analytics-query "$query" \
    --query '[].[Status, Path]' --output tsv >"$tsv"
fi

if [[ ! -s $tsv ]]; then
  echo "No hay peticiones en el periodo"
  exit 0
fi

echo "Peticiones: $(wc -l <"$tsv")"
echo
echo "Peticiones por código de estado:"
awk -F'\t' '{ print $1 }' "$tsv" | sort | uniq -c | sort -rn
echo
echo "Top 20 errores (peticiones, código, ruta):"
grep -E '^[45][0-9]{2}'$'\t' "$tsv" | awk -F'\t' '{ print $1, $2 }' \
  | sort | uniq -c | sort -rn | head -20
