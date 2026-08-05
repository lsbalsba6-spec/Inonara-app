#!/usr/bin/env python3
from pathlib import Path

ROOT = Path.cwd()
country_init = ROOT / "backend/data/country_dossiers/__init__.py"
data_init = ROOT / "backend/data/__init__.py"

if not country_init.exists() or not data_init.exists():
    raise SystemExit("Lance ce script depuis ~/inonara-app")

text = country_init.read_text(encoding="utf-8")
import_line = "from .botswana_expansion_v2 import BOTSWANA_EXPANSION_V2\n"
if import_line not in text:
    text = import_line + text

block = '# Botswana expansion V2\n_bw2 = BOTSWANA_EXPANSION_V2\n\ndef _merge_bw2(target, incoming):\n    existing = {item.get("id") or item.get("name") or item.get("title") or item.get("topic") for item in target}\n    target.extend(item for item in incoming if (item.get("id") or item.get("name") or item.get("title") or item.get("topic")) not in existing)\n\nif "botswana" not in COUNTRY_DOSSIERS:\n    raise RuntimeError("Botswana V1 doit être installé avant V2")\n\n_bw_dossier = COUNTRY_DOSSIERS["botswana"]\n_merge_bw2(_bw_dossier.setdefault("figures", []), _bw2["figures"])\n_merge_bw2(_bw_dossier.setdefault("peoples", []), _bw2["peoples"])\n_merge_bw2(_bw_dossier.setdefault("culture", []), _bw2["culture"])\n_merge_bw2(_bw_dossier.setdefault("heritage", []), _bw2["heritage"])\n_merge_bw2(_bw_dossier.setdefault("stories", []), _bw2["stories"])\n_merge_bw2(_bw_dossier.setdefault("institutions", {}).setdefault("items", []), _bw2["institutions"])\n_merge_bw2(_bw_dossier.setdefault("sources", []), _bw2["sources"])\n'
if "# Botswana expansion V2" not in text:
    marker = "COUNTRY_DOSSIERS = {\n"
    pos = text.find(marker)
    if pos == -1:
        raise SystemExit("COUNTRY_DOSSIERS introuvable")
    end_pos = text.find("\n}\n", pos)
    if end_pos == -1:
        raise SystemExit("Fin de COUNTRY_DOSSIERS introuvable")
    insert_at = end_pos + 3
    text = text[:insert_at] + "\n" + block + "\n" + text[insert_at:]
country_init.write_text(text, encoding="utf-8")

text = data_init.read_text(encoding="utf-8")
import_line = "from .country_dossiers.botswana_expansion_v2 import BOTSWANA_EXPANSION_V2\n"
if import_line not in text:
    text = import_line + text

block = '# Botswana global ecosystem V2\n_bw2_global = BOTSWANA_EXPANSION_V2\n\ndef _merge_global_bw2(target, incoming):\n    existing = {item.get("id") for item in target}\n    target.extend(item for item in incoming if item.get("id") not in existing)\n\n_merge_global_bw2(PLACES, _bw2_global["places"])\n_merge_global_bw2(STORIES, _bw2_global["stories"])\n_merge_global_bw2(SA_TIMELINE_EVENTS, _bw2_global["timeline"])\n'
if "# Botswana global ecosystem V2" not in text:
    marker = "# Backfill missing sources arrays on older PLACES entries\n"
    if marker not in text:
        raise SystemExit("Point d’insertion global introuvable")
    text = text.replace(marker, block + "\n" + marker, 1)
data_init.write_text(text, encoding="utf-8")
print("OK: Botswana V2 intégré.")
