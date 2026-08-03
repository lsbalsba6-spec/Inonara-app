"""Tests for backend/data/core_v3 — schema, validator, direction sanity,
name-by-date resolution, open/approximate/contested periods, adapter.

All fixtures used are SYNTHETIC (see core_v3/fixtures.py) — no real
historical dates or claims are exercised or asserted correct by these tests.
"""
import copy
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from data.core_v3 import CONFIDENCE_LEVELS, RELATION_TYPES, validate_graph
from data.core_v3.adapter import (
    adapt_polity_to_legacy_shape,
    get_predecessor_of,
    get_successor_of,
)
from data.core_v3.builders import (
    make_historical_date,
    make_historical_geometry,
    make_historical_name,
    make_historical_status,
    make_place,
    make_polity,
    make_relation,
    make_source,
)
from data.core_v3.fixtures import (
    FIXTURE_ENTITIES,
    FIXTURE_RELATIONS,
    FIXTURE_SOURCE,
    fixture_place,
    fixture_polity_predecessor,
    fixture_polity_successor,
)

# ---------- Fixtures are clearly synthetic, never confused with real data ----------

def test_every_fixture_entity_is_marked_is_fixture():
    for eid, ent in FIXTURE_ENTITIES.items():
        assert ent.get("isFixture") is True, f"{eid} not marked isFixture"


def test_every_fixture_assertion_uses_unreviewed_fixture_confidence_not_unreviewed():
    for ent in FIXTURE_ENTITIES.values():
        for name in ent.get("names", []):
            assert name["confidence"] == "unreviewed-fixture"
        for status in ent.get("statuses", []):
            assert status["confidence"] == "unreviewed-fixture"
        for geom in ent.get("geometries", []):
            assert geom["confidence"] == "unreviewed-fixture"
    for rel in FIXTURE_RELATIONS:
        assert rel["confidence"] == "unreviewed-fixture"


def test_the_full_fixture_graph_passes_validation():
    assert validate_graph(FIXTURE_ENTITIES, FIXTURE_RELATIONS) == []


# ---------- Schema-level unit tests for each object type ----------

def test_source_has_stable_unique_id():
    s1, s2 = make_source("A"), make_source("B")
    assert s1["id"] != s2["id"]


def test_historical_name_requires_all_documented_fields():
    n = make_historical_name("X", "entity-1", "unclassified", make_historical_date(1000), [FIXTURE_SOURCE])
    for field in ["id", "value", "normalizedValue", "language", "script", "nameType",
                  "appliesToEntityId", "validFrom", "validTo", "firstKnownAttestation",
                  "geographicScope", "confidence", "sources", "notes", "isPreferredDisplayName"]:
        assert field in n, f"missing field {field}"


def test_relation_has_stable_unique_id_and_required_fields():
    r1 = make_relation("a", "b", "succeeds", make_historical_date(1000), [FIXTURE_SOURCE])
    r2 = make_relation("a", "b", "succeeds", make_historical_date(1000), [FIXTURE_SOURCE])
    assert r1["id"] != r2["id"]
    for field in ["id", "fromEntityId", "toEntityId", "relationType", "validFrom", "confidence", "sources"]:
        assert field in r1


def test_place_is_not_timeless_has_existence_period():
    p = make_place("territory", existence_period={"start": make_historical_date(1000), "end": None})
    assert "existencePeriod" in p
    assert p["existencePeriod"]["start"]["year"] == 1000


def test_all_relation_types_in_taxonomy_are_known_constants():
    # sanity: every relation type referenced by fixtures is a real member of
    # the taxonomy (guards against typos silently creating new "types").
    for rel in FIXTURE_RELATIONS:
        assert rel["relationType"] in RELATION_TYPES


# ---------- Validator: dangling references ----------

def test_validator_catches_relation_to_nonexistent_entity():
    entities = {"a": make_polity("state")}
    bad_rel = make_relation("a", "does-not-exist", "governs", make_historical_date(1000), [FIXTURE_SOURCE])
    problems = validate_graph(entities, [bad_rel])
    assert any("does not exist" in p for p in problems)


def test_validator_catches_event_participant_referencing_nonexistent_entity():
    from data.core_v3.builders import make_event
    ev = make_event("founding", make_historical_date(1000), [FIXTURE_SOURCE],
                     participant_ids=[{"entityId": "ghost", "role": "location"}])
    entities = {ev["id"]: ev}
    problems = validate_graph(entities, [])
    assert any("non-existent entity" in p for p in problems)


# ---------- Validator: relation direction sanity ----------

