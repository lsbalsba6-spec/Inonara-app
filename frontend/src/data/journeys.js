const bi = (fr, en) => ({ fr, en });

export const JOURNEY_DIMENSIONS = {
  regions: [
    { id: "north-africa-sahara", label: bi("Afrique du Nord & Sahara", "North Africa & Sahara") },
    { id: "west-africa-sahel", label: bi("Afrique de l’Ouest & Sahel", "West Africa & Sahel") },
    { id: "east-africa-indian-ocean", label: bi("Afrique de l’Est & océan Indien", "East Africa & Indian Ocean") },
    { id: "central-africa", label: bi("Afrique centrale", "Central Africa") },
    { id: "southern-africa", label: bi("Afrique australe", "Southern Africa") },
    { id: "continental", label: bi("Continental", "Continental") },
  ],
  periods: [
    { id: "ancient", label: bi("Antiquité", "Ancient") },
    { id: "medieval", label: bi("Médiéval", "Medieval") },
    { id: "early-modern", label: bi("Époque moderne", "Early modern") },
    { id: "modern", label: bi("XIXe–XXIe siècles", "19th–21st centuries") },
  ],
  themes: [
    { id: "trade-networks", label: bi("Échanges & réseaux", "Trade & networks") },
    { id: "states-power", label: bi("États & pouvoir", "States & power") },
    { id: "knowledge-religion", label: bi("Savoirs & religions", "Knowledge & religion") },
    { id: "heritage-cities", label: bi("Patrimoines & villes", "Heritage & cities") },
    { id: "migration-diaspora", label: bi("Migrations & diasporas", "Migration & diasporas") },
    { id: "colonialism-independence", label: bi("Colonisation & indépendances", "Colonialism & independence") },
  ],
};

export const JOURNEY_CATEGORIES = [
  { id: "all", label: bi("Tous", "All") },
  { id: "trade", label: bi("Routes commerciales", "Trade routes") },
  { id: "culture", label: bi("Cultures et patrimoines", "Cultures & heritage") },
  { id: "independence", label: bi("Indépendances", "Independence") },
];

