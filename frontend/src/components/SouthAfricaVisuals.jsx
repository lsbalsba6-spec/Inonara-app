import { useMemo, useState } from "react";
import { geoEqualEarth, geoMercator, geoPath, geoInterpolate } from "d3-geo";
import { feature } from "topojson-client";
import worldTopo from "../data/world-countries-50m.json";

const ROUTE_COLORS = {
  forced: "#B23A2B",
  "coerced-labour": "#D58A2A",
  "colonial-settlement": "#78909C",
  voluntary: "#4F8A67",
};

function CurrentFlag({ className = "" }) {
  return (
    <svg viewBox="0 0 900 600" role="img" aria-label="Drapeau actuel de l'Afrique du Sud" className={className}>
      <rect width="900" height="600" fill="#DE3831" />
      <rect y="400" width="900" height="200" fill="#002395" />
      <path d="M0 0 L360 300 L0 600 Z" fill="#000" />
      <path d="M0 45 L306 300 L0 555" fill="none" stroke="#FFB612" strokeWidth="90" />
      <path d="M0 80 L264 300 L0 520 M264 300 H900" fill="none" stroke="#FFF" strokeWidth="120" />
      <path d="M0 80 L264 300 L0 520 M264 300 H900" fill="none" stroke="#007A4D" strokeWidth="72" />
    </svg>
  );
}

