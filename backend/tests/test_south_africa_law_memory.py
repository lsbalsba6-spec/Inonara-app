from data.country_dossiers.south_africa_law_memory import SOUTH_AFRICA_LAW_MEMORY


def test_law_and_memory_sections_are_substantial():
    data = SOUTH_AFRICA_LAW_MEMORY["law_memory"]
    assert len(data["constitutional_democracy"]["items"]) >= 5
    assert len(data["justice_system"]["items"]) >= 4
    assert len(data["memory_reconciliation"]["items"]) >= 4


def test_every_claim_is_sourced_and_qualified():
    data = SOUTH_AFRICA_LAW_MEMORY["law_memory"]
    for key in ("constitutional_democracy", "justice_system", "memory_reconciliation"):
        for item in data[key]["items"]:
            assert item["status"] in {"ready", "provisional", "disputed"}
            assert item["sourceIds"]
            assert len(item["text"]) >= 120


def test_source_ids_are_unique_and_resolvable():
    sources = SOUTH_AFRICA_LAW_MEMORY["additionalSources"]
    source_ids = [source["id"] for source in sources]
    assert len(source_ids) == len(set(source_ids))
    available = set(source_ids)
    data = SOUTH_AFRICA_LAW_MEMORY["law_memory"]
    for key in ("constitutional_democracy", "justice_system", "memory_reconciliation"):
        for item in data[key]["items"]:
            assert set(item["sourceIds"]).issubset(available)
