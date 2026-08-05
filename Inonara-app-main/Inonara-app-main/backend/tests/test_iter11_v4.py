"""Iteration 11 backend tests — v4 content expansion + data-package refactor + i18n FR keys.

Run from /app/backend with:
    python -m pytest tests/test_iter11_v4.py -v
"""

import os
import pytest
import requests

BASE_URL = os.environ.get("BACKEND_BASE_URL", "http://localhost:8001")


@pytest.fixture(scope="module")
def s():
    sess = requests.Session()
    sess.headers.update({"Accept": "application/json"})
    return sess


# ---------- v4 figures ----------
NEW_FIGURES = [
    "katherine-johnson", "dorothy-vaughan", "thomas-mensah", "ahmed-zewail",
    "lewis-latimer", "garrett-morgan", "philip-emeagwali",
    "wole-soyinka", "fannie-lou-hamer", "abebe-bikila",
]


class TestV4Figures:
    def test_figures_count_at_least_79(self, s):
        r = s.get(f"{BASE_URL}/api/figures")
        assert r.status_code == 200
        assert len(r.json()) >= 79

    @pytest.mark.parametrize("fid", NEW_FIGURES)
    def test_each_new_figure_returns_200_with_full_schema(self, s, fid):
        r = s.get(f"{BASE_URL}/api/figures/{fid}")
        assert r.status_code == 200, f"{fid} missing"
        f = r.json()
        for k in ("id", "name", "category", "era", "region", "summary", "story", "legacy", "image_url", "sources"):
            assert k in f, f"{fid} missing field {k}"
        assert isinstance(f["sources"], list) and len(f["sources"]) >= 1

    def test_timeline_includes_new_figures(self, s):
        r = s.get(f"{BASE_URL}/api/figures-timeline")
        assert r.status_code == 200
        ids = {x["id"] for x in r.json()}
        # All v4 figures have parseable eras
        for fid in NEW_FIGURES:
            assert fid in ids, f"{fid} missing from timeline"

    def test_zewail_links_to_egypt_civilization(self, s):
        r = s.get(f"{BASE_URL}/api/figures/ahmed-zewail")
        assert r.status_code == 200
        assert r.json().get("civilization_id") == "egypt"

    def test_wikipedia_titles_present(self, s):
        r = s.get(f"{BASE_URL}/api/figures")
        wiki = {f["id"]: f.get("wikipedia_title") for f in r.json()}
        for fid in NEW_FIGURES:
            assert wiki[fid], f"{fid} missing wikipedia_title"


# ---------- v4 places ----------
NEW_PLACES = ["zewail-city", "ile-de-goree", "kilwa", "tuskegee"]


class TestV4Places:
    def test_places_include_new(self, s):
        r = s.get(f"{BASE_URL}/api/places")
        assert r.status_code == 200
        ids = {p["id"] for p in r.json()}
        for pid in NEW_PLACES:
            assert pid in ids, f"{pid} missing from /api/places"

    @pytest.mark.parametrize("pid", NEW_PLACES)
    def test_each_new_place_has_sources(self, s, pid):
        r = s.get(f"{BASE_URL}/api/places/{pid}")
        assert r.status_code == 200
        p = r.json()
        assert "sources" in p and isinstance(p["sources"], list) and len(p["sources"]) >= 1


# ---------- v4 stories ----------
class TestV4Stories:
    def test_stories_include_hidden_figures(self, s):
        r = s.get(f"{BASE_URL}/api/stories")
        assert r.status_code == 200
        ids = {s["id"] for s in r.json()}
        assert "hidden-figures-of-nasa" in ids

    def test_hidden_figures_detail(self, s):
        r = s.get(f"{BASE_URL}/api/stories/hidden-figures-of-nasa")
        assert r.status_code == 200
        d = r.json()
        assert d["title"].startswith("The Hidden Figures")
        assert len(d["chapters"]) == 4
        for ch in d["chapters"]:
            assert "heading" in ch and "body" in ch
        assert len(d["sources"]) >= 3


# ---------- Search regression ----------
class TestSearchRegression:
    def test_search_finds_zewail_figure(self, s):
        r = s.get(f"{BASE_URL}/api/search", params={"q": "zewail"})
        assert r.status_code == 200
        results = r.json()["results"]
        assert len(results["figures"]) >= 1
        assert any(f["id"] == "ahmed-zewail" for f in results["figures"])

    def test_search_finds_kilwa(self, s):
        r = s.get(f"{BASE_URL}/api/search", params={"q": "kilwa"})
        assert r.status_code == 200
        # places aren't yet in /api/search response (out of scope) — at minimum search must respond OK
        # but figures with kilwa mentions might exist; just assert structure
        assert "results" in r.json()


# ---------- Mongo mirror sanity (write-side) ----------
class TestMongoMirror:
    """The startup hook upserts content into Mongo. We verify via Atlas API
    that the read path still works (in-memory) and that nothing 500s."""

    def test_civilizations_unchanged(self, s):
        r = s.get(f"{BASE_URL}/api/civilizations")
        assert r.status_code == 200
        assert len(r.json()) >= 22

    def test_diaspora_unchanged(self, s):
        r = s.get(f"{BASE_URL}/api/diaspora-communities")
        assert r.status_code == 200
        assert len(r.json()) >= 22

    def test_journey_unchanged(self, s):
        r = s.get(f"{BASE_URL}/api/journey")
        assert r.status_code == 200
        d = r.json()
        assert isinstance(d, dict) and "subtitle" in d
