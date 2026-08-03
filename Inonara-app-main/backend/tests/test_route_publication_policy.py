import json
from pathlib import Path

from data import MIGRATION_ROUTES
from data.migration_route_publication import get_public_migration_routes

ROOT = Path(__file__).resolve().parents[1]


def test_all_derived_candidates_are_preserved_for_review():
    candidates = json.loads(
        (ROOT / "data" / "migration_registry" / "derived_route_candidates.json").read_text(encoding="utf-8")
    )
    original = json.loads((ROOT / "data" / "diaspora_derived_routes.json").read_text(encoding="utf-8"))
    assert len(candidates) == len(original)
    assert candidates
    assert all(c["publication_status"] == "research-required" for c in candidates)
    assert all(c["temporal_validation"] == "unverified-at-route-level" for c in candidates)


def test_reviewed_routes_start_empty_in_this_safe_migration():
    reviewed = json.loads((ROOT / "data" / "reviewed_diaspora_routes.json").read_text(encoding="utf-8"))
    assert reviewed == []


def test_public_policy_excludes_unreviewed_derived_candidates():
    routes = get_public_migration_routes()
    assert routes == MIGRATION_ROUTES
    assert not any(str(r.get("id", "")).startswith("diaspora-") for r in routes)


def test_no_public_route_is_active_in_2025_until_recent_flows_are_verified():
    routes = get_public_migration_routes()
    active = [r for r in routes if r.get("era_start", 10**9) <= 2025 <= r.get("era_end", -10**9)]
    assert active == []
