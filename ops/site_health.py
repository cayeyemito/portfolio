"""Daily health check for the portfolio.

Checks that the pages and project links respond, how long the TLS certificate
has left, that the $web container of the storage account holds the expected
files and which 4xx/5xx errors show up in the access logs (Log Analytics).
Writes report.json and report.html and exits with 1 if any check fails, so the
GitHub Actions job turns red. Azure calls use DefaultAzureCredential (az login).

    python ops/site_health.py --url https://<account>.z6.web.core.windows.net \
        --account <account> --workspace <workspace-id> --out report/

    python ops/site_health.py --url https://<account>.z6.web.core.windows.net --smoke
"""

from __future__ import annotations

import argparse
import html
import json
import os
import socket
import ssl
import sys
import time
from collections import Counter
from dataclasses import asdict, dataclass, field
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Callable, Iterable
from urllib.parse import urljoin, urlparse

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

ROOT = Path(__file__).resolve().parent.parent
PROJECTS_JSON = ROOT / "src" / "data" / "projects.json"

PAGES = [
    "/",
    "/como-esta-hecha/",
    "/cv/Cayetano_Yeste_CV_DevOps.pdf",
    "/cv/Cayetano_Yeste_CV_FullStack.pdf",
]
MISSING_PAGE = "/esta-pagina-no-existe/"
EXPECTED_KEYS = [
    "index.html",
    "como-esta-hecha/index.html",
    "404.html",
    "cv/Cayetano_Yeste_CV_DevOps.pdf",
    "cv/Cayetano_Yeste_CV_FullStack.pdf",
]
TLS_MIN_DAYS = 14
WEB_CONTAINER = "$web"
# Reads of the site in the last N hours, grouped by path and status code.
ACCESS_QUERY = """
StorageBlobLogs
| where TimeGenerated > ago({hours}h)
| extend Path = tostring(parse_url(Uri).Path), Status = toint(StatusCode)
| summarize Requests = count() by Path, Status
"""
USER_AGENT = "portfolio-site-health/1.0 (+https://github.com/cayeyemito/portfolio)"


@dataclass
class Check:
    group: str
    name: str
    ok: bool
    detail: str


@dataclass
class Report:
    site_url: str
    generated_at: str = field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat(timespec="seconds")
    )
    checks: list[Check] = field(default_factory=list)
    errors_by_path: list[dict] = field(default_factory=list)

    @property
    def ok(self) -> bool:
        return all(c.ok for c in self.checks)

    def to_dict(self) -> dict:
        return {
            "generated_at": self.generated_at,
            "site_url": self.site_url,
            "ok": self.ok,
            "checks": [asdict(c) for c in self.checks],
            "errors_by_path": self.errors_by_path,
        }


# --------------------------------------------------------------------------
# HTTP
# --------------------------------------------------------------------------


def make_session() -> requests.Session:
    retry = Retry(
        total=3,
        backoff_factor=1,
        status_forcelist=[429, 500, 502, 503, 504],
        allowed_methods=["GET", "HEAD"],
        raise_on_status=False,
    )
    session = requests.Session()
    session.mount("https://", HTTPAdapter(max_retries=retry))
    session.mount("http://", HTTPAdapter(max_retries=retry))
    session.headers["User-Agent"] = USER_AGENT
    return session


def check_url(session: requests.Session, url: str, name: str, expected: int = 200) -> Check:
    start = time.monotonic()
    try:
        res = session.get(url, timeout=10, allow_redirects=True)
    except requests.RequestException as exc:
        return Check("http", name, False, f"sin respuesta: {type(exc).__name__}")
    ms = round((time.monotonic() - start) * 1000)
    ok = res.status_code == expected
    detail = f"{res.status_code} en {ms} ms"
    if not ok:
        detail += f" (se esperaba {expected})"
    return Check("http", name, ok, detail)


def project_links(site_url: str, path: Path = PROJECTS_JSON) -> list[tuple[str, str]]:
    """(name, absolute url) for every link in projects.json."""
    projects = json.loads(path.read_text(encoding="utf-8"))
    links = []
    for project in projects:
        for kind, link in project.get("links", {}).items():
            links.append((f"{project['slug']} · {kind}", urljoin(site_url + "/", link)))
    return links


