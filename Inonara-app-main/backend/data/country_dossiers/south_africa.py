"""Curated South Africa country dossier for INONARA.

Editorial rules:
- Every factual section lists source IDs.
- `ready` means the cited source supports the precise claim.
- `provisional` marks interpretations, broad periodisation, or claims needing
  further specialist review before map-level precision is added.
- Empty geometry fields are intentional: no borders are invented.
"""

SOUTH_AFRICA_DOSSIER = {
    "id": "country-za-master-v1",
    "iso2": "ZA",
    "iso3": "ZAF",
    "slug": "south-africa",
    "name": {"fr": "Afrique du Sud", "en": "South Africa"},
    "region": {"id": "southern-africa", "fr": "Afrique australe", "en": "Southern Africa"},
    "status": "published-v1",
    "last_reviewed": "2026-07-29",
    "editorial_note": "Explorez l’Afrique du Sud à travers ses territoires, ses peuples, ses langues, ses transformations politiques et ses circulations humaines. Les sections signalées « À suivre » seront enrichies progressivement, sans présenter comme certaines des informations encore débattues.",
    "overview": {
        "summary": "L’Afrique du Sud est un État situé à l’extrémité australe du continent africain, bordé par les océans Atlantique et Indien et entourant entièrement le Lesotho. Son territoire réunit hauts plateaux, savanes, chaînes montagneuses, régions semi-arides, littoraux et écosystèmes d’une biodiversité exceptionnelle. Pretoria, Le Cap et Bloemfontein partagent différentes fonctions de capitale, tandis que Johannesburg constitue son principal centre économique. Pays majeur d’Afrique australe, il joue un rôle important dans les échanges, la diplomatie, la recherche, les arts et les institutions régionales. Son histoire humaine remonte à des périodes très anciennes et rassemble sociétés khoesan, communautés agricoles de langues bantoues, royaumes et chefferies, colonisations néerlandaise et britannique, esclavage au Cap, industrialisation minière, apartheid et transition vers la démocratie constitutionnelle à partir de 1994. La société contemporaine est profondément diverse par ses langues, ses religions, ses appartenances, ses territoires et ses mémoires. Ce dossier présente donc le pays dans son ensemble — géographie, population, institutions, économie, société, environnement et rôle régional — tout en approfondissant ses peuples, ses trajectoires historiques, ses figures, son patrimoine et ses cultures.",
        "population_census_2022": 62100000,
        "official_languages_count": 12,
        "capital_functions": [
            {"city": "Pretoria", "function": "exécutive"},
            {"city": "Le Cap", "function": "législative"},
            {"city": "Bloemfontein", "function": "judiciaire traditionnellement associée à la Cour suprême d'appel"},
        ],
        "history_chapters": [
        {
            "id": "za-history-deep-time",
            "title": "Des hominines aux premières sociétés humaines documentées",
            "period": "Plusieurs millions d’années – premier millénaire de notre ère",
            "summary": "Le territoire sud-africain conserve des archives majeures de l’évolution humaine. Les sites fossilifères du Gauteng et du Nord-Ouest documentent plusieurs espèces d’hominines, tandis que les sites pléistocènes du littoral et de l’intérieur montrent des innovations techniques et symboliques anciennes. Ces découvertes ne racontent pas une progression simple et linéaire : elles témoignent de populations diverses, de changements climatiques et de réseaux de mobilité dont les détails restent débattus.",
            "details": [
                "Les expressions modernes comme « berceau de l’humanité » sont utiles pour la médiation, mais elles ne signifient pas qu’un seul lieu aurait produit toute l’humanité moderne.",
                "Les sociétés san et khoekhoe possèdent des histoires distinctes. Les catégories actuelles ne doivent pas être projetées sans nuance sur toute la préhistoire.",
                "L’arrivée progressive de communautés agricoles et métallurgiques de langues bantoues transforme les économies et les paysages à partir des premiers siècles de notre ère, sans remplacer uniformément les populations déjà présentes."
            ],
            "status": "ready",
            "sources": ["src-unesco-fossil-hominid-sites", "src-unesco-pleistocene-sites", "src-saho-precolonial"]
        },
        {
            "id": "za-history-mapungubwe",
            "title": "Mapungubwe et les réseaux de l’Afrique australe",
            "period": "environ 900–1300",
            "summary": "Mapungubwe se développe près de la confluence du Limpopo et du Shashe. Son organisation sociale hiérarchisée, ses objets en or et ses importations témoignent d’un pouvoir régional intégré aux échanges reliant l’intérieur de l’Afrique australe aux ports de l’océan Indien. Le royaume ne doit pas être présenté comme l’ancêtre direct de l’État sud-africain moderne : il appartient à une histoire régionale qui traverse les frontières actuelles de l’Afrique du Sud, du Botswana et du Zimbabwe.",
            "details": [
                "Le paysage culturel classé par l’UNESCO documente la montée et le déclin d’un royaume entre environ 900 et 1300.",
                "Les frontières exactes de son autorité ne sont pas connues ; une aire d’influence approximative est plus honnête qu’un polygone politique précis.",
                "Son insertion dans les échanges d’or, d’ivoire, de verre et de textiles relie l’histoire intérieure du continent aux circuits de l’océan Indien."
            ],
            "status": "ready",
            "sources": ["src-unesco-mapungubwe", "src-saho-pre1500"]
        },
        {
            "id": "za-history-cape",
            "title": "Le Cap néerlandais : établissement, esclavage et dépossession",
            "period": "1652–1795",
            "summary": "En 1652, la VOC établit une station de ravitaillement au Cap. L’expansion foncière des colons provoque des conflits et des pertes territoriales pour des communautés khoekhoe. La société coloniale repose aussi sur l’importation de personnes réduites en esclavage depuis Madagascar, l’Inde, l’Asie du Sud-Est, le Mozambique et l’Afrique orientale. Ces déplacements ont profondément façonné les langues, les religions, les cuisines et les identités du Cap.",
            "details": [
                "La fondation coloniale n’est pas la « naissance » de l’Afrique du Sud : des sociétés complexes existaient bien avant 1652.",
                "Les personnes esclavisées ne formaient pas un groupe homogène et leurs routes d’arrivée doivent être séparées selon les périodes et les régions d’origine.",
                "Les catégories raciales ultérieures ont souvent effacé les identités précises des Khoekhoe, des San, des esclaves africains et asiatiques et de leurs descendants."
            ],
            "status": "ready",
            "sources": ["src-saho-slavery-cape", "src-saho-early-cape-slave-trade", "src-rama-forced-indian", "src-saho-dutch-settlement"]
        },
        {
            "id": "za-history-nineteenth",
            "title": "Le XIXe siècle : royaumes africains, expansion coloniale et nouvelles économies",
            "period": "1795–1910",
            "summary": "Le XIXe siècle combine l’expansion britannique, la formation et la transformation de polities africaines, le Grand Trek, la création de républiques boers, des guerres de frontière et l’intégration forcée de territoires. Les découvertes de diamants puis d’or accélèrent l’industrialisation, l’urbanisation et la mise en place d’un système de travail migrant contrôlé.",
            "details": [
                "Le royaume zoulou n’est qu’une des nombreuses formations politiques africaines de la période ; les histoires sotho, tswana, xhosa, ndebele, swazi, venda et tsonga doivent être traitées séparément.",
                "Le terme « Mfecane » fait l’objet de débats historiographiques : il ne doit pas servir d’explication unique à toutes les violences et migrations régionales.",
                "L’engagisme indien vers le Natal à partir de 1860 est un mouvement sous contrat et sous forte contrainte, distinct de la migration libre des commerçants et artisans indiens."
            ],
            "status": "provisional",
            "sources": ["src-saho-zulu-natal", "src-stapleton-military-history", "src-saho-indian-indentured", "src-saho-indian-south-africans"]
        },
        {
            "id": "za-history-union",
            "title": "Union, ségrégation et dépossession légale",
            "period": "1910–1948",
            "summary": "L’Union sud-africaine réunit quatre colonies en 1910, mais ne crée pas une démocratie inclusive. La majorité noire est exclue du pouvoir national. Les politiques foncières, urbaines et professionnelles institutionnalisent une ségrégation déjà ancienne et structurent un système de travail migrant au bénéfice des mines et de l’agriculture commerciale.",
            "details": [
                "L’Union est un compromis entre élites blanches britanniques et afrikaners, et non une union politique consentie par l’ensemble de la population.",
                "Les résistances prennent des formes syndicales, rurales, intellectuelles, religieuses et politiques ; elles ne commencent pas en 1948.",
                "Les catégories administratives imposées par l’État deviennent progressivement des instruments de contrôle social et territorial."
            ],
            "status": "ready",
            "sources": ["src-saho-union-democracy"]
        },
        {
            "id": "za-history-apartheid",
            "title": "Apartheid, résistances et déplacements forcés",
            "period": "1948–1994",
            "summary": "Après la victoire électorale du Parti national en 1948, l’apartheid systématise la classification raciale, la séparation résidentielle, l’éducation différenciée et la répression. Les « homelands » et les déplacements forcés cherchent à redessiner la citoyenneté et le territoire. Les résistances intérieures, les mobilisations syndicales, la lutte armée, les mouvements étudiants, les Églises, les sanctions et les solidarités internationales contribuent à l’affaiblissement du régime.",
            "details": [
                "L’apartheid ne se résume pas à la séparation des espaces publics : il organise l’accès à la terre, au travail, à la citoyenneté, à l’éducation et à la mobilité.",
                "Les oppositions sont plurielles : ANC, PAC, Black Consciousness, syndicats, organisations civiques, mouvements féminins et nombreuses structures locales.",
                "La fin juridique de l’apartheid ne supprime pas automatiquement les inégalités spatiales et économiques produites pendant plusieurs générations."
            ],
            "status": "ready",
            "sources": ["src-saho-apartheid", "src-unesco-robben-island", "src-saho-elections"]
        },
        {
            "id": "za-history-democracy",
            "title": "Transition négociée et démocratie constitutionnelle",
            "period": "1990–aujourd’hui",
            "summary": "La transition s’ouvre avec la légalisation des organisations interdites, la libération de prisonniers politiques et des négociations menées dans un contexte de violences persistantes. Les élections d’avril 1994 installent un gouvernement démocratique. La Constitution de 1996 établit un État fondé sur la dignité, l’égalité, les droits fondamentaux et le contrôle constitutionnel.",
            "details": [
                "1994 est une rupture politique majeure, mais pas un point de départ absolu : les institutions démocratiques résultent de décennies de luttes et de négociations.",
                "La Commission vérité et réconciliation constitue un mécanisme central mais controversé de la transition ; elle ne clôt pas tous les débats sur la justice et les réparations.",
                "Les enjeux contemporains comprennent les inégalités, le chômage, la terre, la qualité des services publics, les violences, les migrations régionales et la consolidation institutionnelle."
            ],
            "status": "ready",
            "sources": ["src-interim-constitution-1993", "src-constitution-1996", "src-saho-elections", "src-gov-government-system"]
        }
    ],
    "sources": ["src-statssa-census-2022", "src-constitution-1996", "src-sasl-2023", "src-gov-government-system"],
        "president_current": {
            "name": "Cyril Ramaphosa",
            "title": "Président de la République",
            "in_office_since": "2018-02-15",
            "current_as_of": "2026-07-29",
            "history_chapters": [
        {
            "id": "za-history-deep-time",
            "title": "Des hominines aux premières sociétés humaines documentées",
            "period": "Plusieurs millions d’années – premier millénaire de notre ère",
            "summary": "Le territoire sud-africain conserve des archives majeures de l’évolution humaine. Les sites fossilifères du Gauteng et du Nord-Ouest documentent plusieurs espèces d’hominines, tandis que les sites pléistocènes du littoral et de l’intérieur montrent des innovations techniques et symboliques anciennes. Ces découvertes ne racontent pas une progression simple et linéaire : elles témoignent de populations diverses, de changements climatiques et de réseaux de mobilité dont les détails restent débattus.",
            "details": [
                "Les expressions modernes comme « berceau de l’humanité » sont utiles pour la médiation, mais elles ne signifient pas qu’un seul lieu aurait produit toute l’humanité moderne.",
                "Les sociétés san et khoekhoe possèdent des histoires distinctes. Les catégories actuelles ne doivent pas être projetées sans nuance sur toute la préhistoire.",
                "L’arrivée progressive de communautés agricoles et métallurgiques de langues bantoues transforme les économies et les paysages à partir des premiers siècles de notre ère, sans remplacer uniformément les populations déjà présentes."
            ],
            "status": "ready",
            "sources": ["src-unesco-fossil-hominid-sites", "src-unesco-pleistocene-sites", "src-saho-precolonial"]
        },
        {
            "id": "za-history-mapungubwe",
            "title": "Mapungubwe et les réseaux de l’Afrique australe",
            "period": "environ 900–1300",
            "summary": "Mapungubwe se développe près de la confluence du Limpopo et du Shashe. Son organisation sociale hiérarchisée, ses objets en or et ses importations témoignent d’un pouvoir régional intégré aux échanges reliant l’intérieur de l’Afrique australe aux ports de l’océan Indien. Le royaume ne doit pas être présenté comme l’ancêtre direct de l’État sud-africain moderne : il appartient à une histoire régionale qui traverse les frontières actuelles de l’Afrique du Sud, du Botswana et du Zimbabwe.",
            "details": [
                "Le paysage culturel classé par l’UNESCO documente la montée et le déclin d’un royaume entre environ 900 et 1300.",
                "Les frontières exactes de son autorité ne sont pas connues ; une aire d’influence approximative est plus honnête qu’un polygone politique précis.",
                "Son insertion dans les échanges d’or, d’ivoire, de verre et de textiles relie l’histoire intérieure du continent aux circuits de l’océan Indien."
            ],
            "status": "ready",
            "sources": ["src-unesco-mapungubwe", "src-saho-pre1500"]
        },
        {
            "id": "za-history-cape",
            "title": "Le Cap néerlandais : établissement, esclavage et dépossession",
            "period": "1652–1795",
            "summary": "En 1652, la VOC établit une station de ravitaillement au Cap. L’expansion foncière des colons provoque des conflits et des pertes territoriales pour des communautés khoekhoe. La société coloniale repose aussi sur l’importation de personnes réduites en esclavage depuis Madagascar, l’Inde, l’Asie du Sud-Est, le Mozambique et l’Afrique orientale. Ces déplacements ont profondément façonné les langues, les religions, les cuisines et les identités du Cap.",
            "details": [
                "La fondation coloniale n’est pas la « naissance » de l’Afrique du Sud : des sociétés complexes existaient bien avant 1652.",
                "Les personnes esclavisées ne formaient pas un groupe homogène et leurs routes d’arrivée doivent être séparées selon les périodes et les régions d’origine.",
                "Les catégories raciales ultérieures ont souvent effacé les identités précises des Khoekhoe, des San, des esclaves africains et asiatiques et de leurs descendants."
            ],
            "status": "ready",
            "sources": ["src-saho-slavery-cape", "src-saho-early-cape-slave-trade", "src-rama-forced-indian", "src-saho-dutch-settlement"]
        },
        {
            "id": "za-history-nineteenth",
            "title": "Le XIXe siècle : royaumes africains, expansion coloniale et nouvelles économies",
            "period": "1795–1910",
            "summary": "Le XIXe siècle combine l’expansion britannique, la formation et la transformation de polities africaines, le Grand Trek, la création de républiques boers, des guerres de frontière et l’intégration forcée de territoires. Les découvertes de diamants puis d’or accélèrent l’industrialisation, l’urbanisation et la mise en place d’un système de travail migrant contrôlé.",
            "details": [
                "Le royaume zoulou n’est qu’une des nombreuses formations politiques africaines de la période ; les histoires sotho, tswana, xhosa, ndebele, swazi, venda et tsonga doivent être traitées séparément.",
                "Le terme « Mfecane » fait l’objet de débats historiographiques : il ne doit pas servir d’explication unique à toutes les violences et migrations régionales.",
                "L’engagisme indien vers le Natal à partir de 1860 est un mouvement sous contrat et sous forte contrainte, distinct de la migration libre des commerçants et artisans indiens."
            ],
            "status": "provisional",
            "sources": ["src-saho-zulu-natal", "src-stapleton-military-history", "src-saho-indian-indentured", "src-saho-indian-south-africans"]
        },
        {
            "id": "za-history-union",
            "title": "Union, ségrégation et dépossession légale",
            "period": "1910–1948",
            "summary": "L’Union sud-africaine réunit quatre colonies en 1910, mais ne crée pas une démocratie inclusive. La majorité noire est exclue du pouvoir national. Les politiques foncières, urbaines et professionnelles institutionnalisent une ségrégation déjà ancienne et structurent un système de travail migrant au bénéfice des mines et de l’agriculture commerciale.",
            "details": [
                "L’Union est un compromis entre élites blanches britanniques et afrikaners, et non une union politique consentie par l’ensemble de la population.",
                "Les résistances prennent des formes syndicales, rurales, intellectuelles, religieuses et politiques ; elles ne commencent pas en 1948.",
                "Les catégories administratives imposées par l’État deviennent progressivement des instruments de contrôle social et territorial."
            ],
            "status": "ready",
            "sources": ["src-saho-union-democracy"]
        },
        {
            "id": "za-history-apartheid",
            "title": "Apartheid, résistances et déplacements forcés",
            "period": "1948–1994",
            "summary": "Après la victoire électorale du Parti national en 1948, l’apartheid systématise la classification raciale, la séparation résidentielle, l’éducation différenciée et la répression. Les « homelands » et les déplacements forcés cherchent à redessiner la citoyenneté et le territoire. Les résistances intérieures, les mobilisations syndicales, la lutte armée, les mouvements étudiants, les Églises, les sanctions et les solidarités internationales contribuent à l’affaiblissement du régime.",
            "details": [
                "L’apartheid ne se résume pas à la séparation des espaces publics : il organise l’accès à la terre, au travail, à la citoyenneté, à l’éducation et à la mobilité.",
                "Les oppositions sont plurielles : ANC, PAC, Black Consciousness, syndicats, organisations civiques, mouvements féminins et nombreuses structures locales.",
                "La fin juridique de l’apartheid ne supprime pas automatiquement les inégalités spatiales et économiques produites pendant plusieurs générations."
            ],
            "status": "ready",
            "sources": ["src-saho-apartheid", "src-unesco-robben-island", "src-saho-elections"]
        },
        {
            "id": "za-history-democracy",
            "title": "Transition négociée et démocratie constitutionnelle",
            "period": "1990–aujourd’hui",
            "summary": "La transition s’ouvre avec la légalisation des organisations interdites, la libération de prisonniers politiques et des négociations menées dans un contexte de violences persistantes. Les élections d’avril 1994 installent un gouvernement démocratique. La Constitution de 1996 établit un État fondé sur la dignité, l’égalité, les droits fondamentaux et le contrôle constitutionnel.",
            "details": [
                "1994 est une rupture politique majeure, mais pas un point de départ absolu : les institutions démocratiques résultent de décennies de luttes et de négociations.",
                "La Commission vérité et réconciliation constitue un mécanisme central mais controversé de la transition ; elle ne clôt pas tous les débats sur la justice et les réparations.",
                "Les enjeux contemporains comprennent les inégalités, le chômage, la terre, la qualité des services publics, les violences, les migrations régionales et la consolidation institutionnelle."
            ],
            "status": "ready",
            "sources": ["src-interim-constitution-1993", "src-constitution-1996", "src-saho-elections", "src-gov-government-system"]
        }
    ],
    "sources": ["src-presidency-current"],
        },
        "national_flag": {
            "current_since": "1994-04-27",
            "designer": "Frederick G. Brownell",
            "history_chapters": [
        {
            "id": "za-history-deep-time",
            "title": "Des hominines aux premières sociétés humaines documentées",
            "period": "Plusieurs millions d’années – premier millénaire de notre ère",
            "summary": "Le territoire sud-africain conserve des archives majeures de l’évolution humaine. Les sites fossilifères du Gauteng et du Nord-Ouest documentent plusieurs espèces d’hominines, tandis que les sites pléistocènes du littoral et de l’intérieur montrent des innovations techniques et symboliques anciennes. Ces découvertes ne racontent pas une progression simple et linéaire : elles témoignent de populations diverses, de changements climatiques et de réseaux de mobilité dont les détails restent débattus.",
            "details": [
                "Les expressions modernes comme « berceau de l’humanité » sont utiles pour la médiation, mais elles ne signifient pas qu’un seul lieu aurait produit toute l’humanité moderne.",
                "Les sociétés san et khoekhoe possèdent des histoires distinctes. Les catégories actuelles ne doivent pas être projetées sans nuance sur toute la préhistoire.",
                "L’arrivée progressive de communautés agricoles et métallurgiques de langues bantoues transforme les économies et les paysages à partir des premiers siècles de notre ère, sans remplacer uniformément les populations déjà présentes."
            ],
            "status": "ready",
            "sources": ["src-unesco-fossil-hominid-sites", "src-unesco-pleistocene-sites", "src-saho-precolonial"]
        },
        {
            "id": "za-history-mapungubwe",
            "title": "Mapungubwe et les réseaux de l’Afrique australe",
            "period": "environ 900–1300",
            "summary": "Mapungubwe se développe près de la confluence du Limpopo et du Shashe. Son organisation sociale hiérarchisée, ses objets en or et ses importations témoignent d’un pouvoir régional intégré aux échanges reliant l’intérieur de l’Afrique australe aux ports de l’océan Indien. Le royaume ne doit pas être présenté comme l’ancêtre direct de l’État sud-africain moderne : il appartient à une histoire régionale qui traverse les frontières actuelles de l’Afrique du Sud, du Botswana et du Zimbabwe.",
            "details": [
                "Le paysage culturel classé par l’UNESCO documente la montée et le déclin d’un royaume entre environ 900 et 1300.",
                "Les frontières exactes de son autorité ne sont pas connues ; une aire d’influence approximative est plus honnête qu’un polygone politique précis.",
                "Son insertion dans les échanges d’or, d’ivoire, de verre et de textiles relie l’histoire intérieure du continent aux circuits de l’océan Indien."
            ],
            "status": "ready",
            "sources": ["src-unesco-mapungubwe", "src-saho-pre1500"]
        },
        {
            "id": "za-history-cape",
            "title": "Le Cap néerlandais : établissement, esclavage et dépossession",
            "period": "1652–1795",
            "summary": "En 1652, la VOC établit une station de ravitaillement au Cap. L’expansion foncière des colons provoque des conflits et des pertes territoriales pour des communautés khoekhoe. La société coloniale repose aussi sur l’importation de personnes réduites en esclavage depuis Madagascar, l’Inde, l’Asie du Sud-Est, le Mozambique et l’Afrique orientale. Ces déplacements ont profondément façonné les langues, les religions, les cuisines et les identités du Cap.",
            "details": [
                "La fondation coloniale n’est pas la « naissance » de l’Afrique du Sud : des sociétés complexes existaient bien avant 1652.",
                "Les personnes esclavisées ne formaient pas un groupe homogène et leurs routes d’arrivée doivent être séparées selon les périodes et les régions d’origine.",
                "Les catégories raciales ultérieures ont souvent effacé les identités précises des Khoekhoe, des San, des esclaves africains et asiatiques et de leurs descendants."
            ],
            "status": "ready",
            "sources": ["src-saho-slavery-cape", "src-saho-early-cape-slave-trade", "src-rama-forced-indian", "src-saho-dutch-settlement"]
        },
        {
            "id": "za-history-nineteenth",
            "title": "Le XIXe siècle : royaumes africains, expansion coloniale et nouvelles économies",
            "period": "1795–1910",
            "summary": "Le XIXe siècle combine l’expansion britannique, la formation et la transformation de polities africaines, le Grand Trek, la création de républiques boers, des guerres de frontière et l’intégration forcée de territoires. Les découvertes de diamants puis d’or accélèrent l’industrialisation, l’urbanisation et la mise en place d’un système de travail migrant contrôlé.",
            "details": [
                "Le royaume zoulou n’est qu’une des nombreuses formations politiques africaines de la période ; les histoires sotho, tswana, xhosa, ndebele, swazi, venda et tsonga doivent être traitées séparément.",
                "Le terme « Mfecane » fait l’objet de débats historiographiques : il ne doit pas servir d’explication unique à toutes les violences et migrations régionales.",
                "L’engagisme indien vers le Natal à partir de 1860 est un mouvement sous contrat et sous forte contrainte, distinct de la migration libre des commerçants et artisans indiens."
            ],
            "status": "provisional",
            "sources": ["src-saho-zulu-natal", "src-stapleton-military-history", "src-saho-indian-indentured", "src-saho-indian-south-africans"]
        },
        {
            "id": "za-history-union",
            "title": "Union, ségrégation et dépossession légale",
            "period": "1910–1948",
            "summary": "L’Union sud-africaine réunit quatre colonies en 1910, mais ne crée pas une démocratie inclusive. La majorité noire est exclue du pouvoir national. Les politiques foncières, urbaines et professionnelles institutionnalisent une ségrégation déjà ancienne et structurent un système de travail migrant au bénéfice des mines et de l’agriculture commerciale.",
            "details": [
                "L’Union est un compromis entre élites blanches britanniques et afrikaners, et non une union politique consentie par l’ensemble de la population.",
                "Les résistances prennent des formes syndicales, rurales, intellectuelles, religieuses et politiques ; elles ne commencent pas en 1948.",
                "Les catégories administratives imposées par l’État deviennent progressivement des instruments de contrôle social et territorial."
            ],
            "status": "ready",
            "sources": ["src-saho-union-democracy"]
        },
        {
            "id": "za-history-apartheid",
            "title": "Apartheid, résistances et déplacements forcés",
            "period": "1948–1994",
            "summary": "Après la victoire électorale du Parti national en 1948, l’apartheid systématise la classification raciale, la séparation résidentielle, l’éducation différenciée et la répression. Les « homelands » et les déplacements forcés cherchent à redessiner la citoyenneté et le territoire. Les résistances intérieures, les mobilisations syndicales, la lutte armée, les mouvements étudiants, les Églises, les sanctions et les solidarités internationales contribuent à l’affaiblissement du régime.",
            "details": [
                "L’apartheid ne se résume pas à la séparation des espaces publics : il organise l’accès à la terre, au travail, à la citoyenneté, à l’éducation et à la mobilité.",
                "Les oppositions sont plurielles : ANC, PAC, Black Consciousness, syndicats, organisations civiques, mouvements féminins et nombreuses structures locales.",
                "La fin juridique de l’apartheid ne supprime pas automatiquement les inégalités spatiales et économiques produites pendant plusieurs générations."
            ],
            "status": "ready",
            "sources": ["src-saho-apartheid", "src-unesco-robben-island", "src-saho-elections"]
        },
        {
            "id": "za-history-democracy",
            "title": "Transition négociée et démocratie constitutionnelle",
            "period": "1990–aujourd’hui",
            "summary": "La transition s’ouvre avec la légalisation des organisations interdites, la libération de prisonniers politiques et des négociations menées dans un contexte de violences persistantes. Les élections d’avril 1994 installent un gouvernement démocratique. La Constitution de 1996 établit un État fondé sur la dignité, l’égalité, les droits fondamentaux et le contrôle constitutionnel.",
            "details": [
                "1994 est une rupture politique majeure, mais pas un point de départ absolu : les institutions démocratiques résultent de décennies de luttes et de négociations.",
                "La Commission vérité et réconciliation constitue un mécanisme central mais controversé de la transition ; elle ne clôt pas tous les débats sur la justice et les réparations.",
                "Les enjeux contemporains comprennent les inégalités, le chômage, la terre, la qualité des services publics, les violences, les migrations régionales et la consolidation institutionnelle."
            ],
            "status": "ready",
            "sources": ["src-interim-constitution-1993", "src-constitution-1996", "src-saho-elections", "src-gov-government-system"]
        }
    ],
    "sources": ["src-gov-national-flag"],
        },
        "integrationStatus": "ready",
    },
    "geography": {
        "area_km2": 1221037,
        "coasts": ["océan Atlantique", "océan Indien"],
        "neighbours": ["Botswana", "Eswatini", "Lesotho", "Mozambique", "Namibie", "Zimbabwe"],
        "relief": [
            {"name": "Grand Escarpement", "note": "Rupture majeure de relief séparant une grande partie du plateau intérieur des plaines côtières."},
            {"name": "Drakensberg", "note": "Chaîne montagneuse de l’est et du sud-est, comprenant les plus hauts reliefs du pays."},
            {"name": "Plateau intérieur", "note": "Vaste ensemble d’altitude couvrant une grande partie de l’intérieur du territoire."},
            {"name": "Karoo", "note": "Ensemble de régions semi-arides du centre et du sud, comprenant notamment le Grand et le Petit Karoo."},
        ],
        "rivers": [
            {"name": "Orange / Gariep", "note": "Principal système fluvial du pays, coulant vers l’Atlantique."},
            {"name": "Limpopo", "note": "Fleuve du nord-est, partagé avec plusieurs États voisins."},
            {"name": "Vaal", "note": "Affluent majeur de l’Orange, important pour les zones urbaines et industrielles de l’intérieur."},
        ],
        "biomes": ["Savane", "Prairie", "Nama-Karoo", "Succulent Karoo", "Fynbos", "Forêt", "Fourré Albany", "Désert", "Végétation azonal"],
        "note": "Les frontières actuelles servent uniquement à la carte contemporaine. Elles ne doivent pas être projetées sur les royaumes, chefferies ou implantations des périodes anciennes.",
        "history_chapters": [
        {
            "id": "za-history-deep-time",
            "title": "Des hominines aux premières sociétés humaines documentées",
            "period": "Plusieurs millions d’années – premier millénaire de notre ère",
            "summary": "Le territoire sud-africain conserve des archives majeures de l’évolution humaine. Les sites fossilifères du Gauteng et du Nord-Ouest documentent plusieurs espèces d’hominines, tandis que les sites pléistocènes du littoral et de l’intérieur montrent des innovations techniques et symboliques anciennes. Ces découvertes ne racontent pas une progression simple et linéaire : elles témoignent de populations diverses, de changements climatiques et de réseaux de mobilité dont les détails restent débattus.",
            "details": [
                "Les expressions modernes comme « berceau de l’humanité » sont utiles pour la médiation, mais elles ne signifient pas qu’un seul lieu aurait produit toute l’humanité moderne.",
                "Les sociétés san et khoekhoe possèdent des histoires distinctes. Les catégories actuelles ne doivent pas être projetées sans nuance sur toute la préhistoire.",
                "L’arrivée progressive de communautés agricoles et métallurgiques de langues bantoues transforme les économies et les paysages à partir des premiers siècles de notre ère, sans remplacer uniformément les populations déjà présentes."
            ],
            "status": "ready",
            "sources": ["src-unesco-fossil-hominid-sites", "src-unesco-pleistocene-sites", "src-saho-precolonial"]
        },
        {
            "id": "za-history-mapungubwe",
            "title": "Mapungubwe et les réseaux de l’Afrique australe",
            "period": "environ 900–1300",
            "summary": "Mapungubwe se développe près de la confluence du Limpopo et du Shashe. Son organisation sociale hiérarchisée, ses objets en or et ses importations témoignent d’un pouvoir régional intégré aux échanges reliant l’intérieur de l’Afrique australe aux ports de l’océan Indien. Le royaume ne doit pas être présenté comme l’ancêtre direct de l’État sud-africain moderne : il appartient à une histoire régionale qui traverse les frontières actuelles de l’Afrique du Sud, du Botswana et du Zimbabwe.",
            "details": [
                "Le paysage culturel classé par l’UNESCO documente la montée et le déclin d’un royaume entre environ 900 et 1300.",
                "Les frontières exactes de son autorité ne sont pas connues ; une aire d’influence approximative est plus honnête qu’un polygone politique précis.",
                "Son insertion dans les échanges d’or, d’ivoire, de verre et de textiles relie l’histoire intérieure du continent aux circuits de l’océan Indien."
            ],
            "status": "ready",
            "sources": ["src-unesco-mapungubwe", "src-saho-pre1500"]
        },
        {
            "id": "za-history-cape",
            "title": "Le Cap néerlandais : établissement, esclavage et dépossession",
            "period": "1652–1795",
            "summary": "En 1652, la VOC établit une station de ravitaillement au Cap. L’expansion foncière des colons provoque des conflits et des pertes territoriales pour des communautés khoekhoe. La société coloniale repose aussi sur l’importation de personnes réduites en esclavage depuis Madagascar, l’Inde, l’Asie du Sud-Est, le Mozambique et l’Afrique orientale. Ces déplacements ont profondément façonné les langues, les religions, les cuisines et les identités du Cap.",
            "details": [
                "La fondation coloniale n’est pas la « naissance » de l’Afrique du Sud : des sociétés complexes existaient bien avant 1652.",
                "Les personnes esclavisées ne formaient pas un groupe homogène et leurs routes d’arrivée doivent être séparées selon les périodes et les régions d’origine.",
                "Les catégories raciales ultérieures ont souvent effacé les identités précises des Khoekhoe, des San, des esclaves africains et asiatiques et de leurs descendants."
            ],
            "status": "ready",
            "sources": ["src-saho-slavery-cape", "src-saho-early-cape-slave-trade", "src-rama-forced-indian", "src-saho-dutch-settlement"]
        },
        {
            "id": "za-history-nineteenth",
            "title": "Le XIXe siècle : royaumes africains, expansion coloniale et nouvelles économies",
            "period": "1795–1910",
            "summary": "Le XIXe siècle combine l’expansion britannique, la formation et la transformation de polities africaines, le Grand Trek, la création de républiques boers, des guerres de frontière et l’intégration forcée de territoires. Les découvertes de diamants puis d’or accélèrent l’industrialisation, l’urbanisation et la mise en place d’un système de travail migrant contrôlé.",
            "details": [
                "Le royaume zoulou n’est qu’une des nombreuses formations politiques africaines de la période ; les histoires sotho, tswana, xhosa, ndebele, swazi, venda et tsonga doivent être traitées séparément.",
                "Le terme « Mfecane » fait l’objet de débats historiographiques : il ne doit pas servir d’explication unique à toutes les violences et migrations régionales.",
                "L’engagisme indien vers le Natal à partir de 1860 est un mouvement sous contrat et sous forte contrainte, distinct de la migration libre des commerçants et artisans indiens."
            ],
            "status": "provisional",
            "sources": ["src-saho-zulu-natal", "src-stapleton-military-history", "src-saho-indian-indentured", "src-saho-indian-south-africans"]
        },
        {
            "id": "za-history-union",
            "title": "Union, ségrégation et dépossession légale",
            "period": "1910–1948",
            "summary": "L’Union sud-africaine réunit quatre colonies en 1910, mais ne crée pas une démocratie inclusive. La majorité noire est exclue du pouvoir national. Les politiques foncières, urbaines et professionnelles institutionnalisent une ségrégation déjà ancienne et structurent un système de travail migrant au bénéfice des mines et de l’agriculture commerciale.",
            "details": [
                "L’Union est un compromis entre élites blanches britanniques et afrikaners, et non une union politique consentie par l’ensemble de la population.",
                "Les résistances prennent des formes syndicales, rurales, intellectuelles, religieuses et politiques ; elles ne commencent pas en 1948.",
                "Les catégories administratives imposées par l’État deviennent progressivement des instruments de contrôle social et territorial."
            ],
            "status": "ready",
            "sources": ["src-saho-union-democracy"]
        },
        {
            "id": "za-history-apartheid",
            "title": "Apartheid, résistances et déplacements forcés",
            "period": "1948–1994",
            "summary": "Après la victoire électorale du Parti national en 1948, l’apartheid systématise la classification raciale, la séparation résidentielle, l’éducation différenciée et la répression. Les « homelands » et les déplacements forcés cherchent à redessiner la citoyenneté et le territoire. Les résistances intérieures, les mobilisations syndicales, la lutte armée, les mouvements étudiants, les Églises, les sanctions et les solidarités internationales contribuent à l’affaiblissement du régime.",
            "details": [
                "L’apartheid ne se résume pas à la séparation des espaces publics : il organise l’accès à la terre, au travail, à la citoyenneté, à l’éducation et à la mobilité.",
                "Les oppositions sont plurielles : ANC, PAC, Black Consciousness, syndicats, organisations civiques, mouvements féminins et nombreuses structures locales.",
                "La fin juridique de l’apartheid ne supprime pas automatiquement les inégalités spatiales et économiques produites pendant plusieurs générations."
            ],
            "status": "ready",
            "sources": ["src-saho-apartheid", "src-unesco-robben-island", "src-saho-elections"]
        },
        {
            "id": "za-history-democracy",
            "title": "Transition négociée et démocratie constitutionnelle",
            "period": "1990–aujourd’hui",
            "summary": "La transition s’ouvre avec la légalisation des organisations interdites, la libération de prisonniers politiques et des négociations menées dans un contexte de violences persistantes. Les élections d’avril 1994 installent un gouvernement démocratique. La Constitution de 1996 établit un État fondé sur la dignité, l’égalité, les droits fondamentaux et le contrôle constitutionnel.",
            "details": [
                "1994 est une rupture politique majeure, mais pas un point de départ absolu : les institutions démocratiques résultent de décennies de luttes et de négociations.",
                "La Commission vérité et réconciliation constitue un mécanisme central mais controversé de la transition ; elle ne clôt pas tous les débats sur la justice et les réparations.",
                "Les enjeux contemporains comprennent les inégalités, le chômage, la terre, la qualité des services publics, les violences, les migrations régionales et la consolidation institutionnelle."
            ],
            "status": "ready",
            "sources": ["src-interim-constitution-1993", "src-constitution-1996", "src-saho-elections", "src-gov-government-system"]
        }
    ],
    "sources": ["src-gov-geography", "src-sanbi-biomes"],
    },
    "institutions": {
        "government_form": "République constitutionnelle et démocratie parlementaire",
        "capital_functions": [
            {"city": "Pretoria / Tshwane", "function": "siège de l’exécutif"},
            {"city": "Le Cap", "function": "siège du Parlement"},
            {"city": "Bloemfontein", "function": "siège de la Cour suprême d’appel"},
            {"city": "Johannesburg", "function": "siège de la Cour constitutionnelle"},
        ],
        "provinces": [
            {"name": "Cap-Oriental", "capital": "Bhisho"},
            {"name": "État-Libre", "capital": "Bloemfontein"},
            {"name": "Gauteng", "capital": "Johannesburg"},
            {"name": "KwaZulu-Natal", "capital": "Pietermaritzburg"},
            {"name": "Limpopo", "capital": "Polokwane"},
            {"name": "Mpumalanga", "capital": "Mbombela"},
            {"name": "Cap-Nord", "capital": "Kimberley"},
            {"name": "Nord-Ouest", "capital": "Mahikeng"},
            {"name": "Cap-Occidental", "capital": "Le Cap"},
        ],
        "history_chapters": [
        {
            "id": "za-history-deep-time",
            "title": "Des hominines aux premières sociétés humaines documentées",
            "period": "Plusieurs millions d’années – premier millénaire de notre ère",
            "summary": "Le territoire sud-africain conserve des archives majeures de l’évolution humaine. Les sites fossilifères du Gauteng et du Nord-Ouest documentent plusieurs espèces d’hominines, tandis que les sites pléistocènes du littoral et de l’intérieur montrent des innovations techniques et symboliques anciennes. Ces découvertes ne racontent pas une progression simple et linéaire : elles témoignent de populations diverses, de changements climatiques et de réseaux de mobilité dont les détails restent débattus.",
            "details": [
                "Les expressions modernes comme « berceau de l’humanité » sont utiles pour la médiation, mais elles ne signifient pas qu’un seul lieu aurait produit toute l’humanité moderne.",
                "Les sociétés san et khoekhoe possèdent des histoires distinctes. Les catégories actuelles ne doivent pas être projetées sans nuance sur toute la préhistoire.",
                "L’arrivée progressive de communautés agricoles et métallurgiques de langues bantoues transforme les économies et les paysages à partir des premiers siècles de notre ère, sans remplacer uniformément les populations déjà présentes."
            ],
            "status": "ready",
            "sources": ["src-unesco-fossil-hominid-sites", "src-unesco-pleistocene-sites", "src-saho-precolonial"]
        },
        {
            "id": "za-history-mapungubwe",
            "title": "Mapungubwe et les réseaux de l’Afrique australe",
            "period": "environ 900–1300",
            "summary": "Mapungubwe se développe près de la confluence du Limpopo et du Shashe. Son organisation sociale hiérarchisée, ses objets en or et ses importations témoignent d’un pouvoir régional intégré aux échanges reliant l’intérieur de l’Afrique australe aux ports de l’océan Indien. Le royaume ne doit pas être présenté comme l’ancêtre direct de l’État sud-africain moderne : il appartient à une histoire régionale qui traverse les frontières actuelles de l’Afrique du Sud, du Botswana et du Zimbabwe.",
            "details": [
                "Le paysage culturel classé par l’UNESCO documente la montée et le déclin d’un royaume entre environ 900 et 1300.",
                "Les frontières exactes de son autorité ne sont pas connues ; une aire d’influence approximative est plus honnête qu’un polygone politique précis.",
                "Son insertion dans les échanges d’or, d’ivoire, de verre et de textiles relie l’histoire intérieure du continent aux circuits de l’océan Indien."
            ],
            "status": "ready",
            "sources": ["src-unesco-mapungubwe", "src-saho-pre1500"]
        },
        {
            "id": "za-history-cape",
            "title": "Le Cap néerlandais : établissement, esclavage et dépossession",
            "period": "1652–1795",
            "summary": "En 1652, la VOC établit une station de ravitaillement au Cap. L’expansion foncière des colons provoque des conflits et des pertes territoriales pour des communautés khoekhoe. La société coloniale repose aussi sur l’importation de personnes réduites en esclavage depuis Madagascar, l’Inde, l’Asie du Sud-Est, le Mozambique et l’Afrique orientale. Ces déplacements ont profondément façonné les langues, les religions, les cuisines et les identités du Cap.",
            "details": [
                "La fondation coloniale n’est pas la « naissance » de l’Afrique du Sud : des sociétés complexes existaient bien avant 1652.",
                "Les personnes esclavisées ne formaient pas un groupe homogène et leurs routes d’arrivée doivent être séparées selon les périodes et les régions d’origine.",
                "Les catégories raciales ultérieures ont souvent effacé les identités précises des Khoekhoe, des San, des esclaves africains et asiatiques et de leurs descendants."
            ],
            "status": "ready",
            "sources": ["src-saho-slavery-cape", "src-saho-early-cape-slave-trade", "src-rama-forced-indian", "src-saho-dutch-settlement"]
        },
        {
            "id": "za-history-nineteenth",
            "title": "Le XIXe siècle : royaumes africains, expansion coloniale et nouvelles économies",
            "period": "1795–1910",
            "summary": "Le XIXe siècle combine l’expansion britannique, la formation et la transformation de polities africaines, le Grand Trek, la création de républiques boers, des guerres de frontière et l’intégration forcée de territoires. Les découvertes de diamants puis d’or accélèrent l’industrialisation, l’urbanisation et la mise en place d’un système de travail migrant contrôlé.",
            "details": [
                "Le royaume zoulou n’est qu’une des nombreuses formations politiques africaines de la période ; les histoires sotho, tswana, xhosa, ndebele, swazi, venda et tsonga doivent être traitées séparément.",
                "Le terme « Mfecane » fait l’objet de débats historiographiques : il ne doit pas servir d’explication unique à toutes les violences et migrations régionales.",
                "L’engagisme indien vers le Natal à partir de 1860 est un mouvement sous contrat et sous forte contrainte, distinct de la migration libre des commerçants et artisans indiens."
            ],
            "status": "provisional",
            "sources": ["src-saho-zulu-natal", "src-stapleton-military-history", "src-saho-indian-indentured", "src-saho-indian-south-africans"]
        },
        {
            "id": "za-history-union",
            "title": "Union, ségrégation et dépossession légale",
            "period": "1910–1948",
            "summary": "L’Union sud-africaine réunit quatre colonies en 1910, mais ne crée pas une démocratie inclusive. La majorité noire est exclue du pouvoir national. Les politiques foncières, urbaines et professionnelles institutionnalisent une ségrégation déjà ancienne et structurent un système de travail migrant au bénéfice des mines et de l’agriculture commerciale.",
            "details": [
                "L’Union est un compromis entre élites blanches britanniques et afrikaners, et non une union politique consentie par l’ensemble de la population.",
                "Les résistances prennent des formes syndicales, rurales, intellectuelles, religieuses et politiques ; elles ne commencent pas en 1948.",
                "Les catégories administratives imposées par l’État deviennent progressivement des instruments de contrôle social et territorial."
            ],
            "status": "ready",
            "sources": ["src-saho-union-democracy"]
        },
        {
            "id": "za-history-apartheid",
            "title": "Apartheid, résistances et déplacements forcés",
            "period": "1948–1994",
            "summary": "Après la victoire électorale du Parti national en 1948, l’apartheid systématise la classification raciale, la séparation résidentielle, l’éducation différenciée et la répression. Les « homelands » et les déplacements forcés cherchent à redessiner la citoyenneté et le territoire. Les résistances intérieures, les mobilisations syndicales, la lutte armée, les mouvements étudiants, les Églises, les sanctions et les solidarités internationales contribuent à l’affaiblissement du régime.",
            "details": [
                "L’apartheid ne se résume pas à la séparation des espaces publics : il organise l’accès à la terre, au travail, à la citoyenneté, à l’éducation et à la mobilité.",
                "Les oppositions sont plurielles : ANC, PAC, Black Consciousness, syndicats, organisations civiques, mouvements féminins et nombreuses structures locales.",
                "La fin juridique de l’apartheid ne supprime pas automatiquement les inégalités spatiales et économiques produites pendant plusieurs générations."
            ],
            "status": "ready",
            "sources": ["src-saho-apartheid", "src-unesco-robben-island", "src-saho-elections"]
        },
        {
            "id": "za-history-democracy",
            "title": "Transition négociée et démocratie constitutionnelle",
            "period": "1990–aujourd’hui",
            "summary": "La transition s’ouvre avec la légalisation des organisations interdites, la libération de prisonniers politiques et des négociations menées dans un contexte de violences persistantes. Les élections d’avril 1994 installent un gouvernement démocratique. La Constitution de 1996 établit un État fondé sur la dignité, l’égalité, les droits fondamentaux et le contrôle constitutionnel.",
            "details": [
                "1994 est une rupture politique majeure, mais pas un point de départ absolu : les institutions démocratiques résultent de décennies de luttes et de négociations.",
                "La Commission vérité et réconciliation constitue un mécanisme central mais controversé de la transition ; elle ne clôt pas tous les débats sur la justice et les réparations.",
                "Les enjeux contemporains comprennent les inégalités, le chômage, la terre, la qualité des services publics, les violences, les migrations régionales et la consolidation institutionnelle."
            ],
            "status": "ready",
            "sources": ["src-interim-constitution-1993", "src-constitution-1996", "src-saho-elections", "src-gov-government-system"]
        }
    ],
    "sources": ["src-gov-government-system", "src-gov-geography"],
    },
    "map_visuals": {
        "cities": [
            {"name": "Pretoria / Tshwane", "coordinates": [28.2293, -25.7479], "kind": "executive-capital", "group": "national"},
            {"name": "Le Cap", "coordinates": [18.4241, -33.9249], "kind": "legislative-capital", "group": "national"},
            {"name": "Bloemfontein", "coordinates": [26.2041, -29.0852], "kind": "judicial-capital", "group": "national"},
            {"name": "Bhisho", "coordinates": [27.4380, -32.8499], "kind": "provincial-capital", "group": "province"},
            {"name": "Johannesburg", "coordinates": [28.0473, -26.2041], "kind": "provincial-capital", "group": "province"},
            {"name": "Pietermaritzburg", "coordinates": [30.3928, -29.6006], "kind": "provincial-capital", "group": "province"},
            {"name": "Polokwane", "coordinates": [29.4689, -23.9045], "kind": "provincial-capital", "group": "province"},
            {"name": "Mbombela", "coordinates": [30.9703, -25.4753], "kind": "provincial-capital", "group": "province"},
            {"name": "Kimberley", "coordinates": [24.7652, -28.7282], "kind": "provincial-capital", "group": "province"},
            {"name": "Mahikeng", "coordinates": [25.6442, -25.8652], "kind": "provincial-capital", "group": "province"},
            {"name": "Durban", "coordinates": [31.0218, -29.8587], "kind": "major-city", "group": "major"},
            {"name": "Gqeberha", "coordinates": [25.6022, -33.9608], "kind": "major-city", "group": "major"},
            {"name": "East London", "coordinates": [27.9116, -33.0292], "kind": "major-city", "group": "major"},
            {"name": "Soweto", "coordinates": [27.8585, -26.2485], "kind": "major-city", "group": "major"},
            {"name": "Rustenburg", "coordinates": [27.2421, -25.6676], "kind": "major-city", "group": "major"},
        ],
        "migration_routes": [
            {"id": "za-route-voc-settlement", "label": "Installation de la VOC au Cap", "origin": "Pays-Bas", "origin_coordinates": [4.9, 52.37], "destination": "Le Cap", "destination_coordinates": [18.4241, -33.9249], "start": 1652, "end": 1795, "type": "colonial-settlement", "status": "ready", "sources": ["src-saho-dutch-settlement"]},
            {"id": "za-route-slavery-madagascar", "label": "Déportations esclavagistes depuis Madagascar", "origin": "Madagascar", "origin_coordinates": [46.7, -19.0], "destination": "Colonie du Cap", "destination_coordinates": [18.4241, -33.9249], "start": 1658, "end": 1807, "type": "forced", "status": "ready", "sources": ["src-saho-early-cape-slave-trade"]},
            {"id": "za-route-slavery-india", "label": "Déportations esclavagistes depuis le sous-continent indien", "origin": "Sous-continent indien", "origin_coordinates": [78.0, 20.5], "destination": "Colonie du Cap", "destination_coordinates": [18.4241, -33.9249], "start": 1658, "end": 1807, "type": "forced", "status": "ready", "sources": ["src-rama-forced-indian", "src-saho-early-cape-slave-trade"]},
            {"id": "za-route-slavery-seasia", "label": "Déportations esclavagistes depuis l’Asie du Sud-Est", "origin": "Asie du Sud-Est / Indonésie", "origin_coordinates": [107.6, -6.2], "destination": "Colonie du Cap", "destination_coordinates": [18.4241, -33.9249], "start": 1658, "end": 1807, "type": "forced", "status": "ready", "sources": ["src-saho-early-cape-slave-trade"]},
            {"id": "za-route-slavery-east-africa", "label": "Déportations esclavagistes depuis l’Afrique orientale et le Mozambique", "origin": "Mozambique et côte est-africaine", "origin_coordinates": [35.5, -18.5], "destination": "Colonie du Cap", "destination_coordinates": [18.4241, -33.9249], "start": 1750, "end": 1807, "type": "forced", "status": "ready", "sources": ["src-saho-early-cape-slave-trade"]},
            {"id": "za-route-british-settlers", "label": "Installation des colons britanniques de 1820", "origin": "Royaume-Uni", "origin_coordinates": [-1.5, 52.5], "destination": "Cap-Oriental", "destination_coordinates": [26.5, -33.3], "start": 1820, "end": 1820, "type": "colonial-settlement", "status": "ready", "sources": ["src-saho-1820-settlers"]},
            {"id": "za-route-indian-indenture", "label": "Travail sous contrat indien vers le Natal", "origin": "Inde", "origin_coordinates": [80.3, 15.0], "destination": "Natal / Durban", "destination_coordinates": [31.0218, -29.8587], "start": 1860, "end": 1911, "type": "coerced-labour", "status": "ready", "sources": ["src-saho-indian-indentured", "src-saho-ship-list"]},
        ],
        "note": "Cette carte montre uniquement des routes documentées et bornées dans le temps. Elle ne transforme pas l’existence actuelle d’une communauté en migration encore active.",
    },
    "flag_history": [
        {"id": "flag-1910-1928", "start": 1910, "end": 1928, "label": "Union sud-africaine : symboles britanniques", "variant": "union-jack", "note": "Avant l’adoption d’un drapeau national propre en 1928, les symboles britanniques occupaient une place officielle centrale.", "status": "provisional", "sources": ["src-saho-flag-history"]},
        {"id": "flag-1928-1994", "start": 1928, "end": 1994, "label": "Drapeau de l’Union puis de la République", "variant": "1928", "note": "Utilisé du 31 mai 1928 jusqu’au 26 avril 1994; il est aujourd’hui associé à l’ordre colonial, ségrégationniste et à l’apartheid.", "status": "ready", "sources": ["src-saho-flag-1994"]},
        {"id": "flag-1994-current", "start": 1994, "end": None, "label": "Drapeau démocratique actuel", "variant": "current", "note": "Adopté le 27 avril 1994, jour des premières élections nationales au suffrage universel.", "status": "ready", "sources": ["src-gov-national-flag"]},
    ],
    "timeline": [
        {"id": "za-tl-001", "start": -3000000, "end": -200000, "label": "Longue histoire des hominines", "text": "Les sites fossilifères d'Afrique du Sud documentent plusieurs étapes majeures de l'évolution humaine. Les dates exactes varient selon les sites et les découvertes.", "status": "ready", "sources": ["src-unesco-fossil-hominid-sites"]},
        {"id": "za-tl-002", "start": -100000, "end": -70000, "label": "Comportements humains modernes", "text": "Des sites pléistocènes sud-africains, dont Blombos, Diepkloof, Pinnacle Point et Sibudu, conservent des traces importantes de comportements symboliques et techniques anciens.", "status": "ready", "sources": ["src-unesco-pleistocene-sites"]},
        {"id": "za-tl-003", "start": -2300, "end": 200, "label": "Pastoralisme khoekhoe et sociétés san", "text": "Les populations san de chasseurs-cueilleurs sont anciennes dans la région; l'élevage se diffuse ensuite parmi des groupes khoekhoe. Les chronologies et identités ne doivent pas être réduites à une seule migration.", "status": "provisional", "sources": ["src-saho-khoisan", "src-saho-precolonial"]},
        {"id": "za-tl-004", "start": 200, "end": 1000, "label": "Agriculteurs de langues bantoues et âge du fer", "text": "Des communautés agricoles et métallurgiques de langues bantoues s'établissent progressivement dans l'est et le nord de l'actuelle Afrique du Sud. Il s'agit d'un processus pluriséculaire, non d'une vague unique.", "status": "provisional", "sources": ["src-saho-precolonial", "src-saho-pre1500"]},
        {"id": "za-tl-005", "start": 900, "end": 1300, "label": "Mapungubwe", "text": "Le paysage culturel de Mapungubwe témoigne de l'essor puis du déclin d'un royaume indigène d'Afrique australe entre environ 900 et 1300, intégré aux échanges régionaux et de l'océan Indien.", "status": "ready", "sources": ["src-unesco-mapungubwe"]},
        {"id": "za-tl-006", "start": 1652, "end": 1795, "label": "Établissement VOC et société esclavagiste du Cap", "text": "L'installation de la Compagnie néerlandaise des Indes orientales au Cap en 1652 s'accompagne de dépossession, travail forcé et importation d'esclaves d'Afrique et d'Asie.", "status": "ready", "sources": ["src-saho-slavery-cape", "src-rama-forced-indian"]},
        {"id": "za-tl-007", "start": 1795, "end": 1910, "label": "Expansion coloniale britannique, républiques boers et conquêtes", "text": "Le Cap passe sous contrôle britannique; le XIXe siècle est marqué par des guerres de frontière, la formation de polities africaines et boers, les découvertes minières et la guerre sud-africaine de 1899-1902.", "status": "provisional", "sources": ["src-saho-zulu-natal", "src-stapleton-military-history"]},
        {"id": "za-tl-008", "start": 1860, "end": 1911, "label": "Travail sous contrat indien au Natal", "text": "Près de 152 184 travailleurs sous contrat arrivent d'Inde au Natal entre 1860 et 1911; des migrants libres, dits « passenger Indians », s'installent aussi comme commerçants et artisans.", "status": "ready", "sources": ["src-saho-indian-indentured", "src-saho-indian-south-africans"]},
        {"id": "za-tl-009", "start": 1910, "end": 1948, "label": "Union et ségrégation", "text": "L'Union sud-africaine réunit en 1910 les colonies du Cap, du Natal, du Transvaal et de l'Orange, dans un système politique excluant la majorité noire du pouvoir national.", "status": "ready", "sources": ["src-saho-union-democracy"]},
        {"id": "za-tl-010", "start": 1948, "end": 1994, "label": "Apartheid", "text": "À partir de 1948, le gouvernement du Parti national systématise la ségrégation raciale sous le nom d'apartheid, avec classifications raciales, déplacements forcés, contrôle territorial et répression politique.", "status": "ready", "sources": ["src-saho-apartheid"]},
        {"id": "za-tl-011", "start": 1990, "end": 1994, "label": "Négociations et transition", "text": "La légalisation des organisations interdites, la libération de prisonniers politiques et les négociations multipartites ouvrent la voie aux premières élections nationales au suffrage universel en avril 1994.", "status": "ready", "sources": ["src-saho-elections", "src-interim-constitution-1993"]},
        {"id": "za-tl-012", "start": 1994, "end": None, "label": "Démocratie constitutionnelle", "text": "Depuis 1994, l'Afrique du Sud est une démocratie constitutionnelle. La Constitution de 1996, entrée en vigueur en 1997, est la loi suprême et comprend une Déclaration des droits.", "status": "ready", "sources": ["src-constitution-1996", "src-gov-government-system"]},
    ],
    "polities": [
        {"id": "polity-mapungubwe", "name": "Royaume de Mapungubwe", "start": 900, "end": 1300, "kind": "kingdom", "geometry": None, "mapping": "site et aire d'influence approximative seulement", "status": "ready", "sources": ["src-unesco-mapungubwe"]},
        {"id": "polity-zulu", "name": "Royaume zoulou", "start": 1816, "end": 1897, "kind": "kingdom", "geometry": None, "mapping": "frontières variables; recherche géohistorique nécessaire", "status": "provisional", "sources": ["src-saho-zulu-natal"]},
        {"id": "polity-cape-colony", "name": "Colonie du Cap", "start": 1652, "end": 1910, "kind": "colony", "geometry": None, "mapping": "plusieurs phases néerlandaises et britanniques à séparer avant cartographie", "status": "provisional", "sources": ["src-saho-slavery-cape", "src-saho-union-democracy"]},
        {"id": "polity-union-sa", "name": "Union sud-africaine", "start": 1910, "end": 1961, "kind": "dominion", "geometry": None, "mapping": "frontières de l'État moderne, avec statuts internes distincts", "status": "ready", "sources": ["src-saho-union-democracy"]},
        {"id": "polity-republic-sa", "name": "République d'Afrique du Sud", "start": 1961, "end": None, "kind": "state", "geometry": None, "mapping": "État moderne; changement constitutionnel majeur en 1994-1997", "status": "ready", "sources": ["src-constitution-1996"]},
    ],
    "peoples": [
        {
            "id": "people-san-south-africa",
            "name": "San",
            "category": "ensemble de communautés",
            "regions": ["Northern Cape", "Kalahari transfrontalier", "autres implantations dispersées"],
            "languages": "Plusieurs langues distinctes, dont certaines gravement menacées ; « san » ne désigne pas une langue unique.",
            "history": "Des communautés de chasseurs-cueilleurs ont occupé l’Afrique australe pendant des millénaires. Les populations aujourd’hui regroupées sous le terme San possèdent des histoires, des noms et des langues différents.",
            "caution": "Éviter l’ancien exonyme colonial « Bushmen » et ne pas présenter les San comme un groupe homogène ou figé hors de la modernité.",
            "status": "ready",
            "sources": ["src-saho-san", "src-unesco-khomani"]
        },
        {
            "id": "people-khoekhoe-south-africa",
            "name": "Khoekhoe",
            "category": "communautés pastorales historiques et contemporaines",
            "regions": ["Cap-Occidental", "Cap-Nord", "Namaqualand", "espaces transfrontaliers"],
            "languages": "Les langues khoekhoe appartiennent à plusieurs traditions linguistiques ; certaines communautés ont aussi adopté l’afrikaans ou d’autres langues.",
            "history": "Des communautés pastorales khoekhoe étaient établies dans l’ouest et le sud de l’Afrique australe avant la colonisation européenne. Elles ont subi guerres, épidémies, dépossession foncière, travail contraint et reclassification administrative.",
            "caution": "Le terme composite « Khoisan » est utile dans certains contextes politiques ou académiques, mais il ne doit pas effacer la distinction entre Khoekhoe, San et communautés particulières.",
            "status": "ready",
            "sources": ["src-saho-khoisan", "src-saho-khoisan-identity", "src-unesco-richtersveld"]
        },
        {
            "id": "people-nguni-south-africa",
            "name": "Communautés nguni",
            "category": "ensemble linguistique et historique",
            "regions": ["KwaZulu-Natal", "Cap-Oriental", "Mpumalanga", "Gauteng", "Eswatini et régions voisines"],
            "languages": "isiZulu, isiXhosa, siSwati et isiNdebele, entre autres variétés et formes locales.",
            "history": "La catégorie nguni regroupe des communautés apparentées linguistiquement, mais elle ne constitue ni un peuple politique unique ni une trajectoire historique uniforme. Les histoires zouloue, xhosa, swazi et ndebele doivent être traitées séparément.",
            "caution": "Ne pas transformer une classification linguistique en identité ethnique unique et immuable.",
            "status": "ready",
            "sources": ["src-gov-people", "src-saho-xhosa", "src-saho-precolonial"]
        },
        {
            "id": "people-sotho-tswana-south-africa",
            "name": "Communautés sotho-tswana",
            "category": "ensemble linguistique et historique",
            "regions": ["Free State", "Gauteng", "Nord-Ouest", "Limpopo", "Lesotho et Botswana"],
            "languages": "Sesotho, Setswana et Sepedi, avec de nombreuses variétés régionales.",
            "history": "Les sociétés sotho-tswana ont développé des établissements, chefferies et royaumes aux histoires distinctes. Les circulations entre l’actuelle Afrique du Sud, le Lesotho et le Botswana précèdent les frontières nationales.",
            "caution": "Basotho, Batswana, Bapedi et autres communautés ne sont pas interchangeables.",
            "status": "ready",
            "sources": ["src-gov-people", "src-saho-sotho", "src-saho-tswana", "src-saho-precolonial"]
        },
        {
            "id": "people-tsonga-south-africa",
            "name": "Communautés tsonga",
            "category": "communautés ethnolinguistiques transfrontalières",
            "regions": ["Limpopo", "Mpumalanga", "Mozambique et Eswatini"],
            "languages": "xitsonga et variétés apparentées.",
            "history": "Les communautés tsonga ont des histoires liées aux réseaux politiques, commerciaux et migratoires de l’est de l’Afrique australe. Leur présence ne se laisse pas enfermer dans les frontières contemporaines.",
            "caution": "Les termes Tsonga et Shangaan ont des histoires et des usages différents ; ils ne doivent pas être employés automatiquement comme synonymes.",
            "status": "provisional",
            "sources": ["src-gov-people"]
        },
        {
            "id": "people-venda-south-africa",
            "name": "Communautés venda",
            "category": "communautés ethnolinguistiques et histoires politiques régionales",
            "regions": ["Limpopo", "régions voisines du Zimbabwe"],
            "languages": "tshivenda.",
            "history": "Les histoires venda sont liées au nord du Limpopo, aux paysages de pierre, aux échanges régionaux et à plusieurs formations politiques. Elles ne se réduisent pas au homeland créé sous l’apartheid.",
            "caution": "Distinguer les histoires précoloniales, les structures de chefferie et les découpages administratifs imposés au XXe siècle.",
            "status": "provisional",
            "sources": ["src-gov-people", "src-saho-precolonial"]
        },
        {
            "id": "people-indian-south-africans",
            "name": "Sud-Africains d’ascendance indienne",
            "category": "communautés issues de plusieurs circulations",
            "regions": ["KwaZulu-Natal", "Gauteng", "Cap-Occidental et autres centres urbains"],
            "languages": "anglais, langues sud-africaines et langues héritées du sous-continent indien selon les familles et les générations.",
            "history": "Les communautés sont issues notamment de l’engagisme vers le Natal à partir de 1860, de migrations de commerçants et d’artisans, puis de mobilités familiales et professionnelles. Ces trajectoires ne doivent pas être fusionnées en une migration unique.",
            "caution": "Distinguer engagisme sous contrat, migrations libres et identités contemporaines.",
            "status": "ready",
            "sources": ["src-saho-indian-indentured", "src-saho-indian-south-africans", "src-rama-forced-indian"]
        },
        {
            "id": "people-coloured-south-africa",
            "name": "Communautés classées « Coloured » / métisses",
            "category": "catégorie historique, juridique et identitaire hétérogène",
            "regions": ["Cap-Occidental", "Cap-Nord", "autres régions urbaines"],
            "languages": "afrikaans, anglais et autres langues selon les communautés.",
            "history": "La catégorie a été façonnée par l’esclavage au Cap, les unions et filiations multiples, les classifications coloniales puis l’apartheid. Certaines personnes la revendiquent comme identité ; d’autres la contestent ou utilisent des identifications plus précises.",
            "caution": "Ne jamais présenter cette catégorie comme une origine biologique ou culturelle unique.",
            "status": "provisional",
            "sources": ["src-adhikari-coloured-identity", "src-saho-slavery-cape"]
        },
        {
            "id": "people-afrikaners-european-south-africa",
            "name": "Afrikaners et autres communautés d’ascendance européenne",
            "category": "communautés issues de colonisations et migrations distinctes",
            "regions": ["ensemble du pays, avec histoires régionales différentes"],
            "languages": "afrikaans, anglais, portugais, allemand, grec et autres langues selon les trajectoires.",
            "history": "Les populations d’ascendance européenne ne forment pas un bloc unique. Les colons de la VOC, les Huguenots, les Britanniques et les migrations ultérieures ont produit des communautés, intérêts politiques et identités différents.",
            "caution": "Distinguer colonisation de peuplement, migrations ultérieures et positions contemporaines.",
            "status": "ready",
            "sources": ["src-gov-people", "src-saho-dutch-settlement", "src-saho-british-settlers"]
        }
    ],
    "languages": {
        "official": ["Afrikaans", "English", "isiNdebele", "isiXhosa", "isiZulu", "Sepedi", "Sesotho", "Setswana", "siSwati", "Tshivenda", "Xitsonga", "South African Sign Language"],
        "constitutional_note": "La langue des signes sud-africaine (SASL) est devenue la douzième langue officielle en juillet 2023. Le statut officiel ne signifie pas que toutes les langues disposent partout des mêmes ressources, services publics ou possibilités d’enseignement.",
        "household_2022": [
            {"language": "isiZulu", "percent": 24.4},
            {"language": "isiXhosa", "percent": 16.3},
            {"language": "Afrikaans", "percent": 10.6},
            {"language": "Sepedi", "percent": 10.0},
            {"language": "English", "percent": 8.7},
            {"language": "Setswana", "percent": 8.3},
            {"language": "Sesotho", "percent": 7.8}
        ],
        "families_and_contexts": [
            {"title": "Langues nguni", "text": "isiZulu, isiXhosa, siSwati et isiNdebele sont apparentées, mais chacune possède ses normes, littératures, histoires et communautés de pratique."},
            {"title": "Langues sotho-tswana", "text": "Sesotho, Setswana et Sepedi appartiennent à un continuum apparenté ; les frontières linguistiques ne coïncident pas exactement avec les frontières politiques."},
            {"title": "Tshivenda et Xitsonga", "text": "Ces langues ont des histoires transfrontalières liées au nord et à l’est de l’Afrique australe."},
            {"title": "Afrikaans", "text": "L’afrikaans s’est développé au Cap dans une société coloniale et esclavagiste à partir du néerlandais, au contact de locuteurs khoekhoe, esclavisés d’Afrique et d’Asie et populations européennes. Son histoire ne peut être réduite à l’identité afrikaner blanche."},
            {"title": "English", "text": "L’anglais est largement utilisé dans l’administration, l’enseignement supérieur, les médias et l’économie, sans être la langue la plus parlée au foyer."},
            {"title": "Langues khoesan et langues minorisées", "text": "Plusieurs langues historiques ne bénéficient pas du statut officiel national et certaines sont gravement menacées. Leur documentation doit être menée communauté par communauté."}
        ],
        "note": "Les pourcentages correspondent à la langue la plus souvent parlée au sein du ménage au recensement de 2022. Ils ne mesurent ni le multilinguisme individuel, ni la langue seconde, ni l’identité ethnique.",
        "sources": ["src-statssa-census-2022", "src-statssa-cultural-dynamics", "src-sasl-official-2023", "src-constitution-1996"],
        "integrationStatus": "ready"
    },
    "religions": {
        "measure_label": "Nombre de personnes ayant déclaré une affiliation ou croyance principale au recensement de 2022",
        "christian_share_2022": 84.5,
        "census_2022": [
            {"name": "Christianisme", "count": 51831918},
            {"name": "Religion traditionnelle africaine", "count": 4756227},
            {"name": "Islam", "count": 975049},
            {"name": "Hindouisme", "count": 647346}
        ],
        "historical_contexts": [
            {"title": "Religions et cosmologies autochtones", "text": "Les traditions san, khoekhoe et de nombreuses sociétés de langues bantoues comprennent des relations aux ancêtres, aux guérisseurs, aux lieux et aux forces spirituelles. Elles ne forment pas une religion africaine unique."},
            {"title": "Christianismes", "text": "Le christianisme est présent sous de nombreuses formes : Églises historiques issues des missions, Églises africaines indépendantes, catholicisme, anglicanisme, traditions réformées, pentecôtismes et mouvements locaux."},
            {"title": "Islam au Cap", "text": "L’islam est historiquement lié aux personnes esclavisées et exilées venues d’Asie du Sud-Est, d’Inde et d’Afrique orientale, puis à d’autres migrations et conversions."},
            {"title": "Hindouismes et religions sud-asiatiques", "text": "L’hindouisme s’est développé notamment avec les travailleurs indiens sous contrat et les migrations libres vers le Natal. Les communautés contemporaines restent diverses."},
            {"title": "Judaïsme, bahaïsme, bouddhismes et autres affiliations", "text": "Le paysage religieux comprend aussi des communautés juives, baha’ies, bouddhistes et d’autres traditions, ainsi que l’athéisme, l’agnosticisme et l’absence d’affiliation."}
        ],
        "interpretation_note": "Ces nombres ne sont ni des scores ni une hiérarchie. Une réponse de recensement résume imparfaitement des identités parfois multiples : une personne peut se dire chrétienne tout en maintenant des pratiques liées aux ancêtres, par exemple.",
        "note": "Statistics South Africa estime que 84,5 % de la population se déclarait chrétienne en 2022. Les catégories statistiques ne décrivent pas à elles seules les pratiques, intensités de croyance ou combinaisons religieuses.",
        "sources": ["src-statssa-cultural-dynamics", "src-statssa-census-metadata-religion", "src-saho-slavery-cape", "src-saho-indian-south-africans"],
        "integrationStatus": "ready"
    },
    "migrations": [
        {"id": "mig-cape-slavery", "label": "Importation forcée d'esclaves vers le Cap", "start": 1653, "end": 1807, "type": "forced", "routes_public": False, "reason": "Les origines couvrent plusieurs régions d'Afrique et d'Asie; les routes doivent être séparées par provenance et période avant affichage.", "status": "ready", "sources": ["src-saho-slavery-cape", "src-rama-forced-indian"]},
        {"id": "mig-indian-indenture-natal", "label": "Engagisme indien vers le Natal", "start": 1860, "end": 1911, "type": "coerced-labour", "routes_public": False, "reason": "Le système était contractuel mais fortement coercitif; ne pas le classer comme migration volontaire ordinaire.", "status": "ready", "sources": ["src-saho-indian-indentured", "src-saho-ship-list"]},
        {"id": "mig-passenger-indians", "label": "Migrations indiennes libres vers le Natal", "start": 1869, "end": None, "type": "voluntary", "routes_public": False, "reason": "Les flux contemporains ne doivent pas être prolongés automatiquement depuis 1869; une route moderne séparée exige des statistiques récentes.", "status": "provisional", "sources": ["src-saho-indian-timeline"]},
        {"id": "mig-apartheid-forced-removals", "label": "Déplacements forcés sous la ségrégation et l'apartheid", "start": 1913, "end": 1994, "type": "forced-internal", "routes_public": False, "reason": "Il s'agit de nombreux déplacements internes distincts; aucune flèche unique ne serait historiquement honnête.", "status": "provisional", "sources": ["src-saho-apartheid"]},
        {"id": "mig-labour-southern-africa", "label": "Migrations régionales de travail vers les mines et villes", "start": 1880, "end": None, "type": "labour", "routes_public": False, "reason": "Processus régional complexe impliquant plusieurs pays; périodes et destinations doivent être documentées route par route.", "status": "research-gap", "sources": []},
        {"id": "mig-exile-apartheid", "label": "Exils politiques liés à l'apartheid", "start": 1960, "end": 1994, "type": "refugee-exile", "routes_public": False, "reason": "Les destinations et vagues doivent être distinguées selon les organisations et les périodes.", "status": "research-gap", "sources": []},
        {"id": "mig-contemporary-inbound", "label": "Immigration africaine et mondiale contemporaine", "start": 1994, "end": None, "type": "mixed-contemporary", "routes_public": False, "reason": "Aucune route actuelle n'est publiée dans ce dossier sans données récentes d'origine, destination, motif et période.", "status": "research-gap", "sources": []},
    ],
    "culture": [
        {"topic": "Musique", "text": "Le paysage musical inclut traditions vocales et instrumentales locales, jazz sud-africain, marabi, mbaqanga, maskandi, isicathamiya, gospel, kwaito, amapiano et de nombreuses scènes régionales. Chaque genre devra recevoir une fiche sourcée distincte.", "status": "provisional", "sources": ["src-sa-yearbook-arts"]},
        {"topic": "Littérature et oralité", "text": "Les traditions orales, épopées, izibongo (poésie de louange), récits san, littératures en langues africaines, afrikaans et anglais ne doivent pas être fondus dans une culture nationale unique.", "status": "research-gap", "sources": []},
        {"topic": "Cuisine", "text": "Les cuisines sud-africaines résultent de traditions autochtones, pastorales, agricoles, esclaves du Cap, malaises, indiennes, européennes et de circulations régionales. Une future section distinguera les contextes et évitera l'étiquette simpliste de « cuisine arc-en-ciel ».", "status": "research-gap", "sources": []},
        {"topic": "Architecture", "text": "L'architecture va des paysages archéologiques et habitats vernaculaires aux constructions coloniales, minières, modernistes et post-apartheid. Les styles seront documentés par lieu et période.", "status": "research-gap", "sources": []},
    ],
    "oral_traditions_and_legends": [
        {"title": "Récits et cosmologies san", "status": "research-gap", "note": "À intégrer uniquement à partir de collectes contextualisées, en distinguant les communautés et les biais des collecteurs coloniaux."},
        {"title": "Traditions dynastiques zouloues, xhosa, sotho-tswana et venda", "status": "research-gap", "note": "Les traditions orales seront présentées comme des sources historiques à critiquer, non comme des chronologies littérales automatiques."},
    ],
    "heritage": [
        {"name": "Fossil Hominid Sites of South Africa", "kind": "UNESCO", "status": "ready", "sources": ["src-unesco-fossil-hominid-sites"]},
        {"name": "Mapungubwe Cultural Landscape", "kind": "UNESCO", "status": "ready", "sources": ["src-unesco-mapungubwe"]},
        {"name": "Robben Island", "kind": "UNESCO", "status": "ready", "sources": ["src-unesco-robben-island"]},
        {"name": "ǂKhomani Cultural Landscape", "kind": "UNESCO", "status": "ready", "sources": ["src-unesco-south-africa"]},
        {"name": "Richtersveld Cultural and Botanical Landscape", "kind": "UNESCO", "status": "ready", "sources": ["src-unesco-south-africa"]},
        {"name": "Human Rights, Liberation and Reconciliation: Nelson Mandela Legacy Sites", "kind": "UNESCO", "status": "ready", "sources": ["src-unesco-south-africa"]},
        {"name": "The Emergence of Modern Human Behaviour: The Pleistocene Occupation Sites of South Africa", "kind": "UNESCO", "status": "ready", "sources": ["src-unesco-south-africa"]},
    ],
    "figures": [
        {"name": "Nelson Mandela", "reason": "résistance à l'apartheid, transition démocratique et présidence", "status": "ready", "sources": ["src-saho-mandela"]},
        {"name": "Albertina Sisulu", "reason": "militante anti-apartheid, infirmière et organisatrice politique", "status": "ready", "sources": ["src-saho-albertina-sisulu"]},
        {"name": "Steve Biko", "reason": "figure majeure du Black Consciousness Movement", "status": "ready", "sources": ["src-saho-steve-biko"]},
        {"name": "Charlotte Maxeke", "reason": "éducatrice, militante et fondatrice de la Bantu Women's League", "status": "ready", "sources": ["src-saho-charlotte-maxeke"]},
        {"name": "Shaka kaSenzangakhona", "reason": "formation et expansion du royaume zoulou au début du XIXe siècle", "status": "ready", "sources": ["src-saho-shaka"]},
        {"name": "Sara « Saartjie » Baartman", "reason": "violence coloniale, racialisation scientifique et mémoire postcoloniale", "status": "ready", "sources": ["src-saho-baartman"]},
        {"name": "Desmond Tutu", "reason": "opposition à l'apartheid, leadership religieux et justice transitionnelle", "status": "provisional", "sources": ["src-tutu-foundation"]},
        {"name": "Miriam Makeba", "reason": "musique, exil et mobilisation internationale contre l'apartheid", "status": "ready", "sources": ["src-saho-makeba"]},
    ],
    "historiography": [
        "Éviter de présenter l'histoire sud-africaine comme une simple succession San → Khoekhoe → Bantous → Européens; les contacts, mélanges, conflits et continuités sont régionaux et non linéaires.",
        "Le terme « Mfecane » et ses interprétations font l'objet de débats historiographiques; aucune narration unique ne doit être intégrée sans dossier spécifique.",
        "Les catégories raciales de l'apartheid sont des constructions juridiques et politiques; elles ne doivent jamais être traitées comme des groupes biologiques naturels.",
        "Les frontières des royaumes et chefferies précoloniaux variaient; les représenter comme des frontières modernes fermées serait trompeur.",
    ],
    "research_gaps": [
        "Géométries temporelles vérifiées des polities précoloniales et coloniales.",
        "Catalogue complet des migrations internes, régionales et diasporiques par période.",
        "Dossiers individuels pour chaque peuple, langue, religion, tradition orale et genre culturel.",
        "Chronologie détaillée des États xhosa, sotho-tswana, venda, pedi, ndebele, swazi et zoulou.",
        "Sources primaires et universitaires pour les personnalités avant publication de fiches détaillées.",
    ],
    "history_chapters": [
        {
            "id": "za-history-deep-time",
            "title": "Des hominines aux premières sociétés humaines documentées",
            "period": "Plusieurs millions d’années – premier millénaire de notre ère",
            "summary": "Le territoire sud-africain conserve des archives majeures de l’évolution humaine. Les sites fossilifères du Gauteng et du Nord-Ouest documentent plusieurs espèces d’hominines, tandis que les sites pléistocènes du littoral et de l’intérieur montrent des innovations techniques et symboliques anciennes. Ces découvertes ne racontent pas une progression simple et linéaire : elles témoignent de populations diverses, de changements climatiques et de réseaux de mobilité dont les détails restent débattus.",
            "details": [
                "Les expressions modernes comme « berceau de l’humanité » sont utiles pour la médiation, mais elles ne signifient pas qu’un seul lieu aurait produit toute l’humanité moderne.",
                "Les sociétés san et khoekhoe possèdent des histoires distinctes. Les catégories actuelles ne doivent pas être projetées sans nuance sur toute la préhistoire.",
                "L’arrivée progressive de communautés agricoles et métallurgiques de langues bantoues transforme les économies et les paysages à partir des premiers siècles de notre ère, sans remplacer uniformément les populations déjà présentes."
            ],
            "status": "ready",
            "sources": ["src-unesco-fossil-hominid-sites", "src-unesco-pleistocene-sites", "src-saho-precolonial"]
        },
        {
            "id": "za-history-mapungubwe",
            "title": "Mapungubwe et les réseaux de l’Afrique australe",
            "period": "environ 900–1300",
            "summary": "Mapungubwe se développe près de la confluence du Limpopo et du Shashe. Son organisation sociale hiérarchisée, ses objets en or et ses importations témoignent d’un pouvoir régional intégré aux échanges reliant l’intérieur de l’Afrique australe aux ports de l’océan Indien. Le royaume ne doit pas être présenté comme l’ancêtre direct de l’État sud-africain moderne : il appartient à une histoire régionale qui traverse les frontières actuelles de l’Afrique du Sud, du Botswana et du Zimbabwe.",
            "details": [
                "Le paysage culturel classé par l’UNESCO documente la montée et le déclin d’un royaume entre environ 900 et 1300.",
                "Les frontières exactes de son autorité ne sont pas connues ; une aire d’influence approximative est plus honnête qu’un polygone politique précis.",
                "Son insertion dans les échanges d’or, d’ivoire, de verre et de textiles relie l’histoire intérieure du continent aux circuits de l’océan Indien."
            ],
            "status": "ready",
            "sources": ["src-unesco-mapungubwe", "src-saho-pre1500"]
        },
        {
            "id": "za-history-cape",
            "title": "Le Cap néerlandais : établissement, esclavage et dépossession",
            "period": "1652–1795",
            "summary": "En 1652, la VOC établit une station de ravitaillement au Cap. L’expansion foncière des colons provoque des conflits et des pertes territoriales pour des communautés khoekhoe. La société coloniale repose aussi sur l’importation de personnes réduites en esclavage depuis Madagascar, l’Inde, l’Asie du Sud-Est, le Mozambique et l’Afrique orientale. Ces déplacements ont profondément façonné les langues, les religions, les cuisines et les identités du Cap.",
            "details": [
                "La fondation coloniale n’est pas la « naissance » de l’Afrique du Sud : des sociétés complexes existaient bien avant 1652.",
                "Les personnes esclavisées ne formaient pas un groupe homogène et leurs routes d’arrivée doivent être séparées selon les périodes et les régions d’origine.",
                "Les catégories raciales ultérieures ont souvent effacé les identités précises des Khoekhoe, des San, des esclaves africains et asiatiques et de leurs descendants."
            ],
            "status": "ready",
            "sources": ["src-saho-slavery-cape", "src-saho-early-cape-slave-trade", "src-rama-forced-indian", "src-saho-dutch-settlement"]
        },
        {
            "id": "za-history-nineteenth",
            "title": "Le XIXe siècle : royaumes africains, expansion coloniale et nouvelles économies",
            "period": "1795–1910",
            "summary": "Le XIXe siècle combine l’expansion britannique, la formation et la transformation de polities africaines, le Grand Trek, la création de républiques boers, des guerres de frontière et l’intégration forcée de territoires. Les découvertes de diamants puis d’or accélèrent l’industrialisation, l’urbanisation et la mise en place d’un système de travail migrant contrôlé.",
            "details": [
                "Le royaume zoulou n’est qu’une des nombreuses formations politiques africaines de la période ; les histoires sotho, tswana, xhosa, ndebele, swazi, venda et tsonga doivent être traitées séparément.",
                "Le terme « Mfecane » fait l’objet de débats historiographiques : il ne doit pas servir d’explication unique à toutes les violences et migrations régionales.",
                "L’engagisme indien vers le Natal à partir de 1860 est un mouvement sous contrat et sous forte contrainte, distinct de la migration libre des commerçants et artisans indiens."
            ],
            "status": "provisional",
            "sources": ["src-saho-zulu-natal", "src-stapleton-military-history", "src-saho-indian-indentured", "src-saho-indian-south-africans"]
        },
        {
            "id": "za-history-union",
            "title": "Union, ségrégation et dépossession légale",
            "period": "1910–1948",
            "summary": "L’Union sud-africaine réunit quatre colonies en 1910, mais ne crée pas une démocratie inclusive. La majorité noire est exclue du pouvoir national. Les politiques foncières, urbaines et professionnelles institutionnalisent une ségrégation déjà ancienne et structurent un système de travail migrant au bénéfice des mines et de l’agriculture commerciale.",
            "details": [
                "L’Union est un compromis entre élites blanches britanniques et afrikaners, et non une union politique consentie par l’ensemble de la population.",
                "Les résistances prennent des formes syndicales, rurales, intellectuelles, religieuses et politiques ; elles ne commencent pas en 1948.",
                "Les catégories administratives imposées par l’État deviennent progressivement des instruments de contrôle social et territorial."
            ],
            "status": "ready",
            "sources": ["src-saho-union-democracy"]
        },
        {
            "id": "za-history-apartheid",
            "title": "Apartheid, résistances et déplacements forcés",
            "period": "1948–1994",
            "summary": "Après la victoire électorale du Parti national en 1948, l’apartheid systématise la classification raciale, la séparation résidentielle, l’éducation différenciée et la répression. Les « homelands » et les déplacements forcés cherchent à redessiner la citoyenneté et le territoire. Les résistances intérieures, les mobilisations syndicales, la lutte armée, les mouvements étudiants, les Églises, les sanctions et les solidarités internationales contribuent à l’affaiblissement du régime.",
            "details": [
                "L’apartheid ne se résume pas à la séparation des espaces publics : il organise l’accès à la terre, au travail, à la citoyenneté, à l’éducation et à la mobilité.",
                "Les oppositions sont plurielles : ANC, PAC, Black Consciousness, syndicats, organisations civiques, mouvements féminins et nombreuses structures locales.",
                "La fin juridique de l’apartheid ne supprime pas automatiquement les inégalités spatiales et économiques produites pendant plusieurs générations."
            ],
            "status": "ready",
            "sources": ["src-saho-apartheid", "src-unesco-robben-island", "src-saho-elections"]
        },
        {
            "id": "za-history-democracy",
            "title": "Transition négociée et démocratie constitutionnelle",
            "period": "1990–aujourd’hui",
            "summary": "La transition s’ouvre avec la légalisation des organisations interdites, la libération de prisonniers politiques et des négociations menées dans un contexte de violences persistantes. Les élections d’avril 1994 installent un gouvernement démocratique. La Constitution de 1996 établit un État fondé sur la dignité, l’égalité, les droits fondamentaux et le contrôle constitutionnel.",
            "details": [
                "1994 est une rupture politique majeure, mais pas un point de départ absolu : les institutions démocratiques résultent de décennies de luttes et de négociations.",
                "La Commission vérité et réconciliation constitue un mécanisme central mais controversé de la transition ; elle ne clôt pas tous les débats sur la justice et les réparations.",
                "Les enjeux contemporains comprennent les inégalités, le chômage, la terre, la qualité des services publics, les violences, les migrations régionales et la consolidation institutionnelle."
            ],
            "status": "ready",
            "sources": ["src-interim-constitution-1993", "src-constitution-1996", "src-saho-elections", "src-gov-government-system"]
        }
    ],
    "sources": [
        {"id": "src-statssa-census-2022", "category": "A", "title": "Census 2022 Statistical Release", "publisher": "Statistics South Africa", "year": 2023, "url": "https://census.statssa.gov.za/assets/documents/2022/P03014_Census_2022_Statistical_Release.pdf"},
        {"id": "src-statssa-census-brief", "category": "A", "title": "Census 2022 in Brief", "publisher": "Statistics South Africa", "year": 2024, "url": "https://www.statssa.gov.za/publications/Census2022inBrief/Census2022inBriefJune2024.pdf"},
        {"id": "src-constitution-1996", "category": "A", "title": "Constitution of the Republic of South Africa, 1996", "publisher": "Department of Justice and Constitutional Development", "year": 1996, "url": "https://www.justice.gov.za/constitution/SAConstitution-web-eng.pdf"},
        {"id": "src-interim-constitution-1993", "category": "A", "title": "Constitution of the Republic of South Africa Act 200 of 1993", "publisher": "Government of South Africa", "year": 1993, "url": "https://www.gov.za/documents/constitution/constitution-republic-south-africa-act-200-1993-repealed-28-jan-1994"},
        {"id": "src-sasl-2023", "category": "A", "title": "South African Sign Language recognised as the 12th official language", "publisher": "Parliament of South Africa / Government Communication", "year": 2023, "url": "https://www.parliament.gov.za/press-releases/na-approves-south-african-sign-language-12th-official-language"},
        {"id": "src-gov-government-system", "category": "A", "title": "Government systems", "publisher": "Government of South Africa", "year": 2026, "url": "https://www.gov.za/about-sa/government-systems"},
        {"id": "src-gov-people", "category": "C", "title": "People of South Africa", "publisher": "Government of South Africa", "year": 2026, "url": "https://www.gov.za/about-sa/south-africas-people"},
        {"id": "src-unesco-fossil-hominid-sites", "category": "C", "title": "Fossil Hominid Sites of South Africa", "publisher": "UNESCO World Heritage Centre", "year": None, "url": "https://whc.unesco.org/en/list/915/"},
        {"id": "src-unesco-pleistocene-sites", "category": "C", "title": "The Emergence of Modern Human Behaviour: The Pleistocene Occupation Sites of South Africa", "publisher": "UNESCO World Heritage Centre", "year": 2024, "url": "https://whc.unesco.org/en/statesparties/za"},
        {"id": "src-unesco-mapungubwe", "category": "C", "title": "Mapungubwe Cultural Landscape", "publisher": "UNESCO World Heritage Centre", "year": None, "url": "https://whc.unesco.org/en/list/1099/"},
        {"id": "src-unesco-robben-island", "category": "C", "title": "Robben Island", "publisher": "UNESCO World Heritage Centre", "year": None, "url": "https://whc.unesco.org/en/list/916/"},
        {"id": "src-unesco-south-africa", "category": "C", "title": "South Africa — World Heritage properties", "publisher": "UNESCO World Heritage Centre", "year": 2026, "url": "https://whc.unesco.org/en/statesparties/za"},
        {"id": "src-saho-san", "category": "C", "title": "The San", "publisher": "South African History Online", "year": 2011, "url": "https://sahistory.org.za/article/san"},
        {"id": "src-saho-khoisan", "category": "C", "title": "The Khoisan", "publisher": "South African History Online", "year": 2011, "url": "https://sahistory.org.za/article/khoisan"},
        {"id": "src-saho-precolonial", "category": "C", "title": "Pre-colonial history of Southern Africa", "publisher": "South African History Online", "year": 2011, "url": "https://sahistory.org.za/article/pre-colonial-history-southern-africa"},
        {"id": "src-saho-pre1500", "category": "C", "title": "General South African History Timeline: Pre-1500", "publisher": "South African History Online", "year": 2011, "url": "https://sahistory.org.za/article/general-south-african-history-timeline-pre-1500"},
        {"id": "src-saho-slavery-cape", "category": "C", "title": "History of slavery and early colonisation in South Africa", "publisher": "South African History Online", "year": 2011, "url": "https://sahistory.org.za/article/history-slavery-and-early-colonisation-south-africa"},
        {"id": "src-rama-forced-indian", "category": "B", "title": "A Forgotten Diaspora: Forced Indian Migration to the Cape Colony, 1658 to 1834", "publisher": "University of South Africa doctoral thesis", "year": 2015, "url": "https://sahistory.org.za/sites/default/files/archive-files/rama_p_phd_nsc_2015_1.pdf"},
        {"id": "src-saho-indian-indentured", "category": "C", "title": "Indian Indentured Labour in Natal 1860-1911", "publisher": "South African History Online", "year": 2011, "url": "https://sahistory.org.za/article/indian-indentured-labour-natal-1860-1911"},
        {"id": "src-saho-indian-south-africans", "category": "C", "title": "Indian South Africans", "publisher": "South African History Online", "year": None, "url": "https://sahistory.org.za/article/indian-south-africans"},
        {"id": "src-saho-ship-list", "category": "C", "title": "Ship list of Indian Indentured Labourers", "publisher": "South African History Online", "year": 2016, "url": "https://sahistory.org.za/article/ship-list-indian-indentured-labourers"},
        {"id": "src-saho-indian-timeline", "category": "C", "title": "Indian South Africans timeline 1654-1899", "publisher": "South African History Online", "year": 2018, "url": "https://sahistory.org.za/article/indian-south-africans-timeline-1654-1899"},
        {"id": "src-saho-zulu-natal", "category": "C", "title": "The Zulu kingdom and the colony of Natal", "publisher": "South African History Online", "year": 2011, "url": "https://sahistory.org.za/article/zulu-kingdom-and-colony-natal"},
        {"id": "src-stapleton-military-history", "category": "B", "title": "A Military History of South Africa", "publisher": "Praeger / archived by SAHO", "year": 2010, "url": "https://sahistory.org.za/sites/default/files/archive-files/timothy_j._stapleton_a_military_history_of_southbookos.org_.pdf"},
        {"id": "src-saho-union-democracy", "category": "C", "title": "Union, Segregation, apartheid and Democracy", "publisher": "South African History Online", "year": 2011, "url": "https://sahistory.org.za/article/union-segregation-apartheid-and-democracy-union-non-racial-democracy"},
        {"id": "src-saho-apartheid", "category": "C", "title": "A history of Apartheid in South Africa", "publisher": "South African History Online", "year": 2016, "url": "https://sahistory.org.za/article/history-apartheid-south-africa"},
        {"id": "src-saho-elections", "category": "C", "title": "History of elections in South Africa", "publisher": "South African History Online", "year": None, "url": "https://sahistory.org.za/article/history-elections-south-africa"},
        {"id": "src-adhikari-coloured-identity", "category": "B", "title": "Historiography of Coloured Identity", "publisher": "Academic paper archived by SAHO", "year": 2005, "url": "https://sahistory.org.za/sites/default/files/archive-files/by_m_adhikari.pdf"},
        {"id": "src-saho-mandela", "category": "C", "title": "Nelson Rolihlahla Mandela", "publisher": "South African History Online", "year": 2026, "url": "https://sahistory.org.za/people/nelson-rolihlahla-mandela"},
        {"id": "src-saho-albertina-sisulu", "category": "C", "title": "Albertina Nontsikelelo Sisulu", "publisher": "South African History Online", "year": 2026, "url": "https://sahistory.org.za/people/albertina-nontsikelelo-sisulu"},
        {"id": "src-saho-steve-biko", "category": "C", "title": "Stephen Bantu Biko", "publisher": "South African History Online", "year": 2026, "url": "https://sahistory.org.za/people/stephen-bantu-biko"},
        {"id": "src-saho-charlotte-maxeke", "category": "C", "title": "Charlotte Maxeke", "publisher": "South African History Online", "year": 2011, "url": "https://sahistory.org.za/people/charlotte-maxeke"},
        {"id": "src-saho-shaka", "category": "C", "title": "Shaka Zulu", "publisher": "South African History Online", "year": 2026, "url": "https://sahistory.org.za/people/shaka-zulu"},
        {"id": "src-saho-baartman", "category": "C", "title": "Sara 'Saartjie' Baartman", "publisher": "South African History Online", "year": 2026, "url": "https://sahistory.org.za/people/sara-saartjie-baartman"},
        {"id": "src-tutu-foundation", "category": "C", "title": "Archbishop Desmond Tutu", "publisher": "Desmond & Leah Tutu Legacy Foundation", "year": None, "url": "https://tutu.org.za/archbishop-desmond-tutu/"},
        {"id": "src-saho-makeba", "category": "C", "title": "Miriam Makeba", "publisher": "South African History Online", "year": 2024, "url": "https://sahistory.org.za/people/miriam-makeba"},
        {"id": "src-sa-yearbook-arts", "category": "C", "title": "South Africa Yearbook — Arts and Culture", "publisher": "Government Communication and Information System", "year": 2019, "url": "https://www.gcis.gov.za/sites/default/files/docs/resourcecentre/yearbook/yb1919-4-Arts-and-culture.pdf"},
        {"id": "src-presidency-current", "category": "A", "title": "The Seventh Administration", "publisher": "The Presidency of the Republic of South Africa", "year": 2026, "url": "https://thepresidency.gov.za/"},
        {"id": "src-gov-national-flag", "category": "A", "title": "National flag", "publisher": "South African Government", "year": 2026, "url": "https://www.gov.za/about-sa/national-flag-0"},
        {"id": "src-saho-flag-1994", "category": "C", "title": "The introduction of the new South African flag, 1994", "publisher": "South African History Online", "year": 2019, "url": "https://sahistory.org.za/dated-event/introduction-new-south-african-flag-1994"},
        {"id": "src-saho-flag-history", "category": "B", "title": "Flagging the ‘new’ South Africa, 1910–2010", "publisher": "South African History Online / F. G. Brownell", "year": 2011, "url": "https://sahistory.org.za/sites/default/files/flagging_the_new_south_africa_19102010_brownell_flagging2011.pdf"},
        {"id": "src-gov-geography", "category": "A", "title": "Geography and climate", "publisher": "South African Government", "year": 2026, "url": "https://www.gov.za/about-sa/geography-and-climate"},
        {"id": "src-sanbi-biomes", "category": "B", "title": "The Vegetation of South Africa, Lesotho and Swaziland", "publisher": "South African National Biodiversity Institute", "year": 2018, "url": "https://www.sanbi.org/"},
        {"id": "src-saho-early-cape-slave-trade", "category": "C", "title": "The Early Cape Slave Trade", "publisher": "South African History Online", "year": 2015, "url": "https://sahistory.org.za/article/early-cape-slave-trade"},
        {"id": "src-saho-dutch-settlement", "category": "C", "title": "The Dutch Settlement", "publisher": "South African History Online", "year": 2026, "url": "https://sahistory.org.za/article/dutch-settlement"},
        {"id": "src-saho-1820-settlers", "category": "C", "title": "The first 1820 British Settlers arrive in South Africa", "publisher": "South African History Online", "year": 2022, "url": "https://sahistory.org.za/dated-event/first-1820-british-settlers-arrive-south-africa"},
        {"id": "src-statssa-religion-2025", "category": "A", "title": "South Africa’s Evolving Cultural Landscape: Religion in South Africa", "publisher": "Statistics South Africa", "year": 2025, "url": "https://www.statssa.gov.za/?p=18173"},
        {"id": "src-statssa-cultural-dynamics", "category": "A", "title": "Cultural Dynamics in South Africa", "publisher": "Statistics South Africa", "year": 2025, "url": "https://www.statssa.gov.za/publications/03-01-84/03-01-84.pdf"},
        {"id": "src-statssa-census-metadata-religion", "category": "A", "title": "Census 2022 Metadata: Religious or spiritual affiliation", "publisher": "Statistics South Africa", "year": 2024, "url": "https://isibaloweb.statssa.gov.za/metadata/CENSUS/2022/02.%20Census%202022%20Sample%20Information.pdf"},
        {"id": "src-sasl-official-2023", "category": "A", "title": "South African Sign Language recognised as the 12th official language", "publisher": "Government of South Africa", "year": 2023, "url": "https://www.gov.za/speeches/president-cyril-ramaphosa-enact-sign-language-12th-official-langauge"},
        {"id": "src-saho-khoisan-identity", "category": "C", "title": "Khoisan Identity", "publisher": "South African History Online", "year": 2012, "url": "https://sahistory.org.za/article/khoisan-identity"},
        {"id": "src-saho-xhosa", "category": "C", "title": "Xhosa", "publisher": "South African History Online", "year": 2011, "url": "https://sahistory.org.za/article/xhosa"},
        {"id": "src-saho-sotho", "category": "C", "title": "Sotho (South Sotho or Basotho)", "publisher": "South African History Online", "year": 2011, "url": "https://sahistory.org.za/article/sotho-south-sotho-or-basotho"},
        {"id": "src-saho-tswana", "category": "C", "title": "Tswana", "publisher": "South African History Online", "year": 2011, "url": "https://sahistory.org.za/article/tswana"},
        {"id": "src-unesco-khomani", "category": "C", "title": "ǂKhomani Cultural Landscape", "publisher": "UNESCO World Heritage Centre", "year": 2017, "url": "https://whc.unesco.org/en/list/1545/"},
        {"id": "src-unesco-richtersveld", "category": "C", "title": "Richtersveld Cultural and Botanical Landscape", "publisher": "UNESCO World Heritage Centre", "year": 2007, "url": "https://whc.unesco.org/en/list/1265/"},
        {"id": "src-saho-british-settlers", "category": "C", "title": "The 1820 British Settlers", "publisher": "South African History Online", "year": 2011, "url": "https://sahistory.org.za/article/1820-settlers"},
    ],
}

