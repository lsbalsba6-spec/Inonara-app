"""Iteration 15 backend tests — Vérités Cachées (Part 2 of both inventory PDFs)."""

import os, pytest, requests

BASE_URL = os.environ.get("BACKEND_BASE_URL", "http://localhost:8001")


@pytest.fixture(scope="module")
def s():
    sess = requests.Session()
    sess.headers.update({"Accept": "application/json"})
    return sess


NEW_CIVS = ["dhar-tichitt", "ijebu-eredo", "rwanda-kingdom", "luba-empire", "lunda-empire"]
NEW_FIGURES = ["abbas-ibn-firnas", "ahmed-baba", "aline-sitoe-diatta", "kimpa-vita",
               "aboubakri-ii", "malik-ambar", "benkos-bioho", "gaspar-yanga", "onesimus"]
NEW_PLACES = ["dhar-tichitt-site", "sungbo-eredo", "san-basilio-palenque", "yanga-veracruz",
              "janjira-fort", "nabta-playa", "pir-senegal"]
NEW_DIASPORA = ["siddi", "afro-argentine", "afro-peruvian"]
NEW_STORIES = ["zanj-rebellion", "african-writing-systems", "precolonial-african-sciences",
               "moorish-iberia", "tirailleurs-senegalais"]
NEW_ETHNIC = ["san", "khoikhoi", "mbuti-baka"]


class TestV7Counts:
    def test_civs_at_least_27(self, s):
        assert len(s.get(f"{BASE_URL}/api/civilizations").json()) >= 27
    def test_figures_at_least_96(self, s):
        assert len(s.get(f"{BASE_URL}/api/figures").json()) >= 96
    def test_places_at_least_31(self, s):
        assert len(s.get(f"{BASE_URL}/api/places").json()) >= 31
    def test_diaspora_at_least_25(self, s):
        assert len(s.get(f"{BASE_URL}/api/diaspora-communities").json()) >= 25
    def test_stories_at_least_16(self, s):
        assert len(s.get(f"{BASE_URL}/api/stories").json()) >= 16
    def test_ethnic_at_least_7(self, s):
        assert len(s.get(f"{BASE_URL}/api/ethnic-groups").json()) >= 7


class TestV7Civilizations:
    @pytest.mark.parametrize("cid", NEW_CIVS)
    def test_each_civ(self, s, cid):
        r = s.get(f"{BASE_URL}/api/civilizations/{cid}")
        assert r.status_code == 200, f"{cid} missing"
        d = r.json()
        for f in ("id", "name", "summary", "political_structure", "economy_and_trade",
                  "science_and_knowledge", "art_and_culture", "timeline", "key_figures", "sources"):
            assert f in d, f"{cid} missing {f}"
        assert isinstance(d["key_figures"], list)
        # key_figures items must be dicts (for /api/search to not crash)
        for kf in d["key_figures"]:
            assert isinstance(kf, dict) and "name" in kf, f"{cid} key_figures must be dicts with 'name'"


class TestV7Figures:
    @pytest.mark.parametrize("fid", NEW_FIGURES)
    def test_each_figure(self, s, fid):
        d = s.get(f"{BASE_URL}/api/figures/{fid}").json()
        for f in ("id", "name", "category", "era", "region", "summary", "story", "legacy", "sources"):
            assert f in d, f"{fid} missing {f}"


class TestV7Places:
    @pytest.mark.parametrize("pid", NEW_PLACES)
    def test_each_place(self, s, pid):
        d = s.get(f"{BASE_URL}/api/places/{pid}").json()
        assert d["id"] == pid
        assert isinstance(d.get("sources"), list) and len(d["sources"]) >= 1


class TestV7Diaspora:
    @pytest.mark.parametrize("did", NEW_DIASPORA)
    def test_each_diaspora(self, s, did):
        d = s.get(f"{BASE_URL}/api/diaspora-communities/{did}").json()
        for f in ("id", "name", "country", "region", "summary", "culture", "story", "modern"):
            assert f in d


class TestV7Stories:
    @pytest.mark.parametrize("sid", NEW_STORIES)
    def test_each_story(self, s, sid):
        d = s.get(f"{BASE_URL}/api/stories/{sid}").json()
        assert d["id"] == sid
        assert isinstance(d["chapters"], list) and len(d["chapters"]) >= 4
        for ch in d["chapters"]:
            assert "heading" in ch and "body" in ch
        assert isinstance(d.get("sources"), list) and len(d["sources"]) >= 1


class TestV7SearchRegression:
    def test_search_does_not_500_on_zewail(self, s):
        # Was 500'ing because v7 civs had string key_figures — guard against regression.
        assert s.get(f"{BASE_URL}/api/search", params={"q": "zewail"}).status_code == 200

    def test_search_finds_new_figures(self, s):
        results = s.get(f"{BASE_URL}/api/search", params={"q": "ambar"}).json()["results"]
        assert any(f["id"] == "malik-ambar" for f in results["figures"])
