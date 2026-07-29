"""Build an editorial migration registry from the current legacy data.

This script does NOT certify historical claims and does NOT alter map routes.
It creates an inventory for human review. In particular, every legacy route
classified as ``mixed`` is marked ``split-required`` rather than being treated
as an ongoing mixed movement.
"""

from __future__ import annotations

import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

BACKEND = Path(__file__).resolve().parent.parent
ROOT = BACKEND.parent
sys.path.insert(0, str(BACKEND))

from data import DIASPORA_COMMUNITIES  # noqa: E402
from data.migration_registry import validate_registry  # noqa: E402

CURRENT_YEAR = 2025
DERIVED_ROUTES_PATH = BACKEND / "data" / "diaspora_derived_routes.json"
OUTPUT_PATH = BACKEND / "data" / "migration_registry" / "migration_registry.json"
REPORT_JSON_PATH = BACKEND / "reports" / "migration_registry_report.json"
REPORT_MD_PATH = BACKEND / "reports" / "migration_registry_report.md"


def slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")[:72]


def period_tag(start: int, end: int) -> str:
    if start < -3000:
        return "prehistory"
    if start < 500 and end <= 700:
        return "antiquity"
    if start < 1500 and end <= 1600:
        return "medieval"
    if start < 1800 and end <= 1900:
        return "early-modern"
    if start < 1900 and end >= 1500:
        return "atlantic-slave-trades"
    if start < 1960 and end <= 1975:
        return "colonial"
    if 1945 <= start < 1975:
        return "decolonization"
    if 1945 <= start < 1991:
        return "cold-war"
    if start >= 1990 or end >= CURRENT_YEAR:
        return "contemporary"
    return "cross-period"


def source_id(text: str) -> str:
    return f"src-{slugify(text)}"


def source_category(text: str) -> str:
    lowered = text.lower()
    if any(token in lowered for token in ("journal", "university press", "oxford", "cambridge", "database")):
        return "B"
    if any(token in lowered for token in ("unesco", "britannica", "encyclopaedia", "museum", "institute")):
        return "C"
    if "wikipedia" in lowered or "wiki" in lowered:
        return "E"
    return "unclassified"


def build_registry() -> dict:
    routes = json.loads(DERIVED_ROUTES_PATH.read_text(encoding="utf-8"))
    diaspora_by_id = {entry["id"]: entry for entry in DIASPORA_COMMUNITIES}
    routes_by_diaspora = defaultdict(list)
    for route in routes:
        routes_by_diaspora[route["diaspora_id"]].append(route)

    source_map = {}
    migrations = []

    for diaspora_id, route_group in sorted(routes_by_diaspora.items()):
        diaspora = diaspora_by_id.get(diaspora_id)
        if not diaspora:
            continue

        refs = []
        for text in diaspora.get("sources", []):
            sid = source_id(text)
            source_map.setdefault(
                sid,
                {
                    "id": sid,
                    "citation": text,
                    "category": source_category(text),
                    "verificationStatus": "unreviewed",
                },
            )
            refs.append(sid)

        legacy_types = {route.get("migration_type", "unclassified") for route in route_group}
        migration_type = legacy_types.pop() if len(legacy_types) == 1 else "unclassified"
        # Family dates come from the diaspora record, not from legacy route
        # caps. This avoids turning a bad route correction into a new claim.
        start = diaspora.get("era_start", min(route["era_start"] for route in route_group))
        end = diaspora.get("era_end", max(route["era_end"] for route in route_group))

        candidates = []
        for route in route_group:
            legacy_type = route.get("migration_type", "unclassified")
            route_start = route.get("era_start")
            route_end = route.get("era_end")
            if (
                isinstance(route_start, (int, float))
                and isinstance(route_end, (int, float))
                and route_start > route_end
            ):
                review_status = "data-error"
                note = (
                    "Legacy route has an end year earlier than its start year. "
                    "It must be researched and corrected before any publication."
                )
            elif legacy_type == "mixed":
                review_status = "split-required"
                note = (
                    "Legacy keyword classification found forced and voluntary language in one diaspora fiche. "
                    "This candidate must be split into distinct historical movements or excluded; it is not an ongoing mixed route."
                )
            elif legacy_type in {"forced", "voluntary", "refugee", "commercial", "military-expansion"}:
                review_status = "provisional"
                note = "Inherited from legacy data; dates, type and route geometry require source-by-source review."
            else:
                review_status = "research-gap"
                note = "Legacy type is unclear and must not be published as a factual classification without review."

            candidates.append(
                {
                    "id": route["id"],
                    "originText": route["name"].split("←", 1)[-1].strip(),
                    "destinationName": diaspora.get("country") or diaspora.get("name"),
                    "points": route.get("points", []),
                    "startYear": route.get("era_start"),
                    "endYear": route.get("era_end"),
                    "migrationType": legacy_type if legacy_type in {
                        "forced", "voluntary", "mixed", "refugee", "colonial-settlement",
                        "military-expansion", "commercial", "religious", "unclassified"
                    } else "unclassified",
                    "reviewStatus": review_status,
                    "sourceIds": refs,
                    "editorialNote": note,
                    "legacyRoute": True,
                }
            )

        migrations.append(
            {
                "id": f"migration-family-{diaspora_id}",
                "name": diaspora.get("name", diaspora_id),
                "diasporaId": diaspora_id,
                "destinationName": diaspora.get("country") or diaspora.get("name"),
                "migrationType": migration_type if migration_type in {
                    "forced", "voluntary", "mixed", "refugee", "colonial-settlement",
                    "military-expansion", "commercial", "religious", "unclassified"
                } else "unclassified",
                "startYear": start,
                "endYear": end,
                "periodTag": period_tag(start, end),
                "populationNames": [diaspora.get("name", diaspora_id)],
                "causes": [],
                "sourceIds": refs,
                "confidence": "unreviewed",
                "integrationStatus": "provisional" if refs else "research-gap",
                "routeCandidates": candidates,
                "editorialNote": (
                    "Inventory generated from existing diaspora data. Community duration and migration duration are separate concepts."
                ),
            }
        )

    registry = {
        "schemaVersion": "1.0",
        "generatedFrom": [
            "backend/data/world_diaspora.py and consolidated DIASPORA_COMMUNITIES",
            "backend/data/diaspora_derived_routes.json",
        ],
        "editorialRule": (
            "A route is publishable only after its migration record, period, type, origin, destination and sources have been reviewed. "
            "The continued existence of a diaspora never extends its founding route automatically."
        ),
        "sources": sorted(source_map.values(), key=lambda item: item["id"]),
        "migrations": migrations,
    }
    errors = validate_registry(registry)
    if errors:
        raise ValueError("Registry validation failed:\n" + "\n".join(errors))
    return registry


