from .south_africa import SOUTH_AFRICA_DOSSIER
from .south_africa_timeline_economy import SOUTH_AFRICA_TIMELINE_ECONOMY
from .south_africa_society_state import SOUTH_AFRICA_SOCIETY_STATE
from .south_africa_deep_history import DEEP_HISTORY, DEEP_HISTORY_SOURCES
from .south_africa_editorial_expansion_v7 import SOUTH_AFRICA_EDITORIAL_EXPANSION_V7
from .south_africa_editorial_expansion_v5 import SOUTH_AFRICA_EDITORIAL_EXPANSION_V5
from .south_africa_editorial_expansion_v4 import SOUTH_AFRICA_EDITORIAL_EXPANSION_V4
from .south_africa_editorial_expansion_v3 import SOUTH_AFRICA_EDITORIAL_EXPANSION_V3
from .south_africa_editorial_expansion import apply_editorial_expansion

SOUTH_AFRICA_DOSSIER["interactive_timeline"] = SOUTH_AFRICA_TIMELINE_ECONOMY["interactive_timeline"]
SOUTH_AFRICA_DOSSIER["economy"] = SOUTH_AFRICA_TIMELINE_ECONOMY["economy"]
SOUTH_AFRICA_DOSSIER["scientific_library"] = SOUTH_AFRICA_TIMELINE_ECONOMY["scientificLibrary"]
_existing_source_ids = {item["id"] for item in SOUTH_AFRICA_DOSSIER.get("sources", [])}
SOUTH_AFRICA_DOSSIER.setdefault("sources", []).extend(
    item for item in SOUTH_AFRICA_TIMELINE_ECONOMY["additionalSources"] if item["id"] not in _existing_source_ids
)

SOUTH_AFRICA_DOSSIER["society"] = SOUTH_AFRICA_SOCIETY_STATE["society"]
SOUTH_AFRICA_DOSSIER["education_health"] = SOUTH_AFRICA_SOCIETY_STATE["education_health"]
SOUTH_AFRICA_DOSSIER["national_symbols"] = SOUTH_AFRICA_SOCIETY_STATE["national_symbols"]
SOUTH_AFRICA_DOSSIER["international_role"] = SOUTH_AFRICA_SOCIETY_STATE["international_role"]
_existing_source_ids = {item["id"] for item in SOUTH_AFRICA_DOSSIER.get("sources", [])}
SOUTH_AFRICA_DOSSIER.setdefault("sources", []).extend(
    item for item in SOUTH_AFRICA_SOCIETY_STATE["additionalSources"] if item["id"] not in _existing_source_ids
)


SOUTH_AFRICA_DOSSIER["deep_history"] = DEEP_HISTORY
SOUTH_AFRICA_DOSSIER["pre1652_map"] = DEEP_HISTORY.get("pre1652_map")
_existing_source_ids = {item["id"] for item in SOUTH_AFRICA_DOSSIER.get("sources", [])}
SOUTH_AFRICA_DOSSIER.setdefault("sources", []).extend(
    item for item in DEEP_HISTORY_SOURCES if item["id"] not in _existing_source_ids
)

apply_editorial_expansion(SOUTH_AFRICA_DOSSIER)


# Editorial expansion V3
_v3 = SOUTH_AFRICA_EDITORIAL_EXPANSION_V3

def _merge_unique(target, incoming):
    existing = {item.get("id") or item.get("name") or item.get("title") or item.get("topic") for item in target}
    target.extend(
        item for item in incoming
        if (item.get("id") or item.get("name") or item.get("title") or item.get("topic")) not in existing
    )

_merge_unique(SOUTH_AFRICA_DOSSIER.setdefault("figures", []), _v3["figures"])
_merge_unique(SOUTH_AFRICA_DOSSIER.setdefault("peoples", []), _v3["peoples"])
_merge_unique(SOUTH_AFRICA_DOSSIER.setdefault("culture", []), _v3["culture"])
_merge_unique(SOUTH_AFRICA_DOSSIER.setdefault("heritage", []), _v3["heritage"])
_merge_unique(SOUTH_AFRICA_DOSSIER.setdefault("education_health", {}).setdefault("education", {}).setdefault("items", []), _v3["systems"]["education"])
_merge_unique(SOUTH_AFRICA_DOSSIER.setdefault("education_health", {}).setdefault("health", {}).setdefault("items", []), _v3["systems"]["health"])
_merge_unique(SOUTH_AFRICA_DOSSIER.setdefault("economy", {}).setdefault("sections", []), _v3["systems"]["economy"])
_merge_unique(SOUTH_AFRICA_DOSSIER.setdefault("sources", []), _v3["additionalSources"])


