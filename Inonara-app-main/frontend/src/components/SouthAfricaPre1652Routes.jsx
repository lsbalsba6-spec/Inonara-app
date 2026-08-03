import { useEffect, useMemo, useState } from "react";
import {
  Circle,
  CircleMarker,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";

const STYLE = {
  "ancient-mobility": { color: "#BFA76F", label: "Mobilité ancienne", dashArray: "5 8" },
  "pastoral-diffusion": { color: "#D58A2A", label: "Diffusion pastorale", dashArray: "12 8" },
  "farming-dispersal": { color: "#4F8A67", label: "Installations agricoles", dashArray: "10 7" },
  "trade-network": { color: "#4E8CBF", label: "Réseau commercial intérieur", dashArray: undefined },
  "maritime-trade": { color: "#2F9CA6", label: "Commerce côtier et maritime", dashArray: "14 6" },
  "regional-connection": { color: "#9A6FB0", label: "Connexion régionale", dashArray: "4 7" },
  "political-zone": { color: "#C49A4A", label: "Centre politique (aire approximative)", dashArray: "3 6" },
};

const STATUS = {
  ready: "Établi",
  provisional: "À nuancer",
  disputed: "Débattu",
};

function FitBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds?.length === 2) map.fitBounds(bounds, { padding: [26, 26], animate: false });
  }, [bounds, map]);
  return null;
}

function SourceLinks({ ids = [], sourceMap }) {
  return (
    <div className="mt-2 space-y-1">
      {ids.map((id) => {
        const source = sourceMap?.get(id);
        if (!source) return null;
        return (
          <a key={id} href={source.url} target="_blank" rel="noreferrer" className="block text-xs text-gold underline">
            {source.publisher}: {source.title}
          </a>
        );
      })}
    </div>
  );
}

function displayPeriod(item) {
  if (item.start == null) return item.period || "datation variable";
  const format = (year) => (year < 0 ? `${Math.abs(year)} av. n. è.` : year);
  return `${format(item.start)}–${format(item.end)}`;
}

export default function SouthAfricaPre1652Routes({ data, sourceMap }) {
  const [type, setType] = useState("all");
  const corridors = useMemo(() => data?.corridors || [], [data?.corridors]);
  const zones = useMemo(() => data?.mobility_zones || [], [data?.mobility_zones]);
  const politicalZones = useMemo(() => data?.political_zones || [], [data?.political_zones]);
  const sites = useMemo(() => data?.sites || [], [data?.sites]);
  const visibleCorridors = useMemo(
    () => (type === "all" ? corridors : corridors.filter((item) => item.type === type)),
    [corridors, type],
  );
  const visibleZones = type === "all" || type === "ancient-mobility" ? zones : [];
  const visiblePoliticalZones = type === "all" || type === "political-zone" ? politicalZones : [];

  if (!data) return null;

  return (
    <section className="space-y-4 rounded-2xl border border-gold/20 bg-[#151210] p-4 md:p-5">
      <div>
        <p className="overline text-gold">Carte interactive</p>
        <h2 className="mt-1 font-serif text-2xl text-bone">{data.title}</h2>
        <p className="mt-2 max-w-4xl text-sm leading-relaxed text-bone/65">{data.subtitle}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setType("all")} className={`rounded-full border px-3 py-1.5 text-xs ${type === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/65"}`}>
          Tout afficher
        </button>
        {Object.entries(STYLE).map(([id, style]) => (
          <button key={id} type="button" onClick={() => setType(id)} className={`rounded-full border px-3 py-1.5 text-xs ${type === id ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/65"}`}>
            {style.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-bone/10">
        <MapContainer bounds={data.bounds} minZoom={3} maxZoom={9} scrollWheelZoom className="h-[580px] w-full md:h-[690px]">
          <FitBounds bounds={data.bounds} />
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {visibleZones.map((zone) => {
            const style = STYLE[zone.type] || STYLE["ancient-mobility"];
            const [lon, lat] = zone.center;
            return (
              <Circle key={zone.id} center={[lat, lon]} radius={zone.radius_km * 1000} pathOptions={{ color: style.color, fillColor: style.color, fillOpacity: 0.10, opacity: 0.65, weight: 2, dashArray: style.dashArray }}>
                <Popup>
                  <strong>{zone.label}</strong><br />
                  {displayPeriod(zone)} · {STATUS[zone.status] || zone.status}
                  <p>{zone.note}</p>
                  <SourceLinks ids={zone.sources} sourceMap={sourceMap} />
                </Popup>
              </Circle>
            );
          })}

          {visiblePoliticalZones.map((zone) => {
            const style = STYLE[zone.type] || STYLE["political-zone"];
            const [lon, lat] = zone.center;
            return (
              <Circle key={zone.id} center={[lat, lon]} radius={zone.radius_km * 1000} pathOptions={{ color: style.color, fillColor: style.color, fillOpacity: 0.08, opacity: 0.8, weight: 2.5, dashArray: style.dashArray }}>
                <Tooltip sticky>{zone.label}</Tooltip>
                <Popup>
                  <strong>{zone.label}</strong><br />
                  {displayPeriod(zone)} · {STATUS[zone.status] || zone.status}
                  <p>{zone.note}</p>
                  <SourceLinks ids={zone.sources} sourceMap={sourceMap} />
                </Popup>
              </Circle>
            );
          })}

          {visibleCorridors.map((route) => {
            const style = STYLE[route.type] || STYLE["trade-network"];
            const positions = route.path.map(([lon, lat]) => [lat, lon]);
            return (
              <Polyline key={route.id} positions={positions} pathOptions={{ color: style.color, weight: 6, opacity: 0.86, dashArray: style.dashArray, lineCap: "round", lineJoin: "round" }}>
                <Tooltip sticky>{route.label}</Tooltip>
                <Popup>
                  <strong>{route.label}</strong><br />
                  {displayPeriod(route)} · {STATUS[route.status] || route.status}
                  <p>{route.note}</p>
                  {route.goods?.length > 0 && (
                    <p><strong>Biens documentés :</strong> {route.goods.join(", ")}</p>
                  )}
                  <SourceLinks ids={route.sources} sourceMap={sourceMap} />
                </Popup>
              </Polyline>
            );
          })}

          {sites.map((site) => {
            const [lon, lat] = site.coordinates;
            return (
              <CircleMarker key={site.id} center={[lat, lon]} radius={6} pathOptions={{ color: "#151210", weight: 2, fillColor: "#FFD166", fillOpacity: 1 }}>
                <Tooltip direction="top">{site.label}</Tooltip>
                <Popup>
                  <strong>{site.label}</strong><br />{site.period}
                  <SourceLinks ids={site.sources} sourceMap={sourceMap} />
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-bone/65">
        {Object.entries(STYLE).map(([id, style]) => (
          <span key={id} className="inline-flex items-center gap-2">
            <i className="h-2.5 w-7 rounded-full" style={{ backgroundColor: style.color }} />{style.label}
          </span>
        ))}
      </div>
      <p className="rounded-lg border border-amber-300/20 bg-amber-300/[0.05] p-3 text-xs leading-relaxed text-bone/60">
        {data.display_rules?.public_warning}
      </p>
    </section>
  );
}
