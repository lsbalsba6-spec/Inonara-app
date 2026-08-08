import { useState } from "react";

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

export function CountryHistory({ dossier = {}, sourceMap }) {
  const chapters = dossier.history_chapters || dossier.history || [];
  const [open, setOpen] = useState(chapters[0]?.id || null);
  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[.08] to-transparent p-6">
        <p className="overline text-gold">Histoire</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">Histoire de {dossier?.name?.fr || dossier?.country || "ce pays"}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          La chronologie distingue les traces archéologiques, les reconstructions historiques et les traditions orales.
          Les frontières actuelles ne sont pas projetées artificiellement sur les périodes anciennes.
        </p>
      </header>
      <div className="relative space-y-3">
        {chapters.map((chapter, index) => {
          const id = chapter.id || `history-${index}`;
          const expanded = open === id;
          return (
            <article key={id} className="rounded-2xl border border-bone/10 bg-bone/[.025] p-5">
              <button type="button" className="w-full text-left" onClick={() => setOpen(expanded ? null : id)}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[.16em] text-gold/75">{chapter.period || "Période à préciser"}</p>
                    <h3 className="mt-1 font-serif text-2xl text-bone">{chapter.title || "Chapitre historique"}</h3>
                  </div>
                  <span className="text-bone/40">{expanded ? "−" : "+"}</span>
                </div>
              </button>
              {expanded && (
                <div className="mt-4 border-t border-bone/10 pt-4">
                  {chapter.summary && <p className="leading-7 text-bone/75">{chapter.summary}</p>}
                  {chapter.details?.map((item, i) => <p key={i} className="mt-3 text-sm leading-6 text-bone/62">{item}</p>)}
                  {chapter.status && <p className="mt-4 text-[10px] uppercase tracking-[.14em] text-bone/35">Statut éditorial : {chapter.status}</p>}
                  <SourceLinks ids={chapter.sources || []} sourceMap={sourceMap} />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export const SouthAfricaHistory = CountryHistory;
