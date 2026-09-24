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
    journeyId: "great-lakes-kingdoms-networks",
    category: "culture",
    regionIds: ["east-africa-indian-ocean", "central-africa"],
    periodIds: ["early-modern", "modern"],
    themeIds: ["states-power", "trade-networks", "heritage-cities"],
    peopleIds: ["baganda", "banyoro", "banyarwanda"],
    title: bi("Grands Lacs : royaumes, lacs et réseaux", "Great Lakes: kingdoms, lakes and networks"),
    subtitle: bi("Pouvoirs, échanges et mémoires autour des lacs Victoria et Albert", "Power, exchange and memory around Lakes Victoria and Albert"),
    period: bi("XVIIe–XXe siècles", "17th–20th centuries"),
    introduction: bi(
      "Les Grands Lacs africains furent un espace de circulation autant qu’un ensemble de royaumes puissants. Ce parcours relie Bunyoro, Buganda et le Rwanda sans les réduire à une histoire unique : chacun développa ses propres institutions, hiérarchies, économies et traditions politiques, tout en participant à des réseaux régionaux de commerce et de diplomatie.",
      "Africa’s Great Lakes were a zone of movement as well as a landscape of powerful kingdoms. This journey connects Bunyoro, Buganda and Rwanda without collapsing them into a single history: each developed distinct institutions, hierarchies, economies and political traditions while participating in regional networks of trade and diplomacy."
    ),
    mapCaption: bi("Les étapes représentent des centres historiques liés par des réseaux changeants.", "Stops represent historical centres connected by changing networks."),
    relations: { countryIds: ["UGA", "RWA"], civilizationIds: ["bunyoro-kitara", "buganda-kingdom", "kingdom-of-rwanda"], figureIds: [], peopleIds: ["baganda", "banyoro", "banyarwanda"], timelineEventIds: [], diasporaIds: [] },
    stops: [
      {
        stopId: "bunyoro-kitara-hoima",
        order: 1,
        title: bi("Bunyoro-Kitara, un pouvoir majeur des Grands Lacs", "Bunyoro-Kitara, a major Great Lakes power"),
        place: { name: bi("Région de Hoima", "Hoima region"), countryId: "UGA", lat: 1.4356, lng: 31.3436 },
        period: bi("XVIIe–XIXe siècles", "17th–19th centuries"),
        context: bi("Le royaume de Bunyoro fut l’un des grands pouvoirs de la région. Son histoire politique s’inscrit dans des traditions dynastiques anciennes et dans le contrôle de territoires reliant le lac Albert aux espaces intérieurs. Agriculture, élevage, métallurgie et échanges soutenaient une société complexe dont l’influence varia au fil des rivalités régionales.", "The kingdom of Bunyoro was one of the region’s major powers. Its political history drew on long dynastic traditions and control of territories linking Lake Albert with inland areas. Agriculture, cattle keeping, metallurgy and exchange sustained a complex society whose influence shifted through regional rivalries."),
        linkedEvents: [bi("Consolidation des pouvoirs dynastiques autour du lac Albert", "Consolidation of dynastic power around Lake Albert")],
        countryIds: ["UGA"], civilizationIds: ["bunyoro-kitara"], figureIds: [], peopleIds: ["banyoro"], timelineEventIds: [],
      },
      {
        stopId: "buganda-mengo-kampala",
        order: 2,
        title: bi("Buganda, centralisation et routes du lac Victoria", "Buganda, centralization and Lake Victoria routes"),
        place: { name: bi("Mengo / Kampala", "Mengo / Kampala"), countryId: "UGA", lat: 0.3136, lng: 32.5811 },
        period: bi("XVIIIe–XIXe siècles", "18th–19th centuries"),
        context: bi("Buganda renforça progressivement une monarchie centralisée autour du kabaka, d’administrateurs et de chefs territoriaux. Sa position au nord du lac Victoria facilita les communications par voie d’eau et l’intégration de réseaux d’échange. Au XIXe siècle, ces structures furent confrontées à l’arrivée croissante de marchands, de missionnaires et d’intérêts impériaux.", "Buganda progressively strengthened a centralized monarchy around the kabaka, administrators and territorial chiefs. Its position north of Lake Victoria facilitated waterborne communication and integration into exchange networks. During the 19th century these structures confronted the growing arrival of traders, missionaries and imperial interests."),
        linkedEvents: [bi("Expansion politique du Buganda au XIXe siècle", "Political expansion of Buganda in the 19th century")],
        countryIds: ["UGA"], civilizationIds: ["buganda-kingdom"], figureIds: [], peopleIds: ["baganda"], timelineEventIds: [],
      },
      {
        stopId: "nyanza-rwanda-court",
        order: 3,
        title: bi("Nyanza, cour royale et construction de l’État rwandais", "Nyanza, royal court and Rwandan state formation"),
        place: { name: bi("Nyanza", "Nyanza"), countryId: "RWA", lat: -2.3519, lng: 29.7509 },
        period: bi("XVIIIe–XXe siècles", "18th–20th centuries"),
        context: bi("Nyanza est associée à la monarchie rwandaise et à la mémoire de la cour. L’expansion du royaume s’appuya sur des institutions politiques, des relations pastorales et agricoles et des mécanismes de redistribution. Les catégories sociales et les rapports de pouvoir furent ensuite profondément transformés et rigidifiés sous les administrations coloniales allemande puis belge.", "Nyanza is associated with Rwanda’s monarchy and the memory of the royal court. Expansion of the kingdom relied on political institutions, pastoral and agricultural relations, and systems of redistribution. Social categories and power relations were later profoundly transformed and hardened under German and then Belgian colonial administration."),
        linkedEvents: [bi("Centralisation progressive du royaume du Rwanda", "Progressive centralization of the Kingdom of Rwanda")],
        countryIds: ["RWA"], civilizationIds: ["kingdom-of-rwanda"], figureIds: [], peopleIds: ["banyarwanda"], timelineEventIds: [],
      },
      {
        stopId: "great-lakes-colonial-reordering",
        order: 4,
        title: bi("Frontières coloniales, recomposition des anciens réseaux", "Colonial borders and the remaking of older networks"),
        place: { name: bi("Région des Grands Lacs", "Great Lakes region"), countryId: "UGA", lat: -0.5, lng: 30.5 },
        period: bi("Fin XIXe–XXe siècles", "Late 19th–20th centuries"),
        context: bi("La colonisation ne créa pas les sociétés politiques des Grands Lacs, mais elle transforma radicalement leurs équilibres. Frontières, administrations, missions, fiscalité et nouvelles infrastructures redirigèrent des réseaux plus anciens. Lire cette rupture permet de distinguer les institutions précoloniales des catégories et territoires imposés ou remodelés par les empires européens.", "Colonial rule did not create the political societies of the Great Lakes, but it radically altered their balance. Borders, administrations, missions, taxation and new infrastructure redirected older networks. Reading this rupture helps distinguish precolonial institutions from categories and territories imposed or reshaped by European empires."),
        linkedEvents: [bi("Réorganisation coloniale de l’Afrique des Grands Lacs", "Colonial reorganization of the African Great Lakes")],
        countryIds: ["UGA", "RWA"], civilizationIds: ["bunyoro-kitara", "buganda-kingdom", "kingdom-of-rwanda"], figureIds: [], peopleIds: ["baganda", "banyoro", "banyarwanda"], timelineEventIds: [],
      },
    ],
    sources: [
      { sourceId: "unesco-gha-vol5", publisher: "UNESCO", title: "General History of Africa, Volume V: Africa from the Sixteenth to the Eighteenth Century", url: "https://unesdoc.unesco.org/" },
      { sourceId: "unesco-gha-vol6", publisher: "UNESCO", title: "General History of Africa, Volume VI: Africa in the Nineteenth Century until the 1880s", url: "https://unesdoc.unesco.org/" },
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
  {
    journeyId: "kongo-loango-atlantic-world",
    category: "culture",
    regionIds: ["central-africa"],
    periodIds: ["early-modern", "modern"],
    themeIds: ["states-power", "trade-networks", "migration-diaspora", "colonialism-independence"],
    peopleIds: ["kongo", "vili"],
    title: bi("Kongo et Loango : royaumes face à l’Atlantique", "Kongo and Loango: kingdoms facing the Atlantic"),
    subtitle: bi("Pouvoirs d’Afrique centrale, commerce côtier et transformations atlantiques", "Central African power, coastal trade and Atlantic transformations"),
    period: bi("XVe–XIXe siècles", "15th–19th centuries"),
    introduction: bi("Ce parcours explore deux espaces politiques majeurs de l’Afrique centrale atlantique. Le royaume du Kongo et les royaumes de la côte de Loango possédaient leurs propres institutions et réseaux avant l’intensification des contacts européens. L’Atlantique transforma ensuite les équilibres commerciaux et politiques, notamment avec la traite esclavagiste, sans réduire l’histoire régionale à la seule présence européenne.", "This journey explores two major political spaces of Atlantic Central Africa. The Kingdom of Kongo and the kingdoms of the Loango coast possessed their own institutions and networks before European contacts intensified. The Atlantic later transformed commercial and political balances, especially through the slave trade, without reducing regional history to European presence alone."),
    mapCaption: bi("Des capitales intérieures aux ports atlantiques : un réseau politique et commercial en transformation.", "From inland capitals to Atlantic ports: a changing political and commercial network."),
    relations: { countryIds: ["AGO", "COG", "GAB"], civilizationIds: ["kingdom-of-kongo", "kingdom-of-loango"], figureIds: ["afonso-i-kongo"], peopleIds: ["kongo", "vili"], timelineEventIds: [], diasporaIds: ["atlantic-african-diaspora"] },
    stops: [
      { stopId: "mbanza-kongo-capital", order: 1, title: bi("Mbanza Kongo, capitale d’un royaume centralisé", "Mbanza Kongo, capital of a centralized kingdom"), place: { name: bi("Mbanza Kongo", "Mbanza Kongo"), countryId: "AGO", lat: -6.267, lng: 14.24 }, period: bi("XVe–XVIIe siècles", "15th–17th centuries"), context: bi("Mbanza Kongo fut le centre politique du royaume du Kongo, dont l’autorité s’étendait sur un vaste ensemble de provinces et de communautés. La capitale concentrait pouvoir royal, élites et échanges. À partir de la fin du XVe siècle, les relations avec le Portugal introduisirent de nouvelles dynamiques diplomatiques, commerciales et religieuses, que les souverains kongo cherchèrent activement à négocier.", "Mbanza Kongo was the political centre of the Kingdom of Kongo, whose authority extended across a broad set of provinces and communities. The capital concentrated royal power, elites and exchange. From the late 15th century, relations with Portugal introduced new diplomatic, commercial and religious dynamics that Kongo rulers actively sought to negotiate."), linkedEvents: [bi("Relations diplomatiques entre le Kongo et le Portugal", "Diplomatic relations between Kongo and Portugal")], countryIds: ["AGO"], civilizationIds: ["kingdom-of-kongo"], figureIds: ["afonso-i-kongo"], peopleIds: ["kongo"], timelineEventIds: [] },
      { stopId: "loango-coastal-kingdom", order: 2, title: bi("Loango, pouvoir côtier et réseaux régionaux", "Loango, coastal power and regional networks"), place: { name: bi("Région historique de Loango", "Historic Loango region"), countryId: "COG", lat: -4.65, lng: 11.81 }, period: bi("XVIe–XIXe siècles", "16th–19th centuries"), context: bi("Le royaume de Loango s’inscrivait dans un espace culturel et commercial reliant la côte aux sociétés de l’intérieur. Ses autorités contrôlaient et négociaient l’accès à des circuits d’échange de cuivre, ivoire, textiles et autres biens. Avec l’expansion du commerce atlantique, les ports de la région furent de plus en plus intégrés à des marchés lointains.", "The Kingdom of Loango belonged to a cultural and commercial space linking the coast with inland societies. Its authorities controlled and negotiated access to exchange circuits involving copper, ivory, textiles and other goods. As Atlantic commerce expanded, ports in the region became increasingly integrated into distant markets."), linkedEvents: [bi("Expansion des réseaux commerciaux de la côte de Loango", "Expansion of Loango coast trading networks")], countryIds: ["COG"], civilizationIds: ["kingdom-of-loango"], figureIds: [], peopleIds: ["vili"], timelineEventIds: [] },
      { stopId: "loango-atlantic-slave-trade", order: 3, title: bi("La côte de Loango dans la traite atlantique", "The Loango coast in the Atlantic slave trade"), place: { name: bi("Côte atlantique du Loango", "Atlantic Loango coast"), countryId: "COG", lat: -4.8, lng: 11.85 }, period: bi("XVIIe–XIXe siècles", "17th–19th centuries"), context: bi("La traite atlantique transforma profondément la région. Des personnes capturées dans de vastes zones d’Afrique centrale furent conduites vers les ports de la côte et déportées vers les Amériques. Les effets furent démographiques, politiques et sociaux. Cette histoire relie directement l’Afrique centrale aux formations diasporiques du Brésil, des Caraïbes et d’autres sociétés atlantiques.", "The Atlantic slave trade profoundly transformed the region. People captured across broad areas of Central Africa were brought to coastal ports and deported to the Americas. The effects were demographic, political and social. This history directly connects Central Africa with diasporic formations in Brazil, the Caribbean and other Atlantic societies."), linkedEvents: [bi("Déportations massives depuis l’Afrique centrale atlantique", "Mass deportations from Atlantic Central Africa")], countryIds: ["COG", "AGO", "GAB"], civilizationIds: ["kingdom-of-kongo", "kingdom-of-loango"], figureIds: [], peopleIds: ["kongo", "vili"], timelineEventIds: [] },
    ],
    sources: [
      { sourceId: "unesco-mbanza-kongo", publisher: "UNESCO World Heritage Centre", title: "Mbanza Kongo, Vestiges of the Capital of the former Kingdom of Kongo", url: "https://whc.unesco.org/en/list/1511/" },
      { sourceId: "unesco-slave-route", publisher: "UNESCO", title: "Routes of Enslaved Peoples", url: "https://www.unesco.org/en/routes-enslaved-peoples" },
    ],
  },
  {
    journeyId: "akan-gold-forest-states",
    category: "culture",
    regionIds: ["west-africa-sahel"],
    periodIds: ["early-modern", "modern"],
    themeIds: ["states-power", "trade-networks", "heritage-cities", "colonialism-independence"],
    peopleIds: ["akan", "asante"],
    title: bi("Akan : or, villes et pouvoirs forestiers", "Akan: gold, cities and forest states"),
    subtitle: bi("Des réseaux aurifères à l’essor de l’Asante", "From gold networks to the rise of Asante"),
    period: bi("XVe–XXe siècles", "15th–20th centuries"),
    introduction: bi("Les sociétés akan développèrent plusieurs États et réseaux politiques dans les zones forestières de l’actuel Ghana et de la Côte d’Ivoire. L’or occupait une place majeure dans les échanges régionaux et internationaux, mais cette histoire comprend aussi des institutions politiques, des traditions artistiques, des systèmes de poids, des villes et des formes de résistance.", "Akan societies developed several states and political networks in the forest zones of present-day Ghana and Côte d’Ivoire. Gold held a major place in regional and international exchange, but this history also encompasses political institutions, artistic traditions, weight systems, cities and forms of resistance."),
    mapCaption: bi("Un parcours à travers les centres d’un monde akan pluriel.", "A journey through centres of a diverse Akan world."),
    relations: { countryIds: ["GHA", "CIV"], civilizationIds: ["bono-state", "asante-empire"], figureIds: ["yaa-asantewaa"], peopleIds: ["akan", "asante"], timelineEventIds: [], diasporaIds: [] },
    stops: [
      { stopId: "bono-manso-gold-network", order: 1, title: bi("Bono Manso, entre forêt et commerce de l’or", "Bono Manso, between forest and gold trade"), place: { name: bi("Bono Manso", "Bono Manso"), countryId: "GHA", lat: 7.72, lng: -2.1 }, period: bi("XVe–XVIIIe siècles", "15th–18th centuries"), context: bi("Les États bono occupèrent une position importante entre les zones productrices d’or de la forêt et les réseaux commerciaux plus au nord. Des centres comme Bono Manso participaient à des circulations de métaux, de noix de kola et d’autres produits. Cette étape rappelle que les économies forestières étaient reliées depuis longtemps aux grands réseaux ouest-africains.", "Bono states occupied an important position between forest gold-producing zones and trading networks farther north. Centres such as Bono Manso participated in flows of metals, kola nuts and other products. This stop highlights the long-standing integration of forest economies into wider West African networks."), linkedEvents: [bi("Développement des réseaux aurifères akan", "Development of Akan gold networks")], countryIds: ["GHA"], civilizationIds: ["bono-state"], figureIds: [], peopleIds: ["akan"], timelineEventIds: [] },
      { stopId: "kumasi-asante-capital", order: 2, title: bi("Kumasi, capitale de l’Asante", "Kumasi, capital of Asante"), place: { name: bi("Kumasi", "Kumasi"), countryId: "GHA", lat: 6.6885, lng: -1.6244 }, period: bi("XVIIIe–XIXe siècles", "18th–19th centuries"), context: bi("Kumasi devint le centre d’une confédération puis d’un empire puissant. L’Asante associa autorité royale, conseils politiques, armée, fiscalité et réseaux commerciaux. L’or jouait un rôle économique et symbolique essentiel, tandis que les traditions de cour, les textiles kente et les poids à peser l’or participaient à une culture matérielle distinctive.", "Kumasi became the centre of a powerful confederacy and later empire. Asante combined royal authority, political councils, military organization, taxation and commercial networks. Gold held both economic and symbolic importance, while court traditions, kente textiles and goldweights formed part of a distinctive material culture."), linkedEvents: [bi("Consolidation de l’État asante", "Consolidation of the Asante state")], countryIds: ["GHA"], civilizationIds: ["asante-empire"], figureIds: [], peopleIds: ["asante", "akan"], timelineEventIds: [] },
      { stopId: "ejisu-yaa-asantewaa", order: 3, title: bi("Ejisu, Yaa Asantewaa et la résistance de 1900", "Ejisu, Yaa Asantewaa and the resistance of 1900"), place: { name: bi("Ejisu", "Ejisu"), countryId: "GHA", lat: 6.715, lng: -1.477 }, period: bi("1900", "1900"), context: bi("En 1900, une guerre opposa les forces britanniques aux Asante dans un contexte de pression coloniale croissante. Yaa Asantewaa, reine-mère d’Ejisu, est devenue une figure majeure de cette résistance. Son rôle permet d’aborder à la fois les institutions politiques asante, la place des femmes de rang royal et les conflits liés à l’imposition du pouvoir colonial.", "In 1900, war pitted British forces against Asante amid growing colonial pressure. Yaa Asantewaa, queen mother of Ejisu, became a major figure of this resistance. Her role opens a view onto Asante political institutions, the position of royal women and conflicts surrounding the imposition of colonial rule."), linkedEvents: [bi("Guerre de 1900 et résistance asante", "1900 war and Asante resistance")], countryIds: ["GHA"], civilizationIds: ["asante-empire"], figureIds: ["yaa-asantewaa"], peopleIds: ["asante"], timelineEventIds: [] },
    ],
    sources: [
      { sourceId: "met-akan-gold", publisher: "The Metropolitan Museum of Art", title: "Akan peoples: arts and gold traditions", url: "https://www.metmuseum.org/" },
      { sourceId: "british-museum-asante", publisher: "The British Museum", title: "Asante collection and research", url: "https://www.britishmuseum.org/" },
    ],
  },

  {
    journeyId: "nubia-nile-kingdoms",
    category: "culture",
    regionIds: ["north-africa-sahara"],
    periodIds: ["ancient", "medieval"],
    themeIds: ["states-power", "trade-networks", "knowledge-religion", "heritage-cities"],
    peopleIds: ["nubian"],
    title: bi("Nubie : royaumes africains du Nil", "Nubia: African kingdoms of the Nile"),
    subtitle: bi("Kerma, Napata, Méroé et les royaumes chrétiens", "Kerma, Napata, Meroë and the Christian kingdoms"),
    period: bi("IIIe millénaire av. J.-C.–XVe siècle", "3rd millennium BCE–15th century"),
    introduction: bi("La Nubie ne fut pas une marge de l’Égypte mais un foyer historique majeur du nord-est africain. Sur plusieurs millénaires, des pouvoirs comme Kerma, Koush et les royaumes chrétiens de Nubie contrôlèrent des territoires du Nil, développèrent des traditions monumentales et participèrent à des échanges reliant Afrique intérieure, vallée du Nil, mer Rouge et Méditerranée.", "Nubia was not merely a margin of Egypt but a major historical centre of northeastern Africa. Across several millennia, powers such as Kerma, Kush and the Christian Nubian kingdoms controlled Nile territories, developed monumental traditions and participated in exchanges linking inner Africa, the Nile Valley, the Red Sea and the Mediterranean."),
    mapCaption: bi("Le Nil comme corridor de pouvoirs africains successifs.", "The Nile as a corridor of successive African powers."),
    relations: { countryIds: ["SDN"], civilizationIds: ["kerma", "kingdom-of-kush", "medieval-nubia"], figureIds: [], peopleIds: ["nubian"], timelineEventIds: [], diasporaIds: [] },
    stops: [
      { stopId: "kerma-urban-centre", order: 1, title: bi("Kerma, une capitale ancienne", "Kerma, an ancient capital"), place: { name: bi("Kerma", "Kerma"), countryId: "SDN", lat: 19.6, lng: 30.41 }, period: bi("env. 2500–1500 av. J.-C.", "c. 2500–1500 BCE"), context: bi("Kerma fut le centre d’un des premiers grands États de Nubie. Son architecture monumentale, notamment les deffufa, et ses riches traditions funéraires témoignent d’une société urbaine et politique complexe. Sa position permettait de contrôler des circulations le long du Nil et vers des régions plus méridionales.", "Kerma was the centre of one of Nubia’s earliest major states. Its monumental architecture, including the deffufa, and rich funerary traditions attest to a complex urban and political society. Its position enabled control over movement along the Nile and toward regions farther south."), linkedEvents: [bi("Essor du royaume de Kerma", "Rise of the Kingdom of Kerma")], countryIds: ["SDN"], civilizationIds: ["kerma"], figureIds: [], peopleIds: ["nubian"], timelineEventIds: [] },
      { stopId: "napata-kush-centre", order: 2, title: bi("Napata, Koush et les pharaons de la XXVe dynastie", "Napata, Kush and the pharaohs of the 25th Dynasty"), place: { name: bi("Jebel Barkal / Napata", "Jebel Barkal / Napata"), countryId: "SDN", lat: 18.535, lng: 31.84 }, period: bi("VIIIe–IVe siècles av. J.-C.", "8th–4th centuries BCE"), context: bi("Autour de Napata, le royaume de Koush devint une puissance majeure. Des souverains koushites étendirent leur autorité jusqu’en Égypte et formèrent la XXVe dynastie. Jebel Barkal fut un centre religieux et politique important, illustrant des échanges culturels intenses mais aussi une tradition royale nubienne propre.", "Around Napata, the Kingdom of Kush became a major power. Kushite rulers extended their authority into Egypt and formed the 25th Dynasty. Jebel Barkal was an important religious and political centre, illustrating intense cultural exchange alongside a distinct Nubian royal tradition."), linkedEvents: [bi("Règne des souverains koushites en Égypte", "Rule of Kushite sovereigns in Egypt")], countryIds: ["SDN"], civilizationIds: ["kingdom-of-kush"], figureIds: [], peopleIds: ["nubian"], timelineEventIds: [] },
      { stopId: "meroe-kush-capital", order: 3, title: bi("Méroé, capitale d’un royaume africain", "Meroë, capital of an African kingdom"), place: { name: bi("Méroé", "Meroë"), countryId: "SDN", lat: 16.94, lng: 33.75 }, period: bi("IIIe siècle av. J.-C.–IVe siècle", "3rd century BCE–4th century CE"), context: bi("Méroé devint un centre politique majeur de Koush. Le site est connu pour ses pyramides, ses temples et l’écriture méroïtique. Le royaume entretenait des relations avec l’Égypte, le monde méditerranéen, la mer Rouge et l’intérieur africain, tout en développant ses propres formes politiques et culturelles.", "Meroë became a major political centre of Kush. The site is known for its pyramids, temples and the Meroitic script. The kingdom maintained relations with Egypt, the Mediterranean world, the Red Sea and inner Africa while developing its own political and cultural forms."), linkedEvents: [bi("Période méroïtique du royaume de Koush", "Meroitic period of the Kingdom of Kush")], countryIds: ["SDN"], civilizationIds: ["kingdom-of-kush"], figureIds: [], peopleIds: ["nubian"], timelineEventIds: [] },
      { stopId: "old-dongola-christian-nubia", order: 4, title: bi("Vieille Dongola, la Nubie chrétienne médiévale", "Old Dongola, medieval Christian Nubia"), place: { name: bi("Vieille Dongola", "Old Dongola"), countryId: "SDN", lat: 18.22, lng: 30.75 }, period: bi("VIe–XIVe siècles", "6th–14th centuries"), context: bi("Après l’Antiquité, des royaumes chrétiens comme Makurie structurèrent une nouvelle période de l’histoire nubienne. Vieille Dongola fut une capitale politique et religieuse majeure. Églises, peintures murales et documents écrits montrent la continuité d’une histoire urbaine nubienne bien au-delà de l’époque de Koush.", "After antiquity, Christian kingdoms such as Makuria shaped a new period of Nubian history. Old Dongola became a major political and religious capital. Churches, wall paintings and written documents demonstrate the continuity of Nubian urban history long after the Kushite era."), linkedEvents: [bi("Développement du royaume médiéval de Makurie", "Development of the medieval Kingdom of Makuria")], countryIds: ["SDN"], civilizationIds: ["medieval-nubia"], figureIds: [], peopleIds: ["nubian"], timelineEventIds: [] },
    ],
    sources: [
      { sourceId: "unesco-jebel-barkal", publisher: "UNESCO World Heritage Centre", title: "Gebel Barkal and the Sites of the Napatan Region", url: "https://whc.unesco.org/en/list/1073/" },
      { sourceId: "unesco-meroe", publisher: "UNESCO World Heritage Centre", title: "Archaeological Sites of the Island of Meroe", url: "https://whc.unesco.org/en/list/1336/" },
    ],
  },
  {
    journeyId: "great-zimbabwe-mutapa-networks",
    category: "trade",
    regionIds: ["southern-africa", "east-africa-indian-ocean"],
    periodIds: ["medieval", "early-modern"],
    themeIds: ["states-power", "trade-networks", "heritage-cities"],
    peopleIds: ["shona"],
    title: bi("Great Zimbabwe et Mutapa : pierre, or et océan Indien", "Great Zimbabwe and Mutapa: stone, gold and the Indian Ocean"),
    subtitle: bi("Des hauts plateaux d’Afrique australe aux réseaux de la côte", "From southern African highlands to coastal networks"),
    period: bi("XIe–XVIIe siècles", "11th–17th centuries"),
    introduction: bi("Great Zimbabwe et les États qui lui succédèrent montrent comment les sociétés des hauts plateaux d’Afrique australe furent intégrées à de vastes réseaux économiques. L’élevage, l’agriculture et le contrôle de ressources comme l’or soutenaient des centres politiques dont les échanges atteignaient, par intermédiaires, les ports swahilis de l’océan Indien.", "Great Zimbabwe and successor states show how societies of the southern African highlands were integrated into wide economic networks. Cattle keeping, agriculture and control of resources such as gold supported political centres whose exchanges reached, through intermediaries, the Swahili ports of the Indian Ocean."),
    mapCaption: bi("Les connexions représentent des réseaux d’échange, non une route commerciale unique.", "Connections represent exchange networks, not a single trade route."),
    relations: { countryIds: ["ZWE", "MOZ"], civilizationIds: ["great-zimbabwe", "mutapa-state"], figureIds: [], peopleIds: ["shona"], timelineEventIds: [], diasporaIds: [] },
    stops: [
      { stopId: "great-zimbabwe-stone-city", order: 1, title: bi("Great Zimbabwe, architecture et pouvoir", "Great Zimbabwe, architecture and power"), place: { name: bi("Great Zimbabwe", "Great Zimbabwe"), countryId: "ZWE", lat: -20.267, lng: 30.934 }, period: bi("XIe–XVe siècles", "11th–15th centuries"), context: bi("Great Zimbabwe fut un vaste centre politique et urbain construit par des populations ancêtres des Shona. Ses enceintes de pierre sèche, dont le Grand Enclos, témoignent d’une architecture monumentale sans mortier. Le site était lié à une économie pastorale et agricole ainsi qu’à des réseaux d’échange de l’or et d’autres ressources.", "Great Zimbabwe was a large political and urban centre built by ancestors of Shona-speaking populations. Its dry-stone walls, including the Great Enclosure, demonstrate monumental architecture constructed without mortar. The site was connected to pastoral and agricultural economies as well as networks exchanging gold and other resources."), linkedEvents: [bi("Apogée de Great Zimbabwe", "Peak of Great Zimbabwe")], countryIds: ["ZWE"], civilizationIds: ["great-zimbabwe"], figureIds: [], peopleIds: ["shona"], timelineEventIds: [] },
      { stopId: "mutapa-zambezi-state", order: 2, title: bi("Mutapa, pouvoir entre plateau et Zambèze", "Mutapa, power between the plateau and the Zambezi"), place: { name: bi("Vallée du Zambèze", "Zambezi Valley"), countryId: "ZWE", lat: -16.5, lng: 31.0 }, period: bi("XVe–XVIIe siècles", "15th–17th centuries"), context: bi("Après le déclin de Great Zimbabwe, d’autres formations politiques, dont l’État de Mutapa, contrôlèrent des territoires et des réseaux du plateau et du Zambèze. Le commerce de l’or reliait ces pouvoirs à des marchands africains de la côte puis à des acteurs portugais qui cherchèrent à intervenir dans les circuits existants.", "After Great Zimbabwe declined, other political formations, including the Mutapa state, controlled territories and networks across the plateau and Zambezi region. Gold trade connected these powers to African coastal merchants and later to Portuguese actors who sought to intervene in existing circuits."), linkedEvents: [bi("Expansion de l’État de Mutapa", "Expansion of the Mutapa state")], countryIds: ["ZWE", "MOZ"], civilizationIds: ["mutapa-state"], figureIds: [], peopleIds: ["shona"], timelineEventIds: [] },
      { stopId: "sofala-indian-ocean-link", order: 3, title: bi("Sofala, débouché vers l’océan Indien", "Sofala, gateway to the Indian Ocean"), place: { name: bi("Sofala", "Sofala"), countryId: "MOZ", lat: -20.18, lng: 34.72 }, period: bi("XIIIe–XVIe siècles", "13th–16th centuries"), context: bi("Sofala faisait partie du monde commercial swahili et servait d’interface entre les ressources de l’intérieur et l’océan Indien. L’or provenant des plateaux pouvait rejoindre les circuits maritimes par une chaîne d’intermédiaires. Cette étape relie ainsi l’histoire de l’Afrique australe à celle des cités portuaires de la côte orientale.", "Sofala belonged to the Swahili commercial world and served as an interface between inland resources and the Indian Ocean. Gold from the highlands could enter maritime circuits through chains of intermediaries. This stop therefore connects southern African history with that of the port cities of the eastern coast."), linkedEvents: [bi("Connexion des réseaux aurifères aux échanges de l’océan Indien", "Connection of gold networks to Indian Ocean exchange")], countryIds: ["MOZ"], civilizationIds: ["great-zimbabwe", "mutapa-state", "swahili-city-states"], figureIds: [], peopleIds: ["shona", "swahili"], timelineEventIds: [] },
    ],
    sources: [
      { sourceId: "unesco-great-zimbabwe", publisher: "UNESCO World Heritage Centre", title: "Great Zimbabwe National Monument", url: "https://whc.unesco.org/en/list/364/" },
      { sourceId: "met-great-zimbabwe", publisher: "The Metropolitan Museum of Art", title: "Great Zimbabwe", url: "https://www.metmuseum.org/" },
    ],
  },

];

export const getLocalized = (value, lang = "fr") => {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.fr || value.en || "";
};

export const getJourneyById = (journeyId) => journeys.find((journey) => journey.journeyId === journeyId);
