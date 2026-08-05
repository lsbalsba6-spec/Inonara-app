from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import uuid
import hashlib
from datetime import datetime, timezone
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional

from data import (
    MODULES,
    CIVILIZATIONS,
    STORIES,
    CULTURE_ITEMS,
    MIGRATION_ROUTES,
    DIASPORA_COMMUNITIES,
    PLACES,
    LINEAGE_JOURNEY,
    ETHNIC_GROUPS,
    FIGURES,
    FIGURE_CIVS,
    FIGURE_WIKIPEDIA,
    _representative_year,
    COUNTRY_REGISTRY,
    ANCESTRAL_DEEP_DIVE_IDS,
    AFRICA_ORIGIN_COUNTRIES,
    HISTORICAL_POLITIES,
    PALEO_GEOGRAPHY,
    PLATE_TECTONICS_EPOCHS,
    COUNTRY_DOSSIERS,
    country_dossier_index,
    SA_TIMELINE_EVENTS,
)
from db_seed import mirror_content_to_mongo

# PR3: the v2 (migrated HistoricalEntity schema) dataset is a generated JSON
# artifact (backend/scripts/migrate_historical_entities.py), not a Python
# data module — loaded lazily and cached, kept separate from
# HISTORICAL_POLITIES (v1), which remains the default/untouched source.
_HISTORICAL_ENTITIES_V2_CACHE = None


def _load_historical_entities_v2():
    global _HISTORICAL_ENTITIES_V2_CACHE
    if _HISTORICAL_ENTITIES_V2_CACHE is None:
        import json
        path = Path(__file__).parent / "data" / "historical_entities_migrated.json"
        if path.exists():
            _HISTORICAL_ENTITIES_V2_CACHE = json.loads(path.read_text())
        else:
            _HISTORICAL_ENTITIES_V2_CACHE = []
    return _HISTORICAL_ENTITIES_V2_CACHE

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="AfroAtlas API")
api_router = APIRouter(prefix="/api")

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')
ELEVENLABS_API_KEY = os.environ.get('ELEVENLABS_API_KEY')
DEFAULT_VOICE_ID = "nPczCjzI2devNBz1zQrb"  # ElevenLabs "Brian" — warm documentary narrator


# ---------- Models ----------
class AskRequest(BaseModel):
    session_id: Optional[str] = None
    question: str
    context_civ_id: Optional[str] = None


class AskResponse(BaseModel):
    session_id: str
    answer: str


# ---------- Content endpoints ----------
@api_router.get("/")
async def root():
    return {"app": "AfroAtlas", "version": "1.1", "modules": len(MODULES)}


@api_router.get("/modules")
async def get_modules():
    return MODULES


@api_router.get("/civilizations")
async def list_civilizations():
    # Return slim list (no heavy timeline content)
    return [
        {
            "id": c["id"],
            "name": c["name"],
            "region": c["region"],
            "coords": c["coords"],
            "era_start": c["era_start"],
            "era_end": c["era_end"],
            "summary": c["summary"],
            "image_url": c["image_url"],
        }
        for c in CIVILIZATIONS
    ]


@api_router.get("/civilizations/{civ_id}")
async def get_civilization(civ_id: str):
    for c in CIVILIZATIONS:
        if c["id"] == civ_id:
            return c
    raise HTTPException(status_code=404, detail="Civilization not found")


@api_router.get("/countries")
async def list_countries():
    """Full world registry (249 countries/territories) — used for coverage UI."""
    return COUNTRY_REGISTRY




@api_router.get("/country-dossiers")
async def list_country_dossiers():
    """Return a lightweight index of published country master dossiers."""
    return country_dossier_index()


@api_router.get("/country-dossiers/{country_iso2}")
async def get_country_dossier(country_iso2: str):
    dossier = COUNTRY_DOSSIERS.get(country_iso2.upper())
    if not dossier:
        raise HTTPException(status_code=404, detail="Country dossier not documented yet")
    return dossier


