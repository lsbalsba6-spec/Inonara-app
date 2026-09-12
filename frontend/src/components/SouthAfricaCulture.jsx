import { useMemo, useState } from "react";
import { useI18n } from "../i18n";
import { localizedValue, searchableText } from "../lib/contentSort";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: {
    culture: "Culture",
    heading: "Practices, creation and transmission",
    introBefore: "The culture of",
    introAfter: "is not a single homogeneous block. This section distinguishes practices, local histories, languages, urban and rural legacies, and contemporary forms of creation.",
    searchLabel: "Search a cultural theme",
    searchPlaceholder: "Search: music, food, literature, architecture…",
    fallbackTopic: "Cultural theme",
    orality: "Oral traditions",
    oralHeading: "Oral traditions and narratives",
    oralIntro: "Oral narratives are contextualized without presenting them as literal archives or as a single national culture.",
    empty: "No theme matches this search.",
    countryFallback: "this country",
  },
  fr: {
    culture: "Culture",
    heading: "Pratiques, créations et transmissions",
    introBefore: "La culture de",
    introAfter: "n’est pas un bloc homogène. Cette section distingue les pratiques, les histoires locales, les langues, les héritages urbains et ruraux, ainsi que les formes contemporaines de création.",
    searchLabel: "Rechercher un thème culturel",
    searchPlaceholder: "Rechercher : musique, cuisine, littérature, architecture…",
    fallbackTopic: "Thème culturel",
    orality: "Oralité",
    oralHeading: "Traditions orales et récits",
    oralIntro: "Les récits oraux sont contextualisés sans être présentés comme des archives littérales ou comme une culture nationale unique.",
    empty: "Aucun thème ne correspond à cette recherche.",
    countryFallback: "ce pays",
  },
};

function TranslatedInline({ value }) {
  const { lang } = useI18n();
  const translated = useTranslated(value || "");
  return translated || localizedValue(value, lang);
}

function TranslatedText({ value, className = "" }) {
  const { lang } = useI18n();
  const translated = useTranslated(value || "");
  if (!value) return null;
  return <p className={className}>{translated || localizedValue(value, lang)}</p>;
}

function SourceChip({ source }) {
  const { lang } = useI18n();
  const translatedTitle = useTranslated(source?.title || "");
  const translatedPublisher = useTranslated(source?.publisher || "");
  if (!source) return null;

  const title = translatedTitle || localizedValue(source.title, lang);
  const publisher = translatedPublisher || localizedValue(source.publisher, lang);
  const label = [publisher, title].filter(Boolean).join(": ");
  if (!label) return null;

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noreferrer"
      className="rounded-full border border-gold/25 px-3 py-1 text-[11px] text-gold/85 hover:bg-gold/10"
    >
      {label}
    </a>
  );
}

function SourceLinks({ ids = [], sourceMap }) {
  if (!ids.length) return null;
  const sources = ids.map((id) => sourceMap.get(id)).filter(Boolean);
  if (!sources.length) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {sources.map((source) => <SourceChip key={source.id || source.url} source={source} />)}
    </div>
  );
}

function normalizeTopic(item, fallbackTopic) {
  return item.topic || item.title || item.name || fallbackTopic;
}

export function SouthAfricaCulture({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const countryName = localizedValue(dossier?.name || dossier?.country, lang) || copy.countryFallback;
  const culture = useMemo(() => dossier.culture || [], [dossier.culture]);
  const oral = dossier.oral_traditions_and_legends || [];
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(culture[0]?.id || null);

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(lang);
    if (!needle) return culture;
    return culture.filter((item) =>
      searchableText(
        normalizeTopic(item, copy.fallbackTopic),
        item.text,
        item.note,
        item.context,
        item.paragraphs,
      ).includes(needle),
    );
  }, [culture, query, copy.fallbackTopic, lang]);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">{copy.culture}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{copy.heading}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">
          {copy.introBefore} {countryName} {copy.introAfter}
        </p>
      </header>

      <label className="block">
        <span className="sr-only">{copy.searchLabel}</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.searchPlaceholder}
          className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50"
        />
      </label>

      <div className="grid gap-4">
        {visible.map((item, index) => {
          const topic = normalizeTopic(item, copy.fallbackTopic);
          const topicKey = localizedValue(topic, lang) || `culture-${index}`;
          const id = item.id || `${topicKey}-${index}`;
          const expanded = openId === id;
          return (
            <article key={id} className="overflow-hidden rounded-2xl border border-bone/10 bg-bone/[0.025]">
              <button
                type="button"
                onClick={() => setOpenId(expanded ? null : id)}
                className="w-full p-5 text-left"
                aria-expanded={expanded}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-serif text-2xl text-bone"><TranslatedInline value={topic} /></h3>
                  <span className="text-xl text-gold">{expanded ? "−" : "+"}</span>
                </div>
                {(item.text || item.note) && (
                  <TranslatedText value={item.text || item.note} className="mt-3 max-w-4xl leading-7 text-bone/70" />
                )}
              </button>

              {expanded && (
                <div className="border-t border-bone/10 px-5 pb-6 pt-5">
                  {item.paragraphs?.length > 0 ? (
                    <div className="space-y-4 rounded-xl border border-bone/10 bg-black/10 p-5">
                      {item.paragraphs.map((paragraph, paragraphIndex) => (
                        <TranslatedText key={paragraphIndex} value={paragraph} className="text-sm leading-7 text-bone/75" />
                      ))}
                    </div>
                  ) : item.context ? (
                    <TranslatedText value={item.context} className="rounded-xl border border-bone/10 bg-black/10 p-4 text-sm leading-6 text-bone/68" />
                  ) : null}
                  <SourceLinks ids={item.sources || item.sourceIds} sourceMap={sourceMap} />
                </div>
              )}
            </article>
          );
        })}
      </div>

      {oral.length > 0 && (
        <section>
          <div className="mb-4">
            <p className="overline text-gold">{copy.orality}</p>
            <h2 className="mt-2 font-serif text-3xl text-bone">{copy.oralHeading}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-bone/55">{copy.oralIntro}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {oral.map((item, index) => (
              <article key={item.id || localizedValue(item.title || item.name, lang) || `oral-${index}`} className="rounded-2xl border border-bone/10 bg-bone/[0.025] p-5">
                <h3 className="font-serif text-xl text-bone"><TranslatedInline value={item.title || item.name} /></h3>
                {(item.note || item.text) && (
                  <TranslatedText value={item.note || item.text} className="mt-3 text-sm leading-6 text-bone/68" />
                )}
                <SourceLinks ids={item.sources || item.sourceIds} sourceMap={sourceMap} />
              </article>
            ))}
          </div>
        </section>
      )}

      {!visible.length && (
        <div className="rounded-xl border border-bone/10 p-5 text-bone/60">{copy.empty}</div>
      )}
    </div>
  );
}
