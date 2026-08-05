"""Factory functions for core_v3 objects. Using plain dicts (consistent with
the rest of this codebase's data files, e.g. historical_polities.py) rather
than introducing a new ORM/pydantic dependency. Every factory auto-generates
a stable id via schema.new_id() unless one is explicitly passed.
"""
from .schema import new_id


def make_source(label, category="E", url=None, accessed_on=None, disputed=False):
    """`category`: A (archive/legal text/contemporary primary source),
    B (specialized academic publication), C (institutional publication or
    recognized specialized encyclopedia), D (press/embassy/institutional
    popularization), E (Wikipedia/secondary wiki/blog/general-audience site,
    the default — a safe, conservative default that must be explicitly
    upgraded, never silently assumed better than it is).
    See schema.py's SOURCE_CATEGORIES."""
    return {"id": new_id("src"), "label": label, "category": category, "url": url, "accessedOn": accessed_on, "disputed": disputed}


def make_historical_date(year, precision=None, open_ended=False, approximate=False):
    """`open_ended=True` means "still ongoing / no known end" (e.g. a Process
    with no determined end). `approximate=True` marks a date the sources only
    allow roughly, not an exact year."""
    return {"year": year, "precision": precision, "openEnded": open_ended, "approximate": approximate}


def make_historical_name(value, applies_to_entity_id, name_type, valid_from, sources,
                          normalized_value=None, language=None, script=None, valid_to=None,
                          first_known_attestation=None, geographic_scope="whole-entity",
                          confidence="unreviewed", notes=None, is_preferred_display_name=False,
                          integration_status="provisional"):
    """`integration_status` (ready/provisional/disputed/research-gap) is
    DISTINCT from `confidence`: confidence asks how certain the claim is
    historically; integration_status asks how ready it is for production
    use editorially. See schema.py's INTEGRATION_STATUSES."""
    return {
        "id": new_id("name"),
        "value": value,
        "normalizedValue": normalized_value or value,
        "language": language,
        "script": script,
        "nameType": name_type,
        "appliesToEntityId": applies_to_entity_id,
        "validFrom": valid_from,
        "validTo": valid_to,
        "firstKnownAttestation": first_known_attestation,
        "geographicScope": geographic_scope,
        "confidence": confidence,
        "sources": sources,
        "notes": notes,
        "isPreferredDisplayName": is_preferred_display_name,
        "integrationStatus": integration_status,
    }


def make_historical_status(value, valid_from, sources, valid_to=None, confidence="unreviewed", notes=None,
                            integration_status="provisional"):
    return {
        "id": new_id("status"),
        "value": value,
        "validFrom": valid_from,
        "validTo": valid_to,
        "confidence": confidence,
        "sources": sources,
        "notes": notes,
        "integrationStatus": integration_status,
    }


def make_historical_geometry(kind, valid_period, sources, confidence="unreviewed",
                              geo_json=None, detail_level=None, recommended_min_zoom=None):
    return {
        "id": new_id("geom"),
        "kind": kind,
        "validPeriod": valid_period,
        "sources": sources,
        "confidence": confidence,
        "geoJson": geo_json,
        "detailLevel": detail_level,
        "recommendedMinZoom": recommended_min_zoom,
    }


def make_relation(from_entity_id, to_entity_id, relation_type, valid_from, sources,
                   valid_to=None, confidence="unreviewed", notes=None,
                   integration_status="provisional"):
    return {
        "id": new_id("rel"),
        "fromEntityId": from_entity_id,
        "toEntityId": to_entity_id,
        "relationType": relation_type,
        "validFrom": valid_from,
        "validTo": valid_to,
        "confidence": confidence,
        "sources": sources,
        "notes": notes,
        "integrationStatus": integration_status,
    }


def make_polity(polity_type, names=None, statuses=None, geometries=None, is_fixture=False):
    return {
        "id": new_id("polity"),
        "category": "Polity",
        "polityType": polity_type,
        "names": names or [],
        "statuses": statuses or [],
        "geometries": geometries or [],
        "isFixture": is_fixture,
    }


def make_place(place_type, names=None, geometries=None, existence_period=None, is_fixture=False):
    """Per correction #4: Place is NOT timeless. `existence_period` records
    when this Place (as conceived/bounded) existed or was in use — a Place
    can be transformed, renamed, or cease to exist, exactly like a Polity."""
    return {
        "id": new_id("place"),
        "category": "Place",
        "placeType": place_type,
        "names": names or [],
        "geometries": geometries or [],
        "existencePeriod": existence_period,
        "isFixture": is_fixture,
    }


def make_people(names=None, language_ids=None, is_fixture=False):
    return {
        "id": new_id("people"),
        "category": "People",
        "names": names or [],
        "languageIds": language_ids or [],
        "isFixture": is_fixture,
    }


def make_event(event_type, date, sources, participant_ids=None, causes_relation_ids=None,
               confidence="unreviewed", is_fixture=False):
    return {
        "id": new_id("event"),
        "category": "Event",
        "eventType": event_type,
        "date": date,
        "participantIds": participant_ids or [],
        "causesRelationIds": causes_relation_ids or [],
        "sources": sources,
        "confidence": confidence,
        "isFixture": is_fixture,
    }


def make_process(process_type, period, sources, phases=None, trajectories=None,
                  participants=None, associated_event_ids=None, confidence="unreviewed",
                  is_fixture=False):
    return {
        "id": new_id("process"),
        "category": "Process",
        "processType": process_type,
        "period": period,
        "phases": phases or [],
        "trajectories": trajectories or [],
        "participants": participants or [],
        "associatedEventIds": associated_event_ids or [],
        "sources": sources,
        "confidence": confidence,
        "isFixture": is_fixture,
    }
