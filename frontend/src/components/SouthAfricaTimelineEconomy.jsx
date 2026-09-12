import { useMemo, useState } from "react";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";
import { localizedValue, searchableText } from "../lib/contentSort";

const COPY = {
  fr: {
    periods: [
      ["all", "Tout"], ["human-origins", "Origines humaines"], ["precolonial", "Avant 1652"],
      ["kingdoms", "Royaumes"], ["colonisation", "Colonisation"], ["migration", "Migrations"],
      ["industrialisation", "Industrialisation"], ["union-segregation", "Union & ségrégation"],
      ["apartheid", "Apartheid"], ["democracy", "Démocratie"],
    ],
    bceYears: "ans avant notre ère",
    historicalTransformations: "Transformations historiques",
    contemporaryEconomy: "Économie contemporaine",
    structuralSectors: "Secteurs structurants",
    documentedChallenges: "Défis documentés",
    dataAsOf: "Donnée",
    consult: "Consulter",
    category: "Catégorie",
    source: "Source",
  },
  en: {
    periods: [
      ["all", "All"], ["human-origins", "Human origins"], ["precolonial", "Before 1652"],
      ["kingdoms", "Kingdoms"], ["colonisation", "Colonisation"], ["migration", "Migrations"],
      ["industrialisation", "Industrialisation"], ["union-segregation", "Union & segregation"],
      ["apartheid", "Apartheid"], ["democracy", "Democracy"],
    ],
    bceYears: "years BCE",
    historicalTransformations: "Historical transformations",
    contemporaryEconomy: "Contemporary economy",
    structuralSectors: "Structural sectors",
    documentedChallenges: "Documented challenges",
    dataAsOf: "Data",
    consult: "View source",
    category: "Category",
    source: "Source",
  },
};

function Localized({ value, as: Tag = "span", className = "" }) {
  const { lang } = useI18n();
  const translated = useTranslated(value || "");
  if (value == null || value === "") return null;
  return <Tag className={className}>{translated || localizedValue(value, lang)}</Tag>;
}

function SourceList({ ids = [], sourceMap = new Map() }) {
  const { lang } = useI18n();
  if (!ids?.length) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {ids.map((id) => {
        const source = sourceMap.get(id);
        if (!source?.url) return null;
        const publisher = localizedValue(source.publisher, lang) || localizedValue(source.title, lang) || id;
        return (
          <a key={id} className="text-[11px] text-gold/80 underline underline-offset-2" href={source.url} target="_blank" rel="noreferrer">
            {publisher}
          </a>
        );
      })}
    </div>
  );
}

function timelineItems(dossier) {
  const value = dossier?.interactive_timeline;
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.items)) return value.items;
  return [];
}

function formatTimelineYear(item, lang, copy) {
  const year = Number(item?.year ?? item?.start);
  if (!Number.isFinite(year)) return localizedValue(item?.period || item?.date, lang);
  if (year < 0) return `${Math.abs(year).toLocaleString(lang === "fr" ? "fr-FR" : "en-US")} ${copy.bceYears}`;
  const end = Number(item?.end);
  if (Number.isFinite(end) && end !== year) return `${year}–${end}`;
  return String(year);
}

