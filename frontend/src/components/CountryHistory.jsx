import { useState } from "react";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";
import { localizedValue } from "../lib/contentSort";

const COPY = {
  fr: {
    countryFallback: "ce pays",
    overline: "Histoire",
    title: "Histoire de {country}",
    intro: "Parcourez les grandes périodes qui ont façonné {country}, des traces archéologiques et sociétés anciennes aux transformations politiques, sociales et culturelles contemporaines.",
    periodFallback: "Période à préciser",
    chapterFallback: "Chapitre historique",
  },
  en: {
    countryFallback: "this country",
    overline: "History",
    title: "History of {country}",
    intro: "Explore the major periods that shaped {country}, from archaeological evidence and early societies to modern political, social and cultural transformations.",
    periodFallback: "Period to be specified",
    chapterFallback: "Historical chapter",
  },
};

function SourceLink({ source, lang }) {
  const translatedPublisher = useTranslated(source?.publisher || "");
  const translatedTitle = useTranslated(source?.title || "");
  if (!source?.url) return null;
  const publisher = translatedPublisher || localizedValue(source.publisher, lang);
  const title = translatedTitle || localizedValue(source.title, lang) || source.id;
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noreferrer"
      className="rounded-full border border-gold/25 px-3 py-1 text-[11px] text-gold/85"
    >
      {[publisher, title].filter(Boolean).join(": ")}
    </a>
  );
}

function SourceLinks({ ids = [], sourceMap, lang }) {
  if (!ids.length || !sourceMap) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {ids.map((id) => {
        const source = sourceMap.get(id);
        return source?.url ? <SourceLink key={id} source={source} lang={lang} /> : null;
      })}
    </div>
  );
}

function TranslatedDetail({ text, lang }) {
  const translated = useTranslated(text || "");
  return <p className="mt-3 text-sm leading-6 text-bone/62">{translated || localizedValue(text, lang)}</p>;
}

function HistoryChapter({ chapter, index, expanded, onToggle, sourceMap, labels, lang }) {
  const translatedPeriod = useTranslated(chapter.period || "");
  const translatedTitle = useTranslated(chapter.title || "");
  const translatedSummary = useTranslated(chapter.summary || "");
  const id = chapter.id || `history-${index}`;
  const panelId = `${id}-content`;

  return (
    <article className="rounded-2xl border border-bone/10 bg-bone/[.025] p-5">
      <button
        type="button"
        className="w-full text-left"
        onClick={() => onToggle(expanded ? null : id)}
        aria-expanded={expanded}
        aria-controls={panelId}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[.16em] text-gold/75">{translatedPeriod || localizedValue(chapter.period, lang) || labels.periodFallback}</p>
            <h3 className="mt-1 font-serif text-2xl text-bone">{translatedTitle || localizedValue(chapter.title, lang) || labels.chapterFallback}</h3>
          </div>
          <span className="text-bone/40" aria-hidden="true">{expanded ? "−" : "+"}</span>
        </div>
      </button>
      {expanded && (
        <div id={panelId} className="mt-4 border-t border-bone/10 pt-4">
          {chapter.summary && <p className="leading-7 text-bone/75">{translatedSummary || localizedValue(chapter.summary, lang)}</p>}
          {(chapter.details || []).map((item, i) => <TranslatedDetail key={`${id}-detail-${i}`} text={item} lang={lang} />)}
          <SourceLinks ids={chapter.sources || []} sourceMap={sourceMap} lang={lang} />
        </div>
      )}
    </article>
  );
}

export function CountryHistory({ dossier = {}, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const chapters = dossier.history_chapters || dossier.history || [];
  const [open, setOpen] = useState(chapters[0]?.id || null);
  const countryName = localizedValue(dossier?.name || dossier?.country, lang) || copy.countryFallback;
  const labels = {
    ...copy,
    title: copy.title.replace("{country}", countryName),
    intro: copy.intro.replace("{country}", countryName),
  };

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[.08] to-transparent p-6">
        <p className="overline text-gold">{labels.overline}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{labels.title}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">{labels.intro}</p>
      </header>
      <div className="relative space-y-3">
        {chapters.map((chapter, index) => {
          const id = chapter.id || `history-${index}`;
          return (
            <HistoryChapter
              key={id}
              chapter={chapter}
              index={index}
              expanded={open === id}
              onToggle={setOpen}
              sourceMap={sourceMap}
              labels={labels}
              lang={lang}
            />
          );
        })}
      </div>
    </div>
  );
}

export const SouthAfricaHistory = CountryHistory;
