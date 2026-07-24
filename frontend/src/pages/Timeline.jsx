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
};

const fmtYear = (y) => (y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`);

const Timeline = () => {
  const { t } = useI18n();
  const [figures, setFigures] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [activeCats, setActiveCats] = useState({});
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
  const LANES = ["queens", "kings", "military", "scientists", "inventors", "civil_rights", "intellectuals", "artists", "athletes"];
  const LANE_HEIGHT = 60;
  const TOP_PAD = 80;

  const ticks = [];
  for (let y = Math.ceil(minY / 500) * 500; y <= maxY; y += 500) ticks.push(y);

  const visibleFigures = figures.filter((f) => activeCats[f.category]);

  return (
    <div className="pt-32 pb-12 max-w-[1600px] mx-auto px-6 md:px-10" data-testid="timeline-page">
      <p className="overline">{t("page.timeline.overline")}</p>
      <h1 className="font-serif text-5xl md:text-6xl text-bone mt-3 tracking-tight" data-testid="timeline-title">{t("page.timeline.title")}</h1>
      <p className="text-bone/70 max-w-2xl mt-6 font-light leading-relaxed">
        {t("page.timeline.lead")}
      </p>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-8" data-testid="timeline-legend">
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
                to={`/figure/${f.id}`}
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

      <p className="text-bone/40 text-xs mt-4">Hover a dot for a preview · Click to open the figure</p>
    </div>
  );
};

export default Timeline;
