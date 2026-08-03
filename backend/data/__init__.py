"""AfroAtlas content data package — single source of truth.

Consolidates the fragmented seed_*.py modules behind one clean import surface.
server.py should import EVERYTHING content-related from here, not from seed_*.

This module is a thin re-export + merge layer. The raw curated data still lives
in /app/backend/seed_*.py (each module ~200–500 lines), but anything that
mutates / merges / backfills is done exactly once, here.
"""

from seed_data import (
    MODULES,
    CIVILIZATIONS as _CIVS_BASE,
    STORIES,
    CULTURE_ITEMS as _CULTURE_BASE,
    MIGRATION_ROUTES,
)
from seed_extended import (
    DIASPORA_COMMUNITIES as _DIASPORA_BASE,
    PLACES as _PLACES_BASE,
    LINEAGE_JOURNEY,
    EXTRA_CULTURE_ITEMS,
    ETHNIC_GROUPS,
)
from seed_figures import FIGURES as _FIGURES_BASE, FIGURE_CIVS, _representative_year
from seed_figure_wiki import FIGURE_WIKIPEDIA
from seed_expansion_v2 import EXTRA_CIVILIZATIONS, EXTRA_DIASPORA, EXTRA_PLACES
from seed_expansion_v3 import (
    EXTRA_CIVILIZATIONS_V3,
    EXTRA_DIASPORA_V3,
    PLACE_SOURCES_BACKFILL,
)
from .countries_registry import COUNTRY_REGISTRY, ANCESTRAL_DEEP_DIVE_IDS
from .historical_polities import HISTORICAL_POLITIES
from .paleo_geography import PALEO_GEOGRAPHY
from .plate_tectonics import PLATE_TECTONICS_EPOCHS
from .africa_origins import AFRICA_ORIGIN_COUNTRIES
from .world_diaspora import WORLD_DIASPORA_COMMUNITIES
from .country_dossiers import COUNTRY_DOSSIERS, country_dossier_index

from .south_africa_visuals_v8 import SOUTH_AFRICA_VISUALS_V8

from .country_dossiers.south_africa_editorial_expansion_v9 import SOUTH_AFRICA_EDITORIAL_EXPANSION_V9

from .country_dossiers.south_africa_expansion_v10 import SOUTH_AFRICA_EXPANSION_V10

from .country_dossiers.south_africa_expansion_v13 import SOUTH_AFRICA_EXPANSION_V13

from .country_dossiers.south_africa_expansion_v15 import SOUTH_AFRICA_EXPANSION_V15

from .country_dossiers.south_africa_expansion_v16 import SOUTH_AFRICA_EXPANSION_V16

from .country_dossiers.south_africa_grand_pack_v17 import SOUTH_AFRICA_GRAND_PACK_V17

from .south_africa_ecosystem_complete import (
    SA_CIVILIZATIONS, SA_FIGURES, SA_FIGURE_CIVS, SA_FIGURE_WIKIPEDIA,
    SA_PEOPLE, SA_CULTURE, SA_STORIES, SA_PLACES, SA_JOURNEY_STOPS,
    SA_TIMELINE_EVENTS,
)

from .diaspora_schema import (
    PERIOD_TAGS,
    STATUS_VALUES,
    validate_entry as validate_diaspora_entry,
    LEGACY_COUNTRY_ALIASES,
)

# --- Optional v4 expansion (added 2026-02): scientists/inventors + new places + story ---
try:
    from seed_expansion_v4 import (
        EXTRA_FIGURES_V4,
        EXTRA_FIGURE_CIVS_V4,
        EXTRA_FIGURE_WIKI_V4,
        EXTRA_PLACES_V4,
        EXTRA_STORIES_V4,
    )
except ImportError:  # pragma: no cover — v4 is optional
    EXTRA_FIGURES_V4 = []
    EXTRA_FIGURE_CIVS_V4 = {}
    EXTRA_FIGURE_WIKI_V4 = {}
    EXTRA_PLACES_V4 = []
    EXTRA_STORIES_V4 = []

# --- Optional v5 expansion (added 2026-02): architects + contemporary scientists ---
try:
    from seed_expansion_v5 import (
        EXTRA_FIGURES_V5,
        EXTRA_FIGURE_CIVS_V5,
        EXTRA_FIGURE_WIKI_V5,
    )
