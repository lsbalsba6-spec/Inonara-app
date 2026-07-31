import { SouthAfricaEducationHealth, SouthAfricaInternationalRole, SouthAfricaNationalSymbols, SouthAfricaSociety } from "./SouthAfricaSocietyState";
import { SouthAfricaEconomy, SouthAfricaInteractiveTimeline, SouthAfricaScientificLibrary } from "./SouthAfricaTimelineEconomy";
import { useMemo, useState } from "react";

const STATUS_LABELS = {
  ready: "Établi",
  provisional: "À nuancer",
  disputed: "Débattu",
  "research-gap": "Recherche à poursuivre",
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
  const sourceMap = useMemo(() => new Map(dossier.sources.map((s) => [s.id, s])), [dossier.sources]);
  const tabs = [
    ["overview", "Présentation"], ["interactive-timeline", "Chronologie"], ["economy", "Économie"], ["society", "Société"], ["education-health", "Éducation & santé"], ["symbols", "Symboles"], ["international", "Monde"], ["timeline", "Histoire"], ["peoples", "Peuples"],
    ["languages", "Langues"], ["religions", "Religions"], ["polities", "Royaumes & États"],
    ["migrations", "Migrations"], ["culture", "Culture"], ["heritage", "Patrimoine"],
    ["figures", "Personnalités"], ["historiography", "Débats"],
    ["research", "À approfondir"], ["library", "Bibliothèque"], ["sources", "Sources"],
  ];

  return (
    <div className="pt-[100px] pb-20 px-5 max-w-5xl mx-auto">
      <p className="overline text-gold mb-2">Pays · {dossier.region.fr}</p>
      <h1 className="font-serif text-4xl md:text-5xl text-bone">{dossier.name.fr}</h1>
      <p className="text-bone/55 mt-3 max-w-3xl leading-relaxed">{dossier.editorial_note}</p>

      <nav className="mt-8 flex gap-2 overflow-x-auto pb-3" aria-label="Sections du dossier pays">
        {tabs.map(([id, label]) => (
          <button key={id} onClick={() => setActive(id)} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${active === id ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60 hover:text-bone"}`}>
            {label}
          </button>
        ))}
      </nav>

      <section className="mt-8">
        {active === "overview" && <div className="space-y-7">
          <p className="text-lg text-bone/80 leading-relaxed">{dossier.overview.summary}</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="border border-bone/10 rounded-lg p-4"><p className="overline text-bone/45">Population, recensement 2022</p><p className="font-serif text-2xl text-gold mt-1">≈ {(dossier.overview.population_census_2022 / 1000000).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} millions</p></div>
            <div className="border border-bone/10 rounded-lg p-4"><p className="overline text-bone/45">Langues officielles</p><p className="font-serif text-2xl text-gold mt-1">{dossier.overview.official_languages_count}</p></div>
            <div className="border border-bone/10 rounded-lg p-4"><p className="overline text-bone/45">Sources documentées</p><p className="font-serif text-2xl text-gold mt-1">{dossier.sources.length}</p></div>
          </div>
          <SourceLinks ids={dossier.overview.sources} sourceMap={sourceMap} />
          <div>
            <h2 className="font-serif text-2xl text-gold mb-3">Limites assumées</h2>
            <ul className="space-y-2 text-bone/70 list-disc pl-5">{dossier.research_gaps.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>}
        {active === "timeline" && <Timeline items={dossier.timeline} sourceMap={sourceMap} />}
        {active === "interactive-timeline" && <SouthAfricaInteractiveTimeline dossier={dossier} sourceMap={sourceMap} />}
        {active === "economy" && <SouthAfricaEconomy dossier={dossier} sourceMap={sourceMap} />}
        {active === "society" && <SouthAfricaSociety dossier={dossier} sourceMap={sourceMap} />}
        {active === "education-health" && <SouthAfricaEducationHealth dossier={dossier} sourceMap={sourceMap} />}
        {active === "symbols" && <SouthAfricaNationalSymbols dossier={dossier} sourceMap={sourceMap} />}
        {active === "international" && <SouthAfricaInternationalRole dossier={dossier} sourceMap={sourceMap} />}
        {active === "peoples" && <SimpleCards items={dossier.peoples} sourceMap={sourceMap} />}
        {active === "polities" && <SimpleCards items={dossier.polities} sourceMap={sourceMap} bodyField="mapping" />}
        {active === "migrations" && <SimpleCards items={dossier.migrations} sourceMap={sourceMap} titleField="label" bodyField="reason" />}
        {active === "heritage" && <SimpleCards items={dossier.heritage} sourceMap={sourceMap} />}
        {active === "figures" && <SimpleCards items={dossier.figures} sourceMap={sourceMap} bodyField="reason" />}
        {active === "culture" && <div className="space-y-7">
          <SimpleCards items={dossier.culture} sourceMap={sourceMap} titleField="topic" bodyField="text" />
          <div><h2 className="font-serif text-2xl text-gold mb-3">Traditions orales et légendes</h2><SimpleCards items={dossier.oral_traditions_and_legends} sourceMap={sourceMap} titleField="title" /></div>
        </div>}
        {active === "languages" && <div className="space-y-6">
          <div><h2 className="font-serif text-2xl text-gold mb-3">12 langues officielles</h2><div className="flex flex-wrap gap-2">{dossier.languages.official.map((l) => <span key={l} className="border border-bone/15 rounded-full px-3 py-1 text-sm text-bone/75">{l}</span>)}</div></div>
          <div><h2 className="font-serif text-2xl text-gold mb-3">Langue la plus parlée au foyer, 2022</h2><div className="space-y-2">{dossier.languages.household_2022.filter((x) => x.percent != null).map((x) => <div key={x.language} className="flex justify-between border-b border-bone/10 pb-2 text-bone/75"><span>{x.language}</span><strong>{x.percent}%</strong></div>)}</div><p className="text-sm text-bone/50 mt-4">{dossier.languages.note}</p></div>
          <SourceLinks ids={dossier.languages.sources} sourceMap={sourceMap} />
        </div>}
        {active === "religions" && <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">{dossier.religions.census_2022.map((r) => <div key={r.name} className="border border-bone/10 rounded-lg p-4"><p className="text-bone/65">{r.name}</p><p className="font-serif text-xl text-gold">{r.count.toLocaleString("fr-FR")}</p></div>)}</div>
          <p className="text-bone/65 leading-relaxed">{dossier.religions.note}</p><SourceLinks ids={dossier.religions.sources} sourceMap={sourceMap} />
        </div>}
        {active === "historiography" && <div className="space-y-4">
          <p className="text-bone/65 leading-relaxed">Ces notes signalent les pièges d'interprétation à éviter. Elles ne remplacent pas les dossiers spécialisés à venir.</p>
          {dossier.historiography.map((note, index) => <article key={index} className="rounded-lg border border-amber-400/20 bg-amber-400/[0.04] p-4"><div className="flex items-start gap-3"><span className="text-amber-300 text-sm">⚠</span><p className="text-bone/75 leading-relaxed">{note}</p></div></article>)}
        </div>}
        {active === "research" && <div className="space-y-4">
          <p className="text-bone/65 leading-relaxed">Ces éléments restent volontairement ouverts. Ils ne sont pas présentés comme des faits établis ni transformés en routes ou frontières publiques.</p>
          {dossier.research_gaps.map((gap, index) => <article key={index} className="rounded-lg border border-bone/10 p-4"><div className="flex items-start justify-between gap-3"><p className="text-bone/75 leading-relaxed">{gap}</p><StatusBadge status="research-gap" /></div></article>)}
        </div>}
        {active === "library" && <SouthAfricaScientificLibrary dossier={dossier} sourceMap={sourceMap} />}
        {active === "sources" && <div className="space-y-4">
          {dossier.sources.map((source) => <article key={source.id} className="border-b border-bone/10 pb-4"><div className="flex gap-2 items-center"><span className="text-[10px] border border-gold/30 text-gold rounded px-1.5">Cat. {source.category}</span><h3 className="text-bone">{source.title}</h3></div><p className="text-xs text-bone/50 mt-1">{source.publisher}{source.year ? ` · ${source.year}` : ""}</p><a href={source.url} target="_blank" rel="noreferrer" className="text-xs text-gold/80 underline">Consulter la source</a></article>)}
        </div>}
      </section>
    </div>
  );
}
