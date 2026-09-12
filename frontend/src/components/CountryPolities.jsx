import { useState } from "react";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";
import { localizedValue, searchableText } from "../lib/contentSort";

const COPY = {
  en: {
    formation: "Political formation",
    today: "today",
    dating: "Dating to be clarified",
    overline: "Kingdoms & States",
    title: "Power, territories and networks",
    intro: "Explore kingdoms, states, chiefdoms and other political formations through their periods, centres of power, regional relationships and documented spheres of influence.",
    searchLabel: "Search a kingdom, state or period",
    search: "Search a kingdom, state or period…",
    all: "All formations",
    mapping: "Territorial context",
    region: "Region",
    organization: "Political organization",
    empty: "No political formation matches this search.",
    footer: "Where territorial evidence is incomplete, the atlas presents documented centres, routes and spheres of influence rather than implying precise modern-style borders.",
  },
  fr: {
    formation: "Formation politique",
    today: "aujourd’hui",
    dating: "Datation à préciser",
    overline: "Royaumes & États",
    title: "Pouvoirs, territoires et réseaux",
    intro: "Explorez royaumes, États, chefferies et autres formations politiques à travers leurs périodes, centres de pouvoir, relations régionales et aires d’influence documentées.",
    searchLabel: "Rechercher un royaume, un État ou une période",
    search: "Rechercher un royaume, un État ou une période…",
    all: "Toutes les formations",
    mapping: "Contexte territorial",
    region: "Région",
    organization: "Organisation politique",
    empty: "Aucune formation politique ne correspond à cette recherche.",
    footer: "Lorsque les données territoriales restent incomplètes, l’atlas montre les centres, routes et aires d’influence documentés plutôt que de suggérer des frontières modernes précises.",
  },
};

function TranslatedInline({ value }) {
  const { lang } = useI18n();
  const translated = useTranslated(value || "");
  if (!value) return null;
  return translated || localizedValue(value, lang);
}

function SourceLink({ source }) {
  const { lang } = useI18n();
  const translatedTitle = useTranslated(source?.title || "");
  const translatedPublisher = useTranslated(source?.publisher || "");
  if (!source?.url) return null;
  const publisher = translatedPublisher || localizedValue(source.publisher, lang);
  const title = translatedTitle || localizedValue(source.title, lang);
  return (
    <a href={source.url} target="_blank" rel="noreferrer" className="rounded-full border border-gold/25 px-3 py-1 text-[11px] text-gold/85 hover:bg-gold/10">
      {[publisher, title].filter(Boolean).join(": ") || source.id}
    </a>
  );
}

function SourceLinks({ ids = [], sourceMap }) {
  if (!ids.length || !sourceMap) return null;
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
  const { lang } = useI18n();
  const translated = useTranslated(value || "");
  if (!value) return null;
  return <p className={className}>{translated || localizedValue(value, lang)}</p>;
}

export function CountryPolities({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const getNameRaw = (item) => item.name || item.title || item.label || copy.formation;
  const getName = (item) => localizedValue(getNameRaw(item), lang) || copy.formation;
  const getSummary = (item) => item.note || item.text || item.summary || item.description || "";
  const getPeriod = (item) => item.period || (item.start != null ? `${item.start}${item.end != null ? `–${item.end}` : `–${copy.today}`}` : copy.dating);
  const getTypeRaw = (item) => item.type || item.category || copy.formation;
  const getTypeKey = (item) => searchableText(getTypeRaw(item)) || copy.formation.toLowerCase();

  const polityData = dossier.polities;
  const polities = Array.isArray(polityData) ? polityData : (polityData?.items || []);
  const typeMap = new Map();
  polities.forEach((item) => {
    const value = getTypeRaw(item);
    const key = getTypeKey(item);
    if (!typeMap.has(key)) typeMap.set(key, value);
  });
  const types = [...typeMap.entries()].map(([key, value]) => ({ key, value }));
  const [type, setType] = useState("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(polities[0]?.id || null);

  const needle = searchableText(query).trim();
  const visible = polities.filter((item) => {
    const itemTypeKey = getTypeKey(item);
    const matchesType = type === "all" || itemTypeKey === type;
    const haystack = searchableText(
      getNameRaw(item),
      getSummary(item),
      getPeriod(item),
      getTypeRaw(item),
      item.mapping,
      item.region,
      item.organization,
    );
    return matchesType && (!needle || haystack.includes(needle));
  });

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">{copy.overline}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{copy.title}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">{copy.intro}</p>
      </header>

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label={copy.searchLabel} placeholder={copy.search} className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50" />
        <div className="flex gap-2 overflow-x-auto">
          <button type="button" onClick={() => setType("all")} aria-pressed={type === "all"} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${type === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>{copy.all}</button>
          {types.map(({ key, value }) => (
            <button key={key} type="button" onClick={() => setType(key)} aria-pressed={type === key} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${type === key ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}><TranslatedInline value={value} /></button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {visible.map((item, index) => {
          const id = String(item.id || `${searchableText(getNameRaw(item)) || "formation"}-${index}`);
          const expanded = openId === id;
          const panelId = `${id.replace(/[^a-zA-Z0-9_-]/g, "-")}-details`;
          return (
            <article key={id} className="overflow-hidden rounded-2xl border border-bone/10 bg-bone/[0.025]">
              <button type="button" onClick={() => setOpenId(expanded ? null : id)} className="w-full p-5 text-left" aria-expanded={expanded} aria-controls={panelId}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-gold"><TranslatedInline value={getPeriod(item)} /> · <TranslatedInline value={getTypeRaw(item)} /></p>
                    <h3 className="mt-2 font-serif text-2xl text-bone">{getName(item)}</h3>
                  </div>
                  <span className="text-xl text-gold" aria-hidden="true">{expanded ? "−" : "+"}</span>
                </div>
                {getSummary(item) && <TranslatedText value={getSummary(item)} className="mt-4 max-w-4xl leading-7 text-bone/70" />}
              </button>

              {expanded && (
                <div id={panelId} className="border-t border-bone/10 px-5 pb-6 pt-5">
                  <div className="grid gap-3 md:grid-cols-2">
                    {item.mapping && <div className="rounded-xl border border-bone/10 bg-black/10 p-4"><p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.mapping}</p><TranslatedText value={item.mapping} className="mt-2 text-sm leading-6 text-bone/72" /></div>}
                    {item.region && <div className="rounded-xl border border-bone/10 bg-black/10 p-4"><p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.region}</p><TranslatedText value={item.region} className="mt-2 text-sm leading-6 text-bone/72" /></div>}
                    {item.organization && <div className="rounded-xl border border-bone/10 bg-black/10 p-4 md:col-span-2"><p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.organization}</p><TranslatedText value={item.organization} className="mt-2 text-sm leading-6 text-bone/72" /></div>}
                  </div>
                  <SourceLinks ids={item.sources || item.sourceIds} sourceMap={sourceMap} />
                </div>
              )}
            </article>
          );
        })}
      </div>

      {!visible.length && <div className="rounded-xl border border-bone/10 p-5 text-bone/60">{copy.empty}</div>}
      <p className="text-xs leading-relaxed text-bone/45">{copy.footer}</p>
    </div>
  );
}
