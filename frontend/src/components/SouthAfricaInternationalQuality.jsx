import { useMemo, useState } from "react";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: {
    fallbackCountry: "Country",
    fallbackTitle: "International relation",
    fallbackCategory: "Diplomacy",
    overlineSuffix: "in the world",
    title: "Organizations, diplomacy and regional relations",
    intro: "This section distinguishes institutional memberships, partnerships, regional responsibilities and diplomatic positions.",
    searchPlaceholder: "Search an organization, region or diplomatic issue…",
    allThemes: "All themes",
    role: "Role",
    region: "Region concerned",
    context: "Context",
    caution: "Reading caution",
    emptySearch: "No international theme matches this search.",
    emptyData: "Detailed international relations have not yet been structured in the backend.",
  },
  fr: {
    fallbackCountry: "Pays",
    fallbackTitle: "Relation internationale",
    fallbackCategory: "Diplomatie",
    overlineSuffix: "dans le monde",
    title: "Organisations, diplomatie et relations régionales",
    intro: "Cette section distingue les appartenances institutionnelles, les partenariats, les responsabilités régionales et les positions diplomatiques.",
    searchPlaceholder: "Rechercher une organisation, une région ou un enjeu diplomatique…",
    allThemes: "Tous les thèmes",
    role: "Rôle",
    region: "Région concernée",
    context: "Contexte",
    caution: "Précaution de lecture",
    emptySearch: "Aucun thème international ne correspond à cette recherche.",
    emptyData: "Les relations internationales détaillées ne sont pas encore structurées dans le backend.",
  },
};

function TranslatedInline({ value }) {
  const translated = useTranslated(value || "");
  return translated || value || null;
}

function SourceLink({ source }) {
  const translatedTitle = useTranslated(source?.title || "");
  if (!source) return null;

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noreferrer"
      className="rounded-full border border-gold/25 px-3 py-1 text-[11px] text-gold/85 hover:bg-gold/10"
    >
      {source.publisher}: {translatedTitle || source.title}
    </a>
  );
}

function SourceLinks({ ids = [], sourceMap }) {
  if (!ids.length) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {ids.map((id) => {
        const source = sourceMap.get(id);
        return source ? <SourceLink key={id} source={source} /> : null;
      })}
    </div>
  );
}

const getTitle = (item, copy) =>
  item.title || item.name || item.organization || item.topic || copy.fallbackTitle;

const getBody = (item) =>
  item.text || item.note || item.summary || item.description || "";

const getCategory = (item, copy) =>
  item.category || item.type || item.domain || copy.fallbackCategory;

function normalizeInternational(dossier) {
  const international =
    dossier.international_role ||
    dossier.international ||
    dossier.global_role ||
    {};

  if (Array.isArray(international)) return international;

  const candidates = [
    international.items,
    international.memberships,
    international.organizations,
    international.sections,
    international.topics,
    dossier.international_topics,
  ];

  return candidates.find(Array.isArray) || [];
}

export function SouthAfricaInternationalQuality({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const countryName = dossier.name?.[lang] || dossier.name?.fr || dossier.name?.en || dossier.country || copy.fallbackCountry;
  const translatedIntro = useTranslated(dossier.international_role?.intro || "");

  const items = useMemo(
    () => normalizeInternational(dossier),
    [dossier],
  );

  const categories = useMemo(
    () => [...new Set(items.map((item) => getCategory(item, copy)))],
    [items, copy],
  );

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [openId, setOpenId] = useState(items[0]?.id || null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return items.filter((item) => {
      const itemCategory = getCategory(item, copy);
      const matchesCategory = category === "all" || itemCategory === category;
      const haystack = `${getTitle(item, copy)} ${getBody(item)} ${itemCategory} ${
        item.period || ""
      } ${item.role || ""}`.toLowerCase();

      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [items, query, category, copy]);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">{countryName} {copy.overlineSuffix}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{copy.title}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          {translatedIntro || copy.intro}
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
            {copy.allThemes}
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
              <TranslatedInline value={itemCategory} />
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {visible.map((item, index) => {
          const id = item.id || `${getTitle(item, copy)}-${index}`;
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
                      <TranslatedInline value={getCategory(item, copy)} />
                      {item.period ? <> · <TranslatedInline value={item.period} /></> : null}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl text-bone">
                      <TranslatedInline value={getTitle(item, copy)} />
                    </h3>
                  </div>
                  <span className="text-xl text-gold">{expanded ? "−" : "+"}</span>
                </div>

                {getBody(item) && (
                  <p className="mt-4 max-w-4xl leading-7 text-bone/70">
                    <TranslatedInline value={getBody(item)} />
                  </p>
                )}
              </button>

              {expanded && (
                <div className="border-t border-bone/10 px-5 pb-6 pt-5">
                  <div className="grid gap-3 md:grid-cols-2">
                    {item.role && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.role}</p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          <TranslatedInline value={item.role} />
                        </p>
                      </div>
                    )}

                    {item.region && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.region}</p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          <TranslatedInline value={item.region} />
                        </p>
                      </div>
                    )}

                    {item.context && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4 md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.context}</p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          <TranslatedInline value={item.context} />
                        </p>
                      </div>
                    )}

                    {item.caution && (
                      <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-amber-300/75">{copy.caution}</p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          <TranslatedInline value={item.caution} />
                        </p>
                      </div>
                    )}
                  </div>

                  {item.paragraphs?.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {item.paragraphs.map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex} className="text-sm leading-7 text-bone/72">
                          <TranslatedInline value={paragraph} />
                        </p>
                      ))}
                    </div>
                  )}
                  <SourceLinks ids={item.sources || item.sourceIds} sourceMap={sourceMap} />
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
