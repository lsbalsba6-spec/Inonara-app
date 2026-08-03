#!/usr/bin/env python3
from pathlib import Path

ROOT = Path.cwd()
country_init = ROOT / "backend/data/country_dossiers/__init__.py"
data_init = ROOT / "backend/data/__init__.py"

if not country_init.exists() or not data_init.exists():
    raise SystemExit("Lance ce script depuis la racine de ~/inonara-app")

text = country_init.read_text(encoding="utf-8")
import_line = "from .botswana import BOTSWANA_DOSSIER\n"
if import_line not in text:
    text = import_line + text

marker = "COUNTRY_DOSSIERS = {\n"
if marker not in text:
    raise SystemExit("COUNTRY_DOSSIERS introuvable dans country_dossiers/__init__.py")

if '"botswana": BOTSWANA_DOSSIER,' not in text:
    text = text.replace(marker, marker + '    "botswana": BOTSWANA_DOSSIER,\n', 1)

country_init.write_text(text, encoding="utf-8")

text = data_init.read_text(encoding="utf-8")
import_line = "from .botswana_ecosystem_v1 import BOTSWANA_ECOSYSTEM_V1\n"
anchor = "from .south_africa_ecosystem_complete import (\n"
if import_line not in text:
    if anchor not in text:
        raise SystemExit("Point d’insertion écosystème introuvable")
    text = text.replace(anchor, import_line + "\n" + anchor, 1)

block = """
# Botswana global ecosystem V1
_bw_v1 = BOTSWANA_ECOSYSTEM_V1

_existing_bw_places = {item.get("id") for item in PLACES}
PLACES.extend(item for item in _bw_v1["places"] if item.get("id") not in _existing_bw_places)

_existing_bw_stories = {item.get("id") for item in STORIES}
STORIES.extend(
    item for item in COUNTRY_DOSSIERS["botswana"].get("stories", [])
    if item.get("id") not in _existing_bw_stories
)

_existing_bw_figures = {item.get("id") for item in FIGURES}
FIGURES.extend(
    {
        "id": item["id"],
        "name": item["name"],
        "category": "athletes" if "Athlétisme" in item["field"] else "artists" if "Littérature" in item["field"] else "leaders",
        "era": "XIXe–XXIe siècles",
        "region": "Botswana",
        "summary": item["reason"],
        "story": " ".join(item.get("paragraphs", [])),
        "sources": item.get("sources", []),
        "wikipedia_title": item.get("wikipedia_title"),
        "image_source_url": item.get("image_source_url"),
        "visual_type": item.get("visual_type"),
    }
    for item in COUNTRY_DOSSIERS["botswana"].get("figures", [])
    if item.get("id") not in _existing_bw_figures
)

_existing_bw_people = {item.get("id") for item in ETHNIC_GROUPS}
ETHNIC_GROUPS.extend(
    {
        "id": item["id"],
        "name": item["name"],
        "homeland": ", ".join(item.get("regions", [])),
        "coords": [-22.0, 24.0],
        "population": "Communautés contemporaines diverses",
        "language_family": ", ".join(item.get("languages", [])),
        "summary": item.get("history", ""),
        "language": ", ".join(item.get("languages", [])),
        "religion": "Pratiques diverses selon les communautés",
        "culture": item.get("culture", ""),
        "sources": item.get("sources", []),
        "wikipedia_title": item.get("wikipedia_title"),
        "image_source_url": item.get("image_source_url"),
        "visual_type": item.get("visual_type"),
    }
    for item in COUNTRY_DOSSIERS["botswana"].get("peoples", [])
    if item.get("id") not in _existing_bw_people
)

_existing_bw_culture = {item.get("id") for item in CULTURE_ITEMS}
CULTURE_ITEMS.extend(
    {
        "id": item["id"],
        "category": "food" if "Cuisine" in item["topic"] else "music" if any(word in item["topic"] for word in ("danse", "Musiques")) else "heritage",
        "region": "Southern Africa",
        "title": item["topic"],
        "blurb": item["text"],
        "sources": item.get("sources", []),
        "image_source_url": item.get("image_source_url"),
        "visual_type": item.get("visual_type"),
    }
    for item in COUNTRY_DOSSIERS["botswana"].get("culture", [])
    if item.get("id") not in _existing_bw_culture
)

_existing_bw_timeline = {item.get("id") for item in SA_TIMELINE_EVENTS}
SA_TIMELINE_EVENTS.extend(item for item in _bw_v1["timeline"] if item.get("id") not in _existing_bw_timeline)

_existing_bw_journey = {item.get("id") for item in LINEAGE_JOURNEY.get("stops", [])}
LINEAGE_JOURNEY["stops"] = sorted(
    LINEAGE_JOURNEY.get("stops", [])
    + [item for item in _bw_v1["journey"] if item.get("id") not in _existing_bw_journey],
    key=lambda stop: stop.get("year", -10**12),
)

"""
if "# Botswana global ecosystem V1" not in text:
    marker = "# Backfill missing sources arrays on older PLACES entries\n"
    if marker not in text:
        raise SystemExit("Point d’insertion final introuvable dans backend/data/__init__.py")
    text = text.replace(marker, block + marker, 1)

data_init.write_text(text, encoding="utf-8")
print("OK: Botswana V1 intégré au dossier pays et à l’écosystème.")