@api_router.get("/africa/origin-countries")
async def list_africa_origin_countries():
    """Slim list of documented African origin-country entries."""
    return [
        {
            "id": c["id"],
            "country": c["country"],
            "country_iso2": c["country_iso2"],
            "region": c["region"],
            "coords": c["coords"],
            "summary": c["summary"],
            "independence_year": c["independence_year"],
            "status": c["status"],
        }
        for c in AFRICA_ORIGIN_COUNTRIES
    ]


@api_router.get("/africa/origin-countries/{country_iso2}")
async def get_africa_origin_country(country_iso2: str):
    for c in AFRICA_ORIGIN_COUNTRIES:
        if c["country_iso2"].lower() == country_iso2.lower():
            return c
    raise HTTPException(status_code=404, detail="Origin-country entry not documented yet")


@api_router.get("/countries/{country_iso2}/ancestral-link")
async def get_country_ancestral_link(country_iso2: str):
    """Every country returns the universal Out-of-Africa story reference;
    countries with a distinct, separately sourced deep-ancestry finding also
    get that specific entry from DIASPORA_COMMUNITIES."""
    country = next((c for c in COUNTRY_REGISTRY if c["iso2"].lower() == country_iso2.lower()), None)
    if not country:
        raise HTTPException(status_code=404, detail="Country not found")

    out_of_africa_story = next((s for s in STORIES if s["id"] == "out-of-africa"), None)

    deep_dive_id = ANCESTRAL_DEEP_DIVE_IDS.get(country["iso2"])
    deep_dive_entry = None
    if deep_dive_id:
        deep_dive_entry = next((d for d in DIASPORA_COMMUNITIES if d["id"] == deep_dive_id), None)

    return {
        "country": country["display_name"],
        "country_iso2": country["iso2"],
        "universal_out_of_africa_story": out_of_africa_story,
        "distinct_deep_ancestry_entry": deep_dive_entry,
    }


@api_router.get("/historical-polities")
async def list_historical_polities():
    """Approximate historical empires/kingdoms/colonial powers for the Atlas
    map's historical mode (-3500 to 2025). Circles, not precise borders —
    see the module docstring in data/historical_polities.py.

    This is the DEFAULT (v1) data source. See /historical-entities-v2 for
    the migrated-schema version (PR3, opt-in via feature flag, frontend
    adapts it back to this exact response shape before rendering)."""
    return HISTORICAL_POLITIES


@api_router.get("/historical-entities-v2")
async def list_historical_entities_v2():
    """PR3: the same underlying data as /historical-polities, migrated to
    the richer HistoricalEntity schema (see frontend/src/lib/historicalTypes.js
    and backend/scripts/migrate_historical_entities.py). NOT used by default —
    the frontend only fetches this when the historicalDataSource=v2 feature
    flag is set (lib/featureFlags.js), and adapts it back to the v1 shape via
    lib/historicalEntityAdapter.js before rendering, so this endpoint existing
    changes nothing for users by default."""
    return _load_historical_entities_v2()


@api_router.get("/pilot-v3-gabon-central-africa")
async def get_pilot_v3_gabon_central_africa():
    """Prototype vertical pilot (Gabon/Central Africa) built on the core_v3
    graph model (Polity/Place/People/Event/Process/PeriodInterpretation +
    autonomous Source/Relation objects — see backend/data/core_v3/). NOT
    wired into the default map at all — the frontend only fetches this when
    the pilotV3=1 feature flag is set (lib/featureFlags.js), and renders it
    as an ADDITIVE overlay via lib/pilotV3Adapter.js, never replacing v1/v2.
    Returns the full corpus (entities, relations, and the editorial
    assertion registry) as-is; temporal/style resolution happens
    client-side (lib/pilotV3Resolver.js), matching how v1/v2 already do
    client-side era filtering."""
    from data.core_v3.pilot_gabon_central_africa import (
        PILOT_ENTITIES,
        PILOT_RELATIONS,
        REGISTRY,
    )
    return {
        "entities": list(PILOT_ENTITIES.values()),
        "relations": PILOT_RELATIONS,
        "registry": REGISTRY,
    }


