export function SouthAfricaMediaGallery({ items = [] }) {
  if (!items.length) {
    return <p className="text-bone/60">La galerie sera enrichie prochainement.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="overline text-gold">Galerie documentée</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">Voir l’Afrique du Sud</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-bone/60">
          Chaque image provient d’une collection ouverte et conserve son auteur, sa licence et sa page source.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <figure key={item.id} className="overflow-hidden rounded-xl border border-bone/10 bg-bone/[0.025]">
            <a href={item.source_page} target="_blank" rel="noreferrer" className="block overflow-hidden bg-black/20">
              <img
                src={item.image_url}
                alt={item.alt}
                loading="lazy"
                className="h-64 w-full object-cover transition duration-500 hover:scale-[1.02]"
              />
            </a>
            <figcaption className="space-y-2 p-4">
              <h3 className="font-serif text-xl text-bone">{item.title}</h3>
              <p className="text-sm leading-relaxed text-bone/65">{item.caption}</p>
              <p className="text-[11px] leading-relaxed text-bone/40">
                {item.author} · {item.license}
              </p>
              <a href={item.source_page} target="_blank" rel="noreferrer" className="text-xs text-gold/80 underline underline-offset-2">
                Source et conditions de réutilisation
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
