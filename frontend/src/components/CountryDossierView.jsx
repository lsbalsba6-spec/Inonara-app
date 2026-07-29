import { useMemo, useState } from "react";
import { CurrentSouthAfricaFlag, SouthAfricaCountryMap, SouthAfricaFlagHistory, SouthAfricaMigrationMap } from "./SouthAfricaVisuals";

const STATUS_LABELS = {
  ready: "Établi",
  provisional: "À nuancer",
  disputed: "Débattu",
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
  const sources = useMemo(
    () => (Array.isArray(dossier?.sources) ? dossier.sources : []),
    [dossier?.sources]
  );
  const overview = dossier?.overview || {};
  const geography = dossier?.geography || {};
  const institutions = dossier?.institutions || {};
  const sourceMap = useMemo(() => new Map(sources.map((s) => [s.id, s])), [sources]);
  const tabs = [
    ["overview", "Présentation"], ["visuals", "Cartes & drapeaux"], ["geography", "Géographie"], ["institutions", "Institutions"], ["timeline", "Histoire"], ["peoples", "Peuples"],
    ["languages", "Langues"], ["religions", "Religions"], ["polities", "Royaumes & États"],
    ["migrations", "Migrations"], ["culture", "Culture"], ["heritage", "Patrimoine"],
    ["figures", "Personnalités"], ["historiography", "Débats"],
    ["research", "À approfondir"], ["sources", "Sources"],
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
          <p className="text-lg text-bone/80 leading-relaxed">{overview.summary || "Présentation détaillée à venir."}</p>
          <div className="grid gap-5 rounded-xl border border-bone/10 bg-bone/[0.025] p-5 md:grid-cols-[240px_1fr] md:items-center">
            <CurrentSouthAfricaFlag className="w-full rounded-lg border border-bone/10 shadow-lg" />
            <div><p className="overline text-gold">République d’Afrique du Sud</p><h2 className="mt-1 font-serif text-2xl text-bone">Président : {overview.president_current?.name || "Cyril Ramaphosa"}</h2><p className="mt-2 text-sm leading-relaxed text-bone/65">Le drapeau actuel est en usage depuis le 27 avril 1994. L’onglet Cartes & drapeaux présente sa chronologie et les cartes centrées sur le pays.</p></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-bone/10 rounded-lg p-4"><p className="overline text-bone/45">Population, recensement 2022</p><p className="font-serif text-2xl text-gold mt-1">≈ {((overview.population_census_2022 || 0) / 1000000).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} millions</p></div>
            <div className="border border-bone/10 rounded-lg p-4"><p className="overline text-bone/45">Président actuel</p><p className="font-serif text-xl text-gold mt-1">{overview.president_current?.name || "Cyril Ramaphosa"}</p><p className="text-xs text-bone/45 mt-1">Information vérifiée au {overview.president_current?.current_as_of || "29 juillet 2026"}</p></div>
            <div className="border border-bone/10 rounded-lg p-4"><p className="overline text-bone/45">Langues officielles</p><p className="font-serif text-2xl text-gold mt-1">{overview.official_languages_count || dossier?.languages?.official?.length || "—"}</p></div>
            <div className="border border-bone/10 rounded-lg p-4"><p className="overline text-bone/45">Sources documentées</p><p className="font-serif text-2xl text-gold mt-1">{sources.length}</p></div>
          </div>
          <SourceLinks ids={overview.sources || []} sourceMap={sourceMap} />
          <div>
            <h2 className="font-serif text-2xl text-gold mb-3">À suivre dans ce dossier</h2>
            <ul className="space-y-2 text-bone/70 list-disc pl-5">{(dossier.research_gaps || []).map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>}
        {active === "visuals" && <div className="space-y-10">
          <div><h2 className="font-serif text-2xl text-gold mb-4">Carte contemporaine</h2><SouthAfricaCountryMap cities={dossier.map_visuals?.cities || []} /></div>
          <div><h2 className="font-serif text-2xl text-gold mb-4">Évolution des drapeaux nationaux</h2><SouthAfricaFlagHistory items={dossier.flag_history || []} /><p className="mt-3 text-xs text-bone/50">Les drapeaux sont présentés comme des objets historiques. Leur affichage ne constitue pas une valorisation des régimes auxquels ils ont été associés.</p></div>
          <div><h2 className="font-serif text-2xl text-gold mb-4">Routes concernant l’Afrique du Sud</h2><SouthAfricaMigrationMap routes={dossier.map_visuals?.migration_routes || []} note={dossier.map_visuals?.note} /></div>
        </div>}
        {active === "geography" && <div className="space-y-8">
          <div className="grid gap-3 sm:grid-cols-3"><div className="rounded-lg border border-bone/10 p-4"><p className="overline text-bone/45">Superficie</p><p className="font-serif text-2xl text-gold mt-1">{geography.area_km2 ? geography.area_km2.toLocaleString("fr-FR") : "—"} km²</p></div><div className="rounded-lg border border-bone/10 p-4"><p className="overline text-bone/45">Façades maritimes</p><p className="text-bone/75 mt-2">{(geography.coasts || []).join(" · ") || "À venir"}</p></div><div className="rounded-lg border border-bone/10 p-4"><p className="overline text-bone/45">Voisins</p><p className="text-bone/75 mt-2">{(geography.neighbours || []).join(", ") || "À venir"}</p></div></div>
          <div><h2 className="font-serif text-2xl text-gold mb-3">Reliefs et régions physiques</h2><SimpleCards items={geography.relief || []} sourceMap={sourceMap} /></div>
          <div><h2 className="font-serif text-2xl text-gold mb-3">Grands cours d’eau</h2><SimpleCards items={geography.rivers || []} sourceMap={sourceMap} /></div>
          <div><h2 className="font-serif text-2xl text-gold mb-3">Biomes</h2><div className="flex flex-wrap gap-2">{(geography.biomes || []).map((item) => <span key={item} className="rounded-full border border-bone/15 px-3 py-1 text-sm text-bone/70">{item}</span>)}</div></div>
          <p className="rounded-lg border border-amber-400/20 bg-amber-400/[0.04] p-4 text-sm leading-relaxed text-bone/70">{geography.note || "Informations géographiques détaillées à venir."}</p><SourceLinks ids={geography.sources || []} sourceMap={sourceMap} />
        </div>}
        {active === "institutions" && <div className="space-y-8">
          <div><p className="overline text-bone/45">Forme de l’État</p><h2 className="font-serif text-2xl text-gold mt-1">{institutions.government_form || "République constitutionnelle"}</h2></div>
          <div><h2 className="font-serif text-2xl text-gold mb-3">Capitales et fonctions nationales</h2><SimpleCards items={institutions.capital_functions || overview.capital_functions || []} sourceMap={sourceMap} titleField="city" bodyField="function" /></div>
          <div><h2 className="font-serif text-2xl text-gold mb-3">Neuf provinces</h2><SimpleCards items={institutions.provinces || []} sourceMap={sourceMap} bodyField="capital" /></div>
          <SourceLinks ids={institutions.sources || []} sourceMap={sourceMap} />
        </div>}
        {active === "timeline" && <Timeline items={dossier.timeline} sourceMap={sourceMap} />}
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
          <div className="rounded-lg border border-gold/20 bg-gold/[0.04] p-4"><p className="text-sm text-bone/75">{dossier.religions.measure_label}</p>{dossier.religions.christian_share_2022 && <p className="mt-2 font-serif text-2xl text-gold">Christianisme : {dossier.religions.christian_share_2022}% de la population selon l’analyse de Stats SA</p>}</div>
          <div className="grid gap-3 sm:grid-cols-2">{dossier.religions.census_2022.map((r) => <div key={r.name} className="border border-bone/10 rounded-lg p-4"><p className="text-bone/65">{r.name}</p><p className="font-serif text-xl text-gold">{r.count.toLocaleString("fr-FR")} personnes</p></div>)}</div>
          <p className="text-bone/65 leading-relaxed">{dossier.religions.note}</p><SourceLinks ids={dossier.religions.sources} sourceMap={sourceMap} />
        </div>}
        {active === "historiography" && <div className="space-y-4">
          <p className="text-bone/65 leading-relaxed">Ces notes signalent les pièges d'interprétation à éviter. Elles ne remplacent pas les dossiers spécialisés à venir.</p>
          {dossier.historiography.map((note, index) => <article key={index} className="rounded-lg border border-amber-400/20 bg-amber-400/[0.04] p-4"><div className="flex items-start gap-3"><span className="text-amber-300 text-sm">⚠</span><p className="text-bone/75 leading-relaxed">{note}</p></div></article>)}
        </div>}
        {active === "research" && <div className="space-y-4">
          <p className="text-bone/65 leading-relaxed">Ces sujets seront ajoutés et développés au fil des prochaines mises à jour du dossier.</p>
          {(dossier.research_gaps || []).map((gap, index) => <article key={index} className="rounded-lg border border-bone/10 p-4"><div className="flex items-start justify-between gap-3"><p className="text-bone/75 leading-relaxed">{gap}</p><StatusBadge status="research-gap" /></div></article>)}
        </div>}
        {active === "sources" && <div className="space-y-4">
          {sources.map((source) => <article key={source.id} className="border-b border-bone/10 pb-4"><div className="flex gap-2 items-center"><span className="text-[10px] border border-gold/30 text-gold rounded px-1.5">Cat. {source.category}</span><h3 className="text-bone">{source.title}</h3></div><p className="text-xs text-bone/50 mt-1">{source.publisher}{source.year ? ` · ${source.year}` : ""}</p><a href={source.url} target="_blank" rel="noreferrer" className="text-xs text-gold/80 underline">Consulter la source</a></article>)}
        </div>}
      </section>
    </div>
  );
}
