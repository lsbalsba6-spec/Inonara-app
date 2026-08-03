import { SouthAfricaOverview } from "./SouthAfricaOverview";
import SouthAfricaDeepHistory from "./SouthAfricaDeepHistory";
import SouthAfricaPre1652Routes from "./SouthAfricaPre1652Routes";
import { SouthAfricaCountryMap, SouthAfricaMigrationMap } from "./SouthAfricaVisuals";
import { SouthAfricaInternationalQuality } from "./SouthAfricaInternationalQuality";
import { SouthAfricaSymbolsQuality } from "./SouthAfricaSymbolsQuality";
import { SouthAfricaEconomyQuality } from "./SouthAfricaEconomyQuality";
import { SouthAfricaEducationHealthQuality } from "./SouthAfricaEducationHealthQuality";
import { SouthAfricaSocietyQuality } from "./SouthAfricaSocietyQuality";
import { SouthAfricaHistoriography, SouthAfricaResearchGaps, SouthAfricaSources } from "./SouthAfricaSourcesQuality";
import { SouthAfricaPolities } from "./SouthAfricaPolities";
import { SouthAfricaLanguages, SouthAfricaReligions } from "./SouthAfricaLanguagesReligions";
import { SouthAfricaPeoples } from "./SouthAfricaPeoples";
import { SouthAfricaFigures } from "./SouthAfricaFigures";
import { SouthAfricaHeritage } from "./SouthAfricaHeritage";
import { SouthAfricaCulture } from "./SouthAfricaCulture";
import { SouthAfricaMigrations } from "./SouthAfricaMigrations";
import { SouthAfricaHistory } from "./SouthAfricaHistory";
import { SouthAfricaLawMemory } from "./SouthAfricaLawMemory";
import { SouthAfricaSportMedia } from "./SouthAfricaSportMedia";
import { SouthAfricaEducationHealth, SouthAfricaInternationalRole, SouthAfricaNationalSymbols, SouthAfricaSociety } from "./SouthAfricaSocietyState";
import { SouthAfricaEconomy, SouthAfricaInteractiveTimeline, SouthAfricaScientificLibrary } from "./SouthAfricaTimelineEconomy";
import { useMemo, useState } from "react";
import { SouthAfricaProvincesCities } from "./SouthAfricaProvincesCities";
import { SouthAfricaMediaGallery } from "./SouthAfricaMediaGallery";

const STATUS_LABELS = {
  ready: "Établi",
  provisional: "À lire avec contexte",
  disputed: "Débat historique",
  "research-gap": "À suivre",
};

function StatusBadge({ status }) {
  const label = STATUS_LABELS[status] || status;
  return (
    <span className="inline-flex rounded-full border border-bone/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-bone/55">
      {label}
    </span>
  );
}

function SourceLinks({ ids, sourceMap }) {
  if (!ids?.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
      {ids.map((id) => {
        const source = sourceMap.get(id);
        if (!source) return null;
        return (
          <a key={id} href={source.url} target="_blank" rel="noreferrer" className="text-[11px] text-gold/80 hover:text-gold underline underline-offset-2">
            {source.publisher}: {source.title}
          </a>
        );
      })}
    </div>
  );
}

function Timeline({ items, sourceMap }) {
  return (
    <div className="space-y-5">
      {items.map((item) => (
        <article key={item.id} className="border-l border-gold/30 pl-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-gold text-xs tracking-widest uppercase">
              {item.start < 0 ? `${Math.abs(item.start).toLocaleString("fr-FR")} ans avant notre ère` : item.end ? `${item.start}–${item.end}` : `${item.start}–aujourd'hui`}
            </p>
            <StatusBadge status={item.status} />
          </div>
          <h3 className="font-serif text-xl text-bone mt-1">{item.label}</h3>
          <p className="text-bone/75 leading-relaxed mt-1">{item.text}</p>
          <SourceLinks ids={item.sources} sourceMap={sourceMap} />
        </article>
      ))}
    </div>
  );
}

function SimpleCards({ items, sourceMap, titleField = "name", bodyField = "note" }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, index) => (
        <article key={item.id || item[titleField] || index} className="rounded-lg border border-bone/10 bg-bone/[0.025] p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-lg text-bone">{item[titleField]}</h3>
            {item.status && <StatusBadge status={item.status} />}
          </div>
          {item[bodyField] && <p className="text-sm text-bone/70 leading-relaxed mt-2">{item[bodyField]}</p>}
          {item.mapping && <p className="text-xs text-bone/45 mt-2">Cartographie : {item.mapping}</p>}
          <SourceLinks ids={item.sources} sourceMap={sourceMap} />
        </article>
      ))}
    </div>
  );
}

