import json
from pathlib import Path

from scripts.build_atlas_populated_places import build


def feature(iso2, name, lon, lat, **properties):
    return {
        "type": "Feature",
        "properties": {
            "iso_a2": iso2,
            "name": name,
            "nameascii": name,
            "ne_id": properties.pop("ne_id", 1),
            "adm0cap": 0,
            "capalt": 0,
            "worldcity": 0,
            "megacity": 0,
            "min_zoom": 4,
            "pop_max": 100000,
            **properties,
        },
        "geometry": {"type": "Point", "coordinates": [lon, lat]},
    }


def test_build_keeps_only_relevant_african_places(tmp_path: Path):
    source = tmp_path / "places.geojson"
    output = tmp_path / "africa-populated-places.json"
    source.write_text(
        json.dumps(
            {
                "type": "FeatureCollection",
                "features": [
                    feature("GA", "Libreville", 9.45, 0.39, adm0cap=1, ne_id=10),
                    feature("NG", "Lagos", 3.39, 6.45, megacity=1, ne_id=11),
                    feature("FR", "Paris", 2.35, 48.86, adm0cap=1, ne_id=12),
                    feature("GA", "Small place", 10.0, -1.0, ne_id=13),
                ],
            }
        ),
        encoding="utf-8",
    )

    result = build(source, output)

    assert result["count"] == 2
    assert [place["name"] for place in result["places"]] == ["Libreville", "Lagos"]
    assert result["places"][0]["countryId"] == "GA"
    assert result["places"][0]["coords"] == [0.39, 9.45]
    assert result["places"][0]["kind"] == "capital"
    assert result["places"][1]["kind"] == "megacity"
    assert json.loads(output.read_text(encoding="utf-8")) == result


def test_capital_priority_and_min_zoom_are_preserved(tmp_path: Path):
    source = tmp_path / "places.geojson"
    output = tmp_path / "out.json"
    source.write_text(
        json.dumps(
            {
                "type": "FeatureCollection",
                "features": [
                    feature("ZA", "Johannesburg", 28.04, -26.2, worldcity=1, min_zoom=3, ne_id=20),
                    feature("ZA", "Pretoria", 28.19, -25.75, adm0cap=1, min_zoom=5, ne_id=21),
                ],
            }
        ),
        encoding="utf-8",
    )

    result = build(source, output)

    assert [place["name"] for place in result["places"]] == ["Pretoria", "Johannesburg"]
    assert result["places"][0]["minZoom"] == 5
    assert result["places"][1]["minZoom"] == 3
