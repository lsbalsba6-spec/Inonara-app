import { useMemo, useState } from "react";
import { SmartImage } from "./SmartImage";

const getCategory = (item) => item.category || item.type || "Galerie";
const getTitle = (item) => item.title || item.alt || "Média";
const getCaption = (item) => item.caption || item.description || "";

export function SouthAfricaMediaGallery({ items = [] }) {
  const categories = useMemo(
    () => [...new Set(items.map(getCategory))],
    [items],
  );

  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory =
        category === "all" || getCategory(item) === category;
      const haystack = `${getTitle(item)} ${getCaption(item)} ${item.author || ""} ${item.license || ""}`
        .toLowerCase();
      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [items, category, query]);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">Galerie documentée</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">
          Images, cartes et objets
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          Chaque média doit conserver sa légende, son auteur, sa licence et sa page
          source. Les images peuvent ensuite être remplacées progressivement par les
          photographies originales d’Inonara sans modifier la structure de la galerie.
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher une image, un lieu, un auteur ou une licence…"
          className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50"
        />

        <div className="flex gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
              category === "all"
                ? "border-gold bg-gold/10 text-gold"
                : "border-bone/15 text-bone/60"
            }`}
          >
            Tous les médias
          </button>
          {categories.map((itemCategory) => (
            <button
              key={itemCategory}
              type="button"
              onClick={() => setCategory(itemCategory)}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
                category === itemCategory
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-bone/15 text-bone/60"
              }`}
            >
              {itemCategory}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, index) => (
          <figure
            key={item.id || `${getTitle(item)}-${index}`}
            className="overflow-hidden rounded-2xl border border-bone/10 bg-bone/[0.025]"
          >
            <button
              type="button"
              onClick={() => setSelected(item)}
              className="block w-full overflow-hidden bg-black/20 text-left"
            >
              <SmartImage src={item.image_url} wikipediaTitle={item.wikipedia_title} alt={item.alt || getTitle(item)} wrapperClassName="h-64" className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]" />
            </button>

            <figcaption className="p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-gold">
                {getCategory(item)}
              </p>
              <h3 className="mt-2 font-serif text-xl text-bone">
                {getTitle(item)}
              </h3>
              {getCaption(item) && (
                <p className="mt-2 text-sm leading-6 text-bone/60">
                  {getCaption(item)}
                </p>
              )}

              <div className="mt-4 space-y-1 border-t border-bone/10 pt-3 text-[11px] text-bone/40">
                {item.author && <p>Auteur : {item.author}</p>}
                {item.license && <p>Licence : {item.license}</p>}
              </div>

              {item.source_page && (
                <a
                  href={item.source_page}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-xs text-gold/85 underline underline-offset-2"
                >
                  Voir la page source et la licence
                </a>
              )}
            </figcaption>
          </figure>
        ))}
      </div>

      {!visible.length && (
        <div className="rounded-xl border border-bone/10 p-5 text-bone/60">
          Aucun média ne correspond à cette recherche.
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={getTitle(selected)}
        >
          <div className="max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-bone/15 bg-[#151210]">
            <div className="flex items-center justify-between border-b border-bone/10 p-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-gold">
                  {getCategory(selected)}
                </p>
                <h3 className="mt-1 font-serif text-2xl text-bone">
                  {getTitle(selected)}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full border border-bone/15 px-3 py-1 text-sm text-bone/70"
              >
                Fermer
              </button>
            </div>

            <SmartImage src={selected.image_url} wikipediaTitle={selected.wikipedia_title} alt={selected.alt || getTitle(selected)} wrapperClassName="max-h-[70vh] bg-black" className="max-h-[70vh] w-full object-contain" />

            <div className="p-5">
              {getCaption(selected) && (
                <p className="leading-7 text-bone/68">{getCaption(selected)}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-bone/45">
                {selected.author && <span>Auteur : {selected.author}</span>}
                {selected.license && <span>Licence : {selected.license}</span>}
              </div>
              {selected.source_page && (
                <a
                  href={selected.source_page}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex rounded-full border border-gold/30 px-3 py-1.5 text-xs text-gold hover:bg-gold/10"
                >
                  Consulter la source originale
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <p className="text-xs leading-relaxed text-bone/45">
        Une image affichée sur Inonara doit rester traçable. L’absence d’auteur,
        de licence ou de page source doit être corrigée avant publication définitive.
      </p>
    </div>
  );
}
