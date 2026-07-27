import { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  fetchCivilizations,
  fetchRoutes,
  fetchPlaces,
  fetchDiaspora,
  fetchHistoricalPolities,
  fetchHistoricalEntitiesV2,
  fetchPaleoGeography,
  fetchPlateTectonics,
  fetchPilotV3,
} from "../lib/api";
import { Slider } from "../components/ui/slider";
import { useI18n } from "../i18n";
import WorldMap from "../components/WorldMap";
import { SLIDER_MIN, SLIDER_MAX, sliderToYear, yearToSlider, modeForYear, eraLabel } from "../lib/timeScale";
import { ATLAS_COLORS } from "../lib/designTokens";
import { getHistoricalDataSource, isPilotV3Enabled } from "../lib/featureFlags";
import DevDataSourceIndicator from "../components/DevDataSourceIndicator";
import { adaptHistoricalEntitiesToLegacyShape } from "../lib/historicalEntityAdapter";
import { buildPilotV3Markers, buildFangProcessDisplay } from "../lib/pilotV3Adapter";
import PilotV3InfoPanel from "../components/PilotV3InfoPanel";

// Milestone markers shown along the non-linear slider track, so users stay
// oriented even though early (geological) time is heavily compressed.
const MILESTONES = [
  { year: -300000000, label: "Pangée" },
  { year: -66000000, label: "Fin des dinosaures" },
  { year: -70000, label: "Sortie d'Afrique" },
  { year: -3500, label: "Civilisations" },
  { year: 1885, label: "Colonisation" },
  { year: 2025, label: "Aujourd'hui" },
];

