import { useMemo, useState } from "react";
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
    mapping: "Interactive geography",
    places: "Reference places",
    mapIntro: "The map is centered on the country itself. Zoom to reveal more local detail; documented places are layered above the national outline.",
    layers: "Thematic layers",
    layersTitle: "Cross-read the territory",
    layersIntro: "These thematic modes connect the map with documented sections of the dossier. Only data with reliable coordinates are drawn geographically; the other layers are explored through their linked topics rather than invented shapes.",
    related: "Linked dossier content",
    filters: "Explore by",
    kinds: { capital: "Capital", city: "City", heritage: "Heritage site", "natural-heritage": "Natural heritage", region: "Region", river: "River", mountain: "Mountain" },
    filterLabels: { peoples:"Peoples", languages:"Languages", "historic-migration":"Historic migration", "contemporary-migration":"Contemporary migration", music:"Music", food:"Food", dance:"Dance", heritage:"Heritage", "urban-scenes":"Urban scenes", biomes:"Biomes", KBA:"Key biodiversity areas", "protected-areas":"Protected areas", "threatened-ecosystems":"Threatened ecosystems", apartheid:"Apartheid", resistance:"Resistance", prisons:"Prisons", courts:"Courts", "memory-sites":"Memory sites", public:"Public media", commercial:"Commercial media", community:"Community media", digital:"Digital media" },
  },
  fr: {
    country: "ce pays",
    overline: "Territoire",
    title: "{country} : espaces, eaux et paysages",
    intro: "Les données territoriales sont présentées selon les sources disponibles et ne projettent pas automatiquement les frontières contemporaines sur les périodes anciennes.",
    mapping: "Géographie interactive",
    places: "Lieux de référence",
    mapIntro: "La carte est centrée sur le pays lui-même. Zoomez pour faire apparaître davantage de détails locaux ; les lieux documentés sont superposés au contour national.",
    layers: "Couches thématiques",
    layersTitle: "Croiser les lectures du territoire",
    layersIntro: "Ces modes thématiques relient la carte aux contenus documentés du dossier. Seules les données disposant de coordonnées fiables sont dessinées géographiquement ; les autres couches sont explorées par leurs contenus associés plutôt que par des formes inventées.",
    related: "Contenus du dossier reliés",
    filters: "Explorer par",
    kinds: { capital: "Capitale", city: "Ville", heritage: "Site patrimonial", "natural-heritage": "Patrimoine naturel", region: "Région", river: "Fleuve ou rivière", mountain: "Relief" },
    filterLabels: { peoples:"Peuples", languages:"Langues", "historic-migration":"Migrations historiques", "contemporary-migration":"Migrations contemporaines", music:"Musique", food:"Cuisine", dance:"Danse", heritage:"Patrimoine", "urban-scenes":"Scènes urbaines", biomes:"Biomes", KBA:"Zones clés de biodiversité", "protected-areas":"Aires protégées", "threatened-ecosystems":"Écosystèmes menacés", apartheid:"Apartheid", resistance:"Résistance", prisons:"Prisons", courts:"Tribunaux", "memory-sites":"Lieux de mémoire", public:"Médias publics", commercial:"Médias commerciaux", community:"Médias communautaires", digital:"Médias numériques" },
  },
};

function TranslatedInline({ value }) { const { lang } = useI18n(); const translated = useTranslated(value || ""); if (!value) return null; return translated || localizedValue(value, lang); }
function SourceLink({ source }) { const { lang } = useI18n(); const publisher = useTranslated(source?.publisher || ""); const title = useTranslated(source?.title || ""); if (!source?.url) return null; const publisherText = publisher || localizedValue(source?.publisher, lang); const titleText = title || localizedValue(source?.title, lang) || source.id; return <a href={source.url} target="_blank" rel="noreferrer" className="rounded-full border border-gold/25 px-3 py-1 text-[11px] text-gold/85 hover:bg-gold/10">{publisherText ? `${publisherText}: ` : ""}{titleText}</a>; }
function SourceLinks({ ids = [], sourceMap = new Map() }) { const sources = ids.map((id) => sourceMap.get(id)).filter(Boolean); if (!sources.length) return null; return <div className="mt-4 flex flex-wrap gap-2">{sources.map((source) => <SourceLink key={source.id} source={source} />)}</div>; }
function TranslatedText({ value, className = "" }) { if (!value) return null; return <p className={className}><TranslatedInline value={value} /></p>; }
function normalizePlace(place = {}) { const coordinates = Array.isArray(place.coordinates) ? place.coordinates : null; const lon = Number(place.lon ?? place.longitude ?? coordinates?.[0]); const lat = Number(place.lat ?? place.latitude ?? coordinates?.[1]); return { ...place, lon, lat, displayName: place.name || place.label || place.title || "" }; }
function contentFrom(container) { if (!container) return []; if (Array.isArray(container)) return container; return [...(container.themes || []), ...(container.items || []), ...(container.sections || []), ...(container.topics || []), ...(container.routes || [])]; }
function mergeById(...collections) { const seen = new Set(); return collections.flat().filter((item, index) => { if (!item) return false; const key = item.id || `${localizedValue(item.title || item.name) || "content"}-${index}`; if (seen.has(key)) return false; seen.add(key); return true; }); }