@api_router.get("/paleo-geography")
async def list_paleo_geography():
    """Approximate prehistoric land bridges/coastlines (land bridges, sea-level
    driven) for the Atlas map's deep-time mode. See the module docstring in
    data/paleo_geography.py for scope and sourcing notes."""
    return PALEO_GEOGRAPHY


@api_router.get("/plate-tectonics")
async def list_plate_tectonics():
    """Purely geological continental-drift epochs (Pangaea to today). No
    human/migration/empire content belongs here — see the module docstring
    in data/plate_tectonics.py for scope and precision caveats."""
    return PLATE_TECTONICS_EPOCHS


@api_router.get("/stories")
async def list_stories():
    return [{"id": s["id"], "title": s["title"], "civilization_id": s["civilization_id"], "era": s["era"], "summary": s["summary"]} for s in STORIES]


@api_router.get("/stories/{story_id}")
async def get_story(story_id: str):
    for s in STORIES:
        if s["id"] == story_id:
            return s
    raise HTTPException(status_code=404, detail="Story not found")


@api_router.get("/culture")
async def list_culture(category: Optional[str] = None, region: Optional[str] = None):
    items = CULTURE_ITEMS
    if category:
        items = [i for i in items if i["category"] == category]
    if region:
        items = [i for i in items if region.lower() in i["region"].lower()]
    return items


_DIASPORA_DERIVED_ROUTES_CACHE = None


def _load_diaspora_derived_routes():
    global _DIASPORA_DERIVED_ROUTES_CACHE
    if _DIASPORA_DERIVED_ROUTES_CACHE is None:
        import json
        try:
            path = Path(__file__).parent / "data" / "diaspora_derived_routes.json"
            _DIASPORA_DERIVED_ROUTES_CACHE = json.loads(path.read_text())
        except FileNotFoundError:
            _DIASPORA_DERIVED_ROUTES_CACHE = []
    return _DIASPORA_DERIVED_ROUTES_CACHE


@api_router.get("/migration-routes")
async def get_migration_routes():
    """Returns the curated macro-routes (MIGRATION_ROUTES) PLUS one distinct
    line per (diaspora entry x documented origin region) pair — 175 as of
    this writing — generated from the already-sourced DIASPORA_COMMUNITIES
    data (see scripts/generate_diaspora_routes.py). Per explicit user
    requirement, these are never consolidated into a single summarizing
    line; each keeps its own era_start/era_end and sources."""
    return MIGRATION_ROUTES + _load_diaspora_derived_routes()


@api_router.get("/diaspora-communities")
async def list_diaspora():
    return [
        {
            "id": d["id"], "name": d["name"], "country": d["country"], "region": d["region"],
            "coords": d["coords"], "era_start": d["era_start"], "era_end": d["era_end"],
            "summary": d["summary"], "image_url": d["image_url"],
        }
        for d in DIASPORA_COMMUNITIES
    ]


@api_router.get("/diaspora-communities/{community_id}")
async def get_diaspora(community_id: str):
    for d in DIASPORA_COMMUNITIES:
        if d["id"] == community_id:
            return d
    raise HTTPException(status_code=404, detail="Diaspora community not found")


@api_router.get("/places")
async def list_places():
    return [{"id": p["id"], "name": p["name"], "type": p["type"], "coords": p["coords"], "era": p["era"], "blurb": p["blurb"]} for p in PLACES]


@api_router.get("/places/{place_id}")
async def get_place(place_id: str):
    for p in PLACES:
        if p["id"] == place_id:
            return p
    raise HTTPException(status_code=404, detail="Place not found")


