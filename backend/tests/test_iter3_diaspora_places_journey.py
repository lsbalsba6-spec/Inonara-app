"""Backend tests for AfroAtlas iteration 3: diaspora communities, places, journey, fusion culture."""
import os
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")

DIASPORA_IDS = [
    "afro-brazilian", "african-american", "afro-caribbean", "afro-cuban",
    "afro-haitian", "afro-colombian", "afro-european", "afro-indian-ocean",
]
NEW_CULTURE_IDS = ["gnawa", "tango", "afrobeats", "cumbia", "hiphop-fusion", "candombe"]


@pytest.fixture(scope="module")
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


# --- Diaspora communities ---
def test_diaspora_list_8(s):
    r = s.get(f"{BASE_URL}/api/diaspora-communities")
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 8
    assert set(DIASPORA_IDS) == {d["id"] for d in data}
    for d in data:
        for k in ("name", "country", "region", "coords", "summary", "image_url"):
            assert d.get(k), f"{d['id']} missing {k}"


@pytest.mark.parametrize("did", DIASPORA_IDS)
def test_diaspora_detail(s, did):
    r = s.get(f"{BASE_URL}/api/diaspora-communities/{did}")
    assert r.status_code == 200, f"{did}: {r.status_code}"
    d = r.json()
    assert d["id"] == did
    for k in ("origin_routes", "ethnicities", "languages", "religions", "sources"):
        assert isinstance(d.get(k), list) and len(d[k]) > 0, f"{did} missing/empty {k}"
    for k in ("culture", "story", "modern"):
        assert isinstance(d.get(k), str) and len(d[k]) > 0, f"{did} missing {k}"


def test_diaspora_not_found(s):
    r = s.get(f"{BASE_URL}/api/diaspora-communities/unknown")
    assert r.status_code == 404


# --- Places ---
def test_places_12(s):
    r = s.get(f"{BASE_URL}/api/places")
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 12
    for p in data:
        for k in ("id", "name", "coords"):
            assert p.get(k), f"place missing {k}: {p}"


# --- Journey ---
def test_journey(s):
    r = s.get(f"{BASE_URL}/api/journey")
    assert r.status_code == 200
    j = r.json()
    for k in ("id", "title", "subtitle", "stops"):
        assert j.get(k), f"journey missing {k}"
    assert len(j["stops"]) == 4
    for st in j["stops"]:
        for k in ("heading", "era", "place", "story", "link", "image_url"):
            assert st.get(k), f"stop missing {k}: {st}"


# --- Culture: 18 incl new fusion ---
def test_culture_18_with_fusion(s):
    r = s.get(f"{BASE_URL}/api/culture")
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 18, f"expected 18 got {len(data)}"
    ids = {c["id"] for c in data}
    for cid in NEW_CULTURE_IDS:
        assert cid in ids, f"missing culture {cid}"


# --- Search regression: jazz story + cuba diaspora ---
def test_search_jazz_still_returns_story(s):
    r = s.get(f"{BASE_URL}/api/search", params={"q": "jazz"})
    assert r.status_code == 200
    res = r.json()["results"]
    assert "how-jazz-was-born" in {x["id"] for x in res["stories"]}


def test_search_cuba_returns_afro_cuban(s):
    r = s.get(f"{BASE_URL}/api/search", params={"q": "cuba"})
    assert r.status_code == 200
    res = r.json()["results"]
    assert "diaspora" in res
    assert "afro-cuban" in {d["id"] for d in res["diaspora"]}


# --- Light regression ---
def test_root_modules_civs_stories(s):
    assert s.get(f"{BASE_URL}/api/").status_code == 200
    assert len(s.get(f"{BASE_URL}/api/civilizations").json()) == 13
    assert len(s.get(f"{BASE_URL}/api/stories").json()) == 4
    assert len(s.get(f"{BASE_URL}/api/modules").json()) == 8
