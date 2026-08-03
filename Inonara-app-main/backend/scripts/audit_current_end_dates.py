#!/usr/bin/env python3
"""Audit timeline records that end in the project's current-year sentinel.

This script is deliberately conservative: it never rewrites historical dates.
It inventories records ending in 2025 and classifies them with transparent,
rule-based heuristics so a human can decide what needs sourced correction.

Usage:
    python backend/scripts/audit_current_end_dates.py
    python backend/scripts/audit_current_end_dates.py --year 2025 --strict
"""
from __future__ import annotations

import argparse
import ast
import json
import re
from collections import Counter
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any, Iterable

ROOT = Path(__file__).resolve().parents[2]
BACKEND = ROOT / "backend"
DEFAULT_OUTPUT_JSON = BACKEND / "reports" / "current_end_dates_audit.json"
DEFAULT_OUTPUT_MD = BACKEND / "reports" / "current_end_dates_audit.md"

DATE_KEYS = {"era_end", "endYear", "end_year", "validTo", "valid_to", "year_end"}
ID_KEYS = ("id", "slug", "key", "country_iso2")
NAME_KEYS = ("name", "title", "country", "community_name", "label")
TYPE_KEYS = ("type", "entityType", "eventType", "processType", "migration_type", "route_type")
SOURCE_KEYS = ("sources", "source", "references", "bibliography")

EVENT_WORDS = {
    "battle", "treaty", "revolt", "revolution", "massacre", "proclamation",
    "independence", "abolition", "founding", "foundation", "conference",
    "war", "uprising", "decree", "coup", "event",
}
PROCESS_WORDS = {
    "migration", "slave trade", "trafficking", "deportation", "expansion",
    "colonization", "colonisation", "displacement", "exile", "journey",
    "route", "movement", "recruitment",
}
HISTORICAL_ENTITY_WORDS = {
    "kingdom", "empire", "colony", "protectorate", "caliphate", "dynasty",
    "sultanate", "republic of", "federation", "occupation", "administration",
}
CURRENT_COMMUNITY_WORDS = {
    "diaspora", "community", "descendant", "population", "people", "ethnic",
    "afro-", "heritage", "identity", "minority",
}

@dataclass(frozen=True)
class Finding:
    file: str
    line: int
    record_id: str
    name: str
    object_type: str
    start: Any
    current_end: int
    classification: str
    reason: str
    recommended_action: str
    confidence: str
    has_sources: bool


def scalar(node: ast.AST) -> Any:
    try:
        return ast.literal_eval(node)
    except (ValueError, TypeError, SyntaxError):
        return None


def dict_from_node(node: ast.Dict) -> dict[str, Any]:
    result: dict[str, Any] = {}
    for key_node, value_node in zip(node.keys, node.values):
        key = scalar(key_node) if key_node is not None else None
        if isinstance(key, str):
            result[key] = scalar(value_node)
    return result


def walk_dict_nodes(tree: ast.AST) -> Iterable[ast.Dict]:
    for node in ast.walk(tree):
        if isinstance(node, ast.Dict):
            yield node


def first_value(record: dict[str, Any], keys: Iterable[str], default: str = "") -> str:
    for key in keys:
        value = record.get(key)
        if value not in (None, "", [], {}):
            return str(value)
    return default


def text_blob(record: dict[str, Any]) -> str:
    selected = []
    for key in ("id", "name", "title", "summary", "description", "story", "history", "type", "migration_type", "route_type"):
        value = record.get(key)
        if isinstance(value, str):
            selected.append(value)
    return " ".join(selected).lower()


def has_source(record: dict[str, Any]) -> bool:
    return any(record.get(key) not in (None, "", [], {}) for key in SOURCE_KEYS)


def classify(record: dict[str, Any], file_path: Path) -> tuple[str, str, str, str]:
    blob = text_blob(record)
    filename = file_path.name

    # File-level semantics are stronger than keywords buried in long historical
    # narratives. world_diaspora.py stores enduring communities; africa_origins.py
    # deliberately mixes a current country profile with older history.
    if filename == "world_diaspora.py":
        return (
            "valid-current",
            "This file stores diaspora communities whose present-day existence can legitimately extend to the current-year sentinel.",
            "Keep the community current; audit any embedded migration/event chronology as separate records.",
            "high",
        )

    if filename == "africa_origins.py":
        return (
            "data-model-problem",
            "The record combines a present-day country/origin profile with historical periods and events under one end date.",
            "Keep the country profile current, but split bounded historical events, polities, and migrations into separately dated assertions.",
            "high",
        )
    object_type = first_value(record, TYPE_KEYS, "unclassified")
    migration_type = str(record.get("migration_type", "")).lower()

    if migration_type == "forced":
        return (
            "process-ended",
            "Route explicitly marked as forced migration; a present-day end usually describes the descendant community, not the transport process.",
            "Verify the route-specific end date from a cited source; keep the community record current separately.",
            "high",
        )

    if any(word in blob for word in EVENT_WORDS):
        return (
            "event-instant-or-bounded",
            "The record describes a bounded event but ends at the current-year sentinel.",
            "Replace the sentinel only after identifying the event's documented end date; otherwise split event from present-day legacy.",
            "medium",
        )

    if any(word in blob for word in PROCESS_WORDS):
        return (
            "uncertain-needs-research",
            "The record appears to describe a historical process or route; continuing to the present may be valid only for an ongoing movement.",
            "Check whether the process itself continues; if only descendants remain, split process and community.",
            "medium",
        )

    if any(word in blob for word in HISTORICAL_ENTITY_WORDS):
        return (
            "historical-entity-ended",
            "The record appears to be a polity or administration that may have ended before the present.",
            "Verify the institutional end date and whether a successor entity should be represented separately.",
            "medium",
        )

    if any(word in blob for word in CURRENT_COMMUNITY_WORDS):
        return (
            "valid-current",
            "The record describes a present-day community, people, identity, or heritage rather than a completed route.",
            "Keep the current end unless a source says the community no longer exists; audit any embedded route dates separately.",
            "medium",
        )

    if int(record.get("era_start", record.get("startYear", 0)) or 0) >= 1900:
        return (
            "valid-current",
            "The record starts in the modern period and contains no strong marker of a completed event or historical polity.",
            "Keep provisionally, but review manually if it actually represents a bounded program or one-off event.",
            "low",
        )

    return (
        "data-model-problem",
        "The record reaches the current year but its text does not clearly distinguish an enduring entity from a bounded historical phenomenon.",
        "Review manually and split durable community/legacy from historical event, route, or polity where necessary.",
        "low",
    )


