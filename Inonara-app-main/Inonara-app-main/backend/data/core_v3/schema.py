"""Core historical graph model (v3) — schema definitions.

SCOPE OF THIS MODULE: structure only. No real historical facts are stored
here. Every concrete date/name/place used in this package's fixtures.py is
SYNTHETIC, clearly marked `is_fixture=True` and `confidence="unreviewed-fixture"`
— never confused with real (even if unverified) production data, which would
use `confidence="unreviewed"` (a distinct value, reserved for actual imported
historical content, none of which exists in this core yet).

===========================================================================
RELATION DIRECTION CONVENTION (binding for the whole project)
===========================================================================
Every relation type has ONE canonical direction, documented below. Reversed
storage is a bug, not a stylistic choice — see validator.py's
`check_relation_direction_sanity` and tests/test_core_v3.py's succession
tests, which are written to FAIL if a relation is stored backwards.

    succeeds:            fromEntityId = SUCCESSOR   -> toEntityId = PREDECESSOR
                          ("republic-of-gabon --succeeds--> colonial-gabon")
                          `succeededBy` is NOT stored separately — it is a
                          derived/computed inverse (see get_successor_of /
                          get_predecessor_of in adapter.py) to avoid the two
                          directions drifting out of sync.

    partOf:               fromEntityId = PART        -> toEntityId = WHOLE
    memberOf:             fromEntityId = MEMBER       -> toEntityId = FEDERATION/GROUP
    capitalOf:            fromEntityId = PLACE (the capital)
                          -> toEntityId = POLITY it is capital of
    administeredBy:       fromEntityId = ADMINISTERED POLITY
                          -> toEntityId = ADMINISTERING (metropole) POLITY
    foundedBy:            fromEntityId = FOUNDED THING (Place or Polity)
                          -> toEntityId = FOUNDER (Person or Polity)
    migratedInto:         fromEntityId = PEOPLE (the migrating group)
                          -> toEntityId = PLACE (the destination)

    governs / administers / controls / claims / occupies /
    hasJurisdictionOver:  fromEntityId = POLITY (the governing entity)
                          -> toEntityId = PLACE (the governed territory)
                          These six are NOT interchangeable — each asserts a
                          different, specific strength/nature of control that
                          must match what the cited sources actually support.
                          Never default to one automatically; see
                          validator.py's `check_geometry_qualification`.

    inhabitsArea, documentedIn, majorPopulationIn, politicallyInfluentialIn,
    associatedWithPolity, speaksLanguage:
                          fromEntityId = PEOPLE       -> toEntityId = PLACE/POLITY/LANGUAGE

    religiouslyInfluencedBy, commerciallyConnectedTo, militarilyAlliedWith,
    tributaryTo, diplomaticallyRecognizedBy, linguisticallyInfluencedBy:
                          fromEntityId = INFLUENCED/SUBORDINATE ENTITY
                          -> toEntityId = INFLUENCING/DOMINANT ENTITY
                          (tributaryTo: fromEntityId = TRIBUTARY, toEntityId = SUZERAIN)

    unclassified:         explicit fallback ONLY, direction meaning must be
                          spelled out in `notes` every time it is used.
===========================================================================
"""
import uuid

# ---------------------------------------------------------------------
# Entity (node) categories
# ---------------------------------------------------------------------
ENTITY_CATEGORIES = {"Polity", "Place", "People", "Person", "Event", "Process", "Language", "Religion", "Network"}

POLITY_TYPES = {"kingdom", "empire", "state", "colony", "protectorate", "federation", "city-state", "unclassified"}

PLACE_TYPES = {"territory", "settlement", "capital", "heritage-site", "geographic-feature", "unclassified"}

EVENT_TYPES = {"treaty", "battle", "proclamation", "founding", "independence", "official-renaming", "unclassified"}

PROCESS_TYPES = {"migration", "territorial-expansion", "colonization", "linguistic-diffusion",
                  "christianization", "urbanization", "decolonization", "unclassified"}

