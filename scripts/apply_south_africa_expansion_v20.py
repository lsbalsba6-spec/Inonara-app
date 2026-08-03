#!/usr/bin/env python3
from pathlib import Path

ROOT = Path.cwd()
dossier_init = ROOT / "backend/data/country_dossiers/__init__.py"
global_init = ROOT / "backend/data/__init__.py"

if not dossier_init.exists() or not global_init.exists():
    raise SystemExit("Lance ce script depuis la racine du dépôt ~/inonara-app")

text = dossier_init.read_text(encoding="utf-8")
import_line = "from .south_africa_expansion_v20 import SOUTH_AFRICA_EXPANSION_V20\n"
anchor = "from .south_africa_deep_history import DEEP_HISTORY, DEEP_HISTORY_SOURCES\n"
if import_line not in text:
    if anchor not in text:
        raise SystemExit("Point d’insertion introuvable dans country_dossiers/__init__.py")
    text = text.replace(anchor, anchor + import_line, 1)

block = '''
# South Africa expansion V20
_v20 = SOUTH_AFRICA_EXPANSION_V20

def _merge_v20(target, incoming):
    existing = {item.get("id") or item.get("title") or item.get("name") or item.get("topic") for item in target}
    target.extend(
        item for item in incoming
        if (item.get("id") or item.get("title") or item.get("name") or item.get("topic")) not in existing
    )

_merge_v20(SOUTH_AFRICA_DOSSIER.setdefault("economy", {}).setdefault("sections", []), _v20["economy"])
_merge_v20(SOUTH_AFRICA_DOSSIER.setdefault("education_health", {}).setdefault("education", {}).setdefault("items", []), _v20["education"])
_merge_v20(SOUTH_AFRICA_DOSSIER.setdefault("education_health", {}).setdefault("health", {}).setdefault("items", []), _v20["health"])
_merge_v20(SOUTH_AFRICA_DOSSIER.setdefault("environment", {}).setdefault("items", []), _v20["environment"])
_merge_v20(SOUTH_AFRICA_DOSSIER.setdefault("stories", []), _v20["stories"])
_merge_v20(SOUTH_AFRICA_DOSSIER.setdefault("media_gallery", []), _v20["gallery"])
_merge_v20(SOUTH_AFRICA_DOSSIER.setdefault("sources", []), _v20["additionalSources"])

def _strip_xenophobia(value):
    if isinstance(value, list):
        return [_strip_xenophobia(item) for item in value if "xenophob" not in str(item).lower()]
    if isinstance(value, dict):
        return {key: _strip_xenophobia(item) for key, item in value.items()}
    return value

for _section in ("society", "law_memory", "international_role"):
    if _section in SOUTH_AFRICA_DOSSIER:
        SOUTH_AFRICA_DOSSIER[_section] = _strip_xenophobia(SOUTH_AFRICA_DOSSIER[_section])

'''
if "# South Africa expansion V20" not in text:
    marker = "COUNTRY_DOSSIERS = {\n"
    if marker not in text:
        raise SystemExit("COUNTRY_DOSSIERS introuvable")
    text = text.replace(marker, block + marker, 1)
dossier_init.write_text(text, encoding="utf-8")

text = global_init.read_text(encoding="utf-8")
import_line = "from .country_dossiers.south_africa_expansion_v20 import SOUTH_AFRICA_EXPANSION_V20\n"
anchor = "from .south_africa_ecosystem_complete import (\n"
if import_line not in text:
    if anchor not in text:
        raise SystemExit("Point d’insertion introuvable dans backend/data/__init__.py")
    text = text.replace(anchor, import_line + "\n" + anchor, 1)

block = '''
# South Africa global additions V20
_existing_places_v20 = {item.get("id") for item in PLACES}
PLACES.extend(item for item in SOUTH_AFRICA_EXPANSION_V20["places"] if item.get("id") not in _existing_places_v20)

_existing_stories_v20 = {item.get("id") for item in STORIES}
STORIES.extend(item for item in SOUTH_AFRICA_EXPANSION_V20["stories"] if item.get("id") not in _existing_stories_v20)

_existing_timeline_v20 = {item.get("id") for item in SA_TIMELINE_EVENTS}
SA_TIMELINE_EVENTS.extend(item for item in SOUTH_AFRICA_EXPANSION_V20["timeline"] if item.get("id") not in _existing_timeline_v20)

_existing_journey_v20 = {item.get("id") for item in LINEAGE_JOURNEY.get("stops", [])}
LINEAGE_JOURNEY["stops"] = sorted(
    LINEAGE_JOURNEY.get("stops", []) + [
        item for item in SOUTH_AFRICA_EXPANSION_V20["journey"]
        if item.get("id") not in _existing_journey_v20
    ],
    key=lambda stop: stop.get("year", -10**12),
)

'''
if "# South Africa global additions V20" not in text:
    marker = "# Backfill missing sources arrays on older PLACES entries\n"
    if marker not in text:
        raise SystemExit("Point final d’insertion introuvable")
    text = text.replace(marker, block + marker, 1)
global_init.write_text(text, encoding="utf-8")

print("OK: Afrique du Sud V20 intégrée sans modifier les composants React.")
