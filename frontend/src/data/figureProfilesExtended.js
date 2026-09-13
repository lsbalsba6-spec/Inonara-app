// Additional curated profiles used to broaden disciplinary coverage without coupling
// the Figures module to country, civilization, people or journey datasets.

export const EXTRA_FIGURE_PROFILES = [
  {
    figureId: "desmond-tutu",
    id: "desmond-tutu",
    fullName: "Desmond Mpilo Tutu",
    name: "Desmond Tutu",
    aliases: ["Archbishop Desmond Tutu"],
    birth: {
      dateLabel: "7 October 1931",
      place: { fr: "Klerksdorp, Afrique du Sud", en: "Klerksdorp, South Africa" },
      certainty: "documented",
    },
    death: {
      dateLabel: "26 December 2021",
      place: { fr: "Le Cap, Afrique du Sud", en: "Cape Town, South Africa" },
      certainty: "documented",
    },
    countryIds: ["ZA", "LS", "GB"],
    civilizationIds: [],
    peopleIds: [],
    journeyIds: [],
    timelineEventIds: [],
    region: { fr: "Afrique australe", en: "Southern Africa" },
    regions: ["southern-africa"],
    period: { fr: "apartheid et transition démocratique", en: "apartheid and democratic transition" },
    centuries: [20, 21],
    category: "civil_rights",
    domains: ["religion", "human-rights", "activism", "politics"],
    gender: "male",
    era: "1931–2021",
    summary: {
      fr: "Prêtre puis archevêque anglican sud-africain, Desmond Tutu fit des institutions chrétiennes un espace majeur de contestation non violente de l’apartheid. Lauréat du prix Nobel de la paix en 1984, il présida ensuite la Commission vérité et réconciliation.",
      en: "South African Anglican priest and later archbishop Desmond Tutu made Christian institutions a major arena of nonviolent opposition to apartheid. Awarded the Nobel Peace Prize in 1984, he later chaired the Truth and Reconciliation Commission.",
    },
    biography: [
      {
        fr: "Tutu se forma d’abord comme enseignant avant d’abandonner l’école publique après l’entrée en vigueur du Bantu Education Act. Ordonné prêtre anglican en 1960, il poursuivit des études théologiques en Afrique du Sud et en Angleterre. Ses responsabilités dans l’Église et au Conseil sud-africain des Églises lui donnèrent une tribune nationale et internationale pour dénoncer la ségrégation légale, les déplacements forcés et la privation des droits politiques.",
        en: "Tutu first trained as a teacher but left state education after the Bantu Education Act reshaped schooling for Black South Africans. Ordained an Anglican priest in 1960, he pursued theological studies in South Africa and England. His leadership roles in the church and the South African Council of Churches gave him a national and international platform from which to oppose legal segregation, forced removals and political disenfranchisement.",
      },
      {
        fr: "Il défendit une stratégie non violente tout en refusant de réduire le conflit sud-africain à une question morale abstraite : ses interventions liaient racisme institutionnel, économie, sanctions internationales et dignité humaine. Après 1994, Nelson Mandela le nomma à la tête de la Commission vérité et réconciliation, chargée d’enquêter sur les violations graves des droits humains de la période de l’apartheid.",
        en: "He advocated nonviolent resistance while refusing to reduce South Africa's conflict to an abstract moral question: his interventions linked institutional racism, economics, international sanctions and human dignity. After 1994, Nelson Mandela appointed him to chair the Truth and Reconciliation Commission, tasked with investigating gross human-rights violations committed during the apartheid era.",
      },
    ],
    historicalContext: {
      fr: "Sous l’apartheid, les Églises sud-africaines n’eurent pas une position unique : certaines institutions religieuses contribuèrent à légitimer la ségrégation tandis que d’autres devinrent des lieux importants de mobilisation civique. Le Conseil sud-africain des Églises joua un rôle notable dans ce second courant.",
      en: "South African churches did not hold a single position under apartheid: some religious institutions helped legitimise segregation while others became important spaces of civic mobilisation. The South African Council of Churches played a significant role in the latter current.",
    },
    contributions: [
      { fr: "Mobilisation religieuse et civique non violente contre l’apartheid", en: "Religious and civic mobilisation against apartheid through nonviolent means" },
      { fr: "Internationalisation de la campagne pour les droits humains et les sanctions contre l’apartheid", en: "International advocacy for human rights and sanctions against apartheid" },
      { fr: "Présidence de la Commission vérité et réconciliation", en: "Chairmanship of the Truth and Reconciliation Commission" },
    ],
    controversies: [
      {
        fr: "La Commission vérité et réconciliation reste débattue : elle permit de documenter publiquement de nombreuses violences et d’entendre des victimes, mais son système d’amnistie conditionnelle et l’absence de réparations suffisantes ont aussi fait l’objet de critiques durables.",
        en: "The Truth and Reconciliation Commission remains debated: it publicly documented extensive violence and gave victims a forum, but its conditional-amnesty system and the inadequacy of subsequent reparations have also drawn lasting criticism.",
      },
    ],
    legacy: {
      fr: "Tutu demeure une figure majeure du christianisme africain contemporain, de l’éthique publique et de la lutte contre l’apartheid. Son parcours montre comment une autorité religieuse put devenir une institution politique informelle sans occuper directement la direction d’un parti.",
      en: "Tutu remains a major figure in contemporary African Christianity, public ethics and the struggle against apartheid. His career shows how religious authority could become an informal political institution without directly leading a political party.",
    },
    works: [
      { title: "Crying in the Wilderness", type: "sermons / speeches", date: "1982" },
      { title: "Hope and Suffering", type: "sermons / speeches", date: "1984" },
      { title: "The Rainbow People of God", type: "speeches / letters", date: "1994" },
    ],
    chronology: [
      { year: 1960, label: { fr: "Ordination comme diacre anglican", en: "Ordained an Anglican deacon" }, certainty: "documented" },
      { year: 1978, label: { fr: "Devient secrétaire général du Conseil sud-africain des Églises", en: "Becomes General Secretary of the South African Council of Churches" }, certainty: "documented" },
      { year: 1984, label: { fr: "Reçoit le prix Nobel de la paix", en: "Receives the Nobel Peace Prize" }, certainty: "documented" },
      { year: 1986, label: { fr: "Devient archevêque du Cap", en: "Becomes Archbishop of Cape Town" }, certainty: "documented" },
      { year: 1995, label: { fr: "Nommé président de la Commission vérité et réconciliation", en: "Appointed chair of the Truth and Reconciliation Commission" }, certainty: "documented" },
    ],
    places: [
      { id: "klerksdorp", name: "Klerksdorp", lat: -26.8521, lng: 26.6667, role: { fr: "lieu de naissance", en: "birthplace" } },
      { id: "johannesburg", name: "Johannesburg", lat: -26.2041, lng: 28.0473, role: { fr: "enseignement, ministère et responsabilités ecclésiales", en: "teaching, ministry and church leadership" } },
      { id: "lesotho", name: "Lesotho", lat: -29.61, lng: 28.2336, role: { fr: "évêque du Lesotho", en: "Bishop of Lesotho" } },
      { id: "cape-town", name: { fr: "Le Cap", en: "Cape Town" }, lat: -33.9249, lng: 18.4241, role: { fr: "archevêché et fin de vie", en: "archbishopric and later life" } },
    ],
    media: [
      {
        type: "reference",
        title: { fr: "Portrait d’archive de la Fondation Nobel", en: "Nobel Foundation archive portrait" },
        sourceUrl: "https://www.nobelprize.org/prizes/peace/1984/tutu/facts/",
        rights: { fr: "Photographie d’archive de la Fondation Nobel ; ne pas réutiliser sans vérifier la licence du fichier", en: "Nobel Foundation archive photograph; do not reuse without checking the file licence" },
      },
    ],
    sources: [
      { title: "Desmond Tutu — Facts", publisher: "NobelPrize.org", year: 1984, url: "https://www.nobelprize.org/prizes/peace/1984/tutu/facts/" },
      { title: "Desmond Tutu — Biographical", publisher: "NobelPrize.org", year: 1984, url: "https://www.nobelprize.org/prizes/peace/1984/tutu/biographical/" },
      { title: "Desmond Tutu — Curriculum Vitae", publisher: "NobelPrize.org", year: 1984, url: "https://www.nobelprize.org/prizes/peace/1984/tutu/cv/" },
    ],
  },
  {
    figureId: "abebe-bikila",
    id: "abebe-bikila",
    fullName: "Abebe Bikila",
    name: "Abebe Bikila",
    aliases: [],
    birth: {
      dateLabel: "7 August 1932",
      place: { fr: "Jatta, région de Debre Birhan, Éthiopie", en: "Jatta, Debre Birhan region, Ethiopia" },
      certainty: "documented",
    },
    death: {
      dateLabel: "1973",
      place: { fr: "Éthiopie", en: "Ethiopia" },
      certainty: "documented",
    },
    countryIds: ["ET", "IT", "JP"],
    civilizationIds: [],
    peopleIds: [],
    journeyIds: [],
    timelineEventIds: [],
    region: { fr: "Afrique de l’Est", en: "East Africa" },
    regions: ["east-africa"],
    period: { fr: "Éthiopie du XXe siècle · histoire olympique", en: "20th-century Ethiopia · Olympic history" },
    centuries: [20],
    category: "athletes",
    domains: ["sport", "culture"],
    gender: "male",
    era: "1932–1973",
    summary: {
      fr: "Marathonien éthiopien, Abebe Bikila remporta les Jeux olympiques de Rome en 1960 puis conserva son titre à Tokyo en 1964. Il fut le premier champion olympique de l’Éthiopie et transforma durablement la place des coureurs africains dans l’imaginaire sportif mondial.",
      en: "Ethiopian marathon runner Abebe Bikila won the 1960 Rome Olympic marathon and retained the title in Tokyo in 1964. He became Ethiopia's first Olympic champion and permanently changed the global sporting imagination of African distance running.",
    },
    biography: [
      {
        fr: "Né dans un milieu rural, Bikila rejoignit à dix-neuf ans la garde impériale éthiopienne, où l’entraînement physique révéla ses qualités de coureur. Le Suédois Onni Niskanen, directeur de l’athlétisme éthiopien, structura sa préparation. Peu avant les Jeux de Rome, Bikila gagna les sélections nationales et fut intégré à l’équipe olympique.",
        en: "Born in a rural environment, Bikila joined Ethiopia's Imperial Body Guard at nineteen, where physical training revealed his ability as a runner. Swedish coach Onni Niskanen, then Ethiopia's athletics director, structured his preparation. Shortly before the Rome Games, Bikila won the national marathon trial and joined the Olympic team.",
      },
      {
        fr: "À Rome, il courut le marathon pieds nus et s’imposa près de l’Arc de Constantin, établissant alors une meilleure performance mondiale. Quatre ans plus tard à Tokyo, quelques semaines après une appendicectomie, il remporta de nouveau le marathon, cette fois chaussé, en 2 h 12 min 11,2 s selon les statistiques olympiques historiques. Cette double victoire fut exceptionnelle dans l’histoire du marathon olympique et prit aussi une forte portée symbolique pour une Éthiopie qui avait subi l’occupation italienne de 1936 à 1941.",
        en: "In Rome he ran the marathon barefoot and won near the Arch of Constantine, setting what was then a world best. Four years later in Tokyo, only weeks after an appendectomy, he won again—this time in shoes—in 2:12:11.2 according to historical Olympic statistics. The double victory was exceptional in Olympic marathon history and also acquired strong symbolic meaning for an Ethiopia that had experienced Italian occupation from 1936 to 1941.",
      },
    ],
    historicalContext: {
      fr: "Les Jeux de 1960 et 1964 se déroulèrent au moment où de nombreux États africains accédaient à l’indépendance et où la visibilité sportive internationale du continent augmentait rapidement. L’Éthiopie, indépendante à l’exception de l’occupation italienne, occupait une place symbolique particulière dans les imaginaires panafricains.",
      en: "The 1960 and 1964 Games took place as many African states were gaining independence and the continent's international sporting visibility was rapidly increasing. Ethiopia, independent apart from the period of Italian occupation, held a distinctive symbolic position in Pan-African imaginaries.",
    },
    contributions: [
      { fr: "Premier titre olympique de l’histoire de l’Éthiopie", en: "First Olympic title in Ethiopia's history" },
      { fr: "Deux titres olympiques consécutifs au marathon, Rome 1960 et Tokyo 1964", en: "Back-to-back Olympic marathon titles in Rome 1960 and Tokyo 1964" },
      { fr: "Figure fondatrice de la reconnaissance internationale de la course de fond est-africaine", en: "Foundational figure in the international recognition of East African distance running" },
    ],
    controversies: [
      {
        fr: "Le récit populaire réduit parfois Rome 1960 à l’image spectaculaire du coureur « naturellement » doué et pieds nus. Cette lecture efface l’entraînement structuré, la sélection nationale, le rôle d’Onni Niskanen et le développement institutionnel de l’athlétisme éthiopien.",
        en: "Popular retellings sometimes reduce Rome 1960 to the spectacle of a supposedly 'natural' barefoot runner. That narrative obscures structured training, national selection, Onni Niskanen's coaching and the institutional development of Ethiopian athletics.",
      },
    ],
    legacy: {
      fr: "Bikila reste une référence de l’histoire olympique et une figure majeure de la mémoire sportive éthiopienne. Son héritage ne réside pas dans le fait d’avoir couru pieds nus, mais dans la démonstration qu’un programme africain d’athlétisme pouvait produire des performances de niveau mondial.",
      en: "Bikila remains a landmark figure in Olympic history and Ethiopian sporting memory. His legacy is not simply that he ran barefoot, but that an African athletics programme could produce performances at the highest global level.",
    },
    works: [
      { title: { fr: "Champion olympique du marathon — Rome", en: "Olympic marathon champion — Rome" }, type: "sport", date: "1960" },
      { title: { fr: "Champion olympique du marathon — Tokyo", en: "Olympic marathon champion — Tokyo" }, type: "sport", date: "1964" },
    ],
    chronology: [
      { year: 1951, label: { fr: "Rejoint la garde impériale et développe son entraînement de course", en: "Joins the Imperial Body Guard and develops as a runner" }, certainty: "approximate" },
      { year: 1960, label: { fr: "Remporte le marathon olympique de Rome", en: "Wins the Olympic marathon in Rome" }, certainty: "documented" },
      { year: 1964, label: { fr: "Conserve son titre olympique à Tokyo", en: "Retains his Olympic title in Tokyo" }, certainty: "documented" },
      { year: 1969, label: { fr: "Un accident automobile provoque une paralysie durable", en: "A car crash causes lasting paralysis" }, certainty: "documented" },
      { year: 1973, label: { fr: "Mort à l’âge de 41 ans", en: "Dies aged 41" }, certainty: "documented" },
    ],
    places: [
      { id: "jatta", name: "Jatta", lat: 9.6, lng: 39.5, role: { fr: "région de naissance, localisation cartographique approximative", en: "birth region, approximate map location" }, certainty: "approximate" },
      { id: "addis-ababa", name: "Addis Ababa", lat: 8.9806, lng: 38.7578, role: { fr: "garde impériale et entraînement", en: "Imperial Body Guard and training" } },
      { id: "rome", name: { fr: "Rome", en: "Rome" }, lat: 41.9028, lng: 12.4964, role: { fr: "premier titre olympique en 1960", en: "first Olympic title in 1960" } },
      { id: "tokyo", name: "Tokyo", lat: 35.6762, lng: 139.6503, role: { fr: "deuxième titre olympique en 1964", en: "second Olympic title in 1964" } },
    ],
    media: [
      {
        type: "reference",
        title: { fr: "Archives olympiques et statistiques historiques du marathon", en: "Olympic archive and historical marathon statistics" },
        sourceUrl: "https://library.olympics.com/",
        rights: { fr: "Référence documentaire ; ne pas réutiliser les photographies sans licence explicite", en: "Documentary reference; do not reuse photographs without an explicit licence" },
      },
    ],
    sources: [
      { title: "Abebe Bikila — Athlete Profile", publisher: "World Athletics", url: "https://worldathletics.org/athletes/_/14359309" },
      { title: "Remembering Bikila’s 1960 Olympic marathon victory on its 60th anniversary", publisher: "World Athletics", year: 2020, url: "https://worldathletics.org/news/feature/abebe-bikila-1960-olympic-marathon-victory" },
      { title: "Olympic Athletics Statistics Handbook — Marathon", publisher: "Olympic World Library", url: "https://library.olympics.com/" },
    ],
  },
];
