import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";
import { localizedValue, searchableText } from "../lib/contentSort";

const COPY = {
  en: { education: "Education", health: "Health" },
  fr: { education: "Éducation", health: "Santé" },
};

function TranslatedText({ value, className = "" }) {
  const { lang } = useI18n();
  const translated = useTranslated(value || "");
  if (!value) return null;
  return <p className={className}>{translated || localizedValue(value, lang)}</p>;
}

function TranslatedHeading({ value, className = "" }) {
  const { lang } = useI18n();
  const translated = useTranslated(value || "");
  if (!value) return null;
  return <h3 className={className}>{translated || localizedValue(value, lang)}</h3>;
}

function SourceLink({ source }) {
  const { lang } = useI18n();
  const translatedTitle = useTranslated(source?.title || "");
  const translatedPublisher = useTranslated(source?.publisher || "");
  if (!source?.url) return null;
  const title = translatedTitle || localizedValue(source.title, lang) || source.id;
  const publisher = translatedPublisher || localizedValue(source.publisher, lang);
  return (
    <a href={source.url} target="_blank" rel="noreferrer" className="text-[11px] text-gold/80 underline underline-offset-2 hover:text-gold">
      {publisher ? `${publisher}: ` : ""}{title}
    </a>
  );
}

function SourceLinks({ ids = [], sourceMap = new Map() }) {
  if (!ids?.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
      {ids.map((id) => {
        const source = sourceMap.get(id);
        return source ? <SourceLink key={id} source={source} /> : null;
      })}
    </div>
  );
}

function Cards({ items = [], sourceMap }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, index) => (
        <article key={item.id || `${searchableText(item.title || item.name)}-${index}`} className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
          <TranslatedHeading value={item.title || item.name} className="font-serif text-xl text-bone" />
          <TranslatedText value={item.text || item.summary || item.note || item.description} className="mt-2 text-sm leading-relaxed text-bone/70" />
          <SourceLinks ids={item.sourceIds || item.sources} sourceMap={sourceMap} />
        </article>
      ))}
    </div>
  );
}

export function SouthAfricaSociety({ dossier, sourceMap }) {
  const data = dossier?.society;
  if (!data) return null;
  return (
    <div className="space-y-6">
      <TranslatedText value={data.intro} className="text-lg leading-relaxed text-bone/80" />
      <Cards items={data.themes || data.items} sourceMap={sourceMap} />
    </div>
  );
}

export function SouthAfricaEducationHealth({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const data = dossier?.education_health;
  if (!data) return null;
  return (
    <div className="space-y-10">
      {data.education && (
        <section>
          <h2 className="mb-3 font-serif text-3xl text-gold">{copy.education}</h2>
          <TranslatedText value={data.education.intro} className="mb-5 leading-relaxed text-bone/75" />
          <Cards items={data.education.items} sourceMap={sourceMap} />
        </section>
      )}
      {data.health && (
        <section>
          <h2 className="mb-3 font-serif text-3xl text-gold">{copy.health}</h2>
          <TranslatedText value={data.health.intro} className="mb-5 leading-relaxed text-bone/75" />
          <Cards items={data.health.items} sourceMap={sourceMap} />
        </section>
      )}
    </div>
  );
}

export function SouthAfricaNationalSymbols({ dossier, sourceMap }) {
  const data = dossier?.national_symbols;
  if (!data) return null;
  return (
    <div className="space-y-6">
      <TranslatedText value={data.intro} className="text-lg leading-relaxed text-bone/80" />
      <Cards items={data.items} sourceMap={sourceMap} />
    </div>
  );
}

export function SouthAfricaInternationalRole({ dossier, sourceMap }) {
  const data = dossier?.international_role;
  if (!data) return null;
  return (
    <div className="space-y-6">
      <TranslatedText value={data.intro} className="text-lg leading-relaxed text-bone/80" />
      <Cards items={data.memberships || data.items} sourceMap={sourceMap} />
    </div>
  );
}
