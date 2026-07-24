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
  [1.00, 2025],        // Today
];

export const SLIDER_MIN = 0;
export const SLIDER_MAX = 1000; // integer slider steps for the UI component

// Convert a slider position (0–1000) to a year (can be a large negative number).
export function sliderToYear(sliderValue) {
  const f = sliderValue / SLIDER_MAX;
  for (let i = 0; i < TIME_ANCHORS.length - 1; i++) {
    const [f0, y0] = TIME_ANCHORS[i];
    const [f1, y1] = TIME_ANCHORS[i + 1];
    if (f >= f0 && f <= f1) {
      const t = (f - f0) / (f1 - f0);
      return Math.round(y0 + t * (y1 - y0));
    }
  }
  return TIME_ANCHORS[TIME_ANCHORS.length - 1][1];
}

// Convert a year back to the nearest slider position (0–1000) — used to set
// the slider's initial position or jump to a specific year programmatically.
export function yearToSlider(year) {
  for (let i = 0; i < TIME_ANCHORS.length - 1; i++) {
    const [f0, y0] = TIME_ANCHORS[i];
    const [f1, y1] = TIME_ANCHORS[i + 1];
    if (year >= y0 && year <= y1) {
      const t = (year - y0) / (y1 - y0);
      return Math.round((f0 + t * (f1 - f0)) * SLIDER_MAX);
    }
  }
  return year < TIME_ANCHORS[0][1] ? 0 : SLIDER_MAX;
}

// Which "mode" the map should render in, purely a function of the year.
export function modeForYear(year) {
  if (year < -70000) return "geological";
  if (year < -3500) return "prehistoric";
  return "historical";
}

// Human-readable era label for a given year.
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
