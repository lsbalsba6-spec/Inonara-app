import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { fetchCivilizations } from "../lib/api";
import { useI18n } from "../i18n";
import { localizedValue, searchableText, sortAlphabetically } from "../lib/contentSort";
import { useTranslated } from "../lib/useTranslated";
import { SmartImage } from "../components/SmartImage";

const fmt = (y, t) => (y < 0 ? `${Math.abs(y)} ${t("date.bce")}` : `${y} ${t("date.ce")}`);
const PERIODS = [
  ["ancient", -4000, 500],
  ["medieval", 500, 1500],
  ["earlyModern", 1500, 1800],
  ["modern", 1800, 2100],
];

const COPY = {
  en: {
    typeAll: "All political forms", periodAll: "All periods", sortChronology: "Chronology", sortName: "Name",
    mapOverline: "Spatial reading", mapTitle: "Centres and historical sites", mapCopy: "Markers locate documented centres, not precise historical borders.",
    timelineOverline: "Chronological reading", timelineTitle: "Visible civilizations through time", compare: "Compare civilizations",
    filters: "Explore the corpus", type: "Political form", period: "Period", sort: "Sort",
    periods: { ancient: "Ancient", medieval: "Medieval", earlyModern: "Early modern", modern: "Modern / contemporary" },
    connections: {
      overline: "Keep exploring", title: "Put civilizations back into their wider world",
      body: "A civilization is not an isolated card. Continue through chronology, peoples, territories and diasporas to see how places and communities connect across time.",
      links: [["/timeline", "Timeline", "Place political formations, events and historical figures on a shared chronology."], ["/people", "Peoples", "Follow communities, languages, movements and cultural continuities across borders."], ["/countries", "Countries", "Open country dossiers to connect territory, history, heritage and sources."], ["/compare", "Compare", "Read two political formations side by side across the same fields."]],
    },
  },
  fr: {
    typeAll: "Toutes les formes politiques", periodAll: "Toutes les périodes", sortChronology: "Chronologie", sortName: "Nom",
    mapOverline: "Lecture spatiale", mapTitle: "Centres et sites historiques", mapCopy: "Les marqueurs localisent des centres documentés, pas des frontières historiques précises.",
    timelineOverline: "Lecture chronologique", timelineTitle: "Civilisations visibles dans le temps", compare: "Comparer les civilisations",
    filters: "Explorer le corpus", type: "Forme politique", period: "Période", sort: "Tri",
    periods: { ancient: "Ancienne", medieval: "Médiévale", earlyModern: "Moderne ancienne", modern: "Moderne / contemporaine" },
    connections: {
      overline: "Poursuivre l’exploration", title: "Replacer les civilisations dans leur monde",
      body: "Une civilisation n’est pas une carte isolée. Poursuis par la chronologie, les peuples, les territoires et les diasporas pour voir comment lieux et communautés se relient dans le temps.",
      links: [["/timeline", "Chronologie", "Replace formations politiques, événements et personnalités dans une chronologie commune."], ["/people", "Peuples", "Suis communautés, langues, mouvements et continuités culturelles au-delà des frontières."], ["/countries", "Pays", "Ouvre les dossiers pays pour relier territoire, histoire, patrimoine et sources."], ["/compare", "Comparer", "Lis deux formations politiques côte à côte avec les mêmes champs."]],
    },
  },
};

function LocalizedText({ value, as: Tag = "span", className = "" }) {
  const translated = useTranslated(value || "");
  if (!value && !translated) return null;
  return <Tag className={className}>{translated || ""}</Tag>;
}

function LocalizedImage({ alt, ...props }) {
  const translatedAlt = useTranslated(alt || "");
  return <SmartImage {...props} alt={translatedAlt || ""} />;
}

const overlaps = (civ, start, end) => Number(civ.era_end) >= start && Number(civ.era_start) <= end;

