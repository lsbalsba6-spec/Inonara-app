"""Published AfroAtlas country master dossiers."""

from ._legacy import COUNTRY_DOSSIERS, SOUTH_AFRICA_DOSSIER, country_dossier_index
from .namibia import NAMIBIA_DOSSIER
from .southern_africa_completion_v24 import apply_completion
from .south_africa_completion_v25 import apply_south_africa_v25
from .south_africa_completion_v26 import apply_south_africa_v26
from .south_africa_completion_v27 import apply_south_africa_v27
from .south_africa_completion_v28 import apply_south_africa_v28
from .south_africa_completion_v29 import apply_south_africa_v29
from .south_africa_completion_v30 import apply_south_africa_v30
from .south_africa_figures_science_environment import EXTRA_SOURCES, SCIENCE_INNOVATION, ENVIRONMENT as SCIENCE_ENVIRONMENT
from ._completion_utils import merge_unique

COUNTRY_DOSSIERS[NAMIBIA_DOSSIER["iso2"]] = NAMIBIA_DOSSIER
for _iso in ("ZA", "NA", "BW"):
    if _iso in COUNTRY_DOSSIERS:
        apply_completion(COUNTRY_DOSSIERS[_iso])

if "ZA" in COUNTRY_DOSSIERS:
    apply_south_africa_v25(COUNTRY_DOSSIERS["ZA"])
    apply_south_africa_v26(COUNTRY_DOSSIERS["ZA"])
    apply_south_africa_v27(COUNTRY_DOSSIERS["ZA"])
    apply_south_africa_v28(COUNTRY_DOSSIERS["ZA"])
    apply_south_africa_v29(COUNTRY_DOSSIERS["ZA"])
    apply_south_africa_v30(COUNTRY_DOSSIERS["ZA"])
    _south_africa = COUNTRY_DOSSIERS["ZA"]
    merge_unique(_south_africa.setdefault("sources", []), EXTRA_SOURCES)
    merge_unique(_south_africa.setdefault("science_innovation", []), SCIENCE_INNOVATION)
    _environment = _south_africa.setdefault("environment", {})
    for _key in ("biomes", "landscapes"):
        merge_unique(_environment.setdefault(_key, []), SCIENCE_ENVIRONMENT[_key])
    for _key in ("pressures", "sources"):
        _environment.setdefault(_key, []).extend(
            item for item in SCIENCE_ENVIRONMENT[_key] if item not in _environment[_key]
        )

__all__ = ["COUNTRY_DOSSIERS", "SOUTH_AFRICA_DOSSIER", "NAMIBIA_DOSSIER", "country_dossier_index"]
