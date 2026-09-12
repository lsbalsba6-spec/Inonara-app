import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import { search } from "../lib/api";
import { useI18n } from "../i18n";
import { Translated } from "../lib/useTranslated";
import { localizedValue } from "../lib/contentSort";

const SearchPage = () => {
  const { t, lang } = useI18n();
  const [params, setParams] = useSearchParams();
  const initial = params.get("q") || "";
  const [q, setQ] = useState(initial);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const term = initial.trim();
    if (!term || term.length < 2) { setResults(null); return; }
    setLoading(true);
    search(term).then((r) => setResults(r.results)).catch(() => setResults(null)).finally(() => setLoading(false));
  }, [initial]);

  const submit = (e) => {
    e?.preventDefault();
    setParams({ q });
  };

  const buckets = results ? [
    ["countries", results.countries || []],
    ["peoples", results.peoples || []],
    ["civilizations", results.civilizations || []],
    ["figures", results.figures || []],
    ["diaspora", results.diaspora || []],
    ["modules", results.modules || []],
    ["stories", results.stories || []],
    ["culture", results.culture || []],
  ] : [];
  const total = buckets.reduce((sum, [, items]) => sum + items.length, 0);
  const show = (bucket) => type === "all" || type === bucket;

  return (
    <div className="pt-32 pb-24 max-w-[1400px] mx-auto px-6 md:px-10" data-testid="search-page">
      <p className="overline">{t("common.search")}</p>
      <h1 className="font-serif text-5xl md:text-6xl text-bone mt-3 tracking-tight">{t("search.title")}</h1>

      <form onSubmit={submit} className="mt-10 flex gap-3 max-w-2xl" data-testid="search-form">
        <div className="flex-1 flex items-center gap-3 border border-[#2A2421] focus-within:border-gold/60 px-4">
          <SearchIcon size={16} className="text-gold" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("search.placeholder")}
            className="flex-1 bg-transparent outline-none py-3 text-bone placeholder:text-bone/40"
            data-testid="search-input"
          />
        </div>
        <button className="px-6 py-3 bg-gold text-ebony text-xs uppercase tracking-[0.25em]" data-testid="search-submit">
          {t("search.submit")}
        </button>
      </form>

      {loading && <p className="overline mt-10 animate-pulse">{t("common.searching")}</p>}

      {!loading && results && (
        <>
          <p className="overline mt-10" data-testid="search-summary">{t("search.summary").replace("{count}", total).replace("{q}", initial)}</p>
          <div className="mt-5 flex gap-2 overflow-x-auto">
            {[
              ["all", t("search.filter.all")],
              ["countries", t("nav.countries")],
              ["peoples", t("nav.peoples")],
              ["civilizations", t("search.filter.civilizations")],
              ["figures", t("search.filter.figures")],
              ["diaspora", t("search.filter.diaspora")],
              ["modules", t("search.filter.modules")],
              ["stories", t("search.filter.stories")],
              ["culture", t("search.filter.culture")],
            ].map(([id,label]) => (
              <button key={id} type="button" onClick={() => setType(id)} className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs ${type === id ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>{label}</button>
            ))}
          </div>

          {show("countries") && results.countries?.length > 0 && (
            <Section title={t("nav.countries")}>
              {results.countries.map((country) => {
                const iso2 = country.iso2 || country.country_iso2;
                const name = localizedValue(country.name || country.display_name || country.country, lang);
                const region = localizedValue(country.region, lang);
                const note = localizedValue(country.editorial_note || country.summary, lang);
                return (
                  <Link key={iso2 || country.id || name} to={iso2 ? `/country/${iso2}` : "/countries"} className="museum-card p-5 group block" data-testid={`search-country-${iso2 || country.id || "item"}`}>
                    <p className="overline text-[0.65rem]">{region || t("nav.countries")}</p>
                    <p className="font-serif text-xl text-bone mt-1 group-hover:text-gold transition-colors">{name}</p>
                    {note && <p className="text-bone/70 text-sm mt-2 line-clamp-2 font-light">{note}</p>}
                  </Link>
                );
              })}
            </Section>
          )}

          {show("peoples") && results.peoples?.length > 0 && (
            <Section title={t("nav.peoples")}>
              {results.peoples.map((people) => (
                <Link key={people.id} to={`/people/${people.id}`} className="museum-card p-5 group block" data-testid={`search-people-${people.id}`}>
                  <p className="overline text-[0.65rem]">{localizedValue(people.language_family || people.region || people.regions, lang)}</p>
                  <p className="font-serif text-xl text-bone mt-1 group-hover:text-gold transition-colors">{localizedValue(people.name, lang)}</p>
                  <p className="text-bone/70 text-sm mt-2 line-clamp-2 font-light">{localizedValue(people.summary || people.history || people.culture, lang)}</p>
                </Link>
              ))}
            </Section>
          )}

          {show("civilizations") && results.civilizations?.length > 0 && (
            <Section title={t("search.section.civilizations")}>
              {results.civilizations.map((c) => (
                <Link key={c.id} to={`/civilization/${c.id}`} className="museum-card p-5 group block" data-testid={`search-civ-${c.id}`}>
                  <p className="overline text-[0.65rem]">{localizedValue(c.region, lang)}</p>
                  <p className="font-serif text-xl text-bone mt-1 group-hover:text-gold transition-colors">{localizedValue(c.name, lang)}</p>
                  <p className="text-bone/70 text-sm mt-2 line-clamp-2 font-light">{localizedValue(c.summary, lang)}</p>
                </Link>
              ))}
            </Section>
          )}

          {show("figures") && results.figures?.length > 0 && (
            <Section title={t("search.section.figures")}>
              {results.figures.map((f) => (
                <Link key={f.id} to={`/figure/${f.id}`} className="museum-card p-5 group block" data-testid={`search-figure-${f.id}`}>
                  <p className="overline text-[0.65rem]"><Translated>{f.category || ""}</Translated> · <Translated>{f.era || ""}</Translated></p>
                  <p className="font-serif text-xl text-bone mt-1 group-hover:text-gold transition-colors">{localizedValue(f.name, lang)}</p>
                  <p className="text-bone/70 text-sm mt-2 line-clamp-2 font-light">{localizedValue(f.summary, lang)}</p>
                </Link>
              ))}
            </Section>
          )}

          {show("diaspora") && results.diaspora?.length > 0 && (
            <Section title={t("search.section.diaspora")}>
              {results.diaspora.map((d) => (
                <Link key={d.id} to={`/diaspora/${d.id}`} className="museum-card p-5 group block" data-testid={`search-diaspora-${d.id}`}>
                  <p className="overline text-[0.65rem]">{localizedValue(d.region, lang)} · {localizedValue(d.country, lang)}</p>
                  <p className="font-serif text-xl text-bone mt-1 group-hover:text-gold transition-colors">{localizedValue(d.name, lang)}</p>
                  <p className="text-bone/70 text-sm mt-2 line-clamp-2 font-light">{localizedValue(d.summary, lang)}</p>
                </Link>
              ))}
            </Section>
          )}

          {show("modules") && results.modules?.length > 0 && (
            <Section title={t("search.section.modules")}>
              {results.modules.map((m) => (
                <Link key={m.id} to={`/module/${m.id}`} className="museum-card p-5 group block" data-testid={`search-module-${m.id}`}>
                  <p className="overline text-[0.65rem]">{t("search.module")}</p>
                  <p className="font-serif text-xl text-bone mt-1 group-hover:text-gold transition-colors">{localizedValue(m.title, lang)}</p>
                  <p className="text-bone/70 text-sm mt-2 line-clamp-2 font-light">{localizedValue(m.blurb, lang)}</p>
                </Link>
              ))}
            </Section>
          )}

          {show("stories") && results.stories?.length > 0 && (
            <Section title={t("search.section.stories")}>
              {results.stories.map((s) => (
                <Link key={s.id} to={`/story/${s.id}`} className="museum-card p-5 group block" data-testid={`search-story-${s.id}`}>
                  <p className="overline text-[0.65rem]">{localizedValue(s.era, lang)}</p>
                  <p className="font-serif text-xl text-bone mt-1 group-hover:text-gold transition-colors">{localizedValue(s.title, lang)}</p>
                  <p className="text-bone/70 text-sm mt-2 line-clamp-2 font-light">{localizedValue(s.summary, lang)}</p>
                </Link>
              ))}
            </Section>
          )}

          {show("culture") && results.culture?.length > 0 && (
            <Section title={t("search.section.culture")}>
              {results.culture.map((i) => (
                <div key={i.id} className="museum-card p-5" data-testid={`search-culture-${i.id}`}>
                  <p className="overline text-[0.65rem]">{localizedValue(i.category, lang)} · {localizedValue(i.region, lang)}</p>
                  <p className="font-serif text-xl text-bone mt-1">{localizedValue(i.title, lang)}</p>
                  <p className="text-bone/70 text-sm mt-2 line-clamp-2 font-light">{localizedValue(i.blurb, lang)}</p>
                </div>
              ))}
            </Section>
          )}

          {total > 0 && (
            <section className="mt-14 grid gap-4 md:grid-cols-3">
              <Link to="/atlas" className="rounded-xl border border-gold/20 bg-gold/[0.04] p-5 transition hover:border-gold/50"><p className="overline text-gold">{t("search.explore.space.label")}</p><p className="mt-2 font-serif text-lg text-bone">{t("search.explore.space.title")}</p></Link>
              <Link to="/timeline" className="rounded-xl border border-bone/10 p-5 transition hover:border-gold/40"><p className="overline">{t("search.explore.time.label")}</p><p className="mt-2 font-serif text-lg text-bone">{t("search.explore.time.title")}</p></Link>
              <Link to="/compare" className="rounded-xl border border-bone/10 p-5 transition hover:border-gold/40"><p className="overline">{t("search.explore.compare.label")}</p><p className="mt-2 font-serif text-lg text-bone">{t("search.explore.compare.title")}</p></Link>
            </section>
          )}

          {total === 0 && (
            <div className="mt-10 text-bone/60">
              <p>{t("search.empty")}</p>
              <button onClick={() => navigate("/atlas")} className="mt-6 inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.2em] hover:underline">
                {t("common.openMap")} <ArrowRight size={14} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="mt-12">
    <h2 className="font-serif text-3xl text-bone">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">{children}</div>
  </section>
);

export default SearchPage;
