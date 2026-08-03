#!/usr/bin/env python3
from pathlib import Path

ROOT = Path.cwd()
dossier_init = ROOT / "backend/data/country_dossiers/__init__.py"
if not dossier_init.exists():
    raise SystemExit("Lance ce script depuis la racine de ~/inonara-app")

text = dossier_init.read_text(encoding="utf-8")
import_line = "from .south_africa_expansion_v18 import SOUTH_AFRICA_EXPANSION_V18\n"
anchor = "from .south_africa_deep_history import DEEP_HISTORY, DEEP_HISTORY_SOURCES\n"
if import_line not in text:
    text = text.replace(anchor, anchor + import_line, 1)

block = """
# South Africa expansion V18
_v18 = SOUTH_AFRICA_EXPANSION_V18

def _merge_v18(target, incoming):
    existing = {item.get("id") or item.get("title") or item.get("name") or item.get("topic") for item in target}
    target.extend(item for item in incoming if (item.get("id") or item.get("title") or item.get("name") or item.get("topic")) not in existing)

_merge_v18(SOUTH_AFRICA_DOSSIER.setdefault("society", {}).setdefault("themes", []), _v18["society"])
_merge_v18(SOUTH_AFRICA_DOSSIER.setdefault("culture", []), _v18["culture"])
_merge_v18(SOUTH_AFRICA_DOSSIER.setdefault("heritage", []), _v18["heritage"])
_merge_v18(SOUTH_AFRICA_DOSSIER.setdefault("stories", []), _v18["stories"])
_merge_v18(SOUTH_AFRICA_DOSSIER.setdefault("media_gallery", []), _v18["gallery"])
_merge_v18(SOUTH_AFRICA_DOSSIER.setdefault("sources", []), _v18["additionalSources"])

# Remove xenophobia-focused cards from the main dossier for now.
for section_key in ("society", "law_memory", "international_role"):
    section = SOUTH_AFRICA_DOSSIER.get(section_key)
    if isinstance(section, dict):
        for key, value in list(section.items()):
            if isinstance(value, list):
                section[key] = [item for item in value if "xenophob" not in str(item).lower()]

"""
if "# South Africa expansion V18" not in text:
    text = text.replace("COUNTRY_DOSSIERS = {\n", block + "COUNTRY_DOSSIERS = {\n", 1)
dossier_init.write_text(text, encoding="utf-8")

data_init = ROOT / "backend/data/__init__.py"
text = data_init.read_text(encoding="utf-8")
import_line = "from .country_dossiers.south_africa_expansion_v18 import SOUTH_AFRICA_EXPANSION_V18\n"
anchor = "from .south_africa_ecosystem_complete import (\n"
if import_line not in text:
    text = text.replace(anchor, import_line + "\n" + anchor, 1)

global_block = """
# South Africa global additions V18
_existing_places_v18 = {item.get("id") for item in PLACES}
PLACES.extend(item for item in SOUTH_AFRICA_EXPANSION_V18["places"] if item.get("id") not in _existing_places_v18)

_existing_culture_v18 = {item.get("id") for item in CULTURE_ITEMS}
CULTURE_ITEMS.extend({"id": item["id"], "category": "music" if any(word in item["topic"] for word in ("Jazz", "Mbaqanga")) else "ritual", "region": "Southern Africa", "title": item["topic"], "blurb": item["text"], "image_url": item.get("image_url"), "wikipedia_title": item.get("wikipedia_title"), "image_source_url": item.get("image_source_url"), "image_credit": item.get("image_credit"), "visual_type": item.get("visual_type")} for item in SOUTH_AFRICA_EXPANSION_V18["culture"] if item.get("id") not in _existing_culture_v18)

_existing_stories_v18 = {item.get("id") for item in STORIES}
STORIES.extend(item for item in SOUTH_AFRICA_EXPANSION_V18["stories"] if item.get("id") not in _existing_stories_v18)

_existing_timeline_v18 = {item.get("id") for item in SA_TIMELINE_EVENTS}
SA_TIMELINE_EVENTS.extend(item for item in SOUTH_AFRICA_EXPANSION_V18["timeline"] if item.get("id") not in _existing_timeline_v18)

"""
if "# South Africa global additions V18" not in text:
    marker = "# Backfill missing sources arrays on older PLACES entries\n"
    text = text.replace(marker, global_block + marker, 1)
data_init.write_text(text, encoding="utf-8")
print("OK: Afrique du Sud V18 intégrée sans modifier les composants React.")