function ThematicLayerExplorer({ dossier = {}, sourceMap = new Map(), copy }) {
  const layers = Array.isArray(dossier?.interactive?.mapLayers) ? dossier.interactive.mapLayers : [];
  const [activeId, setActiveId] = useState(layers[0]?.id || null);
  const contentIndex = useMemo(() => {
    const map = new Map();
    [dossier.peoples, dossier.peoples_themes, dossier.migrations, dossier.migration_themes, dossier.culture, dossier.culture_themes, dossier.environment, dossier.environment_themes, dossier.institutions_memory, dossier.media, dossier.heritage, dossier.heritage_themes].flatMap(contentFrom).forEach((item) => { if (item?.id) map.set(item.id, item); });
    return map;
  }, [dossier.peoples, dossier.peoples_themes, dossier.migrations, dossier.migration_themes, dossier.culture, dossier.culture_themes, dossier.environment, dossier.environment_themes, dossier.institutions_memory, dossier.media, dossier.heritage, dossier.heritage_themes]);
  if (!layers.length) return null;
  const active = layers.find((layer) => layer.id === activeId) || layers[0];
  const linked = (active.links || []).map((id) => contentIndex.get(id)).filter(Boolean);

  return <section className="rounded-2xl border border-gold/15 bg-gold/[0.025] p-5">
    <p className="overline text-gold">{copy.layers}</p>
    <h3 className="mt-1 font-serif text-2xl text-bone">{copy.layersTitle}</h3>
    <p className="mt-2 max-w-3xl text-sm leading-6 text-bone/55">{copy.layersIntro}</p>
    <div className="mt-5 flex gap-2 overflow-x-auto pb-1">{layers.map((layer) => <button key={layer.id} type="button" aria-pressed={active.id === layer.id} onClick={() => setActiveId(layer.id)} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${active.id === layer.id ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60 hover:text-bone"}`}><TranslatedInline value={layer.title} /></button>)}</div>
    {(active.filters || []).length > 0 && <div className="mt-5"><p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.filters}</p><div className="mt-2 flex flex-wrap gap-2">{active.filters.map((filter) => <span key={filter} className="rounded-full border border-bone/15 bg-black/10 px-3 py-1 text-xs text-bone/70">{copy.filterLabels[filter] || filter}</span>)}</div></div>}
    {linked.length > 0 && <div className="mt-6"><p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{copy.related}</p><div className="mt-3 grid gap-3 md:grid-cols-2">{linked.map((item) => <article key={item.id} className="rounded-xl border border-bone/10 bg-black/10 p-4"><h4 className="font-serif text-lg text-bone"><TranslatedInline value={item.title || item.name || item.label} /></h4>{(item.text || item.summary || item.description) && <TranslatedText value={item.text || item.summary || item.description} className="mt-2 text-sm leading-6 text-bone/65" />}<SourceLinks ids={item.sourceIds || item.sources || []} sourceMap={sourceMap} /></article>)}</div></div>}
  </section>;
}

export function CountryTerritory({ dossier = {}, territory = {}, sourceMap = new Map() }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const sections = useMemo(() => mergeById(territory.sections || [], dossier.territory_sections || [], contentFrom(dossier.territory), contentFrom(dossier.territory_themes)), [territory.sections, dossier.territory_sections, dossier.territory, dossier.territory_themes]);
  const places = (territory.places || []).map(normalizePlace).filter((place) => Number.isFinite(place.lon) && Number.isFinite(place.lat));
  const countryName = localizedValue(dossier?.name || dossier?.country || territory.country, lang) || copy.country;

  return <div className="space-y-8">
    <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6"><p className="overline text-gold">{copy.overline}</p><h2 className="mt-2 font-serif text-3xl text-bone">{copy.title.replace("{country}", countryName)}</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-bone/65">{copy.intro}</p></header>
    <section className="rounded-2xl border border-bone/10 bg-bone/[0.02] p-4 md:p-5"><p className="overline text-gold">{copy.mapping}</p><h3 className="mt-1 font-serif text-2xl text-bone">{countryName}</h3><p className="mb-4 mt-2 max-w-3xl text-sm leading-relaxed text-bone/55">{copy.mapIntro}</p><CountryShapeMap dossier={dossier} places={places} />{places.length > 0 && <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{places.map((place, index) => <div key={place.id || `territory-place-${index}`} className="rounded-xl border border-bone/10 p-3"><p className="text-sm font-medium text-bone"><TranslatedInline value={place.displayName} /></p>{place.kind && <p className="mt-1 text-xs text-bone/50">{copy.kinds[place.kind] || place.kind}</p>}<SourceLinks ids={place.sourceIds || place.sources || []} sourceMap={sourceMap} /></div>)}</div>}</section>
    <ThematicLayerExplorer dossier={dossier} sourceMap={sourceMap} copy={copy} />
    <div className="grid gap-4">{sections.map((section, index) => <article key={section.id || `territory-section-${index}`} className="rounded-2xl border border-bone/10 bg-bone/[0.025] p-5"><h3 className="font-serif text-2xl text-bone"><TranslatedInline value={section.title || section.name} /></h3>{(section.summary || section.text || section.context) && <TranslatedText value={section.summary || section.text || section.context} className="mt-3 leading-7 text-bone/70" />}{section.facts?.length > 0 && <ul className="mt-4 space-y-2 text-sm leading-6 text-bone/65">{section.facts.map((fact, i) => <li key={i}>• <TranslatedInline value={fact} /></li>)}</ul>}<SourceLinks ids={section.sourceIds || section.sources || []} sourceMap={sourceMap} /></article>)}</div>
  </div>;
}

export default CountryTerritory;
