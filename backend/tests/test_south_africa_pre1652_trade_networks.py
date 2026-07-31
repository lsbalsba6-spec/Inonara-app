from data.country_dossiers.south_africa_deep_history import DEEP_HISTORY, DEEP_HISTORY_SOURCES


def test_pre1652_map_contains_trade_and_political_layers():
    map_data = DEEP_HISTORY["pre1652_map"]
    assert len(map_data["political_zones"]) >= 2
    route_types = {route["type"] for route in map_data["corridors"]}
    assert "trade-network" in route_types
    assert "maritime-trade" in route_types
    assert "regional-connection" in route_types


def test_trade_routes_have_goods_sources_and_bounded_dates():
    source_ids = {source["id"] for source in DEEP_HISTORY_SOURCES}
    trade_types = {"trade-network", "maritime-trade", "regional-connection"}
    for route in DEEP_HISTORY["pre1652_map"]["corridors"]:
        if route["type"] not in trade_types:
            continue
        assert route["end"] <= 1651
        assert route.get("goods")
        assert set(route["sources"]).issubset(source_ids)
        assert route["note"]


def test_regional_context_sites_are_not_labelled_as_south_african_polities():
    sites = {site["id"]: site for site in DEEP_HISTORY["pre1652_map"]["sites"]}
    assert "contexte régional" in sites["site-great-zimbabwe"]["label"]
    assert "contexte régional" in sites["site-khami"]["label"]
