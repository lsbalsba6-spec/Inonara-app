from __future__ import annotations

import importlib.util
import json
from pathlib import Path

BACKEND = Path(__file__).resolve().parents[1]
SCRIPT = BACKEND / "scripts" / "review_mixed_routes.py"

spec = importlib.util.spec_from_file_location("review_mixed_routes", SCRIPT)
module = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(module)


def test_all_legacy_mixed_routes_are_reviewed_exactly_once():
    routes = json.loads((BACKEND / "data" / "diaspora_derived_routes.json").read_text(encoding="utf-8"))
    mixed_ids = {route["id"] for route in routes if route.get("migration_type") == "mixed"}
    review = module.build_review()
    reviewed_ids = [record["legacyRouteId"] for record in review["records"]]
    assert len(reviewed_ids) == len(set(reviewed_ids))
    assert set(reviewed_ids) == mixed_ids
    assert len(reviewed_ids) == 12


def test_no_reviewed_route_is_publishable_as_continuous_mixed():
    review = module.build_review()
    assert all(record["mapAction"] == "do-not-publish-as-mixed" for record in review["records"])
    assert all(
        movement["migrationType"] != "mixed"
        for record in review["records"]
        for movement in record["proposedMovements"]
    )


def test_historical_and_contemporary_gulf_routes_are_separated():
    review = module.build_review()
    by_id = {record["legacyRouteId"]: record for record in review["records"]}
    uae_types = {
        movement["migrationType"]
        for route_id, record in by_id.items()
        if "afro-emirati" in route_id
        for movement in record["proposedMovements"]
    }
    qatar_types = {
        movement["migrationType"]
        for route_id, record in by_id.items()
        if "afro-qatari" in route_id
        for movement in record["proposedMovements"]
    }
    assert uae_types == {"forced", "voluntary"}
    assert qatar_types == {"forced", "voluntary"}


def test_norway_routes_are_refugee_not_mixed():
    review = module.build_review()
    norway = [
        movement
        for record in review["records"]
        if "afro-norwegian" in record["legacyRouteId"]
        for movement in record["proposedMovements"]
    ]
    assert len(norway) == 2
    assert {movement["migrationType"] for movement in norway} == {"refugee"}


def test_oman_is_split_into_distinct_processes():
    review = module.build_review()
    oman = next(record for record in review["records"] if "afro-omani" in record["legacyRouteId"])
    assert oman["decision"] == "split"
    assert len(oman["proposedMovements"]) == 2
    assert {m["migrationType"] for m in oman["proposedMovements"]} == {"unclassified", "refugee"}


def test_no_unknown_exact_start_year_is_invented_for_modern_routes():
    review = module.build_review()
    ids = {
        "movement-africa-france-postwar-migration",
        "movement-maghreb-france-migration",
        "movement-african-labour-uae",
        "movement-eritrea-norway-refugees",
        "movement-african-labour-qatar",
    }
    selected = [
        movement
        for record in review["records"]
        for movement in record["proposedMovements"]
        if movement["id"] in ids
    ]
    assert len(selected) == len(ids)
    assert all(movement["startYear"] is None for movement in selected)
