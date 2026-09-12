import { useI18n } from "../i18n";
import { localizedValue } from "../lib/contentSort";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: {
    status: { ready: "Established", provisional: "Read with context", disputed: "Debated" },
    empty: "Content coming soon.",
  },
  fr: {
    status: { ready: "Établi", provisional: "À nuancer", disputed: "Débattu" },
    empty: "Contenu à suivre.",
  },
};

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

function StatusBadge({ status, copy }) {
  const label = copy.status[status] || status;
  return (
    <span className="inline-flex rounded-full border border-bone/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-bone/55">
      {label}
    </span>
  );
}

function SourceLink({ source }) {
  const { lang } = useI18n();
  const translatedTitle = useTranslated(source?.title || "");
  if (!source) return null;
  const title = translatedTitle || localizedValue(source.title, lang, "");
  const publisher = localizedValue(source.publisher, lang, "");
  return (
    <a href={source.url} target="_blank" rel="noreferrer" className="text-[11px] text-gold/80 underline underline-offset-2 hover:text-gold">
      {publisher ? `${publisher}: ` : ""}{title}
    </a>
  );
}

function SourceLinks({ ids = [], sourceMap }) {
  if (!ids.length) return null;
  const sources = ids.map((id) => sourceMap.get(id)).filter(Boolean);
  if (!sources.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
      {sources.map((source) => <SourceLink key={source.id || source.url} source={source} />)}
    </div>
  );
}

function TopicCards({ items = [], sourceMap, copy, lang }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, index) => (
        <article key={item.id || localizedValue(item.title, lang, `topic-${index}`)} className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-xl text-bone"><TranslatedInline value={item.title} /></h3>
            {item.status && <StatusBadge status={item.status} copy={copy} />}
          </div>
          <TranslatedParagraph value={item.text} className="mt-2 text-sm leading-relaxed text-bone/70" />
          {item.paragraphs?.length > 0 && (
            <div className="mt-4 space-y-3">
              {item.paragraphs.map((paragraph, paragraphIndex) => (
                <TranslatedParagraph key={paragraphIndex} value={paragraph} className="text-sm leading-7 text-bone/72" />
              ))}
            </div>
          )}
          <SourceLinks ids={item.sourceIds} sourceMap={sourceMap} />
        </article>
      ))}
    </div>
  );
}

function LawMemorySection({ section, sourceMap, copy, lang }) {
  if (!section) return null;
  return (
    <section>
      <h2 className="mb-4 font-serif text-3xl text-gold"><TranslatedInline value={section.title} /></h2>
      <TopicCards items={section.items} sourceMap={sourceMap} copy={copy} lang={lang} />
    </section>
  );
}

export function SouthAfricaLawMemory({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const data = dossier.law_memory;
  if (!data) return <p className="text-bone/60">{copy.empty}</p>;

  const sections = [data.constitutional_democracy, data.justice_system, data.memory_reconciliation].filter(Boolean);

  return (
    <div className="space-y-10">
      <TranslatedParagraph value={data.intro} className="text-lg leading-relaxed text-bone/80" />
      {sections.map((section, index) => (
        <LawMemorySection
          key={section.id || localizedValue(section.title, lang, `section-${index}`)}
          section={section}
          sourceMap={sourceMap}
          copy={copy}
          lang={lang}
        />
      ))}
      {data.editorial_note && (
        <aside className="rounded-xl border border-gold/20 bg-gold/[0.04] p-5 text-sm leading-relaxed text-bone/70">
          <TranslatedInline value={data.editorial_note} />
        </aside>
      )}
    </div>
  );
}
