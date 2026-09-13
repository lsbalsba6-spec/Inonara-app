import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { localizedValue } from "../lib/contentSort";

const COPY = {
  en: {
    title: "Places connected to this life",
    hint: "Select a marker to read why the place matters.",
    uncertain: "approximate / debated location",
    coordinates: "Coordinates",
  },
  fr: {
    title: "Lieux liés à ce parcours",
    hint: "Sélectionnez un repère pour comprendre le rôle du lieu.",
    uncertain: "localisation approximative / débattue",
    coordinates: "Coordonnées",
  },
};

function project(lat, lng) {
  return {
    x: ((Number(lng) + 180) / 360) * 100,
    y: ((90 - Number(lat)) / 180) * 100,
  };
}

export function FigurePlacesMap({ places = [], lang = "en" }) {
  const copy = COPY[lang] || COPY.en;
  const usable = useMemo(
    () => places.filter((place) => Number.isFinite(Number(place.lat)) && Number.isFinite(Number(place.lng))),
    [places]
  );
  const [activeId, setActiveId] = useState(usable[0]?.id || null);
  const active = usable.find((place) => place.id === activeId) || usable[0];

  if (!usable.length) return null;

  return (
    <section className="border-t border-[#2A2421] pt-10" data-testid="figure-places-map">
      <p className="overline text-gold">{copy.title}</p>
      <p className="mt-3 text-sm text-bone/50">{copy.hint}</p>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.55fr_0.85fr]">
        <div className="relative aspect-[16/9] min-h-[260px] overflow-hidden rounded-2xl border border-bone/10 bg-[#151311]">
          <div className="absolute inset-0 opacity-50" aria-hidden="true">
            <div className="absolute inset-x-0 top-1/2 border-t border-bone/10" />
            <div className="absolute inset-y-0 left-1/2 border-l border-bone/10" />
            {[25, 75].map((position) => (
              <div key={`v-${position}`} className="absolute inset-y-0 border-l border-bone/[0.05]" style={{ left: `${position}%` }} />
            ))}
            {[25, 75].map((position) => (
              <div key={`h-${position}`} className="absolute inset-x-0 border-t border-bone/[0.05]" style={{ top: `${position}%` }} />
            ))}
          </div>

          <div className="absolute left-[39%] top-[27%] h-[52%] w-[22%] rounded-[48%_52%_58%_42%/34%_38%_62%_66%] border border-gold/20 bg-gold/[0.035] rotate-[-6deg]" aria-hidden="true" />
          <div className="absolute left-[52%] top-[18%] h-[13%] w-[9%] rounded-full border border-gold/15 bg-gold/[0.025]" aria-hidden="true" />

          {usable.map((place) => {
            const point = project(place.lat, place.lng);
            const activeMarker = place.id === active?.id;
            return (
              <button
                key={place.id}
                type="button"
                onClick={() => setActiveId(place.id)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border p-1.5 transition ${
                  activeMarker
                    ? "z-20 scale-110 border-gold bg-gold text-ebony shadow-[0_0_0_7px_rgba(200,169,93,0.12)]"
                    : "z-10 border-gold/50 bg-ebony text-gold hover:border-gold"
                }`}
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                aria-label={localizedValue(place.name, lang, place.id)}
                aria-pressed={activeMarker}
              >
                <MapPin size={14} />
              </button>
            );
          })}
        </div>

        {active && (
          <div className="rounded-2xl border border-bone/10 bg-bone/[0.025] p-6">
            <p className="overline">{localizedValue(active.name, lang, active.id)}</p>
            <p className="mt-4 text-bone/80 leading-relaxed">{localizedValue(active.role, lang, "")}</p>
            <p className="mt-6 text-xs text-bone/40">
              {copy.coordinates}: {Number(active.lat).toFixed(2)}, {Number(active.lng).toFixed(2)}
            </p>
            {active.certainty === "uncertain" || active.certainty === "approximate" ? (
              <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-amber-200/70">{copy.uncertain}</p>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