export const journeys = [
  {
    journeyId: "trans-saharan-gold-salt",
    category: "trade",
    regionIds: ["north-africa-sahara", "west-africa-sahel"],
    periodIds: ["medieval", "early-modern"],
    themeIds: ["trade-networks", "states-power", "knowledge-religion"],
    peopleIds: [],
    title: bi("Or, sel et villes du Sahara", "Gold, salt and cities across the Sahara"),
    subtitle: bi("Un réseau de caravanes entre Maghreb et Sahel", "A caravan network between the Maghreb and the Sahel"),
    period: bi("XIe–XVIe siècles", "11th–16th centuries"),
    introduction: bi(
      "Ce parcours suit quelques nœuds majeurs des échanges transsahariens qui reliaient l’Afrique du Nord aux sociétés du Sahel. Il ne reconstitue pas une route unique et fixe : les caravanes changeaient d’itinéraire selon les saisons, les pouvoirs politiques, la sécurité et les marchés. Le fil narratif montre comment le sel, l’or, les textiles, les manuscrits et les personnes circulaient au sein d’un vaste système d’échanges.",
      "This journey follows several major nodes in the trans-Saharan exchanges linking North Africa with Sahelian societies. It does not reconstruct one single, fixed road: caravan routes shifted with seasons, political power, security and markets. The narrative shows how salt, gold, textiles, manuscripts and people moved through a broad exchange system."
    ),
    mapCaption: bi("Les traits relient des étapes pédagogiques, pas une route unique documentée.", "Lines connect interpretive stops, not one documented fixed road."),
    relations: {
      countryIds: ["MAR", "MLI"],
      civilizationIds: ["ghana-wagadu", "mali-empire", "songhai-empire"],
      figureIds: [],
      peopleIds: [],
      timelineEventIds: ["trans-saharan-trade-expansion", "mali-commercial-apogee"],
      diasporaIds: [],
    },
    stops: [
      {
        stopId: "sijilmasa-caravan-gateway",
        order: 1,
        title: bi("Sijilmassa, porte nord du désert", "Sijilmasa, northern gateway to the desert"),
        place: { name: bi("Sijilmassa / Tafilalet", "Sijilmasa / Tafilalt"), countryId: "MAR", lat: 31.28, lng: -4.27 },
        period: bi("XIe–XIVe siècles", "11th–14th centuries"),
        context: bi(
          "Dans l’oasis du Tafilalet, Sijilmassa fut l’un des grands terminus nord des échanges transsahariens. Les marchands y organisaient des caravanes et raccordaient les réseaux sahariens aux marchés du Maghreb et, au-delà, à la Méditerranée. L’importance de la ville rappelle que le commerce saharien reposait autant sur des centres logistiques que sur les traversées elles-mêmes.",
          "In the Tafilalt oasis, Sijilmasa became one of the major northern termini of trans-Saharan exchange. Merchants organized caravans there and connected Saharan networks to Maghrebi markets and, beyond them, the Mediterranean. Its importance shows that Saharan commerce depended as much on logistical hubs as on desert crossings themselves."
        ),
        linkedEvents: [bi("Organisation des caravanes vers le Sahel", "Caravan organization toward the Sahel")],
        countryIds: ["MAR"], civilizationIds: ["ghana-wagadu", "mali-empire"], figureIds: [], peopleIds: [], timelineEventIds: ["trans-saharan-trade-expansion"],
      },
      {
        stopId: "taghaza-salt-mines",
        order: 2,
        title: bi("Taghaza, le sel comme ressource stratégique", "Taghaza, salt as a strategic resource"),
        place: { name: bi("Taghaza", "Taghaza"), countryId: "MLI", lat: 23.55, lng: -5.77 },
        period: bi("XIIIe–XVIe siècles", "13th–16th centuries"),
        context: bi(
          "Les salines de Taghaza illustrent la valeur économique du sel dans les échanges entre Sahara et Sahel. Extrait dans un environnement extrêmement aride, il était transporté en plaques par caravanes de dromadaires. Le contrôle de ces zones minières et des axes qui les desservaient fut un enjeu pour les grands pouvoirs sahéliens.",
          "The salt mines of Taghaza illustrate the economic value of salt in exchanges between the Sahara and the Sahel. Extracted in an extremely arid environment, it was carried in slabs by camel caravans. Control of these mining zones and the routes serving them became strategically important to major Sahelian powers."
        ),
        linkedEvents: [bi("Extraction et transport caravanier du sel", "Salt extraction and caravan transport")],
        countryIds: ["MLI"], civilizationIds: ["mali-empire", "songhai-empire"], figureIds: [], peopleIds: [], timelineEventIds: ["mali-commercial-apogee"],
      },
      {
        stopId: "timbuktu-market-scholarship",
        order: 3,
        title: bi("Tombouctou, commerce et savoirs", "Timbuktu, commerce and scholarship"),
        place: { name: bi("Tombouctou", "Timbuktu"), countryId: "MLI", lat: 16.7666, lng: -3.0026 },
        period: bi("XIIIe–XVIe siècles", "13th–16th centuries"),
        context: bi(
          "Tombouctou se développa à l’articulation des échanges sahariens et des réseaux du fleuve Niger. Sous les empires du Mali puis songhaï, la ville fut à la fois un marché régional et un centre intellectuel musulman majeur, connu pour ses mosquées, ses écoles et ses traditions manuscrites. Les marchandises et les idées voyageaient dans les mêmes réseaux.",
          "Timbuktu developed where Saharan exchange met the networks of the Niger River. Under the Mali and later Songhai empires, the city was both a regional market and a major Muslim intellectual centre, known for its mosques, schools and manuscript traditions. Goods and ideas travelled through overlapping networks."
        ),
        linkedEvents: [bi("Essor de Tombouctou sous le Mali et le Songhaï", "Growth of Timbuktu under Mali and Songhai")],
        countryIds: ["MLI"], civilizationIds: ["mali-empire", "songhai-empire"], figureIds: [], peopleIds: [], timelineEventIds: ["mali-commercial-apogee"],
      },
      {
        stopId: "gao-niger-hub",
        order: 4,
        title: bi("Gao, pouvoir politique et Niger", "Gao, political power and the Niger"),
        place: { name: bi("Gao", "Gao"), countryId: "MLI", lat: 16.2717, lng: -0.0447 },
        period: bi("XIVe–XVIe siècles", "14th–16th centuries"),
        context: bi(
          "À Gao, les routes du Sahara rencontraient le corridor du Niger. La ville devint le cœur politique de l’Empire songhaï et un point majeur de redistribution. Cette dernière étape montre que les routes commerciales ne formaient pas seulement des chaînes de marchés : elles soutenaient des centres urbains, des fiscalités, des institutions et des ambitions impériales.",
          "At Gao, Saharan routes met the Niger corridor. The city became the political heart of the Songhai Empire and a major redistribution point. This final stop shows that trade routes were not simply chains of markets: they supported urban centres, taxation systems, institutions and imperial ambitions."
        ),
        linkedEvents: [bi("Gao devient un centre majeur du Songhaï", "Gao becomes a major Songhai centre")],
        countryIds: ["MLI"], civilizationIds: ["songhai-empire"], figureIds: [], peopleIds: [], timelineEventIds: ["songhai-imperial-expansion"],
      },
    ],
    sources: [
      { sourceId: "unesco-timbuktu", publisher: "UNESCO World Heritage Centre", title: "Timbuktu", url: "https://whc.unesco.org/en/list/119/" },
      { sourceId: "unesco-gha-vol4", publisher: "UNESCO", title: "General History of Africa, Volume IV: Africa from the Twelfth to the Sixteenth Century", url: "https://unesdoc.unesco.org/ark:/48223/pf0000184287" },
      { sourceId: "met-trans-saharan", publisher: "The Metropolitan Museum of Art", title: "The Trans-Saharan Gold Trade (7th–14th Century)", url: "https://www.metmuseum.org/toah/hd/gold/hd_gold.htm" },
    ],
  },
  {
    journeyId: "swahili-indian-ocean-network",
    category: "culture",
    regionIds: ["east-africa-indian-ocean"],
    periodIds: ["medieval", "early-modern", "modern"],
    themeIds: ["trade-networks", "heritage-cities", "knowledge-religion"],
    peopleIds: ["swahili"],
    title: bi("Cités swahilies et océan Indien", "Swahili cities and the Indian Ocean"),
    subtitle: bi("Ports, cultures urbaines et connexions maritimes", "Ports, urban cultures and maritime connections"),
    period: bi("IXe–XIXe siècles", "9th–19th centuries"),
    introduction: bi(
      "La côte swahilie formait un chapelet de villes portuaires liées entre elles et aux réseaux de l’océan Indien. Ce parcours ne présente pas une trajectoire maritime unique : il traverse des centres dont les histoires se chevauchent mais restent distinctes. Architecture corallienne, islam, langues bantoues, commerce maritime et contacts avec l’Arabie, la Perse, l’Inde et l’Asie orientale y ont produit des cultures urbaines profondément africaines et cosmopolites.",
      "The Swahili coast formed a chain of port cities connected to one another and to Indian Ocean networks. This journey is not a single maritime itinerary: it crosses centres whose histories overlap while remaining distinct. Coral-stone architecture, Islam, Bantu languages, seaborne trade and contacts with Arabia, Persia, India and East Asia produced urban cultures that were both deeply African and cosmopolitan."
    ),
    mapCaption: bi("Une lecture en réseau de la côte swahilie : les connexions variaient selon les siècles.", "A network view of the Swahili coast: connections changed over the centuries."),
    relations: { countryIds: ["TZA", "KEN"], civilizationIds: ["swahili-city-states"], figureIds: [], peopleIds: ["swahili"], timelineEventIds: ["swahili-maritime-expansion"], diasporaIds: [] },
    stops: [
      {
        stopId: "kilwa-kisiwani-port",
        order: 1,
        title: bi("Kilwa Kisiwani, un grand port de l’or", "Kilwa Kisiwani, a major port of the gold trade"),
        place: { name: bi("Kilwa Kisiwani", "Kilwa Kisiwani"), countryId: "TZA", lat: -8.9578, lng: 39.5228 },
        period: bi("IXe–XVIe siècles", "9th–16th centuries"),
        context: bi(
          "Kilwa occupa une position remarquable dans les échanges de l’océan Indien. À son apogée aux XIIIe et XIVe siècles, ses marchands participaient au commerce de l’or venu de l’intérieur de l’Afrique australe, mais aussi de produits importés d’Arabie, de Perse, d’Inde et de Chine. Ses ruines monumentales témoignent d’une société urbaine et maritime sophistiquée.",
          "Kilwa held a remarkable position in Indian Ocean exchange. At its height in the 13th and 14th centuries, its merchants participated in the trade of gold arriving from the southern African interior as well as imported goods from Arabia, Persia, India and China. Its monumental ruins testify to a sophisticated urban and maritime society."
        ),
        linkedEvents: [bi("Apogée commerciale de Kilwa", "Commercial peak of Kilwa")],
        countryIds: ["TZA"], civilizationIds: ["swahili-city-states"], figureIds: [], peopleIds: ["swahili"], timelineEventIds: ["swahili-maritime-expansion"],
      },
      {
        stopId: "zanzibar-stone-town",
        order: 2,
        title: bi("Zanzibar, une ville de rencontres", "Zanzibar, a city of encounters"),
        place: { name: bi("Stone Town, Zanzibar", "Stone Town, Zanzibar"), countryId: "TZA", lat: -6.1622, lng: 39.1921 },
        period: bi("XVIIIe–XIXe siècles", "18th–19th centuries"),
        context: bi(
          "Stone Town conserve un paysage urbain où se lisent des influences africaines, arabes, indiennes et européennes. Son essor tardif rappelle que l’histoire swahilie ne s’arrête pas au Moyen Âge : les circuits maritimes furent recomposés par de nouveaux pouvoirs, par le commerce régional et mondial, et aussi par la traite esclavagiste de l’océan Indien, dont la mémoire fait partie de l’histoire de Zanzibar.",
          "Stone Town preserves an urban landscape shaped by African, Arab, Indian and European influences. Its later rise shows that Swahili history did not end in the medieval period: maritime circuits were reshaped by new powers, regional and global commerce, and also by the Indian Ocean slave trade, whose memory forms part of Zanzibar’s history."
        ),
        linkedEvents: [bi("Essor de Zanzibar comme centre commercial régional", "Rise of Zanzibar as a regional trading centre")],
        countryIds: ["TZA"], civilizationIds: ["swahili-city-states"], figureIds: [], peopleIds: ["swahili"], timelineEventIds: ["zanzibar-commercial-rise"],
      },
      {
        stopId: "mombasa-crossroads",
        order: 3,
        title: bi("Mombasa, carrefour côtier", "Mombasa, a coastal crossroads"),
        place: { name: bi("Mombasa", "Mombasa"), countryId: "KEN", lat: -4.0435, lng: 39.6682 },
        period: bi("XVe–XIXe siècles", "15th–19th centuries"),
        context: bi(
          "Mombasa fut un port stratégique où se rencontrèrent dynamiques swahilies, ambitions portugaises puis omanaises et échanges régionaux. La ville permet de lire la côte non comme une périphérie passive, mais comme un espace où des acteurs locaux négociaient, résistaient et s’adaptaient à des puissances venues de l’océan.",
          "Mombasa was a strategic port where Swahili dynamics met Portuguese and later Omani ambitions as well as regional exchange. The city makes it possible to read the coast not as a passive periphery, but as a space in which local actors negotiated, resisted and adapted to powers arriving by sea."
        ),
        linkedEvents: [bi("Compétition pour le contrôle des ports de la côte", "Competition for control of coastal ports")],
        countryIds: ["KEN"], civilizationIds: ["swahili-city-states"], figureIds: [], peopleIds: ["swahili"], timelineEventIds: ["swahili-port-competition"],
      },
      {
        stopId: "lamu-living-heritage",
        order: 4,
        title: bi("Lamu, continuités d’une culture urbaine", "Lamu, continuities of an urban culture"),
        place: { name: bi("Lamu", "Lamu"), countryId: "KEN", lat: -2.2717, lng: 40.9020 },
        period: bi("XIVe siècle à aujourd’hui", "14th century to present"),
        context: bi(
          "Lamu offre une autre temporalité : celle d’une ville swahilie habitée dont le tissu urbain, les maisons en pierre corallienne et les pratiques sociales témoignent de longues continuités. Terminer ici permet de passer des vestiges archéologiques à un patrimoine vivant et de rappeler que les cultures de la côte swahilie appartiennent aussi au présent.",
          "Lamu offers a different timescale: that of a living Swahili town whose urban fabric, coral-stone houses and social practices testify to long continuities. Ending here moves the journey from archaeological remains to living heritage and reminds us that Swahili coastal cultures also belong to the present."
        ),
        linkedEvents: [bi("Développement durable d’une ville swahilie habitée", "Long-term development of a living Swahili town")],
        countryIds: ["KEN"], civilizationIds: ["swahili-city-states"], figureIds: [], peopleIds: ["swahili"], timelineEventIds: ["lamu-urban-continuity"],
      },
    ],
    sources: [
      { sourceId: "unesco-kilwa", publisher: "UNESCO World Heritage Centre", title: "Ruins of Kilwa Kisiwani and Ruins of Songo Mnara", url: "https://whc.unesco.org/en/list/144/" },
      { sourceId: "unesco-zanzibar", publisher: "UNESCO World Heritage Centre", title: "Stone Town of Zanzibar", url: "https://whc.unesco.org/en/list/173/" },
      { sourceId: "unesco-lamu", publisher: "UNESCO World Heritage Centre", title: "Lamu Old Town", url: "https://whc.unesco.org/en/list/1055/" },
    ],
  },
  {
    journeyId: "roads-to-african-independence",
    category: "independence",
    regionIds: ["west-africa-sahel", "east-africa-indian-ocean", "continental"],
    periodIds: ["modern"],
    themeIds: ["colonialism-independence", "states-power"],
    peopleIds: [],
    title: bi("Des indépendances à l’unité africaine", "From independence to African unity"),
    subtitle: bi("1957–1963 : États nouveaux, projets continentaux", "1957–1963: new states, continental projects"),
    period: bi("1957–1963", "1957–1963"),
    introduction: bi(
      "Ce parcours relie trois moments emblématiques d’une séquence beaucoup plus vaste de décolonisations africaines. Il ne résume ni toutes les luttes ni toutes les indépendances du continent. Il montre plutôt comment souveraineté nationale, mobilisation anticoloniale et coopération panafricaine se sont croisées en quelques années, de l’indépendance du Ghana à la création de l’Organisation de l’unité africaine.",
      "This journey connects three emblematic moments within a far broader wave of African decolonization. It does not summarize every struggle or every independence on the continent. Instead, it shows how national sovereignty, anticolonial mobilization and Pan-African cooperation intersected within a few years, from Ghanaian independence to the creation of the Organization of African Unity."
    ),
    mapCaption: bi("Une séquence politique, non une route de déplacement physique.", "A political sequence, not a physical travel route."),
    relations: { countryIds: ["GHA", "GIN", "ETH"], civilizationIds: [], figureIds: ["kwame-nkrumah", "ahmed-sekou-toure", "haile-selassie"], peopleIds: [], timelineEventIds: ["ghana-independence-1957", "guinea-independence-1958", "oau-founded-1963"], diasporaIds: [] },
    stops: [
      {
        stopId: "accra-ghana-independence",
        order: 1,
        title: bi("Accra, 1957 : l’indépendance du Ghana", "Accra, 1957: Ghanaian independence"),
        place: { name: bi("Accra", "Accra"), countryId: "GHA", lat: 5.6037, lng: -0.1870 },
        period: bi("6 mars 1957", "6 March 1957"),
        context: bi(
          "L’indépendance du Ghana marque un tournant dans l’Afrique subsaharienne colonisée. Sous la direction de Kwame Nkrumah, le nouvel État associa rapidement sa souveraineté à une ambition panafricaine : l’émancipation nationale devait contribuer à la libération du reste du continent. Accra devint ainsi un lieu important de rencontres politiques anticoloniales.",
          "Ghanaian independence marked a turning point in colonized sub-Saharan Africa. Under Kwame Nkrumah, the new state quickly linked its sovereignty to a Pan-African ambition: national emancipation was expected to contribute to the liberation of the rest of the continent. Accra consequently became an important meeting place for anticolonial politics."
        ),
        linkedEvents: [bi("Proclamation de l’indépendance du Ghana", "Proclamation of Ghanaian independence")],
        countryIds: ["GHA"], civilizationIds: [], figureIds: ["kwame-nkrumah"], peopleIds: [], timelineEventIds: ["ghana-independence-1957"],
      },
      {
        stopId: "conakry-guinea-independence",
        order: 2,
        title: bi("Conakry, 1958 : choisir la souveraineté", "Conakry, 1958: choosing sovereignty"),
        place: { name: bi("Conakry", "Conakry"), countryId: "GIN", lat: 9.6412, lng: -13.5784 },
        period: bi("2 octobre 1958", "2 October 1958"),
        context: bi(
          "Après le vote négatif de la Guinée au référendum constitutionnel français de septembre 1958, le pays proclama son indépendance le 2 octobre. Le choix guinéen eut un retentissement continental : il rendait visible la possibilité d’une rupture immédiate avec l’ordre colonial, tout en exposant le nouvel État à de fortes contraintes diplomatiques, administratives et économiques.",
          "After Guinea voted ‘no’ in the French constitutional referendum of September 1958, the country proclaimed independence on 2 October. The Guinean choice resonated across the continent: it made an immediate break with colonial rule visibly possible, while exposing the new state to severe diplomatic, administrative and economic constraints."
        ),
        linkedEvents: [bi("Indépendance de la République de Guinée", "Independence of the Republic of Guinea")],
        countryIds: ["GIN"], civilizationIds: [], figureIds: ["ahmed-sekou-toure"], peopleIds: [], timelineEventIds: ["guinea-independence-1958"],
      },
      {
        stopId: "addis-ababa-oau-1963",
        order: 3,
        title: bi("Addis-Abeba, 1963 : organiser l’unité", "Addis Ababa, 1963: organizing unity"),
        place: { name: bi("Addis-Abeba", "Addis Ababa"), countryId: "ETH", lat: 8.9806, lng: 38.7578 },
        period: bi("25 mai 1963", "25 May 1963"),
        context: bi(
          "À Addis-Abeba, les dirigeants de trente-deux États africains indépendants fondèrent l’Organisation de l’unité africaine. Les visions de l’intégration continentale divergeaient, mais l’organisation créa un cadre permanent de coopération interétatique et plaça la décolonisation restante parmi ses priorités. Cette étape clôt le parcours sur une institution née des débats de l’ère des indépendances et dont l’Union africaine est l’héritière.",
          "In Addis Ababa, leaders of thirty-two independent African states founded the Organization of African Unity. Visions of continental integration differed, but the organization created a permanent framework for inter-state cooperation and placed the remaining decolonization struggles among its priorities. This stop closes the journey with an institution born from independence-era debates and later succeeded by the African Union."
        ),
        linkedEvents: [bi("Création de l’Organisation de l’unité africaine", "Creation of the Organization of African Unity")],
        countryIds: ["ETH"], civilizationIds: [], figureIds: ["haile-selassie"], peopleIds: [], timelineEventIds: ["oau-founded-1963"],
      },
    ],
    sources: [
      { sourceId: "au-oau-history", publisher: "African Union", title: "OAU/AU at 50: African Union history and milestones", url: "https://au.int/en/history/oau-and-au" },
      { sourceId: "ghana-archives-independence", publisher: "Ghana Museums and Monuments Board", title: "Independence and national heritage resources", url: "https://gmmb.gov.gh/" },
      { sourceId: "unesco-africa-independence", publisher: "UNESCO", title: "General History of Africa, Volume VIII: Africa since 1935", url: "https://unesdoc.unesco.org/ark:/48223/pf0000184296" },
    ],
  },
];

export const getLocalized = (value, lang = "fr") => {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.fr || value.en || "";
};

export const getJourneyById = (journeyId) => journeys.find((journey) => journey.journeyId === journeyId);
