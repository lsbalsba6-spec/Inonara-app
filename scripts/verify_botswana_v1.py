#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path.cwd()
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(ROOT / "backend"))
from backend.data.country_dossiers import COUNTRY_DOSSIERS
from backend.data import PLACES, FIGURES, ETHNIC_GROUPS, CULTURE_ITEMS, STORIES, LINEAGE_JOURNEY

dossier = COUNTRY_DOSSIERS.get("botswana")
if not dossier:
    raise SystemExit("Dossier Botswana absent")

required = ("overview", "geography", "history", "peoples", "figures", "culture", "heritage", "economy", "society", "education_health", "environment", "stories", "sources")
missing = [key for key in required if key not in dossier]
if missing:
    raise SystemExit("Sections manquantes: " + ", ".join(missing))

if len(dossier.get("peoples", [])) < 7 or len(dossier.get("figures", [])) < 8 or len(dossier.get("stories", [])) < 5:
    raise SystemExit("Volume Botswana V1 incomplet")

print("OK Botswana V1")
print(f"- peuples dossier: {len(dossier['peoples'])}")
print(f"- figures dossier: {len(dossier['figures'])}")
print(f"- culture dossier: {len(dossier['culture'])}")
print(f"- patrimoine dossier: {len(dossier['heritage'])}")
print(f"- stories dossier: {len(dossier['stories'])}")
print(f"- sources dossier: {len(dossier['sources'])}")
print(f"- lieux Botswana globaux: {sum(1 for item in PLACES if item.get('id','').endswith('-v1') and item.get('name') in {'Gaborone','Francistown','Maun','Kasane','Delta de l’Okavango','Tsodilo Hills','Chobe National Park','Central Kalahari Game Reserve','Makgadikgadi Pans','Serowe','Domboshaba','Three Dikgosi Monument'})}")
print(f"- figures Botswana globales: {sum(1 for item in FIGURES if item.get('region') == 'Botswana')}")
print(f"- people Botswana globaux: {sum(1 for item in ETHNIC_GROUPS if item.get('id','').endswith('-v1'))}")
print(f"- culture Botswana globale: {sum(1 for item in CULTURE_ITEMS if item.get('id','').endswith('-v1'))}")
print(f"- journey Botswana: {sum(1 for item in LINEAGE_JOURNEY.get('stops',[]) if item.get('id','').endswith('-v1'))}")
