"""Deep-history enrichment for the South Africa country dossier.

This module deliberately avoids drawing precise prehistoric migration routes.
It stores documented processes, approximate periods, source links and mapping
rules. Unknowns stay unknown.
"""

from copy import deepcopy

DEEP_HISTORY_SOURCES = [
    {
        "id": "src-unesco-fossil-hominid-sites-deep",
        "category": "C",
        "title": "Fossil Hominid Sites of South Africa",
        "publisher": "UNESCO World Heritage Centre",
        "url": "https://whc.unesco.org/en/list/915/",
    },
    {
        "id": "src-unesco-mapungubwe-deep",
        "category": "C",
        "title": "Mapungubwe Cultural Landscape",
        "publisher": "UNESCO World Heritage Centre",
        "url": "https://whc.unesco.org/en/list/1099/",
    },
    {
        "id": "src-cambridge-food-production-sa",
        "category": "B",
        "title": "The Appearance of Food Production in Southern Africa, 1,000 to 2,000 Years Ago",
        "publisher": "Cambridge University Press",
        "url": "https://www.cambridge.org/core/books/cambridge-history-of-south-africa/appearance-of-food-production-in-southern-africa-1000-to-2000-years-ago/8A4DE7616A105AAF9C170C9CF533B1A5",
    },
    {
        "id": "src-cambridge-moving-histories-2023",
        "category": "B",
        "title": "Moving Histories: Bantu Language Expansions, Eclectic Economies, and Mobilities",
        "publisher": "The Journal of African History / Cambridge University Press",
        "year": 2023,
        "url": "https://www.cambridge.org/core/journals/journal-of-african-history/article/moving-histories-bantu-language-expansions-eclectic-economies-and-mobilities/F9F92F9C6A16A9633E75508E836C9C46",
    },
    {
        "id": "src-cambridge-prebantu-contact-2025",
        "category": "B",
        "title": "Tracing contact and migration in pre-Bantu Southern Africa through lexical borrowing",
        "publisher": "Evolutionary Human Sciences / Cambridge University Press",
        "year": 2025,
        "url": "https://www.cambridge.org/core/journals/evolutionary-human-sciences/article/tracing-contact-and-migration-in-prebantu-southern-africa-through-lexical-borrowing/0E21FE2D0B2AF609FBCC1F4A6F0FE8B5",
    },
    {
        "id": "src-saho-precolonial-deep",
        "category": "C",
        "title": "Pre-colonial history of Southern Africa",
        "publisher": "South African History Online",
        "url": "https://sahistory.org.za/article/pre-colonial-history-southern-africa",
    },
    {
        "id": "src-saho-first-farmers-deep",
        "category": "C",
        "title": "When, why and where the first African farmers settled in Southern Africa",
        "publisher": "South African History Online",
        "url": "https://sahistory.org.za/article/when-why-and-where-first-african-farmers-settled-southern-africa",
    },
]

