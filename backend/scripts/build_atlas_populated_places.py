#!/usr/bin/env python3
"""Build the frontend Africa populated-places layer from Natural Earth.

Usage:
    python backend/scripts/build_atlas_populated_places.py \
        path/to/ne_10m_populated_places_simple.geojson

The input is intentionally not downloaded by this script so builds remain
reproducible and do not depend on network access. Natural Earth vector data is
public domain. Recommended source:
https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/

Output:
    frontend/src/data/africa-populated-places.json

Only records useful to the main Atlas are retained: admin-0 capitals, alternate
national capitals, Natural Earth world cities and megacities. The original
Natural Earth min_zoom and ranking fields are preserved so the frontend can
progressively reveal labels instead of overcrowding the continental view.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
BACKEND = ROOT / "backend"
if str(BACKEND) not in sys.path:
    sys.path.insert(0, str(BACKEND))

from data.countries_registry import COUNTRY_REGISTRY  # noqa: E402

OUTPUT_PATH = ROOT / "frontend" / "src" / "data" / "africa-populated-places.json"
SOURCE_NAME = "Natural Earth populated places simple"
SOURCE_URL = "https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/"


def african_iso2_codes() -> set[str]:
    return {
        row["iso2"]
        for row in COUNTRY_REGISTRY
        if row.get("continent") == "Africa" and row.get("iso2")
    }


def keep_feature(properties: dict, africa_codes: set[str]) -> bool:
    iso2 = properties.get("iso_a2")
    if iso2 not in africa_codes:
        return False
    return bool(
        properties.get("adm0cap")
        or properties.get("capalt")
        or properties.get("worldcity")
        or properties.get("megacity")
    )


def normalize_feature(feature: dict) -> dict | None:
    properties = feature.get("properties") or {}
    geometry = feature.get("geometry") or {}
    coordinates = geometry.get("coordinates") or []
    if geometry.get("type") != "Point" or len(coordinates) < 2:
        return None

    lon, lat = coordinates[:2]
    iso2 = properties.get("iso_a2")
    name = properties.get("name") or properties.get("nameascii")
    if not iso2 or not name:
        return None

    if properties.get("adm0cap"):
        kind = "capital"
    elif properties.get("capalt"):
        kind = "capital-alt"
    elif properties.get("megacity"):
        kind = "megacity"
    else:
        kind = "world-city"

    return {
        "id": f"ne-{properties.get('ne_id') or f'{iso2}-{name}'.lower().replace(' ', '-')}",
        "name": name,
        "nameAscii": properties.get("nameascii") or name,
        "countryId": iso2,
        "kind": kind,
        "featureClass": properties.get("featurecla"),
        "coords": [float(lat), float(lon)],
        "populationMax": properties.get("pop_max"),
        "populationMin": properties.get("pop_min"),
        "rankMax": properties.get("rank_max"),
        "labelRank": properties.get("labelrank"),
        "scaleRank": properties.get("scalerank"),
        "minZoom": properties.get("min_zoom"),
        "naturalEarthId": properties.get("ne_id"),
    }


def sort_key(place: dict) -> tuple:
    kind_order = {
        "capital": 0,
        "capital-alt": 1,
        "megacity": 2,
        "world-city": 3,
    }
    return (
        kind_order.get(place["kind"], 9),
        place.get("minZoom") if place.get("minZoom") is not None else 99,
        -(place.get("populationMax") or 0),
        place["name"],
    )


def build(input_path: Path, output_path: Path = OUTPUT_PATH) -> dict:
    payload = json.loads(input_path.read_text(encoding="utf-8"))
    africa_codes = african_iso2_codes()
    places = []

    for feature in payload.get("features", []):
        properties = feature.get("properties") or {}
        if not keep_feature(properties, africa_codes):
            continue
        normalized = normalize_feature(feature)
        if normalized:
            places.append(normalized)

    places.sort(key=sort_key)
    result = {
        "source": {
            "name": SOURCE_NAME,
            "url": SOURCE_URL,
            "license": "Public domain",
        },
        "selection": {
            "continent": "Africa",
            "includes": ["adm0cap", "capalt", "worldcity", "megacity"],
            "note": "minZoom is inherited from Natural Earth and should drive progressive disclosure in the Atlas.",
        },
        "count": len(places),
        "places": places,
    }

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return result


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path, help="Natural Earth populated places GeoJSON")
    parser.add_argument("--output", type=Path, default=OUTPUT_PATH)
    args = parser.parse_args()

    if not args.input.exists():
        parser.error(f"Input file does not exist: {args.input}")

    result = build(args.input, args.output)
    print(f"Wrote {result['count']} African populated places to {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
