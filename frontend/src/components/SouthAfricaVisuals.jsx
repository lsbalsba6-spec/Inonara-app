import { Fragment, useEffect, useMemo, useState } from "react";
import {
  CircleMarker,
  GeoJSON,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import { feature } from "topojson-client";
import worldTopo from "../data/world-countries-50m.json";

const ROUTE_COLORS = {
  forced: "#B23A2B",
  "coerced-labour": "#D58A2A",
  "colonial-settlement": "#78909C",
  voluntary: "#4F8A67",
};

const ROUTE_LABELS = {
  forced: "Migration forcée",
  "coerced-labour": "Travail sous contrainte",
  "colonial-settlement": "Installation coloniale",
  voluntary: "Migration volontaire",
};

const SOUTH_AFRICA_BOUNDS = [
  [-35.2, 16.0],
  [-22.0, 33.2],
];

const CITY_FILTERS = [
  ["all", "Tout afficher"],
  ["national", "Capitales nationales"],
  ["province", "Capitales provinciales"],
  ["major", "Grandes villes"],
];

function FitBounds({ bounds, padding = [24, 24] }) {
  const map = useMap();

  useEffect(() => {
    if (bounds?.length === 2) {
      map.fitBounds(bounds, { padding, animate: false });
    }
  }, [bounds, map]);

  return null;
}

function RouteLegend() {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-bone/70">
      {Object.entries(ROUTE_LABELS).map(([type, label]) => (
        <span key={type} className="inline-flex items-center gap-2">
          <i
            className="h-2.5 w-7 rounded-full"
            style={{ backgroundColor: ROUTE_COLORS[type] }}
          />
          {label}
        </span>
      ))}
    </div>
  );
}

function routeCurve(origin, destination, steps = 36) {
  if (!origin || !destination) return [];
  const [originLon, originLat] = origin;
  const [destinationLon, destinationLat] = destination;
  const longitudeDistance = Math.abs(destinationLon - originLon);
  const arcHeight = Math.min(18, Math.max(4, longitudeDistance * 0.12));

  return Array.from({ length: steps + 1 }, (_, index) => {
    const t = index / steps;
    const lat =
      originLat +
      (destinationLat - originLat) * t +
      Math.sin(Math.PI * t) * arcHeight;
    const lon = originLon + (destinationLon - originLon) * t;
    return [lat, lon];
  });
}

function migrationBounds(routes) {
  const points = routes.flatMap((route) => [
    route.origin_coordinates,
    route.destination_coordinates,
  ]).filter(Boolean);

  if (!points.length) return [[-40, -15], [60, 120]];

  const lats = points.map(([, lat]) => lat);
  const lons = points.map(([lon]) => lon);
  const south = Math.max(-65, Math.min(...lats) - 8);
  const north = Math.min(75, Math.max(...lats) + 8);
  const west = Math.max(-180, Math.min(...lons) - 10);
  const east = Math.min(180, Math.max(...lons) + 10);
  return [[south, west], [north, east]];
}

export function CurrentSouthAfricaFlag({ className = "" }) {
  return (
    <svg
      viewBox="0 0 900 600"
      role="img"
      aria-label="Drapeau actuel de l'Afrique du Sud"
      className={className}
    >
      <rect width="900" height="600" fill="#DE3831" />
      <rect y="400" width="900" height="200" fill="#002395" />
      <path d="M0 0 L360 300 L0 600 Z" fill="#000" />
      <path d="M0 45 L306 300 L0 555" fill="none" stroke="#FFB612" strokeWidth="90" />
      <path d="M0 80 L264 300 L0 520 M264 300 H900" fill="none" stroke="#FFF" strokeWidth="120" />
      <path d="M0 80 L264 300 L0 520 M264 300 H900" fill="none" stroke="#007A4D" strokeWidth="72" />
    </svg>
  );
}

function UnionJackFlag({ className = "" }) {
  return (
    <svg viewBox="0 0 900 600" role="img" aria-label="Union Jack utilisé dans l'Union sud-africaine" className={className}>
      <rect width="900" height="600" fill="#012169" />
      <path d="M0 0 L900 600 M900 0 L0 600" stroke="#FFF" strokeWidth="120" />
      <path d="M0 0 L900 600 M900 0 L0 600" stroke="#C8102E" strokeWidth="48" />
      <path d="M450 0 V600 M0 300 H900" stroke="#FFF" strokeWidth="180" />
      <path d="M450 0 V600 M0 300 H900" stroke="#C8102E" strokeWidth="100" />
    </svg>
  );
}

