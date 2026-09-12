import { useMemo, useState } from "react";
import { useI18n } from "../i18n";
import { localizedValue, searchableText } from "../lib/contentSort";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: {
    fallbackTitle: "National symbol",
    fallbackCategory: "National symbol",
    overline: "National symbols",
    title: "Flag, coat of arms, anthem and emblems",
    intro: "National symbols are presented within their historical and political context.",
    searchPlaceholder: "Search a symbol, date or meaning…",
    allSymbols: "All symbols",
    meaning: "Meaning",
    adopted: "Adoption date",
    context: "Historical context",
    caution: "Reading caution",
    emptySearch: "No symbol matches this search.",
    emptyData: "Detailed national symbols have not yet been structured in the backend.",
  },
  fr: {
    fallbackTitle: "Symbole national",
    fallbackCategory: "Symbole national",
    overline: "Symboles nationaux",
    title: "Drapeau, armoiries, hymne et emblèmes",
    intro: "Les symboles nationaux sont replacés dans leur contexte historique et politique.",
    searchPlaceholder: "Rechercher un symbole, une date ou une signification…",
    allSymbols: "Tous les symboles",
    meaning: "Signification",
    adopted: "Date d’adoption",
    context: "Contexte historique",
    caution: "Précaution de lecture",
    emptySearch: "Aucun symbole ne correspond à cette recherche.",
    emptyData: "Les symboles détaillés ne sont pas encore structurés dans le backend.",
  },
};

function TranslatedInline({ value, lang }) {
  const translated = useTranslated(value || "");
  return translated || localizedValue(value, lang) || null;
}

function SourceLink({ source, lang }) {
  const translatedTitle = useTranslated(source?.title || "");
  if (!source) return null;

  const publisher = localizedValue(source.publisher, lang);
  const title = translatedTitle || localizedValue(source.title, lang);

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noreferrer"
      className="rounded-full border border-gold/25 px-3 py-1 text-[11px] text-gold/85 hover:bg-gold/10"
    >
      {publisher ? `${publisher}: ` : ""}{title}
    </a>
  );
}

function SourceLinks({ ids = [], sourceMap, lang }) {
  if (!ids.length) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {ids.map((id) => {
        const source = sourceMap.get(id);
        return source ? <SourceLink key={id} source={source} lang={lang} /> : null;
      })}
    </div>
  );
}

const getTitle = (item, copy) =>
  item.title || item.name || item.symbol || copy.fallbackTitle;

const getBody = (item) =>
  item.text || item.note || item.summary || item.description || "";

const getCategory = (item, copy) =>
  item.category || item.type || copy.fallbackCategory;

function normalizeSymbols(dossier) {
  const symbols = dossier.national_symbols || dossier.symbols || {};
  if (Array.isArray(symbols)) return symbols;

  const candidates = [
    symbols.items,
    symbols.symbols,
    symbols.sections,
    dossier.symbol_items,
  ];

  return candidates.find(Array.isArray) || [];
}

export function SouthAfricaSymbolsQuality({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const introValue = dossier.national_symbols?.intro || dossier.symbols?.intro || "";
  const translatedIntro = useTranslated(introValue);

  const items = useMemo(
    () => normalizeSymbols(dossier),
    [dossier],
  );

  const categories = useMemo(() => {
    const seen = new Map();

    items.forEach((item) => {
      const value = getCategory(item, copy);
      const key = searchableText(value) || localizedValue(value, lang);

      if (key && !seen.has(key)) seen.set(key, { key, value });
    });

    return [...seen.values()];
  }, [items, copy, lang]);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [openId, setOpenId] = useState(items[0]?.id || null);

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(lang === "fr" ? "fr" : "en");

    return items.filter((item) => {
      const itemCategory = getCategory(item, copy);
      const itemCategoryKey = searchableText(itemCategory) || localizedValue(itemCategory, lang);
      const matchesCategory = category === "all" || itemCategoryKey === category;
      const haystack = searchableText(
        getTitle(item, copy),
        getBody(item),
        itemCategory,
        item.period,
        item.meaning,
        item.adopted,
        item.context,
      );

      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [items, query, category, copy, lang]);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">{copy.overline}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{copy.title}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          {translatedIntro || localizedValue(introValue, lang) || copy.intro}
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.searchPlaceholder}
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
            {copy.allSymbols}
          </button>

          {categories.map((itemCategory) => (
            <button
              key={itemCategory.key}
              type="button"
              onClick={() => setCategory(itemCategory.key)}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
                category === itemCategory.key
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-bone/15 text-bone/60"
              }`}
            >
              <TranslatedInline value={itemCategory.value} lang={lang} />
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {visible.map((item, index) => {
          const itemCategory = getCategory(item, copy);
          const title = getTitle(item, copy);
          const id = item.id || searchableText(title, itemCategory, item.period) || `symbol-${index}`;
          const expanded = openId === id;

          return (
            <article
              key={id}
              className="overflow-hidden rounded-2xl border border-bone/10 bg-bone/[0.025]"
            >
              <button
                type="button"
                onClick={() => setOpenId(expanded ? null : id)}
                className="w-full p-5 text-left"
                aria-expanded={expanded}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-gold">
                      <TranslatedInline value={itemCategory} lang={lang} />
                      {item.period ? <> · <TranslatedInline value={item.period} lang={lang} /></> : null}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl text-bone">
                      <TranslatedInline value={title} lang={lang} />
                    </h3>
                  </div>
                  <span className="text-xl text-gold">{expanded ? "−" : "+"}</span>
                </div>

                {getBody(item) && (
                  <p className="mt-4 max-w-4xl leading-7 text-bone/70">
                    <TranslatedInline value={getBody(item)} lang={lang} />
                  </p>
                )}
              </button>

              {expanded && (
                <div className="border-t border-bone/10 px-5 pb-6 pt-5">
                  <div className="grid gap-3 md:grid-cols-2">
                    {item.meaning && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.meaning}</p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          <TranslatedInline value={item.meaning} lang={lang} />
                        </p>
                      </div>
                    )}

                    {item.adopted && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.adopted}</p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          <TranslatedInline value={item.adopted} lang={lang} />
                        </p>
                      </div>
                    )}

                    {item.context && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4 md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.context}</p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          <TranslatedInline value={item.context} lang={lang} />
                        </p>
                      </div>
                    )}

                    {item.caution && (
                      <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-amber-300/75">{copy.caution}</p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          <TranslatedInline value={item.caution} lang={lang} />
                        </p>
                      </div>
                    )}
                  </div>

                  {item.paragraphs?.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {item.paragraphs.map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex} className="text-sm leading-7 text-bone/72">
                          <TranslatedInline value={paragraph} lang={lang} />
                        </p>
                      ))}
                    </div>
                  )}

                  <SourceLinks
                    ids={item.sources || item.sourceIds}
                    sourceMap={sourceMap}
                    lang={lang}
                  />
                </div>
              )}
            </article>
          );
        })}
      </div>

      {!visible.length && items.length > 0 && (
        <div className="rounded-xl border border-bone/10 p-5 text-bone/60">{copy.emptySearch}</div>
      )}

      {!items.length && (
        <div className="rounded-xl border border-bone/10 p-5 text-bone/60">{copy.emptyData}</div>
      )}
    </div>
  );
}
