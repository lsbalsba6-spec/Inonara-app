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

function normalizeTopic(item) {
  return item.topic || item.title || item.name || "Thème culturel";
}

export function SouthAfricaCulture({ dossier, sourceMap }) {
  const culture = useMemo(
    () => dossier.culture || [],
    [dossier],
  );
  const oral = dossier.oral_traditions_and_legends || [];
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(culture[0]?.id || null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return culture;
    return culture.filter((item) =>
      `${normalizeTopic(item)} ${item.text || ""} ${item.note || ""}`
        .toLowerCase()
        .includes(needle),
    );
  }, [culture, query]);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">Culture</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">
          Pratiques, créations et transmissions
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          La culture sud-africaine n’est pas un bloc homogène. Cette section distingue les
          pratiques, les histoires locales, les langues, les héritages urbains et ruraux,
          ainsi que les formes contemporaines de création.
        </p>
      </header>

      <label className="block">
        <span className="sr-only">Rechercher un thème culturel</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher : musique, cuisine, littérature, architecture…"
          className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50"
        />
      </label>

      <div className="grid gap-4">
        {visible.map((item, index) => {
          const id = item.id || `${normalizeTopic(item)}-${index}`;
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
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-serif text-2xl text-bone">
                    {normalizeTopic(item)}
                  </h3>
                  <span className="text-xl text-gold">{expanded ? "−" : "+"}</span>
                </div>
                {(item.text || item.note) && (
                  <p className="mt-3 max-w-4xl leading-7 text-bone/70">
                    {item.text || item.note}
                  </p>
                )}
              </button>

              {expanded && (
                <div className="border-t border-bone/10 px-5 pb-6 pt-5">
                  {item.context && (
                    <p className="rounded-xl border border-bone/10 bg-black/10 p-4 text-sm leading-6 text-bone/68">
                      {item.context}
                    </p>
                  )}
                  <SourceLinks ids={item.sources} sourceMap={sourceMap} />
                </div>
              )}
            </article>
          );
        })}
      </div>

      {oral.length > 0 && (
        <section>
          <div className="mb-4">
            <p className="overline text-gold">Oralité</p>
            <h2 className="mt-2 font-serif text-3xl text-bone">
              Traditions orales et récits
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-bone/55">
              Les récits oraux sont contextualisés sans être présentés comme des archives
              littérales ou comme une culture nationale unique.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {oral.map((item, index) => (
              <article
                key={item.id || item.title || index}
                className="rounded-2xl border border-bone/10 bg-bone/[0.025] p-5"
              >
                <h3 className="font-serif text-xl text-bone">
                  {item.title || item.name}
                </h3>
                {(item.note || item.text) && (
                  <p className="mt-3 text-sm leading-6 text-bone/68">
                    {item.note || item.text}
                  </p>
                )}
                <SourceLinks ids={item.sources} sourceMap={sourceMap} />
              </article>
            ))}
          </div>
        </section>
      )}

      {!visible.length && (
        <div className="rounded-xl border border-bone/10 p-5 text-bone/60">
          Aucun thème ne correspond à cette recherche.
        </div>
      )}
    </div>
  );
}
