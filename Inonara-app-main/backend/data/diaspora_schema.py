"""Diaspora entry schema — contract for the 'one entry per country/island' goal.

This does NOT change any existing DIASPORA_COMMUNITIES entries. It documents the
target schema for new entries going forward, provides a controlled vocabulary so
content stays consistent as more countries are added, and a lightweight validator
+ legacy alias map so we can measure real coverage against COUNTRY_REGISTRY today,
even though older entries used free-text/grouped country names.

---------------------------------------------------------------------------
TARGET SCHEMA for a DIASPORA_COMMUNITIES entry (new fields marked NEW):
---------------------------------------------------------------------------
{
    "id": str,                     # slug, unique
    "name": str,                   # e.g. "Afro-Brazilian"
    "country": str,                # display name, ONE country only (no "&"/",")
    "country_iso2": str,           # NEW — links to COUNTRY_REGISTRY, e.g. "BR"
    "region": str,                 # broad UI region grouping (existing field)
    "coords": [lat, lon],
    "era_start": int,              # year, negative = BCE
    "era_end": int,
    "period_tags": [str, ...],     # NEW — subset of PERIOD_TAGS below
    "population_estimate": {       # NEW — optional but preferred
        "value": int | None,
        "year": int | None,
        "source": str | None,
    },
    "summary": str,
    "origin_routes": [str, ...],
    "ethnicities": [str, ...],
    "languages": [str, ...],
    "religions": [str, ...],
    "culture": str,
    "story": str,
    "modern": str,
    "image_url": str,
    "sources": [str, ...],         # REQUIRED, non-empty — every entry must cite real sources
    "status": str,                 # NEW — one of STATUS_VALUES
}

---------------------------------------------------------------------------
Controlled vocabulary
---------------------------------------------------------------------------
"""

# Historical period a diaspora wave belongs to — lets the future "real map over time"
# feature filter/animate by period without guessing from era_start/era_end alone.
PERIOD_TAGS = [
    "prehistoric_migration",      # Out-of-Africa & early human dispersal (land bridges, sea-level driven)
    "ancient_antiquity",          # pre-500 CE movements (trade, conquest, ancient empires)
    "medieval_trans_saharan",     # trans-Saharan trade & Islamic-world connections
    "indian_ocean_trade",         # East African / Indian Ocean / Gulf routes
    "transatlantic_slave_trade",  # 1500s–1800s forced migration to the Americas
    "colonial_era",               # European colonization of Africa & indentured labor movements
    "post_independence",          # 1950s–1990s post-colonial migration
    "contemporary_migration",     # 1990s–today: economic, student, refugee, diplomatic
]

# Coverage/quality flag per entry — lets us report real progress toward "every country".
STATUS_VALUES = [
    "documented",   # full entry, sourced, reviewed
    "stub",         # placeholder entry, needs sourcing/expansion
    "planned",      # not yet written
]

REQUIRED_FIELDS = [
    "id", "name", "country", "country_iso2", "coords",
    "era_start", "era_end", "summary", "sources", "status",
]


def validate_entry(entry: dict) -> list:
    """Return a list of human-readable problems with a diaspora entry. Empty = valid.

    Entries with "scope": "regional" are legitimate multi-country thematic syntheses
    (e.g. "Afro-Caribbean", "Indian Ocean African Diasporas") rather than single-country
    pages, and are exempt from the country_iso2 and single-country requirements below —
    they still must have sources and a status.
    """
    problems = []
    is_regional = entry.get("scope") == "regional"

    required_fields = [f for f in REQUIRED_FIELDS if not (is_regional and f == "country_iso2")]
    for field in required_fields:
        if field not in entry or entry[field] in (None, "", []):
            problems.append(f"missing or empty required field: {field}")

    if "sources" in entry and isinstance(entry["sources"], list) and len(entry["sources"]) == 0:
        problems.append("sources must be a non-empty list — every claim needs a citation")

    if "status" in entry and entry["status"] not in STATUS_VALUES:
        problems.append(f"status '{entry.get('status')}' not in {STATUS_VALUES}")

    if "period_tags" in entry:
        bad = [p for p in entry["period_tags"] if p not in PERIOD_TAGS]
        if bad:
            problems.append(f"unknown period_tags: {bad}")

    country = entry.get("country", "")
    known_single_territory_names = {
        "Saint Helena, Ascension and Tristan da Cunha",
        "Bonaire, Sint Eustatius and Saba",
        "Palestine, State of",
    }
    if not is_regional and country not in known_single_territory_names and any(sep in country for sep in ["&", ",", "/"]):
        problems.append(
            f"country field '{country}' looks like a grouped/multi-country string — "
            "split into one entry per country for the coverage model"
        )

    return problems


# ---------------------------------------------------------------------------
# Legacy alias map: today's (pre-schema) free-text/grouped "country" strings ->
# ISO alpha-2 code(s) in COUNTRY_REGISTRY. Lets coverage_report.py measure real
# progress against the existing 40 entries without rewriting them yet.
# ---------------------------------------------------------------------------
LEGACY_COUNTRY_ALIASES = {
    "Brazil": ["BR"],
    "Colombia": ["CO"],
    "Cuba": ["CU"],
    "Germany": ["DE"],
    "Haiti": ["HT"],
    "India & Pakistan": ["IN", "PK"],
    "India / Pakistan": ["IN", "PK"],
    "Iraq, Saudi Arabia, Oman, Kuwait, Yemen": ["IQ", "SA", "OM", "KW", "YE"],
    "Jamaica, Trinidad, Barbados, Guyana": ["JM", "TT", "BB", "GY"],
    "Mexico": ["MX"],
    "Peru": ["PE"],
    "Réunion, Mauritius, Madagascar, Gulf": ["RE", "MU", "MG"],
    "United Kingdom & France": ["GB", "FR"],
    "United States": ["US"],
    "Canada": ["CA"],
    "Dominican Republic": ["DO"],
    "Ecuador": ["EC"],
    "Iran": ["IR"],
    "Italy": ["IT"],
    "Venezuela": ["VE"],
    "France": ["FR"],
    "Mexico & United States": ["MX", "US"],
    "Philippines": ["PH"],
    "Argentina": ["AR"],
}

__all__ = [
    "PERIOD_TAGS",
    "STATUS_VALUES",
    "REQUIRED_FIELDS",
    "validate_entry",
    "LEGACY_COUNTRY_ALIASES",
]
