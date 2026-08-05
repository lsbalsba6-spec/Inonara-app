"""Build an editorial inventory of automatically-derived diaspora route candidates.

These candidates are NOT public migration routes.  The old generator derives a
line from a diaspora card's origin text and lifespan.  That is useful for
research, but it does not prove that one migration movement remained active for
that whole period.  This script preserves every candidate for review while
marking its temporal range as unverified at route level.

No historical date is changed or invented here.
"""
from __future__ import annotations

import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INPUT = ROOT / "data" / "diaspora_derived_routes.json"
OUTPUT = ROOT / "data" / "migration_registry" / "derived_route_candidates.json"
REPORT_JSON = ROOT / "reports" / "derived_route_candidate_report.json"
REPORT_MD = ROOT / "reports" / "derived_route_candidate_report.md"


def build_inventory() -> list[dict]:
    raw = json.loads(INPUT.read_text(encoding="utf-8"))
    candidates = []
    for route in raw:
        candidates.append(
            {
                **route,
                "publication_status": "research-required",
                "temporal_validation": "unverified-at-route-level",
                "temporal_basis": "inherited-from-diaspora-card",
                "review_decision": None,
                "review_notes": (
                    "The diaspora card documents a community and its history; "
                    "it does not by itself prove that this exact route was active "
                    "for the entire inherited date range."
                ),
            }
        )
    return candidates


def write_report(candidates: list[dict]) -> None:
    types = Counter(c.get("migration_type", "unclassified") for c in candidates)
    current = [c for c in candidates if c.get("era_start", 10**9) <= 2025 <= c.get("era_end", -10**9)]
    report = {
        "candidate_count": len(candidates),
        "public_count": 0,
        "active_in_2025_but_unverified": len(current),
        "by_inherited_type": dict(sorted(types.items())),
        "policy": (
            "No automatically-derived candidate is public until its route-specific "
            "dates, type, origin, destination and sources have been reviewed."
        ),
    }
    REPORT_JSON.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")

    lines = [
        "# Derived diaspora route candidates — editorial inventory",
        "",
        f"- Candidates preserved for review: **{len(candidates)}**",
        "- Automatically published candidates: **0**",
        f"- Candidates whose inherited range reaches 2025: **{len(current)}**",
        "",
        "## Why they are not public",
        "",
        "A diaspora community may exist today even when the migration movement that formed it ended long ago. "
        "The former generator inherited the diaspora card's lifespan and could therefore keep historical routes visible in 2025.",
        "",
        "Each candidate now requires route-level validation of: period, type, origin, destination and sources.",
        "",
        "## Candidates",
        "",
        "| ID | Diaspora | Inherited period | Inherited type | Review status |",
        "|---|---|---:|---|---|",
    ]
    for c in sorted(candidates, key=lambda x: (x.get("diaspora_id", ""), x.get("id", ""))):
        lines.append(
            f"| `{c['id']}` | `{c.get('diaspora_id','')}` | "
            f"{c.get('era_start')}–{c.get('era_end')} | {c.get('migration_type','')} | research-required |"
        )
    REPORT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    REPORT_JSON.parent.mkdir(parents=True, exist_ok=True)
    candidates = build_inventory()
    OUTPUT.write_text(json.dumps(candidates, ensure_ascii=False, indent=2), encoding="utf-8")
    write_report(candidates)
    print(f"Wrote {len(candidates)} candidates to {OUTPUT}")
    print("Public candidates: 0 (route-level review required)")


if __name__ == "__main__":
    main()
