// PR pilote 3: JS mirror of backend/data/core_v3/pilot_gabon_central_africa/
// display_rules.py — deliberately duplicated (not shared) since frontend and
// backend are separate languages here, but kept in lockstep intentionally.
// If the Python rules change, this file must be updated to match — see the
// Python module's docstring for the authoritative rationale.

// Mirrors schema.py's CONFIDENCE_STYLE.
const CONFIDENCE_STYLE = {
  high: { opacity: 1.0, dash: null, warningBadge: false, hideableAtLowZoom: false },
  medium: { opacity: 0.85, dash: null, warningBadge: false, hideableAtLowZoom: false },
  low: { opacity: 0.6, dash: "dotted", warningBadge: false, hideableAtLowZoom: true },
  disputed: { opacity: 0.6, dash: "dashed", warningBadge: true, hideableAtLowZoom: true },
  unreviewed: { opacity: 0.5, dash: "dotted", warningBadge: false, hideableAtLowZoom: true },
  "unreviewed-fixture": { opacity: 0.5, dash: "dotted", warningBadge: false, hideableAtLowZoom: true },
};

// Mirrors schema.py's INTEGRATION_STATUS_STYLE.
const INTEGRATION_STATUS_STYLE = {
  ready: { warningBadge: false, hachure: false },
  provisional: { warningBadge: true, hachure: false },
  disputed: { warningBadge: true, hachure: true },
  "research-gap": { warningBadge: true, hachure: true },
};

const GEOMETRY_KINDS_ALWAYS_HACHURED = new Set(["zone-of-influence", "approximate-extent"]);

const CONFIDENCE_RANK = { high: 4, medium: 3, low: 2, disputed: 1, unreviewed: 0, "unreviewed-fixture": 0 };

function yearOf(dateOrValue) {
  if (dateOrValue === null || dateOrValue === undefined) return null;
  if (typeof dateOrValue === "number") return dateOrValue;
  if (dateOrValue.openEnded) return null;
  return dateOrValue.year ?? null;
}

/**
 * Combines confidence + integrationStatus into one style spec. The more
 * cautious of the two always wins (never silently upgrade to a more
 * confident-looking style).
 */
export function resolveStyle(assertion) {
  const confStyle = CONFIDENCE_STYLE[assertion?.confidence] || CONFIDENCE_STYLE.unreviewed;
  const statusStyle = INTEGRATION_STATUS_STYLE[assertion?.integrationStatus] || INTEGRATION_STATUS_STYLE.provisional;
  return {
    opacity: confStyle.opacity,
    dash: confStyle.dash,
    warningBadge: confStyle.warningBadge || statusStyle.warningBadge,
    hideableAtLowZoom: confStyle.hideableAtLowZoom,
    hachure: statusStyle.hachure,
  };
}

export function resolveGeometryStyle(geometry) {
  const style = resolveStyle(geometry);
  if (GEOMETRY_KINDS_ALWAYS_HACHURED.has(geometry?.kind)) {
    style.hachure = true; // a commercial/influence zone must never look like a sovereign border
  }
  return style;
}

/**
 * Returns ALL names active at `atYear` (coexistence, never collapsed to
 * one), each annotated with its resolved style.
 */
export function resolveActiveNames(entity, atYear) {
  const names = entity?.names || [];
  return names
    .filter((name) => {
      const vf = yearOf(name.validFrom);
      const vt = yearOf(name.validTo);
      if (vf !== null && vf > atYear) return false;
      if (vt !== null && vt < atYear) return false;
      return true;
    })
    .map((name) => ({ ...name, resolvedStyle: resolveStyle(name) }));
}

/** Picks ONE name as primary/main label when space doesn't allow more than
 * one — never a claim the others aren't "real". */
export function resolvePrimaryName(activeNames) {
  if (!activeNames || activeNames.length === 0) return null;
  const preferred = activeNames.filter((n) => n.isPreferredDisplayName);
  if (preferred.length > 0) return preferred[0];
  return activeNames.reduce((best, n) => {
    const bestRank = CONFIDENCE_RANK[best?.confidence] ?? 0;
    const rank = CONFIDENCE_RANK[n.confidence] ?? 0;
    return rank > bestRank ? n : best;
  }, activeNames[0]);
}

export function resolveActiveStatus(polity, atYear) {
  const statuses = polity?.statuses || [];
  return (
    statuses.find((s) => {
      const vf = yearOf(s.validFrom);
      const vt = yearOf(s.validTo);
      if (vf !== null && vf > atYear) return false;
      if (vt !== null && vt < atYear) return false;
      return true;
    }) || null
  );
}

export function resolveActivePeriodInterpretation(polity, atYear) {
  const pis = polity?.periodInterpretations || [];
  return (
    pis.find((pi) => {
      const start = yearOf(pi.period?.start);
      const end = yearOf(pi.period?.end);
      if (start !== null && start > atYear) return false;
      if (end !== null && end < atYear) return false;
      return true;
    }) || null
  );
}

export function resolveActiveRelations(relations, atYear) {
  return (relations || []).filter((r) => {
    const vf = yearOf(r.validFrom);
    const vt = yearOf(r.validTo);
    if (vf !== null && vf > atYear) return false;
    if (vt !== null && vt < atYear) return false;
    return true;
  });
}

export function resolveActiveGeometries(entity, atYear) {
  const geoms = entity?.geometries || [];
  return geoms
    .filter((g) => {
      const start = yearOf(g.validPeriod?.start);
      const end = yearOf(g.validPeriod?.end);
      if (start !== null && start > atYear) return false;
      if (end !== null && end < atYear) return false;
      return true;
    })
    .map((g) => ({ ...g, resolvedStyle: resolveGeometryStyle(g) }));
}
