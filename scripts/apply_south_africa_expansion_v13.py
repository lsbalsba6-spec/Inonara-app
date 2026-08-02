#!/usr/bin/env python3
from pathlib import Path

ROOT = Path.cwd()

dossier_init = ROOT / "backend/data/country_dossiers/__init__.py"
if not dossier_init.exists():
    raise SystemExit("Lance ce script depuis la racine de ~/inonara-app")

text = dossier_init.read_text(encoding="utf-8")
import_line = "from .south_africa_expansion_v13 import SOUTH_AFRICA_EXPANSION_V13\n"
anchor = "from .south_africa_deep_history import DEEP_HISTORY, DEEP_HISTORY_SOURCES\n"
if import_line not in text:
    text = text.replace(anchor, anchor + import_line, 1)

block = '''
# South Africa expansion V13
_v13 = SOUTH_AFRICA_EXPANSION_V13

def _merge_v13(target, incoming):
    existing = {item.get("id") or item.get("title") or item.get("name") for item in target}
    target.extend(
        item for item in incoming
        if (item.get("id") or item.get("title") or item.get("name")) not in existing
    )

_merge_v13(SOUTH_AFRICA_DOSSIER.setdefault("figures", []), _v13["figures"])
_merge_v13(SOUTH_AFRICA_DOSSIER.setdefault("heritage", []), _v13["heritage"])
_merge_v13(SOUTH_AFRICA_DOSSIER.setdefault("society", {}).setdefault("themes", []), _v13["society"])
_merge_v13(SOUTH_AFRICA_DOSSIER.setdefault("media_gallery", []), _v13["gallery"])
_merge_v13(SOUTH_AFRICA_DOSSIER.setdefault("sources", []), _v13["additionalSources"])

'''
if "# South Africa expansion V13" not in text:
    text = text.replace("COUNTRY_DOSSIERS = {\n", block + "COUNTRY_DOSSIERS = {\n", 1)

dossier_init.write_text(text, encoding="utf-8")

data_init = ROOT / "backend/data/__init__.py"
text = data_init.read_text(encoding="utf-8")
import_line = "from .country_dossiers.south_africa_expansion_v13 import SOUTH_AFRICA_EXPANSION_V13\n"
anchor = "from .south_africa_ecosystem_complete import (\n"
if import_line not in text:
    text = text.replace(anchor, import_line + "\n" + anchor, 1)

global_block = '''
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

'''
if "# South Africa global additions V13" not in text:
    marker = "# Backfill missing sources arrays on older PLACES entries\n"
    text = text.replace(marker, global_block + marker, 1)

data_init.write_text(text, encoding="utf-8")
print("OK: Afrique du Sud V13 intégrée sans modification des composants React.")
