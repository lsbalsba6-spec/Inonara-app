"""Create an editorial review of legacy routes classified as ``mixed``.

The legacy classifier searched the whole diaspora fiche, so a route could be
marked ``mixed`` merely because the fiche described both a historical forced
movement and a different contemporary voluntary movement. This script reviews
those route candidates individually and proposes distinct movements.

It does not modify the public map or certify unverified dates. A proposal is
publishable only after its cited sources are checked and its status is changed
to ``ready``.
"""

from __future__ import annotations

import json
from pathlib import Path

BACKEND = Path(__file__).resolve().parent.parent
ROUTES_PATH = BACKEND / "data" / "diaspora_derived_routes.json"
OUTPUT_PATH = BACKEND / "data" / "migration_registry" / "mixed_route_review.json"
REPORT_PATH = BACKEND / "reports" / "mixed_route_review.md"

# Editorial decisions are route-specific. They deliberately avoid deriving a
# route type from the diaspora fiche as a whole.
DECISIONS = {
    "diaspora-afro-french-from-west-african-migration-senegal-mali-c-te": {
        "decision": "reclassify",
        "proposedMovements": [
            {
                "id": "movement-africa-france-postwar-migration",
                "migrationType": "voluntary",
                "subtype": "work-family-study",
                "startYear": None,
                "endYear": 2025,
                "integrationStatus": "provisional",
                "note": "Contemporary immigration to France must be represented separately from colonial slavery and overseas-department history. Exact start date remains to be researched.",
                "additionalSources": [
                    {
                        "title": "En 2023, 3,5 millions d'immigrés nés en Afrique vivent en France",
                        "publisher": "INSEE",
                        "url": "https://www.insee.fr/fr/statistiques/8237722",
                        "category": "A",
                    }
                ],
            }
        ],
    },
    "diaspora-afro-french-from-maghreb-migration-with-sub-saharan-herit": {
        "decision": "reclassify",
        "proposedMovements": [
            {
                "id": "movement-maghreb-france-migration",
                "migrationType": "voluntary",
                "subtype": "work-family-study-refuge",
                "startYear": None,
                "endYear": 2025,
                "integrationStatus": "provisional",
                "note": "The existing route description concerns modern migration, not a single forced-and-voluntary movement. Exact start date and the phrase 'sub-Saharan heritage' require source-by-source review.",
                "additionalSources": [
                    {
                        "title": "En 2023, 3,5 millions d'immigrés nés en Afrique vivent en France",
                        "publisher": "INSEE",
                        "url": "https://www.insee.fr/fr/statistiques/8237722",
                        "category": "A",
                    }
                ],
            }
        ],
    },
    "diaspora-afro-bahamian-from-west-and-central-africa-via-american-loy": {
        "decision": "reclassify",
        "proposedMovements": [
            {
                "id": "movement-enslaved-loyalists-bahamas",
                "migrationType": "forced",
                "subtype": "enslavement-relocation",
                "startYear": 1783,
                "endYear": None,
                "integrationStatus": "provisional",
                "note": "The movement concerns enslaved Africans carried by British Loyalists. The end year must be established from the cited historical work rather than inherited from the present-day community.",
                "additionalSources": [],
            }
        ],
    },
    "diaspora-afro-bahamian-from-liberated-africans-from-intercepted-slav": {
        "decision": "reclassify",
        "proposedMovements": [
            {
                "id": "movement-liberated-africans-bahamas",
                "migrationType": "forced",
                "subtype": "intercepted-slave-ships-resettlement",
                "startYear": 1807,
                "endYear": None,
                "integrationStatus": "provisional",
                "note": "These people were captives on illegal slave ships and were resettled after interception. The movement is not an ongoing mixed route; its terminal date requires direct review of the cited source.",
                "additionalSources": [],
            }
        ],
    },
    "diaspora-afro-trinidadian-from-west-and-west-central-africa-including-a": {
        "decision": "reclassify",
        "proposedMovements": [
            {
                "id": "movement-enslaved-africans-trinidad",
                "migrationType": "forced",
                "subtype": "transatlantic-slavery-and-recaptives",
                "startYear": 1783,
                "endYear": None,
                "integrationStatus": "provisional",
                "note": "The described Yoruba 'recaptives' and earlier enslaved populations are historical forced movements. Indian indenture mentioned in the fiche is a separate population history and must not make this African route mixed.",
                "additionalSources": [],
            }
        ],
    },
    "diaspora-afro-emirati-from-east-africa-historical-via-indian-ocean-": {
        "decision": "reclassify",
        "proposedMovements": [
            {
                "id": "movement-east-africa-trucial-states-forced",
                "migrationType": "forced",
                "subtype": "indian-ocean-slavery",
                "startYear": None,
                "endYear": 1963,
                "integrationStatus": "provisional",
                "note": "Historical enslavement must be a bounded route. The start date and exact jurisdictions require stronger historical sourcing; 1963 is retained only as the abolition date stated in the existing fiche.",
                "additionalSources": [],
            }
        ],
    },
    "diaspora-afro-emirati-from-kenya-uganda-nigeria-ethiopia-contempora": {
        "decision": "reclassify",
        "proposedMovements": [
            {
                "id": "movement-african-labour-uae",
                "migrationType": "voluntary",
                "subtype": "labour-migration",
                "startYear": None,
                "endYear": 2025,
                "integrationStatus": "provisional",
                "note": "Contemporary labour migration is distinct from historical enslavement. Exploitative employment conditions do not automatically turn the migration route itself into historical slavery.",
                "additionalSources": [
                    {
                        "title": "United Arab Emirates",
                        "publisher": "International Labour Organization",
                        "url": "https://www.ilo.org/regions-and-countries/arab-states/united-arab-emirates",
                        "category": "C",
                    }
                ],
            }
        ],
    },
    "diaspora-afro-omani-from-zanzibar-and-the-east-african-coast-via-": {
        "decision": "split",
        "proposedMovements": [
            {
                "id": "movement-east-africa-oman-historical-coercion-trade",
                "migrationType": "unclassified",
                "subtype": "trade-rule-enslavement",
                "startYear": 1698,
                "endYear": 1970,
                "integrationStatus": "research-gap",
                "note": "The legacy text combines Omani political rule, trade, intermarriage and slavery. These cannot be represented as one route until each movement is sourced separately.",
                "additionalSources": [],
            },
            {
                "id": "movement-zanzibar-oman-1964-refugees",
                "migrationType": "refugee",
                "subtype": "political-refuge",
                "startYear": 1964,
                "endYear": None,
                "integrationStatus": "provisional",
                "note": "The post-revolution movement to Oman is a distinct refugee/return movement, not a continuation of centuries of trade or enslavement. Its end year requires research.",
                "additionalSources": [],
            },
        ],
    },
    "diaspora-afro-norwegian-from-somalia-post-1991-civil-war": {
        "decision": "reclassify",
        "proposedMovements": [
            {
                "id": "movement-somalia-norway-refugees",
                "migrationType": "refugee",
                "subtype": "protection-and-family-reunification",
                "startYear": 1991,
                "endYear": 2025,
                "integrationStatus": "provisional",
                "note": "This route is primarily refugee migration and related family reunification, not a simultaneous forced/voluntary route.",
                "additionalSources": [
                    {
                        "title": "Immigrants by reason for immigration",
                        "publisher": "Statistics Norway",
                        "url": "https://www.ssb.no/en/befolkning/innvandrere/statistikk/innvandrere-etter-innvandringsgrunn",
                        "category": "A",
                    }
                ],
            }
        ],
    },
    "diaspora-afro-norwegian-from-eritrea": {
        "decision": "reclassify",
        "proposedMovements": [
            {
                "id": "movement-eritrea-norway-refugees",
                "migrationType": "refugee",
                "subtype": "protection-and-family-reunification",
                "startYear": None,
                "endYear": 2025,
                "integrationStatus": "provisional",
                "note": "The existing fiche describes refugee migration. The start date must be established from Statistics Norway or asylum records rather than inherited from the diaspora family's generic 1990 start.",
                "additionalSources": [
                    {
                        "title": "Immigrants by reason for immigration",
                        "publisher": "Statistics Norway",
                        "url": "https://www.ssb.no/en/befolkning/innvandrere/statistikk/innvandrere-etter-innvandringsgrunn",
                        "category": "A",
                    }
                ],
            }
        ],
    },
    "diaspora-afro-qatari-from-east-african-coast-historical-via-pearli": {
        "decision": "reclassify",
        "proposedMovements": [
            {
                "id": "movement-east-africa-qatar-forced-pearling",
                "migrationType": "forced",
                "subtype": "enslaved-labour",
                "startYear": None,
                "endYear": 1952,
                "integrationStatus": "provisional",
                "note": "Historical enslaved labour in the pearling economy is a bounded forced movement. The start date requires stronger historical sourcing; 1952 is retained only as the abolition date stated in the existing fiche.",
                "additionalSources": [],
            }
        ],
    },
    "diaspora-afro-qatari-from-kenya-uganda-nigeria-ghana-contemporary-": {
        "decision": "reclassify",
        "proposedMovements": [
            {
                "id": "movement-african-labour-qatar",
                "migrationType": "voluntary",
                "subtype": "labour-migration",
                "startYear": None,
                "endYear": 2025,
                "integrationStatus": "provisional",
                "note": "Modern labour migration is a separate route from historical enslavement. Coercive labour conditions must be documented in the route narrative but do not justify merging both histories into one mixed route.",
                "additionalSources": [
                    {
                        "title": "Labour migration in the Arab States",
                        "publisher": "International Labour Organization",
                        "url": "https://www.ilo.org/regions-and-countries/arab-states/ilo-arab-states/countries-covered/ilo-qatar/labour-migration-arab-states",
                        "category": "C",
                    }
                ],
            }
        ],
    },
}


