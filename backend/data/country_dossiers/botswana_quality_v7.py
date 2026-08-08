"""Inonara Botswana V6 quality gate.

Keeps editorial claims country-centred and checks that important sections have
source identifiers and that migration routes have usable coordinates.
"""
BOTSWANA_V6_QUALITY = {
    "version": "V6",
    "scope": "Botswana",
    "quality_rules": [
        "Le Botswana reste le sujet principal de chaque section.",
        "Un pays voisin n'est cité que lorsqu'un lien historique, géographique ou migratoire est documenté.",
        "Les affirmations historiques importantes doivent référencer au moins une source.",
        "Les routes migratoires affichées doivent avoir des coordonnées ou être explicitement non cartographiées.",
        "Les traditions orales et les interprétations discutées doivent être signalées comme telles.",
    ],
    "required_sections": [
        "overview", "territory_sections", "peoples", "languages", "migrations",
        "culture", "heritage", "environment", "figures", "media_gallery", "sources"
    ],
}
