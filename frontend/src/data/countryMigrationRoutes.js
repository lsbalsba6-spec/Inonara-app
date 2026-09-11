export const COUNTRY_MIGRATION_ROUTE_SETS = {
  NA: {
    note: {
      fr: "Les tracés représentent des axes historiques documentés et restent schématiques : ils ne prétendent pas reconstituer chaque itinéraire exact. Les frontières actuelles servent uniquement de repères cartographiques.",
      en: "The lines represent documented historical movement corridors and remain schematic: they do not claim to reconstruct every exact itinerary. Present-day borders are used only as cartographic reference points.",
    },
    routes: [
      {
        id: "na-nama-northward-1770",
        type: "regional-mobility",
        start: 1770,
        end: 1850,
        label: {
          fr: "Migrations nama vers le nord au-delà du fleuve Orange",
          en: "Nama northward migrations across the Orange River",
        },
        origin: { fr: "Région du Cap / fleuve Orange", en: "Cape region / Orange River" },
        destination: { fr: "Sud et centre de la Namibie", en: "Southern and central Namibia" },
        origin_coordinates: [18.2, -29.6],
        destination_coordinates: [17.1, -25.0],
        people: "Nama",
        description: {
          fr: "À partir de la fin du XVIIIe siècle, des groupes nama poursuivent des mobilités vers le nord depuis les espaces du Cap et du fleuve Orange vers le Sud-Ouest africain.",
          en: "From the late eighteenth century, Nama groups continued northward mobility from the Cape and Orange River areas into South West Africa.",
        },
        source_label: "Journal of Namibian Studies",
        source_url: "https://namibian-studies.com/index.php/JNS/article/download/124/124/249",
      },
      {
        id: "na-ovakwanyama-border-1927",
        type: "regional-mobility",
        start: 1927,
        end: 1935,
        label: {
          fr: "Déplacements ovakwanyama depuis l'Angola après la démarcation frontalière",
          en: "Ovakwanyama movements from Angola after border demarcation",
        },
        origin: { fr: "Sud de l'Angola", en: "Southern Angola" },
        destination: { fr: "Ovamboland / nord de la Namibie", en: "Ovamboland / northern Namibia" },
        origin_coordinates: [15.6, -16.7],
        destination_coordinates: [15.7, -17.7],
        people: "Ovakwanyama",
        description: {
          fr: "La redéfinition et la démarcation de la frontière Angola–Sud-Ouest africain en 1927 furent suivies du déplacement d'un nombre important d'Ovakwanyama vers le côté administré comme Sud-Ouest africain.",
          en: "The 1927 redrawing and demarcation of the Angola–South West Africa border was followed by the movement of many Ovakwanyama to the South West African side.",
        },
        source_label: "Journal of Namibian Studies",
        source_url: "https://namibian-studies.com/index.php/JNS/article/view/14",
      },
      {
        id: "na-contract-labour-ovambo",
        type: "coerced-labour",
        start: 1925,
        end: 1972,
        label: {
          fr: "Travail migrant sous contrat depuis les régions ovambo",
          en: "Contract migrant labour from Ovambo regions",
        },
        origin: { fr: "Nord de la Namibie / Ovamboland", en: "Northern Namibia / Ovamboland" },
        destination: { fr: "Mines, fermes et villes du centre et du sud", en: "Mines, farms and towns of central and southern Namibia" },
        origin_coordinates: [16.0, -17.8],
        destination_coordinates: [17.1, -22.6],
        people: { fr: "Travailleurs ovambo", en: "Ovambo workers" },
        description: {
          fr: "Le système colonial de recrutement canalisa des dizaines de milliers d'hommes vers les mines, fermes, pêcheries, services et villes. La SWANLA centralisa ensuite une grande partie de ce recrutement.",
          en: "The colonial recruiting system channelled tens of thousands of men toward mines, farms, fisheries, services and towns. SWANLA later centralized much of this recruitment.",
        },
        source_label: "UNESCO / Journal of Namibian Studies",
        source_url: "https://unesdoc.unesco.org/ark:/48223/pf0000028849",
      },
      {
        id: "na-contract-labour-kavango",
        type: "coerced-labour",
        start: 1925,
        end: 1972,
        label: {
          fr: "Recrutement migrant depuis le Kavango",
          en: "Migrant recruitment from Kavango",
        },
        origin: { fr: "Kavango", en: "Kavango" },
        destination: { fr: "Fermes et mines du centre et du sud", en: "Farms and mines of central and southern Namibia" },
        origin_coordinates: [19.8, -17.9],
        destination_coordinates: [15.2, -22.7],
        people: { fr: "Travailleurs du Kavango", en: "Kavango workers" },
        description: {
          fr: "Après la Première Guerre mondiale, le recrutement institutionnalisé s'étendit aussi au Kavango pour fournir de la main-d'œuvre aux secteurs minier et agricole.",
          en: "After the First World War, institutionalized recruiting also extended into Kavango to supply labour to mining and agriculture.",
        },
        source_label: "Journal of Namibian Studies",
        source_url: "https://namibian-studies.com/index.php/JNS/article/download/98/98/197",
      },
      {
        id: "na-herero-omaheke-1904",
        type: "forced-displacement",
        start: 1904,
        end: 1908,
        label: {
          fr: "Déplacement forcé des Ovaherero vers l'Omaheke",
          en: "Forced displacement of Ovaherero toward the Omaheke",
        },
        origin: { fr: "Waterberg et centre-est", en: "Waterberg and central-east" },
        destination: { fr: "Omaheke et frontière du Bechuanaland", en: "Omaheke and Bechuanaland frontier" },
        origin_coordinates: [17.25, -20.45],
        destination_coordinates: [20.7, -22.0],
        people: "Ovaherero",
        description: {
          fr: "Pendant la guerre coloniale de 1904, les opérations allemandes poussèrent de nombreux Ovaherero vers l'est et l'Omaheke. Le tracé est volontairement schématique et renvoie à un processus de violence et de déplacement génocidaires.",
          en: "During the 1904 colonial war, German operations drove many Ovaherero eastward toward the Omaheke. The line is deliberately schematic and represents a process of genocidal violence and displacement.",
        },
        source_label: "Journal of Namibian Studies",
        source_url: "https://namibian-studies.com/index.php/JNS/article/view/21",
      },
    ],
  },
};

export function getCountryMigrationRouteSet(iso2) {
  return COUNTRY_MIGRATION_ROUTE_SETS[iso2] || null;
}