@api_router.get("/journey")
async def get_journey():
    return LINEAGE_JOURNEY


@api_router.get("/ethnic-groups")
async def list_ethnic_groups():
    return ETHNIC_GROUPS


@api_router.get("/ethnic-groups/{group_id}")
async def get_ethnic_group(group_id: str):
    for g in ETHNIC_GROUPS:
        if g["id"] == group_id:
            return g
    raise HTTPException(status_code=404, detail="Ethnic group not found")


@api_router.get("/figures")
async def list_figures(category: Optional[str] = None):
    items = FIGURES
    if category:
        items = [f for f in items if f["category"] == category]
    return [
        {
            **{k: f[k] for k in ["id", "name", "category", "era", "region", "summary", "image_url"]},
            "wikipedia_title": FIGURE_WIKIPEDIA.get(f["id"]),
        }
        for f in items
    ]


@api_router.get("/figures/{figure_id}")
async def get_figure(figure_id: str):
    for f in FIGURES:
        if f["id"] == figure_id:
            out = dict(f)
            out["civilization_id"] = FIGURE_CIVS.get(figure_id)
            out["wikipedia_title"] = FIGURE_WIKIPEDIA.get(figure_id)
            return out
    raise HTTPException(status_code=404, detail="Figure not found")


@api_router.get("/figures-timeline")
async def figures_timeline():
    """Return all figures with a representative year for timeline placement."""
    out = []
    for f in FIGURES:
        y = _representative_year(f["era"])
        if y is None:
            continue
        out.append({
            "id": f["id"], "name": f["name"], "category": f["category"],
            "era": f["era"], "region": f["region"], "year": y,
            "summary": f["summary"], "image_url": f["image_url"],
        })
    out.extend(SA_TIMELINE_EVENTS)
    out.sort(key=lambda x: x["year"])
    return out


@api_router.get("/civilizations/{civ_id}/figures")
async def figures_for_civilization(civ_id: str):
    ids = [fid for fid, c in FIGURE_CIVS.items() if c == civ_id]
    return [
        {"id": f["id"], "name": f["name"], "category": f["category"], "era": f["era"], "summary": f["summary"], "image_url": f["image_url"]}
        for f in FIGURES if f["id"] in ids
    ]


@api_router.get("/search")
async def search(q: str = ""):
    """Global search across modules, civilizations, stories, and culture items."""
    query = (q or "").strip().lower()
    if not query or len(query) < 2:
        return {"query": q, "results": {"modules": [], "civilizations": [], "stories": [], "culture": []}}

    def hit(text: str) -> bool:
        return query in (text or "").lower()

    modules_r = [
        {"id": m["id"], "title": m["title"], "subtitle": m["subtitle"], "blurb": m["blurb"]}
        for m in MODULES
        if hit(m["title"]) or hit(m["subtitle"]) or hit(m["blurb"]) or hit(m.get("era", ""))
    ]

    civs_r = [
        {
            "id": c["id"], "name": c["name"], "region": c["region"],
            "summary": c["summary"], "image_url": c["image_url"],
        }
        for c in CIVILIZATIONS
        if hit(c["name"]) or hit(c["region"]) or hit(c["summary"])
        or any(hit(loc) for loc in c.get("modern_locations", []))
        or any(hit(p.get("name", "")) for p in c.get("key_figures", []))
    ]

    diaspora_r = [
        {"id": d["id"], "name": d["name"], "country": d["country"], "region": d["region"], "summary": d["summary"]}
        for d in DIASPORA_COMMUNITIES
        if hit(d["name"]) or hit(d["country"]) or hit(d["region"]) or hit(d["summary"])
        or any(hit(x) for x in d.get("ethnicities", []))
        or any(hit(x) for x in d.get("languages", []))
        or hit(d.get("culture", "")) or hit(d.get("story", ""))
    ]

    stories_r = [
        {"id": s["id"], "title": s["title"], "era": s["era"], "summary": s["summary"]}
        for s in STORIES
        if hit(s["title"]) or hit(s["summary"]) or hit(s["era"])
        or any(hit(ch.get("heading", "")) or hit(ch.get("body", "")) for ch in s.get("chapters", []))
    ]

    culture_r = [
        i for i in CULTURE_ITEMS
        if hit(i["title"]) or hit(i["region"]) or hit(i["category"]) or hit(i["blurb"])
    ]

    figures_r = [
        {"id": f["id"], "name": f["name"], "category": f["category"], "era": f["era"], "region": f["region"], "summary": f["summary"]}
        for f in FIGURES
        if hit(f["name"]) or hit(f["region"]) or hit(f["era"]) or hit(f["summary"]) or hit(f.get("story",""))
    ]

    return {
        "query": q,
        "results": {
            "modules": modules_r,
            "civilizations": civs_r,
            "stories": stories_r,
            "culture": culture_r,
            "diaspora": diaspora_r,
            "figures": figures_r,
        },
    }


