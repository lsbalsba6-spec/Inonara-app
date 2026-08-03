#!/usr/bin/env python3
from pathlib import Path

ROOT = Path.cwd()
REPLACEMENTS = [('frontend/src/pages/Figures.jsx',
  'import { useWikiPortrait } from "../lib/useWikiPortrait";',
  'import { SmartImage } from "../components/SmartImage";',
  'Figures import'),
 ('frontend/src/pages/Figures.jsx',
  'const FigureCard = ({ f, t }) => {\n  const portrait = useWikiPortrait(f.wikipedia_title);\n  const src = portrait || f.image_url;\n  return (',
  'const FigureCard = ({ f, t }) => {\n  return (',
  'Figures cleanup'),
 ('frontend/src/pages/Figures.jsx',
  '<img src={src} alt={f.name} className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-80 group-hover:scale-105 transition-all '
  'duration-1000" />',
  '<SmartImage src={f.image_url} wikipediaTitle={f.wikipedia_title} alt={f.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover '
  'opacity-55 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-80" credit={f.image_credit} sourceUrl={f.image_source_url} />',
  'Figures cards'),
 ('frontend/src/pages/Figures.jsx',
  '<img src={f.image_url} alt={f.name} className="absolute inset-0 w-full h-full object-cover animate-slow-zoom" />',
  '<SmartImage src={f.image_url} wikipediaTitle={f.wikipedia_title} alt={f.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover '
  'animate-slow-zoom" credit={f.image_credit} sourceUrl={f.image_source_url} />',
  'Figure detail'),
 ('frontend/src/pages/EthnicGroups.jsx',
  'import { useI18n } from "../i18n";',
  'import { useI18n } from "../i18n";\nimport { SmartImage } from "../components/SmartImage";',
  'People import'),
 ('frontend/src/pages/EthnicGroups.jsx',
  '<img src={g.image_url} alt={g.name} className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-105 '
  'transition-all duration-1000" />',
  '<SmartImage src={g.image_url} wikipediaTitle={g.wikipedia_title} alt={g.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover '
  'opacity-55 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-75" credit={g.image_credit} sourceUrl={g.image_source_url} />',
  'People cards'),
 ('frontend/src/pages/EthnicGroups.jsx',
  '<img src={g.image_url} alt={g.name} className="absolute inset-0 w-full h-full object-cover animate-slow-zoom" />',
  '<SmartImage src={g.image_url} wikipediaTitle={g.wikipedia_title} alt={g.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover '
  'animate-slow-zoom" credit={g.image_credit} sourceUrl={g.image_source_url} />',
  'People detail'),
 ('frontend/src/pages/Civilizations.jsx',
  'import { useI18n } from "../i18n";',
  'import { useI18n } from "../i18n";\nimport { SmartImage } from "../components/SmartImage";',
  'Civilizations import'),
 ('frontend/src/pages/Civilizations.jsx',
  '<img src={c.image_url} alt={c.name} className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-105 '
  'transition-all duration-1000" />',
  '<SmartImage src={c.image_url} wikipediaTitle={c.wikipedia_title} alt={c.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover '
  'opacity-55 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-75" credit={c.image_credit} sourceUrl={c.image_source_url} />',
  'Civilization cards'),
 ('frontend/src/pages/Journey.jsx',
  'import { useI18n } from "../i18n";',
  'import { useI18n } from "../i18n";\nimport { SmartImage } from "../components/SmartImage";',
  'Journey import'),
 ('frontend/src/pages/Journey.jsx',
  '<img src={s.image_url} alt={s.heading} className="absolute inset-0 w-full h-full object-cover" />',
  '<SmartImage src={s.image_url} wikipediaTitle={s.wikipedia_title} alt={s.heading} wrapperClassName="absolute inset-0" className="h-full w-full object-cover" '
  'credit={s.image_credit} sourceUrl={s.image_source_url} />',
  'Journey images'),
 ('frontend/src/pages/Culture.jsx',
  'import { useI18n } from "../i18n";',
  'import { useI18n } from "../i18n";\nimport { SmartImage } from "../components/SmartImage";',
  'Culture import'),
 ('frontend/src/pages/Culture.jsx',
  '<div key={i.id} className="museum-card p-7" data-testid={`culture-item-${i.id}`}>',
  '<div key={i.id} className="museum-card overflow-hidden" data-testid={`culture-item-${i.id}`}><SmartImage src={i.image_url} '
  'wikipediaTitle={i.wikipedia_title} alt={i.title} wrapperClassName="aspect-[16/10]" className="h-full w-full object-cover transition duration-700 '
  'hover:scale-105" credit={i.image_credit} sourceUrl={i.image_source_url} /><div className="p-7">',
  'Culture card open'),
 ('frontend/src/pages/Culture.jsx',
  '<p className="text-bone/75 mt-3 font-light leading-relaxed text-sm">{i.blurb}</p>\n          </div>',
  '<p className="text-bone/75 mt-3 font-light leading-relaxed text-sm">{i.blurb}</p>\n            </div>\n          </div>',
  'Culture card close'),
 ('frontend/src/pages/Stories.jsx',
  'import { useI18n } from "../i18n";',
  'import { useI18n } from "../i18n";\nimport { SmartImage } from "../components/SmartImage";',
  'Stories import'),
 ('frontend/src/pages/Stories.jsx', 'className="museum-card p-8 group block"', 'className="museum-card overflow-hidden group block"', 'Stories card class'),
 ('frontend/src/pages/Stories.jsx',
  '          >\n            <div className="flex items-center gap-2 text-gold">',
  '          >\n'
  '            <SmartImage src={s.image_url} wikipediaTitle={s.wikipedia_title} alt={s.title} wrapperClassName="aspect-[16/9]" className="h-full w-full '
  'object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90" credit={s.image_credit} sourceUrl={s.image_source_url} />\n'
  '            <div className="p-8">\n'
  '            <div className="flex items-center gap-2 text-gold">',
  'Stories card image'),
 ('frontend/src/pages/Stories.jsx',
  '<p className="text-bone/70 mt-3 font-light leading-relaxed">{s.summary}</p>\n          </Link>',
  '<p className="text-bone/70 mt-3 font-light leading-relaxed">{s.summary}</p>\n            </div>\n          </Link>',
  'Stories card close'),
 ('frontend/src/pages/Stories.jsx',
  '      <p className="overline mt-8">{s.era}</p>',
  '      <SmartImage src={s.image_url} wikipediaTitle={s.wikipedia_title} alt={s.title} wrapperClassName="mt-8 aspect-[16/9] rounded-2xl" className="h-full '
  'w-full object-cover" credit={s.image_credit} sourceUrl={s.image_source_url} />\n'
  '      <p className="overline mt-8">{s.era}</p>',
  'Story detail image'),
 ('frontend/src/components/SouthAfricaMediaGallery.jsx',
  'import { useMemo, useState } from "react";',
  'import { useMemo, useState } from "react";\nimport { SmartImage } from "./SmartImage";',
  'Gallery import'),
 ('frontend/src/components/SouthAfricaMediaGallery.jsx',
  '<img\n'
  '                src={item.image_url}\n'
  '                alt={item.alt || getTitle(item)}\n'
  '                loading="lazy"\n'
  '                className="h-64 w-full object-cover transition duration-500 hover:scale-[1.03]"\n'
  '              />',
  '<SmartImage src={item.image_url} wikipediaTitle={item.wikipedia_title} alt={item.alt || getTitle(item)} wrapperClassName="h-64" className="h-full w-full '
  'object-cover transition duration-500 hover:scale-[1.03]" />',
  'Gallery cards'),
 ('frontend/src/components/SouthAfricaMediaGallery.jsx',
  '<img\n'
  '              src={selected.image_url}\n'
  '              alt={selected.alt || getTitle(selected)}\n'
  '              className="max-h-[70vh] w-full object-contain bg-black"\n'
  '            />',
  '<SmartImage src={selected.image_url} wikipediaTitle={selected.wikipedia_title} alt={selected.alt || getTitle(selected)} wrapperClassName="max-h-[70vh] '
  'bg-black" className="max-h-[70vh] w-full object-contain" />',
  'Gallery modal')]