def http_checks(session: requests.Session, site_url: str, with_projects: bool) -> list[Check]:
    checks = [check_url(session, site_url + p, p) for p in PAGES]
    checks.append(check_url(session, site_url + MISSING_PAGE, "página inexistente", expected=404))
    if with_projects:
        checks += [check_url(session, url, name) for name, url in project_links(site_url)]
    return checks


# --------------------------------------------------------------------------
# TLS
# --------------------------------------------------------------------------


def tls_days_left(host: str, port: int = 443) -> int:
    context = ssl.create_default_context()
    with socket.create_connection((host, port), timeout=10) as sock:
        with context.wrap_socket(sock, server_hostname=host) as tls:
            cert = tls.getpeercert()
    expires = datetime.fromtimestamp(ssl.cert_time_to_seconds(cert["notAfter"]), timezone.utc)
    return (expires - datetime.now(timezone.utc)).days


def tls_check(site_url: str) -> Check:
    host = urlparse(site_url).hostname or ""
    try:
        days = tls_days_left(host)
    except (OSError, ssl.SSLError) as exc:
        return Check("tls", "certificado", False, f"no se pudo leer: {exc}")
    return Check("tls", "certificado", days >= TLS_MIN_DAYS, f"caduca en {days} días")


# --------------------------------------------------------------------------
# Storage ($web container)
# --------------------------------------------------------------------------


def storage_checks(container) -> list[Check]:
    """container: azure.storage.blob.ContainerClient for $web (anything with list_blobs)."""
    names = {blob.name for blob in container.list_blobs()}
    checks = [
        Check("blob", name, name in names, "presente" if name in names else "no está en $web")
        for name in EXPECTED_KEYS
    ]
    assets = sum(1 for n in names if n.startswith("assets/"))
    checks.append(Check("blob", "assets/", assets > 0, f"{assets} ficheros"))
    return checks


# --------------------------------------------------------------------------
# Access logs (Log Analytics, StorageBlobLogs table)
# --------------------------------------------------------------------------

# Runs a KQL query over the last N hours and returns the rows as dicts.
# Injected into log_checks so the tests need no Azure.
LogQuery = Callable[[str, int], list[dict]]


def make_log_query(workspace_id: str) -> LogQuery:
    from azure.identity import DefaultAzureCredential
    from azure.monitor.query import LogsQueryClient

    client = LogsQueryClient(DefaultAzureCredential())

    def run(kql: str, hours: int) -> list[dict]:
        result = client.query_workspace(workspace_id, kql, timespan=timedelta(hours=hours))
        tables = getattr(result, "tables", None) or result.partial_data
        return [dict(zip(t.columns, row)) for t in tables for row in t.rows]

    return run


def count_errors(rows: Iterable[dict]) -> Counter:
    errors: Counter = Counter()
    for row in rows:
        if row["Status"] >= 400:
            errors[(row["Path"], row["Status"])] += row["Requests"]
    return errors


def log_checks(query: LogQuery, hours: int = 24) -> tuple[list[Check], list[dict]]:
    rows = query(ACCESS_QUERY.format(hours=hours), hours)
    errors = count_errors(rows)

    total = sum(row["Requests"] for row in rows)
    client = sum(n for (_, status), n in errors.items() if status < 500)
    server = sum(n for (_, status), n in errors.items() if status >= 500)
    checks = [
        Check("logs", f"peticiones de las últimas {hours} h", True, str(total)),
        Check("logs", "errores 4xx", True, str(client)),
        Check("logs", "errores 5xx", server == 0, str(server)),
    ]
    by_path = [
        {"path": path, "status": status, "count": n}
        for (path, status), n in errors.most_common(20)
    ]
    return checks, by_path


# --------------------------------------------------------------------------
# Report
# --------------------------------------------------------------------------


def render_html(report: Report) -> str:
    data = report.to_dict()
    rows = "\n".join(
        f'<tr><td><span class="g">{html.escape(c["group"])}</span> {html.escape(c["name"])}</td>'
        f'<td class="{"ok" if c["ok"] else "fail"}">{"OK" if c["ok"] else "Fallo"}</td>'
        f'<td>{html.escape(c["detail"])}</td></tr>'
        for c in data["checks"]
    )
    errors = "\n".join(
        f'<tr><td>{html.escape(e["path"])}</td><td>{e["status"]}</td><td>{e["count"]}</td></tr>'
        for e in data["errors_by_path"]
    ) or '<tr><td colspan="3">Sin errores en el periodo.</td></tr>'
    verdict = "Todo en orden" if report.ok else "Hay comprobaciones fallidas"
    return f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Estado · Cayetano Yeste</title>