export default function CountryDossierView({ dossier }) {
  const [active, setActive] = useState("overview");
  const sourceMap = useMemo(() => new Map((dossier?.sources || []).map((s) => [s.id, s])), [dossier?.sources]);
  const groups = [
    { id: "identity", label: "Découvrir", items: [["overview", "Présentation"], ["media", "Galerie"], ["symbols", "Symboles"]] },
    { id: "maps", label: "Territoire", items: [["provinces-cities", "Provinces & villes"]] },
    { id: "history", label: "Histoire", items: [["timeline", "Récit historique"], ["interactive-timeline", "Chronologie"], ["polities", "Royaumes & États"], ["law-memory", "Droit & mémoire"]] },
    { id: "mobility", label: "Migrations", items: [["migrations", "Migrations & diasporas"], ["international", `${dossier.name?.fr || "Pays"} dans le monde`]] },
    { id: "society", label: "Société & culture", items: [["peoples", "Peuples"], ["languages", "Langues"], ["religions", "Religions"], ["culture", "Culture"], ["sport-media", "Sports & médias"]] },
    { id: "heritage", label: "Patrimoine & nature", items: [["heritage", "Patrimoine"]] },
    { id: "state", label: "État & économie", items: [["society", "Société"], ["education-health", "Éducation & santé"], ["economy", "Économie"]] },
    { id: "people", label: "Personnalités", items: [["figures", "Personnalités"]] },
    { id: "sources", label: "Sources", items: [["historiography", "Débats"], ["research", "À suivre"], ["library", "Bibliothèque"], ["sources", "Toutes les sources"]] },
  ];
  const activeGroup = groups.find((group) => group.items.some(([id]) => id === active)) || groups[0];

  return (
    <div className="pt-[100px] pb-20 px-5 max-w-5xl mx-auto">
      <p className="overline text-gold mb-2">Pays · {dossier.region?.fr || "Afrique australe"}</p>
      <h1 className="font-serif text-4xl md:text-5xl text-bone">{dossier.name?.fr || dossier.country || "Pays"}</h1>
      <p className="text-bone/55 mt-3 max-w-3xl leading-relaxed">{dossier.editorial_note}</p>

      <nav className="mt-8" aria-label="Grandes sections du dossier pays">
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
            {activeGroup.items.map(([id, label]) => (
              <button key={id} onClick={() => setActive(id)} className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs ${active === id ? "bg-gold/15 text-gold" : "text-bone/55 hover:bg-bone/5 hover:text-bone"}`}>
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <section className="mt-8">
        {active === "overview" && <SouthAfricaOverview dossier={dossier} sourceMap={sourceMap} />}
        {active === "media" && <SouthAfricaMediaGallery items={dossier.media_gallery || []} />}
        {active === "timeline" && (<div className="space-y-10"><SouthAfricaDeepHistory data={dossier.deep_history} sourceMap={sourceMap} /><SouthAfricaHistory dossier={dossier} sourceMap={sourceMap} /></div>)}
        {active === "provinces-cities" && (<div className="space-y-10"><SouthAfricaCountryMap cities={dossier.map_visuals?.cities || []} /><SouthAfricaProvincesCities dossier={dossier} sourceMap={sourceMap} /></div>)}
        {active === "interactive-timeline" && <SouthAfricaInteractiveTimeline dossier={dossier} sourceMap={sourceMap} />}
        {active === "economy" && <SouthAfricaEconomyQuality dossier={dossier} sourceMap={sourceMap} />}
        {active === "society" && <SouthAfricaSocietyQuality dossier={dossier} sourceMap={sourceMap} />}
        {active === "education-health" && <SouthAfricaEducationHealthQuality dossier={dossier} sourceMap={sourceMap} />}
        {active === "symbols" && <SouthAfricaSymbolsQuality dossier={dossier} sourceMap={sourceMap} />}
        {active === "international" && <SouthAfricaInternationalQuality dossier={dossier} sourceMap={sourceMap} />}
        {active === "sport-media" && <SouthAfricaSportMedia dossier={dossier} sourceMap={sourceMap} />}
        {active === "law-memory" && <SouthAfricaLawMemory dossier={dossier} sourceMap={sourceMap} />}
        {active === "peoples" && <SouthAfricaPeoples dossier={dossier} sourceMap={sourceMap} />}
        {active === "polities" && <SouthAfricaPolities dossier={dossier} sourceMap={sourceMap} />}
        {active === "migrations" && (<div className="space-y-10"><SouthAfricaPre1652Routes data={dossier.pre1652_map} sourceMap={sourceMap} /><SouthAfricaMigrationMap routes={dossier.map_visuals?.migration_routes || []} note={dossier.map_visuals?.note} /><SouthAfricaMigrations dossier={dossier} sourceMap={sourceMap} /></div>)}
        {active === "heritage" && <SouthAfricaHeritage dossier={dossier} sourceMap={sourceMap} />}
        {active === "figures" && <SouthAfricaFigures dossier={dossier} sourceMap={sourceMap} />}
        {active === "culture" && <SouthAfricaCulture dossier={dossier} sourceMap={sourceMap} />}
        {active === "languages" && <SouthAfricaLanguages dossier={dossier} sourceMap={sourceMap} />}
        {active === "religions" && <SouthAfricaReligions dossier={dossier} sourceMap={sourceMap} />}
        {active === "historiography" && <SouthAfricaHistoriography dossier={dossier} />}
        {active === "research" && <SouthAfricaResearchGaps dossier={dossier} />}
        {active === "library" && <SouthAfricaScientificLibrary dossier={dossier} sourceMap={sourceMap} />}
        {active === "sources" && <SouthAfricaSources dossier={dossier} />}
      </section>
    </div>
  );
}
