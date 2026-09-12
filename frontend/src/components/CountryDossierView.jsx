import { CountryOverview } from "./CountryOverview";
import SouthAfricaDeepHistory from "./SouthAfricaDeepHistory";
import SouthAfricaPre1652Routes from "./SouthAfricaPre1652Routes";
import CountryMigrationFlowMap from "./CountryMigrationFlowMap";
import { SouthAfricaInternationalQuality } from "./SouthAfricaInternationalQuality";
import { SouthAfricaSymbolsQuality } from "./SouthAfricaSymbolsQuality";
import { SouthAfricaEconomyQuality } from "./SouthAfricaEconomyQuality";
import { SouthAfricaEducationHealthQuality } from "./SouthAfricaEducationHealthQuality";
import { SouthAfricaSocietyQuality } from "./SouthAfricaSocietyQuality";
import { CountryHistoriography, CountryResearchGaps, CountrySources } from "./CountrySourcesQuality";
import { CountryPolities } from "./CountryPolities";
import { CountryLanguages, CountryReligions } from "./CountryLanguagesReligions";
import { CountryPeoples } from "./CountryPeoples";
import { CountryFigures } from "./CountryFigures";
import { SouthAfricaHeritage } from "./SouthAfricaHeritage";
import { SouthAfricaCulture } from "./SouthAfricaCulture";
import { CountryMigrations } from "./CountryMigrations";
import { CountryHistory } from "./CountryHistory";
import { SouthAfricaLawMemory } from "./SouthAfricaLawMemory";
import { SouthAfricaSportMedia } from "./SouthAfricaSportMedia";
import { SouthAfricaEducationHealth, SouthAfricaInternationalRole, SouthAfricaNationalSymbols, SouthAfricaSociety } from "./SouthAfricaSocietyState";
import { SouthAfricaEconomy, SouthAfricaInteractiveTimeline, SouthAfricaScientificLibrary } from "./SouthAfricaTimelineEconomy";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CountryMediaGallery } from "./CountryMediaGallery";
import CountryTerritory from "./CountryTerritory";
import CountrySectionBoundary from "./CountrySectionBoundary";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";
import { getCountryMigrationRouteSet } from "../data/countryMigrationRoutes";

