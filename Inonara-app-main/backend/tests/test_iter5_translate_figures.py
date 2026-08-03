"""Iteration 5 backend tests:
- 69 figures total with new category counts
- 22 new figure detail endpoints (women scientists, francophone, Caribbean revolutionaries, modern thinkers)
- /api/translate endpoint with MongoDB caching
- Regression on prior endpoints (civilizations, diaspora, ethnic-groups, stories, modules, journey, places, search)
"""
import os
import uuid
import pytest
import requests
from pathlib import Path

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    for line in Path("/app/frontend/.env").read_text().splitlines():
        if line.startswith("REACT_APP_BACKEND_URL="):
            BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
            break

API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


# ---------- Figures: total + category counts ----------
EXPECTED_CATEGORY_COUNTS = {
    "queens": 8, "kings": 5, "military": 9, "scientists": 7,
    "inventors": 4, "civil_rights": 10, "intellectuals": 17,
    "artists": 6, "athletes": 3,
}


class TestFiguresTotalsAndCategories:
    def test_total_69(self, s):
        r = s.get(f"{API}/figures", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert len(data) == 69, f"got {len(data)} figures; ids={[d['id'] for d in data]}"

    def test_category_counts(self, s):
        r = s.get(f"{API}/figures", timeout=15)
        figs = r.json()
        actual = {}
        for f in figs:
            actual[f["category"]] = actual.get(f["category"], 0) + 1
        # ensure sum matches
        assert sum(actual.values()) == 69
        for cat, n in EXPECTED_CATEGORY_COUNTS.items():
            assert actual.get(cat) == n, f"{cat}: expected {n}, got {actual.get(cat)} (full: {actual})"

    @pytest.mark.parametrize("cat,n", list(EXPECTED_CATEGORY_COUNTS.items()))
    def test_filter_by_category(self, s, cat, n):
        r = s.get(f"{API}/figures", params={"category": cat}, timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert len(data) == n, f"{cat}: filter returned {len(data)}, expected {n}"
        assert all(f["category"] == cat for f in data)


# ---------- 22 new figure detail endpoints ----------
NEW_FIGURE_IDS = [
    # women scientists & inventors
    "alice-ball", "marie-daly", "patricia-bath", "mae-jemison", "bessie-coleman", "henrietta-lacks",
    # francophone
    "senghor", "cesaire", "damas", "cheikh-anta-diop", "mariama-ba", "sembene",
    # Caribbean revolutionaries
    "boukman", "cecile-fatiman", "solitude", "nanny", "maceo",
    # modern thinkers
    "bell-hooks", "stuart-hall", "ngugi", "mbembe", "audre-lorde",
]


class TestNewFigureDetails:
    @pytest.mark.parametrize("fid", NEW_FIGURE_IDS)
    def test_new_figure_detail_full_payload(self, s, fid):
        r = s.get(f"{API}/figures/{fid}", timeout=15)
        assert r.status_code == 200, f"{fid} -> {r.status_code}"
        f = r.json()
        assert f["id"] == fid
        for field in ["name", "category", "era", "region", "summary",
                      "story", "legacy", "sources"]:
            assert field in f and f[field], f"{fid} missing or empty {field}"
        assert isinstance(f["sources"], list) and len(f["sources"]) >= 1, \
            f"{fid} sources not a non-empty list"


# ---------- /api/translate ----------
class TestTranslate:
    def test_translate_first_call_not_cached(self, s):
        # use a unique sentence so the cache is guaranteed empty
        text = f"Founder of Mali. {uuid.uuid4()}"
        r = s.post(f"{API}/translate", json={"text": text, "target_lang": "fr"}, timeout=30)
        assert r.status_code == 200, r.text
        d = r.json()
        assert "translated" in d
        assert "cached" in d
        assert d["cached"] is False
        assert isinstance(d["translated"], str) and len(d["translated"]) > 0

    def test_translate_second_call_cached(self, s):
        text = f"Cached test {uuid.uuid4()}"
        # 1st call
        r1 = s.post(f"{API}/translate", json={"text": text, "target_lang": "fr"}, timeout=30)
        assert r1.status_code == 200
        assert r1.json()["cached"] is False
        first_tx = r1.json()["translated"]
        # 2nd identical call should be cached
        r2 = s.post(f"{API}/translate", json={"text": text, "target_lang": "fr"}, timeout=15)
        assert r2.status_code == 200
        d2 = r2.json()
        assert d2["cached"] is True, d2
        assert d2["translated"] == first_tx

    def test_translate_empty_text(self, s):
        r = s.post(f"{API}/translate", json={"text": "", "target_lang": "fr"}, timeout=10)
        assert r.status_code == 200
        d = r.json()
        assert d["translated"] == ""

    def test_translate_unsupported_lang(self, s):
        r = s.post(f"{API}/translate", json={"text": "Hello", "target_lang": "xx"}, timeout=10)
        assert r.status_code == 400, f"expected 400, got {r.status_code}: {r.text}"


# ---------- Regression ----------
class TestRegression:
    def test_root(self, s):
        r = s.get(f"{API}/", timeout=15)
        assert r.status_code == 200

    def test_civilizations_13(self, s):
        assert len(s.get(f"{API}/civilizations", timeout=15).json()) == 13

    def test_diaspora_13(self, s):
        assert len(s.get(f"{API}/diaspora-communities", timeout=15).json()) == 13

    def test_ethnic_groups_4(self, s):
        assert len(s.get(f"{API}/ethnic-groups", timeout=15).json()) == 4

    def test_stories_4(self, s):
        assert len(s.get(f"{API}/stories", timeout=15).json()) == 4

    def test_modules_8(self, s):
        data = s.get(f"{API}/modules", timeout=15).json()
        assert len(data) == 8, f"got {len(data)}"

    def test_journey(self, s):
        r = s.get(f"{API}/journey", timeout=15)
        assert r.status_code == 200
        assert r.json()

    def test_places_12(self, s):
        r = s.get(f"{API}/places", timeout=15)
        assert r.status_code == 200
        assert len(r.json()) == 12

    def test_search_solitude_returns_figure(self, s):
        r = s.get(f"{API}/search", params={"q": "solitude"}, timeout=15)
        assert r.status_code == 200
        ids = [f["id"] for f in r.json()["results"].get("figures", [])]
        assert "solitude" in ids, ids
