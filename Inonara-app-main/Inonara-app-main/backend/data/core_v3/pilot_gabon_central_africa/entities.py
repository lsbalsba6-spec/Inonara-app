"""Entities for the Gabon/Central Africa pilot: 4 Place, 4 Polity, 4 People.

Scope note (PR pilote 1, per the comparative synthesis): this PR creates
entity SHELLS with their names/statuses where a robust source already
supports them. It deliberately does NOT yet populate:
  - Kongo's fine-grained 1857-1914 status nuance (needs PeriodInterpretation
    + Event + Relation modeling, explicitly deferred to PR pilote 2);
  - real geometries for any entity (deferred, cartography questions
    unresolved per the comparative synthesis);
  - Event/Process objects (PR pilote 2).
Each of these deferrals is marked explicitly in the field/comment below it,
not silently left empty without explanation.
"""
from ..builders import (
    make_historical_date,
    make_historical_name,
    make_historical_status,
    make_people,
    make_place,
    make_polity,
)
from . import sources as S

# =====================================================================
# PLACES
# =====================================================================

place_gabon_region = make_place(
    place_type="territory",
    existence_period={
        "start": make_historical_date(1300, approximate=True),  # Mpongwe settlement tradition, Raponda-Walker
        "end": make_historical_date(2100, open_ended=True),
    },
)
place_gabon_region["names"] = [
    make_historical_name(
        "Gabão", place_gabon_region["id"], "exonym",
        valid_from=make_historical_date(1472),
        valid_to=None,  # deliberately NOT fixed to 1839 — see corrections; no confirmed
        # last-attestation date found, and the French treaty of 1839 does not
        # itself document the Portuguese name falling out of use.
        first_known_attestation=make_historical_date(1472),
        geographic_scope="partial",  # the estuary/coastal contact zone, NOT the whole modern Gabonese territory
        sources=[S.SRC_UNIVERSALIS_LIBREVILLE],
        confidence="medium",
        notes=(
            "Applies to the Komo estuary/coastal contact zone specifically, not the whole "
            "modern territory. Universalis states explicitly the exact motivation for the name "
            "is unknown ('on ne sait pourquoi'). Last-attestation date and probable-usage end "
            "date are UNKNOWN — do not infer an end from the unrelated 1839 French treaty."
        ),
        is_preferred_display_name=False,
        integration_status="ready",
    ),
    make_historical_name(
        "Gabon", place_gabon_region["id"], "modern",
        valid_from=make_historical_date(1839, approximate=True),  # French usage becomes dominant around/after the treaties, exact transition date not established
        valid_to=None,
        geographic_scope="partial",
        sources=[S.SRC_UNIVERSALIS_LIBREVILLE],
        confidence="low",
        notes=(
            "The exact transition point from Portuguese to French usage as the DOMINANT "
            "displayed name is not established by any source found — 1839 is used here only "
            "as an approximate anchor (the treaty date), not a documented naming-transition date. "
            "The two names may have coexisted for some time."
        ),
        integration_status="provisional",
    ),
]

place_libreville = make_place(
    place_type="settlement",
    existence_period={
        "start": make_historical_date(1849, approximate=True),  # see disputed note below
        "end": make_historical_date(2100, open_ended=True),
    },
)
place_libreville["names"] = [
    make_historical_name(
        "Libreville", place_libreville["id"], "modern",
        valid_from=make_historical_date(1849, approximate=True),
        valid_to=None,
        geographic_scope="whole-entity",
        sources=[S.SRC_IRD_SALLEE],
        confidence="disputed",
        notes=(
            "Founding year is DISPUTED across sources: IRD/Sallée (citing Raponda-Walker) gives "
            "1849 (capture of the slave ship l'Elizia, name adopted in memory of freed captives); "
            "other sources give 1848 (46 captives landed) or 1850. These may describe slightly "
            "different moments (capture/liberation vs. naming vs. administrative founding) rather "
            "than a single contradicted date — not yet disentangled. Do not treat any one year as settled."
        ),
        integration_status="disputed",
    ),
]

