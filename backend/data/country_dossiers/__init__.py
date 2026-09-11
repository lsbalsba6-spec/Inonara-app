"""Published AfroAtlas country master dossiers.

The historical South Africa/Botswana assembly remains isolated in `_legacy` so
new country dossiers can be registered incrementally without rewriting that
large merge layer on every addition.
"""

from ._legacy import COUNTRY_DOSSIERS, SOUTH_AFRICA_DOSSIER, country_dossier_index
from .namibia import NAMIBIA_DOSSIER

COUNTRY_DOSSIERS[NAMIBIA_DOSSIER["iso2"]] = NAMIBIA_DOSSIER

__all__ = [
    "COUNTRY_DOSSIERS",
    "SOUTH_AFRICA_DOSSIER",
    "NAMIBIA_DOSSIER",
    "country_dossier_index",
]
