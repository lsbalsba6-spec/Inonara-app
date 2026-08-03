"""Iteration 6 backend tests:
- /api/figures-timeline (69 figures, sorted by year)
- /api/civilizations/{id}/figures (figure↔civ mapping)
- /api/narrate (ElevenLabs - expected 502 on Free Tier)
- regression: /api/figures, /api/translate
"""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://diaspora-story.preview.emergentagent.com').rstrip('/')


@pytest.fixture
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- figures-timeline ----
class TestFiguresTimeline:
    def test_returns_69_sorted(self, api):
        r = api.get(f"{BASE_URL}/api/figures-timeline", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 69, f"expected 69, got {len(data)}"
        # sorted ascending by year
        years = [d["year"] for d in data]
        assert years == sorted(years)
        # earliest ~ Imhotep -2650
        assert data[0]["id"] == "imhotep"
        assert data[0]["year"] <= -2600
        # latest around 1957 Mbembe
        assert data[-1]["year"] >= 1900

    def test_entry_shape(self, api):
        r = api.get(f"{BASE_URL}/api/figures-timeline", timeout=30)
        data = r.json()
        keys = {"id", "name", "category", "era", "region", "year", "summary", "image_url"}
        for e in data[:5]:
            assert keys.issubset(e.keys()), f"missing keys: {keys - e.keys()}"
            assert isinstance(e["year"], int)


# ---- civilization → figures mapping ----
class TestCivilizationFigures:
    @pytest.mark.parametrize("civ,expected_ids", [
        ("mali", {"mansa-musa", "sundiata"}),
        ("egypt", {"hatshepsut", "cleopatra", "imhotep"}),
        ("kush", {"taharqa", "amanirenas"}),
        ("zulu", {"shaka"}),
    ])
    def test_civ_figures(self, api, civ, expected_ids):
        r = api.get(f"{BASE_URL}/api/civilizations/{civ}/figures", timeout=15)
        assert r.status_code == 200
        data = r.json()
        ids = {f["id"] for f in data}
        assert ids == expected_ids, f"{civ}: got {ids}, expected {expected_ids}"
        # shape
        for f in data:
            for k in ("id", "name", "category", "era", "summary", "image_url"):
                assert k in f

    def test_unknown_civ_returns_empty(self, api):
        r = api.get(f"{BASE_URL}/api/civilizations/unknown/figures", timeout=15)
        assert r.status_code == 200
        assert r.json() == []


# ---- narrate (ElevenLabs - expected 502 from cloud IP) ----
class TestNarrate:
    def test_narrate_freetier_blocked_or_ok(self, api):
        r = api.post(f"{BASE_URL}/api/narrate",
                     json={"text": "Mansa Musa of Mali set out in 1324."}, timeout=60)
        # Expected: 502 (Free Tier blocked) OR 200 cached/success
        assert r.status_code in (200, 502), f"unexpected status {r.status_code}: {r.text[:300]}"
        if r.status_code == 502:
            detail = (r.json().get("detail") or "").lower()
            assert ("free tier" in detail or "detected_unusual_activity" in detail
                    or "narration unavailable" in detail), f"unfriendly error: {detail}"
        else:
            body = r.json()
            assert "audio_url" in body
            assert body["audio_url"].startswith("data:audio/mpeg;base64,")

    def test_narrate_empty_text_400(self, api):
        r = api.post(f"{BASE_URL}/api/narrate", json={"text": ""}, timeout=15)
        assert r.status_code == 400


# ---- regression ----
class TestRegression:
    def test_figures_69(self, api):
        r = api.get(f"{BASE_URL}/api/figures", timeout=20)
        assert r.status_code == 200
        assert len(r.json()) == 69

    def test_translate_basic(self, api):
        r = api.post(f"{BASE_URL}/api/translate",
                     json={"text": "Hello, this is a test.", "target_lang": "fr"}, timeout=60)
        assert r.status_code == 200
        data = r.json()
        assert "translated" in data and len(data["translated"]) > 0
        assert data["target_lang"] == "fr"
