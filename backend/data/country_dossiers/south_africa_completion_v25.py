"""South Africa V25 — French editorial completion pass.

Purpose: replace terse/publicly editorial material with substantive reader-facing
French synthesis. This pass is intentionally French-first; bilingual conversion
comes after the French dossier is content-complete.
"""

V25_SOURCES = [
    {"id":"v25-za-constitution","category":"A","title":"Constitution of the Republic of South Africa, 1996","publisher":"South African Government","url":"https://www.gov.za/documents/constitution-republic-south-africa-1996"},
    {"id":"v25-za-census","category":"A","title":"Census 2022 Statistical Release","publisher":"Statistics South Africa","url":"https://census.statssa.gov.za/assets/documents/2022/P03014_Census_2022_Statistical_Release.pdf"},
    {"id":"v25-za-provinces","category":"A","title":"South Africa's provinces","publisher":"South African Government","url":"https://www.gov.za/about-sa/south-africas-provinces"},
    {"id":"v25-za-unesco","category":"A","title":"South Africa — World Heritage List","publisher":"UNESCO World Heritage Centre","url":"https://whc.unesco.org/en/statesparties/za"},
    {"id":"v25-za-saho-apartheid","category":"B","title":"A history of Apartheid in South Africa","publisher":"South African History Online","url":"https://sahistory.org.za/article/history-apartheid-south-africa"},
    {"id":"v25-za-saho-culture","category":"B","title":"Defining culture, heritage and identity","publisher":"South African History Online","url":"https://sahistory.org.za/article/defining-culture-heritage-and-identity"},
]

