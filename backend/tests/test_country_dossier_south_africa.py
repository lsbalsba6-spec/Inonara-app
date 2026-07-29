from data.country_dossiers import COUNTRY_DOSSIERS, SOUTH_AFRICA_DOSSIER


def test_south_africa_dossier_registered():
    assert COUNTRY_DOSSIERS["ZA"] is SOUTH_AFRICA_DOSSIER
    assert SOUTH_AFRICA_DOSSIER["slug"] == "south-africa"


def test_every_ready_claim_has_sources():
    d = SOUTH_AFRICA_DOSSIER
    source_ids = {s["id"] for s in d["sources"]}
    collections = [d["timeline"], d["polities"], d["peoples"], d["migrations"], d["heritage"]]
    for items in collections:
        for item in items:
            for sid in item.get("sources", []):
                assert sid in source_ids
            if item.get("status") == "ready":
                assert item.get("sources"), item


def test_no_public_migration_route_without_route_level_review():
    assert all(m["routes_public"] is False for m in SOUTH_AFRICA_DOSSIER["migrations"])


def test_languages_include_sasl():
    assert "South African Sign Language" in SOUTH_AFRICA_DOSSIER["languages"]["official"]
    assert len(SOUTH_AFRICA_DOSSIER["languages"]["official"]) == 12


def test_timeline_is_chronological():
    starts = [item["start"] for item in SOUTH_AFRICA_DOSSIER["timeline"]]
    assert starts == sorted(starts)


def test_every_published_figure_has_sources():
    source_ids = {s["id"] for s in SOUTH_AFRICA_DOSSIER["sources"]}
    for figure in SOUTH_AFRICA_DOSSIER["figures"]:
        assert figure.get("sources"), figure
        assert all(source_id in source_ids for source_id in figure["sources"])


def test_historiography_and_research_gaps_are_explicit():
    assert len(SOUTH_AFRICA_DOSSIER["historiography"]) >= 4
    assert len(SOUTH_AFRICA_DOSSIER["research_gaps"]) >= 5