except ImportError:  # pragma: no cover — v5 is optional
    EXTRA_FIGURES_V5 = []
    EXTRA_FIGURE_CIVS_V5 = {}
    EXTRA_FIGURE_WIKI_V5 = {}

# --- Optional v6 expansion (added 2026-02): international narrative journeys ---
try:
    from seed_expansion_v6 import EXTRA_STORIES_V6
except ImportError:  # pragma: no cover — v6 is optional
    EXTRA_STORIES_V6 = []

# --- Optional v7 expansion (added 2026-02): 'Vérités Cachées' — Part 2 of both inventory PDFs ---
try:
    from seed_expansion_v7 import (
        EXTRA_CIVILIZATIONS_V7,
        EXTRA_FIGURES_V7,
        EXTRA_PLACES_V7,
        EXTRA_DIASPORA_V7,
        EXTRA_ETHNIC_GROUPS_V7,
        EXTRA_STORIES_V7,
        EXTRA_CULTURE_V7,
        EXTRA_FIGURE_CIVS_V7,
        EXTRA_FIGURE_WIKI_V7,
    )
except ImportError:  # pragma: no cover — v7 is optional
    EXTRA_CIVILIZATIONS_V7 = []
    EXTRA_FIGURES_V7 = []
    EXTRA_PLACES_V7 = []
    EXTRA_DIASPORA_V7 = []
    EXTRA_ETHNIC_GROUPS_V7 = []
    EXTRA_STORIES_V7 = []
    EXTRA_CULTURE_V7 = []
    EXTRA_FIGURE_CIVS_V7 = {}
    EXTRA_FIGURE_WIKI_V7 = {}


# ---- Build the consolidated, immutable-ish content arrays ----
CIVILIZATIONS = _CIVS_BASE + EXTRA_CIVILIZATIONS + EXTRA_CIVILIZATIONS_V3 + EXTRA_CIVILIZATIONS_V7 + SA_CIVILIZATIONS
DIASPORA_COMMUNITIES = _DIASPORA_BASE + EXTRA_DIASPORA + EXTRA_DIASPORA_V3 + EXTRA_DIASPORA_V7 + WORLD_DIASPORA_COMMUNITIES
PLACES = _PLACES_BASE + EXTRA_PLACES + EXTRA_PLACES_V4 + EXTRA_PLACES_V7 + SA_PLACES
CULTURE_ITEMS = _CULTURE_BASE + EXTRA_CULTURE_ITEMS + EXTRA_CULTURE_V7 + SA_CULTURE
FIGURES = _FIGURES_BASE + EXTRA_FIGURES_V4 + EXTRA_FIGURES_V5 + EXTRA_FIGURES_V7 + SA_FIGURES
STORIES = STORIES + EXTRA_STORIES_V4 + EXTRA_STORIES_V6 + EXTRA_STORIES_V7 + SA_STORIES  # noqa: F811
ETHNIC_GROUPS = ETHNIC_GROUPS + EXTRA_ETHNIC_GROUPS_V7 + SA_PEOPLE  # noqa: F811

# Publish South African trajectory stops in chronological order.
LINEAGE_JOURNEY = {**LINEAGE_JOURNEY, "stops": sorted(
    LINEAGE_JOURNEY.get("stops", []) + SA_JOURNEY_STOPS,
    key=lambda stop: stop.get("year", -10**12),
)}


# South Africa visual enrichment V8
def _apply_visual_metadata(items, metadata):
    for item in items:
        item_id = item.get("id")
        if item_id in metadata:
            item.update(metadata[item_id])

_apply_visual_metadata(FIGURES, SOUTH_AFRICA_VISUALS_V8["figures"])
_apply_visual_metadata(CIVILIZATIONS, SOUTH_AFRICA_VISUALS_V8["civilizations"])
_apply_visual_metadata(ETHNIC_GROUPS, SOUTH_AFRICA_VISUALS_V8["people"])
_apply_visual_metadata(PLACES, SOUTH_AFRICA_VISUALS_V8["places"])
_apply_visual_metadata(STORIES, SOUTH_AFRICA_VISUALS_V8["stories"])
_apply_visual_metadata(CULTURE_ITEMS, SOUTH_AFRICA_VISUALS_V8["culture"])
_apply_visual_metadata(LINEAGE_JOURNEY.get("stops", []), SOUTH_AFRICA_VISUALS_V8["journey"])


