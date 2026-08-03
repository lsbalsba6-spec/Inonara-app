// PR pilote 3: adapts the core_v3 pilot corpus into markers the existing
// WorldMap/Atlas rendering can draw, for a given reference year.
//
// IMPORTANT — honesty note: none of the pilot entities have a real, sourced
// HistoricalGeometry yet (deferred, see PR pilote 2's report). The
// coordinates below are ROUGH, APPROXIMATE, RENDERING-ONLY placeholders
// (roughly where these places/regions are in the real world) — NOT sourced
// historical geometries. Every marker rendered from this table carries an
// explicit "position approximative, non sourcée" note in its click panel
// (see PilotV3InfoPanel.jsx), so this is never presented as more precise
// than it is.
import {
  resolveActiveNames,
  resolvePrimaryName,
  resolveActiveStatus,
  resolveActivePeriodInterpretation,
  resolveActiveRelations,
} from "./pilotV3Resolver";

// entity name value -> [lat, lon], approximate, rendering-only.
const RENDERING_COORDS_BY_NAME_VALUE = {
  "Gabão": [0.39, 9.45],
  "Gabon": [0.39, 9.45],
  "Libreville": [0.39, 9.45],
  "Mbanza Kongo": [-6.27, 14.24],
  "São Salvador": [-6.27, 14.24],
  "Loango Coast / Côte de Loango": [-4.2, 11.0],
  "Kingdom of Kongo / Royaume du Kongo": [-6.27, 14.24],
  "Kongo dia Ntotila": [-6.27, 14.24],
  "Kingdom of Loango / Royaume de Loango": [-4.79, 11.86],
  "Afrique-Équatoriale française (AEF)": [-4.27, 15.28],
  "République gabonaise": [0.39, 9.45],
};

function approxCoordsFor(entity) {
  for (const name of entity.names || []) {
    if (RENDERING_COORDS_BY_NAME_VALUE[name.value]) return RENDERING_COORDS_BY_NAME_VALUE[name.value];
  }
  return null;
}

/**
 * Builds the list of markers to render for the pilot overlay at `atYear`.
 * Entities with no active name at `atYear`, or no known rendering position,
 * are simply omitted (never fabricated).
 */
export function buildPilotV3Markers(entities, atYear) {
  const markers = [];
  for (const entity of entities) {
    if (entity.category === "Event" || entity.category === "Process") continue;
    const activeNames = resolveActiveNames(entity, atYear);
    if (activeNames.length === 0) continue;
    const primary = resolvePrimaryName(activeNames);
    const coords = approxCoordsFor(entity);
    if (!coords) continue;

    markers.push({
      id: entity.id,
      entity,
      category: entity.category,
      coords,
      isApproximatePosition: true,
      primaryName: primary,
      activeNames,
      activeStatus: entity.category === "Polity" ? resolveActiveStatus(entity, atYear) : null,
      activePeriodInterpretation: entity.category === "Polity" ? resolveActivePeriodInterpretation(entity, atYear) : null,
      style: primary.resolvedStyle,
    });
  }
  return markers;
}

export function buildPilotV3ActiveRelations(relations, atYear) {
  return resolveActiveRelations(relations, atYear);
}

/**
 * The Fang Process is rendered specially: NEVER as a continuous arrow, only
 * as its phase list — matching "processus fang sans flèche artificielle".
 */
export function buildFangProcessDisplay(process) {
  if (!process || process.processType !== "migration") return null;
  return {
    id: process.id,
    label: "Migration fang (processus, sans tracé unique)",
    phases: process.phases || [],
    warningNote: process.notes,
    style: { warningBadge: true, hachure: false, dash: "dotted", opacity: 0.6 },
  };
}
