import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { fetchCivilization, fetchCivilizationFigures } from "../lib/api";
import { useTranslated } from "../lib/useTranslated";
import { localizedValue } from "../lib/contentSort";
import { useI18n } from "../i18n";
import { ArrowLeft } from "lucide-react";
import { SmartImage } from "../components/SmartImage";

const COPY = {
  en: {
    notFound: "Civilization not found.", unknownLocation: "Location not documented",
    overview: "Overview", territory: "Territory & expansion", institutions: "Institutions", trade: "Trade networks",
    languages: "Languages", religions: "Religions", conflicts: "Conflicts & turning points", legacy: "Legacy",
    sites: "Capitals & major sites", relations: "Relations with other civilizations", timeline: "Historical timeline",
    sources: "Sources & bibliography", sourceNote: "Sources supporting this section", polityType: "Political form",
    modernLocations: "Present-day territories", relationsEmpty: "No relation documented yet.", mediaNote: "Media appears only when provenance and rights are documented.",
    exploreLabel: "Continue exploring", compare: "Compare", timelineLink: "Timeline", peoples: "Peoples", search: "Search AfroAtlas",
  },
  fr: {
    notFound: "Civilisation introuvable.", unknownLocation: "Localisation non documentée",
    overview: "Vue d’ensemble", territory: "Territoire et expansion", institutions: "Institutions", trade: "Réseaux commerciaux",
    languages: "Langues", religions: "Religions", conflicts: "Conflits et tournants", legacy: "Héritages",
    sites: "Capitales et sites majeurs", relations: "Relations avec d’autres civilisations", timeline: "Chronologie historique",
    sources: "Sources et bibliographie", sourceNote: "Sources de cette section", polityType: "Forme politique",
    modernLocations: "Territoires actuels", relationsEmpty: "Aucune relation documentée pour le moment.", mediaNote: "Les médias ne s’affichent que lorsque provenance et droits sont documentés.",
    exploreLabel: "Poursuivre l’exploration", compare: "Comparer", timelineLink: "Chronologie", peoples: "Peuples", search: "Rechercher dans AfroAtlas",
  },
};

const fmt = (y, t) => {
  if (!Number.isFinite(y)) return "—";
  return y < 0 ? `${Math.abs(y)} ${t("date.bce")}` : `${y} ${t("date.ce")}`;
};

function LocalizedText({ value, as: Tag = "span", className = "" }) {
  const { lang } = useI18n();
  const translated = useTranslated(value || "");
  if (!value && !translated) return null;
  return <Tag className={className}>{translated || localizedValue(value, lang)}</Tag>;
}

function LocalizedImage({ alt, credit, ...props }) {
  const { lang } = useI18n();
  const translatedAlt = useTranslated(alt || "");
  const translatedCredit = useTranslated(credit || "");
  return <SmartImage {...props} alt={translatedAlt || localizedValue(alt, lang)} credit={translatedCredit || localizedValue(credit, lang)} />;
}

function SourceEntry({ source, compact = false }) {
  const { lang } = useI18n();
  const isRecord = source && typeof source === "object" && !Array.isArray(source);
  const rawTitle = isRecord ? (source.title || source.name || source.label || source.text || "") : source;
  const rawPublisher = isRecord ? (source.publisher || source.institution || source.author || "") : "";
  const title = useTranslated(rawTitle || "") || localizedValue(rawTitle, lang);
  const publisher = useTranslated(rawPublisher || "") || localizedValue(rawPublisher, lang);
  const year = isRecord ? source.year : null;
  const url = isRecord ? (source.url || source.source_url || source.link || "") : "";
  if (!title && !publisher && !year) return null;
  const body = <>{title || url}{(publisher || year) && <span className="text-bone/45">{title || url ? " — " : ""}{publisher}{publisher && year ? ", " : ""}{year || ""}</span>}</>;
  return compact ? (url ? <a href={url} target="_blank" rel="noreferrer" className="text-gold/75 hover:text-gold">{body}</a> : <span>{body}</span>) : <li>{url ? <a href={url} target="_blank" rel="noreferrer" className="text-gold/85 underline underline-offset-2 hover:text-gold">{body}</a> : body}</li>;
}

