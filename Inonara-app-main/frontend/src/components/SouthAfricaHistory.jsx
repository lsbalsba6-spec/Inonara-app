import { useMemo, useState } from "react";

const STATUS_LABELS = {
  ready: "Établi",
  provisional: "À lire avec contexte",
  disputed: "Débat historique",
  "research-gap": "À suivre",
};

function SourceLinks({ ids = [], sourceMap }) {
  if (!ids.length) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {ids.map((id) => {
        const source = sourceMap.get(id);
        if (!source) return null;
        return (
          <a
            key={id}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-gold/25 px-3 py-1 text-[11px] text-gold/85 hover:bg-gold/10"
          >
            {source.publisher}: {source.title}
          </a>
        );
      })}
    </div>
  );
}

function chapterEra(chapter) {
  const text = `${chapter.period || ""} ${chapter.title || ""}`.toLowerCase();
  if (text.includes("million") || text.includes("homin") || text.includes("premier millénaire")) return "deep";
  if (text.includes("900") || text.includes("1300") || text.includes("mapungubwe") || text.includes("royaume")) return "precolonial";
  if (text.includes("1652") || text.includes("1795") || text.includes("cap néerlandais")) return "cape";
  if (text.includes("1795") || text.includes("1910") || text.includes("xixe")) return "nineteenth";
  if (text.includes("1910") || text.includes("1948") || text.includes("union")) return "union";
  if (text.includes("apartheid") || text.includes("1948") || text.includes("1994")) return "apartheid";
  return "democracy";
}

const FILTERS = [
  ["all", "Tout le récit"],
  ["deep", "Temps profonds"],
  ["precolonial", "Sociétés précoloniales"],
  ["cape", "Le Cap colonial"],
  ["nineteenth", "XIXe siècle"],
  ["union", "Union & ségrégation"],
  ["apartheid", "Apartheid"],
  ["democracy", "Démocratie"],
];

export function SouthAfricaHistory({ dossier, sourceMap }) {
  const chapters = useMemo(
    () => dossier.overview?.history_chapters || [],
    [dossier],
  );
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState(chapters[0]?.id || null);

  const visible = useMemo(
    () => filter === "all" ? chapters : chapters.filter((chapter) => chapterEra(chapter) === filter),
    [chapters, filter],
  );

  if (!chapters.length) {
    return (
      <div className="rounded-xl border border-bone/10 p-5 text-bone/65">
        Le récit historique détaillé sera affiché dès que les chapitres documentaires seront disponibles.
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">Récit historique</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">
          Des temps profonds à l’Afrique du Sud contemporaine
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          Cette lecture relie les peuplements, les formations politiques, les circulations,
          la colonisation, les résistances et la démocratie. Les frontières actuelles ne sont
          jamais projetées automatiquement sur les périodes anciennes.
        </p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {FILTERS.map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
              filter === id
                ? "border-gold bg-gold/10 text-gold"
                : "border-bone/15 text-bone/60 hover:text-bone"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {visible.map((chapter, index) => {
          const expanded = openId === chapter.id;
          return (
            <article
              key={chapter.id}
              className="overflow-hidden rounded-2xl border border-bone/10 bg-bone/[0.025]"
            >
              <button
                type="button"
                onClick={() => setOpenId(expanded ? null : chapter.id)}
                className="w-full p-5 text-left"
                aria-expanded={expanded}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-gold">
                      {chapter.period}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl text-bone">
                      {chapter.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-bone/15 px-2.5 py-1 text-[10px] uppercase tracking-wider text-bone/50">
                      {STATUS_LABELS[chapter.status] || chapter.status}
                    </span>
                    <span className="text-xl text-gold">{expanded ? "−" : "+"}</span>
                  </div>
                </div>
                <p className="mt-4 max-w-4xl leading-7 text-bone/70">
                  {chapter.summary}
                </p>
              </button>

              {expanded && (
                <div className="border-t border-bone/10 px-5 pb-6 pt-5">
                  {chapter.details?.length > 0 && (
                    <div className="grid gap-3 md:grid-cols-2">
                      {chapter.details.map((detail, detailIndex) => (
                        <div
                          key={`${chapter.id}-${detailIndex}`}
                          className="rounded-xl border border-bone/10 bg-black/10 p-4"
                        >
                          <p className="text-sm leading-6 text-bone/68">{detail}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <SourceLinks ids={chapter.sources} sourceMap={sourceMap} />
                </div>
              )}
            </article>
          );
        })}
      </div>

      <p className="text-xs leading-relaxed text-bone/45">
        Les dates anciennes sont parfois approximatives. Les statuts affichés indiquent le niveau
        d’intégration éditoriale, pas une certitude absolue sur chaque détail historique.
      </p>
    </div>
  );
}
