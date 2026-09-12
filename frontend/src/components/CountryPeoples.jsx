import { useMemo, useState } from "react";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";
import { localizedValue, searchableText } from "../lib/contentSort";

function TranslatedInline({ value }) {
  const { lang } = useI18n();
  const translated = useTranslated(value || "");
  return translated || localizedValue(value, lang) || null;
}

function SourceLink({ source }) {
  const { lang } = useI18n();
  const translatedTitle = useTranslated(source?.title || "");
  const translatedPublisher = useTranslated(source?.publisher || "");
  if (!source?.url) return null;
  return (
    <a href={source.url} target="_blank" rel="noreferrer"
      className="rounded-full border border-gold/25 px-3 py-1 text-[11px] text-gold/85 hover:bg-gold/10">
      {translatedPublisher || localizedValue(source.publisher, lang) || "Source"}: {translatedTitle || localizedValue(source.title, lang) || source.id}
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

const getName = (item) => item.name || item.title || "";
const getSummary = (item) => item.note || item.text || item.summary || item.description || "";
const getRegion = (item) => item.region || item.location || item.area || "";
const languageList = (value) => Array.isArray(value) ? value : value ? [value] : [];
const regionKey = (value) => searchableText(value);

function TranslatedParagraph({ text }) {
  const { lang } = useI18n();
  const translated = useTranslated(text || "");
  return <p className="text-sm leading-7 text-bone/75">{translated || localizedValue(text, lang)}</p>;
}

function PeopleCard({ item, index, openId, setOpenId, sourceMap, labels }) {
  const { lang } = useI18n();
  const rawName = getName(item);
  const rawSummary = getSummary(item);
  const rawRegion = getRegion(item);
  const translatedName = useTranslated(rawName);
  const translatedSummary = useTranslated(rawSummary);
  const translatedRegion = useTranslated(rawRegion);
  const translatedHistory = useTranslated(item.history || "");
  const translatedCaution = useTranslated(item.caution || "");
  const displayName = translatedName || localizedValue(rawName, lang) || labels.communityFallback;
  const displaySummary = translatedSummary || localizedValue(rawSummary, lang);
  const displayRegion = translatedRegion || localizedValue(rawRegion, lang) || labels.regionFallback;
  const id = String(item.id || item.slug || localizedValue(rawName, "en") || `community-${index}`);
  const expanded = openId === id;
  const panelId = `${id.replace(/[^a-zA-Z0-9_-]/g, "-")}-details`;

  return (
    <article className="overflow-hidden rounded-2xl border border-bone/10 bg-bone/[0.025]">
      <button type="button" onClick={() => setOpenId(expanded ? null : id)} className="w-full p-5 text-left" aria-expanded={expanded} aria-controls={panelId}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-gold">{displayRegion}</p>
            <h3 className="mt-2 font-serif text-2xl text-bone">{displayName}</h3>
          </div>
          <span className="text-xl text-gold" aria-hidden="true">{expanded ? "−" : "+"}</span>
        </div>
        {displaySummary && <p className="mt-4 max-w-4xl leading-7 text-bone/70">{displaySummary}</p>}
      </button>

      {expanded && (
        <div id={panelId} className="border-t border-bone/10 px-5 pb-6 pt-5">
          {item.paragraphs?.length > 0 && (
            <div className="mb-5 space-y-4 rounded-xl border border-bone/10 bg-black/10 p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-gold/80">{labels.expandedChapter}</p>
              {item.paragraphs.map((paragraph, paragraphIndex) => <TranslatedParagraph key={`${id}-p-${paragraphIndex}`} text={paragraph} />)}
            </div>
          )}
          <div className="grid gap-3 md:grid-cols-2">
            {languageList(item.languages).length > 0 && (
              <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{labels.languages}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {languageList(item.languages).map((language, languageIndex) => (
                    <span key={`${searchableText(language) || "language"}-${languageIndex}`} className="rounded-full border border-bone/15 px-3 py-1 text-xs text-bone/70">
                      <TranslatedInline value={language} />
                    </span>
                  ))}
                </div>
              </div>
            )}
            {item.history && (
              <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{labels.history}</p>
                <p className="mt-2 text-sm leading-6 text-bone/72">{translatedHistory || localizedValue(item.history, lang)}</p>
              </div>
            )}
            {item.caution && (
              <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 md:col-span-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-amber-300/75">{labels.caution}</p>
                <p className="mt-2 text-sm leading-6 text-bone/72">{translatedCaution || localizedValue(item.caution, lang)}</p>
              </div>
            )}
          </div>
          <SourceLinks ids={item.sources || item.sourceIds} sourceMap={sourceMap} />
        </div>
      )}
    </article>
  );
}

export function CountryPeoples({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const peoples = useMemo(() => dossier.peoples || [], [dossier.peoples]);
  const regions = useMemo(() => {
    const unique = new Map();
    peoples.map(getRegion).filter(Boolean).forEach((value) => {
      const key = regionKey(value);
      if (key && !unique.has(key)) unique.set(key, value);
    });
    return [...unique.entries()].map(([key, value]) => ({ key, value }));
  }, [peoples]);
  const [region, setRegion] = useState("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(() => String(peoples[0]?.id || peoples[0]?.slug || localizedValue(getName(peoples[0] || {}), "en") || ""));
  const labels = lang === "fr" ? {
    overline: "Peuples & communautés",
    title: "Histoires, langues et territoires",
    intro: "Les catégories contemporaines ne doivent pas être projetées mécaniquement sur toute l’histoire. Cette section présente des communautés diverses sans les figer comme des blocs homogènes.",
    placeholder: "Rechercher un peuple, une langue ou une région…",
    allRegions: "Toutes les régions",
    expandedChapter: "Chapitre développé",
    languages: "Langues associées",
    history: "Repères historiques",
    caution: "Précaution de lecture",
    empty: "Aucune communauté ne correspond à cette recherche.",
    footer: "Les noms, identités et appartenances varient selon les périodes, les langues et les usages administratifs. Les frontières culturelles ne sont pas des frontières politiques fixes.",
    communityFallback: "Communauté",
    regionFallback: "Répartition à préciser",
  } : {
    overline: "Peoples & communities",
    title: "Histories, languages and territories",
    intro: "Contemporary categories should not be mechanically projected across the whole of history. This section presents diverse communities without freezing them into homogeneous blocks.",
    placeholder: "Search a people, language or region…",
    allRegions: "All regions",
    expandedChapter: "Expanded chapter",
    languages: "Associated languages",
    history: "Historical reference points",
    caution: "Reading caution",
    empty: "No community matches this search.",
    footer: "Names, identities and forms of belonging vary across periods, languages and administrative usage. Cultural boundaries are not fixed political borders.",
    communityFallback: "Community",
    regionFallback: "Distribution to be specified",
  };

  const visible = useMemo(() => {
    const needle = searchableText(query).trim();
    return peoples.filter((item) => {
      const matchesRegion = region === "all" || regionKey(getRegion(item)) === region;
      const haystack = searchableText(getName(item), getSummary(item), getRegion(item), item.languages, item.history, item.caution);
      return matchesRegion && (!needle || haystack.includes(needle));
    });
  }, [peoples, region, query]);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">{labels.overline}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{labels.title}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">{labels.intro}</p>
      </header>

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.placeholder} aria-label={labels.placeholder} className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50" />
        <div className="flex gap-2 overflow-x-auto">
          <button type="button" onClick={() => setRegion("all")} aria-pressed={region === "all"} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${region === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>{labels.allRegions}</button>
          {regions.map(({ key, value }) => (
            <button key={key} type="button" onClick={() => setRegion(key)} aria-pressed={region === key} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${region === key ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>
              <TranslatedInline value={value} />
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {visible.map((item, index) => (
          <PeopleCard
            key={String(item.id || item.slug || localizedValue(getName(item), "en") || `community-${index}`)}
            item={item}
            index={index}
            openId={openId}
            setOpenId={setOpenId}
            sourceMap={sourceMap}
            labels={labels}
          />
        ))}
      </div>

      {!visible.length && <div className="rounded-xl border border-bone/10 p-5 text-bone/60">{labels.empty}</div>}
      <p className="text-xs leading-relaxed text-bone/45">{labels.footer}</p>
    </div>
  );
}
