import { useEffect, useState, useMemo } from "react";
import { fetchCulture } from "../lib/api";
import { useI18n } from "../i18n";
import { sortAlphabetically } from "../lib/contentSort";
import { SmartImage } from "../components/SmartImage";

const categories = ["all", "food", "music", "clothing", "language", "ritual", "proverbs", "spiritual"];

const Culture = () => {
  const { t } = useI18n();
  const [items, setItems] = useState([]);
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  useEffect(() => { fetchCulture().then(setItems).catch(() => {}); }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const base = cat === "all" ? items : items.filter((i) => i.category === cat);
    return sortAlphabetically(base.filter((i) => {
      const haystack = `${i.title || ""} ${i.blurb || ""} ${i.region || ""} ${i.category || ""}`.toLowerCase();
      return !needle || haystack.includes(needle);
    }), "title");
  }, [items, cat, query]);

  const regions = useMemo(() => new Set(items.map((i) => i.region).filter(Boolean)).size, [items]);
  const illustrated = useMemo(() => items.filter((i) => i.image_url || i.wikipedia_title).length, [items]);

  return (
    <div className="pt-32 pb-24 max-w-[1600px] mx-auto px-6 md:px-10" data-testid="culture-page">
      <p className="overline">{t("page.culture.overline")}</p>
      <h1 className="font-serif text-5xl md:text-6xl text-bone mt-3 tracking-tight" data-testid="culture-title">{t("page.culture.title")}</h1>
      <p className="text-bone/70 max-w-2xl mt-6 font-light">{t("page.culture.lead")}</p>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gold/20 bg-gold/[0.05] p-5">
          <p className="overline text-gold">{t("culture.corpus.label")}</p>
          <p className="mt-2 font-serif text-3xl text-bone">{items.length}</p>
          <p className="mt-1 text-xs text-bone/50">{t("culture.corpus.copy")}</p>
        </div>
        <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
          <p className="overline">{t("culture.coverage.label")}</p>
          <p className="mt-2 font-serif text-3xl text-bone">{regions}</p>
          <p className="mt-1 text-xs text-bone/50">{t("culture.coverage.copy")}</p>
        </div>
        <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
          <p className="overline">{t("culture.visual.label")}</p>
          <p className="mt-2 font-serif text-3xl text-bone">{illustrated}</p>
          <p className="mt-1 text-xs text-bone/50">{t("culture.visual.copy")}</p>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-bone/10 bg-bone/[0.02] p-5">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("culture.search.placeholder")} className="w-full rounded-xl border border-bone/15 bg-ebony px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50" />
        <div className="flex flex-wrap gap-2 mt-4" data-testid="culture-filters">
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
        <p className="mt-4 text-xs text-bone/45">{filtered.length} {filtered.length > 1 ? t("culture.results.many") : t("culture.results.one")}</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {filtered.map((i) => (
          <div key={i.id} className="museum-card overflow-hidden" data-testid={`culture-item-${i.id}`}><SmartImage src={i.image_url} wikipediaTitle={i.wikipedia_title} alt={i.title} wrapperClassName="aspect-[16/10]" className="h-full w-full object-cover transition duration-700 hover:scale-105" credit={i.image_credit} sourceUrl={i.image_source_url} /><div className="p-7">
            <p className="overline text-[0.65rem]">{i.category} · {i.region}</p>
            <h3 className="font-serif text-2xl text-bone mt-3">{i.title}</h3>
            <p className="text-bone/75 mt-3 font-light leading-relaxed text-sm">{i.blurb}</p>
            {(i.image_credit || i.image_source_url) && (
              <div className="mt-5 border-t border-bone/10 pt-3 text-[11px] text-bone/45">
                {i.image_credit && <p>{t("culture.image.credit")} : {i.image_credit}</p>}
                {i.image_source_url && <a href={i.image_source_url} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-gold/80 underline underline-offset-2">{t("culture.image.rights")}</a>}
              </div>
            )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-bone/50">{t("culture.empty")}</p>}
      </div>
    </div>
  );
};

export default Culture;