const COPY = {
  en: {
    country: "Country",
    southernAfrica: "Southern Africa",
    navLabel: "Country dossier sections",
    status: { ready: "Established", provisional: "Read with context", disputed: "Historical debate", "research-gap": "To investigate" },
    mapping: "Mapping",
    present: "present",
    bce: "BCE",
    groups: [
      { id: "identity", label: "Discover", items: [["overview", "Overview"], ["media", "Gallery"], ["symbols", "Symbols"]] },
      { id: "maps", label: "Territory", items: [["provinces-cities", "Provinces & cities"]] },
      { id: "history", label: "History", items: [["timeline", "Historical narrative"], ["interactive-timeline", "Timeline"], ["polities", "Kingdoms & states"], ["law-memory", "Law & memory"]] },
      { id: "mobility", label: "Migrations", items: [["migrations", "Migrations & diasporas"], ["international", "{country} in the world"]] },
      { id: "society", label: "Society & culture", items: [["peoples", "Peoples"], ["languages", "Languages"], ["religions", "Religions"], ["culture", "Culture"], ["sport-media", "Sports & media"]] },
      { id: "heritage", label: "Heritage & nature", items: [["heritage", "Heritage"]] },
      { id: "state", label: "State & economy", items: [["society", "Society"], ["education-health", "Education & health"], ["economy", "Economy"]] },
      { id: "people", label: "Figures", items: [["figures", "Figures"]] },
      { id: "sources", label: "Sources", items: [["historiography", "Debates"], ["research", "To investigate"], ["library", "Library"], ["sources", "All sources"]] },
    ],
    explore: {
      eyebrow: "Explore AfroAtlas",
      title: "Continue beyond this country",
      intro: "Connect this dossier with the wider Atlas, timelines, peoples, civilizations and diasporas.",
      navLabel: "Continue exploring AfroAtlas",
      items: [
        ["/atlas", "Atlas", "Locate places, movements and historical layers."],
        ["/timeline", "Timeline", "Move across periods and connected events."],
        ["/people", "Peoples", "Explore communities across borders and time."],
        ["/civilizations", "Civilizations", "Follow kingdoms, states and cultural worlds."],
        ["/diaspora", "Diaspora", "Trace movements, communities and connections."],
        ["/figures", "Figures", "Discover people linked to African histories."],
        ["/compare", "Compare", "Put countries and trajectories side by side."],
      ],
    },
  },
  fr: {
    country: "Pays",
    southernAfrica: "Afrique australe",
    navLabel: "Grandes sections du dossier pays",
    status: { ready: "Établi", provisional: "À lire avec contexte", disputed: "Débat historique", "research-gap": "À suivre" },
    mapping: "Cartographie",
    present: "aujourd’hui",
    bce: "av. J.-C.",
    groups: [
      { id: "identity", label: "Découvrir", items: [["overview", "Présentation"], ["media", "Galerie"], ["symbols", "Symboles"]] },
      { id: "maps", label: "Territoire", items: [["provinces-cities", "Provinces & villes"]] },
      { id: "history", label: "Histoire", items: [["timeline", "Récit historique"], ["interactive-timeline", "Chronologie"], ["polities", "Royaumes & États"], ["law-memory", "Droit & mémoire"]] },
      { id: "mobility", label: "Migrations", items: [["migrations", "Migrations & diasporas"], ["international", "{country} dans le monde"]] },
      { id: "society", label: "Société & culture", items: [["peoples", "Peuples"], ["languages", "Langues"], ["religions", "Religions"], ["culture", "Culture"], ["sport-media", "Sports & médias"]] },
      { id: "heritage", label: "Patrimoine & nature", items: [["heritage", "Patrimoine"]] },
      { id: "state", label: "État & économie", items: [["society", "Société"], ["education-health", "Éducation & santé"], ["economy", "Économie"]] },
      { id: "people", label: "Personnalités", items: [["figures", "Personnalités"]] },
      { id: "sources", label: "Sources", items: [["historiography", "Débats"], ["research", "À suivre"], ["library", "Bibliothèque"], ["sources", "Toutes les sources"]] },
    ],
    explore: {
      eyebrow: "Explorer AfroAtlas",
      title: "Continuer au-delà de ce pays",
      intro: "Reliez ce dossier au reste de l’Atlas, aux chronologies, aux peuples, aux civilisations et aux diasporas.",
      navLabel: "Continuer l’exploration dans AfroAtlas",
      items: [
        ["/atlas", "Atlas", "Situer les lieux, circulations et couches historiques."],
        ["/timeline", "Chronologie", "Parcourir les périodes et les événements liés."],
        ["/people", "Peuples", "Explorer les communautés au-delà des frontières et du temps."],
        ["/civilizations", "Civilisations", "Suivre royaumes, États et mondes culturels."],
        ["/diaspora", "Diaspora", "Retracer les mobilités, communautés et connexions."],
        ["/figures", "Personnalités", "Découvrir les personnes liées aux histoires africaines."],
        ["/compare", "Comparer", "Mettre pays et trajectoires en regard."],
      ],
    },
  },
};

const COUNTRY_CONTEXT_ROUTES = new Set(["/timeline", "/people", "/civilizations", "/diaspora", "/figures"]);

function contextualExplorePath(path, countryName) {
  if (!COUNTRY_CONTEXT_ROUTES.has(path) || !countryName) return path;
  return `${path}?q=${encodeURIComponent(countryName)}`;
}

function TranslatedInline({ value }) {
  const translated = useTranslated(value || "");
  return translated || value || null;
}

function StatusBadge({ status, copy }) {
  const label = copy.status[status] || status;
  return (
    <span className="inline-flex rounded-full border border-bone/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-bone/55">
      {label}
    </span>
  );
}

function SourceLink({ source }) {
  const translatedPublisher = useTranslated(source?.publisher || "");
  const translatedTitle = useTranslated(source?.title || "");
  if (!source) return null;
  const publisher = translatedPublisher || source.publisher;
  const title = translatedTitle || source.title;
  return (
    <a href={source.url} target="_blank" rel="noreferrer" className="text-[11px] text-gold/80 hover:text-gold underline underline-offset-2">
      {publisher ? `${publisher}: ` : ""}{title}
    </a>
  );
}

function SourceLinks({ ids, sourceMap }) {
  if (!ids?.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
      {ids.map((id) => {
        const source = sourceMap.get(id);
        return source ? <SourceLink key={id} source={source} /> : null;
      })}
    </div>
  );
}

