from data.country_dossiers.south_africa_deep_history import (
    DEEP_HISTORY,
    DEEP_HISTORY_SOURCES,
    enrich_south_africa_dossier,
)


def test_every_chapter_is_sourced():
    source_ids = {source["id"] for source in DEEP_HISTORY_SOURCES}
    assert DEEP_HISTORY["chapters"]
    for chapter in DEEP_HISTORY["chapters"]:
        assert chapter["sources"]
        assert set(chapter["sources"]).issubset(source_ids)
        assert chapter["status"] in {"ready", "provisional", "disputed"}


def test_no_precise_route_is_invented():
    for process in DEEP_HISTORY["migration_processes"]:
        assert process["route_geometry"] is None
        assert process["sources"]


def test_enrichment_is_idempotent_for_sources():
    base = {"sources": [], "name": {"fr": "Afrique du Sud"}}
    once = enrich_south_africa_dossier(base)
    twice = enrich_south_africa_dossier(once)
    ids = [source["id"] for source in twice["sources"]]
    assert len(ids) == len(set(ids))
    assert twice["deep_history"]["chapters"]
