"""Inonara Botswana V7 editorial layer.

This module does not invent new historical facts. It adds a transparent editorial
layer over the researched V5 dossier: evidence labels, source coverage and map
metadata. Facts remain in the underlying dossier and must keep their source IDs.
"""
from .botswana_expansion_v6 import BOTSWANA_EXPANSION_V6

BOTSWANA_V7 = {
    **BOTSWANA_EXPANSION_V6,
    "editorial": {
        **BOTSWANA_EXPANSION_V6.get("editorial", {}),
        "version": "V7",
        "evidence_labels": {
            "ready": "Établi / documenté",
            "provisional": "À préciser / interprétation prudente",
            "disputed": "Débat historiographique",
            "research-gap": "Recherche à approfondir",
        },
        "rule": "Ne pas transformer une hypothèse, une tradition orale ou une approximation cartographique en fait établi.",
    },
    "migration_map": {
        "projection": "schématique",
        "coordinate_order": "[longitude, latitude]",
        "route_policy": "Un tracé n'est affiché que lorsqu'une origine et une destination disposent de coordonnées valides.",
        "no_ancient_borders": True,
    },
}
