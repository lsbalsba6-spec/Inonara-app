import { useEffect, useState, useMemo } from "react";
import { fetchCulture } from "../lib/api";
import { useI18n } from "../i18n";

const categories = ["all", "food", "music", "clothing", "language", "ritual", "proverbs", "spiritual"];

const Culture = () => {
  const { t } = useI18n();
  const [items, setItems] = useState([]);
  const [cat, setCat] = useState("all");
  useEffect(() => { fetchCulture().then(setItems).catch(() => {}); }, []);

  const filtered = useMemo(() => {
    const selected = cat === "all" ? items : items.filter((i) => i.category === cat);
    return [...selected].sort((a, b) => a.title.localeCompare(b.title));
  }, [items, cat]);

  return (
    <div className="pt-32 pb-24 max-w-[1600px] mx-auto px-6 md:px-10" data-testid="culture-page">
      <p className="overline">{t("page.culture.overline")}</p>
      <h1 className="font-serif text-5xl md:text-6xl text-bone mt-3 tracking-tight" data-testid="culture-title">{t("page.culture.title")}</h1>
      <p className="text-bone/70 max-w-2xl mt-6 font-light">{t("page.culture.lead")}</p>

      <div className="flex flex-wrap gap-2 mt-12" data-testid="culture-filters">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 text-xs uppercase tracking-[0.2em] border transition-colors ${
              cat === c ? "bg-gold text-ebony border-gold" : "border-[#2A2421] text-bone/70 hover:border-gold/50"
            }`}
            data-testid={`culture-filter-${c}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {filtered.map((i) => (
          <div key={i.id} className="museum-card p-7" data-testid={`culture-item-${i.id}`}>
            <p className="overline text-[0.65rem]">{i.category} · {i.region}</p>
            <h3 className="font-serif text-2xl text-bone mt-3">{i.title}</h3>
            <p className="text-bone/75 mt-3 font-light leading-relaxed text-sm">{i.blurb}</p>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-bone/50">No items in this category yet.</p>}
      </div>
    </div>
  );
};

export default Culture;
