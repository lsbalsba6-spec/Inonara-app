#!/usr/bin/env python3
from pathlib import Path

ROOT = Path.cwd()
REPLACEMENTS = [('frontend/src/pages/Figures.jsx',
  'import { SmartImage } from "../components/SmartImage";',
  'import { SmartImage } from "../components/SmartImage";\nimport { sortAlphabetically } from "../lib/contentSort";',
  'Figures sort import',
  False),
 ('frontend/src/pages/Figures.jsx',
  'import { useWikiPortrait } from "../lib/useWikiPortrait";',
  'import { useWikiPortrait } from "../lib/useWikiPortrait";\nimport { sortAlphabetically } from "../lib/contentSort";',
  'Figures sort import fallback',
  False),
 ('frontend/src/pages/Figures.jsx',
  '(cat === "all" ? items : items.filter((i) => i.category === cat)).slice().sort((a, b) => a.name.localeCompare(b.name, "fr"))',
  'sortAlphabetically(cat === "all" ? items : items.filter((i) => i.category === cat), "name")',
  'Figures alphabetical',
  True),
 ('frontend/src/pages/EthnicGroups.jsx',
  'import { useI18n } from "../i18n";',
  'import { useI18n } from "../i18n";\nimport { sortAlphabetically } from "../lib/contentSort";',
  'People sort import',
  True),
 ('frontend/src/pages/EthnicGroups.jsx',
  '[...groups].sort((a, b) => a.name.localeCompare(b.name))',
  'sortAlphabetically(groups, "name")',
  'People alphabetical',
  True),
 ('frontend/src/pages/Diaspora.jsx',
  'import { useI18n } from "../i18n";',
  'import { useI18n } from "../i18n";\nimport { sortAlphabetically } from "../lib/contentSort";\nimport { SmartImage } from "../components/SmartImage";',
  'Diaspora imports',
  True),
 ('frontend/src/pages/Diaspora.jsx',
  '[...items].sort((a, b) => a.name.localeCompare(b.name))',
  'sortAlphabetically(items, "name")',
  'Diaspora alphabetical',
  True),
 ('frontend/src/pages/Diaspora.jsx',
  '<img src={d.image_url} alt={d.name} className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-105 '
  'transition-all duration-1000" />',
  '<SmartImage src={d.image_url} wikipediaTitle={d.wikipedia_title} alt={d.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover '
  'opacity-55 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-75" credit={d.image_credit} sourceUrl={d.image_source_url} />',
  'Diaspora card images',
  True),
 ('frontend/src/pages/Diaspora.jsx',
  '<img src={d.image_url} alt={d.name} className="absolute inset-0 w-full h-full object-cover animate-slow-zoom" />',
  '<SmartImage src={d.image_url} wikipediaTitle={d.wikipedia_title} alt={d.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover '
  'animate-slow-zoom" credit={d.image_credit} sourceUrl={d.image_source_url} />',
  'Diaspora detail image',
  True),
 ('frontend/src/pages/Culture.jsx',
  'import { SmartImage } from "../components/SmartImage";',
  'import { SmartImage } from "../components/SmartImage";\nimport { sortAlphabetically } from "../lib/contentSort";',
  'Culture sort import',
  False),
 ('frontend/src/pages/Culture.jsx',
  'import { useI18n } from "../i18n";',
  'import { useI18n } from "../i18n";\nimport { sortAlphabetically } from "../lib/contentSort";',
  'Culture sort import fallback',
  False),
 ('frontend/src/pages/Culture.jsx',
  '(cat === "all" ? items : items.filter((i) => i.category === cat)).slice().sort((a, b) => a.title.localeCompare(b.title, "fr"))',
  'sortAlphabetically(cat === "all" ? items : items.filter((i) => i.category === cat), "title")',
  'Culture alphabetical',
  True),
 ('frontend/src/pages/Stories.jsx',
  'import { SmartImage } from "../components/SmartImage";',
  'import { SmartImage } from "../components/SmartImage";\nimport { sortChronologically } from "../lib/contentSort";',
  'Stories sort import',
  False),
 ('frontend/src/pages/Stories.jsx',
  'import { useI18n } from "../i18n";',
  'import { useI18n } from "../i18n";\nimport { sortChronologically } from "../lib/contentSort";',
  'Stories sort import fallback',
  False),
 ('frontend/src/pages/Stories.jsx',
  'stories.slice().sort((a, b) => { const year = (v) => Number((v.era || "").match(/-?\\d+/)?.[0] || 999999); return year(a) - year(b) || '
  'a.title.localeCompare(b.title, "fr"); })',
  'sortChronologically(stories, "era", "title")',
  'Stories chronological',
  True),
 ('frontend/src/pages/Journey.jsx',
  'import { SmartImage } from "../components/SmartImage";',
  'import { SmartImage } from "../components/SmartImage";\nimport { sortChronologically } from "../lib/contentSort";',
  'Journey sort import',
  False),
 ('frontend/src/pages/Journey.jsx',
  'import { useI18n } from "../i18n";',
  'import { useI18n } from "../i18n";\nimport { sortChronologically } from "../lib/contentSort";',
  'Journey sort import fallback',
  False),
 ('frontend/src/pages/Journey.jsx',
  'j.stops.slice().sort((a, b) => (a.year ?? 999999) - (b.year ?? 999999))',
  'sortChronologically(j.stops, "year", "heading")',
  'Journey chronological',
  True),
 ('frontend/src/pages/Civilizations.jsx',
  'import { SmartImage } from "../components/SmartImage";',
  'import { SmartImage } from "../components/SmartImage";\nimport { sortChronologically } from "../lib/contentSort";',
  'Civilizations sort import',
  False),
 ('frontend/src/pages/Civilizations.jsx',
  'import { useI18n } from "../i18n";',
  'import { useI18n } from "../i18n";\nimport { sortChronologically } from "../lib/contentSort";',
  'Civilizations sort import fallback',
  False),
 ('frontend/src/pages/Civilizations.jsx',
  'civs.slice().sort((a, b) => a.era_start - b.era_start || a.name.localeCompare(b.name, "fr"))',
  'sortChronologically(civs, "era_start", "name")',
  'Civilizations chronological',
  True),
 ('frontend/src/pages/PlaceDetail.jsx',
  'import { useI18n } from "../i18n";',
  'import { useI18n } from "../i18n";\nimport { SmartImage } from "../components/SmartImage";',
  'PlaceDetail image import',
  True),
 ('frontend/src/pages/PlaceDetail.jsx',
  '      <div className="max-w-3xl mx-auto px-6 py-16 space-y-10">',
  '      <div className="max-w-3xl mx-auto px-6 py-16 space-y-10">\n'
  '        {(p.image_url || p.wikipedia_title) && (\n'
  '          <SmartImage src={p.image_url} wikipediaTitle={p.wikipedia_title} alt={p.name} wrapperClassName="aspect-[16/9] rounded-2xl" className="h-full '
  'w-full object-cover" credit={p.image_credit} sourceUrl={p.image_source_url} />\n'
  '        )}',
  'PlaceDetail photograph',
  True),
 ('frontend/src/pages/CivilizationDetail.jsx',
  'import { ArrowLeft } from "lucide-react";',
  'import { ArrowLeft } from "lucide-react";\nimport { SmartImage } from "../components/SmartImage";',
  'CivilizationDetail image import',
  True),
 ('frontend/src/pages/CivilizationDetail.jsx',
  '<img src={c.image_url} alt={c.name} className="absolute inset-0 w-full h-full object-cover animate-slow-zoom" />',
  '<SmartImage src={c.image_url} wikipediaTitle={c.wikipedia_title} alt={c.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover '
  'animate-slow-zoom" credit={c.image_credit} sourceUrl={c.image_source_url} />',
  'Civilization detail image',
  True)]

