from data.country_dossiers import SOUTH_AFRICA_DOSSIER


def test_society_state_sections_are_integrated():
    for key in ("society", "education_health", "national_symbols", "international_role"):
        assert key in SOUTH_AFRICA_DOSSIER


def test_all_new_claims_have_sources():
    source_ids = {item["id"] for item in SOUTH_AFRICA_DOSSIER["sources"]}
    blocks = []
    blocks.extend(SOUTH_AFRICA_DOSSIER["society"]["themes"])
    blocks.extend(SOUTH_AFRICA_DOSSIER["education_health"]["education"]["items"])
    blocks.extend(SOUTH_AFRICA_DOSSIER["education_health"]["health"]["items"])
    blocks.extend(SOUTH_AFRICA_DOSSIER["national_symbols"]["items"])
    blocks.extend(SOUTH_AFRICA_DOSSIER["international_role"]["memberships"])
    assert blocks
    for block in blocks:
        assert block.get("sourceIds")
        assert set(block["sourceIds"]).issubset(source_ids)


def test_public_copy_does_not_expose_internal_research_workflow():
    serialized = str({
        "society": SOUTH_AFRICA_DOSSIER["society"],
        "education_health": SOUTH_AFRICA_DOSSIER["education_health"],
        "national_symbols": SOUTH_AFRICA_DOSSIER["national_symbols"],
        "international_role": SOUTH_AFRICA_DOSSIER["international_role"],
    }).lower()
    assert "todo" not in serialized
    assert "internal research" not in serialized
