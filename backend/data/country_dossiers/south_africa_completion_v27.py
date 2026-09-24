"""South Africa V27 — deepen territory, language and heritage in the French pilot.

Reader-facing copy is paraphrased from institutional/statistical sources. This
pass remains French-first; English follows only after the pilot is complete.
"""

from ._completion_utils import collection_for, merge_unique

V27_SOURCES = [
    {"id":"v27-za-gov-glance","category":"A","title":"South Africa at a glance","publisher":"South African Government","url":"https://www.gov.za/about-sa/south-africa-glance"},
    {"id":"v27-za-gov-provinces","category":"A","title":"South Africa's provinces","publisher":"South African Government","url":"https://www.gov.za/about-sa/south-africas-provinces"},
    {"id":"v27-za-statssa-cultural","category":"A","title":"South Africa’s Evolving Cultural Landscape: A 26-Year Transformation","publisher":"Statistics South Africa","url":"https://www.statssa.gov.za/?p=18173"},
    {"id":"v27-za-unesco-wh","category":"A","title":"South Africa — World Heritage List","publisher":"UNESCO World Heritage Centre","url":"https://whc.unesco.org/en/statesparties/za"},
    {"id":"v27-za-constitution-languages","category":"A","title":"Constitution of the Republic of South Africa — Founding provisions","publisher":"Office of the Chief Justice","url":"https://www.ocj.gov.za/constitution/chp01.html"},
]

V27_TERRITORY_THEMES = [
    {"id":"za-territory-provinces-v27","title":"Neuf provinces, plusieurs centres politiques","text":"L'Afrique du Sud couvre environ 1,22 million de km² et son organisation territoriale repose sur neuf provinces : Eastern Cape, Free State, Gauteng, KwaZulu-Natal, Limpopo, Mpumalanga, Northern Cape, North West et Western Cape. Cette trame administrative se superpose à des géographies humaines et physiques très contrastées. Pretoria accueille le cœur administratif national, Cape Town le Parlement, tandis que Bloemfontein conserve une fonction judiciaire historique ; la Cour constitutionnelle siège à Johannesburg. Cette distribution des fonctions capitales rappelle que le territoire politique sud-africain ne se résume pas à une seule métropole.","sourceIds":["v27-za-gov-glance","v27-za-gov-provinces"]},
    {"id":"za-territory-interior-v27","title":"Plateau intérieur, Highveld et escarpement","text":"Une grande partie de l'intérieur est structurée par un plateau élevé. Le Highveld concentre notamment le Gauteng et une partie majeure du système urbain, industriel et minier construit autour de Johannesburg et Pretoria. Vers l'est et le sud-est, le Grand Escarpement et le Drakensberg forment une rupture topographique majeure avant les plaines et vallées côtières. Relief, altitude, disponibilité de l'eau, agriculture, réseaux de transport et localisation des villes se répondent : la géographie physique aide donc directement à comprendre l'histoire économique et démographique du pays.","sourceIds":["v27-za-gov-provinces"]},
    {"id":"za-territory-arid-v27","title":"Karoo, Kalahari et vastes espaces semi-arides","text":"L'ouest et une partie de l'intérieur sont beaucoup plus secs que la façade orientale. Le Northern Cape, immense et faiblement peuplé, associe paysages semi-désertiques, zones du Kalahari, bassins miniers, élevage extensif et sites scientifiques comme les installations astronomiques. Plus au sud, les paysages du Karoo forment une transition essentielle entre plateau intérieur, chaînes montagneuses et régions littorales. Ces espaces ne sont pas des 'vides' : ils possèdent des histoires pastorales, autochtones, minières, agricoles, scientifiques et environnementales propres.","sourceIds":["v27-za-gov-provinces"]},
    {"id":"za-territory-coasts-v27","title":"Deux façades océaniques et une mosaïque climatique","text":"Le pays s'ouvre sur l'Atlantique à l'ouest et sur l'océan Indien au sud et à l'est. Le Western Cape possède un régime méditerranéen dans plusieurs secteurs, alors que la façade orientale devient plus humide et subtropicale. Cette opposition contribue à l'extraordinaire diversité écologique du territoire, des formations floristiques du Cap aux zones humides d'iSimangaliso. Les ports du Cap, de Durban, de Gqeberha et d'autres villes littorales inscrivent en outre l'Afrique du Sud dans des circulations maritimes anciennes et contemporaines.","sourceIds":["v27-za-gov-provinces","v27-za-unesco-wh"]},
]