def replace(path_str, old, new, label):
    path = ROOT / path_str
    if not path.exists():
        raise SystemExit(f"Fichier introuvable: {path}")
    text = path.read_text(encoding="utf-8")
    if new in text:
        print(f"Déjà appliqué: {label}")
        return
    if old not in text:
        raise SystemExit(f"Motif introuvable pour {label}: {path}")
    path.write_text(text.replace(old, new, 1), encoding="utf-8")
    print(f"OK: {label}")

for item in REPLACEMENTS:
    replace(*item)

data_init = ROOT / "backend/data/__init__.py"
text = data_init.read_text(encoding="utf-8")
import_line = "from .south_africa_visuals_v8 import SOUTH_AFRICA_VISUALS_V8\n"
anchor = "from .south_africa_ecosystem_complete import (\n"
if import_line not in text:
    text = text.replace(anchor, import_line + "\n" + anchor, 1)

block = '''
# South Africa visual enrichment V8
def _apply_visual_metadata(items, metadata):
    for item in items:
        item_id = item.get("id")
        if item_id in metadata:
            item.update(metadata[item_id])

_apply_visual_metadata(FIGURES, SOUTH_AFRICA_VISUALS_V8["figures"])
_apply_visual_metadata(CIVILIZATIONS, SOUTH_AFRICA_VISUALS_V8["civilizations"])
_apply_visual_metadata(ETHNIC_GROUPS, SOUTH_AFRICA_VISUALS_V8["people"])
_apply_visual_metadata(PLACES, SOUTH_AFRICA_VISUALS_V8["places"])
_apply_visual_metadata(STORIES, SOUTH_AFRICA_VISUALS_V8["stories"])
_apply_visual_metadata(CULTURE_ITEMS, SOUTH_AFRICA_VISUALS_V8["culture"])
_apply_visual_metadata(LINEAGE_JOURNEY.get("stops", []), SOUTH_AFRICA_VISUALS_V8["journey"])

'''
if "# South Africa visual enrichment V8" not in text:
    marker = "# Backfill missing sources arrays on older PLACES entries\n"
    text = text.replace(marker, block + marker, 1)
data_init.write_text(text, encoding="utf-8")

dossier_init = ROOT / "backend/data/country_dossiers/__init__.py"
text = dossier_init.read_text(encoding="utf-8")
import_line = "from ..south_africa_visuals_v8 import SOUTH_AFRICA_VISUALS_V8\n"
first_import = "from .south_africa import SOUTH_AFRICA_DOSSIER\n"
if import_line not in text:
    text = text.replace(first_import, first_import + import_line, 1)

gallery_block = '''
# Visual gallery V8
_existing_gallery_ids = {item.get("id") for item in SOUTH_AFRICA_DOSSIER.setdefault("media_gallery", [])}
SOUTH_AFRICA_DOSSIER["media_gallery"].extend(
    item for item in SOUTH_AFRICA_VISUALS_V8["gallery"]
    if item.get("id") not in _existing_gallery_ids
)

'''
if "# Visual gallery V8" not in text:
    text = text.replace("COUNTRY_DOSSIERS = {\n", gallery_block + "COUNTRY_DOSSIERS = {\n", 1)
dossier_init.write_text(text, encoding="utf-8")

print("OK: enrichissement visuel V8 appliqué.")
