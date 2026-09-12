"""Editorial completion pass for the three Southern Africa anchor dossiers.

Adds substantive, source-backed country material and removes internal editorial
warnings/status labels from the public reading experience. Text is original
synthesis/paraphrase; source records point readers to the underlying references.
"""

SOURCES = [
 {"id":"v24-unesco-za","title":"South Africa — World Heritage List","publisher":"UNESCO World Heritage Centre","url":"https://whc.unesco.org/en/statesparties/za"},
 {"id":"v24-saho-culture","title":"Defining culture, heritage and identity","publisher":"South African History Online","url":"https://sahistory.org.za/article/defining-culture-heritage-and-identity"},
 {"id":"v24-saho-apartheid","title":"A history of Apartheid in South Africa","publisher":"South African History Online","url":"https://sahistory.org.za/article/history-apartheid-south-africa"},
 {"id":"v24-gov-za-provinces","title":"South Africa's provinces","publisher":"South African Government","url":"https://www.gov.za/about-sa/south-africas-provinces"},
 {"id":"v24-statssa-2022","title":"Census 2022 Statistical Release","publisher":"Statistics South Africa","url":"https://census.statssa.gov.za/assets/documents/2022/P03014_Census_2022_Statistical_Release.pdf"},
 {"id":"v24-unesco-na","title":"Namibia — World Heritage List","publisher":"UNESCO World Heritage Centre","url":"https://whc.unesco.org/en/statesparties/na"},
 {"id":"v24-visit-na-geography","title":"Geography","publisher":"Namibia Tourism Board","url":"https://visitnamibia.com.na/geography/"},
 {"id":"v24-visit-na-skeleton","title":"Skeleton Coast Park","publisher":"Namibia Tourism Board","url":"https://visitnamibia.com.na/2022/02/skeleton-coast-park/"},
 {"id":"v24-unesco-san-na","title":"Sān Living Cultural Landscape","publisher":"UNESCO World Heritage Centre","url":"https://whc.unesco.org/en/tentativelists/6096"},
 {"id":"v24-unesco-bw","title":"Botswana — World Heritage List","publisher":"UNESCO World Heritage Centre","url":"https://whc.unesco.org/en/statesparties/bw"},
 {"id":"v24-unesco-tsodilo","title":"Tsodilo","publisher":"UNESCO World Heritage Centre","url":"https://whc.unesco.org/en/list/1021"},
 {"id":"v24-bto-okavango","title":"Okavango Delta","publisher":"Botswana Tourism Organisation","url":"https://botswanatourism.co.bw/explore/okavango-delta"},
 {"id":"v24-bto-chobe","title":"Chobe National Park","publisher":"Botswana Tourism Organisation","url":"https://www.botswanatourism.co.bw/index.php/explore/chobe-national-park"},
 {"id":"v24-stats-bw","title":"2022 Population Census","publisher":"Statistics Botswana","url":"https://www.statsbots.org.bw/census-population-2022"},
]

ZA_TERRITORY = [
 {"id":"za-v24-cape","title":"Le Cap, péninsule et région floristique","summary":"À l'extrême sud-ouest, la péninsule du Cap rencontre l'Atlantique dans un relief de montagnes, de baies et de plaines littorales. Le climat méditerranéen du Western Cape favorise une végétation de type fynbos d'une diversité exceptionnelle. Le Cap est à la fois une métropole portuaire, un ancien centre de la colonie de la VOC et un espace où les héritages khoekhoe, esclaves, malais du Cap, africains et européens se sont entremêlés sur plusieurs siècles.","sources":["v24-unesco-za","v24-gov-za-provinces"]},
 {"id":"za-v24-highveld","title":"Highveld, Gauteng et cœur urbain intérieur","summary":"Le plateau intérieur du Highveld porte la plus grande concentration urbaine et économique du pays autour de Johannesburg, Pretoria et de l'East Rand. Son développement moderne est indissociable de la découverte de l'or du Witwatersrand à la fin du XIXe siècle, qui a attiré capitaux, travailleurs migrants et infrastructures ferroviaires, tout en renforçant des systèmes de ségrégation résidentielle et professionnelle.","sources":["v24-gov-za-provinces","v24-saho-apartheid"]},
 {"id":"za-v24-drakensberg","title":"Drakensberg, escarpement et façade orientale","summary":"Le Grand Escarpement culmine dans le Drakensberg, chaîne majeure partagée avec le Lesotho. Ses hautes vallées alimentent plusieurs bassins hydrographiques et conservent un patrimoine rupestre san remarquable. Plus à l'est, KwaZulu-Natal descend vers l'océan Indien à travers des paysages de piémont, de savane, de zones humides et de littoral subtropical.","sources":["v24-unesco-za","v24-gov-za-provinces"]},
 {"id":"za-v24-karoo","title":"Karoo, Namaqualand et intérieur semi-aride","summary":"Une grande partie de l'ouest et du centre est dominée par des milieux semi-arides : Grand Karoo, Petit Karoo et vastes espaces du Northern Cape. L'élevage extensif, l'exploitation minière, les petites villes et les longues distances structurent l'occupation humaine. Au nord-ouest, le Richtersveld témoigne aussi de l'adaptation pastorale nama à un environnement montagneux désertique.","sources":["v24-unesco-za","v24-gov-za-provinces"]},
]

