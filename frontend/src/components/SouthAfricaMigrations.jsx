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


function MigrationMap({ routes }) {
  const width = 860;
  const height = 430;
  const bounds = { minLon: 15, maxLon: 32, minLat: -28, maxLat: -12 };
  const project = ([lon, lat]) => [
    40 + ((lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * (width - 80),
    30 + ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * (height - 60),
  ];
  const color = (type) => ({
    forced: "#f87171",
    voluntary: "#34d399",
    mixed: "#a78bfa",
    "coerced-labour": "#fbbf24",
    ancient: "#22d3ee",
    trade: "#60a5fa",
  }[type] || "#d6b36a");
  const safeRoutes = routes.filter(r => r.origin_coordinates && r.destination_coordinates);
  return (
    <section className="rounded-2xl border border-bone/10 bg-black/20 p-4 md:p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="overline text-gold">Cartographie des mobilités</p>
          <h3 className="mt-1 font-serif text-2xl text-bone">Routes historiques liées au Botswana</h3>
        </div>
        <p className="max-w-xl text-xs leading-5 text-bone/45">
          Carte schématique, non carte politique. Les lignes représentent des corridors documentés ou
          des flux agrégés; elles ne prétendent pas reconstituer des itinéraires exacts.
        </p>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[720px] w-full rounded-xl bg-[#0d1716]" role="img" aria-label="Carte schématique des migrations liées au Botswana">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
            </pattern>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
            </marker>
          </defs>
          <rect x="0" y="0" width={width} height={height} fill="url(#grid)" />
          <path d="M 285 45 L 300 90 L 360 135 L 390 200 L 380 275 L 425 345 L 455 395 L 330 380 L 260 325 L 235 260 L 220 180 L 245 110 Z"
            fill="rgba(214,179,106,.08)" stroke="rgba(214,179,106,.35)" strokeWidth="2"/>
          <text x="310" y="215" fill="rgba(246,240,225,.55)" fontSize="15" letterSpacing="3">BOTSWANA</text>
          <text x="78" y="70" fill="rgba(246,240,225,.28)" fontSize="11">ANGOLA / NAMIBIE</text>
          <text x="575" y="365" fill="rgba(246,240,225,.28)" fontSize="11">AFRIQUE DU SUD</text>
          {safeRoutes.map((r) => {
            const [x1,y1] = project(r.origin_coordinates);
            const [x2,y2] = project(r.destination_coordinates);
            const mx = (x1+x2)/2;
            const my = Math.min(y1,y2)-35;
            return (
              <g key={r.id} style={{color: color(r.type)}}>
                <path d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray={r.type==="ancient" ? "6 5" : "none"} markerEnd="url(#arrow)" opacity=".9"/>
                <circle cx={x1} cy={y1} r="4" fill="currentColor"/>
                <circle cx={x2} cy={y2} r="4" fill="currentColor"/>
              </g>
            );
          })}
          <circle cx="350" cy="250" r="5" fill="#d6b36a"/>
          <text x="360" y="254" fill="rgba(246,240,225,.7)" fontSize="11">Gaborone</text>
        </svg>
      </div>
      <p className="mt-3 text-[11px] leading-5 text-bone/40">
        Les coordonnées sont des points d'ancrage pour visualiser une relation historique; elles ne constituent pas des données GPS d'un trajet.
      </p>
    </section>
  );
}

export function SouthAfricaMigrations({ dossier, sourceMap }) {
  const countryName = dossier?.name?.fr || dossier?.country || "ce pays";
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
        <h2 className="mt-2 font-serif text-3xl text-bone">Circulations humaines liées à {countryName}</h2>
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

      <MigrationMap routes={visibleRoutes} />

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