# South Africa global additions V9
_existing_place_ids_v9 = {item.get("id") for item in PLACES}
PLACES.extend(item for item in SOUTH_AFRICA_EDITORIAL_EXPANSION_V9["cities"] if item.get("id") not in _existing_place_ids_v9)

_existing_figure_ids_v9 = {item.get("id") for item in FIGURES}
FIGURES.extend(
    {
        "id": item["id"],
        "name": item["name"],
        "category": "scientists" if "Chimie" in item["field"] else "athletes" if "Sport" in item["field"] else "artists",
        "era": "Afrique du Sud contemporaine",
        "region": "South Africa",
        "summary": item["reason"],
        "story": " ".join(item.get("paragraphs", [])),
        "legacy": item.get("legacy", ""),
        "sources": item.get("sources", []),
        "wikipedia_title": item.get("wikipedia_title"),
        "image_source_url": item.get("image_source_url"),
        "image_credit": item.get("image_credit"),
    }
    for item in SOUTH_AFRICA_EDITORIAL_EXPANSION_V9["figures"]
    if item.get("id") not in _existing_figure_ids_v9
)

_existing_culture_ids_v9 = {item.get("id") for item in CULTURE_ITEMS}
CULTURE_ITEMS.extend(
    {
        "id": item["id"],
        "category": "food" if "Cuisine" in item["topic"] else "music" if "Danse" in item["topic"] else "clothing" if "Mode" in item["topic"] else "ritual",
        "region": "Southern Africa",
        "title": item["topic"],
        "blurb": item["text"],
        "wikipedia_title": item.get("wikipedia_title"),
        "image_source_url": item.get("image_source_url"),
        "image_credit": item.get("image_credit"),
    }
    for item in SOUTH_AFRICA_EDITORIAL_EXPANSION_V9["culture"]
    if item.get("id") not in _existing_culture_ids_v9
)


# South Africa global additions V10
_existing_places_v10 = {item.get("id") for item in PLACES}
PLACES.extend(item for item in SOUTH_AFRICA_EXPANSION_V10["places"] if item.get("id") not in _existing_places_v10)

_existing_figures_v10 = {item.get("id") for item in FIGURES}
FIGURES.extend(
    {
        "id": item["id"],
        "name": item["name"],
        "category": "leaders" if "Politique" in item["field"] or "Militantisme" in item["field"] else "intellectuals",
        "era": "XXe–XXIe siècles",
        "region": "South Africa",
        "summary": item["reason"],
        "story": " ".join(item.get("paragraphs", [])),
        "legacy": item.get("legacy", ""),
        "sources": item.get("sources", []),
        "wikipedia_title": item.get("wikipedia_title"),
        "image_source_url": item.get("image_source_url"),
        "image_credit": item.get("image_credit"),
    }
    for item in SOUTH_AFRICA_EXPANSION_V10["figures"]
    if item.get("id") not in _existing_figures_v10
)

_existing_timeline_v10 = {item.get("id") for item in SA_TIMELINE_EVENTS}
SA_TIMELINE_EVENTS.extend(
    item for item in SOUTH_AFRICA_EXPANSION_V10["timeline"]
    if item.get("id") not in _existing_timeline_v10
)


# South Africa global additions V13
_existing_places_v13 = {item.get("id") for item in PLACES}
PLACES.extend(
    item for item in SOUTH_AFRICA_EXPANSION_V13["places"]
    if item.get("id") not in _existing_places_v13
)

_existing_figures_v13 = {item.get("id") for item in FIGURES}
FIGURES.extend(
    {
        "id": item["id"],
        "name": item["name"],
        "category": "artists" if "Poésie" in item["field"] else "intellectuals" if "Médecine" in item["field"] else "leaders",
        "era": "XXe–XXIe siècles",
        "region": "South Africa",
        "summary": item["reason"],
        "story": " ".join(item.get("paragraphs", [])),
        "legacy": item.get("legacy", ""),
        "sources": item.get("sources", []),
        "wikipedia_title": item.get("wikipedia_title"),
        "image_source_url": item.get("image_source_url"),
        "image_credit": item.get("image_credit"),
    }
    for item in SOUTH_AFRICA_EXPANSION_V13["figures"]
    if item.get("id") not in _existing_figures_v13
)

