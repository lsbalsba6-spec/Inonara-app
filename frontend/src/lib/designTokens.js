// Centralized design tokens for the Atlas map (INONARA brand palette).
//
// Scope of this file (PR1): only the colors already duplicated between
// WorldMap.jsx and Atlas.jsx are centralized here. Per-entity colors stored
// in backend/data/historical_polities.py (one color field per historical
// polity) are OUT OF SCOPE for this PR and are not touched — they remain
// data-driven, not design tokens, and migrating them is a separate task.
//
// Values are copied as-is from the previous local COLORS objects; this file
// introduces no visual change (see PR1 verification notes).
export const ATLAS_COLORS = {
  // Base surfaces
  ocean: "#0A0908",       // map background / deep night
  panelBorder: "#2A2421", // dividers, card borders
  panelHover: "#1A1614",  // list-item hover background

  // Text
  textBone: "#F5F5F0",    // primary light text on dark surfaces

  // Brand accents (also used as default per-layer marker colors)
  gold: "#D4AF37",        // civilizations, empires, primary accent
  amber: "#C18C42",       // heritage places
  deepRed: "#7B2D26",     // diaspora communities

  // Modern-map land rendering (WorldMap.jsx)
  landDefault: "#241C14",
  landDefaultBorder: "#4A3826",
  landAfrica: "#3D2E12",
  landAfricaBorder: "#D4AF37", // == gold, kept explicit for clarity at call sites
};

export default ATLAS_COLORS;
