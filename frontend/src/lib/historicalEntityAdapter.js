// PR3: adapter from the new HistoricalEntity schema (lib/historicalTypes.js,
// produced by backend/scripts/migrate_historical_entities.py) back to the
// EXACT old flat shape the current renderer (Atlas.jsx/WorldMap.jsx) already
// knows how to draw:
//   {id, name, era_start, era_end, coords:[lat,lon], radius_km, color, summary, sources:[string,...]}
//
// This lets the new data flow through the OLD, already-working rendering
// code completely unchanged — no label engine, no real borders, no new
// visual behavior. It's a pure translation layer, nothing more.
//
// `color` and `summary` come from `migrationMeta` — fields the migration
// script deliberately preserved for exactly this purpose (see
// migrate_historical_entities.py's docstring). This is not fabricated data;
// it's the same original value, carried through under a different key.

/**
 * @param {import('./historicalTypes').HistoricalEntity} entity
 * @returns {{id: string, name: string, era_start: number, era_end: number,
 *   coords: [number, number], radius_km: number, color: string,
 *   summary: string, sources: string[]}}
 */
export function adaptHistoricalEntityToLegacyShape(entity) {
  const period = entity.periods[0];
  const name = entity.names[0];
  const geometry = entity.geometries[0];
  const [lon, lat] = geometry.geoJson.coordinates;
  const meta = entity.migrationMeta || {};

  return {
    id: entity.id,
    name: name ? name.value : entity.id,
    era_start: period.start.year,
    era_end: period.end.year,
    coords: [lat, lon],
    radius_km: geometry.geoJson.properties.radius_km,
    color: meta.originalColor || "#D4AF37",
    summary: meta.originalSummary || "",
    sources: (entity.sources || []).map((s) => s.label),
  };
}

/**
 * @param {import('./historicalTypes').HistoricalEntity[]} entities
 * @returns {Array<ReturnType<typeof adaptHistoricalEntityToLegacyShape>>}
 */
export function adaptHistoricalEntitiesToLegacyShape(entities) {
  return entities.map(adaptHistoricalEntityToLegacyShape);
}
