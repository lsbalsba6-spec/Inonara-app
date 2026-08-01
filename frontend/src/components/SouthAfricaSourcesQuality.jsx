import { useMemo, useState } from "react";

const CATEGORY_LABELS = {
  1: "Source primaire ou institutionnelle",
  2: "Référence académique",
  3: "Synthèse spécialisée",
  4: "Ressource complémentaire",
};

function SourceCard({ source }) {
  return (
    <article className="rounded-2xl border border-bone/10 bg-bone/[0.025] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-gold">
            {CATEGORY_LABELS[source.category] || `Catégorie ${source.category || "non indiquée"}`}
          </p>
          <h3 className="mt-2 font-serif text-xl text-bone">{source.title}</h3>
          <p className="mt-1 text-xs text-bone/45">
            {source.publisher}{source.year ? ` · ${source.year}` : ""}
          </p>
        </div>
        {source.language && (
          <span className="rounded-full border border-bone/15 px-2.5 py-1 text-[10px] uppercase tracking-wider text-bone/50">
            {source.language}
          </span>
        )}
      </div>

      {source.note && (
        <p className="mt-4 text-sm leading-6 text-bone/65">{source.note}</p>
      )}

      <a
        href={source.url}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex rounded-full border border-gold/30 px-3 py-1.5 text-xs text-gold hover:bg-gold/10"
      >
        Consulter la source
      </a>
    </article>
  );
}

export function SouthAfricaHistoriography({ dossier }) {
  const notes = dossier.historiography || [];

  return (
    <div className="space-y-7">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">Débats historiographiques</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">
          Ce qui est établi, discuté ou encore incertain
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          Cette section ne masque pas les désaccords entre spécialistes. Elle distingue les
          faits largement établis, les interprétations concurrentes et les questions encore ouvertes.
        </p>
      </header>

      <div className="space-y-4">
        {notes.map((note, index) => (
          <article
            key={index}
            className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-5"
          >
            <div className="flex gap-3">
              <span className="text-amber-300">⚠</span>
              <div>
                <p className="text-sm leading-7 text-bone/75">{note}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {!notes.length && (
        <div className="rounded-xl border border-bone/10 p-5 text-bone/60">
          Aucun débat historiographique n’est encore renseigné.
        </div>
      )}
    </div>
  );
}

export function SouthAfricaResearchGaps({ dossier }) {
  const gaps = dossier.research_gaps || [];

  return (
    <div className="space-y-7">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">À suivre</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">
          Thèmes à enrichir ou vérifier
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          Ces sujets ne sont pas cachés. Ils sont signalés clairement afin d’éviter de présenter
          une information incomplète comme un contenu définitif.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {gaps.map((gap, index) => (
          <article
            key={index}
            className="rounded-2xl border border-bone/10 bg-bone/[0.025] p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm leading-7 text-bone/72">{gap}</p>
              <span className="shrink-0 rounded-full border border-bone/15 px-2.5 py-1 text-[10px] uppercase tracking-wider text-bone/50">
                À suivre
              </span>
            </div>
          </article>
        ))}
      </div>

      {!gaps.length && (
        <div className="rounded-xl border border-bone/10 p-5 text-bone/60">
          Aucun thème en attente n’est actuellement renseigné.
        </div>
      )}
    </div>
  );
}

export function SouthAfricaSources({ dossier }) {
  const sources = dossier.sources || [];
  const categories = useMemo(
    () => [...new Set(sources.map((source) => source.category).filter(Boolean))],
    [sources],
  );

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return sources.filter((source) => {
      const matchesCategory =
        category === "all" || String(source.category) === String(category);
      const haystack = `${source.title} ${source.publisher || ""} ${source.year || ""} ${source.note || ""}`
        .toLowerCase();
      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [sources, query, category]);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">Sources</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">
          Bibliographie et références du dossier
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          Les références sont classées par niveau de source. Une URL officielle ou académique
          ne dispense pas de vérifier la date, le contexte et la portée exacte de l’information.
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher un titre, un organisme ou une année…"
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
            Toutes
          </button>
          {categories.map((itemCategory) => (
            <button
              key={itemCategory}
              type="button"
              onClick={() => setCategory(itemCategory)}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
                String(category) === String(itemCategory)
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-bone/15 text-bone/60"
              }`}
            >
              Cat. {itemCategory}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {visible.map((source) => (
          <SourceCard key={source.id} source={source} />
        ))}
      </div>

      {!visible.length && (
        <div className="rounded-xl border border-bone/10 p-5 text-bone/60">
          Aucune source ne correspond à cette recherche.
        </div>
      )}
    </div>
  );
}