def build_report(registry: dict) -> dict:
    routes = [route for migration in registry["migrations"] for route in migration["routeCandidates"]]
    return {
        "migrationFamilies": len(registry["migrations"]),
        "routeCandidates": len(routes),
        "sources": len(registry["sources"]),
        "byLegacyType": dict(Counter(route["migrationType"] for route in routes)),
        "byReviewStatus": dict(Counter(route["reviewStatus"] for route in routes)),
        "byPeriod": dict(Counter(migration["periodTag"] for migration in registry["migrations"])),
        "mixedRoutesRequiringSplit": [
            {
                "id": route["id"],
                "origin": route["originText"],
                "destination": route["destinationName"],
                "startYear": route["startYear"],
                "endYear": route["endYear"],
            }
            for route in routes
            if route["reviewStatus"] == "split-required"
        ],
    }


def write_markdown(report: dict) -> None:
    lines = [
        "# Migration registry — rapport de fondation",
        "",
        "> Ce rapport inventorie les routes existantes. Il ne les valide pas historiquement.",
        "",
        f"- Familles de migration : **{report['migrationFamilies']}**",
        f"- Routes candidates : **{report['routeCandidates']}**",
        f"- Sources recensées : **{report['sources']}**",
        "",
        "## Par type hérité",
    ]
    for key, value in sorted(report["byLegacyType"].items()):
        lines.append(f"- `{key}` : {value}")
    lines.extend(["", "## Par statut de revue"])
    for key, value in sorted(report["byReviewStatus"].items()):
        lines.append(f"- `{key}` : {value}")
    lines.extend(["", "## Routes mixtes à scinder", ""])
    for route in report["mixedRoutesRequiringSplit"]:
        lines.append(
            f"- `{route['id']}` — {route['origin']} → {route['destination']} "
            f"({route['startYear']}–{route['endYear']})"
        )
    lines.extend(
        [
            "",
            "## Règle de publication",
            "",
            "Aucune route `split-required`, `research-gap` ou simplement héritée ne doit être publiée comme fait validé. ",
            "Les routes mixtes doivent être remplacées par des mouvements historiques distincts, chacun sourcé et daté, ou exclues si aucune source ne les établit.",
        ]
    )
    REPORT_MD_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    registry = build_registry()
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    REPORT_JSON_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(registry, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    report = build_report(registry)
    REPORT_JSON_PATH.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    write_markdown(report)
    print(f"Wrote {OUTPUT_PATH}")
    print(f"Wrote {REPORT_JSON_PATH}")
    print(f"Wrote {REPORT_MD_PATH}")
    print(json.dumps({k: v for k, v in report.items() if k != 'mixedRoutesRequiringSplit'}, indent=2))


if __name__ == "__main__":
    main()
