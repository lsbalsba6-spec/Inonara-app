import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: {
    status: { ready: "Established", provisional: "Needs nuance", disputed: "Debated" },
    comingSoon: "Content coming soon.",
    education: "Education",
    health: "Health",
  },
  fr: {
    status: { ready: "Établi", provisional: "À nuancer", disputed: "Débattu" },
    comingSoon: "Contenu à suivre.",
    education: "Éducation",
    health: "Santé",
  },
};

function TranslatedText({ value, className = "" }) {
  const translated = useTranslated(value || "");
  if (!value) return null;
  return <p className={className}>{translated || value}</p>;
}

function TranslatedHeading({ value, className = "" }) {
  const translated = useTranslated(value || "");
  if (!value) return null;
  return <h3 className={className}>{translated || value}</h3>;
}

function StatusBadge({ status, labels }) {
  return (
    <span className="inline-flex rounded-full border border-bone/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-bone/55">
      {labels[status] || status}
    </span>
  );
}

function SourceLink({ source }) {
  const translatedTitle = useTranslated(source?.title || "");
  if (!source) return null;
  return (
    <a href={source.url} target="_blank" rel="noreferrer" className="text-[11px] text-gold/80 hover:text-gold underline underline-offset-2">
      {source.publisher}: {translatedTitle || source.title}
    </a>
  );
}

function SourceLinks({ ids = [], sourceMap }) {
  if (!ids.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
      {ids.map((id) => {
        const source = sourceMap.get(id);
        return source ? <SourceLink key={id} source={source} /> : null;
      })}
    </div>
  );
}

function Cards({ items = [], sourceMap, statusLabels }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, index) => (
        <article key={item.title || index} className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
          <div className="flex items-start justify-between gap-3">
            <TranslatedHeading value={item.title} className="font-serif text-xl text-bone" />
            {item.status && <StatusBadge status={item.status} labels={statusLabels} />}
          </div>
          <TranslatedText value={item.text} className="mt-2 text-sm leading-relaxed text-bone/70" />
          <SourceLinks ids={item.sourceIds} sourceMap={sourceMap} />
        </article>
      ))}
    </div>
  );
}

function EmptyState({ copy }) {
  return <p className="text-bone/60">{copy.comingSoon}</p>;
}

export function SouthAfricaSociety({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const data = dossier.society;
  if (!data) return <EmptyState copy={copy} />;
  return (
    <div className="space-y-6">
      <TranslatedText value={data.intro} className="text-lg leading-relaxed text-bone/80" />
      <Cards items={data.themes} sourceMap={sourceMap} statusLabels={copy.status} />
    </div>
  );
}

export function SouthAfricaEducationHealth({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const data = dossier.education_health;
  if (!data) return <EmptyState copy={copy} />;
  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-3 font-serif text-3xl text-gold">{copy.education}</h2>
        <TranslatedText value={data.education.intro} className="mb-5 text-bone/75 leading-relaxed" />
        <Cards items={data.education.items} sourceMap={sourceMap} statusLabels={copy.status} />
      </section>
      <section>
        <h2 className="mb-3 font-serif text-3xl text-gold">{copy.health}</h2>
        <TranslatedText value={data.health.intro} className="mb-5 text-bone/75 leading-relaxed" />
        <Cards items={data.health.items} sourceMap={sourceMap} statusLabels={copy.status} />
      </section>
    </div>
  );
}

export function SouthAfricaNationalSymbols({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const data = dossier.national_symbols;
  if (!data) return <EmptyState copy={copy} />;
  return (
    <div className="space-y-6">
      <TranslatedText value={data.intro} className="text-lg leading-relaxed text-bone/80" />
      <Cards items={data.items} sourceMap={sourceMap} statusLabels={copy.status} />
    </div>
  );
}

export function SouthAfricaInternationalRole({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const data = dossier.international_role;
  if (!data) return <EmptyState copy={copy} />;
  return (
    <div className="space-y-6">
      <TranslatedText value={data.intro} className="text-lg leading-relaxed text-bone/80" />
      <Cards items={data.memberships} sourceMap={sourceMap} statusLabels={copy.status} />
    </div>
  );
}
