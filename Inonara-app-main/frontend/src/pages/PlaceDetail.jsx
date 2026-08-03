import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { useTranslated } from "../lib/useTranslated";
import { useI18n } from "../i18n";
import { SmartImage } from "../components/SmartImage";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const PlaceDetail = () => {
  const { t } = useI18n();
  const { id } = useParams();
  const [p, setP] = useState(null);
  useEffect(() => { axios.get(`${API}/places/${id}`).then((r) => setP(r.data)).catch(() => {}); }, [id]);
  const tBlurb = useTranslated(p?.blurb || "");
  const tStory = useTranslated(p?.story || "");
  if (!p) return <div className="pt-32 text-center text-bone/40 overline">{t("common.loading")}</div>;

  return (
    <div data-testid="place-detail">
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden bg-[#0c0a09]">
        <div className="absolute inset-0">
          <MapContainer center={p.coords} zoom={6} className="w-full h-full" style={{ background: "#0A0908" }} scrollWheelZoom={false} dragging={false} doubleClickZoom={false} touchZoom={false} zoomControl={false}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png" attribution='&copy; OSM &copy; CARTO' subdomains="abcd" />
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png" subdomains="abcd" opacity={0.5} />
            <CircleMarker center={p.coords} radius={12} pathOptions={{ color: "#D4AF37", fillColor: "#D4AF37", fillOpacity: 0.9, weight: 3 }} />
          </MapContainer>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/40 to-transparent pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 h-full flex flex-col justify-end pb-12 pointer-events-none">
          <Link to="/atlas" className="text-bone/60 hover:text-gold text-xs uppercase tracking-[0.2em] flex items-center gap-2 mb-5 pointer-events-auto" data-testid="back-to-atlas">
            <ArrowLeft size={14} /> {t("common.back.atlas")}
          </Link>
          <p className="overline">{p.type} · {p.era}</p>
          <h1 className="font-serif text-5xl md:text-6xl text-bone mt-3 leading-tight tracking-tight max-w-3xl">{p.name}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-10">
        {(p.image_url || p.wikipedia_title) && (
          <SmartImage src={p.image_url} wikipediaTitle={p.wikipedia_title} alt={p.name} wrapperClassName="aspect-[16/9] rounded-2xl" className="h-full w-full object-cover" credit={p.image_credit} sourceUrl={p.image_source_url} />
        )}
        <p className="text-bone/85 text-xl font-light leading-relaxed">{tBlurb || p.blurb}</p>
        {p.story && (
          <section className="border-t border-[#2A2421] pt-8">
            <p className="overline">{t("section.the_road")}</p>
            <p className="text-bone/85 mt-4 text-lg font-light leading-relaxed">{tStory || p.story}</p>
          </section>
        )}
        <section className="border-t border-[#2A2421] pt-8">
          <p className="overline">{t("common.coordinates")}</p>
          <p className="font-mono text-sm text-bone/70 mt-2">{p.coords[0].toFixed(4)}, {p.coords[1].toFixed(4)}</p>
        </section>
        {p.sources?.length > 0 && (
          <section className="border-t border-[#2A2421] pt-8">
            <p className="overline">{t("common.sources")}</p>
            <ul className="list-disc pl-5 space-y-2 mt-3 text-bone/70">{p.sources.map((s) => <li key={s}>{s}</li>)}</ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default PlaceDetail;
