"""Cross-menu South Africa content for AfroAtlas.

This module does not duplicate the country dossier. It publishes selected,
sourceable South African entries into the global discovery menus so users can
reach the same history through Atlas, Journey, Civilizations, Figures,
Timeline, People, Culture and Stories.
"""

SA_CIVILIZATIONS = [
    {
        "id": "mapungubwe",
        "name": "Royaume de Mapungubwe",
        "region": "Southern Africa",
        "coords": [-22.194, 29.245],
        "era_start": 1075,
        "era_end": 1220,
        "summary": "Centre politique et commercial de la vallée du Limpopo, Mapungubwe reliait l'intérieur de l'Afrique australe aux réseaux de l'océan Indien. Son paysage culturel est aujourd'hui inscrit au patrimoine mondial de l'UNESCO.",
        "image_url": "https://images.unsplash.com/photo-1523805009345-7448845a9e53?crop=entropy&cs=srgb&fm=jpg&w=1600&q=80",
        "modern_locations": ["Afrique du Sud", "Limpopo"],
        "key_figures": [],
        "timeline": [
            {"year": 1075, "event": "Développement d'un centre politique majeur sur la colline de Mapungubwe."},
            {"year": 1220, "event": "Déclin du centre; les réseaux régionaux se réorganisent vers d'autres pôles."},
        ],
        "sources": ["UNESCO World Heritage Centre — Mapungubwe Cultural Landscape", "South African History Online — Mapungubwe"],
    },
    {
        "id": "zulu-kingdom",
        "name": "Royaume zoulou",
        "region": "Southern Africa",
        "coords": [-28.53, 31.90],
        "era_start": 1816,
        "era_end": 1897,
        "summary": "Formation politique nguni consolidée au XIXe siècle dans l'actuel KwaZulu-Natal. Son histoire comprend l'expansion sous Shaka, des conflits régionaux, la guerre anglo-zouloue et l'incorporation progressive dans l'ordre colonial.",
        "image_url": "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?crop=entropy&cs=srgb&fm=jpg&w=1600&q=80",
        "modern_locations": ["Afrique du Sud", "KwaZulu-Natal"],
        "key_figures": [{"name": "Shaka kaSenzangakhona", "role": "Souverain zoulou, r. 1816–1828"}],
        "timeline": [
            {"year": 1816, "event": "Shaka devient souverain et consolide le royaume."},
            {"year": 1879, "event": "Guerre anglo-zouloue; victoire zouloue à Isandlwana puis défaite du royaume."},
            {"year": 1897, "event": "Le Zululand est intégré à la colonie du Natal."},
        ],
        "sources": ["South African History Online — Shaka Zulu", "Encyclopaedia Britannica — Zulu"],
    },
]

SA_FIGURES = [
    {
        "id": "albertina-sisulu", "name": "Albertina Sisulu", "category": "civil_rights",
        "era": "1918–2011", "region": "South Africa", "lifespan": "1918–2011",
        "summary": "Infirmière, organisatrice communautaire et militante anti-apartheid, engagée dans la Fédération des femmes sud-africaines et le United Democratic Front.",
        "story": "Son militantisme s'est construit dans les réseaux familiaux, syndicaux, religieux et communautaires qui ont soutenu la résistance quotidienne à l'apartheid.",
        "legacy": "Figure majeure de l'organisation politique des femmes et de la mobilisation civique sud-africaine.",
        "image_url": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80",
        "sources": ["South African History Online — Albertina Nontsikelelo Sisulu"],
    },
    {
        "id": "charlotte-maxeke", "name": "Charlotte Maxeke", "category": "civil_rights",
        "era": "1871–1939", "region": "South Africa", "lifespan": "1871–1939",
        "summary": "Éducatrice, dirigeante religieuse et politique, pionnière de l'enseignement supérieur féminin noir et fondatrice de la Bantu Women's League.",
        "story": "Elle relia l'éducation, l'organisation religieuse et la lutte contre les pass laws à une époque où les femmes noires étaient largement exclues des institutions politiques.",
        "legacy": "Une référence fondatrice de l'histoire politique et féministe sud-africaine.",
        "image_url": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80",
        "sources": ["South African History Online — Charlotte Maxeke"],
    },
    {
        "id": "desmond-tutu", "name": "Desmond Tutu", "category": "civil_rights",
        "era": "1931–2021", "region": "South Africa", "lifespan": "1931–2021",
        "summary": "Archevêque anglican, opposant à l'apartheid, prix Nobel de la paix et président de la Commission vérité et réconciliation.",
        "story": "Tutu mobilisa les institutions religieuses contre l'apartheid et défendit une transition démocratique non raciale, tout en portant les contradictions de la justice transitionnelle.",
        "legacy": "Une figure mondiale des droits humains et du débat sur vérité, pardon, réparation et responsabilité.",
        "image_url": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80",
        "sources": ["Desmond & Leah Tutu Legacy Foundation", "South African History Online — Nobel laureates"],
    },
    {
        "id": "saartjie-baartman", "name": "Sara « Saartjie » Baartman", "category": "intellectuals",
        "era": "c. 1789–1815", "region": "South Africa / Europe", "lifespan": "c. 1789–1815",
        "summary": "Femme khoekhoe exhibée en Europe; son histoire éclaire l'exploitation coloniale, la racialisation scientifique et les politiques contemporaines de restitution.",
        "story": "Déplacée vers l'Europe et présentée comme spectacle, elle fut aussi étudiée après sa mort dans un cadre pseudo-scientifique profondément raciste.",
        "legacy": "Le rapatriement de ses restes en Afrique du Sud en 2002 est devenu un repère des débats sur dignité, mémoire et restitution.",
        "image_url": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80",
        "sources": ["South African History Online — Sara Saartjie Baartman"],
    },
]