# ---------- AI tutor ----------
SYSTEM_PROMPT = (
    "You are Atlas, an expert AI tutor for AfroAtlas — an educational platform on "
    "African origins of humanity, African civilizations, the African diaspora, and global cultural influence. "
    "Rules you MUST follow:\n"
    "1) Be rigorous and source-grounded. If a fact is contested, say so and name the leading scholarly positions.\n"
    "2) Separate clearly: scientific consensus, oral tradition, and religious interpretation.\n"
    "3) Never engage in racial pseudoscience, deterministic claims, or conspiracy content.\n"
    "4) Do not push political activism; remain neutral, precise, and respectful.\n"
    "5) Prefer concrete dates, names, places, and primary or peer-reviewed secondary sources.\n"
    "6) If you do not know, say so plainly.\n"
    "Tone: cinematic but grounded, educational but immersive. Keep answers concise (under ~220 words) unless asked for depth."
)


@api_router.post("/ask", response_model=AskResponse)
async def ask_atlas(req: AskRequest):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="EMERGENT_LLM_KEY not configured")
    if not req.question or not req.question.strip():
        raise HTTPException(status_code=400, detail="Question is required")

    session_id = req.session_id or str(uuid.uuid4())

    # Lightweight context injection
    context_block = ""
    if req.context_civ_id:
        for c in CIVILIZATIONS:
            if c["id"] == req.context_civ_id:
                context_block = (
                    f"\n\nCurrent context: the user is viewing '{c['name']}' ({c['region']}, "
                    f"{c['era_start']}–{c['era_end']}). Summary: {c['summary']}"
                )
                break

    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage

        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=session_id,
            system_message=SYSTEM_PROMPT + context_block,
        ).with_model("anthropic", "claude-sonnet-4-5-20250929")

        user_msg = UserMessage(text=req.question)
        answer = await chat.send_message(user_msg)
    except Exception as e:
        logging.exception("LLM call failed")
        raise HTTPException(status_code=502, detail=f"Atlas is unavailable: {e}")

    # Persist conversation (no _id leak)
    await db.atlas_chats.insert_one({
        "_record_id": str(uuid.uuid4()),
        "session_id": session_id,
        "question": req.question,
        "answer": answer,
        "context_civ_id": req.context_civ_id,
    })

    return AskResponse(session_id=session_id, answer=answer)


@api_router.get("/ask/history/{session_id}")
async def get_history(session_id: str):
    cursor = db.atlas_chats.find({"session_id": session_id}, {"_id": 0})
    return await cursor.to_list(200)


# ---------- AI translation with MongoDB cache ----------
class TranslateRequest(BaseModel):
    text: str
    target_lang: str  # 'fr' or 'en'


class TranslateResponse(BaseModel):
    text: str
    translated: str
    target_lang: str
    cached: bool


