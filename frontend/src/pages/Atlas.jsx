import { useEffect, useState, useMemo, useCallback, useRef } from "react";
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
  fetchCountryDossiers,
} from "../lib/api";
import { Slider } from "../components/ui/slider";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";
import WorldMap from "../components/WorldMap";
import { SLIDER_MIN, SLIDER_MAX, sliderToYear, yearToSlider, modeForYear, eraLabel } from "../lib/timeScale";
import { ATLAS_COLORS } from "../lib/designTokens";
import { getHistoricalDataSource, isPilotV3Enabled } from "../lib/featureFlags";
import DevDataSourceIndicator from "../components/DevDataSourceIndicator";
import { adaptHistoricalEntitiesToLegacyShape } from "../lib/historicalEntityAdapter";
import { buildPilotV3Markers, buildFangProcessDisplay } from "../lib/pilotV3Adapter";
import { getMigrationVisualStyle, selectNonOverlappingLabels } from "../lib/atlasDisplay";
import PilotV3InfoPanel from "../components/PilotV3InfoPanel";
import populatedPlacesData from "../data/africa-populated-places.json";
import { ATLAS_LAYERS, getAtlasLayerLabel } from "../lib/atlasLayers";

// Milestone markers shown along the non-linear slider track, so users stay
// oriented even though early (geological) time is heavily compressed.
// Visual distinction by migration type: forced (solid, thick — a chattel/
// coerced displacement), voluntary (fine dotted — a matter of individual
// choice, even under hardship), mixed (dash-dot — a route carrying both),
// conquest (long dashes — military/political expansion, not a personal
// migration decision at all). See PR: "difference between forced and
// voluntary migration, varying honestly by period per the data found."
const CURRENT_YEAR = new Date().getFullYear();
const MILESTONES = [
  { year: -300000000, label: { fr: "Pangée", en: "Pangaea" } },
  { year: -66000000, label: { fr: "Fin des dinosaures", en: "End of the dinosaurs" } },
  { year: -70000, label: { fr: "Sortie d'Afrique", en: "Out of Africa" } },
  { year: -3500, label: { fr: "Civilisations", en: "Civilizations" } },
  { year: 1885, label: { fr: "Colonisation", en: "Colonization" } },
  { year: 1960, label: { fr: "Indépendances", en: "Independences" } },
  { year: CURRENT_YEAR, label: { fr: "Aujourd'hui", en: "Today" } },
];

const rawText = (value) => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (typeof value === "object" && !Array.isArray(value)) {
    return value.en || value.fr || value.text || value.name || value.title || "";
  }
  return "";
};

const sourceValue = (source) => {
  if (!source || typeof source !== "object" || Array.isArray(source)) return source;
  return source.title || source.name || source.label || source.publisher || source;
};

function LocalizedText({ value, as: As = "span", fallback = "", ...props }) {
  const translated = useTranslated(value);
  return <As {...props}>{translated || fallback || rawText(value)}</As>;
}

function LocalizedExcerpt({ value, max = 220 }) {
  const translated = useTranslated(value);
  const text = translated || rawText(value);
  return <>{text.slice(0, max)}{text.length > max ? "…" : ""}</>;
}

function LocalizedSourceList({ values = [] }) {
  return (
    <>
      {values.map((source, index) => (
        <span key={`${rawText(sourceValue(source))}-${index}`}>
          {index > 0 ? " · " : ""}
          <LocalizedText value={sourceValue(source)} />
        </span>
      ))}
    </>
  );
}

function AtlasMapLabel({ label, zoomScale }) {
  const translated = useTranslated(label.value ?? label.text);
  return (
    <text
      x={label.x}
      y={label.y}
      fontSize={label.fontSizePx / zoomScale}
      fill={ATLAS_COLORS.textBone}
      textAnchor="middle"
      opacity={label.opacity}
      paintOrder="stroke"
      stroke={ATLAS_COLORS.ocean}
      strokeWidth={3 / zoomScale}
      strokeLinejoin="round"
      style={{ fontFamily: "serif", pointerEvents: "none" }}
    >
      {translated || label.text}
    </text>
  );
}