SA_FIGURE_CIVS = {
    "shaka": "zulu-kingdom",
    "mandela": "zulu-kingdom",
    "biko": "zulu-kingdom",
    "miriam-makeba": "zulu-kingdom",
}

SA_FIGURE_WIKIPEDIA = {
    "albertina-sisulu": "Albertina Sisulu",
    "charlotte-maxeke": "Charlotte Maxeke",
    "desmond-tutu": "Desmond Tutu",
    "saartjie-baartman": "Sarah Baartman",
}

SA_PEOPLE = [
    {
        "id": "khoekhoe", "name": "Khoekhoe", "homeland": "Afrique australe, notamment l'ouest de l'Afrique du Sud et la Namibie",
        "coords": [-30.0, 18.5], "population": "Communautés contemporaines dispersées; éviter les chiffres simplificateurs",
        "language_family": "Khoe-Kwadi", "summary": "Ensemble de communautés pastorales autochtones d'Afrique australe, historiquement désignées par des exonymes coloniaux aujourd'hui contestés.",
        "language": "Langues khoe, dont le nama; plusieurs variétés ont subi un fort recul.",
        "religion": "Traditions diverses, christianisation et recompositions contemporaines.",
        "culture": "Pastoralisme, savoirs environnementaux, traditions orales et héritages matériels régionaux.",
        "diaspora": "Déplacements coloniaux, travail forcé, expositions humaines et dispersions régionales; à traiter sans fabriquer une diaspora homogène.",
        "image_url": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80",
        "sources": ["South African History Online — Khoisan", "UNESCO — patrimoine culturel d'Afrique australe"],
    },
    {
        "id": "san-southern-africa", "name": "San", "homeland": "Afrique australe",
        "coords": [-22.0, 22.0], "population": "Communautés réparties entre plusieurs États d'Afrique australe",
        "language_family": "Plusieurs familles de langues à clics; le terme San ne désigne pas une langue unique",
        "summary": "Diverses communautés autochtones de chasseurs-cueilleurs et d'anciens chasseurs-cueilleurs, porteuses de traditions, langues et histoires distinctes.",
        "language": "Langues appartenant notamment aux familles Kx'a, Tuu et Khoe-Kwadi.",
        "religion": "Traditions rituelles et cosmologies diverses; transformations sous l'effet des missions, États et économies régionales.",
        "culture": "Art rupestre, connaissance fine des paysages, traditions de guérison et de narration.",
        "diaspora": "Déplacements régionaux et dépossession territoriale plutôt qu'une diaspora unique.",
        "image_url": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80",
        "sources": ["South African History Online — San", "UNESCO — Maloti-Drakensberg Park"],
    },
    {
        "id": "xhosa", "name": "Xhosa", "homeland": "Cap-Oriental et régions voisines d'Afrique du Sud",
        "coords": [-32.2, 27.5], "population": "Importante population sud-africaine; les chiffres évoluent avec les recensements",
        "language_family": "Niger-Congo · Bantu · Nguni", "summary": "Ensemble de communautés nguni aux histoires politiques diverses, marquées par des royaumes, des guerres frontalières, la colonisation et l'urbanisation.",
        "language": "isiXhosa, langue officielle d'Afrique du Sud.", "religion": "Christianismes, traditions ancestrales et pratiques combinées.",
        "culture": "Poésie de louange, initiation, traditions orales, musique chorale et littérature moderne.",
        "diaspora": "Mobilités internes et internationales, notamment liées au travail, à l'exil politique et aux études.",
        "image_url": "https://images.unsplash.com/photo-1523805009345-7448845a9e53?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80",
        "sources": ["South African History Online — Xhosa", "Constitution of South Africa — official languages"],
    },
    {
        "id": "zulu", "name": "Zulu", "homeland": "KwaZulu-Natal et régions voisines",
        "coords": [-28.5, 31.0], "population": "L'un des plus grands groupes linguistiques d'Afrique du Sud",
        "language_family": "Niger-Congo · Bantu · Nguni", "summary": "Communautés nguni dont l'histoire comprend la formation du royaume zoulou, la colonisation, le travail migrant et les transformations urbaines contemporaines.",
        "language": "isiZulu, langue officielle d'Afrique du Sud.", "religion": "Christianismes, traditions ancestrales et pratiques combinées.",
        "culture": "Poésie de louange, perlage, musique vocale, danse, mémoire royale et formes contemporaines.",
        "diaspora": "Mobilités internes et régionales; éviter de réduire l'ensemble à une diaspora unique.",
        "image_url": "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80",
        "sources": ["South African History Online — Zulu", "Encyclopaedia Britannica — Zulu"],
    },
]

