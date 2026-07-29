from .south_africa import SOUTH_AFRICA_DOSSIER

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
