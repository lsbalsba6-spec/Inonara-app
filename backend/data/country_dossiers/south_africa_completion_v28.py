"""South Africa V28 — peoples, migrations, living culture, environment, figures,
institutions/memory, media and a first structured interactive-map layer.

French pilot only. Translation remains deliberately blocked until the South
Africa reference dossier passes its completeness audit.
"""

V28_SOURCES = [
 {"id":"v28-statssa-census","category":"A","title":"Census 2022","publisher":"Statistics South Africa","url":"https://census.statssa.gov.za/"},
 {"id":"v28-sanbi-nba","category":"A","title":"National Biodiversity Assessment 2025","publisher":"SANBI","url":"https://nba.sanbi.org.za/"},
 {"id":"v28-sanbi-kba","category":"A","title":"Key Biodiversity Areas in South Africa","publisher":"SANBI","url":"https://www.sanbi.org/biodiversity/building-knowledge/biodiversity-monitoring-assessment/key-biodiversity-areas-in-south-africa/"},
 {"id":"v28-constitution","category":"A","title":"Constitution — State institutions supporting constitutional democracy","publisher":"Department of Justice","url":"https://justice.gov.za/legislation/constitution/chp09.html"},
 {"id":"v28-icasa-community","category":"A","title":"Community Broadcasting Regulations","publisher":"ICASA","url":"https://www.icasa.org.za/news/2019/new-community-broadcasting-regulations"},
 {"id":"v28-unesco-ich","category":"A","title":"South Africa — Intangible Cultural Heritage","publisher":"UNESCO","url":"https://ich.unesco.org/en/state/south-africa-ZA"},
 {"id":"v28-dsac-khoisan","category":"A","title":"National Khoi and San Heritage Route","publisher":"Department of Sport, Arts and Culture","url":"https://www.dsac.gov.za/node/395"}
]

PEOPLES = [
 {"id":"za-peoples-layered-v28","title":"Peuples et identités : éviter les cases figées","text":"L'Afrique du Sud ne peut pas être décrite comme une juxtaposition de groupes immobiles. Les identités isiZulu, isiXhosa, Sesotho, Setswana, Sepedi, siSwati, Tshivenda, Xitsonga, isiNdebele, afrikaner, coloured, indian/Asian, khoe et san, entre autres, sont liées à des langues, régions, histoires politiques, parentés, migrations et expériences urbaines qui se chevauchent. Les catégories raciales héritées de l'apartheid continuent d'apparaître dans les statistiques et politiques de réparation, mais elles ne doivent pas être confondues avec des cultures homogènes.","sourceIds":["v28-statssa-census"]},
 {"id":"za-peoples-khoe-san-v28","title":"Khoe et San : présence ancienne, dépossession et revitalisation","text":"Les communautés khoe et san appartiennent aux histoires les plus anciennes de l'Afrique australe. Colonisation, expansion pastorale et agricole, violence frontalière, travail forcé et dépossession territoriale ont profondément bouleversé leurs sociétés. Aujourd'hui, reconnaissance, restitution, langues, patrimoine rupestre, restes humains conservés dans des collections et transmission culturelle sont au cœur d'initiatives de revitalisation. Une route patrimoniale nationale Khoi et San relie précisément sites, récits et communautés plutôt que de réduire ces peuples au passé précolonial.","sourceIds":["v28-dsac-khoisan"]},
 {"id":"za-migration-regional-v28","title":"Migrations régionales et Afrique du Sud contemporaine","text":"Le pays est depuis longtemps un pôle de circulation en Afrique australe. Les systèmes miniers ont attiré des travailleurs du Mozambique, du Lesotho, d'Eswatini, du Malawi et d'autres territoires ; les mobilités contemporaines relient également Zimbabwe, Mozambique, RDC, Nigeria, Somalie et de nombreuses autres sociétés africaines. Ces migrations transforment quartiers, commerces, langues et cultures urbaines tout en suscitant périodiquement des tensions xénophobes. Les migrations doivent donc être reliées à l'économie, aux frontières, aux villes et aux débats sur l'appartenance.","sourceIds":["v28-statssa-census"]}
]

