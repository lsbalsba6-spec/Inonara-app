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

const getTitle = (item) => item.title || item.name || item.topic || "Thème de société";
const getBody = (item) => item.text || item.note || item.summary || item.description || "";
const getCategory = (item) => item.category || item.type || item.domain || "Société";

export function SouthAfricaSocietyQuality({ dossier, sourceMap }) {
  const items = useMemo(
    () => dossier.society?.themes || dossier.society?.topics || dossier.society_topics || [],
    [dossier],
  );
  const normalizedItems = useMemo(
    () => Array.isArray(items) ? items : [],
    [items],
  );
  const categories = useMemo(
    () => [...new Set(normalizedItems.map(getCategory))],
    [normalizedItems],
  );

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [openId, setOpenId] = useState(normalizedItems[0]?.id || null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return normalizedItems.filter((item) => {
      const matchesCategory =
        category === "all" || getCategory(item) === category;
      const haystack = `${getTitle(item)} ${getBody(item)} ${getCategory(item)}`
        .toLowerCase();
      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [normalizedItems, query, category]);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">Société</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">
          Citoyenneté, territoires et inégalités
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          Cette section relie les réalités contemporaines aux héritages historiques :
          urbanisation, accès aux services, transformations familiales, citoyenneté,
          inégalités spatiales et recompositions sociales.
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher un thème de société…"
          className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50"
        />

        <div className="flex gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
              category === "all"
                ? "border-gold bg-gold/10 text-gold"
                : "border-bone/15 text-bone/60"
            }`}
          >
            Tous les thèmes
          </button>
          {categories.map((itemCategory) => (
            <button
              key={itemCategory}
              type="button"
              onClick={() => setCategory(itemCategory)}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
                category === itemCategory
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-bone/15 text-bone/60"
              }`}
            >
              {itemCategory}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {visible.map((item, index) => {
          const id = item.id || `${getTitle(item)}-${index}`;
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
                      {getCategory(item)}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl text-bone">
                      {getTitle(item)}
                    </h3>
                  </div>
                  <span className="text-xl text-gold">{expanded ? "−" : "+"}</span>
                </div>

                {getBody(item) && (
                  <p className="mt-4 max-w-4xl leading-7 text-bone/70">
                    {getBody(item)}
                  </p>
                )}
              </button>

              {expanded && (
                <div className="border-t border-bone/10 px-5 pb-6 pt-5">
                  <div className="grid gap-3 md:grid-cols-2">
                    {item.data && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">
                          Donnée clé
                        </p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          {item.data}
                        </p>
                      </div>
                    )}
                    {item.period && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">
                          Période
                        </p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          {item.period}
                        </p>
                      </div>
                    )}
                    {item.context && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4 md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">
                          Contexte
                        </p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          {item.context}
                        </p>
                      </div>
                    )}
                    {item.caution && (
                      <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-amber-300/75">
                          Précaution de lecture
                        </p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          {item.caution}
                        </p>
                      </div>
                    )}
                  </div>

                  <SourceLinks ids={item.sources} sourceMap={sourceMap} />
                </div>
              )}
            </article>
          );
        })}
      </div>

      {!visible.length && (
        <div className="rounded-xl border border-bone/10 p-5 text-bone/60">
          Aucun thème de société ne correspond à cette recherche.
        </div>
      )}
    </div>
  );
}
