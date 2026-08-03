#!/usr/bin/env python3
from backend.data.country_dossiers import COUNTRY_DOSSIERS
from backend.data import PLACES, STORIES

bw = COUNTRY_DOSSIERS.get("botswana")
if not bw:
    raise SystemExit("Botswana absent")

if not any(item.get("id") == "figure-unity-dow-bw-v3" for item in bw.get("figures", [])):
    raise SystemExit("Biographies V3 non intégrées")
if not any(item.get("id") == "people-baherero-bw-v3" for item in bw.get("peoples", [])):
    raise SystemExit("People V3 non intégrés")
if not any(item.get("id") == "story-debswana-bw-v3" for item in bw.get("stories", [])):
    raise SystemExit("Stories V3 non intégrées")
if not any(item.get("id") == "place-lobatse-bw-v3" for item in PLACES):
    raise SystemExit("Atlas V3 non intégré")

print("OK Botswana V3")
print("- figures totales:", len(bw.get("figures", [])))
print("- peoples totaux:", len(bw.get("peoples", [])))
print("- culture totale:", len(bw.get("culture", [])))
print("- patrimoine total:", len(bw.get("heritage", [])))
print("- stories totales:", len(bw.get("stories", [])))
print("- lieux V3:", sum(1 for x in PLACES if str(x.get("id","")).endswith("bw-v3")))
print("- stories globales V3:", sum(1 for x in STORIES if str(x.get("id","")).endswith("bw-v3")))