const Section = ({ overline, title, children, sources = [] }) => {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  return (
    <section className="py-10 border-t border-[#2A2421]">
      <p className="overline">{overline}</p>
      <h2 className="font-serif text-3xl md:text-4xl text-bone mt-3">{title}</h2>
      <div className="mt-6 text-bone/80 leading-relaxed font-light text-base md:text-lg max-w-4xl">{children}</div>
      {sources.length > 0 && <div className="mt-5 max-w-4xl border-l border-gold/25 pl-4 text-xs leading-5 text-bone/45"><span className="mr-2 uppercase tracking-[0.12em] text-bone/35">{copy.sourceNote}:</span>{sources.map((source, index) => <span key={source.id || index}>{index > 0 ? " · " : ""}<SourceEntry source={source} compact /></span>)}</div>}
    </section>
  );
};

function TagList({ items = [] }) {
  return <div className="flex flex-wrap gap-2">{items.map((item, index) => <span key={`${localizedValue(item?.name || item, "en")}-${index}`} className="rounded-full border border-bone/10 bg-bone/[0.025] px-3 py-2 text-sm text-bone/70"><LocalizedText value={item?.name || item} />{item?.note && <span className="block mt-1 text-xs text-bone/45"><LocalizedText value={item.note} /></span>}</span>)}</div>;
}

