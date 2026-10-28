import json
import sys
from pathlib import Path
from types import SimpleNamespace

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import site_health as sh  # noqa: E402

# Rows as ACCESS_QUERY returns them from Log Analytics.
ROWS = [
    {"Path": "/", "Status": 200, "Requests": 10},
    {"Path": "/wp-login.php", "Status": 404, "Requests": 2},
    {"Path": "/como-esta-hecha/", "Status": 503, "Requests": 1},
]


class FakeQuery:
    """Stands in for make_log_query: records the KQL and returns fixed rows."""

    def __init__(self, rows):
        self.rows = rows
        self.calls = []

    def __call__(self, kql, hours):
        self.calls.append((kql, hours))
        return self.rows


class FakeContainer:
    """Just enough of azure.storage.blob.ContainerClient for the checks."""

    def __init__(self, names):
        self.names = names

    def list_blobs(self):
        return [SimpleNamespace(name=n) for n in self.names]


def test_count_errors_groups_by_path_and_status():
    errors = sh.count_errors(ROWS)
    assert errors[("/wp-login.php", 404)] == 2
    assert errors[("/como-esta-hecha/", 503)] == 1
    assert ("/", 200) not in errors


def test_log_checks_fail_on_5xx():
    query = FakeQuery(ROWS)
    checks, by_path = sh.log_checks(query)
    by_name = {c.name: c for c in checks}
    assert by_name["peticiones de las últimas 24 h"].detail == "13"
    assert by_name["errores 4xx"].detail == "2"
    assert not by_name["errores 5xx"].ok
    assert by_path[0] == {"path": "/wp-login.php", "status": 404, "count": 2}


def test_log_checks_query_the_storage_logs_of_the_period():
    query = FakeQuery([])
    sh.log_checks(query, hours=6)
    kql, hours = query.calls[0]
    assert "StorageBlobLogs" in kql
    assert "ago(6h)" in kql
    assert hours == 6


def test_log_checks_pass_without_errors():
    checks, by_path = sh.log_checks(FakeQuery([{"Path": "/", "Status": 200, "Requests": 3}]))
    assert all(c.ok for c in checks)
    assert by_path == []


def test_storage_checks_report_missing_files():
    container = FakeContainer(["index.html", "assets/app.js"])
    checks = {c.name: c for c in sh.storage_checks(container)}
    assert checks["index.html"].ok
    assert not checks["404.html"].ok
    assert checks["assets/"].detail == "1 ficheros"


def test_project_links_resolve_relative_urls(tmp_path):
    projects = tmp_path / "projects.json"
    projects.write_text(
        json.dumps([{"slug": "p", "links": {"repo": "https://github.com/x/p", "demo": "/demo/"}}])
    )
    links = dict(sh.project_links("https://site.example", projects))
    assert links["p · repo"] == "https://github.com/x/p"
    assert links["p · demo"] == "https://site.example/demo/"


def test_real_projects_json_is_readable():
    assert sh.project_links("https://site.example")


def test_render_html_escapes_and_shows_verdict():
    report = sh.Report(site_url="https://site.example")
    report.checks.append(sh.Check("http", "<script>", False, "500"))
    page = sh.render_html(report)
    assert "&lt;script&gt;" in page
    assert "<script>" not in page
    assert "Hay comprobaciones fallidas" in page


def test_write_report_creates_both_files(tmp_path):
    report = sh.Report(site_url="https://site.example")
    report.checks.append(sh.Check("http", "/", True, "200 en 10 ms"))
    sh.write_report(report, tmp_path)
    data = json.loads((tmp_path / "report.json").read_text(encoding="utf-8"))
    assert data["ok"] is True
    assert (tmp_path / "report.html").exists()
