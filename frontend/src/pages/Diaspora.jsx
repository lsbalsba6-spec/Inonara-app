import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import { ArrowLeft } from "lucide-react";
import { fetchDiaspora, fetchDiasporaOne } from "../lib/api";
import { useTranslated } from "../lib/useTranslated";
import { useI18n } from "../i18n";
import { sortAlphabetically } from "../lib/contentSort";
import { SmartImage } from "../components/SmartImage";

const TranslatedText = ({ value }) => {
  const translated = useTranslated(value || "");
  return translated || value || null;
};

const TranslatedParagraph = ({ value, className }) => {
  const translated = useTranslated(value || "");
  if (!value && !translated) return null;
  return <p className={className}>{translated || value}</p>;
};

export const DiasporaList = () => {
  const { t } = useI18n();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  useEffect(() => { fetchDiaspora().then(setItems).catch(() => {}); }, []);

  const regions = useMemo(() => [...new Set(items.map((d) => d.region).filter(Boolean))].sort(), [items]);
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return sortAlphabetically(items.filter((d) => {
      const matchesRegion = region === "all" || d.region === region;
      const haystack = `${d.name || ""} ${d.country || ""} ${d.region || ""} ${d.summary || ""}`.toLowerCase();
      return matchesRegion && (!needle || haystack.includes(needle));
    }), "name");
  }, [items, query, region]);
  return (
    <div className="pt-32 pb-24 max-w-[1600px] mx-auto px-6 md:px-10" data-testid="diaspora-page">
      <p className="overline">{t("page.diaspora.overline")} · {t("nav.diaspora")}</p>
      <h1 className="font-serif text-5xl md:text-6xl text-bone mt-3 tracking-tight" data-testid="diaspora-title">{t("page.diaspora.title")}</h1>
      <p className="text-bone/70 max-w-2xl mt-6 font-light leading-relaxed">
        {t("page.diaspora.lead")}
      </p>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gold/20 bg-gold/[0.05] p-5">
          <p className="overline text-gold">{t("diaspora.corpus.label")}</p>
          <p className="mt-2 font-serif text-3xl text-bone">{items.length}</p>
          <p className="mt-1 text-xs text-bone/50">{t("diaspora.corpus.copy")}</p>
        </div>
        <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
          <p className="overline">{t("diaspora.regions.label")}</p>
          <p className="mt-2 font-serif text-3xl text-bone">{regions.length}</p>
          <p className="mt-1 text-xs text-bone/50">{t("diaspora.regions.copy")}</p>
        </div>
        <Link to="/atlas" className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5 transition hover:border-gold/40">
          <p className="overline">{t("diaspora.routes.label")}</p>
          <p className="mt-2 font-serif text-xl text-bone">{t("diaspora.routes.title")}</p>
          <p className="mt-1 text-xs text-bone/50">{t("diaspora.routes.copy")}</p>
        </Link>
      </section>

      <section className="mt-10 rounded-2xl border border-bone/10 bg-bone/[0.02] p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("diaspora.search.placeholder")} className="w-full rounded-xl border border-bone/15 bg-ebony px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50" />
          <div className="flex gap-2 overflow-x-auto">
            <button type="button" onClick={() => setRegion("all")} className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs ${region === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>{t("diaspora.filter.allRegions")}</button>
            {regions.map((item) => <button key={item} type="button" onClick={() => setRegion(item)} className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs ${region === item ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>{t(`region.${item}`)}</button>)}
          </div>
        </div>
        <p className="mt-4 text-xs text-bone/45">{visible.length} {visible.length > 1 ? t("diaspora.results.many") : t("diaspora.results.one")}</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {visible.map((d) => (
          <Link key={d.id} to={`/diaspora/${d.id}`} className="museum-card relative group overflow-hidden aspect-[4/5]" data-testid={`diaspora-card-${d.id}`}>
            <SmartImage src={d.image_url} wikipediaTitle={d.wikipedia_title} alt={d.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover opacity-55 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-75" credit={d.image_credit} sourceUrl={d.image_source_url} />
            <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/70 to-ebony/10" />
            <div className="relative h-full p-7 flex flex-col justify-end">
              <p className="overline text-[0.65rem]">{t(`region.${d.region}`)}</p>
              <h3 className="font-serif text-3xl text-bone mt-3 leading-tight">{d.name}</h3>
              <p className="text-gold text-xs uppercase tracking-[0.2em] mt-2"><TranslatedText value={d.country} /></p>
              <TranslatedParagraph value={d.summary} className="text-bone/70 text-sm font-light mt-4 line-clamp-3" />
            </div>
          </Link>
        ))}
      </div>
      {!visible.length && <div className="mt-8 rounded-xl border border-bone/10 p-6 text-bone/60">{t("diaspora.empty")}</div>}
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
        <SmartImage src={d.image_url} wikipediaTitle={d.wikipedia_title} alt={d.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover animate-slow-zoom" credit={d.image_credit} sourceUrl={d.image_source_url} />
        <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/60 to-ebony/30" />
        <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 h-full flex flex-col justify-end pb-16">
          <Link to="/diaspora" className="text-bone/60 hover:text-gold text-xs uppercase tracking-[0.2em] flex items-center gap-2 mb-6" data-testid="back-to-diaspora">
            <ArrowLeft size={14} /> {t("common.back.diaspora")}
          </Link>
          <p className="overline">{t(`region.${d.region}`)}</p>
          <h1 className="font-serif text-5xl md:text-7xl text-bone mt-3 leading-[0.95] tracking-tight">{d.name}</h1>
          <p className="text-gold text-sm uppercase tracking-[0.25em] mt-4"><TranslatedText value={d.country} /></p>
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
              <ul className="list-disc pl-5 space-y-1">{d.origin_routes.map((r) => <li key={r}><TranslatedText value={r} /></li>)}</ul>
            </Block>
            <Block label={t("section.ethnic_heritage")}>
              <ul className="list-disc pl-5 space-y-1">{d.ethnicities.map((e) => <li key={e}><TranslatedText value={e} /></li>)}</ul>
            </Block>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-16">
          <Block label={t("section.languages")}>
            <ul className="list-disc pl-5 space-y-1">{d.languages.map((l) => <li key={l}><TranslatedText value={l} /></li>)}</ul>
          </Block>
          <Block label={t("section.religions")}>
            <ul className="list-disc pl-5 space-y-1">{d.religions.map((r) => <li key={r}><TranslatedText value={r} /></li>)}</ul>
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

        <section className="mt-16 grid gap-4 md:grid-cols-3">
          <Link to="/atlas" className="rounded-xl border border-gold/20 bg-gold/[0.04] p-5 transition hover:border-gold/50">
            <p className="overline text-gold">{t("diaspora.link.geo.label")}</p>
            <p className="mt-2 font-serif text-xl text-bone">{t("diaspora.link.geo.title")}</p>
            <p className="mt-2 text-xs leading-5 text-bone/50">{t("diaspora.link.geo.copy")}</p>
          </Link>
          <Link to="/people" className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5 transition hover:border-gold/40">
            <p className="overline">{t("diaspora.link.heritage.label")}</p>
            <p className="mt-2 font-serif text-xl text-bone">{t("diaspora.link.heritage.title")}</p>
            <p className="mt-2 text-xs leading-5 text-bone/50">{t("diaspora.link.heritage.copy")}</p>
          </Link>
          <Link to="/culture" className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5 transition hover:border-gold/40">
            <p className="overline">{t("diaspora.link.continuity.label")}</p>
            <p className="mt-2 font-serif text-xl text-bone">{t("diaspora.link.continuity.title")}</p>
            <p className="mt-2 text-xs leading-5 text-bone/50">{t("diaspora.link.continuity.copy")}</p>
          </Link>
        </section>

        {(d.image_credit || d.image_source_url) && (
          <section className="mt-10 rounded-2xl border border-bone/10 bg-bone/[0.025] p-6">
            <p className="overline text-gold">{t("diaspora.visualDocs")}</p>
            {d.image_credit && <p className="mt-3 text-sm text-bone/65">{t("diaspora.credit")} : {d.image_credit}</p>}
            {d.image_source_url && <a href={d.image_source_url} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-xs text-gold underline underline-offset-2">{t("diaspora.visualRights")}</a>}
          </section>
        )}

        {d.sources?.length > 0 && (
          <section className="mt-16 border-t border-[#2A2421] pt-10">
            <p className="overline">{t("common.sources")}</p>
            <ul className="list-disc pl-5 space-y-2 mt-4 text-bone/70">{d.sources.map((s) => <li key={s}><TranslatedText value={s} /></li>)}</ul>
          </section>
        )}
      </div>
    </div>
  );
};