# ---------------------------------------------------------------------------
# PART 6 — MIGRATIONS AND DIASPORAS
# Route-level dates are kept separate from the continued existence of a
# community. No movement below is automatically published on the global atlas.
# ---------------------------------------------------------------------------
SOUTH_AFRICA_DOSSIER["migration_chapters"] = [
    {
        "id": "za-mig-cap-slavery",
        "title": "Esclavage et déplacements forcés vers le Cap",
        "period": "1658–1834 (émancipation complète en 1838)",
        "movement_type": "forced",
        "summary": "La colonie du Cap reçoit des personnes réduites en esclavage depuis plusieurs régions de l'océan Indien et de l'Afrique. Les provenances attestées comprennent notamment Madagascar, le sous-continent indien, l'Indonésie et l'Asie du Sud-Est, le Mozambique et la côte est-africaine. Ces circulations ne forment pas une seule route homogène : elles varient selon les décennies, les ports, les réseaux de la VOC et les captures maritimes.",
        "details": [
            "Les premières cargaisons de 1658 incluent des personnes prises sur un navire portugais et d'autres amenées depuis la côte ouest-africaine ; elles ne représentent pas la majorité des arrivées ultérieures.",
            "Madagascar, l'Inde, l'Asie du Sud-Est et l'Afrique orientale deviennent des zones majeures d'origine pendant la période VOC.",
            "La fin juridique de l'esclavage ne signifie pas la disparition immédiate des contraintes : l'apprentissage obligatoire prolonge la dépendance jusqu'en 1838.",
        ],
        "map_policy": "Afficher des routes historiques distinctes et bornées ; ne jamais les prolonger jusqu'à aujourd'hui.",
        "status": "ready",
        "sources": ["src-saho-early-cape-slave-trade", "src-saho-slavery-cape", "src-saho-cape-slavery-origins"],
    },
    {
        "id": "za-mig-voc-settlement",
        "title": "Établissement néerlandais et colonisation de peuplement",
        "period": "à partir de 1652, avec phases distinctes",
        "movement_type": "settler-colonial",
        "summary": "L'installation de la VOC au Cap en 1652 commence comme station de ravitaillement, puis s'étend par l'attribution de terres à des colons libres. Cette expansion entraîne des conflits, des pertes foncières et des déplacements pour les communautés khoekhoe et san. Elle doit être cartographiée comme colonisation de peuplement et expansion territoriale, non comme migration volontaire ordinaire.",
        "details": [
            "L'origine européenne des colons comprend principalement les Provinces-Unies, mais aussi des apports allemands et huguenots français.",
            "Les Trekboers étendent ensuite la frontière coloniale vers l'intérieur ; leurs trajectoires doivent être séparées de l'établissement initial du Cap.",
            "La croissance de la colonie repose simultanément sur la terre, le travail forcé et l'esclavage.",
        ],
        "map_policy": "Séparer l'arrivée maritime, l'expansion foncière et les déplacements internes de frontière.",
        "status": "ready",
        "sources": ["src-saho-dutch-settlement", "src-saho-slavery-cape"],
    },
    {
        "id": "za-mig-british-1820",
        "title": "Colons britanniques de 1820 vers le Cap oriental",
        "period": "1820, puis implantations au XIXe siècle",
        "movement_type": "settler-colonial",
        "summary": "Environ 4 000 à 4 500 migrants britanniques sont envoyés vers le Cap en 1820, puis installés principalement dans la zone d'Algoa Bay et sur la frontière orientale de la colonie. Le programme répond à des objectifs sociaux en Grande-Bretagne et à une stratégie coloniale de consolidation de la frontière face aux sociétés xhosa.",
        "details": [
            "La route maritime depuis la Grande-Bretagne est ponctuelle et concentrée en 1820 ; elle ne doit pas rester active sur la carte contemporaine.",
            "L'installation est liée à une politique de frontière et à des conflits fonciers : elle relève de la colonisation de peuplement.",
            "Les trajectoires ultérieures des communautés anglophones ne doivent pas être fusionnées automatiquement avec ce programme précis.",
        ],
        "map_policy": "Afficher Royaume-Uni → Algoa Bay/Cap oriental en 1820, puis arrêter la route.",
        "status": "ready",
        "sources": ["src-saho-1820-settlers", "src-saho-britain-cape"],
    },
    {
        "id": "za-mig-indenture",
        "title": "Travail indien sous contrat vers le Natal",
        "period": "1860–1911",
        "movement_type": "indentured-coercive",
        "summary": "Entre 1860 et 1911, environ 152 184 travailleurs sous contrat arrivent d'Inde au Natal, principalement pour les plantations sucrières, puis pour d'autres secteurs. Le système est juridiquement contractuel mais fortement contraignant. Il doit être distingué à la fois de l'esclavage et des migrations libres de commerçants, artisans et familles indiennes.",
        "details": [
            "Les principaux ports d'embarquement sont Madras et Calcutta, couvrant des régions d'origine diverses du sous-continent.",
            "Le premier navire, le Truro, arrive en novembre 1860 ; le dernier voyage du système est associé à l'Umlazi en juillet 1911.",
            "Après leur contrat, certaines personnes retournent en Inde, tandis qu'une majorité reste et contribue à la formation des communautés indiennes sud-africaines.",
        ],
        "map_policy": "Afficher plusieurs origines régionales vers Durban/Natal entre 1860 et 1911 ; type « travail sous contrat », jamais « volontaire » simple.",
        "status": "ready",
        "sources": ["src-saho-indian-indentured", "src-saho-indian-south-africans", "src-saho-indenture-ship-list"],
    },
    {
        "id": "za-mig-passenger-indians",
        "title": "Migrations indiennes libres et réseaux commerciaux",
        "period": "fin du XIXe siècle–XXe siècle, selon vagues",
        "movement_type": "voluntary-commercial",
        "summary": "Parallèlement à l'engagisme, des migrants indiens libres — souvent désignés dans les archives coloniales comme « passenger Indians » — arrivent comme commerçants, artisans et entrepreneurs. Ce mouvement est distinct du travail sous contrat et ne peut pas être représenté par la même route ni par la même couleur.",
        "details": [
            "Les périodes et lieux d'origine doivent être documentés par sous-vague avant publication sur l'Atlas.",
            "Les politiques discriminatoires coloniales puis sud-africaines limitent la résidence, le commerce et la mobilité de ces communautés.",
        ],
        "map_policy": "Conserver hors Atlas global jusqu'à validation des sous-routes et des bornes temporelles.",
        "status": "provisional",
        "sources": ["src-saho-indian-south-africans"],
    },
    {
        "id": "za-mig-regional-labour",
        "title": "Travail migrant régional et économie minière",
        "period": "fin du XIXe siècle–XXe siècle, avec continuités transformées",
        "movement_type": "labour-coercive-system",
        "summary": "L'essor des mines d'or et de diamants s'appuie sur un système de travail migrant recrutant en Afrique du Sud et dans l'Afrique australe. Des travailleurs viennent notamment du Mozambique, du Lesotho, de l'Eswatini, du Botswana et d'autres territoires de la région. Les contrats, taxes, contrôles de circulation et logements masculins créent une mobilité économique profondément encadrée.",
        "details": [
            "Il ne s'agit pas d'une route unique : les bassins de recrutement, les entreprises et les périodes changent.",
            "Le système sépare durablement les travailleurs de leurs familles et influence l'urbanisation régionale.",
            "Les flux contemporains de travail doivent être documentés séparément ; ils ne prolongent pas automatiquement les routes minières historiques.",
        ],
        "map_policy": "Créer ultérieurement des routes par pays d'origine, secteur et période ; aucune route continue jusqu'en 2026 sans preuve de flux.",
        "status": "provisional",
        "sources": ["src-statssa-migration-2022", "src-statssa-sadc-migrants"],
    },
    {
        "id": "za-mig-apartheid-removals",
        "title": "Déplacements forcés internes sous l'apartheid",
        "period": "principalement 1950–1990",
        "movement_type": "forced-internal",
        "summary": "Les lois de l'apartheid entraînent des déplacements forcés massifs depuis des quartiers déclarés « blancs » vers des townships, des périphéries et des bantoustans. Ces mouvements sont internes au territoire administré par l'Afrique du Sud et ne doivent pas être confondus avec une diaspora internationale.",
        "details": [
            "District Six et Sophiatown sont des exemples connus, mais le phénomène concerne de nombreuses communautés rurales et urbaines.",
            "La géométrie honnête est un ensemble de routes locales et régionales liées à des décisions administratives précises.",
            "Les conséquences spatiales persistent après 1994, sans que les routes historiques restent actives aujourd'hui.",
        ],
        "map_policy": "Carte nationale dédiée, par décision et période ; ne pas afficher comme route mondiale.",
        "status": "ready",
        "sources": ["src-saho-apartheid"],
    },
    {
        "id": "za-mig-contemporary-immigration",
        "title": "Immigration internationale contemporaine",
        "period": "mesurée notamment au recensement de 2022",
        "movement_type": "multiple-current-contexts",
        "summary": "L'Afrique du Sud est une destination majeure de migration en Afrique australe. Le recensement de 2022 comptabilise environ 2,4 millions de personnes nées hors du pays, soit près de 3,9 % de la population. La région de la SADC représente la majorité des pays de naissance. Ces chiffres décrivent une population immigrée présente, pas automatiquement des routes encore actives chaque année.",
        "details": [
            "Les motifs comprennent le travail, la famille, les études, le commerce, l'asile et d'autres formes de mobilité.",
            "Le stock de personnes immigrées ne permet pas, à lui seul, de tracer une route pour 2022–2026.",
            "Toute route contemporaine doit être fondée sur des données de flux, une période et un motif documentés séparément.",
        ],
        "map_policy": "Afficher des statistiques de présence dans la fiche ; publier des routes seulement après validation de données de flux.",
        "status": "ready",
        "sources": ["src-statssa-migration-2022", "src-statssa-sadc-migrants"],
    },
]

