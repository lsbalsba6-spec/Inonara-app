function StatusBadge({ status }) {
  const labels = { ready: "Établi", provisional: "À nuancer", disputed: "Débattu" };
  return (
    <span className="inline-flex rounded-full border border-bone/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-bone/55">
      {labels[status] || status}
    </span>
  );
}

function SourceLinks({ ids = [], sourceMap }) {
  if (!ids.length) return null;
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

function Cards({ items = [], sourceMap }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, index) => (
        <article key={item.title || index} className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-xl text-bone">{item.title}</h3>
            {item.status && <StatusBadge status={item.status} />}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-bone/70">{item.text}</p>
          <SourceLinks ids={item.sourceIds} sourceMap={sourceMap} />
        </article>
      ))}
    </div>
  );
}

export function SouthAfricaSociety({ dossier, sourceMap }) {
  const data = dossier.society;
  if (!data) return <p className="text-bone/60">Contenu à suivre.</p>;
  return <div className="space-y-6"><p className="text-lg leading-relaxed text-bone/80">{data.intro}</p><Cards items={data.themes} sourceMap={sourceMap} /></div>;
}

export function SouthAfricaEducationHealth({ dossier, sourceMap }) {
  const data = dossier.education_health;
  if (!data) return <p className="text-bone/60">Contenu à suivre.</p>;
  return (
    <div className="space-y-10">
      <section><h2 className="mb-3 font-serif text-3xl text-gold">Éducation</h2><p className="mb-5 text-bone/75 leading-relaxed">{data.education.intro}</p><Cards items={data.education.items} sourceMap={sourceMap} /></section>
      <section><h2 className="mb-3 font-serif text-3xl text-gold">Santé</h2><p className="mb-5 text-bone/75 leading-relaxed">{data.health.intro}</p><Cards items={data.health.items} sourceMap={sourceMap} /></section>
    </div>
  );
}

export function SouthAfricaNationalSymbols({ dossier, sourceMap }) {
  const data = dossier.national_symbols;
  if (!data) return <p className="text-bone/60">Contenu à suivre.</p>;
  return <div className="space-y-6"><p className="text-lg leading-relaxed text-bone/80">{data.intro}</p><Cards items={data.items} sourceMap={sourceMap} /></div>;
}

export function SouthAfricaInternationalRole({ dossier, sourceMap }) {
  const data = dossier.international_role;
  if (!data) return <p className="text-bone/60">Contenu à suivre.</p>;
  return <div className="space-y-6"><p className="text-lg leading-relaxed text-bone/80">{data.intro}</p><Cards items={data.memberships} sourceMap={sourceMap} /></div>;
}