def test_validator_flags_territorial_control_relation_with_wrong_categories():
    place_a = make_place("territory", existence_period={"start": None, "end": None})
    place_b = make_place("territory", existence_period={"start": None, "end": None})
    entities = {place_a["id"]: place_a, place_b["id"]: place_b}
    # "governs" should be Polity->Place, here it's Place->Place: wrong.
    bad_rel = make_relation(place_a["id"], place_b["id"], "governs", make_historical_date(1000), [FIXTURE_SOURCE])
    problems = validate_graph(entities, [bad_rel])
    assert any("possible direction error" in p for p in problems)


def test_validator_flags_succeeds_relation_stored_backwards():
    """This is the specific regression test required: it must FAIL if
    'succeeds' is ever accidentally reversed."""
    predecessor = copy.deepcopy(fixture_polity_predecessor)
    successor = copy.deepcopy(fixture_polity_successor)
    entities = {predecessor["id"]: predecessor, successor["id"]: successor}

    # Correct direction (successor --succeeds--> predecessor): no problem.
    correct_rel = make_relation(successor["id"], predecessor["id"], "succeeds",
                                 make_historical_date(1300), [FIXTURE_SOURCE])
    assert validate_graph(entities, [correct_rel]) == []

    # Reversed direction (predecessor --succeeds--> successor): must be flagged.
    reversed_rel = make_relation(predecessor["id"], successor["id"], "succeeds",
                                  make_historical_date(1300), [FIXTURE_SOURCE])
    problems = validate_graph(entities, [reversed_rel])
    assert any("likely stored backwards" in p for p in problems)


def test_get_predecessor_and_successor_helpers_agree_with_fixture_direction():
    pred = get_predecessor_of(fixture_polity_successor["id"], FIXTURE_RELATIONS)
    succ = get_successor_of(fixture_polity_predecessor["id"], FIXTURE_RELATIONS)
    assert pred == fixture_polity_predecessor["id"]
    assert succ == fixture_polity_successor["id"]


def test_helpers_return_none_for_wrong_direction_query():
    # Asking for the predecessor OF the predecessor (nonsensical direction)
    # must return None, not something incorrect.
    assert get_predecessor_of(fixture_polity_predecessor["id"], FIXTURE_RELATIONS) is None
    assert get_successor_of(fixture_polity_successor["id"], FIXTURE_RELATIONS) is None


# ---------- Validator: inverted periods, invalid temporal values ----------

def test_validator_catches_inverted_period_on_relation():
    entities = {"a": make_polity("state"), "b": make_polity("state")}
    bad_rel = make_relation("a", "b", "governs",
                             valid_from=make_historical_date(1500),
                             sources=[FIXTURE_SOURCE])
    bad_rel["validTo"] = make_historical_date(1000)  # before validFrom
    problems = validate_graph(entities, [bad_rel])
    assert any("inverted period" in p for p in problems)


def test_validator_catches_inverted_period_on_name():
    polity = make_polity("state")
    polity["names"] = [make_historical_name(
        "X", polity["id"], "unclassified",
        valid_from=make_historical_date(1500), valid_to=make_historical_date(1000),
        sources=[FIXTURE_SOURCE],
    )]
    problems = validate_graph({polity["id"]: polity}, [])
    assert any("inverted period" in p for p in problems)


def test_validator_catches_relation_missing_validfrom_static_relation():
    entities = {"a": make_polity("state"), "b": make_polity("state")}
    rel = make_relation("a", "b", "governs", valid_from=None, sources=[FIXTURE_SOURCE])
    problems = validate_graph(entities, [rel])
    assert any("missing validFrom" in p for p in problems)


# ---------- Validator: names/geometries without sources, unqualified geometries ----------

def test_validator_catches_name_without_sources():
    polity = make_polity("state")
    polity["names"] = [make_historical_name("X", polity["id"], "unclassified",
                                              make_historical_date(1000), sources=[])]
    problems = validate_graph({polity["id"]: polity}, [])
    assert any("no sources" in p and "name" in p for p in problems)


def test_validator_catches_geometry_without_kind_or_confidence():
    polity = make_polity("state")
    polity["geometries"] = [{"id": "g1", "kind": None, "confidence": None, "sources": [FIXTURE_SOURCE]}]
    problems = validate_graph({polity["id"]: polity}, [])
    assert any("must be qualified" in p for p in problems)
    assert any("missing or invalid confidence" in p for p in problems)


def test_validator_catches_geometry_without_sources():
    polity = make_polity("state")
    polity["geometries"] = [make_historical_geometry("approximate-radius",
                                                       {"start": None, "end": None}, sources=[])]
    problems = validate_graph({polity["id"]: polity}, [])
    assert any("geometry" in p and "no sources" in p for p in problems)


# ---------- Validator: incompatible statuses ----------

