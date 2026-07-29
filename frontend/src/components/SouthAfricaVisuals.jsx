import { useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldTopo from "../data/world-countries-50m.json";

const ROUTE_COLORS = {
  forced: "#B23A2B",
  "coerced-labour": "#D58A2A",
  "colonial-settlement": "#78909C",
  voluntary: "#4F8A67",
};

const COUNTRY_IDS = new Set(["710", "426", "748", "516", "072", "716", "508"]);

export function CurrentSouthAfricaFlag({ className = "" }) {
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
  const [layer, setLayer] = useState("all");
  const mapData = useMemo(() => {
    const all = feature(worldTopo, worldTopo.objects.countries).features;
    const southAfrica = all.find((item) => String(item.id).padStart(3, "0") === "710");
    if (!southAfrica) return null;
    const region = all.filter((item) => COUNTRY_IDS.has(String(item.id).padStart(3, "0")));
    const projection = geoMercator().fitExtent([[22, 22], [1078, 678]], southAfrica);
    return { southAfrica, region, projection, path: geoPath(projection) };
  }, []);

  if (!mapData) {
    return <div className="rounded-xl border border-red-400/20 p-4 text-sm text-bone/70">La géométrie de l'Afrique du Sud n'a pas pu être chargée.</div>;
  }

  const visibleCities = cities.filter((city) => layer === "all" || city.group === layer);
  const { southAfrica, region, projection, path } = mapData;
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {[['all','Tout'],['national','Capitales nationales'],['province','Capitales provinciales'],['major','Grandes villes']].map(([id,label]) => (
          <button key={id} onClick={() => setLayer(id)} className={`rounded-full border px-3 py-1 text-xs ${layer === id ? "border-gold text-gold" : "border-bone/15 text-bone/60"}`}>{label}</button>
        ))}
      </div>
      <div className="overflow-hidden rounded-xl border border-bone/10 bg-[#151210] p-3">
        <svg viewBox="0 0 1100 700" className="min-h-[520px] w-full md:min-h-[650px]" role="img" aria-label="Carte détaillée de l'Afrique du Sud avec capitales et grandes villes">
          <rect width="1100" height="700" fill="#151210" />
          {region.map((country) => <path key={country.id} d={path(country)} fill={String(country.id).padStart(3,"0") === "710" ? "#744534" : "#2A2421"} stroke={String(country.id).padStart(3,"0") === "710" ? "#D4AF37" : "#554A43"} strokeWidth={String(country.id).padStart(3,"0") === "710" ? 2.2 : 0.8} />)}
          <path d={path(southAfrica)} fill="none" stroke="#E7C66D" strokeWidth="2.5" />
          <text x="105" y="620" fill="#7797B8" fontSize="15">Océan Atlantique</text>
          <text x="860" y="570" fill="#7797B8" fontSize="15">Océan Indien</text>
          {visibleCities.map((city) => {
            const point = projection(city.coordinates);
            if (!point) return null;
            const isNational = city.group === "national";
            return <g key={city.name} transform={`translate(${point[0]} ${point[1]})`}>
              <circle r={isNational ? 6 : city.group === "province" ? 4.5 : 3.5} fill={isNational ? "#FFD166" : city.group === "province" ? "#D4AF37" : "#F4E8D0"} stroke="#151210" strokeWidth="1.5" />
              <text x="8" y="4" fontSize={isNational ? 12 : 10.5} fill="#F4E8D0" stroke="#151210" strokeWidth="3" paintOrder="stroke">{city.name}</text>
            </g>;
          })}
        </svg>
      </div>
      <div className="flex flex-wrap gap-4 text-xs text-bone/55"><span>● Capitales nationales</span><span>● Capitales provinciales</span><span>● Grandes villes</span></div>
      <p className="text-xs leading-relaxed text-bone/50">Contour national réel issu du fond cartographique du projet. Les marqueurs indiquent les trois capitales nationales, les neuf capitales provinciales et plusieurs grandes villes. Cette carte contemporaine ne doit pas être utilisée pour représenter les territoires anciens.</p>
    </div>
  );
}

function curvedPath(projection, route) {
  const a = projection(route.origin_coordinates);
  const b = projection(route.destination_coordinates);
  if (!a || !b) return null;
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2 - Math.max(24, Math.abs(a[0] - b[0]) * 0.14);
  return `M ${a[0]} ${a[1]} Q ${mx} ${my} ${b[0]} ${b[1]}`;
}

