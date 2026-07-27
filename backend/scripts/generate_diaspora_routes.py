"""Generates one migration-route line per (diaspora entry x origin region)
pair, derived ENTIRELY from the already-sourced DIASPORA_COMMUNITIES data
(world_diaspora.py + related files) — no new historical claims are
invented. Each route reuses that diaspora entry's own era_start/era_end and
sources, so it appears/disappears on the timeline exactly when the real,
documented migration happened.

Per explicit user requirement: one distinct line per diaspora/origin pair,
never consolidated into a single summarizing line. Entries whose
origin_routes text does not match a recognized AFRICAN region are SKIPPED
(not defaulted to a generic point) to avoid misattributing non-African
origin threads (e.g. a Taiwan-Austronesian admixture layer mentioned for
context) as African diaspora routes.
"""
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from data import DIASPORA_COMMUNITIES

# Canonical AFRICAN region name -> approximate representative [lat, lon].
# Ordered longest/most-specific key first for matching priority.
REGION_COORDS = [
    ("west-central africa (kongo, angola, benguela)", (-9.5, 14.5)),
    ("west-central africa (angola, kongo)", (-9.5, 14.5)),
    ("west-central africa (kongo, angola)", (-9.5, 14.5)),
    ("west-central africa (kongo)", (-5.8, 13.3)),
    ("west-central africa (angola)", -11.2),
    ("west-central africa (bantu-speaking regions)", (-9.5, 14.5)),
    ("west-central africa", (-9.5, 14.5)),
    ("bight of benin (yoruba, ewe, fon)", (6.3, 2.4)),
    ("bight of benin (fon, ewe, yoruba)", (6.3, 2.4)),
    ("bight of benin (yoruba)", (6.3, 2.4)),
    ("bight of benin", (6.3, 2.4)),
    ("bight of biafra (igbo)", (4.8, 7.0)),
    ("bight of biafra", (4.8, 7.0)),
    ("gold coast (akan)", (5.5, -0.2)),
    ("dutch gold coast", (5.5, -0.2)),
    ("gold coast (via danish gold coast forts)", (5.5, -0.2)),
    ("gold coast", (5.5, -0.2)),
    ("senegambia (wolof, mande, fula)", (14.7, -17.4)),
    ("senegambia (very early)", (14.7, -17.4)),
    ("senegambia", (14.7, -17.4)),
    ("sierra leone / windward coast", (8.48, -13.2)),
    ("sierra leone", (8.48, -13.2)),
    ("mozambique and madagascar", (-18.67, 35.53)),
    ("mozambique and other portuguese african territories", (-18.67, 35.53)),
    ("mozambique via portuguese routes", (-18.67, 35.53)),
    ("mozambique (most historians", (-18.67, 35.53)),
    ("mozambique", (-18.67, 35.53)),
    ("madagascar", (-18.9, 47.5)),
    ("east african coast (zanzibar, mozambique, somalia)", (-6.16, 39.2)),
    ("east african coast (zanzibar, tanzania, kenya)", (-6.16, 39.2)),
    ("east african coast (mozambique", (-6.16, 39.2)),
    ("east african coast via", (-6.16, 39.2)),
    ("east african coast (historical", (-6.16, 39.2)),
    ("east african coast", (-6.16, 39.2)),
    ("zanzibar and the east african coast", (-6.16, 39.2)),
    ("east africa via the swahili coast", (-6.16, 39.2)),
    ("east africa or the ottoman empire", (-6.16, 39.2)),
    ("east africa (historical, via indian ocean", (-6.16, 39.2)),
    ("east africa (historical, via red sea", (-6.16, 39.2)),
    ("east and central africa via ottoman", (-6.16, 39.2)),
    ("east africa, via an early out-of-africa migration", (12.5, 43.0)),
    ("east africa", (2.0, 38.0)),
    ("ethiopian highlands (aksumite", (14.1, 38.7)),
    ("ethiopian highlands (gondar", (12.6, 37.5)),
    ("ethiopian highlands (habesha)", (9.0, 38.7)),
    ("ethiopian highlands", (9.0, 38.7)),
    ("ethiopia (abyssinia)", (9.0, 38.7)),
    ("ethiopia (predominant", (9.0, 38.7)),
    ("ethiopia and zanzibar", (9.0, 38.7)),
    ("ethiopia", (9.0, 38.7)),
    ("somalia (post-1991", (5.15, 46.2)),
    ("somalia", (5.15, 46.2)),
    ("sudanese nile valley", (15.5, 32.5)),
    ("sudan", (15.5, 32.5)),
    ("south sudan", (7.3, 30.0)),
    ("eritrea", (15.3, 38.9)),
    ("nigeria and other west african", (9.08, 8.68)),
    ("nigeria, ghana", (9.08, 8.68)),
    ("nigeria", (9.08, 8.68)),
    ("cape verde", (16.0, -24.0)),
    ("guinea-bissau", (11.8, -15.2)),
    ("são tomé and príncipe", (0.19, 6.61)),
    ("angola", (-11.2, 17.9)),
    ("democratic republic of the congo", (-4.0, 21.8)),
    ("central africa (drc", (-4.0, 21.8)),
    ("republic of the congo", (-0.23, 15.8)),
    ("central african republic", (6.6, 20.9)),
    ("chad", (15.45, 18.7)),
    ("rwanda", (-1.9, 29.9)),
    ("burundi", (-3.4, 29.9)),
    ("kenya, uganda, nigeria", (0.0, 37.9)),
    ("kenya", (0.0, 37.9)),
    ("algeria", (28.0, 2.6)),
    ("kabylia", (36.7, 4.5)),
    ("maghreb", (28.0, 2.6)),
    ("libya", (26.3, 17.2)),
    ("equatorial guinea", (1.65, 10.27)),
    ("cameroon", (7.37, 12.35)),
    ("german colonial territories (tanzania, namibia, cameroon, togo)", (-6.3, 34.9)),
    ("guinea (postcolonial", (1.65, 10.27)),
    ("dutch caribbean islands", None),
    ("gold coast, presentday ghana", (5.5, -0.2)),
    ("senegal, gambia, nigeria", (14.7, -17.4)),
    ("senegal, mali", (14.7, -17.4)),
    ("senegal (via centuries of hajj", (14.7, -17.4)),
    ("west africa (senegal, mali", (14.7, -17.4)),
    ("west africa (via centuries of hajj", (14.7, -17.4)),
    ("west african migration", (9.0, 2.0)),
    ("west and central africa (drc to belgium", (-4.0, 21.8)),
    ("west and central africa (french colonial recruitment", (9.0, 2.0)),
    ("west and central africa via french colonial military recruitment", (9.0, 2.0)),
    ("west and central africa (via american loyalist", (9.0, 2.0)),
    ("west and central africa (via shipwreck", (9.0, 2.0)),
    ("west and central africa (colonial era)", (9.0, 2.0)),
    ("west and west-central africa (akan/ashanti, kongo", (5.5, 5.0)),
    ("west and west-central africa via british caribbean plantation slavery", (5.5, 5.0)),
    ("west and west-central africa via british caribbean trade networks", (5.5, 5.0)),
    ("west and west-central africa via dutch suriname", (5.5, 5.0)),
    ("west and west-central africa via dutch and later british guiana", (5.5, 5.0)),
    ("west and west-central africa via dutch plantation colonies", (5.5, 5.0)),
    ("west and west-central africa via french caribbean trade networks", (5.5, 5.0)),
    ("west and west-central africa via french and british caribbean plantation slavery", (5.5, 5.0)),
    ("west and west-central africa via french and british caribbean slavery", (5.5, 5.0)),
    ("west and west-central africa via both french and dutch caribbean trade networks", (5.5, 5.0)),
    ("west and west-central africa via the british atlantic maritime trade", (5.5, 5.0)),
    ("west and west-central africa via the british caribbean plantation trade", (5.5, 5.0)),
    ("west and west-central africa via the british caribbean sugar trade", (5.5, 5.0)),
    ("west and west-central africa via the british caribbean trade", (5.5, 5.0)),
    ("west and west-central africa via the british sugar-colony trade", (5.5, 5.0)),
    ("west and west-central africa via the danish caribbean slave trade", (5.5, 5.0)),
    ("west and west-central africa via the dutch caribbean salt", (5.5, 5.0)),
    ("west and west-central africa via the dutch caribbean slave trade", (5.5, 5.0)),
    ("west and west-central africa via the french caribbean slave trade", (5.5, 5.0)),
    ("west and west-central africa via the french and british caribbean slave trade", (5.5, 5.0)),
    ("west and west-central africa via the french and, later, swedish", (5.5, 5.0)),
    ("west and west-central africa via the spanish caribbean slave trade", (5.5, 5.0)),
    ("west and west-central africa via the viceroyalty of peru", (5.5, 5.0)),
    ("west and west-central africa via the earliest english and french caribbean", (5.5, 5.0)),
    ("west and west-central africa, including a notable later wave", (5.5, 5.0)),
    ("west and west-central africa, largely via jamaica", (5.5, 5.0)),
    ("west and west-central africa, largely via the bahamas", (5.5, 5.0)),
    ("west and west-central africa", (5.5, 5.0)),
    ("gold coast (present-day ghana)", (5.5, -0.2)),
    ("guinea-bissau", (11.8, -15.2)),
    ("liberated africans from intercepted slave ships", (8.48, -13.2)),
    ("sub-saharan africa (particularly somalia, eritrea, nigeria", (9.0, 20.0)),
    ("sub-saharan africa via the trans-saharan", (17.0, 10.0)),
    ("central/west africa (present-day nigeria or chad", (9.08, 8.68)),
    ("central africa (lake chad/logone-birni", (12.3, 15.0)),
]


