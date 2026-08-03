#!/usr/bin/env python3
from pathlib import Path

ROOT = Path.cwd()
dossier_init = ROOT / "backend/data/country_dossiers/__init__.py"
if not dossier_init.exists():
    raise SystemExit("Lance ce script depuis la racine de ~/inonara-app")

text = dossier_init.read_text(encoding="utf-8")
import_line = "from .south_africa_expansion_v16 import SOUTH_AFRICA_EXPANSION_V16\n"
anchor = "from .south_africa_deep_history import DEEP_HISTORY, DEEP_HISTORY_SOURCES\n"
if import_line not in text:
    text = text.replace(anchor, anchor + import_line, 1)

block = '''
# South Africa expansion V16
_v16 = SOUTH_AFRICA_EXPANSION_V16

def _merge_v16(target, incoming):
    existing = {item.get("id") or item.get("title") or item.get("name") for item in target}
    target.extend(item for item in incoming if (item.get("id") or item.get("title") or item.get("name")) not in existing)

_merge_v16(SOUTH_AFRICA_DOSSIER.setdefault("law_memory", {}).setdefault("constitutional_democracy", {}).setdefault("items", []), _v16["institutions"])
_merge_v16(SOUTH_AFRICA_DOSSIER.setdefault("society", {}).setdefault("themes", []), _v16["society"])
_merge_v16(SOUTH_AFRICA_DOSSIER.setdefault("heritage", []), _v16["heritage"])
_merge_v16(SOUTH_AFRICA_DOSSIER.setdefault("media_gallery", []), _v16["gallery"])
_merge_v16(SOUTH_AFRICA_DOSSIER.setdefault("sources", []), _v16["additionalSources"])

'''
if "# South Africa expansion V16" not in text:
    text = text.replace("COUNTRY_DOSSIERS = {\n", block + "COUNTRY_DOSSIERS = {\n", 1)
dossier_init.write_text(text, encoding="utf-8")

data_init = ROOT / "backend/data/__init__.py"
text = data_init.read_text(encoding="utf-8")
import_line = "from .country_dossiers.south_africa_expansion_v16 import SOUTH_AFRICA_EXPANSION_V16\n"
anchor = "from .south_africa_ecosystem_complete import (\n"
if import_line not in text:
    text = text.replace(anchor, import_line + "\n" + anchor, 1)

global_block = '''
# South Africa global additions V16
_existing_places_v16 = {item.get("id") for item in PLACES}
PLACES.extend(item for item in SOUTH_AFRICA_EXPANSION_V16["places"] if item.get("id") not in _existing_places_v16)

_existing_timeline_v16 = {item.get("id") for item in SA_TIMELINE_EVENTS}
SA_TIMELINE_EVENTS.extend(
    item for item in SOUTH_AFRICA_EXPANSION_V16["timeline"]
    if item.get("id") not in _existing_timeline_v16
)

'''
if "# South Africa global additions V16" not in text:
    marker = "# Backfill missing sources arrays on older PLACES entries\n"
    text = text.replace(marker, global_block + marker, 1)

data_init.write_text(text, encoding="utf-8")
print("OK: Afrique du Sud V16 intégrée sans toucher aux composants React.")
