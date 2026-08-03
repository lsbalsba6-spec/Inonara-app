import { useState, useMemo, useCallback } from "react";
import WorldMap from "./WorldMap";
import { SLIDER_MIN, SLIDER_MAX, sliderToYear, yearToSlider, eraLabel } from "../lib/timeScale";
import { ATLAS_COLORS } from "../lib/designTokens";

/**
 * A self-contained, country-scoped mini-map: its own timeline slider, its
 * own legend, and its own zoom/pan — independent of the main Atlas page.
 * Only renders the markers/routes explicitly passed in via props, so a
 * country page never has to deal with the full global dataset.
 */
export default function CountryMiniMap({
  polities = [],
  civs = [],
  diasporaEntries = [],
  places = [],
  routes = [],
  defaultYear = 1900,
  height = 420,
}) {
  const [sliderPos, setSliderPos] = useState(yearToSlider(defaultYear));
  const [project, setProject] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [showLegend, setShowLegend] = useState(false);
  const [selected, setSelected] = useState(null);

  const year = useMemo(() => sliderToYear(sliderPos), [sliderPos]);
  const onProjectionReady = useCallback((fn) => setProject(() => fn), []);

  const visiblePolities = polities.filter((p) => year >= p.era_start && year <= p.era_end);
  const visibleCivs = civs.filter((c) => year >= c.era_start && year <= c.era_end);
  const visibleDiaspora = diasporaEntries.filter((d) => year >= d.era_start && year <= d.era_end);
  const visibleRoutes = routes.filter((r) => year >= r.era_start && year <= r.era_end);

  return (
    <div className="relative rounded-xl overflow-hidden border border-[#2A2421]" style={{ height }} data-testid="country-mini-map">
      <div className="absolute top-2 left-2 z-[300] glass px-3 py-1 rounded-full">
        <p className="text-gold text-xs font-serif">{eraLabel(year)}</p>
      </div>

      <button
        onClick={() => setShowLegend((v) => !v)}
        className="absolute top-2 right-2 z-[301] glass px-2 py-1 text-[0.6rem] uppercase tracking-wider text-gold"
        data-testid="country-map-legend-toggle"
      >
        {showLegend ? "✕" : "☰"} Légende
      </button>

      {showLegend && (
        <div className="absolute top-10 right-2 z-[300] glass p-3 max-w-[70%] max-h-[70%] overflow-y-auto text-[0.65rem] space-y-1.5">
          {polities.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full border border-dashed" style={{ borderColor: ATLAS_COLORS.gold }} />
              <span className="text-bone/80">Royaumes / entités historiques</span>
            </div>
          )}
          {places.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: ATLAS_COLORS.amber }} />
              <span className="text-bone/80">Sites</span>
            </div>
          )}
          {diasporaEntries.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: ATLAS_COLORS.deepRed }} />
              <span className="text-bone/80">Diaspora</span>
            </div>
          )}
          {routes.map((r) => (
            <div key={r.id} className="flex items-center gap-2">
              <span className="w-4 h-[2px]" style={{ background: r.color }} />
              <span className="text-bone/80">{r.name}</span>
            </div>
          ))}
        </div>
      )}

      <WorldMap onProjectionReady={onProjectionReady} onZoomChange={setZoomScale} highlightAfrica={false}>
        {project && visibleRoutes.map((r) => (
          <polyline
            key={r.id}
            points={r.points.map(([lat, lon]) => project(lat, lon)).filter(Boolean).map((p) => p.join(",")).join(" ")}
            fill="none"
            stroke={r.color}
            strokeWidth={2.2 / Math.max(1, zoomScale * 0.5)}
            strokeDasharray="5 5"
            opacity={0.88}
            onClick={() => setSelected({ kind: "route", ...r })}
            style={{ cursor: "pointer" }}
          />
        ))}

        {project && visiblePolities.map((p) => {
          const c = project(p.coords[0], p.coords[1]);
          if (!c) return null;
          const r = Math.max(1.5, Math.min(16, p.radius_km / 90) / zoomScale);
          return (
            <circle
              key={p.id} cx={c[0]} cy={c[1]} r={r}
              fill={p.color} fillOpacity={0.16} stroke={p.color} strokeWidth={1.3 / zoomScale} strokeDasharray="4 3"
              onClick={() => setSelected({ kind: "polity", ...p })} style={{ cursor: "pointer" }}
            />
          );
        })}

        {project && visibleCivs.map((c) => {
          const p = project(c.coords[0], c.coords[1]);
          if (!p) return null;
          return (
            <circle key={c.id} cx={p[0]} cy={p[1]} r={Math.max(2, 6 / zoomScale)} fill={ATLAS_COLORS.gold} stroke={ATLAS_COLORS.gold} strokeWidth={Math.max(0.5, 2 / zoomScale)} fillOpacity={0.9}
              onClick={() => setSelected({ kind: "civ", ...c })} style={{ cursor: "pointer" }} />
          );
        })}

        {project && places.map((p) => {
          const pt = project(p.coords[0], p.coords[1]);
          if (!pt) return null;
          return (
            <circle key={p.id} cx={pt[0]} cy={pt[1]} r={Math.max(1.5, 3.5 / zoomScale)} fill={ATLAS_COLORS.amber} stroke={ATLAS_COLORS.amber} strokeWidth={Math.max(0.4, 1.2 / zoomScale)} fillOpacity={0.9}
              onClick={() => setSelected({ kind: "place", ...p })} style={{ cursor: "pointer" }} />
          );
        })}

        {project && visibleDiaspora.map((d) => {
          const pt = project(d.coords[0], d.coords[1]);
          if (!pt) return null;
          return (
            <circle key={d.id} cx={pt[0]} cy={pt[1]} r={Math.max(2, 5 / zoomScale)} fill={ATLAS_COLORS.deepRed} stroke={ATLAS_COLORS.deepRed} strokeWidth={Math.max(0.5, 2 / zoomScale)} fillOpacity={0.9}
              onClick={() => setSelected({ kind: "diaspora", ...d })} style={{ cursor: "pointer" }} />
          );
        })}
      </WorldMap>

      <div className="absolute bottom-2 left-2 right-2 z-[300] glass px-4 py-2 rounded-xl">
        <input
          type="range"
          min={SLIDER_MIN}
          max={SLIDER_MAX}
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="w-full accent-gold"
          data-testid="country-map-slider"
        />
      </div>

      {selected && (
        <div className="absolute bottom-16 left-2 right-2 z-[310] glass p-3 rounded-xl text-xs" data-testid="country-map-selected-panel">
          <div className="flex justify-between items-start">
            <p className="text-gold font-serif">{selected.name}</p>
            <button onClick={() => setSelected(null)} className="text-bone/60">✕</button>
          </div>
          {selected.summary && <p className="text-bone/70 mt-1">{selected.summary.slice(0, 180)}{selected.summary.length > 180 ? "…" : ""}</p>}
        </div>
      )}
    </div>
  );
}
