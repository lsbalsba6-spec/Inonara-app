import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: {
    pending: "To investigate",
    title: "Sports & media",
    missing: "This section is reserved in the country navigation, but its documented corpus is not yet available in the current backend. It remains visible without breaking the dossier and will only be expanded with verified sources.",
    sports: "Sports",
    media: "Media",
  },
  fr: {
    pending: "À suivre",
    title: "Sports et médias",
    missing: "Cette rubrique est réservée dans la navigation, mais son corpus documenté n’est pas encore présent dans la version actuelle du backend. Elle reste visible sans provoquer de plantage et sera enrichie uniquement avec des sources vérifiées.",
    sports: "Sports",
    media: "Médias",
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
      className="text-[11px] text-gold/80 underline underline-offset-2 hover:text-gold"
    >
      {source.publisher}: {translatedTitle || source.title}
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

  if (!data) {
    return (
      <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{copy.pending}</p>
        <h2 className="mt-2 font-serif text-2xl text-bone">{copy.title}</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-bone/65">{copy.missing}</p>
      </div>
    );
  }

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
        <section key={section.id || section.title || sectionIndex}>
          <h2 className="mb-4 font-serif text-3xl text-gold">
            <TranslatedInline value={section.title} />
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {(section.items || []).map((item, index) => (
              <article
                key={item.id || item.title || item.name || index}
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
