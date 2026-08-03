from __future__ import annotations

import importlib.util
import json
from pathlib import Path

BACKEND = Path(__file__).resolve().parents[1]
SCRIPT = BACKEND / "scripts" / "generate_public_migration_routes.py"

spec = importlib.util.spec_from_file_location("generate_public_migration_routes", SCRIPT)
module = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(module)


def test_all_reviewed_mixed_routes_are_excluded_from_public_routes():
    public_routes, report = module.build_public_routes()
    public_ids = {route["id"] for route in public_routes}
    review = json.loads(
        (BACKEND / "data" / "migration_registry" / "mixed_route_review.json").read_text(
            encoding="utf-8"
        )
    )
    reviewed_ids = {record["legacyRouteId"] for record in review["records"]}
    assert public_ids.isdisjoint(reviewed_ids)
    assert report["excludedLegacyMixedCount"] == len(reviewed_ids) == 12


def test_public_routes_contain_no_mixed_type():
    public_routes, _ = module.build_public_routes()
    assert all(route.get("migration_type") != "mixed" for route in public_routes)


def test_no_forced_public_route_is_active_in_2025():
    public_routes, _ = module.build_public_routes()
    forced_active = [
        route
        for route in public_routes
        if route.get("migration_type") == "forced"
        and route.get("era_start", float("-inf")) <= 2025 <= route.get("era_end", float("inf"))
    ]
    assert forced_active == []


def test_public_output_is_legacy_minus_reviewed_mixed_routes():
    legacy_routes = json.loads(
        (BACKEND / "data" / "diaspora_derived_routes.json").read_text(encoding="utf-8")
    )
    public_routes, report = module.build_public_routes()
    assert len(public_routes) == len(legacy_routes) - report["excludedLegacyMixedCount"]


def test_checked_in_public_file_matches_generator():
    expected, _ = module.build_public_routes()
    checked_in = json.loads(
        (BACKEND / "data" / "diaspora_public_routes.json").read_text(encoding="utf-8")
    )
    assert checked_in == expected
