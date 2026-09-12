import { useMemo, useState } from "react";
import { useI18n } from "../i18n";
import { localizedValue, searchableText } from "../lib/contentSort";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: {
    fallbackTitle: "Theme",
    fallbackDomain: "General",
    searchPrefix: "Search within",
    allThemes: "All themes",
    keyData: "Key data",
    period: "Period",
    context: "Context",
    caution: "Reading caution",
    emptySearch: "No content matches this search.",
    overline: "Education & health",
    title: "Access, institutions and transformations",
    intro: "Education and health systems are presented through their history, reforms, territorial inequalities and contemporary challenges. Quantitative data should remain dated and sourced.",
    education: "Education",
    educationIntro: "School organization, higher education, access, languages of instruction and inequalities.",
    health: "Health",
    healthIntro: "Health-system organization, access to care, public policy and major challenges.",
    emptyData: "Detailed education and health data have not yet been structured in the backend.",
  },
  fr: {
    fallbackTitle: "Thème",
    fallbackDomain: "Général",
    searchPrefix: "Rechercher dans",
    allThemes: "Tous les thèmes",
    keyData: "Donnée clé",
    period: "Période",
    context: "Contexte",
    caution: "Précaution de lecture",
    emptySearch: "Aucun contenu ne correspond à cette recherche.",
    overline: "Éducation & santé",
    title: "Accès, institutions et transformations",
    intro: "Les systèmes éducatif et sanitaire sont replacés dans leur histoire, leurs réformes, leurs inégalités territoriales et leurs défis contemporains. Les données chiffrées doivent rester datées et sourcées.",
    education: "Éducation",
    educationIntro: "Organisation scolaire, enseignement supérieur, accès, langues d’enseignement et inégalités.",
    health: "Santé",
    healthIntro: "Organisation du système sanitaire, accès aux soins, politiques publiques et principaux défis.",
    emptyData: "Les données détaillées d’éducation et de santé ne sont pas encore structurées dans le backend.",
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
const getDomain = (item, copy) => item.domain || item.category || item.type || copy.fallbackDomain;

function SectionBlock({ title, intro, items, sourceMap, copy, lang }) {
  const domains = useMemo(() => {
    const seen = new Map();
    items.forEach((item) => {
      const value = getDomain(item, copy);
      const key = searchableText(value) || localizedValue(value, lang);
      if (key && !seen.has(key)) seen.set(key, { key, value });
    });
    return [...seen.values()];
  }, [items, copy, lang]);
  const [domain, setDomain] = useState("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(items[0]?.id || null);

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(lang === "fr" ? "fr" : "en");
    return items.filter((item) => {
      const itemDomain = getDomain(item, copy);
      const itemDomainKey = searchableText(itemDomain) || localizedValue(itemDomain, lang);
      const matchesDomain = domain === "all" || itemDomainKey === domain;
      const haystack = searchableText(getTitle(item, copy), getBody(item), itemDomain);
      return matchesDomain && (!needle || haystack.includes(needle));
    });
  }, [items, domain, query, copy, lang]);

  return (
    <section className="space-y-6">
      <div>
        <p className="overline text-gold">{title}</p>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-bone/55">
          {intro ? <TranslatedInline value={intro} lang={lang} /> : null}
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`${copy.searchPrefix} ${title.toLowerCase()}…`}
          className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50"
        />
        <div className="flex gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setDomain("all")}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
              domain === "all"
                ? "border-gold bg-gold/10 text-gold"
                : "border-bone/15 text-bone/60"
            }`}
          >
            {copy.allThemes}
          </button>
          {domains.map((itemDomain) => (
            <button
              key={itemDomain.key}
              type="button"
              onClick={() => setDomain(itemDomain.key)}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${
                domain === itemDomain.key
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-bone/15 text-bone/60"
              }`}
            >
              <TranslatedInline value={itemDomain.value} lang={lang} />
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {visible.map((item, index) => {
          const titleValue = getTitle(item, copy);
          const id = item.id || searchableText(titleValue, getDomain(item, copy), item.period) || `education-health-${index}`;
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
                      <TranslatedInline value={getDomain(item, copy)} lang={lang} />
                    </p>
                    <h3 className="mt-2 font-serif text-2xl text-bone">
                      <TranslatedInline value={titleValue} lang={lang} />
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
                    {item.data && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">
                          {copy.keyData}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          <TranslatedInline value={item.data} lang={lang} />
                        </p>
                      </div>
                    )}
                    {item.period && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">
                          {copy.period}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          <TranslatedInline value={item.period} lang={lang} />
                        </p>
                      </div>
                    )}
                    {item.context && (
                      <div className="rounded-xl border border-bone/10 bg-black/10 p-4 md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">
                          {copy.context}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-bone/72">
                          <TranslatedInline value={item.context} lang={lang} />
                        </p>
                      </div>
                    )}
                    {item.caution && (
                      <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 md:col-span-2">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-amber-300/75">
                          {copy.caution}
                        </p>
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
                  <SourceLinks ids={item.sources || item.sourceIds} sourceMap={sourceMap} lang={lang} />
                </div>
              )}
            </article>
          );
        })}
      </div>

      {!visible.length && (
        <div className="rounded-xl border border-bone/10 p-5 text-bone/60">
          {copy.emptySearch}
        </div>
      )}
    </section>
  );
}

export function SouthAfricaEducationHealthQuality({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const education = useMemo(
    () => dossier.education_health?.education || dossier.education || {},
    [dossier.education_health?.education, dossier.education],
  );
  const health = useMemo(
    () => dossier.education_health?.health || dossier.health || {},
    [dossier.education_health?.health, dossier.health],
  );
  const educationItems = useMemo(
    () => Array.isArray(education) ? education : (education.items || []),
    [education],
  );
  const healthItems = useMemo(
    () => Array.isArray(health) ? health : (health.items || []),
    [health],
  );

  return (
    <div className="space-y-10">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">{copy.overline}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{copy.title}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">{copy.intro}</p>
      </header>

      <SectionBlock
        title={copy.education}
        intro={education.intro || copy.educationIntro}
        items={educationItems}
        sourceMap={sourceMap}
        copy={copy}
        lang={lang}
      />

      <SectionBlock
        title={copy.health}
        intro={health.intro || copy.healthIntro}
        items={healthItems}
        sourceMap={sourceMap}
        copy={copy}
        lang={lang}
      />

      {!educationItems.length && !healthItems.length && (
        <div className="rounded-xl border border-bone/10 p-5 text-bone/60">
          {copy.emptyData}
        </div>
      )}
    </div>
  );
}