CULTURE = [
 {"id":"za-culture-living-v28","title":"Culture vivante : création plutôt que folklore","text":"La culture sud-africaine contemporaine se fabrique dans les foyers, rues, écoles, églises, stades, studios, taxis, clubs et espaces numériques. Les pratiques héritées et les créations urbaines ne sont pas deux mondes séparés : vêtements, cérémonies, langues, gastronomie, danse, spiritualités et arts se recomposent continuellement. Inonara traite donc le patrimoine vivant comme une pratique sociale actuelle, pas comme une vitrine folklorique.","sourceIds":["v28-unesco-ich"]},
 {"id":"za-culture-music-v28","title":"Une généalogie musicale mondiale","text":"Marabi, mbaqanga, isicathamiya, maskandi, jazz sud-africain, gospel, kwaito, house et amapiano forment une histoire de créations successives plutôt qu'une liste de genres isolés. Johannesburg, Soweto, Pretoria, Durban, Cape Town et d'autres scènes ont servi de laboratoires où circulations africaines, christianisme, instruments occidentaux, langues locales, danse et technologies de production se rencontrent. L'amapiano prolonge cette capacité d'innovation et de circulation internationale au XXIe siècle.","sourceIds":[]},
 {"id":"za-culture-food-v28","title":"Cuisine : une archive des migrations","text":"Braai, pap, chakalaka, umngqusho, bunny chow, bobotie, bredies, koeksisters et cuisines Cape Malay ne racontent pas une cuisine nationale uniforme. Ils révèlent agricultures africaines, élevage, esclavage au Cap, circulations de l'océan Indien, présence indienne, colonisation européenne et cultures ouvrières et urbaines. La nourriture devient ainsi une porte d'entrée vers l'histoire sociale.","sourceIds":[]}
]

ENVIRONMENT = [
 {"id":"za-environment-megadiverse-v28","title":"Une puissance mondiale de biodiversité","text":"L'Afrique du Sud fait partie des 17 pays mégadivers et accueille trois des 36 hotspots mondiaux de biodiversité. L'évaluation nationale 2025 distingue 463 types d'écosystèmes terrestres répartis dans neuf biomes. Fynbos, Succulent Karoo, Grassland, Savanna, Nama-Karoo, Desert, Forest, Albany Thicket et Indian Ocean Coastal Belt produisent une mosaïque écologique exceptionnelle à l'échelle d'un seul État.","sourceIds":["v28-sanbi-nba"]},
 {"id":"za-environment-pressure-v28","title":"Biodiversité sous pression","text":"La richesse biologique ne signifie pas que les écosystèmes sont sécurisés. La National Biodiversity Assessment 2025 classe environ 30 % des 463 types d'écosystèmes terrestres comme menacés. Perte et fragmentation des habitats, plantes invasives, agriculture, extension des établissements humains, pression sur l'eau et changement climatique se combinent. Les Fynbos et Grassland figurent parmi les systèmes particulièrement affectés.","sourceIds":["v28-sanbi-nba"]},
 {"id":"za-environment-protection-v28","title":"Protéger ne signifie pas seulement créer des parcs","text":"Environ un dixième du territoire terrestre bénéficie d'une protection formelle, mais la représentation des écosystèmes demeure inégale. Les programmes de biodiversity stewardship complètent les grands parcs en associant propriétaires et acteurs locaux. En parallèle, 263 Key Biodiversity Areas terrestres ont été approuvées en 2024 après une réévaluation nationale. La conservation doit donc être comprise comme un réseau reliant parcs, paysages productifs, bassins versants, communautés et corridors écologiques.","sourceIds":["v28-sanbi-nba","v28-sanbi-kba"]}
]

MEMORY = [
 {"id":"za-memory-constitution-v28","title":"De la libération à la démocratie constitutionnelle","text":"La transition des années 1990 n'a pas seulement remplacé un gouvernement : elle a reconstruit l'architecture juridique de l'État. La Constitution protège droits fondamentaux, pluralisme et indépendance judiciaire. Son chapitre 9 crée des institutions indépendantes — notamment Public Protector, Human Rights Commission, Commission for Gender Equality, Auditor-General et Electoral Commission — chargées de soutenir la démocratie constitutionnelle.","sourceIds":["v28-constitution"]},
 {"id":"za-memory-trc-v28","title":"Mémoire de l'apartheid : vérité, justice et dossiers non clos","text":"La Truth and Reconciliation Commission a constitué un dispositif majeur pour documenter les violations des droits humains, entendre victimes et auteurs et conditionner certaines amnisties à une divulgation complète. Elle n'a toutefois pas refermé tous les dossiers. Les débats sur poursuites tardives, réparations, archives, monuments, restitution foncière et inégalités structurelles montrent que la mémoire de l'apartheid reste un champ politique vivant.","sourceIds":[]}
]

MEDIA = [
 {"id":"za-media-ecosystem-v28","title":"Médias : public, commercial et communautaire","text":"Le paysage médiatique combine radiodiffusion publique, groupes commerciaux et médias communautaires. Dans un pays marqué par de fortes inégalités d'accès et onze puis douze langues officielles, la radio conserve une importance particulière. Les stations communautaires sont conçues comme des plateformes détenues par les communautés où peuvent s'exprimer histoires, langues, patrimoines et préoccupations locales.","sourceIds":["v28-icasa-community"]},
 {"id":"za-media-digital-v28","title":"Du journal imprimé aux cultures numériques","text":"Télévision, radio et presse coexistent désormais avec médias en ligne, podcasts, YouTube, TikTok, X, Instagram et réseaux de créateurs. Cette transition élargit la production culturelle et politique mais rend aussi centrales les questions de fracture numérique, désinformation, concentration économique, sécurité des journalistes et modèles économiques de l'information. Le dossier relie donc médias et démocratie plutôt que de présenter une simple liste de titres.","sourceIds":[]}
]

