#!/usr/bin/env python3
from pathlib import Path

path = Path("frontend/src/components/CountryDossierView.jsx")
text = path.read_text(encoding="utf-8")

import_line = 'import { SouthAfricaHistoriography, SouthAfricaResearchGaps, SouthAfricaSources } from "./SouthAfricaSourcesQuality";\n'
if import_line not in text:
    marker = 'import { SouthAfricaOverview } from "./SouthAfricaOverview";\n'
    if marker not in text:
        raise SystemExit("ERREUR: import SouthAfricaOverview introuvable.")
    text = text.replace(marker, marker + import_line, 1)

replacements = [
    ('{active === "historiography" && <div className="space-y-4">\n          <p className="text-bone/65 leading-relaxed">Certains sujets historiques font l’objet de débats. Cette section présente les principales précautions de lecture sans masquer les désaccords.</p>\n          {dossier.historiography.map((note, index) => <article key={index} className="rounded-lg border border-amber-400/20 bg-amber-400/[0.04] p-4"><div className="flex items-start gap-3"><span className="text-amber-300 text-sm">⚠</span><p className="text-bone/75 leading-relaxed">{note}</p></div></article>)}\n        </div>}', '{active === "historiography" && <SouthAfricaHistoriography dossier={dossier} />}', "débats historiographiques"),
    ('{active === "research" && <div className="space-y-4">\n          <p className="text-bone/65 leading-relaxed">Ces thèmes seront enrichis progressivement à mesure que des sources solides et suffisamment précises seront intégrées.</p>\n          {dossier.research_gaps.map((gap, index) => <article key={index} className="rounded-lg border border-bone/10 p-4"><div className="flex items-start justify-between gap-3"><p className="text-bone/75 leading-relaxed">{gap}</p><StatusBadge status="research-gap" /></div></article>)}\n        </div>}', '{active === "research" && <SouthAfricaResearchGaps dossier={dossier} />}', "thèmes à suivre"),
    ('{active === "sources" && <div className="space-y-4">\n          {dossier.sources.map((source) => <article key={source.id} className="border-b border-bone/10 pb-4"><div className="flex gap-2 items-center"><span className="text-[10px] border border-gold/30 text-gold rounded px-1.5">Cat. {source.category}</span><h3 className="text-bone">{source.title}</h3></div><p className="text-xs text-bone/50 mt-1">{source.publisher}{source.year ? ` · ${source.year}` : ""}</p><a href={source.url} target="_blank" rel="noreferrer" className="text-xs text-gold/80 underline">Consulter la source</a></article>)}\n        </div>}', '{active === "sources" && <SouthAfricaSources dossier={dossier} />}', "sources"),
]

for old, new, label in replacements:
    if old in text:
        text = text.replace(old, new, 1)
    elif new not in text:
        raise SystemExit(f"ERREUR: rendu {label} introuvable; aucun fichier modifié.")

path.write_text(text, encoding="utf-8")
print("OK: débats, thèmes à suivre et sources enrichis dans CountryDossierView.")
