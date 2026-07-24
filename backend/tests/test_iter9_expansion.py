"""Iteration 9 backend tests: expanded civilizations (17), diaspora (19), places (20) + /api/places/{id}."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # fall back to frontend/.env
    try:
        with open("/app/frontend/.env") as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
    except Exception:
        pass

API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def s():
    return requests.Session()


# ---------- Civilizations: 17 incl. 4 new ----------
NEW_CIVS = ["ghana-empire", "carthage", "buganda", "sokoto"]


def test_civilizations_count_17(s):
    r = s.get(f"{API}/civilizations", timeout=20)
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) == 17, f"expected 17 civs, got {len(data)}"
    ids = {c["id"] for c in data}
    for cid in NEW_CIVS:
        assert cid in ids, f"missing civ {cid}"


@pytest.mark.parametrize("cid", NEW_CIVS)
def test_civilization_detail_payload(s, cid):
    r = s.get(f"{API}/civilizations/{cid}", timeout=20)
    assert r.status_code == 200, r.text
    d = r.json()
    for key in ["id", "name", "region", "coords", "era_start", "era_end", "summary", "timeline", "key_figures", "sources"]:
        assert key in d, f"{cid} missing {key}"
    assert d["id"] == cid
    assert isinstance(d["timeline"], list) and len(d["timeline"]) > 0
    assert isinstance(d["key_figures"], list)
    assert isinstance(d["sources"], list) and len(d["sources"]) > 0


# ---------- Diaspora: 19 incl. 6 new ----------
NEW_DIASPORA = [
    "afro-venezuelan", "afro-dominican", "afro-canadian",
    "afro-ecuadorian", "afro-italian", "afro-iranian",
]


def test_diaspora_count_19(s):
    r = s.get(f"{API}/diaspora-communities", timeout=20)
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 19, f"expected 19 diaspora, got {len(data)}"
    ids = {d["id"] for d in data}
    for did in NEW_DIASPORA:
        assert did in ids


@pytest.mark.parametrize("did", NEW_DIASPORA)
def test_diaspora_detail_payload(s, did):
    r = s.get(f"{API}/diaspora-communities/{did}", timeout=20)
    assert r.status_code == 200, r.text
    d = r.json()
    for key in ["id", "name", "country", "region", "coords", "era_start", "era_end",
                "summary", "origin_routes", "ethnicities", "languages",
                "religions", "culture", "story", "modern", "sources"]:
        assert key in d, f"{did} missing {key}"
    assert d["id"] == did
    assert isinstance(d["origin_routes"], list)
    assert isinstance(d["sources"], list) and len(d["sources"]) > 0


# ---------- Places: 20 ----------
PLACE_IDS = ["robben-island", "elmina", "sankore", "rova", "axum-stelae", "fort-jesus"]


def test_places_count_20(s):
    r = s.get(f"{API}/places", timeout=20)
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 20, f"expected 20 places, got {len(data)}"
    for p in data:
        for k in ["id", "name", "type", "coords", "era", "blurb"]:
            assert k in p


@pytest.mark.parametrize("pid", PLACE_IDS)
def test_place_detail(s, pid):
    r = s.get(f"{API}/places/{pid}", timeout=20)
    assert r.status_code == 200, r.text
    d = r.json()
    for k in ["id", "name", "type", "coords", "era", "blurb", "sources"]:
        assert k in d, f"{pid} missing {k}"
    assert d["id"] == pid
    assert d["type"] in ("site", "city", "neighborhood")
    assert isinstance(d["coords"], list) and len(d["coords"]) == 2


def test_place_unknown_returns_404(s):
    r = s.get(f"{API}/places/unknown-xyz", timeout=20)
    assert r.status_code == 404


def test_robben_island_name(s):
    d = s.get(f"{API}/places/robben-island", timeout=20).json()
    assert d["name"] == "Robben Island"


# ---------- Regression ----------
def test_figures_count_69(s):
    r = s.get(f"{API}/figures", timeout=20)
    assert r.status_code == 200
    assert len(r.json()) == 69


def test_journey(s):
    r = s.get(f"{API}/journey", timeout=20)
    assert r.status_code == 200
    j = r.json()
    assert isinstance(j, (list, dict))


def test_mali_figures_2(s):
    r = s.get(f"{API}/civilizations/mali/figures", timeout=20)
    assert r.status_code == 200
    assert len(r.json()) == 2


def test_translate_works(s):
    r = s.post(f"{API}/translate", json={"text": "Hello", "target_lang": "fr"}, timeout=60)
    assert r.status_code == 200
    body = r.json()
    assert "translated" in body and body["translated"]
