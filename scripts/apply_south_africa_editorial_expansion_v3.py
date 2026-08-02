#!/usr/bin/env python3
from pathlib import Path

p = Path("backend/data/country_dossiers/__init__.py")
if not p.exists():
    raise SystemExit("Lance ce script depuis la racine de ~/inonara-app")

text = p.read_text(encoding="utf-8")
import_line = "from .south_africa_editorial_expansion_v3 import SOUTH_AFRICA_EDITORIAL_EXPANSION_V3\n"
anchor = "from .south_africa_deep_history import DEEP_HISTORY, DEEP_HISTORY_SOURCES\n"
if import_line not in text:
    text = text.replace(anchor, anchor + import_line, 1)

block = '''
# Editorial expansion V3
_v3 = SOUTH_AFRICA_EDITORIAL_EXPANSION_V3

def _merge_unique(target, incoming):
    existing = {item.get("id") or item.get("name") or item.get("title") or item.get("topic") for item in target}
    target.extend(
        item for item in incoming
        if (item.get("id") or item.get("name") or item.get("title") or item.get("topic")) not in existing
    )

_merge_unique(SOUTH_AFRICA_DOSSIER.setdefault("figures", []), _v3["figures"])
_merge_unique(SOUTH_AFRICA_DOSSIER.setdefault("peoples", []), _v3["peoples"])
_merge_unique(SOUTH_AFRICA_DOSSIER.setdefault("culture", []), _v3["culture"])
_merge_unique(SOUTH_AFRICA_DOSSIER.setdefault("heritage", []), _v3["heritage"])
_merge_unique(SOUTH_AFRICA_DOSSIER.setdefault("education_health", {}).setdefault("education", {}).setdefault("items", []), _v3["systems"]["education"])
_merge_unique(SOUTH_AFRICA_DOSSIER.setdefault("education_health", {}).setdefault("health", {}).setdefault("items", []), _v3["systems"]["health"])
_merge_unique(SOUTH_AFRICA_DOSSIER.setdefault("economy", {}).setdefault("sections", []), _v3["systems"]["economy"])
_merge_unique(SOUTH_AFRICA_DOSSIER.setdefault("sources", []), _v3["additionalSources"])

'''
if "# Editorial expansion V3" not in text:
    text = text.replace("COUNTRY_DOSSIERS = {\n", block + "COUNTRY_DOSSIERS = {\n", 1)

p.write_text(text, encoding="utf-8")
print("OK: expansion éditoriale V3 intégrée.")
