#!/usr/bin/env python3
from backend.data.country_dossiers import COUNTRY_DOSSIERS
from backend.data import PLACES, STORIES

bw = COUNTRY_DOSSIERS.get("botswana")
if not bw:
    raise SystemExit("Botswana absent")
if len(bw.get("figures", [])) < 14:
    raise SystemExit("Figures V2 non intégrées")
if len(bw.get("peoples", [])) < 12:
    raise SystemExit("People V2 non intégrés")
if len(bw.get("stories", [])) < 9:
    raise SystemExit("Stories V2 non intégrées")
print("OK Botswana V2")
print("- figures:", len(bw.get("figures", [])))
print("- peoples:", len(bw.get("peoples", [])))
print("- stories:", len(bw.get("stories", [])))
print("- lieux V2:", sum(1 for x in PLACES if str(x.get("id","")).endswith("bw-v2")))
print("- stories globales V2:", sum(1 for x in STORIES if str(x.get("id","")).endswith("bw-v2")))
