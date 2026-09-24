from data.country_dossiers import COUNTRY_DOSSIERS, SOUTH_AFRICA_DOSSIER


def test_south_africa_completion_pipeline_loads_and_preserves_legacy_routes():
    dossier = COUNTRY_DOSSIERS["ZA"]

    assert dossier is SOUTH_AFRICA_DOSSIER
    assert isinstance(dossier["heritage"], list)
    assert isinstance(dossier["culture"], list)
    assert isinstance(dossier["peoples"], list)
    assert isinstance(dossier["migrations"], list)
    assert dossier["heritage_themes"]
    assert dossier["culture_themes"]
    assert dossier["peoples_themes"]
    assert dossier["figures_themes"]
    assert dossier["migration_themes"]
    assert dossier["environment"]["themes"]
    assert dossier["institutions_memory"]["themes"]
    assert dossier["media"]["themes"]
    assert dossier["interactive"]["migrationRoutes"]
    assert dossier["interactive"]["mapLayers"]
    assert dossier["science_innovation"]
    assert dossier["environment"]["biomes"]
    assert dossier["environment"]["landscapes"]
    assert dossier["completeness_gate"]["status"] == "content-complete"


def test_south_africa_completion_records_have_unique_ids():
    dossier = COUNTRY_DOSSIERS["ZA"]
    collections = [
        dossier["heritage_themes"],
        dossier["culture_themes"],
        dossier["peoples_themes"],
        dossier["figures_themes"],
        dossier["migration_themes"],
        dossier["environment"]["themes"],
        dossier["institutions_memory"]["themes"],
        dossier["media"]["themes"],
        dossier["interactive"]["migrationRoutes"],
        dossier["interactive"]["mapLayers"],
    ]

    for items in collections:
        ids = [item["id"] for item in items]
        assert len(ids) == len(set(ids))
