import { useEffect, useState, useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { fetchFigure, fetchFigures } from "../lib/api";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";
import { SmartImage } from "../components/SmartImage";
import { localizedValue, searchableText, sortAlphabetically } from "../lib/contentSort";

const CATEGORIES = ["all", "queens", "kings", "military", "scientists", "inventors", "civil_rights", "intellectuals", "artists", "athletes"];

function displayValue(value, translated, lang) {
  return translated || localizedValue(value, lang, "");
}

const FigureCard = ({ f, t, lang }) => {
  const translatedName = useTranslated(f.name || "");
  const translatedSummary = useTranslated(f.summary || "");
  const translatedEra = useTranslated(f.era || "");
  const translatedCredit = useTranslated(f.image_credit || "");
  const name = displayValue(f.name, translatedName, lang);
  const summary = displayValue(f.summary, translatedSummary, lang);
  const era = displayValue(f.era, translatedEra, lang);
  const credit = displayValue(f.image_credit, translatedCredit, lang);
  return (
    <Link to={`/figure/${f.id}`} data-testid={`figure-card-${f.id}`} className="museum-card relative overflow-hidden group aspect-[3/4]">
      <SmartImage src={f.image_url} wikipediaTitle={f.wikipedia_title} alt={name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover opacity-55 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-80" credit={credit} sourceUrl={f.image_source_url} />
      <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/75 to-ebony/10" />
      <div className="relative h-full p-6 flex flex-col justify-end">
        <p className="overline text-[0.6rem]">{t(`figures.${f.category}`)}</p>
        <h3 className="font-serif text-2xl text-bone mt-2 leading-tight group-hover:text-gold transition-colors">{name}</h3>
        {era && <p className="text-gold text-[0.7rem] uppercase tracking-[0.18em] mt-1">{era}</p>}
        {summary && <p className="text-bone/70 text-xs font-light mt-2 line-clamp-3">{summary}</p>}
      </div>
    </Link>
  );
};

export const FiguresList = () => {
  const { t, lang } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState(() => searchParams.get("q") || "");
  useEffect(() => { fetchFigures().then(setItems).catch(() => {}); }, []);
  useEffect(() => {
    const urlQuery = searchParams.get("q") || "";
    setQuery((current) => current === urlQuery ? current : urlQuery);
  }, [searchParams]);

  const updateQuery = (value) => {
    setQuery(value);
    const next = new URLSearchParams(searchParams);
    if (value.trim()) next.set("q", value);
    else next.delete("q");
    setSearchParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    const needle = searchableText(query).trim();
    const base = cat === "all" ? items : items.filter((i) => i.category === cat);
    return sortAlphabetically(base.filter((i) => {
      const haystack = searchableText(i.name, i.summary, i.region, i.era, i.category);
      return !needle || haystack.includes(needle);
    }), "name", lang);
  }, [items, cat, query, lang]);

  const regions = useMemo(() => new Set(items.map((i) => searchableText(i.region)).filter(Boolean)).size, [items]);
  const illustrated = useMemo(() => items.filter((i) => i.image_url || i.wikipedia_title).length, [items]);

  return (
    <div className="pt-32 pb-24 max-w-[1600px] mx-auto px-6 md:px-10" data-testid="figures-page">
      <p className="overline">{t("figures.overline")}</p>
      <h1 className="font-serif text-5xl md:text-6xl text-bone mt-3 tracking-tight">{t("figures.title")}</h1>
      <p className="text-bone/70 max-w-2xl mt-6 font-light leading-relaxed">{t("figures.copy")}</p>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gold/20 bg-gold/[0.05] p-5">
          <p className="overline text-gold">{t("figures.corpus.label")}</p>
          <p className="mt-2 font-serif text-3xl text-bone">{items.length}</p>
          <p className="mt-1 text-xs text-bone/50">{t("figures.corpus.copy")}</p>
        </div>
        <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
          <p className="overline">{t("figures.coverage.label")}</p>
          <p className="mt-2 font-serif text-3xl text-bone">{regions}</p>
          <p className="mt-1 text-xs text-bone/50">{t("figures.coverage.copy")}</p>
        </div>
        <Link to="/timeline" className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5 transition hover:border-gold/40">
          <p className="overline">{t("figures.time.label")}</p>
          <p className="mt-2 font-serif text-xl text-bone">{t("figures.time.title")}</p>
          <p className="mt-1 text-xs text-bone/50">{t("figures.time.copy").replace("{n}", illustrated)}</p>
        </Link>
      </section>

      <section className="mt-10 rounded-2xl border border-bone/10 bg-bone/[0.02] p-5">
        <input value={query} onChange={(event) => updateQuery(event.target.value)} placeholder={t("figures.search.placeholder")} aria-label={t("figures.search.placeholder")} className="w-full rounded-xl border border-bone/15 bg-ebony px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50" />
        <div className="flex flex-wrap gap-2 mt-4" data-testid="figures-filters">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`px-4 py-2 text-xs uppercase tracking-[0.2em] border transition-colors ${
              cat === c ? "bg-gold text-ebony border-gold" : "border-[#2A2421] text-bone/70 hover:border-gold/50"
            }`}
            data-testid={`figures-filter-${c}`}
          >
            {c === "all" ? t("figures.allCats") : t(`figures.${c}`)}
          </button>
        ))}
        </div>
        <p className="mt-4 text-xs text-bone/45">{filtered.length} {filtered.length > 1 ? t("figures.results.many") : t("figures.results.one")}</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {filtered.map((f) => <FigureCard key={f.id} f={f} t={t} lang={lang} />)}
      </div>
    </div>
  );
};