<style>
:root {{ --bg:#fafaf9; --fg:#1c1917; --muted:#57534e; --line:#e7e5e4; --ok:#15803d; --fail:#b91c1c; color-scheme: light dark; }}
@media (prefers-color-scheme: dark) {{ :root {{ --bg:#0c0a09; --fg:#f5f5f4; --muted:#a8a29e; --line:#292524; --ok:#4ade80; --fail:#f87171; }} }}
body {{ margin:0; background:var(--bg); color:var(--fg); font:16px/1.6 system-ui, sans-serif; }}
main {{ max-width:56rem; margin:0 auto; padding:3rem 1rem; }}
h1 {{ margin:0 0 .25rem; }} h2 {{ margin-top:2.5rem; font-size:1.2rem; }}
p {{ color:var(--muted); margin:0; }}
table {{ width:100%; border-collapse:collapse; margin-top:1rem; font-size:.9rem; }}
th, td {{ text-align:left; padding:.45rem .5rem; border-bottom:1px solid var(--line); overflow-wrap:anywhere; }}
.g {{ font-family:ui-monospace, monospace; font-size:.75rem; color:var(--muted); }}
.ok {{ color:var(--ok); }} .fail {{ color:var(--fail); }}
a {{ color:inherit; }}
</style>
</head>
<body>
<main>
<h1 class="{"ok" if report.ok else "fail"}">{verdict}</h1>
<p>{html.escape(report.site_url)} · generado el {html.escape(report.generated_at)} UTC</p>
<h2>Comprobaciones</h2>
<table>
<thead><tr><th>Comprobación</th><th>Resultado</th><th>Detalle</th></tr></thead>
<tbody>
{rows}
</tbody>
</table>
<h2>Errores en los logs de acceso (24 h)</h2>
<table>
<thead><tr><th>Ruta</th><th>Código</th><th>Peticiones</th></tr></thead>
<tbody>
{errors}
</tbody>
</table>
<p style="margin-top:2rem"><a href="/como-esta-hecha/">Cómo está hecha esta web</a> · <a href="report.json">report.json</a></p>
</main>
</body>
</html>
"""


def write_report(report: Report, out: Path) -> None:
    out.mkdir(parents=True, exist_ok=True)
    (out / "report.json").write_text(
        json.dumps(report.to_dict(), ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (out / "report.html").write_text(render_html(report), encoding="utf-8")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--url", default=os.environ.get("SITE_URL"), help="https://... (o SITE_URL)")
    parser.add_argument("--account", default=os.environ.get("SITE_STORAGE_ACCOUNT"))
    parser.add_argument("--workspace", default=os.environ.get("LOG_WORKSPACE_ID"))
    parser.add_argument("--out", type=Path, default=Path("report"))
    parser.add_argument(
        "--smoke", action="store_true", help="solo las páginas propias, sin Azure ni enlaces externos"
    )
    args = parser.parse_args(argv)
    if not args.url:
        parser.error("falta --url o SITE_URL")

    site_url = args.url.rstrip("/")
    report = Report(site_url=site_url)
    report.checks += http_checks(make_session(), site_url, with_projects=not args.smoke)

    if not args.smoke:
        report.checks.append(tls_check(site_url))
        if args.account:
            # Azure SDKs are only needed for the full run.
            from azure.identity import DefaultAzureCredential
            from azure.storage.blob import ContainerClient

            container = ContainerClient(
                f"https://{args.account}.blob.core.windows.net",
                WEB_CONTAINER,
                credential=DefaultAzureCredential(),
            )
            report.checks += storage_checks(container)
        if args.workspace:
            checks, report.errors_by_path = log_checks(make_log_query(args.workspace))
            report.checks += checks
        write_report(report, args.out)

    sys.stdout.reconfigure(encoding="utf-8")  # Windows consoles default to cp1252
    for c in report.checks:
        print(f"[{'OK ' if c.ok else 'FAIL'}] {c.group:<5} {c.name}: {c.detail}")
    return 0 if report.ok else 1


if __name__ == "__main__":
    sys.exit(main())
