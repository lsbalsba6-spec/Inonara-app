"""Part 7 enrichment: South African culture and heritage.

The module keeps cultural traditions attached to communities and periods rather
than presenting South Africa as one homogeneous culture.  Source identifiers
are added to the country dossier and every public claim carries at least one
reference.
"""

from copy import deepcopy


CULTURE_SOURCES = [
    {
        "id": "src-sahra-living-heritage",
        "category": "A",
        "title": "South Africa's Living Heritage: Celebrating SA's Treasures",
        "publisher": "South African Heritage Resources Agency",
        "year": 2020,
        "url": "https://www.sahra.org.za/Wordpress/wp-content/uploads/2020/01/South-Africas-Living-Celebrating-SAs-TreasuresHeritage.pdf",
    },
    {
        "id": "src-sahra-national-sites",
        "category": "A",
        "title": "South Africa's National Heritage Sites",
        "publisher": "South African Heritage Resources Agency",
        "year": 2025,
        "url": "https://www.sahra.org.za/national-sites/",
    },
    {
        "id": "src-sahra-heritage-protection",
        "category": "A",
        "title": "Heritage Protection",
        "publisher": "South African Heritage Resources Agency",
        "year": 2025,
        "url": "https://www.sahra.org.za/heritage-protection/",
    },
    {
        "id": "src-dsac-theatre-dance-policy",
        "category": "A",
        "title": "National Theatre and Dance Policy",
        "publisher": "Department of Sport, Arts and Culture",
        "year": 2022,
        "url": "https://www.dsac.gov.za/node/517",
    },
    {
        "id": "src-unesco-south-africa-2026",
        "category": "C",
        "title": "South Africa — Properties inscribed on the World Heritage List",
        "publisher": "UNESCO World Heritage Centre",
        "year": 2026,
        "url": "https://whc.unesco.org/en/statesparties/za",
    },
    {
        "id": "src-sa-tourism-vibrant-culture",
        "category": "D",
        "title": "Vibrant culture and culinary traditions",
        "publisher": "South African Tourism",
        "year": 2026,
        "url": "https://www.southafrica.net/in/en/travel/category/things-to-do/vibrant-culture",
    },
]


