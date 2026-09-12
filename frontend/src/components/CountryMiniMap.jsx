import { useState, useMemo, useCallback } from "react";
import WorldMap from "./WorldMap";
import { SLIDER_MIN, SLIDER_MAX, sliderToYear, yearToSlider, eraLabel } from "../lib/timeScale";
import { ATLAS_COLORS } from "../lib/designTokens";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";
import { localizedValue } from "../lib/contentSort";

const COPY = {
  fr: {
    legendToggle: "Afficher ou masquer la légende",
    legend: "Légende",
    polities: "Royaumes / entités historiques",
    places: "Sites",
    diaspora: "Diaspora",
    timeline: "Chronologie de la carte du pays",
    close: "Fermer le détail",
    details: {
      route: "Route / circulation",
      polity: "Entité historique",
      civ: "Civilisation",
      place: "Lieu",
      diaspora: "Diaspora",
    },
  },
  en: {
    legendToggle: "Show or hide the legend",
    legend: "Legend",
    polities: "Kingdoms / historical entities",
    places: "Places",
    diaspora: "Diaspora",
    timeline: "Country map timeline",
    close: "Close details",
    details: {
      route: "Route / movement",
      polity: "Historical entity",
      civ: "Civilization",
      place: "Place",
      diaspora: "Diaspora",
    },
  },
};

function TranslatedInline({ value }) {
  const { lang } = useI18n();
  const translated = useTranslated(value || "");
  return translated || localizedValue(value, lang) || null;
}

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
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
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
  const selectedSummary = selected ? localizedValue(selected.summary || selected.description || selected.text, lang) : "";
  const selectedSummaryPreview = selectedSummary.length > 180 ? `${selectedSummary.slice(0, 180)}…` : selectedSummary;
  const selectedName = selected ? (selected.name || selected.label || selected.title) : "";

  return (
    <div className="relative overflow-hidden rounded-xl border border-[#2A2421]" style={{ height }} data-testid="country-mini-map">
      <div className="absolute left-2 top-2 z-[300] rounded-full glass px-3 py-1">
        <p className="font-serif text-xs text-gold">{eraLabel(year, lang)}</p>
      </div>

      <button
        onClick={() => setShowLegend((v) => !v)}
        className="absolute right-2 top-2 z-[301] glass px-2 py-1 text-[0.6rem] uppercase tracking-wider text-gold"
        data-testid="country-map-legend-toggle"
        aria-label={copy.legendToggle}
      >
        {showLegend ? "✕" : "☰"} {copy.legend}
      </button>

      {showLegend && (
        <div className="absolute right-2 top-10 z-[300] max-h-[70%] max-w-[70%] space-y-1.5 overflow-y-auto glass p-3 text-[0.65rem]">
          {polities.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full border border-dashed" style={{ borderColor: ATLAS_COLORS.gold }} />
              <span className="text-bone/80">{copy.polities}</span>
            </div>
          )}
          {places.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: ATLAS_COLORS.amber }} />
              <span className="text-bone/80">{copy.places}</span>
            </div>
          )}
          {diasporaEntries.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: ATLAS_COLORS.deepRed }} />
              <span className="text-bone/80">{copy.diaspora}</span>
            </div>
          )}
          {routes.map((r) => (
            <div key={r.id} className="flex items-center gap-2">
              <span className="h-[2px] w-4" style={{ background: r.color }} />
              <span className="text-bone/80"><TranslatedInline value={r.name || r.label} /></span>
            </div>
          ))}
        </div>
      )}

      <WorldMap onProjectionReady={onProjectionReady} onZoomChange={setZoomScale} highlightAfrica={false}>
        {project && visibleRoutes.map((r) => (
          <polyline
            key={r.id}
            points={(r.points || []).map(([lat, lon]) => project(lat, lon)).filter(Boolean).map((p) => p.join(",")).join(" ")}
            fill="none"
            stroke={r.color || ATLAS_COLORS.gold}
            strokeWidth={2.2 / Math.max(1, zoomScale * 0.5)}
            strokeDasharray="5 5"
            opacity={0.88}
            onClick={() => setSelected({ kind: "route", ...r })}
            style={{ cursor: "pointer" }}
          />
        ))}

        {project && visiblePolities.map((p) => {
          const c = p.coords ? project(p.coords[0], p.coords[1]) : null;
          if (!c) return null;
          const radiusKm = Number(p.radius_km) || 200;
          const r = Math.max(1.5, Math.min(16, radiusKm / 90) / zoomScale);
          const color = p.color || ATLAS_COLORS.gold;
          return (
            <circle
              key={p.id} cx={c[0]} cy={c[1]} r={r}
              fill={color} fillOpacity={0.16} stroke={color} strokeWidth={1.3 / zoomScale} strokeDasharray="4 3"
              onClick={() => setSelected({ kind: "polity", ...p })} style={{ cursor: "pointer" }}
            />
          );
        })}

        {project && visibleCivs.map((c) => {
          const p = c.coords ? project(c.coords[0], c.coords[1]) : null;
          if (!p) return null;
          return (
            <circle key={c.id} cx={p[0]} cy={p[1]} r={Math.max(2, 6 / zoomScale)} fill={ATLAS_COLORS.gold} stroke={ATLAS_COLORS.gold} strokeWidth={Math.max(0.5, 2 / zoomScale)} fillOpacity={0.9}
              onClick={() => setSelected({ kind: "civ", ...c })} style={{ cursor: "pointer" }} />
          );
        })}

        {project && places.map((p) => {
          const pt = p.coords ? project(p.coords[0], p.coords[1]) : null;
          if (!pt) return null;
          return (
            <circle key={p.id} cx={pt[0]} cy={pt[1]} r={Math.max(1.5, 3.5 / zoomScale)} fill={ATLAS_COLORS.amber} stroke={ATLAS_COLORS.amber} strokeWidth={Math.max(0.4, 1.2 / zoomScale)} fillOpacity={0.9}
              onClick={() => setSelected({ kind: "place", ...p })} style={{ cursor: "pointer" }} />
          );
        })}

        {project && visibleDiaspora.map((d) => {
          const pt = d.coords ? project(d.coords[0], d.coords[1]) : null;
          if (!pt) return null;
          return (
            <circle key={d.id} cx={pt[0]} cy={pt[1]} r={Math.max(2, 5 / zoomScale)} fill={ATLAS_COLORS.deepRed} stroke={ATLAS_COLORS.deepRed} strokeWidth={Math.max(0.5, 2 / zoomScale)} fillOpacity={0.9}
              onClick={() => setSelected({ kind: "diaspora", ...d })} style={{ cursor: "pointer" }} />
          );
        })}
      </WorldMap>

      <div className="absolute bottom-2 left-2 right-2 z-[300] rounded-xl glass px-4 py-2">
        <input
          type="range"
          min={SLIDER_MIN}
          max={SLIDER_MAX}
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="w-full accent-gold"
          data-testid="country-map-slider"
          aria-label={copy.timeline}
        />
      </div>

      {selected && (
        <div className="absolute bottom-16 left-2 right-2 z-[310] rounded-xl glass p-3 text-xs" data-testid="country-map-selected-panel">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.16em] text-bone/45">{copy.details[selected.kind] || selected.kind}</p>
              <p className="mt-1 font-serif text-gold"><TranslatedInline value={selectedName} /></p>
            </div>
            <button onClick={() => setSelected(null)} className="text-bone/60" aria-label={copy.close}>✕</button>
          </div>
          {selectedSummaryPreview && <p className="mt-2 text-bone/70">{selectedSummaryPreview}</p>}
        </div>
      )}
    </div>
  );
}