function Timeline({ items, sourceMap, copy, lang }) {
  return (
    <div className="space-y-5">
      {items.map((item) => (
        <article key={item.id} className="border-l border-gold/30 pl-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-gold text-xs tracking-widest uppercase">
              {item.start < 0 ? `${Math.abs(item.start).toLocaleString(lang === "fr" ? "fr-FR" : "en-US")} ${copy.bce}` : item.end ? `${item.start}–${item.end}` : `${item.start}–${copy.present}`}
            </p>
            <StatusBadge status={item.status} copy={copy} />
          </div>
          <h3 className="font-serif text-xl text-bone mt-1"><TranslatedInline value={item.label} /></h3>
          <p className="text-bone/75 leading-relaxed mt-1"><TranslatedInline value={item.text} /></p>
          <SourceLinks ids={item.sources} sourceMap={sourceMap} />
        </article>
      ))}
    </div>
  );
}

function SimpleCards({ items, sourceMap, copy, titleField = "name", bodyField = "note" }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, index) => (
        <article key={item.id || item[titleField] || index} className="rounded-lg border border-bone/10 bg-bone/[0.025] p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-lg text-bone"><TranslatedInline value={item[titleField]} /></h3>
            {item.status && <StatusBadge status={item.status} copy={copy} />}
          </div>
          {item[bodyField] && <p className="text-sm text-bone/70 leading-relaxed mt-2"><TranslatedInline value={item[bodyField]} /></p>}
          {item.mapping && <p className="text-xs text-bone/45 mt-2">{copy.mapping} : <TranslatedInline value={item.mapping} /></p>}
          <SourceLinks ids={item.sources} sourceMap={sourceMap} />
        </article>
      ))}
    </div>
  );
}

