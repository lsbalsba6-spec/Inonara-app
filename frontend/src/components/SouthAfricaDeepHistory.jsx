import { useI18n } from "../i18n";
import { localizedValue } from "../lib/contentSort";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: {
    status: { ready: "Established", provisional: "Read with context", disputed: "Debated" },
    unavailable: "This section will be available soon.",
    overline: "Deep history",
    mapRule: "Mapping rule:",
    migrations: "Migrations, mobility & networks before 1652",
    noRoute: "No precise route is published: the available sources do not support a single reliable trajectory.",
  },
  fr: {
    status: { ready: "Établi", provisional: "À nuancer", disputed: "Débattu" },
    unavailable: "Cette partie sera bientôt disponible.",
    overline: "Histoire profonde",
    mapRule: "Règle cartographique :",
    migrations: "Migrations, mobilités et réseaux avant 1652",
    noRoute: "Aucun tracé précis publié : les sources ne permettent pas une route unique fiable.",
  },
};

function TranslatedInline({ value, lang }) {
  const translated = useTranslated(value || "");
  return translated || localizedValue(value, lang) || null;
}

function StatusPill({ status, copy }) {
  return (
    <span className="rounded-full border border-bone/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-bone/55">
      {copy.status[status] || status}
    </span>
  );
}

function SourceLink({ source, lang }) {
  const translatedTitle = useTranslated(source?.title || "");
  if (!source) return null;
  const publisher = localizedValue(source.publisher, lang);
  const title = translatedTitle || localizedValue(source.title, lang);
  return (
    <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="text-[11px] text-gold/80 underline underline-offset-2 hover:text-gold">
      {publisher ? `${publisher}: ` : ""}{title}
    </a>
  );
}

function Sources({ ids, sourceMap, lang }) {
  if (!ids?.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
      {ids.map((id) => {
        const source = sourceMap.get(id);
        return source ? <SourceLink key={id} source={source} lang={lang} /> : null;
      })}
    </div>
  );
}

export default function SouthAfricaDeepHistory({ data, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;

  if (!data) {
    return <p className="text-bone/60">{copy.unavailable}</p>;
  }

  return (
    <div className="space-y-8">
      <header className="rounded-xl border border-gold/20 bg-gold/[0.04] p-5">
        <p className="overline text-gold">{copy.overline}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone"><TranslatedInline value={data.title} lang={lang} /></h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-bone/70"><TranslatedInline value={data.subtitle} lang={lang} /></p>
        <p className="mt-3 text-sm leading-relaxed text-bone/55"><TranslatedInline value={data.public_note} lang={lang} /></p>
      </header>

      <div className="space-y-5">
        {data.chapters?.map((chapter) => (
          <article key={chapter.id} className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-widest text-gold"><TranslatedInline value={chapter.period} lang={lang} /></p>
              <StatusPill status={chapter.status} copy={copy} />
            </div>
            <h3 className="mt-2 font-serif text-2xl text-bone"><TranslatedInline value={chapter.title} lang={lang} /></h3>
            <p className="mt-3 leading-relaxed text-bone/75"><TranslatedInline value={chapter.text} lang={lang} /></p>
            <p className="mt-3 rounded-lg border border-bone/10 bg-black/10 p-3 text-xs leading-relaxed text-bone/55">
              <strong className="text-bone/70">{copy.mapRule}</strong>{" "}<TranslatedInline value={chapter.map_policy} lang={lang} />
            </p>
            <Sources ids={chapter.sources} sourceMap={sourceMap} lang={lang} />
          </article>
        ))}
      </div>

      <section>
        <h2 className="mb-4 font-serif text-2xl text-gold">{copy.migrations}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {data.migration_processes?.map((process) => (
            <article key={process.id} className="rounded-xl border border-bone/10 p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif text-lg text-bone"><TranslatedInline value={process.label} lang={lang} /></h3>
                <StatusPill status={process.status} copy={copy} />
              </div>
              <p className="mt-1 text-xs uppercase tracking-wider text-gold/80"><TranslatedInline value={process.period?.display} lang={lang} /></p>
              <p className="mt-3 text-sm leading-relaxed text-bone/70"><TranslatedInline value={process.reason} lang={lang} /></p>
              {!process.route_geometry && (
                <p className="mt-3 text-xs text-bone/45">{copy.noRoute}</p>
              )}
              <Sources ids={process.sources} sourceMap={sourceMap} lang={lang} />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
