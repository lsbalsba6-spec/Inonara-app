#!/usr/bin/env python3
from pathlib import Path
import ast
import re

ROOT = Path.cwd()
country_init = ROOT / "backend/data/country_dossiers/__init__.py"
data_init = ROOT / "backend/data/__init__.py"
view = ROOT / "frontend/src/components/CountryDossierView.jsx"
component = ROOT / "frontend/src/components/SouthAfricaProvincesCities.jsx"
v4 = ROOT / "backend/data/country_dossiers/botswana_consolidation_v4.py"

for path in (country_init, data_init, view, component, v4):
    if not path.exists():
        raise SystemExit(f"Fichier manquant: {path}")

country_text = country_init.read_text(encoding="utf-8")
if '"BW": BOTSWANA_DOSSIER' not in country_text:
    raise SystemExit("Botswana n'est pas enregistré sous BW.")
if '"botswana": BOTSWANA_DOSSIER' in country_text:
    raise SystemExit("Ancienne clé Botswana encore présente.")
if 'COUNTRY_DOSSIERS["botswana"]' in country_text:
    raise SystemExit("Ancienne référence Botswana encore présente.")

data_text = data_init.read_text(encoding="utf-8")
if 'COUNTRY_DOSSIERS["botswana"]' in data_text:
    raise SystemExit("Ancienne référence Botswana présente dans backend/data.")

view_text = view.read_text(encoding="utf-8")
old_import = 'import { SouthAfricaProvincesCities } from "./SouthAfricaProvincesCities";'
old_usage = '<SouthAfricaProvincesCities dossier={dossier} sourceMap={sourceMap} />'
if old_import in view_text or old_usage in view_text:
    raise SystemExit("Ancien import ou usage frontend encore présent.")
if 'import { SouthAfricaDistrictsCities } from "./SouthAfricaProvincesCities";' not in view_text:
    raise SystemExit("Nouvel import frontend absent.")
if '<SouthAfricaDistrictsCities dossier={dossier} sourceMap={sourceMap} />' not in view_text:
    raise SystemExit("Nouvel usage frontend absent.")

component_text = component.read_text(encoding="utf-8")
if "export function SouthAfricaDistrictsCities" not in component_text:
    raise SystemExit("Export réel du composant introuvable.")

v4_text = v4.read_text(encoding="utf-8")
match = re.search(r"BOTSWANA_CONSOLIDATION_V4\s*=\s*", v4_text)
if not match:
    raise SystemExit("Consolidation Botswana V4 introuvable.")
v4_data = ast.literal_eval(v4_text[match.end():])
identity = v4_data.get("identity", {})
if identity.get("slug") != "botswana" or identity.get("name", {}).get("fr") != "Botswana":
    raise SystemExit("Identité Botswana V4 invalide.")

print("OK: registre BW, identité Botswana et import React vérifiés.")
