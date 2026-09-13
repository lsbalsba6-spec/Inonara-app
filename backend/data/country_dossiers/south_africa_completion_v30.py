"""South Africa V30 — final French completeness lock.

Closes remaining source gaps in reader-facing culture/media/memory cards and
records a section-by-section completeness gate for the South Africa pilot.
"""

V30_SOURCES = [
    {
        "id": "v30-icasa-broadcasting",
        "category": "A",
        "title": "Broadcasting",
        "publisher": "Independent Communications Authority of South Africa",
        "url": "https://www.icasa.org.za/pages/broadcasting",
    },
    {
        "id": "v30-icasa-community",
        "category": "A",
        "title": "Community Broadcasting Regulations",
        "publisher": "Independent Communications Authority of South Africa",
        "url": "https://www.icasa.org.za/news/2019/new-community-broadcasting-regulations",
    },
    {
        "id": "v30-icasa-ict-2026",
        "category": "A",
        "title": "The State of the ICT Sector Report of South Africa — March 2026",
        "publisher": "Independent Communications Authority of South Africa",
        "url": "https://www.icasa.org.za/uploads/files/The-State-of-the-ICT-Sector-Report-of-South-Africa-31-March-2026.pdf",
    },
    {
        "id": "v30-sabc-broadcasting-act",
        "category": "A",
        "title": "Broadcasting Act",
        "publisher": "South African Broadcasting Corporation",
        "url": "https://www.sabc.co.za/sabc/broadcasting-act/",
    },
    {
        "id": "v30-trc-official",
        "category": "A",
        "title": "Truth and Reconciliation Commission",
        "publisher": "Department of Justice and Constitutional Development",
        "url": "https://www.justice.gov.za/trc/",
    },
    {
        "id": "v30-trc-report",
        "category": "A",
        "title": "Truth and Reconciliation Commission Final Report",
        "publisher": "Department of Justice and Constitutional Development",
        "url": "https://www.justice.gov.za/trc/report/",
    },
]

MEDIA_FINAL = [
    {
        "id": "za-media-public-system-v30",
        "title": "Un système audiovisuel pensé comme infrastructure publique",
        "text": (
            "La radiodiffusion sud-africaine est encadrée par un régulateur indépendant, ICASA, chargé notamment de délivrer les licences, gérer le spectre et protéger le public. "
            "Le Broadcasting Act inscrit explicitement l'audiovisuel dans des objectifs de démocratie, pluralité des opinions, développement social, programmation locale et représentation de la diversité culturelle et linguistique. "
            "Cette architecture aide à comprendre pourquoi la radio et la télévision occupent une place politique qui dépasse le divertissement."
        ),
        "sourceIds": ["v30-icasa-broadcasting", "v30-sabc-broadcasting-act"],
    },
    {
        "id": "za-media-community-v30",
        "title": "Radio communautaire : langue, proximité et participation",
        "text": (
            "Les radios communautaires constituent un troisième espace entre service public et médias commerciaux. Leur cadre réglementaire insiste sur la propriété communautaire, la participation locale et la capacité à exprimer histoires, langues, patrimoine et préoccupations d'un territoire. "
            "En août 2026, ICASA a encore attribué de nouvelles licences communautaires, confirmant que ce secteur reste une composante active du paysage médiatique contemporain."
        ),
        "sourceIds": ["v30-icasa-community", "v30-icasa-ict-2026"],
    },
    {
        "id": "za-media-digital-transition-v30",
        "title": "Streaming, plateformes et transformation du paysage audiovisuel",
        "text": (
            "Le paysage médiatique se transforme avec la migration numérique, les services de streaming et la convergence entre télévision, vidéo en ligne, réseaux sociaux et télécommunications. "
            "ICASA souligne que cette évolution modifie la concurrence, les modèles économiques et les politiques de contenu local. Pour Inonara, cela signifie qu'une carte des médias doit montrer à la fois les diffuseurs traditionnels, les radios communautaires et les nouveaux circuits numériques."
        ),
        "sourceIds": ["v30-icasa-ict-2026"],
    },
]

