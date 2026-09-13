import { useI18n } from "../i18n";
import { localizedValue } from "../lib/contentSort";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: {
    unavailable: "This section will be available soon.",
    overline: "Deep history",
    details: "Historical context",
    migrations: "Migrations, mobility & networks before 1652",
    noRoute: "No precise route is published because the available sources do not support a single reliable trajectory.",
  },
  fr: {
    unavailable: "Cette partie sera bientôt disponible.",
    overline: "Histoire profonde",
    details: "Contexte historique",
    migrations: "Migrations, mobilités et réseaux avant 1652",
    noRoute: "Aucun tracé précis n’est publié car les sources disponibles ne permettent pas d’établir une route unique fiable.",
  },
};

function TranslatedInline({ value, lang }) {
  const translated = useTranslated(value || "");
  return translated || localizedValue(value, lang) || null;
}

function SourceLink({ source, lang }) {
  const translatedTitle = useTranslated(source?.title || "");
  if (!source?.url) return null;
  const publisher = localizedValue(source.publisher, lang);
  const title = translatedTitle || localizedValue(source.title, lang);
  return <a href={source.url} target="_blank" rel="noreferrer" className="text-[11px] text-gold/80 underline underline-offset-2 hover:text-gold">{publisher ? `${publisher}: ` : ""}{title}</a>;
}

function Sources({ ids = [], sourceMap, lang }) {
  if (!ids.length) return null;
  return <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">{ids.map((id) => { const source = sourceMap.get(id); return source ? <SourceLink key={id} source={source} lang={lang} /> : null; })}</div>;
}

export default function SouthAfricaDeepHistory({ data, sourceMap = new Map() }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  if (!data) return <p className="text-bone/60">{copy.unavailable}</p>;

  return <div className="space-y-8">
    <header className="rounded-xl border border-gold/20 bg-gold/[0.04] p-5">
      <p className="overline text-gold">{copy.overline}</p>
      <h2 className="mt-2 font-serif text-3xl text-bone"><TranslatedInline value={data.title} lang={lang} /></h2>
      <p className="mt-2 max-w-3xl leading-relaxed text-bone/70"><TranslatedInline value={data.subtitle} lang={lang} /></p>
      {data.public_note && <p className="mt-3 text-sm leading-relaxed text-bone/55"><TranslatedInline value={data.public_note} lang={lang} /></p>}
    </header>

    <div className="space-y-5">
      {data.chapters?.map((chapter) => <article key={chapter.id} className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
        <p className="text-xs uppercase tracking-widest text-gold"><TranslatedInline value={chapter.period} lang={lang} /></p>
        <h3 className="mt-2 font-serif text-2xl text-bone"><TranslatedInline value={chapter.title} lang={lang} /></h3>
        <p className="mt-3 leading-relaxed text-bone/75"><TranslatedInline value={chapter.text} lang={lang} /></p>
        {chapter.details?.length > 0 && <div className="mt-5 rounded-xl border border-bone/10 bg-black/10 p-5"><p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-gold/80">{copy.details}</p><div className="space-y-4">{chapter.details.map((paragraph,index)=><p key={index} className="text-sm leading-7 text-bone/72"><TranslatedInline value={paragraph} lang={lang} /></p>)}</div></div>}
        <Sources ids={chapter.sources || chapter.sourceIds || []} sourceMap={sourceMap} lang={lang} />
      </article>)}
    </div>

    {data.migration_processes?.length > 0 && <section>
      <h2 className="mb-4 font-serif text-2xl text-gold">{copy.migrations}</h2>
      <div className="grid gap-4 md:grid-cols-2">{data.migration_processes.map((process) => <article key={process.id} className="rounded-xl border border-bone/10 p-4">
        <h3 className="font-serif text-lg text-bone"><TranslatedInline value={process.label} lang={lang} /></h3>
        <p className="mt-1 text-xs uppercase tracking-wider text-gold/80"><TranslatedInline value={process.period?.display || process.period} lang={lang} /></p>
        <p className="mt-3 text-sm leading-relaxed text-bone/70"><TranslatedInline value={process.reason || process.text || process.summary} lang={lang} /></p>
        {!process.route_geometry && <p className="mt-3 text-xs leading-5 text-bone/45">{copy.noRoute}</p>}
        <Sources ids={process.sources || process.sourceIds || []} sourceMap={sourceMap} lang={lang} />
      </article>)}</div>
    </section>}
  </div>;
}
