#!/usr/bin/env python3
from pathlib import Path

ROOT = Path.cwd()

dossier_init = ROOT / "backend/data/country_dossiers/__init__.py"
if not dossier_init.exists():
    raise SystemExit("Lance ce script depuis la racine de ~/inonara-app")

text = dossier_init.read_text(encoding="utf-8")
import_line = "from .south_africa_expansion_v15 import SOUTH_AFRICA_EXPANSION_V15\n"
anchor = "from .south_africa_deep_history import DEEP_HISTORY, DEEP_HISTORY_SOURCES\n"
if import_line not in text:
    text = text.replace(anchor, anchor + import_line, 1)

block = '''
# South Africa expansion V15
_v15 = SOUTH_AFRICA_EXPANSION_V15

def _merge_v15(target, incoming):
    existing = {item.get("id") or item.get("title") or item.get("name") or item.get("topic") for item in target}
    target.extend(
        item for item in incoming
        if (item.get("id") or item.get("title") or item.get("name") or item.get("topic")) not in existing
    )

_merge_v15(SOUTH_AFRICA_DOSSIER.setdefault("figures", []), _v15["figures"])
_merge_v15(SOUTH_AFRICA_DOSSIER.setdefault("peoples", []), _v15["peoples"])
_merge_v15(SOUTH_AFRICA_DOSSIER.setdefault("culture", []), _v15["culture"])
_merge_v15(SOUTH_AFRICA_DOSSIER.setdefault("media_gallery", []), _v15["gallery"])
_merge_v15(SOUTH_AFRICA_DOSSIER.setdefault("sources", []), _v15["additionalSources"])

'''
if "# South Africa expansion V15" not in text:
    text = text.replace("COUNTRY_DOSSIERS = {\n", block + "COUNTRY_DOSSIERS = {\n", 1)

dossier_init.write_text(text, encoding="utf-8")

data_init = ROOT / "backend/data/__init__.py"
text = data_init.read_text(encoding="utf-8")
import_line = "from .country_dossiers.south_africa_expansion_v15 import SOUTH_AFRICA_EXPANSION_V15\n"
anchor = "from .south_africa_ecosystem_complete import (\n"
if import_line not in text:
    text = text.replace(anchor, import_line + "\n" + anchor, 1)

global_block = '''
# South Africa global additions V15
_existing_places_v15 = {item.get("id") for item in PLACES}
PLACES.extend(item for item in SOUTH_AFRICA_EXPANSION_V15["places"] if item.get("id") not in _existing_places_v15)

_existing_figures_v15 = {item.get("id") for item in FIGURES}
FIGURES.extend(
    {
        "id": item["id"],
        "name": item["name"],
        "category": "artists" if item["field"] in {"Littérature", "Musique et exil", "Photographie et activisme visuel"} else "leaders",
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
    for item in SOUTH_AFRICA_EXPANSION_V15["figures"]
    if item.get("id") not in _existing_figures_v15
)

_existing_people_v15 = {item.get("id") for item in ETHNIC_GROUPS}
ETHNIC_GROUPS.extend(
    {
        "id": item["id"],
        "name": item["name"],
        "homeland": item.get("region", ""),
        "coords": [-30.0, 25.0],
        "population": "Communautés contemporaines diverses",
        "language_family": "Niger-Congo ou familles khoesan selon le groupe",
        "summary": item.get("history", ""),
        "language": ", ".join(item.get("languages", [])),
        "religion": "Traditions ancestrales, christianismes et autres pratiques selon les communautés",
        "culture": "Voir la fiche détaillée",
        "diaspora": "Mobilités internes et régionales",
        "sources": item.get("sources", []),
        "wikipedia_title": item.get("wikipedia_title"),
        "image_source_url": item.get("image_source_url"),
        "image_credit": item.get("image_credit"),
    }
    for item in SOUTH_AFRICA_EXPANSION_V15["peoples"]
    if item.get("id") not in _existing_people_v15
)

_existing_culture_v15 = {item.get("id") for item in CULTURE_ITEMS}
CULTURE_ITEMS.extend(
    {
        "id": item["id"],
        "category": "music" if item["topic"] in {"Kwaito", "Amapiano", "Poésie de louange et izibongo"} else "food" if "Cuisine" in item["topic"] else "ritual",
        "region": "Southern Africa",
        "title": item["topic"],
        "blurb": item["text"],
        "wikipedia_title": item.get("wikipedia_title"),
        "image_source_url": item.get("image_source_url"),
        "image_credit": item.get("image_credit"),
    }
    for item in SOUTH_AFRICA_EXPANSION_V15["culture"]
    if item.get("id") not in _existing_culture_v15
)

_existing_timeline_v15 = {item.get("id") for item in SA_TIMELINE_EVENTS}
SA_TIMELINE_EVENTS.extend(
    item for item in SOUTH_AFRICA_EXPANSION_V15["timeline"]
    if item.get("id") not in _existing_timeline_v15
)

'''
if "# South Africa global additions V15" not in text:
    marker = "# Backfill missing sources arrays on older PLACES entries\n"
    text = text.replace(marker, global_block + marker, 1)

data_init.write_text(text, encoding="utf-8")
print("OK: Afrique du Sud V15 intégrée sans toucher aux imports React.")
