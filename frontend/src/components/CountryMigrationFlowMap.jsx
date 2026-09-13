import { Fragment, useMemo, useState } from "react";
import { CircleMarker, Polyline, Popup, Tooltip } from "react-leaflet";
import CountryShapeMap, { getCountryMapMeta } from "./CountryShapeMap";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";
import { localizedValue } from "../lib/contentSort";

const TYPE_STYLES = {
  "regional-mobility": { color: "#2F80A3", dashArray: undefined },
  "coerced-labour": { color: "#C47B21", dashArray: "10 6" },
  "forced-displacement": { color: "#A33A32", dashArray: "5 7" },
  forced: { color: "#A33A32", dashArray: "5 7" },
  mixed: { color: "#7C5AA6", dashArray: "12 5 3 5" },
  voluntary: { color: "#4F8A67", dashArray: undefined },
  "colonial-settlement": { color: "#80624A", dashArray: "14 5" },
  ancient: { color: "#2B7A78", dashArray: "3 6" },
  trade: { color: "#3569A8", dashArray: "8 5" },
};

const COPY = {
  fr: {
    title: "Carte des mobilités et migrations",
    intro: "La carte garde le pays au centre et superpose les axes de mobilité documentés. Les couleurs distinguent les types de déplacement ; zoomez pour retrouver les lieux et le contexte territorial.",
    all: "Toutes les périodes",
    allTypes: "Tous les types",
    filterType: "Filtrer par type de mobilité",
    filterPeriod: "Filtrer par période",
    legend: "Grande légende",
    types: {
      "regional-mobility": "Mobilité régionale / peuplement",
      "coerced-labour": "Travail migrant sous contrainte",
      "forced-displacement": "Déplacement forcé",
      forced: "Déplacement forcé",
      mixed: "Mobilités mixtes",
      voluntary: "Migration volontaire",
      "colonial-settlement": "Installation coloniale",
      ancient: "Mobilité ancienne",
      trade: "Circulation commerciale",
    },
    origin: "Point de départ / zone d’origine",
    destination: "Point d’arrivée / zone de destination",
    route: "Axe migratoire documenté",
    period: "Période",
    people: "Population / groupe concerné",
    source: "Source",
    schematic: "Territoire et flux",
    present: "aujourd’hui",
  },
  en: {
    title: "Mobility and migration map",
    intro: "The map keeps the country at the center and overlays documented mobility corridors. Colors distinguish movement types; zoom to reconnect routes with places and territory.",
    all: "All periods",
    allTypes: "All types",
    filterType: "Filter by mobility type",
    filterPeriod: "Filter by period",
    legend: "Full legend",
    types: {
      "regional-mobility": "Regional mobility / settlement",
      "coerced-labour": "Coerced migrant labour",
      "forced-displacement": "Forced displacement",
      forced: "Forced displacement",
      mixed: "Mixed mobility",
      voluntary: "Voluntary migration",
      "colonial-settlement": "Colonial settlement",
      ancient: "Ancient mobility",
      trade: "Trade circulation",
    },
    origin: "Starting point / origin area",
    destination: "Arrival point / destination area",
    route: "Documented migration corridor",
    period: "Period",
    people: "Population / group concerned",
    source: "Source",
    schematic: "Territory and flows",
    present: "present",
  },
};

function TranslatedValue({ value, fallback = "" }) {
  const { lang } = useI18n();
  const translated = useTranslated(value || "");
  return translated || localizedValue(value, lang) || fallback || null;
}

function routeType(route) {
  return route?.type || route?.migration_type || "mixed";
}

function periodKey(route) {
  return `${route.start ?? ""}::${route.end ?? ""}`;
}

function periodLabel(route, copy) {
  const start = route.start ?? "";
  const end = route.end ?? copy.present;
  if (start === "" && end === copy.present) return copy.present;
  return `${start}–${end}`;
}

function routeCurve(origin, destination, steps = 32) {
  if (!origin || !destination) return [];
  const [originLon, originLat] = origin;
  const [destinationLon, destinationLat] = destination;
  const dx = Math.abs(destinationLon - originLon);
  const arc = Math.min(4.5, Math.max(0.6, dx * 0.1));
  return Array.from({ length: steps + 1 }, (_, index) => {
    const t = index / steps;
    return [
      originLat + (destinationLat - originLat) * t + Math.sin(Math.PI * t) * arc,
      originLon + (destinationLon - originLon) * t,
    ];
  });
}

