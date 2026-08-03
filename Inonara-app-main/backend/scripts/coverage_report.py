"""Run this anytime to see real progress toward 'a diaspora/origins entry for every
country and island in the world'.

Usage (from backend/):
    python scripts/coverage_report.py
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from data.countries_registry import COUNTRY_REGISTRY
from data.diaspora_schema import LEGACY_COUNTRY_ALIASES
from data import DIASPORA_COMMUNITIES, AFRICA_ORIGIN_COUNTRIES


def covered_iso2_codes():
    covered = set()
    for entry in DIASPORA_COMMUNITIES:
        # New-schema entries: direct iso2 link
        if entry.get("country_iso2"):
            covered.add(entry["country_iso2"])
            continue
        # Legacy entries: resolve via alias map
        aliases = LEGACY_COUNTRY_ALIASES.get(entry.get("country", ""), [])
        covered.update(aliases)
    return covered


def main():
    covered = covered_iso2_codes()
    by_continent = {}
    for c in COUNTRY_REGISTRY:
        by_continent.setdefault(c["continent"], []).append(c)

    total = len(COUNTRY_REGISTRY)
    print(f"=== Couverture diaspora/origines : {len(covered)}/{total} pays & territoires ===\n")

    for continent in ["Africa", "Asia", "Europe", "North America", "South America", "Oceania", "Antarctica"]:
        countries = by_continent.get(continent, [])
        done = [c for c in countries if c["iso2"] in covered]
        missing = [c for c in countries if c["iso2"] not in covered]
        pct = round(100 * len(done) / len(countries)) if countries else 0
        print(f"{continent}: {len(done)}/{len(countries)} ({pct}%)")
        if missing:
            names = ", ".join(c["display_name"] for c in missing)
            print(f"  Manquants: {names}\n")

    # --- Africa origin-countries (separate collection: modern-country history pages) ---
    africa_countries = by_continent.get("Africa", [])
    origin_covered = {c["country_iso2"] for c in AFRICA_ORIGIN_COUNTRIES}
    done = [c for c in africa_countries if c["iso2"] in origin_covered]
    missing = [c for c in africa_countries if c["iso2"] not in origin_covered]
    pct = round(100 * len(done) / len(africa_countries)) if africa_countries else 0
    print(f"\n=== Pages 'pays d'origine' Afrique : {len(done)}/{len(africa_countries)} ({pct}%) ===")
    print("Documentés:", ", ".join(c["display_name"] for c in done))
    print("Restants:", ", ".join(c["display_name"] for c in missing))


if __name__ == "__main__":
    main()
