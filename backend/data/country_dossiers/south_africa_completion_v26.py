"""South Africa V26 — deepen the French pilot dossier before translation.

This pass deliberately enriches reader-facing French content only. It adds
education, health, belief systems and internal mobility to the society chapter,
using institutional/statistical sources. The English conversion remains a later
phase once the South Africa pilot dossier is content-complete.
"""

V26_SOURCES = [
    {
        "id": "v26-za-dbe-education",
        "category": "A",
        "title": "Education in South Africa",
        "publisher": "Department of Basic Education",
        "url": "https://www.education.gov.za/Programmes/EducationinSA.aspx",
    },
    {
        "id": "v26-za-gov-education",
        "category": "A",
        "title": "Education",
        "publisher": "South African Government",
        "url": "https://www.gov.za/about-sa/education",
    },
    {
        "id": "v26-za-gov-health",
        "category": "A",
        "title": "Health",
        "publisher": "South African Government",
        "url": "https://www.gov.za/about-sa/health",
    },
    {
        "id": "v26-za-health-nhi",
        "category": "A",
        "title": "National Health Insurance — Background",
        "publisher": "National Department of Health",
        "url": "https://www.health.gov.za/nhi/",
    },
    {
        "id": "v26-za-census-2022",
        "category": "A",
        "title": "Census 2022 Statistical Release",
        "publisher": "Statistics South Africa",
        "url": "https://census.statssa.gov.za/assets/documents/2022/P03014_Census_2022_Statistical_Release.pdf",
    },
]

V26_SOCIETY_THEMES = [
    {
        "id": "za-society-education-v26",
        "title": "Éducation : de l'école au système post-scolaire",
        "text": (
            "L'éducation est un droit constitutionnel et son organisation reflète à la fois la reconstruction démocratique et les héritages spatiaux de l'apartheid. "
            "Le Department of Basic Education pilote l'enseignement scolaire de Grade R à Grade 12, tandis que le Department of Higher Education and Training couvre notamment universités, collèges TVET, formation post-scolaire et développement des compétences. "
            "Le système public combine ainsi écoles, universités, formation professionnelle et dispositifs d'aide aux étudiants. Les écarts entre territoires, établissements et ressources disponibles restent toutefois essentiels pour comprendre l'expérience concrète des apprenants. "
            "Le recensement de 2022 montre en parallèle la place croissante de l'éducation de la petite enfance et une progression de la fréquentation des établissements chez les 5–24 ans sur le temps long."
        ),
        "sourceIds": ["v26-za-dbe-education", "v26-za-gov-education", "v26-za-census-2022"],
    },
    {
        "id": "za-society-health-v26",
        "title": "Santé : un système public et privé en transformation",
        "text": (
            "Le système de santé sud-africain associe un vaste secteur public à un secteur privé important. Le National Health Act organise les responsabilités publiques et la politique nationale met l'accent sur les soins de santé primaires, la prévention, les services hospitaliers et l'amélioration de l'accès. "
            "Cette architecture reste marquée par de fortes inégalités de ressources et d'accès entre populations et territoires. La réforme de la couverture sanitaire universelle, portée par le National Health Insurance, s'inscrit dans une tentative de réduire cette fragmentation et d'élargir l'accès à des soins de qualité. "
            "Pour Inonara, la santé doit donc être lue comme une histoire sociale autant qu'institutionnelle : infrastructures, héritages de la ségrégation, géographie urbaine et rurale, politiques publiques et transformations démographiques se croisent."
        ),
        "sourceIds": ["v26-za-gov-health", "v26-za-health-nhi"],
    },
    {
        "id": "za-society-beliefs-v26",
        "title": "Religions, croyances et pluralité spirituelle",
        "text": (
            "Le paysage religieux sud-africain est profondément pluriel. Le christianisme est l'affiliation déclarée par une large majorité de la population au recensement de 2022, mais cette catégorie recouvre elle-même de nombreuses Églises et traditions. "
            "Les religions africaines traditionnelles, l'islam, l'hindouisme, le judaïsme et d'autres appartenances participent également à l'histoire sociale du pays, tandis qu'une partie de la population déclare ne pas avoir d'affiliation religieuse. "
            "Cette diversité résulte de trajectoires anciennes et modernes : cosmologies africaines, missions chrétiennes, esclavage et circulations de l'océan Indien, migrations indiennes, réseaux musulmans du Cap, urbanisation et mouvements religieux indépendants. Elle ne se réduit donc pas à une simple répartition statistique."
        ),
        "sourceIds": ["v26-za-census-2022"],
    },
    {
        "id": "za-society-mobility-v26",
        "title": "Mobilités internes et recomposition des provinces",
        "text": (
            "Les migrations internes participent fortement à la géographie contemporaine du pays. Études, recherche d'emploi, logement, liens familiaux et accès aux services relient métropoles, petites villes et espaces ruraux. "
            "Entre les recensements de 2011 et 2022, Statistics South Africa observe des soldes migratoires provinciaux contrastés : Gauteng, KwaZulu-Natal, Western Cape, Northern Cape et Mpumalanga figurent parmi les provinces ayant enregistré un solde positif sur la période. "
            "Ces flux prolongent sans les reproduire à l'identique des histoires plus anciennes de travail migrant, d'urbanisation contrôlée et de déplacements forcés. Les comprendre permet de relier la démographie actuelle aux chapitres historiques, économiques et territoriaux du dossier."
        ),
        "sourceIds": ["v26-za-census-2022"],
    },
]


def _merge_unique(target, incoming):
    ids = {item.get("id") for item in target if isinstance(item, dict)}
    target.extend(item for item in incoming if item.get("id") not in ids)


def apply_south_africa_v26(dossier):
    if dossier.get("iso2") != "ZA":
        return dossier

    society = dossier.setdefault("society", {})
    _merge_unique(society.setdefault("themes", []), V26_SOCIETY_THEMES)
    _merge_unique(dossier.setdefault("sources", []), V26_SOURCES)

    dossier["last_reviewed"] = "2026-09-13"
    dossier["content_completion"] = {
        "fr": "Dossier pilote français en approfondissement : ajout de synthèses développées sur l'éducation, la santé, les croyances et les mobilités internes.",
        "phase": "fr-pilot-deepening-v26",
    }
    return dossier