function UnionJack({ x = 0, y = 0, width = 180, height = 110 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${width / 180} ${height / 110})`}>
      <rect width="180" height="110" fill="#012169" />
      <path d="M0 0 L180 110 M180 0 L0 110" stroke="#FFF" strokeWidth="24" />
      <path d="M0 0 L180 110 M180 0 L0 110" stroke="#C8102E" strokeWidth="10" />
      <path d="M90 0 V110 M0 55 H180" stroke="#FFF" strokeWidth="36" />
      <path d="M90 0 V110 M0 55 H180" stroke="#C8102E" strokeWidth="20" />
    </g>
  );
}

function HistoricalFlag1928({ className = "" }) {
  return (
    <svg viewBox="0 0 900 600" role="img" aria-label="Drapeau sud-africain utilisé de 1928 à 1994" className={className}>
      <rect width="900" height="200" fill="#FF7A00" />
      <rect y="200" width="900" height="200" fill="#FFF" />
      <rect y="400" width="900" height="200" fill="#003DA5" />
      <UnionJack x={270} y={245} width={120} height={72} />
      <g transform="translate(410 245)">
        <rect width="120" height="72" fill="#FFF" stroke="#C96A00" strokeWidth="4" />
        <path d="M0 12 H120 M0 36 H120 M0 60 H120" stroke="#FF7A00" strokeWidth="8" />
        <rect x="0" width="34" height="72" fill="#FFF" />
      </g>
      <g transform="translate(550 245)">
        <rect width="120" height="72" fill="#007A4D" />
        <rect x="36" width="84" height="72" fill="#E03C31" />
        <rect x="36" y="24" width="84" height="24" fill="#FFF" />
        <rect x="36" y="31" width="84" height="10" fill="#002395" />
      </g>
    </svg>
  );
}

function UnionEraFlag({ className = "" }) {
  return <UnionJack width={900} height={600} className={className} />;
}

export function SouthAfricaFlagHistory({ items = [] }) {
  const renderFlag = (variant) => {
    if (variant === "current") return <CurrentFlag className="w-full rounded-md shadow-lg" />;
    if (variant === "1928") return <HistoricalFlag1928 className="w-full rounded-md shadow-lg" />;
    return <UnionEraFlag className="w-full rounded-md shadow-lg" />;
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <article key={item.id} className="rounded-xl border border-bone/10 bg-bone/[0.025] p-4">
          <div className="aspect-[3/2] overflow-hidden rounded-md border border-bone/10">{renderFlag(item.variant)}</div>
          <p className="mt-3 text-xs uppercase tracking-widest text-gold">{item.start}–{item.end || "aujourd'hui"}</p>
          <h3 className="mt-1 font-serif text-lg text-bone">{item.label}</h3>
          <p className="mt-2 text-sm leading-relaxed text-bone/65">{item.note}</p>
        </article>
      ))}
    </div>
  );
}

export function SouthAfricaCountryMap({ cities = [] }) {
  const { path, country } = useMemo(() => {
    const countries = feature(worldTopo, worldTopo.objects.countries).features;
    const southAfrica = countries.find((item) => String(item.id) === "710");
    const projection = geoMercator().fitExtent([[28, 28], [772, 472]], southAfrica);
    return { path: geoPath(projection), country: southAfrica, projection };
  }, []);

  const projection = useMemo(() => geoMercator().fitExtent([[28, 28], [772, 472]], country), [country]);

  return (
    <div className="rounded-xl border border-bone/10 bg-[#151210] p-3">
      <svg viewBox="0 0 800 500" className="w-full" role="img" aria-label="Carte de l'Afrique du Sud avec principales villes">
        <path d={path(country)} fill="#7F4C38" stroke="#D4AF37" strokeWidth="2" />
        {cities.map((city) => {
          const point = projection(city.coordinates);
          if (!point) return null;
          return (
            <g key={city.name} transform={`translate(${point[0]} ${point[1]})`}>
              <circle r={city.kind.includes("capital") ? 5 : 3.5} fill="#D4AF37" stroke="#151210" strokeWidth="1.5" />
              <text x="8" y="4" fontSize="11" fill="#F4E8D0" stroke="#151210" strokeWidth="3" paintOrder="stroke">{city.name}</text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs leading-relaxed text-bone/50">Carte contemporaine : elle situe quelques villes majeures et capitales institutionnelles. Elle ne représente pas les limites des polities anciennes.</p>
    </div>
  );
}

function routeLine(route) {
  const interpolate = geoInterpolate(route.origin_coordinates, route.destination_coordinates);
  return {
    type: "LineString",
    coordinates: Array.from({ length: 48 }, (_, index) => interpolate(index / 47)),
  };
}

export function SouthAfricaMigrationMap({ routes = [], note }) {
  const periods = useMemo(() => [...new Set(routes.map((route) => `${route.start}-${route.end}`))], [routes]);
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0] || "all");
  const countries = useMemo(() => feature(worldTopo, worldTopo.objects.countries), []);
  const projection = useMemo(() => geoEqualEarth().fitExtent([[12, 12], [988, 488]], { type: "Sphere" }), []);
  const path = useMemo(() => geoPath(projection), [projection]);
  const visibleRoutes = selectedPeriod === "all" ? routes : routes.filter((route) => `${route.start}-${route.end}` === selectedPeriod);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setSelectedPeriod("all")} className={`rounded-full border px-3 py-1 text-xs ${selectedPeriod === "all" ? "border-gold text-gold" : "border-bone/15 text-bone/60"}`}>Toutes les périodes</button>
        {periods.map((period) => <button key={period} onClick={() => setSelectedPeriod(period)} className={`rounded-full border px-3 py-1 text-xs ${selectedPeriod === period ? "border-gold text-gold" : "border-bone/15 text-bone/60"}`}>{period.replace("-", "–")}</button>)}
      </div>
      <div className="rounded-xl border border-bone/10 bg-[#151210] p-3 overflow-hidden">
        <svg viewBox="0 0 1000 500" className="w-full" role="img" aria-label="Routes migratoires documentées concernant l'Afrique du Sud">
          <path d={path({ type: "Sphere" })} fill="#111" stroke="#3D3530" />
          {countries.features.map((country) => <path key={country.id} d={path(country)} fill="#2A2421" stroke="#4C413A" strokeWidth="0.35" />)}
          {visibleRoutes.map((route) => {
            const color = ROUTE_COLORS[route.type] || "#D4AF37";
            const origin = projection(route.origin_coordinates);
            const destination = projection(route.destination_coordinates);
            return (
              <g key={route.id}>
                <path d={path(routeLine(route))} fill="none" stroke={color} strokeWidth="2.4" strokeDasharray={route.type === "colonial-settlement" ? "7 5" : undefined} opacity="0.9" />
                {origin && <circle cx={origin[0]} cy={origin[1]} r="3" fill={color} />}
                {destination && <circle cx={destination[0]} cy={destination[1]} r="4" fill={color} stroke="#F4E8D0" strokeWidth="1" />}
              </g>
            );
          })}
        </svg>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {visibleRoutes.map((route) => <article key={route.id} className="rounded-lg border border-bone/10 p-3"><div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ROUTE_COLORS[route.type] || "#D4AF37" }} /><p className="text-xs uppercase tracking-wider text-gold">{route.start}–{route.end}</p></div><h4 className="mt-1 text-bone">{route.label}</h4><p className="mt-1 text-xs text-bone/50">{route.origin} → {route.destination}</p></article>)}
      </div>
      <p className="text-xs leading-relaxed text-bone/50">{note}</p>
    </div>
  );
}