def build_review() -> dict:
    routes = json.loads(ROUTES_PATH.read_text(encoding="utf-8"))
    mixed = [route for route in routes if route.get("migration_type") == "mixed"]
    route_by_id = {route["id"]: route for route in mixed}

    missing = sorted(set(route_by_id) - set(DECISIONS))
    stale = sorted(set(DECISIONS) - set(route_by_id))
    if missing or stale:
        raise ValueError(f"Mixed-route review mismatch. missing={missing}, stale={stale}")

    records = []
    for route_id in sorted(route_by_id):
        route = route_by_id[route_id]
        decision = DECISIONS[route_id]
        records.append(
            {
                "legacyRouteId": route_id,
                "legacyName": route.get("name"),
                "diasporaId": route.get("diaspora_id"),
                "legacyStartYear": route.get("era_start"),
                "legacyEndYear": route.get("era_end"),
                "legacyType": "mixed",
                "decision": decision["decision"],
                "proposedMovements": decision["proposedMovements"],
                "legacySources": route.get("sources", []),
                "mapAction": "do-not-publish-as-mixed",
            }
        )

    return {
        "schemaVersion": "1.0",
        "purpose": "Editorial review of the 12 legacy mixed routes. This file does not alter public map data.",
        "editorialRule": "A diaspora can have several migration histories. Historical forced movement and modern voluntary/refugee movement must be separate records.",
        "records": records,
    }


