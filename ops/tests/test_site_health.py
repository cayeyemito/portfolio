import gzip
import json
import sys
from datetime import datetime, timedelta, timezone
from io import BytesIO
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import site_health as sh  # noqa: E402

LOG = """#Version: 1.0
#Fields: date time x-edge-location sc-bytes c-ip cs-method cs(Host) cs-uri-stem sc-status
2026-10-25\t06:00:00\tMAD50\t512\t1.2.3.4\tGET\td1.cloudfront.net\t/\t200
2026-10-25\t06:00:01\tMAD50\t512\t1.2.3.4\tGET\td1.cloudfront.net\t/wp-login.php\t404
2026-10-25\t06:00:02\tMAD50\t512\t1.2.3.4\tGET\td1.cloudfront.net\t/wp-login.php\t404
2026-10-25\t06:00:03\tMAD50\t512\t1.2.3.4\tGET\td1.cloudfront.net\t/como-esta-hecha/\t503
"""


class FakeS3:
    """Just enough of the boto3 S3 client for the checks."""

    def __init__(self, objects: dict[str, bytes]):
        now = datetime.now(timezone.utc)
        self.objects = objects
        self.meta = [{"Key": k, "LastModified": now} for k in objects]

    def get_paginator(self, name):
        assert name == "list_objects_v2"
        meta = self.meta

        class Paginator:
            def paginate(self, Bucket, Prefix=""):
                yield {"Contents": [m for m in meta if m["Key"].startswith(Prefix)]}

        return Paginator()

    def get_object(self, Bucket, Key):
        return {"Body": BytesIO(self.objects[Key])}


def test_parse_log_reads_path_and_status():
    entries = list(sh.parse_log(LOG.splitlines()))
    assert entries[0] == ("/", 200)
    assert len(entries) == 4


def test_count_errors_groups_by_path_and_status():
    errors = sh.count_errors(sh.parse_log(LOG.splitlines()))
    assert errors[("/wp-login.php", 404)] == 2
    assert errors[("/como-esta-hecha/", 503)] == 1
    assert ("/", 200) not in errors


def test_log_checks_fail_on_5xx():
    s3 = FakeS3({"cloudfront/E1.2026-10-25-06.abc.gz": gzip.compress(LOG.encode())})
    checks, by_path = sh.log_checks(s3, "logs")
    by_name = {c.name: c for c in checks}
    assert by_name["errores 4xx"].detail == "2"
    assert not by_name["errores 5xx"].ok
    assert by_path[0] == {"path": "/wp-login.php", "status": 404, "count": 2}


def test_log_checks_skip_old_files():
    s3 = FakeS3({"cloudfront/old.gz": gzip.compress(LOG.encode())})
    s3.meta[0]["LastModified"] -= timedelta(days=2)
    checks, by_path = sh.log_checks(s3, "logs")
    assert all(c.ok for c in checks)
    assert by_path == []


def test_bucket_checks_report_missing_files():
    s3 = FakeS3({"index.html": b"", "assets/app.js": b""})
    checks = {c.name: c for c in sh.bucket_checks(s3, "site")}
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
