#!/usr/bin/env python3
from pathlib import Path

path = Path("frontend/src/components/CountryDossierView.jsx")
text = path.read_text(encoding="utf-8")

import_line = 'import { SouthAfricaCulture } from "./SouthAfricaCulture";\n'
if import_line not in text:
    marker = 'import { SouthAfricaOverview } from "./SouthAfricaOverview";\n'
    if marker not in text:
        raise SystemExit("ERREUR: import SouthAfricaOverview introuvable.")
    text = text.replace(marker, marker + import_line, 1)

old = '{active === "culture" && <div className="space-y-7">\n          <SimpleCards items={dossier.culture} sourceMap={sourceMap} titleField="topic" bodyField="text" />\n          <div><h2 className="font-serif text-2xl text-gold mb-3">Traditions orales et légendes</h2><SimpleCards items={dossier.oral_traditions_and_legends} sourceMap={sourceMap} titleField="title" /></div>\n        </div>}'
new = '{active === "culture" && <SouthAfricaCulture dossier={dossier} sourceMap={sourceMap} />}'

if old in text:
    text = text.replace(old, new, 1)
elif new not in text:
    raise SystemExit("ERREUR: rendu culture introuvable; aucun fichier modifié.")

path.write_text(text, encoding="utf-8")
print("OK: composant culture enrichi branché dans CountryDossierView.")
