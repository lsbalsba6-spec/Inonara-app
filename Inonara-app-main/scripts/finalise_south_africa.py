#!/usr/bin/env python3
from pathlib import Path
p=Path('frontend/src/components/CountryDossierView.jsx')
if not p.exists():
    raise SystemExit('CountryDossierView.jsx introuvable')
t=p.read_text(encoding='utf-8')
for c in ['SouthAfricaCulture','SouthAfricaHeritage','SouthAfricaLanguagesReligions','SouthAfricaMigrations','SouthAfricaSourcesQuality','SouthAfricaSocietyQuality','SouthAfricaEducationHealthQuality','SouthAfricaEconomyQuality','SouthAfricaSymbolsQuality','SouthAfricaInternationalQuality']:
    print(('OK' if c in t else 'A_VERIFIER'),c)