SA_CULTURE = [
    {"id": "amapiano", "category": "music", "region": "South Africa", "title": "Amapiano", "blurb": "Genre électronique né dans les townships sud-africains au cours des années 2010, reconnaissable à ses lignes de basse log-drum, ses textures de piano et ses circulations numériques mondiales."},
    {"id": "isicathamiya", "category": "music", "region": "South Africa", "title": "Isicathamiya", "blurb": "Tradition chorale masculine développée notamment dans les communautés de travailleurs migrants zoulous; elle associe chant harmonisé, compétition et chorégraphie mesurée."},
    {"id": "south-african-jazz", "category": "music", "region": "South Africa", "title": "Jazz sud-africain", "blurb": "Courants issus du marabi, du kwela et du jazz moderne, portés par des artistes locaux et par des musiciens en exil durant l'apartheid."},
    {"id": "izibongo", "category": "language", "region": "South Africa", "title": "Izibongo — poésie de louange", "blurb": "Forme orale de célébration, critique et mémoire sociale pratiquée dans plusieurs sociétés nguni, adaptée aux contextes royaux, politiques et contemporains."},
    {"id": "cape-malay-cuisine", "category": "food", "region": "Cape Town, South Africa", "title": "Cuisine Cape Malay", "blurb": "Cuisine du Cap façonnée par les circulations de personnes réduites en esclavage, exilées ou déplacées depuis l'océan Indien, combinant épices, techniques locales et héritages coloniaux."},
    {"id": "braai", "category": "food", "region": "South Africa", "title": "Braai", "blurb": "Pratique sociale de cuisson au feu partagée sous des formes diverses; elle ne doit pas être présentée comme homogène ni détachée des différences régionales et sociales."},
    {"id": "ndebele-wall-art", "category": "clothing", "region": "South Africa", "title": "Arts visuels ndebele", "blurb": "Peinture architecturale géométrique et arts du perlage associés à des communautés ndebele, aujourd'hui présents dans l'art, la mode et le design."},
    {"id": "ubuntu-concept", "category": "proverbs", "region": "Southern Africa", "title": "Ubuntu", "blurb": "Famille de notions morales exprimant la personne par ses relations aux autres. Le terme possède plusieurs usages linguistiques, philosophiques et politiques et ne doit pas être réduit à un slogan."},
]