function HistoricalFlag1928({ className = "" }) {
  return (
    <svg viewBox="0 0 900 600" role="img" aria-label="Drapeau sud-africain utilisé de 1928 à 1994" className={className}>
      <rect width="900" height="200" fill="#FF7A00" />
      <rect y="200" width="900" height="200" fill="#FFF" />
      <rect y="400" width="900" height="200" fill="#003DA5" />
      <rect x="250" y="245" width="120" height="72" fill="#012169" />
      <path d="M250 245 L370 317 M370 245 L250 317" stroke="#FFF" strokeWidth="18" />
      <path d="M310 245 V317 M250 281 H370" stroke="#FFF" strokeWidth="24" />
      <path d="M310 245 V317 M250 281 H370" stroke="#C8102E" strokeWidth="12" />
      <rect x="390" y="245" width="120" height="72" fill="#FFF" stroke="#C96A00" strokeWidth="4" />
      <path d="M390 257 H510 M390 281 H510 M390 305 H510" stroke="#FF7A00" strokeWidth="8" />
      <rect x="530" y="245" width="120" height="72" fill="#007A4D" />
      <rect x="566" y="245" width="84" height="72" fill="#E03C31" />
      <rect x="566" y="269" width="84" height="24" fill="#FFF" />
      <rect x="566" y="276" width="84" height="10" fill="#002395" />
    </svg>
  );
}

export function SouthAfricaFlagHistory({ items = [] }) {
  const renderFlag = (variant) => {
    if (variant === "current") return <CurrentSouthAfricaFlag className="h-full w-full" />;
    if (variant === "1928") return <HistoricalFlag1928 className="h-full w-full" />;
    return <UnionJackFlag className="h-full w-full" />;
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <article key={item.id} className="rounded-xl border border-bone/10 bg-bone/[0.025] p-4">
          <div className="aspect-[3/2] overflow-hidden rounded-md border border-bone/10">
            {renderFlag(item.variant)}
          </div>
          <p className="mt-3 text-xs uppercase tracking-widest text-gold">
            {item.start}–{item.end || "aujourd'hui"}
          </p>
          <h3 className="mt-1 font-serif text-lg text-bone">{item.label}</h3>
          <p className="mt-2 text-sm leading-relaxed text-bone/65">{item.note}</p>
        </article>
      ))}
    </div>
  );
}

function southAfricaGeoJson() {
  const countries = feature(worldTopo, worldTopo.objects.countries).features;
  return countries.find((item) => String(item.id).padStart(3, "0") === "710") || null;
}

