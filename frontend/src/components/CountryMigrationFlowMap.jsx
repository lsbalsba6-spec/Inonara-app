import { Fragment, useMemo, useState } from "react";
import { CircleMarker, Polyline, Popup, Tooltip } from "react-leaflet";
import InonaraLeafletMap from "./InonaraLeafletMap";
import { useI18n } from "../i18n";

const TYPE_STYLES = {
  "regional-mobility": { color: "#2F80A3", dashArray: undefined },
  "coerced-labour": { color: "#C47B21", dashArray: "10 6" },
  "forced-displacement": { color: "#A33A32", dashArray: "5 7" },
  voluntary: { color: "#4F8A67", dashArray: undefined },
};

const COPY = {
  fr: {
    title: "Carte des mobilités et migrations",
    intro: "Les lignes représentent des axes de mobilité documentés. Zoomez pour lire les lieux et cliquez sur une ligne pour voir le contexte historique.",
    all: "Toutes les périodes",
    legend: "Grande légende",
    types: {
      "regional-mobility": "Mobilité régionale / peuplement",
      "coerced-labour": "Travail migrant sous contrainte",
      "forced-displacement": "Déplacement forcé",
      voluntary: "Migration volontaire",
    },
    origin: "Point de départ / zone d’origine",
    destination: "Point d’arrivée / zone de destination",
    route: "Axe migratoire documenté",
    period: "Période",
    people: "Population / groupe concerné",
    source: "Source",
    schematic: "Tracé schématique",
  },
  en: {
    title: "Mobility and migration map",
    intro: "Lines represent documented mobility corridors. Zoom to reveal places and select a line to read its historical context.",
    all: "All periods",
    legend: "Full legend",
    types: {
      "regional-mobility": "Regional mobility / settlement",
      "coerced-labour": "Coerced migrant labour",
      "forced-displacement": "Forced displacement",
      voluntary: "Voluntary migration",
    },
    origin: "Starting point / origin area",
    destination: "Arrival point / destination area",
    route: "Documented migration corridor",
    period: "Period",
    people: "Population / group concerned",
    source: "Source",
    schematic: "Schematic line",
  },
};

function localize(value, lang) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map((item) => localize(item, lang)).filter(Boolean).join(", ");
  if (typeof value === "object") return value[lang] || value.fr || value.en || "";
  return "";
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

function boundsFor(routes) {
  const points = routes.flatMap((route) => [route.origin_coordinates, route.destination_coordinates]).filter(Boolean);
  if (!points.length) return [[-29.5, 11.3], [-16.5, 25.8]];
  const lats = points.map(([, lat]) => lat);
  const lons = points.map(([lon]) => lon);
  return [
    [Math.min(...lats) - 2.3, Math.min(...lons) - 2.3],
    [Math.max(...lats) + 2.3, Math.max(...lons) + 2.3],
  ];
}

