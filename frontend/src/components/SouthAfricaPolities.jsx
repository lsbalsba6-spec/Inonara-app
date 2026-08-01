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

const getName = (item) => item.name || item.title || item.label || "Formation politique";
const getSummary = (item) => item.note || item.text || item.summary || item.description || "";
const getPeriod = (item) => item.period || (
  item.start != null
    ? `${item.start}${item.end != null ? `–${item.end}` : "–aujourd’hui"}`
    : "Datation à préciser"
);
const getType = (item) => item.type || item.category || "Formation politique";

export function SouthAfricaPolities({ dossier, sourceMap }) {
  const polities = useMemo(
    () => dossier.polities || [],
    [dossier],
  );
  const types = useMemo(() => [...new Set(polities.map(getType))], [polities]);
  const [type, setType] = useState("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(polities[0]?.id || null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return polities.filter((item) => {
      const matchesType = type === "all" || getType(item) === type;
      const haystack = `${getName(item)} ${getSummary(item)} ${getPeriod(item)} ${getType(item)} ${item.mapping || ""}`
        .toLowerCase();
      return matchesType && (!needle || haystack.includes(needle));
    });
  }, [polities, query, type]);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">Royaumes & États</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">
          Pouvoirs, territoires et réseaux
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          Les formations politiques anciennes et modernes sont présentées selon leurs
          propres périodes. Une aire d’influence, un réseau commercial ou une zone de
          mobilité ne doit pas être transformé automatiquement en frontière fixe.
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher un royaume, un État ou une période…"
          className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50"
        />

        <div className="flex gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setType("all")}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
              type === "all"
                ? "border-gold bg-gold/10 text-gold"
                : "border-bone/15 text-bone/60"
            }`}
          >
            Toutes les formations
          </button>
          {types.map((itemType) => (
            <button
              key={itemType}
              type="button"
              onClick={() => setType(itemType)}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
                type === itemType
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-bone/15 text-bone/60"
              }`}
            >
              {itemType}
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
                      {getPeriod(item)} · {getType(item)}
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
                  <div className="grid gap-3 md:grid-cols-2">
                    {item.mapping && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">
                          Politique cartographique
                        </p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          {item.mapping}
                        </p>
                      </div>
                    )}

                    {item.region && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">
                          Région
                        </p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          {item.region}
                        </p>
                      </div>
                    )}

                    {item.organization && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4 md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">
                          Organisation
                        </p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          {item.organization}
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
          Aucune formation politique ne correspond à cette recherche.
        </div>
      )}

      <p className="text-xs leading-relaxed text-bone/45">
        Pour les périodes anciennes, les frontières exactes sont souvent inconnues.
        Inonara privilégie les zones d’influence approximatives et les relations
        documentées plutôt que des polygones politiques inventés.
      </p>
    </div>
  );
}