_existing_timeline_v13 = {item.get("id") for item in SA_TIMELINE_EVENTS}
SA_TIMELINE_EVENTS.extend(
    item for item in SOUTH_AFRICA_EXPANSION_V13["timeline"]
    if item.get("id") not in _existing_timeline_v13
)


# South Africa global additions V15
_existing_places_v15 = {item.get("id") for item in PLACES}
PLACES.extend(item for item in SOUTH_AFRICA_EXPANSION_V15["places"] if item.get("id") not in _existing_places_v15)

_existing_figures_v15 = {item.get("id") for item in FIGURES}
FIGURES.extend(
    {
        "id": item["id"],
        "name": item["name"],
        "category": "artists" if item["field"] in {"Littérature", "Musique et exil", "Photographie et activisme visuel"} else "leaders",
        "era": "XXe–XXIe siècles",
        "region": "South Africa",
        "summary": item["reason"],
        "story": " ".join(item.get("paragraphs", [])),
        "legacy": item.get("legacy", ""),
        "sources": item.get("sources", []),
        "wikipedia_title": item.get("wikipedia_title"),
        "image_source_url": item.get("image_source_url"),
        "image_credit": item.get("image_credit"),
    }
    for item in SOUTH_AFRICA_EXPANSION_V15["figures"]
    if item.get("id") not in _existing_figures_v15
)

_existing_people_v15 = {item.get("id") for item in ETHNIC_GROUPS}
ETHNIC_GROUPS.extend(
    {
        "id": item["id"],
        "name": item["name"],
        "homeland": item.get("region", ""),
        "coords": [-30.0, 25.0],
        "population": "Communautés contemporaines diverses",
        "language_family": "Niger-Congo ou familles khoesan selon le groupe",
        "summary": item.get("history", ""),
        "language": ", ".join(item.get("languages", [])),
        "religion": "Traditions ancestrales, christianismes et autres pratiques selon les communautés",
        "culture": "Voir la fiche détaillée",
        "diaspora": "Mobilités internes et régionales",
        "sources": item.get("sources", []),
        "wikipedia_title": item.get("wikipedia_title"),
        "image_source_url": item.get("image_source_url"),
        "image_credit": item.get("image_credit"),
    }
    for item in SOUTH_AFRICA_EXPANSION_V15["peoples"]
    if item.get("id") not in _existing_people_v15
)

_existing_culture_v15 = {item.get("id") for item in CULTURE_ITEMS}
CULTURE_ITEMS.extend(
    {
        "id": item["id"],
        "category": "music" if item["topic"] in {"Kwaito", "Amapiano", "Poésie de louange et izibongo"} else "food" if "Cuisine" in item["topic"] else "ritual",
        "region": "Southern Africa",
        "title": item["topic"],
        "blurb": item["text"],
        "wikipedia_title": item.get("wikipedia_title"),
        "image_source_url": item.get("image_source_url"),
        "image_credit": item.get("image_credit"),
    }
    for item in SOUTH_AFRICA_EXPANSION_V15["culture"]
    if item.get("id") not in _existing_culture_v15
)

_existing_timeline_v15 = {item.get("id") for item in SA_TIMELINE_EVENTS}
SA_TIMELINE_EVENTS.extend(
    item for item in SOUTH_AFRICA_EXPANSION_V15["timeline"]
    if item.get("id") not in _existing_timeline_v15
)


# South Africa global additions V16
_existing_places_v16 = {item.get("id") for item in PLACES}
PLACES.extend(item for item in SOUTH_AFRICA_EXPANSION_V16["places"] if item.get("id") not in _existing_places_v16)

_existing_timeline_v16 = {item.get("id") for item in SA_TIMELINE_EVENTS}
SA_TIMELINE_EVENTS.extend(
    item for item in SOUTH_AFRICA_EXPANSION_V16["timeline"]
    if item.get("id") not in _existing_timeline_v16
)


# South Africa global ecosystem V17
_gp17 = SOUTH_AFRICA_GRAND_PACK_V17

def _append_unique_v17(target, incoming):
    existing={item.get("id") for item in target}
    target.extend(item for item in incoming if item.get("id") not in existing)

