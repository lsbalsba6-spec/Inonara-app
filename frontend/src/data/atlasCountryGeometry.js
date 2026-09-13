// Geometry identity bridge for the Equal Earth Atlas.
//
// Natural Earth/World Atlas uses cartographic display names (for example
// "Dem. Rep. Congo"), while the platform and backend use stable country IDs
// (ISO 3166-1 alpha-2 whenever available). Keeping this tiny adapter separate
// lets the map stay bound to stable IDs without duplicating country dossier
// content or creating a second country registry.
//
// Entries without an ISO sovereign-state code are explicit territories. They
// deliberately use namespaced IDs so future territory records can coexist with
// countryId relations without pretending that disputed/territorial geometries
// are sovereign countries.

export const ATLAS_COUNTRY_GEOMETRY = Object.freeze({
  Algeria: { countryId: "DZ", fr: "Algérie", en: "Algeria" },
  Angola: { countryId: "AO", fr: "Angola", en: "Angola" },
  Benin: { countryId: "BJ", fr: "Bénin", en: "Benin" },
  Botswana: { countryId: "BW", fr: "Botswana", en: "Botswana" },
  "Burkina Faso": { countryId: "BF", fr: "Burkina Faso", en: "Burkina Faso" },
  Burundi: { countryId: "BI", fr: "Burundi", en: "Burundi" },
  "Cabo Verde": { countryId: "CV", fr: "Cap-Vert", en: "Cabo Verde" },
  Cameroon: { countryId: "CM", fr: "Cameroun", en: "Cameroon" },
  "Central African Rep.": { countryId: "CF", fr: "République centrafricaine", en: "Central African Republic" },
  Chad: { countryId: "TD", fr: "Tchad", en: "Chad" },
  Comoros: { countryId: "KM", fr: "Comores", en: "Comoros" },
  Congo: { countryId: "CG", fr: "République du Congo", en: "Republic of the Congo" },
  "Côte d'Ivoire": { countryId: "CI", fr: "Côte d’Ivoire", en: "Côte d’Ivoire" },
  "Dem. Rep. Congo": { countryId: "CD", fr: "République démocratique du Congo", en: "Democratic Republic of the Congo" },
  Djibouti: { countryId: "DJ", fr: "Djibouti", en: "Djibouti" },
  Egypt: { countryId: "EG", fr: "Égypte", en: "Egypt" },
  "Eq. Guinea": { countryId: "GQ", fr: "Guinée équatoriale", en: "Equatorial Guinea" },
  Eritrea: { countryId: "ER", fr: "Érythrée", en: "Eritrea" },
  eSwatini: { countryId: "SZ", fr: "Eswatini", en: "Eswatini" },
  Ethiopia: { countryId: "ET", fr: "Éthiopie", en: "Ethiopia" },
  Gabon: { countryId: "GA", fr: "Gabon", en: "Gabon" },
  Gambia: { countryId: "GM", fr: "Gambie", en: "Gambia" },
  Ghana: { countryId: "GH", fr: "Ghana", en: "Ghana" },
  Guinea: { countryId: "GN", fr: "Guinée", en: "Guinea" },
  "Guinea-Bissau": { countryId: "GW", fr: "Guinée-Bissau", en: "Guinea-Bissau" },
  Kenya: { countryId: "KE", fr: "Kenya", en: "Kenya" },
  Lesotho: { countryId: "LS", fr: "Lesotho", en: "Lesotho" },
  Liberia: { countryId: "LR", fr: "Libéria", en: "Liberia" },
  Libya: { countryId: "LY", fr: "Libye", en: "Libya" },
  Madagascar: { countryId: "MG", fr: "Madagascar", en: "Madagascar" },
  Malawi: { countryId: "MW", fr: "Malawi", en: "Malawi" },
  Mali: { countryId: "ML", fr: "Mali", en: "Mali" },
  Mauritania: { countryId: "MR", fr: "Mauritanie", en: "Mauritania" },
  Mauritius: { countryId: "MU", fr: "Maurice", en: "Mauritius" },
  Morocco: { countryId: "MA", fr: "Maroc", en: "Morocco" },
  Mozambique: { countryId: "MZ", fr: "Mozambique", en: "Mozambique" },
  Namibia: { countryId: "NA", fr: "Namibie", en: "Namibia" },
  Niger: { countryId: "NE", fr: "Niger", en: "Niger" },
  Nigeria: { countryId: "NG", fr: "Nigeria", en: "Nigeria" },
  Rwanda: { countryId: "RW", fr: "Rwanda", en: "Rwanda" },
  "S. Sudan": { countryId: "SS", fr: "Soudan du Sud", en: "South Sudan" },
  "São Tomé and Principe": { countryId: "ST", fr: "Sao Tomé-et-Principe", en: "São Tomé and Príncipe" },
  Senegal: { countryId: "SN", fr: "Sénégal", en: "Senegal" },
  Seychelles: { countryId: "SC", fr: "Seychelles", en: "Seychelles" },
  "Sierra Leone": { countryId: "SL", fr: "Sierra Leone", en: "Sierra Leone" },
  Somalia: { countryId: "SO", fr: "Somalie", en: "Somalia" },
  Somaliland: { territoryId: "territory:somaliland", fr: "Somaliland", en: "Somaliland", kind: "territory" },
  "South Africa": { countryId: "ZA", fr: "Afrique du Sud", en: "South Africa" },
  Sudan: { countryId: "SD", fr: "Soudan", en: "Sudan" },
  Tanzania: { countryId: "TZ", fr: "Tanzanie", en: "Tanzania" },
  Togo: { countryId: "TG", fr: "Togo", en: "Togo" },
  Tunisia: { countryId: "TN", fr: "Tunisie", en: "Tunisia" },
  Uganda: { countryId: "UG", fr: "Ouganda", en: "Uganda" },
  "W. Sahara": { territoryId: "territory:western-sahara", fr: "Sahara occidental", en: "Western Sahara", kind: "territory" },
  Zambia: { countryId: "ZM", fr: "Zambie", en: "Zambia" },
  Zimbabwe: { countryId: "ZW", fr: "Zimbabwe", en: "Zimbabwe" },
  "Saint Helena": { territoryId: "territory:saint-helena", fr: "Sainte-Hélène", en: "Saint Helena", kind: "territory" },
});

export function getAtlasCountryMetadata(geometryName) {
  return ATLAS_COUNTRY_GEOMETRY[geometryName] || null;
}

export function getAtlasCountryLabel(geometryName, lang = "en") {
  const metadata = getAtlasCountryMetadata(geometryName);
  if (!metadata) return geometryName || "";
  return metadata[lang === "fr" ? "fr" : "en"] || metadata.en || geometryName || "";
}

export function atlasCountrySearchText(geometryName) {
  const metadata = getAtlasCountryMetadata(geometryName);
  return [
    geometryName,
    metadata?.fr,
    metadata?.en,
    metadata?.countryId,
    metadata?.territoryId,
  ].filter(Boolean).join(" ").toLocaleLowerCase();
}
