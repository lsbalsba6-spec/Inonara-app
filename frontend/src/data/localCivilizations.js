import { WEST_CIVILIZATIONS } from "./civilizationsWest";
import { NILE_EAST_CIVILIZATIONS } from "./civilizationsNileEast";
import { SOUTH_CENTRAL_CIVILIZATIONS } from "./civilizationsSouthCentral";
import { COAST_CIVILIZATIONS } from "./civilizationsCoast";
import { LEGACY_CIVILIZATIONS } from "./civilizationsLegacy";

export const CIVILIZATION_SCHEMA_VERSION = 1;

export const LOCAL_CIVILIZATION_ENRICHMENTS = [
  ...WEST_CIVILIZATIONS,
  ...NILE_EAST_CIVILIZATIONS,
  ...SOUTH_CENTRAL_CIVILIZATIONS,
  ...COAST_CIVILIZATIONS,
  ...LEGACY_CIVILIZATIONS,
];

export const CIVILIZATION_ENRICHMENT_BY_ID = Object.fromEntries(
  LOCAL_CIVILIZATION_ENRICHMENTS.map((item) => [item.id, item])
);

const hasDocumentedPrimaryImage = (record = {}) => Boolean(
  record.image_url &&
  record.image_credit &&
  record.image_source_url &&
  (record.image_license || record.image_rights)
);

export function sanitizeCivilizationMedia(record = {}) {
  if (hasDocumentedPrimaryImage(record)) return record;
  return {
    ...record,
    image_url: null,
    image_credit: null,
    image_source_url: null,
    wikipedia_title: null,
  };
}

export function mergeCivilizationRecord(remote = {}, local = {}) {
  const merged = { ...remote, ...local };
  if (Object.prototype.hasOwnProperty.call(local, "media")) {
    merged.media = local.media;
    const primary = Array.isArray(local.media)
      ? local.media.find((item) => item?.url && item?.sourceUrl && item?.credit && item?.license)
      : null;
    if (primary) {
      merged.image_url = primary.url;
      merged.image_credit = primary.credit;
      merged.image_source_url = primary.sourceUrl;
      merged.image_license = primary.license;
      merged.wikipedia_title = null;
      return merged;
    }
  }
  return sanitizeCivilizationMedia(merged);
}

export function enrichCivilization(remote = {}) {
  if (!remote?.id) return sanitizeCivilizationMedia(remote);
  const local = CIVILIZATION_ENRICHMENT_BY_ID[remote.id];
  return local ? mergeCivilizationRecord(remote, local) : sanitizeCivilizationMedia(remote);
}

export function mergeCivilizationList(remote = []) {
  const byId = new Map();
  (Array.isArray(remote) ? remote : []).forEach((item) => {
    if (item?.id) byId.set(item.id, enrichCivilization(item));
  });
  LOCAL_CIVILIZATION_ENRICHMENTS.forEach((local) => {
    if (!byId.has(local.id)) byId.set(local.id, sanitizeCivilizationMedia(local));
  });
  return [...byId.values()];
}
