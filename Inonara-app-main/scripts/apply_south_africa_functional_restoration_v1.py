#!/usr/bin/env python3
from pathlib import Path

def replace_once(path, old, new, label):
    text = path.read_text(encoding="utf-8")
    if new in text:
        print(f"OK déjà appliqué: {label}")
        return
    if old not in text:
        raise SystemExit(f"ERREUR: motif introuvable pour {label} dans {path}")
    path.write_text(text.replace(old, new, 1), encoding="utf-8")
    print(f"OK: {label}")

root = Path.cwd()
view = root / "frontend/src/components/CountryDossierView.jsx"
peoples = root / "frontend/src/components/SouthAfricaPeoples.jsx"
society = root / "frontend/src/components/SouthAfricaSocietyQuality.jsx"
edu = root / "frontend/src/components/SouthAfricaEducationHealthQuality.jsx"
economy = root / "frontend/src/components/SouthAfricaEconomyQuality.jsx"
international = root / "frontend/src/components/SouthAfricaInternationalQuality.jsx"
backend_init = root / "backend/data/country_dossiers/__init__.py"

for p in [view, peoples, society, edu, economy, international, backend_init]:
    if not p.exists():
        raise SystemExit(f"ERREUR: fichier introuvable: {p}")

text = backend_init.read_text(encoding="utf-8")
if "south_africa_deep_history" not in text:
    text = text.replace(
        "from .south_africa_society_state import SOUTH_AFRICA_SOCIETY_STATE\n",
        "from .south_africa_society_state import SOUTH_AFRICA_SOCIETY_STATE\nfrom .south_africa_deep_history import DEEP_HISTORY, DEEP_HISTORY_SOURCES\n",
        1,
    )
    insertion = '''
SOUTH_AFRICA_DOSSIER["deep_history"] = DEEP_HISTORY
SOUTH_AFRICA_DOSSIER["pre1652_map"] = DEEP_HISTORY.get("pre1652_map")
_existing_source_ids = {item["id"] for item in SOUTH_AFRICA_DOSSIER.get("sources", [])}
SOUTH_AFRICA_DOSSIER.setdefault("sources", []).extend(
    item for item in DEEP_HISTORY_SOURCES if item["id"] not in _existing_source_ids
)

'''
    text = text.replace("COUNTRY_DOSSIERS = {\n", insertion + "COUNTRY_DOSSIERS = {\n", 1)
    backend_init.write_text(text, encoding="utf-8")
    print("OK: histoire profonde backend")
else:
    print("OK déjà appliqué: histoire profonde backend")

replace_once(
    peoples,
    'const getRegion = (item) => item.region || item.location || item.area || "Répartition à préciser";',
    'const getRegion = (item) => item.region || item.location || item.area || "Répartition à préciser";\nconst languageText = (value) => Array.isArray(value) ? value.join(" ") : String(value || "");\nconst languageList = (value) => Array.isArray(value) ? value : value ? [value] : [];',
    "normalisation langues peuples",
)
replace_once(
    peoples,
    'const haystack = `${getName(item)} ${getSummary(item)} ${getRegion(item)} ${(item.languages || []).join(" ")}`.toLowerCase();',
    'const haystack = `${getName(item)} ${getSummary(item)} ${getRegion(item)} ${languageText(item.languages)}`.toLowerCase();',
    "recherche peuples",
)
replace_once(
    peoples,
    '{item.languages.map((language) => (',
    '{languageList(item.languages).map((language) => (',
    "affichage langues peuples",
)

replace_once(
    society,
    '() => dossier.society?.topics || dossier.society_topics || dossier.society || [],',
    '() => dossier.society?.themes || dossier.society?.topics || dossier.society_topics || [],',
    "société themes",
)

replace_once(
    edu,
    '  const education = dossier.education_health?.education || dossier.education || [];\n  const health = dossier.education_health?.health || dossier.health || [];\n  const educationItems = Array.isArray(education) ? education : [];\n  const healthItems = Array.isArray(health) ? health : [];',
    '  const education = dossier.education_health?.education || dossier.education || {};\n  const health = dossier.education_health?.health || dossier.health || {};\n  const educationItems = Array.isArray(education) ? education : (education.items || []);\n  const healthItems = Array.isArray(health) ? health : (health.items || []);',
    "éducation santé items",
)

replace_once(
    economy,
    '  const candidates = [\n    economy.sections,\n    economy.topics,\n    economy.sectors,\n    economy.items,\n    dossier.economy_topics,\n  ];\n\n  return candidates.find(Array.isArray) || [];',
    '  const candidates = [\n    economy.sections,\n    economy.topics,\n    economy.sectors,\n    economy.items,\n    economy.historicalTransformations,\n    economy.challenges,\n    dossier.economy_topics,\n  ];\n\n  return candidates.filter(Array.isArray).flat();',
    "économie groupes",
)
replace_once(
    economy,
    '  const indicators =\n    dossier.economy?.indicators ||\n    dossier.economic_indicators ||\n    [];',
    '  const indicators =\n    dossier.economy?.currentIndicators ||\n    dossier.economy?.indicators ||\n    dossier.economic_indicators ||\n    [];',
    "économie indicateurs",
)

replace_once(
    international,
    '    international.items,\n    international.organizations,',
    '    international.items,\n    international.memberships,\n    international.organizations,',
    "international memberships",
)

view_text = view.read_text(encoding="utf-8")
anchor = 'import { SouthAfricaOverview } from "./SouthAfricaOverview";'
for line in [
    'import { SouthAfricaCountryMap, SouthAfricaMigrationMap } from "./SouthAfricaVisuals";',
    'import SouthAfricaPre1652Routes from "./SouthAfricaPre1652Routes";',
    'import SouthAfricaDeepHistory from "./SouthAfricaDeepHistory";',
]:
    if line not in view_text:
        view_text = view_text.replace(anchor, anchor + "\n" + line, 1)

view_text = view_text.replace(
    '{active === "provinces-cities" && <SouthAfricaProvincesCities dossier={dossier} sourceMap={sourceMap} />}',
    '{active === "provinces-cities" && (<div className="space-y-10"><SouthAfricaCountryMap cities={dossier.map_visuals?.cities || []} /><SouthAfricaProvincesCities dossier={dossier} sourceMap={sourceMap} /></div>)}',
    1,
)

view_text = view_text.replace(
    '{active === "migrations" && <SouthAfricaMigrations dossier={dossier} sourceMap={sourceMap} />}',
    '{active === "migrations" && (<div className="space-y-10"><SouthAfricaPre1652Routes data={dossier.pre1652_map} sourceMap={sourceMap} /><SouthAfricaMigrationMap routes={dossier.map_visuals?.migration_routes || []} note={dossier.map_visuals?.note} /><SouthAfricaMigrations dossier={dossier} sourceMap={sourceMap} /></div>)}',
    1,
)

view_text = view_text.replace(
    '{active === "timeline" && <SouthAfricaHistory dossier={dossier} sourceMap={sourceMap} />}',
    '{active === "timeline" && (<div className="space-y-10"><SouthAfricaDeepHistory data={dossier.deep_history} sourceMap={sourceMap} /><SouthAfricaHistory dossier={dossier} sourceMap={sourceMap} /></div>)}',
    1,
)

view.write_text(view_text, encoding="utf-8")
print("OK: cartes et histoire profonde restaurées")
print("CORRECTION TERMINÉE")
