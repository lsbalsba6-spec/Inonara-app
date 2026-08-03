#!/usr/bin/env python3
from pathlib import Path

p = Path("backend/data/__init__.py")
if not p.exists():
    raise SystemExit("Lance ce script depuis la racine de ~/inonara-app")

text = p.read_text(encoding="utf-8")
import_block = '''from .south_africa_ecosystem_editorial_v6 import SA_ECOSYSTEM_EDITORIAL_V6
'''
anchor = '''from .south_africa_ecosystem_complete import (
'''
if import_block not in text:
    text = text.replace(anchor, import_block + "\n" + anchor, 1)

replacements = {
    "PLACES = _PLACES_BASE + EXTRA_PLACES + EXTRA_PLACES_V4 + EXTRA_PLACES_V7 + SA_PLACES":
    "PLACES = _PLACES_BASE + EXTRA_PLACES + EXTRA_PLACES_V4 + EXTRA_PLACES_V7 + SA_PLACES + SA_ECOSYSTEM_EDITORIAL_V6[\"places\"]",
    "CULTURE_ITEMS = _CULTURE_BASE + EXTRA_CULTURE_ITEMS + EXTRA_CULTURE_V7 + SA_CULTURE":
    "CULTURE_ITEMS = _CULTURE_BASE + EXTRA_CULTURE_ITEMS + EXTRA_CULTURE_V7 + SA_CULTURE + SA_ECOSYSTEM_EDITORIAL_V6[\"culture\"]",
    "FIGURES = _FIGURES_BASE + EXTRA_FIGURES_V4 + EXTRA_FIGURES_V5 + EXTRA_FIGURES_V7 + SA_FIGURES":
    "FIGURES = _FIGURES_BASE + EXTRA_FIGURES_V4 + EXTRA_FIGURES_V5 + EXTRA_FIGURES_V7 + SA_FIGURES + SA_ECOSYSTEM_EDITORIAL_V6[\"figures\"]",
    "STORIES = STORIES + EXTRA_STORIES_V4 + EXTRA_STORIES_V6 + EXTRA_STORIES_V7 + SA_STORIES  # noqa: F811":
    "STORIES = STORIES + EXTRA_STORIES_V4 + EXTRA_STORIES_V6 + EXTRA_STORIES_V7 + SA_STORIES + SA_ECOSYSTEM_EDITORIAL_V6[\"stories\"]  # noqa: F811",
    "ETHNIC_GROUPS = ETHNIC_GROUPS + EXTRA_ETHNIC_GROUPS_V7 + SA_PEOPLE  # noqa: F811":
    "ETHNIC_GROUPS = ETHNIC_GROUPS + EXTRA_ETHNIC_GROUPS_V7 + SA_PEOPLE + SA_ECOSYSTEM_EDITORIAL_V6[\"people\"]  # noqa: F811",
    "LINEAGE_JOURNEY.get("stops", []) + SA_JOURNEY_STOPS,":
    "LINEAGE_JOURNEY.get("stops", []) + SA_JOURNEY_STOPS + SA_ECOSYSTEM_EDITORIAL_V6[\"journey\"],",
}
for old, new in replacements.items():
    if old in text and new not in text:
        text = text.replace(old, new, 1)

timeline_line = 'SA_TIMELINE_EVENTS = SA_TIMELINE_EVENTS + SA_ECOSYSTEM_EDITORIAL_V6["timeline"]\n'
if timeline_line not in text:
    marker = '# Backfill missing sources arrays on older PLACES entries\n'
    text = text.replace(marker, timeline_line + '\n' + marker, 1)

p.write_text(text, encoding="utf-8")
print("OK: écosystème éditorial Afrique du Sud V6 intégré.")