SA_STORIES = [
    {
        "id": "mapungubwe-indian-ocean", "title": "Mapungubwe et les réseaux de l'océan Indien", "civilization_id": "mapungubwe",
        "era": "c. 1075–1220", "summary": "Comment un centre politique de la vallée du Limpopo relia l'Afrique australe aux circuits commerciaux de l'océan Indien.",
        "chapters": [
            {"heading": "Un paysage politique", "body": "Mapungubwe s'est développé dans une région où agriculture, élevage, artisanat et contrôle des échanges soutenaient une hiérarchie politique visible dans l'organisation du site."},
            {"heading": "Or, ivoire et commerce", "body": "Les objets importés et les matières exportées montrent des liens avec les ports swahilis et, au-delà, avec l'océan Indien. Ces échanges ne signifient pas une dépendance simple: ils furent intégrés à des stratégies locales."},
            {"heading": "Mémoire et archéologie", "body": "Longtemps marginalisé dans les récits officiels de l'Afrique du Sud, Mapungubwe est devenu une référence majeure de l'histoire précoloniale et du patrimoine national."},
        ],
        "sources": ["UNESCO World Heritage Centre — Mapungubwe Cultural Landscape", "South African History Online — Mapungubwe"],
    },
    {
        "id": "soweto-1976", "title": "Soweto, 16 juin 1976", "civilization_id": None,
        "era": "1976", "summary": "Le soulèvement scolaire de Soweto et son rôle dans l'intensification de la lutte contre l'apartheid.",
        "chapters": [
            {"heading": "Une politique scolaire imposée", "body": "Des élèves protestèrent contre l'imposition de l'afrikaans comme langue d'enseignement dans certaines matières, dans un système éducatif déjà structuré par l'inégalité raciale."},
            {"heading": "Répression et diffusion", "body": "La police ouvrit le feu. Les mobilisations et la répression se propagèrent à d'autres zones urbaines, transformant 1976 en rupture politique majeure."},
            {"heading": "Mémoire", "body": "Le 16 juin est commémoré comme Youth Day en Afrique du Sud et comme repère continental de la mobilisation de la jeunesse."},
        ],
        "sources": ["South African History Online — June 16 Soweto Youth Uprising", "Hector Pieterson Museum"],
    },
    {
        "id": "apartheid-to-democracy", "title": "De l'apartheid à la démocratie constitutionnelle", "civilization_id": None,
        "era": "1948–1996", "summary": "Une transition façonnée par des décennies de résistance, de répression, de négociation et de mobilisation sociale.",
        "chapters": [
            {"heading": "Institutionnalisation", "body": "À partir de 1948, le gouvernement du Parti national renforça un système de classification raciale, de ségrégation territoriale, de contrôle des mobilités et de dépossession."},
            {"heading": "Résistances", "body": "Les résistances prirent des formes multiples: campagnes civiques, syndicats, mouvements étudiants, lutte armée, culture, réseaux religieux, mobilisation internationale et organisation communautaire."},
            {"heading": "Négociations", "body": "La libération de prisonniers politiques, la légalisation d'organisations interdites et des négociations conflictuelles conduisirent aux élections de 1994."},
            {"heading": "Nouvel ordre constitutionnel", "body": "La Constitution adoptée en 1996 fonda une démocratie non raciale et une large protection des droits, sans résoudre automatiquement les inégalités héritées."},
        ],
        "sources": ["Constitution of the Republic of South Africa", "South African History Online — Apartheid and transition"],
    },
]

SA_PLACES = [
    {"id": "mapungubwe-site", "name": "Paysage culturel de Mapungubwe", "type": "site", "coords": [-22.194, 29.245], "era": "c. 1075–1220", "blurb": "Site archéologique majeur de la vallée du Limpopo et patrimoine mondial de l'UNESCO."},
    {"id": "cradle-humankind", "name": "Berceau de l'humanité", "type": "site", "coords": [-25.97, 27.66], "era": "Plio-Pléistocène", "blurb": "Ensemble de sites fossilifères autour de Sterkfontein, Swartkrans et Kromdraai, central pour l'étude de l'évolution humaine."},
    {"id": "robben-island", "name": "Robben Island", "type": "site", "coords": [-33.8067, 18.3662], "era": "XVIIe–XXe siècles", "blurb": "Île utilisée pour l'enfermement, l'exil et la ségrégation; devenue un lieu de mémoire de la lutte contre l'apartheid."},
    {"id": "soweto", "name": "Soweto", "type": "city", "coords": [-26.2678, 27.8585], "era": "XXe siècle–présent", "blurb": "Grand ensemble urbain lié à l'histoire du travail migrant, de l'apartheid, des résistances et des cultures populaires sud-africaines."},
    {"id": "district-six", "name": "District Six", "type": "neighborhood", "coords": [-33.9300, 18.4240], "era": "XIXe–XXIe siècles", "blurb": "Quartier du Cap marqué par les expulsions forcées de l'apartheid et par un long travail de mémoire et de restitution."},
    {"id": "isandlwana", "name": "Isandlwana", "type": "site", "coords": [-28.3583, 30.6528], "era": "1879", "blurb": "Lieu d'une victoire zouloue majeure contre l'armée britannique pendant la guerre anglo-zouloue."},
]

