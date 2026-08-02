import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import { ArrowLeft } from "lucide-react";
import { fetchDiaspora, fetchDiasporaOne } from "../lib/api";
import { useTranslated } from "../lib/useTranslated";
import { useI18n } from "../i18n";

export const DiasporaList = () => {
  const { t } = useI18n();
  const [items, setItems] = useState([]);
  useEffect(() => { fetchDiaspora().then(setItems).catch(() => {}); }, []);
  return (
    <div className="pt-32 pb-24 max-w-[1600px] mx-auto px-6 md:px-10" data-testid="diaspora-page">
      <p className="overline">{t("page.diaspora.overline")} · {t("nav.diaspora")}</p>
      <h1 className="font-serif text-5xl md:text-6xl text-bone mt-3 tracking-tight" data-testid="diaspora-title">{t("page.diaspora.title")}</h1>
      <p className="text-bone/70 max-w-2xl mt-6 font-light leading-relaxed">
        {t("page.diaspora.lead")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        {[...items].sort((a, b) => a.name.localeCompare(b.name)).map((d) => (
          <Link key={d.id} to={`/diaspora/${d.id}`} className="museum-card relative group overflow-hidden aspect-[4/5]" data-testid={`diaspora-card-${d.id}`}>
            <img src={d.image_url} alt={d.name} className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-105 transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/70 to-ebony/10" />
            <div className="relative h-full p-7 flex flex-col justify-end">
              <p className="overline text-[0.65rem]">{t(`region.${d.region}`)}</p>
              <h3 className="font-serif text-3xl text-bone mt-3 leading-tight">{d.name}</h3>
              <p className="text-gold text-xs uppercase tracking-[0.2em] mt-2">{d.country}</p>
              <p className="text-bone/70 text-sm font-light mt-4 line-clamp-3">{d.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Block = ({ label, children }) => (
  <div>
    <p className="overline">{label}</p>
    <div className="text-bone/85 mt-3 font-light leading-relaxed">{children}</div>
  </div>
);

export const DiasporaDetail = () => {
  const { t } = useI18n();
  const { id } = useParams();
  const [d, setD] = useState(null);
  useEffect(() => { fetchDiasporaOne(id).then(setD).catch(() => {}); }, [id]);
  const tSummary = useTranslated(d?.summary || "");
  const tCulture = useTranslated(d?.culture || "");
  const tStory = useTranslated(d?.story || "");
  const tModern = useTranslated(d?.modern || "");
  if (!d) return <div className="pt-32 text-center text-bone/40 overline">{t("common.loading")}</div>;

  return (
    <div data-testid="diaspora-detail">
      <div className="relative h-[65vh] min-h-[440px] overflow-hidden">
        <img src={d.image_url} alt={d.name} className="absolute inset-0 w-full h-full object-cover animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/60 to-ebony/30" />
        <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 h-full flex flex-col justify-end pb-16">
          <Link to="/diaspora" className="text-bone/60 hover:text-gold text-xs uppercase tracking-[0.2em] flex items-center gap-2 mb-6" data-testid="back-to-diaspora">
            <ArrowLeft size={14} /> {t("common.back.diaspora")}
          </Link>
          <p className="overline">{t(`region.${d.region}`)}</p>
          <h1 className="font-serif text-5xl md:text-7xl text-bone mt-3 leading-[0.95] tracking-tight">{d.name}</h1>
          <p className="text-gold text-sm uppercase tracking-[0.25em] mt-4">{d.country}</p>
          <p className="text-bone/80 mt-6 max-w-2xl text-lg font-light leading-relaxed">{tSummary || d.summary}</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 aspect-[16/9]">
            <MapContainer center={d.coords} zoom={4} className="w-full h-full" style={{ background: "#0A0908" }}>
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png" attribution='&copy; OSM &copy; CARTO' subdomains="abcd" />
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png" subdomains="abcd" opacity={0.6} />
              <CircleMarker center={d.coords} radius={10} pathOptions={{ color: "#D4AF37", fillColor: "#D4AF37", fillOpacity: 0.85, weight: 2 }} />
            </MapContainer>
          </div>
          <div className="space-y-6">
            <Block label={t("section.origin_routes")}>
              <ul className="list-disc pl-5 space-y-1">{d.origin_routes.map((r) => <li key={r}>{r}</li>)}</ul>
            </Block>
            <Block label={t("section.ethnic_heritage")}>
              <ul className="list-disc pl-5 space-y-1">{d.ethnicities.map((e) => <li key={e}>{e}</li>)}</ul>
            </Block>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-16">
          <Block label={t("section.languages")}>
            <ul className="list-disc pl-5 space-y-1">{d.languages.map((l) => <li key={l}>{l}</li>)}</ul>
          </Block>
          <Block label={t("section.religions")}>
            <ul className="list-disc pl-5 space-y-1">{d.religions.map((r) => <li key={r}>{r}</li>)}</ul>
          </Block>
        </div>

        <section className="mt-16 border-t border-[#2A2421] pt-10">
          <p className="overline">{t("section.culture")}</p>
          <h2 className="font-serif text-3xl text-bone mt-3">{t("page.diaspora.cultureHeading")}</h2>
          <p className="text-bone/85 mt-5 text-lg font-light leading-relaxed max-w-3xl">{tCulture || d.culture}</p>
        </section>

        <section className="mt-16 border-t border-[#2A2421] pt-10">
          <p className="overline">{t("section.the_road")}</p>
          <h2 className="font-serif text-3xl text-bone mt-3">{t("page.diaspora.routesHeading")}</h2>
          <p className="text-bone/85 mt-5 text-lg font-light leading-relaxed max-w-3xl">{tStory || d.story}</p>
        </section>

        <section className="mt-16 border-t border-[#2A2421] pt-10">
          <p className="overline">{t("section.today")}</p>
          <h2 className="font-serif text-3xl text-bone mt-3">{t("page.diaspora.modernHeading")}</h2>
          <p className="text-bone/85 mt-5 text-lg font-light leading-relaxed max-w-3xl">{tModern || d.modern}</p>
        </section>

        {d.sources?.length > 0 && (
          <section className="mt-16 border-t border-[#2A2421] pt-10">
            <p className="overline">{t("common.sources")}</p>
            <ul className="list-disc pl-5 space-y-2 mt-4 text-bone/70">{d.sources.map((s) => <li key={s}>{s}</li>)}</ul>
          </section>
        )}
      </div>
    </div>
  );
};