export default function CountryMigrationFlowMap({ routes = [], note }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const periods = useMemo(() => [...new Set(routes.map((route) => `${route.start}-${route.end}`))], [routes]);
  const [period, setPeriod] = useState("all");
  const visibleRoutes = period === "all" ? routes : routes.filter((route) => `${route.start}-${route.end}` === period);
  const bounds = useMemo(() => boundsFor(visibleRoutes), [visibleRoutes]);

  if (!routes.length) return null;

  return (
    <section className="space-y-5" aria-labelledby="migration-flow-map-title">
      <div>
        <p className="overline text-gold">{copy.schematic}</p>
        <h3 id="migration-flow-map-title" className="mt-1 font-serif text-2xl text-bone">{copy.title}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-bone/60">{copy.intro}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={period === "all"} onClick={() => setPeriod("all")} className={`rounded-full border px-3 py-1.5 text-xs ${period === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/65"}`}>{copy.all}</button>
        {periods.map((item) => (
          <button key={item} type="button" aria-pressed={period === item} onClick={() => setPeriod(item)} className={`rounded-full border px-3 py-1.5 text-xs ${period === item ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/65"}`}>{item.replace("-", "–")}</button>
        ))}
      </div>

      <InonaraLeafletMap bounds={bounds} minZoom={3} maxZoom={10} ariaLabel={copy.title} className="h-[560px] w-full md:h-[680px]">
        {visibleRoutes.map((route) => {
          const style = TYPE_STYLES[route.type] || { color: "#7A6A58" };
          const [originLon, originLat] = route.origin_coordinates;
          const [destinationLon, destinationLat] = route.destination_coordinates;
          const label = localize(route.label, lang);
          const origin = localize(route.origin, lang);
          const destination = localize(route.destination, lang);
          return (
            <Fragment key={route.id}>
              <Polyline positions={routeCurve(route.origin_coordinates, route.destination_coordinates)} pathOptions={{ color: style.color, weight: 5, opacity: 0.9, dashArray: style.dashArray }}>
                <Popup>
                  <div className="max-w-[260px]">
                    <strong>{label}</strong><br />
                    <span>{route.start}–{route.end}</span><br />
                    <span>{origin} → {destination}</span>
                    {route.description && <p style={{ marginTop: 8 }}>{localize(route.description, lang)}</p>}
                  </div>
                </Popup>
              </Polyline>
              <CircleMarker center={[originLat, originLon]} radius={5} pathOptions={{ color: style.color, fillColor: "#ffffff", fillOpacity: 1, weight: 3 }}>
                <Tooltip direction="top">{origin}</Tooltip>
              </CircleMarker>
              <CircleMarker center={[destinationLat, destinationLon]} radius={8} pathOptions={{ color: "#17384a", fillColor: style.color, fillOpacity: 1, weight: 2 }}>
                <Tooltip permanent direction="bottom" offset={[0, 7]}>{destination}</Tooltip>
              </CircleMarker>
            </Fragment>
          );
        })}
      </InonaraLeafletMap>

      <aside className="rounded-2xl border border-[#b8cad8] bg-[#f5f9fb] p-5 text-[#243845]" aria-label={copy.legend}>
        <h4 className="font-serif text-xl">{copy.legend}</h4>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(copy.types).map(([type, label]) => {
            const style = TYPE_STYLES[type];
            return <div key={type} className="flex items-center gap-3 text-sm"><span className="block h-1 w-10 rounded-full" style={{ background: style?.color }} />{label}</div>;
          })}
          <div className="flex items-center gap-3 text-sm"><span className="h-4 w-4 rounded-full border-[3px] border-[#2F80A3] bg-white" />{copy.origin}</div>
          <div className="flex items-center gap-3 text-sm"><span className="h-4 w-4 rounded-full border-2 border-[#17384a] bg-[#2F80A3]" />{copy.destination}</div>
        </div>
      </aside>

      <div className="grid gap-3 md:grid-cols-2">
        {visibleRoutes.map((route) => {
          const style = TYPE_STYLES[route.type] || { color: "#7A6A58" };
          return (
            <article key={route.id} className="rounded-xl border border-bone/10 bg-bone/[0.02] p-4">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: style.color }} />
                <div>
                  <p className="text-xs uppercase tracking-wider text-gold">{copy.period} · {route.start}–{route.end}</p>
                  <h4 className="mt-1 text-bone">{localize(route.label, lang)}</h4>
                  <p className="mt-1 text-xs text-bone/55">{localize(route.origin, lang)} → {localize(route.destination, lang)}</p>
                  {route.people && <p className="mt-2 text-xs text-bone/55">{copy.people} : {localize(route.people, lang)}</p>}
                  {route.description && <p className="mt-2 text-sm leading-relaxed text-bone/65">{localize(route.description, lang)}</p>}
                  {route.source_url && <a href={route.source_url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs text-gold underline underline-offset-2">{copy.source} · {route.source_label}</a>}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {note && <p className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 text-sm leading-relaxed text-bone/70">{localize(note, lang)}</p>}
    </section>
  );
}
