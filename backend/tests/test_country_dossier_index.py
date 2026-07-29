from data.country_dossiers import COUNTRY_DOSSIERS, country_dossier_index


def test_country_dossier_index_is_lightweight_and_contains_south_africa():
    result = country_dossier_index()
    south_africa = next(item for item in result if item["iso2"] == "ZA")

    assert south_africa["slug"] == "south-africa"
    assert south_africa["name"]["fr"] == "Afrique du Sud"
    assert south_africa["region"]["id"] == "southern-africa"
    assert "timeline" not in south_africa
    assert "sources" not in south_africa


def test_country_dossier_index_matches_registry_size():
    assert len(country_dossier_index()) == len(COUNTRY_DOSSIERS)
