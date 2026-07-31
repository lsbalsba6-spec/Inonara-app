from data.country_dossiers.south_africa_timeline_economy import SOUTH_AFRICA_TIMELINE_ECONOMY


def test_extended_timeline_is_chronological():
    years = [item["year"] for item in SOUTH_AFRICA_TIMELINE_ECONOMY["interactive_timeline"]]
    assert years == sorted(years)
    assert len(years) >= 15


def test_current_indicators_are_dated_and_sourced():
    indicators = SOUTH_AFRICA_TIMELINE_ECONOMY["economy"]["currentIndicators"]
    assert indicators
    for item in indicators:
        assert item["asOf"]
        assert item["sourceIds"]


def test_additional_source_ids_are_unique():
    sources = SOUTH_AFRICA_TIMELINE_ECONOMY["additionalSources"]
    ids = [source["id"] for source in sources]
    assert len(ids) == len(set(ids))


def test_library_references_known_sources():
    known = {source["id"] for source in SOUTH_AFRICA_TIMELINE_ECONOMY["additionalSources"]}
    # Existing dossier sources are deliberately allowed too.
    referenced = {item for group in SOUTH_AFRICA_TIMELINE_ECONOMY["scientificLibrary"] for item in group["items"]}
    assert {"src-statssa-gdp-2025", "src-worldbank-sa-overview"}.issubset(referenced)
    assert known.intersection(referenced)
