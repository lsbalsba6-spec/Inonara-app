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
  { year: 1960, label: "Indépendances" },
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
  const [sliderPos, setSliderPos] = useState(yearToSlider(-70000));
  const [activeRoutes, setActiveRoutes] = useState({});
  const [showDiasporaRoutesList, setShowDiasporaRoutesList] = useState(false);
  const [showLegendPanel, setShowLegendPanel] = useState(false);
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
          {mode !== "geological" && project && visibleRoutes.map((r) => {
            if (activeRoutes[r.id] === false) return null;
            const isSelected = selected?.kind === "route" && selected?.id === r.id;
            return (
              <g key={r.id} onClick={() => setSelected({ kind: "route", ...r })} style={{ cursor: "pointer" }}>
                <polyline
                  points={toPolyPoints(r.points)}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={18}
                />
                {isSelected && (
                  <polyline
                    points={toPolyPoints(r.points)}
                    fill="none"
                    stroke="#F5F5F0"
                    strokeWidth={5}
                    opacity={0.5}
                    style={{ pointerEvents: "none" }}
                  />
                )}
                <polyline
                  points={toPolyPoints(r.points)}
                  fill="none"
                  stroke={r.color}
                  strokeWidth={isSelected ? 3.2 : 2.2}
                  strokeDasharray="5 5"
                  opacity={isSelected ? 1 : 0.88}
                  style={{ pointerEvents: "none" }}
                />
              </g>
            );
          })}

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
            const r = Math.max(1.2, Math.max(4, Math.min(14, p.radius_km / 90)) / zoomScale);
            return (
              <g key={p.id} onClick={() => setSelected({ kind: "polity", ...p })} style={{ cursor: "pointer" }}>
                <circle cx={c[0]} cy={c[1]} r={Math.max(12, r)} fill="transparent" />
                <circle cx={c[0]} cy={c[1]} r={r} fill={p.color} fillOpacity={0.14} stroke={p.color} strokeWidth={1.3 / zoomScale} strokeDasharray="4 3" style={{ pointerEvents: "none" }} />
              </g>
            );
          })}

          {mode === "historical" && project && pilotV3Markers.map((marker) => {
            const c = project(marker.coords[0], marker.coords[1]);
            if (!c) return null;
            const size = Math.max(4, 10 / zoomScale);
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
              <g key={c.id} onClick={() => setSelected({ kind: "civ", ...c })} style={{ cursor: "pointer" }}>
                <circle cx={p[0]} cy={p[1]} r={12} fill="transparent" />
                <circle cx={p[0]} cy={p[1]} r={Math.max(1.5, 6 / zoomScale)} fill={ATLAS_COLORS.gold} stroke={ATLAS_COLORS.gold} strokeWidth={Math.max(0.5, 2 / zoomScale)} fillOpacity={0.9} style={{ pointerEvents: "none" }} />
              </g>
            );
          })}

          {mode === "historical" && showPlaces && project && places.map((p) => {
            const pt = project(p.coords[0], p.coords[1]);
            if (!pt) return null;
            return (
              <g key={p.id} onClick={() => setSelected({ kind: "place", ...p })} style={{ cursor: "pointer" }}>
                <circle cx={pt[0]} cy={pt[1]} r={12} fill="transparent" />
                <circle cx={pt[0]} cy={pt[1]} r={Math.max(0.8, 3 / zoomScale)} fill={ATLAS_COLORS.amber} stroke={ATLAS_COLORS.amber} strokeWidth={Math.max(0.3, 1.2 / zoomScale)} fillOpacity={0.9} style={{ pointerEvents: "none" }} />
              </g>
            );
          })}

          {mode === "historical" && showDiaspora && project && diaspora.map((d) => {
            const pt = project(d.coords[0], d.coords[1]);
            if (!pt) return null;
            return (
              <g key={d.id} onClick={() => setSelected({ kind: "diaspora", ...d })} style={{ cursor: "pointer" }}>
                <circle cx={pt[0]} cy={pt[1]} r={12} fill="transparent" />
                <circle cx={pt[0]} cy={pt[1]} r={Math.max(1, 4 / zoomScale)} fill={ATLAS_COLORS.deepRed} stroke={ATLAS_COLORS.deepRed} strokeWidth={Math.max(0.3, 1.2 / zoomScale)} fillOpacity={0.9} style={{ pointerEvents: "none" }} />
              </g>
            );
          })}

          {/* LABELS PASS — always rendered last, on top of every shape above. */}
          {mode === "historical" && showPolities && project && visiblePolities.map((p) => {
            const c = project(p.coords[0], p.coords[1]);
            if (!c) return null;
            const r = Math.max(1.2, Math.max(4, Math.min(14, p.radius_km / 90)) / zoomScale);
            // Zoom-based label reveal: at zoom=1 only the largest territories
            // show their name; smaller ones appear progressively as the user
            // zooms in, so labels don't overlap into unreadable clutter.
            const showLabel = p.radius_km * zoomScale > 700;
            if (!showLabel) return null;
            return (
              <text key={`label-${p.id}`} x={c[0]} y={c[1] - r - 4} fontSize={9 / Math.max(1, zoomScale * 0.6)} fill={ATLAS_COLORS.textBone} textAnchor="middle" style={{ fontFamily: "serif", pointerEvents: "none" }}>
                {p.name}
              </text>
            );
          })}

          {mode === "historical" && project && pilotV3Markers.map((marker) => {
            const c = project(marker.coords[0], marker.coords[1]);
            if (!c) return null;
            const size = Math.max(4, 10 / zoomScale);
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

          {/* SELECTED-MARKER HIGHLIGHT — a pulsing bright ring around
              whichever point is currently open in the detail panel, so it's
              always clear which marker the displayed info belongs to.
              Rendered last (on top of everything) and re-projects the
              selected entity's own coords, so it works for any marker type. */}
          {mode === "historical" && project && selected && selected.coords && (
            (() => {
              const c = project(selected.coords[0], selected.coords[1]);
              if (!c) return null;
              return (
                <g style={{ pointerEvents: "none" }} data-testid="selected-marker-highlight">
                  <circle cx={c[0]} cy={c[1]} r={10 / zoomScale} fill="none" stroke="#F5F5F0" strokeWidth={2 / zoomScale} opacity={0.95}>
                    <animate attributeName="r" values={`${7 / zoomScale};${13 / zoomScale};${7 / zoomScale}`} dur="1.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.95;0.4;0.95" dur="1.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={c[0]} cy={c[1]} r={3 / zoomScale} fill="#F5F5F0" opacity={0.95} />
                </g>
              );
            })()
          )}

          {mode === "historical" && project && selectedPilotV3Marker && (
            (() => {
              const c = project(selectedPilotV3Marker.coords[0], selectedPilotV3Marker.coords[1]);
              if (!c) return null;
              return (
                <g style={{ pointerEvents: "none" }} data-testid="selected-pilot-v3-highlight">
                  <circle cx={c[0]} cy={c[1]} r={10 / zoomScale} fill="none" stroke="#F5F5F0" strokeWidth={2 / zoomScale} opacity={0.95}>
                    <animate attributeName="r" values={`${7 / zoomScale};${13 / zoomScale};${7 / zoomScale}`} dur="1.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.95;0.4;0.95" dur="1.4s" repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })()
          )}
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

        {/* Legend toggle — always visible, on mobile too (previously the
            legend itself was hidden below the md breakpoint, meaning it
            never appeared on phones at all). */}
        <button
          onClick={() => setShowLegendPanel((v) => !v)}
          className="absolute bottom-28 right-6 z-[401] glass px-3 py-2 text-[0.65rem] uppercase tracking-[0.15em] text-gold"
          data-testid="legend-toggle-button"
        >
          {showLegendPanel ? "✕ Légende" : "☰ Légende"}
        </button>

        {/* Legend — content adapts to the active mode (geological /
            prehistoric / historical), since lines and points appear in all
            three, not just "historical". */}
        {showLegendPanel && (
          <div className="absolute bottom-44 right-6 z-[400] glass p-4 max-h-[60vh] overflow-y-auto w-[85vw] max-w-xs" data-testid="route-legend">
            <p className="overline mb-3">{t("atlas.layers")}</p>

            {mode === "geological" && (
              <div className="space-y-2">
                <p className="text-bone/80 text-xs">
                  <span className="text-gold">PANGÉE</span> : une seule terre — les frontières et noms de continents
                  apparaissent progressivement à mesure que le supercontinent se fracture.
                </p>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-[2px]" style={{ background: ATLAS_COLORS.landAfricaBorder }} />
                  <span className="text-bone/80 text-xs">Contours de masses continentales (approximatif)</span>
                </div>
              </div>
            )}

            {mode === "prehistoric" && (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-sm" style={{ background: ATLAS_COLORS.amber, opacity: 0.5 }} />
                  <span className="text-bone/80 text-xs">Ponts terrestres (zone approximative, mer basse)</span>
                </div>
                <div className="h-px bg-[#2A2421] my-2" />
                {routes.filter((r) => !r.id.startsWith("diaspora-") && activeRoutes[r.id] !== false).length > 0 && (
                  <p className="text-bone/60 text-[0.65rem] mb-1">Routes migratoires actives à cette période :</p>
                )}
                {routes.filter((r) => !r.id.startsWith("diaspora-")).map((r) => (
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
            )}

            {mode === "historical" && (
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
                {routes.filter((r) => !r.id.startsWith("diaspora-")).map((r) => (
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

                {routes.some((r) => r.id.startsWith("diaspora-")) && (
                  <div className="mt-2">
                    <button
                      onClick={() => setShowDiasporaRoutesList((v) => !v)}
                      className="flex items-center justify-between w-full text-left"
                      data-testid="toggle-diaspora-routes-section"
                    >
                      <span className="text-bone/60 text-xs uppercase tracking-wider">
                        Routes par diaspora ({routes.filter((r) => r.id.startsWith("diaspora-")).length})
                      </span>
                      <span className="text-bone/40 text-xs">{showDiasporaRoutesList ? "▾" : "▸"}</span>
                    </button>
                    {showDiasporaRoutesList && (
                      <div className="max-h-48 overflow-y-auto mt-2 pr-1 space-y-1.5">
                        {routes.filter((r) => r.id.startsWith("diaspora-")).map((r) => (
                          <label key={r.id} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={activeRoutes[r.id] !== false}
                              onChange={(e) => setActiveRoutes((s) => ({ ...s, [r.id]: e.target.checked }))}
                              className="accent-gold"
                              data-testid={`route-toggle-${r.id}`}
                            />
                            <span className="w-6 h-[2px] shrink-0" style={{ background: r.color }} />
                            <span className="text-bone/80 text-[0.65rem] leading-tight">{r.name}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
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
            {selected.kind === "route" && selected.diaspora_id && (
              <Link to={`/diaspora/${selected.diaspora_id}`} className="inline-block mt-3 uppercase tracking-[0.18em] text-[0.65rem] text-gold">
                En savoir plus sur cette migration →
              </Link>
            )}
            {selected.kind === "route" && !selected.diaspora_id && selected.story_id && (
              <Link to={`/story/${selected.story_id}`} className="inline-block mt-3 uppercase tracking-[0.18em] text-[0.65rem] text-gold">
                Lire l'histoire complète →
              </Link>
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
          <div className="relative mt-3 h-12">
            {MILESTONES.map((m, i) => (
              <button
                key={m.label}
                onClick={() => jumpToYear(m.year)}
                className="absolute -translate-x-1/2 text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-bone/40 hover:text-gold transition-colors whitespace-nowrap"
                style={{
                  left: `${Math.min(97, (yearToSlider(m.year) / SLIDER_MAX) * 100)}%`,
                  top: i % 2 === 0 ? 0 : 16,
                }}
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
