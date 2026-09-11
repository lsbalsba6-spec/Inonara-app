import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchCivilizations } from "../lib/api";
import { useI18n } from "../i18n";
import { searchableText, sortChronologically } from "../lib/contentSort";
import { useTranslated } from "../lib/useTranslated";
import { SmartImage } from "../components/SmartImage";

const fmt = (y, t) => (y < 0 ? `${Math.abs(y)} ${t("date.bce")}` : `${y} ${t("date.ce")}`);

const CONNECTION_COPY = {
  en: {
    overline: "Keep exploring",
    title: "Put civilizations back into their wider world",
    body: "A civilization is not an isolated card. Continue through chronology, peoples, territories and diasporas to see how places and communities connect across time.",
    links: [
      ["/timeline", "Timeline", "Place political formations, events and historical figures on a shared chronology."],
      ["/people", "Peoples", "Follow communities, languages, movements and cultural continuities across borders."],
      ["/countries", "Countries", "Open country dossiers to connect territory, history, heritage and sources."],
      ["/diaspora", "Diaspora", "Trace long-distance connections, displacement, continuity and cultural transformation."],
    ],
  },
  fr: {
    overline: "Poursuivre l’exploration",
    title: "Replacer les civilisations dans leur monde",
    body: "Une civilisation n’est pas une carte isolée. Poursuis par la chronologie, les peuples, les territoires et les diasporas pour voir comment lieux et communautés se relient dans le temps.",
    links: [
      ["/timeline", "Chronologie", "Replace formations politiques, événements et personnalités dans une chronologie commune."],
      ["/people", "Peuples", "Suis communautés, langues, mouvements et continuités culturelles au-delà des frontières."],
      ["/countries", "Pays", "Ouvre les dossiers pays pour relier territoire, histoire, patrimoine et sources."],
      ["/diaspora", "Diaspora", "Suis les connexions à longue distance, déplacements, continuités et transformations culturelles."],
    ],
  },
};

function LocalizedText({ value, as: Tag = "span", className = "" }) {
  const translated = useTranslated(value || "");
  if (!value && !translated) return null;
  return <Tag className={className}>{translated || ""}</Tag>;
}

function LocalizedImage({ alt, ...props }) {
  const translatedAlt = useTranslated(alt || "");
  return <SmartImage {...props} alt={translatedAlt || ""} />;
}

