import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";
import { SmartImage } from "../components/SmartImage";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const CATEGORIES = ["all", "queens", "kings", "military", "scientists", "inventors", "civil_rights", "intellectuals", "artists", "athletes"];

const FigureCard = ({ f, t }) => {
  return (
    <Link to={`/figure/${f.id}`} data-testid={`figure-card-${f.id}`} className="museum-card relative overflow-hidden group aspect-[3/4]">
      <SmartImage src={f.image_url} wikipediaTitle={f.wikipedia_title} alt={f.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover opacity-55 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-80" credit={f.image_credit} sourceUrl={f.image_source_url} />
      <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/75 to-ebony/10" />
      <div className="relative h-full p-6 flex flex-col justify-end">
        <p className="overline text-[0.6rem]">{t(`figures.${f.category}`)}</p>
        <h3 className="font-serif text-2xl text-bone mt-2 leading-tight group-hover:text-gold transition-colors">{f.name}</h3>
        <p className="text-gold text-[0.7rem] uppercase tracking-[0.18em] mt-1">{f.era}</p>
        <p className="text-bone/70 text-xs font-light mt-2 line-clamp-3">{f.summary}</p>
      </div>
    </Link>
  );
};

export const FiguresList = () => {
  const { t } = useI18n();
  const [items, setItems] = useState([]);
  const [cat, setCat] = useState("all");
  useEffect(() => { axios.get(`${API}/figures`).then((r) => setItems(r.data)).catch(() => {}); }, []);
  const filtered = useMemo(() => (cat === "all" ? items : items.filter((i) => i.category === cat)).slice().sort((a, b) => a.name.localeCompare(b.name, "fr")), [items, cat]);

  return (
    <div className="pt-32 pb-24 max-w-[1600px] mx-auto px-6 md:px-10" data-testid="figures-page">
      <p className="overline">{t("figures.overline")}</p>
      <h1 className="font-serif text-5xl md:text-6xl text-bone mt-3 tracking-tight">{t("figures.title")}</h1>
      <p className="text-bone/70 max-w-2xl mt-6 font-light leading-relaxed">{t("figures.copy")}</p>

      <div className="flex flex-wrap gap-2 mt-12" data-testid="figures-filters">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 text-xs uppercase tracking-[0.2em] border transition-colors ${
              cat === c ? "bg-gold text-ebony border-gold" : "border-[#2A2421] text-bone/70 hover:border-gold/50"
            }`}
            data-testid={`figures-filter-${c}`}
          >
            {c === "all" ? t("figures.allCats") : t(`figures.${c}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {filtered.map((f) => <FigureCard key={f.id} f={f} t={t} />)}
      </div>
    </div>
  );
};

export const FigureDetail = () => {
  const { t } = useI18n();
  const { id } = useParams();
  const [f, setF] = useState(null);
  useEffect(() => { axios.get(`${API}/figures/${id}`).then((r) => setF(r.data)).catch(() => {}); }, [id]);
  const tSummary = useTranslated(f?.summary || "");
  const tStory = useTranslated(f?.story || "");
  const tLegacy = useTranslated(f?.legacy || "");
  if (!f) return <div className="pt-32 text-center text-bone/40 overline">{t("common.loading")}</div>;
  return (
    <div data-testid="figure-detail">
      <div className="relative h-[60vh] min-h-[440px] overflow-hidden">
        <SmartImage src={f.image_url} wikipediaTitle={f.wikipedia_title} alt={f.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover animate-slow-zoom" credit={f.image_credit} sourceUrl={f.image_source_url} />
        <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/60 to-ebony/30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 h-full flex flex-col justify-end pb-14">
          <Link to="/figures" className="text-bone/60 hover:text-gold text-xs uppercase tracking-[0.2em] flex items-center gap-2 mb-6" data-testid="back-to-figures">
            <ArrowLeft size={14} /> {t("figure.back")}
          </Link>
          <p className="overline">{t(`figures.${f.category}`)} · {t(`region.${f.region}`)}</p>
          <h1 className="font-serif text-5xl md:text-7xl text-bone mt-3 leading-[0.95] tracking-tight">{f.name}</h1>
          <p className="text-gold text-sm uppercase tracking-[0.25em] mt-4">{f.era}</p>
          <p className="text-bone/80 mt-6 max-w-2xl text-lg font-light leading-relaxed">{tSummary || f.summary}</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-14">
        <section>
          <p className="overline">{t("figure.story")}</p>
          <p className="text-bone/85 mt-4 text-lg font-light leading-relaxed">{tStory || f.story}</p>
        </section>
        <section className="border-t border-[#2A2421] pt-10">
          <p className="overline">{t("figure.legacy")}</p>
          <p className="text-bone/85 mt-4 text-lg font-light leading-relaxed">{tLegacy || f.legacy}</p>
        </section>
        {f.sources?.length > 0 && (
          <section className="border-t border-[#2A2421] pt-10">
            <p className="overline">{t("common.sources")}</p>
            <ul className="list-disc pl-5 space-y-2 mt-4 text-bone/70">{f.sources.map((s) => <li key={s}>{s}</li>)}</ul>
          </section>
        )}
      </div>
    </div>
  );
};