MEMORY_FINAL = [
    {
        "id": "za-memory-trc-process-v30",
        "title": "La Commission vérité et réconciliation : un dispositif institutionnel, pas un simple symbole",
        "text": (
            "Créée après la fin de l'apartheid, la Truth and Reconciliation Commission a organisé son travail autour des violations des droits humains, des demandes d'amnistie et des réparations. "
            "Ses audiences ont rendu publiques des expériences jusque-là dispersées ou niées, tout en produisant une archive considérable. Le rapport final reste aujourd'hui une source essentielle pour travailler sur la violence politique, la responsabilité institutionnelle et les trajectoires de victimes."
        ),
        "sourceIds": ["v30-trc-official", "v30-trc-report"],
    },
    {
        "id": "za-memory-after-trc-v30",
        "title": "Après la TRC : une mémoire toujours en mouvement",
        "text": (
            "La TRC n'a pas fermé le débat sur justice et réparation. Les discussions sur poursuites, réparations, monuments, archives, restitution foncière et transmission scolaire montrent que la mémoire de l'apartheid reste un domaine politique et social vivant. "
            "Le dossier relie donc mémoire, droit, biographies, lieux de résistance et institutions démocratiques plutôt que de présenter la réconciliation comme un événement achevé."
        ),
        "sourceIds": ["v30-trc-official", "v30-trc-report"],
    },
]

SOURCE_PATCHES = {
    "za-media-ecosystem-v28": ["v30-icasa-broadcasting", "v30-icasa-community"],
    "za-media-digital-v28": ["v30-icasa-ict-2026"],
    "za-media-democracy-v29": ["v30-icasa-broadcasting", "v30-sabc-broadcasting-act"],
    "za-media-creative-v29": ["v30-icasa-ict-2026"],
    "za-memory-trc-v28": ["v30-trc-official", "v30-trc-report"],
}

COMPLETENESS_GATE = {
    "language": "fr",
    "status": "content-complete",
    "reviewed_on": "2026-09-13",
    "sections": {
        "overview": "complete",
        "territory": "complete",
        "history": "complete",
        "peoples": "complete",
        "languages": "complete",
        "religions_beliefs": "complete",
        "migrations": "complete",
        "institutions_memory": "complete",
        "economy": "complete",
        "society": "complete",
        "education_health": "complete",
        "culture": "complete",
        "heritage": "complete",
        "environment": "complete",
        "figures": "complete",
        "media": "complete",
        "international_role": "complete",
        "sources": "complete",
        "interactive_cartography": "content-ready",
    },
    "next_phase": "fr-en-translation-and-visual-qa",
}


def _merge_unique(target, incoming):
    ids = {item.get("id") for item in target if isinstance(item, dict)}
    target.extend(item for item in incoming if item.get("id") not in ids)


def _patch_theme_sources(container):
    if not isinstance(container, dict):
        return
    for item in container.get("themes", []):
        if isinstance(item, dict) and item.get("id") in SOURCE_PATCHES and not item.get("sourceIds"):
            item["sourceIds"] = SOURCE_PATCHES[item["id"]]


def apply_south_africa_v30(dossier):
    if dossier.get("iso2") != "ZA":
        return dossier

    _merge_unique(dossier.setdefault("sources", []), V30_SOURCES)
    _merge_unique(dossier.setdefault("media", {}).setdefault("themes", []), MEDIA_FINAL)
    _merge_unique(dossier.setdefault("institutions_memory", {}).setdefault("themes", []), MEMORY_FINAL)

    _patch_theme_sources(dossier.get("media"))
    _patch_theme_sources(dossier.get("institutions_memory"))

    dossier["completeness_gate"] = COMPLETENESS_GATE
    dossier["content_completion"] = {
        "fr": "Afrique du Sud — contenu français verrouillé : tous les grands onglets ont une couverture éditoriale développée et sourcée ; la suite est la traduction EN et le contrôle visuel final.",
        "phase": "fr-content-locked-v30",
    }
    dossier["last_reviewed"] = "2026-09-13"
    return dossier
