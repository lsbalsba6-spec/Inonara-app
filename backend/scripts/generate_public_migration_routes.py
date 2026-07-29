"""Build the migration-route file that is safe to expose on the public atlas.

The legacy derived dataset may contain routes classified as ``mixed`` because a
single diaspora fiche combines several distinct histories (for example,
historical enslavement and contemporary labour migration). Such records must
not be displayed as one continuous route.

This publication gate therefore:
- preserves every non-mixed legacy route unchanged;
- excludes every legacy mixed route reviewed in ``mixed_route_review.json``;
- does not invent replacement dates or routes;
- can later publish reviewed replacement movements only after they have complete
  dates, coordinates, sources, and an explicit publish decision.
"""
from __future__ import annotations

import json
from collections import Counter
from pathlib import Path
from typing import Any

BACKEND = Path(__file__).resolve().parent.parent
LEGACY_ROUTES_PATH = BACKEND / "data" / "diaspora_derived_routes.json"
REVIEW_PATH = BACKEND / "data" / "migration_registry" / "mixed_route_review.json"
OUTPUT_PATH = BACKEND / "data" / "diaspora_public_routes.json"
REPORT_PATH = BACKEND / "reports" / "public_migration_routes_report.json"


def _load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def build_public_routes() -> tuple[list[dict[str, Any]], dict[str, Any]]:
    legacy_routes = _load_json(LEGACY_ROUTES_PATH)
    review = _load_json(REVIEW_PATH)

    reviewed_ids = {
        record["legacyRouteId"]
        for record in review.get("records", [])
        if record.get("mapAction") == "do-not-publish-as-mixed"
    }
    legacy_mixed_ids = {
        route["id"]
        for route in legacy_routes
        if route.get("migration_type") == "mixed"
    }

    missing_reviews = sorted(legacy_mixed_ids - reviewed_ids)
    unknown_review_ids = sorted(reviewed_ids - {route["id"] for route in legacy_routes})
    if missing_reviews:
        raise ValueError(
            "Mixed routes are missing an editorial review: " + ", ".join(missing_reviews)
        )
    if unknown_review_ids:
        raise ValueError(
            "The mixed-route review references unknown legacy routes: "
            + ", ".join(unknown_review_ids)
        )

    public_routes: list[dict[str, Any]] = []
    excluded: list[dict[str, Any]] = []
    for route in legacy_routes:
        if route["id"] in reviewed_ids:
            excluded.append(
                {
                    "id": route["id"],
                    "name": route.get("name"),
                    "migrationType": route.get("migration_type"),
                    "reason": "Legacy mixed route combines distinct movements and is not publishable.",
                }
            )
            continue
        public_routes.append(route)

    type_counts = Counter(route.get("migration_type", "unclassified") for route in public_routes)
    active_2025_counts = Counter(
        route.get("migration_type", "unclassified")
        for route in public_routes
        if route.get("era_start", float("-inf")) <= 2025 <= route.get("era_end", float("inf"))
    )
    report = {
        "schemaVersion": "1.0",
        "sourceFile": str(LEGACY_ROUTES_PATH.relative_to(BACKEND.parent)),
        "outputFile": str(OUTPUT_PATH.relative_to(BACKEND.parent)),
        "legacyRouteCount": len(legacy_routes),
        "publicRouteCount": len(public_routes),
        "excludedLegacyMixedCount": len(excluded),
        "excludedLegacyMixedRoutes": excluded,
        "publicRoutesByType": dict(sorted(type_counts.items())),
        "activeIn2025ByType": dict(sorted(active_2025_counts.items())),
        "editorialRule": (
            "A mixed legacy route is never published as a continuous movement. "
            "It stays excluded until each distinct movement is independently documented."
        ),
    }
    return public_routes, report


def write_outputs() -> tuple[list[dict[str, Any]], dict[str, Any]]:
    public_routes, report = build_public_routes()
    OUTPUT_PATH.write_text(
        json.dumps(public_routes, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.write_text(
        json.dumps(report, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    return public_routes, report


if __name__ == "__main__":
    routes, report = write_outputs()
    print(f"Public routes written: {len(routes)}")
    print(f"Legacy mixed routes excluded: {report['excludedLegacyMixedCount']}")
    print(f"Active in 2025 by type: {report['activeIn2025ByType']}")
    print(f"Wrote {OUTPUT_PATH}")
    print(f"Wrote {REPORT_PATH}")
