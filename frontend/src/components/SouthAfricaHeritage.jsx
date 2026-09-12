import { useMemo, useState } from "react";
import { useI18n } from "../i18n";
import { localizedValue, searchableText } from "../lib/contentSort";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: {
    overline: "Heritage & nature",
    title: "Sites, landscapes and memories",
    intro: "This section brings together cultural, natural and mixed heritage sites, as well as places of memory and inhabited landscapes. UNESCO listing is not the only measure of heritage significance.",
    searchLabel: "Search heritage",
    searchPlaceholder: "Search a site, landscape or place of memory…",
    all: "Show all",
    defaultTitle: "Heritage site",
    defaultType: "heritage",
    location: "Location",
    mapping: "Mapping",
    period: "Period",
    editorialStatus: "Editorial status",
    statuses: { ready: "Established", provisional: "Read with context", disputed: "Historical debate", "research-gap": "To investigate" },
    empty: "No heritage item matches this search.",
    mapNote: "The boundaries of some cultural landscapes and archaeological sites are approximate. Inonara does not automatically turn an area of influence or a memorial space into a political border.",
  },
  fr: {
    overline: "Patrimoine & nature",
    title: "Sites, paysages et mémoires",
    intro: "Cette section réunit les sites culturels, naturels et mixtes, mais aussi les lieux de mémoire et les paysages habités. Le classement UNESCO ne constitue pas l’unique mesure de l’importance patrimoniale.",
    searchLabel: "Rechercher dans le patrimoine",
    searchPlaceholder: "Rechercher un site, un paysage ou un lieu de mémoire…",
    all: "Tout afficher",
    defaultTitle: "Site patrimonial",
    defaultType: "patrimoine",
    location: "Localisation",
    mapping: "Cartographie",
    period: "Période",
    editorialStatus: "Statut éditorial",
    statuses: { ready: "Établi", provisional: "À lire avec contexte", disputed: "Débat historique", "research-gap": "À suivre" },
    empty: "Aucun élément patrimonial ne correspond à cette recherche.",
    mapNote: "Les limites de certains paysages culturels et sites archéologiques sont approximatives. Inonara ne transforme pas automatiquement une zone d’influence ou un espace mémoriel en frontière politique.",
  },
};

function TranslatedInline({ text }) {
  const { lang } = useI18n();
  const fallback = localizedValue(text, lang);
  const translated = useTranslated(text || "");
  return translated || fallback;
}