# Editorial expansion V4
_v4 = SOUTH_AFRICA_EDITORIAL_EXPANSION_V4

def _merge_v4(target, incoming):
    existing = {item.get("id") or item.get("title") for item in target}
    target.extend(item for item in incoming if (item.get("id") or item.get("title")) not in existing)

law = SOUTH_AFRICA_DOSSIER.setdefault("law_memory", {})
memory_section = law.setdefault("memory_reconciliation", {"title": "Mémoire, vérité et réconciliation", "items": []})
_merge_v4(memory_section.setdefault("items", []), _v4["law_memory"])
_merge_v4(SOUTH_AFRICA_DOSSIER.setdefault("society", {}).setdefault("themes", []), _v4["society"])
_merge_v4(SOUTH_AFRICA_DOSSIER.setdefault("national_symbols", {}).setdefault("items", []), _v4["symbols"])
_merge_v4(SOUTH_AFRICA_DOSSIER.setdefault("international_role", {}).setdefault("memberships", []), _v4["international"])


# Editorial expansion V5
_v5 = SOUTH_AFRICA_EDITORIAL_EXPANSION_V5

def _merge_v5(target, incoming):
    existing = {item.get("id") or item.get("title") or item.get("name") for item in target}
    target.extend(item for item in incoming if (item.get("id") or item.get("title") or item.get("name")) not in existing)

_merge_v5(SOUTH_AFRICA_DOSSIER.setdefault("figures", []), _v5["figures"])
_merge_v5(SOUTH_AFRICA_DOSSIER.setdefault("education_health", {}).setdefault("education", {}).setdefault("items", []), _v5["education"])
_merge_v5(SOUTH_AFRICA_DOSSIER.setdefault("education_health", {}).setdefault("health", {}).setdefault("items", []), _v5["health"])
_merge_v5(SOUTH_AFRICA_DOSSIER.setdefault("economy", {}).setdefault("sections", []), _v5["economy"])
_merge_v5(SOUTH_AFRICA_DOSSIER.setdefault("sources", []), _v5["additionalSources"])
SOUTH_AFRICA_DOSSIER["cross_links"] = _v5["cross_links"]


# Editorial expansion V7
_v7 = SOUTH_AFRICA_EDITORIAL_EXPANSION_V7

def _merge_v7(target, incoming):
    existing = {item.get("id") or item.get("title") or item.get("name") or item.get("topic") for item in target}
    target.extend(item for item in incoming if (item.get("id") or item.get("title") or item.get("name") or item.get("topic")) not in existing)

_merge_v7(SOUTH_AFRICA_DOSSIER.setdefault("figures", []), _v7["figures"])
_merge_v7(SOUTH_AFRICA_DOSSIER.setdefault("culture", []), _v7["culture"])
_merge_v7(SOUTH_AFRICA_DOSSIER.setdefault("environment", {}).setdefault("items", []), _v7["environment"])
_merge_v7(SOUTH_AFRICA_DOSSIER.setdefault("media", {}).setdefault("items", []), _v7["media"])
_merge_v7(SOUTH_AFRICA_DOSSIER.setdefault("sources", []), _v7["additionalSources"])

COUNTRY_DOSSIERS = {
    SOUTH_AFRICA_DOSSIER["iso2"]: SOUTH_AFRICA_DOSSIER,
}


def country_dossier_index():
    """Return lightweight metadata for every published country master dossier."""
    return [
        {
            "iso2": dossier["iso2"],
            "iso3": dossier.get("iso3"),
            "slug": dossier["slug"],
            "name": dossier["name"],
            "region": dossier.get("region"),
            "status": dossier.get("status", "draft"),
            "last_reviewed": dossier.get("last_reviewed"),
        }
        for dossier in sorted(
            COUNTRY_DOSSIERS.values(),
            key=lambda item: item.get("name", {}).get("fr", item["iso2"]),
        )
    ]


__all__ = ["COUNTRY_DOSSIERS", "SOUTH_AFRICA_DOSSIER", "country_dossier_index"]
