import { useMemo } from "react";
import { MapPin } from "lucide-react";
import { getLocalized } from "../data/journeys";

const WIDTH = 820;
const HEIGHT = 470;
const PADDING = 58;

const projectStops = (stops) => {
  if (!stops.length) return [];
  const lngs = stops.map((stop) => stop.place.lng);
  const lats = stops.map((stop) => stop.place.lat);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const lngSpan = Math.max(maxLng - minLng, 8);
  const latSpan = Math.max(maxLat - minLat, 8);

  return stops.map((stop) => ({
    ...stop,
    x: PADDING + ((stop.place.lng - minLng) / lngSpan) * (WIDTH - PADDING * 2),
    y: HEIGHT - PADDING - ((stop.place.lat - minLat) / latSpan) * (HEIGHT - PADDING * 2),
  }));
};

const JourneyMap = ({ journey, activeIndex, onSelectStop, lang }) => {
  const points = useMemo(() => projectStops(journey.stops || []), [journey]);
  const traversedPoints = points.slice(0, activeIndex + 1);
  const fullPath = points.map((point) => `${point.x},${point.y}`).join(" ");
  const traversedPath = traversedPoints.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <section className="overflow-hidden rounded-2xl border border-bone/10 bg-[#12100f]" aria-label={lang === "fr" ? "Carte du parcours" : "Journey map"}>
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-bone/10 px-5 py-4">
        <div>
          <p className="overline text-gold">{lang === "fr" ? "Carte évolutive" : "Progressive map"}</p>
          <p className="mt-1 max-w-2xl text-xs leading-5 text-bone/45">{getLocalized(journey.mapCaption, lang)}</p>
        </div>
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.14em] text-bone/45">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-gold" />{lang === "fr" ? "Atteint" : "Reached"}</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full border border-bone/40" />{lang === "fr" ? "À venir" : "Ahead"}</span>
        </div>
      </div>

      <div className="relative min-h-[320px] w-full bg-[radial-gradient(circle_at_35%_35%,rgba(189,148,74,0.09),transparent_32%),linear-gradient(145deg,#171411,#0e0d0c)]">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto min-h-[320px] w-full" role="img" aria-label={lang === "fr" ? "Étapes du parcours" : "Journey stops"}>
          <defs>
            <pattern id="journey-grid" width="52" height="52" patternUnits="userSpaceOnUse">
              <path d="M 52 0 L 0 0 0 52" fill="none" stroke="rgba(245,240,228,0.055)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width={WIDTH} height={HEIGHT} fill="url(#journey-grid)" />
          {points.length > 1 && <polyline points={fullPath} fill="none" stroke="rgba(245,240,228,0.17)" strokeWidth="3" strokeDasharray="8 9" />}
          {traversedPoints.length > 1 && <polyline points={traversedPath} fill="none" stroke="rgb(189,148,74)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}

          {points.map((point, index) => {
            const isActive = index === activeIndex;
            const isReached = index <= activeIndex;
            const label = getLocalized(point.place.name, lang);
            return (
              <g key={point.stopId} onClick={() => onSelectStop(index)} className="cursor-pointer" role="button" tabIndex="0" aria-label={`${index + 1}. ${label}`} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onSelectStop(index); }}>
                {isActive && <circle cx={point.x} cy={point.y} r="19" fill="rgba(189,148,74,0.16)" stroke="rgba(189,148,74,0.45)" strokeWidth="1" />}
                <circle cx={point.x} cy={point.y} r={isActive ? 9 : 7} fill={isReached ? "rgb(189,148,74)" : "rgb(18,16,15)"} stroke={isReached ? "rgb(189,148,74)" : "rgba(245,240,228,0.5)"} strokeWidth="2" />
                <text x={point.x + 14} y={point.y - 12} fill={isActive ? "rgb(245,240,228)" : "rgba(245,240,228,0.68)"} fontSize="14" fontFamily="serif">{label}</text>
                <text x={point.x + 14} y={point.y + 7} fill="rgba(245,240,228,0.38)" fontSize="10">{getLocalized(point.period, lang)}</text>
              </g>
            );
          })}
        </svg>

        <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-bone/10 bg-ebony/80 px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-bone/50 backdrop-blur">
          <MapPin size={12} className="text-gold" />
          {lang === "fr" ? "Cliquez une étape pour vous y déplacer" : "Select a stop to move through the journey"}
        </div>
      </div>
    </section>
  );
};

export default JourneyMap;
