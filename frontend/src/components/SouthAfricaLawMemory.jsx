import { useI18n } from "../i18n";
import { localizedValue, searchableText } from "../lib/contentSort";
import { useTranslated } from "../lib/useTranslated";

function TranslatedInline({ value }) {
  const { lang } = useI18n();
  const translated = useTranslated(value || "");
  return translated || localizedValue(value, lang, "") || null;
}

function TranslatedParagraph({ value, className = "" }) {
  const { lang } = useI18n();
  const translated = useTranslated(value || "");
  if (!value) return null;
  return <p className={className}>{translated || localizedValue(value, lang, "")}</p>;
}

function SourceLink({ source }) {
  const { lang } = useI18n();
  const translatedTitle = useTranslated(source?.title || "");
  const translatedPublisher = useTranslated(source?.publisher || "");
  if (!source?.url) return null;
  const title = translatedTitle || localizedValue(source.title, lang, "");
  const publisher = translatedPublisher || localizedValue(source.publisher, lang, "");
  const label = [publisher, title].filter(Boolean).join(": ");
  if (!label) return null;
  return (
    <a href={source.url} target="_blank" rel="noreferrer" className="text-[11px] text-gold/80 underline underline-offset-2 hover:text-gold">
      {label}
    </a>
  );
}

function SourceLinks({ ids = [], sourceMap = new Map() }) {
  if (!ids.length) return null;
  const sources = ids.map((id) => sourceMap.get(id)).filter(Boolean);
  if (!sources.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
      {sources.map((source) => <SourceLink key={source.id || source.url} source={source} />)}
    </div>
  );
}

function TopicCards({ items = [], sourceMap, lang }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, index) => {
        const titleKey = searchableText(item.title) || `topic-${index}`;
        return (
          <article key={item.id || titleKey} className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
            <h3 className="font-serif text-xl text-bone"><TranslatedInline value={item.title} /></h3>
            <TranslatedParagraph value={item.text || item.summary || item.note} className="mt-2 text-sm leading-relaxed text-bone/70" />
            {item.paragraphs?.length > 0 && (
              <div className="mt-4 space-y-3">
                {item.paragraphs.map((paragraph, paragraphIndex) => (
                  <TranslatedParagraph key={`${titleKey}-p-${paragraphIndex}`} value={paragraph} className="text-sm leading-7 text-bone/72" />
                ))}
              </div>
            )}
            <SourceLinks ids={item.sourceIds || item.sources} sourceMap={sourceMap} />
          </article>
        );
      })}
    </div>
  );
}

function LawMemorySection({ section, sourceMap, lang }) {
  if (!section?.items?.length) return null;
  return (
    <section>
      <h2 className="mb-4 font-serif text-3xl text-gold"><TranslatedInline value={section.title} /></h2>
      {section.intro && <TranslatedParagraph value={section.intro} className="mb-5 max-w-4xl leading-7 text-bone/70" />}
      <TopicCards items={section.items} sourceMap={sourceMap} lang={lang} />
    </section>
  );
}

export function SouthAfricaLawMemory({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const data = dossier?.law_memory;
  if (!data) return null;

  const sections = [data.constitutional_democracy, data.justice_system, data.memory_reconciliation].filter((section) => section?.items?.length);
  if (!sections.length && !data.intro) return null;

  return (
    <div className="space-y-10">
      <TranslatedParagraph value={data.intro} className="text-lg leading-relaxed text-bone/80" />
      {sections.map((section, index) => (
        <LawMemorySection
          key={section.id || searchableText(section.title) || `section-${index}`}
          section={section}
          sourceMap={sourceMap}
          lang={lang}
        />
      ))}
    </div>
  );
}