place_mbanza_kongo = make_place(
    place_type="settlement",
    existence_period={
        "start": make_historical_date(1390, approximate=True),
        "end": make_historical_date(2100, open_ended=True),  # the city still exists today, in modern Angola
    },
)
place_mbanza_kongo["names"] = [
    make_historical_name(
        "Mbanza Kongo", place_mbanza_kongo["id"], "endonym",
        valid_from=make_historical_date(1390, approximate=True),
        valid_to=None,
        geographic_scope="whole-entity",
        sources=[S.SRC_BRITANNICA_KONGO],
        confidence="medium",
        notes="Original name; still in use today as the modern Angolan city's name.",
        integration_status="ready",
    ),
    make_historical_name(
        "São Salvador", place_mbanza_kongo["id"], "colonial",
        valid_from=make_historical_date(1500, approximate=True),
        valid_to=make_historical_date(1975, approximate=True),
        geographic_scope="whole-entity",
        sources=[S.SRC_BRITANNICA_KONGO],
        confidence="low",
        notes="Portuguese-influenced court name; exact adoption date not precisely established.",
        integration_status="provisional",
    ),
]

place_cote_de_loango = make_place(
    place_type="territory",
    existence_period={
        "start": None,  # deliberately left unset — see note
        "end": None,
    },
)
place_cote_de_loango["names"] = [
    make_historical_name(
        "Loango Coast / Côte de Loango", place_cote_de_loango["id"], "unclassified",
        valid_from=make_historical_date(1500, approximate=True),
        valid_to=None,
        geographic_scope="partial",
        sources=[S.SRC_MARTIN_1972],
        confidence="medium",
        notes=(
            "This is the COMMERCIAL/geographic region Martin studied (Cape Lopez in the north — "
            "in modern Gabon — to the Congo river in the south), explicitly NOT the same as the "
            "political Kingdom of Loango's sovereign territory, and NOT bounded by Martin's "
            "1576-1870 study-scope dates, which describe her book's research period, not this "
            "region's existence. No source found establishes the Kingdom of Loango exercised "
            "effective sovereignty as far as Cape Lopez."
        ),
        integration_status="ready",  # the fact that this is a distinct commercial-region concept is well-sourced (B); its exact bounds/dates are not claimed as precise
    ),
]

# =====================================================================
# POLITIES
# =====================================================================

polity_kongo = make_polity(polity_type="kingdom")
polity_kongo["names"] = [
    make_historical_name(
        "Kingdom of Kongo / Royaume du Kongo", polity_kongo["id"], "exonym",
        valid_from=make_historical_date(1390, approximate=True),
        valid_to=None,  # deliberately no end date on the NAME — see PR pilote 1 scope note re: statuses
        geographic_scope="whole-entity",
        sources=[S.SRC_THORNTON_2001, S.SRC_BRITANNICA_KONGO],
        confidence="medium",
        integration_status="ready",
    ),
    make_historical_name(
        "Kongo dia Ntotila", polity_kongo["id"], "unclassified",
        valid_from=make_historical_date(1390, approximate=True),
        valid_to=None,
        geographic_scope="whole-entity",
        sources=[S.SRC_IRD_SALLEE],  # placeholder pending a dedicated linguistic source
        confidence="unreviewed",
        notes=(
            "CANDIDATE endonym, NOT yet validated as historically definitive. No academic/"
            "linguistic source was found establishing the exact form, language/orthography, "
            "attestation period, precise meaning, or REAL use as a political self-designation "
            "(as opposed to being reconstructed from collective memory sources). Kept as a "
            "historical-name candidate per explicit instruction, not as a confirmed endonym."
        ),
        integration_status="research-gap",
    ),
]
# statuses: DELIBERATELY EMPTY in this PR. The 1857-1888-1914 nuance
# (oath of vassalage / Portuguese garrison presence / its withdrawal /
# effective political autonomy / the 1888 reaffirmation-or-occupation) must
# NOT be collapsed into a single HistoricalStatus per the explicit
# correction — it requires Event + Relation (+ PeriodInterpretation for the
# historiographical phases), which is PR pilote 2's job. Modeling it here
# prematurely, even "carefully", would repeat the exact oversimplification
# already flagged and corrected twice in the research dossiers.
polity_kongo["statuses"] = []

polity_loango = make_polity(polity_type="kingdom")
polity_loango["names"] = [
    make_historical_name(
        "Kingdom of Loango / Royaume de Loango", polity_loango["id"], "exonym",
        valid_from=make_historical_date(1400, approximate=True),
        valid_to=None,  # deliberately NO end date — the 1883 treaty is research-gap, not settled
        geographic_scope="whole-entity",
        sources=[S.SRC_BRITANNICA_LOANGO],
        confidence="low",
        notes="Founding date itself is a research-gap (see sources.py); this name-existence claim is separate from any specific founding-date claim.",
        integration_status="ready",
    ),
]
polity_loango["statuses"] = []  # no status change robustly sourced; end-of-sovereignty date explicitly not fixed (Cordier 1883 treaty remains research-gap)

