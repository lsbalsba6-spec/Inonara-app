import { useI18n } from "../i18n";
import { localizedValue } from "../lib/contentSort";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  fr: { overline:"Sciences & innovation", title:"Recherches, découvertes et systèmes de savoirs", intro:"Cette section relie les trajectoires scientifiques du pays aux institutions, aux territoires et aux savoirs portés par les communautés.", period:"Période", examples:"Domaines associés" },
  en: { overline:"Science & innovation", title:"Research, discoveries and knowledge systems", intro:"This section connects the country's scientific trajectories with institutions, territories and community-held knowledge.", period:"Period", examples:"Related fields" },
};

function Text({ value }) { const { lang } = useI18n(); const translated = useTranslated(value || ""); return translated || localizedValue(value, lang); }

export default function CountryScienceInnovation({ dossier = {}, sourceMap = new Map() }) {
  const { lang } = useI18n(); const copy = COPY[lang] || COPY.en; const items = dossier.science_innovation || [];
  return <div className="space-y-8"><header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[.08] to-transparent p-6"><p className="overline text-gold">{copy.overline}</p><h2 className="mt-2 font-serif text-3xl text-bone">{copy.title}</h2><p className="mt-3 max-w-3xl leading-7 text-bone/65">{copy.intro}</p></header><div className="grid gap-4 md:grid-cols-2">{items.map((item, index) => <article key={item.id || index} className="rounded-2xl border border-bone/10 bg-bone/[.025] p-5"><h3 className="font-serif text-2xl text-bone"><Text value={item.title} /></h3>{item.period && <p className="mt-2 text-[10px] uppercase tracking-[.16em] text-gold/75">{copy.period} · <Text value={item.period} /></p>}<p className="mt-3 text-sm leading-7 text-bone/70"><Text value={item.summary} /></p>{item.examples?.length > 0 && <div className="mt-4 flex flex-wrap gap-2" aria-label={copy.examples}>{item.examples.map((example, exampleIndex) => <span key={exampleIndex} className="rounded-full border border-bone/15 px-3 py-1 text-xs text-bone/70"><Text value={example} /></span>)}</div>}<div className="mt-4 flex flex-wrap gap-2">{(item.sourceIds || item.sources || []).map((id) => { const source = sourceMap.get(id); return source?.url ? <a key={id} href={source.url} target="_blank" rel="noreferrer" className="text-[11px] text-gold/80 underline underline-offset-2"><Text value={source.publisher || source.title || id} /></a> : null; })}</div></article>)}</div></div>;
}
