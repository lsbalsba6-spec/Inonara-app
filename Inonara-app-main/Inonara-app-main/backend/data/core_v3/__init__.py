"""core_v3 — the historical graph model core (Polity, Place, People, Event,
Process, HistoricalName, HistoricalStatus, HistoricalGeometry, Source,
Relation). See schema.py for the full design rationale and the binding
relation-direction convention.

IMPORTANT: this package currently contains NO real historical facts. See
fixtures.py for synthetic test data only. Existing v1 (historical_polities.py)
and v2 (historical_entities_migrated.json) data are untouched by this PR.
"""
from .schema import (
    CONFIDENCE_LEVELS,
    ENTITY_CATEGORIES,
    EVENT_TYPES,
    GEOGRAPHIC_SCOPES,
    GEOMETRY_KINDS,
    INTEGRATION_STATUSES,
    MUTUALLY_EXCLUSIVE_STATUS_PAIRS,
    NAME_TYPES,
    PLACE_TYPES,
    POLITY_TYPES,
    PROCESS_TYPES,
    RELATION_TYPES,
    SOURCE_CATEGORIES,
    STATUS_VALUES,
    TERRITORIAL_CONTROL_RELATIONS,
    new_id,
)
from .validator import validate_graph

__all__ = [
    "CONFIDENCE_LEVELS",
    "ENTITY_CATEGORIES",
    "EVENT_TYPES",
    "GEOGRAPHIC_SCOPES",
    "GEOMETRY_KINDS",
    "INTEGRATION_STATUSES",
    "MUTUALLY_EXCLUSIVE_STATUS_PAIRS",
    "NAME_TYPES",
    "PLACE_TYPES",
    "POLITY_TYPES",
    "PROCESS_TYPES",
    "RELATION_TYPES",
    "SOURCE_CATEGORIES",
    "STATUS_VALUES",
    "TERRITORIAL_CONTROL_RELATIONS",
    "new_id",
    "validate_graph",
]