V27_LANGUAGE_THEMES = [
    {"id":"za-language-system-v27","title":"Un État officiellement multilingue","text":"L'Afrique du Sud reconnaît aujourd'hui douze langues officielles : isiZulu, isiXhosa, Afrikaans, English, Sepedi, Sesotho, Setswana, siSwati, Tshivenda, Xitsonga, isiNdebele et South African Sign Language. La Constitution demande également à l'État de promouvoir les langues autochtones historiquement marginalisées et prévoit un rôle spécifique pour le Pan South African Language Board. Le multilinguisme est donc à la fois une réalité sociale et un principe institutionnel de la démocratie post-apartheid.","sourceIds":["v27-za-constitution-languages"]},
    {"id":"za-language-household-v27","title":"Langues parlées au foyer : une hiérarchie différente de l'usage public","text":"Le recensement de 2022 montre que l'isiZulu est la langue la plus souvent parlée dans les ménages, avec 24,4 % de la population concernée, devant l'isiXhosa à 16,3 % et l'afrikaans à 10,6 %. Ces chiffres ne décrivent toutefois pas tout le répertoire linguistique d'une personne : de nombreux Sud-Africains utilisent plusieurs langues selon le foyer, l'école, le travail, les médias ou la région. Il faut donc distinguer langue la plus souvent parlée à la maison, compétence linguistique et langue de communication publique.","sourceIds":["v27-za-statssa-cultural"]},
    {"id":"za-language-beyond-official-v27","title":"Une diversité qui dépasse les langues officielles","text":"Le paysage linguistique comprend aussi des langues issues des migrations régionales et mondiales ainsi que des langues khoe et san. Statistics South Africa relevait en 2022 plus de 1,2 million de personnes utilisant à domicile des langues non officielles, dont le shona constituait le groupe le plus important. Cette diversité relie l'Afrique du Sud au Zimbabwe, au Mozambique, au Malawi, à l'océan Indien, à l'Asie du Sud et à d'autres espaces diasporiques.","sourceIds":["v27-za-statssa-cultural","v27-za-constitution-languages"]},
]

V27_HERITAGE_THEMES = [
    {"id":"za-heritage-network-v27","title":"Un patrimoine mondial qui traverse toute l'histoire du territoire","text":"La Liste du patrimoine mondial de l'UNESCO compte douze biens liés à l'Afrique du Sud. L'ensemble est exceptionnellement varié : sites fossilifères d'hominines, occupations pléistocènes associées à l'émergence de comportements humains modernes, paysage de Mapungubwe, paysages culturels ǂKhomani et du Richtersveld, Robben Island, sites de mémoire liés à Nelson Mandela, mais aussi patrimoine naturel et géologique comme les Cape Floral Region Protected Areas, Barberton Makhonjwa Mountains, Vredefort Dome et iSimangaliso, ainsi que le bien mixte Maloti-Drakensberg. Le patrimoine permet ainsi de relier temps profond, sociétés précoloniales, colonisation, apartheid, libération, biodiversité et géologie dans une même lecture du pays.","sourceIds":["v27-za-unesco-wh"]},
    {"id":"za-heritage-memory-v27","title":"Patrimoine, mémoire et démocratie","text":"Robben Island et les sites de mémoire associés à Nelson Mandela montrent que le patrimoine sud-africain ne concerne pas uniquement des monuments anciens. Prisons, lieux de mobilisation, espaces de résistance et institutions de réconciliation peuvent devenir des supports de transmission historique. Leur mise en patrimoine pose des questions vivantes : comment raconter les violences de l'apartheid, rendre visibles les expériences des personnes concernées et transmettre l'histoire de la lutte sans transformer celle-ci en récit figé ? Inonara relie donc ces lieux aux chronologies, biographies et chapitres politiques plutôt que de les présenter comme de simples attractions.","sourceIds":["v27-za-unesco-wh"]},
]


def apply_south_africa_v27(dossier):
    if dossier.get("iso2") != "ZA": return dossier
    merge_unique(collection_for(dossier, "territory"), V27_TERRITORY_THEMES)
    merge_unique(collection_for(dossier, "languages"), V27_LANGUAGE_THEMES)
    merge_unique(collection_for(dossier, "heritage"), V27_HERITAGE_THEMES)
    merge_unique(dossier.setdefault("sources", []), V27_SOURCES)
    dossier["last_reviewed"] = "2026-09-13"
    dossier["content_completion"] = {"fr":"Dossier pilote français en approfondissement : territoire, langues et patrimoine développés avec sources institutionnelles.","phase":"fr-pilot-deepening-v27"}
    return dossier
