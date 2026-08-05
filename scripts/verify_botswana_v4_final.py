#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path.cwd()
ci = (ROOT/'backend/data/country_dossiers/__init__.py').read_text(encoding='utf-8')
di = (ROOT/'backend/data/__init__.py').read_text(encoding='utf-8')
view = (ROOT/'frontend/src/components/CountryDossierView.jsx').read_text(encoding='utf-8')
comp = (ROOT/'frontend/src/components/SouthAfricaProvincesCities.jsx').read_text(encoding='utf-8')
checks = [
    ('registre BW', '"BW": BOTSWANA_DOSSIER' in ci),
    ('ancienne clé supprimée', '"botswana": BOTSWANA_DOSSIER' not in ci),
    ('références backend BW', 'COUNTRY_DOSSIERS["botswana"]' not in ci+di),
    ('import DistrictsCities', 'import { SouthAfricaDistrictsCities } from "./SouthAfricaProvincesCities";' in view),
    ('usage DistrictsCities', '<SouthAfricaDistrictsCities dossier={dossier} sourceMap={sourceMap} />' in view),
    ('export DistrictsCities', 'export function SouthAfricaDistrictsCities' in comp),
]
failed=[name for name,ok in checks if not ok]
if failed:
    print('ECHEC:', ', '.join(failed)); sys.exit(1)
print('OK Botswana V4 final: dossier enregistré sous BW et import React corrigé.')