SOUTH_AFRICA_DOSSIER["diasporas"] = {
    "editorial_note": "Une diaspora peut continuer d'exister après la fin du mouvement qui l'a constituée. Cette section décrit des communautés et des héritages ; elle ne maintient aucune route migratoire active sans données de flux.",
    "inside_south_africa": [
        {
            "name": "Communautés du Cap issues de l'esclavage et de l'exil dans l'océan Indien",
            "summary": "Des descendants de personnes venues de Madagascar, d'Afrique orientale, d'Inde, du Sri Lanka et d'Asie du Sud-Est participent à la formation de communautés diverses au Cap. L'expression « Cape Malay » possède une histoire propre mais ne résume pas toutes les origines.",
            "status": "ready",
            "sources": ["src-saho-early-cape-slave-trade", "src-saho-cape-slavery-origins"],
        },
        {
            "name": "Sud-Africains d'ascendance indienne",
            "summary": "Ces communautés résultent de l'engagisme, de migrations libres et de trajectoires familiales ultérieures. Elles sont particulièrement importantes au KwaZulu-Natal, tout en étant présentes dans l'ensemble du pays.",
            "status": "ready",
            "sources": ["src-saho-indian-indentured", "src-saho-indian-south-africans"],
        },
        {
            "name": "Immigrations régionales d'Afrique australe",
            "summary": "Les personnes nées dans les pays de la SADC constituent la majorité de la population immigrée recensée. Les communautés, motifs et statuts juridiques sont hétérogènes et ne doivent pas être réduits à une seule catégorie.",
            "status": "ready",
            "sources": ["src-statssa-migration-2022", "src-statssa-sadc-migrants"],
        },
    ],
    "south_africans_abroad": [
        {
            "name": "Émigration et communautés sud-africaines à l'étranger",
            "summary": "Des Sud-Africains vivent dans de nombreux pays à la suite de migrations politiques, professionnelles, familiales et éducatives. Le dossier ne publie pas encore de classement mondial : les statistiques doivent être vérifiées pays par pays et par période.",
            "status": "research-gap",
            "sources": [],
        },
        {
            "name": "Exils liés à l'apartheid",
            "summary": "Des militants, familles et organisations s'établissent temporairement ou durablement dans des pays voisins et plus lointains. Les routes seront documentées par organisation, lieu d'accueil et période avant cartographie.",
            "status": "provisional",
            "sources": ["src-saho-apartheid"],
        },
    ],
}

