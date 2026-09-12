import { useMemo, useState } from "react";
import { useI18n } from "../i18n";
import { localizedValue, searchableText } from "../lib/contentSort";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: {
    fallbackTitle: "Society theme",
    fallbackCategory: "Society",
    overline: "Society",
    title: "Citizenship, territories and inequalities",
    intro: "This section connects contemporary realities with historical legacies: urbanization, access to services, citizenship, spatial inequalities and social change.",
    search: "Search a society theme…",
    allThemes: "All themes",
    keyData: "Key data",
    period: "Period",
    context: "Context",
    caution: "Reading caution",
    empty: "No society theme matches this search.",
  },
  fr: {
    fallbackTitle: "Thème de société",
    fallbackCategory: "Société",
    overline: "Société",
    title: "Citoyenneté, territoires et inégalités",
    intro: "Cette section relie les réalités contemporaines aux héritages historiques : urbanisation, accès aux services, citoyenneté, inégalités spatiales et recompositions sociales.",
    search: "Rechercher un thème de société…",
    allThemes: "Tous les thèmes",
    keyData: "Donnée clé",
    period: "Période",
    context: "Contexte",
    caution: "Précaution de lecture",
    empty: "Aucun thème de société ne correspond à cette recherche.",
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

const getTitle = (item, copy) => item.title || item.name || item.topic || copy.fallbackTitle;
const getBody = (item) => item.text || item.note || item.summary || item.description || "";
const getCategory = (item, copy) => item.category || item.type || item.domain || copy.fallbackCategory;

export function SouthAfricaSocietyQuality({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const items = useMemo(
    () => dossier.society?.themes || dossier.society?.topics || dossier.society_topics || [],
    [dossier.society, dossier.society_topics],
  );
  const normalizedItems = useMemo(
    () => Array.isArray(items) ? items : [],
    [items],
  );
  const categories = useMemo(() => {
    const seen = new Map();
    normalizedItems.forEach((item) => {
      const value = getCategory(item, copy);
      const key = searchableText(value) || localizedValue(value, lang);
      if (key && !seen.has(key)) seen.set(key, { key, value });
    });
    return [...seen.values()];
  }, [normalizedItems, copy, lang]);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [openId, setOpenId] = useState(normalizedItems[0]?.id || null);

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(lang === "fr" ? "fr" : "en");
    return normalizedItems.filter((item) => {
      const itemCategory = getCategory(item, copy);
      const itemCategoryKey = searchableText(itemCategory) || localizedValue(itemCategory, lang);
      const matchesCategory = category === "all" || itemCategoryKey === category;
      const haystack = searchableText(getTitle(item, copy), getBody(item), itemCategory);
      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [normalizedItems, query, category, copy, lang]);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">{copy.overline}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{copy.title}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          {dossier.society?.intro ? <TranslatedInline value={dossier.society.intro} lang={lang} /> : copy.intro}
        </p>
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
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
              category === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"
            }`}
          >
            {copy.allThemes}
          </button>
          {categories.map((itemCategory) => (
            <button
              key={itemCategory.key}
              type="button"
              onClick={() => setCategory(itemCategory.key)}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
                category === itemCategory.key ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"
              }`}
            >
              <TranslatedInline value={itemCategory.value} lang={lang} />
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {visible.map((item, index) => {
          const title = getTitle(item, copy);
          const body = getBody(item);
          const itemCategory = getCategory(item, copy);
          const id = item.id || searchableText(title, itemCategory, item.period) || `society-${index}`;
          const expanded = openId === id;

          return (
            <article key={id} className="overflow-hidden rounded-2xl border border-bone/10 bg-bone/[0.025]">
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
                    </p>
                    <h3 className="mt-2 font-serif text-2xl text-bone">
                      <TranslatedInline value={title} lang={lang} />
                    </h3>
                  </div>
                  <span className="text-xl text-gold">{expanded ? "−" : "+"}</span>
                </div>

                {body && (
                  <p className="mt-4 max-w-4xl leading-7 text-bone/70">
                    <TranslatedInline value={body} lang={lang} />
                  </p>
                )}
              </button>

              {expanded && (
                <div className="border-t border-bone/10 px-5 pb-6 pt-5">
                  {item.paragraphs?.length > 0 && (
                    <div className="mb-5 space-y-4 rounded-xl border border-bone/10 bg-black/10 p-5">
                      {item.paragraphs.map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex} className="text-sm leading-7 text-bone/75">
                          <TranslatedInline value={paragraph} lang={lang} />
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="grid gap-3 md:grid-cols-2">
                    {item.data && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.keyData}</p>
                        <p className="mt-2 text-sm leading-6 text-bone/72"><TranslatedInline value={item.data} lang={lang} /></p>
                      </div>
                    )}
                    {item.period && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.period}</p>
                        <p className="mt-2 text-sm leading-6 text-bone/72"><TranslatedInline value={item.period} lang={lang} /></p>
                      </div>
                    )}
                    {item.context && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4 md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.context}</p>
                        <p className="mt-2 text-sm leading-6 text-bone/72"><TranslatedInline value={item.context} lang={lang} /></p>
                      </div>
                    )}
                    {item.caution && (
                      <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-amber-300/75">{copy.caution}</p>
                        <p className="mt-2 text-sm leading-6 text-bone/72"><TranslatedInline value={item.caution} lang={lang} /></p>
                      </div>
                    )}
                  </div>

                  <SourceLinks ids={item.sources || item.sourceIds} sourceMap={sourceMap} lang={lang} />
                </div>
              )}
            </article>
          );
        })}
      </div>

      {!visible.length && (
        <div className="rounded-xl border border-bone/10 p-5 text-bone/60">{copy.empty}</div>
      )}
    </div>
  );
}
