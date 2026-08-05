"""Enrich the South Africa master dossier with biographies, science and environment.

Every public claim is connected to a source already listed in the enriched dossier.
No current population or office-holder data is added here.
"""

from copy import deepcopy


EXTRA_SOURCES = [
    {"id": "src-saho-nobel-laureates", "category": "C", "title": "Nobel Prizes and South African Laureates", "publisher": "South African History Online", "year": 2011, "url": "https://sahistory.org.za/article/nobel-prizes-and-south-african-laureates"},
    {"id": "src-nobel-cormack", "category": "A", "title": "Allan M. Cormack – Facts", "publisher": "Nobel Prize Outreach", "year": 1979, "url": "https://www.nobelprize.org/prizes/medicine/1979/cormack/facts/"},
    {"id": "src-nobel-theiler", "category": "A", "title": "Max Theiler – Facts", "publisher": "Nobel Prize Outreach", "year": 1951, "url": "https://www.nobelprize.org/prizes/medicine/1951/theiler/facts/"},
    {"id": "src-nobel-brenner", "category": "A", "title": "Sydney Brenner – Facts", "publisher": "Nobel Prize Outreach", "year": 2002, "url": "https://www.nobelprize.org/prizes/medicine/2002/brenner/facts/"},
    {"id": "src-unesco-sa-world-heritage", "category": "C", "title": "South Africa — World Heritage properties", "publisher": "UNESCO World Heritage Centre", "year": 2026, "url": "https://whc.unesco.org/en/statesparties/za"},
    {"id": "src-dffe-biodiversity", "category": "A", "title": "South Africa's Biodiversity", "publisher": "Department of Forestry, Fisheries and the Environment", "year": 2026, "url": "https://biodiversityinvestment.environment.gov.za/south-africas-biodiversity"},
    {"id": "src-dffe-biomes", "category": "A", "title": "South Africa Environment Outlook — Chapter 6", "publisher": "Department of Forestry, Fisheries and the Environment", "year": None, "url": "https://www.dffe.gov.za/sites/default/files/reports/environmentoutlook_chapter6.pdf"},
]


DETAILED_FIGURES = [
    {
        "id": "figure-mandela",
        "name": "Nelson Rolihlahla Mandela",
        "period": "1918–2013",
        "category": "Vie politique et lutte anti-apartheid",
        "summary": "Avocat, dirigeant de l'ANC, prisonnier politique pendant vingt-sept ans puis premier président élu au suffrage universel de l'Afrique du Sud. Sa trajectoire doit être lue avec celle d'un mouvement collectif beaucoup plus large.",
        "highlights": ["procès de Rivonia", "emprisonnement à Robben Island et Pollsmoor", "négociations constitutionnelles", "présidence de 1994 à 1999"],
        "status": "ready",
        "sources": ["src-saho-mandela", "src-saho-nobel-laureates"],
    },
    {
        "id": "figure-sisulu",
        "name": "Albertina Nontsikelelo Sisulu",
        "period": "1918–2011",
        "category": "Organisation politique et sociale",
        "summary": "Infirmière, organisatrice communautaire et militante anti-apartheid, elle joua un rôle durable dans la Fédération des femmes sud-africaines et dans les réseaux de résistance.",
        "highlights": ["mobilisation des femmes", "United Democratic Front", "travail social et médical"],
        "status": "ready",
        "sources": ["src-saho-albertina-sisulu"],
    },
    {
        "id": "figure-biko",
        "name": "Steve Biko",
        "period": "1946–1977",
        "category": "Pensée politique",
        "summary": "Étudiant en médecine, organisateur et penseur du Black Consciousness Movement. Sa mort en détention devint un symbole international de la violence du régime d'apartheid.",
        "highlights": ["South African Students' Organisation", "Black Consciousness", "mort en détention"],
        "status": "ready",
        "sources": ["src-saho-steve-biko"],
    },
    {
        "id": "figure-maxeke",
        "name": "Charlotte Makgomo Maxeke",
        "period": "1871–1939",
        "category": "Éducation et droits des femmes",
        "summary": "Éducatrice, dirigeante religieuse et politique, elle fut l'une des premières femmes noires sud-africaines diplômées d'une université et fonda la Bantu Women's League.",
        "highlights": ["éducation", "Bantu Women's League", "mobilisation contre les pass laws"],
        "status": "ready",
        "sources": ["src-saho-charlotte-maxeke"],
    },
    {
        "id": "figure-shaka",
        "name": "Shaka kaSenzangakhona",
        "period": "vers 1787–1828",
        "category": "Pouvoir politique précolonial",
        "summary": "Souverain zoulou associé à la consolidation et à l'expansion du royaume au début du XIXe siècle. Les récits coloniaux ont souvent exagéré ou simplifié son rôle; les interprétations doivent rester contextualisées.",
        "highlights": ["consolidation du royaume zoulou", "réformes militaires attribuées", "historiographie controversée"],
        "status": "provisional",
        "sources": ["src-saho-shaka"],
    },
    {
        "id": "figure-baartman",
        "name": "Sara « Saartjie » Baartman",
        "period": "vers 1789–1815",
        "category": "Violence coloniale et mémoire",
        "summary": "Femme khoekhoe exhibée en Europe au début du XIXe siècle. Son histoire éclaire l'exploitation coloniale, le racisme scientifique et les enjeux contemporains de restitution et de dignité.",
        "highlights": ["exhibition en Europe", "racialisation scientifique", "rapatriement de ses restes"],
        "status": "ready",
        "sources": ["src-saho-baartman"],
    },
    {
        "id": "figure-tutu",
        "name": "Desmond Mpilo Tutu",
        "period": "1931–2021",
        "category": "Religion, droits humains et justice transitionnelle",
        "summary": "Archevêque anglican, opposant à l'apartheid et président de la Commission vérité et réconciliation. Son héritage fait aussi l'objet de débats sur les limites de la justice transitionnelle.",
        "highlights": ["mobilisation religieuse", "prix Nobel de la paix", "Commission vérité et réconciliation"],
        "status": "ready",
        "sources": ["src-tutu-foundation", "src-saho-nobel-laureates"],
    },
    {
        "id": "figure-makeba",
        "name": "Miriam Makeba",
        "period": "1932–2008",
        "category": "Musique, exil et diplomatie culturelle",
        "summary": "Chanteuse internationale, elle utilisa sa notoriété pour dénoncer l'apartheid. Son exil illustre la relation entre création artistique, migration forcée et mobilisation politique.",
        "highlights": ["carrière internationale", "exil", "prise de parole aux Nations Unies"],
        "status": "ready",
        "sources": ["src-saho-makeba"],
    },
]


