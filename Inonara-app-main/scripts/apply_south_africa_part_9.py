from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

init_path = ROOT / "backend/data/country_dossiers/__init__.py"
text = init_path.read_text(encoding="utf-8")
if "SOUTH_AFRICA_TIMELINE_ECONOMY" not in text:
    text = text.replace(
        "from .south_africa import SOUTH_AFRICA_DOSSIER\n",
        "from .south_africa import SOUTH_AFRICA_DOSSIER\nfrom .south_africa_timeline_economy import SOUTH_AFRICA_TIMELINE_ECONOMY\n\n"
        "SOUTH_AFRICA_DOSSIER[\"interactive_timeline\"] = SOUTH_AFRICA_TIMELINE_ECONOMY[\"interactive_timeline\"]\n"
        "SOUTH_AFRICA_DOSSIER[\"economy\"] = SOUTH_AFRICA_TIMELINE_ECONOMY[\"economy\"]\n"
        "SOUTH_AFRICA_DOSSIER[\"scientific_library\"] = SOUTH_AFRICA_TIMELINE_ECONOMY[\"scientificLibrary\"]\n"
        "_existing_source_ids = {item[\"id\"] for item in SOUTH_AFRICA_DOSSIER.get(\"sources\", [])}\n"
        "SOUTH_AFRICA_DOSSIER.setdefault(\"sources\", []).extend(\n"
        "    item for item in SOUTH_AFRICA_TIMELINE_ECONOMY[\"additionalSources\"] if item[\"id\"] not in _existing_source_ids\n"
        ")\n"
    )
    init_path.write_text(text, encoding="utf-8")

view_path = ROOT / "frontend/src/components/CountryDossierView.jsx"
view = view_path.read_text(encoding="utf-8")
import_line = 'import { SouthAfricaEconomy, SouthAfricaInteractiveTimeline, SouthAfricaScientificLibrary } from "./SouthAfricaTimelineEconomy";\n'
if "SouthAfricaTimelineEconomy" not in view:
    view = import_line + view

if '["interactive-timeline", "Chronologie"]' not in view:
    marker = '["overview", "Présentation"],'
    view = view.replace(marker, marker + ' ["interactive-timeline", "Chronologie"], ["economy", "Économie"],')

if '["library", "Bibliothèque"]' not in view:
    marker = '["research", "À approfondir"], ["sources", "Sources"],'
    if marker in view:
        view = view.replace(marker, '["research", "À approfondir"], ["library", "Bibliothèque"], ["sources", "Sources"],')
    else:
        view = view.replace('["sources", "Sources"],', '["library", "Bibliothèque"], ["sources", "Sources"],')

if 'active === "interactive-timeline"' not in view:
    marker = '{active === "timeline" && <Timeline items={dossier.timeline} sourceMap={sourceMap} />}'
    addition = marker + '\n        {active === "interactive-timeline" && <SouthAfricaInteractiveTimeline dossier={dossier} sourceMap={sourceMap} />}\n        {active === "economy" && <SouthAfricaEconomy dossier={dossier} sourceMap={sourceMap} />}'
    view = view.replace(marker, addition)

if 'active === "library"' not in view:
    marker = '{active === "sources" && <div className="space-y-4">'
    view = view.replace(marker, '{active === "library" && <SouthAfricaScientificLibrary dossier={dossier} sourceMap={sourceMap} />}\n        ' + marker)

view_path.write_text(view, encoding="utf-8")
print("South Africa part 9 applied.")
