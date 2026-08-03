"""Validator for the core_v3 historical graph.

Returns a list of human-readable problem strings (never raises) — an empty
list means the graph is STRUCTURALLY valid. It does NOT mean the underlying
historical claims are correct — see confidence="unreviewed"/"unreviewed-fixture"
on every assertion, which this validator explicitly checks is present and
never silently escalated to "high"/"medium"/"low" without a human decision.
"""
from .schema import (
    CONFIDENCE_LEVELS,
    GEOMETRY_KINDS,
    INTEGRATION_STATUSES,
    MUTUALLY_EXCLUSIVE_STATUS_PAIRS,
    NAME_TYPES,
    RELATION_TYPES,
    STATUS_VALUES,
    TERRITORIAL_CONTROL_RELATIONS,
)

ADEQUATE_SOURCE_CATEGORIES_FOR_READY = {"A", "B", "C"}


def _check_ready_status_sourcing(label, assertion, problems):
    """'Ne laisse aucune donnée ready reposer uniquement sur une source D ou
    E' — checks that at least ONE cited source is category A/B/C. Sources
    without a recognized category are treated as failing this check (fail
    conservatively, never assume a source is better than stated)."""
    if assertion.get("integrationStatus") != "ready":
        return
    sources = assertion.get("sources", [])
    categories = [s.get("category") for s in sources if isinstance(s, dict)]
    if not any(c in ADEQUATE_SOURCE_CATEGORIES_FOR_READY for c in categories):
        problems.append(
            f"{label}: marked integrationStatus='ready' but no cited source is category A/B/C "
            f"(found categories: {categories}) — a 'ready' claim must not rest solely on D/E sources"
        )


def _check_source_categories(label, assertion, problems):
    from .schema import SOURCE_CATEGORIES
    for s in assertion.get("sources", []):
        if isinstance(s, dict) and s.get("category") not in SOURCE_CATEGORIES:
            problems.append(f"{label}: source '{s.get('label')}' has invalid category '{s.get('category')}'")


def _year_of(date_or_dict):
    """Extract a comparable year from a HistoricalDate-shaped dict, or None
    if open-ended/approximate/unknown (never guess a number)."""
    if date_or_dict is None:
        return None
    if isinstance(date_or_dict, (int, float)):
        return date_or_dict
    if date_or_dict.get("openEnded"):
        return None
    return date_or_dict.get("year")


def _periods_overlap(a_start, a_end, b_start, b_end):
    if None in (a_start, a_end, b_start, b_end):
        return False  # cannot determine overlap without both bounds — not flagged as an error by this check
    return a_start <= b_end and b_start <= a_end