ZA_CULTURE = [
 {"id":"za-v24-cultural-mosaic","title":"Une culture nationale faite de plusieurs mondes","summary":"L'Afrique du Sud ne possède pas une culture unique que l'on pourrait réduire à quelques costumes ou danses. Ses formes culturelles contemporaines se sont construites dans l'interaction entre traditions khoe et san, sociétés nguni et sotho-tswana, expériences de l'esclavage et de l'engagisme, héritages afrikaners, britanniques, indiens et diasporiques. Les villes ont accéléré ces rencontres et produit de nouvelles langues sociales, esthétiques et musicales.","sources":["v24-saho-culture"]},
 {"id":"za-v24-music","title":"Du marabi à l'amapiano","summary":"Les musiques sud-africaines racontent l'urbanisation et les circulations du pays. Marabi, mbaqanga, isicathamiya, jazz du Cap, gospel, maskandi, kwaito, house et amapiano appartiennent à des périodes et des scènes différentes. Plusieurs de ces genres sont nés dans des quartiers soumis à la ségrégation, mais ont transformé les contraintes urbaines en espaces d'invention artistique et de diffusion internationale.","sources":["v24-saho-culture"]},
 {"id":"za-v24-food","title":"Cuisines de migrations, de terroirs et de villes","summary":"Les cuisines du pays associent maïs, sorgho, viandes, légumes et produits de cueillette à des héritages du Cap esclavagiste, de l'océan Indien, de l'Inde, de l'Europe et des migrations africaines. Bobotie, bredies, bunny chow, chakalaka, pap, umngqusho, mogodu ou braai ne représentent donc pas une seule tradition : ils renvoient à des régions, des classes sociales et des histoires familiales différentes.","sources":["v24-saho-culture"]},
]

NA_TERRITORY = [
 {"id":"na-v24-namib","title":"Le Namib : désert côtier, brouillard et dunes","summary":"Le désert du Namib forme une longue bande aride entre l'Atlantique et l'escarpement intérieur. Dans le Namib Sand Sea, les dunes sont alimentées par des sables transportés sur de longues distances et modelées par les vents. Le courant froid de Benguela favorise des brouillards côtiers qui apportent une humidité vitale à des organismes adaptés à un milieu où les pluies sont extrêmement faibles.","sources":["v24-unesco-na","v24-visit-na-geography"]},
 {"id":"na-v24-skeleton","title":"Skeleton Coast et Kunene","summary":"La côte nord-ouest associe plages battues par l'Atlantique, champs de dunes, lits de rivières éphémères, reliefs volcaniques et brouillards denses. La Skeleton Coast doit son imaginaire aux naufrages et aux conditions maritimes difficiles, mais son importance écologique dépasse cette image : embouchure du Kunene, champs de lichens et faune adaptée au désert forment un ensemble particulièrement fragile.","sources":["v24-visit-na-skeleton"]},
 {"id":"na-v24-plateau","title":"Plateau central, Windhoek et axe intérieur","summary":"Le plateau central traverse le pays du nord au sud et concentre une part importante des villes, des routes et des activités économiques. Windhoek s'y situe à plus de 1 600 mètres d'altitude. L'escarpement marque la transition vers le Namib à l'ouest, tandis que les paysages s'ouvrent vers les savanes et sables du Kalahari à l'est.","sources":["v24-visit-na-geography"]},
 {"id":"na-v24-north","title":"Etosha, Cuvelai et nord densément peuplé","summary":"Le nord contraste avec le centre aride. Le bassin d'Etosha est organisé autour d'une immense dépression saline, tandis que le système Cuvelai-Etosha reçoit des eaux saisonnières venues d'Angola. Cette disponibilité relative de l'eau a favorisé des densités humaines plus élevées, l'agriculture, l'élevage et des réseaux historiques qui traversent l'actuelle frontière angolaise.","sources":["v24-visit-na-geography"]},
 {"id":"na-v24-zambezi","title":"Kavango et Zambèze : la Namibie des fleuves","summary":"Dans le nord-est, la bande territoriale qui mène vers le Zambèze appartient à un environnement beaucoup plus humide. Kavango, Kwando, Linyanti, Chobe et Zambèze relient des zones de forêts riveraines, de plaines inondables et de villages à un vaste système transfrontalier partagé avec l'Angola, la Zambie et le Botswana. Les mobilités humaines y précèdent largement les frontières contemporaines.","sources":["v24-visit-na-geography"]},
]

