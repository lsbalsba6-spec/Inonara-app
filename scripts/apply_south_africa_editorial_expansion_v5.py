#!/usr/bin/env python3
from pathlib import Path

p = Path("backend/data/country_dossiers/__init__.py")
if not p.exists():
    raise SystemExit("Lance ce script depuis la racine de ~/inonara-app")

text = p.read_text(encoding="utf-8")
import_line = "from .south_africa_editorial_expansion_v5 import SOUTH_AFRICA_EDITORIAL_EXPANSION_V5\n"
anchor = "from .south_africa_deep_history import DEEP_HISTORY, DEEP_HISTORY_SOURCES\n"
if import_line not in text:
    text = text.replace(anchor, anchor + import_line, 1)

block = '''
# Editorial expansion V5
_v5 = SOUTH_AFRICA_EDITORIAL_EXPANSION_V5

def _merge_v5(target, incoming):
    existing = {item.get("id") or item.get("title") or item.get("name") for item in target}
    target.extend(item for item in incoming if (item.get("id") or item.get("title") or item.get("name")) not in existing)

_merge_v5(SOUTH_AFRICA_DOSSIER.setdefault("figures", []), _v5["figures"])
_merge_v5(SOUTH_AFRICA_DOSSIER.setdefault("education_health", {}).setdefault("education", {}).setdefault("items", []), _v5["education"])
_merge_v5(SOUTH_AFRICA_DOSSIER.setdefault("education_health", {}).setdefault("health", {}).setdefault("items", []), _v5["health"])
_merge_v5(SOUTH_AFRICA_DOSSIER.setdefault("economy", {}).setdefault("sections", []), _v5["economy"])
_merge_v5(SOUTH_AFRICA_DOSSIER.setdefault("sources", []), _v5["additionalSources"])
SOUTH_AFRICA_DOSSIER["cross_links"] = _v5["cross_links"]

'''
if "# Editorial expansion V5" not in text:
    text = text.replace("COUNTRY_DOSSIERS = {\n", block + "COUNTRY_DOSSIERS = {\n", 1)

p.write_text(text, encoding="utf-8")

# Render paragraph arrays in education, health and economy components.
for component_name in [
    "SouthAfricaEducationHealthQuality.jsx",
    "SouthAfricaEconomyQuality.jsx",
]:
    component = Path("frontend/src/components") / component_name
    ctext = component.read_text(encoding="utf-8")
    markers = [
        '                  <SourceLinks ids={item.sources || item.sourceIds} sourceMap={sourceMap} />',
        '          <SourceLinks ids={item.sources || item.sourceIds} sourceMap={sourceMap} />',
    ]
    insertion = '''                  {item.paragraphs?.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {item.paragraphs.map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex} className="text-sm leading-7 text-bone/72">{paragraph}</p>
                      ))}
                    </div>
                  )}
'''
    if insertion not in ctext:
        for marker in markers:
            if marker in ctext:
                ctext = ctext.replace(marker, insertion + marker, 1)
                break
        component.write_text(ctext, encoding="utf-8")

print("OK: expansion éditoriale V5 intégrée.")