LANG_NAMES = {"fr": "French", "en": "English", "es": "Spanish", "pt": "Portuguese"}


@api_router.post("/translate", response_model=TranslateResponse)
async def translate(req: TranslateRequest):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="EMERGENT_LLM_KEY not configured")
    text = (req.text or "").strip()
    target = (req.target_lang or "en").lower()
    if not text:
        return TranslateResponse(text="", translated="", target_lang=target, cached=True)
    if target not in LANG_NAMES:
        raise HTTPException(status_code=400, detail="Unsupported target_lang")

    # Cache lookup
    key = hashlib.sha256(f"{target}::{text}".encode("utf-8")).hexdigest()
    cached = await db.translations.find_one({"_key": key}, {"_id": 0, "translated": 1})
    if cached and cached.get("translated"):
        return TranslateResponse(text=text, translated=cached["translated"], target_lang=target, cached=True)

    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        sys_msg = (
            f"You are a professional historical-content translator. Translate the user's text into {LANG_NAMES[target]}. "
            "Preserve historical terms, proper names, place names, dates, and citations exactly. "
            "Do not add commentary. Return ONLY the translated text."
        )
        chat = LlmChat(api_key=EMERGENT_LLM_KEY, session_id=f"tx-{key[:12]}", system_message=sys_msg).with_model("anthropic", "claude-sonnet-4-5-20250929")
        translated = await chat.send_message(UserMessage(text=text))
        translated = (translated or "").strip()
    except Exception as e:
        logging.exception("Translation failed")
        raise HTTPException(status_code=502, detail=f"Translation unavailable: {e}")

    await db.translations.update_one(
        {"_key": key},
        {"$set": {"_key": key, "target_lang": target, "translated": translated}},
        upsert=True,
    )
    return TranslateResponse(text=text, translated=translated, target_lang=target, cached=False)


# ---------- Narration (ElevenLabs) ----------
class NarrateRequest(BaseModel):
    text: str
    voice_id: Optional[str] = None


@api_router.post("/narrate")
async def narrate(req: NarrateRequest):
    if not ELEVENLABS_API_KEY:
        raise HTTPException(status_code=500, detail="ELEVENLABS_API_KEY not configured")
    text = (req.text or "").strip()
    if not text:
        raise HTTPException(status_code=400, detail="Text is required")
    if len(text) > 4000:
        text = text[:4000]
    voice_id = req.voice_id or DEFAULT_VOICE_ID

    key = hashlib.sha256(f"{voice_id}::{text}".encode("utf-8")).hexdigest()
    cached = await db.narrations.find_one({"_key": key}, {"_id": 0, "audio_b64": 1})
    if cached and cached.get("audio_b64"):
        return {"audio_url": f"data:audio/mpeg;base64,{cached['audio_b64']}", "cached": True}

    try:
        import base64
        from elevenlabs.client import ElevenLabs
        client = ElevenLabs(api_key=ELEVENLABS_API_KEY)
        audio_stream = client.text_to_speech.convert(
            text=text,
            voice_id=voice_id,
            model_id="eleven_multilingual_v2",
        )
        audio_data = b""
        for chunk in audio_stream:
            if chunk:
                audio_data += chunk
        audio_b64 = base64.b64encode(audio_data).decode()
    except Exception as e:
        logging.exception("ElevenLabs TTS failed")
        raise HTTPException(status_code=502, detail=f"Narration unavailable: {e}")

    await db.narrations.update_one(
        {"_key": key},
        {"$set": {"_key": key, "voice_id": voice_id, "audio_b64": audio_b64}},
        upsert=True,
    )
    return {"audio_url": f"data:audio/mpeg;base64,{audio_b64}", "cached": False}


# ---------- Atlas Digest ----------
class DigestSubscribe(BaseModel):
    email: str
    lang: Optional[str] = "en"


