"""Schema constants for Inonara's migration registry.

The registry is the editorial source of truth. Map routes are generated only
from reviewed registry records; they must never be inferred directly from the
continued existence of a diaspora community.
"""

MIGRATION_TYPES = {
    "forced",
    "voluntary",
    "refugee",
    "colonial-settlement",
    "military-expansion",
    "commercial",
    "religious",
    "mixed",
    "unclassified",
}

ROUTE_REVIEW_STATUSES = {
    "ready",
    "provisional",
    "disputed",
    "research-gap",
    "split-required",
    "excluded",
    "data-error",
}

SOURCE_CATEGORIES = {"A", "B", "C", "D", "E", "unclassified"}
CONFIDENCE_LEVELS = {"high", "medium", "low", "unreviewed"}

# Broad editorial periods. Exact years remain authoritative; these tags are
# only for browsing and reporting.
PERIODS = {
    "prehistory",
    "antiquity",
    "medieval",
    "early-modern",
    "atlantic-slave-trades",
    "colonial",
    "decolonization",
    "cold-war",
    "contemporary",
    "cross-period",
}