NA_CULTURE = [
 {"id":"na-v24-cultural-regions","title":"Des cultures régionales plutôt qu'une image unique","summary":"La vie culturelle namibienne varie fortement entre le nord oshiwambo, les mondes pastoraux ovaherero, les communautés nama et damara, les sociétés san, le Kavango, le Zambèze et les villes. Langues, christianismes, pratiques ancestrales, élevage, agriculture, artisanat et cultures populaires urbaines se recomposent continuellement. Windhoek, Walvis Bay et les centres du nord sont aujourd'hui des lieux majeurs de ces mélanges.","sources":["v24-unesco-san-na"]},
 {"id":"na-v24-rock-memory","title":"Art rupestre, paysage et mémoire","summary":"À Twyfelfontein /Ui-//aes, des milliers de gravures et peintures témoignent d'une relation ancienne entre mobilité, faune, eau, rituel et paysage. Ce patrimoine ne constitue pas seulement une galerie d'images : il permet d'aborder la profondeur historique des sociétés de chasseurs-cueilleurs et la manière dont les lieux naturels ont aussi servi d'espaces sociaux et symboliques.","sources":["v24-unesco-na"]},
]

BW_TERRITORY = [
 {"id":"bw-v24-kalahari","title":"Le Kalahari, matrice territoriale","summary":"La plus grande partie du Botswana appartient au bassin du Kalahari. Il ne s'agit pas d'une mer de dunes uniformément stérile : savanes, pâturages, broussailles, pans salés et points d'eau créent une mosaïque écologique. Les distances, la saisonnalité des pluies et la disponibilité de l'eau ont profondément influencé l'élevage, les déplacements et la répartition des établissements humains.","sources":["v24-bto-okavango"]},
 {"id":"bw-v24-okavango","title":"Okavango : un fleuve qui se perd dans les sables","summary":"Né dans les hautes terres angolaises, l'Okavango traverse la Namibie avant d'entrer au Botswana, où il se divise en chenaux, lagunes, îles et plaines inondables. L'inondation saisonnière atteint le delta pendant la saison sèche locale, créant une rencontre spectaculaire entre eau et Kalahari. Le site est inscrit au patrimoine mondial depuis 2014.","sources":["v24-bto-okavango","v24-unesco-bw"]},
 {"id":"bw-v24-chobe","title":"Chobe-Linyanti : le nord fluvial","summary":"Au nord, les systèmes Chobe et Linyanti alimentent plaines inondables, marais et forêts riveraines. Le parc national de Chobe couvre environ 11 700 km² et comprend plusieurs ensembles écologiques, du riverfront aux secteurs de Savuti et Linyanti. Kasane sert de porte d'entrée à cette région transfrontalière connectée à la Namibie, la Zambie et le Zimbabwe.","sources":["v24-bto-chobe"]},
 {"id":"bw-v24-makgadikgadi","title":"Makgadikgadi et Nxai : mémoire d'un ancien lac","summary":"Les immenses pans salés de Makgadikgadi occupent l'emplacement d'un ancien système lacustre. Leur apparence change radicalement avec les saisons : croûtes blanches et horizons minéraux pendant les périodes sèches, puis eaux temporaires et prairies attirant oiseaux et grands herbivores après les pluies. Cet espace relie géologie, migrations animales et histoire humaine.","sources":["v24-bto-okavango"]},
]

BW_CULTURE = [
 {"id":"bw-v24-kgotla","title":"Kgotla, parole publique et vie communautaire","summary":"Le kgotla est à la fois un lieu de réunion et une institution de discussion publique associée à de nombreuses communautés tswana. Son fonctionnement a varié selon les époques, les merafe et les rapports de pouvoir, mais il reste un symbole important de consultation, de médiation et de présence de l'autorité locale dans l'espace communautaire.","sources":["v24-stats-bw"]},
 {"id":"bw-v24-tsodilo-culture","title":"Tsodilo : cent mille ans de présence humaine","summary":"Dans le nord-ouest, les collines de Tsodilo conservent une séquence archéologique couvrant au moins 100 000 ans, ainsi qu'un ensemble exceptionnel d'art rupestre. Les peintures, abris et traditions associées montrent que le lieu a été utilisé, interprété et transmis par différentes communautés sur une durée extraordinaire.","sources":["v24-unesco-tsodilo"]},
]

def _merge(target, incoming):
    existing={x.get('id') for x in target if isinstance(x,dict)}
    target.extend(x for x in incoming if x.get('id') not in existing)

def _strip_editorial(value):
    if isinstance(value, list): return [_strip_editorial(v) for v in value]
    if isinstance(value, dict):
        return {k:_strip_editorial(v) for k,v in value.items() if k not in {'caution','status','editorial_note','mapping'} }
    return value

def apply_completion(dossier):
    iso=dossier.get('iso2')
    _merge(dossier.setdefault('sources',[]), SOURCES)
    if iso=='ZA':
        dossier['territory_sections']=ZA_TERRITORY
        _merge(dossier.setdefault('culture',[]), ZA_CULTURE)
    elif iso=='NA':
        dossier['territory_sections']=NA_TERRITORY
        dossier.setdefault('geography',{})['sections']=NA_TERRITORY
        _merge(dossier.setdefault('culture',[]), NA_CULTURE)
    elif iso=='BW':
        dossier['territory_sections']=BW_TERRITORY
        _merge(dossier.setdefault('culture',[]), BW_CULTURE)
    cleaned=_strip_editorial(dossier)
    dossier.clear(); dossier.update(cleaned)
    dossier['last_reviewed']='2026-09-12'
    return dossier
