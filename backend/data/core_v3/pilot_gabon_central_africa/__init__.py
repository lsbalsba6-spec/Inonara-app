"""Gabon / Central Africa pilot corpus — PR pilote 1.

Aggregates the pilot's entities and relations into a single graph, ready to
be validated via core_v3.validate_graph(). This corpus is NOT yet wired
into any rendering path (see PR pilote 3 for the feature-flagged adapter);
this PR only proves the corpus is internally consistent.
"""
from . import entities as _entities
from .registry import REGISTRY
from .relations import relations as PILOT_RELATIONS

PILOT_ENTITIES = {
    _entities.place_gabon_region["id"]: _entities.place_gabon_region,
    _entities.place_libreville["id"]: _entities.place_libreville,
    _entities.place_mbanza_kongo["id"]: _entities.place_mbanza_kongo,
    _entities.place_cote_de_loango["id"]: _entities.place_cote_de_loango,
    _entities.polity_kongo["id"]: _entities.polity_kongo,
    _entities.polity_loango["id"]: _entities.polity_loango,
    _entities.polity_aef["id"]: _entities.polity_aef,
    _entities.polity_republique_gabonaise["id"]: _entities.polity_republique_gabonaise,
    _entities.people_myene["id"]: _entities.people_myene,
    _entities.people_mpongwe["id"]: _entities.people_mpongwe,
    _entities.people_vili["id"]: _entities.people_vili,
    _entities.people_fang["id"]: _entities.people_fang,
}

__all__ = ["PILOT_ENTITIES", "PILOT_RELATIONS", "REGISTRY"]
