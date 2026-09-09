import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useI18n } from "../i18n";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const CATEGORY_COLOR = {
  queens: "#D4AF37",
  kings: "#C18C42",
  military: "#7B2D26",
  scientists: "#5BA8B5",
  inventors: "#7AA67A",
  civil_rights: "#A0522D",
  intellectuals: "#B58FB5",
  artists: "#E0935A",
  athletes: "#9B5DE5",
  events: "#D4AF37",
};

const fmtYear = (y) => (y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`);

const Timeline = () => {
  const { t } = useI18n();
  const [figures, setFigures] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [activeCats, setActiveCats] = useState({});
  const [query, setQuery] = useState("");
  const [era, setEra] = useState("all");
  const scrollerRef = useRef(null);

  useEffect(() => {
    axios.get(`${API}/figures-timeline`).then((r) => {
      setFigures(r.data);
      const cats = Array.from(new Set(r.data.map((f) => f.category)));
      setActiveCats(Object.fromEntries(cats.map((c) => [c, true])));
    });
  }, []);

  const { minY, maxY } = useMemo(() => {
    if (figures.length === 0) return { minY: -3000, maxY: 2025 };
    return { minY: Math.min(-3000, figures[0].year - 100), maxY: 2025 };
  }, [figures]);

  // 1 year = 1.5px → ~7,500px wide for 5,000-year span
  const PX_PER_YEAR = 1.5;
  const totalSpan = maxY - minY;
  const totalWidth = totalSpan * PX_PER_YEAR + 200;

  // Vertical lanes per category for readability
  const LANES = ["events", "queens", "kings", "military", "scientists", "inventors", "civil_rights", "intellectuals", "artists", "athletes"];
  const LANE_HEIGHT = 60;
  const TOP_PAD = 80;

  const ticks = [];
  for (let y = Math.ceil(minY / 500) * 500; y <= maxY; y += 500) ticks.push(y);

  const eraOptions = [
    ["all", "Toutes les périodes"],
    ["ancient", "Avant 500"],
    ["medieval", "500–1500"],
    ["early-modern", "1500–1800"],
    ["modern", "1800–1950"],
    ["contemporary", "Depuis 1950"],
  ];

  const matchesEra = (year) => {
    if (era === "ancient") return year < 500;
    if (era === "medieval") return year >= 500 && year < 1500;
    if (era === "early-modern") return year >= 1500 && year < 1800;
    if (era === "modern") return year >= 1800 && year < 1950;
    if (era === "contemporary") return year >= 1950;
    return true;
  };

  const needle = query.trim().toLowerCase();
  const visibleFigures = figures.filter((f) => {
    const matchesSearch = !needle || `${f.name || ""} ${f.summary || ""} ${f.region || ""} ${f.category || ""}`.toLowerCase().includes(needle);
    return activeCats[f.category] && matchesEra(f.year) && matchesSearch;
  });

  return (
    <div className="pt-32 pb-12 max-w-[1600px] mx-auto px-6 md:px-10" data-testid="timeline-page">
      <p className="overline">{t("page.timeline.overline")}</p>
      <h1 className="font-serif text-5xl md:text-6xl text-bone mt-3 tracking-tight" data-testid="timeline-title">{t("page.timeline.title")}</h1>
      <p className="text-bone/70 max-w-2xl mt-6 font-light leading-relaxed">
        {t("page.timeline.lead")}
      </p>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gold/20 bg-gold/[0.05] p-5">
          <p className="overline text-gold">Corpus chronologique</p>
          <p className="mt-2 font-serif text-3xl text-bone">{figures.length}</p>
          <p className="mt-1 text-xs text-bone/50">personnalités et événements positionnés dans le temps</p>
        </div>
        <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
          <p className="overline">Amplitude</p>
          <p className="mt-2 font-serif text-xl text-bone">{fmtYear(minY)} → {fmtYear(maxY)}</p>
          <p className="mt-1 text-xs text-bone/50">une lecture longue durée de l’histoire africaine</p>
        </div>
        <Link to="/atlas" className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5 transition hover:border-gold/40">
          <p className="overline">Temps & espace</p>
          <p className="mt-2 font-serif text-xl text-bone">Ouvrir l’Atlas</p>
          <p className="mt-1 text-xs text-bone/50">replacer événements, sociétés et circulations sur la carte</p>
        </Link>
      </section>

      <section className="mt-8 rounded-2xl border border-bone/10 bg-bone/[0.02] p-5">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher une personne, un événement, une région…" className="w-full rounded-xl border border-bone/15 bg-ebony px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50" />
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {eraOptions.map(([id, label]) => (
            <button key={id} type="button" onClick={() => setEra(id)} className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs ${era === id ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>
              {label}
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs text-bone/45">{visibleFigures.length} élément{visibleFigures.length > 1 ? "s" : ""} visible{visibleFigures.length > 1 ? "s" : ""}</p>
      </section>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-6" data-testid="timeline-legend">
        {LANES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCats((s) => ({ ...s, [cat]: !s[cat] }))}
            className={`flex items-center gap-2 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.18em] border transition-colors ${
              activeCats[cat] ? "border-gold/60 text-bone" : "border-[#2A2421] text-bone/40"
            }`}
            data-testid={`timeline-cat-${cat}`}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: CATEGORY_COLOR[cat] }} />
            {cat.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Scrollable timeline */}
      <div ref={scrollerRef} className="mt-10 overflow-x-auto overflow-y-hidden border border-[#2A2421] bg-[#0c0a09] relative">
        <div className="relative" style={{ width: totalWidth, height: TOP_PAD + LANES.length * LANE_HEIGHT + 40 }}>
          {/* Era markers */}
          {ticks.map((y) => (
            <div key={y} className="absolute top-0 bottom-0 border-l border-[#1A1614]" style={{ left: (y - minY) * PX_PER_YEAR + 40 }}>
              <span className="absolute -top-1 left-2 text-[10px] uppercase tracking-[0.18em] text-bone/40">{fmtYear(y)}</span>
            </div>
          ))}
          {/* "Today" marker */}
          <div className="absolute top-0 bottom-0 border-l border-gold/60" style={{ left: (2025 - minY) * PX_PER_YEAR + 40 }}>
            <span className="absolute top-2 left-2 overline text-gold">{t("timeline.today")}</span>
          </div>

          {/* Lane labels */}
          {LANES.map((cat, i) => (
            <div
              key={cat}
              className="absolute left-0 text-[0.6rem] uppercase tracking-[0.2em] text-bone/30 pl-2"
              style={{ top: TOP_PAD + i * LANE_HEIGHT + LANE_HEIGHT / 2 - 6 }}
            >
              {cat.replace("_", " ")}
            </div>
          ))}

          {/* Figure dots */}
          {visibleFigures.map((f) => {
            const laneIndex = LANES.indexOf(f.category);
            const x = (f.year - minY) * PX_PER_YEAR + 40;
            const y = TOP_PAD + laneIndex * LANE_HEIGHT + LANE_HEIGHT / 2;
            const color = CATEGORY_COLOR[f.category];
            return (
              <Link
                key={f.id}
                to={f.link || `/figure/${f.id}`}
                onMouseEnter={() => setHovered(f)}
                onMouseLeave={() => setHovered((h) => (h?.id === f.id ? null : h))}
                className="absolute group"
                style={{ left: x - 6, top: y - 6 }}
                data-testid={`timeline-dot-${f.id}`}
              >
                <span
                  className="block w-3 h-3 rounded-full border-2 border-ebony hover:scale-150 transition-transform"
                  style={{ background: color, boxShadow: `0 0 0 1px ${color}` }}
                />
              </Link>
            );
          })}

          {/* Hover card */}
          {hovered && (
            <div
              className="absolute glass p-4 w-[260px] pointer-events-none z-10"
              style={{
                left: Math.min((hovered.year - minY) * PX_PER_YEAR + 50, totalWidth - 280),
                top: TOP_PAD + LANES.indexOf(hovered.category) * LANE_HEIGHT - 50,
              }}
            >
              <p className="overline text-[0.6rem]" style={{ color: CATEGORY_COLOR[hovered.category] }}>
                {hovered.category.replace("_", " ")} · {fmtYear(hovered.year)}
              </p>
              <p className="font-serif text-lg text-bone mt-1">{hovered.name}</p>
              <p className="text-bone/60 text-[0.65rem] mt-1">{hovered.region}</p>
              <p className="text-bone/70 text-xs mt-2 line-clamp-3 font-light">{hovered.summary}</p>
            </div>
          )}
        </div>
      </div>

      <p className="text-bone/40 text-xs mt-4">Survolez un point pour un aperçu · Cliquez pour ouvrir la fiche ou le récit</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Link to="/civilizations" className="rounded-xl border border-bone/10 p-5 hover:border-gold/40 transition">
          <p className="overline">Civilisations</p><p className="mt-2 font-serif text-lg text-bone">Suivre les formations historiques</p>
        </Link>
        <Link to="/people" className="rounded-xl border border-bone/10 p-5 hover:border-gold/40 transition">
          <p className="overline">Peuples</p><p className="mt-2 font-serif text-lg text-bone">Relier sociétés et temporalités</p>
        </Link>
        <Link to="/diaspora" className="rounded-xl border border-bone/10 p-5 hover:border-gold/40 transition">
          <p className="overline">Diaspora</p><p className="mt-2 font-serif text-lg text-bone">Suivre les circulations dans le temps</p>
        </Link>
      </div>
    </div>
  );
};

export default Timeline;