const Civilizations = () => {
  const { t, lang } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const [civs, setCivs] = useState([]);
  const [region, setRegion] = useState("all");
  const [query, setQuery] = useState(() => searchParams.get("q") || "");
  const connections = CONNECTION_COPY[lang] || CONNECTION_COPY.en;

  useEffect(() => { fetchCivilizations().then(setCivs).catch(() => {}); }, []);
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

  const regions = useMemo(() => [...new Set(civs.map((c) => c.region).filter((value) => typeof value === "string"))].sort(), [civs]);
  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(lang === "fr" ? "fr" : "en");
    return sortChronologically(
      civs.filter((c) => {
        const matchesRegion = region === "all" || c.region === region;
        const haystack = searchableText(c.name, c.summary, c.region, c.alt_names, c.legacy);
        return matchesRegion && (!needle || haystack.includes(needle));
      }),
      "era_start",
      "name"
    );
  }, [civs, region, query, lang]);

  const earliest = civs.length ? Math.min(...civs.map((c) => c.era_start).filter(Number.isFinite)) : null;
  const latest = civs.length ? Math.max(...civs.map((c) => c.era_end).filter(Number.isFinite)) : null;

  return (
    <div className="pt-32 pb-24 max-w-[1600px] mx-auto px-6 md:px-10" data-testid="civilizations-page">
      <p className="overline">{t("page.civilizations.overline")}</p>
      <h1 className="font-serif text-5xl md:text-6xl text-bone mt-3 tracking-tight" data-testid="civilizations-title">{t("page.civilizations.title")}</h1>
      <p className="text-bone/70 max-w-2xl mt-6 font-light leading-relaxed">
        {t("page.civilizations.lead")}
      </p>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gold/20 bg-gold/[0.05] p-5">
          <p className="overline text-gold">{t("civilizations.corpus.label")}</p>
          <p className="mt-2 font-serif text-3xl text-bone">{civs.length}</p>
          <p className="mt-1 text-xs text-bone/50">{t("civilizations.corpus.copy")}</p>
        </div>
        <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
          <p className="overline">{t("civilizations.span.label")}</p>
          <p className="mt-2 font-serif text-xl text-bone">{earliest !== null ? fmt(earliest, t) : "—"} → {latest !== null ? fmt(latest, t) : "—"}</p>
          <p className="mt-1 text-xs text-bone/50">{t("civilizations.span.copy")}</p>
        </div>
        <Link to="/atlas" className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5 transition hover:border-gold/40">
          <p className="overline">{t("civilizations.explore.label")}</p>
          <p className="mt-2 font-serif text-xl text-bone">{t("civilizations.explore.title")}</p>
          <p className="mt-1 text-xs text-bone/50">{t("civilizations.explore.copy")}</p>
        </Link>
      </section>

      <section className="mt-10 rounded-2xl border border-bone/10 bg-bone/[0.02] p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <input
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder={t("civilizations.search.placeholder")}
            aria-label={t("civilizations.search.placeholder")}
            className="w-full rounded-xl border border-bone/15 bg-ebony px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50"
          />
          <div className="flex gap-2 overflow-x-auto">
            <button type="button" onClick={() => setRegion("all")} aria-pressed={region === "all"} className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs ${region === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>
              {t("civilizations.filter.allRegions")}
            </button>
            {regions.map((item) => (
              <button key={item} type="button" onClick={() => setRegion(item)} aria-pressed={region === item} className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs ${region === item ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>
                {t(`region.${item}`)}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-4 text-xs text-bone/45">{visible.length} {visible.length > 1 ? t("civilizations.results.many") : t("civilizations.results.one")}</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {visible.map((c) => (
          <Link
            key={c.id}
            to={`/civilization/${c.id}`}
            data-testid={`civ-card-${c.id}`}
            className="museum-card relative group overflow-hidden aspect-[4/5]"
          >
            <LocalizedImage src={c.image_url} wikipediaTitle={c.wikipedia_title} alt={c.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover opacity-55 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-75" credit={c.image_credit} sourceUrl={c.image_source_url} />
            <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/70 to-ebony/10" />
            <div className="relative h-full p-7 flex flex-col justify-end">
              <p className="overline text-[0.65rem]">{t(`region.${c.region}`)}</p>
              <LocalizedText value={c.name} as="h3" className="font-serif text-3xl text-bone mt-3 leading-tight" />
              <p className="text-gold text-xs uppercase tracking-[0.2em] mt-2">{fmt(c.era_start, t)} — {fmt(c.era_end, t)}</p>
              <LocalizedText value={c.summary} as="p" className="text-bone/70 text-sm font-light mt-4 line-clamp-3" />
            </div>
          </Link>
        ))}
      </div>
      {!visible.length && (
        <div className="mt-8 rounded-xl border border-bone/10 p-6 text-bone/60">
          {t("civilizations.empty")}
        </div>
      )}

      <section className="mt-16 border-t border-bone/10 pt-12" data-testid="civilizations-connections">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="overline text-gold">{connections.overline}</p>
            <h2 className="mt-3 max-w-xl font-serif text-3xl md:text-4xl text-bone">{connections.title}</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-bone/60">{connections.body}</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-bone/10 bg-bone/10 sm:grid-cols-2">
            {connections.links.map(([to, title, body]) => (
              <Link key={to} to={to} className="group bg-ebony p-5 transition hover:bg-bone/[0.035]">
                <h3 className="font-serif text-xl text-bone transition group-hover:text-gold">{title}</h3>
                <p className="mt-2 text-xs leading-6 text-bone/55">{body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Civilizations;
