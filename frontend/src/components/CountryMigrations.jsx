import { useMemo, useState } from "react";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";
import { localizedValue } from "../lib/contentSort";

const COPY = {
  en: {
    country: "this country",
    types: {
      forced: "Forced migration",
      voluntary: "Voluntary migration",
      mixed: "Mixed migration",
      "coerced-labour": "Coerced labour",
      "colonial-settlement": "Colonial settlement",
      ancient: "Ancient mobility",
      trade: "Trade circulation",
    },
    dating: "Dating to be clarified",
    since: "Since",
    until: "Until",
    mapOverline: "Mobility mapping",
    mapPreparing: "Map in preparation",
    mapMissing: "Routes exist in the dossier, but none yet have two verifiable geographic points. They are not drawn artificially.",
    mapTitle: "Migrations connected to {country}",
    mapIntro: "Schematic map built from documented points in the data. Lines represent historical corridors, not GPS routes or ancient borders.",
    mapAria: "Map of migrations connected to {country}",
    source: "Source",
    overline: "Migrations & diasporas",
    title: "Human movements connected to {country}",
    intro: "Each movement is presented with its period, type, context and sources when available. A mapped route remains a schematic representation.",
    all: "All routes ({n})",
    empty: "No migration is classified under this filter.",
    documented: "Documented mobility",
    originUnknown: "Origin unspecified",
    destinationUnknown: "destination unspecified",
  },
  fr: {
    country: "ce pays",
    types: {
      forced: "Migration forcée",
      voluntary: "Migration volontaire",
      mixed: "Migration mixte",
      "coerced-labour": "Travail sous contrainte",
      "colonial-settlement": "Installation coloniale",
      ancient: "Mobilité ancienne",
      trade: "Circulation commerciale",
    },
    dating: "Datation à préciser",
    since: "Depuis",
    until: "Jusqu’en",
    mapOverline: "Cartographie des mobilités",
    mapPreparing: "Carte en préparation",
    mapMissing: "Les routes existent dans le dossier, mais aucune ne possède encore deux points géographiques vérifiables. Elles ne sont pas dessinées artificiellement.",
    mapTitle: "Migrations liées à {country}",
    mapIntro: "Carte schématique construite à partir des points documentés dans les données. Les lignes représentent des corridors historiques, pas des itinéraires GPS ni des frontières anciennes.",
    mapAria: "Carte des migrations liées à {country}",
    source: "Source",
    overline: "Migrations & diasporas",
    title: "Circulations humaines liées à {country}",
    intro: "Chaque mouvement est présenté avec sa période, son type, son contexte et ses sources lorsque celles-ci sont disponibles. Une route cartographiée reste une représentation schématique.",
    all: "Toutes les routes ({n})",
    empty: "Aucune migration n'est classée dans ce filtre.",
    documented: "Mobilité documentée",
    originUnknown: "Origine non précisée",
    destinationUnknown: "destination non précisée",
  },
};

const COLORS = {
  forced: "#f87171",
  voluntary: "#34d399",
  mixed: "#a78bfa",
  "coerced-labour": "#fbbf24",
  "colonial-settlement": "#cbd5e1",
  ancient: "#22d3ee",
  trade: "#60a5fa",
};

function routeType(route) {
  return route.type || route.migration_type || "mixed";
}

function periodLabel(route, copy) {
  if (route.start == null && route.end == null) return copy.dating;
  if (route.start != null && route.end != null) return `${route.start}–${route.end}`;
  if (route.start != null) return `${copy.since} ${route.start}`;
  return `${copy.until} ${route.end}`;
}

function point(value) {
  if (!Array.isArray(value) || value.length < 2) return null;
  const a = Number(value[0]);
  const b = Number(value[1]);
  return Number.isFinite(a) && Number.isFinite(b) ? [a, b] : null;
}