SCIENCE_INNOVATION = [
    {
        "id": "science-hominin-research",
        "title": "Paléoanthropologie et archéologie humaine",
        "period": "XXe–XXIe siècles",
        "summary": "Les ensembles fossilifères de Sterkfontein, Swartkrans, Kromdraai, Makapansgat et Rising Star ont contribué de manière majeure à l'étude de l'évolution humaine. Les interprétations évoluent avec les nouvelles datations et découvertes.",
        "examples": ["Australopithecus africanus", "Paranthropus robustus", "Homo naledi", "technologies et comportements du Pléistocène"],
        "status": "ready",
        "sources": ["src-unesco-fossil-hominid-sites", "src-unesco-pleistocene-sites"],
    },
    {
        "id": "science-theiler",
        "title": "Max Theiler et la lutte contre la fièvre jaune",
        "period": "Première moitié du XXe siècle",
        "summary": "Né à Pretoria, Max Theiler reçut le prix Nobel de physiologie ou médecine en 1951 pour ses travaux sur la fièvre jaune et les moyens de la combattre.",
        "examples": ["virologie", "vaccination", "santé publique internationale"],
        "status": "ready",
        "sources": ["src-nobel-theiler"],
    },
    {
        "id": "science-cormack",
        "title": "Allan Cormack et la tomographie assistée par ordinateur",
        "period": "XXe siècle",
        "summary": "Né à Johannesburg, Allan M. Cormack développa des fondements mathématiques essentiels de la tomographie assistée par ordinateur et partagea le prix Nobel de physiologie ou médecine en 1979.",
        "examples": ["imagerie médicale", "mathématiques appliquées", "tomodensitométrie"],
        "status": "ready",
        "sources": ["src-nobel-cormack"],
    },
    {
        "id": "science-brenner",
        "title": "Sydney Brenner et la biologie moléculaire",
        "period": "XXe–XXIe siècles",
        "summary": "Né à Germiston, Sydney Brenner contribua à la génétique moléculaire et au développement de Caenorhabditis elegans comme organisme modèle; il reçut le prix Nobel de physiologie ou médecine en 2002.",
        "examples": ["code génétique", "biologie du développement", "organismes modèles"],
        "status": "ready",
        "sources": ["src-nobel-brenner"],
    },
    {
        "id": "science-knowledge-systems",
        "title": "Savoirs écologiques, médicinaux et techniques autochtones",
        "period": "Longue durée",
        "summary": "Les savoirs liés aux plantes, à l'eau, au pastoralisme, à la chasse, à la métallurgie et aux paysages sont portés par des communautés diverses. Ils ne doivent pas être réduits à du folklore ni détachés de leurs détenteurs.",
        "examples": ["connaissances botaniques", "gestion du feu", "métallurgie du fer", "lecture des paysages"],
        "status": "provisional",
        "sources": ["src-saho-san", "src-saho-khoisan", "src-sa-yearbook-arts"],
    },
]