const Civilizations = () => {
  const { t, lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const [searchParams, setSearchParams] = useSearchParams();
  const [civs, setCivs] = useState([]);
  const [region, setRegion] = useState("all");
  const [type, setType] = useState("all");
  const [period, setPeriod] = useState("all");
  const [sort, setSort] = useState("chronology");
  const [query, setQuery] = useState(() => searchParams.get("q") || "");

  useEffect(() => { fetchCivilizations().then(setCivs).catch(() => {}); }, []);
  useEffect(() => {
    const urlQuery = searchParams.get("q") || "";
    setQuery((current) => current === urlQuery ? current : urlQuery);
  }, [searchParams]);

  const updateQuery = (value) => {
    setQuery(value);
    const next = new URLSearchParams(searchParams);
    if (value.trim()) next.set("q", value);
    else next.delete("q");
    setSearchParams(next, { replace: true });
  };

  const regions = useMemo(() => [...new Set(civs.map((c) => c.region).filter((value) => typeof value === "string"))].sort(), [civs]);
  const types = useMemo(() => {
    const byKey = new Map();
    civs.forEach((c) => {
      const key = localizedValue(c.polity_type, "en");
      if (key) byKey.set(key, localizedValue(c.polity_type, lang));
    });
    return [...byKey.entries()].sort((a, b) => a[1].localeCompare(b[1], lang));
  }, [civs, lang]);

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(lang === "fr" ? "fr" : "en");
    const periodDef = PERIODS.find(([key]) => key === period);
    const filtered = civs.filter((c) => {
      const matchesRegion = region === "all" || c.region === region;
      const typeKey = localizedValue(c.polity_type, "en");
      const matchesType = type === "all" || typeKey === type;
      const matchesPeriod = !periodDef || overlaps(c, periodDef[1], periodDef[2]);
      const haystack = searchableText(c.name, c.summary, c.region, c.alt_names, c.polity_type, c.legacy, c.languages, c.religions, c.capitals, c.major_sites);
      return matchesRegion && matchesType && matchesPeriod && (!needle || haystack.includes(needle));
    });
    if (sort === "name") return sortAlphabetically(filtered, "name", lang);
    return [...filtered].sort((a, b) => (a.era_start ?? 0) - (b.era_start ?? 0) || localizedValue(a.name, lang).localeCompare(localizedValue(b.name, lang), lang));
  }, [civs, region, type, period, query, sort, lang]);

  const earliest = civs.length ? Math.min(...civs.map((c) => c.era_start).filter(Number.isFinite)) : null;
  const latest = civs.length ? Math.max(...civs.map((c) => c.era_end).filter(Number.isFinite)) : null;
  const mapItems = visible.filter((c) => Array.isArray(c.coords) && c.coords.length >= 2);

  return (
    <div className="pt-32 pb-24 max-w-[1600px] mx-auto px-6 md:px-10" data-testid="civilizations-page">
      <p className="overline">{t("page.civilizations.overline")}</p>
      <h1 className="font-serif text-5xl md:text-6xl text-bone mt-3 tracking-tight" data-testid="civilizations-title">{t("page.civilizations.title")}</h1>
      <p className="text-bone/70 max-w-3xl mt-6 font-light leading-relaxed">{t("page.civilizations.lead")}</p>

      <section className="mt-10 grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-gold/20 bg-gold/[0.05] p-5"><p className="overline text-gold">{t("civilizations.corpus.label")}</p><p className="mt-2 font-serif text-3xl text-bone">{civs.length}</p><p className="mt-1 text-xs text-bone/50">{t("civilizations.corpus.copy")}</p></div>
        <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5 md:col-span-2"><p className="overline">{t("civilizations.span.label")}</p><p className="mt-2 font-serif text-xl text-bone">{earliest !== null ? fmt(earliest, t) : "—"} → {latest !== null ? fmt(latest, t) : "—"}</p><p className="mt-1 text-xs text-bone/50">{t("civilizations.span.copy")}</p></div>
        <Link to="/compare" className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5 transition hover:border-gold/40"><p className="overline">{t("civilizations.explore.label")}</p><p className="mt-2 font-serif text-xl text-bone">{copy.compare}</p><p className="mt-1 text-xs text-bone/50">{t("civilizations.explore.copy")}</p></Link>
      </section>

      <section className="mt-10 rounded-2xl border border-bone/10 bg-bone/[0.02] p-5" data-testid="civilizations-filters">
        <p className="overline text-gold">{copy.filters}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <input value={query} onChange={(event) => updateQuery(event.target.value)} placeholder={t("civilizations.search.placeholder")} aria-label={t("civilizations.search.placeholder")} className="rounded-xl border border-bone/15 bg-ebony px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50 md:col-span-2" />
          <select value={type} onChange={(e) => setType(e.target.value)} aria-label={copy.type} className="rounded-xl border border-bone/15 bg-ebony px-4 py-3 text-sm text-bone outline-none"><option value="all">{copy.typeAll}</option>{types.map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select>
          <select value={period} onChange={(e) => setPeriod(e.target.value)} aria-label={copy.period} className="rounded-xl border border-bone/15 bg-ebony px-4 py-3 text-sm text-bone outline-none"><option value="all">{copy.periodAll}</option>{PERIODS.map(([key]) => <option key={key} value={key}>{copy.periods[key]}</option>)}</select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label={copy.sort} className="rounded-xl border border-bone/15 bg-ebony px-4 py-3 text-sm text-bone outline-none"><option value="chronology">{copy.sortChronology}</option><option value="name">{copy.sortName}</option></select>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          <button type="button" onClick={() => setRegion("all")} aria-pressed={region === "all"} className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs ${region === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>{t("civilizations.filter.allRegions")}</button>
          {regions.map((item) => <button key={item} type="button" onClick={() => setRegion(item)} aria-pressed={region === item} className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs ${region === item ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>{t(`region.${item}`)}</button>)}
        </div>
        <p className="mt-4 text-xs text-bone/45">{visible.length} {visible.length > 1 ? t("civilizations.results.many") : t("civilizations.results.one")}</p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-2xl border border-bone/10 bg-bone/[0.02] min-h-[420px]" data-testid="civilizations-map">
          <MapContainer center={[4, 19]} zoom={3} minZoom={2} className="h-[420px] w-full" style={{ background: "#0A0908" }}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png" attribution='&copy; OSM &copy; CARTO' subdomains="abcd" />
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png" subdomains="abcd" opacity={0.65} />
            {mapItems.map((c) => <CircleMarker key={c.id} center={c.coords} radius={7} pathOptions={{ color: "#D4AF37", fillColor: "#D4AF37", fillOpacity: 0.8, weight: 1.5 }}><Popup><strong>{localizedValue(c.name, lang)}</strong><br />{fmt(c.era_start, t)} — {fmt(c.era_end, t)}</Popup></CircleMarker>)}
          </MapContainer>
        </div>
        <div className="rounded-2xl border border-bone/10 bg-bone/[0.02] p-6">
          <p className="overline text-gold">{copy.mapOverline}</p><h2 className="mt-2 font-serif text-3xl text-bone">{copy.mapTitle}</h2><p className="mt-3 text-sm leading-6 text-bone/55">{copy.mapCopy}</p>
          <div className="mt-7 border-t border-bone/10 pt-6"><p className="overline text-gold">{copy.timelineOverline}</p><h3 className="mt-2 font-serif text-2xl text-bone">{copy.timelineTitle}</h3>
            <div className="mt-4 max-h-[250px] space-y-3 overflow-y-auto pr-2">{visible.slice(0, 12).map((c) => <Link key={c.id} to={`/civilization/${c.id}`} className="flex items-start justify-between gap-4 border-b border-bone/10 pb-3"><span className="text-sm text-bone/80">{localizedValue(c.name, lang)}</span><span className="shrink-0 text-[11px] text-gold">{fmt(c.era_start, t)} → {fmt(c.era_end, t)}</span></Link>)}</div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {visible.map((c) => <Link key={c.id} to={`/civilization/${c.id}`} data-testid={`civ-card-${c.id}`} className="museum-card relative group overflow-hidden min-h-[430px]">
          <LocalizedImage src={c.image_url} wikipediaTitle={c.wikipedia_title} alt={c.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover opacity-45 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-65" credit={c.image_credit} sourceUrl={c.image_source_url} />
          <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/80 to-ebony/25" />
          <div className="relative h-full min-h-[430px] p-7 flex flex-col justify-end"><p className="overline text-[0.65rem]">{t(`region.${c.region}`)}</p><LocalizedText value={c.name} as="h3" className="font-serif text-3xl text-bone mt-3 leading-tight" /><LocalizedText value={c.polity_type} as="p" className="mt-2 text-xs uppercase tracking-[0.15em] text-bone/50" /><p className="text-gold text-xs uppercase tracking-[0.2em] mt-2">{fmt(c.era_start, t)} — {fmt(c.era_end, t)}</p><LocalizedText value={c.summary} as="p" className="text-bone/70 text-sm font-light mt-4 line-clamp-4" /></div>
        </Link>)}
      </div>
      {!visible.length && <div className="mt-8 rounded-xl border border-bone/10 p-6 text-bone/60">{t("civilizations.empty")}</div>}

      <section className="mt-16 border-t border-bone/10 pt-12" data-testid="civilizations-connections"><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="overline text-gold">{copy.connections.overline}</p><h2 className="mt-3 max-w-xl font-serif text-3xl md:text-4xl text-bone">{copy.connections.title}</h2><p className="mt-4 max-w-xl text-sm leading-7 text-bone/60">{copy.connections.body}</p></div><div className="grid gap-px overflow-hidden border border-bone/10 bg-bone/10 sm:grid-cols-2">{copy.connections.links.map(([to, title, body]) => <Link key={to} to={to} className="group bg-ebony p-5 transition hover:bg-bone/[0.035]"><h3 className="font-serif text-xl text-bone transition group-hover:text-gold">{title}</h3><p className="mt-2 text-xs leading-6 text-bone/55">{body}</p></Link>)}</div></div></section>
    </div>
  );
};

export default Civilizations;
