export const NAMIBIA_DOSSIER = {
  id: "country-na-master-v1",
  country: "Namibia",
  iso2: "NA",
  iso3: "NAM",
  slug: "namibia",
  name: { fr: "Namibie", en: "Namibia" },
  region: { id: "southern-africa", fr: "Afrique australe", en: "Southern Africa" },
  status: "published-v1",
  last_reviewed: "2026-09-11",
  editorial_note: {
    fr: "Dossier de synthèse consacré à la Namibie, de la longue histoire des sociétés du territoire aux transformations contemporaines. Les sections sensibles distinguent les faits établis, les mémoires communautaires et les débats historiographiques.",
    en: "A synthesis dossier on Namibia, from the long history of the societies of the territory to contemporary transformations. Sensitive sections distinguish established facts, community memories and historiographical debates.",
  },
  presentation: {
    heading: { fr: "La Namibie en un regard", en: "Namibia at a glance" },
    facts: [
      { label: { fr: "Nom officiel", en: "Official name" }, value: { fr: "République de Namibie", en: "Republic of Namibia" } },
      { label: { fr: "Capitale", en: "Capital" }, value: "Windhoek" },
      { label: { fr: "Situation", en: "Location" }, value: { fr: "Façade atlantique du sud-ouest de l’Afrique", en: "South-western Atlantic coast of Africa" } },
      { label: { fr: "Superficie", en: "Area" }, value: { fr: "environ 825 000 km²", en: "about 825,000 km²" } },
      { label: { fr: "Population", en: "Population" }, value: { fr: "3 022 401 habitants au recensement de 2023", en: "3,022,401 inhabitants in the 2023 census" } },
      { label: { fr: "Monnaie", en: "Currency" }, value: { fr: "Dollar namibien (NAD) ; rand sud-africain également utilisé", en: "Namibian dollar (NAD); South African rand also used" } },
      { label: { fr: "Langue officielle", en: "Official language" }, value: { fr: "Anglais", en: "English" } },
      { label: { fr: "Indépendance", en: "Independence" }, value: { fr: "21 mars 1990", en: "21 March 1990" } },
    ],
  },
  overview: {
    title: { fr: "Namibie", en: "Namibia" },
    summary: {
      fr: "La Namibie occupe une vaste façade atlantique d’Afrique australe, entre l’Angola, la Zambie, le Botswana et l’Afrique du Sud. Elle associe le désert du Namib, les escarpements du centre, le bassin du Kalahari, des savanes et les zones plus humides du nord-est. Son histoire relie des communautés de chasseurs-cueilleurs, des sociétés pastorales et agricoles, des réseaux régionaux, la colonisation allemande, le génocide des Ovaherero et des Nama, l’administration sud-africaine, la lutte de libération et l’indépendance de 1990.",
      en: "Namibia occupies a vast Atlantic frontage in Southern Africa, between Angola, Zambia, Botswana and South Africa. It brings together the Namib Desert, central escarpments, the Kalahari basin, savannas and the wetter north-east. Its history connects hunter-gatherer communities, pastoral and farming societies, regional networks, German colonization, the genocide of the Ovaherero and Nama, South African rule, the liberation struggle and independence in 1990.",
    },
    capital: "Windhoek",
    official_languages: [{ fr: "anglais", en: "English" }],
    currency: { fr: "dollar namibien (NAD)", en: "Namibian dollar (NAD)" },
    neighbours: ["Angola", "Zambia", "Botswana", "South Africa"],
    history_chapters: [
      { id: "na-history-deep-time", title: { fr: "Longues occupations humaines et art rupestre", en: "Long human occupation and rock art" }, period: { fr: "Préhistoire – premiers millénaires de notre ère", en: "Prehistory – first millennia CE" }, summary: { fr: "Les paysages namibiens conservent des traces d’occupations humaines anciennes. Twyfelfontein /Ui-//aes documente notamment des pratiques rituelles de communautés de chasseurs-cueilleurs sur au moins deux millénaires.", en: "Namibian landscapes preserve traces of ancient human occupation. Twyfelfontein /Ui-//aes notably documents ritual practices of hunter-gatherer communities over at least two millennia." }, status: "ready", sources: ["src-na-unesco-twyfelfontein"] },
      { id: "na-history-regional-societies", title: { fr: "Sociétés pastorales, agricoles et réseaux régionaux", en: "Pastoral, farming societies and regional networks" }, period: { fr: "premier millénaire – XIXe siècle", en: "first millennium – 19th century" }, summary: { fr: "Des communautés san, khoekhoe, damara, herero, ovambo, kavango et d’autres groupes participent à des économies et à des systèmes politiques variés, reliés aux mondes du Kalahari, de l’Angola méridional, du bassin du Zambèze et du Cap.", en: "San, Khoekhoe, Damara, Herero, Ovambo, Kavango and other communities participated in varied economies and political systems connected to the Kalahari, southern Angola, the Zambezi basin and the Cape." }, status: "provisional", sources: ["src-na-nhc"] },
      { id: "na-history-german-colony", title: { fr: "Colonisation allemande et génocide", en: "German colonization and genocide" }, period: "1884–1915", summary: { fr: "L’Empire allemand établit la colonie du Sud-Ouest africain allemand. La guerre de 1904–1908 contre les Ovaherero et les Nama débouche sur un génocide, accompagné de déplacements, de camps, de confiscations de terres et de systèmes de travail coercitifs.", en: "The German Empire established the colony of German South West Africa. The 1904–1908 war against the Ovaherero and Nama culminated in genocide, displacement, camps, land confiscation and coercive labour systems." }, status: "ready", sources: ["src-na-jns-genocide"] },
      { id: "na-history-south-african-rule", title: { fr: "Administration sud-africaine et apartheid", en: "South African rule and apartheid" }, period: "1915–1990", summary: { fr: "Après la conquête sud-africaine pendant la Première Guerre mondiale, le territoire passe sous mandat de la Société des Nations administré par l’Afrique du Sud. Pretoria étend ensuite des politiques de ségrégation et d’apartheid.", en: "After South African conquest during the First World War, the territory became a League of Nations mandate administered by South Africa. Pretoria later extended segregation and apartheid policies." }, status: "ready", sources: ["src-na-un-independence"] },
      { id: "na-history-independence", title: { fr: "Transition, indépendance et construction républicaine", en: "Transition, independence and republican state-building" }, period: { fr: "1989–présent", en: "1989–present" }, summary: { fr: "La résolution 435 du Conseil de sécurité fournit le cadre de la transition supervisée par l’ONU. Des élections constituantes ont lieu en 1989 et la Namibie devient indépendante le 21 mars 1990.", en: "UN Security Council Resolution 435 provided the framework for the UN-supervised transition. Constituent elections took place in 1989 and Namibia became independent on 21 March 1990." }, status: "ready", sources: ["src-na-un-independence", "src-na-parliament"] },
    ],
  },
  territory_sections: [
    { id: "na-namib", title: { fr: "Désert du Namib et côte atlantique", en: "Namib Desert and Atlantic coast" }, summary: { fr: "Le Namib longe l’Atlantique et comprend dunes, plaines graveleuses, inselbergs, lagunes et rivières éphémères.", en: "The Namib runs along the Atlantic and includes dunes, gravel plains, inselbergs, lagoons and ephemeral rivers." }, sources: ["src-na-unesco-namib"] },
    { id: "na-central-highlands", title: { fr: "Hauts plateaux et escarpements centraux", en: "Central highlands and escarpments" }, summary: { fr: "Le centre du pays concentre Windhoek et plusieurs grands axes de peuplement.", en: "Central Namibia contains Windhoek and several major settlement corridors." }, sources: ["src-na-worldbank"] },
    { id: "na-kalahari", title: { fr: "Kalahari et bassins intérieurs", en: "Kalahari and interior basins" }, summary: { fr: "L’est namibien appartient au vaste système du Kalahari, caractérisé par des sols sableux, des savanes sèches et de fortes contraintes hydriques.", en: "Eastern Namibia belongs to the wider Kalahari system, characterized by sandy soils, dry savannas and severe water constraints." }, sources: ["src-na-worldbank"] },
    { id: "na-north-zambezi", title: { fr: "Nord et région du Zambèze", en: "North and Zambezi Region" }, summary: { fr: "Le nord et l’extrême nord-est disposent de régimes hydrologiques et de densités humaines différents du centre aride.", en: "The north and far north-east have hydrological regimes and population densities distinct from the arid centre." }, sources: ["src-na-sadc"] },
  ],
  institutions: {
    capital_functions: [{ city: "Windhoek", function: { fr: "Capitale nationale et principal centre politique et administratif.", en: "National capital and principal political and administrative centre." } }],
    provinces: [
      { name: "Erongo", capital: "Swakopmund" }, { name: "Hardap", capital: "Mariental" }, { name: "ǁKaras", capital: "Keetmanshoop" }, { name: "Kavango East", capital: "Rundu" }, { name: "Kavango West", capital: "Nkurenkuru" }, { name: "Khomas", capital: "Windhoek" }, { name: "Kunene", capital: "Opuwo" }, { name: "Ohangwena", capital: "Eenhana" }, { name: "Omaheke", capital: "Gobabis" }, { name: "Omusati", capital: "Outapi" }, { name: "Oshana", capital: "Oshakati" }, { name: "Oshikoto", capital: "Omuthiya" }, { name: "Otjozondjupa", capital: "Otjiwarongo" }, { name: "Zambezi", capital: "Katima Mulilo" },
    ],
  },
  languages: {
    official: [{ fr: "anglais", en: "English" }],
    household_2023: [
      { language: "Oshiwambo", note: { fr: "Ensemble de variétés très présent dans le nord et dans les mobilités urbaines.", en: "A cluster of varieties widely used in the north and in urban mobility." } },
      { language: "Khoekhoegowab", note: { fr: "Langue khoe parlée notamment par des communautés nama et damara.", en: "Khoe language spoken notably by Nama and Damara communities." } },
      { language: "Otjiherero", note: { fr: "Langue des communautés ovaherero et apparentées.", en: "Language of Ovaherero and related communities." } },
      { language: "Afrikaans", note: { fr: "Langue de communication importante héritée de l’histoire régionale.", en: "Important lingua franca shaped by regional history." } },
    ],
  },
  peoples: [
    { id: "people-ovambo-namibia-v1", name: { fr: "Communautés ovambo", en: "Ovambo communities" }, regions: [{ fr: "nord de la Namibie et sud de l’Angola", en: "northern Namibia and southern Angola" }], languages: ["Oshiwambo"], history: { fr: "Ensemble de communautés aux histoires politiques et territoriales distinctes, liées de longue date au nord de la Namibie et au sud de l’Angola.", en: "A set of communities with distinct political and territorial histories long connected to northern Namibia and southern Angola." }, sources: ["src-na-unesco-languages"] },
    { id: "people-ovaherero-v1", name: "Ovaherero", regions: [{ fr: "centre et nord-ouest de la Namibie, Botswana et diaspora régionale", en: "central and north-western Namibia, Botswana and regional diaspora" }], languages: ["Otjiherero"], history: { fr: "Les Ovaherero ont développé des sociétés pastorales et des organisations politiques variées. Le génocide colonial de 1904–1908 constitue un traumatisme historique central.", en: "The Ovaherero developed varied pastoral societies and political organizations. The 1904–1908 colonial genocide is a central historical trauma." }, sources: ["src-na-jns-genocide"] },
    { id: "people-nama-v1", name: "Nama", regions: [{ fr: "sud et centre de la Namibie, Afrique du Sud", en: "southern and central Namibia, South Africa" }], languages: ["Khoekhoegowab"], history: { fr: "Des communautés nama participent à de vastes réseaux pastoraux et politiques d’Afrique australe. Elles subissent elles aussi la guerre coloniale et le génocide de 1904–1908.", en: "Nama communities participated in broad pastoral and political networks in Southern Africa and also suffered the colonial war and genocide of 1904–1908." }, sources: ["src-na-jns-genocide"] },
    { id: "people-damara-v1", name: "Damara", regions: [{ fr: "centre et nord-ouest de la Namibie", en: "central and north-western Namibia" }], languages: ["Khoekhoegowab"], history: { fr: "Les communautés damara ont des trajectoires anciennes distinctes.", en: "Damara communities have distinct long-term historical trajectories." }, sources: ["src-na-nhc"] },
    { id: "people-san-namibia-v1", name: { fr: "Communautés san", en: "San communities" }, regions: [{ fr: "est et nord-est de la Namibie et réseaux transfrontaliers du Kalahari", en: "eastern and north-eastern Namibia and transborder Kalahari networks" }], history: { fr: "Le terme San regroupe plusieurs communautés dont les langues et les histoires sont distinctes.", en: "The term San encompasses multiple communities with distinct languages and histories." }, sources: ["src-na-unesco-languages"] },
  ],
  polities: { items: [
    { id: "na-ovambo-kingdoms", name: { fr: "Royaumes et communautés politiques ovambo", en: "Ovambo kingdoms and political communities" }, period: { fr: "époque précoloniale – XXe siècle", en: "precolonial era – 20th century" }, note: { fr: "Le nord de la Namibie comprend plusieurs formations politiques distinctes ; l’étiquette « Ovambo » ne désigne pas un royaume unique.", en: "Northern Namibia included several distinct political formations; ‘Ovambo’ does not designate a single kingdom." }, status: "provisional", sources: ["src-na-nhc"] },
    { id: "na-herero-polities", name: { fr: "Pouvoirs ovaherero", en: "Ovaherero polities" }, period: { fr: "XVIIIe–début XXe siècle", en: "18th–early 20th century" }, note: { fr: "Des autorités et réseaux pastoraux ovaherero structurent une partie du centre du territoire avant et pendant la pénétration coloniale.", en: "Ovaherero authorities and pastoral networks structured part of central Namibia before and during colonial penetration." }, status: "provisional", sources: ["src-na-jns-genocide"] },
  ] },
  religions: { items: [
    { id: "na-christianities", name: { fr: "Christianismes", en: "Christianities" }, note: { fr: "Les Églises chrétiennes occupent une place majeure dans la vie sociale, avec des traditions confessionnelles diverses.", en: "Christian churches play a major role in social life, with diverse denominational traditions." }, status: "ready", sources: ["src-na-unesco"] },
    { id: "na-indigenous-spiritualities", name: { fr: "Spiritualités et pratiques autochtones", en: "Indigenous spiritualities and practices" }, note: { fr: "Des pratiques rituelles, mémoires ancestrales et cosmologies persistent ou se recomposent selon les communautés.", en: "Ritual practices, ancestral memories and cosmologies persist or are reconfigured across communities." }, status: "provisional", sources: ["src-na-unesco-twyfelfontein"] },
  ] },
  culture: [
    { id: "na-rock-art", title: { fr: "Art rupestre et paysages de mémoire", en: "Rock art and landscapes of memory" }, summary: { fr: "Twyfelfontein /Ui-//aes relie art rupestre, pratiques rituelles, économie et usages de l’eau dans une histoire de plusieurs millénaires.", en: "Twyfelfontein /Ui-//aes connects rock art, ritual practice, economy and water use across several millennia." }, sources: ["src-na-unesco-twyfelfontein"] },
    { id: "na-living-languages", title: { fr: "Multilinguisme vivant", en: "Living multilingualism" }, summary: { fr: "Langues bantoues, khoe et autres traditions linguistiques structurent les identités régionales et les productions culturelles contemporaines.", en: "Bantu, Khoe and other linguistic traditions shape regional identities and contemporary cultural production." }, sources: ["src-na-unesco-languages"] },
  ],
  heritage: [
    { id: "na-twyfelfontein", name: "Twyfelfontein /Ui-//aes", type: { fr: "Patrimoine mondial culturel", en: "World Cultural Heritage" }, note: { fr: "L’un des grands ensembles d’art rupestre d’Afrique, inscrit au patrimoine mondial en 2007.", en: "One of Africa’s major rock-art ensembles, inscribed on the World Heritage List in 2007." }, status: "ready", sources: ["src-na-unesco-twyfelfontein"] },
    { id: "na-namib-sand-sea", name: { fr: "Erg du Namib / Namib Sand Sea", en: "Namib Sand Sea" }, type: { fr: "Patrimoine mondial naturel", en: "World Natural Heritage" }, note: { fr: "Désert côtier de dunes sous influence du brouillard, inscrit au patrimoine mondial en 2013.", en: "Coastal fog-influenced dune desert, inscribed on the World Heritage List in 2013." }, status: "ready", sources: ["src-na-unesco-namib"] },
  ],
  society: { themes: [
    { id: "na-population-2023", title: { fr: "Un territoire vaste et peu densément peuplé", en: "A vast, sparsely populated territory" }, summary: { fr: "Le recensement de 2023 dénombre 3 022 401 habitants, avec une densité moyenne de 3,7 personnes par km².", en: "The 2023 census counted 3,022,401 inhabitants, with an average density of 3.7 people per km²." }, sources: ["src-na-nsa-census"] },
    { id: "na-inequality", title: { fr: "Inégalités et héritages fonciers", en: "Inequality and land legacies" }, summary: { fr: "Les inégalités de revenus, de terres et d’opportunités demeurent parmi les principaux défis structurels du pays.", en: "Inequalities in income, land and opportunity remain among the country’s main structural challenges." }, sources: ["src-na-worldbank"] },
  ] },
  education_health: {
    education: { items: [{ id: "na-education-access", title: { fr: "Éducation, langues et accès", en: "Education, languages and access" }, summary: { fr: "L’expansion de l’éducation depuis l’indépendance coexiste avec des écarts de qualité, d’accès territorial et des enjeux liés au multilinguisme.", en: "The expansion of education since independence coexists with gaps in quality, territorial access and multilingual challenges." }, sources: ["src-na-worldbank", "src-na-unesco-languages"] }] },
    health: { items: [{ id: "na-health-system", title: { fr: "Santé publique et fortes distances territoriales", en: "Public health across long distances" }, summary: { fr: "La faible densité de population et les distances compliquent l’accès équitable aux services de santé.", en: "Low population density and long distances complicate equitable access to health services." }, sources: ["src-na-worldbank"] }] },
  },
  economy: { sections: [
    { id: "na-mining", title: { fr: "Mines et exportations", en: "Mining and exports" }, summary: { fr: "L’économie dépend fortement des activités minières et des marchés de matières premières.", en: "The economy depends heavily on mining and commodity markets." }, sources: ["src-na-worldbank"] },
    { id: "na-services-tourism", title: { fr: "Services, transport et tourisme", en: "Services, transport and tourism" }, summary: { fr: "Les services occupent une place croissante, tandis que le tourisme s’appuie fortement sur les paysages, la faune et les patrimoines.", en: "Services are increasingly important, while tourism relies strongly on landscapes, wildlife and heritage." }, sources: ["src-na-worldbank", "src-na-unesco-namib"] },
    { id: "na-agriculture", title: { fr: "Agriculture et élevage sous contrainte climatique", en: "Farming and livestock under climate constraints" }, summary: { fr: "Agriculture et élevage restent essentiels à de nombreux ménages ruraux mais sont très exposés aux sécheresses.", en: "Agriculture and livestock remain essential to many rural households but are highly exposed to drought." }, sources: ["src-na-worldbank"] },
  ] },
  migrations: [
    { id: "na-regional-mobility", label: { fr: "Mobilités régionales anciennes et contemporaines", en: "Long-term and contemporary regional mobility" }, period: { fr: "longue durée", en: "long duration" }, type: "mixed", reason: { fr: "Les frontières modernes traversent des espaces sociaux plus anciens reliant notamment l’Angola méridional, le Kalahari, le Botswana et l’Afrique du Sud.", en: "Modern borders cross older social spaces connecting southern Angola, the Kalahari, Botswana and South Africa." }, sources: ["src-na-sadc"] },
    { id: "na-colonial-displacement", label: { fr: "Déplacements et exils liés aux violences coloniales", en: "Displacement and exile linked to colonial violence" }, start: 1904, end: 1908, type: "forced", reason: { fr: "La guerre coloniale et le génocide des Ovaherero et des Nama provoquent morts, déplacements forcés, pertes de terres et exils régionaux.", en: "Colonial war and the genocide of the Ovaherero and Nama caused deaths, forced displacement, land loss and regional exile." }, sources: ["src-na-jns-genocide"] },
  ],
  figures: [
    { id: "figure-sam-nujoma-v1", name: "Sam Nujoma", field: { fr: "Indépendance et politique", en: "Independence and politics" }, reason: { fr: "Figure majeure de la SWAPO et premier président de la Namibie indépendante.", en: "Major SWAPO figure and first president of independent Namibia." }, sources: ["src-na-un-independence", "src-na-sadc"] },
    { id: "figure-hendrik-witbooi-v1", name: "Hendrik Witbooi", field: { fr: "Résistance anticoloniale", en: "Anti-colonial resistance" }, reason: { fr: "Chef nama dont les écrits et la résistance occupent une place majeure dans l’histoire de la colonisation allemande.", en: "Nama leader whose writings and resistance are central to the history of German colonization." }, sources: ["src-na-nhc"] },
    { id: "figure-hosea-kutako-v1", name: "Hosea Kutako", field: { fr: "Droits et décolonisation", en: "Rights and decolonization" }, reason: { fr: "Chef ovaherero et figure importante des pétitions internationales contre l’administration sud-africaine.", en: "Ovaherero leader and major figure in international petitions against South African rule." }, sources: ["src-na-un-independence"] },
  ],
  interactive_timeline: { items: [
    { id: "na-timeline-twyfelfontein", start: -2000, end: null, label: { fr: "Traditions d’art rupestre à Twyfelfontein", en: "Rock-art traditions at Twyfelfontein" }, text: { fr: "Les gravures et peintures documentent au moins deux millénaires de pratiques de chasseurs-cueilleurs.", en: "Engravings and paintings document at least two millennia of hunter-gatherer practices." }, status: "ready", sources: ["src-na-unesco-twyfelfontein"] },
    { id: "na-timeline-german-colony", start: 1884, end: 1915, label: { fr: "Sud-Ouest africain allemand", en: "German South West Africa" }, text: { fr: "Mise en place de la colonie allemande et profondes transformations territoriales et sociales.", en: "Establishment of German colonial rule and profound territorial and social transformations." }, status: "ready", sources: ["src-na-jns-genocide"] },
    { id: "na-timeline-genocide", start: 1904, end: 1908, label: { fr: "Génocide des Ovaherero et des Nama", en: "Genocide of the Ovaherero and Nama" }, text: { fr: "La guerre coloniale allemande débouche sur une politique de destruction, déplacements, camps et confiscations.", en: "German colonial war culminated in destruction, displacement, camps and confiscations." }, status: "ready", sources: ["src-na-jns-genocide"] },
    { id: "na-timeline-independence", start: 1990, end: null, label: { fr: "Indépendance", en: "Independence" }, text: { fr: "La Namibie devient indépendante le 21 mars 1990.", en: "Namibia became independent on 21 March 1990." }, status: "ready", sources: ["src-na-un-independence"] },
  ] },
  national_symbols: { items: [
    { id: "na-symbol-flag", title: { fr: "Drapeau national", en: "National flag" }, note: { fr: "Adopté à l’indépendance en 1990.", en: "Adopted at independence in 1990." }, sources: ["src-na-parliament"] },
    { id: "na-symbol-independence-day", title: { fr: "Fête de l’indépendance", en: "Independence Day" }, note: { fr: "Le 21 mars commémore l’indépendance de 1990.", en: "21 March commemorates independence in 1990." }, sources: ["src-na-un-independence"] },
  ] },
  international_role: { memberships: [
    { id: "na-sadc", title: "SADC", summary: { fr: "La Namibie rejoint la SADCC en 1990 et accueille à Windhoek en 1992 la signature du traité transformant l’organisation en SADC.", en: "Namibia joined the SADCC in 1990 and hosted the 1992 Windhoek treaty that transformed it into SADC." }, sources: ["src-na-sadc"] },
    { id: "na-un", title: { fr: "Nations unies", en: "United Nations" }, summary: { fr: "La Namibie devient membre de l’ONU peu après son indépendance en 1990.", en: "Namibia joined the United Nations shortly after independence in 1990." }, sources: ["src-na-un-independence"] },
  ] },
  historiography: { items: [
    { id: "na-hist-genocide", title: { fr: "Nommer et documenter le génocide de 1904–1908", en: "Naming and documenting the 1904–1908 genocide" }, note: { fr: "Présenter les travaux historiques, les mémoires ovaherero et nama, les archives coloniales et les débats sur réparations et restitutions sans réduire le sujet à une seule narration étatique.", en: "Present historical research, Ovaherero and Nama memories, colonial archives and debates on reparations and restitution without reducing the subject to a single state narrative." }, sources: ["src-na-jns-genocide"] },
  ] },
  research_gaps: [
    { id: "na-gap-polities", title: { fr: "Cartographie politique précoloniale", en: "Precolonial political mapping" }, note: { fr: "Affiner les territoires, mobilités et temporalités des formations politiques sans figer des frontières modernes.", en: "Refine territories, mobilities and chronologies of political formations without freezing modern borders." }, status: "research-gap" },
    { id: "na-gap-gallery", title: { fr: "Galerie documentaire licenciée", en: "Licensed documentary gallery" }, note: { fr: "Ajouter des images uniquement lorsque l’auteur, la source et les droits de réutilisation sont explicitement documentés.", en: "Add images only when author, source and reuse rights are explicitly documented." }, status: "research-gap" },
  ],
  map_visuals: {
    territory_places: [
      { id: "na-place-windhoek", label: "Windhoek", coordinates: [17.0836, -22.5609], kind: "capital", min_zoom: 4 },
      { id: "na-place-swakopmund", label: "Swakopmund", coordinates: [14.5266, -22.6784], kind: "city", min_zoom: 6 },
      { id: "na-place-walvis-bay", label: "Walvis Bay", coordinates: [14.5053, -22.9576], kind: "city", min_zoom: 6 },
      { id: "na-place-rundu", label: "Rundu", coordinates: [19.7667, -17.9333], kind: "city", min_zoom: 6 },
      { id: "na-place-katima", label: "Katima Mulilo", coordinates: [24.2667, -17.5], kind: "city", min_zoom: 6 },
      { id: "na-place-twyfelfontein", label: "Twyfelfontein /Ui-//aes", coordinates: [14.3751, -20.5948], kind: "heritage", min_zoom: 7, sources: ["src-na-unesco-twyfelfontein"] },
      { id: "na-place-namib-sand-sea", label: "Namib Sand Sea", coordinates: [15.4078, -24.8853], kind: "natural-heritage", min_zoom: 6, sources: ["src-na-unesco-namib"] },
    ],
    bounds: [[-29.1, 11.6], [-16.9, 25.3]],
  },
  media_gallery: [],
  sources: [
    { id: "src-na-nsa-census", title: "2023 Population and Housing Census", publisher: "Namibia Statistics Agency", url: "https://census.nsa.org.na/", type: "official-statistics" },
    { id: "src-na-parliament", title: "Parliament of Namibia — General information and constitutional institutions", publisher: "Parliament of Namibia", url: "https://www.parliament.na/", type: "institutional" },
    { id: "src-na-un-independence", title: "The UN's role in Namibian Independence", publisher: "United Nations in Namibia", url: "https://namibia.un.org/en/175155-uns-role-namibian-independence", type: "institutional-history" },
    { id: "src-na-unesco-twyfelfontein", title: "Twyfelfontein or /Ui-//aes", publisher: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/1255", type: "heritage" },
    { id: "src-na-unesco-namib", title: "Namib Sand Sea", publisher: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/1430", type: "heritage" },
    { id: "src-na-unesco", title: "Namibia", publisher: "UNESCO", url: "https://www.unesco.org/en/countries/na", type: "institutional" },
    { id: "src-na-unesco-languages", title: "Indigenous voices, pathways to a sustainable future", publisher: "UNESCO", url: "https://www.unesco.org/en/articles/indigenous-voices-pathways-sustainable-future-national-dialogue-safeguarding-namibian-indigenous", type: "institutional-cultural" },
    { id: "src-na-nhc", title: "National Heritage Council of Namibia", publisher: "National Heritage Council of Namibia", url: "https://nhc-nam.org/", type: "institutional-heritage" },
    { id: "src-na-jns-genocide", title: "The military campaign in German Southwest Africa, 1904–1907 and the genocide of the Herero and Nama", publisher: "Journal of Namibian Studies", url: "https://namibian-studies.com/index.php/JNS/article/view/21", type: "academic" },
    { id: "src-na-sadc", title: "Namibia — Member State profile", publisher: "Southern African Development Community", url: "https://www.sadc.int/member-states/namibia", type: "regional-institution" },
    { id: "src-na-worldbank", title: "Namibia overview", publisher: "World Bank", url: "https://www.worldbank.org/en/country/namibia/overview", type: "international-institution" },
  ],
};

export const LOCAL_COUNTRY_DOSSIERS = [NAMIBIA_DOSSIER];
export const LOCAL_COUNTRIES = [
  { iso2: "NA", iso3: "NAM", name: "Namibia", display_name: "Namibia" },
];

export const getLocalCountryDossier = (iso2) => LOCAL_COUNTRY_DOSSIERS.find((dossier) => dossier.iso2 === iso2) || null;
