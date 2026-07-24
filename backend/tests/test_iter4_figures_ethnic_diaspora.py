"""Iteration 4 backend tests:
- New diaspora communities (13 total, 5 new)
- Ethnic groups (4)
- Figures (47, 9 categories) + detail + search
- Regression on existing endpoints
"""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # Try frontend/.env as fallback
    try:
        from pathlib import Path
        env_path = Path("/app/frontend/.env")
        for line in env_path.read_text().splitlines():
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
                break
    except Exception:
        pass

API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


# ---------- Diaspora ----------
class TestDiaspora:
    def test_list_returns_13(self, s):
        r = s.get(f"{API}/diaspora-communities", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 13, f"expected 13, got {len(data)}: {[d['id'] for d in data]}"

    @pytest.mark.parametrize("cid", [
        "afro-mexican", "afro-peruvian", "afro-indian-sidi", "afro-german", "afro-arab-gulf"
    ])
    def test_new_diaspora_detail(self, s, cid):
        r = s.get(f"{API}/diaspora-communities/{cid}", timeout=15)
        assert r.status_code == 200, f"{cid} -> {r.status_code}"
        d = r.json()
        assert d["id"] == cid
        for f in ["name", "country", "region", "coords", "summary"]:
            assert f in d and d[f], f"{cid} missing {f}"

    def test_diaspora_404(self, s):
        assert s.get(f"{API}/diaspora-communities/does-not-exist").status_code == 404


# ---------- Ethnic groups ----------
class TestEthnicGroups:
    def test_list_returns_4(self, s):
        r = s.get(f"{API}/ethnic-groups", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert len(data) == 4
        ids = {g["id"] for g in data}
        assert ids == {"yoruba", "igbo", "akan", "bantu"}, ids

    @pytest.mark.parametrize("gid", ["yoruba", "igbo", "akan", "bantu"])
    def test_group_detail_payload(self, s, gid):
        r = s.get(f"{API}/ethnic-groups/{gid}", timeout=15)
        assert r.status_code == 200
        g = r.json()
        for field in ["name", "homeland", "language_family", "language",
                      "religion", "culture", "diaspora", "sources"]:
            assert field in g, f"{gid} missing field {field}"
        assert isinstance(g["sources"], list) and len(g["sources"]) >= 1

    def test_group_404(self, s):
        assert s.get(f"{API}/ethnic-groups/martian").status_code == 404


# ---------- Figures ----------
EXPECTED_CATEGORY_COUNTS = {
    "queens": 8, "kings": 5, "military": 4, "scientists": 3,
    "inventors": 3, "civil_rights": 10, "intellectuals": 7,
    "artists": 5, "athletes": 2,
}


class TestFigures:
    def test_total_47(self, s):
        r = s.get(f"{API}/figures", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert len(data) == 47, f"got {len(data)}"

    def test_category_counts(self, s):
        r = s.get(f"{API}/figures", timeout=15)
        all_figs = r.json()
        actual = {}
        for f in all_figs:
            actual[f["category"]] = actual.get(f["category"], 0) + 1
        for cat, n in EXPECTED_CATEGORY_COUNTS.items():
            assert actual.get(cat) == n, f"{cat}: expected {n}, got {actual.get(cat)}"

    @pytest.mark.parametrize("cat,n", list(EXPECTED_CATEGORY_COUNTS.items()))
    def test_filter_by_category(self, s, cat, n):
        r = s.get(f"{API}/figures", params={"category": cat}, timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert len(data) == n
        assert all(f["category"] == cat for f in data)

    @pytest.mark.parametrize("fid", [
        "mansa-musa", "mlk", "harriet-tubman", "mandela", "fela",
        "ali", "sankara", "lumumba", "garrett-morgan",
    ])
    def test_figure_detail(self, s, fid):
        r = s.get(f"{API}/figures/{fid}", timeout=15)
        assert r.status_code == 200, f"{fid} -> {r.status_code}"
        f = r.json()
        assert f["id"] == fid
        for field in ["name", "category", "era", "region", "summary",
                      "story", "legacy", "sources"]:
            assert field in f and f[field], f"{fid} missing {field}"
        assert isinstance(f["sources"], list) and len(f["sources"]) >= 1

    def test_figure_404(self, s):
        assert s.get(f"{API}/figures/no-one").status_code == 404


# ---------- Search ----------
class TestSearch:
    def test_search_cleopatra_returns_figure(self, s):
        r = s.get(f"{API}/search", params={"q": "cleopatra"}, timeout=15)
        assert r.status_code == 200
        res = r.json()["results"]
        assert "figures" in res
        ids = [f["id"] for f in res["figures"]]
        assert "cleopatra" in ids, ids

    def test_search_sidi_returns_diaspora(self, s):
        r = s.get(f"{API}/search", params={"q": "sidi"}, timeout=15)
        assert r.status_code == 200
        res = r.json()["results"]
        ids = [d["id"] for d in res["diaspora"]]
        assert "afro-indian-sidi" in ids, ids


# ---------- Regression ----------
class TestRegression:
    def test_root(self, s):
        r = s.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        assert r.json().get("app") == "AfroAtlas"

    def test_civilizations_13(self, s):
        r = s.get(f"{API}/civilizations", timeout=15)
        assert r.status_code == 200
        assert len(r.json()) == 13

    def test_stories_4(self, s):
        r = s.get(f"{API}/stories", timeout=15)
        assert r.status_code == 200
        assert len(r.json()) == 4

    def test_modules(self, s):
        r = s.get(f"{API}/modules", timeout=15)
        assert r.status_code == 200
        assert len(r.json()) >= 1

    def test_journey(self, s):
        r = s.get(f"{API}/journey", timeout=15)
        assert r.status_code == 200
        data = r.json()
        # journey shape varies; just verify non-empty
        assert data
