"""Namibia master country dossier — Southern Africa coverage."""

NAMIBIA_DOSSIER = {
    "id": "country-na-master-v1",
    "country": "Namibia",
    "iso2": "NA",
    "iso3": "NAM",
    "slug": "namibia",
    "name": {"fr": "Namibie", "en": "Namibia"},
    "region": {"id": "southern-africa", "fr": "Afrique australe", "en": "Southern Africa"},
    "status": "published-v1",
    "last_reviewed": "2026-09-11",
    "editorial_note": (
        "Dossier de synthèse consacré à la Namibie, de la longue histoire des sociétés du territoire "
        "aux transformations contemporaines. Les sections sensibles distinguent les faits établis, "
        "les mémoires communautaires et les débats historiographiques."
    ),
    "presentation": {
        "heading": "La Namibie en un regard",
        "facts": [
            {"label": "Nom officiel", "value": "République de Namibie"},
            {"label": "Capitale", "value": "Windhoek"},
            {"label": "Situation", "value": "Façade atlantique du sud-ouest de l’Afrique"},
            {"label": "Superficie", "value": "environ 825 000 km²"},
            {"label": "Population", "value": "3 022 401 habitants au recensement de 2023"},
            {"label": "Monnaie", "value": "Dollar namibien (NAD) ; rand sud-africain également utilisé"},
            {"label": "Langue officielle", "value": "Anglais"},
            {"label": "Indépendance", "value": "21 mars 1990"},
            {"label": "Fuseau horaire", "value": "UTC+2"},
        ],
        "source_links": [
            {"label": "Namibia Statistics Agency", "url": "https://nsa.org.na/"},
            {"label": "Parliament of Namibia", "url": "https://www.parliament.na/"},
            {"label": "UNESCO Namibia", "url": "https://www.unesco.org/en/countries/na"},
        ],
    },
    "overview": {
        "title": "Namibie",
        "summary": (
            "La Namibie occupe une vaste façade atlantique d’Afrique australe, entre l’Angola, la Zambie, "
            "le Botswana et l’Afrique du Sud. Elle associe le désert du Namib, les escarpements du centre, "
            "le bassin du Kalahari, des savanes et les zones plus humides du nord-est. Son histoire relie "
            "des communautés de chasseurs-cueilleurs, des sociétés pastorales et agricoles, des réseaux "
            "régionaux, la colonisation allemande, le génocide des Ovaherero et des Nama, l’administration "
            "sud-africaine, la lutte de libération et l’indépendance de 1990. Le pays contemporain est une "
            "république constitutionnelle, très faiblement peuplée à l’échelle de son territoire et marquée "
            "par de fortes inégalités héritées de la colonisation et de l’apartheid."
        ),
        "capital": "Windhoek",
        "official_languages": ["anglais"],
        "currency": "dollar namibien (NAD)",
        "neighbours": ["Angola", "Zambie", "Botswana", "Afrique du Sud"],
        "history_chapters": [
            {
                "id": "na-history-deep-time",
                "title": "Longues occupations humaines et art rupestre",
                "period": "Préhistoire – premiers millénaires de notre ère",
                "summary": (
                    "Les paysages namibiens conservent des traces d’occupations humaines anciennes. "
                    "Twyfelfontein /Ui-//aes documente notamment des pratiques rituelles de communautés "
                    "de chasseurs-cueilleurs sur au moins deux millénaires."
                ),
                "details": [
                    "Les catégories ethniques contemporaines ne doivent pas être projetées mécaniquement sur les sociétés anciennes.",
                    "L’archéologie et l’art rupestre replacent la Namibie dans une histoire de mobilités et d’adaptations environnementales à l’échelle de l’Afrique australe.",
                ],
                "status": "ready",
                "sources": ["src-na-unesco-twyfelfontein"],
            },
            {
                "id": "na-history-regional-societies",
                "title": "Sociétés pastorales, agricoles et réseaux régionaux",
                "period": "premier millénaire – XIXe siècle",
                "summary": (
                    "Des communautés san, khoekhoe, damara, herero, ovambo, kavango et d’autres groupes "
                    "participent à des économies et à des systèmes politiques variés, reliés aux mondes "
                    "du Kalahari, de l’Angola méridional, du bassin du Zambèze et du Cap."
                ),
                "details": [
                    "Les trajectoires régionales diffèrent fortement entre le nord, le centre, la côte et le sud.",
                    "Élevage, agriculture, chasse, collecte, métallurgie et commerce se combinent selon les milieux et les périodes.",
                ],
                "status": "provisional",
                "sources": ["src-na-nhc"],
            },
            {
                "id": "na-history-german-colony",
                "title": "Colonisation allemande et génocide",
                "period": "1884–1915",
                "summary": (
                    "L’Empire allemand établit la colonie du Sud-Ouest africain allemand. La guerre de 1904–1908 "
                    "contre les Ovaherero et les Nama débouche sur un génocide, accompagné de déplacements, "
                    "de camps, de confiscations de terres et de systèmes de travail coercitifs."
                ),
                "details": [
                    "Les violences de 1904–1908 constituent un nœud majeur de la mémoire publique namibienne et des relations avec l’Allemagne.",
                    "La recherche contemporaine examine à la fois la politique militaire, les structures coloniales, les pertes humaines, les spoliations et les mémoires des descendants.",
                ],
                "status": "ready",
                "sources": ["src-na-jns-genocide"],
            },
            {
                "id": "na-history-south-african-rule",
                "title": "Administration sud-africaine et apartheid",
                "period": "1915–1990",
                "summary": (
                    "Après la conquête sud-africaine pendant la Première Guerre mondiale, le territoire passe "
                    "sous mandat de la Société des Nations administré par l’Afrique du Sud. Pretoria étend ensuite "
                    "des politiques de ségrégation et d’apartheid, tandis que les revendications internationales "
                    "pour l’autodétermination s’intensifient."
                ),
                "details": [
                    "Le statut international du territoire devient un enjeu central aux Nations unies.",
                    "La lutte anticoloniale, notamment portée par la SWAPO, s’inscrit aussi dans les guerres et les recompositions régionales de l’Afrique australe.",
                ],
                "status": "ready",
                "sources": ["src-na-un-independence"],
            },
            {
                "id": "na-history-independence",
                "title": "Transition, indépendance et construction républicaine",
                "period": "1989–présent",
                "summary": (
                    "La résolution 435 du Conseil de sécurité fournit le cadre de la transition supervisée par l’ONU. "
                    "Des élections constituantes ont lieu en 1989 et la Namibie devient indépendante le 21 mars 1990."
                ),
                "details": [
                    "La Constitution installe un ordre démocratique multipartite, des droits fondamentaux et une séparation des pouvoirs.",
                    "Depuis l’indépendance, les débats portent notamment sur les inégalités, la terre, l’emploi, les ressources minières, l’éducation, la santé et l’adaptation climatique.",
                ],
                "status": "ready",
                "sources": ["src-na-un-independence", "src-na-parliament"],
            },
        ],
    },
    "geography": {
        "title": "Territoire et milieux",
        "sections": [
            {
                "id": "na-namib",
                "title": "Désert du Namib et côte atlantique",
                "summary": (
                    "Le Namib longe l’Atlantique et comprend dunes, plaines graveleuses, inselbergs, lagunes et rivières éphémères. "
                    "Le brouillard côtier constitue une source d’humidité déterminante pour de nombreux organismes spécialisés."
                ),
                "sources": ["src-na-unesco-namib"],
            },
            {
                "id": "na-central-highlands",
                "title": "Hauts plateaux et escarpements centraux",
                "summary": (
                    "Le centre du pays concentre Windhoek et plusieurs grands axes de peuplement. "
                    "Les reliefs séparent les plaines côtières arides des bassins intérieurs."
                ),
                "sources": ["src-na-worldbank"],
            },
            {
                "id": "na-kalahari",
                "title": "Kalahari et bassins intérieurs",
                "summary": (
                    "L’est namibien appartient au vaste système du Kalahari, caractérisé par des sols sableux, "
                    "des savanes sèches et de fortes contraintes hydriques."
                ),
                "sources": ["src-na-worldbank"],
            },
            {
                "id": "na-north-zambezi",
                "title": "Nord et région du Zambèze",
                "summary": (
                    "Le nord et l’extrême nord-est disposent de régimes hydrologiques et de densités humaines différents du centre aride. "
                    "Les réseaux de l’Okavango, du Kwando-Linyanti-Chobe et du Zambèze relient la Namibie aux pays voisins."
                ),
                "sources": ["src-na-sadc"],
            },
        ],
    },
    "institutions": {
        "capital_functions": [{"city": "Windhoek", "function": "Capitale nationale et principal centre politique et administratif."}],
        "provinces": [
            {"name": "Erongo", "capital": "Swakopmund"},
            {"name": "Hardap", "capital": "Mariental"},
            {"name": "ǁKaras", "capital": "Keetmanshoop"},
            {"name": "Kavango East", "capital": "Rundu"},
            {"name": "Kavango West", "capital": "Nkurenkuru"},
            {"name": "Khomas", "capital": "Windhoek"},
            {"name": "Kunene", "capital": "Opuwo"},
            {"name": "Ohangwena", "capital": "Eenhana"},
            {"name": "Omaheke", "capital": "Gobabis"},
            {"name": "Omusati", "capital": "Outapi"},
            {"name": "Oshana", "capital": "Oshakati"},
            {"name": "Oshikoto", "capital": "Omuthiya"},
            {"name": "Otjozondjupa", "capital": "Otjiwarongo"},
            {"name": "Zambezi", "capital": "Katima Mulilo"},
        ],
        "items": [
            {
                "id": "na-constitutional-system",
                "title": "République constitutionnelle",
                "note": "La Constitution organise un exécutif, un Parlement bicaméral et un pouvoir judiciaire indépendant.",
                "status": "ready",
                "sources": ["src-na-parliament", "src-na-justice"],
            }
        ],
    },
    "languages": {
        "official": ["anglais"],
        "household_2023": [
            {"language": "Oshiwambo (ensemble de variétés)", "percent": None, "note": "Très présent dans le nord et dans les mobilités urbaines."},
            {"language": "Khoekhoegowab", "percent": None, "note": "Langue khoe parlée notamment par des communautés nama et damara."},
            {"language": "Otjiherero", "percent": None, "note": "Langue des communautés ovaherero et apparentées."},
            {"language": "RuKwangali et autres langues kavango", "percent": None, "note": "Présentes dans le nord-est, autour du Kavango."},
            {"language": "Silozi et langues du Zambèze", "percent": None, "note": "Présentes dans l’extrême nord-est et dans des réseaux transfrontaliers."},
            {"language": "Afrikaans", "percent": None, "note": "Langue de communication importante héritée de l’histoire régionale."},
            {"language": "Allemand", "percent": None, "note": "Langue minoritaire liée en partie à l’histoire coloniale et à certaines communautés contemporaines."},
        ],
        "note": (
            "L’anglais est la langue officielle de l’État. Le pays reste profondément multilingue ; "
            "les usages varient selon les régions, les générations, l’école, les médias et les trajectoires familiales."
        ),
        "sources": ["src-na-unesco-languages"],
    },
    "peoples": [
        {
            "id": "people-ovambo-namibia-v1",
            "name": "Communautés ovambo",
            "regions": ["nord de la Namibie et sud de l’Angola"],
            "languages": ["variétés oshiwambo"],
            "history": "Ensemble de communautés aux histoires politiques et territoriales distinctes, liées de longue date au nord de la Namibie et au sud de l’Angola.",
            "culture": "Agriculture, élevage, artisanat, christianismes, pratiques familiales et cultures urbaines se combinent de multiples manières.",
            "caution": "Ne pas réduire les communautés ovambo à un groupe politique ou linguistique homogène.",
            "sources": ["src-na-unesco-languages"],
        },
        {
            "id": "people-ovaherero-v1",
            "name": "Ovaherero",
            "regions": ["centre et nord-ouest de la Namibie, Botswana et diaspora régionale"],
            "languages": ["otjiherero"],
            "history": "Les Ovaherero ont développé des sociétés pastorales et des organisations politiques variées. Le génocide colonial de 1904–1908 constitue un traumatisme historique central.",
            "culture": "La mémoire familiale, l’élevage, les commémorations, les vêtements cérémoniels et les pratiques linguistiques restent importants, avec de fortes transformations contemporaines.",
            "sources": ["src-na-jns-genocide"],
        },
        {
            "id": "people-nama-v1",
            "name": "Nama",
            "regions": ["sud et centre de la Namibie, Afrique du Sud"],
            "languages": ["khoekhoegowab"],
            "history": "Des communautés nama participent à de vastes réseaux pastoraux et politiques d’Afrique australe. Elles subissent elles aussi la guerre coloniale et le génocide de 1904–1908.",
            "culture": "Oralité, musique, pratiques pastorales, christianismes et mémoires de résistance forment des patrimoines vivants et divers.",
            "sources": ["src-na-jns-genocide"],
        },
        {
            "id": "people-damara-v1",
            "name": "Damara",
            "regions": ["centre et nord-ouest de la Namibie"],
            "languages": ["khoekhoegowab"],
            "history": "Les communautés damara ont des trajectoires anciennes distinctes qui ne se confondent ni avec celles des Nama ni avec une identité unique de chasseurs-cueilleurs.",
            "culture": "La langue, les mémoires territoriales, l’artisanat, la musique et les pratiques urbaines contemporaines montrent une grande diversité.",
            "sources": ["src-na-nhc"],
        },
        {
            "id": "people-san-namibia-v1",
            "name": "Communautés san",
            "regions": ["est et nord-est de la Namibie, réseaux transfrontaliers du Kalahari"],
            "languages": ["plusieurs langues khoisan selon les communautés"],
            "history": "Le terme San regroupe plusieurs communautés dont les langues et les histoires sont distinctes. Leur présence s’inscrit dans de longues trajectoires d’adaptation aux milieux d’Afrique australe.",
            "caution": "Éviter de présenter les San comme une population figée hors de la modernité.",
            "sources": ["src-na-unesco-languages"],
        },
        {
            "id": "people-kavango-v1",
            "name": "Communautés kavango",
            "regions": ["vallée du Kavango et Angola méridional"],
            "languages": ["ruKwangali et langues apparentées"],
            "history": "Plusieurs communautés de la vallée du Kavango ont développé agricultures, pêche, échanges et institutions politiques liées à un espace fluvial transfrontalier.",
            "sources": ["src-na-unesco-languages"],
        },
    ],
    "polities": {
        "title": "Sociétés politiques et pouvoirs historiques",
        "items": [
            {"id": "na-ovambo-kingdoms", "name": "Royaumes et communautés politiques ovambo", "period": "époque précoloniale – XXe siècle", "note": "Le nord de la Namibie comprend plusieurs formations politiques distinctes ; l’étiquette « Ovambo » ne désigne pas un royaume unique.", "status": "provisional", "sources": ["src-na-nhc"]},
            {"id": "na-herero-polities", "name": "Pouvoirs ovaherero", "period": "XVIIIe–début XXe siècle", "note": "Des autorités et réseaux pastoraux ovaherero structurent une partie du centre du territoire avant et pendant la pénétration coloniale.", "status": "provisional", "sources": ["src-na-jns-genocide"]},
            {"id": "na-nama-polities", "name": "Chefferies nama", "period": "XVIIIe–début XXe siècle", "note": "Plusieurs chefferies nama ont leurs propres trajectoires, alliances, conflits et résistances face à la colonisation allemande.", "status": "provisional", "sources": ["src-na-jns-genocide"]},
        ],
    },
    "religions": {"items": [
        {"id": "na-christianities", "name": "Christianismes", "note": "Les Églises chrétiennes occupent une place majeure dans la vie sociale, avec des traditions confessionnelles diverses.", "status": "ready", "sources": ["src-na-unesco"]},
        {"id": "na-indigenous-spiritualities", "name": "Spiritualités et pratiques autochtones", "note": "Des pratiques rituelles, mémoires ancestrales et cosmologies persistent ou se recomposent selon les communautés.", "status": "provisional", "sources": ["src-na-unesco-twyfelfontein"]},
    ]},
    "culture": [
        {"id": "na-rock-art", "title": "Art rupestre et paysages de mémoire", "summary": "Twyfelfontein /Ui-//aes relie art rupestre, pratiques rituelles, économie et usages de l’eau dans une histoire de plusieurs millénaires.", "sources": ["src-na-unesco-twyfelfontein"]},
        {"id": "na-living-languages", "title": "Multilinguisme vivant", "summary": "Langues bantoues, khoe et autres traditions linguistiques structurent les identités régionales et les productions culturelles contemporaines.", "sources": ["src-na-unesco-languages"]},
        {"id": "na-memory-performance", "title": "Mémoire, musique et commémorations", "summary": "Chants, performances, cérémonies et commémorations permettent de transmettre des histoires familiales, politiques et communautaires.", "sources": ["src-na-nhc"]},
    ],
    "heritage": [
        {"id": "na-twyfelfontein", "name": "Twyfelfontein ou /Ui-//aes", "type": "Patrimoine mondial culturel", "note": "L’un des grands ensembles d’art rupestre d’Afrique, inscrit au patrimoine mondial en 2007.", "status": "ready", "sources": ["src-na-unesco-twyfelfontein"]},
        {"id": "na-namib-sand-sea", "name": "Erg du Namib / Namib Sand Sea", "type": "Patrimoine mondial naturel", "note": "Désert côtier de dunes sous influence du brouillard, inscrit au patrimoine mondial en 2013.", "status": "ready", "sources": ["src-na-unesco-namib"]},
    ],
    "environment": {"items": [
        {"id": "na-aridity", "title": "Aridité et eau", "note": "La rareté et la variabilité de l’eau structurent les établissements humains, les écosystèmes, l’agriculture et les politiques publiques.", "sources": ["src-na-worldbank"]},
        {"id": "na-conservation", "title": "Conservation et usages communautaires", "note": "La conservation doit être étudiée avec les droits fonciers, les usages locaux, le tourisme et les conflits liés à la faune.", "sources": ["src-na-nhc"]},
        {"id": "na-climate-risk", "title": "Vulnérabilité climatique", "note": "Sécheresses, chaleur et variabilité des précipitations accentuent les contraintes d’un pays déjà très aride.", "sources": ["src-na-worldbank"]},
    ]},
    "society": {"themes": [
        {"id": "na-population-2023", "title": "Un territoire vaste et peu densément peuplé", "summary": "Le recensement de 2023 dénombre 3 022 401 habitants, avec une densité moyenne de 3,7 personnes par km².", "sources": ["src-na-nsa-census"]},
        {"id": "na-urban-rural", "title": "Équilibre urbain-rural en transformation", "summary": "Le recensement de 2023 indique une population presque également répartie entre espaces urbains et ruraux.", "sources": ["src-na-nsa-census"]},
        {"id": "na-inequality", "title": "Inégalités et héritages fonciers", "summary": "Les inégalités de revenus, de terres et d’opportunités demeurent parmi les principaux défis structurels du pays.", "sources": ["src-na-worldbank"]},
    ]},
    "education_health": {
        "education": {"items": [{"id": "na-education-access", "title": "Éducation, langues et accès", "summary": "L’expansion de l’éducation depuis l’indépendance coexiste avec des écarts de qualité, d’accès territorial et des enjeux liés au multilinguisme.", "sources": ["src-na-worldbank", "src-na-unesco-languages"]}]},
        "health": {"items": [{"id": "na-health-system", "title": "Santé publique et fortes distances territoriales", "summary": "La faible densité de population et les distances compliquent l’accès équitable aux services de santé, malgré les investissements réalisés depuis l’indépendance.", "sources": ["src-na-worldbank"]}]},
    },
    "economy": {"sections": [
        {"id": "na-mining", "title": "Mines et exportations", "summary": "L’économie dépend fortement des activités minières et des marchés de matières premières, notamment pour les recettes d’exportation.", "sources": ["src-na-worldbank"]},
        {"id": "na-services-tourism", "title": "Services, transport et tourisme", "summary": "Les services occupent une place croissante, tandis que le tourisme s’appuie fortement sur les paysages, la faune et les patrimoines.", "sources": ["src-na-worldbank", "src-na-unesco-namib"]},
        {"id": "na-agriculture", "title": "Agriculture et élevage sous contrainte climatique", "summary": "Agriculture et élevage restent essentiels à de nombreux ménages ruraux mais sont très exposés aux sécheresses et à la variabilité climatique.", "sources": ["src-na-worldbank"]},
        {"id": "na-transition-opportunities", "title": "Nouvelles ressources et transition énergétique", "summary": "Les découvertes pétrolières offshore et les projets d’hydrogène vert créent de nouvelles perspectives mais posent des questions de gouvernance, d’emploi, d’environnement et de partage des revenus.", "sources": ["src-na-worldbank"]},
    ]},
    "migrations": [
        {"id": "na-regional-mobility", "label": "Mobilités régionales anciennes et contemporaines", "period": "longue durée", "type": "mixed", "reason": "Les frontières modernes traversent des espaces sociaux plus anciens reliant notamment l’Angola méridional, le Kalahari, le Botswana et l’Afrique du Sud.", "mapping": "Représenter des corridors régionaux et non des lignes ethniques fixes.", "sources": ["src-na-sadc"]},
        {"id": "na-colonial-displacement", "label": "Déplacements et exils liés aux violences coloniales", "start": 1904, "end": 1908, "type": "forced", "reason": "La guerre coloniale et le génocide des Ovaherero et des Nama provoquent morts, déplacements forcés, pertes de terres et exils régionaux.", "mapping": "Toute visualisation doit distinguer les zones documentées des itinéraires seulement approximatifs.", "sources": ["src-na-jns-genocide"]},
        {"id": "na-liberation-exile", "label": "Exil, lutte de libération et retours", "start": 1960, "end": 1990, "type": "mixed", "reason": "La lutte pour l’indépendance produit des circulations politiques, militaires, éducatives et familiales à travers l’Afrique australe et au-delà.", "sources": ["src-na-un-independence"]},
    ],
    "figures": [
        {"id": "figure-sam-nujoma-v1", "name": "Sam Nujoma", "field": "Indépendance et politique", "reason": "Figure majeure de la SWAPO et premier président de la Namibie indépendante.", "paragraphs": ["Son parcours s’inscrit dans la lutte contre l’administration sud-africaine et dans la diplomatie internationale autour de la question namibienne.", "Il devient le premier président après l’indépendance du 21 mars 1990."], "sources": ["src-na-un-independence", "src-na-sadc"]},
        {"id": "figure-hendrik-witbooi-v1", "name": "Hendrik Witbooi", "field": "Résistance anticoloniale", "reason": "Chef nama dont les écrits et la résistance occupent une place majeure dans l’histoire de la colonisation allemande.", "paragraphs": ["Ses lettres constituent des sources importantes sur les politiques, alliances et conflits du tournant des XIXe et XXe siècles.", "Sa mémoire est intégrée à plusieurs récits nationaux et communautaires."], "sources": ["src-na-nhc"]},
        {"id": "figure-hosea-kutako-v1", "name": "Hosea Kutako", "field": "Droits et décolonisation", "reason": "Chef ovaherero et figure importante des pétitions internationales contre l’administration sud-africaine.", "paragraphs": ["Son action relie revendications territoriales, mémoire ovaherero et internationalisation de la question namibienne."], "sources": ["src-na-un-independence"]},
    ],
    "interactive_timeline": {"items": [
        {"id": "na-timeline-twyfelfontein", "start": -2000, "end": None, "label": "Traditions d’art rupestre à Twyfelfontein", "text": "Les gravures et peintures documentent au moins deux millénaires de pratiques de chasseurs-cueilleurs.", "status": "ready", "sources": ["src-na-unesco-twyfelfontein"]},
        {"id": "na-timeline-german-colony", "start": 1884, "end": 1915, "label": "Sud-Ouest africain allemand", "text": "Mise en place de la colonie allemande et profondes transformations territoriales et sociales.", "status": "ready", "sources": ["src-na-jns-genocide"]},
        {"id": "na-timeline-genocide", "start": 1904, "end": 1908, "label": "Génocide des Ovaherero et des Nama", "text": "La guerre coloniale allemande débouche sur une politique de destruction, déplacements, camps et confiscations.", "status": "ready", "sources": ["src-na-jns-genocide"]},
        {"id": "na-timeline-un435", "start": 1978, "end": None, "label": "Résolution 435 du Conseil de sécurité", "text": "Le texte devient le cadre international de référence pour la transition vers l’indépendance.", "status": "ready", "sources": ["src-na-un-independence"]},
        {"id": "na-timeline-elections", "start": 1989, "end": None, "label": "Élections à l’Assemblée constituante", "text": "Des élections supervisées par l’ONU ouvrent la dernière phase de la transition.", "status": "ready", "sources": ["src-na-un-independence"]},
        {"id": "na-timeline-independence", "start": 1990, "end": None, "label": "Indépendance", "text": "La Namibie devient indépendante le 21 mars 1990.", "status": "ready", "sources": ["src-na-un-independence"]},
    ]},
    "national_symbols": {"items": [
        {"id": "na-symbol-flag", "title": "Drapeau national", "note": "Adopté à l’indépendance en 1990 ; les couleurs et le soleil constituent les principaux éléments visuels du symbole national.", "sources": ["src-na-parliament"]},
        {"id": "na-symbol-independence-day", "title": "Fête de l’indépendance", "note": "Le 21 mars commémore l’indépendance de 1990.", "sources": ["src-na-un-independence"]},
    ]},
    "international_role": {"memberships": [
        {"id": "na-sadc", "title": "SADC", "summary": "La Namibie rejoint la SADCC en 1990 et accueille à Windhoek en 1992 la signature du traité transformant l’organisation en SADC.", "sources": ["src-na-sadc"]},
        {"id": "na-un", "title": "Nations unies", "summary": "La Namibie devient membre de l’ONU peu après son indépendance en 1990, après des décennies durant lesquelles son statut fut une question internationale majeure.", "sources": ["src-na-un-independence"]},
    ]},
    "historiography": {"title": "Historiographie et précautions", "items": [
        {"id": "na-hist-genocide", "title": "Nommer et documenter le génocide de 1904–1908", "note": "Présenter les travaux historiques, les mémoires ovaherero et nama, les archives coloniales et les débats sur réparations et restitutions sans réduire le sujet à une seule narration étatique.", "sources": ["src-na-jns-genocide"]},
        {"id": "na-hist-precolonial", "title": "Ne pas faire commencer l’histoire avec la colonisation", "note": "Les périodes précoloniales doivent articuler archéologie, linguistique, traditions orales et histoire régionale, avec des niveaux de certitude explicites.", "sources": ["src-na-unesco-twyfelfontein", "src-na-nhc"]},
    ]},
    "research_gaps": [
        {"id": "na-gap-polities", "title": "Cartographie politique précoloniale", "note": "Affiner les territoires, mobilités et temporalités des formations politiques sans figer des frontières modernes.", "status": "research-gap"},
        {"id": "na-gap-languages", "title": "Atlas linguistique", "note": "Ajouter des données linguistiques récentes et régionalisées, validées par des sources spécialisées.", "status": "research-gap"},
        {"id": "na-gap-gallery", "title": "Galerie documentaire licenciée", "note": "Ajouter des images uniquement lorsque l’auteur, la source et les droits de réutilisation sont explicitement documentés.", "status": "research-gap"},
    ],
    "map_visuals": {
        "territory_places": [
            {"id": "na-place-windhoek", "label": "Windhoek", "coordinates": [17.0836, -22.5609], "kind": "capital", "min_zoom": 4},
            {"id": "na-place-swakopmund", "label": "Swakopmund", "coordinates": [14.5266, -22.6784], "kind": "city", "min_zoom": 6},
            {"id": "na-place-walvis-bay", "label": "Walvis Bay", "coordinates": [14.5053, -22.9576], "kind": "city", "min_zoom": 6},
            {"id": "na-place-rundu", "label": "Rundu", "coordinates": [19.7667, -17.9333], "kind": "city", "min_zoom": 6},
            {"id": "na-place-katima", "label": "Katima Mulilo", "coordinates": [24.2667, -17.5000], "kind": "city", "min_zoom": 6},
            {"id": "na-place-twyfelfontein", "label": "Twyfelfontein /Ui-//aes", "coordinates": [14.3751, -20.5948], "kind": "heritage", "min_zoom": 7, "sources": ["src-na-unesco-twyfelfontein"]},
            {"id": "na-place-namib-sand-sea", "label": "Namib Sand Sea", "coordinates": [15.4078, -24.8853], "kind": "natural-heritage", "min_zoom": 6, "sources": ["src-na-unesco-namib"]},
        ],
        "bounds": [[-29.1, 11.6], [-16.9, 25.3]],
    },
    "stories": [
        {"id": "na-story-independence", "title": "De la question namibienne à l’indépendance", "summary": "Un parcours reliant pétitions internationales, lutte de libération, diplomatie de l’ONU, résolution 435, élections de 1989 et indépendance de 1990.", "sources": ["src-na-un-independence"]},
        {"id": "na-story-desert-water", "title": "Vivre avec l’aridité", "summary": "Un parcours sur l’eau, le brouillard côtier, les rivières éphémères, le pastoralisme, les villes et la conservation dans l’un des pays les plus arides d’Afrique subsaharienne.", "sources": ["src-na-unesco-namib", "src-na-worldbank"]},
    ],
    "scientific_library": {"items": [
        {"id": "na-lib-census", "title": "2023 Population and Housing Census", "publisher": "Namibia Statistics Agency", "url": "https://census.nsa.org.na/"},
        {"id": "na-lib-jns", "title": "Journal of Namibian Studies", "publisher": "Journal of Namibian Studies", "url": "https://namibian-studies.com/"},
        {"id": "na-lib-unesco", "title": "Namibia — World Heritage", "publisher": "UNESCO", "url": "https://whc.unesco.org/en/statesparties/na"},
    ]},
    "media_gallery": [],
    "sources": [
        {"id": "src-na-nsa-census", "title": "2023 Population and Housing Census", "publisher": "Namibia Statistics Agency", "url": "https://census.nsa.org.na/", "type": "official-statistics"},
        {"id": "src-na-parliament", "title": "Parliament of Namibia — General information and constitutional institutions", "publisher": "Parliament of Namibia", "url": "https://www.parliament.na/", "type": "institutional"},
        {"id": "src-na-justice", "title": "About Namibia — Constitution and justice system", "publisher": "Ministry of Justice and Labour Relations, Namibia", "url": "https://mojlr.gov.na/about-namibia1", "type": "institutional"},
        {"id": "src-na-un-independence", "title": "The UN's role in Namibian Independence", "publisher": "United Nations in Namibia", "url": "https://namibia.un.org/en/175155-uns-role-namibian-independence", "type": "institutional-history"},
        {"id": "src-na-unesco-twyfelfontein", "title": "Twyfelfontein or /Ui-//aes", "publisher": "UNESCO World Heritage Centre", "url": "https://whc.unesco.org/en/list/1255", "type": "heritage"},
        {"id": "src-na-unesco-namib", "title": "Namib Sand Sea", "publisher": "UNESCO World Heritage Centre", "url": "https://whc.unesco.org/en/list/1430", "type": "heritage"},
        {"id": "src-na-unesco", "title": "Namibia", "publisher": "UNESCO", "url": "https://www.unesco.org/en/countries/na", "type": "institutional"},
        {"id": "src-na-unesco-languages", "title": "Indigenous voices, pathways to a sustainable future", "publisher": "UNESCO", "url": "https://www.unesco.org/en/articles/indigenous-voices-pathways-sustainable-future-national-dialogue-safeguarding-namibian-indigenous", "type": "institutional-cultural"},
        {"id": "src-na-nhc", "title": "National Heritage Council of Namibia", "publisher": "National Heritage Council of Namibia", "url": "https://nhc-nam.org/", "type": "institutional-heritage"},
        {"id": "src-na-jns-genocide", "title": "The military campaign in German Southwest Africa, 1904–1907 and the genocide of the Herero and Nama", "publisher": "Journal of Namibian Studies", "url": "https://namibian-studies.com/index.php/JNS/article/view/21", "type": "academic"},
        {"id": "src-na-sadc", "title": "Namibia — Member State profile", "publisher": "Southern African Development Community", "url": "https://www.sadc.int/member-states/namibia", "type": "regional-institution"},
        {"id": "src-na-worldbank", "title": "Namibia overview", "publisher": "World Bank", "url": "https://www.worldbank.org/en/country/namibia/overview", "type": "international-institution"},
    ],
}