CULTURE_SECTIONS = [
    {
        "id": "za-culture-living-heritage",
        "topic": "Patrimoine vivant et transmission",
        "summary": "Le patrimoine vivant comprend les traditions orales, les performances, les rituels, les savoir-faire, les mémoires populaires et les systèmes de connaissances transmis entre générations. Il n'est pas figé : les communautés qui le portent le reproduisent, l'adaptent et le renouvellent.",
        "examples": [
            "récits oraux et poésie de louange",
            "rites de passage et pratiques cérémonielles",
            "savoirs écologiques, agricoles et pastoraux",
            "artisanat, techniques et pratiques culinaires",
        ],
        "caution": "Une pratique ne doit pas être attribuée à toute la population sud-africaine lorsqu'elle appartient à une communauté ou à une région particulière.",
        "status": "ready",
        "sources": ["src-sahra-living-heritage"],
    },
    {
        "id": "za-culture-music",
        "topic": "Musiques et scènes sonores",
        "summary": "Le paysage musical sud-africain résulte de traditions vocales et instrumentales anciennes, de musiques religieuses, de circulations urbaines et minières, de l'industrie du disque et de créations diasporiques. Le jazz sud-africain, le marabi, le mbaqanga, l'isicathamiya, le maskandi, le gospel, le kwaito, le gqom et l'amapiano appartiennent à des contextes historiques différents.",
        "examples": [
            "isicathamiya et traditions chorales masculines",
            "marabi, jazz sud-africain et mbaqanga",
            "maskandi et traditions de performance zouloues",
            "kwaito, gqom et amapiano dans les scènes urbaines contemporaines",
        ],
        "caution": "Les genres ne correspondent pas à des identités ethniques fermées et évoluent par échanges, innovations et appropriations multiples.",
        "status": "provisional",
        "sources": ["src-sa-yearbook-arts", "src-dsac-theatre-dance-policy"],
    },
    {
        "id": "za-culture-dance-performance",
        "topic": "Danse, théâtre et performance",
        "summary": "Les performances relient cérémonies communautaires, théâtre, danse sociale, protestation politique et création contemporaine. Les pratiques changent selon les langues, les régions, les institutions et les contextes urbains ou ruraux.",
        "examples": [
            "danses cérémonielles et compétitions communautaires",
            "théâtre de protestation et création pendant l'apartheid",
            "danse contemporaine et formes hybrides",
            "festivals, compagnies publiques et scènes indépendantes",
        ],
        "caution": "Les termes de danse parfois utilisés dans le tourisme doivent être replacés dans leur communauté, leur fonction et leur époque.",
        "status": "ready",
        "sources": ["src-dsac-theatre-dance-policy", "src-sahra-living-heritage"],
    },
    {
        "id": "za-culture-visual-arts",
        "topic": "Arts visuels, artisanat et design",
        "summary": "L'art rupestre san, les peintures murales ndebele, le perlage, la vannerie, la céramique, la sculpture, la photographie et les arts contemporains témoignent de traditions distinctes et de transformations sociales profondes.",
        "examples": [
            "art rupestre et paysages rituels",
            "peintures murales et formes architecturales ndebele",
            "perlage, textiles, vannerie et céramique",
            "photographie documentaire et arts contemporains",
        ],
        "caution": "Un motif ou un objet ne doit pas être présenté comme décoratif seulement : son usage, son propriétaire, son genre, son âge et son contexte peuvent modifier sa signification.",
        "status": "provisional",
        "sources": ["src-sahra-living-heritage", "src-sahra-national-sites"],
    },
    {
        "id": "za-culture-literature-oral",
        "topic": "Oralité, littérature et langues de création",
        "summary": "La création littéraire circule entre traditions orales, poésie de louange, récits communautaires, presse, théâtre et littérature écrite dans les langues africaines, en afrikaans et en anglais. L'histoire de l'édition et de l'école a fortement influencé quelles voix ont été conservées ou marginalisées.",
        "examples": [
            "izibongo et autres formes de poésie de louange",
            "récits san et khoekhoe recueillis dans des contextes coloniaux à critiquer",
            "littératures en isiXhosa, isiZulu, Sesotho, Setswana et autres langues",
            "écritures afrikaans, anglophones et multilingues",
        ],
        "caution": "Les collectes coloniales peuvent altérer, traduire ou décontextualiser les récits ; l'identité des narrateurs et les conditions de collecte doivent être indiquées.",
        "status": "provisional",
        "sources": ["src-sahra-living-heritage", "src-sa-yearbook-arts"],
    },
    {
        "id": "za-culture-foodways",
        "topic": "Cuisines et cultures alimentaires",
        "summary": "Les cuisines sud-africaines reflètent des histoires pastorales et agricoles, les échanges régionaux, l'esclavage au Cap, les migrations indiennes, les colonisations européennes, l'urbanisation et la créativité contemporaine. Il n'existe pas une cuisine nationale unique.",
        "examples": [
            "umngqusho, céréales, légumineuses et plats régionaux",
            "braai et shisa nyama dans des contextes sociaux variés",
            "cuisine du Cap façonnée par l'esclavage et l'océan Indien",
            "currys de Durban, bunny chow et histoires sud-africaines indiennes",
        ],
        "caution": "Les plats changent selon les foyers et les régions ; leur origine ne doit pas être résumée à une seule communauté lorsque les sources montrent des circulations multiples.",
        "status": "provisional",
        "sources": ["src-sa-tourism-vibrant-culture", "src-sahra-living-heritage"],
    },
    {
        "id": "za-culture-architecture",
        "topic": "Architecture et paysages habités",
        "summary": "Les formes bâties vont des établissements archéologiques et architectures vernaculaires aux bâtiments coloniaux, quartiers miniers, townships, modernismes et projets post-apartheid. L'architecture doit être étudiée comme une histoire du pouvoir, de la terre, du climat et des usages sociaux.",
        "examples": [
            "établissements de pierres de Mapungubwe et Kaditshwene",
            "habitats ruraux et architectures communautaires",
            "architecture du Cap, bâtiments coloniaux et missions",
            "urbanisme ségrégationniste, townships et transformations contemporaines",
        ],
        "caution": "Les bâtiments coloniaux doivent être présentés avec les conditions de travail, de dépossession et de pouvoir qui ont permis leur construction.",
        "status": "ready",
        "sources": ["src-sahra-national-sites", "src-sahra-heritage-protection"],
    },
]