def write_report(review: dict) -> None:
    lines = [
        "# Revue des routes héritées classées « mixed »",
        "",
        "> Aucun de ces objets ne doit être publié comme une route mixte continue jusqu'en 2025.",
        "",
    ]
    movement_count = 0
    for record in review["records"]:
        lines.append(f"## {record['legacyName']}")
        lines.append("")
        lines.append(f"- Route héritée : `{record['legacyRouteId']}`")
        lines.append(f"- Décision : **{record['decision']}**")
        lines.append(f"- Action carte : `{record['mapAction']}`")
        lines.append("")
        for movement in record["proposedMovements"]:
            movement_count += 1
            lines.append(
                f"- `{movement['id']}` — `{movement['migrationType']}` / `{movement['subtype']}` "
                f"({movement['startYear']}–{movement['endYear']}) — `{movement['integrationStatus']}`"
            )
            lines.append(f"  - {movement['note']}")
        lines.append("")
    lines.extend(
        [
            "## Totaux",
            "",
            f"- Routes héritées examinées : **{len(review['records'])}**",
            f"- Mouvements distincts proposés : **{movement_count}**",
            "- Routes mixtes validées comme continues : **0**",
            "",
            "## Étape suivante",
            "",
            "Vérifier les dates et sources de chaque mouvement proposé, puis générer les routes publiques uniquement depuis les mouvements passés à `ready`.",
        ]
    )
    REPORT_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    review = build_review()
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(review, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    write_report(review)
    print(f"Wrote {OUTPUT_PATH}")
    print(f"Wrote {REPORT_PATH}")
    print(f"Reviewed {len(review['records'])} mixed routes")
    print(f"Proposed {sum(len(r['proposedMovements']) for r in review['records'])} distinct movements")


if __name__ == "__main__":
    main()
