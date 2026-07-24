// Defines which real-world countries belong to which "drifting plate group",
// and the approximate rigid-body transform (shift + rotation) that repositions
// each group's REAL coastlines into the classic Pangaea arrangement.
//
// IMPORTANT — honesty note: this reuses the actual, accurate modern country
// coastlines (same data as the rest of the map) and moves each landmass as a
// single rigid unit — it is NOT a precise GPlates plate-rotation reconstruction
// (which would need real Euler-pole rotation data unavailable in this project).
// It is the same simplification classic textbook Pangaea diagrams use: real
// continent outlines, slid and rotated to approximately fit together. The
// fusionFactor (0 = modern position, 1 = fully-assembled Pangaea) is
// interpolated per geological epoch so the transition looks continuous.
import countryContinentMap from "../data/country-continent-map.json";

const INDIA_GROUP_NAMES = new Set(["India", "Sri Lanka", "Br. Indian Ocean Ter.", "Indian Ocean Ter."]);

export function getPlateGroup(countryName) {
  if (INDIA_GROUP_NAMES.has(countryName)) return "India";
  const continent = countryContinentMap[countryName];
  switch (continent) {
    case "Africa": return "Africa";
    case "South America": return "SouthAmerica";
    case "North America": return "NorthAmerica";
    case "Antarctica": return "Antarctica";
    case "Oceania": return "Australia";
    case "Europe":
    case "Asia":
      return "Eurasia";
    default:
      return "Eurasia";
  }
}

// Target transform at FULL Pangaea assembly (fusionFactor = 1), expressed as
// a fraction of the map's rendered width/height (so it stays responsive),
// plus a rotation in degrees applied around the group's own centroid.
export const PANGAEA_TRANSFORMS = {
  Africa:        { dxFrac: 0.00, dyFrac: -0.04, rotateDeg: 0 },
  SouthAmerica:  { dxFrac: 0.13, dyFrac: -0.16, rotateDeg: -22 },
  NorthAmerica:  { dxFrac: 0.19, dyFrac: 0.14,  rotateDeg: -18 },
  Eurasia:       { dxFrac: -0.06, dyFrac: 0.05, rotateDeg: 8 },
  India:         { dxFrac: -0.09, dyFrac: 0.19, rotateDeg: -48 },
  Australia:     { dxFrac: -0.19, dyFrac: 0.07, rotateDeg: 32 },
  Antarctica:    { dxFrac: 0.04, dyFrac: -0.22, rotateDeg: 0 },
};

export function lerpTransform(fusionFactor) {
  const out = {};
  for (const [group, t] of Object.entries(PANGAEA_TRANSFORMS)) {
    out[group] = {
      dxFrac: t.dxFrac * fusionFactor,
      dyFrac: t.dyFrac * fusionFactor,
      rotateDeg: t.rotateDeg * fusionFactor,
    };
  }
  return out;
}
