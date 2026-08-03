#!/usr/bin/env python3
from pathlib import Path

p = Path("backend/data/country_dossiers/__init__.py")
if not p.exists():
    raise SystemExit("Lance ce script depuis la racine de ~/inonara-app")

text = p.read_text(encoding="utf-8")
import_line = "from .south_africa_editorial_expansion_v4 import SOUTH_AFRICA_EDITORIAL_EXPANSION_V4\n"
anchor = "from .south_africa_deep_history import DEEP_HISTORY, DEEP_HISTORY_SOURCES\n"
if import_line not in text:
    text = text.replace(anchor, anchor + import_line, 1)

block = '''
# Editorial expansion V4
_v4 = SOUTH_AFRICA_EDITORIAL_EXPANSION_V4

def _merge_v4(target, incoming):
    existing = {item.get("id") or item.get("title") for item in target}
    target.extend(item for item in incoming if (item.get("id") or item.get("title")) not in existing)

law = SOUTH_AFRICA_DOSSIER.setdefault("law_memory", {})
memory_section = law.setdefault("memory_reconciliation", {"title": "Mémoire, vérité et réconciliation", "items": []})
_merge_v4(memory_section.setdefault("items", []), _v4["law_memory"])
_merge_v4(SOUTH_AFRICA_DOSSIER.setdefault("society", {}).setdefault("themes", []), _v4["society"])
_merge_v4(SOUTH_AFRICA_DOSSIER.setdefault("national_symbols", {}).setdefault("items", []), _v4["symbols"])
_merge_v4(SOUTH_AFRICA_DOSSIER.setdefault("international_role", {}).setdefault("memberships", []), _v4["international"])

'''
if "# Editorial expansion V4" not in text:
    text = text.replace("COUNTRY_DOSSIERS = {\n", block + "COUNTRY_DOSSIERS = {\n", 1)

p.write_text(text, encoding="utf-8")

# Ensure long paragraphs render in Law & Memory.
law_component = Path("frontend/src/components/SouthAfricaLawMemory.jsx")
law_text = law_component.read_text(encoding="utf-8")
marker = '          <SourceLinks ids={item.sourceIds} sourceMap={sourceMap} />'
insertion = '''          {item.paragraphs?.length > 0 && (
            <div className="mt-4 space-y-3">
              {item.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} className="text-sm leading-7 text-bone/72">{paragraph}</p>
              ))}
            </div>
          )}
'''
if insertion not in law_text and marker in law_text:
    law_text = law_text.replace(marker, insertion + marker, 1)
    law_component.write_text(law_text, encoding="utf-8")

for component_name in ["SouthAfricaSymbolsQuality.jsx", "SouthAfricaInternationalQuality.jsx"]:
    component = Path("frontend/src/components") / component_name
    ctext = component.read_text(encoding="utf-8")
    marker = '                  <SourceLinks ids={item.sources || item.sourceIds} sourceMap={sourceMap} />'
    insertion = '''                  {item.paragraphs?.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {item.paragraphs.map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex} className="text-sm leading-7 text-bone/72">{paragraph}</p>
                      ))}
                    </div>
                  )}
'''
    if insertion not in ctext and marker in ctext:
        ctext = ctext.replace(marker, insertion + marker, 1)
        component.write_text(ctext, encoding="utf-8")

print("OK: expansion éditoriale V4 intégrée.")