const CivilizationDetail = () => {
  const { t, lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const { id } = useParams();
  const [c, setC] = useState(null);
  const [err, setErr] = useState(null);
  const [civFigures, setCivFigures] = useState([]);

  useEffect(() => { fetchCivilization(id).then(setC).catch((e) => setErr(e.message)); }, [id]);
  useEffect(() => { fetchCivilizationFigures(id).then(setCivFigures).catch(() => setCivFigures([])); }, [id]);

  const mapPoints = useMemo(() => {
    if (!c) return [];
    const points = [];
    if (Array.isArray(c.coords) && c.coords.length >= 2) points.push({ name: localizedValue(c.name, lang), coords: c.coords, kind: copy.overview });
    (c.capitals || []).forEach((item) => Array.isArray(item.coords) && points.push({ name: item.name, coords: item.coords, kind: copy.sites }));
    (c.major_sites || []).forEach((item) => Array.isArray(item.coords) && points.push({ name: item.name, coords: item.coords, kind: copy.sites }));
    const seen = new Set();
    return points.filter((p) => { const key = `${p.coords[0]}:${p.coords[1]}:${p.name}`; if (seen.has(key)) return false; seen.add(key); return true; });
  }, [c, lang, copy.overview, copy.sites]);

  if (err) return <div className="pt-32 text-center text-bone/60">{copy.notFound}</div>;
  if (!c) return <div className="pt-32 text-center text-bone/40 overline">{t("common.loading")}</div>;

  const coords = Array.isArray(c.coords) && c.coords.length >= 2 ? c.coords : [4, 19];
  const displayName = localizedValue(c.name, lang);
  const displaySummary = localizedValue(c.summary, lang);
  const sources = Array.isArray(c.sources) ? c.sources : [];
  const exploreQuery = encodeURIComponent(displayName);

  return (
    <div data-testid="civilization-detail">
      <div className="relative h-[68vh] min-h-[500px] overflow-hidden">
        <LocalizedImage src={c.image_url} wikipediaTitle={c.wikipedia_title} alt={c.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover animate-slow-zoom" credit={c.image_credit} sourceUrl={c.image_source_url} />
        <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/75 to-ebony/35" />
        <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 h-full flex flex-col justify-end pb-14">
          <Link to="/civilizations" className="text-bone/60 hover:text-gold text-xs uppercase tracking-[0.2em] flex items-center gap-2 mb-6"><ArrowLeft size={14} /> {t("common.back.civilizations")}</Link>
          <p className="overline">{typeof c.region === "string" ? t(`region.${c.region}`) : <LocalizedText value={c.region} />}</p>
          <LocalizedText value={c.name} as="h1" className="font-serif text-5xl md:text-7xl text-bone mt-3 leading-[0.95] tracking-tight" />
          <div className="mt-4 flex flex-wrap items-center gap-3"><p className="text-gold text-sm uppercase tracking-[0.2em]">{fmt(c.era_start, t)} — {fmt(c.era_end, t)}</p>{c.polity_type && <span className="rounded-full border border-bone/15 px-3 py-1 text-xs text-bone/60"><LocalizedText value={c.polity_type} /></span>}</div>
          {displaySummary && <p className="text-bone/80 mt-6 max-w-3xl text-lg font-light leading-relaxed">{displaySummary}</p>}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 pb-24">
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="overflow-hidden rounded-2xl border border-bone/10 min-h-[430px]">
            <MapContainer center={coords} zoom={4} className="w-full h-[430px]" style={{ background: "#0A0908" }}>
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png" attribution='&copy; OSM &copy; CARTO' subdomains="abcd" />
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png" subdomains="abcd" opacity={0.65} />
              {mapPoints.map((point, index) => <CircleMarker key={`${point.name}-${index}`} center={point.coords} radius={index === 0 ? 9 : 6} pathOptions={{ color: "#D4AF37", fillColor: "#D4AF37", fillOpacity: index === 0 ? 0.85 : 0.55, weight: 1.5 }}><Popup><strong>{point.name}</strong><br />{point.kind}</Popup></CircleMarker>)}
            </MapContainer>
          </div>
          <div className="rounded-2xl border border-bone/10 bg-bone/[0.02] p-6 space-y-7">
            <div><p className="overline">{copy.polityType}</p><p className="mt-2 font-serif text-2xl text-bone"><LocalizedText value={c.polity_type || "—"} /></p></div>
            <div><p className="overline">{copy.modernLocations}</p><div className="mt-3 flex flex-wrap gap-2">{(c.modern_locations || []).map((location, i) => <span key={i} className="rounded-full border border-bone/10 px-3 py-1.5 text-xs text-bone/65"><LocalizedText value={location} /></span>)}</div></div>
            <div><p className="overline">Stable ID</p><p className="mt-2 font-mono text-sm text-bone/55">{c.id}</p></div>
            <p className="border-t border-bone/10 pt-5 text-xs leading-5 text-bone/40">{copy.mediaNote}</p>
          </div>
        </div>

        {c.territory_and_expansion && <Section overline={copy.overview} title={copy.territory} sources={sources}><LocalizedText value={c.territory_and_expansion} /></Section>}
        {c.political_structure && <Section overline={copy.overview} title={t("civdetail.h2.political")} sources={sources}><LocalizedText value={c.political_structure} />{c.institutions && <div className="mt-6 rounded-xl border border-bone/10 bg-bone/[0.02] p-5"><p className="overline text-gold">{copy.institutions}</p><p className="mt-3 text-base leading-7 text-bone/70"><LocalizedText value={c.institutions} /></p></div>}</Section>}
        {c.economy_and_trade && <Section overline={t("section.economy")} title={t("civdetail.h2.economy")} sources={sources}><LocalizedText value={c.economy_and_trade} />{c.trade_networks && <div className="mt-6 rounded-xl border border-bone/10 bg-bone/[0.02] p-5"><p className="overline text-gold">{copy.trade}</p><p className="mt-3 text-base leading-7 text-bone/70"><LocalizedText value={c.trade_networks} /></p></div>}</Section>}

        {(c.languages?.length > 0 || c.religions?.length > 0) && <section className="py-10 border-t border-[#2A2421]"><div className="grid gap-8 md:grid-cols-2"><div><p className="overline">{copy.languages}</p><h2 className="font-serif text-3xl text-bone mt-3">{copy.languages}</h2><div className="mt-5"><TagList items={c.languages || []} /></div></div><div><p className="overline">{copy.religions}</p><h2 className="font-serif text-3xl text-bone mt-3">{copy.religions}</h2><div className="mt-5"><TagList items={c.religions || []} /></div></div></div><div className="mt-5 text-xs text-bone/40">{copy.sourceNote}: {sources.map((s, i) => <span key={s.id || i}>{i ? " · " : ""}<SourceEntry source={s} compact /></span>)}</div></section>}

        {c.science_and_knowledge && <Section overline={t("section.science")} title={t("civdetail.h2.science")} sources={sources}><LocalizedText value={c.science_and_knowledge} /></Section>}
        {c.art_and_culture && <Section overline={t("section.art")} title={t("civdetail.h2.art")} sources={sources}><LocalizedText value={c.art_and_culture} /></Section>}

        {(c.capitals?.length > 0 || c.major_sites?.length > 0) && <Section overline={copy.overview} title={copy.sites} sources={sources}><div className="grid gap-4 md:grid-cols-2">{[...(c.capitals || []), ...(c.major_sites || [])].map((site, index) => <div key={`${site.name}-${index}`} className="rounded-xl border border-bone/10 bg-bone/[0.02] p-5"><p className="font-serif text-xl text-bone">{site.name}</p>{site.period && <p className="mt-1 text-xs text-gold"><LocalizedText value={site.period} /></p>}{site.note && <p className="mt-3 text-sm leading-6 text-bone/60"><LocalizedText value={site.note} /></p>}</div>)}</div></Section>}

        {c.conflicts?.length > 0 && <Section overline={copy.overview} title={copy.conflicts} sources={sources}><div className="space-y-4">{c.conflicts.map((item, index) => <div key={`${item.period}-${index}`} className="rounded-xl border border-bone/10 p-5"><div className="flex flex-wrap items-baseline gap-3"><p className="font-serif text-xl text-bone"><LocalizedText value={item.title} /></p><span className="text-xs text-gold">{item.period}</span></div><p className="mt-3 text-sm leading-6 text-bone/65"><LocalizedText value={item.summary} /></p></div>)}</div></Section>}

        {c.relations?.length > 0 && <Section overline={copy.overview} title={copy.relations} sources={sources}><div className="grid gap-4 md:grid-cols-2">{c.relations.map((rel, index) => { const relName = rel.civilizationId ? null : rel.name; const card = <div className="rounded-xl border border-bone/10 bg-bone/[0.02] p-5 h-full"><p className="overline text-gold"><LocalizedText value={rel.type} /></p><p className="mt-2 font-serif text-xl text-bone">{rel.civilizationId || <LocalizedText value={relName} />}</p><p className="mt-3 text-sm leading-6 text-bone/60"><LocalizedText value={rel.summary} /></p></div>; return rel.civilizationId ? <Link key={index} to={`/civilization/${rel.civilizationId}`} className="block hover:border-gold/40">{card}</Link> : <div key={index}>{card}</div>; })}</div></Section>}

        {c.legacy && <Section overline={copy.overview} title={copy.legacy} sources={sources}><LocalizedText value={c.legacy} /></Section>}

        {c.timeline?.length > 0 && <Section overline={t("section.timeline")} title={copy.timeline} sources={sources}><ol className="space-y-5 mt-4">{c.timeline.map((item, i) => <li key={item.id || i} className="grid grid-cols-[96px_1fr] gap-5 items-start"><span className="font-serif text-gold text-xl">{fmt(item.year, t)}</span><LocalizedText value={item.event} as="span" className="text-bone/80" /></li>)}</ol></Section>}

        {c.sources?.length > 0 && <Section overline={t("common.sources")} title={copy.sources}><ul className="list-disc pl-5 space-y-3 text-bone/70">{c.sources.map((source, index) => <SourceEntry key={(source && typeof source === "object" && source.id) || index} source={source} />)}</ul></Section>}

        {civFigures.length > 0 && <Section overline={t("civdetail.overline.notableFigures")} title={t("civdetail.h2.notableFigures")}><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">{civFigures.map((f) => <Link key={f.id} to={`/figure/${f.id}`} className="museum-card p-5 group block"><p className="overline text-[0.6rem]"><LocalizedText value={f.category} /> · <LocalizedText value={f.era} /></p><LocalizedText value={f.name} as="p" className="font-serif text-xl text-bone mt-2 group-hover:text-gold transition-colors" /><LocalizedText value={f.summary} as="p" className="text-bone/70 text-sm mt-2 line-clamp-2 font-light" /></Link>)}</div></Section>}

        <section className="py-10 border-t border-[#2A2421]" data-testid="civilization-explore-links"><p className="overline">{copy.exploreLabel}</p><div className="mt-5 grid gap-4 md:grid-cols-4"><Link to="/compare" className="rounded-xl border border-gold/20 bg-gold/[0.04] p-5 hover:border-gold/50"><p className="font-serif text-xl text-bone">{copy.compare}</p></Link><Link to={`/timeline?q=${exploreQuery}`} className="rounded-xl border border-bone/10 p-5 hover:border-gold/40"><p className="font-serif text-xl text-bone">{copy.timelineLink}</p></Link><Link to={`/people?q=${exploreQuery}`} className="rounded-xl border border-bone/10 p-5 hover:border-gold/40"><p className="font-serif text-xl text-bone">{copy.peoples}</p></Link><Link to={`/search?q=${exploreQuery}`} className="rounded-xl border border-bone/10 p-5 hover:border-gold/40"><p className="font-serif text-xl text-bone">{copy.search}</p></Link></div></section>
      </div>
    </div>
  );
};

export default CivilizationDetail;
