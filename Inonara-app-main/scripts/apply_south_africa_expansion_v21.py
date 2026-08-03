#!/usr/bin/env python3
from pathlib import Path

ROOT = Path.cwd()
dossier_init = ROOT / "backend/data/country_dossiers/__init__.py"
global_init = ROOT / "backend/data/__init__.py"

if not dossier_init.exists() or not global_init.exists():
    raise SystemExit("Lance ce script depuis la racine de ~/inonara-app")

text = dossier_init.read_text(encoding="utf-8")
import_line = "from .south_africa_expansion_v21 import SOUTH_AFRICA_EXPANSION_V21\n"
anchor = "from .south_africa_deep_history import DEEP_HISTORY, DEEP_HISTORY_SOURCES\n"
if import_line not in text:
    if anchor not in text:
        raise SystemExit("Point d’insertion introuvable dans country_dossiers/__init__.py")
    text = text.replace(anchor, anchor + import_line, 1)

block = '''
# South Africa expansion V21
_v21 = SOUTH_AFRICA_EXPANSION_V21

def _merge_v21(target, incoming):
    existing = {
        item.get("id") or item.get("title") or item.get("name") or item.get("topic")
        for item in target
    }
    target.extend(
        item for item in incoming
        if (item.get("id") or item.get("title") or item.get("name") or item.get("topic"))
        not in existing
    )

_merge_v21(SOUTH_AFRICA_DOSSIER.setdefault("figures", []), _v21["figures"])
_merge_v21(SOUTH_AFRICA_DOSSIER.setdefault("peoples", []), _v21["peoples"])
_merge_v21(SOUTH_AFRICA_DOSSIER.setdefault("culture", []), _v21["culture"])
_merge_v21(SOUTH_AFRICA_DOSSIER.setdefault("heritage", []), _v21["heritage"])
_merge_v21(SOUTH_AFRICA_DOSSIER.setdefault("stories", []), _v21["stories"])
_merge_v21(SOUTH_AFRICA_DOSSIER.setdefault("media_gallery", []), _v21["gallery"])
_merge_v21(SOUTH_AFRICA_DOSSIER.setdefault("sources", []), _v21["additionalSources"])

'''
if "# South Africa expansion V21" not in text:
    marker = "COUNTRY_DOSSIERS = {\n"
    if marker not in text:
        raise SystemExit("COUNTRY_DOSSIERS introuvable")
    text = text.replace(marker, block + marker, 1)
dossier_init.write_text(text, encoding="utf-8")

text = global_init.read_text(encoding="utf-8")
import_line = "from .country_dossiers.south_africa_expansion_v21 import SOUTH_AFRICA_EXPANSION_V21\n"
anchor = "from .south_africa_ecosystem_complete import (\n"
if import_line not in text:
    if anchor not in text:
        raise SystemExit("Point d’insertion introuvable dans backend/data/__init__.py")
    text = text.replace(anchor, import_line + "\n" + anchor, 1)

block = '''
# South Africa global additions V21
_existing_figures_v21 = {item.get("id") for item in FIGURES}
FIGURES.extend(
    {
        "id": item["id"],
        "name": item["name"],
        "category": "artists" if item["field"] in {"Musique, exil et diplomatie culturelle", "Musique, danse et circulation culturelle", "Écriture et journalisme", "Littérature, éducation et humanisme africain"} else "scientists" if item["field"] in {"Biologie moléculaire", "Virologie"} else "athletes" if item["field"] in {"Athlétisme", "Natation"} else "leaders",
        "era": "XIXe–XXIe siècles",
        "region": "South Africa",
        "summary": item["reason"],
        "story": " ".join(item.get("paragraphs", [])),
        "legacy": item.get("legacy", ""),
        "sources": item.get("sources", []),
        "wikipedia_title": item.get("wikipedia_title"),
        "image_source_url": item.get("image_source_url"),
        "image_credit": item.get("image_credit"),
        "visual_type": item.get("visual_type"),
    }
    for item in SOUTH_AFRICA_EXPANSION_V21["figures"]
    if item.get("id") not in _existing_figures_v21
)

_existing_people_v21 = {item.get("id") for item in ETHNIC_GROUPS}
ETHNIC_GROUPS.extend(
    {
        "id": item["id"],
        "name": item["name"],
        "homeland": item.get("region", ""),
        "coords": [-29.0, 25.0],
        "population": "Communautés contemporaines diverses",
        "language_family": "Variable selon la communauté",
        "summary": item.get("history", ""),
        "language": ", ".join(item.get("languages", [])),
        "religion": "Pratiques diverses selon familles, régions et périodes",
        "culture": item.get("culture", ""),
        "diaspora": item.get("contemporary", ""),
        "sources": item.get("sources", []),
        "wikipedia_title": item.get("wikipedia_title"),
        "image_source_url": item.get("image_source_url"),
        "image_credit": item.get("image_credit"),
        "visual_type": item.get("visual_type"),
    }
    for item in SOUTH_AFRICA_EXPANSION_V21["peoples"]
    if item.get("id") not in _existing_people_v21
)

_existing_culture_v21 = {item.get("id") for item in CULTURE_ITEMS}
CULTURE_ITEMS.extend(
    {
        "id": item["id"],
        "category": "music" if any(word in item["topic"] for word in ("Marabi", "Maskandi", "jazz")) else "art" if any(word in item["topic"] for word in ("Art", "Céramique", "Architectures")) else "sport" if "Sports" in item["topic"] else "media",
        "region": "Southern Africa",
        "title": item["topic"],
        "blurb": item["text"],
        "image_url": item.get("image_url"),
        "wikipedia_title": item.get("wikipedia_title"),
        "image_source_url": item.get("image_source_url"),
        "image_credit": item.get("image_credit"),
        "visual_type": item.get("visual_type"),
    }
    for item in SOUTH_AFRICA_EXPANSION_V21["culture"]
    if item.get("id") not in _existing_culture_v21
)

_existing_places_v21 = {item.get("id") for item in PLACES}
PLACES.extend(item for item in SOUTH_AFRICA_EXPANSION_V21["places"] if item.get("id") not in _existing_places_v21)

_existing_stories_v21 = {item.get("id") for item in STORIES}
STORIES.extend(item for item in SOUTH_AFRICA_EXPANSION_V21["stories"] if item.get("id") not in _existing_stories_v21)

_existing_timeline_v21 = {item.get("id") for item in SA_TIMELINE_EVENTS}
SA_TIMELINE_EVENTS.extend(item for item in SOUTH_AFRICA_EXPANSION_V21["timeline"] if item.get("id") not in _existing_timeline_v21)

_existing_journey_v21 = {item.get("id") for item in LINEAGE_JOURNEY.get("stops", [])}
LINEAGE_JOURNEY["stops"] = sorted(
    LINEAGE_JOURNEY.get("stops", []) + [
        item for item in SOUTH_AFRICA_EXPANSION_V21["journey"]
        if item.get("id") not in _existing_journey_v21
    ],
    key=lambda stop: stop.get("year", -10**12),
)

'''
if "# South Africa global additions V21" not in text:
    marker = "# Backfill missing sources arrays on older PLACES entries\n"
    if marker not in text:
        raise SystemExit("Point final d’insertion introuvable")
    text = text.replace(marker, block + marker, 1)
global_init.write_text(text, encoding="utf-8")

print("OK: Afrique du Sud V21 intégrée sans modifier les composants React.")
