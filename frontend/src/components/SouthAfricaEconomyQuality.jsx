import { useMemo, useState } from "react";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: {
    fallbackTitle: "Economic theme",
    fallbackCategory: "Economy",
    challengeTitle: "Economic challenge",
    challenges: "Challenges",
    datedData: "data",
    overline: "Economy",
    title: "Transformations, sectors and inequalities",
    intro: "This section presents historical transformations, structuring sectors and contemporary economic challenges. Figures should always be dated.",
    indicators: "Dated indicators",
    dateMissing: "Date to be specified",
    search: "Search a sector, period or issue…",
    allThemes: "All themes",
    keyData: "Key data",
    region: "Region or area concerned",
    context: "Context",
    caution: "Reading caution",
    emptySearch: "No economic theme matches this search.",
    emptyData: "Detailed economic content has not yet been structured in the backend.",
    note: "GDP, unemployment, inflation, foreign trade and other contemporary indicators should remain accompanied by their year, methodology and source.",
  },
  fr: {
    fallbackTitle: "Thème économique",
    fallbackCategory: "Économie",
    challengeTitle: "Défi économique",
    challenges: "Défis",
    datedData: "donnée",
    overline: "Économie",
    title: "Transformations, secteurs et inégalités",
    intro: "Cette section présente les transformations historiques, les secteurs structurants et les défis économiques contemporains. Les chiffres doivent toujours être datés.",
    indicators: "Indicateurs datés",
    dateMissing: "Date à préciser",
    search: "Rechercher un secteur, une période ou un enjeu…",
    allThemes: "Tous les thèmes",
    keyData: "Donnée clé",
    region: "Région ou espace concerné",
    context: "Contexte",
    caution: "Précaution de lecture",
    emptySearch: "Aucun thème économique ne correspond à cette recherche.",
    emptyData: "Les contenus économiques détaillés ne sont pas encore structurés dans le backend.",
    note: "PIB, chômage, inflation, commerce extérieur et autres indicateurs contemporains doivent rester accompagnés de leur année, de leur méthode et de leur source.",
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
  typeof item === "string"
    ? item
    : item.title || item.name || item.label || item.sector || item.topic || copy.fallbackTitle;

const getBody = (item, copy) => {
  if (typeof item === "string") return item;
  const indicator = item.value
    ? `${item.value}${item.asOf ? ` · ${copy.datedData} ${item.asOf}` : ""}`
    : "";
  return item.text || item.note || item.summary || item.description || indicator;
};

const getCategory = (item, copy) =>
  item.category || item.type || item.domain || copy.fallbackCategory;

function normalizeEconomy(dossier, copy) {
  const economy = dossier.economy || {};
  if (Array.isArray(economy)) return economy;

  const candidates = [
    economy.sections,
    economy.topics,
    economy.sectors,
    economy.items,
    economy.historicalTransformations,
    economy.challenges,
    dossier.economy_topics,
  ];

  return candidates
    .filter(Array.isArray)
    .flat()
    .map((item, index) =>
      typeof item === "string"
        ? { id: `economy-challenge-${index}`, title: copy.challengeTitle, text: item, category: copy.challenges }
        : item,
    );
}

export function SouthAfricaEconomyQuality({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;

  const items = useMemo(
    () => normalizeEconomy(dossier, copy),
    [dossier, copy],
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
      const haystack = `${getTitle(item, copy)} ${getBody(item, copy)} ${itemCategory} ${
        item.data || ""
      } ${item.period || ""}`.toLowerCase();

      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [items, query, category, copy]);

  const indicators = useMemo(
    () => dossier.economy?.currentIndicators || dossier.economy?.indicators || dossier.economic_indicators || [],
    [dossier.economy, dossier.economic_indicators],
  );

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">{copy.overline}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{copy.title}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          {dossier.economy?.intro ? <TranslatedInline value={dossier.economy.intro} /> : copy.intro}
        </p>
      </header>

      {Array.isArray(indicators) && indicators.length > 0 && (
        <section>
          <p className="overline text-gold">{copy.indicators}</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {indicators.map((indicator, index) => (
              <article
                key={indicator.id || indicator.label || index}
                className="rounded-2xl border border-bone/10 bg-bone/[0.025] p-5"
              >
                <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">
                  {indicator.year || indicator.period || indicator.asOf || copy.dateMissing}
                </p>
                <h3 className="mt-2 text-sm text-bone/65">
                  <TranslatedInline value={indicator.label || indicator.name} />
                </h3>
                <p className="mt-2 font-serif text-2xl text-gold">
                  {indicator.value}
                  {indicator.unit ? ` ${indicator.unit}` : ""}
                </p>
                {indicator.note && (
                  <p className="mt-2 text-xs leading-5 text-bone/45">
                    <TranslatedInline value={indicator.note} />
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

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
          const title = getTitle(item, copy);
          const body = getBody(item, copy);
          const id = item.id || `${title}-${index}`;
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
                      <TranslatedInline value={title} />
                    </h3>
                  </div>
                  <span className="text-xl text-gold">{expanded ? "−" : "+"}</span>
                </div>

                {body && (
                  <p className="mt-4 max-w-4xl leading-7 text-bone/70">
                    <TranslatedInline value={body} />
                  </p>
                )}
              </button>

              {expanded && (
                <div className="border-t border-bone/10 px-5 pb-6 pt-5">
                  <div className="grid gap-3 md:grid-cols-2">
                    {item.data && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.keyData}</p>
                        <p className="mt-2 text-sm leading-6 text-bone/72"><TranslatedInline value={item.data} /></p>
                      </div>
                    )}

                    {item.region && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.region}</p>
                        <p className="mt-2 text-sm leading-6 text-bone/72"><TranslatedInline value={item.region} /></p>
                      </div>
                    )}

                    {item.context && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4 md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.context}</p>
                        <p className="mt-2 text-sm leading-6 text-bone/72"><TranslatedInline value={item.context} /></p>
                      </div>
                    )}

                    {item.caution && (
                      <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-amber-300/75">{copy.caution}</p>
                        <p className="mt-2 text-sm leading-6 text-bone/72"><TranslatedInline value={item.caution} /></p>
                      </div>
                    )}
                  </div>

                  {item.paragraphs?.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {item.paragraphs.map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex} className="text-sm leading-7 text-bone/72"><TranslatedInline value={paragraph} /></p>
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

      {!visible.length && (
        <div className="rounded-xl border border-bone/10 p-5 text-bone/60">{copy.emptySearch}</div>
      )}

      {!items.length && (
        <div className="rounded-xl border border-bone/10 p-5 text-bone/60">{copy.emptyData}</div>
      )}

      <p className="text-xs leading-relaxed text-bone/45">{copy.note}</p>
    </div>
  );
}
