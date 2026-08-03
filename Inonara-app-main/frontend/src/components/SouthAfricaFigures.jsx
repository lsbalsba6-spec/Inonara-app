import { useMemo, useState } from "react";

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

function getName(item) {
  return item.name || item.title || "Personnalité";
}

function getSummary(item) {
  return item.reason || item.note || item.summary || item.description || "";
}

function getField(item) {
  return item.field || item.domain || item.category || "Autre";
}

export function SouthAfricaFigures({ dossier, sourceMap }) {
  const figures = useMemo(
    () => dossier.figures || [],
    [dossier.figures],
  );
  const fields = useMemo(
    () => [...new Set(figures.map(getField))],
    [figures],
  );

  const [field, setField] = useState("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(figures[0]?.id || null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return figures.filter((item) => {
      const matchesField = field === "all" || getField(item) === field;
      const haystack = `${getName(item)} ${getSummary(item)} ${getField(item)}`
        .toLowerCase();
      const matchesQuery = !needle || haystack.includes(needle);
      return matchesField && matchesQuery;
    });
  }, [figures, field, query]);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">Personnalités</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">
          Parcours, œuvres et héritages
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          Cette sélection met en avant des trajectoires politiques, scientifiques,
          artistiques, sportives et intellectuelles. Elle ne prétend pas résumer à
          elle seule toute l’histoire sociale du pays.
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="block">
          <span className="sr-only">Rechercher une personnalité</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher une personnalité ou un domaine…"
            className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50"
          />
        </label>

        <div className="flex gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setField("all")}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
              field === "all"
                ? "border-gold bg-gold/10 text-gold"
                : "border-bone/15 text-bone/60 hover:text-bone"
            }`}
          >
            Tous les domaines
          </button>
          {fields.map((itemField) => (
            <button
              key={itemField}
              type="button"
              onClick={() => setField(itemField)}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
                field === itemField
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-bone/15 text-bone/60 hover:text-bone"
              }`}
            >
              {itemField}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {visible.map((item, index) => {
          const id = item.id || `${getName(item)}-${index}`;
          const expanded = openId === id;

          return (
            <article
              key={id}
              className="overflow-hidden rounded-2xl border border-bone/10 bg-bone/[0.025]"
            >
              <button
                type="button"
                onClick={() => setOpenId(expanded ? null : id)}
                className="w-full p-5 text-left"
                aria-expanded={expanded}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-gold">
                      {getField(item)}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl text-bone">
                      {getName(item)}
                    </h3>
                  </div>
                  <span className="text-xl text-gold">{expanded ? "−" : "+"}</span>
                </div>

                {getSummary(item) && (
                  <p className="mt-4 max-w-4xl leading-7 text-bone/70">
                    {getSummary(item)}
                  </p>
                )}
              </button>

              {expanded && (
                <div className="border-t border-bone/10 px-5 pb-6 pt-5">
                  {item.biography?.length > 0 && (
                    <div className="mb-5 space-y-4 rounded-xl border border-bone/10 bg-black/10 p-5">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-gold/80">Biographie développée</p>
                      {item.biography.map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex} className="text-sm leading-7 text-bone/75">{paragraph}</p>
                      ))}
                    </div>
                  )}
                  {item.highlights?.length > 0 && (
                    <div className="mb-5 flex flex-wrap gap-2">
                      {item.highlights.map((highlight) => (
                        <span key={highlight} className="rounded-full border border-gold/20 bg-gold/[0.05] px-3 py-1 text-xs text-gold/85">{highlight}</span>
                      ))}
                    </div>
                  )}
                  <div className="grid gap-3 md:grid-cols-2">
                    {item.birth && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">
                          Naissance
                        </p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          {item.birth}
                        </p>
                      </div>
                    )}
                    {item.death && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">
                          Décès
                        </p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          {item.death}
                        </p>
                      </div>
                    )}
                    {item.legacy && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4 md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">
                          Héritage
                        </p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          {item.legacy}
                        </p>
                      </div>
                    )}
                  </div>

                  <SourceLinks ids={item.sources || item.sourceIds} sourceMap={sourceMap} />
                </div>
              )}
            </article>
          );
        })}
      </div>

      {!visible.length && (
        <div className="rounded-xl border border-bone/10 p-5 text-bone/60">
          Aucune personnalité ne correspond à cette recherche.
        </div>
      )}
    </div>
  );
}
