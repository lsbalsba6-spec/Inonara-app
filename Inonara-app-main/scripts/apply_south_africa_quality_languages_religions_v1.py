#!/usr/bin/env python3
from pathlib import Path

path = Path("frontend/src/components/CountryDossierView.jsx")
text = path.read_text(encoding="utf-8")

import_line = 'import { SouthAfricaLanguages, SouthAfricaReligions } from "./SouthAfricaLanguagesReligions";\n'
if import_line not in text:
    marker = 'import { SouthAfricaOverview } from "./SouthAfricaOverview";\n'
    if marker not in text:
        raise SystemExit("ERREUR: import SouthAfricaOverview introuvable.")
    text = text.replace(marker, marker + import_line, 1)

replacements = [
    ('{active === "languages" && <div className="space-y-6">\n          <div><h2 className="font-serif text-2xl text-gold mb-3">12 langues officielles</h2><div className="flex flex-wrap gap-2">{dossier.languages.official.map((l) => <span key={l} className="border border-bone/15 rounded-full px-3 py-1 text-sm text-bone/75">{l}</span>)}</div></div>\n          <div><h2 className="font-serif text-2xl text-gold mb-3">Langue la plus parlée au foyer, 2022</h2><div className="space-y-2">{dossier.languages.household_2022.filter((x) => x.percent != null).map((x) => <div key={x.language} className="flex justify-between border-b border-bone/10 pb-2 text-bone/75"><span>{x.language}</span><strong>{x.percent}%</strong></div>)}</div><p className="text-sm text-bone/50 mt-4">{dossier.languages.note}</p></div>\n          <SourceLinks ids={dossier.languages.sources} sourceMap={sourceMap} />\n        </div>}', '{active === "languages" && <SouthAfricaLanguages dossier={dossier} sourceMap={sourceMap} />}', "langues"),
    ('{active === "religions" && <div className="space-y-5">\n          <div className="grid gap-3 sm:grid-cols-2">{dossier.religions.census_2022.map((r) => <div key={r.name} className="border border-bone/10 rounded-lg p-4"><p className="text-bone/65">{r.name}</p><p className="font-serif text-xl text-gold">{r.count.toLocaleString("fr-FR")}</p></div>)}</div>\n          <p className="text-bone/65 leading-relaxed">{dossier.religions.note}</p><SourceLinks ids={dossier.religions.sources} sourceMap={sourceMap} />\n        </div>}', '{active === "religions" && <SouthAfricaReligions dossier={dossier} sourceMap={sourceMap} />}', "religions"),
]

for old, new, label in replacements:
    if old in text:
        text = text.replace(old, new, 1)
    elif new not in text:
        raise SystemExit(f"ERREUR: rendu {label} introuvable; aucun fichier modifié.")

path.write_text(text, encoding="utf-8")
print("OK: composants langues et religions enrichis branchés dans CountryDossierView.")
