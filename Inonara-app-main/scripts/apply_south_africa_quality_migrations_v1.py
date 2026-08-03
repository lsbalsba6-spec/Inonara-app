#!/usr/bin/env python3
from pathlib import Path

path = Path("frontend/src/components/CountryDossierView.jsx")
text = path.read_text(encoding="utf-8")

import_line = 'import { SouthAfricaMigrations } from "./SouthAfricaMigrations";\n'
if import_line not in text:
    marker = 'import { SouthAfricaOverview } from "./SouthAfricaOverview";\n'
    if marker not in text:
        raise SystemExit("ERREUR: import SouthAfricaOverview introuvable.")
    text = text.replace(marker, marker + import_line, 1)

old = '{active === "migrations" && <SimpleCards items={dossier.migrations} sourceMap={sourceMap} titleField="label" bodyField="reason" />}'
new = '{active === "migrations" && <SouthAfricaMigrations dossier={dossier} sourceMap={sourceMap} />}'
if old in text:
    text = text.replace(old, new, 1)
elif new not in text:
    raise SystemExit("ERREUR: rendu migrations introuvable; aucun fichier modifié.")

path.write_text(text, encoding="utf-8")
print("OK: composant migrations enrichi branché dans CountryDossierView.")
