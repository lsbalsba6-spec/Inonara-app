import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import { fetchCivilization, fetchCivilizationFigures } from "../lib/api";
import { useTranslated } from "../lib/useTranslated";
import { useI18n } from "../i18n";
import { ArrowLeft } from "lucide-react";
import { SmartImage } from "../components/SmartImage";

const fmt = (y) => (y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`);

const Section = ({ overline, title, children }) => (
  <section className="py-10 border-t border-[#2A2421]" data-testid={`section-${overline.toLowerCase().replace(/[^a-z]/g, "-")}`}>
    <p className="overline">{overline}</p>
    <h2 className="font-serif text-3xl md:text-4xl text-bone mt-3">{title}</h2>
    <div className="mt-6 text-bone/80 leading-relaxed font-light text-base md:text-lg max-w-3xl">{children}</div>
  </section>
);

const CivilizationDetail = () => {
  const { t } = useI18n();
  const { id } = useParams();
  const [c, setC] = useState(null);
  const [err, setErr] = useState(null);
  const [civFigures, setCivFigures] = useState([]);
  useEffect(() => { fetchCivilization(id).then(setC).catch((e) => setErr(e.message)); }, [id]);
  useEffect(() => { fetchCivilizationFigures(id).then(setCivFigures).catch(() => setCivFigures([])); }, [id]);
  const tSummary = useTranslated(c?.summary || "");

  if (err) return <div className="pt-32 text-center text-bone/60">Civilization not found.</div>;
  if (!c) return <div className="pt-32 text-center text-bone/40 overline">{t("common.loading")}</div>;

  return (
    <div data-testid="civilization-detail">
      <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <SmartImage src={c.image_url} wikipediaTitle={c.wikipedia_title} alt={c.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover animate-slow-zoom" credit={c.image_credit} sourceUrl={c.image_source_url} />
        <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/60 to-ebony/30" />
        <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 h-full flex flex-col justify-end pb-16">
          <Link to="/civilizations" className="text-bone/60 hover:text-gold text-xs uppercase tracking-[0.2em] flex items-center gap-2 mb-6" data-testid="back-to-civilizations">
            <ArrowLeft size={14} /> {t("common.back.civilizations")}
          </Link>
          <p className="overline">{t(`region.${c.region}`)}</p>
          <h1 className="font-serif text-5xl md:text-7xl text-bone mt-3 leading-[0.95] tracking-tight">{c.name}</h1>
          <p className="text-gold text-sm uppercase tracking-[0.25em] mt-4">{fmt(c.era_start)} — {fmt(c.era_end)}</p>
          <p className="text-bone/80 mt-6 max-w-2xl text-lg font-light leading-relaxed">{tSummary || c.summary}</p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 pb-24">
        {/* Mini map */}
        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2 aspect-[16/9]">
            <MapContainer center={c.coords} zoom={4} className="w-full h-full" style={{ background: "#0A0908" }}>
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
              <CircleMarker center={c.coords} radius={10} pathOptions={{ color: "#D4AF37", fillColor: "#D4AF37", fillOpacity: 0.85, weight: 2 }} />
            </MapContainer>
          </div>
          <div className="space-y-6">
            <div>
              <p className="overline">{t("section.modern_locations")}</p>
              <p className="font-serif text-2xl text-bone mt-2">{(c.modern_locations || []).join(" · ")}</p>
            </div>
            <div>
              <p className="overline">{t("common.coordinates")}</p>
              <p className="text-bone/80 mt-2 font-mono text-sm">{c.coords[0].toFixed(3)}, {c.coords[1].toFixed(3)}</p>
            </div>
          </div>
        </div>

        <Section overline={t("section.political_structure")} title={t("civdetail.h2.political")}>{c.political_structure}</Section>
        <Section overline={t("section.economy")} title={t("civdetail.h2.economy")}>{c.economy_and_trade}</Section>
        <Section overline={t("section.science")} title={t("civdetail.h2.science")}>{c.science_and_knowledge}</Section>
        <Section overline={t("section.art")} title={t("civdetail.h2.art")}>{c.art_and_culture}</Section>

        {c.key_figures?.length > 0 && (
          <Section overline={t("section.key_figures")} title={t("civdetail.h2.figures")}>
            <ul className="grid sm:grid-cols-2 gap-4">
              {c.key_figures.map((p) => (
                <li key={p.name} className="museum-card p-5">
                  <p className="font-serif text-xl text-bone">{p.name}</p>
                  <p className="text-bone/60 text-sm mt-1">{p.role}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section overline={t("section.timeline")} title={t("civdetail.h2.timeline")}>
          <ol className="space-y-5 mt-4">
            {c.timeline?.map((t, i) => (
              <li key={i} className="flex gap-6 items-start">
                <span className="font-serif text-gold text-2xl w-28 shrink-0">{fmt(t.year)}</span>
                <span className="text-bone/80">{t.event}</span>
              </li>
            ))}
          </ol>
        </Section>

        {c.sources?.length > 0 && (
          <Section overline={t("common.sources")} title={t("civdetail.h2.sources")}>
            <ul className="list-disc pl-5 space-y-2 text-bone/70">
              {c.sources.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </Section>
        )}

        {civFigures.length > 0 && (
          <Section overline={t("civdetail.overline.notableFigures")} title={t("civdetail.h2.notableFigures")}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4" data-testid="civ-figures">
              {civFigures.map((f) => (
                <Link key={f.id} to={`/figure/${f.id}`} className="museum-card p-5 group block" data-testid={`civ-figure-${f.id}`}>
                  <p className="overline text-[0.6rem]">{f.category} · {f.era}</p>
                  <p className="font-serif text-xl text-bone mt-2 group-hover:text-gold transition-colors">{f.name}</p>
                  <p className="text-bone/70 text-sm mt-2 line-clamp-2 font-light">{f.summary}</p>
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
