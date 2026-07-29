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


def test_south_africa_visual_and_public_fields_are_present():
    dossier = SOUTH_AFRICA_DOSSIER
    assert dossier["overview"]["president_current"]["name"] == "Cyril Ramaphosa"
    assert dossier["overview"]["national_flag"]["current_since"] == "1994-04-27"
    assert len(dossier["flag_history"]) == 3
    assert len(dossier["map_visuals"]["cities"]) >= 6
    assert len(dossier["map_visuals"]["migration_routes"]) >= 6
    assert dossier["geography"]["area_km2"] > 1_000_000
    assert len(dossier["institutions"]["provinces"]) == 9


def test_south_africa_map_routes_are_bounded_and_sourced():
    source_ids = {source["id"] for source in SOUTH_AFRICA_DOSSIER["sources"]}
    for route in SOUTH_AFRICA_DOSSIER["map_visuals"]["migration_routes"]:
        assert isinstance(route["start"], int)
        assert isinstance(route["end"], int)
        assert route["start"] <= route["end"]
        assert route["sources"]
        assert set(route["sources"]).issubset(source_ids)
        assert route["type"] != "mixed"


def test_history_chapters_are_substantial_and_sourced():
    dossier = SOUTH_AFRICA_DOSSIER
    chapters = dossier.get("history_chapters", [])
    assert len(chapters) >= 7
    for chapter in chapters:
        assert len(chapter.get("summary", "")) >= 180
        assert chapter.get("sources")
        assert chapter.get("status") in {"ready", "provisional", "disputed"}


def test_south_africa_part5_peoples_are_detailed_and_sourced():
    peoples = SOUTH_AFRICA_DOSSIER["peoples"]
    assert len(peoples) >= 9
    assert all(item.get("history") and item.get("sources") for item in peoples)
    assert all(item.get("caution") for item in peoples)


def test_south_africa_part5_languages_are_clean_and_official():
    languages = SOUTH_AFRICA_DOSSIER["languages"]
    assert len(languages["official"]) == 12
    assert "South African Sign Language" in languages["official"]
    assert "history_chapters" not in languages
    assert languages.get("families_and_contexts")


def test_south_africa_part5_religions_explain_counts():
    religions = SOUTH_AFRICA_DOSSIER["religions"]
    assert "history_chapters" not in religions
    assert religions.get("interpretation_note")
    assert len(religions.get("historical_contexts", [])) >= 5