@api_router.post("/digest/subscribe")
async def digest_subscribe(req: DigestSubscribe):
    email = (req.email or "").strip().lower()
    if not email or "@" not in email or len(email) > 200:
        raise HTTPException(status_code=400, detail="Invalid email")
    lang = req.lang if req.lang in ("en", "fr") else "en"
    await db.digest_subscribers.update_one(
        {"email": email},
        {"$set": {"email": email, "lang": lang, "subscribed_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )
    return {"ok": True, "email": email, "lang": lang}


@api_router.get("/digest/preview")
async def digest_preview(lang: str = "en"):
    """Generate this week's Atlas Digest preview using Claude."""
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="EMERGENT_LLM_KEY not configured")
    import random
    week = datetime.now(timezone.utc).isocalendar().week
    seed = random.Random(week)
    figure = seed.choice(FIGURES)
    civ = seed.choice(CIVILIZATIONS)
    place = seed.choice(PLACES)

    cache_key = hashlib.sha256(f"digest::{lang}::w{week}".encode()).hexdigest()
    cached = await db.digest_cache.find_one({"_key": cache_key}, {"_id": 0, "html": 1})
    if cached and cached.get("html"):
        return {
            "week": week, "lang": lang, "cached": True,
            "html": cached["html"],
            "highlights": {"figure": figure["id"], "civilization": civ["id"], "place": place["id"]},
        }

    sys_msg = (
        f"You write a brief weekly digest email for AfroAtlas readers in {('French' if lang=='fr' else 'English')}. "
        "Tone: cinematic, grounded, intellectually generous, never patronising. "
        "Output valid HTML only (no markdown). Use simple tags: <h2>, <h3>, <p>, <em>, <a>. "
        "Keep total length under 350 words."
    )
    user_prompt = (
        f"Compose this week's digest. Open with a 1-sentence hook. Then three short sections — "
        f"FIGURE OF THE WEEK ({figure['name']}, {figure['era']}, {figure['region']}; summary: {figure['summary']}), "
        f"CIVILIZATION TO REVISIT ({civ['name']}, {civ['region']}; summary: {civ['summary']}), "
        f"PLACE WORTH VISITING ({place['name']}, {place['era']}; blurb: {place['blurb']}). "
        "End with a one-line invitation to open the atlas. Do not invent facts beyond these summaries."
    )
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        chat = LlmChat(api_key=EMERGENT_LLM_KEY, session_id=f"digest-w{week}-{lang}", system_message=sys_msg).with_model("anthropic", "claude-sonnet-4-5-20250929")
        html = await chat.send_message(UserMessage(text=user_prompt))
        html = (html or "").strip()
    except Exception as e:
        logging.exception("Digest generation failed")
        raise HTTPException(status_code=502, detail=f"Digest unavailable: {e}")

    await db.digest_cache.update_one(
        {"_key": cache_key},
        {"$set": {"_key": cache_key, "week": week, "lang": lang, "html": html}},
        upsert=True,
    )
    return {
        "week": week, "lang": lang, "cached": False, "html": html,
        "highlights": {"figure": figure["id"], "civilization": civ["id"], "place": place["id"]},
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')


@app.on_event("startup")
async def startup_mirror_content():
    """Mirror in-memory content into MongoDB on every boot (idempotent upsert).
    Wrapped in a short timeout so a missing/unreachable MongoDB (e.g. running
    this app without a database configured) can never block server startup —
    every endpoint except /api/atlas-chat/* works fine without Mongo at all."""
    try:
        counts = await asyncio.wait_for(mirror_content_to_mongo(db), timeout=5.0)
        logging.info("Content mirror complete: %s", counts)
    except asyncio.TimeoutError:
        logging.warning("MongoDB unreachable within 5s — skipping content mirror. "
                         "All endpoints work except /api/atlas-chat/* (chat history), which needs MongoDB.")
    except Exception as e:
        logging.exception("Content mirror failed (non-fatal): %s", e)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
