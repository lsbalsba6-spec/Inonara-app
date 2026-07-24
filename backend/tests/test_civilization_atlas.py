"""Backend tests for AfroAtlas API (formerly Civilization Atlas)."""
import os
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")

CIV_IDS = ["mali", "songhai", "kush", "axum", "great-zimbabwe", "benin", "kongo", "swahili", "egypt",
           "asante", "zulu", "hausa", "ethiopia"]
MODULE_IDS = ["origins", "civilizations", "dispersal", "diaspora", "impact", "knowledge", "culture", "migration"]


@pytest.fixture(scope="module")
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


# ----- Root: brand rename to AfroAtlas -----
def test_root_afroatlas(s):
    r = s.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("app") == "AfroAtlas"
    assert data.get("version") == "1.1"
    assert data.get("modules") == 8


# ----- Modules regression -----
def test_modules(s):
    r = s.get(f"{BASE_URL}/api/modules")
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 8
    assert set(MODULE_IDS).issubset({m["id"] for m in data})


# ----- Civilizations: 13 total -----
def test_civilizations_list_13(s):
    r = s.get(f"{BASE_URL}/api/civilizations")
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 13, f"expected 13, got {len(data)}"
    ids = {c["id"] for c in data}
    for new_id in ("asante", "zulu", "hausa", "ethiopia"):
        assert new_id in ids


@pytest.mark.parametrize("civ_id", CIV_IDS)
def test_civilization_detail(s, civ_id):
    r = s.get(f"{BASE_URL}/api/civilizations/{civ_id}")
    assert r.status_code == 200, f"{civ_id}: {r.status_code}"
    data = r.json()
    assert data["id"] == civ_id
    for k in ("timeline", "key_figures", "sources"):
        assert k in data and isinstance(data[k], list) and len(data[k]) > 0, f"{civ_id} missing/empty {k}"


def test_civilization_not_found(s):
    r = s.get(f"{BASE_URL}/api/civilizations/atlantis")
    assert r.status_code == 404


# ----- Stories: 4 total incl new -----
def test_stories_list_has_new(s):
    r = s.get(f"{BASE_URL}/api/stories")
    assert r.status_code == 200
    data = r.json()
    assert len(data) >= 4
    ids = {x["id"] for x in data}
    assert "middle-passage" in ids
    assert "how-jazz-was-born" in ids


@pytest.mark.parametrize("sid", ["middle-passage", "how-jazz-was-born", "mansa-musa-hajj"])
def test_story_detail(s, sid):
    r = s.get(f"{BASE_URL}/api/stories/{sid}")
    assert r.status_code == 200
    data = r.json()
    assert data["id"] == sid
    assert isinstance(data.get("chapters"), list) and len(data["chapters"]) > 0


def test_story_not_found(s):
    r = s.get(f"{BASE_URL}/api/stories/no-such")
    assert r.status_code == 404


# ----- Culture (regression) -----
def test_culture_list(s):
    r = s.get(f"{BASE_URL}/api/culture")
    assert r.status_code == 200
    assert isinstance(r.json(), list) and len(r.json()) > 0


def test_culture_filter_music(s):
    r = s.get(f"{BASE_URL}/api/culture", params={"category": "music"})
    assert r.status_code == 200
    for item in r.json():
        assert item["category"] == "music"


# ----- Migration routes -----
def test_migration_routes(s):
    r = s.get(f"{BASE_URL}/api/migration-routes")
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 4


# ----- Search -----
def test_search_gold_civs(s):
    r = s.get(f"{BASE_URL}/api/search", params={"q": "gold"})
    assert r.status_code == 200
    res = r.json()["results"]
    assert len(res["civilizations"]) > 0


def test_search_jazz_story(s):
    r = s.get(f"{BASE_URL}/api/search", params={"q": "jazz"})
    assert r.status_code == 200
    res = r.json()["results"]
    story_ids = {x["id"] for x in res["stories"]}
    assert "how-jazz-was-born" in story_ids


def test_search_single_char_empty(s):
    r = s.get(f"{BASE_URL}/api/search", params={"q": "a"})
    assert r.status_code == 200
    res = r.json()["results"]
    assert res == {"modules": [], "civilizations": [], "stories": [], "culture": []}


def test_search_mali(s):
    r = s.get(f"{BASE_URL}/api/search", params={"q": "mali"})
    assert r.status_code == 200
    res = r.json()["results"]
    civ_ids = {c["id"] for c in res["civilizations"]}
    assert "mali" in civ_ids


# ----- AI ask (regression, basic only) -----
def test_ask_empty_question(s):
    r = s.post(f"{BASE_URL}/api/ask", json={"question": ""})
    assert r.status_code == 400


def test_ask_basic(s):
    r = s.post(f"{BASE_URL}/api/ask", json={"question": "Who was Mansa Musa? One sentence."}, timeout=60)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("answer") and len(data["answer"]) > 10