def audit_file(path: Path, year: int) -> list[Finding]:
    try:
        source = path.read_text(encoding="utf-8")
        tree = ast.parse(source, filename=str(path))
    except (UnicodeDecodeError, SyntaxError):
        return []

    findings: list[Finding] = []
    seen: set[tuple[int, str]] = set()
    for node in walk_dict_nodes(tree):
        record = dict_from_node(node)
        matching_key = next((key for key in DATE_KEYS if record.get(key) == year), None)
        if matching_key is None:
            continue

        record_id = first_value(record, ID_KEYS, f"line-{node.lineno}")
        dedupe_key = (node.lineno, record_id)
        if dedupe_key in seen:
            continue
        seen.add(dedupe_key)

        classification, reason, action, confidence = classify(record, path)
        findings.append(
            Finding(
                file=str(path.relative_to(ROOT)),
                line=node.lineno,
                record_id=record_id,
                name=first_value(record, NAME_KEYS, record_id),
                object_type=first_value(record, TYPE_KEYS, "unclassified"),
                start=record.get("era_start", record.get("startYear", record.get("validFrom"))),
                current_end=year,
                classification=classification,
                reason=reason,
                recommended_action=action,
                confidence=confidence,
                has_sources=has_source(record),
            )
        )
    return findings


def candidate_files() -> list[Path]:
    paths = list((BACKEND / "data").glob("*.py"))
    paths.extend(BACKEND.glob("seed*.py"))
    return sorted({path.resolve() for path in paths if path.is_file()})


def write_reports(findings: list[Finding], year: int, json_path: Path, md_path: Path) -> None:
    json_path.parent.mkdir(parents=True, exist_ok=True)
    md_path.parent.mkdir(parents=True, exist_ok=True)
    counts = Counter(item.classification for item in findings)
    payload = {
        "sentinel_year": year,
        "summary": {
            "total": len(findings),
            "with_sources": sum(item.has_sources for item in findings),
            "without_sources": sum(not item.has_sources for item in findings),
            "by_classification": dict(sorted(counts.items())),
        },
        "findings": [asdict(item) for item in findings],
    }
    json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    lines = [
        "# Audit des dates de fin fixées à 2025",
        "",
        "> Rapport automatique conservateur. Aucune date historique n'a été modifiée.",
        "",
        f"- Entrées détectées : **{len(findings)}**",
        f"- Avec au moins une source déclarée : **{payload['summary']['with_sources']}**",
        f"- Sans source déclarée : **{payload['summary']['without_sources']}**",
        "",
        "## Répartition",
        "",
    ]
    for key, value in sorted(counts.items()):
        lines.append(f"- `{key}` : **{value}**")
    lines.extend([
        "",
        "## Entrées à examiner",
        "",
        "| Fichier:ligne | ID | Nom | Classement | Sources | Action recommandée |",
        "|---|---|---|---|---:|---|",
    ])
    for item in findings:
        source_mark = "oui" if item.has_sources else "non"
        name = item.name.replace("|", "\\|")
        action = item.recommended_action.replace("|", "\\|")
        lines.append(
            f"| `{item.file}:{item.line}` | `{item.record_id}` | {name} | `{item.classification}` | {source_mark} | {action} |"
        )
    lines.extend([
        "",
        "## Interprétation",
        "",
        "- `valid-current` ne signifie pas « historiquement vérifié » : seulement que le type d'objet peut légitimement exister aujourd'hui.",
        "- `uncertain-needs-research` et `data-model-problem` ne doivent pas être corrigés automatiquement.",
        "- Une communauté actuelle et la route historique qui l'a créée doivent avoir des chronologies séparées.",
        "",
    ])
    md_path.write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--year", type=int, default=2025, help="Current-year sentinel to audit")
    parser.add_argument("--json", type=Path, default=DEFAULT_OUTPUT_JSON)
    parser.add_argument("--markdown", type=Path, default=DEFAULT_OUTPUT_MD)
    parser.add_argument("--strict", action="store_true", help="Return non-zero if unsourced suspicious records are found")
    args = parser.parse_args()

    findings: list[Finding] = []
    for path in candidate_files():
        findings.extend(audit_file(path, args.year))
    findings.sort(key=lambda item: (item.classification, item.file, item.line))
    write_reports(findings, args.year, args.json, args.markdown)

    counts = Counter(item.classification for item in findings)
    print(f"Audited {len(findings)} records ending in {args.year}.")
    for key, value in sorted(counts.items()):
        print(f"  {key}: {value}")
    print(f"JSON: {args.json}")
    print(f"Markdown: {args.markdown}")

    suspicious = [
        item for item in findings
        if item.classification != "valid-current" and not item.has_sources
    ]
    return 2 if args.strict and suspicious else 0


if __name__ == "__main__":
    raise SystemExit(main())
