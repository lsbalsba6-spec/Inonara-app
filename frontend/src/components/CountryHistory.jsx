import { useState } from "react";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";

function SourceLinks({ ids = [], sourceMap }) {
  if (!ids.length || !sourceMap) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {ids.map((id) => {
        const s = sourceMap.get(id);
        if (!s?.url) return null;
        return <a key={id} href={s.url} target="_blank" rel="noreferrer"
          className="rounded-full border border-gold/25 px-3 py-1 text-[11px] text-gold/85">{s.publisher}: {s.title}</a>;
      })}
    </div>
  );
}

function HistoryChapter({ chapter, index, expanded, onToggle, sourceMap, labels }) {
  const translatedPeriod = useTranslated(chapter.period || "");
  const translatedTitle = useTranslated(chapter.title || "");
  const translatedSummary = useTranslated(chapter.summary || "");
  const translatedStatus = useTranslated(chapter.status || "");
  const translatedDetails = (chapter.details || []).map((item) => useTranslated(item || ""));
  const id = chapter.id || `history-${index}`;

  return (
    <article className="rounded-2xl border border-bone/10 bg-bone/[.025] p-5">
      <button type="button" className="w-full text-left" onClick={() => onToggle(expanded ? null : id)}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[.16em] text-gold/75">{translatedPeriod || labels.periodFallback}</p>
            <h3 className="mt-1 font-serif text-2xl text-bone">{translatedTitle || labels.chapterFallback}</h3>
          </div>
          <span className="text-bone/40">{expanded ? "−" : "+"}</span>
        </div>
      </button>
      {expanded && (
        <div className="mt-4 border-t border-bone/10 pt-4">
          {chapter.summary && <p className="leading-7 text-bone/75">{translatedSummary || chapter.summary}</p>}
          {translatedDetails.map((item, i) => <p key={i} className="mt-3 text-sm leading-6 text-bone/62">{item || chapter.details[i]}</p>)}
          {chapter.status && <p className="mt-4 text-[10px] uppercase tracking-[.14em] text-bone/35">{labels.editorialStatus}: {translatedStatus || chapter.status}</p>}
          <SourceLinks ids={chapter.sources || []} sourceMap={sourceMap} />
        </div>
      )}
    </article>
  );
}

export function CountryHistory({ dossier = {}, sourceMap }) {
  const { lang } = useI18n();
  const chapters = dossier.history_chapters || dossier.history || [];
  const [open, setOpen] = useState(chapters[0]?.id || null);
  const countryName = dossier?.name?.[lang] || dossier?.name?.fr || dossier?.country || (lang === "fr" ? "ce pays" : "this country");
  const labels = lang === "fr" ? {
    overline: "Histoire",
    title: `Histoire de ${countryName}`,
    intro: "La chronologie distingue les traces archéologiques, les reconstructions historiques et les traditions orales. Les frontières actuelles ne sont pas projetées artificiellement sur les périodes anciennes.",
    periodFallback: "Période à préciser",
    chapterFallback: "Chapitre historique",
    editorialStatus: "Statut éditorial",
  } : {
    overline: "History",
    title: `History of ${countryName}`,
    intro: "The timeline distinguishes archaeological evidence, historical reconstructions and oral traditions. Present-day borders are not artificially projected onto earlier periods.",
    periodFallback: "Period to be specified",
    chapterFallback: "Historical chapter",
    editorialStatus: "Editorial status",
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
            />
          );
        })}
      </div>
    </div>
  );
}

export const SouthAfricaHistory = CountryHistory;
