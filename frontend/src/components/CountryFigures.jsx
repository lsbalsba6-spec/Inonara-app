import { useMemo, useState } from "react";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: {
    person: "Figure",
    other: "Other",
    overline: "Notable figures",
    title: "Lives, works and legacies",
    intro: "This selection highlights political, scientific, artistic, sporting and intellectual trajectories. It does not claim to summarize the country's entire social history on its own.",
    searchLabel: "Search for a figure",
    search: "Search for a figure or field…",
    all: "All fields",
    biography: "Extended biography",
    birth: "Born",
    death: "Died",
    legacy: "Legacy",
    empty: "No figure matches this search.",
  },
  fr: {
    person: "Personnalité",
    other: "Autre",
    overline: "Personnalités",
    title: "Parcours, œuvres et héritages",
    intro: "Cette sélection met en avant des trajectoires politiques, scientifiques, artistiques, sportives et intellectuelles. Elle ne prétend pas résumer à elle seule toute l’histoire sociale du pays.",
    searchLabel: "Rechercher une personnalité",
    search: "Rechercher une personnalité ou un domaine…",
    all: "Tous les domaines",
    biography: "Biographie développée",
    birth: "Naissance",
    death: "Décès",
    legacy: "Héritage",
    empty: "Aucune personnalité ne correspond à cette recherche.",
  },
};

function localizedValue(value, lang) {
  if (!value) return "";
  if (typeof value === "object") return value[lang] || value.fr || value.en || value.text || "";
  return String(value);
}

function searchableValue(value) {
  if (!value) return "";
  if (typeof value === "object") return Object.values(value).filter((entry) => typeof entry === "string").join(" ");
  return String(value);
}

function TranslatedInline({ value }) {
  const translated = useTranslated(value || "");
  if (!value) return null;
  return translated || localizedValue(value, "fr") || localizedValue(value, "en");
}

function SourceLink({ source }) {
  const translatedTitle = useTranslated(source?.title || "");
  if (!source) return null;
  return (
    <a href={source.url} target="_blank" rel="noreferrer" className="rounded-full border border-gold/25 px-3 py-1 text-[11px] text-gold/85 hover:bg-gold/10">
      {source.publisher}: {translatedTitle || localizedValue(source.title, "fr") || localizedValue(source.title, "en")}
    </a>
  );
}

function SourceLinks({ ids = [], sourceMap }) {
  if (!ids.length) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {ids.map((id) => {
        const source = sourceMap.get(id);
        return source ? <SourceLink key={id} source={source} /> : null;
      })}
    </div>
  );
}

function TranslatedText({ value, className = "" }) {
  const translated = useTranslated(value || "");
  if (!value) return null;
  return <p className={className}>{translated || localizedValue(value, "fr") || localizedValue(value, "en")}</p>;
}

export function CountryFigures({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const figures = useMemo(() => dossier.figures || [], [dossier.figures]);
  const getNameRaw = (item) => item.name || item.title || copy.person;
  const getName = (item) => localizedValue(getNameRaw(item), lang) || copy.person;
  const getSummary = (item) => item.reason || item.note || item.summary || item.description || "";
  const getFieldRaw = (item) => item.field || item.domain || item.category || copy.other;
  const getFieldKey = (item) => searchableValue(getFieldRaw(item)) || copy.other;
  const fields = useMemo(() => {
    const seen = new Map();
    figures.forEach((item) => {
      const value = getFieldRaw(item);
      const key = searchableValue(value) || copy.other;
      if (!seen.has(key)) seen.set(key, value);
    });
    return [...seen.entries()].map(([key, value]) => ({ key, value }));
  }, [figures, copy.other]);

  const [field, setField] = useState("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(figures[0]?.id || null);

  const needle = query.trim().toLowerCase();
  const visible = figures.filter((item) => {
    const itemFieldKey = getFieldKey(item);
    const matchesField = field === "all" || itemFieldKey === field;
    const haystack = `${searchableValue(getNameRaw(item))} ${searchableValue(getSummary(item))} ${searchableValue(getFieldRaw(item))}`.toLowerCase();
    return matchesField && (!needle || haystack.includes(needle));
  });

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">{copy.overline}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{copy.title}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">{copy.intro}</p>
      </header>

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="block">
          <span className="sr-only">{copy.searchLabel}</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.search} className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50" />
        </label>

        <div className="flex gap-2 overflow-x-auto">
          <button type="button" onClick={() => setField("all")} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${field === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60 hover:text-bone"}`}>{copy.all}</button>
          {fields.map(({ key, value }) => (
            <button key={key} type="button" onClick={() => setField(key)} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${field === key ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60 hover:text-bone"}`}><TranslatedInline value={value} /></button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {visible.map((item, index) => {
          const id = item.id || `${getName(item)}-${index}`;
          const expanded = openId === id;
          return (
            <article key={id} className="overflow-hidden rounded-2xl border border-bone/10 bg-bone/[0.025]">
              <button type="button" onClick={() => setOpenId(expanded ? null : id)} className="w-full p-5 text-left" aria-expanded={expanded}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-gold"><TranslatedInline value={getFieldRaw(item)} /></p>
                    <h3 className="mt-2 font-serif text-2xl text-bone">{getName(item)}</h3>
                  </div>
                  <span className="text-xl text-gold" aria-hidden="true">{expanded ? "−" : "+"}</span>
                </div>
                {getSummary(item) && <TranslatedText value={getSummary(item)} className="mt-4 max-w-4xl leading-7 text-bone/70" />}
              </button>

              {expanded && (
                <div className="border-t border-bone/10 px-5 pb-6 pt-5">
                  {item.biography?.length > 0 && (
                    <div className="mb-5 space-y-4 rounded-xl border border-bone/10 bg-black/10 p-5">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-gold/80">{copy.biography}</p>
                      {item.biography.map((paragraph, paragraphIndex) => <TranslatedText key={paragraphIndex} value={paragraph} className="text-sm leading-7 text-bone/75" />)}
                    </div>
                  )}
                  {item.highlights?.length > 0 && (
                    <div className="mb-5 flex flex-wrap gap-2">
                      {item.highlights.map((highlight, highlightIndex) => <span key={`${searchableValue(highlight)}-${highlightIndex}`} className="rounded-full border border-gold/20 bg-gold/[0.05] px-3 py-1 text-xs text-gold/85"><TranslatedInline value={highlight} /></span>)}
                    </div>
                  )}
                  <div className="grid gap-3 md:grid-cols-2">
                    {item.birth && <div className="rounded-xl border border-bone/10 bg-black/10 p-4"><p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.birth}</p><p className="mt-2 text-sm leading-6 text-bone/72"><TranslatedInline value={item.birth} /></p></div>}
                    {item.death && <div className="rounded-xl border border-bone/10 bg-black/10 p-4"><p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.death}</p><p className="mt-2 text-sm leading-6 text-bone/72"><TranslatedInline value={item.death} /></p></div>}
                    {item.legacy && <div className="rounded-xl border border-bone/10 bg-black/10 p-4 md:col-span-2"><p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.legacy}</p><TranslatedText value={item.legacy} className="mt-2 text-sm leading-6 text-bone/72" /></div>}
                  </div>
                  <SourceLinks ids={item.sources || item.sourceIds} sourceMap={sourceMap} />
                </div>
              )}
            </article>
          );
        })}
      </div>

      {!visible.length && <div className="rounded-xl border border-bone/10 p-5 text-bone/60">{copy.empty}</div>}
    </div>
  );
}