const Atlas = () => {
  const { t, lang } = useI18n();
  const [civs, setCivs] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [places, setPlaces] = useState([]);
  const [diaspora, setDiaspora] = useState([]);
  const [polities, setPolities] = useState([]);
  const [paleo, setPaleo] = useState([]);
  const [plateEpochs, setPlateEpochs] = useState([]);
  const [countryDossiers, setCountryDossiers] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [countryQuery, setCountryQuery] = useState("");
  const [activeSearchIndex, setActiveSearchIndex] = useState(-1);
  const [focusPoint, setFocusPoint] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [focusCountryName, setFocusCountryName] = useState(null);
  const [sliderPos, setSliderPos] = useState(yearToSlider(-70000));
  const [activeRoutes, setActiveRoutes] = useState({});
  const [showDiasporaRoutesList, setShowDiasporaRoutesList] = useState(false);
  const [showLegendPanel, setShowLegendPanel] = useState(false);
  const [showMobileExplorer, setShowMobileExplorer] = useState(false);
  const mobileExplorerToggleRef = useRef(null);
  const mobileExplorerPanelRef = useRef(null);
  const mobileExplorerWasOpenRef = useRef(false);
  const detailCardRef = useRef(null);
  const detailReturnFocusRef = useRef(null);
  const detailWasOpenRef = useRef(false);
  const [showPlaces, setShowPlaces] = useState(true);
  const [showDiaspora, setShowDiaspora] = useState(true);
  const [showPolities, setShowPolities] = useState(true);
  const [showCities, setShowCities] = useState(true);
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
    fetchCountryDossiers().then(setCountryDossiers).catch(() => {});
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

  useEffect(() => {
    if (showMobileExplorer) {
      mobileExplorerPanelRef.current?.focus();
      mobileExplorerWasOpenRef.current = true;
    } else if (mobileExplorerWasOpenRef.current) {
      mobileExplorerToggleRef.current?.focus();
      mobileExplorerWasOpenRef.current = false;
    }
  }, [showMobileExplorer]);

  useEffect(() => {
    if (selected) {
      if (!detailWasOpenRef.current) {
        const activeElement = document.activeElement;
        detailReturnFocusRef.current = activeElement instanceof HTMLElement && activeElement !== document.body ? activeElement : null;
      }
      detailCardRef.current?.focus();
      detailWasOpenRef.current = true;
    } else if (detailWasOpenRef.current) {
      const returnTarget = detailReturnFocusRef.current;
      if (returnTarget?.isConnected) returnTarget.focus();
      detailReturnFocusRef.current = null;
      detailWasOpenRef.current = false;
    }
  }, [selected]);

  const year = useMemo(() => sliderToYear(sliderPos), [sliderPos]);
  const mode = useMemo(() => modeForYear(year), [year]);

  const onProjectionReady = useCallback((fn) => setProject(() => fn), []);
  const onGeoProjectionReady = useCallback((fn) => setGeoProject(() => fn), []);
  const onCountrySelect = useCallback((country) => {
    setSelectedCountry(country);
    setSelected(null);
    setSelectedPilotV3Marker(null);
    setFocusCountryName(country.countryId || country.territoryId || country.name);
  }, []);

  const jumpToYear = (y) => {
    setSliderPos(yearToSlider(y));
    setSelected(null);
  };

  const searchableCountries = useMemo(
    () => mapCountries
      .filter((country) => country.continent === "Africa")
      .sort((a, b) => (a.label || a.name).localeCompare(b.label || b.name, lang === "fr" ? "fr" : "en")),
    [mapCountries, lang]
  );

  const atlasSearchResults = useMemo(() => {
    const needle = countryQuery.trim().toLocaleLowerCase(lang === "fr" ? "fr" : "en");
    if (!needle) return [];
    const matches = (values) => values.filter(Boolean).some((value) => rawText(value).toLocaleLowerCase().includes(needle));
    const countryResults = searchableCountries.filter((country) => matches([country.label, country.name, country.labels?.fr, country.labels?.en, country.countryId, country.territoryId])).map((country) => ({ type: "country", id: country.countryId || country.territoryId || country.id, label: country.label, meta: country.countryId || (lang === "fr" ? "territoire" : "territory"), country }));
    const cityResults = (populatedPlacesData.places || []).filter((place) => matches([place.name, place.nameAscii, place.countryId])).map((place) => ({ type: "city", id: place.id, label: place.name, meta: place.kind === "capital" || place.kind === "capital-alt" ? (lang === "fr" ? "capitale" : "capital") : (lang === "fr" ? "ville" : "city"), entity: place }));
    const civResults = civs.filter((civ) => matches([civ.name, civ.id, civ.region])).map((civ) => ({ type: "civ", id: civ.id, label: rawText(civ.name), meta: lang === "fr" ? "civilisation" : "civilization", entity: civ }));
    const placeResults = places.filter((place) => matches([place.name, place.id, place.type])).map((place) => ({ type: "place", id: place.id, label: rawText(place.name), meta: lang === "fr" ? "patrimoine" : "heritage", entity: place }));
    const routeResults = routes.filter((route) => matches([route.name, route.id, route.era, route.migration_type, route.summary, route.diaspora_id])).map((route) => ({ type: "route", id: route.id, label: rawText(route.name), meta: lang === "fr" ? "migration" : "migration", entity: route }));
    const diasporaResults = diaspora.filter((community) => matches([community.name, community.id, community.country, community.region, community.summary])).map((community) => ({ type: "diaspora", id: community.id, label: rawText(community.name), meta: lang === "fr" ? "diaspora" : "diaspora", entity: community }));
    return [...countryResults, ...cityResults, ...civResults, ...placeResults, ...routeResults, ...diasporaResults].slice(0, 10);
  }, [countryQuery, searchableCountries, civs, places, routes, diaspora, lang]);

  useEffect(() => {
    setActiveSearchIndex(atlasSearchResults.length > 0 ? 0 : -1);
  }, [countryQuery, atlasSearchResults.length]);

  const handleAtlasSearchKeyDown = (event) => {
    if (!countryQuery.trim()) return;
    if (event.key === "Escape") {
      event.preventDefault();
      setCountryQuery("");
      setActiveSearchIndex(-1);
      return;
    }
    if (atlasSearchResults.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveSearchIndex((index) => (index + 1) % atlasSearchResults.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveSearchIndex((index) => (index <= 0 ? atlasSearchResults.length - 1 : index - 1));
    } else if (event.key === "Enter" && activeSearchIndex >= 0) {
      event.preventDefault();
      selectAtlasSearchResult(atlasSearchResults[activeSearchIndex]);
    }
  };

  const selectedCountryDossier = useMemo(
    () => selectedCountry?.countryId
      ? countryDossiers.find((dossier) => dossier?.iso2 === selectedCountry.countryId) || null
      : null,
    [countryDossiers, selectedCountry]
  );

  const selectCountryFromSearch = (country) => {
    setSelectedCountry(country);
    setSelected(null);
    setSelectedPilotV3Marker(null);
    setFocusCountryName(country.countryId || country.territoryId || country.name);
    setCountryQuery("");
    setShowMobileExplorer(false);
  };

  const selectAtlasSearchResult = (result) => {
    if (result.type === "country") {
      setFocusPoint(null);
      selectCountryFromSearch(result.country);
      return;
    }
    const entity = result.entity;
    const routePoint = result.type === "route" && Array.isArray(entity?.points) ? entity.points[0] : null;
    const coords = entity?.coords || routePoint;
    if (!coords) return;
    setSelectedCountry(null);
    setSelectedPilotV3Marker(null);
    setSelected(result.type === "city" ? { ...entity, placeKind: entity.kind, kind: "city" } : { ...entity, kind: result.type });
    setFocusCountryName(null);
    setFocusPoint({ lat: coords[0], lon: coords[1], scale: result.type === "city" ? 5.2 : result.type === "route" ? 3.2 : 4.6, key: `${result.type}-${result.id}-${Date.now()}` });
    if (result.type === "city") {
      setSliderPos(yearToSlider(CURRENT_YEAR));
      setShowCities(true);
    } else if (result.type === "route") {
      const routeYear = Number.isFinite(entity.era_start) ? entity.era_start : CURRENT_YEAR;
      setSliderPos(yearToSlider(routeYear));
      setActiveRoutes((current) => ({ ...current, [entity.id]: true }));
    } else if (result.type === "diaspora") {
      const diasporaYear = Number.isFinite(entity.era_start) ? entity.era_start : CURRENT_YEAR;
      setSliderPos(yearToSlider(diasporaYear));
      setShowDiaspora(true);
    }
    setCountryQuery("");
    setShowMobileExplorer(false);
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

  const visibleHistoricalLabels = useMemo(() => {
    if (mode !== "historical" || !project) return [];
    const candidates = [];

    if (showPolities) {
      for (const polity of visiblePolities) {
        const coords = project(polity.coords[0], polity.coords[1]);
        if (!coords) continue;
        const importance = Number(polity.radius_km || 0);
        const minimumImportance = zoomScale < 1.5 ? 900 : zoomScale < 2.5 ? 420 : zoomScale < 4 ? 160 : 0;
        if (importance < minimumImportance) continue;
        const markerRadius = Math.max(1.2, Math.max(4, Math.min(14, importance / 90)) / zoomScale);
        candidates.push({
          id: `polity-${polity.id}`,
          text: rawText(polity.name),
          value: polity.name,
          x: coords[0],
          y: coords[1] - markerRadius - (7 / zoomScale),
          fontSizePx: zoomScale < 2 ? 11 : 10,
          priority: 3000 + importance,
          opacity: 1,
        });
      }
    }

    for (const civ of visibleCivs) {
      const coords = project(civ.coords[0], civ.coords[1]);
      if (!coords) continue;
      candidates.push({
        id: `civ-${civ.id}`,
        text: rawText(civ.name),
        value: civ.name,
        x: coords[0],
        y: coords[1] - Math.max(1.5, 6 / zoomScale) - (7 / zoomScale),
        fontSizePx: 10,
        priority: 5200,
        opacity: 1,
      });
    }

    if (showPlaces && zoomScale >= 2.2) {
      for (const place of places) {
        if (!place.coords) continue;
        const coords = project(place.coords[0], place.coords[1]);
        if (!coords) continue;
        candidates.push({
          id: `place-${place.id}`,
          text: rawText(place.name),
          value: place.name,
          x: coords[0],
          y: coords[1] - Math.max(0.8, 3 / zoomScale) - (6 / zoomScale),
          fontSizePx: 9,
          priority: 3600,
          opacity: 0.9,
        });
      }
    }

        for (const marker of pilotV3Markers) {
      const coords = project(marker.coords[0], marker.coords[1]);
      if (!coords) continue;
      candidates.push({
        id: `pilot-${marker.id}`,
        text: rawText(marker.primaryName.value),
        value: marker.primaryName.value,
        x: coords[0],
        y: coords[1] - Math.max(4, 10 / zoomScale) - (7 / zoomScale),
        fontSizePx: 10,
        priority: 4500,
        opacity: marker.style.opacity,
      });
    }

    candidates.sort((a, b) => b.priority - a.priority || a.text.localeCompare(b.text));
    return selectNonOverlappingLabels(candidates, zoomScale, { paddingPx: 7 });
  }, [mode, project, showPolities, visiblePolities, visibleCivs, showPlaces, places, pilotV3Markers, zoomScale]);

  const visiblePopulatedPlaces = useMemo(() => {
    if (mode !== "historical" || year < 1800 || !showCities) return [];
    return (populatedPlacesData.places || []).filter((place) => {
      const minZoom = Number(place.minZoom ?? 4);
      return zoomScale >= minZoom;
    });
  }, [mode, year, showCities, zoomScale]);

  const visibleCityLabels = useMemo(() => {
    if (!project || visiblePopulatedPlaces.length === 0) return [];
    const candidates = visiblePopulatedPlaces.map((place) => {
      const coords = project(place.coords[0], place.coords[1]);
      if (!coords) return null;
      const isCapital = place.kind === "capital" || place.kind === "capital-alt";
      return {
        id: `city-${place.id}`,
        text: place.name,
        value: place.name,
        x: coords[0],
        y: coords[1] - (isCapital ? 7 : 5) / Math.max(1, zoomScale),
        fontSizePx: isCapital ? 10 : 9,
        priority: (isCapital ? 10000 : 0) + (place.populationMax || 0) / 1000,
        opacity: isCapital ? 1 : 0.82,
      };
    }).filter(Boolean);
    candidates.sort((a, b) => b.priority - a.priority || a.text.localeCompare(b.text));
    return selectNonOverlappingLabels(candidates, zoomScale, { paddingPx: 6, maxLabels: zoomScale < 2.5 ? 8 : zoomScale < 4 ? 20 : 45 });
  }, [project, visiblePopulatedPlaces, zoomScale]);

  const activeLayerSummary = useMemo(() => {
    if (mode === "geological") return [];
    const rows = [
      { id: "countries", count: searchableCountries.length, visible: true },
      { id: "civilizations", count: visibleCivs.length, visible: mode === "historical" },
      { id: "migrations", count: visibleRoutes.filter((route) => activeRoutes[route.id] !== false).length, visible: true },
      { id: "diasporas", count: diaspora.length, visible: mode === "historical" && showDiaspora },
      { id: "heritage", count: places.length, visible: mode === "historical" && showPlaces },
      { id: "cities", count: visiblePopulatedPlaces.length, visible: mode === "historical" && year >= 1800 && showCities },
    ];
    return rows.filter((row) => row.visible && row.count > 0);
  }, [mode, searchableCountries.length, visibleCivs.length, visibleRoutes, activeRoutes, diaspora.length, showDiaspora, places.length, showPlaces, visiblePopulatedPlaces.length, year, showCities]);

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
    <div className="pt-[72px] h-screen h-[100dvh] flex flex-col" data-testid="atlas-page">
      <DevDataSourceIndicator />
      {isPilotV3Enabled() && (
        <div
          className="fixed top-[90px] right-2 z-[600] text-[0.6rem] px-2 py-1 rounded bg-black/70 text-gold font-mono"
          data-testid="pilot-v3-active-indicator"
        >
          {lang === "fr" ? "Prototype v3 actif (Gabon/Afrique centrale)" : "Prototype v3 active (Gabon/Central Africa)"}
        </div>
      )}
      {mode === "historical" && pilotV3FangProcess && (
        <div
          className="fixed bottom-4 right-2 z-[600] glass rounded-lg p-3 max-w-[220px] text-[0.65rem]"
          data-testid="pilot-v3-fang-process-banner"
        >
          <p className="text-gold mb-1"><LocalizedText value={pilotV3FangProcess.label} /></p>
          {pilotV3FangProcess.phases.map((phase, i) => (
            <p key={i} className="text-bone/70 mb-1">
              • <LocalizedText value={phase.label} /> (<LocalizedText value={phase.period} />)
            </p>
          ))}
          <p className="text-amber-400/80 mt-1">⚠ <LocalizedText value={pilotV3FangProcess.warningNote} /></p>
        </div>
      )}
      {selectedPilotV3Marker && (
        <PilotV3InfoPanel marker={selectedPilotV3Marker} onClose={() => setSelectedPilotV3Marker(null)} />
      )}
      {/* Current era indicator */}
      <div className="absolute top-[84px] left-1/2 -translate-x-1/2 z-[500] glass px-6 py-2 rounded-full" data-testid="atlas-era-indicator">
        <p className="font-serif text-gold text-sm md:text-base whitespace-nowrap">{eraLabel(year, lang)}</p>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        {mode !== "geological" && (
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-[550] w-[min(88vw,320px)]" data-testid="atlas-country-search">
            <label htmlFor="atlas-country-search-input" className="sr-only">
              {lang === "fr" ? "Rechercher dans l’Atlas" : "Search the Atlas"}
            </label>
            <input
              id="atlas-country-search-input"
              type="search"
              value={countryQuery}
              onChange={(event) => setCountryQuery(event.target.value)}
              onFocus={() => { setShowMobileExplorer(false); setShowLegendPanel(false); }}
              onKeyDown={handleAtlasSearchKeyDown}
              placeholder={lang === "fr" ? "Pays, ville, civilisation, patrimoine…" : "Country, city, civilization, heritage…"}
              className="w-full glass rounded-lg border border-gold/20 px-4 py-3 text-sm text-bone placeholder:text-bone/35 outline-none focus:border-gold/60"
              autoComplete="off"
              aria-controls="atlas-country-search-results"
              aria-expanded={atlasSearchResults.length > 0}
              aria-autocomplete="list"
              aria-activedescendant={activeSearchIndex >= 0 ? `atlas-search-option-${activeSearchIndex}` : undefined}
            />
            {countryQuery.trim() && (
              <div id="atlas-country-search-results" className="mt-1 glass rounded-lg border border-gold/20 overflow-hidden" role="listbox">
                {atlasSearchResults.length > 0 ? atlasSearchResults.map((result) => (
                  <button
                    type="button"
                    id={`atlas-search-option-${atlasSearchResults.indexOf(result)}`}
                    key={`${result.type}-${result.id}`}
                    onClick={() => selectAtlasSearchResult(result)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left text-sm text-bone/80 hover:bg-gold/10 hover:text-gold focus:bg-gold/10 focus:text-gold outline-none"
                    role="option"
                    aria-selected={atlasSearchResults.indexOf(result) === activeSearchIndex}
                  >
                    <span>{result.label}</span>
                    <span className="text-[0.65rem] uppercase tracking-wider text-bone/35">{result.meta}</span>
                  </button>
                )) : (
                  <p className="px-4 py-3 text-xs text-bone/55" role="status">
                    {lang === "fr" ? "Aucun résultat dans l’Atlas." : "No Atlas result found."}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {mode !== "geological" && (
          <div className="absolute top-4 left-4 md:top-6 md:left-[350px] z-[390] glass rounded-lg border border-gold/15 px-3 py-2 max-w-[calc(100vw-2rem)]" data-testid="atlas-visible-layer-summary">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-[0.58rem] uppercase tracking-[0.16em] text-bone/45">{lang === "fr" ? "Visible" : "Visible"}</span>
              {activeLayerSummary.map((row) => (
                <span key={row.id} className="text-[0.62rem] text-bone/70 whitespace-nowrap">
                  <span className="text-gold">{row.count}</span>{" "}
                  {row.id === "cities" ? (lang === "fr" ? "villes" : "cities") : getAtlasLayerLabel(row.id, lang)}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="absolute bottom-3 left-3 z-[500] glass rounded-lg border border-gold/20 px-3 py-2 max-w-[250px]" data-testid="equal-earth-badge">
          <p className="text-[0.6rem] uppercase tracking-[0.18em] text-gold">{lang === "fr" ? "Projection Equal Earth" : "Equal Earth projection"}</p>
          <p className="mt-1 text-[0.65rem] leading-4 text-bone/55">{t("atlas.equalEarth.copy")}</p>
        </div>
        <WorldMap
          onProjectionReady={onProjectionReady}
          onGeoProjectionReady={onGeoProjectionReady}
          onZoomChange={setZoomScale}
          onCountrySelect={onCountrySelect}
          onCountriesReady={setMapCountries}
          selectedCountryName={selectedCountry?.name ?? null}
          focusCountryName={focusCountryName}
          focusPoint={focusPoint}
          lang={lang}
          highlightAfrica={mode !== "geological"}
          geoFusion={mode === "geological" && currentEpoch ? currentEpoch.fusion_factor : null}
        >
          {/* Geological mode: labels anchored to their drifting plate group */}
          {mode === "geological" && currentEpoch && geoProject && currentEpoch.labels.map((l, index) => {
            const p = geoProject(l.group || "Africa", l.lat, l.lon);
            if (!p) return null;
            return (
              <LocalizedText
                key={`${l.lat}-${l.lon}-${index}`}
                as="text"
                value={l.text}
                x={p[0]}
                y={p[1]}
                fontSize={l.size}
                fill={ATLAS_COLORS.textBone}
                textAnchor="middle"
                style={{ fontFamily: "serif", letterSpacing: "0.05em", pointerEvents: "none" }}
              />
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
            const migrationStyle = getMigrationVisualStyle(r.migration_type);
            return (
              <g key={r.id} onClick={() => setSelected({ kind: "route", ...r })} style={{ cursor: "pointer" }} role="button" tabIndex={0} aria-label={`${lang === "fr" ? "Route" : "Route"}: ${rawText(r.name)}`} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected({ kind: "route", ...r }); } }}>
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
                  stroke={migrationStyle.color}
                  strokeWidth={(isSelected ? migrationStyle.width + 1 : migrationStyle.width) / Math.max(1, Math.sqrt(zoomScale))}
                  strokeDasharray={migrationStyle.dasharray}
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
              <g key={p.id} onClick={() => setSelected({ kind: "polity", ...p })} style={{ cursor: "pointer" }} role="button" tabIndex={0} aria-label={`${lang === "fr" ? "Entité politique historique" : "Historical polity"}: ${rawText(p.name)}`} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected({ kind: "polity", ...p }); } }}>
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
                role="button"
                tabIndex={0}
                aria-label={`${lang === "fr" ? "Entité historique" : "Historical entity"}: ${rawText(marker.label)}`}
                onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedPilotV3Marker(marker); } }}
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
              <g key={c.id} onClick={() => setSelected({ kind: "civ", ...c })} style={{ cursor: "pointer" }} role="button" tabIndex={0} aria-label={`${lang === "fr" ? "Civilisation" : "Civilization"}: ${rawText(c.name)}`} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected({ kind: "civ", ...c }); } }}>
                <circle cx={p[0]} cy={p[1]} r={12} fill="transparent" />
                <circle cx={p[0]} cy={p[1]} r={Math.max(1.5, 6 / zoomScale)} fill={ATLAS_COLORS.gold} stroke={ATLAS_COLORS.gold} strokeWidth={Math.max(0.5, 2 / zoomScale)} fillOpacity={0.9} style={{ pointerEvents: "none" }} />
              </g>
            );
          })}

          {mode === "historical" && showPlaces && project && places.map((p) => {
            const pt = project(p.coords[0], p.coords[1]);
            if (!pt) return null;
            return (
              <g key={p.id} onClick={() => setSelected({ kind: "place", ...p })} style={{ cursor: "pointer" }} role="button" tabIndex={0} aria-label={`${lang === "fr" ? "Lieu patrimonial" : "Heritage place"}: ${rawText(p.name)}`} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected({ kind: "place", ...p }); } }}>
                <circle cx={pt[0]} cy={pt[1]} r={12} fill="transparent" />
                <circle cx={pt[0]} cy={pt[1]} r={Math.max(0.8, 3 / zoomScale)} fill={ATLAS_COLORS.amber} stroke={ATLAS_COLORS.amber} strokeWidth={Math.max(0.3, 1.2 / zoomScale)} fillOpacity={0.9} style={{ pointerEvents: "none" }} />
              </g>
            );
          })}

          {mode === "historical" && showDiaspora && project && diaspora.map((d) => {
            const pt = project(d.coords[0], d.coords[1]);
            if (!pt) return null;
            return (
              <g key={d.id} onClick={() => setSelected({ kind: "diaspora", ...d })} style={{ cursor: "pointer" }} role="button" tabIndex={0} aria-label={`${lang === "fr" ? "Diaspora" : "Diaspora"}: ${rawText(d.name)}`} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected({ kind: "diaspora", ...d }); } }}>
                <circle cx={pt[0]} cy={pt[1]} r={12} fill="transparent" />
                <circle cx={pt[0]} cy={pt[1]} r={Math.max(1, 4 / zoomScale)} fill={ATLAS_COLORS.deepRed} stroke={ATLAS_COLORS.deepRed} strokeWidth={Math.max(0.3, 1.2 / zoomScale)} fillOpacity={0.9} style={{ pointerEvents: "none" }} />
              </g>
            );
          })}

          {/* Modern populated places are a reference layer, intentionally
              limited to 1800+ so current capitals are not projected onto
              ancient periods as if they were historically equivalent. */}
          {mode === "historical" && year >= 1800 && project && visiblePopulatedPlaces.map((place) => {
            const pt = project(place.coords[0], place.coords[1]);
            if (!pt) return null;
            const isCapital = place.kind === "capital" || place.kind === "capital-alt";
            return (
              <g
                key={place.id}
                onClick={() => {
                  setSelected({ ...place, placeKind: place.kind, kind: "city" });
                  setSelectedCountry(null);
                  setFocusPoint({ lat: place.coords[0], lon: place.coords[1], scale: Math.max(5.2, zoomScale) });
                }}
                style={{ cursor: "pointer" }}
                data-testid={`atlas-city-${place.id}`}
                role="button"
                tabIndex={0}
                aria-label={`${place.name} · ${place.countryId}`}
                onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected({ ...place, placeKind: place.kind, kind: "city" }); } }}
              >
                <circle cx={pt[0]} cy={pt[1]} r={Math.max(10, 12 / zoomScale)} fill="transparent" />
                <circle
                  cx={pt[0]}
                  cy={pt[1]}
                  r={(isCapital ? 3.4 : 2.4) / Math.max(1, Math.sqrt(zoomScale))}
                  fill={isCapital ? ATLAS_COLORS.gold : ATLAS_COLORS.textBone}
                  stroke={ATLAS_COLORS.ocean}
                  strokeWidth={1 / zoomScale}
                  fillOpacity={isCapital ? 0.95 : 0.72}
                  style={{ pointerEvents: "none" }}
                />
              </g>
            );
          })}

          {mode === "historical" && visibleCityLabels.map((label) => (
            <AtlasMapLabel key={label.id} label={label} zoomScale={zoomScale} />
          ))}

          {/* LABELS PASS — collision-filtered in screen space. */}
          {mode === "historical" && visibleHistoricalLabels.map((label) => (
            <AtlasMapLabel key={`label-${label.id}`} label={label} zoomScale={zoomScale} />
          ))}

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

        {selectedCountry && mode !== "geological" && (
          <section className="absolute top-24 right-4 md:right-6 z-[525] glass w-[min(88vw,320px)] p-5" data-testid="atlas-country-panel" aria-live="polite">
            <button
              type="button"
              onClick={() => setSelectedCountry(null)}
              className="absolute top-3 right-4 text-bone/50 hover:text-bone text-lg"
              aria-label={lang === "fr" ? "Fermer le panneau pays" : "Close country panel"}
            >×</button>
            <p className="overline text-gold text-[0.6rem]">
              {selectedCountry.kind === "territory"
                ? (lang === "fr" ? "Territoire" : "Territory")
                : (lang === "fr" ? "Pays" : "Country")}
            </p>
            <h2 className="font-serif text-2xl text-bone mt-1 pr-6">{selectedCountry.label}</h2>
            {(selectedCountry.countryId || selectedCountry.territoryId) && (
              <p className="mt-2 text-[0.65rem] uppercase tracking-[0.16em] text-bone/45">
                {selectedCountry.countryId ? `countryId · ${selectedCountry.countryId}` : selectedCountry.territoryId}
              </p>
            )}
            <p className="text-bone/65 text-sm mt-3 leading-relaxed">
              {selectedCountryDossier
                ? (lang === "fr" ? "Un dossier pays est publié et relié à cette géométrie cartographique." : "A published country dossier is linked to this map geometry.")
                : (lang === "fr" ? "La géométrie est active dans l’Atlas. Le dossier éditorial détaillé sera relié ici dès sa publication." : "The geometry is active in the Atlas. The detailed editorial dossier will be linked here as soon as it is published.")}
            </p>
            {selectedCountryDossier?.slug ? (
              <Link to={`/country/${selectedCountryDossier.slug}`} className="inline-block mt-4 uppercase tracking-[0.18em] text-[0.65rem] text-gold">
                {lang === "fr" ? "Ouvrir le dossier pays →" : "Open country dossier →"}
              </Link>
            ) : (
              <Link to="/countries" className="inline-block mt-4 uppercase tracking-[0.18em] text-[0.65rem] text-gold">
                {lang === "fr" ? "Voir les pays publiés →" : "View published countries →"}
              </Link>
            )}
          </section>
        )}

        {/* Side panel — desktop stays visible; mobile uses an accessible disclosure. */}
        <button
          type="button"
          ref={mobileExplorerToggleRef}
          onClick={() => {
            setShowMobileExplorer((v) => {
              const next = !v;
              if (next) setShowLegendPanel(false);
              return next;
            });
          }}
          className="lg:hidden absolute top-3 left-3 z-[410] glass px-3 py-2 text-[0.65rem] uppercase tracking-[0.15em] text-gold"
          aria-expanded={showMobileExplorer}
          aria-controls="atlas-explorer-panel"
          data-testid="atlas-mobile-explorer-toggle"
        >
          {showMobileExplorer
            ? (lang === "fr" ? "Fermer l’exploration" : "Close explorer")
            : (lang === "fr" ? "Explorer" : "Explore")}
        </button>
        <aside
          id="atlas-explorer-panel"
          ref={mobileExplorerPanelRef}
          tabIndex={showMobileExplorer ? -1 : undefined}
          className={`${showMobileExplorer ? "block" : "hidden"} lg:block absolute top-14 left-3 right-3 lg:top-6 lg:left-6 lg:right-auto z-[400] glass w-auto lg:w-[320px] max-h-[58vh] lg:max-h-[70vh] overflow-y-auto overscroll-contain`}
          data-testid="atlas-side-panel"
          aria-label={lang === "fr" ? "Exploration de l’Atlas" : "Atlas explorer"}
        >
          {mode === "historical" && (
            <>
              <div className="p-5 border-b border-[#2A2421]">
                <p className="overline">{t("atlas.activeIn").replace("{era}", eraLabel(year, lang))}</p>
                <p className="font-serif text-2xl text-bone mt-2">{t("atlas.civsCount").replace("{n}", visibleCivs.length)}</p>
                {visiblePolities.length > 0 && (
                  <p className="text-bone/50 text-xs mt-1">{t("atlas.politiesCount").replace("{n}", visiblePolities.length)}</p>
                )}
              </div>
              <ul className="divide-y divide-[#2A2421]">
                {visibleCivs.map((c) => (
                  <li key={c.id}>
                    <Link to={`/civilization/${c.id}`} className="block px-5 py-4 hover:bg-[#1A1614] transition-colors group" data-testid={`atlas-civ-${c.id}`}>
                      <p className="font-serif text-lg text-bone group-hover:text-gold transition-colors"><LocalizedText value={c.name} /></p>
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
                <p className="overline">{eraLabel(year, lang)}</p>
                <p className="font-serif text-xl text-bone mt-2">{t("atlas.prehistoric.title")}</p>
                <p className="text-bone/60 text-xs mt-2 leading-relaxed">
                  {t("atlas.prehistoric.copy")}
                </p>
              </div>
              <ul className="divide-y divide-[#2A2421]">
                {visiblePaleo.map((p) => (
                  <li key={p.id} role="button" tabIndex={0} aria-label={`${lang === "fr" ? "Ouvrir" : "Open"} ${rawText(p.name)}`} className="px-5 py-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset" onClick={() => setSelected({ kind: "paleo", ...p })} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected({ kind: "paleo", ...p }); } }}>
                    <p className="font-serif text-base text-bone"><LocalizedText value={p.name} /></p>
                    <p className="text-bone/60 text-xs mt-1 leading-relaxed"><LocalizedText value={p.summary} /></p>
                  </li>
                ))}
                {visiblePaleo.length === 0 && <li className="p-5 text-bone/60 text-sm">{t("atlas.prehistoric.empty")}</li>}
              </ul>
            </>
          )}

          {mode === "geological" && currentEpoch && (
            <>
              <div className="p-5 border-b border-[#2A2421]">
                <p className="overline"><LocalizedText value={currentEpoch.era_label} /></p>
                <p className="font-serif text-xl text-bone mt-2"><LocalizedText value={currentEpoch.name} /></p>
                <p className="text-bone/60 text-xs mt-2 leading-relaxed"><LocalizedText value={currentEpoch.summary} /></p>
                <p className="text-bone/40 text-[0.65rem] mt-3 italic leading-relaxed">
                  {t("atlas.geological.disclaimer")}
                </p>
              </div>
              <div className="p-5 border-t border-[#2A2421]">
                <p className="text-bone/40 text-[0.65rem] italic leading-relaxed">{t("atlas.sources")} : <LocalizedSourceList values={currentEpoch.sources || []} /></p>
              </div>
            </>
          )}
        </aside>

        {/* Legend toggle — always visible, on mobile too (previously the
            legend itself was hidden below the md breakpoint, meaning it
            never appeared on phones at all). */}
        <button
          onClick={() => {
            setShowLegendPanel((v) => {
              const next = !v;
              if (next) setShowMobileExplorer(false);
              return next;
            });
          }}
          className="absolute bottom-24 right-3 md:bottom-28 md:right-6 z-[401] glass px-3 py-2 text-[0.65rem] uppercase tracking-[0.15em] text-gold"
          data-testid="legend-toggle-button"
          aria-expanded={showLegendPanel}
        >
          {showLegendPanel ? t("atlas.legend.hide") : t("atlas.legend.show")}
        </button>

        {/* Legend — content adapts to the active mode (geological /
            prehistoric / historical), since lines and points appear in all
            three, not just "historical". */}
        {showLegendPanel && (
          <div className="absolute bottom-36 right-3 md:bottom-44 md:right-6 z-[400] glass p-4 max-h-[52vh] md:max-h-[60vh] overflow-y-auto overscroll-contain w-[calc(100vw-1.5rem)] max-w-xs" data-testid="route-legend">
            <p className="overline mb-3">{t("atlas.layers")}</p>

            {mode === "geological" && (
              <div className="space-y-2">
                <p className="text-bone/80 text-xs">
                  {t("atlas.pangea.copy")}
                </p>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-[2px]" style={{ background: ATLAS_COLORS.landAfricaBorder }} />
                  <span className="text-bone/80 text-xs">{t("atlas.landmass")}</span>
                </div>
              </div>
            )}

            {mode === "prehistoric" && (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-sm" style={{ background: ATLAS_COLORS.amber, opacity: 0.5 }} />
                  <span className="text-bone/80 text-xs">
                    {lang === "fr" ? "Ponts terrestres (zone approximative, mer basse)" : "Land bridges (approximate area, low sea level)"}
                  </span>
                </div>
                <div className="h-px bg-[#2A2421] my-2" />
                {routes.filter((r) => !r.id.startsWith("diaspora-") && activeRoutes[r.id] !== false).length > 0 && (
                  <p className="text-bone/60 text-[0.65rem] mb-1">{t("atlas.activeMigrationRoutes")}</p>
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
                    <span className="w-6 h-[2px]" style={{ background: getMigrationVisualStyle(r.migration_type).color }} />
                    <span className="text-bone/80 text-xs"><LocalizedText value={r.name} /></span>
                  </label>
                ))}
              </div>
            )}

            {mode === "historical" && (
              <div className="space-y-2">
                <p className="text-bone/60 text-[0.65rem] uppercase tracking-wider mb-1">{t("atlas.migrationStyles")}</p>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-[2px]" style={{ background: "#7B2D26" }} />
                  <span className="text-bone/80 text-xs">{t("atlas.migration.forced")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-[2px]" style={{ background: "#4ade80", borderTop: "2px dotted #4ade80", height: 0 }} />
                  <span className="text-bone/80 text-xs">{t("atlas.migration.voluntary")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6" style={{ borderTop: `2px dashed ${ATLAS_COLORS.amber}` }} />
                  <span className="text-bone/80 text-xs">{t("atlas.migration.mixed")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6" style={{ borderTop: "2px dashed #9CA3AF" }} />
                  <span className="text-bone/80 text-xs">{t("atlas.migration.conquest")}</span>
                </div>
                <div className="h-px bg-[#2A2421] my-2" />
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={showCities} onChange={(e) => setShowCities(e.target.checked)} className="accent-gold" data-testid="toggle-cities" />
                  <span className="w-2 h-2 rounded-full" style={{ background: ATLAS_COLORS.gold }} />
                  <span className="text-bone/80 text-xs">{lang === "fr" ? "Capitales et grandes villes (référence moderne)" : "Capitals and major cities (modern reference)"}</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={showPolities} onChange={(e) => setShowPolities(e.target.checked)} className="accent-gold" data-testid="toggle-polities" />
                  <span className="w-2 h-2 rounded-full border border-dashed" style={{ borderColor: ATLAS_COLORS.gold }} />
                  <span className="text-bone/80 text-xs">{t("atlas.polities")}</span>
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
                    <span className="w-6 h-[2px]" style={{ background: getMigrationVisualStyle(r.migration_type).color }} />
                    <span className="text-bone/80 text-xs"><LocalizedText value={r.name} /></span>
                  </label>
                ))}

                {routes.some((r) => r.id.startsWith("diaspora-")) && (
                  <div className="mt-2">
                    <button
                      onClick={() => setShowDiasporaRoutesList((v) => !v)}
                      className="flex items-center justify-between w-full text-left"
                      data-testid="toggle-diaspora-routes-section"
                      aria-expanded={showDiasporaRoutesList}
                    >
                      <span className="text-bone/60 text-xs uppercase tracking-wider">
                        {t("atlas.diasporaRoutes").replace("{n}", routes.filter((r) => r.id.startsWith("diaspora-")).length)}
                      </span>
                      <span className="text-bone/40 text-xs" aria-hidden="true">{showDiasporaRoutesList ? "▾" : "▸"}</span>
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
                            <span className="text-bone/80 text-[0.65rem] leading-tight"><LocalizedText value={r.name} /></span>
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
          <div
            ref={detailCardRef}
            role="dialog"
            aria-modal="false"
            aria-labelledby="atlas-marker-detail-title"
            tabIndex={-1}
            onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); setSelected(null); } }}
            className="absolute bottom-20 md:bottom-28 left-1/2 -translate-x-1/2 z-[600] glass w-[calc(100%-1.5rem)] max-w-[420px] max-h-[58vh] md:max-h-[70vh] overflow-y-auto overscroll-contain p-4 md:p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            data-testid="marker-detail-card"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-4 text-bone/50 hover:text-bone text-lg"
              data-testid="close-detail"
              aria-label={lang === "fr" ? "Fermer les détails" : "Close details"}
            >×</button>
            <p className="overline text-[0.6rem]" style={{ color: selected.color || ATLAS_COLORS.gold }}>
              {selected.kind === "civ" && `${t("atlas.kind.civ")} · ${t(`region.${selected.region}`)}`}
              {selected.kind === "place" && <><LocalizedText value={selected.type} /> · <LocalizedText value={selected.era} /></>}
              {selected.kind === "diaspora" && `Diaspora · ${t(`region.${selected.region}`)}`}
              {selected.kind === "polity" && t("atlas.kind.polity")}
              {selected.kind === "paleo" && t("atlas.kind.paleo")}
              {selected.kind === "route" && t("atlas.kind.route")}
              {selected.kind === "city" && (selected.placeKind === "capital" || selected.placeKind === "capital-alt" ? (lang === "fr" ? "Capitale · référence moderne" : "Capital · modern reference") : (lang === "fr" ? "Grande ville · référence moderne" : "Major city · modern reference"))}
            </p>
            <p id="atlas-marker-detail-title" className="font-serif text-xl text-bone mt-1"><LocalizedText value={selected.name} /></p>
            {selected.kind === "route" && (
              <>
                <p className="text-bone/70 text-sm mt-2"><LocalizedText value={selected.era} /></p>
                {Array.isArray(selected.points) && selected.points.length >= 2 && (
                  <p className="text-bone/60 text-xs mt-2" data-testid="migration-origin-destination">
                    <span className="text-bone/40 uppercase tracking-wider">{lang === "fr" ? "Origine" : "Origin"}</span>
                    {" "}{selected.points[0][0].toFixed(2)}°, {selected.points[0][1].toFixed(2)}°
                    <span className="mx-2 text-gold" aria-hidden="true">→</span>
                    <span className="text-bone/40 uppercase tracking-wider">{lang === "fr" ? "Destination" : "Destination"}</span>
                    {" "}{selected.points[selected.points.length - 1][0].toFixed(2)}°, {selected.points[selected.points.length - 1][1].toFixed(2)}°
                  </p>
                )}
                <p className="text-amber-400/80 text-[0.68rem] mt-2 leading-relaxed" data-testid="migration-schematic-warning">
                  ⚠ {lang === "fr"
                    ? "Tracé schématique reliant des zones documentées ; il ne représente pas un itinéraire historique exact."
                    : "Schematic line connecting documented areas; it does not represent an exact historical route."}
                </p>
              </>
            )}
            {selected.kind === "city" && (
              <p className="text-bone/60 text-xs mt-2">
                {selected.countryId}{selected.populationMax ? ` · ${new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US").format(selected.populationMax)} ${lang === "fr" ? "hab. max. (Natural Earth)" : "max pop. (Natural Earth)"}` : ""}
              </p>
            )}
            {selected.kind === "route" && selected.migration_type && (
              <span
                className="inline-block mt-2 text-[0.6rem] uppercase tracking-wider px-2 py-0.5 rounded-full border"
                style={{
                  borderColor: { forced: "#7B2D26", voluntary: "#4ade80", mixed: ATLAS_COLORS.amber, conquest: "#9CA3AF" }[selected.migration_type] || "#9CA3AF",
                  color: { forced: "#7B2D26", voluntary: "#4ade80", mixed: ATLAS_COLORS.amber, conquest: "#9CA3AF" }[selected.migration_type] || "#9CA3AF",
                }}
              >
                {{ forced: t("atlas.migration.forced"), voluntary: t("atlas.migration.voluntary"), mixed: t("atlas.migration.mixed"), conquest: t("atlas.migration.conquest") }[selected.migration_type]}
              </span>
            )}
            <p className="text-bone/70 text-sm mt-2 leading-relaxed">
              <LocalizedExcerpt value={selected.summary || selected.blurb || ""} />
            </p>
            {selected.sources && (
              <p className="text-bone/40 text-[0.65rem] mt-3 italic leading-relaxed">{t("atlas.sources")} : <LocalizedSourceList values={selected.sources} /></p>
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
                {t("atlas.moreMigration")}
              </Link>
            )}
            {selected.kind === "route" && !selected.diaspora_id && selected.story_id && (
              <Link to={`/story/${selected.story_id}`} className="inline-block mt-3 uppercase tracking-[0.18em] text-[0.65rem] text-gold">
                {t("atlas.readStory")}
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Unified timeline bar — one continuous non-linear slider, Pangaea to today */}
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
                key={m.year}
                onClick={() => jumpToYear(m.year)}
                className="absolute -translate-x-1/2 text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-bone/40 hover:text-gold transition-colors whitespace-nowrap"
                style={{
                  left: `${Math.min(97, (yearToSlider(m.year) / SLIDER_MAX) * 100)}%`,
                  top: i % 2 === 0 ? 0 : 16,
                }}
                data-testid={`milestone-${m.year}`}
              >
                {m.label[lang] || m.label.en}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Atlas;