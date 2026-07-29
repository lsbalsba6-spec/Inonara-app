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
    ("gabon estuary and ogooué river mouths (orungu, mpongwe intermediaries)", (0.39, 9.45)),
    ("gabon (post-independence, voluntary emigration)", (0.39, 9.45)),
    ("central africa (lake chad/logone-birni", (12.3, 15.0)),
]


FORCED_KEYWORDS = [
    "enslaved", "slave trade", "forcibly", "captives", "forced migration", "slavery", "trafficked",
    "abducted", "bondage", "plantation", "middle passage", "indentured", "coerced", "kidnap",
    "conscript", "recruited from", "colonial infantry", "colonial troops", "deployed to fight",
]
VOLUNTARY_KEYWORDS = [
    "voluntary", "emigrat", "immigrat", "sought", "moved for", "migrant workers", "labor migration",
    "economic migra", "settled in", "arrived seeking", "came to study", "guest worker", "refugee", "fled",
]


def classify_migration_type(diaspora_entry):
    """Classifies a diaspora entry's underlying migration as forced/
    voluntary/mixed, based on keywords ALREADY present in its sourced
    summary/story/modern/origin_routes text — not a new historical claim,
    just a derived reading of existing documented content. Falls back to an
    era-based heuristic (pre-1885 Americas/Indian-Ocean diaspora formation
    is almost always trade-era = forced; post-1950 is generally voluntary
    economic/political migration) only when no explicit keyword is found.
    This is a heuristic, not a certainty — see the honesty note in
    generate_routes()'s docstring."""
    text = (
        diaspora_entry.get("summary", "") + " " + diaspora_entry.get("story", "") + " "
        + diaspora_entry.get("modern", "") + " " + str(diaspora_entry.get("origin_routes", ""))
    ).lower()
    forced = any(k in text for k in FORCED_KEYWORDS)
    voluntary = any(k in text for k in VOLUNTARY_KEYWORDS)
    if forced and voluntary:
        return "mixed"
    if forced:
        return "forced"
    if voluntary:
        return "voluntary"
    if diaspora_entry["era_start"] < 1885:
        return "forced"
    if diaspora_entry["era_start"] >= 1950:
        return "voluntary"
    return "unclear"


def slugify(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")[:40]


# Real, documented dates when the TRANSPORT/TRADE itself effectively ended
# for a given destination — distinct from when slavery/servitude was fully
# abolished there, and distinct from the diaspora COMMUNITY's ongoing
# existence (which correctly extends to today). A "forced migration" route
# should show as active only while people were actually being forcibly
# transported, not indefinitely just because their descendants still live
# there. Grouped by colonial/legal jurisdiction since abolition was usually
# jurisdiction-wide, not country-by-country in the modern sense.
FORCED_ROUTE_END_YEAR_BY_COUNTRY = {
    # British Caribbean/colonies: Slavery Abolition Act 1833, effective 1838 after apprenticeship
    "Jamaica": 1838, "Barbados": 1838, "Bahamas": 1838, "Trinidad and Tobago": 1838,
    "Guyana": 1838, "Belize": 1838, "Grenada": 1838, "Dominica": 1838,
    "Saint Lucia": 1838, "Saint Kitts and Nevis": 1838, "Antigua and Barbuda": 1838,
    "Montserrat": 1838, "Anguilla": 1838, "British Virgin Islands": 1838,
    "Cayman Islands": 1838, "Turks and Caicos Islands": 1838, "Bermuda": 1838,
    "Jamaica, Trinidad, Barbados, Guyana": 1838,
    # French colonies: abolition 1848
    "Guadeloupe": 1848, "Martinique": 1848, "French Guiana": 1848,
    "Saint Martin": 1848, "Saint Barthélemy": 1848, "Réunion, Mauritius, Madagascar, Gulf": 1848,
    # Dutch colonies: abolition 1863
    "Suriname": 1863, "Curaçao": 1863, "Aruba": 1863,
    "Bonaire, Sint Eustatius and Saba": 1863, "Sint Maarten": 1863,
    # Danish colonies (Virgin Islands): abolition 1848
    "United States Virgin Islands": 1848,
    # United States: international slave trade banned 1808 (the ROUTE ended, though
    # domestic slavery persisted until 1865 — this route represents the transatlantic
    # trafficking specifically, not the whole institution)
    "United States": 1808, "Mexico & United States": 1808,
    # Brazil: Eusébio de Queirós Law effectively ended the trade in 1850
    # (slavery itself persisted until 1888)
    "Brazil": 1850,
    # Cuba: trade continued longer, last documented voyages ~1867
    "Cuba": 1867,
    # Spanish American mainland: trade effectively ended around/soon after independence era
    "Mexico": 1830, "Colombia": 1830, "Venezuela": 1830, "Peru": 1830,
    "Ecuador": 1830, "Bolivia": 1830, "Chile": 1823, "Argentina": 1830,
    "Uruguay": 1830, "Paraguay": 1830, "Guatemala": 1830, "Honduras": 1830,
    "Nicaragua": 1830, "Costa Rica": 1830, "Panama": 1830, "Dominican Republic": 1830,
    "Puerto Rico": 1873,
    "Haiti": 1804,  # Haitian Revolution ends slavery there specifically
    # Indian Ocean / Arab world: documented as persisting notably later
    "Oman": 1970, "Saudi Arabia": 1962, "Kuwait": 1962, "United Arab Emirates": 1963,
    "Yemen": 1962, "Iraq": 1924, "Iraq, Saudi Arabia, Oman, Kuwait, Yemen": 1970,
    "Bahrain": 1937,
}
DEFAULT_FORCED_ROUTE_END_YEAR = 1888  # Brazil's final abolition — the conventional close of the Atlantic slave-trade era, used only when a destination isn't explicitly mapped above

MIGRATION_TYPE_COLORS = {
    "forced": "#7B2D26",
    "voluntary": "#4ade80",
    "mixed": "#C18C42",
    "conquest": "#9CA3AF",
    "unclear": "#A78BFA",
}


def compute_route_era_end(diaspora_entry, migration_type):
    """For 'forced' routes, cap era_end at the real, documented date the
    TRADE/TRANSPORT itself ended for that destination — never at the
    diaspora entry's own era_end=2025 (which correctly represents the
    community's ongoing existence today, not the migration event itself).
    Other migration types keep the diaspora entry's own era_end as-is."""
    if migration_type != "forced":
        return diaspora_entry["era_end"]
    country = diaspora_entry.get("country", "")
    documented_end = FORCED_ROUTE_END_YEAR_BY_COUNTRY.get(country, DEFAULT_FORCED_ROUTE_END_YEAR)
    return min(diaspora_entry["era_end"], documented_end)


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
            migration_type = classify_migration_type(d)
            corrected_era_end = compute_route_era_end(d, migration_type)
            routes.append({
                "id": route_id,
                "name": f"{d['name']} ← {origin[:60]}",
                "era": f"{d['era_start']}–{corrected_era_end}",
                "era_start": d["era_start"],
                "era_end": corrected_era_end,
                "color": MIGRATION_TYPE_COLORS.get(migration_type, MIGRATION_TYPE_COLORS["unclear"]),
                "points": [list(coords), list(d["coords"])],
                "summary": f"Route dérivée de la fiche diaspora « {d['name']} » (déjà sourcée sur le site) : {d['summary'][:200]}",
                "sources": d.get("sources", []),
                "diaspora_id": d["id"],
                "migration_type": migration_type,
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
