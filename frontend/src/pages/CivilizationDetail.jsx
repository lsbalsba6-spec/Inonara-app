import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import { fetchCivilization, fetchCivilizationFigures } from "../lib/api";
import { useTranslated } from "../lib/useTranslated";
import { localizedText } from "../lib/contentSort";
import { useI18n } from "../i18n";
import { ArrowLeft } from "lucide-react";
import { SmartImage } from "../components/SmartImage";

const COPY = {
  en: {
    notFound: "Civilization not found.",
    unknownLocation: "Location not documented",
  },
  fr: {
    notFound: "Civilisation introuvable.",
    unknownLocation: "Localisation non documentée",
  },
};

const fmt = (y, t) => {
  if (!Number.isFinite(y)) return "—";
  return y < 0 ? `${Math.abs(y)} ${t("date.bce")}` : `${y} ${t("date.ce")}`;
};

function LocalizedText({ value, as: Tag = "span", className = "" }) {
  const translated = useTranslated(value || "");
  if (!value && !translated) return null;
  return <Tag className={className}>{translated || localizedText(value)}</Tag>;
}

function LocalizedImage({ alt, ...props }) {
  const translatedAlt = useTranslated(alt || "");
  return <SmartImage {...props} alt={translatedAlt || localizedText(alt)} />;
}

const Section = ({ overline, title, children }) => (
  <section className="py-10 border-t border-[#2A2421]" data-testid={`section-${String(overline).toLowerCase().replace(/[^a-z0-9]/g, "-")}`}>
    <p className="overline">{overline}</p>
    <h2 className="font-serif text-3xl md:text-4xl text-bone mt-3">{title}</h2>
    <div className="mt-6 text-bone/80 leading-relaxed font-light text-base md:text-lg max-w-3xl">{children}</div>
  </section>
);

