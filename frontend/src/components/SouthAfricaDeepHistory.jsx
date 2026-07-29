function StatusPill({ status }) {
  const labels = { ready: "Établi", provisional: "À nuancer", disputed: "Débattu" };
  return (
    <span className="rounded-full border border-bone/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-bone/55">
      {labels[status] || status}
    </span>
  );
}

function Sources({ ids, sourceMap }) {
  if (!ids?.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
      {ids.map((id) => {
        const source = sourceMap.get(id);
        if (!source) return null;
        return (
          <a key={id} href={source.url} target="_blank" rel="noreferrer" className="text-[11px] text-gold/80 underline underline-offset-2 hover:text-gold">
            {source.publisher}: {source.title}
          </a>
        );
      })}
    </div>
  );
}

export default function SouthAfricaDeepHistory({ data, sourceMap }) {
  if (!data) {
    return <p className="text-bone/60">Cette partie sera bientôt disponible.</p>;
  }

  return (
    <div className="space-y-8">
      <header className="rounded-xl border border-gold/20 bg-gold/[0.04] p-5">
        <p className="overline text-gold">Histoire profonde</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{data.title}</h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-bone/70">{data.subtitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-bone/55">{data.public_note}</p>
      </header>

      <div className="space-y-5">
        {data.chapters?.map((chapter) => (
          <article key={chapter.id} className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-widest text-gold">{chapter.period}</p>
              <StatusPill status={chapter.status} />
            </div>
            <h3 className="mt-2 font-serif text-2xl text-bone">{chapter.title}</h3>
            <p className="mt-3 leading-relaxed text-bone/75">{chapter.text}</p>
            <p className="mt-3 rounded-lg border border-bone/10 bg-black/10 p-3 text-xs leading-relaxed text-bone/55">
              <strong className="text-bone/70">Règle cartographique :</strong> {chapter.map_policy}
            </p>
            <Sources ids={chapter.sources} sourceMap={sourceMap} />
          </article>
        ))}
      </div>

      <section>
        <h2 className="mb-4 font-serif text-2xl text-gold">Migrations, mobilités et réseaux avant 1652</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {data.migration_processes?.map((process) => (
            <article key={process.id} className="rounded-xl border border-bone/10 p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif text-lg text-bone">{process.label}</h3>
                <StatusPill status={process.status} />
              </div>
              <p className="mt-1 text-xs uppercase tracking-wider text-gold/80">{process.period?.display}</p>
              <p className="mt-3 text-sm leading-relaxed text-bone/70">{process.reason}</p>
              {!process.route_geometry && (
                <p className="mt-3 text-xs text-bone/45">Aucun tracé précis publié : les sources ne permettent pas une route unique fiable.</p>
              )}
              <Sources ids={process.sources} sourceMap={sourceMap} />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