def slugify(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")[:40]


def find_coords(origin_text):
    t = origin_text.lower()
    for key, coords in REGION_COORDS:
        if key in t and coords is not None:
            return coords
    return None


def generate_routes():
    routes = []
    skipped = []
    for d in DIASPORA_COMMUNITIES:
        for origin in d.get("origin_routes", []):
            coords = find_coords(origin)
            if coords is None:
                skipped.append((d["id"], origin))
                continue
            route_id = f"diaspora-{d['id']}-from-{slugify(origin)}"
            routes.append({
                "id": route_id,
                "name": f"{d['name']} ← {origin[:60]}",
                "era": f"{d['era_start']}–{d['era_end']}",
                "era_start": d["era_start"],
                "era_end": d["era_end"],
                "color": "#7B2D26",
                "points": [list(coords), list(d["coords"])],
                "summary": f"Route dérivée de la fiche diaspora « {d['name']} » (déjà sourcée sur le site) : {d['summary'][:200]}",
                "sources": d.get("sources", []),
            })
    return routes, skipped


if __name__ == "__main__":
    routes, skipped = generate_routes()
    print(f"Generated {len(routes)} routes")
    print(f"Skipped {len(skipped)} origin phrases (no confident African-region match)")
    out_path = Path(__file__).resolve().parent.parent / "data" / "diaspora_derived_routes.json"
    out_path.write_text(json.dumps(routes, indent=2, ensure_ascii=False))
    print(f"Wrote {out_path}")
    print()
    print("--- Skipped (first 30, for review) ---")
    for sid, o in skipped[:30]:
        print(f"  {sid}: {o[:80]}")