function SourceLink({ source }) {
  const { lang } = useI18n();
  const title = localizedValue(source?.title, lang);
  const publisher = localizedValue(source?.publisher, lang);
  const translatedTitle = useTranslated(source?.title || "");
  const translatedPublisher = useTranslated(source?.publisher || "");
  if (!source) return null;
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noreferrer"
      className="rounded-full border border-gold/25 px-3 py-1 text-[11px] text-gold/85 hover:bg-gold/10"
    >
      {translatedPublisher || publisher}{publisher || translatedPublisher ? ": " : ""}{translatedTitle || title}
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

function getTitle(item, fallback) {
  return item.name || item.title || item.site || fallback;
}

function getBody(item) {
  return item.note || item.text || item.summary || item.description || "";
}

function heritageType(item, fallback) {
  return item.type || item.category || fallback;
}

function HeritageCard({ item, index, openId, setOpenId, sourceMap, copy, lang }) {
  const title = getTitle(item, copy.defaultTitle);
  const body = getBody(item);
  const type = heritageType(item, copy.defaultType);
  const titleFallback = localizedValue(title, lang);
  const bodyFallback = localizedValue(body, lang);
  const typeFallback = localizedValue(type, lang);
  const locationFallback = localizedValue(item.location, lang);
  const mappingFallback = localizedValue(item.mapping, lang);
  const periodFallback = localizedValue(item.period, lang);
  const id = item.id || `${searchableText(title) || "heritage"}-${index}`;
  const expanded = openId === id;
  const translatedTitle = useTranslated(title);
  const translatedBody = useTranslated(body);
  const translatedType = useTranslated(type);
  const translatedLocation = useTranslated(item.location || "");
  const translatedMapping = useTranslated(item.mapping || "");
  const translatedPeriod = useTranslated(item.period || "");

  return (
    <article className="overflow-hidden rounded-2xl border border-bone/10 bg-bone/[0.025]">
      <button type="button" onClick={() => setOpenId(expanded ? null : id)} className="w-full p-5 text-left" aria-expanded={expanded}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-gold">{translatedType || typeFallback}</p>
            <h3 className="mt-2 font-serif text-2xl text-bone">{translatedTitle || titleFallback}</h3>
          </div>
          <span className="text-xl text-gold" aria-hidden="true">{expanded ? "−" : "+"}</span>
        </div>
        {bodyFallback && <p className="mt-4 max-w-4xl leading-7 text-bone/70">{translatedBody || bodyFallback}</p>}
      </button>

      {expanded && (
        <div className="border-t border-bone/10 px-5 pb-6 pt-5">
          <div className="grid gap-3 md:grid-cols-2">
            {locationFallback && <div className="rounded-xl border border-bone/10 bg-black/10 p-4"><p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.location}</p><p className="mt-2 text-sm leading-6 text-bone/72">{translatedLocation || locationFallback}</p></div>}
            {mappingFallback && <div className="rounded-xl border border-bone/10 bg-black/10 p-4"><p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.mapping}</p><p className="mt-2 text-sm leading-6 text-bone/72">{translatedMapping || mappingFallback}</p></div>}
            {periodFallback && <div className="rounded-xl border border-bone/10 bg-black/10 p-4"><p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.period}</p><p className="mt-2 text-sm leading-6 text-bone/72">{translatedPeriod || periodFallback}</p></div>}
            {item.status && <div className="rounded-xl border border-bone/10 bg-black/10 p-4"><p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.editorialStatus}</p><p className="mt-2 text-sm leading-6 text-bone/72">{copy.statuses[item.status] || localizedValue(item.status, lang)}</p></div>}
          </div>
          <SourceLinks ids={item.sources || item.sourceIds} sourceMap={sourceMap} />
        </div>
      )}
    </article>
  );
}

export function SouthAfricaHeritage({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const items = useMemo(() => dossier.heritage || [], [dossier.heritage]);
  const categories = useMemo(() => {
    const unique = new Map();
    items.forEach((item) => {
      const value = heritageType(item, copy.defaultType);
      const key = searchableText(value);
      if (key && !unique.has(key)) unique.set(key, value);
    });
    return [...unique.entries()].map(([key, value]) => ({ key, value }));
  }, [items, copy.defaultType]);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(items[0]?.id || null);

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(lang);
    return items.filter((item) => {
      const type = heritageType(item, copy.defaultType);
      const typeKey = searchableText(type);
      const matchesCategory = category === "all" || typeKey === category;
      const haystack = searchableText(getTitle(item, copy.defaultTitle), getBody(item), type, item.location, item.period);
      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [items, category, query, copy.defaultTitle, copy.defaultType, lang]);

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
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.searchPlaceholder} className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50" />
        </label>
        <div className="flex gap-2 overflow-x-auto">
          <button type="button" onClick={() => setCategory("all")} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${category === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60 hover:text-bone"}`}>{copy.all}</button>
          {categories.map(({ key, value }) => (
            <button key={key} type="button" onClick={() => setCategory(key)} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${category === key ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60 hover:text-bone"}`}><TranslatedInline text={value} /></button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {visible.map((item, index) => <HeritageCard key={item.id || `${searchableText(getTitle(item, copy.defaultTitle)) || "heritage"}-${index}`} item={item} index={index} openId={openId} setOpenId={setOpenId} sourceMap={sourceMap} copy={copy} lang={lang} />)}
      </div>

      {!visible.length && <div className="rounded-xl border border-bone/10 p-5 text-bone/60">{copy.empty}</div>}
      <p className="text-xs leading-relaxed text-bone/45">{copy.mapNote}</p>
    </div>
  );
}
