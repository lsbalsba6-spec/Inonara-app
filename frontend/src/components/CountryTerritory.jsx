import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: {
    country: "this country",
    overline: "Territory",
    title: "{country}: spaces, waters and landscapes",
    intro: "Territorial data is presented according to available sources and does not automatically project contemporary borders onto ancient periods.",
    documented: "Documented",
    mapping: "Mapping",
    places: "Reference places",
    aria: "Schematic map of reference places in {country}",
  },
  fr: {
    country: "ce pays",
    overline: "Territoire",
    title: "{country} : espaces, eaux et paysages",
    intro: "Les données territoriales sont présentées selon les sources disponibles et ne projettent pas automatiquement les frontières contemporaines sur les périodes anciennes.",
    documented: "Documenté",
    mapping: "Cartographie",
    places: "Lieux de référence",
    aria: "Carte schématique des lieux de référence de {country}",
  },
};

function SourceLinks({ ids = [], sourceMap = new Map() }) {
  const sources = ids.map((id) => sourceMap.get(id)).filter(Boolean);
  if (!sources.length) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {sources.map((source) => (
        <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="rounded-full border border-gold/25 px-3 py-1 text-[11px] text-gold/85 hover:bg-gold/10">
          {source.publisher}: {source.title}
        </a>
      ))}
    </div>
  );
}

function TranslatedText({ value, className = "" }) {
  const translated = useTranslated(value || "");
  if (!value) return null;
  return <p className={className}>{translated || value}</p>;
}

export function CountryTerritory({ dossier = {}, territory = {}, sourceMap = new Map() }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const sections = territory.sections || dossier.territory_sections || [];
  const places = territory.places || [];
  const countryName = dossier?.name?.[lang] || dossier?.name?.fr || dossier?.country || territory.country || copy.country;

  const bounds = (() => {
    if (!places.length) return { minLon: -20, maxLon: 40, minLat: -35, maxLat: 20 };
    const lons = places.map((p) => Number(p.lon)).filter(Number.isFinite);
    const lats = places.map((p) => Number(p.lat)).filter(Number.isFinite);
    if (!lons.length || !lats.length) return { minLon: -20, maxLon: 40, minLat: -35, maxLat: 20 };
    const padX = Math.max(1, (Math.max(...lons) - Math.min(...lons)) * .15);
    const padY = Math.max(1, (Math.max(...lats) - Math.min(...lats)) * .15);
    return {
      minLon: Math.min(...lons) - padX, maxLon: Math.max(...lons) + padX,
      minLat: Math.min(...lats) - padY, maxLat: Math.max(...lats) + padY,
    };
  })();

  const project = (p) => {
    const x = 40 + ((Number(p.lon) - bounds.minLon) / Math.max(.001, bounds.maxLon - bounds.minLon)) * 840;
    const y = 35 + ((bounds.maxLat - Number(p.lat)) / Math.max(.001, bounds.maxLat - bounds.minLat)) * 360;
    return [x, y];
  };

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">{copy.overline}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{copy.title.replace("{country}", countryName)}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-bone/65">{copy.intro}</p>
      </header>

      <div className="grid gap-4">
        {sections.map((section) => (
          <article key={section.id} className="rounded-2xl border border-bone/10 bg-bone/[0.025] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="font-serif text-2xl text-bone">{section.title}</h3>
              {section.status && (
                <span className="rounded-full border border-bone/15 px-2.5 py-1 text-[10px] uppercase tracking-wider text-bone/50">
                  {section.status === "ready" ? copy.documented : section.status}
                </span>
              )}
            </div>
            {section.summary && <TranslatedText value={section.summary} className="mt-3 leading-7 text-bone/70" />}
            {section.facts?.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm leading-6 text-bone/65">
                {section.facts.map((fact, i) => <li key={i}>• <TranslatedText value={fact} className="inline" /></li>)}
              </ul>
            )}
            <SourceLinks ids={section.sources} sourceMap={sourceMap} />
          </article>
        ))}
      </div>

      {places.length > 0 && (
        <section className="rounded-2xl border border-bone/10 bg-black/20 p-4 md:p-5">
          <p className="overline text-gold">{copy.mapping}</p>
          <h3 className="mt-1 font-serif text-2xl text-bone">{copy.places}</h3>
          <div className="mt-4 overflow-x-auto">
            <svg viewBox="0 0 920 430" className="min-w-[720px] w-full rounded-xl bg-[#0d1716]" role="img" aria-label={copy.aria.replace("{country}", countryName)}>
              <rect x="0" y="0" width="920" height="430" fill="#0d1716" />
              <path d="M60 80 C180 35 350 65 470 45 S760 55 860 100 L835 330 C650 385 460 350 280 375 S110 340 60 290 Z" fill="rgba(214,179,106,.05)" stroke="rgba(214,179,106,.35)" />
              {places.map((place, i) => {
                const [x, y] = project(place);
                return (
                  <g key={place.id || i}>
                    <circle cx={x} cy={y} r="6" fill="#d6b36a" />
                    <text x={x + 9} y={y - 9} fill="rgba(245,239,224,.82)" fontSize="12">{place.name}</text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((place) => (
              <div key={place.id} className="rounded-xl border border-bone/10 p-3">
                <p className="text-sm font-medium text-bone">{place.name}</p>
                <p className="mt-1 text-xs text-bone/50">{place.kind}</p>
                <SourceLinks ids={place.sources} sourceMap={sourceMap} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default CountryTerritory;
