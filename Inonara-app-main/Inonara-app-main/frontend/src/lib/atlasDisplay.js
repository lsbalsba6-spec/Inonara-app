import { ATLAS_COLORS } from "./designTokens";

export const MIGRATION_VISUALS = Object.freeze({
  forced: {
    color: "#7B2D26",
    dasharray: undefined,
    width: 3,
    label: "Migration forcée",
  },
  voluntary: {
    color: "#4ade80",
    dasharray: "2 4",
    width: 2.2,
    label: "Migration volontaire",
  },
  mixed: {
    color: ATLAS_COLORS.amber,
    dasharray: "8 3 2 3",
    width: 2.5,
    label: "Migration mixte",
  },
  conquest: {
    color: "#9CA3AF",
    dasharray: "12 4",
    width: 2.4,
    label: "Conquête / expansion militaire",
  },
  unclear: {
    color: "#A78BFA",
    dasharray: "5 5",
    width: 2.1,
    label: "Type à confirmer",
  },
});

export function getMigrationVisualStyle(migrationType) {
  return MIGRATION_VISUALS[migrationType] || MIGRATION_VISUALS.unclear;
}

function overlaps(a, b, padding) {
  return !(
    a.right + padding < b.left ||
    a.left - padding > b.right ||
    a.bottom + padding < b.top ||
    a.top - padding > b.bottom
  );
}

/**
 * Greedy screen-space collision filter. Candidates must already be sorted
 * by priority (highest first). Coordinates are raw SVG coordinates; dimensions
 * are converted to raw units using zoomScale so collision remains correct
 * after the parent SVG group is zoomed.
 */
export function selectNonOverlappingLabels(candidates, zoomScale, options = {}) {
  const paddingPx = options.paddingPx ?? 5;
  const maxLabels = options.maxLabels ?? Math.min(90, 18 + Math.floor(zoomScale * 12));
  const accepted = [];
  const boxes = [];

  for (const candidate of candidates) {
    if (accepted.length >= maxLabels) break;
    const fontSizePx = candidate.fontSizePx ?? 11;
    const widthPx = Math.max(24, candidate.text.length * fontSizePx * 0.58);
    const heightPx = fontSizePx * 1.25;
    const rawWidth = widthPx / zoomScale;
    const rawHeight = heightPx / zoomScale;
    const rawPadding = paddingPx / zoomScale;
    const box = {
      left: candidate.x - rawWidth / 2,
      right: candidate.x + rawWidth / 2,
      top: candidate.y - rawHeight,
      bottom: candidate.y + rawHeight * 0.2,
    };
    if (boxes.some((existing) => overlaps(box, existing, rawPadding))) continue;
    boxes.push(box);
    accepted.push(candidate);
  }
  return accepted;
}
