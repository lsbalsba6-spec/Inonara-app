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
