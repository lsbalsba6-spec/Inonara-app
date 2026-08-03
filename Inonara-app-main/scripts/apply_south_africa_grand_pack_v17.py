#!/usr/bin/env python3
from pathlib import Path
ROOT=Path.cwd()

def merge(target,incoming):
    existing={x.get("id") or x.get("title") or x.get("name") or x.get("topic") for x in target}
    target.extend(x for x in incoming if (x.get("id") or x.get("title") or x.get("name") or x.get("topic")) not in existing)

p=ROOT/"backend/data/country_dossiers/__init__.py"
if not p.exists(): raise SystemExit("Lance ce script depuis la racine de ~/inonara-app")
text=p.read_text(encoding="utf-8")
imp="from .south_africa_grand_pack_v17 import SOUTH_AFRICA_GRAND_PACK_V17\n"
anchor="from .south_africa_deep_history import DEEP_HISTORY, DEEP_HISTORY_SOURCES\n"
if imp not in text: text=text.replace(anchor,anchor+imp,1)
block="""
# South Africa massive grand pack V17
_gp17 = SOUTH_AFRICA_GRAND_PACK_V17
_merge_gp17 = lambda target, incoming: target.extend(
    item for item in incoming
    if (item.get("id") or item.get("title") or item.get("name") or item.get("topic"))
    not in {x.get("id") or x.get("title") or x.get("name") or x.get("topic") for x in target}
)
_merge_gp17(SOUTH_AFRICA_DOSSIER.setdefault("figures", []), _gp17["figures"])
_merge_gp17(SOUTH_AFRICA_DOSSIER.setdefault("peoples", []), _gp17["peoples"])
_merge_gp17(SOUTH_AFRICA_DOSSIER.setdefault("society", {}).setdefault("themes", []), _gp17["society"])
_merge_gp17(SOUTH_AFRICA_DOSSIER.setdefault("education_health", {}).setdefault("education", {}).setdefault("items", []), _gp17["education"])
_merge_gp17(SOUTH_AFRICA_DOSSIER.setdefault("education_health", {}).setdefault("health", {}).setdefault("items", []), _gp17["health"])
_merge_gp17(SOUTH_AFRICA_DOSSIER.setdefault("economy", {}).setdefault("sections", []), _gp17["economy"])
_merge_gp17(SOUTH_AFRICA_DOSSIER.setdefault("heritage", []), _gp17["heritage"])
_merge_gp17(SOUTH_AFRICA_DOSSIER.setdefault("media_gallery", []), _gp17["gallery"])
_merge_gp17(SOUTH_AFRICA_DOSSIER.setdefault("sources", []), _gp17["additionalSources"])
# Remove xenophobia-specific cards while preserving broader migration history.
for section in [SOUTH_AFRICA_DOSSIER.get("society", {}).get("themes", []), SOUTH_AFRICA_DOSSIER.get("culture", [])]:
    section[:] = [item for item in section if "xenoph" not in str(item).lower()]

"""
if "# South Africa massive grand pack V17" not in text:
    text=text.replace("COUNTRY_DOSSIERS = {\n",block+"COUNTRY_DOSSIERS = {\n",1)
p.write_text(text,encoding="utf-8")

p=ROOT/"backend/data/__init__.py"
text=p.read_text(encoding="utf-8")
imp="from .country_dossiers.south_africa_grand_pack_v17 import SOUTH_AFRICA_GRAND_PACK_V17\n"
anchor="from .south_africa_ecosystem_complete import (\n"
if imp not in text: text=text.replace(anchor,imp+"\n"+anchor,1)
block="""
# South Africa global ecosystem V17
_gp17 = SOUTH_AFRICA_GRAND_PACK_V17

def _append_unique_v17(target, incoming):
    existing={item.get("id") for item in target}
    target.extend(item for item in incoming if item.get("id") not in existing)

_append_unique_v17(PLACES, _gp17["places"])
_append_unique_v17(STORIES, _gp17["stories"])
_append_unique_v17(SA_TIMELINE_EVENTS, _gp17["timeline"])
_append_unique_v17(LINEAGE_JOURNEY.setdefault("stops", []), _gp17["journey"])
LINEAGE_JOURNEY["stops"] = sorted(LINEAGE_JOURNEY["stops"], key=lambda x: x.get("year", 10**12))

_existing_figures_v17={x.get("id") for x in FIGURES}
FIGURES.extend({
    "id":x["id"], "name":x["name"],
    "category":"scientists" if any(k in x.get("field","") for k in ["Épidémiologie","Génétique","Paléoanthropologie","Technologie"]) else "athletes" if x.get("field") in ["Rugby","Natation"] else "artists" if any(k in x.get("field","") for k in ["Littérature","Musique","Arts"] ) else "leaders",
    "era":x.get("lifespan","XXe–XXIe siècles"), "region":"South Africa", "lifespan":x.get("lifespan"),
    "summary":x.get("reason"), "story":" ".join(x.get("paragraphs",[])), "legacy":x.get("legacy"),
    "sources":x.get("sources",[]), "wikipedia_title":x.get("wikipedia_title"), "image_source_url":x.get("image_source_url"), "image_credit":x.get("image_credit"), "visual_kind":x.get("visual_kind","photograph")
} for x in _gp17["figures"] if x.get("id") not in _existing_figures_v17)

_existing_people_v17={x.get("id") for x in ETHNIC_GROUPS}
ETHNIC_GROUPS.extend({
    "id":x["id"], "name":x["name"], "homeland":x.get("region",""), "coords":[-29.0,25.0],
    "population":"Communautés contemporaines diverses", "language_family":"Voir la fiche détaillée",
    "summary":x.get("history",""), "language":", ".join(x.get("languages",[])),
    "religion":"Pratiques diverses selon les communautés", "culture":"Voir la fiche pays détaillée",
    "diaspora":"Mobilités internes, régionales et internationales selon les communautés", "sources":x.get("sources",[]),
    "wikipedia_title":x.get("wikipedia_title"), "image_source_url":x.get("image_source_url"), "image_credit":x.get("image_credit"), "visual_kind":"photograph"
} for x in _gp17["peoples"] if x.get("id") not in _existing_people_v17)

"""
if "# South Africa global ecosystem V17" not in text:
    text=text.replace("# Backfill missing sources arrays on older PLACES entries\n",block+"# Backfill missing sources arrays on older PLACES entries\n",1)
p.write_text(text,encoding="utf-8")
print("OK: grand pack V17 appliqué.")