export function SouthAfricaInteractiveTimeline({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const [period, setPeriod] = useState("all");
  const allItems = useMemo(() => timelineItems(dossier), [dossier]);
  const items = useMemo(
    () => allItems.filter((item) => period === "all" || item.period === period || item.category === period),
    [allItems, period],
  );

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {copy.periods.map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={period === id}
            onClick={() => setPeriod(id)}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${period === id ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="relative space-y-5 border-l border-gold/30 pl-5">
        {items.map((item, index) => (
          <article key={item.id || `${searchableText(item.title || item.label)}-${index}`} className="relative rounded-lg border border-bone/10 bg-bone/[0.025] p-4">
            <span className="absolute -left-[27px] top-5 h-3 w-3 rounded-full border-2 border-gold bg-[#15110f]" />
            <p className="text-xs uppercase tracking-wider text-gold">{formatTimelineYear(item, lang, copy)}</p>
            <Localized value={item.title || item.label} as="h3" className="mt-1 font-serif text-xl text-bone" />
            <Localized value={item.summary || item.text} as="p" className="mt-2 text-sm leading-relaxed text-bone/70" />
            <SourceList ids={item.sourceIds || item.sources} sourceMap={sourceMap} />
          </article>
        ))}
      </div>
    </div>
  );
}

export function SouthAfricaEconomy({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const economy = dossier?.economy || {};
  const transformations = economy.historicalTransformations || economy.historical_transformations || [];
  const indicators = economy.currentIndicators || economy.current_indicators || [];
  const sectors = economy.sectors || [];
  const challenges = economy.challenges || [];

  return (
    <div className="space-y-8">
      {economy.intro && <Localized value={economy.intro} as="p" className="text-sm leading-relaxed text-bone/70" />}
      {transformations.length > 0 && (
        <section>
          <h2 className="mb-4 font-serif text-2xl text-gold">{copy.historicalTransformations}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {transformations.map((item, index) => (
              <article key={item.id || `${searchableText(item.title)}-${index}`} className="rounded-lg border border-bone/10 p-4">
                <Localized value={item.title} as="h3" className="font-serif text-lg text-bone" />
                <Localized value={item.text || item.summary} as="p" className="mt-2 text-sm leading-relaxed text-bone/70" />
                <SourceList ids={item.sourceIds || item.sources} sourceMap={sourceMap} />
              </article>
            ))}
          </div>
        </section>
      )}
      {indicators.length > 0 && (
        <section>
          <h2 className="mb-4 font-serif text-2xl text-gold">{copy.contemporaryEconomy}</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {indicators.map((item, index) => (
              <article key={item.id || `${searchableText(item.label)}-${index}`} className="rounded-lg border border-bone/10 p-4">
                <Localized value={item.label} as="p" className="text-xs text-bone/50" />
                <Localized value={item.value} as="p" className="mt-1 font-serif text-2xl text-gold" />
                {item.asOf && <p className="mt-1 text-[11px] text-bone/40">{copy.dataAsOf} : {localizedValue(item.asOf, lang)}</p>}
                <SourceList ids={item.sourceIds || item.sources} sourceMap={sourceMap} />
              </article>
            ))}
          </div>
        </section>
      )}
      {sectors.length > 0 && (
        <section>
          <h2 className="mb-4 font-serif text-2xl text-gold">{copy.structuralSectors}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {sectors.map((item, index) => (
              <article key={item.id || `${searchableText(item.name || item.title)}-${index}`} className="rounded-lg border border-bone/10 p-4">
                <Localized value={item.name || item.title} as="h3" className="font-serif text-lg text-bone" />
                <Localized value={item.note || item.summary || item.text} as="p" className="mt-2 text-sm text-bone/70" />
                <SourceList ids={item.sourceIds || item.sources} sourceMap={sourceMap} />
              </article>
            ))}
          </div>
        </section>
      )}
      {challenges.length > 0 && (
        <section>
          <h2 className="mb-3 font-serif text-2xl text-gold">{copy.documentedChallenges}</h2>
          <ul className="list-disc space-y-2 pl-5 text-bone/70">
            {challenges.map((item, index) => <li key={`${searchableText(item)}-${index}`}><Localized value={item} /></li>)}
          </ul>
        </section>
      )}
    </div>
  );
}

export function SouthAfricaScientificLibrary({ dossier, sourceMap = new Map() }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const groups = Array.isArray(dossier?.scientific_library) ? dossier.scientific_library : [];

  return (
    <div className="space-y-6">
      {groups.map((group, groupIndex) => (
        <section key={group.id || `${searchableText(group.category)}-${groupIndex}`}>
          <Localized value={group.category} as="h2" className="mb-3 font-serif text-2xl text-gold" />
          <div className="space-y-3">
            {(group.items || []).map((id) => {
              const source = sourceMap.get(id);
              if (!source) return null;
              const title = localizedValue(source.title, lang) || id;
              const publisher = localizedValue(source.publisher, lang) || copy.source;
              const category = localizedValue(source.category, lang);
              return (
                <article key={id} className="border-b border-bone/10 pb-3">
                  <p className="text-bone">{title}</p>
                  <p className="text-xs text-bone/50">
                    {publisher}{source.year ? ` · ${source.year}` : ""}{category ? ` · ${copy.category} ${category}` : ""}
                  </p>
                  {source.url && <a className="text-xs text-gold/80 underline underline-offset-2" href={source.url} target="_blank" rel="noreferrer">{copy.consult}</a>}
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
