export function CountrySources({ dossier = {} }) {
  const sources = dossier.sources || [];
  const grouped = sources.reduce((acc, source) => {
    const key = source.category === 1 ? "Institutionnel" : source.category === 2 ? "Académique / spécialisé" : "Images & médias";
    (acc[key] ||= []).push(source);
    return acc;
  }, {});
  return (
    <section className="space-y-5">
      <header>
        <p className="overline text-gold">Sources</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">Sources documentaires</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-bone/55">
          Les sources sont conservées au niveau du dossier et peuvent être reliées à chaque chapitre.
          Les pages d’images indiquent séparément leur crédit et leur licence.
        </p>
      </header>
      {Object.entries(grouped).map(([group, items]) => (
        <div key={group} className="rounded-2xl border border-bone/10 bg-bone/[.025] p-5">
          <h3 className="font-serif text-xl text-bone">{group}</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {items.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer"
                className="rounded-xl border border-bone/10 p-4 hover:border-gold/30 hover:bg-gold/[.03]">
                <p className="text-[10px] uppercase tracking-[.15em] text-gold/75">{s.publisher}</p>
                <h4 className="mt-1 text-sm text-bone">{s.title}</h4>
                {s.note && <p className="mt-2 text-xs leading-5 text-bone/50">{s.note}</p>}
              </a>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