def validate_graph(entities: dict, relations: list) -> list:
    """`entities`: dict of entityId -> entity dict (Polity/Place/People/
    Event/Process, each already containing its embedded names/statuses/
    geometries). `relations`: list of Relation dicts (autonomous objects,
    NOT embedded in entities — see architecture decision)."""
    problems = []
    entity_ids = set(entities.keys())

    # ---- Relations: dangling references, direction sanity, temporal qualification ----
    seen_relation_ids = {}
    for rel in relations:
        rid = rel.get("id", "<no id>")
        if rid in seen_relation_ids:
            problems.append(f"Relation {rid}: duplicate id (also used by {seen_relation_ids[rid]})")
        else:
            seen_relation_ids[rid] = rid

        rel_type = rel.get("relationType")
        if rel_type not in RELATION_TYPES:
            problems.append(f"Relation {rid}: unknown relationType '{rel_type}'")

        from_id, to_id = rel.get("fromEntityId"), rel.get("toEntityId")
        if from_id not in entity_ids:
            problems.append(f"Relation {rid}: fromEntityId '{from_id}' does not exist in the entity graph")
        if to_id not in entity_ids:
            problems.append(f"Relation {rid}: toEntityId '{to_id}' does not exist in the entity graph")

        # Static relation lacking temporal qualification (point: "relations
        # statiques qui auraient dû être temporelles").
        if rel.get("validFrom") is None:
            problems.append(f"Relation {rid} ({rel_type}): missing validFrom — every relation must be temporally qualified, even if approximate")

        # Inverted period on the relation itself.
        vf, vt = _year_of(rel.get("validFrom")), _year_of(rel.get("validTo"))
        if vf is not None and vt is not None and vf > vt:
            problems.append(f"Relation {rid} ({rel_type}): validFrom ({vf}) is after validTo ({vt}) — inverted period")

        if rel.get("integrationStatus") not in INTEGRATION_STATUSES:
            problems.append(f"Relation {rid}: invalid integrationStatus '{rel.get('integrationStatus')}'")
        _check_ready_status_sourcing(f"Relation {rid} ({rel_type})", rel, problems)
        _check_source_categories(f"Relation {rid} ({rel_type})", rel, problems)

        if not rel.get("sources"):
            problems.append(f"Relation {rid} ({rel_type}): no sources — a relation is a historical assertion and must be sourced")

        if rel.get("confidence") not in CONFIDENCE_LEVELS:
            problems.append(f"Relation {rid}: invalid confidence '{rel.get('confidence')}'")

        # Category-consistency direction checks (see schema.py docstring for
        # the canonical direction of each relation type).
        from_entity, to_entity = entities.get(from_id), entities.get(to_id)
        if from_entity and to_entity:
            if rel_type in TERRITORIAL_CONTROL_RELATIONS:
                if from_entity.get("category") != "Polity":
                    problems.append(f"Relation {rid} ({rel_type}): fromEntityId should be a Polity (found {from_entity.get('category')}) — possible direction error")
                if to_entity.get("category") != "Place":
                    problems.append(f"Relation {rid} ({rel_type}): toEntityId should be a Place (found {to_entity.get('category')}) — possible direction error")
            if rel_type == "capitalOf" and (from_entity.get("category") != "Place" or to_entity.get("category") != "Polity"):
                problems.append(f"Relation {rid} (capitalOf): expected Place->Polity, found {from_entity.get('category')}->{to_entity.get('category')}")
            if rel_type == "administeredBy" and (from_entity.get("category") != "Polity" or to_entity.get("category") != "Polity"):
                problems.append(f"Relation {rid} (administeredBy): expected Polity->Polity, found {from_entity.get('category')}->{to_entity.get('category')}")
            if rel_type == "migratedInto" and (from_entity.get("category") != "People" or to_entity.get("category") != "Place"):
                problems.append(f"Relation {rid} (migratedInto): expected People->Place, found {from_entity.get('category')}->{to_entity.get('category')}")
            if rel_type == "succeeds":
                if from_entity.get("category") != "Polity" or to_entity.get("category") != "Polity":
                    problems.append(f"Relation {rid} (succeeds): expected Polity->Polity, found {from_entity.get('category')}->{to_entity.get('category')}")
                else:
                    # Structural sanity: the PREDECESSOR (toEntityId) should
                    # have started at/before the SUCCESSOR (fromEntityId).
                    # If the claimed predecessor's earliest known status
                    # starts at the same time as or after the claimed
                    # successor's earliest known status, the relation is
                    # very likely stored backwards.
                    def _earliest_start(entity):
                        starts = [_year_of(s.get("validFrom")) for s in entity.get("statuses", [])]
                        starts = [y for y in starts if y is not None]
                        return min(starts) if starts else None

                    successor_start = _earliest_start(from_entity)
                    predecessor_start = _earliest_start(to_entity)
                    if successor_start is not None and predecessor_start is not None and predecessor_start >= successor_start:
                        problems.append(
                            f"Relation {rid} (succeeds): predecessor '{to_id}' (earliest status {predecessor_start}) "
                            f"does not clearly start before successor '{from_id}' (earliest status {successor_start}) "
                            f"— this relation is likely stored backwards (remember: successor --succeeds--> predecessor)"
                        )

    # ---- Entities: names, statuses, geometries ----
    for eid, entity in entities.items():
        category = entity.get("category")

        for name in entity.get("names", []):
            nid = name.get("id", "<no id>")
            if not name.get("sources"):
                problems.append(f"{eid} / name {nid} ('{name.get('value')}'): no sources — every HistoricalName must be sourced")
            if name.get("nameType") not in NAME_TYPES:
                problems.append(f"{eid} / name {nid}: invalid nameType '{name.get('nameType')}'")
            if name.get("confidence") not in CONFIDENCE_LEVELS:
                problems.append(f"{eid} / name {nid}: invalid confidence '{name.get('confidence')}'")
            vf, vt = _year_of(name.get("validFrom")), _year_of(name.get("validTo"))
            if vf is not None and vt is not None and vf > vt:
                problems.append(f"{eid} / name {nid}: validFrom ({vf}) after validTo ({vt}) — inverted period")
            if name.get("appliesToEntityId") and name["appliesToEntityId"] != eid:
                problems.append(f"{eid} / name {nid}: appliesToEntityId ('{name['appliesToEntityId']}') does not match the entity it is embedded in")
            if name.get("integrationStatus") not in INTEGRATION_STATUSES:
                problems.append(f"{eid} / name {nid}: invalid integrationStatus '{name.get('integrationStatus')}'")
            _check_ready_status_sourcing(f"{eid} / name {nid} ('{name.get('value')}')", name, problems)
            _check_source_categories(f"{eid} / name {nid}", name, problems)

        for status in entity.get("statuses", []):
            sid = status.get("id", "<no id>")
            if status.get("value") not in STATUS_VALUES:
                problems.append(f"{eid} / status {sid}: invalid status value '{status.get('value')}'")
            if not status.get("sources"):
                problems.append(f"{eid} / status {sid}: no sources")
            if status.get("confidence") not in CONFIDENCE_LEVELS:
                problems.append(f"{eid} / status {sid}: invalid confidence '{status.get('confidence')}'")
            vf, vt = _year_of(status.get("validFrom")), _year_of(status.get("validTo"))
            if vf is not None and vt is not None and vf > vt:
                problems.append(f"{eid} / status {sid}: validFrom ({vf}) after validTo ({vt}) — inverted period")
            if status.get("integrationStatus") not in INTEGRATION_STATUSES:
                problems.append(f"{eid} / status {sid}: invalid integrationStatus '{status.get('integrationStatus')}'")
            _check_ready_status_sourcing(f"{eid} / status {sid} ('{status.get('value')}')", status, problems)
            _check_source_categories(f"{eid} / status {sid}", status, problems)

        for geom in entity.get("geometries", []):
            gid = geom.get("id", "<no id>")
            # Unqualified geometry: missing kind or confidence.
            if geom.get("kind") not in GEOMETRY_KINDS:
                problems.append(f"{eid} / geometry {gid}: missing or invalid kind ('{geom.get('kind')}') — a geometry must be qualified (border/zone-of-influence/approximate-extent/point/route/approximate-radius)")
            if geom.get("confidence") not in CONFIDENCE_LEVELS:
                problems.append(f"{eid} / geometry {gid}: missing or invalid confidence")
            if not geom.get("sources"):
                problems.append(f"{eid} / geometry {gid}: no sources")

        # Incompatible statuses: mutually exclusive status values whose
        # periods overlap on the SAME entity.
        statuses = entity.get("statuses", [])
        for i in range(len(statuses)):
            for j in range(i + 1, len(statuses)):
                a, b = statuses[i], statuses[j]
                pair = (a.get("value"), b.get("value"))
                reverse_pair = (b.get("value"), a.get("value"))
                if pair in MUTUALLY_EXCLUSIVE_STATUS_PAIRS or reverse_pair in MUTUALLY_EXCLUSIVE_STATUS_PAIRS:
                    a_start, a_end = _year_of(a.get("validFrom")), _year_of(a.get("validTo"))
                    b_start, b_end = _year_of(b.get("validFrom")), _year_of(b.get("validTo"))
                    if _periods_overlap(a_start, a_end, b_start, b_end):
                        problems.append(
                            f"{eid}: incompatible statuses overlap in time — "
                            f"'{a.get('value')}' ({a_start}-{a_end}) and '{b.get('value')}' ({b_start}-{b_end})"
                        )

        # Place-specific: must not be timeless (correction #4).
        if category == "Place" and "existencePeriod" not in entity:
            problems.append(f"{eid}: Place is missing 'existencePeriod' — a Place must not be treated as timeless")

        # Event/Process participant references must point to real entities.
        if category == "Event":
            for p in entity.get("participantIds", []):
                if p.get("entityId") not in entity_ids:
                    problems.append(f"{eid} (Event): participant references non-existent entity '{p.get('entityId')}'")
        if category == "Process":
            for p in entity.get("participants", []):
                if p.get("entityId") not in entity_ids:
                    problems.append(f"{eid} (Process): participant references non-existent entity '{p.get('entityId')}'")

    return problems
