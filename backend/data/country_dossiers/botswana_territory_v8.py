"""
Botswana V8 — territory research layer.

This module is deliberately additive: it does not overwrite the existing
country dossier. It supplies richer, source-linked territory records that
the frontend can consume when the generic CountryTerritory component is wired.
"""

BOTSWANA_TERRITORY_V8 = {
    "country": "Botswana",
    "scope_note": (
        "Les frontières et catégories administratives contemporaines ne doivent "
        "pas être projetées automatiquement sur les périodes anciennes."
    ),
    "sections": [
        {
            "id": "bw-v8-physical-setting",
            "title": "Situation géographique",
            "summary": (
                "Le Botswana est un État enclavé d'Afrique australe. Son territoire "
                "contemporain s'inscrit principalement dans le bassin du Kalahari."
            ),
            "facts": [
                "Superficie : environ 581 730 km².",
                "Frontières contemporaines : Namibie, Zambie, Zimbabwe et Afrique du Sud.",
                "La majeure partie du pays se situe sur des terrains relativement plats à faiblement ondulés."
            ],
            "sources": ["src-gov-bw-v8", "src-britannica-bw-v8"],
            "status": "ready",
        },
        {
            "id": "bw-v8-okavango",
            "title": "Delta de l'Okavango",
            "summary": (
                "Le delta de l'Okavango est un delta intérieur : les eaux du fleuve "
                "se dispersent dans le nord-ouest du Botswana au lieu d'atteindre la mer."
            ),
            "facts": [
                "Le système hydrologique dépend fortement des crues saisonnières venues du bassin supérieur de l'Okavango.",
                "Le delta forme une mosaïque de chenaux, lagunes, plaines inondables, îles et zones boisées.",
                "Son fonctionnement écologique est transfrontalier : le bassin concerne notamment l'Angola, la Namibie et le Botswana."
            ],
            "sources": ["src-unesco-okavango-v8", "src-okavango-research-v8"],
            "status": "ready",
        },
        {
            "id": "bw-v8-kalahari",
            "title": "Kalahari",
            "summary": (
                "Le Kalahari constitue un vaste bassin sableux couvrant une grande partie "
                "du Botswana. Il ne faut pas le réduire à l'image d'un désert totalement dépourvu d'eau."
            ),
            "facts": [
                "Le bassin comprend des zones de savane, de prairies, de broussailles et des dépressions saisonnièrement humides.",
                "Les conditions hydriques varient fortement selon les régions et les saisons.",
                "Les populations humaines ont développé des stratégies adaptées à ces contraintes environnementales sur de très longues périodes."
            ],
            "sources": ["src-britannica-bw-v8", "src-unep-kalahari-v8"],
            "status": "ready",
        },
        {
            "id": "bw-v8-makgadikgadi",
            "title": "Makgadikgadi et pans",
            "summary": (
                "Les Makgadikgadi Pans sont les vestiges d'un ancien vaste système lacustre "
                "et forment aujourd'hui un ensemble de dépressions salines et saisonnièrement humides."
            ),
            "facts": [
                "Les pans changent fortement d'aspect selon les précipitations.",
                "Ils constituent des habitats importants pour de nombreuses espèces et des couloirs de mobilité saisonnière.",
                "Leur histoire géologique rappelle que les paysages actuels du Botswana sont le résultat de transformations hydrologiques anciennes."
            ],
            "sources": ["src-gov-bw-v8", "src-research-makgadikgadi-v8"],
            "status": "ready",
        },
        {
            "id": "bw-v8-chobe",
            "title": "Chobe et nord-est",
            "summary": (
                "Le nord-est du Botswana appartient à un ensemble écologique et fluvial "
                "où le Chobe, le Zambèze et leurs zones humides structurent les circulations de l'eau et de la faune."
            ),
            "facts": [
                "La région de Chobe est particulièrement importante pour les populations d'éléphants et les activités touristiques.",
                "Les dynamiques écologiques ne suivent pas les frontières politiques contemporaines.",
                "Les relations avec la Namibie, la Zambie et le Zimbabwe sont donc pertinentes lorsqu'elles concernent le bassin et les écosystèmes."
            ],
            "sources": ["src-chobe-research-v8", "src-gov-bw-v8"],
            "status": "ready",
        },
        {
            "id": "bw-v8-limpopo",
            "title": "Limpopo et sud-est",
            "summary": (
                "Le sud-est du Botswana appartient au bassin du Limpopo, partagé avec plusieurs pays voisins."
            ),
            "facts": [
                "Le Limpopo constitue un système fluvial transfrontalier.",
                "Les zones du sud-est ont des paysages plus densément occupés et davantage d'interactions avec les réseaux urbains régionaux.",
                "La présence du fleuve doit être étudiée dans le cadre du bassin plutôt qu'en isolant la frontière nationale."
            ],
            "sources": ["src-limpopo-basin-v8", "src-gov-bw-v8"],
            "status": "ready",
        },
        {
            "id": "bw-v8-conservation",
            "title": "Aires protégées et conservation",
            "summary": (
                "La conservation est une composante majeure du territoire botswanais, "
                "mais elle doit être analysée avec les populations et les usages locaux."
            ),
            "facts": [
                "Le pays comprend plusieurs grands espaces protégés et zones de gestion de la faune.",
                "Le tourisme animalier représente une activité économique importante.",
                "La conservation implique des arbitrages entre biodiversité, élevage, agriculture, mobilité des communautés et tourisme."
            ],
            "sources": ["src-gov-bw-v8", "src-unesco-okavango-v8"],
            "status": "ready",
        },
    ],
    "places": [
        {"id":"gaborone","name":"Gaborone","kind":"capitale","lat":-24.6282,"lon":25.9231,"sources":["src-gov-bw-v8"]},
        {"id":"maun","name":"Maun","kind":"ville / porte d'accès à l'Okavango","lat":-19.9833,"lon":23.4167,"sources":["src-unesco-okavango-v8"]},
        {"id":"kasane","name":"Kasane","kind":"ville / région de Chobe","lat":-17.8167,"lon":25.15,"sources":["src-chobe-research-v8"]},
        {"id":"tsodilo","name":"Tsodilo Hills","kind":"patrimoine archéologique","lat":-18.75,"lon":21.7333,"sources":["src-unesco-tsodilo-v8"]},
        {"id":"orapa","name":"Orapa","kind":"district minier","lat":-21.3119,"lon":25.3761,"sources":["src-debswana-v8"]},
        {"id":"jwaneng","name":"Jwaneng","kind":"ville / district minier","lat":-24.6022,"lon":24.7281,"sources":["src-debswana-v8"]},
    ],
    "sources": [
        {"id":"src-gov-bw-v8","publisher":"Government of Botswana","title":"Botswana government information and national profile","url":"https://www.gov.bw/","category":1},
        {"id":"src-britannica-bw-v8","publisher":"Encyclopaedia Britannica","title":"Botswana — geography and history","url":"https://www.britannica.com/place/Botswana","category":2},
        {"id":"src-unesco-okavango-v8","publisher":"UNESCO World Heritage Centre","title":"Okavango Delta","url":"https://whc.unesco.org/en/list/1432/","category":1},
        {"id":"src-unesco-tsodilo-v8","publisher":"UNESCO World Heritage Centre","title":"Tsodilo","url":"https://whc.unesco.org/en/list/1021/","category":1},
        {"id":"src-okavango-research-v8","publisher":"Okavango Research Institute","title":"Research on the Okavango system","url":"https://www.ub.bw/ori","category":2},
        {"id":"src-unep-kalahari-v8","publisher":"UNEP","title":"Kalahari and southern African dryland research","url":"https://www.unep.org/","category":1},
        {"id":"src-research-makgadikgadi-v8","publisher":"Research literature","title":"Makgadikgadi basin and palaeolake research","url":"https://scholar.google.com/scholar?q=Makgadikgadi+palaeolake+Botswana","category":2},
        {"id":"src-chobe-research-v8","publisher":"Botswana / conservation research","title":"Chobe ecosystem research","url":"https://www.gov.bw/","category":2},
        {"id":"src-limpopo-basin-v8","publisher":"Limpopo Watercourse Commission","title":"Limpopo basin","url":"https://limpopocommission.org/","category":1},
        {"id":"src-debswana-v8","publisher":"Debswana","title":"Operations and company history","url":"https://www.debswana.com/","category":1},
    ],
}
