import { WEST_CIVILIZATIONS } from "./civilizationsWest";
import { NILE_EAST_CIVILIZATIONS } from "./civilizationsNileEast";
import { SOUTH_CENTRAL_CIVILIZATIONS } from "./civilizationsSouthCentral";
import { COAST_CIVILIZATIONS } from "./civilizationsCoast";

export const CIVILIZATION_SCHEMA_VERSION = 1;

export const LOCAL_CIVILIZATION_ENRICHMENTS = [
  ...WEST_CIVILIZATIONS,
  ...NILE_EAST_CIVILIZATIONS,
  ...SOUTH_CENTRAL_CIVILIZATIONS,
  ...COAST_CIVILIZATIONS,
];

export const CIVILIZATION_ENRICHMENT_BY_ID = Object.fromEntries(
  LOCAL_CIVILIZATION_ENRICHMENTS.map((item) => [item.id, item])
);

export function mergeCivilizationRecord(remote = {}, local = {}) {
  const merged = { ...remote, ...local };
  // Enriched records deliberately hide legacy imagery when rights metadata has
  // not been curated. This keeps the module compliant with the editorial rule
  // that every displayed medium needs provenance, author/source and rights.
  if (Object.prototype.hasOwnProperty.call(local, "media")) {
    merged.media = local.media;
    const primary = Array.isArray(local.media) ? local.media.find((item) => item?.url && item?.license) : null;
    merged.image_url = primary?.url || null;
    merged.image_credit = primary?.credit || null;
    merged.image_source_url = primary?.sourceUrl || null;
    merged.wikipedia_title = null;
  }
  return merged;
}

export function enrichCivilization(remote = {}) {
  if (!remote?.id) return remote;
  const local = CIVILIZATION_ENRICHMENT_BY_ID[remote.id];
  return local ? mergeCivilizationRecord(remote, local) : remote;
}

export function mergeCivilizationList(remote = []) {
  const byId = new Map();
  (Array.isArray(remote) ? remote : []).forEach((item) => {
    if (item?.id) byId.set(item.id, enrichCivilization(item));
  });
  LOCAL_CIVILIZATION_ENRICHMENTS.forEach((local) => {
    if (!byId.has(local.id)) byId.set(local.id, local);
  });
  return [...byId.values()];
}
