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
          <a key={id} href={source.url} target="_blank" rel="noreferrer" className="text-[11px] text-gold/80 underline underline-offset-2 hover:text-gold">
            {source.publisher}: {source.title}
          </a>
        );
      })}
    </div>
  );
}

function TopicCards({ items = [], sourceMap }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <article key={item.title} className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-xl text-bone">{item.title}</h3>
            <StatusBadge status={item.status} />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-bone/70">{item.text}</p>
          {item.paragraphs?.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex} className="mt-3 text-sm leading-7 text-bone/72">{paragraph}</p>
          ))}
          {item.paragraphs?.length > 0 && (
            <div className="mt-4 space-y-3">
              {item.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} className="text-sm leading-7 text-bone/72">{paragraph}</p>
              ))}
            </div>
          )}
          <SourceLinks ids={item.sourceIds} sourceMap={sourceMap} />
        </article>
      ))}
    </div>
  );
}

export function SouthAfricaLawMemory({ dossier, sourceMap }) {
  const data = dossier.law_memory;
  if (!data) return <p className="text-bone/60">Contenu à suivre.</p>;

  return (
    <div className="space-y-10">
      <p className="text-lg leading-relaxed text-bone/80">{data.intro}</p>
      {[data.constitutional_democracy, data.justice_system, data.memory_reconciliation].map((section) => (
        <section key={section.title}>
          <h2 className="mb-4 font-serif text-3xl text-gold">{section.title}</h2>
          <TopicCards items={section.items} sourceMap={sourceMap} />
        </section>
      ))}
      <aside className="rounded-xl border border-gold/20 bg-gold/[0.04] p-5 text-sm leading-relaxed text-bone/70">
        {data.editorial_note}
      </aside>
    </div>
  );
}
