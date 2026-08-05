import { useMemo, useState } from "react";

const PERIODS = [
  ["all", "Tout"], ["human-origins", "Origines humaines"], ["precolonial", "Avant 1652"],
  ["kingdoms", "Royaumes"], ["colonisation", "Colonisation"], ["migration", "Migrations"],
  ["industrialisation", "Industrialisation"], ["union-segregation", "Union & ségrégation"],
  ["apartheid", "Apartheid"], ["democracy", "Démocratie"],
];

function SourceList({ ids = [], sourceMap }) {
  return <div className="mt-2 flex flex-wrap gap-2">{ids.map((id) => {
    const source = sourceMap.get(id);
    return source ? <a key={id} className="text-[11px] text-gold/80 underline" href={source.url} target="_blank" rel="noreferrer">{source.publisher}</a> : null;
  })}</div>;
}

export function SouthAfricaInteractiveTimeline({ dossier, sourceMap }) {
  const [period, setPeriod] = useState("all");
  const items = useMemo(() => (dossier.interactive_timeline || []).filter((item) => period === "all" || item.period === period), [dossier.interactive_timeline, period]);
  return <div className="space-y-6">
    <div className="flex gap-2 overflow-x-auto pb-2">{PERIODS.map(([id, label]) => <button key={id} onClick={() => setPeriod(id)} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${period === id ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>{label}</button>)}</div>
    <div className="relative border-l border-gold/30 pl-5 space-y-5">{items.map((item) => <article key={item.id} className="relative rounded-lg border border-bone/10 bg-bone/[0.025] p-4">
      <span className="absolute -left-[27px] top-5 h-3 w-3 rounded-full border-2 border-gold bg-[#15110f]" />
      <p className="text-xs uppercase tracking-wider text-gold">{item.year < 0 ? `${Math.abs(item.year).toLocaleString("fr-FR")} ans avant notre ère` : item.year}</p>
      <h3 className="mt-1 font-serif text-xl text-bone">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-bone/70">{item.summary}</p><SourceList ids={item.sourceIds} sourceMap={sourceMap} />
    </article>)}</div>
  </div>;
}

export function SouthAfricaEconomy({ dossier, sourceMap }) {
  const economy = dossier.economy || {};
  return <div className="space-y-8">
    <p className="rounded-lg border border-amber-400/20 bg-amber-400/[0.04] p-4 text-sm text-bone/70">{economy.editorialNote}</p>
    <section><h2 className="mb-4 font-serif text-2xl text-gold">Transformations historiques</h2><div className="grid gap-4 md:grid-cols-2">{(economy.historicalTransformations || []).map((item) => <article key={item.title} className="rounded-lg border border-bone/10 p-4"><h3 className="font-serif text-lg text-bone">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-bone/70">{item.text}</p><SourceList ids={item.sourceIds} sourceMap={sourceMap} /></article>)}</div></section>
    <section><h2 className="mb-4 font-serif text-2xl text-gold">Économie contemporaine</h2><div className="grid gap-3 sm:grid-cols-3">{(economy.currentIndicators || []).map((item) => <article key={item.label} className="rounded-lg border border-bone/10 p-4"><p className="text-xs text-bone/50">{item.label}</p><p className="mt-1 font-serif text-2xl text-gold">{item.value}</p><p className="mt-1 text-[11px] text-bone/40">Donnée : {item.asOf}</p><SourceList ids={item.sourceIds} sourceMap={sourceMap} /></article>)}</div></section>
    <section><h2 className="mb-4 font-serif text-2xl text-gold">Secteurs structurants</h2><div className="grid gap-4 md:grid-cols-2">{(economy.sectors || []).map((item) => <article key={item.name} className="rounded-lg border border-bone/10 p-4"><h3 className="font-serif text-lg text-bone">{item.name}</h3><p className="mt-2 text-sm text-bone/70">{item.note}</p><SourceList ids={item.sourceIds} sourceMap={sourceMap} /></article>)}</div></section>
    <section><h2 className="mb-3 font-serif text-2xl text-gold">Défis documentés</h2><ul className="list-disc space-y-2 pl-5 text-bone/70">{(economy.challenges || []).map((item) => <li key={item}>{item}</li>)}</ul></section>
  </div>;
}

export function SouthAfricaScientificLibrary({ dossier, sourceMap }) {
  return <div className="space-y-6">{(dossier.scientific_library || []).map((group) => <section key={group.category}><h2 className="mb-3 font-serif text-2xl text-gold">{group.category}</h2><div className="space-y-3">{group.items.map((id) => { const source = sourceMap.get(id); return source ? <article key={id} className="border-b border-bone/10 pb-3"><p className="text-bone">{source.title}</p><p className="text-xs text-bone/50">{source.publisher}{source.year ? ` · ${source.year}` : ""} · Catégorie {source.category}</p><a className="text-xs text-gold/80 underline" href={source.url} target="_blank" rel="noreferrer">Consulter</a></article> : null; })}</div></section>)}</div>;
}
