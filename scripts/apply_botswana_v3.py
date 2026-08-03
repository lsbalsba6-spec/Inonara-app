#!/usr/bin/env python3
from pathlib import Path

ROOT = Path.cwd()
country_init = ROOT / "backend/data/country_dossiers/__init__.py"
data_init = ROOT / "backend/data/__init__.py"

if not country_init.exists() or not data_init.exists():
    raise SystemExit("Lance ce script depuis ~/inonara-app")

text = country_init.read_text(encoding="utf-8")
import_line = "from .botswana_expansion_v3 import BOTSWANA_EXPANSION_V3\n"
if import_line not in text:
    text = import_line + text

block = '# Botswana expansion V3\n_bw3 = BOTSWANA_EXPANSION_V3\n\ndef _merge_bw3(target, incoming):\n    existing = {item.get("id") or item.get("name") or item.get("title") or item.get("topic") for item in target}\n    target.extend(item for item in incoming if (item.get("id") or item.get("name") or item.get("title") or item.get("topic")) not in existing)\n\nif "botswana" not in COUNTRY_DOSSIERS:\n    raise RuntimeError("Botswana V1 doit être installé avant V3")\n\n_bw_dossier = COUNTRY_DOSSIERS["botswana"]\n_merge_bw3(_bw_dossier.setdefault("figures", []), _bw3["figures"])\n_merge_bw3(_bw_dossier.setdefault("peoples", []), _bw3["peoples"])\n_merge_bw3(_bw_dossier.setdefault("culture", []), _bw3["culture"])\n_merge_bw3(_bw_dossier.setdefault("heritage", []), _bw3["heritage"])\n_merge_bw3(_bw_dossier.setdefault("stories", []), _bw3["stories"])\n_merge_bw3(_bw_dossier.setdefault("sources", []), _bw3["sources"])\n'
if "# Botswana expansion V3" not in text:
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
import_line = "from .country_dossiers.botswana_expansion_v3 import BOTSWANA_EXPANSION_V3\n"
if import_line not in text:
    text = import_line + text

block = '# Botswana global ecosystem V3\n_bw3_global = BOTSWANA_EXPANSION_V3\n\ndef _merge_global_bw3(target, incoming):\n    existing = {item.get("id") for item in target}\n    target.extend(item for item in incoming if item.get("id") not in existing)\n\n_merge_global_bw3(PLACES, _bw3_global["places"])\n_merge_global_bw3(STORIES, _bw3_global["stories"])\n_merge_global_bw3(SA_TIMELINE_EVENTS, _bw3_global["timeline"])\n'
if "# Botswana global ecosystem V3" not in text:
    marker = "# Backfill missing sources arrays on older PLACES entries\n"
    if marker not in text:
        raise SystemExit("Point d’insertion global introuvable")
    text = text.replace(marker, block + "\n" + marker, 1)
data_init.write_text(text, encoding="utf-8")

print("OK: Botswana V3 intégré.")