ORAL_TRADITIONS = [
    {
        "id": "za-oral-san",
        "title": "Récits, cosmologies et mémoires san",
        "summary": "Les traditions san sont diverses et attachées à des communautés, langues et paysages particuliers. Elles peuvent éclairer les relations au territoire, aux animaux, aux ancêtres et aux pratiques de guérison, mais les collectes anciennes doivent être lues avec leurs biais coloniaux.",
        "status": "provisional",
        "sources": ["src-sahra-living-heritage", "src-unesco-khomani"],
    },
    {
        "id": "za-oral-dynastic",
        "title": "Traditions dynastiques et mémoires politiques",
        "summary": "Les généalogies, chants de louange et récits dynastiques zoulous, xhosa, sotho-tswana, venda, tsonga, ndebele et swazi conservent des mémoires politiques. Elles sont des sources historiques à confronter aux archives, à l'archéologie et aux contextes de transmission.",
        "status": "provisional",
        "sources": ["src-sahra-living-heritage"],
    },
    {
        "id": "za-oral-liberation",
        "title": "Mémoire populaire, lutte et réconciliation",
        "summary": "Chants, témoignages, commémorations, funérailles politiques et récits familiaux ont transmis l'expérience de la ségrégation, de l'apartheid, de l'exil et des résistances. Ces mémoires peuvent diverger sans qu'une seule version doive effacer les autres.",
        "status": "ready",
        "sources": ["src-sahra-living-heritage", "src-unesco-south-africa-2026"],
    },
]


UNESCO_HERITAGE = [
    ("Fossil Hominid Sites of South Africa", "culturel", "Sites fossilifères majeurs pour l'histoire de l'évolution humaine."),
    ("Human Rights, Liberation and Reconciliation: Nelson Mandela Legacy Sites", "culturel", "Ensemble de lieux associés aux droits humains, à la libération et à la réconciliation."),
    ("Mapungubwe Cultural Landscape", "culturel", "Paysage d'un centre politique et commercial majeur de l'Afrique australe médiévale."),
    ("Richtersveld Cultural and Botanical Landscape", "culturel", "Paysage culturel lié notamment au pastoralisme nama et à des savoirs environnementaux vivants."),
    ("Robben Island", "culturel", "Lieu aux histoires multiples, connu notamment comme prison politique de l'apartheid."),
    ("The Emergence of Modern Human Behaviour: The Pleistocene Occupation Sites of South Africa", "culturel", "Sites documentant des comportements techniques et symboliques du Pléistocène."),
    ("ǂKhomani Cultural Landscape", "culturel", "Paysage culturel associé aux mémoires, pratiques et savoirs des ǂKhomani San."),
    ("Barberton Makhonjwa Mountains", "naturel", "Archives géologiques parmi les plus anciennes et les mieux préservées de la Terre."),
    ("Cape Floral Region Protected Areas", "naturel", "Région de biodiversité végétale exceptionnelle, notamment du biome fynbos."),
    ("iSimangaliso Wetland Park – Maputo National Park", "naturel", "Système transfrontalier de zones humides, littoraux et écosystèmes marins et terrestres."),
    ("Vredefort Dome", "naturel", "Structure d'impact météoritique d'une importance géologique mondiale."),
    ("Maloti-Drakensberg Park", "mixte", "Paysage naturel transfrontalier et important corpus d'art rupestre san."),
]

