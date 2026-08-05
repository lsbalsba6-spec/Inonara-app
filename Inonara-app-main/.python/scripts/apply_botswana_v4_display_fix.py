#!/usr/bin/env python3
from pathlib import Path

ROOT = Path.cwd()
country_init = ROOT / "backend/data/country_dossiers/__init__.py"
data_init = ROOT / "backend/data/__init__.py"
view = ROOT / "frontend/src/components/CountryDossierView.jsx"

for path in (country_init, data_init, view):
    if not path.exists():
        raise SystemExit(f"Fichier introuvable: {path}")

text = country_init.read_text(encoding="utf-8")
text = text.replace('    "botswana": BOTSWANA_DOSSIER,\n', '    "BW": BOTSWANA_DOSSIER,\n')
text = text.replace('if "botswana" not in COUNTRY_DOSSIERS:', 'if "BW" not in COUNTRY_DOSSIERS:')
text = text.replace('COUNTRY_DOSSIERS["botswana"]', 'COUNTRY_DOSSIERS["BW"]')
country_init.write_text(text, encoding="utf-8")

text = data_init.read_text(encoding="utf-8")
text = text.replace('COUNTRY_DOSSIERS["botswana"]', 'COUNTRY_DOSSIERS["BW"]')
data_init.write_text(text, encoding="utf-8")

text = view.read_text(encoding="utf-8")
text = text.replace(
    'import { SouthAfricaProvincesCities } from "./SouthAfricaProvincesCities";',
    'import { SouthAfricaDistrictsCities } from "./SouthAfricaProvincesCities";'
)
text = text.replace(
    '<SouthAfricaProvincesCities dossier={dossier} sourceMap={sourceMap} />',
    '<SouthAfricaDistrictsCities dossier={dossier} sourceMap={sourceMap} />'
)
view.write_text(text, encoding="utf-8")

print("OK: registre Botswana corrigé sous BW.")
print("OK: import/export React corrigé.")