HISTORY_DETAILS = {
    "za-history-deep-time": [
        "Les ensembles fossilifères de Sterkfontein, Swartkrans, Kromdraai et d'autres cavités du Gauteng et du Nord-Ouest documentent plusieurs millions d'années d'évolution des hominines. À une échelle beaucoup plus récente, les sites pléistocènes du littoral sud conservent des traces de technologies de pierre, d'exploitation des ressources marines, de pigments et de comportements symboliques.",
        "Les sociétés de chasseurs-cueilleurs ont occupé et parcouru des environnements très différents, du littoral aux plateaux intérieurs. L'art rupestre, l'archéologie et les traditions historiques permettent d'aborder la profondeur des trajectoires san, tandis que les communautés pastorales khoekhoe développent ensuite des économies fortement liées aux troupeaux et aux réseaux d'échange.",
        "À partir des premiers siècles de notre ère, des communautés agricoles et métallurgiques de langues bantoues s'installent progressivement dans l'est et le nord. Agriculture, élevage, métallurgie du fer, échanges et formes politiques locales se développent selon des rythmes régionaux différents et créent de nouvelles interactions avec les populations déjà présentes."
    ],
    "za-history-mapungubwe": [
        "Entre environ 900 et 1300, la vallée du Limpopo-Shashe voit se développer des établissements de plus en plus importants. Mapungubwe devient au XIIIe siècle un centre politique hiérarchisé où l'organisation de l'espace distingue notamment le sommet de la colline et les zones d'habitat environnantes.",
        "Les objets en or, perles de verre, céramiques et autres découvertes archéologiques montrent l'existence d'artisans spécialisés et d'échanges à longue distance. L'or et l'ivoire de l'intérieur rejoignent des circuits commerciaux connectés aux ports de l'océan Indien.",
        "Le paysage de Mapungubwe appartient à une histoire transfrontalière du Limpopo qui dépasse les frontières contemporaines. Son développement éclaire les formations politiques qui précèdent et accompagnent l'essor ultérieur de grands centres régionaux comme Great Zimbabwe."
    ],
    "za-history-cape": [
        "La station de la VOC fondée au Cap en 1652 vise d'abord le ravitaillement des navires. L'attribution de terres à des colons libres étend rapidement l'agriculture coloniale et accroît les conflits autour des pâturages, de l'eau et du bétail avec les communautés khoekhoe de la région.",
        "Le manque de main-d'œuvre coloniale contribue au développement d'un système esclavagiste. Des personnes sont déportées vers le Cap depuis l'océan Indien, Madagascar, l'Asie du Sud et du Sud-Est ainsi que différentes régions d'Afrique. Leurs descendants participent profondément à la formation sociale, linguistique, religieuse et culinaire du Cap.",
        "L'expansion des fermes vers l'intérieur crée une frontière mobile marquée par commerce, alliances, travail dépendant, commando, violences et dépossession. Ces dynamiques transforment durablement les sociétés khoekhoe et san et préparent une géographie foncière dont les effets se prolongent bien au-delà de la période néerlandaise."
    ],
    "za-history-nineteenth": [
        "Le XIXe siècle est marqué par des transformations simultanées : expansion de l'autorité britannique, développement ou recomposition de royaumes africains, migrations de groupes voortrekkers, guerres de frontière, missions chrétiennes, commerce régional et multiplication de nouvelles frontières politiques.",
        "Dans le sud-est, le royaume zoulou se consolide dans un espace où d'autres formations politiques africaines connaissent elles aussi des recompositions. Au Lesotho, Moshoeshoe I construit une puissance politique sotho ; plus au nord et à l'ouest, des sociétés tswana, venda, pedi, ndebele et tsonga suivent leurs propres trajectoires.",
        "Les découvertes de diamants à partir de la fin des années 1860 puis d'or sur le Witwatersrand en 1886 changent l'échelle de l'économie. Mines, chemins de fer, villes et capitaux attirent une main-d'œuvre régionale nombreuse, tandis que taxes, contrôle foncier et réglementation du travail contribuent à institutionnaliser le système de travail migrant."
    ],
    "za-history-union": [
        "L'Union sud-africaine créée en 1910 rassemble les anciennes colonies du Cap, du Natal, du Transvaal et de l'Orange River Colony dans un dominion autonome de l'Empire britannique. Le nouveau cadre politique consolide le pouvoir de la minorité blanche et limite fortement la participation politique de la majorité noire.",
        "Le Natives Land Act de 1913 devient un jalon majeur de la dépossession foncière en réservant l'accès légal à la terre selon des catégories raciales et en restreignant les possibilités d'acquisition ou de location pour les Africains noirs dans la plus grande partie du territoire.",
        "La période voit aussi la croissance de mouvements politiques, syndicaux, religieux et intellectuels. Le South African Native National Congress, futur ANC, est fondé en 1912 ; les mobilisations ouvrières, rurales et communautaires montrent que la ségrégation est contestée bien avant l'arrivée officielle de l'apartheid en 1948."
    ],
    "za-history-apartheid": [
        "À partir de 1948, le gouvernement du Parti national transforme des pratiques ségrégationnistes anciennes en un système législatif beaucoup plus cohérent. Classification raciale, contrôle des déplacements, séparation résidentielle, restrictions foncières et institutions éducatives différenciées organisent la vie quotidienne et l'accès aux ressources.",
        "Le Group Areas Act et d'autres dispositifs entraînent des déplacements forcés massifs et reconfigurent les villes. Les bantoustans ou homelands servent parallèlement à fragmenter la citoyenneté noire et à maintenir une main-d'œuvre mobile dont la présence dans les centres économiques est étroitement contrôlée.",
        "La résistance prend de nombreuses formes : campagnes de désobéissance, mobilisation communautaire, syndicats, organisations étudiantes, Black Consciousness, action clandestine et lutte armée. Sharpeville en 1960, Soweto en 1976 et les mobilisations des années 1980 deviennent des moments majeurs d'une confrontation politique accompagnée d'une pression internationale croissante.",
        "Les négociations ouvertes au début des années 1990 mettent fin au cadre juridique de l'apartheid et conduisent aux élections de 1994. Les structures spatiales, économiques et patrimoniales produites pendant plusieurs générations continuent néanmoins d'influencer logement, propriété, mobilité, emploi et accès aux services."
    ],
    "za-history-democracy": [
        "La libération de Nelson Mandela en février 1990 et la légalisation des organisations interdites accélèrent une transition négociée déjà préparée par des contacts antérieurs. La période reste violente : conflits politiques, affrontements locaux et incertitudes accompagnent les négociations constitutionnelles.",
        "Les élections des 26–29 avril 1994 donnent pour la première fois à la population adulte un cadre électoral national non racial. Nelson Mandela devient président et un gouvernement d'unité nationale est formé. La Constitution définitive, adoptée en 1996, place la dignité, l'égalité, les droits fondamentaux et la suprématie constitutionnelle au cœur du nouvel ordre juridique.",
        "La Commission vérité et réconciliation recueille des témoignages sur les violations graves des droits humains et organise un mécanisme conditionnel d'amnistie. Elle devient un élément majeur de la mémoire de la transition, tandis que les débats sur réparations, justice, terre et héritages économiques restent ouverts.",
        "La démocratie sud-africaine contemporaine associe institutions nationales, neuf provinces et gouvernements locaux. Les enjeux de transformation sociale portent notamment sur l'emploi, les inégalités, l'accès au logement et aux services, l'éducation, la santé, les infrastructures, la sécurité et la capacité des institutions publiques."
    ],
}

