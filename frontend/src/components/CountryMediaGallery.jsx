import { useMemo, useState } from "react";
import { SmartImage } from "./SmartImage";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: {
    gallery: "Gallery",
    media: "Media",
    overline: "Documented gallery",
    title: "Images, maps and objects",
    intro: "Each media item keeps its caption, author, license and source page so its provenance remains verifiable.",
    search: "Search an image, place, author or license…",
    all: "All media",
    author: "Author",
    license: "License",
    sourceAndLicense: "View source page and license",
    empty: "No media item matches this search.",
    close: "Close",
    originalSource: "View original source",
  },
  fr: {
    gallery: "Galerie",
    media: "Média",
    overline: "Galerie documentée",
    title: "Images, cartes et objets",
    intro: "Chaque média conserve sa légende, son auteur, sa licence et sa page source afin de garder une provenance vérifiable.",
    search: "Rechercher une image, un lieu, un auteur ou une licence…",
    all: "Tous les médias",
    author: "Auteur",
    license: "Licence",
    sourceAndLicense: "Voir la page source et la licence",
    empty: "Aucun média ne correspond à cette recherche.",
    close: "Fermer",
    originalSource: "Consulter la source originale",
  },
};

const getCategory = (item, fallback) => item.category || item.type || fallback;
const getTitle = (item, fallback) => item.title || item.alt || fallback;
const getCaption = (item) => item.caption || item.description || "";

function TranslatedInline({ value }) {
  const translated = useTranslated(value || "");
  return translated || value;
}

function TranslatedText({ value, className = "" }) {
  const translated = useTranslated(value || "");
  if (!value) return null;
  return <p className={className}>{translated || value}</p>;
}

export function CountryMediaGallery({ items = [] }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const categories = useMemo(() => [...new Set(items.map((item) => getCategory(item, copy.gallery)))], [items, copy.gallery]);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      const itemCategory = getCategory(item, copy.gallery);
      const itemTitle = getTitle(item, copy.media);
      const matchesCategory = category === "all" || itemCategory === category;
      const haystack = `${itemTitle} ${getCaption(item)} ${item.author || ""} ${item.license || ""}`.toLowerCase();
      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [items, category, query, copy.gallery, copy.media]);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">{copy.overline}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{copy.title}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">{copy.intro}</p>
      </header>

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.search}
          className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50"
        />
        <div className="flex gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${category === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}
          >
            {copy.all}
          </button>
          {categories.map((itemCategory) => (
            <button
              key={itemCategory}
              type="button"
              onClick={() => setCategory(itemCategory)}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${category === itemCategory ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}
            >
              <TranslatedInline value={itemCategory} />
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, index) => {
          const itemTitle = getTitle(item, copy.media);
          const itemCategory = getCategory(item, copy.gallery);
          return (
            <figure key={item.id || `${itemTitle}-${index}`} className="overflow-hidden rounded-2xl border border-bone/10 bg-bone/[0.025]">
              <button type="button" onClick={() => setSelected(item)} className="block w-full overflow-hidden bg-black/20 text-left">
                <SmartImage
                  src={item.image_url}
                  wikipediaTitle={item.wikipedia_title}
                  alt={item.alt || itemTitle}
                  wrapperClassName="h-64"
                  className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                />
              </button>
              <figcaption className="p-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-gold"><TranslatedInline value={itemCategory} /></p>
                <h3 className="mt-2 font-serif text-xl text-bone"><TranslatedInline value={itemTitle} /></h3>
                {getCaption(item) && <TranslatedText value={getCaption(item)} className="mt-2 text-sm leading-6 text-bone/60" />}
                <div className="mt-4 space-y-1 border-t border-bone/10 pt-3 text-[11px] text-bone/40">
                  {item.author && <p>{copy.author}: {item.author}</p>}
                  {item.license && <p>{copy.license}: {item.license}</p>}
                </div>
                {item.source_page && (
                  <a href={item.source_page} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-xs text-gold/85 underline underline-offset-2">
                    {copy.sourceAndLicense}
                  </a>
                )}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {!visible.length && <div className="rounded-xl border border-bone/10 p-5 text-bone/60">{copy.empty}</div>}

      {selected && (() => {
        const selectedTitle = getTitle(selected, copy.media);
        const selectedCategory = getCategory(selected, copy.gallery);
        return (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label={selectedTitle}>
            <div className="max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-bone/15 bg-[#151210]">
              <div className="flex items-center justify-between border-b border-bone/10 p-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-gold"><TranslatedInline value={selectedCategory} /></p>
                  <h3 className="mt-1 font-serif text-2xl text-bone"><TranslatedInline value={selectedTitle} /></h3>
                </div>
                <button type="button" onClick={() => setSelected(null)} className="rounded-full border border-bone/15 px-3 py-1 text-sm text-bone/70">{copy.close}</button>
              </div>
              <SmartImage
                src={selected.image_url}
                wikipediaTitle={selected.wikipedia_title}
                alt={selected.alt || selectedTitle}
                wrapperClassName="max-h-[70vh] bg-black"
                className="max-h-[70vh] w-full object-contain"
              />
              <div className="p-5">
                {getCaption(selected) && <TranslatedText value={getCaption(selected)} className="leading-7 text-bone/68" />}
                <div className="mt-4 flex flex-wrap gap-3 text-xs text-bone/45">
                  {selected.author && <span>{copy.author}: {selected.author}</span>}
                  {selected.license && <span>{copy.license}: {selected.license}</span>}
                </div>
                {selected.source_page && (
                  <a href={selected.source_page} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border border-gold/30 px-3 py-1.5 text-xs text-gold hover:bg-gold/10">
                    {copy.originalSource}
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

export default CountryMediaGallery;
