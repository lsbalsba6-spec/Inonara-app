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

function getTitle(item) {
  return item.name || item.title || item.site || "Site patrimonial";
}

function getBody(item) {
  return item.note || item.text || item.summary || item.description || "";
}

function heritageType(item) {
  return item.type || item.category || "patrimoine";
}

export function SouthAfricaHeritage({ dossier, sourceMap }) {
  const items = dossier.heritage || [];
  const categories = useMemo(
    () => [...new Set(items.map(heritageType))],
    [items],
  );

  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(items[0]?.id || null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory =
        category === "all" || heritageType(item) === category;
      const haystack = `${getTitle(item)} ${getBody(item)} ${heritageType(item)}`
        .toLowerCase();
      const matchesQuery = !needle || haystack.includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [items, category, query]);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">Patrimoine & nature</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">
          Sites, paysages et mémoires
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          Cette section réunit les sites culturels, naturels et mixtes, mais aussi
          les lieux de mémoire et les paysages habités. Le classement UNESCO ne
          constitue pas l’unique mesure de l’importance patrimoniale.
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="block">
          <span className="sr-only">Rechercher dans le patrimoine</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un site, un paysage ou un lieu de mémoire…"
            className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50"
          />
        </label>

        <div className="flex gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
              category === "all"
                ? "border-gold bg-gold/10 text-gold"
                : "border-bone/15 text-bone/60 hover:text-bone"
            }`}
          >
            Tout afficher
          </button>
          {categories.map((itemCategory) => (
            <button
              key={itemCategory}
              type="button"
              onClick={() => setCategory(itemCategory)}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
                category === itemCategory
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-bone/15 text-bone/60 hover:text-bone"
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
                      {heritageType(item)}
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
                    {item.location && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">
                          Localisation
                        </p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          {item.location}
                        </p>
                      </div>
                    )}
                    {item.mapping && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">
                          Cartographie
                        </p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          {item.mapping}
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
                    {item.status && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">
                          Statut éditorial
                        </p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          {item.status}
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
          Aucun élément patrimonial ne correspond à cette recherche.
        </div>
      )}

      <p className="text-xs leading-relaxed text-bone/45">
        Les limites de certains paysages culturels et sites archéologiques sont
        approximatives. Inonara ne transforme pas automatiquement une zone
        d’influence ou un espace mémoriel en frontière politique.
      </p>
    </div>
  );
}