def test_validator_catches_incompatible_overlapping_statuses():
    polity = make_polity("state")
    polity["statuses"] = [
        make_historical_status("sovereign", make_historical_date(1000), [FIXTURE_SOURCE], valid_to=make_historical_date(1200)),
        make_historical_status("colony", make_historical_date(1100), [FIXTURE_SOURCE], valid_to=make_historical_date(1300)),
    ]
    problems = validate_graph({polity["id"]: polity}, [])
    assert any("incompatible statuses overlap" in p for p in problems)


def test_validator_allows_sequential_non_overlapping_statuses():
    polity = make_polity("state")
    polity["statuses"] = [
        make_historical_status("colony", make_historical_date(1000), [FIXTURE_SOURCE], valid_to=make_historical_date(1200)),
        make_historical_status("sovereign", make_historical_date(1200), [FIXTURE_SOURCE], valid_to=None),
    ]
    problems = validate_graph({polity["id"]: polity}, [])
    assert not any("incompatible statuses" in p for p in problems)


# ---------- Validator: Place must not be timeless ----------

def test_validator_catches_place_missing_existence_period():
    place = {"id": "p1", "category": "Place", "placeType": "territory", "names": [], "geometries": []}
    # Deliberately missing "existencePeriod" key entirely.
    problems = validate_graph({"p1": place}, [])
    assert any("timeless" in p for p in problems)


# ---------- Name resolution by date (adapter) ----------

def test_active_name_resolution_picks_correct_name_by_date():
    early = adapt_polity_to_legacy_shape(fixture_polity_predecessor, at_year=1250)
    late = adapt_polity_to_legacy_shape(fixture_polity_successor, at_year=1400)
    assert early["name"] == "Fixture Predecessor Polity"
    assert late["name"] == "Fixture Successor Polity"


def test_active_name_resolution_returns_none_outside_validity_period():
    too_early = adapt_polity_to_legacy_shape(fixture_polity_predecessor, at_year=1100)
    too_late_query_on_predecessor = adapt_polity_to_legacy_shape(fixture_polity_predecessor, at_year=1350)
    assert too_early is None
    assert too_late_query_on_predecessor is None


def test_multi_name_place_resolves_correct_name_at_different_dates():
    from data.core_v3.adapter import _active_name
    name_before = _active_name(fixture_place, 1100)
    name_after = _active_name(fixture_place, 1500)
    assert name_before["value"] == "Old Fixture Name"
    assert name_after["value"] == "New Fixture Name"
    assert name_after["isPreferredDisplayName"] is True


# ---------- Open, approximate, and contested periods ----------

def test_open_ended_date_has_no_fixed_year_and_is_not_treated_as_a_hard_boundary():
    open_date = make_historical_date(2100, open_ended=True)
    assert open_date["openEnded"] is True
    # An open-ended validTo must not cause a name/status to appear "expired"
    # at any future query year — verified via the fixture Place, whose
    # "New Fixture Name" has validTo=None (still active) and existencePeriod
    # end is open_ended=True.
    from data.core_v3.adapter import _active_name
    far_future = _active_name(fixture_place, 9999)
    assert far_future is not None
    assert far_future["value"] == "New Fixture Name"


def test_approximate_date_is_explicitly_flagged_not_silently_treated_as_exact():
    approx = make_historical_date(1000, approximate=True)
    assert approx["approximate"] is True
    exact = make_historical_date(1000, approximate=False)
    assert exact["approximate"] is False


def test_contested_status_can_be_recorded_with_disputed_confidence():
    polity = make_polity("state")
    polity["statuses"] = [
        make_historical_status("sovereign", make_historical_date(1000), [FIXTURE_SOURCE],
                                valid_to=make_historical_date(1200), confidence="disputed",
                                notes="Historiographical convention A places the end here."),
    ]
    problems = validate_graph({polity["id"]: polity}, [])
    assert problems == []
    assert polity["statuses"][0]["confidence"] == "disputed"


# ---------- Confidence integrity ----------

def test_unreviewed_fixture_is_a_distinct_value_from_unreviewed():
    assert "unreviewed-fixture" in CONFIDENCE_LEVELS
    assert "unreviewed" in CONFIDENCE_LEVELS
    assert len({"unreviewed-fixture", "unreviewed"}) == 2


def test_validator_rejects_invalid_confidence_value():
    polity = make_polity("state")
    polity["names"] = [make_historical_name("X", polity["id"], "unclassified",
                                              make_historical_date(1000), sources=[FIXTURE_SOURCE],
                                              confidence="absolutely certain")]
    problems = validate_graph({polity["id"]: polity}, [])
    assert any("invalid confidence" in p for p in problems)