FIGURES = [
 {"id":"za-figure-mandela-v28","name":"Nelson Mandela","domain":"politique et mémoire","why":"Figure majeure de la lutte contre l'apartheid, prisonnier politique puis premier président de la démocratie multiraciale en 1994."},
 {"id":"za-figure-sobukwe-v28","name":"Robert Sobukwe","domain":"politique","why":"Fondateur et dirigeant du Pan Africanist Congress, essentiel pour comprendre les courants africains nationalistes au-delà de l'ANC."},
 {"id":"za-figure-biko-v28","name":"Steve Biko","domain":"pensée politique","why":"Figure centrale du Black Consciousness Movement et de la réaffirmation psychologique et politique de la dignité noire."},
 {"id":"za-figure-sisulu-v28","name":"Albertina Sisulu","domain":"politique et société","why":"Militante anti-apartheid et organisatrice dont la trajectoire permet de rendre visibles les réseaux féminins de résistance."},
 {"id":"za-figure-makeba-v28","name":"Miriam Makeba","domain":"musique et diplomatie culturelle","why":"Chanteuse mondialement reconnue, exilée et voix internationale contre l'apartheid."},
 {"id":"za-figure-masekela-v28","name":"Hugh Masekela","domain":"musique","why":"Trompettiste et compositeur majeur du jazz sud-africain, dont l'œuvre accompagne exil, résistance et circulations mondiales."},
 {"id":"za-figure-tutu-v28","name":"Desmond Tutu","domain":"religion, droits humains et mémoire","why":"Archevêque anglican, prix Nobel de la paix et président de la Truth and Reconciliation Commission."},
 {"id":"za-figure-maathai-no-v28","name":"Caster Semenya","domain":"sport et société","why":"Championne olympique dont la carrière est devenue centrale dans les débats mondiaux sur sport, sexe, genre et réglementation."}
]

MAP_LAYERS = [
 {"id":"za-map-peoples-migration-v28","title":"Peuples et migrations","type":"thematic","filters":["peoples","languages","historic-migration","contemporary-migration"],"links":["za-peoples-layered-v28","za-peoples-khoe-san-v28","za-migration-regional-v28"]},
 {"id":"za-map-culture-v28","title":"Cultures vivantes","type":"thematic","filters":["music","food","dance","heritage","urban-scenes"],"links":["za-culture-living-v28","za-culture-music-v28","za-culture-food-v28"]},
 {"id":"za-map-environment-v28","title":"Biomes, biodiversité et conservation","type":"thematic","filters":["biomes","KBA","protected-areas","threatened-ecosystems"],"links":["za-environment-megadiverse-v28","za-environment-pressure-v28","za-environment-protection-v28"]},
 {"id":"za-map-memory-v28","title":"Mémoire, résistance et démocratie","type":"story-map","filters":["apartheid","resistance","prisons","courts","memory-sites"],"links":["za-memory-constitution-v28","za-memory-trc-v28"]},
 {"id":"za-map-media-v28","title":"Médias et espaces publics","type":"thematic","filters":["public","commercial","community","digital"],"links":["za-media-ecosystem-v28","za-media-digital-v28"]}
]

def _merge_unique(target, incoming):
    ids={x.get('id') for x in target if isinstance(x,dict)}
    target.extend(x for x in incoming if x.get('id') not in ids)

def apply_south_africa_v28(dossier):
    if dossier.get('iso2')!='ZA': return dossier
    _merge_unique(dossier.setdefault('peoples',{}).setdefault('themes',[]),PEOPLES)
    _merge_unique(dossier.setdefault('culture',{}).setdefault('themes',[]),CULTURE)
    _merge_unique(dossier.setdefault('environment',{}).setdefault('themes',[]),ENVIRONMENT)
    _merge_unique(dossier.setdefault('institutions_memory',{}).setdefault('themes',[]),MEMORY)
    _merge_unique(dossier.setdefault('media',{}).setdefault('themes',[]),MEDIA)
    _merge_unique(dossier.setdefault('figures',[]),FIGURES)
    _merge_unique(dossier.setdefault('interactive',{}).setdefault('mapLayers',[]),MAP_LAYERS)
    _merge_unique(dossier.setdefault('sources',[]),V28_SOURCES)
    dossier['last_reviewed']='2026-09-13'
    dossier['content_completion']={'fr':'Pilote français : peuples/migrations, culture vivante, environnement, personnalités, institutions-mémoire, médias et couches cartographiques enrichis. Audit final encore requis avant traduction.','phase':'fr-pilot-deepening-v28'}
    return dossier
