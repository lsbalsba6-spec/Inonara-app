import { useMemo } from "react";
import { CircleMarker, GeoJSON, Popup, Tooltip } from "react-leaflet";
import { feature } from "topojson-client";
import worldTopo from "../data/world-countries-50m.json";
import InonaraLeafletMap, { ZoomAwareLabel } from "./InonaraLeafletMap";
import { localizedValue } from "../lib/contentSort";
import { useI18n } from "../i18n";

const COUNTRY_META = {
  NA: { numeric: "516", bounds: [[-29.3, 11.4], [-16.7, 25.5]], center: [-22.1, 17.1] },
  BW: { numeric: "072", bounds: [[-27.2, 19.7], [-17.6, 29.5]], center: [-22.2, 24.7] },
  ZA: { numeric: "710", bounds: [[-35.2, 16.0], [-22.0, 33.2]], center: [-29.0, 24.0] },
  LS: { numeric: "426", bounds: [[-30.8, 27.0], [-28.5, 29.6]], center: [-29.6, 28.2] },
  SZ: { numeric: "748", bounds: [[-27.4, 30.7], [-25.6, 32.2]], center: [-26.5, 31.5] },
  ZW: { numeric: "716", bounds: [[-22.5, 25.0], [-15.4, 33.2]], center: [-19.0, 29.2] },
  ZM: { numeric: "894", bounds: [[-18.3, 21.8], [-8.0, 33.8]], center: [-13.4, 27.8] },
  MZ: { numeric: "508", bounds: [[-27.3, 30.0], [-10.3, 41.2]], center: [-18.7, 35.5] },
  MW: { numeric: "454", bounds: [[-17.2, 32.5], [-9.2, 36.0]], center: [-13.3, 34.3] },
  AO: { numeric: "024", bounds: [[-18.2, 11.3], [-4.2, 24.2]], center: [-12.3, 17.5] },
};

const KIND_STYLE = {
  capital: { color: "#17384a", fillColor: "#17384a", radius: 7 },
  city: { color: "#2F80A3", fillColor: "#ffffff", radius: 5 },
  heritage: { color: "#9A6A2F", fillColor: "#D4AF37", radius: 6 },
  "natural-heritage": { color: "#4F8A67", fillColor: "#9CC5A1", radius: 6 },
  region: { color: "#6A7880", fillColor: "#ffffff", radius: 5 },
  river: { color: "#2F80A3", fillColor: "#8BC5DD", radius: 4 },
  mountain: { color: "#7A6A58", fillColor: "#D7C6AA", radius: 5 },
};

export function getCountryMapMeta(iso2) {
  return COUNTRY_META[String(iso2 || "").toUpperCase()] || null;
}

export function getCountryFeature(iso2) {
  const meta = getCountryMapMeta(iso2);
  if (!meta) return null;
  const countries = feature(worldTopo, worldTopo.objects.countries).features;
  return countries.find((item) => String(item.id).padStart(3, "0") === meta.numeric) || null;
}

function normalizePlace(place = {}) {
  const coordinates = Array.isArray(place.coordinates) ? place.coordinates : null;
  const lon = Number(place.lon ?? place.longitude ?? coordinates?.[0]);
  const lat = Number(place.lat ?? place.latitude ?? coordinates?.[1]);
  return { ...place, lon, lat, displayName: place.name || place.label || place.title || "" };
}

export default function CountryShapeMap({
  dossier,
  places = [],
  compact = false,
  className,
  showCountryLabel = true,
  children,
}) {
  const { lang } = useI18n();
  const iso2 = dossier?.iso2;
  const meta = getCountryMapMeta(iso2);
  const outline = useMemo(() => getCountryFeature(iso2), [iso2]);
  const countryName = localizedValue(dossier?.name || dossier?.country, lang) || dossier?.country || "";
  const normalizedPlaces = places.map(normalizePlace).filter((place) => Number.isFinite(place.lon) && Number.isFinite(place.lat));

  if (!meta) return null;

  return (
    <InonaraLeafletMap
      bounds={meta.bounds}
      minZoom={compact ? 3 : 4}
      maxZoom={12}
      ariaLabel={countryName}
      className={className || (compact ? "h-[300px] w-full md:h-[360px]" : "h-[560px] w-full md:h-[680px]")}
    >
      {outline && (
        <GeoJSON
          data={outline}
          style={{ color: "#17384a", weight: compact ? 3 : 4, fillColor: "#7EB7D1", fillOpacity: compact ? 0.18 : 0.16 }}
        />
      )}

      {showCountryLabel && meta.center && countryName && (
        <ZoomAwareLabel position={meta.center} minZoom={compact ? 3 : 4} priority="primary">
          {countryName}
        </ZoomAwareLabel>
      )}

      {normalizedPlaces.map((place, index) => {
        const style = KIND_STYLE[place.kind] || KIND_STYLE.city;
        const label = localizedValue(place.displayName, lang);
        const permanent = place.kind === "capital";
        return (
          <CircleMarker
            key={place.id || `${label}-${index}`}
            center={[place.lat, place.lon]}
            radius={style.radius}
            pathOptions={{ color: style.color, fillColor: style.fillColor, fillOpacity: 0.95, weight: 2 }}
          >
            <Tooltip permanent={permanent} direction="top" offset={[0, -5]}>{label}</Tooltip>
            <Popup><strong>{label}</strong></Popup>
          </CircleMarker>
        );
      })}

      {children}
    </InonaraLeafletMap>
  );
}
