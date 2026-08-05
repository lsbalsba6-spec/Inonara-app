import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import { search } from "../lib/api";
import { useI18n } from "../i18n";

const SearchPage = () => {
  const { t } = useI18n();
  const [params, setParams] = useSearchParams();
  const initial = params.get("q") || "";
  const [q, setQ] = useState(initial);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const total = results
    ? results.modules.length + results.civilizations.length + results.stories.length + results.culture.length + (results.diaspora?.length || 0) + (results.figures?.length || 0)
    : 0;

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

          {results.civilizations.length > 0 && (
            <Section title={t("search.section.civilizations")}>
              {results.civilizations.map((c) => (
                <Link key={c.id} to={`/civilization/${c.id}`} className="museum-card p-5 group block" data-testid={`search-civ-${c.id}`}>
                  <p className="overline text-[0.65rem]">{t(`region.${c.region}`)}</p>
                  <p className="font-serif text-xl text-bone mt-1 group-hover:text-gold transition-colors">{c.name}</p>
                  <p className="text-bone/70 text-sm mt-2 line-clamp-2 font-light">{c.summary}</p>
                </Link>
              ))}
            </Section>
          )}

          {results.figures?.length > 0 && (
            <Section title={t("search.section.figures")}>
              {results.figures.map((f) => (
                <Link key={f.id} to={`/figure/${f.id}`} className="museum-card p-5 group block" data-testid={`search-figure-${f.id}`}>
                  <p className="overline text-[0.65rem]">{f.category} · {f.era}</p>
                  <p className="font-serif text-xl text-bone mt-1 group-hover:text-gold transition-colors">{f.name}</p>
                  <p className="text-bone/70 text-sm mt-2 line-clamp-2 font-light">{f.summary}</p>
                </Link>
              ))}
            </Section>
          )}

          {results.diaspora?.length > 0 && (
            <Section title={t("search.section.diaspora")}>
              {results.diaspora.map((d) => (
                <Link key={d.id} to={`/diaspora/${d.id}`} className="museum-card p-5 group block" data-testid={`search-diaspora-${d.id}`}>
                  <p className="overline text-[0.65rem]">{t(`region.${d.region}`)} · {d.country}</p>
                  <p className="font-serif text-xl text-bone mt-1 group-hover:text-gold transition-colors">{d.name}</p>
                  <p className="text-bone/70 text-sm mt-2 line-clamp-2 font-light">{d.summary}</p>
                </Link>
              ))}
            </Section>
          )}

          {results.modules.length > 0 && (
            <Section title={t("search.section.modules")}>
              {results.modules.map((m) => (
                <Link key={m.id} to={`/module/${m.id}`} className="museum-card p-5 group block" data-testid={`search-module-${m.id}`}>
                  <p className="overline text-[0.65rem]">{t("search.module")}</p>
                  <p className="font-serif text-xl text-bone mt-1 group-hover:text-gold transition-colors">{m.title}</p>
                  <p className="text-bone/70 text-sm mt-2 line-clamp-2 font-light">{m.blurb}</p>
                </Link>
              ))}
            </Section>
          )}

          {results.stories.length > 0 && (
            <Section title={t("search.section.stories")}>
              {results.stories.map((s) => (
                <Link key={s.id} to={`/story/${s.id}`} className="museum-card p-5 group block" data-testid={`search-story-${s.id}`}>
                  <p className="overline text-[0.65rem]">{s.era}</p>
                  <p className="font-serif text-xl text-bone mt-1 group-hover:text-gold transition-colors">{s.title}</p>
                  <p className="text-bone/70 text-sm mt-2 line-clamp-2 font-light">{s.summary}</p>
                </Link>
              ))}
            </Section>
          )}

          {results.culture.length > 0 && (
            <Section title={t("search.section.culture")}>
              {results.culture.map((i) => (
                <div key={i.id} className="museum-card p-5" data-testid={`search-culture-${i.id}`}>
                  <p className="overline text-[0.65rem]">{i.category} · {i.region}</p>
                  <p className="font-serif text-xl text-bone mt-1">{i.title}</p>
                  <p className="text-bone/70 text-sm mt-2 line-clamp-2 font-light">{i.blurb}</p>
                </div>
              ))}
            </Section>
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
