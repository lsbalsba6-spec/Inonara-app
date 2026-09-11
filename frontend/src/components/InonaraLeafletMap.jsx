import { useEffect, useState } from "react";
import { CircleMarker, MapContainer, TileLayer, Tooltip, useMap, useMapEvents } from "react-leaflet";

const CARTO_LIGHT = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

function FitBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds?.length === 2) map.fitBounds(bounds, { padding: [28, 28], animate: false });
  }, [bounds, map]);
  return null;
}

function ZoomAwareLabel({ position, children, minZoom = 5, maxZoom = 18, priority = "secondary" }) {
  const map = useMap();
  const [zoom, setZoom] = useState(() => map.getZoom());
  useMapEvents({ zoomend: (event) => setZoom(event.target.getZoom()) });

  if (zoom < minZoom || zoom > maxZoom) return null;
  const compact = zoom < minZoom + 1;
  const className = `inonara-map-label inonara-map-label--${priority}${compact ? " inonara-map-label--compact" : ""}`;

  return (
    <CircleMarker
      center={position}
      radius={0.01}
      interactive={false}
      pathOptions={{ opacity: 0, fillOpacity: 0 }}
    >
      <Tooltip permanent direction="center" opacity={1} className={className}>
        {children}
      </Tooltip>
    </CircleMarker>
  );
}

export default function InonaraLeafletMap({
  bounds,
  children,
  className = "h-[580px] w-full md:h-[690px]",
  minZoom = 3,
  maxZoom = 11,
  scrollWheelZoom = true,
  ariaLabel,
}) {
  return (
    <div className="inonara-atlas-map overflow-hidden rounded-xl border border-[#b8cad8] bg-[#eef5f8]" aria-label={ariaLabel}>
      <MapContainer
        bounds={bounds}
        minZoom={minZoom}
        maxZoom={maxZoom}
        scrollWheelZoom={scrollWheelZoom}
        className={className}
      >
        <FitBounds bounds={bounds} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={CARTO_LIGHT}
        />
        {children}
      </MapContainer>
    </div>
  );
}

export { ZoomAwareLabel };