export const FigureDetail = () => {
  const { t, lang } = useI18n();
  const { id } = useParams();
  const [f, setF] = useState(null);
  useEffect(() => { fetchFigure(id).then(setF).catch(() => {}); }, [id]);
  const tName = useTranslated(f?.name || "");
  const tSummary = useTranslated(f?.summary || "");
  const tStory = useTranslated(f?.story || "");
  const tLegacy = useTranslated(f?.legacy || "");
  const tEra = useTranslated(f?.era || "");
  const tRegion = useTranslated(f?.region || "");
  const tCredit = useTranslated(f?.image_credit || "");
  if (!f) return <div className="pt-32 text-center text-bone/40 overline">{t("common.loading")}</div>;

  const name = displayValue(f.name, tName, lang);
  const summary = displayValue(f.summary, tSummary, lang);
  const story = displayValue(f.story, tStory, lang);
  const legacy = displayValue(f.legacy, tLegacy, lang);
  const era = displayValue(f.era, tEra, lang);
  const credit = displayValue(f.image_credit, tCredit, lang);
  const region = typeof f.region === "string" && !f.region.includes(" ") ? t(`region.${f.region}`) : displayValue(f.region, tRegion, lang);

  return (
    <div data-testid="figure-detail">
      <div className="relative h-[60vh] min-h-[440px] overflow-hidden">
        <SmartImage src={f.image_url} wikipediaTitle={f.wikipedia_title} alt={name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover animate-slow-zoom" credit={credit} sourceUrl={f.image_source_url} />
        <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/60 to-ebony/30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 h-full flex flex-col justify-end pb-14">
          <Link to="/figures" className="text-bone/60 hover:text-gold text-xs uppercase tracking-[0.2em] flex items-center gap-2 mb-6" data-testid="back-to-figures">
            <ArrowLeft size={14} /> {t("figure.back")}
          </Link>
          <p className="overline">{t(`figures.${f.category}`)}{region ? ` · ${region}` : ""}</p>
          <h1 className="font-serif text-5xl md:text-7xl text-bone mt-3 leading-[0.95] tracking-tight">{name}</h1>
          {era && <p className="text-gold text-sm uppercase tracking-[0.25em] mt-4">{era}</p>}
          {summary && <p className="text-bone/80 mt-6 max-w-2xl text-lg font-light leading-relaxed">{summary}</p>}
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-14">
        {story && (
          <section>
            <p className="overline">{t("figure.story")}</p>
            <p className="text-bone/85 mt-4 text-lg font-light leading-relaxed">{story}</p>
          </section>
        )}
        {legacy && (
          <section className="border-t border-[#2A2421] pt-10">
            <p className="overline">{t("figure.legacy")}</p>
            <p className="text-bone/85 mt-4 text-lg font-light leading-relaxed">{legacy}</p>
          </section>
        )}
        <section className="border-t border-[#2A2421] pt-10 grid gap-4 md:grid-cols-3">
          <Link to="/timeline" className="rounded-xl border border-gold/20 bg-gold/[0.04] p-5 hover:border-gold/50 transition">
            <p className="overline text-gold">{t("figure.link.timeline.label")}</p><p className="mt-2 font-serif text-lg text-bone">{t("figure.link.timeline.title")}</p>
          </Link>
          <Link to="/atlas" className="rounded-xl border border-bone/10 p-5 hover:border-gold/40 transition">
            <p className="overline">{t("figure.link.geo.label")}</p><p className="mt-2 font-serif text-lg text-bone">{t("figure.link.geo.title")}</p>
          </Link>
          <Link to="/culture" className="rounded-xl border border-bone/10 p-5 hover:border-gold/40 transition">
            <p className="overline">{t("figure.link.context.label")}</p><p className="mt-2 font-serif text-lg text-bone">{t("figure.link.context.title")}</p>
          </Link>
        </section>
        {(credit || f.image_source_url) && (
          <section className="border-t border-[#2A2421] pt-10">
            <p className="overline text-gold">{t("figure.visualDocs")}</p>
            {credit && <p className="mt-3 text-sm text-bone/65">{t("figure.credit")} : {credit}</p>}
            {f.image_source_url && <a href={f.image_source_url} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-xs text-gold underline underline-offset-2">{t("figure.visualRights")}</a>}
          </section>
        )}
        {f.sources?.length > 0 && (
          <section className="border-t border-[#2A2421] pt-10">
            <p className="overline">{t("common.sources")}</p>
            <ul className="list-disc pl-5 space-y-2 mt-4 text-bone/70">
              {f.sources.map((s, index) => <li key={`${localizedValue(s, "en", "source")}-${index}`}>{localizedValue(s, lang, "")}</li>)}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};
