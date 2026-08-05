from data.country_dossiers import SOUTH_AFRICA_DOSSIER


def test_part7_culture_is_detailed_and_sourced():
    culture = SOUTH_AFRICA_DOSSIER["culture"]
    source_ids = {source["id"] for source in SOUTH_AFRICA_DOSSIER["sources"]}
    assert len(culture) >= 7
    for section in culture:
        assert len(section["summary"]) >= 180
        assert section.get("examples")
        assert section.get("caution")
        assert section.get("sources")
        assert set(section["sources"]).issubset(source_ids)


def test_part7_oral_traditions_are_contextualised():
    traditions = SOUTH_AFRICA_DOSSIER["oral_traditions_and_legends"]
    assert len(traditions) >= 3
    assert all(item.get("summary") and item.get("sources") for item in traditions)


def test_part7_includes_all_current_unesco_properties():
    heritage = SOUTH_AFRICA_DOSSIER["heritage"]
    names = {item["name"] for item in heritage}
    assert len(heritage) == 12
    assert "Mapungubwe Cultural Landscape" in names
    assert "Maloti-Drakensberg Park" in names
    assert "Human Rights, Liberation and Reconciliation: Nelson Mandela Legacy Sites" in names


def test_part7_national_heritage_highlights_are_separate():
    highlights = SOUTH_AFRICA_DOSSIER["national_heritage_highlights"]
    assert len(highlights) >= 6
    assert all(item.get("description") and item.get("sources") for item in highlights)