polity_aef = make_polity(polity_type="federation")
polity_aef["names"] = [
    make_historical_name(
        "Afrique-Équatoriale française (AEF)", polity_aef["id"], "colonial",
        valid_from=make_historical_date(1910),
        valid_to=make_historical_date(1958, approximate=True),
        geographic_scope="whole-entity",
        sources=[S.SRC_JORF_AEF_1910, S.SRC_MJP_UNIV_PERPIGNAN],
        confidence="high",
        integration_status="ready",
    ),
]
polity_aef["statuses"] = [
    make_historical_status(
        "federated-territory", make_historical_date(1910), [S.SRC_JORF_AEF_1910],
        valid_to=make_historical_date(1958, approximate=True), confidence="high",
        notes="Precise federation-dissolution date not specifically researched; 1958 used as an approximate anchor matching Gabon's own status change.",
        integration_status="provisional",
    ),
]

polity_republique_gabonaise = make_polity(polity_type="state")
polity_republique_gabonaise["names"] = [
    make_historical_name(
        "République gabonaise", polity_republique_gabonaise["id"], "modern",
        valid_from=make_historical_date(1958),
        valid_to=None,
        geographic_scope="whole-entity",
        sources=[S.SRC_JO_COMMUNAUTE_1958, S.SRC_JO_INDEPENDANCE_1960],
        confidence="high",
        integration_status="ready",
    ),
]
polity_republique_gabonaise["statuses"] = [
    make_historical_status(
        "autonomous-region", make_historical_date(1958),
        [S.SRC_JO_COMMUNAUTE_1958],
        valid_to=make_historical_date(1960),
        confidence="high",
        notes="État membre de la Communauté française — self-governing but not yet fully sovereign.",
        integration_status="ready",
    ),
    make_historical_status(
        "sovereign", make_historical_date(1960),
        [S.SRC_JO_INDEPENDANCE_1960, S.SRC_AGP_INDEPENDENCE],
        valid_to=None,
        confidence="high",
        integration_status="ready",
    ),
]

# =====================================================================
# PEOPLES
# =====================================================================

people_myene = make_people()
people_myene["names"] = [
    make_historical_name(
        "Myènè", people_myene["id"], "unclassified",
        valid_from=make_historical_date(1300, approximate=True), valid_to=None,
        sources=[S.SRC_SOROSORO, S.SRC_IRD_SALLEE],
        confidence="medium", integration_status="ready",
    ),
]

people_mpongwe = make_people()
people_mpongwe["names"] = [
    make_historical_name(
        "Mpongwè", people_mpongwe["id"], "unclassified",
        valid_from=make_historical_date(1600, approximate=True),  # Bucher: estuary controlled by this group by 17th c. at latest; name attested from late 1700s
        valid_to=None,
        sources=[S.SRC_BUCHER_1977],
        confidence="medium",
        notes="Bucher (1977): the group controlling the estuary mouth by the early 17th c. at the latest was only CALLED 'Mpongwe' from at least the late 1700s — the ethnonym postdates the group's presence.",
        integration_status="ready",
    ),
]

people_vili = make_people()
people_vili["names"] = [
    make_historical_name(
        "Vili / Bavili", people_vili["id"], "unclassified",
        valid_from=make_historical_date(1600, approximate=True), valid_to=None,
        sources=[S.SRC_BRITANNICA_LOANGO],
        confidence="medium", integration_status="ready",
    ),
]

people_fang = make_people()
people_fang["names"] = [
    make_historical_name(
        "Fang", people_fang["id"], "unclassified",
        valid_from=make_historical_date(1665, approximate=True),  # glottochronological split from Bulu/Beti
        valid_to=None,
        sources=[S.SRC_MEDCRAVE_FANG_2023, S.SRC_BRITANNICA_FANG],
        confidence="low",
        notes=(
            "The 1665 date reflects a GLOTTOCHRONOLOGICAL estimate of linguistic separation from "
            "Bulu/Beti, not a documented migration start. Academic critique (Alexandre & Binet; "
            "Balandier) establishes that 19th-century Fang clans had NO consciousness of unified "
            "ethnic identity — 'Fang' as a single People here is a modeling simplification of a "
            "looser network of clans, flagged accordingly."
        ),
        integration_status="provisional",
    ),
]

__all__ = [
    "people_fang",
    "people_mpongwe",
    "people_myene",
    "people_vili",
    "place_cote_de_loango",
    "place_gabon_region",
    "place_libreville",
    "place_mbanza_kongo",
    "polity_aef",
    "polity_kongo",
    "polity_loango",
    "polity_republique_gabonaise",
]
