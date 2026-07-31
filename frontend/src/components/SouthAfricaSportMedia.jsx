function SourceLinks({ ids = [], sourceMap }) {
  if (!ids.length || !sourceMap) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
      {ids.map((id) => {
        const source = sourceMap.get(id);
        if (!source) return null;
        return (
          <a
            key={id}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-gold/80 underline underline-offset-2 hover:text-gold"
          >
            {source.publisher}: {source.title}
          </a>
        );
      })}
    </div>
  );
}

export function SouthAfricaSportMedia({ dossier, sourceMap }) {
  const data = dossier?.sport_media;

  if (!data) {
    return (
      <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gold">À suivre</p>
        <h2 className="mt-2 font-serif text-2xl text-bone">Sports et médias</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-bone/65">
          Cette rubrique est réservée dans la navigation, mais son corpus documenté n’est pas
          encore présent dans la version actuelle du backend. Elle reste visible sans provoquer
          de plantage et sera enrichie uniquement avec des sources vérifiées.
        </p>
      </div>
    );
  }

  const sections = Array.isArray(data.sections)
    ? data.sections
    : [
        ...(Array.isArray(data.sports) ? [{ title: "Sports", items: data.sports }] : []),
        ...(Array.isArray(data.media) ? [{ title: "Médias", items: data.media }] : []),
      ];

  return (
    <div className="space-y-8">
      {data.intro && <p className="text-lg leading-relaxed text-bone/80">{data.intro}</p>}
      {sections.map((section, sectionIndex) => (
        <section key={section.id || section.title || sectionIndex}>
          <h2 className="mb-4 font-serif text-3xl text-gold">{section.title}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {(section.items || []).map((item, index) => (
              <article
                key={item.id || item.title || index}
                className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5"
              >
                <h3 className="font-serif text-xl text-bone">{item.title || item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone/70">
                  {item.text || item.note || item.summary}
                </p>
                <SourceLinks ids={item.sourceIds || item.sources} sourceMap={sourceMap} />
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
