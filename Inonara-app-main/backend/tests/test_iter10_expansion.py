"""Iteration 10 tests — 22 civs / 22 diaspora / 12 backfilled place-sources / regressions."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://diaspora-story.preview.emergentagent.com').rstrip('/')


@pytest.fixture(scope="module")
def s():
    return requests.Session()


# ---------- Civilizations ----------
class TestCivilizations:
    def test_count_22(self, s):
        r = s.get(f"{BASE_URL}/api/civilizations")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) >= 22, f"Expected at least 22 civs, got {len(data)}"

    @pytest.mark.parametrize("civ_id", ["kanem-bornu", "wolof-empire", "mutapa", "funj", "mossi"])
    def test_new_civ_detail(self, s, civ_id):
        r = s.get(f"{BASE_URL}/api/civilizations/{civ_id}")
        assert r.status_code == 200, f"{civ_id} -> {r.status_code}"
        d = r.json()
        # Required fields
        for f in ["id", "name", "summary", "timeline", "key_figures", "sources",
                  "political_structure", "economy_and_trade",
                  "science_and_knowledge", "art_and_culture"]:
            assert f in d, f"{civ_id} missing field {f}"
        assert d["id"] == civ_id
        assert isinstance(d["timeline"], list) and len(d["timeline"]) >= 2
        assert isinstance(d["key_figures"], list) and len(d["key_figures"]) >= 1
        assert isinstance(d["sources"], list) and len(d["sources"]) >= 1


# ---------- Diaspora ----------
class TestDiaspora:
    def test_count_22(self, s):
        r = s.get(f"{BASE_URL}/api/diaspora-communities")
        assert r.status_code == 200
        data = r.json()
        assert len(data) >= 22, f"Expected at least 22 diaspora, got {len(data)}"

    @pytest.mark.parametrize("d_id", ["afro-french", "afro-mexican-texan", "afro-filipino"])
    def test_new_diaspora_detail(self, s, d_id):
        r = s.get(f"{BASE_URL}/api/diaspora-communities/{d_id}")
        assert r.status_code == 200, f"{d_id} -> {r.status_code}"
        d = r.json()
        for f in ["id", "name", "summary", "origin_routes", "ethnicities",
                  "languages", "religions", "culture", "story", "modern", "sources"]:
            assert f in d, f"{d_id} missing field {f}"
        assert d["id"] == d_id
        assert isinstance(d["origin_routes"], list) and len(d["origin_routes"]) >= 1
        assert isinstance(d["sources"], list) and len(d["sources"]) >= 1
        assert len(d["story"]) > 50


# ---------- Places sources backfill ----------
class TestPlacesSourcesBackfill:
    @pytest.mark.parametrize("pid", ["elmina", "timbuktu", "djenne", "harlem",
                                      "palmares", "salvador", "zanzibar", "olduvai"])
    def test_place_has_sources(self, s, pid):
        r = s.get(f"{BASE_URL}/api/places/{pid}")
        assert r.status_code == 200, f"{pid} -> {r.status_code}"
        d = r.json()
        assert "sources" in d, f"{pid} missing 'sources'"
        assert isinstance(d["sources"], list)
        assert len(d["sources"]) >= 2, f"{pid} has only {len(d['sources'])} sources"


# ---------- Regressions ----------
class TestRegressions:
    def test_figures_69(self, s):
        # Renamed mental model: must be at least 69 (iter10 added 0; iter11 added 10 → 79).
        r = s.get(f"{BASE_URL}/api/figures")
        assert r.status_code == 200
        data = r.json()
        assert len(data) >= 69, f"Expected at least 69 figures, got {len(data)}"

    def test_journey(self, s):
        r = s.get(f"{BASE_URL}/api/journey")
        assert r.status_code == 200
        data = r.json()
        # accept either a list of stops or a dict with 'stops'
        if isinstance(data, dict):
            assert "stops" in data or len(data) > 0
        else:
            assert isinstance(data, list) and len(data) > 0

    def test_translate(self, s):
        r = s.post(f"{BASE_URL}/api/translate",
                   json={"text": "hello friend", "target_lang": "fr"})
        assert r.status_code == 200, r.text
        d = r.json()
        assert "translation" in d or "translated" in d or "result" in d
        # at least one non-empty value
        joined = " ".join(str(v) for v in d.values())
        assert len(joined) > 0

    def test_search(self, s):
        r = s.get(f"{BASE_URL}/api/search", params={"q": "mali"})
        assert r.status_code == 200
        data = r.json()
        # accept list or dict with results
        assert data is not None

    def test_narrate_returns_502_free_tier(self, s):
        r = s.post(f"{BASE_URL}/api/narrate", json={"text": "Sample narration text."})
        # Expected behavior: free-tier failure → 502; treat 200 as also acceptable
        assert r.status_code in (200, 502), f"Unexpected status {r.status_code}: {r.text[:200]}"


# ---------- Unknown id 404s ----------
class TestNotFound:
    def test_civ_unknown(self, s):
        r = s.get(f"{BASE_URL}/api/civilizations/does-not-exist-xyz")
        assert r.status_code == 404

    def test_diaspora_unknown(self, s):
        r = s.get(f"{BASE_URL}/api/diaspora-communities/does-not-exist-xyz")
        assert r.status_code == 404

    def test_place_unknown(self, s):
        r = s.get(f"{BASE_URL}/api/places/does-not-exist-xyz")
        assert r.status_code == 404