def patch(path_string, old, new, label, required):
    path = ROOT / path_string
    if not path.exists():
        if required:
            raise SystemExit(f"Fichier introuvable: {path}")
        print(f"Ignoré: {label}")
        return
    text = path.read_text(encoding="utf-8")
    if new in text:
        print(f"Déjà appliqué: {label}")
        return
    if old not in text:
        if required:
            raise SystemExit(f"Motif introuvable pour {label}: {path}")
        print(f"Motif absent, ignoré: {label}")
        return
    path.write_text(text.replace(old, new, 1), encoding="utf-8")
    print(f"OK: {label}")

for replacement in REPLACEMENTS:
    patch(*replacement)

dossier_init = ROOT / "backend/data/country_dossiers/__init__.py"
text = dossier_init.read_text(encoding="utf-8")
import_line = "from .south_africa_editorial_expansion_v9 import SOUTH_AFRICA_EDITORIAL_EXPANSION_V9\n"
anchor = "from .south_africa_deep_history import DEEP_HISTORY, DEEP_HISTORY_SOURCES\n"
if import_line not in text:
    text = text.replace(anchor, anchor + import_line, 1)

block = '''
# Editorial and visual expansion V9
_v9 = SOUTH_AFRICA_EDITORIAL_EXPANSION_V9

def _merge_v9(target, incoming):
    existing = {item.get("id") or item.get("title") or item.get("name") or item.get("topic") for item in target}
    target.extend(
        item for item in incoming
        if (item.get("id") or item.get("title") or item.get("name") or item.get("topic")) not in existing
    )

_merge_v9(SOUTH_AFRICA_DOSSIER.setdefault("figures", []), _v9["figures"])
_merge_v9(SOUTH_AFRICA_DOSSIER.setdefault("culture", []), _v9["culture"])
_merge_v9(SOUTH_AFRICA_DOSSIER.setdefault("media_gallery", []), _v9["gallery"])
_merge_v9(SOUTH_AFRICA_DOSSIER.setdefault("sources", []), _v9["additionalSources"])

'''
if "# Editorial and visual expansion V9" not in text:
    text = text.replace("COUNTRY_DOSSIERS = {\n", block + "COUNTRY_DOSSIERS = {\n", 1)

