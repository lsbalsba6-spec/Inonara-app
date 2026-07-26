"""Tests for the Gabon/Central Africa pilot corpus (PR pilote 1).

Verifies: the corpus validates cleanly; the registry cross-references real
object ids; the explicit corrections from the review rounds are actually
respected in the data (not just described in prose); and the "no ready
claim on D/E alone" rule holds across the whole pilot corpus.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from data.core_v3 import validate_graph
from data.core_v3.pilot_gabon_central_africa import (
    PILOT_ENTITIES,
    PILOT_RELATIONS,
    REGISTRY,
)
from data.core_v3.pilot_gabon_central_africa.entities import (
    place_cote_de_loango,
    place_gabon_region,
    place_libreville,
    polity_kongo,
    polity_loango,
)
from data.core_v3.pilot_gabon_central_africa.relations import relations


def test_pilot_corpus_validates_cleanly():
    problems = validate_graph(PILOT_ENTITIES, PILOT_RELATIONS)
    assert problems == [], problems


def test_pilot_has_exactly_the_planned_object_counts():
    assert len(PILOT_ENTITIES) == 12  # 4 Place + 4 Polity + 4 People
    assert len(PILOT_RELATIONS) == 8


# ---------- Registry cross-references real objects ----------

def _all_assertion_ids():
    ids = set()
    for ent in PILOT_ENTITIES.values():
        for n in ent.get("names", []):
            ids.add(n["id"])
        for s in ent.get("statuses", []):
            ids.add(s["id"])
    for r in PILOT_RELATIONS:
        ids.add(r["id"])
    return ids


def test_every_registry_row_references_a_real_assertion_id():
    real_ids = _all_assertion_ids()
    for row in REGISTRY:
        assert row["objectAssertionId"] in real_ids, f"{row['assertionId']} references a non-existent assertion id"


def test_registry_covers_every_name_and_relation_in_the_corpus():
    # Every embedded name and every relation should have a registry row
    # (statuses are covered too, but AEF/République gabonaise statuses are
    # intentionally summarized under their name's registry row in this PR).
    registry_ids = {row["objectAssertionId"] for row in REGISTRY}
    for ent in PILOT_ENTITIES.values():
        for n in ent.get("names", []):
            assert n["id"] in registry_ids, f"name '{n['value']}' has no registry row"
    for r in PILOT_RELATIONS:
        assert r["id"] in registry_ids, f"relation {r['relationType']} ({r['fromEntityId']}->{r['toEntityId']}) has no registry row"


# ---------- No "ready" status rests solely on D/E, across the WHOLE corpus ----------

def test_no_ready_assertion_in_the_pilot_rests_solely_on_category_d_or_e():
    for ent in PILOT_ENTITIES.values():
        for n in ent.get("names", []):
            if n["integrationStatus"] == "ready":
                cats = {s["category"] for s in n["sources"]}
                assert cats & {"A", "B", "C"}, f"name '{n['value']}' is ready but only has categories {cats}"
        for s in ent.get("statuses", []):
            if s["integrationStatus"] == "ready":
                cats = {src["category"] for src in s["sources"]}
                assert cats & {"A", "B", "C"}, f"status '{s['value']}' is ready but only has categories {cats}"
    for r in PILOT_RELATIONS:
        if r["integrationStatus"] == "ready":
            cats = {s["category"] for s in r["sources"]}
            assert cats & {"A", "B", "C"}, f"relation {r['relationType']} is ready but only has categories {cats}"


def test_registry_agrees_no_ready_row_cites_only_d_or_e_category():
    for row in REGISTRY:
        if row["status"] == "ready":
            assert row["sourceCategory"] in {"A", "B", "C"}, row


# ---------- Explicit corrections from the review rounds, verified in data ----------

def test_gabao_name_does_not_have_validto_fixed_to_1839():
    """Correction: 'Ne considère pas 1839 comme la date historique certaine
    du remplacement de Gabão par Gabon.'"""
    gabao = next(n for n in place_gabon_region["names"] if n["value"] == "Gabão")
    assert gabao["validTo"] is None


def test_gabao_and_gabon_names_can_coexist_in_time():
    gabao = next(n for n in place_gabon_region["names"] if n["value"] == "Gabão")
    gabon = next(n for n in place_gabon_region["names"] if n["value"] == "Gabon")
    # Both should be active (no validTo cutting either off) at, say, 1850 —
    # demonstrating coexistence rather than an instant replacement.
    gabao_start = gabao["validFrom"]["year"]
    gabon_start = gabon["validFrom"]["year"]
    assert gabao["validTo"] is None
    assert gabon["validTo"] is None
    assert gabao_start < 1850 and gabon_start <= 1850


def test_gabao_name_has_geographic_scope_partial_not_whole_entity():
    """Correction: 'Ne considère pas automatiquement Gabão comme le nom de
    tout le territoire actuel du Gabon.'"""
    gabao = next(n for n in place_gabon_region["names"] if n["value"] == "Gabão")
    assert gabao["geographicScope"] == "partial"


def test_kongo_polity_has_no_statuses_in_this_pr():
    """Correction: don't collapse the 1857-1888-1914 nuance into
    HistoricalStatus in PR pilote 1 — deferred to PR pilote 2."""
    assert polity_kongo["statuses"] == []


def test_kongo_endonym_is_research_gap_not_validated():
    endonym = next(n for n in polity_kongo["names"] if n["value"] == "Kongo dia Ntotila")
    assert endonym["integrationStatus"] == "research-gap"
    assert endonym["confidence"] == "unreviewed"


def test_loango_polity_has_no_end_date_on_its_name():
    """Correction: 'Ne fixe pas encore une date officielle de fin du Royaume
    de Loango.'"""
    name = polity_loango["names"][0]
    assert name["validTo"] is None


def test_loango_has_no_relation_to_cote_de_loango_place():
    """The connection between the political kingdom and the broader
    commercial coast is explicitly left unresolved."""
    involving_both = [
        r for r in relations
        if {r["fromEntityId"], r["toEntityId"]} == {polity_loango["id"], place_cote_de_loango["id"]}
    ]
    assert involving_both == []


def test_mpongwe_myene_relation_matches_the_exact_specified_shape():
    from data.core_v3.pilot_gabon_central_africa.entities import (
        people_mpongwe,
        people_myene,
    )
    rel = next(r for r in relations if r["fromEntityId"] == people_mpongwe["id"] and r["toEntityId"] == people_myene["id"])
    assert rel["relationType"] == "unclassified"
    assert rel["relationType"] != "languageVarietyOf"
    assert rel["integrationStatus"] == "provisional"
    assert "qualification ontologique définitive à confirmer" in rel["notes"]


def test_libreville_founding_is_marked_disputed_not_silently_picked():
    name = place_libreville["names"][0]
    assert name["integrationStatus"] == "disputed"
    assert name["confidence"] == "disputed"


# ---------- Broken/missing references check (explicit deliverable) ----------

def test_no_broken_references_in_the_pilot_relations():
    for r in relations:
        assert r["fromEntityId"] in PILOT_ENTITIES, f"broken fromEntityId in {r['id']}"
        assert r["toEntityId"] in PILOT_ENTITIES, f"broken toEntityId in {r['id']}"
