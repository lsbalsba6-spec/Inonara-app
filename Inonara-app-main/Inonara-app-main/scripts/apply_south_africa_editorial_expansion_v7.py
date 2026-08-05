#!/usr/bin/env python3
from pathlib import Path

p = Path("backend/data/country_dossiers/__init__.py")
if not p.exists():
    raise SystemExit("Lance ce script depuis la racine de ~/inonara-app")

text = p.read_text(encoding="utf-8")
import_line = "from .south_africa_editorial_expansion_v7 import SOUTH_AFRICA_EDITORIAL_EXPANSION_V7\n"
anchor = "from .south_africa_deep_history import DEEP_HISTORY, DEEP_HISTORY_SOURCES\n"
if import_line not in text:
    text = text.replace(anchor, anchor + import_line, 1)

block = '''
# Editorial expansion V7
_v7 = SOUTH_AFRICA_EDITORIAL_EXPANSION_V7

def _merge_v7(target, incoming):
    existing = {item.get("id") or item.get("title") or item.get("name") or item.get("topic") for item in target}
    target.extend(item for item in incoming if (item.get("id") or item.get("title") or item.get("name") or item.get("topic")) not in existing)

_merge_v7(SOUTH_AFRICA_DOSSIER.setdefault("figures", []), _v7["figures"])
_merge_v7(SOUTH_AFRICA_DOSSIER.setdefault("culture", []), _v7["culture"])
_merge_v7(SOUTH_AFRICA_DOSSIER.setdefault("environment", {}).setdefault("items", []), _v7["environment"])
_merge_v7(SOUTH_AFRICA_DOSSIER.setdefault("media", {}).setdefault("items", []), _v7["media"])
_merge_v7(SOUTH_AFRICA_DOSSIER.setdefault("sources", []), _v7["additionalSources"])

'''
if "# Editorial expansion V7" not in text:
    text = text.replace("COUNTRY_DOSSIERS = {\n", block + "COUNTRY_DOSSIERS = {\n", 1)

p.write_text(text, encoding="utf-8")
print("OK: expansion éditoriale V7 intégrée.")
