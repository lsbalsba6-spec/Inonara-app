import { useI18n } from "../i18n";
import { localizedValue } from "../lib/contentSort";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  fr: { overline:"Nature & environnement", title:"Biodiversité, biomes et conservation", intro:"Explorer les grands systèmes écologiques du pays, les pressions qu’ils subissent et les réponses de conservation documentées.", biomes:"Biomes", landscapes:"Paysages majeurs", pressures:"Pressions environnementales" },
  en: { overline:"Nature & environment", title:"Biodiversity, biomes and conservation", intro:"Explore the country's major ecological systems, the pressures they face and documented conservation responses.", biomes:"Biomes", landscapes:"Major landscapes", pressures:"Environmental pressures" },
};

function Text({ value }) { const { lang } = useI18n(); const translated = useTranslated(value || ""); return translated || localizedValue(value, lang); }
function Sources({ ids = [], sourceMap }) { const { lang } = useI18n(); return <div className="mt-4 flex flex-wrap gap-2">{ids.map((id) => { const source = sourceMap.get(id); if (!source?.url) return null; return <a key={id} href={source.url} target="_blank" rel="noreferrer" className="rounded-full border border-gold/25 px-3 py-1 text-[11px] text-gold/85 hover:bg-gold/10">{localizedValue(source.publisher, lang) || localizedValue(source.title, lang) || id}</a>; })}</div>; }
function Cards({ items, sourceMap }) { return <div className="grid gap-4 md:grid-cols-2">{items.map((item, index) => <article key={item.id || item.name || index} className="rounded-2xl border border-bone/10 bg-bone/[.025] p-5"><h3 className="font-serif text-2xl text-bone"><Text value={item.title || item.name} /></h3>{(item.text || item.summary || item.context || item.note) && <p className="mt-3 text-sm leading-7 text-bone/70"><Text value={item.text || item.summary || item.context || item.note} /></p>}<Sources ids={item.sourceIds || item.sources || []} sourceMap={sourceMap} /></article>)}</div>; }

export default function CountryEnvironment({ dossier = {}, sourceMap = new Map() }) {
  const { lang } = useI18n(); const copy = COPY[lang] || COPY.en; const raw = dossier.environment || {};
  const primaryThemes = Array.isArray(raw) ? raw : [...(raw.themes || []), ...(raw.items || []), ...(raw.sections || [])];
  const supplementalThemes = Array.isArray(dossier.environment_themes) ? dossier.environment_themes : [];
  const themes = [...primaryThemes, ...supplementalThemes].filter((item, index, items) => {
    const key = item?.id || item?.slug || item?.name || item?.title;
    return !key || items.findIndex((candidate) => (candidate?.id || candidate?.slug || candidate?.name || candidate?.title) === key) === index;
  });
  const biomes = Array.isArray(raw.biomes) ? raw.biomes : [];
  const landscapes = Array.isArray(raw.landscapes) ? raw.landscapes : [];
  const pressures = Array.isArray(raw.pressures) ? raw.pressures : [];
  return <div className="space-y-8"><header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[.08] to-transparent p-6"><p className="overline text-gold">{copy.overline}</p><h2 className="mt-2 font-serif text-3xl text-bone">{copy.title}</h2><p className="mt-3 max-w-3xl leading-7 text-bone/65">{copy.intro}</p></header>
    <Cards items={themes} sourceMap={sourceMap} />
    {biomes.length > 0 && <section><h2 className="mb-4 font-serif text-3xl text-gold">{copy.biomes}</h2><Cards items={biomes} sourceMap={sourceMap} /></section>}
    {landscapes.length > 0 && <section><h2 className="mb-4 font-serif text-3xl text-gold">{copy.landscapes}</h2><Cards items={landscapes} sourceMap={sourceMap} /></section>}
    {pressures.length > 0 && <section><h2 className="mb-4 font-serif text-3xl text-gold">{copy.pressures}</h2><ul className="grid gap-3 md:grid-cols-2">{pressures.map((pressure, index) => <li key={index} className="rounded-xl border border-bone/10 bg-bone/[.025] p-4 text-sm leading-6 text-bone/70"><Text value={pressure} /></li>)}</ul></section>}
  </div>;
}