export default function CountryDossierView({ dossier }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const [active, setActive] = useState("overview");
  const sourceMap = useMemo(() => new Map((dossier?.sources || []).map((s) => [s.id, s])), [dossier?.sources]);
  const territory = useMemo(() => ({
    sections: dossier?.territory_v8?.sections || dossier?.territory_sections || [],
    places: dossier?.territory_v8?.places || dossier?.map_visuals?.territory_places || [],
  }), [dossier?.territory_v8, dossier?.territory_sections, dossier?.map_visuals]);
  const countryName = dossier.name?.[lang] || dossier.name?.fr || dossier.name?.en || dossier.country || copy.country;
  const regionName = dossier.region?.[lang] || dossier.region?.fr || dossier.region?.en || copy.southernAfrica;
  const editorialNote = useTranslated(dossier.editorial_note || "");
  const migrationRouteSet = getCountryMigrationRouteSet(dossier?.iso2);
  const migrationRoutes = migrationRouteSet?.routes?.length ? migrationRouteSet.routes : (dossier?.map_visuals?.migration_routes || []);
  const migrationNote = migrationRouteSet?.note || dossier?.map_visuals?.note;
  const groups = useMemo(() => copy.groups.map((group) => ({
    ...group,
    items: group.items.map(([id, label]) => [id, label.replace("{country}", countryName)]),
  })), [copy, countryName]);
  const activeGroup = groups.find((group) => group.items.some(([id]) => id === active)) || groups[0];

  return (
    <div className="pt-[100px] pb-20 px-5 max-w-5xl mx-auto">
      <p className="overline text-gold mb-2">{copy.country} · {regionName}</p>
      <h1 className="font-serif text-4xl md:text-5xl text-bone">{countryName}</h1>
      <p className="text-bone/55 mt-3 max-w-3xl leading-relaxed">{editorialNote || dossier.editorial_note}</p>

      <nav className="mt-8" aria-label={copy.navLabel}>
        <div className="flex gap-2 overflow-x-auto pb-3">
          {groups.map((group) => {
            const selected = group.id === activeGroup.id;
            return (
              <button key={group.id} onClick={() => setActive(group.items[0][0])} className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium ${selected ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60 hover:text-bone"}`}>
                {group.label}
              </button>
            );
          })}
        </div>
        {activeGroup.items.length > 1 && (
          <div className="mt-2 flex gap-2 overflow-x-auto rounded-xl border border-bone/10 bg-bone/[0.025] p-2">
            {activeGroup.items.map(([itemId, label]) => (
              <button key={itemId} onClick={() => setActive(itemId)} className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs ${active === itemId ? "bg-gold/15 text-gold" : "text-bone/55 hover:bg-bone/5 hover:text-bone"}`}>
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <section className="mt-8">
        <CountrySectionBoundary resetKey={active} title={activeGroup.label}>
        {active === "overview" && <CountryOverview dossier={dossier} sourceMap={sourceMap} />}
        {active === "media" && <CountryMediaGallery items={dossier.media_gallery || []} />}
        {active === "timeline" && (<div className="space-y-10"><SouthAfricaDeepHistory data={dossier.deep_history} sourceMap={sourceMap} /><CountryHistory dossier={dossier} sourceMap={sourceMap} /></div>)}
        {active === "provinces-cities" && <CountryTerritory dossier={dossier} territory={territory} sourceMap={sourceMap} />}
        {active === "interactive-timeline" && <SouthAfricaInteractiveTimeline dossier={dossier} sourceMap={sourceMap} />}
        {active === "economy" && <SouthAfricaEconomyQuality dossier={dossier} sourceMap={sourceMap} />}
        {active === "society" && <SouthAfricaSocietyQuality dossier={dossier} sourceMap={sourceMap} />}
        {active === "education-health" && <SouthAfricaEducationHealthQuality dossier={dossier} sourceMap={sourceMap} />}
        {active === "symbols" && <SouthAfricaSymbolsQuality dossier={dossier} sourceMap={sourceMap} />}
        {active === "international" && <SouthAfricaInternationalQuality dossier={dossier} sourceMap={sourceMap} />}
        {active === "sport-media" && <SouthAfricaSportMedia dossier={dossier} sourceMap={sourceMap} />}
        {active === "law-memory" && <SouthAfricaLawMemory dossier={dossier} sourceMap={sourceMap} />}
        {active === "peoples" && <CountryPeoples dossier={dossier} sourceMap={sourceMap} />}
        {active === "polities" && <CountryPolities dossier={dossier} sourceMap={sourceMap} />}
        {active === "migrations" && (<div className="space-y-10"><SouthAfricaPre1652Routes data={dossier.pre1652_map} sourceMap={sourceMap} /><CountryMigrationFlowMap routes={migrationRoutes} note={migrationNote} /><CountryMigrations dossier={dossier} sourceMap={sourceMap} /></div>)}
        {active === "heritage" && <SouthAfricaHeritage dossier={dossier} sourceMap={sourceMap} />}
        {active === "figures" && <CountryFigures dossier={dossier} sourceMap={sourceMap} />}
        {active === "culture" && <SouthAfricaCulture dossier={dossier} sourceMap={sourceMap} />}
        {active === "languages" && <CountryLanguages dossier={dossier} sourceMap={sourceMap} />}
        {active === "religions" && <CountryReligions dossier={dossier} sourceMap={sourceMap} />}
        {active === "historiography" && <CountryHistoriography dossier={dossier} />}
        {active === "research" && <CountryResearchGaps dossier={dossier} />}
        {active === "library" && <SouthAfricaScientificLibrary dossier={dossier} sourceMap={sourceMap} />}
        {active === "sources" && <CountrySources dossier={dossier} />}
        </CountrySectionBoundary>
      </section>

      <section className="mt-14 border-t border-bone/10 pt-8" aria-labelledby="country-explore-title">
        <p className="overline text-gold mb-2">{copy.explore.eyebrow}</p>
        <div className="max-w-3xl">
          <h2 id="country-explore-title" className="font-serif text-2xl md:text-3xl text-bone">{copy.explore.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-bone/55">{copy.explore.intro}</p>
        </div>
        <nav className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label={copy.explore.navLabel}>
          {copy.explore.items.map(([to, label, detail]) => {
            const href = contextualExplorePath(to, countryName);
            return (
              <Link key={to} to={href} className="group rounded-xl border border-bone/10 bg-bone/[0.025] p-4 transition hover:border-gold/35 hover:bg-gold/[0.045] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70">
                <span className="flex items-center justify-between gap-3 text-sm font-medium text-bone group-hover:text-gold">
                  {label}
                  <span aria-hidden="true" className="text-gold/60 transition-transform group-hover:translate-x-0.5">→</span>
                </span>
                <span className="mt-1.5 block text-xs leading-relaxed text-bone/45">{detail}</span>
              </Link>
            );
          })}
        </nav>
      </section>
    </div>
  );
}