function boundsFor(routes) {
  const pts = routes.flatMap((r) => [point(r.origin_coordinates), point(r.destination_coordinates)]).filter(Boolean);
  if (!pts.length) return { minLon: -20, maxLon: 40, minLat: -35, maxLat: 20 };
  const lons = pts.map(([x]) => x);
  const lats = pts.map(([, y]) => y);
  const padLon = Math.max(2, (Math.max(...lons) - Math.min(...lons)) * 0.14);
  const padLat = Math.max(2, (Math.max(...lats) - Math.min(...lats)) * 0.14);
  return { minLon: Math.min(...lons) - padLon, maxLon: Math.max(...lons) + padLon, minLat: Math.min(...lats) - padLat, maxLat: Math.max(...lats) + padLat };
}

function TranslatedInline({ value }) {
  const { lang } = useI18n();
  const translated = useTranslated(value || "");
  if (!value) return null;
  return translated || localizedValue(value, lang);
}

function TranslatedText({ value, className = "" }) {
  if (!value) return null;
  return <p className={className}><TranslatedInline value={value} /></p>;
}

function MigrationMap({ routes, countryName, copy }) {
  const width = 920, height = 470;
  const bounds = useMemo(() => boundsFor(routes), [routes]);
  const project = ([lon, lat]) => {
    const x = 42 + ((lon - bounds.minLon) / Math.max(0.0001, bounds.maxLon - bounds.minLon)) * (width - 84);
    const y = 34 + ((bounds.maxLat - lat) / Math.max(0.0001, bounds.maxLat - bounds.minLat)) * (height - 68);
    return [x, y];
  };
  const safe = routes.filter((r) => point(r.origin_coordinates) && point(r.destination_coordinates));
  if (!safe.length) {
    return (
      <section className="rounded-2xl border border-bone/10 bg-black/20 p-5">
        <p className="overline text-gold">{copy.mapOverline}</p>
        <h3 className="mt-1 font-serif text-2xl text-bone">{copy.mapPreparing}</h3>
        <p className="mt-2 text-sm leading-6 text-bone/55">{copy.mapMissing}</p>
      </section>
    );
  }
  return (
    <section className="rounded-2xl border border-bone/10 bg-black/20 p-4 md:p-5">
      <div className="mb-4">
        <p className="overline text-gold">{copy.mapOverline}</p>
        <h3 className="mt-1 font-serif text-2xl text-bone">{copy.mapTitle.replace("{country}", countryName)}</h3>
        <p className="mt-2 max-w-3xl text-xs leading-5 text-bone/45">{copy.mapIntro}</p>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[720px] w-full rounded-xl bg-[#0d1716]" role="img" aria-label={copy.mapAria.replace("{country}", countryName)}>
          <defs>
            <pattern id="country-migration-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="rgba(255,255,255,.05)" /></pattern>
            <marker id="country-migration-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor" /></marker>
          </defs>
          <rect width={width} height={height} fill="url(#country-migration-grid)" />
          {safe.map((r, i) => {
            const [x1, y1] = project(point(r.origin_coordinates));
            const [x2, y2] = project(point(r.destination_coordinates));
            const mx = (x1 + x2) / 2;
            const my = Math.min(y1, y2) - Math.max(22, Math.abs(x2 - x1) * 0.08);
            const color = COLORS[routeType(r)] || "#d6b36a";
            return (
              <g key={r.id || i} style={{ color }}>
                <path d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray={routeType(r) === "ancient" ? "7 5" : "none"} markerEnd="url(#country-migration-arrow)" opacity=".9" />
                <circle cx={x1} cy={y1} r="4" fill="currentColor" /><circle cx={x2} cy={y2} r="4" fill="currentColor" />
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {Object.entries(COLORS).map(([type, color]) => safe.some((r) => routeType(r) === type) && (
          <span key={type} className="rounded-full border border-bone/10 px-2.5 py-1 text-[10px] text-bone/60"><span className="mr-1 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: color }} />{copy.types[type] || type}</span>
        ))}
      </div>
    </section>
  );
}

function SourceLink({ source, fallbackLabel }) {
  const { lang } = useI18n();
  const publisher = useTranslated(source?.publisher || "");
  const title = useTranslated(source?.title || "");
  if (!source?.url) return null;
  return (
    <a href={source.url} target="_blank" rel="noreferrer" className="rounded-full border border-gold/25 px-3 py-1 text-[11px] text-gold/85 hover:bg-gold/10">
      {publisher || localizedValue(source.publisher, lang) || fallbackLabel}: {title || localizedValue(source.title, lang) || source.id}
    </a>
  );
}

function SourceLinks({ ids = [], sourceMap, copy }) {
  if (!ids.length || !sourceMap) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {ids.map((id) => {
        const source = sourceMap.get(id);
        return source?.url ? <SourceLink key={id} source={source} fallbackLabel={copy.source} /> : null;
      })}
    </div>
  );
}

export function CountryMigrations({ dossier = {}, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const countryName = localizedValue(dossier?.name, lang) || localizedValue(dossier?.country, lang) || copy.country;
  const routes = useMemo(() => dossier.migrations || dossier.migration_routes || [], [dossier]);
  const types = useMemo(() => [...new Set(routes.map(routeType))], [routes]);
  const [selectedType, setSelectedType] = useState("all");
  const [openId, setOpenId] = useState(routes[0]?.id || null);
  const visible = useMemo(() => selectedType === "all" ? routes : routes.filter((r) => routeType(r) === selectedType), [routes, selectedType]);

  return (
    <div className="space-y-7">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[.08] to-transparent p-6">
        <p className="overline text-gold">{copy.overline}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{copy.title.replace("{country}", countryName)}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">{copy.intro}</p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <button type="button" onClick={() => setSelectedType("all")} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${selectedType === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>{copy.all.replace("{n}", routes.length)}</button>
        {types.map((type) => <button key={type} type="button" onClick={() => setSelectedType(type)} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${selectedType === type ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>{copy.types[type] || type}</button>)}
      </div>

      <MigrationMap routes={visible} countryName={countryName} copy={copy} />
      {!visible.length && <div className="rounded-2xl border border-bone/10 p-6 text-sm text-bone/55">{copy.empty}</div>}

      <div className="grid gap-4">
        {visible.map((route, index) => {
          const stableId = String(route.id || route.slug || `route-${index}`);
          const expanded = openId === stableId;
          const panelId = `migration-detail-${stableId.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
          return (
            <article key={stableId} className="rounded-2xl border border-bone/10 bg-bone/[.025] p-5">
              <button
                type="button"
                onClick={() => setOpenId(expanded ? null : stableId)}
                className="flex w-full items-start justify-between gap-4 text-left"
                aria-expanded={expanded}
                aria-controls={panelId}
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[.16em] text-gold/75">{periodLabel(route, copy)} · {copy.types[routeType(route)] || routeType(route)}</p>
                  <h3 className="mt-1 font-serif text-2xl text-bone"><TranslatedInline value={route.label || route.title || copy.documented} /></h3>
                </div>
                <span className="text-bone/40" aria-hidden="true">{expanded ? "−" : "+"}</span>
              </button>
              {expanded && (
                <div id={panelId} className="mt-4 border-t border-bone/10 pt-4">
                  {route.summary && <TranslatedText value={route.summary} className="leading-7 text-bone/70" />}
                  {route.details?.map((detail, i) => <TranslatedText key={i} value={detail} className="mt-3 text-sm leading-6 text-bone/60" />)}
                  {(route.origin || route.destination) && (
                    <p className="mt-4 text-xs text-bone/45">
                      <TranslatedInline value={route.origin || copy.originUnknown} /> → <TranslatedInline value={route.destination || copy.destinationUnknown} />
                    </p>
                  )}
                  <SourceLinks ids={route.sources || []} sourceMap={sourceMap} copy={copy} />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export const SouthAfricaMigrations = CountryMigrations;