function boundsForCountryAndRoutes(routes, iso2) {
  const meta = getCountryMapMeta(iso2);
  const base = meta?.bounds || [[-29.5, 11.3], [-16.5, 25.8]];
  const points = routes.flatMap((route) => [route.origin_coordinates, route.destination_coordinates]).filter(Boolean);
  const lats = [base[0][0], base[1][0], ...points.map(([, lat]) => lat)];
  const lons = [base[0][1], base[1][1], ...points.map(([lon]) => lon)];

  const south = Math.max(-40, Math.min(...lats) - 1.4);
  const north = Math.min(5, Math.max(...lats) + 1.4);
  const west = Math.max(5, Math.min(...lons) - 1.4);
  const east = Math.min(42, Math.max(...lons) + 1.4);
  return [[south, west], [north, east]];
}

export default function CountryMigrationFlowMap({ dossier, routes = [], note, places = [] }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const [type, setType] = useState("all");
  const [period, setPeriod] = useState("all");

  const types = useMemo(
    () => [...new Set(routes.map(routeType).filter(Boolean))],
    [routes],
  );

  const routesForType = useMemo(
    () => type === "all" ? routes : routes.filter((route) => routeType(route) === type),
    [routes, type],
  );

  const periods = useMemo(() => {
    const unique = new Map();
    routesForType.forEach((route) => {
      const key = periodKey(route);
      if (!unique.has(key)) unique.set(key, route);
    });
    return [...unique.entries()].map(([key, route]) => ({ key, label: periodLabel(route, copy) }));
  }, [routesForType, copy]);

  const visibleRoutes = period === "all"
    ? routesForType
    : routesForType.filter((route) => periodKey(route) === period);

  const bounds = useMemo(
    () => boundsForCountryAndRoutes(visibleRoutes.length ? visibleRoutes : routesForType, dossier?.iso2),
    [visibleRoutes, routesForType, dossier?.iso2],
  );

  if (!routes.length) return null;

  const selectType = (nextType) => {
    setType(nextType);
    setPeriod("all");
  };

  return (
    <section className="space-y-5" aria-labelledby="migration-flow-map-title">
      <div>
        <p className="overline text-gold">{copy.schematic}</p>
        <h3 id="migration-flow-map-title" className="mt-1 font-serif text-2xl text-bone">{copy.title}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-bone/60">{copy.intro}</p>
      </div>

      {types.length > 1 && (
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.filterType}</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" aria-pressed={type === "all"} onClick={() => selectType("all")} className={`rounded-full border px-3 py-1.5 text-xs ${type === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/65"}`}>{copy.allTypes}</button>
            {types.map((item) => {
              const style = TYPE_STYLES[item] || { color: "#7A6A58" };
              return (
                <button key={item} type="button" aria-pressed={type === item} onClick={() => selectType(item)} className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${type === item ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/65"}`}>
                  <span className="h-2 w-2 rounded-full" style={{ background: style.color }} />
                  {copy.types[item] || item}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {periods.length > 1 && (
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.filterPeriod}</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" aria-pressed={period === "all"} onClick={() => setPeriod("all")} className={`rounded-full border px-3 py-1.5 text-xs ${period === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/65"}`}>{copy.all}</button>
            {periods.map((item) => (
              <button key={item.key} type="button" aria-pressed={period === item.key} onClick={() => setPeriod(item.key)} className={`rounded-full border px-3 py-1.5 text-xs ${period === item.key ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/65"}`}>{item.label}</button>
            ))}
          </div>
        </div>
      )}

      <CountryShapeMap dossier={dossier} places={places} boundsOverride={bounds} minZoom={2} className="h-[560px] w-full md:h-[680px]">
        {visibleRoutes.map((route) => {
          const currentType = routeType(route);
          const style = TYPE_STYLES[currentType] || { color: "#7A6A58" };
          if (!Array.isArray(route.origin_coordinates) || !Array.isArray(route.destination_coordinates)) return null;
          const [originLon, originLat] = route.origin_coordinates;
          const [destinationLon, destinationLat] = route.destination_coordinates;
          return (
            <Fragment key={route.id}>
              <Polyline positions={routeCurve(route.origin_coordinates, route.destination_coordinates)} pathOptions={{ color: style.color, weight: 5, opacity: 0.92, dashArray: style.dashArray }}>
                <Popup>
                  <div className="max-w-[260px]">
                    <strong><TranslatedValue value={route.label} /></strong><br />
                    <span>{copy.types[currentType] || currentType} · {periodLabel(route, copy)}</span><br />
                    <span><TranslatedValue value={route.origin} /> → <TranslatedValue value={route.destination} /></span>
                    {route.description && <p style={{ marginTop: 8 }}><TranslatedValue value={route.description} /></p>}
                    {route.source_url && <p style={{ marginTop: 8 }}><a href={route.source_url} target="_blank" rel="noreferrer">{copy.source}</a></p>}
                  </div>
                </Popup>
              </Polyline>
              <CircleMarker center={[originLat, originLon]} radius={5} pathOptions={{ color: style.color, fillColor: "#ffffff", fillOpacity: 1, weight: 3 }}>
                <Tooltip direction="top"><TranslatedValue value={route.origin} /></Tooltip>
              </CircleMarker>
              <CircleMarker center={[destinationLat, destinationLon]} radius={8} pathOptions={{ color: "#17384a", fillColor: style.color, fillOpacity: 1, weight: 2 }}>
                <Tooltip permanent direction="bottom" offset={[0, 7]}><TranslatedValue value={route.destination} /></Tooltip>
              </CircleMarker>
            </Fragment>
          );
        })}
      </CountryShapeMap>

      <aside className="rounded-2xl border border-[#b8cad8] bg-[#f5f9fb] p-5 text-[#243845]" aria-label={copy.legend}>
        <h4 className="font-serif text-xl">{copy.legend}</h4>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {types.map((item) => {
            const style = TYPE_STYLES[item] || { color: "#7A6A58" };
            return <div key={item} className="flex items-center gap-3 text-sm"><span className="block h-1 w-10 rounded-full" style={{ background: style.color }} />{copy.types[item] || item}</div>;
          })}
          <div className="flex items-center gap-3 text-sm"><span className="h-4 w-4 rounded-full border-[3px] border-[#2F80A3] bg-white" />{copy.origin}</div>
          <div className="flex items-center gap-3 text-sm"><span className="h-4 w-4 rounded-full border-2 border-[#17384a] bg-[#2F80A3]" />{copy.destination}</div>
          <div className="flex items-center gap-3 text-sm"><span className="h-4 w-7 rounded-sm border-2 border-[#17384a] bg-[#7EB7D1]/30" /><TranslatedValue value={dossier?.name || dossier?.country} /></div>
        </div>
      </aside>

      <div className="grid gap-3 md:grid-cols-2">
        {visibleRoutes.map((route) => {
          const currentType = routeType(route);
          const style = TYPE_STYLES[currentType] || { color: "#7A6A58" };
          return (
            <article key={route.id} className="rounded-xl border border-bone/10 bg-bone/[0.02] p-4">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: style.color }} />
                <div>
                  <p className="text-xs uppercase tracking-wider text-gold">{copy.types[currentType] || currentType} · {copy.period} · {periodLabel(route, copy)}</p>
                  <h4 className="mt-1 text-bone"><TranslatedValue value={route.label} /></h4>
                  <p className="mt-1 text-xs text-bone/55"><TranslatedValue value={route.origin} /> → <TranslatedValue value={route.destination} /></p>
                  {route.people && <p className="mt-2 text-xs text-bone/55">{copy.people} : <TranslatedValue value={route.people} /></p>}
                  {route.description && <p className="mt-2 text-sm leading-relaxed text-bone/65"><TranslatedValue value={route.description} /></p>}
                  {route.source_url && <a href={route.source_url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs text-gold underline underline-offset-2">{copy.source} · <TranslatedValue value={route.source_label} fallback={route.source_url} /></a>}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {note && <p className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 text-sm leading-relaxed text-bone/70"><TranslatedValue value={note} /></p>}
    </section>
  );
}
