#!/usr/bin/env python3
from pathlib import Path

path = Path("frontend/src/components/CountryDossierView.jsx")
text = path.read_text(encoding="utf-8")

import_line = 'import { SouthAfricaFigures } from "./SouthAfricaFigures";\n'
if import_line not in text:
    marker = 'import { SouthAfricaOverview } from "./SouthAfricaOverview";\n'
    if marker not in text:
        raise SystemExit("ERREUR: import SouthAfricaOverview introuvable.")
    text = text.replace(marker, marker + import_line, 1)

old = '{active === "figures" && <SimpleCards items={dossier.figures} sourceMap={sourceMap} bodyField="reason" />}'
new = '{active === "figures" && <SouthAfricaFigures dossier={dossier} sourceMap={sourceMap} />}'

if old in text:
    text = text.replace(old, new, 1)
elif new not in text:
    raise SystemExit("ERREUR: rendu personnalités introuvable; aucun fichier modifié.")

path.write_text(text, encoding="utf-8")
print("OK: composant personnalités enrichi branché dans CountryDossierView.")
