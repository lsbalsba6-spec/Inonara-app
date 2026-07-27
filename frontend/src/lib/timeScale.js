// Non-linear time scale for the unified Atlas timeline slider.
//
// Why non-linear: Pangaea formed ~300 million years ago; all of recorded
// human history (-3500 to today) spans only ~5,525 years. On a single LINEAR
// slider, human history would compress into an unusable sliver a fraction of
// a pixel wide. Instead, the slider position (0 to 1) maps to year through a
// piecewise-linear scale with anchor points chosen to give recent, detail-rich
// periods much more room than deep geological time — while still being one
// continuous, uninterrupted slider from Pangaea to today.
//
// PR1 change: the primary function is now `getTimelinePosition()`, returning
// a full `TimelinePosition` object (see lib/historicalTypes.js) instead of a
// bare year. `sliderToYear`, `yearToSlider`, `modeForYear`, and `eraLabel`
// are kept as thin, backward-compatible wrappers so existing call sites
// (Atlas.jsx) do not need to change in this PR.
//
// Bugfix included in this PR: `sliderToYear` did not clamp slider values
// below SLIDER_MIN — a negative input fell through every anchor-point
// comparison and incorrectly returned the LAST anchor's year (2025) instead
// of the first (-300,000,000). Out-of-range values are now clamped before
// interpolation, for both this function and `getTimelinePosition`.

/** @typedef {import('./historicalTypes').TimelinePosition} TimelinePosition */
/** @typedef {import('./historicalTypes').TimelineMode} TimelineMode */
/** @typedef {import('./historicalTypes').PrecisionLevel} PrecisionLevel */

// Anchor points: [sliderFraction, year]. Both must be strictly increasing.
export const TIME_ANCHORS = [
  [0.00, -300000000], // Pangaea assembles
  [0.08, -200000000], // Pangaea begins to rift
  [0.14, -150000000], // Laurasia / Gondwana separate
  [0.20, -100000000], // Atlantic Ocean opens
  [0.26, -66000000],  // End of the dinosaurs
  [0.32, -35000000],  // India collides with Asia
  [0.38, -14000000],  // Near-modern world (geological mode ends here)
  [0.45, -70000],     // Out-of-Africa dispersal begins (prehistoric mode starts)
  [0.55, -10000],      // Last Ice Age ends, land bridges submerge
  [0.62, -3500],       // Recorded civilizations begin (historical mode starts)
  [0.72, 1000],        // Medieval period / early West African empires
  [0.80, 1500],        // Eve of the transatlantic slave trade
  [0.88, 1885],        // Berlin Conference — height of colonization
  [0.95, 1960],        // Wave of African independence
  [1.00, 2025],        // Today — now clearly separated from the colonial era
];

export const SLIDER_MIN = 0;
export const SLIDER_MAX = 1000; // integer slider steps for the UI component

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

// Interpolates a year for a given slider FRACTION (0–1), already clamped.
function interpolateYear(f) {
  for (let i = 0; i < TIME_ANCHORS.length - 1; i++) {
    const [f0, y0] = TIME_ANCHORS[i];
    const [f1, y1] = TIME_ANCHORS[i + 1];
    if (f >= f0 && f <= f1) {
      const t = f1 === f0 ? 0 : (f - f0) / (f1 - f0);
      return Math.round(y0 + t * (y1 - y0));
    }
  }
  // Unreachable once f is clamped to [0,1], kept as a safe fallback.
  return TIME_ANCHORS[TIME_ANCHORS.length - 1][1];
}

/**
 * Convert a slider position (any number; out-of-range values are clamped
 * to [SLIDER_MIN, SLIDER_MAX]) to a year.
 * @param {number} sliderValue
 * @returns {number}
 */
export function sliderToYear(sliderValue) {
  const clamped = clamp(sliderValue, SLIDER_MIN, SLIDER_MAX);
  return interpolateYear(clamped / SLIDER_MAX);
}

/**
 * Convert a year (any number; out-of-range values are clamped to the first/
 * last anchor's year) back to the nearest slider position (0–1000).
 * @param {number} year
 * @returns {number}
 */
export function yearToSlider(year) {
  const minYear = TIME_ANCHORS[0][1];
  const maxYear = TIME_ANCHORS[TIME_ANCHORS.length - 1][1];
  const clampedYear = clamp(year, minYear, maxYear);
  for (let i = 0; i < TIME_ANCHORS.length - 1; i++) {
    const [f0, y0] = TIME_ANCHORS[i];
    const [f1, y1] = TIME_ANCHORS[i + 1];
    if (clampedYear >= y0 && clampedYear <= y1) {
      const t = y1 === y0 ? 0 : (clampedYear - y0) / (y1 - y0);
      return Math.round((f0 + t * (f1 - f0)) * SLIDER_MAX);
    }
  }
  return clampedYear <= minYear ? SLIDER_MIN : SLIDER_MAX;
}

/**
 * Which "mode" the map should render in, purely a function of the year.
 * @param {number} year
 * @returns {TimelineMode}
 */
export function modeForYear(year) {
  if (year < -70000) return "geological";
  if (year < -3500) return "prehistoric";
  return "historical";
}

/**
 * Human-readable era label for a given year (French).
 * @param {number} year
 * @returns {string}
 */
export function eraLabel(year) {
  if (year <= -1000000) {
    const millions = Math.abs(year) / 1000000;
    return `il y a ${millions.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} millions d'années`;
  }
  if (year <= -10000) {
    return `il y a ${Math.abs(year).toLocaleString("fr-FR")} ans`;
  }
  return year < 0 ? `${Math.abs(year)} av. J.-C.` : `${year} apr. J.-C.`;
}

const VISIBLE_LAYERS_BY_MODE = {
  geological: ["tectonic-plates"],
  prehistoric: ["land-bridges", "migration-routes"],
  historical: ["polities", "civilizations", "diaspora", "heritage-sites", "migration-routes"],
};

const TRANSITION_STYLE_BY_MODE = {
  geological: "interpolate",
  prehistoric: "interpolate",
  historical: "discrete",
};

/** @type {Record<TimelineMode, PrecisionLevel>} */
const PRECISION_BY_MODE = {
  geological: "low",
  prehistoric: "medium",
  historical: "high",
};

/**
 * The primary timeline function (PR1): given a raw slider position, returns
 * a full TimelinePosition describing the active mode, normalized year,
 * dating precision, which data-layer categories are relevant, and whether
 * transitions in this mode should be interpolated or shown as discrete
 * jumps. Out-of-range slider values are clamped, never throw.
 *
 * Deliberately NOT included here: "entités actives" (which specific
 * entities should render). That requires entity data this pure
 * time-abstraction module has no access to — it stays the responsibility
 * of the pages/components holding that data (e.g. Atlas.jsx computing
 * `visibleCivs`/`visiblePolities` by filtering on `.era_start`/`.era_end`
 * against `.year`).
 *
 * @param {number} sliderValue
 * @returns {TimelinePosition}
 */
export function getTimelinePosition(sliderValue) {
  const clampedSlider = clamp(sliderValue, SLIDER_MIN, SLIDER_MAX);
  const year = sliderToYear(clampedSlider);
  const mode = modeForYear(year);
  return {
    sliderValue: clampedSlider,
    year,
    mode,
    precision: PRECISION_BY_MODE[mode],
    visibleLayers: VISIBLE_LAYERS_BY_MODE[mode],
    transitionStyle: TRANSITION_STYLE_BY_MODE[mode],
    label: eraLabel(year),
  };
}
