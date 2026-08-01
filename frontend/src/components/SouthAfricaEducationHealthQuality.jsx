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

const getTitle = (item) => item.title || item.name || item.topic || "Thème";
const getBody = (item) => item.text || item.note || item.summary || item.description || "";
const getDomain = (item) => item.domain || item.category || item.type || "Général";

function SectionBlock({ title, intro, items, sourceMap }) {
  const domains = useMemo(() => [...new Set(items.map(getDomain))], [items]);
  const [domain, setDomain] = useState("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(items[0]?.id || null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesDomain = domain === "all" || getDomain(item) === domain;
      const haystack = `${getTitle(item)} ${getBody(item)} ${getDomain(item)}`
        .toLowerCase();
      return matchesDomain && (!needle || haystack.includes(needle));
    });
  }, [items, domain, query]);

  return (
    <section className="space-y-6">
      <div>
        <p className="overline text-gold">{title}</p>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-bone/55">{intro}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`Rechercher dans ${title.toLowerCase()}…`}
          className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50"
        />
        <div className="flex gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setDomain("all")}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
              domain === "all"
                ? "border-gold bg-gold/10 text-gold"
                : "border-bone/15 text-bone/60"
            }`}
          >
            Tous les thèmes
          </button>
          {domains.map((itemDomain) => (
            <button
              key={itemDomain}
              type="button"
              onClick={() => setDomain(itemDomain)}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
                domain === itemDomain
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-bone/15 text-bone/60"
              }`}
            >
              {itemDomain}
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
                      {getDomain(item)}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl text-bone">{getTitle(item)}</h3>
                  </div>
                  <span className="text-xl text-gold">{expanded ? "−" : "+"}</span>
                </div>
                {getBody(item) && (
                  <p className="mt-4 max-w-4xl leading-7 text-bone/70">{getBody(item)}</p>
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
                        <p className="mt-2 text-sm leading-6 text-bone/72">{item.data}</p>
                      </div>
                    )}
                    {item.period && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">
                          Période
                        </p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">{item.period}</p>
                      </div>
                    )}
                    {item.context && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4 md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">
                          Contexte
                        </p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">{item.context}</p>
                      </div>
                    )}
                    {item.caution && (
                      <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-amber-300/75">
                          Précaution de lecture
                        </p>
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

      {!visible.length && (
        <div className="rounded-xl border border-bone/10 p-5 text-bone/60">
          Aucun contenu ne correspond à cette recherche.
        </div>
      )}
    </section>
  );
}

export function SouthAfricaEducationHealthQuality({ dossier, sourceMap }) {
  const education = dossier.education_health?.education || dossier.education || {};
  const health = dossier.education_health?.health || dossier.health || {};
  const educationItems = Array.isArray(education) ? education : (education.items || []);
  const healthItems = Array.isArray(health) ? health : (health.items || []);

  return (
    <div className="space-y-10">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">Éducation & santé</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">
          Accès, institutions et transformations
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          Les systèmes éducatif et sanitaire sont replacés dans leur histoire, leurs réformes,
          leurs inégalités territoriales et leurs défis contemporains. Les données doivent rester datées.
        </p>
      </header>

      <SectionBlock
        title="Éducation"
        intro="Organisation scolaire, enseignement supérieur, accès, langues d’enseignement et inégalités."
        items={educationItems}
        sourceMap={sourceMap}
      />

      <SectionBlock
        title="Santé"
        intro="Organisation du système sanitaire, accès aux soins, politiques publiques et principaux défis."
        items={healthItems}
        sourceMap={sourceMap}
      />

      {!educationItems.length && !healthItems.length && (
        <div className="rounded-xl border border-bone/10 p-5 text-bone/60">
          Les données détaillées d’éducation et de santé ne sont pas encore structurées dans le backend.
        </div>
      )}
    </div>
  );
}