SOCIETY_REWRITES = {
    "Citoyenneté et ordre constitutionnel": "La Constitution de 1996 est la norme juridique suprême et organise une démocratie fondée sur la dignité humaine, l'égalité, les libertés fondamentales et le contrôle du pouvoir public. Elle répartit les compétences entre l'État national, les neuf provinces et les municipalités, tout en confiant aux juridictions — notamment à la Cour constitutionnelle — un rôle central dans la protection des droits. Ce cadre a profondément transformé la citoyenneté après des décennies d'exclusion raciale légalisée.",
    "Diversité et identités": "La population sud-africaine réunit des histoires familiales, langues, appartenances religieuses et trajectoires régionales extrêmement diverses. Les sociétés zouloues, xhosa, sotho, tswana, venda, tsonga, ndebele, swazi, san et khoekhoe côtoient des communautés afrikaners, anglophones, indiennes, coloured du Cap et de nombreuses diasporas africaines ou mondiales. Les grandes villes ont créé leurs propres cultures hybrides, tandis que les identités rurales et régionales restent puissantes.",
    "Inégalités persistantes": "La démocratie politique n'a pas effacé la géographie économique héritée de la ségrégation et de l'apartheid. La localisation du logement, la qualité des infrastructures, la propriété foncière, le patrimoine familial, l'accès aux établissements scolaires, aux transports et aux bassins d'emploi restent très inégalement distribués. Ces écarts se combinent aux différences de classe, de genre, d'âge et de territoire et constituent l'un des principaux défis sociaux du pays.",
    "Urbanisation et territoires": "Johannesburg–Gauteng, Le Cap, eThekwini/Durban et d'autres pôles métropolitains concentrent emplois, universités, réseaux de transport, industries créatives et services spécialisés. Autour d'eux, townships, suburbs, centres anciens, quartiers informels et nouvelles périphéries forment des espaces urbains très contrastés. Les régions rurales connaissent elles aussi des situations multiples, depuis les zones agricoles commerciales jusqu'aux anciens territoires de homelands où les formes de tenure, de gouvernance et d'accès aux services ont une histoire spécifique."
}

ECONOMY_REWRITES = {
    "Économies précoloniales": "Avant la colonisation européenne, les économies du territoire reposent selon les régions sur l'agriculture, l'élevage, la chasse, la collecte, la pêche, la métallurgie, l'artisanat et des réseaux commerciaux à différentes échelles. Mapungubwe montre qu'au Moyen Âge africain l'intérieur austral participe déjà à des circuits reliant or, ivoire et productions locales aux échanges de l'océan Indien.",
    "Économie coloniale du Cap": "L'économie coloniale du Cap se développe autour du ravitaillement maritime, de l'agriculture et de l'élevage, puis d'une expansion territoriale croissante. Elle dépend fortement du travail servile, du travail contraint et de la dépossession foncière. Les routes commerciales maritimes et l'arrivée forcée de populations depuis l'Afrique et l'océan Indien contribuent en même temps à former une société portuaire complexe.",
    "Révolution minière": "Les diamants puis l'or font basculer l'Afrique australe vers une économie industrielle et urbaine de grande échelle. Kimberley et surtout Johannesburg attirent capitaux, infrastructures et travailleurs venus de tout le sous-continent. Le système minier contribue à développer chemins de fer, banques et industries, mais repose aussi sur des formes de contrôle du travail, d'hébergement en compounds et de migration circulaire qui structurent durablement les familles et les territoires.",
    "Industrialisation et économie de l'apartheid": "Au XXe siècle, mines, industrie manufacturière, agriculture commerciale, énergie et finance forment une économie relativement diversifiée, mais le marché du travail est organisé par la ségrégation raciale. Les restrictions de résidence, l'éducation différenciée et le système des homelands fournissent aux centres industriels une main-d'œuvre dont les droits et la mobilité sont fortement contrôlés.",
    "Économie démocratique": "Depuis 1994, l'Afrique du Sud conserve l'une des économies les plus diversifiées du continent, avec des secteurs financiers, industriels, miniers, agricoles, logistiques, touristiques, numériques et créatifs importants. La transformation de l'économie reste cependant confrontée à un chômage élevé, à de fortes inégalités de patrimoine et de revenus, aux contraintes d'infrastructures et à la nécessité d'élargir l'accès aux compétences, au capital et aux marchés."
}


def _merge_unique(target, incoming):
    ids = {x.get("id") for x in target if isinstance(x, dict)}
    target.extend(x for x in incoming if x.get("id") not in ids)


