// PR3: feature flag controlling which historical-polities data source the
// Atlas map reads from. Deliberately a URL query param (not a rebuild-time
// constant) so it can be toggled live in production for visual comparison,
// without a new deployment: ?historicalDataSource=v2
//
// Default is "v1" (the existing, already-shipped data) — v2 is opt-in only,
// per "ne pas supprimer/remplacer encore historical_polities.py".

export const HISTORICAL_DATA_SOURCE_PARAM = "historicalDataSource";

/**
 * @returns {"v1"|"v2"}
 */
export function getHistoricalDataSource() {
  if (typeof window === "undefined") return "v1";
  const params = new URLSearchParams(window.location.search);
  const value = params.get(HISTORICAL_DATA_SOURCE_PARAM);
  return value === "v2" ? "v2" : "v1";
}

// PR pilote 3: separate, independent flag for the Gabon/Central Africa
// core_v3 pilot overlay — deliberately its OWN param (not reusing
// historicalDataSource) since this is an ADDITIVE overlay layer, not a
// replacement data source. Default OFF. ?pilotV3=1 enables it.
export const PILOT_V3_PARAM = "pilotV3";

/**
 * @returns {boolean}
 */
export function isPilotV3Enabled() {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get(PILOT_V3_PARAM) === "1";
}
