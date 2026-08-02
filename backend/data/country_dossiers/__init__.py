from .south_africa import SOUTH_AFRICA_DOSSIER
from .south_africa_timeline_economy import SOUTH_AFRICA_TIMELINE_ECONOMY
from .south_africa_society_state import SOUTH_AFRICA_SOCIETY_STATE
from .south_africa_deep_history import DEEP_HISTORY, DEEP_HISTORY_SOURCES
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