SOUTH_AFRICA_DOSSIER["sources"].extend([
    {
        "id": "src-saho-cape-slavery-origins",
        "category": "C",
        "title": "How Unique was Slavery at the Cape?",
        "publisher": "South African History Online",
        "year": 2017,
        "url": "https://sahistory.org.za/article/how-unique-was-slavery-cape",
    },
    {
        "id": "src-saho-1820-settlers",
        "category": "C",
        "title": "The first 1820 British Settlers arrive in South Africa",
        "publisher": "South African History Online",
        "year": 2011,
        "url": "https://sahistory.org.za/dated-event/first-1820-british-settlers-arrive-south-africa",
    },
    {
        "id": "src-saho-britain-cape",
        "category": "C",
        "title": "Britain takes control of the Cape",
        "publisher": "South African History Online",
        "year": 2011,
        "url": "https://sahistory.org.za/article/britain-takes-control-cape",
    },
    {
        "id": "src-saho-indenture-ship-list",
        "category": "C",
        "title": "Ship list of Indian Indentured Labourers",
        "publisher": "South African History Online",
        "year": 2016,
        "url": "https://sahistory.org.za/article/ship-list-indian-indentured-labourers",
    },
    {
        "id": "src-statssa-migration-2022",
        "category": "A",
        "title": "Report on Migration Statistics based on Census 2022",
        "publisher": "Statistics South Africa",
        "year": 2025,
        "url": "https://www.statssa.gov.za/publications/03-04-04/03-04-042022.pdf",
    },
    {
        "id": "src-statssa-sadc-migrants",
        "category": "A",
        "title": "Most migrants to South Africa come from the SADC region",
        "publisher": "Statistics South Africa",
        "year": 2024,
        "url": "https://www.statssa.gov.za/?p=17111",
    },
])