# ---------------------------------------------------------------------
# Relation types — see module docstring above for the binding direction
# of every one of these.
# ---------------------------------------------------------------------
RELATION_TYPES = {
    "succeeds",
    "partOf", "memberOf", "capitalOf", "administeredBy", "foundedBy", "migratedInto",
    "governs", "administers", "controls", "claims", "occupies", "hasJurisdictionOver",
    "inhabitsArea", "documentedIn", "majorPopulationIn", "politicallyInfluentialIn",
    "associatedWithPolity", "speaksLanguage",
    "religiouslyInfluencedBy", "commerciallyConnectedTo", "militarilyAlliedWith",
    "tributaryTo", "diplomaticallyRecognizedBy", "linguisticallyInfluencedBy",
    "inheritsFrom",
    "contemporaryWith",  # only when historiographically significant, see docstring
    "unclassified",
}

# Relations whose `fromEntityId` must be a Polity and `toEntityId` a Place —
# used by the validator to catch category mismatches.
TERRITORIAL_CONTROL_RELATIONS = {"governs", "administers", "controls", "claims", "occupies", "hasJurisdictionOver"}

NAME_TYPES = {"endonym", "exonym", "colonial", "modern", "historical", "translated", "unclassified"}

GEOGRAPHIC_SCOPES = {"whole-entity", "partial", "colloquial"}

GEOMETRY_KINDS = {"border", "zone-of-influence", "approximate-extent", "point", "route", "approximate-radius", "unclassified"}

# Confidence: "unreviewed-fixture" is DISTINCT from "unreviewed" — reserved
# exclusively for synthetic test fixtures, so they can never be mistaken for
# real (even if unverified) imported historical content.
CONFIDENCE_LEVELS = {"high", "medium", "low", "disputed", "unreviewed", "unreviewed-fixture"}

# Source quality tier (introduced for the Gabon/Central Africa pilot's
# source-hierarchy requirement): A = archive/legal text/contemporary primary
# source; B = specialized academic publication; C = institutional
# publication or recognized specialized encyclopedia; D = press/embassy/
# institutional popularization; E = Wikipedia, secondary wiki, blog, or
# general-audience site.
SOURCE_CATEGORIES = {"A", "B", "C", "D", "E"}

# integrationStatus is DISTINCT from `confidence`: confidence asks "how
# certain is this claim, historically?"; integrationStatus asks "how ready
# is this claim for production use, editorially?" A claim can be highly
# confident but still "provisional" pending a better source, or "disputed"
# because two good sources disagree. See validator.py's
# `check_ready_status_has_adequate_sourcing`: nothing marked "ready" may
# rely SOLELY on a category D or E source.
INTEGRATION_STATUSES = {"ready", "provisional", "disputed", "research-gap"}

STATUS_VALUES = {
    "sovereign", "vassal", "colony", "protectorate", "federated-territory",
    "autonomous-region", "occupied", "fragmented", "unclassified",
}

# Statuses that are mutually exclusive if their periods overlap for the same
# Polity — used by validator.py's `check_incompatible_statuses`.
MUTUALLY_EXCLUSIVE_STATUS_PAIRS = [
    ("sovereign", "colony"),
    ("sovereign", "vassal"),
    ("sovereign", "protectorate"),
    ("sovereign", "occupied"),
]


def new_id(prefix: str) -> str:
    """Stable, globally unique identifier for ANY object or embedded
    assertion (Polity, Place, HistoricalName, HistoricalGeometry,
    HistoricalStatus, Relation, Source, Event, Process — all of them).
    Every embedded assertion gets its OWN id specifically so a single
    assertion can be individually cited or contested without touching the
    entity that contains it (see PR discussion, point 7 of the prior
    conceptual-model response)."""
    return f"{prefix}-{uuid.uuid4().hex[:12]}"
