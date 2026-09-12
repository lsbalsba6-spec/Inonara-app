import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";
import { localizedValue } from "../lib/contentSort";
import CountryShapeMap from "./CountryShapeMap";

const COPY = {
  en: {
    country: "this country",
    overline: "Territory",
    title: "{country}: spaces, waters and landscapes",
    intro: "Territorial data is presented according to available sources and does not automatically project contemporary borders onto ancient periods.",
    statuses: {
      ready: "Documented",
      provisional: "Read with context",
      disputed: "Historical debate",
      "research-gap": "To investigate",
    },
    mapping: "Interactive geography",
    places: "Reference places",
    mapIntro: "The map is centered on the country itself. Zoom to reveal more local detail; documented places are layered above the national outline.",
    kinds: {
      capital: "Capital",
      city: "City",
      heritage: "Heritage site",
      "natural-heritage": "Natural heritage",
      region: "Region",
      river: "River",
      mountain: "Mountain",
    },
  },
  fr: {
    country: "ce pays",
    overline: "Territoire",
    title: "{country} : espaces, eaux et paysages",
    intro: "Les données territoriales sont présentées selon les sources disponibles et ne projettent pas automatiquement les frontières contemporaines sur les périodes anciennes.",
    statuses: {
      ready: "Documenté",
      provisional: "À lire avec contexte",
      disputed: "Débat historique",
      "research-gap": "À approfondir",
    },
    mapping: "Géographie interactive",
    places: "Lieux de référence",
    mapIntro: "La carte est centrée sur le pays lui-même. Zoomez pour faire apparaître davantage de détails locaux ; les lieux documentés sont superposés au contour national.",
    kinds: {
      capital: "Capitale",
      city: "Ville",
      heritage: "Site patrimonial",
      "natural-heritage": "Patrimoine naturel",
      region: "Région",
      river: "Fleuve ou rivière",
      mountain: "Relief",
    },
  },
};

function TranslatedInline({ value }) {
  const { lang } = useI18n();
  const translated = useTranslated(value || "");
  if (!value) return null;
  return translated || localizedValue(value, lang);
}

function SourceLink({ source }) {
  const { lang } = useI18n();
  const publisher = useTranslated(source?.publisher || "");
  const title = useTranslated(source?.title || "");
  if (!source?.url) return null;
  const publisherText = publisher || localizedValue(source?.publisher, lang);
  const titleText = title || localizedValue(source?.title, lang) || source.id;
  return (
    <a href={source.url} target="_blank" rel="noreferrer" className="rounded-full border border-gold/25 px-3 py-1 text-[11px] text-gold/85 hover:bg-gold/10">
      {publisherText ? `${publisherText}: ` : ""}{titleText}
    </a>
  );
}

function SourceLinks({ ids = [], sourceMap = new Map() }) {
  const sources = ids.map((id) => sourceMap.get(id)).filter(Boolean);
  if (!sources.length) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {sources.map((source) => <SourceLink key={source.id} source={source} />)}
    </div>
  );
}

function TranslatedText({ value, className = "" }) {
  if (!value) return null;
  return <p className={className}><TranslatedInline value={value} /></p>;
}

function normalizePlace(place = {}) {
  const coordinates = Array.isArray(place.coordinates) ? place.coordinates : null;
  const lon = Number(place.lon ?? place.longitude ?? coordinates?.[0]);
  const lat = Number(place.lat ?? place.latitude ?? coordinates?.[1]);
  return {
    ...place,
    lon,
    lat,
    displayName: place.name || place.label || place.title || "",
  };
}

export function CountryTerritory({ dossier = {}, territory = {}, sourceMap = new Map() }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const sections = territory.sections || dossier.territory_sections || [];
  const places = (territory.places || []).map(normalizePlace).filter((place) => Number.isFinite(place.lon) && Number.isFinite(place.lat));
  const countryName = localizedValue(dossier?.name || dossier?.country || territory.country, lang) || copy.country;

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">{copy.overline}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{copy.title.replace("{country}", countryName)}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-bone/65">{copy.intro}</p>
      </header>

      <section className="rounded-2xl border border-bone/10 bg-bone/[0.02] p-4 md:p-5">
        <p className="overline text-gold">{copy.mapping}</p>
        <h3 className="mt-1 font-serif text-2xl text-bone">{countryName}</h3>
        <p className="mb-4 mt-2 max-w-3xl text-sm leading-relaxed text-bone/55">{copy.mapIntro}</p>
        <CountryShapeMap dossier={dossier} places={places} />

        {places.length > 0 && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((place, index) => (
              <div key={place.id || `territory-place-${index}`} className="rounded-xl border border-bone/10 p-3">
                <p className="text-sm font-medium text-bone"><TranslatedInline value={place.displayName} /></p>
                {place.kind && <p className="mt-1 text-xs text-bone/50">{copy.kinds[place.kind] || place.kind}</p>}
                <SourceLinks ids={place.sources} sourceMap={sourceMap} />
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="grid gap-4">
        {sections.map((section, index) => (
          <article key={section.id || `territory-section-${index}`} className="rounded-2xl border border-bone/10 bg-bone/[0.025] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="font-serif text-2xl text-bone"><TranslatedInline value={section.title || section.name} /></h3>
              {section.status && (
                <span className="rounded-full border border-bone/15 px-2.5 py-1 text-[10px] uppercase tracking-wider text-bone/50">
                  {copy.statuses[section.status] || section.status}
                </span>
              )}
            </div>
            {section.summary && <TranslatedText value={section.summary} className="mt-3 leading-7 text-bone/70" />}
            {section.facts?.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm leading-6 text-bone/65">
                {section.facts.map((fact, i) => <li key={i}>• <TranslatedInline value={fact} /></li>)}
              </ul>
            )}
            <SourceLinks ids={section.sources} sourceMap={sourceMap} />
          </article>
        ))}
      </div>
    </div>
  );
}

export default CountryTerritory;
