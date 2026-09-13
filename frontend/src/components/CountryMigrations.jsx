import { useMemo, useState } from "react";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";
import { localizedValue } from "../lib/contentSort";

const COPY = {
  en: {
    country: "this country",
    overline: "Migrations & diasporas",
    title: "Human movements connected to {country}",
    intro: "Explore long-term mobility, labour migration, internal movement and contemporary regional connections. Each synthesis is linked to its documented sources.",
    source: "Source",
    themes: "Key migration stories",
    routes: "Documented routes",
    all: "All types",
    empty: "No migration content is available in this filter.",
    types: {
      forced: "Forced migration",
      voluntary: "Voluntary migration",
      mixed: "Mixed migration",
      "coerced-labour": "Coerced labour",
      "colonial-settlement": "Colonial settlement",
      ancient: "Ancient mobility",
      trade: "Trade circulation",
      "regional-mobility": "Regional mobility",
      "forced-displacement": "Forced displacement",
    },
    dating: "Dating to be clarified",
    since: "Since",
    until: "Until",
  },
  fr: {
    country: "ce pays",
    overline: "Migrations & diasporas",
    title: "Circulations humaines liées à {country}",
    intro: "Explorez les mobilités de longue durée, le travail migrant, les déplacements internes et les connexions régionales contemporaines. Chaque synthèse renvoie à ses sources documentées.",
    source: "Source",
    themes: "Grands récits migratoires",
    routes: "Routes documentées",
    all: "Tous les types",
    empty: "Aucun contenu migratoire n’est disponible avec ce filtre.",
    types: {
      forced: "Migration forcée",
      voluntary: "Migration volontaire",
      mixed: "Migration mixte",
      "coerced-labour": "Travail sous contrainte",
      "colonial-settlement": "Installation coloniale",
      ancient: "Mobilité ancienne",
      trade: "Circulation commerciale",
      "regional-mobility": "Mobilité régionale",
      "forced-displacement": "Déplacement forcé",
    },
    dating: "Datation à préciser",
    since: "Depuis",
    until: "Jusqu’en",
  },
};

function TranslatedInline({ value }) {
  const { lang } = useI18n();
  const translated = useTranslated(value || "");
  if (!value) return null;
  return translated || localizedValue(value, lang);
}

function SourceLinks({ ids = [], sourceMap, copy }) {
  if (!ids.length || !sourceMap) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {ids.map((id) => {
        const source = sourceMap.get(id);
        if (!source?.url) return null;
        return (
          <a key={id} href={source.url} target="_blank" rel="noreferrer" className="rounded-full border border-gold/25 px-3 py-1 text-[11px] text-gold/85 hover:bg-gold/10">
            {copy.source} · <TranslatedInline value={source.publisher || source.title || id} />
          </a>
        );
      })}
    </div>
  );
}

function routeType(route) {
  return route?.type || route?.migration_type || route?.kind || "mixed";
}

function periodLabel(route, copy) {
  if (route?.period) return route.period;
  if (route?.start == null && route?.end == null) return copy.dating;
  if (route?.start != null && route?.end != null) return `${route.start}–${route.end}`;
  if (route?.start != null) return `${copy.since} ${route.start}`;
  return `${copy.until} ${route.end}`;
}

export function CountryMigrations({ dossier = {}, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const countryName = localizedValue(dossier?.name, lang) || localizedValue(dossier?.country, lang) || copy.country;

  const migrationData = dossier?.migrations;
  const themes = useMemo(() => {
    if (Array.isArray(migrationData)) return [];
    return Array.isArray(migrationData?.themes) ? migrationData.themes : [];
  }, [migrationData]);
  const routes = useMemo(() => {
    if (Array.isArray(migrationData)) return migrationData;
    if (Array.isArray(migrationData?.routes)) return migrationData.routes;
    if (Array.isArray(dossier?.migration_routes)) return dossier.migration_routes;
    return [];
  }, [migrationData, dossier?.migration_routes]);

  const types = useMemo(() => [...new Set(routes.map(routeType))], [routes]);
  const [selectedType, setSelectedType] = useState("all");
  const visibleRoutes = selectedType === "all" ? routes : routes.filter((route) => routeType(route) === selectedType);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[.08] to-transparent p-6">
        <p className="overline text-gold">{copy.overline}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{copy.title.replace("{country}", countryName)}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">{copy.intro}</p>
      </header>

      {themes.length > 0 && (
        <section>
          <h3 className="font-serif text-2xl text-bone">{copy.themes}</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {themes.map((theme, index) => {
              const id = theme.id || `migration-theme-${index}`;
              return (
                <article key={id} className="rounded-2xl border border-bone/10 bg-bone/[.025] p-5">
                  <h4 className="font-serif text-xl text-bone"><TranslatedInline value={theme.title || theme.label} /></h4>
                  <p className="mt-3 text-sm leading-7 text-bone/68"><TranslatedInline value={theme.text || theme.summary || theme.description} /></p>
                  <SourceLinks ids={theme.sourceIds || theme.sources || []} sourceMap={sourceMap} copy={copy} />
                </article>
              );
            })}
          </div>
        </section>
      )}

      {routes.length > 0 && (
        <section>
          <div className="flex items-end justify-between gap-4">
            <h3 className="font-serif text-2xl text-bone">{copy.routes}</h3>
            {types.length > 1 && (
              <div className="flex flex-wrap justify-end gap-2">
                <button type="button" onClick={() => setSelectedType("all")} className={`rounded-full border px-3 py-1 text-xs ${selectedType === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/55"}`}>{copy.all}</button>
                {types.map((type) => (
                  <button key={type} type="button" onClick={() => setSelectedType(type)} className={`rounded-full border px-3 py-1 text-xs ${selectedType === type ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/55"}`}>{copy.types[type] || type}</button>
                ))}
              </div>
            )}
          </div>
          <div className="mt-4 grid gap-4">
            {visibleRoutes.map((route, index) => (
              <article key={route.id || `migration-route-${index}`} className="rounded-2xl border border-bone/10 bg-bone/[.025] p-5">
                <p className="text-[10px] uppercase tracking-[.16em] text-gold/75">{periodLabel(route, copy)} · {copy.types[routeType(route)] || routeType(route)}</p>
                <h4 className="mt-1 font-serif text-xl text-bone"><TranslatedInline value={route.label || route.title} /></h4>
                {(route.summary || route.description) && <p className="mt-3 text-sm leading-7 text-bone/65"><TranslatedInline value={route.summary || route.description} /></p>}
                {(route.origin || route.destination) && <p className="mt-3 text-xs text-bone/45"><TranslatedInline value={route.origin} /> → <TranslatedInline value={route.destination} /></p>}
                <SourceLinks ids={route.sourceIds || route.sources || []} sourceMap={sourceMap} copy={copy} />
              </article>
            ))}
          </div>
        </section>
      )}

      {!themes.length && !routes.length && <div className="rounded-2xl border border-bone/10 p-6 text-sm text-bone/55">{copy.empty}</div>}
    </div>
  );
}

export const SouthAfricaMigrations = CountryMigrations;