const Atlas = () => {
  const { t } = useI18n();
  const [civs, setCivs] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [places, setPlaces] = useState([]);
  const [diaspora, setDiaspora] = useState([]);
  const [polities, setPolities] = useState([]);
  const [paleo, setPaleo] = useState([]);
  const [plateEpochs, setPlateEpochs] = useState([]);
  const [sliderPos, setSliderPos] = useState(yearToSlider(1300));
  const [activeRoutes, setActiveRoutes] = useState({});
  const [showPlaces, setShowPlaces] = useState(true);
  const [showDiaspora, setShowDiaspora] = useState(true);
  const [showPolities, setShowPolities] = useState(true);
  const [project, setProject] = useState(null);
  const [geoProject, setGeoProject] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [selected, setSelected] = useState(null);
  const [pilotV3Data, setPilotV3Data] = useState(null);
  const [selectedPilotV3Marker, setSelectedPilotV3Marker] = useState(null);

  useEffect(() => {
    fetchCivilizations().then(setCivs).catch(() => {});
    fetchPlaces().then(setPlaces).catch(() => {});
    fetchDiaspora().then(setDiaspora).catch(() => {});
    // PR3: feature-flagged data source (?historicalDataSource=v2 in the URL).
    // v1 (default): fetch the original, already-shipped shape directly.
    // v2 (opt-in): fetch the migrated HistoricalEntity schema and adapt it
    // back to the exact same shape via lib/historicalEntityAdapter.js — the
    // rest of this component and WorldMap.jsx render it identically either
    // way, since the adapter's whole job is to make v2 indistinguishable
    // from v1 at the rendering boundary.
    if (getHistoricalDataSource() === "v2") {
      fetchHistoricalEntitiesV2()
        .then((entities) => setPolities(adaptHistoricalEntitiesToLegacyShape(entities)))
        .catch(() => {});
    } else {
      fetchHistoricalPolities().then(setPolities).catch(() => {});
    }
    fetchPaleoGeography().then(setPaleo).catch(() => {});
    fetchPlateTectonics().then(setPlateEpochs).catch(() => {});
    fetchRoutes().then((r) => {
      setRoutes(r);
      setActiveRoutes(Object.fromEntries(r.map((x) => [x.id, true])));
    }).catch(() => {});
    // PR pilote 3: additive overlay, OFF by default, opt-in via ?pilotV3=1.
    // Fetching this never affects v1/v2 historical-polities rendering above.
    if (isPilotV3Enabled()) {
      fetchPilotV3().then(setPilotV3Data).catch(() => {});
    }
  }, []);

  const year = useMemo(() => sliderToYear(sliderPos), [sliderPos]);
  const mode = useMemo(() => modeForYear(year), [year]);

  const onProjectionReady = useCallback((fn) => setProject(() => fn), []);
  const onGeoProjectionReady = useCallback((fn) => setGeoProject(() => fn), []);

  const jumpToYear = (y) => {
    setSliderPos(yearToSlider(y));
    setSelected(null);
  };

  const pilotV3Markers = useMemo(
    () => (pilotV3Data ? buildPilotV3Markers(pilotV3Data.entities, year) : []),
    [pilotV3Data, year]
  );
  const pilotV3FangProcess = useMemo(() => {
    if (!pilotV3Data) return null;
    const proc = pilotV3Data.entities.find((e) => e.category === "Process" && e.processType === "migration");
    return buildFangProcessDisplay(proc);
  }, [pilotV3Data]);

  const visibleCivs = useMemo(
    () => (mode === "historical" ? civs.filter((c) => year >= c.era_start && year <= c.era_end) : []),
    [civs, year, mode]
  );
  const visiblePolities = useMemo(
    () => (mode === "historical" ? polities.filter((p) => year >= p.era_start && year <= p.era_end) : []),
    [polities, year, mode]
  );
  const visiblePaleo = useMemo(
    () => (mode === "prehistoric" ? paleo.filter((p) => year >= p.era_start && year <= p.era_end) : []),
    [paleo, year, mode]
  );
  const visibleRoutes = useMemo(
    () => routes.filter((r) => year >= (r.era_start ?? -Infinity) && year <= (r.era_end ?? Infinity)),
    [routes, year]
  );

  const currentEpoch = useMemo(() => {
    if (mode !== "geological" || plateEpochs.length === 0) return null;
    let best = plateEpochs[0];
    let bestDiff = Infinity;
    for (const e of plateEpochs) {
      const diff = Math.abs(e.era_mya * 1000000 - year);
      if (diff < bestDiff) {
        bestDiff = diff;
        best = e;
      }
    }
    return best;
  }, [mode, plateEpochs, year]);

  const toPolyPoints = (coords) => {
    if (!project) return "";
    return coords
      .map(([lat, lon]) => project(lat, lon))
      .filter(Boolean)
      .map(([x, y]) => `${x},${y}`)
      .join(" ");
  };

  return (
    <div className="pt-[72px] h-screen flex flex-col" data-testid="atlas-page">
      <DevDataSourceIndicator />
      {isPilotV3Enabled() && (
        <div
          className="fixed top-[90px] right-2 z-[600] text-[0.6rem] px-2 py-1 rounded bg-black/70 text-gold font-mono"
          data-testid="pilot-v3-active-indicator"
        >
          Prototype v3 actif (Gabon/Afrique centrale)
        </div>
      )}
      {mode === "historical" && pilotV3FangProcess && (
        <div
          className="fixed bottom-4 right-2 z-[600] glass rounded-lg p-3 max-w-[220px] text-[0.65rem]"
          data-testid="pilot-v3-fang-process-banner"
        >
          <p className="text-gold mb-1">{pilotV3FangProcess.label}</p>
          {pilotV3FangProcess.phases.map((phase, i) => (
            <p key={i} className="text-bone/70 mb-1">
              • {phase.label} ({phase.period})
            </p>
          ))}
          <p className="text-amber-400/80 mt-1">⚠ {pilotV3FangProcess.warningNote}</p>
        </div>
      )}
      {selectedPilotV3Marker && (
        <PilotV3InfoPanel marker={selectedPilotV3Marker} onClose={() => setSelectedPilotV3Marker(null)} />
      )}
      {/* Current era indicator */}
      <div className="absolute top-[84px] left-1/2 -translate-x-1/2 z-[500] glass px-6 py-2 rounded-full" data-testid="atlas-era-indicator">
        <p className="font-serif text-gold text-sm md:text-base whitespace-nowrap">{eraLabel(year)}</p>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <WorldMap
          onProjectionReady={onProjectionReady}
          onGeoProjectionReady={onGeoProjectionReady}
          onZoomChange={setZoomScale}
          highlightAfrica={mode !== "geological"}
          geoFusion={mode === "geological" && currentEpoch ? currentEpoch.fusion_factor : null}
        >
          {/* Geological mode: labels anchored to their drifting plate group */}
          {mode === "geological" && currentEpoch && geoProject && currentEpoch.labels.map((l) => {
            const p = geoProject(l.group || "Africa", l.lat, l.lon);
            if (!p) return null;
            return (
              <text key={l.text} x={p[0]} y={p[1]} fontSize={l.size} fill={ATLAS_COLORS.textBone} textAnchor="middle"
                style={{ fontFamily: "serif", letterSpacing: "0.05em", pointerEvents: "none" }}>
                {l.text}
              </text>
            );
          })}

          {/* Prehistoric mode: land bridges */}
          {mode === "prehistoric" && project && visiblePaleo.map((p) => (
            <polygon
              key={p.id}
              points={toPolyPoints(p.polygon)}
              fill={p.color}
              fillOpacity={0.22}
              stroke={p.color}
              strokeWidth={1}
              strokeDasharray="3 3"
              onClick={() => setSelected({ kind: "paleo", ...p })}
              style={{ cursor: "pointer" }}
            />
          ))}

          {/* Migration routes — shown in prehistoric AND historical modes,
              filtered by year. Now clickable: a wider invisible stroke
              underneath handles the tap (a thin dashed polyline is hard to
              hit precisely on mobile), and clicking opens the same detail
              panel used for other markers. */}
          {mode !== "geological" && project && visibleRoutes.map((r) =>
            activeRoutes[r.id] !== false ? (
              <g key={r.id} onClick={() => setSelected({ kind: "route", ...r })} style={{ cursor: "pointer" }}>
                <polyline
                  points={toPolyPoints(r.points)}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={18}
                />
                <polyline
                  points={toPolyPoints(r.points)}
                  fill="none"
                  stroke={r.color}
                  strokeWidth={2.2}
                  strokeDasharray="5 5"
                  opacity={0.88}
                  style={{ pointerEvents: "none" }}
                />
              </g>
            ) : null
          )}

          {/* Historical mode: empires, civs, places, diaspora, pilot v3.
              FIX: shapes and labels are now rendered in TWO SEPARATE passes
              — all circles/shapes first, then ALL text labels afterward —
              so a later-drawn marker's circle can never cover an
              earlier-drawn marker's name label (a real z-order bug: SVG
              draws later elements on top of earlier ones, and with many
              overlapping entities, labels were sometimes hidden behind
              other points). */}
          {mode === "historical" && showPolities && project && visiblePolities.map((p) => {
            const c = project(p.coords[0], p.coords[1]);
            if (!c) return null;
            const r = Math.max(4, Math.max(6, Math.min(28, p.radius_km / 60)) / zoomScale);
            return (
              <circle key={p.id} cx={c[0]} cy={c[1]} r={r} fill={p.color} fillOpacity={0.14} stroke={p.color} strokeWidth={1.3 / zoomScale} strokeDasharray="4 3"
                onClick={() => setSelected({ kind: "polity", ...p })} style={{ cursor: "pointer" }} />
            );
          })}

          {mode === "historical" && project && pilotV3Markers.map((marker) => {
            const c = project(marker.coords[0], marker.coords[1]);
            if (!c) return null;
            const size = Math.max(7, 10 / zoomScale);
            const { style } = marker;
            return (
              <g
                key={marker.id}
                onClick={() => setSelectedPilotV3Marker(marker)}
                style={{ cursor: "pointer" }}
                data-testid={`pilot-v3-marker-${marker.id}`}
              >
                <circle cx={c[0]} cy={c[1]} r={Math.max(10, 16 / zoomScale)} fill="transparent" />
                <rect
                  x={c[0] - size / 2}
                  y={c[1] - size / 2}
                  width={size}
                  height={size}
                  transform={`rotate(45 ${c[0]} ${c[1]})`}
                  fill="none"
                  stroke={ATLAS_COLORS.gold}
                  strokeWidth={1.5 / zoomScale}
                  strokeOpacity={style.opacity}
                  strokeDasharray={style.dash === "dotted" ? "2 2" : style.dash === "dashed" ? "5 3" : undefined}
                />
                {style.warningBadge && (
                  <circle cx={c[0] + size / 2 + 2} cy={c[1] - size / 2 - 2} r={3 / zoomScale} fill={ATLAS_COLORS.deepRed} />
                )}
              </g>
            );
          })}

          {mode === "historical" && project && visibleCivs.map((c) => {
            const p = project(c.coords[0], c.coords[1]);
            if (!p) return null;
            return (
              <circle key={c.id} cx={p[0]} cy={p[1]} r={Math.max(4, 6 / zoomScale)} fill={ATLAS_COLORS.gold} stroke={ATLAS_COLORS.gold} strokeWidth={Math.max(1, 2 / zoomScale)} fillOpacity={0.9}
                onClick={() => setSelected({ kind: "civ", ...c })} style={{ cursor: "pointer" }} />
            );
          })}

          {mode === "historical" && showPlaces && project && places.map((p) => {
            const pt = project(p.coords[0], p.coords[1]);
            if (!pt) return null;
            return (
              <circle key={p.id} cx={pt[0]} cy={pt[1]} r={Math.max(3, 3.5 / zoomScale)} fill={ATLAS_COLORS.amber} stroke={ATLAS_COLORS.amber} strokeWidth={Math.max(0.8, 1.5 / zoomScale)} fillOpacity={0.9}
                onClick={() => setSelected({ kind: "place", ...p })} style={{ cursor: "pointer" }} />
            );
          })}

          {mode === "historical" && showDiaspora && project && diaspora.map((d) => {
            const pt = project(d.coords[0], d.coords[1]);
            if (!pt) return null;
            return (
              <circle key={d.id} cx={pt[0]} cy={pt[1]} r={Math.max(3.5, 5 / zoomScale)} fill={ATLAS_COLORS.deepRed} stroke={ATLAS_COLORS.deepRed} strokeWidth={Math.max(1, 2 / zoomScale)} fillOpacity={0.9}
                onClick={() => setSelected({ kind: "diaspora", ...d })} style={{ cursor: "pointer" }} />
            );
          })}

          {/* LABELS PASS — always rendered last, on top of every shape above. */}
          {mode === "historical" && showPolities && project && visiblePolities.map((p) => {
            const c = project(p.coords[0], p.coords[1]);
            if (!c) return null;
            const r = Math.max(4, Math.max(6, Math.min(28, p.radius_km / 60)) / zoomScale);
            // Zoom-based label reveal: at zoom=1 only the largest territories
            // show their name; smaller ones appear progressively as the user
            // zooms in, so labels don't overlap into unreadable clutter.
            const showLabel = p.radius_km * zoomScale > 300;
            if (!showLabel) return null;
            return (
              <text key={`label-${p.id}`} x={c[0]} y={c[1] - r - 4} fontSize={11 / Math.max(1, zoomScale * 0.6)} fill={ATLAS_COLORS.textBone} textAnchor="middle" style={{ fontFamily: "serif", pointerEvents: "none" }}>
                {p.name}
              </text>
            );
          })}

          {mode === "historical" && project && pilotV3Markers.map((marker) => {
            const c = project(marker.coords[0], marker.coords[1]);
            if (!c) return null;
            const size = Math.max(7, 10 / zoomScale);
            const { style } = marker;
            return (
              <text
                key={`label-${marker.id}`}
                x={c[0]}
                y={c[1] - size - 4}
                fontSize={10 / zoomScale}
                fill={ATLAS_COLORS.textBone}
                textAnchor="middle"
                opacity={style.opacity}
                style={{ fontFamily: "serif", pointerEvents: "none" }}
              >
                {marker.primaryName.value}
              </text>
            );
          })}
        </WorldMap>

        {/* Side panel */}
        <aside className="hidden lg:block absolute top-6 left-6 z-[400] glass w-[320px] max-h-[70vh] overflow-y-auto" data-testid="atlas-side-panel">
          {mode === "historical" && (
            <>
              <div className="p-5 border-b border-[#2A2421]">
                <p className="overline">{t("atlas.activeIn").replace("{era}", eraLabel(year))}</p>
                <p className="font-serif text-2xl text-bone mt-2">{t("atlas.civsCount").replace("{n}", visibleCivs.length)}</p>
                {visiblePolities.length > 0 && (
                  <p className="text-bone/50 text-xs mt-1">{visiblePolities.length} territoire(s) historique(s) approximatif(s)</p>
                )}
              </div>
              <ul className="divide-y divide-[#2A2421]">
                {visibleCivs.map((c) => (
                  <li key={c.id}>
                    <Link to={`/civilization/${c.id}`} className="block px-5 py-4 hover:bg-[#1A1614] transition-colors group" data-testid={`atlas-civ-${c.id}`}>
                      <p className="font-serif text-lg text-bone group-hover:text-gold transition-colors">{c.name}</p>
                      <p className="text-bone/60 text-xs uppercase tracking-[0.15em] mt-1">{t(`region.${c.region}`)}</p>
                    </Link>
                  </li>
                ))}
                {visibleCivs.length === 0 && <li className="p-5 text-bone/60 text-sm">{t("atlas.empty")}</li>}
              </ul>
            </>
          )}

          {mode === "prehistoric" && (
            <>
              <div className="p-5 border-b border-[#2A2421]">
                <p className="overline">{eraLabel(year)}</p>
                <p className="font-serif text-xl text-bone mt-2">Sortie d'Afrique &amp; ponts terrestres</p>
                <p className="text-bone/60 text-xs mt-2 leading-relaxed">
                  Le niveau des mers a varié de ~120m pendant les glaciations, exposant de vrais ponts terrestres empruntés
                  par les premières migrations humaines.
                </p>
              </div>
              <ul className="divide-y divide-[#2A2421]">
                {visiblePaleo.map((p) => (
                  <li key={p.id} className="px-5 py-4 cursor-pointer" onClick={() => setSelected({ kind: "paleo", ...p })}>
                    <p className="font-serif text-base text-bone">{p.name}</p>
                    <p className="text-bone/60 text-xs mt-1 leading-relaxed">{p.summary}</p>
                  </li>
                ))}
                {visiblePaleo.length === 0 && <li className="p-5 text-bone/60 text-sm">Aucun pont terrestre actif à cette période.</li>}
              </ul>
            </>
          )}

          {mode === "geological" && currentEpoch && (
            <>
              <div className="p-5 border-b border-[#2A2421]">
                <p className="overline">{currentEpoch.era_label}</p>
                <p className="font-serif text-xl text-bone mt-2">{currentEpoch.name}</p>
                <p className="text-bone/60 text-xs mt-2 leading-relaxed">{currentEpoch.summary}</p>
                <p className="text-bone/40 text-[0.65rem] mt-3 italic leading-relaxed">
                  Schéma simplifié à but pédagogique. Aucun humain n'existait encore à cette échelle de temps.
                </p>
              </div>
              <div className="p-5 border-t border-[#2A2421]">
                <p className="text-bone/40 text-[0.65rem] italic leading-relaxed">Sources : {currentEpoch.sources.join(" · ")}</p>
              </div>
            </>
          )}
        </aside>

        {/* Legend (historical only) */}
        {mode === "historical" && (
          <div className="absolute bottom-28 right-6 z-[400] glass p-4 hidden md:block" data-testid="route-legend">
            <p className="overline mb-3">{t("atlas.layers")}</p>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={showPolities} onChange={(e) => setShowPolities(e.target.checked)} className="accent-gold" data-testid="toggle-polities" />
                <span className="w-2 h-2 rounded-full border border-dashed" style={{ borderColor: ATLAS_COLORS.gold }} />
                <span className="text-bone/80 text-xs">Empires &amp; royaumes (approximatif)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={showPlaces} onChange={(e) => setShowPlaces(e.target.checked)} className="accent-gold" data-testid="toggle-places" />
                <span className="w-2 h-2 rounded-full" style={{ background: ATLAS_COLORS.amber }} />
                <span className="text-bone/80 text-xs">{t("atlas.heritagePlaces")}</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={showDiaspora} onChange={(e) => setShowDiaspora(e.target.checked)} className="accent-gold" data-testid="toggle-diaspora" />
                <span className="w-2 h-2 rounded-full" style={{ background: ATLAS_COLORS.deepRed }} />
                <span className="text-bone/80 text-xs">{t("atlas.diasporaCommunities")}</span>
              </label>
              <div className="h-px bg-[#2A2421] my-2" />
              {routes.map((r) => (
                <label key={r.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeRoutes[r.id] !== false}
                    onChange={(e) => setActiveRoutes((s) => ({ ...s, [r.id]: e.target.checked }))}
                    className="accent-gold"
                    data-testid={`route-toggle-${r.id}`}
                  />
                  <span className="w-6 h-[2px]" style={{ background: r.color }} />
                  <span className="text-bone/80 text-xs">{r.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Selected marker detail card */}
        {selected && (
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-[600] glass w-[92%] max-w-[420px] p-5" data-testid="marker-detail-card">
            <button onClick={() => setSelected(null)} className="absolute top-3 right-4 text-bone/50 hover:text-bone text-lg" data-testid="close-detail">×</button>
            <p className="overline text-[0.6rem]" style={{ color: selected.color || ATLAS_COLORS.gold }}>
              {selected.kind === "civ" && `Civilisation · ${t(`region.${selected.region}`)}`}
              {selected.kind === "place" && `${selected.type} · ${selected.era}`}
              {selected.kind === "diaspora" && `Diaspora · ${t(`region.${selected.region}`)}`}
              {selected.kind === "polity" && "Territoire historique approximatif"}
              {selected.kind === "paleo" && "Reconstitution préhistorique approximative"}
              {selected.kind === "route" && "Route migratoire / culturelle"}
            </p>
            <p className="font-serif text-xl text-bone mt-1">{selected.name}</p>
            {selected.kind === "route" && (
              <p className="text-bone/70 text-sm mt-2">{selected.era}</p>
            )}
            <p className="text-bone/70 text-sm mt-2 leading-relaxed">
              {(selected.summary || selected.blurb || "").slice(0, 220)}
              {(selected.summary || selected.blurb || "").length > 220 ? "…" : ""}
            </p>
            {selected.sources && (
              <p className="text-bone/40 text-[0.65rem] mt-3 italic leading-relaxed">Sources : {selected.sources.join(" · ")}</p>
            )}
            {selected.kind === "civ" && (
              <Link to={`/civilization/${selected.id}`} className="inline-block mt-3 uppercase tracking-[0.18em] text-[0.65rem] text-gold">{t("atlas.openDeepDive")}</Link>
            )}
            {selected.kind === "place" && (
              <Link to={`/place/${selected.id}`} className="inline-block mt-3 uppercase tracking-[0.18em] text-[0.65rem] text-gold">{t("atlas.openDeepDive")}</Link>
            )}
            {selected.kind === "diaspora" && (
              <Link to={`/diaspora/${selected.id}`} className="inline-block mt-3 uppercase tracking-[0.18em] text-[0.65rem] text-gold">{t("atlas.visitCommunity")}</Link>
            )}
          </div>
        )}
      </div>

      {/* Unified timeline bar — one continuous non-linear slider, Pangée to today */}
      <div className="glass border-t border-gold/20 px-6 md:px-10 py-5" data-testid="atlas-timeline">
        <div className="max-w-[1600px] mx-auto">
          <Slider
            value={[sliderPos]}
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            step={1}
            onValueChange={(v) => { setSliderPos(v[0]); setSelected(null); }}
            data-testid="timeline-slider"
          />
          <div className="relative mt-3 h-8">
            {MILESTONES.map((m) => (
              <button
                key={m.label}
                onClick={() => jumpToYear(m.year)}
                className="absolute -translate-x-1/2 text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-bone/40 hover:text-gold transition-colors whitespace-nowrap"
                style={{ left: `${(yearToSlider(m.year) / SLIDER_MAX) * 100}%` }}
                data-testid={`milestone-${m.label}`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Atlas;