HERITAGE_SITES = [
    {
        "id": f"za-wh-{index:02d}",
        "name": name,
        "kind": kind,
        "description": description,
        "status": "ready",
        "sources": ["src-unesco-south-africa-2026"],
    }
    for index, (name, kind, description) in enumerate(UNESCO_HERITAGE, 1)
]

NATIONAL_HERITAGE_HIGHLIGHTS = [
    {
        "id": "za-nhs-castle-good-hope",
        "name": "Castle of Good Hope",
        "kind": "patrimoine bâti colonial",
        "description": "Forteresse coloniale néerlandaise encore utilisée. Sa présentation doit inclure le système colonial, l'esclavage et la dépossession associés au Cap.",
        "status": "ready",
        "sources": ["src-sahra-national-sites"],
    },
    {
        "id": "za-nhs-kaditshwene",
        "name": "Kaditshwene Cultural Landscape",
        "kind": "paysage historique tswana",
        "description": "Important établissement bahurutshe du début du XIXe siècle, avec vestiges de l'habitat et de la métallurgie.",
        "status": "ready",
        "sources": ["src-sahra-national-sites"],
    },
    {
        "id": "za-nhs-lake-fundudzi",
        "name": "Lake Fundudzi",
        "kind": "paysage sacré et patrimoine vivant",
        "description": "Site étroitement associé au patrimoine vivant vhaVenda et protégé aussi par la continuité de sa valeur sacrée.",
        "status": "ready",
        "sources": ["src-sahra-national-sites", "src-sahra-living-heritage"],
    },
    {
        "id": "za-nhs-bo-kaap",
        "name": "Bo-Kaap",
        "kind": "paysage urbain et patrimoine communautaire",
        "description": "Quartier du Cap dont le patrimoine architectural, religieux et communautaire est porté par des générations de familles.",
        "status": "ready",
        "sources": ["src-sahra-national-sites"],
    },
    {
        "id": "za-nhs-sharpeville",
        "name": "Sharpeville Massacre Site",
        "kind": "mémoire de la lutte contre l'apartheid",
        "description": "Lieu de mémoire du massacre du 21 mars 1960 et de la lutte contre les pass laws.",
        "status": "ready",
        "sources": ["src-sahra-national-sites"],
    },
    {
        "id": "za-nhs-freedom-park",
        "name": "Freedom Park",
        "kind": "mémorial national",
        "description": "Espace de mémoire consacré aux conflits, aux sacrifices, à la réconciliation et à la construction nationale.",
        "status": "ready",
        "sources": ["src-sahra-national-sites"],
    },
]


def _merge_sources(existing, additions):
    merged = {source["id"]: deepcopy(source) for source in existing}
    for source in additions:
        merged[source["id"]] = deepcopy(source)
    return list(merged.values())


def enrich_south_africa_culture_heritage(dossier):
    """Return a copied dossier enriched with detailed culture and heritage."""
    result = deepcopy(dossier)
    result["culture"] = deepcopy(CULTURE_SECTIONS)
    result["oral_traditions_and_legends"] = deepcopy(ORAL_TRADITIONS)
    result["heritage"] = deepcopy(HERITAGE_SITES)
    result["national_heritage_highlights"] = deepcopy(NATIONAL_HERITAGE_HIGHLIGHTS)
    result["culture_editorial_note"] = (
        "La culture sud-africaine n'est pas un bloc unique. Chaque pratique est "
        "présentée avec son contexte communautaire, régional et historique, et "
        "les traditions vivantes ne sont pas figées comme des objets du passé."
    )
    result["heritage_editorial_note"] = (
        "Le patrimoine comprend des sites archéologiques, naturels, bâtis, "
        "mémoriels et vivants. Le classement patrimonial ne supprime ni les "
        "conflits de mémoire ni les droits des communautés qui y sont liées."
    )
    result["sources"] = _merge_sources(result.get("sources", []), CULTURE_SOURCES)
    return result