export function SouthAfricaCountryMap({ cities = [] }) {
  const [layer, setLayer] = useState("all");
  const outline = useMemo(() => southAfricaGeoJson(), []);
  const visibleCities = cities.filter((city) => layer === "all" || city.group === layer);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {CITY_FILTERS.map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setLayer(id)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              layer === id
                ? "border-gold bg-gold/10 text-gold"
                : "border-bone/15 text-bone/65 hover:border-bone/30"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-bone/10 bg-[#151210] shadow-2xl">
        <MapContainer
          bounds={SOUTH_AFRICA_BOUNDS}
          scrollWheelZoom
          minZoom={4}
          maxZoom={12}
          className="h-[620px] w-full md:h-[720px]"
          attributionControl
        >
          <FitBounds bounds={SOUTH_AFRICA_BOUNDS} padding={[18, 18]} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {outline && (
            <GeoJSON
              data={outline}
              style={{
                color: "#D4AF37",
                weight: 3,
                fillColor: "#7B2D26",
                fillOpacity: 0.09,
              }}
            />
          )}
          {visibleCities.map((city) => {
            const [lon, lat] = city.coordinates;
            const isNational = city.group === "national";
            const isProvince = city.group === "province";
            return (
              <CircleMarker
                key={`${city.name}-${city.kind}`}
                center={[lat, lon]}
                radius={isNational ? 8 : isProvince ? 6 : 4.5}
                pathOptions={{
                  color: "#151210",
                  weight: 2,
                  fillColor: isNational ? "#FFD166" : isProvince ? "#D4AF37" : "#F4E8D0",
                  fillOpacity: 1,
                }}
              >
                <Tooltip permanent={isNational} direction="top" offset={[0, -5]}>
                  {city.name}
                </Tooltip>
                <Popup>
                  <strong>{city.name}</strong>
                  <br />
                  {isNational
                    ? "Capitale nationale"
                    : isProvince
                      ? "Capitale provinciale"
                      : "Grande ville"}
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>

      <div className="grid gap-3 text-xs text-bone/60 sm:grid-cols-3">
        <span>● Jaune clair : capitales nationales</span>
        <span>● Or : capitales provinciales</span>
        <span>● Ivoire : grandes villes</span>
      </div>
      <p className="text-xs leading-relaxed text-bone/50">
        Carte contemporaine interactive. Zoomez, déplacez la carte et cliquez sur les marqueurs. Le fond OpenStreetMap permet d’afficher les routes, les frontières provinciales, les reliefs et les localités à mesure que le niveau de zoom augmente. Le contour national est renforcé par-dessus le fond cartographique d’Inonara.
      </p>
    </div>
  );
}

export function SouthAfricaMigrationMap({ routes = [], note }) {
  const periods = useMemo(
    () => [...new Set(routes.map((route) => `${route.start}-${route.end}`))],
    [routes],
  );
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const visibleRoutes = selectedPeriod === "all"
    ? routes
    : routes.filter((route) => `${route.start}-${route.end}` === selectedPeriod);
  const bounds = useMemo(() => migrationBounds(visibleRoutes), [visibleRoutes]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedPeriod("all")}
          className={`rounded-full border px-3 py-1.5 text-xs ${
            selectedPeriod === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/65"
          }`}
        >
          Toutes les périodes
        </button>
        {periods.map((period) => (
          <button
            type="button"
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`rounded-full border px-3 py-1.5 text-xs ${
              selectedPeriod === period ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/65"
            }`}
          >
            {period.replace("-", "–")}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-bone/10 bg-[#151210] shadow-2xl">
        <MapContainer
          bounds={bounds}
          scrollWheelZoom
          minZoom={2}
          maxZoom={8}
          className="h-[560px] w-full md:h-[680px]"
          attributionControl
        >
          <FitBounds bounds={bounds} padding={[30, 30]} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {visibleRoutes.map((route) => {
            const positions = routeCurve(route.origin_coordinates, route.destination_coordinates);
            const color = ROUTE_COLORS[route.type] || "#D4AF37";
            const [originLon, originLat] = route.origin_coordinates;
            const [destinationLon, destinationLat] = route.destination_coordinates;
            return (
              <Fragment key={route.id}>
                <Polyline
                  positions={positions}
                  pathOptions={{
                    color,
                    weight: 5,
                    opacity: 0.88,
                    dashArray: route.type === "forced" ? "10 7" : undefined,
                  }}
                >
                  <Popup>
                    <strong>{route.label}</strong>
                    <br />
                    {route.start}–{route.end}
                    <br />
                    {ROUTE_LABELS[route.type] || route.type}
                  </Popup>
                </Polyline>
                <CircleMarker
                  center={[originLat, originLon]}
                  radius={6}
                  pathOptions={{ color: "#151210", weight: 2, fillColor: color, fillOpacity: 1 }}
                >
                  <Tooltip permanent direction="top" offset={[0, -5]}>{route.origin}</Tooltip>
                </CircleMarker>
                <CircleMarker
                  center={[destinationLat, destinationLon]}
                  radius={7}
                  pathOptions={{ color: "#151210", weight: 2, fillColor: "#D4AF37", fillOpacity: 1 }}
                >
                  <Tooltip permanent direction="bottom" offset={[0, 6]}>{route.destination}</Tooltip>
                </CircleMarker>
              </Fragment>
            );
          })}
        </MapContainer>
      </div>

      <RouteLegend />

      <div className="grid gap-3 md:grid-cols-2">
        {visibleRoutes.map((route) => (
          <article key={route.id} className="rounded-lg border border-bone/10 p-3">
            <p className="text-xs uppercase tracking-wider text-gold">{route.start}–{route.end}</p>
            <h4 className="mt-1 text-bone">{route.label}</h4>
            <p className="mt-1 text-xs text-bone/55">{route.origin} → {route.destination}</p>
          </article>
        ))}
      </div>

      {note && (
        <p className="rounded-lg border border-amber-400/20 bg-amber-400/[0.04] p-4 text-sm leading-relaxed text-bone/70">
          {note}
        </p>
      )}
    </div>
  );
}
