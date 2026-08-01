#!/usr/bin/env python3
from pathlib import Path

path = Path("frontend/src/components/CountryDossierView.jsx")
text = path.read_text(encoding="utf-8")

import_line = 'import { SouthAfricaEducationHealthQuality } from "./SouthAfricaEducationHealthQuality";\n'
if import_line not in text:
    marker = 'import { SouthAfricaOverview } from "./SouthAfricaOverview";\n'
    if marker not in text:
        raise SystemExit("ERREUR: import SouthAfricaOverview introuvable.")
    text = text.replace(marker, marker + import_line, 1)

old = '{active === "education-health" && <SouthAfricaEducationHealth dossier={dossier} sourceMap={sourceMap} />}'
new = '{active === "education-health" && <SouthAfricaEducationHealthQuality dossier={dossier} sourceMap={sourceMap} />}'

if old in text:
    text = text.replace(old, new, 1)
elif new not in text:
    raise SystemExit("ERREUR: rendu éducation et santé introuvable; aucun fichier modifié.")

path.write_text(text, encoding="utf-8")
print("OK: composant éducation et santé enrichi branché dans CountryDossierView.")