def _strip_public_editorial(value):
    if isinstance(value, list):
        return [_strip_public_editorial(v) for v in value]
    if isinstance(value, dict):
        return {
            k: _strip_public_editorial(v)
            for k, v in value.items()
            if k not in {"status", "precaution", "caution", "editorial_warning", "editorialNote", "editorial_note"}
        }
    return value


def apply_south_africa_v25(dossier):
    if dossier.get("iso2") != "ZA":
        return dossier

    # Remove internal workflow language from the public data tree.
    cleaned = _strip_public_editorial(dossier)
    dossier.clear()
    dossier.update(cleaned)

    # Fix an old schema accident: history chapters had been duplicated inside the president record.
    president = dossier.get("overview", {}).get("president_current")
    if isinstance(president, dict):
        president.pop("history_chapters", None)

    chapters = dossier.setdefault("overview", {}).setdefault("history_chapters", [])
    for chapter in chapters:
        details = HISTORY_DETAILS.get(chapter.get("id"))
        if details:
            chapter["details"] = details
            chapter["sources"] = list(dict.fromkeys(chapter.get("sources", []) + ["v25-za-unesco", "v25-za-saho-apartheid"]))

    for theme in dossier.setdefault("society", {}).setdefault("themes", []):
        title = theme.get("title")
        if title in SOCIETY_REWRITES:
            theme["text"] = SOCIETY_REWRITES[title]
            theme["sourceIds"] = list(dict.fromkeys(theme.get("sourceIds", []) + ["v25-za-constitution", "v25-za-census"]))

    economy = dossier.setdefault("economy", {})
    for item in economy.get("historicalTransformations", []):
        title = item.get("title")
        if title in ECONOMY_REWRITES:
            item["text"] = ECONOMY_REWRITES[title]
            item["sourceIds"] = list(dict.fromkeys(item.get("sourceIds", []) + ["v25-za-saho-apartheid"]))

    # Replace terse sector notes with explanatory reader-facing copy.
    sector_notes = {
        "Services financiers et services aux entreprises": "Johannesburg est un centre financier majeur du continent et concentre banques, assurances, sièges d'entreprises et marchés de capitaux. Les services professionnels, télécommunications et activités numériques prolongent cette fonction métropolitaine et relient l'économie nationale aux marchés régionaux et mondiaux.",
        "Mines et transformation minérale": "L'exploitation du platine, du manganèse, du chrome, du charbon, de l'or, des diamants et d'autres minerais reste structurante pour les exportations et plusieurs régions industrielles. Les bassins miniers ont façonné villes, infrastructures et migrations de travail, tandis que leurs coûts environnementaux et sociaux alimentent aujourd'hui des débats sur la transition énergétique et la réhabilitation des sites.",
        "Industrie manufacturière": "L'automobile, l'agroalimentaire, la métallurgie, la chimie, les équipements et d'autres branches manufacturières forment une base productive importante. Les corridors reliant Gauteng, Durban, Gqeberha et Le Cap articulent usines, ports, fournisseurs et marchés de consommation.",
        "Agriculture": "Les systèmes agricoles vont de grandes exploitations commerciales intégrées aux chaînes d'exportation à de petites exploitations familiales et communautaires. Maïs, agrumes, raisin, fruits, canne à sucre, élevage et horticulture ont des géographies distinctes, fortement dépendantes de l'eau, des sols, du climat et des infrastructures.",
        "Commerce, tourisme et logistique": "Les ports de Durban, Richards Bay, Le Cap, Ngqura et d'autres infrastructures relient le pays aux routes maritimes mondiales et aux économies enclavées de l'Afrique australe. Le tourisme associe villes, littoraux, parcs, patrimoine, gastronomie et paysages culturels, tandis que les performances ferroviaires, portuaires et routières influencent directement la compétitivité régionale."
    }
    for sector in economy.get("sectors", []):
        if sector.get("name") in sector_notes:
            sector["note"] = sector_notes[sector["name"]]

    # Ensure the completion sources themselves are visible and deduplicated.
    _merge_unique(dossier.setdefault("sources", []), V25_SOURCES)

    # Public research-gap boxes are not reader content; sources remain available in the bibliography.
    dossier.pop("research_gaps", None)
    dossier.pop("historiography", None)

    dossier["last_reviewed"] = "2026-09-13"
    dossier["content_completion"] = {
        "fr": "Passe éditoriale française approfondie : histoire, société et économie réécrites en synthèses développées et sourcées.",
        "phase": "fr-complete-pass-v25"
    }
    return dossier
