"""Minimal relations for the Gabon/Central Africa pilot corpus.

Kept deliberately minimal per PR pilote 1's scope — only relations with
adequate sourcing right now. Relations requiring Event/PeriodInterpretation
context (e.g. the precise nature of Kongo's Portugal relationship across
1857-1914) are deferred to PR pilote 2.
"""
from ..builders import make_historical_date, make_relation
from . import sources as S
from .entities import (
    people_fang,
    people_mpongwe,
    people_myene,
    people_vili,
    place_gabon_region,
    place_mbanza_kongo,
    polity_aef,
    polity_kongo,
    polity_loango,
    polity_republique_gabonaise,
)

relations = [
    # Mbanza Kongo is Kongo's capital — direction: Place -> Polity (capitalOf).
    make_relation(
        place_mbanza_kongo["id"], polity_kongo["id"], "capitalOf",
        valid_from=make_historical_date(1390, approximate=True),
        sources=[S.SRC_BRITANNICA_KONGO],
        confidence="medium", integration_status="ready",
    ),

    # Mpongwè / Myènè — EXACT relation kept as specified: unclassified,
    # with the precise notes text given, status provisional. NOT
    # "languageVarietyOf" (that would concern a language, not two peoples).
    make_relation(
        people_mpongwe["id"], people_myene["id"], "unclassified",
        valid_from=make_historical_date(1600, approximate=True),
        sources=[S.SRC_SOROSORO],
        confidence="medium",
        notes="Mpongwè décrit comme composante ethnolinguistique de l'ensemble myènè ; qualification ontologique définitive à confirmer.",
        integration_status="provisional",
    ),

    # Vili are the major population associated with Loango (Britannica, C) —
    # using the existing "majorPopulationIn" relation type rather than
    # introducing near-duplicate new type strings.
    make_relation(
        people_vili["id"], polity_loango["id"], "majorPopulationIn",
        valid_from=make_historical_date(1600, approximate=True),
        sources=[S.SRC_BRITANNICA_LOANGO],
        confidence="medium", integration_status="ready",
    ),

    # Mpongwè inhabit the Gabon estuary region (Bucher, B).
    make_relation(
        people_mpongwe["id"], place_gabon_region["id"], "inhabitsArea",
        valid_from=make_historical_date(1600, approximate=True),
        sources=[S.SRC_BUCHER_1977],
        confidence="medium", integration_status="ready",
    ),

    # Fang migrated into the Gabon estuary region — kept provisional given
    # the whole migration narrative's documented complexity/critique.
    make_relation(
        people_fang["id"], place_gabon_region["id"], "migratedInto",
        valid_from=make_historical_date(1860, approximate=True),
        sources=[S.SRC_IRD_SALLEE],
        confidence="low",
        notes="Specific estuary arrival per an eyewitness account (du Chaillu, via IRD/Sallée); NOT the start of the broader, undated migration process (see Process, deferred to PR pilote 2).",
        integration_status="provisional",
    ),

    # AEF administers the Gabon region, 1910-1958 (approx.).
    make_relation(
        polity_aef["id"], place_gabon_region["id"], "administers",
        valid_from=make_historical_date(1910),
        valid_to=make_historical_date(1958, approximate=True),
        sources=[S.SRC_JORF_AEF_1910],
        confidence="high", integration_status="ready",
    ),

    # République gabonaise: administers (member of Community, not yet fully
    # sovereign) 1958-1960, then governs (sovereign) from 1960 — two
    # distinct, differently-qualified relations, not one blanket relation.
    make_relation(
        polity_republique_gabonaise["id"], place_gabon_region["id"], "administers",
        valid_from=make_historical_date(1958),
        valid_to=make_historical_date(1960),
        sources=[S.SRC_JO_COMMUNAUTE_1958],
        confidence="high", integration_status="ready",
    ),
    make_relation(
        polity_republique_gabonaise["id"], place_gabon_region["id"], "governs",
        valid_from=make_historical_date(1960),
        sources=[S.SRC_JO_INDEPENDANCE_1960],
        confidence="high", integration_status="ready",
    ),

    # Deliberately ABSENT: any relation between polity_loango and
    # place_cote_de_loango — the connection between the political kingdom
    # and the broader commercial coast region is explicitly unresolved per
    # the comparative synthesis; forcing a relation now would overstate what
    # the sources establish.
]

__all__ = ["relations"]