DEEP_HISTORY = {
    "title": "Avant l’Afrique du Sud",
    "subtitle": "Histoire humaine, mobilités et réseaux avant la colonisation européenne",
    "public_note": "Cette section relie histoire, migrations et formations politiques. Les itinéraires exacts ne sont affichés que lorsqu’ils sont suffisamment documentés.",
    "chapters": [
        {
            "id": "za-deep-01",
            "period": "plus de 3 millions d’années à environ 200 000 ans avant le présent",
            "title": "Des paysages fossiles au récit de l’évolution humaine",
            "text": "Les ensembles fossilifères de Sterkfontein, Swartkrans, Kromdraai, Makapan et Taung conservent des traces majeures de l’évolution des hominines en Afrique australe. Ils ne décrivent pas une seule lignée continue ni une migration unique : ils documentent plusieurs espèces, environnements et phases d’occupation.",
            "status": "ready",
            "sources": ["src-unesco-fossil-hominid-sites-deep"],
            "map_policy": "Afficher les sites archéologiques comme des points datés, jamais comme une frontière humaine.",
        },
        {
            "id": "za-deep-02",
            "period": "Paléolithique moyen et supérieur africain",
            "title": "Mobilités de chasseurs-cueilleurs et occupation des paysages",
            "text": "Les populations de chasseurs-cueilleurs ont occupé et parcouru des milieux très variés du sud de l’Afrique. Les données archéologiques permettent d’identifier des sites et des traditions techniques, mais rarement des routes continues reliant précisément un point d’origine à une destination.",
            "status": "provisional",
            "sources": ["src-unesco-fossil-hominid-sites-deep", "src-saho-precolonial-deep"],
            "map_policy": "Zones d’occupation et points de sites; aucune flèche transcontinentale automatique.",
        },
        {
            "id": "za-deep-03",
            "period": "environ 300 avant notre ère à 500 de notre ère",
            "title": "Diffusion du pastoralisme et contacts avec les communautés locales",
            "text": "L’élevage apparaît dans certaines parties de l’Afrique australe avant l’installation généralisée des communautés agricoles de langues bantoues. Les recherches récentes insistent sur les contacts, emprunts et économies mixtes plutôt que sur le remplacement simple d’une population par une autre.",
            "status": "provisional",
            "sources": ["src-cambridge-moving-histories-2023", "src-cambridge-prebantu-contact-2025", "src-cambridge-food-production-sa"],
            "map_policy": "Représenter des zones et des périodes de contact; ne pas attribuer une identité ethnique fixe à tout matériel archéologique.",
        },
        {
            "id": "za-deep-04",
            "period": "à partir des premiers siècles de notre ère",
            "title": "Arrivées progressives de communautés agricoles et métallurgiques",
            "text": "Des communautés parlant des langues bantoues, pratiquant l’agriculture, l’élevage et la métallurgie, s’installent progressivement dans le nord et l’est de l’actuelle Afrique du Sud. Ce processus s’étend sur des siècles et comprend plusieurs circulations, adaptations locales et contacts avec les populations déjà présentes.",
            "status": "provisional",
            "sources": ["src-cambridge-food-production-sa", "src-saho-first-farmers-deep", "src-saho-precolonial-deep"],
            "map_policy": "Plusieurs zones temporelles successives; jamais une flèche unique appelée « migration bantoue ».",
        },
        {
            "id": "za-deep-05",
            "period": "environ 500–1000",
            "title": "Villages, métallurgie et réseaux régionaux",
            "text": "L’archéologie met en évidence une multiplication de villages agricoles, des productions de fer et des échanges entre communautés. Les catégories actuelles telles que Nguni ou Sotho-Tswana ne doivent pas être projetées mécaniquement sur toutes les communautés anciennes sans preuve spécifique.",
            "status": "provisional",
            "sources": ["src-cambridge-food-production-sa", "src-cambridge-moving-histories-2023"],
            "map_policy": "Afficher les sites connus et les réseaux d’échanges comme des connexions prudentes, non comme des frontières nationales.",
        },
        {
            "id": "za-deep-06",
            "period": "environ 900–1300",
            "title": "Mapungubwe et l’intégration aux échanges de longue distance",
            "text": "Le paysage culturel de Mapungubwe documente l’essor et le déclin d’un royaume indigène d’Afrique australe entre environ 900 et 1300. Sa richesse et son organisation sont liées à des échanges régionaux et à des réseaux conduisant vers l’océan Indien.",
            "status": "ready",
            "sources": ["src-unesco-mapungubwe-deep"],
            "map_policy": "Afficher le site, son paysage culturel et une aire d’influence approximative clairement distinguée d’une frontière certaine.",
        },
        {
            "id": "za-deep-07",
            "period": "avant 1652",
            "title": "Un territoire déjà relié au reste de l’Afrique",
            "text": "Avant l’établissement de la VOC, la région était déjà traversée par des circulations de personnes, de bétail, de techniques, de métaux et de biens. Les liens avec les bassins du Limpopo et du Shashe, le Zimbabwe actuel, le Mozambique et les réseaux de l’océan Indien doivent être racontés comme des systèmes régionaux, pas comme l’histoire isolée d’un futur État.",
            "status": "provisional",
            "sources": ["src-unesco-mapungubwe-deep", "src-cambridge-moving-histories-2023", "src-saho-precolonial-deep"],
            "map_policy": "Réseaux régionaux et points d’échange; distinguer commerce, migration et influence politique.",
        },
    ],
    "migration_processes": [
        {
            "id": "za-precolonial-mobility-foragers",
            "label": "Mobilités de chasseurs-cueilleurs",
            "period": {"start": None, "end": None, "display": "très longue durée, datation variable selon les sites"},
            "type": "mobility",
            "status": "provisional",
            "route_geometry": None,
            "reason": "Les sources documentent des occupations et des mobilités, mais pas une route unique et continue.",
            "sources": ["src-unesco-fossil-hominid-sites-deep", "src-saho-precolonial-deep"],
        },
        {
            "id": "za-pastoralism-spread",
            "label": "Diffusion du pastoralisme en Afrique australe",
            "period": {"start": -300, "end": 500, "display": "environ 300 av. n. è.–500"},
            "type": "pastoral-diffusion",
            "status": "provisional",
            "route_geometry": None,
            "reason": "Processus de diffusion, de contacts et de mobilités; les trajectoires exactes restent discutées.",
            "sources": ["src-cambridge-moving-histories-2023", "src-cambridge-prebantu-contact-2025"],
        },
        {
            "id": "za-early-farming-settlement",
            "label": "Installations agricoles et métallurgiques progressives",
            "period": {"start": 200, "end": 1000, "display": "environ IIIe–Xe siècles"},
            "type": "settlement-process",
            "status": "provisional",
            "route_geometry": None,
            "reason": "Plusieurs mouvements et implantations au fil des siècles; aucune route unique n’est validée.",
            "sources": ["src-cambridge-food-production-sa", "src-saho-first-farmers-deep"],
        },
        {
            "id": "za-limpopo-indian-ocean-networks",
            "label": "Réseaux du Limpopo-Shashe vers l’océan Indien",
            "period": {"start": 900, "end": 1300, "display": "environ 900–1300"},
            "type": "trade-network",
            "status": "ready",
            "route_geometry": None,
            "reason": "Réseau d’échanges documenté; le tracé précis de chaque segment ne doit pas être inventé.",
            "sources": ["src-unesco-mapungubwe-deep"],
        },
    ],
}


def enrich_south_africa_dossier(dossier):
    """Return a copy enriched with deep-history content and source records."""
    result = deepcopy(dossier)
    result["deep_history"] = deepcopy(DEEP_HISTORY)

    existing_ids = {source.get("id") for source in result.get("sources", [])}
    result.setdefault("sources", []).extend(
        deepcopy(source) for source in DEEP_HISTORY_SOURCES if source["id"] not in existing_ids
    )
    return result
