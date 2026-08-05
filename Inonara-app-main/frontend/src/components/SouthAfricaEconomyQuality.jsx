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

const getTitle = (item) =>
  typeof item === "string"
    ? item
    : item.title || item.name || item.label || item.sector || item.topic || "Thème économique";

const getBody = (item) => {
  if (typeof item === "string") return item;
  const indicator = item.value
    ? `${item.value}${item.asOf ? ` · donnée ${item.asOf}` : ""}`
    : "";
  return item.text || item.note || item.summary || item.description || indicator;
};

const getCategory = (item) =>
  item.category || item.type || item.domain || "Économie";

function normalizeEconomy(dossier) {
  const economy = dossier.economy || {};
  if (Array.isArray(economy)) return economy;

  const candidates = [
    economy.sections,
    economy.topics,
    economy.sectors,
    economy.items,
    economy.historicalTransformations,
    economy.challenges,
    dossier.economy_topics,
  ];

  return candidates
    .filter(Array.isArray)
    .flat()
    .map((item, index) =>
      typeof item === "string"
        ? { id: `economy-challenge-${index}`, title: "Défi économique", text: item, category: "Défis" }
        : item,
    );
}

export function SouthAfricaEconomyQuality({ dossier, sourceMap }) {
  const items = useMemo(
    () => normalizeEconomy(dossier),
    [dossier],
  );
  const categories = useMemo(
    () => [...new Set(items.map(getCategory))],
    [items],
  );

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [openId, setOpenId] = useState(items[0]?.id || null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory =
        category === "all" || getCategory(item) === category;
      const haystack = `${getTitle(item)} ${getBody(item)} ${getCategory(item)} ${
        item.data || ""
      } ${item.period || ""}`.toLowerCase();

      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [items, query, category]);

  const indicators = useMemo(
    () => dossier.economy?.currentIndicators || dossier.economy?.indicators || dossier.economic_indicators || [],
    [dossier.economy, dossier.economic_indicators],
  );

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">Économie</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">
          Transformations, secteurs et inégalités
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          {dossier.economy?.intro || "Cette section présente les transformations historiques, les secteurs structurants et les défis économiques contemporains. Les chiffres doivent toujours être datés."}
        </p>
      </header>

      {Array.isArray(indicators) && indicators.length > 0 && (
        <section>
          <p className="overline text-gold">Indicateurs datés</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {indicators.map((indicator, index) => (
              <article
                key={indicator.id || indicator.label || index}
                className="rounded-2xl border border-bone/10 bg-bone/[0.025] p-5"
              >
                <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">
                  {indicator.year || indicator.period || indicator.asOf || "Date à préciser"}
                </p>
                <h3 className="mt-2 text-sm text-bone/65">
                  {indicator.label || indicator.name}
                </h3>
                <p className="mt-2 font-serif text-2xl text-gold">
                  {indicator.value}
                  {indicator.unit ? ` ${indicator.unit}` : ""}
                </p>
                {indicator.note && (
                  <p className="mt-2 text-xs leading-5 text-bone/45">
                    {indicator.note}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher un secteur, une période ou un enjeu…"
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
                      {item.period ? ` · ${item.period}` : ""}
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

                    {item.region && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">
                          Région ou espace concerné
                        </p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          {item.region}
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

                  {item.paragraphs?.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {item.paragraphs.map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex} className="text-sm leading-7 text-bone/72">{paragraph}</p>
                      ))}
                    </div>
                  )}
                  <SourceLinks ids={item.sources || item.sourceIds} sourceMap={sourceMap} />
                </div>
              )}
            </article>
          );
        })}
      </div>

      {!visible.length && (
        <div className="rounded-xl border border-bone/10 p-5 text-bone/60">
          Aucun thème économique ne correspond à cette recherche.
        </div>
      )}

      {!items.length && (
        <div className="rounded-xl border border-bone/10 p-5 text-bone/60">
          Les contenus économiques détaillés ne sont pas encore structurés dans le backend.
        </div>
      )}

      <p className="text-xs leading-relaxed text-bone/45">
        PIB, chômage, inflation, commerce extérieur et autres indicateurs contemporains
        doivent rester accompagnés de leur année, de leur méthode et de leur source.
      </p>
    </div>
  );
}
