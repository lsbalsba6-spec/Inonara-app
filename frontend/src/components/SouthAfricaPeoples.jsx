import { useMemo, useState } from "react";

function SourceLinks({ ids = [], sourceMap }) {
  if (!ids.length) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {ids.map((id) => {
        const source = sourceMap.get(id);
        if (!source) return null;
        return (
          <a key={id} href={source.url} target="_blank" rel="noreferrer"
            className="rounded-full border border-gold/25 px-3 py-1 text-[11px] text-gold/85 hover:bg-gold/10">
            {source.publisher}: {source.title}
          </a>
        );
      })}
    </div>
  );
}

const getName = (item) => item.name || item.title || "Communauté";
const getSummary = (item) => item.note || item.text || item.summary || item.description || "";
const getRegion = (item) => item.region || item.location || item.area || "Répartition à préciser";
const languageText = (value) => Array.isArray(value) ? value.join(" ") : String(value || "");
const languageList = (value) => Array.isArray(value) ? value : value ? [value] : [];

export function SouthAfricaPeoples({ dossier, sourceMap }) {
  const peoples = useMemo(
    () => dossier.peoples || [],
    [dossier],
  );
  const regions = useMemo(() => [...new Set(peoples.map(getRegion))], [peoples]);
  const [region, setRegion] = useState("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(peoples[0]?.id || null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return peoples.filter((item) => {
      const matchesRegion = region === "all" || getRegion(item) === region;
      const haystack = `${getName(item)} ${getSummary(item)} ${getRegion(item)} ${languageText(item.languages)}`.toLowerCase();
      return matchesRegion && (!needle || haystack.includes(needle));
    });
  }, [peoples, region, query]);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">Peuples & communautés</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">Histoires, langues et territoires</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          Les catégories contemporaines ne doivent pas être projetées mécaniquement sur toute l’histoire.
          Cette section présente des communautés diverses sans les figer comme des blocs homogènes.
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input value={query} onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher un peuple, une langue ou une région…"
          className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50" />
        <div className="flex gap-2 overflow-x-auto">
          <button type="button" onClick={() => setRegion("all")}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${region === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>
            Toutes les régions
          </button>
          {regions.map((itemRegion) => (
            <button key={itemRegion} type="button" onClick={() => setRegion(itemRegion)}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${region === itemRegion ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>
              {itemRegion}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {visible.map((item, index) => {
          const id = item.id || `${getName(item)}-${index}`;
          const expanded = openId === id;
          return (
            <article key={id} className="overflow-hidden rounded-2xl border border-bone/10 bg-bone/[0.025]">
              <button type="button" onClick={() => setOpenId(expanded ? null : id)}
                className="w-full p-5 text-left" aria-expanded={expanded}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-gold">{getRegion(item)}</p>
                    <h3 className="mt-2 font-serif text-2xl text-bone">{getName(item)}</h3>
                  </div>
                  <span className="text-xl text-gold">{expanded ? "−" : "+"}</span>
                </div>
                {getSummary(item) && <p className="mt-4 max-w-4xl leading-7 text-bone/70">{getSummary(item)}</p>}
              </button>

              {expanded && (
                <div className="border-t border-bone/10 px-5 pb-6 pt-5">
                  <div className="grid gap-3 md:grid-cols-2">
                    {item.languages?.length > 0 && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">Langues associées</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {languageList(item.languages).map((language) => (
                            <span key={language} className="rounded-full border border-bone/15 px-3 py-1 text-xs text-bone/70">{language}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {item.history && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">Repères historiques</p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">{item.history}</p>
                      </div>
                    )}
                    {item.caution && (
                      <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-amber-300/75">Précaution de lecture</p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">{item.caution}</p>
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

      {!visible.length && <div className="rounded-xl border border-bone/10 p-5 text-bone/60">Aucune communauté ne correspond à cette recherche.</div>}

      <p className="text-xs leading-relaxed text-bone/45">
        Les noms, identités et appartenances varient selon les périodes, les langues et les usages administratifs.
        Les frontières culturelles ne sont pas des frontières politiques fixes.
      </p>
    </div>
  );
}