dossier_init.write_text(text, encoding="utf-8")

data_init = ROOT / "backend/data/__init__.py"
text = data_init.read_text(encoding="utf-8")
import_line = "from .country_dossiers.south_africa_editorial_expansion_v9 import SOUTH_AFRICA_EDITORIAL_EXPANSION_V9\n"
anchor = "from .south_africa_ecosystem_complete import (\n"
if import_line not in text:
    text = text.replace(anchor, import_line + "\n" + anchor, 1)

global_block = '''
# South Africa global additions V9
_existing_place_ids_v9 = {item.get("id") for item in PLACES}
PLACES.extend(item for item in SOUTH_AFRICA_EDITORIAL_EXPANSION_V9["cities"] if item.get("id") not in _existing_place_ids_v9)

_existing_figure_ids_v9 = {item.get("id") for item in FIGURES}
FIGURES.extend(
    {
        "id": item["id"],
        "name": item["name"],
        "category": "scientists" if "Chimie" in item["field"] else "athletes" if "Sport" in item["field"] else "artists",
        "era": "Afrique du Sud contemporaine",
        "region": "South Africa",
        "summary": item["reason"],
        "story": " ".join(item.get("paragraphs", [])),
        "legacy": item.get("legacy", ""),
        "sources": item.get("sources", []),
        "wikipedia_title": item.get("wikipedia_title"),
        "image_source_url": item.get("image_source_url"),
        "image_credit": item.get("image_credit"),
    }
    for item in SOUTH_AFRICA_EDITORIAL_EXPANSION_V9["figures"]
    if item.get("id") not in _existing_figure_ids_v9
)

_existing_culture_ids_v9 = {item.get("id") for item in CULTURE_ITEMS}
CULTURE_ITEMS.extend(
    {
        "id": item["id"],
        "category": "food" if "Cuisine" in item["topic"] else "music" if "Danse" in item["topic"] else "clothing" if "Mode" in item["topic"] else "ritual",
        "region": "Southern Africa",
        "title": item["topic"],
        "blurb": item["text"],
        "wikipedia_title": item.get("wikipedia_title"),
        "image_source_url": item.get("image_source_url"),
        "image_credit": item.get("image_credit"),
    }
    for item in SOUTH_AFRICA_EDITORIAL_EXPANSION_V9["culture"]
    if item.get("id") not in _existing_culture_ids_v9
)

'''
if "# South Africa global additions V9" not in text:
    marker = "# Backfill missing sources arrays on older PLACES entries\n"
    text = text.replace(marker, global_block + marker, 1)

data_init.write_text(text, encoding="utf-8")
print("OK: V9 appliqué.")