# Galerie publique : seules des images dont la licence et l'attribution ont été vérifiées sont listées ici.
SOUTH_AFRICA_DOSSIER["media_gallery"] = [
    {
        "id": "za-media-flag-current",
        "title": "Drapeau national actuel",
        "caption": "Le drapeau adopté pour les premières élections démocratiques de 1994.",
        "alt": "Drapeau national multicolore de l'Afrique du Sud",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20South%20Africa.svg",
        "source_page": "https://commons.wikimedia.org/wiki/File:Flag_of_South_Africa.svg",
        "author": "Government of South Africa / Wikimedia Commons",
        "license": "Domaine public ; symbole officiel soumis à des règles d'usage propres",
        "section": "symbols",
    },
    {
        "id": "za-media-table-mountain",
        "title": "Table Mountain et Le Cap",
        "caption": "Un paysage emblématique du Cap-Occidental, lié à la géographie urbaine, naturelle et maritime du pays.",
        "alt": "Table Mountain dominant la ville du Cap",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Table%20mountain%20cape%20town.jpg",
        "source_page": "https://commons.wikimedia.org/wiki/File:Table_mountain_cape_town.jpg",
        "author": "Wikimedia Commons contributor",
        "license": "CC BY-SA 3.0",
        "section": "geography",
    },
    {
        "id": "za-media-mapungubwe",
        "title": "Paysage de Mapungubwe",
        "caption": "Le paysage culturel de Mapungubwe documente un centre politique et commercial majeur de l'Afrique australe précoloniale.",
        "alt": "Paysage rocheux du parc national de Mapungubwe",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Mapungubwe%2C%20Limpopo%2C%20South%20Africa%20%2820550834421%29.jpg",
        "source_page": "https://commons.wikimedia.org/wiki/File:Mapungubwe,_Limpopo,_South_Africa_(20550834421).jpg",
        "author": "South African Tourism",
        "license": "CC BY 2.0",
        "section": "history",
    },
    {
        "id": "za-media-mandela",
        "title": "Nelson Mandela en 1993",
        "caption": "Nelson Mandela à Philadelphie, l'année précédant les premières élections nationales démocratiques.",
        "alt": "Portrait de Nelson Mandela en 1993",
        "image_url": "https://commons.wikimedia.org/wiki/Special:FilePath/Nelson%20Mandela.jpg",
        "source_page": "https://commons.wikimedia.org/wiki/File:Nelson_Mandela.jpg",
        "author": "U.S. National Archives",
        "license": "Domaine public (œuvre du gouvernement fédéral des États-Unis)",
        "section": "figures",
    },
]