ENVIRONMENT = {
    "editorial_note": "La biodiversité n'est pas un décor séparé de l'histoire humaine. Les paysages ont été transformés par le climat, les usages du sol, les économies minières, l'agriculture, l'urbanisation et les politiques de conservation.",
    "biomes": [
        {"name": "Savane", "note": "Étendue dans le nord et le nord-est, avec des variations importantes de végétation et de faune."},
        {"name": "Prairie / Grassland", "note": "Biome majeur du haut plateau intérieur, fortement transformé par l'agriculture, l'urbanisation et l'exploitation minière."},
        {"name": "Fynbos", "note": "Végétation emblématique de la région floristique du Cap, exceptionnellement riche en espèces végétales."},
        {"name": "Nama-Karoo", "note": "Milieux semi-arides de l'intérieur occidental, façonnés notamment par les régimes de pluie et le pâturage."},
        {"name": "Succulent Karoo", "note": "Zone aride reconnue pour une diversité remarquable de plantes succulentes."},
        {"name": "Forêt", "note": "Petites superficies dispersées, notamment le long de l'escarpement et de la côte méridionale et orientale."},
        {"name": "Fourrés / Thicket", "note": "Mosaïques végétales denses surtout présentes dans le sud-est."},
        {"name": "Désert", "note": "Présence limitée dans l'extrême nord-ouest et en continuité avec les espaces arides régionaux."},
        {"name": "Azonal", "note": "Unités liées à des conditions locales particulières comme les cours d'eau, zones humides, dunes ou sols salins."},
    ],
    "landscapes": [
        {"name": "Région floristique du Cap", "kind": "biodiversité", "note": "L'une des régions végétales les plus riches au monde, protégée par un bien sériel du patrimoine mondial.", "status": "ready", "sources": ["src-unesco-sa-world-heritage"]},
        {"name": "iSimangaliso et Maputo", "kind": "zones humides et littoral", "note": "Système de zones humides, lacs, dunes, estuaires et milieux marins transfrontaliers.", "status": "ready", "sources": ["src-unesco-sa-world-heritage"]},
        {"name": "Maloti-Drakensberg", "kind": "montagnes et patrimoine mixte", "note": "Paysage montagneux partagé avec le Lesotho, important pour la biodiversité, les ressources en eau et l'art rupestre san.", "status": "ready", "sources": ["src-unesco-sa-world-heritage"]},
        {"name": "Barberton Makhonjwa", "kind": "géologie", "note": "Paysages conservant des roches très anciennes qui documentent les débuts de l'histoire de la Terre.", "status": "ready", "sources": ["src-unesco-sa-world-heritage"]},
        {"name": "Dôme de Vredefort", "kind": "géologie d'impact", "note": "Structure liée à l'un des plus grands impacts météoritiques connus sur Terre.", "status": "ready", "sources": ["src-unesco-sa-world-heritage"]},
    ],
    "pressures": [
        "transformation des habitats par l'agriculture et les villes",
        "exploitation minière et pollution",
        "espèces exotiques envahissantes",
        "pression sur les ressources en eau",
        "changement climatique et événements extrêmes",
        "inégalités d'accès aux espaces protégés et aux bénéfices de la conservation",
    ],
    "sources": ["src-dffe-biodiversity", "src-dffe-biomes", "src-unesco-sa-world-heritage"],
}


def enrich_south_africa_figures_science_environment(base_dossier):
    dossier = deepcopy(base_dossier)
    existing_source_ids = {source["id"] for source in dossier.get("sources", [])}
    dossier.setdefault("sources", []).extend(
        source for source in EXTRA_SOURCES if source["id"] not in existing_source_ids
    )
    dossier["figures"] = DETAILED_FIGURES
    dossier["science_innovation"] = SCIENCE_INNOVATION
    dossier["environment"] = ENVIRONMENT
    dossier["last_reviewed"] = "2026-07-31"
    return dossier
