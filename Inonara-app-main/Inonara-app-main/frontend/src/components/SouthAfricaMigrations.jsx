import { useMemo, useState } from "react";

const TYPE_LABELS = {
  forced: "Migration forcée",
  voluntary: "Migration volontaire",
  mixed: "Migration mixte",
  "coerced-labour": "Travail sous contrainte",
  "colonial-settlement": "Installation coloniale",
  ancient: "Mobilité ancienne",
  trade: "Circulation commerciale",
};

const TYPE_STYLES = {
  forced: "border-red-400/30 bg-red-400/[0.05] text-red-200",
  voluntary: "border-emerald-400/30 bg-emerald-400/[0.05] text-emerald-200",
  mixed: "border-violet-400/30 bg-violet-400/[0.05] text-violet-200",
  "coerced-labour": "border-amber-400/30 bg-amber-400/[0.05] text-amber-200",
  "colonial-settlement": "border-slate-300/25 bg-slate-300/[0.04] text-slate-200",
  ancient: "border-cyan-400/30 bg-cyan-400/[0.05] text-cyan-200",
  trade: "border-blue-400/30 bg-blue-400/[0.05] text-blue-200",
};

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

function periodLabel(route) {
  if (route.start == null && route.end == null) return "Datation à préciser";
  if (route.start != null && route.end != null) return `${route.start}–${route.end}`;
  if (route.start != null) return `Depuis ${route.start}`;
  return `Jusqu’en ${route.end}`;
}

function routeType(route) {
  return route.type || route.migration_type || "mixed";
}

export function SouthAfricaMigrations({ dossier, sourceMap }) {
  const routes = useMemo(
    () => dossier.migrations || [],
    [dossier.migrations],
  );
  const types = useMemo(() => [...new Set(routes.map(routeType))], [routes]);
  const [selectedType, setSelectedType] = useState("all");
  const [openId, setOpenId] = useState(routes[0]?.id || null);

  const visibleRoutes = useMemo(
    () => selectedType === "all" ? routes : routes.filter((route) => routeType(route) === selectedType),
    [routes, selectedType],
  );

  return (
    <div className="space-y-7">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">Migrations & diasporas</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">Circulations humaines liées à l’Afrique du Sud</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          Les routes sont séparées par période et par type. Une présence diasporique actuelle
          ne signifie pas automatiquement qu’une route historique reste active aujourd’hui.
          Les tracés approximatifs doivent être présentés comme tels.
        </p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => setSelectedType("all")}
          className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${selectedType === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60 hover:text-bone"}`}
        >
          Toutes les routes
        </button>
        {types.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setSelectedType(type)}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${selectedType === type ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60 hover:text-bone"}`}
          >
            {TYPE_LABELS[type] || type}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {visibleRoutes.map((route, index) => {
          const type = routeType(route);
          const stableId = route.id || `${route.label}-${index}`;
          const expanded = openId === stableId;
          return (
            <article key={stableId} className="overflow-hidden rounded-2xl border border-bone/10 bg-bone/[0.025]">
              <button
                type="button"
                onClick={() => setOpenId(expanded ? null : stableId)}
                className="w-full p-5 text-left"
                aria-expanded={expanded}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-gold">{periodLabel(route)}</p>
                    <h3 className="mt-2 font-serif text-2xl text-bone">{route.label}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wider ${TYPE_STYLES[type] || "border-bone/15 text-bone/55"}`}>
                      {TYPE_LABELS[type] || type}
                    </span>
                    <span className="text-xl text-gold">{expanded ? "−" : "+"}</span>
                  </div>
                </div>
                {route.reason && <p className="mt-4 max-w-4xl leading-7 text-bone/70">{route.reason}</p>}
              </button>

              {expanded && (
                <div className="border-t border-bone/10 px-5 pb-6 pt-5">
                  <div className="grid gap-3 md:grid-cols-2">
                    {(route.origin || route.destination) && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">Trajet documenté</p>
                        <p className="mt-2 text-sm leading-6 text-bone/75">
                          {route.origin || "Origine à préciser"} → {route.destination || "Destination à préciser"}
                        </p>
                      </div>
                    )}
                    {route.mapping && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">Politique cartographique</p>
                        <p className="mt-2 text-sm leading-6 text-bone/70">{route.mapping}</p>
                      </div>
                    )}
                  </div>
                  <SourceLinks ids={route.sources || route.sourceIds} sourceMap={sourceMap} />
                </div>
              )}
            </article>
          );
        })}
      </div>

      {!visibleRoutes.length && (
        <div className="rounded-xl border border-bone/10 p-5 text-bone/60">Aucune route documentée dans cette catégorie pour le moment.</div>
      )}

      <p className="text-xs leading-relaxed text-bone/45">
        Les catégories « forcée », « volontaire » et « mixte » décrivent une route pour une période donnée. Elles ne doivent pas être prolongées jusqu’au présent sans preuve.
      </p>
    </div>
  );
}