_append_unique_v17(PLACES, _gp17["places"])
_append_unique_v17(STORIES, _gp17["stories"])
_append_unique_v17(SA_TIMELINE_EVENTS, _gp17["timeline"])
_append_unique_v17(LINEAGE_JOURNEY.setdefault("stops", []), _gp17["journey"])
LINEAGE_JOURNEY["stops"] = sorted(LINEAGE_JOURNEY["stops"], key=lambda x: x.get("year", 10**12))

_existing_figures_v17={x.get("id") for x in FIGURES}
FIGURES.extend({
    "id":x["id"], "name":x["name"],
    "category":"scientists" if any(k in x.get("field","") for k in ["Épidémiologie","Génétique","Paléoanthropologie","Technologie"]) else "athletes" if x.get("field") in ["Rugby","Natation"] else "artists" if any(k in x.get("field","") for k in ["Littérature","Musique","Arts"] ) else "leaders",
    "era":x.get("lifespan","XXe–XXIe siècles"), "region":"South Africa", "lifespan":x.get("lifespan"),
    "summary":x.get("reason"), "story":" ".join(x.get("paragraphs",[])), "legacy":x.get("legacy"),
    "sources":x.get("sources",[]), "wikipedia_title":x.get("wikipedia_title"), "image_source_url":x.get("image_source_url"), "image_credit":x.get("image_credit"), "visual_kind":x.get("visual_kind","photograph")
} for x in _gp17["figures"] if x.get("id") not in _existing_figures_v17)

_existing_people_v17={x.get("id") for x in ETHNIC_GROUPS}
ETHNIC_GROUPS.extend({
    "id":x["id"], "name":x["name"], "homeland":x.get("region",""), "coords":[-29.0,25.0],
    "population":"Communautés contemporaines diverses", "language_family":"Voir la fiche détaillée",
    "summary":x.get("history",""), "language":", ".join(x.get("languages",[])),
    "religion":"Pratiques diverses selon les communautés", "culture":"Voir la fiche pays détaillée",
    "diaspora":"Mobilités internes, régionales et internationales selon les communautés", "sources":x.get("sources",[]),
    "wikipedia_title":x.get("wikipedia_title"), "image_source_url":x.get("image_source_url"), "image_credit":x.get("image_credit"), "visual_kind":"photograph"
} for x in _gp17["peoples"] if x.get("id") not in _existing_people_v17)

# Backfill missing sources arrays on older PLACES entries
for _p in PLACES:
    if "sources" not in _p and _p["id"] in PLACE_SOURCES_BACKFILL:
        _p["sources"] = PLACE_SOURCES_BACKFILL[_p["id"]]

# Merge figure → civilization + wikipedia maps
FIGURE_CIVS = {**FIGURE_CIVS, **EXTRA_FIGURE_CIVS_V4, **EXTRA_FIGURE_CIVS_V5, **EXTRA_FIGURE_CIVS_V7, **SA_FIGURE_CIVS}
FIGURE_WIKIPEDIA = {**FIGURE_WIKIPEDIA, **EXTRA_FIGURE_WIKI_V4, **EXTRA_FIGURE_WIKI_V5, **EXTRA_FIGURE_WIKI_V7, **SA_FIGURE_WIKIPEDIA}


__all__ = [
    "MODULES",
    "CIVILIZATIONS",
    "DIASPORA_COMMUNITIES",
    "PLACES",
    "CULTURE_ITEMS",
    "FIGURES",
    "STORIES",
    "MIGRATION_ROUTES",
    "LINEAGE_JOURNEY",
    "ETHNIC_GROUPS",
    "FIGURE_CIVS",
    "FIGURE_WIKIPEDIA",
    "_representative_year",
    "COUNTRY_REGISTRY",
    "ANCESTRAL_DEEP_DIVE_IDS",
    "HISTORICAL_POLITIES",
    "PALEO_GEOGRAPHY",
    "PLATE_TECTONICS_EPOCHS",
    "AFRICA_ORIGIN_COUNTRIES",
    "PERIOD_TAGS",
    "STATUS_VALUES",
    "validate_diaspora_entry",
    "LEGACY_COUNTRY_ALIASES",
    "COUNTRY_DOSSIERS",
    "SA_TIMELINE_EVENTS",
]
