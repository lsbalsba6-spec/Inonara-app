from data import CIVILIZATIONS, FIGURES, STORIES, CULTURE_ITEMS, ETHNIC_GROUPS, PLACES, LINEAGE_JOURNEY, SA_TIMELINE_EVENTS

def ids(items): return {x["id"] for x in items}

def test_sa_cross_menu_content():
    assert {"mapungubwe", "zulu-kingdom"} <= ids(CIVILIZATIONS)
    assert {"albertina-sisulu", "charlotte-maxeke", "desmond-tutu", "saartjie-baartman"} <= ids(FIGURES)
    assert {"soweto-1976", "apartheid-to-democracy", "mapungubwe-indian-ocean"} <= ids(STORIES)
    assert {"amapiano", "isicathamiya", "south-african-jazz"} <= ids(CULTURE_ITEMS)
    assert {"khoekhoe", "san-southern-africa", "xhosa", "zulu"} <= ids(ETHNIC_GROUPS)
    assert {"mapungubwe-site", "robben-island", "soweto"} <= ids(PLACES)
    assert any(s["id"] == "sa-anti-apartheid" for s in LINEAGE_JOURNEY["stops"])
    assert any(e["id"] == "event-soweto" for e in SA_TIMELINE_EVENTS)
