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

export function SouthAfricaLanguages({ dossier, sourceMap }) {
  const languages = dossier.languages || {};
  const official = languages.official || [];
  const household = useMemo(
    () => languages.household_2022 || [],
    [languages],
  );
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return household;
    return household.filter((item) =>
      `${item.language} ${item.note || ""}`.toLowerCase().includes(needle),
    );
  }, [household, query]);

  const totalKnown = visible
    .filter((item) => item.percent != null)
    .reduce((sum, item) => sum + Number(item.percent), 0);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">Langues</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">
          Langues officielles, usages et transmission
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          Le statut officiel d’une langue ne signifie pas qu’elle est parlée de la même manière
          dans toutes les provinces. Les chiffres ci-dessous concernent principalement la langue
          la plus parlée au foyer et doivent rester datés.
        </p>
      </header>

      <section>
        <p className="overline text-gold">Langues officielles</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {official.map((language) => (
            <span
              key={language}
              className="rounded-full border border-bone/15 bg-bone/[0.025] px-3 py-1.5 text-sm text-bone/75"
            >
              {language}
            </span>
          ))}
        </div>
      </section>

      <label className="block">
        <span className="sr-only">Rechercher une langue</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher une langue…"
          className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50"
        />
      </label>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="overline text-gold">Langue parlée au foyer</p>
            <h3 className="mt-1 font-serif text-2xl text-bone">Recensement 2022</h3>
          </div>
          <p className="text-xs text-bone/40">
            Total visible : {totalKnown.toFixed(1)} %
          </p>
        </div>

        {visible.map((item) => {
          const percent = item.percent == null ? 0 : Number(item.percent);
          return (
            <article
              key={item.language}
              className="rounded-xl border border-bone/10 bg-bone/[0.025] p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-lg text-bone">{item.language}</h4>
                  {item.note && (
                    <p className="mt-1 text-xs leading-relaxed text-bone/45">{item.note}</p>
                  )}
                </div>
                <strong className="text-gold">
                  {item.percent == null ? "Non indiqué" : `${percent}%`}
                </strong>
              </div>
              {item.percent != null && (
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-bone/10">
                  <div
                    className="h-full rounded-full bg-gold/70"
                    style={{ width: `${Math.min(100, percent)}%` }}
                  />
                </div>
              )}
            </article>
          );
        })}
      </section>

      {languages.note && (
        <p className="rounded-xl border border-bone/10 bg-black/10 p-4 text-sm leading-6 text-bone/60">
          {languages.note}
        </p>
      )}

      <SourceLinks ids={languages.sources} sourceMap={sourceMap} />
    </div>
  );
}

export function SouthAfricaReligions({ dossier, sourceMap }) {
  const religions = dossier.religions || {};
  const census = useMemo(
    () => religions.census_2022 || [],
    [religions],
  );
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return census;
    return census.filter((item) =>
      `${item.name} ${item.note || ""}`.toLowerCase().includes(needle),
    );
  }, [census, query]);

  const total = census.reduce((sum, item) => sum + Number(item.count || 0), 0);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">Religions & convictions</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">
          Affiliations, pratiques et pluralité
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          Une affiliation déclarée dans un recensement ne décrit pas à elle seule la pratique,
          les croyances ou les appartenances multiples. Les traditions religieuses et spirituelles
          doivent être replacées dans leurs contextes historiques et communautaires.
        </p>
      </header>

      <label className="block">
        <span className="sr-only">Rechercher une religion ou conviction</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher une religion ou une conviction…"
          className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        {visible.map((item) => {
          const count = Number(item.count || 0);
          const share = total ? (count / total) * 100 : 0;
          return (
            <article
              key={item.name}
              className="rounded-2xl border border-bone/10 bg-bone/[0.025] p-5"
            >
              <h3 className="font-serif text-xl text-bone">{item.name}</h3>
              <p className="mt-2 font-serif text-2xl text-gold">
                {count.toLocaleString("fr-FR")}
              </p>
              <p className="mt-1 text-xs text-bone/40">
                {share.toFixed(1)} % du total affiché
              </p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-bone/10">
                <div
                  className="h-full rounded-full bg-gold/70"
                  style={{ width: `${Math.min(100, share)}%` }}
                />
              </div>
              {item.note && (
                <p className="mt-3 text-sm leading-6 text-bone/60">{item.note}</p>
              )}
            </article>
          );
        })}
      </div>

      {religions.note && (
        <p className="rounded-xl border border-bone/10 bg-black/10 p-4 text-sm leading-6 text-bone/60">
          {religions.note}
        </p>
      )}

      <SourceLinks ids={religions.sources} sourceMap={sourceMap} />
    </div>
  );
}