export function SouthAfricaMigrationMap({ routes = [], note }) {
  const periods = useMemo(() => [...new Set(routes.map((route) => `${route.start}-${route.end}`))], [routes]);
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const countries = useMemo(() => feature(worldTopo, worldTopo.objects.countries), []);
  const projection = useMemo(() => {
    const coordinates = routes.flatMap((route) => [route.origin_coordinates, route.destination_coordinates]).filter(Boolean);
    const geometry = { type: "Feature", properties: {}, geometry: { type: "MultiPoint", coordinates } };
    return geoMercator().fitExtent([[55, 45], [945, 555]], geometry);
  }, [routes]);
  const path = useMemo(() => geoPath(projection), [projection]);
  const visibleRoutes = selectedPeriod === "all" ? routes : routes.filter((route) => `${route.start}-${route.end}` === selectedPeriod);

  return <div className="space-y-4">
    <div className="flex flex-wrap gap-2">
      <button onClick={() => setSelectedPeriod("all")} className={`rounded-full border px-3 py-1 text-xs ${selectedPeriod === "all" ? "border-gold text-gold" : "border-bone/15 text-bone/60"}`}>Toutes les périodes</button>
      {periods.map((period) => <button key={period} onClick={() => setSelectedPeriod(period)} className={`rounded-full border px-3 py-1 text-xs ${selectedPeriod === period ? "border-gold text-gold" : "border-bone/15 text-bone/60"}`}>{period.replace("-", "–")}</button>)}
    </div>
    <div className="overflow-hidden rounded-xl border border-bone/10 bg-[#151210] p-3">
      <svg viewBox="0 0 1000 600" className="w-full" role="img" aria-label="Routes historiques documentées concernant l'Afrique du Sud">
        <defs>{Object.entries(ROUTE_COLORS).map(([key,color]) => <marker key={key} id={`arrow-${key}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={color} /></marker>)}</defs>
        <rect width="1000" height="600" fill="#151210" />
        {countries.features.map((country) => <path key={country.id} d={path(country)} fill={String(country.id).padStart(3,"0") === "710" ? "#744534" : "#2A2421"} stroke="#4C413A" strokeWidth="0.45" />)}
        {visibleRoutes.map((route) => {
          const color = ROUTE_COLORS[route.type] || "#D4AF37";
          const d = curvedPath(projection, route);
          const origin = projection(route.origin_coordinates);
          const destination = projection(route.destination_coordinates);
          if (!d || !origin || !destination) return null;
          return <g key={route.id}>
            <path d={d} fill="none" stroke="#0E0C0B" strokeWidth="7" opacity="0.75" />
            <path d={d} fill="none" stroke={color} strokeWidth="3.5" strokeDasharray={route.type === "colonial-settlement" ? "9 6" : undefined} markerEnd={`url(#arrow-${route.type})`} opacity="0.98" />
            <circle cx={origin[0]} cy={origin[1]} r="4" fill={color} stroke="#151210" strokeWidth="1.5" />
            <circle cx={destination[0]} cy={destination[1]} r="5" fill={color} stroke="#F4E8D0" strokeWidth="1.3" />
          </g>;
        })}
        {[...new Map(visibleRoutes.flatMap((route) => [
          [route.origin, route.origin_coordinates],
          [route.destination, route.destination_coordinates],
        ]).filter(([, coordinates]) => coordinates).map(([name, coordinates]) => [name, coordinates])).entries()].map(([name, coordinates]) => {
          const point = projection(coordinates);
          if (!point) return null;
          return <text key={name} x={point[0] + 7} y={point[1] - 7} fill="#F4E8D0" fontSize="12" stroke="#151210" strokeWidth="3" paintOrder="stroke">{name}</text>;
        })}
      </svg>
    </div>
    <div className="flex flex-wrap gap-4 text-xs text-bone/60">{Object.entries({forced:'Forcée','coerced-labour':'Travail sous contrainte','colonial-settlement':'Installation coloniale',voluntary:'Volontaire'}).map(([type,label]) => <span key={type} className="inline-flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full" style={{backgroundColor:ROUTE_COLORS[type]}} />{label}</span>)}</div>
    <div className="grid gap-3 md:grid-cols-2">{visibleRoutes.map((route) => <article key={route.id} className="rounded-lg border border-bone/10 p-3"><p className="text-xs uppercase tracking-wider text-gold">{route.start}–{route.end}</p><h4 className="mt-1 text-bone">{route.label}</h4><p className="mt-1 text-xs text-bone/50">{route.origin} → {route.destination}</p></article>)}</div>
    {note && <p className="rounded-lg border border-amber-400/20 bg-amber-400/[0.04] p-4 text-sm leading-relaxed text-bone/70">{note}</p>}
  </div>;
}
