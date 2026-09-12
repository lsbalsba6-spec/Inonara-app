"""Published AfroAtlas country master dossiers."""

from ._legacy import COUNTRY_DOSSIERS, SOUTH_AFRICA_DOSSIER, country_dossier_index
from .namibia import NAMIBIA_DOSSIER
from .southern_africa_completion_v24 import apply_completion
from .south_africa_completion_v25 import apply_south_africa_v25

COUNTRY_DOSSIERS[NAMIBIA_DOSSIER["iso2"]] = NAMIBIA_DOSSIER
for _iso in ("ZA", "NA", "BW"):
    if _iso in COUNTRY_DOSSIERS:
        apply_completion(COUNTRY_DOSSIERS[_iso])

if "ZA" in COUNTRY_DOSSIERS:
    apply_south_africa_v25(COUNTRY_DOSSIERS["ZA"])

__all__ = ["COUNTRY_DOSSIERS", "SOUTH_AFRICA_DOSSIER", "NAMIBIA_DOSSIER", "country_dossier_index"]
