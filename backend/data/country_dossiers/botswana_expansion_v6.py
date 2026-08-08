"""Inonara Botswana V5.
Editorial expansion: country-centred dossier, source-first, visual gallery and migration map data.
"""
BOTSWANA_EXPANSION_V6 = {
    "editorial": {
        "version": "V5",
        "scope": "Botswana",
        "principles": [
            "Le Botswana est le sujet principal; les pays voisins ne sont mobilisés que lorsqu'une relation documentée est utile.",
            "Les frontières actuelles ne sont pas projetées sur les périodes anciennes.",
            "Les traditions orales sont signalées comme telles et ne sont pas présentées comme des preuves archéologiques.",
            "Chaque bloc factuel important porte des sources vérifiables."
        ],
    },
    "history_chapters": [
        {
            "id":"bw-v5-palaeo","period":"Préhistoire profonde","title":"Les premiers peuplements et les archives de Tsodilo",
            "status":"ready",
            "summary":"Le territoire de l'actuel Botswana s'inscrit dans une histoire humaine qui précède de très loin la formation des États et des ethnonymes actuels.",
            "details":[
                "Tsodilo, dans le nord-ouest, conserve une séquence archéologique et environnementale couvrant au moins 100 000 ans selon l'UNESCO.",
                "Le site compte plus de 4 500 peintures rupestres et des abris associés à des occupations humaines de longue durée.",
                "Il faut distinguer la preuve archéologique locale de toute tentative de tracer une frontière ethnique ancienne: les populations qui ont fréquenté ces paysages ne correspondent pas automatiquement aux catégories ethniques contemporaines."
            ],
            "sources":["src-unesco-tsodilo-v5","src-unesco-okavango-v5"]
        },
        {
            "id":"bw-v5-foraging","period":"Paléolithique récent – longue durée","title":"Chasse, collecte, mobilité et savoirs du Kalahari",
            "status":"ready",
            "summary":"Les paysages arides et semi-arides ont favorisé des formes de mobilité et des savoirs écologiques très spécialisés.",
            "details":[
                "Les communautés aujourd'hui regroupées sous l'appellation San sont diverses par leurs langues, leurs histoires et leurs organisations sociales.",
                "La mobilité ne doit pas être confondue avec une absence de territorialité: les parcours, points d'eau, lieux de mémoire et ressources peuvent être précisément connus.",
                "Les politiques modernes de sédentarisation et de conservation ont parfois transformé l'accès aux territoires traditionnels; ces transformations doivent être étudiées séparément de l'histoire ancienne."
            ],
            "sources":["src-unesco-tsodilo-v5","src-un-indigenous-v5"]
        },
        {
            "id":"bw-v5-food-production","period":"Ier millénaire av. J.-C. – Ier millénaire apr. J.-C.","title":"Élevage, agriculture, métallurgie et réseaux locaux",
            "status":"provisional",
            "summary":"Des sociétés agro-pastorales et métallurgistes se développent dans plusieurs parties de la région.",
            "details":[
                "Les archives archéologiques montrent des transformations progressives plutôt qu'un remplacement uniforme d'une population par une autre.",
                "L'élevage bovin devient particulièrement important dans les économies et les statuts sociaux de plusieurs communautés de la région.",
                "Les données doivent être lues site par site: une tradition archéologique n'est pas l'équivalent direct d'une ethnie moderne."
            ],
            "sources":["src-ub-v5","src-atlas-botswana-v5"]
        },
        {
            "id":"bw-v5-toutswe","period":"VIIIe–XIIIe siècles","title":"Toutswe et les sociétés de l'est du Botswana",
            "status":"ready",
            "summary":"Les établissements de la tradition Toutswe témoignent d'une organisation agro-pastorale et de réseaux d'échanges dans l'est.",
            "details":[
                "Toutswemogala Hill est un site majeur associé à cette tradition et figure sur la liste indicative du patrimoine mondial du Botswana.",
                "Le développement des troupeaux, l'agriculture, la métallurgie et les échanges participent à la hiérarchisation de certaines communautés.",
                "L'histoire de Toutswe doit être reliée aux réseaux régionaux sans transformer le site en capitale d'un État moderne."
            ],
            "sources":["src-unesco-bw-v5","src-atlas-botswana-v5","src-ub-v5"]
        },
        {
            "id":"bw-v5-mapungubwe","period":"XIe–XIVe siècles","title":"Mapungubwe, Limpopo et commerce régional",
            "status":"ready",
            "summary":"Le nord-est de l'actuel Botswana participe à un espace régional de circulations reliant le Limpopo, Mapungubwe et d'autres centres.",
            "details":[
                "Mapungubwe, situé aujourd'hui en Afrique du Sud, est utile ici comme contexte régional: le site révèle une société hiérarchisée et des échanges à longue distance.",
                "Ces réseaux ont relié des matières premières, du bétail, des métaux et des produits de prestige sur de grandes distances.",
                "Parler de ces connexions ne signifie pas que le Botswana contemporain était une périphérie d'un État sud-africain: les frontières contemporaines n'existaient pas."
            ],
            "sources":["src-met-mapungubwe-v5","src-unesco-bw-v5"]
        },
        {
            "id":"bw-v5-merafe","period":"XVIIe–XIXe siècles","title":"Merafe, dikgosi et kgotla",
            "status":"ready",
            "summary":"Plusieurs communautés politiques tswana se consolident avec des institutions, des capitales et des histoires distinctes.",
            "details":[
                "Les Bangwato, Bakwena, Bangwaketse, Bakgatla, Batawana et d'autres communautés politiques développent des trajectoires propres.",
                "Le kgosi exerce une autorité politique et sociale dans un cadre où le kgotla joue un rôle de consultation, de discussion et de décision.",
                "Les migrations, scissions dynastiques, alliances, conflits et déplacements de capitales modifient constamment les zones d'influence."
            ],
            "sources":["src-npc-kgotla-v5","src-gov-traditional-v5"]
        },
        {
            "id":"bw-v5-19c","period":"Début–fin du XIXe siècle","title":"Conflits régionaux, commerce et missions",
            "status":"ready",
            "summary":"Le XIXe siècle transforme les équilibres politiques par les conflits régionaux, le commerce, les missions et les nouvelles relations avec les puissances coloniales.",
            "details":[
                "Les communautés tswana négocient avec des groupes voisins, des commerçants et des missionnaires tout en protégeant leurs territoires et leurs intérêts.",
                "Les récits regroupés sous le terme difaqane doivent être traités avec prudence: les historiens discutent encore l'ampleur, les causes et la chronologie de plusieurs déplacements.",
                "Les relations avec les territoires aujourd'hui situés en Afrique du Sud, Namibie et Zimbabwe sont pertinentes comme histoire régionale, pas comme substitution à l'histoire du Botswana."
            ],
            "sources":["src-bw-history-v5","src-npc-kgotla-v5"]
        },
        {
            "id":"bw-v5-protectorate","period":"1885–1966","title":"Le protectorat du Bechuanaland",
            "status":"ready",
            "summary":"La proclamation du protectorat britannique en 1885 transforme le cadre politique sans effacer les autorités tswana.",
            "details":[
                "En 1885, le Bechuanaland Protectorate est établi dans le contexte de la compétition coloniale en Afrique australe.",
                "En 1895, Khama III, Sebele I et Bathoen I se rendent en Grande-Bretagne pour défendre leurs intérêts face aux projets d'expansion de la British South Africa Company.",
                "Le travail migrant vers les mines d'Afrique du Sud devient une composante importante de l'économie du protectorat, notamment sous l'effet de la fiscalité et du faible développement d'emplois locaux.",
                "L'administration coloniale est longtemps distante et peu financée; les autorités locales restent importantes dans la gouvernance."
            ],
            "sources":["src-parliament-history-v5","src-agc-history-v5","src-bw-history-v5","src-ilo-bw-v5"]
        },
        {
            "id":"bw-v5-independence","period":"1966","title":"Indépendance et naissance de la République",
            "status":"ready",
            "summary":"Le 30 septembre 1966, le Bechuanaland devient la République du Botswana indépendante.",
            "details":[
                "Seretse Khama, auparavant Premier ministre, devient le premier président.",
                "La Constitution combine un modèle parlementaire inspiré de Westminster et des institutions adaptées au contexte politique du pays.",
                "Les institutions traditionnelles, notamment le bogosi et les dikgotla, continuent à jouer un rôle dans la vie publique, dans un cadre constitutionnel moderne."
            ],
            "sources":["src-parliament-history-v5","src-npc-kgotla-v5"]
        },
        {
            "id":"bw-v5-diamonds","period":"1967–années 2000","title":"Diamants, développement et transformation économique",
            "status":"ready",
            "summary":"La découverte de gisements diamantifères peu après l'indépendance transforme radicalement les finances et les infrastructures de l'État.",
            "details":[
                "Le gisement d'Orapa est découvert en 1967 et la mine entre en production en 1971.",
                "Le gisement de Jwaneng est découvert en 1972; la mine devient pleinement opérationnelle en 1982.",
                "Debswana est créée en 1969 comme coentreprise entre le gouvernement du Botswana et De Beers.",
                "Les revenus miniers financent une part importante de l'investissement public, mais la dépendance aux diamants demeure un risque structurel pour la diversification."
            ],
            "sources":["src-debswana-history-v5","src-worldbank-bw-v5"]
        },
        {
            "id":"bw-v5-contemporary","period":"XXIe siècle–présent","title":"Botswana contemporain : stabilité, diversification et tensions",
            "status":"ready",
            "summary":"Le Botswana combine institutions stables, économie minière, tourisme de nature et défis de diversification, d'emploi, d'inégalités et de gestion de l'eau.",
            "details":[
                "Le pays reste fortement dépendant des revenus liés aux diamants, tandis que les politiques publiques cherchent à développer d'autres secteurs.",
                "Le delta de l'Okavango impose une gouvernance transfrontalière avec l'Angola et la Namibie car le bassin dépasse les frontières nationales.",
                "Les politiques de conservation doivent intégrer les communautés locales et leurs moyens de subsistance, notamment dans et autour du delta.",
                "Les sécheresses, la variabilité des précipitations, l'eau et les conflits entre conservation, élevage, agriculture, tourisme et faune constituent des enjeux durables."
            ],
            "sources":["src-worldbank-bw-v5","src-unesco-okavango-v5","src-gov-bw-v5"]
        },
    ],
    "territory_sections": [
        {"id":"bw-territory-location","title":"Situation et frontières","text":"Le Botswana est un État enclavé d'Afrique australe couvrant environ 581 730 km². Il est bordé par la Namibie à l'ouest et au nord, la Zambie au nord-est, le Zimbabwe à l'est et l'Afrique du Sud au sud et au sud-est.","sources":["src-gov-bw-v5"]},
        {"id":"bw-territory-kalahari","title":"Bassin du Kalahari","text":"Une grande partie du territoire se trouve dans le bassin du Kalahari, un vaste espace sableux dont l'altitude moyenne est d'environ 1 100 mètres. Le Kalahari n'est pas une simple étendue de dunes: il comprend des savanes, prairies, dépressions salines et systèmes de drainage internes.","sources":["src-evisa-bw-v5","src-atlas-botswana-v5"]},
        {"id":"bw-territory-okavango","title":"Delta de l'Okavango","text":"Le delta de l'Okavango est un delta intérieur: ses eaux ne rejoignent pas la mer. L'inondation annuelle arrive pendant la saison sèche botswanaise, ce qui synchronise les cycles biologiques de nombreux organismes.","sources":["src-unesco-okavango-v5"]},
        {"id":"bw-territory-chobe","title":"Chobe et nord-est","text":"Le nord du pays associe le Chobe, les plaines inondables et les paysages du nord-est. Cette zone est liée à des systèmes hydrologiques et de conservation qui dépassent la frontière botswanaise.","sources":["src-unesco-bw-v5","src-okacom-v5"]},
        {"id":"bw-territory-makgadikgadi","title":"Makgadikgadi et dépressions salines","text":"Les pans de Makgadikgadi sont les vestiges d'un ancien système lacustre beaucoup plus vaste. Ils forment aujourd'hui un paysage saisonnier de sel, d'argiles, de prairies et de zones humides temporaires.","sources":["src-unesco-bw-v5","src-atlas-botswana-v5"]},
        {"id":"bw-territory-limpopo","title":"Limpopo et sud-est","text":"Le sud-est est plus densément peuplé et plus favorable à certaines formes d'agriculture que les zones arides de l'ouest. Le bassin du Limpopo relie le Botswana aux réseaux hydrologiques régionaux.","sources":["src-atlas-botswana-v5","src-gov-bw-v5"]},
        {"id":"bw-territory-climate","title":"Climat semi-aride","text":"Le climat est semi-aride, avec une forte variabilité spatiale et interannuelle des précipitations. La saison des pluies se concentre principalement sur l'été austral; les sécheresses récurrentes font de l'eau une ressource stratégique.","sources":["src-gov-bw-v5","src-evisa-bw-v5"]},
        {"id":"bw-territory-geology","title":"Géologie et ressources","text":"Les paysages reposent sur des ensembles géologiques anciens recouverts dans plusieurs régions par des sédiments et des dépôts du bassin du Kalahari. Les cheminées de kimberlite ont rendu possibles les grandes exploitations diamantifères d'Orapa et de Jwaneng.","sources":["src-atlas-botswana-v5","src-debswana-history-v5"]},
        {"id":"bw-territory-conservation","title":"Conservation et espaces protégés","text":"Une part importante du territoire est consacrée aux parcs nationaux, réserves et zones de gestion de la faune. Cette stratégie protège des écosystèmes majeurs mais soulève aussi des questions d'accès aux terres, de tourisme et de participation communautaire.","sources":["src-evisa-bw-v5","src-unesco-community-v5"]},
        {"id":"bw-territory-mapping","title":"Cartographie officielle","text":"Le Department of Surveys and Mapping du Botswana met à disposition des cartes topographiques, thématiques, orthophotos, modèles numériques d'élévation et données géospatiales. Inonara doit privilégier ces données pour les cartes nationales précises.","sources":["src-gov-maps-v5"]},
    ],
    "peoples": [
        {"id":"bw-people-tswana","name":"Batswana / communautés tswana","text":"Le terme Batswana regroupe plusieurs communautés et traditions politiques tswana. Il ne désigne pas une population culturellement parfaitement homogène.","sources":["src-gov-bw-v5","src-npc-kgotla-v5"]},
        {"id":"bw-people-san","name":"Communautés San","text":"Les San regroupent plusieurs communautés et langues. Leur histoire au Botswana comprend des mobilités anciennes, des transformations économiques et des conflits modernes autour des terres et de l'accès aux ressources.","sources":["src-un-indigenous-v5","src-unesco-tsodilo-v5"]},
        {"id":"bw-people-kalanga","name":"Kalanga","text":"Les Kalanga ont une présence historique importante dans le nord-est et entretiennent des liens culturels et linguistiques régionaux qui dépassent la frontière actuelle du Botswana.","sources":["src-atlas-botswana-v5"]},
        {"id":"bw-people-herero","name":"Herero","text":"Des communautés herero vivent notamment dans le nord-ouest. Leur histoire botswanaise est aussi liée aux déplacements provoqués par la guerre coloniale et le génocide des Herero et Nama dans l'actuelle Namibie au début du XXe siècle.","sources":["src-un-indigenous-v5","src-unesco-okavango-v5"]},
        {"id":"bw-people-hambukushu","name":"Hambukushu","text":"Les Hambukushu sont présents dans le nord-ouest, notamment dans l'espace de l'Okavango, où les activités et les identités sont liées au fleuve et aux zones humides.","sources":["src-unesco-community-v5","src-ramsar-okavango-v5"]},
        {"id":"bw-people-wayeyi","name":"Wayeyi / Bayeyi","text":"Les Wayeyi sont particulièrement associés aux paysages de l'Okavango et à des pratiques liées aux zones humides, à la pêche et aux ressources végétales.","sources":["src-ramsar-okavango-v5"]},
        {"id":"bw-people-basarwa","name":"Diversité interne","text":"Les catégories administratives et ethnographiques ne recouvrent pas toujours les identités locales. Inonara doit conserver les endonymes lorsqu'ils sont documentés et éviter les listes qui donnent l'impression d'une hiérarchie des peuples.","sources":["src-un-indigenous-v5"]},
    ],
    "languages": [
        {"name":"Setswana","status":"Langue nationale largement utilisée","text":"Le Setswana est une langue bantoue centrale de la famille bantoue, largement utilisée dans la vie publique et quotidienne."},
        {"name":"Anglais","status":"Langue officielle","text":"L'anglais est central dans l'administration, l'enseignement supérieur et de nombreux usages institutionnels."},
        {"name":"Kalanga","status":"Langue régionale","text":"Le Kalanga est principalement présent dans le nord-est et s'inscrit dans un continuum régional."},
        {"name":"Langues khoisan","status":"Diversité linguistique","text":"Plusieurs langues parlées par des communautés San appartiennent à des familles linguistiques distinctes; il ne faut pas les réduire à une seule « langue san »."},
        {"name":"Langues de l'Okavango","status":"Diversité régionale","text":"L'espace de l'Okavango accueille plusieurs langues et variétés associées aux communautés de la région, dans un espace transfrontalier."},
    ],
    "institutions_and_society": [
        {"id":"bw-society-kgotla","title":"Kgotla et consultation","text":"Le kgotla est un espace traditionnel de consultation et de discussion. Les institutions contemporaines reconnaissent encore le rôle du bogosi et des dikgotla dans la gouvernance locale.","sources":["src-npc-kgotla-v5","src-botswana-speaks-v5"]},
        {"id":"bw-society-bogosi","title":"Bogosi","text":"Le bogosi désigne l'institution de la chefferie traditionnelle. Il coexiste avec les institutions constitutionnelles de la République.","sources":["src-npc-kgotla-v5","src-gov-traditional-v5"]},
        {"id":"bw-society-democracy","title":"République et institutions","text":"Depuis 1966, le Botswana fonctionne comme une république constitutionnelle avec un parlement, une présidence et un système judiciaire; les institutions traditionnelles ont une place distincte dans la gouvernance.","sources":["src-parliament-history-v5"]},
    ],
    "economy_sections": [
        {"id":"bw-econ-diamonds","title":"Diamants","text":"Les diamants restent le cœur de l'économie d'exportation. Orapa, Letlhakane, Damtshaa et Jwaneng sont exploitées par Debswana.","sources":["src-debswana-history-v5","src-worldbank-bw-v5"]},
        {"id":"bw-econ-tourism","title":"Tourisme de nature","text":"Le delta de l'Okavango, Chobe et d'autres espaces protégés alimentent une économie touristique fondée sur la faune, les paysages et les expériences de nature.","sources":["src-unesco-okavango-v5","src-unesco-community-v5"]},
        {"id":"bw-econ-cattle","title":"Élevage et agriculture","text":"L'élevage bovin et les activités agricoles restent importants, mais ils sont fortement contraints par la disponibilité en eau, la variabilité des pluies et les conditions semi-arides.","sources":["src-atlas-botswana-v5","src-gov-bw-v5"]},
        {"id":"bw-econ-diversification","title":"Diversification","text":"La dépendance aux diamants crée un impératif de diversification vers les services, le tourisme, les chaînes de valeur locales et d'autres activités productives.","sources":["src-worldbank-bw-v5"]},
    ],
    "culture": [
        {"id":"bw-culture-oral","topic":"Oralité et mémoire","text":"Les traditions orales, les généalogies, les récits de fondation et les pratiques de transmission sont essentiels à l'histoire sociale. Ils doivent être identifiés comme sources orales et croisés avec les archives et l'archéologie.","sources":["src-npc-kgotla-v5"]},
        {"id":"bw-culture-kgotla","topic":"Kgotla","text":"Le kgotla est à la fois un espace social, politique et culturel. Sa forme varie selon les communautés et les lieux.","sources":["src-botswana-speaks-v5","src-gov-traditional-v5"]},
        {"id":"bw-culture-craft","topic":"Artisanat et matériaux","text":"La vannerie, la poterie, les objets en cuir, les perles et les techniques liées aux fibres végétales témoignent de savoir-faire locaux différents selon les régions.","sources":["src-unesco-community-v5"]},
        {"id":"bw-culture-food","topic":"Alimentation","text":"Les pratiques alimentaires combinent céréales, produits de l'élevage, légumes et ressources locales; les régimes diffèrent selon les milieux ruraux, urbains et les régions.","sources":["src-atlas-botswana-v5"]},
        {"id":"bw-culture-music","topic":"Musique et danse","text":"La musique, les danses communautaires et les formes de performance participent à la transmission des histoires, des identités et des célébrations.","sources":["src-gov-traditional-v5"]},
    ],
    "heritage": [
        {"id":"bw-heritage-tsodilo","title":"Tsodilo","kind":"Culturel","text":"Inscrit au patrimoine mondial en 2001; site archéologique et paysage culturel majeur.","sources":["src-unesco-tsodilo-v5"]},
        {"id":"bw-heritage-okavango","title":"Delta de l'Okavango","kind":"Naturel","text":"Inscrit au patrimoine mondial en 2014; vaste delta intérieur à forte valeur écologique.","sources":["src-unesco-okavango-v5"]},
        {"id":"bw-heritage-toutswemogala","title":"Toutswemogala Hill","kind":"Archéologie","text":"Site de la liste indicative du patrimoine mondial, important pour l'étude des sociétés agro-pastorales de l'âge du fer.","sources":["src-unesco-bw-v5"]},
        {"id":"bw-heritage-gcwihaba","title":"Gcwihaba Caves","kind":"Patrimoine naturel et culturel","text":"Ensemble de grottes et paysage karstique figurant sur la liste indicative du Botswana.","sources":["src-unesco-bw-v5"]},
        {"id":"bw-heritage-makgadikgadi","title":"Paysage des Makgadikgadi Pans","kind":"Paysage","text":"Vaste paysage de dépressions salines et d'anciens systèmes lacustres figurant sur la liste indicative.","sources":["src-unesco-bw-v5"]},
    ],
    "environment": [
        {"id":"bw-env-okavango","title":"Okavango","text":"Le delta est soumis à des pressions liées à l'eau, au tourisme, aux incendies, aux espèces invasives et aux conflits entre faune et activités humaines.","sources":["src-unesco-okavango-2025-v5"]},
        {"id":"bw-env-wildlife","title":"Faune","text":"Le Botswana protège d'importantes populations de grands mammifères et de nombreuses espèces d'oiseaux et de poissons; la conservation doit être articulée aux usages locaux des terres.","sources":["src-unesco-okavango-v5","src-unesco-community-v5"]},
        {"id":"bw-env-water","title":"Eau et climat","text":"La rareté et la variabilité de l'eau constituent une contrainte structurelle pour les populations, l'agriculture, l'élevage et la biodiversité.","sources":["src-gov-bw-v5","src-atlas-botswana-v5"]},
    ],
    "figures": [
        {"id":"bw-fig-khama-iii","name":"Khama III","role":"Kgosi des Bangwato","text":"Figure politique majeure de la fin du XIXe siècle; il participe à la défense des intérêts des communautés du Bechuanaland face aux ambitions coloniales.","sources":["src-bw-history-v5"]},
        {"id":"bw-fig-sebele-i","name":"Sebele I","role":"Kgosi des Bakwena","text":"L'un des trois dirigeants tswana qui se rendent en Grande-Bretagne en 1895 pour défendre l'autonomie territoriale du Bechuanaland.","sources":["src-bw-history-v5"]},
        {"id":"bw-fig-bathoen-i","name":"Bathoen I","role":"Kgosi des Bangwaketse","text":"Participe à la délégation de 1895 avec Khama III et Sebele I.","sources":["src-bw-history-v5"]},
        {"id":"bw-fig-seretse-khama","name":"Seretse Khama","role":"Premier président","text":"Premier Premier ministre puis premier président du Botswana indépendant; il dirige le pays de 1966 à 1980.","sources":["src-parliament-history-v5"]},
        {"id":"bw-fig-bessie-head","name":"Bessie Head","role":"Écrivaine","text":"Écrivaine sud-africaine née en 1937, installée à Serowe en 1964; le Botswana devient le cadre majeur de sa vie et de son œuvre.","sources":["src-bessie-head-v5"]},
        {"id":"bw-fig-kgosi-len","name":"Botswana et les dikgosi contemporains","role":"Institutions traditionnelles","text":"Les chefs traditionnels continuent d'occuper une place institutionnelle dans le système de gouvernance locale et de consultation.","sources":["src-npc-kgotla-v5"]},
    ],
    "migration_processes": [
        {"id":"bw-mig-kalahari","label":"Mobilités de longue durée dans le Kalahari","period":"Préhistoire – présent","type":"ancient","origin":"Régions du Kalahari et bassins voisins","destination":"Différentes zones du Botswana actuel","reason":"Accès saisonnier à l'eau, aux ressources, aux parentés et aux territoires de subsistance; les itinéraires ne correspondent pas à des frontières ethniques fixes.","sources":["src-unesco-tsodilo-v5","src-un-indigenous-v5"]},
        {"id":"bw-mig-tswana","label":"Recompositions des communautés tswana","period":"XVIIe–XIXe siècles","type":"mixed","origin":"Différentes régions de l'Afrique australe","destination":"Est et sud-est du Botswana actuel","reason":"Scissions politiques, alliances, conflits, recherche de pâturages et constitution de nouveaux centres de pouvoir.","sources":["src-bw-history-v5","src-npc-kgotla-v5"]},
        {"id":"bw-mig-herero","label":"Déplacements herero vers le nord-ouest du Botswana","period":"1904–années 1920","type":"forced","origin":"Sud-Ouest africain allemand, actuelle Namibie","destination":"Ngamiland et nord-ouest du Botswana","reason":"Fuite de la guerre coloniale et du génocide des Herero et Nama; installation progressive dans plusieurs zones.","sources":["src-un-indigenous-v5","src-ramsar-okavango-v5"]},
        {"id":"bw-mig-labour","label":"Travail migrant vers les mines d'Afrique du Sud","period":"Fin XIXe–XXe siècle","type":"coerced-labour","origin":"Bechuanaland Protectorate / Botswana","destination":"Région minière du Witwatersrand et autres centres","reason":"Fiscalité coloniale, recrutement minier et manque d'emplois locaux; les flux ont varié selon les périodes.","sources":["src-ilo-bw-v5","src-bw-history-v5"]},
        {"id":"bw-mig-bessie","label":"Exil et installation de Bessie Head","period":"1964","type":"forced","origin":"Afrique du Sud","destination":"Serowe","reason":"Départ de l'Afrique du Sud de l'apartheid et installation durable à Serowe.","sources":["src-bessie-head-v5"]},
        {"id":"bw-mig-urban","label":"Urbanisation intérieure","period":"1966–présent","type":"voluntary","origin":"Zones rurales et villages","destination":"Gaborone, Francistown, villes minières et centres de services","reason":"Éducation, emplois, administration, mines, services et transformation des modes de vie.","sources":["src-worldbank-bw-v5","src-atlas-botswana-v5"]},
        {"id":"bw-mig-okavango","label":"Circulations du bassin de l'Okavango","period":"XIXe siècle–présent","type":"mixed","origin":"Angola, Namibie et régions voisines","destination":"Okavango botswanais","reason":"Parentés, pêche, commerce, refuge, travail et mobilités saisonnières dans un bassin transfrontalier.","sources":["src-okacom-v5","src-unesco-okavango-v5"]},
        {"id":"bw-mig-contemporary-diaspora","label":"Diaspora botswanaise contemporaine","period":"XXe–XXIe siècles","type":"voluntary","origin":"Botswana","destination":"Afrique australe et autres pays","reason":"Études, travail, mobilité professionnelle et regroupement familial; les données doivent être présentées avec statistiques précises lorsqu'elles sont disponibles.","sources":["src-ilo-bw-v5","src-worldbank-bw-v5"]},
    ],
    "migration_routes": [
        {"id":"bw-v5-map-kalahari","label":"Mobilités du Kalahari","type":"ancient","start":-10000,"end":2026,"origin_coordinates":[20.5,-22.5],"destination_coordinates":[23.0,-21.0],"mapping":"Corridor indicatif; ne représente aucune frontière ethnique."},
        {"id":"bw-v5-map-tswana","label":"Recompositions tswana","type":"mixed","start":1600,"end":1850,"origin_coordinates":[27.0,-22.0],"destination_coordinates":[25.5,-23.5],"mapping":"Flux régional simplifié."},
        {"id":"bw-v5-map-herero","label":"Déplacements herero","type":"forced","start":1904,"end":1920,"origin_coordinates":[17.1,-22.6],"destination_coordinates":[22.8,-20.5],"mapping":"Trajet général vers plusieurs zones d'installation."},
        {"id":"bw-v5-map-labour","label":"Travail migrant vers le Rand","type":"coerced-labour","start":1890,"end":1990,"origin_coordinates":[25.9,-24.6],"destination_coordinates":[28.0,-26.2],"mapping":"Flux agrégé vers les centres miniers sud-africains."},
        {"id":"bw-v5-map-bessie","label":"Exil de Bessie Head","type":"forced","start":1964,"end":1964,"origin_coordinates":[28.0,-26.2],"destination_coordinates":[26.72,-22.38],"mapping":"Trajet biographique."},
        {"id":"bw-v5-map-urban","label":"Urbanisation intérieure","type":"voluntary","start":1966,"end":2026,"origin_coordinates":[24.0,-22.5],"destination_coordinates":[25.92,-24.63],"mapping":"Flux intérieur agrégé."},
        {"id":"bw-v5-map-okavango","label":"Bassin de l'Okavango","type":"mixed","start":1800,"end":2026,"origin_coordinates":[18.5,-14.5],"destination_coordinates":[23.0,-19.5],"mapping":"Corridor hydrographique transfrontalier."},
        {"id":"bw-v5-map-kalanga","label":"Réseaux kalanga du nord-est","type":"mixed","start":1200,"end":2026,"origin_coordinates":[28.2,-20.0],"destination_coordinates":[27.0,-21.8],"mapping":"Réseau régional indicatif; ne pas interpréter comme une migration unique."},
    ],
    "media_gallery": [
        {"id":"bw-img-flag","title":"Drapeau du Botswana","caption":"Drapeau national du Botswana","image_url":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Flag_of_Botswana.png","source_url":"https://commons.wikimedia.org/wiki/File:Flag_of_Botswana.png","credit":"SKopp / Wikimedia Commons","license":"Domaine public","source_ids":["src-img-flag-v5"]},
        {"id":"bw-img-tsodilo","title":"Collines de Tsodilo","caption":"Paysage des collines de Tsodilo, site du patrimoine mondial","image_url":"https://live.staticflickr.com/3098/2625371308_5f4a2e0b30_o.jpg","source_url":"https://commons.wikimedia.org/wiki/File:Tsodilo_Hills,_Botswana_(2625371308).jpg","credit":"Joachim Huber / Wikimedia Commons","license":"CC BY-SA 2.0","source_ids":["src-img-tsodilo-v5"]},
        {"id":"bw-img-okavango","title":"Delta de l'Okavango","caption":"Vue du delta intérieur de l'Okavango","image_url":"https://live.staticflickr.com/3082/2813159077_a645f93fa2_o.jpg","source_url":"https://commons.wikimedia.org/wiki/File:Okavango_Delta,_Botswana.jpg","credit":"Joachim Huber / Wikimedia Commons","license":"CC BY-SA 2.0","source_ids":["src-img-okavango-v5"]},
        {"id":"bw-img-gaborone","title":"Gaborone","caption":"Centre de Gaborone","image_url":"https://commons.wikimedia.org/wiki/Special:Redirect/file:Gaborone.jpg","source_url":"https://commons.wikimedia.org/wiki/File:Gaborone.jpg","credit":"Theodorekanjo / Wikimedia Commons","license":"Voir la page de fichier","source_ids":["src-img-gaborone-v5"]},
        {"id":"bw-img-okavango-sat","title":"Okavango vu par satellite","caption":"Image satellite du delta de l'Okavango","image_url":"https://commons.wikimedia.org/wiki/Special:Redirect/file:Okavango_Delta_in_northern_Botswana.jpg","source_url":"https://commons.wikimedia.org/wiki/File:Okavango_Delta_in_northern_Botswana.jpg","credit":"Envisat / Wikimedia Commons","license":"Voir la page de fichier","source_ids":["src-img-okavango-sat-v5"]},
    ],
    "sources": [
        {"id":"src-unesco-tsodilo-v5","category":1,"publisher":"UNESCO World Heritage Centre","title":"Tsodilo","url":"https://whc.unesco.org/en/list/1021/","language":"en","note":"Archéologie, peintures rupestres, profondeur temporelle et valeur culturelle."},
        {"id":"src-unesco-okavango-v5","category":1,"publisher":"UNESCO World Heritage Centre","title":"Okavango Delta","url":"https://whc.unesco.org/en/list/1432/","language":"en","note":"Hydrologie, biodiversité et inscription au patrimoine mondial."},
        {"id":"src-unesco-okavango-2025-v5","category":1,"publisher":"UNESCO World Heritage Committee","title":"Decision 47 COM 7B.43 – Okavango Delta","url":"https://whc.unesco.org/en/decisions/8767/","language":"en","note":"État de conservation 2025, gestion, eau, tourisme, incendies, conflits humains-faune et coopération régionale."},
        {"id":"src-unesco-bw-v5","category":1,"publisher":"UNESCO World Heritage Centre","title":"Botswana – World Heritage Convention","url":"https://whc.unesco.org/en/statesparties/bw","language":"en","note":"Deux biens inscrits et liste indicative des sites botswanais."},
        {"id":"src-unesco-community-v5","category":1,"publisher":"UNESCO World Heritage Centre","title":"Engaging local communities in the Okavango Delta","url":"https://whc.unesco.org/en/activities/984","language":"en","note":"Participation des communautés, conservation et moyens de subsistance."},
        {"id":"src-parliament-history-v5","category":1,"publisher":"Parliament of Botswana","title":"History of Parliament","url":"https://parliament.gov.bw/index.php?Itemid=163&id=6&option=com_content&view=article","language":"en","note":"Indépendance du 30 septembre 1966 et institutions."},
        {"id":"src-agc-history-v5","category":1,"publisher":"Attorney General's Chambers Botswana","title":"Our History","url":"https://www.agc.gov.bw/content/our-history","language":"en","note":"Institutions judiciaires et histoire administrative du protectorat."},
        {"id":"src-npc-kgotla-v5","category":1,"publisher":"Botswana National Planning Commission","title":"Governance, Peace and Security","url":"https://www.npc.gov.bw/governance-peace-and-security","language":"en","note":"Bogosi, kgotla, gouvernance et participation."},
        {"id":"src-gov-traditional-v5","category":1,"publisher":"Government of Botswana","title":"Ministry of Local Government and Traditional Affairs","url":"https://gov.bw/ministries/ministry-local-government-and-traditional-affairs","language":"en","note":"Institutions traditionnelles, autorités locales et administration."},
        {"id":"src-botswana-speaks-v5","category":1,"publisher":"Botswana Speaks","title":"About – Kgotla and consultation","url":"https://www.botswanaspeaks.gov.bw/about","language":"en","note":"Présentation institutionnelle de la consultation et du kgotla."},
        {"id":"src-gov-bw-v5","category":1,"publisher":"Government of Botswana","title":"About Our Country","url":"https://gov.bw/about-our-country","language":"en","note":"Superficie, frontières, climat, saisons, capitale et informations générales."},
        {"id":"src-evisa-bw-v5","category":1,"publisher":"Government of Botswana eVisa","title":"About Botswana","url":"https://www.evisa.gov.bw/","language":"en","note":"Géographie, climat, Kalahari et données générales."},
        {"id":"src-gov-maps-v5","category":1,"publisher":"Government of Botswana","title":"Maps and Geospatial Data","url":"https://gov.bw/land-management/maps-and-geospatial-data","language":"en","note":"Données cartographiques officielles et géospatiales."},
        {"id":"src-atlas-botswana-v5","category":1,"publisher":"Government of Botswana – Atlas","title":"Chapters 1–14: Geography and geology of Botswana","url":"https://www.atlas.gov.bw/html/chapAD.html","language":"en","note":"Géographie physique et humaine, géologie, sols et distribution de la population."},
        {"id":"src-debswana-history-v5","category":1,"publisher":"Debswana","title":"Our History","url":"https://www.debswana.com/our-history/","language":"en","note":"Découvertes d'Orapa et Jwaneng, création de Debswana et histoire minière."},
        {"id":"src-worldbank-bw-v5","category":1,"publisher":"World Bank","title":"Botswana country overview","url":"https://www.worldbank.org/en/country/botswana","language":"en","note":"Économie, développement, pauvreté, diversification et emploi."},
        {"id":"src-ilo-bw-v5","category":1,"publisher":"International Labour Organization","title":"Botswana country resources","url":"https://www.ilo.org/africa/countries-covered/botswana","language":"en","note":"Travail et emploi; à compléter par les études historiques spécialisées pour les migrations minières."},
        {"id":"src-un-indigenous-v5","category":1,"publisher":"United Nations","title":"Indigenous peoples resources","url":"https://www.un.org/development/desa/indigenouspeoples/","language":"en","note":"Cadre général sur les peuples autochtones; à croiser avec les sources régionales spécialisées."},
        {"id":"src-ub-v5","category":2,"publisher":"University of Botswana","title":"University of Botswana","url":"https://www.ub.bw/","language":"en","note":"Point d'entrée institutionnel pour les recherches universitaires botswanaises."},
        {"id":"src-met-mapungubwe-v5","category":2,"publisher":"The Metropolitan Museum of Art","title":"Mapungubwe (ca. 1050–1270)","url":"https://www.metmuseum.org/essays/mapungubwe-ca-1050-1270","language":"en","note":"Contexte archéologique régional et hiérarchisation sociale de Mapungubwe."},
        {"id":"src-bessie-head-v5","category":2,"publisher":"Bessie Head Heritage Trust","title":"Bessie Head resources","url":"https://bessieheadheritage.org/","language":"en","note":"Point d'entrée dédié à la vie et à l'œuvre de Bessie Head au Botswana."},
        {"id":"src-ramsar-okavango-v5","category":1,"publisher":"Ramsar / UNESCO","title":"Okavango and wetland communities","url":"https://whc.unesco.org/en/list/1432/","language":"en","note":"À croiser avec les dossiers Ramsar pour les communautés et les zones humides."},
        {"id":"src-okacom-v5","category":1,"publisher":"OKACOM","title":"Permanent Okavango River Basin Water Commission","url":"https://www.okacom.org/","language":"en","note":"Gouvernance transfrontalière du bassin Angola–Namibie–Botswana."},
        {"id":"src-img-flag-v5","category":3,"publisher":"Wikimedia Commons","title":"Flag of Botswana.png","url":"https://commons.wikimedia.org/wiki/File:Flag_of_Botswana.png","language":"en","note":"Image de drapeau; fichier signalé comme domaine public."},
        {"id":"src-img-tsodilo-v5","category":3,"publisher":"Wikimedia Commons","title":"Tsodilo Hills, Botswana (2625371308)","url":"https://commons.wikimedia.org/wiki/File:Tsodilo_Hills,_Botswana_(2625371308).jpg","language":"en","note":"Photo de Joachim Huber; CC BY-SA 2.0."},
        {"id":"src-img-okavango-v5","category":3,"publisher":"Wikimedia Commons","title":"Okavango Delta, Botswana","url":"https://commons.wikimedia.org/wiki/File:Okavango_Delta,_Botswana.jpg","language":"en","note":"Photo de Joachim Huber; CC BY-SA 2.0."},
        {"id":"src-img-gaborone-v5","category":3,"publisher":"Wikimedia Commons","title":"Gaborone.jpg","url":"https://commons.wikimedia.org/wiki/File:Gaborone.jpg","language":"en","note":"Photo de Theodorekanjo; vérifier la licence sur la page du fichier avant redistribution."},
        {"id":"src-img-okavango-sat-v5","category":3,"publisher":"Wikimedia Commons","title":"Okavango Delta in northern Botswana","url":"https://commons.wikimedia.org/wiki/File:Okavango_Delta_in_northern_Botswana.jpg","language":"en","note":"Image satellite; vérifier la licence indiquée sur la page du fichier."},
    ],
    "research_gaps": [
        {"id":"bw-gap-toutswe","title":"Toutswe : chronologie et interprétation","status":"research-gap","text":"Ne pas présenter une frontière politique fixe de Toutswe sans source archéologique spécifique."},
        {"id":"bw-gap-difaqane","title":"Difaqane","status":"disputed","text":"La causalité et l'ampleur des déplacements du XIXe siècle sont discutées; les récits simplificateurs doivent être évités."},
        {"id":"bw-gap-ethnonyms","title":"Ethnonymes et identités","status":"research-gap","text":"Les catégories coloniales, administratives et contemporaines ne coïncident pas toujours avec les identités locales historiques."},
        {"id":"bw-gap-migration-data","title":"Statistiques migratoires contemporaines","status":"research-gap","text":"Les routes contemporaines doivent être reliées à des statistiques de recensement ou d'immigration avant d'être quantifiées."},
    ],
}