SA_JOURNEY_STOPS = [
    {
        "id": "sa-mapungubwe", "heading": "V. Mapungubwe et le monde de l'océan Indien", "era": "c. 1075–1220", "year": 1075,
        "place": "Vallée du Limpopo", "story": "Mapungubwe rappelle que l'Afrique australe précoloniale était intégrée à des réseaux régionaux et maritimes complexes, sans attendre l'arrivée européenne pour entrer dans l'histoire mondiale.",
        "link": {"label": "Lire le récit", "to": "/story/mapungubwe-indian-ocean"},
        "image_url": "https://images.unsplash.com/photo-1523805009345-7448845a9e53?crop=entropy&cs=srgb&fm=jpg&w=1600&q=80",
    },
    {
        "id": "sa-forced-mobility", "heading": "VI. Déplacements, travail et ségrégation", "era": "XVIIe–XXe siècles", "year": 1652,
        "place": "Cap, mines et villes sud-africaines", "story": "Esclavage au Cap, dépossession, travail migrant, pass laws et expulsions forcées ont produit des trajectoires humaines qui relient territoires ruraux, mines, ports, townships et exils.",
        "link": {"label": "Ouvrir le dossier pays", "to": "/country/south-africa"},
        "image_url": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?crop=entropy&cs=srgb&fm=jpg&w=1600&q=80",
    },
    {
        "id": "sa-anti-apartheid", "heading": "VII. Résistances, exils et démocratie", "era": "1948–1996", "year": 1948,
        "place": "Afrique du Sud et réseaux internationaux", "story": "La lutte contre l'apartheid traversa syndicats, écoles, églises, arts, diplomatie, clandestinité et exil. La transition démocratique fut un processus collectif, conflictuel et inachevé.",
        "link": {"label": "Lire le récit", "to": "/story/apartheid-to-democracy"},
        "image_url": "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?crop=entropy&cs=srgb&fm=jpg&w=1600&q=80",
    },
]

SA_TIMELINE_EVENTS = [
    {"id": "event-mapungubwe", "name": "Essor de Mapungubwe", "category": "events", "era": "c. 1075", "region": "South Africa", "year": 1075, "summary": "Développement d'un centre politique et commercial majeur dans la vallée du Limpopo.", "link": "/story/mapungubwe-indian-ocean"},
    {"id": "event-zulu-consolidation", "name": "Consolidation du royaume zoulou", "category": "events", "era": "1816", "region": "South Africa", "year": 1816, "summary": "Shaka devient souverain et transforme les équilibres politiques du KwaZulu-Natal.", "link": "/civilization/zulu-kingdom"},
    {"id": "event-isandlwana", "name": "Bataille d'Isandlwana", "category": "events", "era": "1879", "region": "South Africa", "year": 1879, "summary": "Victoire majeure des forces zouloues contre une armée britannique pendant la guerre anglo-zouloue.", "link": "/country/south-africa"},
    {"id": "event-union-sa", "name": "Création de l'Union sud-africaine", "category": "events", "era": "1910", "region": "South Africa", "year": 1910, "summary": "Unification politique de colonies britanniques et anciens États boers dans un ordre excluant la majorité noire du pouvoir national.", "link": "/country/south-africa"},
    {"id": "event-apartheid", "name": "Institutionnalisation de l'apartheid", "category": "events", "era": "1948", "region": "South Africa", "year": 1948, "summary": "Le Parti national renforce un système légal de classification raciale, ségrégation et dépossession.", "link": "/story/apartheid-to-democracy"},
    {"id": "event-sharpeville", "name": "Massacre de Sharpeville", "category": "events", "era": "1960", "region": "South Africa", "year": 1960, "summary": "La police tue des manifestants opposés aux pass laws, provoquant une condamnation internationale et une nouvelle phase de lutte.", "link": "/country/south-africa"},
    {"id": "event-soweto", "name": "Soulèvement de Soweto", "category": "events", "era": "1976", "region": "South Africa", "year": 1976, "summary": "Des élèves protestent contre le système scolaire de l'apartheid; la répression déclenche une mobilisation nationale.", "link": "/story/soweto-1976"},
    {"id": "event-democracy", "name": "Premières élections nationales non raciales", "category": "events", "era": "1994", "region": "South Africa", "year": 1994, "summary": "Les élections d'avril 1994 ouvrent la démocratie constitutionnelle sud-africaine.", "link": "/story/apartheid-to-democracy"},
    {"id": "event-constitution", "name": "Adoption de la Constitution", "category": "events", "era": "1996", "region": "South Africa", "year": 1996, "summary": "La nouvelle Constitution établit un ordre démocratique non racial et une large charte des droits.", "link": "/country/south-africa"},
]
