import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";
import { localizedValue, searchableText } from "../lib/contentSort";

const COPY = {
  en: {
    sports: "Sports",
    media: "Media",
  },
  fr: {
    sports: "Sports",
    media: "Médias",
  },
};

function TranslatedInline({ value }) {
  const { lang } = useI18n();
  const translated = useTranslated(value || "");
  return translated || localizedValue(value, lang) || null;
}

function SourceLink({ source }) {
  const { lang } = useI18n();
  const translatedTitle = useTranslated(source?.title || "");
  const translatedPublisher = useTranslated(source?.publisher || "");
  if (!source?.url) return null;
  const publisher = translatedPublisher || localizedValue(source.publisher, lang);
  const title = translatedTitle || localizedValue(source.title, lang) || source.id;
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noreferrer"
      className="text-[11px] text-gold/80 underline underline-offset-2 hover:text-gold"
    >
      {publisher ? `${publisher}: ` : ""}{title}
    </a>
  );
}

function SourceLinks({ ids = [], sourceMap }) {
  if (!ids.length || !sourceMap) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
      {ids.map((id) => {
        const source = sourceMap.get(id);
        return source ? <SourceLink key={id} source={source} /> : null;
      })}
    </div>
  );
}

export function SouthAfricaSportMedia({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const data = dossier?.sport_media;

  if (!data) return null;

  const sections = Array.isArray(data.sections)
    ? data.sections
    : [
        ...(Array.isArray(data.sports) ? [{ id: "sports", title: copy.sports, items: data.sports }] : []),
        ...(Array.isArray(data.media) ? [{ id: "media", title: copy.media, items: data.media }] : []),
      ];

  return (
    <div className="space-y-8">
      {data.intro && (
        <p className="text-lg leading-relaxed text-bone/80">
          <TranslatedInline value={data.intro} />
        </p>
      )}
      {sections.map((section, sectionIndex) => (
        <section key={section.id || `${searchableText(section.title) || "sport-media"}-${sectionIndex}`}>
          <h2 className="mb-4 font-serif text-3xl text-gold">
            <TranslatedInline value={section.title} />
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {(section.items || []).map((item, index) => (
              <article
                key={item.id || `${searchableText(item.title || item.name) || "item"}-${index}`}
                className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5"
              >
                <h3 className="font-serif text-xl text-bone">
                  <TranslatedInline value={item.title || item.name} />
                </h3>
                {(item.text || item.note || item.summary) && (
                  <p className="mt-2 text-sm leading-relaxed text-bone/70">
                    <TranslatedInline value={item.text || item.note || item.summary} />
                  </p>
                )}
                <SourceLinks ids={item.sourceIds || item.sources} sourceMap={sourceMap} />
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
