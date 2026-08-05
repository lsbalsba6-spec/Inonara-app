"""South Africa: extended timeline, economy and scientific library.

This module is additive. It does not overwrite the master country dossier.
All current indicators include an `as_of` field and an explicit source.
"""

SOUTH_AFRICA_TIMELINE_ECONOMY = {
    "interactive_timeline": [
        {"id": "za-it-001", "year": -3000000, "period": "human-origins", "title": "Sites fossilifères d'hominines", "summary": "Les ensembles de Sterkfontein, Swartkrans, Kromdraai et leurs environs documentent une très longue histoire de l'évolution humaine.", "status": "ready", "sourceIds": ["src-unesco-fossil-hominid-sites"]},
        {"id": "za-it-002", "year": -100000, "period": "human-origins", "title": "Innovations techniques et symboliques", "summary": "Plusieurs sites pléistocènes d'Afrique du Sud conservent des traces anciennes de comportements symboliques et de technologies complexes.", "status": "ready", "sourceIds": ["src-unesco-pleistocene-sites"]},
        {"id": "za-it-003", "year": 300, "period": "precolonial", "title": "Installations agricoles et métallurgiques", "summary": "Des communautés agricoles et métallurgiques de langues bantoues s'établissent progressivement dans l'est et le nord du territoire actuel.", "status": "provisional", "sourceIds": ["src-saho-precolonial", "src-saho-pre1500"]},
        {"id": "za-it-004", "year": 900, "period": "kingdoms", "title": "Essor de Mapungubwe", "summary": "Mapungubwe devient un centre politique et commercial majeur relié aux réseaux de l'Afrique australe et de l'océan Indien.", "status": "ready", "sourceIds": ["src-unesco-mapungubwe"]},
        {"id": "za-it-005", "year": 1488, "period": "maritime-contact", "title": "Passage de Bartolomeu Dias", "summary": "Le passage portugais autour du cap ouvre une nouvelle phase de contacts maritimes européens, sans constituer encore une colonisation du territoire.", "status": "provisional", "sourceIds": ["src-saho-precolonial"]},
        {"id": "za-it-006", "year": 1652, "period": "colonisation", "title": "Établissement de la VOC au Cap", "summary": "La VOC établit un poste permanent au Cap, point de départ d'une société coloniale fondée sur la dépossession, le travail contraint et l'esclavage.", "status": "ready", "sourceIds": ["src-saho-slavery-cape"]},
        {"id": "za-it-007", "year": 1795, "period": "colonisation", "title": "Première occupation britannique du Cap", "summary": "Le contrôle britannique du Cap inaugure une longue reconfiguration politique et militaire de la région.", "status": "provisional", "sourceIds": ["src-stapleton-military-history"]},
        {"id": "za-it-008", "year": 1816, "period": "kingdoms", "title": "Consolidation du royaume zoulou", "summary": "Le règne de Shaka est associé à une centralisation politique et militaire zouloue, dans un contexte régional complexe qui ne doit pas être réduit à un récit unique du Mfecane.", "status": "provisional", "sourceIds": ["src-saho-zulu-natal"]},
        {"id": "za-it-009", "year": 1860, "period": "migration", "title": "Début de l'engagisme indien au Natal", "summary": "Des travailleurs sous contrat arrivent d'Inde au Natal à partir de 1860; des migrants libres s'installent également.", "status": "ready", "sourceIds": ["src-saho-indian-indentured", "src-saho-indian-south-africans"]},
        {"id": "za-it-010", "year": 1867, "period": "industrialisation", "title": "Découverte de diamants", "summary": "L'exploitation diamantifère accélère l'industrialisation minière, l'urbanisation et les systèmes de travail migrant.", "status": "provisional", "sourceIds": ["src-worldbank-sa-overview"]},
        {"id": "za-it-011", "year": 1886, "period": "industrialisation", "title": "Ruée vers l'or du Witwatersrand", "summary": "L'or transforme Johannesburg et l'économie régionale, tout en renforçant les systèmes de travail migrant et les inégalités raciales.", "status": "provisional", "sourceIds": ["src-worldbank-sa-overview"]},
        {"id": "za-it-012", "year": 1910, "period": "union-segregation", "title": "Création de l'Union sud-africaine", "summary": "L'Union réunit quatre colonies dans un ordre politique excluant la majorité noire du pouvoir national.", "status": "ready", "sourceIds": ["src-saho-union-democracy"]},
        {"id": "za-it-013", "year": 1948, "period": "apartheid", "title": "Institutionnalisation de l'apartheid", "summary": "Le Parti national systématise la ségrégation raciale par des classifications, déplacements forcés et contrôles territoriaux.", "status": "ready", "sourceIds": ["src-saho-apartheid"]},
        {"id": "za-it-014", "year": 1961, "period": "apartheid", "title": "Proclamation de la République", "summary": "L'Afrique du Sud devient une république tout en maintenant l'apartheid.", "status": "ready", "sourceIds": ["src-constitution-1996"]},
        {"id": "za-it-015", "year": 1994, "period": "democracy", "title": "Premières élections nationales au suffrage universel", "summary": "Les élections d'avril 1994 ouvrent la période démocratique non raciale.", "status": "ready", "sourceIds": ["src-saho-elections"]},
        {"id": "za-it-016", "year": 1996, "period": "democracy", "title": "Adoption de la Constitution", "summary": "La Constitution de 1996 établit la loi suprême, une Déclaration des droits et le cadre institutionnel contemporain.", "status": "ready", "sourceIds": ["src-constitution-1996"]},
    ],
    "economy": {
        "editorialNote": "Les indicateurs contemporains sont datés. Ils ne doivent jamais être présentés comme permanents.",
        "historicalTransformations": [
            {"title": "Économies précoloniales", "text": "Agriculture, pastoralisme, métallurgie, chasse, artisanat et échanges régionaux coexistent selon les milieux et les périodes; Mapungubwe illustre l'intégration de l'intérieur aux réseaux de l'océan Indien.", "status": "ready", "sourceIds": ["src-unesco-mapungubwe"]},
            {"title": "Économie coloniale du Cap", "text": "La colonie du Cap s'appuie sur l'agriculture, les échanges maritimes, la dépossession foncière, le travail contraint et l'esclavage.", "status": "ready", "sourceIds": ["src-saho-slavery-cape"]},
            {"title": "Révolution minière", "text": "Les diamants puis l'or accélèrent l'urbanisation, les infrastructures ferroviaires et un système régional de travail migrant profondément inégalitaire.", "status": "provisional", "sourceIds": ["src-worldbank-sa-overview"]},
            {"title": "Industrialisation et économie de l'apartheid", "text": "L'industrie, les mines, l'agriculture commerciale et la finance se développent dans un ordre fondé sur la ségrégation spatiale et professionnelle.", "status": "provisional", "sourceIds": ["src-saho-apartheid"]},
            {"title": "Économie démocratique", "text": "Depuis 1994, l'économie reste diversifiée, mais les héritages de l'apartheid se retrouvent dans les inégalités de patrimoine, d'emploi, d'éducation et d'accès aux opportunités.", "status": "ready", "sourceIds": ["src-worldbank-inclusive-growth-2025"]},
        ],
        "sectors": [
            {"name": "Services financiers et services aux entreprises", "note": "Secteur structurant d'une économie diversifiée.", "sourceIds": ["src-worldbank-sa-overview"]},
            {"name": "Mines et transformation minérale", "note": "Platine, manganèse, or, charbon, chrome, diamants et autres minerais demeurent importants, sans résumer à eux seuls l'économie nationale.", "sourceIds": ["src-gov-sa-minerals"]},
            {"name": "Industrie manufacturière", "note": "Automobile, agroalimentaire, métallurgie, chimie et autres branches industrielles participent à la base productive.", "sourceIds": ["src-worldbank-sa-overview"]},
            {"name": "Agriculture", "note": "Secteur variable selon les années et les conditions climatiques, important pour l'alimentation, les exportations et l'emploi rural.", "sourceIds": ["src-statssa-gdp-2025"]},
            {"name": "Commerce, tourisme et logistique", "note": "Le pays joue un rôle majeur dans les transports et les chaînes logistiques régionales.", "sourceIds": ["src-worldbank-sa-overview"]},
        ],
        "currentIndicators": [
            {"label": "Croissance réelle du PIB en 2025", "value": "1,1 %", "asOf": "2025", "sourceIds": ["src-statssa-gdp-2025"]},
            {"label": "Population estimée à mi-2025", "value": "≈ 63,1 millions", "asOf": "2025", "sourceIds": ["src-statssa-key-stats-2026"]},
            {"label": "Taux de chômage officiel", "value": "32,7 %", "asOf": "T1 2026", "sourceIds": ["src-statssa-labour-2026"]},
        ],
        "challenges": [
            "Croissance durable et création d'emplois à grande échelle.",
            "Inégalités de revenus, de patrimoine et d'accès aux services.",
            "Fiabilité des infrastructures énergétiques, ferroviaires, portuaires et municipales.",
            "Transformation économique sans effacer les coûts sociaux et environnementaux de l'extraction.",
        ],
    },
    "scientificLibrary": [
        {"category": "Sources primaires et juridiques", "items": ["src-constitution-1996", "src-interim-constitution-1993"]},
        {"category": "Statistiques officielles", "items": ["src-statssa-census-2022", "src-statssa-gdp-2025", "src-statssa-labour-2026"]},
        {"category": "Archéologie et patrimoine", "items": ["src-unesco-fossil-hominid-sites", "src-unesco-pleistocene-sites", "src-unesco-mapungubwe"]},
        {"category": "Histoire politique et sociale", "items": ["src-saho-slavery-cape", "src-saho-apartheid", "src-saho-elections", "src-saho-union-democracy"]},
        {"category": "Économie et développement", "items": ["src-worldbank-sa-overview", "src-worldbank-inclusive-growth-2025", "src-gov-sa-minerals"]},
    ],
    "additionalSources": [
        {"id": "src-worldbank-sa-overview", "category": "C", "title": "South Africa — Country Overview", "publisher": "World Bank", "year": 2026, "url": "https://www.worldbank.org/ext/en/country/southafrica"},
        {"id": "src-worldbank-inclusive-growth-2025", "category": "B", "title": "Driving Inclusive Growth in South Africa", "publisher": "World Bank", "year": 2025, "url": "https://www.worldbank.org/en/country/southafrica/publication/driving-inclusive-growth-in-south-africa-quick-wins-with-competitive-markets-and-efficient-institutions"},
        {"id": "src-statssa-gdp-2025", "category": "A", "title": "GDP extends its gains in the fourth quarter", "publisher": "Statistics South Africa", "year": 2026, "url": "https://www.statssa.gov.za/?p=19291"},
        {"id": "src-statssa-key-stats-2026", "category": "A", "title": "Key Statistics", "publisher": "Statistics South Africa", "year": 2026, "url": "https://www.statssa.gov.za/"},
        {"id": "src-statssa-labour-2026", "category": "A", "title": "Work & Labour Force", "publisher": "Statistics South Africa", "year": 2026, "url": "https://www.statssa.gov.za/?id=1&page_id=737"},
        {"id": "src-gov-sa-minerals", "category": "A", "title": "Mineral resources and energy", "publisher": "Government of South Africa", "year": 2026, "url": "https://www.gov.za/about-sa/minerals"},
    ],
}
