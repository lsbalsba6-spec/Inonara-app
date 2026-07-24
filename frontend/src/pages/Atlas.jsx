import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Circle, Polygon, Polyline, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import {
  fetchCivilizations,
  fetchRoutes,
  fetchPlaces,
  fetchDiaspora,
  fetchHistoricalPolities,
  fetchPaleoGeography,
  fetchPlateTectonics,
} from "../lib/api";
import { Slider } from "../components/ui/slider";
import { useI18n } from "../i18n";

const HISTORICAL_MIN_YEAR = -3500;
const HISTORICAL_MAX_YEAR = 2025;
const PREHISTORIC_MIN_YEAR = -70000;
const PREHISTORIC_MAX_YEAR = -3500;

const eraLabel = (year, mode) => {
  if (mode === "prehistoric") {
    return `il y a ${Math.abs(year).toLocaleString("fr-FR")} ans`;
  }
  return year < 0 ? `${Math.abs(year)} av. J.-C.` : `${year} apr. J.-C.`;
};

const Atlas = () => {
  const { t } = useI18n();
  const [mode, setMode] = useState("historical"); // "historical" | "prehistoric"
  const [civs, setCivs] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [places, setPlaces] = useState([]);
  const [diaspora, setDiaspora] = useState([]);
  const [polities, setPolities] = useState([]);
  const [paleo, setPaleo] = useState([]);
  const [plateEpochs, setPlateEpochs] = useState([]);
  const [epochIndex, setEpochIndex] = useState(0);
  const [year, setYear] = useState(1300);
  const [activeRoutes, setActiveRoutes] = useState({});
  const [showPlaces, setShowPlaces] = useState(true);
  const [showDiaspora, setShowDiaspora] = useState(true);
  const [showPolities, setShowPolities] = useState(true);

  useEffect(() => {
    fetchCivilizations().then(setCivs).catch(() => {});
    fetchPlaces().then(setPlaces).catch(() => {});
    fetchDiaspora().then(setDiaspora).catch(() => {});
    fetchHistoricalPolities().then(setPolities).catch(() => {});
    fetchPaleoGeography().then(setPaleo).catch(() => {});
    fetchPlateTectonics().then(setPlateEpochs).catch(() => {});
    fetchRoutes().then((r) => {
      setRoutes(r);
      setActiveRoutes(Object.fromEntries(r.map((x) => [x.id, true])));
    }).catch(() => {});
  }, []);

  const switchMode = (nextMode) => {
    setMode(nextMode);
    if (nextMode === "prehistoric") setYear(-50000);
    if (nextMode === "historical") setYear(1300);
  };

  const currentEpoch = plateEpochs[epochIndex] || null;

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

  const minYear = mode === "prehistoric" ? PREHISTORIC_MIN_YEAR : HISTORICAL_MIN_YEAR;
  const maxYear = mode === "prehistoric" ? PREHISTORIC_MAX_YEAR : HISTORICAL_MAX_YEAR;
  const stepYear = mode === "prehistoric" ? 500 : 25;

  return (
    <div className="pt-[72px] h-screen flex flex-col" data-testid="atlas-page">
      {/* Mode toggle */}
      <div className="absolute top-[88px] left-1/2 -translate-x-1/2 z-[500] glass flex rounded-full p-1" data-testid="atlas-mode-toggle">
        <button
          onClick={() => switchMode("historical")}
          className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.15em] transition-colors ${mode === "historical" ? "bg-gold text-[#0A0908]" : "text-bone/70 hover:text-bone"}`}
          data-testid="mode-historical"
        >
          Histoire (-3500 &rarr; 2025)
        </button>
        <button
          onClick={() => switchMode("prehistoric")}
          className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.15em] transition-colors ${mode === "prehistoric" ? "bg-gold text-[#0A0908]" : "text-bone/70 hover:text-bone"}`}
          data-testid="mode-prehistoric"
        >
          Préhistoire (sortie d'Afrique)
        </button>
        <button
          onClick={() => switchMode("geological")}
          className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.15em] transition-colors ${mode === "geological" ? "bg-gold text-[#0A0908]" : "text-bone/70 hover:text-bone"}`}
          data-testid="mode-geological"
        >
          Époque géologique (Pangée)
        </button>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapContainer
          center={[5, 20]}
          zoom={3}
          minZoom={2}
          maxZoom={6}
          worldCopyJump
          className="w-full h-full"
          style={{ background: "#0A0908" }}
        >
          {mode !== "geological" && (
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
              subdomains="abcd"
            />
          )}
          {mode === "historical" && (
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
              subdomains="abcd"
              opacity={0.6}
            />
          )}

          {/* Prehistoric mode: land bridges + Out-of-Africa route */}
          {mode === "prehistoric" && visiblePaleo.map((p) => (
            <Polygon
              key={p.id}
              positions={p.polygon}
              pathOptions={{ color: p.color, fillColor: p.color, fillOpacity: 0.22, weight: 1.5, dashArray: "4 4" }}
            >
              <Popup>
                <div className="text-xs space-y-1 min-w-[220px]">
                  <p className="overline text-[0.6rem]" style={{ color: p.color }}>Reconstitution approximative</p>
                  <p className="font-serif text-lg" style={{ color: "#F5F5F0" }}>{p.name}</p>
                  <p style={{ color: "#A39E98" }}>{p.summary}</p>
                  <p className="mt-2 text-[0.65rem] italic" style={{ color: "#6b6660" }}>Sources : {p.sources.join(" · ")}</p>
                </div>
              </Popup>
            </Polygon>
          ))}

          {mode === "prehistoric" && routes.filter((r) => r.id === "out-of-africa").map((r) => (
            <Polyline
              key={r.id}
              positions={r.points}
              pathOptions={{ color: "#D4AF37", weight: 3, opacity: 0.95, dashArray: "6 8" }}
            />
          ))}

          {/* Geological mode: schematic continental-drift landmasses, no human content */}
          {mode === "geological" && currentEpoch && currentEpoch.landmasses.map((lm) => (
            <Polygon
              key={lm.name}
              positions={lm.polygon}
              pathOptions={{ color: "#8a7a5c", fillColor: "#8a7a5c", fillOpacity: 0.35, weight: 1.5 }}
            >
              <Popup>
                <div className="text-xs space-y-1 min-w-[200px]">
                  <p className="overline text-[0.6rem]" style={{ color: "#8a7a5c" }}>Schéma simplifié, pas à l'échelle</p>
                  <p className="font-serif text-lg" style={{ color: "#F5F5F0" }}>{lm.name}</p>
                </div>
              </Popup>
            </Polygon>
          ))}

          {/* Historical mode: empires/kingdoms as approximate circles */}
          {mode === "historical" && showPolities && visiblePolities.map((p) => (
            <Circle
              key={p.id}
              center={p.coords}
              radius={p.radius_km * 1000}
              pathOptions={{ color: p.color, fillColor: p.color, fillOpacity: 0.12, weight: 1.5, dashArray: "5 5" }}
            >
              <Popup>
                <div className="text-xs space-y-1 min-w-[220px]">
                  <p className="overline text-[0.6rem]" style={{ color: p.color }}>Territoire approximatif</p>
                  <p className="font-serif text-lg" style={{ color: "#F5F5F0" }}>{p.name}</p>
                  <p style={{ color: "#A39E98" }}>{p.summary}</p>
                  <p className="mt-2 text-[0.65rem] italic" style={{ color: "#6b6660" }}>Sources : {p.sources.join(" · ")}</p>
                </div>
              </Popup>
            </Circle>
          ))}

          {mode === "historical" && routes.map((r) =>
            activeRoutes[r.id] ? (
              <Polyline
                key={r.id}
                positions={r.points}
                pathOptions={{ color: r.color, weight: 2.5, opacity: 0.9, dashArray: "6 8" }}
              />
            ) : null
          )}

          {mode === "historical" && visibleCivs.map((c) => (
            <CircleMarker
              key={c.id}
              center={c.coords}
              radius={9}
              pathOptions={{
                color: "#D4AF37",
                fillColor: "#D4AF37",
                fillOpacity: 0.85,
                weight: 2,
              }}
            >
              <Popup className="afroatlas-popup">
                <div className="text-xs space-y-1 min-w-[220px]">
                  <p className="overline text-[0.6rem]" style={{color:'#D4AF37'}}>Civilization · {t(`region.${c.region}`)}</p>
                  <p className="font-serif text-lg" style={{color:'#F5F5F0'}}>{c.name}</p>
                  <p style={{color:'#A39E98'}}>{c.summary.slice(0, 140)}…</p>
                  <Link to={`/civilization/${c.id}`} style={{color:'#D4AF37'}} className="inline-block mt-2 uppercase tracking-[0.18em] text-[0.65rem]">{t("atlas.openDeepDive")}</Link>
                </div>
              </Popup>
            </CircleMarker>
          ))}

          {mode === "historical" && showPlaces && places.map((p) => (
            <CircleMarker
              key={p.id}
              center={p.coords}
              radius={5}
              pathOptions={{ color: "#C18C42", fillColor: "#C18C42", fillOpacity: 0.85, weight: 1.5 }}
            >
              <Popup>
                <div className="text-xs space-y-1 min-w-[220px]">
                  <p className="overline text-[0.6rem]" style={{color:'#C18C42'}}>{p.type} · {p.era}</p>
                  <p className="font-serif text-base" style={{color:'#F5F5F0'}}>{p.name}</p>
                  <p style={{color:'#A39E98'}}>{p.blurb}</p>
                  <Link to={`/place/${p.id}`} style={{color:'#D4AF37'}} className="inline-block mt-2 uppercase tracking-[0.18em] text-[0.65rem]">{t("atlas.openDeepDive")}</Link>
                </div>
              </Popup>
            </CircleMarker>
          ))}

          {mode === "historical" && showDiaspora && diaspora.map((d) => (
            <CircleMarker
              key={d.id}
              center={d.coords}
              radius={7}
              pathOptions={{ color: "#7B2D26", fillColor: "#7B2D26", fillOpacity: 0.9, weight: 2 }}
            >
              <Popup>
                <div className="text-xs space-y-1 min-w-[220px]">
                  <p className="overline text-[0.6rem]" style={{color:'#A0522D'}}>Diaspora · {t(`region.${d.region}`)}</p>
                  <p className="font-serif text-lg" style={{color:'#F5F5F0'}}>{d.name}</p>
                  <p style={{color:'#A39E98'}}>{d.summary.slice(0, 140)}…</p>
                  <Link to={`/diaspora/${d.id}`} style={{color:'#D4AF37'}} className="inline-block mt-2 uppercase tracking-[0.18em] text-[0.65rem]">{t("atlas.visitCommunity")}</Link>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

        {/* Side panel */}
        <aside className="hidden lg:block absolute top-6 left-6 z-[400] glass w-[320px] max-h-[70vh] overflow-y-auto" data-testid="atlas-side-panel">
          {mode === "historical" && (
            <>
              <div className="p-5 border-b border-[#2A2421]">
                <p className="overline">{t("atlas.activeIn").replace("{era}", eraLabel(year, mode))}</p>
                <p className="font-serif text-2xl text-bone mt-2">{t("atlas.civsCount").replace("{n}", visibleCivs.length)}</p>
                {visiblePolities.length > 0 && (
                  <p className="text-bone/50 text-xs mt-1">{visiblePolities.length} territoire(s) historique(s) approximatif(s)</p>
                )}
              </div>
              <ul className="divide-y divide-[#2A2421]">
                {visibleCivs.map((c) => (
                  <li key={c.id}>
                    <Link
                      to={`/civilization/${c.id}`}
                      className="block px-5 py-4 hover:bg-[#1A1614] transition-colors group"
                      data-testid={`atlas-civ-${c.id}`}
                    >
                      <p className="font-serif text-lg text-bone group-hover:text-gold transition-colors">{c.name}</p>
                      <p className="text-bone/60 text-xs uppercase tracking-[0.15em] mt-1">{t(`region.${c.region}`)}</p>
                    </Link>
                  </li>
                ))}
                {visibleCivs.length === 0 && (
                  <li className="p-5 text-bone/60 text-sm">{t("atlas.empty")}</li>
                )}
              </ul>
            </>
          )}

          {mode === "prehistoric" && (
            <>
              <div className="p-5 border-b border-[#2A2421]">
                <p className="overline">Il y a {Math.abs(year).toLocaleString("fr-FR")} ans</p>
                <p className="font-serif text-xl text-bone mt-2">Sortie d'Afrique &amp; ponts terrestres</p>
                <p className="text-bone/60 text-xs mt-2 leading-relaxed">
                  Contrairement aux continents (formés il y a des centaines de millions d'années), le niveau des mers a varié de ~120m
                  pendant les glaciations, exposant de vrais ponts terrestres empruntés par les premières migrations humaines.
                </p>
              </div>
              <ul className="divide-y divide-[#2A2421]">
                {visiblePaleo.map((p) => (
                  <li key={p.id} className="px-5 py-4">
                    <p className="font-serif text-base text-bone">{p.name}</p>
                    <p className="text-bone/60 text-xs mt-1 leading-relaxed">{p.summary}</p>
                  </li>
                ))}
                {visiblePaleo.length === 0 && (
                  <li className="p-5 text-bone/60 text-sm">Aucun pont terrestre actif à cette période.</li>
                )}
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
                  Schéma simplifié à but pédagogique, pas une reconstitution paléogéographique précise. Aucun humain n'existait
                  encore à cette échelle de temps — ce mode est purement géologique, sans rapport avec les migrations ou les empires.
                </p>
              </div>
              <ul className="divide-y divide-[#2A2421]">
                {currentEpoch.landmasses.map((lm) => (
                  <li key={lm.name} className="px-5 py-3">
                    <p className="font-serif text-base text-bone">{lm.name}</p>
                  </li>
                ))}
              </ul>
              <div className="p-5 border-t border-[#2A2421]">
                <p className="text-bone/40 text-[0.65rem] italic leading-relaxed">Sources : {currentEpoch.sources.join(" · ")}</p>
              </div>
            </>
          )}
        </aside>

        {/* Legend */}
        {mode === "historical" && (
          <div className="absolute bottom-32 right-6 z-[400] glass p-4 hidden md:block" data-testid="route-legend">
            <p className="overline mb-3">{t("atlas.layers")}</p>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={showPolities} onChange={(e) => setShowPolities(e.target.checked)} className="accent-gold" data-testid="toggle-polities" />
                <span className="w-2 h-2 rounded-full border border-dashed" style={{ borderColor: "#D4AF37" }} />
                <span className="text-bone/80 text-xs">Empires &amp; royaumes (approximatif)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={showPlaces} onChange={(e) => setShowPlaces(e.target.checked)} className="accent-gold" data-testid="toggle-places" />
                <span className="w-2 h-2 rounded-full" style={{ background: "#C18C42" }} />
                <span className="text-bone/80 text-xs">{t("atlas.heritagePlaces")}</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={showDiaspora} onChange={(e) => setShowDiaspora(e.target.checked)} className="accent-gold" data-testid="toggle-diaspora" />
                <span className="w-2 h-2 rounded-full" style={{ background: "#7B2D26" }} />
                <span className="text-bone/80 text-xs">{t("atlas.diasporaCommunities")}</span>
              </label>
              <div className="h-px bg-[#2A2421] my-2" />
              {routes.map((r) => (
                <label key={r.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!activeRoutes[r.id]}
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
      </div>

      {/* Timeline bar */}
      <div className="glass border-t border-gold/20 px-6 md:px-10 py-5" data-testid="atlas-timeline">
        {mode === "geological" ? (
          <div className="max-w-[1600px] mx-auto">
            <p className="overline mb-3">Époques géologiques — étapes discrètes, pas un curseur continu</p>
            <div className="flex flex-wrap gap-2" data-testid="geological-epoch-buttons">
              {plateEpochs.map((e, i) => (
                <button
                  key={e.id}
                  onClick={() => setEpochIndex(i)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.1em] border transition-colors ${
                    i === epochIndex
                      ? "bg-gold text-[#0A0908] border-gold"
                      : "text-bone/70 border-[#2A2421] hover:border-gold/50"
                  }`}
                  data-testid={`epoch-button-${e.id}`}
                >
                  {e.era_label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between max-w-[1600px] mx-auto gap-6">
            <div className="hidden md:block">
              <p className="overline">{mode === "prehistoric" ? "Il y a" : t("atlas.year")}</p>
              <p className="font-serif text-2xl md:text-3xl text-gold mt-1 whitespace-nowrap">{eraLabel(year, mode)}</p>
            </div>
            <div className="flex-1">
              <Slider
                value={[year]}
                min={minYear}
                max={maxYear}
                step={stepYear}
                onValueChange={(v) => setYear(v[0])}
                data-testid="timeline-slider"
              />
              <div className="flex justify-between mt-3 text-[10px] uppercase tracking-[0.2em] text-bone/40">
                {mode === "prehistoric" ? (
                  <>
                    <span>-70 000 ans</span>
                    <span>-50 000</span>
                    <span>-20 000</span>
                    <span>-3 500</span>
                  </>
                ) : (
                  <>
                    <span>3500 av. J.-C.</span>
                    <span>0</span>
                    <span>1000 apr. J.-C.</span>
                    <span>2025</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Atlas;