const CivilizationDetail = () => {
  const { t, lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const { id } = useParams();
  const [c, setC] = useState(null);
  const [err, setErr] = useState(null);
  const [civFigures, setCivFigures] = useState([]);
  useEffect(() => { fetchCivilization(id).then(setC).catch((e) => setErr(e.message)); }, [id]);
  useEffect(() => { fetchCivilizationFigures(id).then(setCivFigures).catch(() => setCivFigures([])); }, [id]);
  const tSummary = useTranslated(c?.summary || "");

  if (err) return <div className="pt-32 text-center text-bone/60">{copy.notFound}</div>;
  if (!c) return <div className="pt-32 text-center text-bone/40 overline">{t("common.loading")}</div>;

  const coords = Array.isArray(c.coords) && c.coords.length >= 2 ? c.coords : null;

  return (
    <div data-testid="civilization-detail">
      <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <LocalizedImage src={c.image_url} wikipediaTitle={c.wikipedia_title} alt={c.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover animate-slow-zoom" credit={c.image_credit} sourceUrl={c.image_source_url} />
        <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/60 to-ebony/30" />
        <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 h-full flex flex-col justify-end pb-16">
          <Link to="/civilizations" className="text-bone/60 hover:text-gold text-xs uppercase tracking-[0.2em] flex items-center gap-2 mb-6" data-testid="back-to-civilizations">
            <ArrowLeft size={14} /> {t("common.back.civilizations")}
          </Link>
          <p className="overline">{typeof c.region === "string" ? t(`region.${c.region}`) : <LocalizedText value={c.region} />}</p>
          <LocalizedText value={c.name} as="h1" className="font-serif text-5xl md:text-7xl text-bone mt-3 leading-[0.95] tracking-tight" />
          <p className="text-gold text-sm uppercase tracking-[0.25em] mt-4">{fmt(c.era_start, t)} — {fmt(c.era_end, t)}</p>
          <p className="text-bone/80 mt-6 max-w-2xl text-lg font-light leading-relaxed">{tSummary || localizedText(c.summary)}</p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 pb-24">
        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2 aspect-[16/9]">
            {coords ? (
              <MapContainer center={coords} zoom={4} className="w-full h-full" style={{ background: "#0A0908" }}>
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                  attribution='&copy; OSM &copy; CARTO'
                  subdomains="abcd"
                />
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
                  subdomains="abcd"
                  opacity={0.6}
                />
                <CircleMarker center={coords} radius={10} pathOptions={{ color: "#D4AF37", fillColor: "#D4AF37", fillOpacity: 0.85, weight: 2 }} />
              </MapContainer>
            ) : (
              <div className="flex h-full items-center justify-center border border-bone/10 bg-bone/[0.025] text-sm text-bone/45">{copy.unknownLocation}</div>
            )}
          </div>
          <div className="space-y-6">
            <div>
              <p className="overline">{t("section.modern_locations")}</p>
              <div className="font-serif text-2xl text-bone mt-2">
                {(c.modern_locations || []).map((location, index) => (
                  <span key={`${localizedText(location)}-${index}`}>
                    {index > 0 ? " · " : ""}<LocalizedText value={location} />
                  </span>
                ))}
              </div>
            </div>
            {coords && (
              <div>
                <p className="overline">{t("common.coordinates")}</p>
                <p className="text-bone/80 mt-2 font-mono text-sm">{Number(coords[0]).toFixed(3)}, {Number(coords[1]).toFixed(3)}</p>
              </div>
            )}
          </div>
        </div>

        <Section overline={t("section.political_structure")} title={t("civdetail.h2.political")}><LocalizedText value={c.political_structure} /></Section>
        <Section overline={t("section.economy")} title={t("civdetail.h2.economy")}><LocalizedText value={c.economy_and_trade} /></Section>
        <Section overline={t("section.science")} title={t("civdetail.h2.science")}><LocalizedText value={c.science_and_knowledge} /></Section>
        <Section overline={t("section.art")} title={t("civdetail.h2.art")}><LocalizedText value={c.art_and_culture} /></Section>

        {c.key_figures?.length > 0 && (
          <Section overline={t("section.key_figures")} title={t("civdetail.h2.figures")}>
            <ul className="grid sm:grid-cols-2 gap-4">
              {c.key_figures.map((p, index) => (
                <li key={p.id || `${localizedText(p.name)}-${index}`} className="museum-card p-5">
                  <LocalizedText value={p.name} as="p" className="font-serif text-xl text-bone" />
                  <LocalizedText value={p.role} as="p" className="text-bone/60 text-sm mt-1" />
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section overline={t("section.timeline")} title={t("civdetail.h2.timeline")}>
          <ol className="space-y-5 mt-4">
            {c.timeline?.map((item, i) => (
              <li key={item.id || i} className="flex gap-6 items-start">
                <span className="font-serif text-gold text-2xl w-28 shrink-0">{fmt(item.year, t)}</span>
                <LocalizedText value={item.event} as="span" className="text-bone/80" />
              </li>
            ))}
          </ol>
        </Section>

        {c.sources?.length > 0 && (
          <Section overline={t("common.sources")} title={t("civdetail.h2.sources")}>
            <ul className="list-disc pl-5 space-y-2 text-bone/70">
              {c.sources.map((s, index) => <li key={`${localizedText(s)}-${index}`}><LocalizedText value={s} /></li>)}
            </ul>
          </Section>
        )}

        {civFigures.length > 0 && (
          <Section overline={t("civdetail.overline.notableFigures")} title={t("civdetail.h2.notableFigures")}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4" data-testid="civ-figures">
              {civFigures.map((f) => (
                <Link key={f.id} to={`/figure/${f.id}`} className="museum-card p-5 group block" data-testid={`civ-figure-${f.id}`}>
                  <p className="overline text-[0.6rem]"><LocalizedText value={f.category} /> · <LocalizedText value={f.era} /></p>
                  <LocalizedText value={f.name} as="p" className="font-serif text-xl text-bone mt-2 group-hover:text-gold transition-colors" />
                  <LocalizedText value={f.summary} as="p" className="text-bone/70 text-sm mt-2 line-clamp-2 font-light" />
                </Link>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
};

export default CivilizationDetail;
