import json
from pathlib import Path

from data.migration_registry import validate_registry
from scripts.build_migration_registry import build_registry, build_report


def test_registry_validates():
    registry = build_registry()
    assert validate_registry(registry) == []


def test_no_mixed_route_is_ready():
    registry = build_registry()
    mixed = [
        route
        for migration in registry["migrations"]
        for route in migration["routeCandidates"]
        if route["migrationType"] == "mixed"
    ]
    assert mixed
    assert all(route["reviewStatus"] == "split-required" for route in mixed)


def test_community_duration_is_not_certification_of_route_duration():
    registry = build_registry()
    for migration in registry["migrations"]:
        assert "Community duration and migration duration are separate concepts" in migration["editorialNote"]


def test_every_route_has_traceable_sources():
    registry = build_registry()
    source_ids = {source["id"] for source in registry["sources"]}
    for migration in registry["migrations"]:
        for route in migration["routeCandidates"]:
            assert route["sourceIds"]
            assert set(route["sourceIds"]).issubset(source_ids)


def test_report_counts_match_registry():
    registry = build_registry()
    report = build_report(registry)
    route_count = sum(len(migration["routeCandidates"]) for migration in registry["migrations"])
    assert report["migrationFamilies"] == len(registry["migrations"])
    assert report["routeCandidates"] == route_count
    assert len(report["mixedRoutesRequiringSplit"]) == report["byReviewStatus"].get("split-required", 0)


def test_checked_in_registry_exists_after_generation():
    path = Path(__file__).resolve().parents[1] / "data" / "migration_registry" / "migration_registry.json"
    if path.exists():
        registry = json.loads(path.read_text(encoding="utf-8"))
        assert validate_registry(registry) == []
