from .south_africa import SOUTH_AFRICA_DOSSIER as SOUTH_AFRICA_BASE_DOSSIER
from .south_africa_deep_history import enrich_south_africa_dossier
from .south_africa_culture_heritage import enrich_south_africa_culture_heritage
from .south_africa_figures_science_environment import enrich_south_africa_figures_science_environment

SOUTH_AFRICA_DOSSIER = enrich_south_africa_figures_science_environment(
    enrich_south_africa_culture_heritage(
        enrich_south_africa_dossier(SOUTH_AFRICA_BASE_DOSSIER)
    )
)

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
