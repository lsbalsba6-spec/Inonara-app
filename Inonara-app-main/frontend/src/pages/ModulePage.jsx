import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchModules, fetchCivilizations, fetchStories, fetchCulture } from "../lib/api";
import { useI18n } from "../i18n";

const ModulePage = () => {
  const { t } = useI18n();
  const { id } = useParams();
  const [mod, setMod] = useState(null);
  const [civs, setCivs] = useState([]);
  const [stories, setStories] = useState([]);
  const [culture, setCulture] = useState([]);

  useEffect(() => {
    fetchModules().then((all) => setMod(all.find((m) => m.id === id) || null));
    fetchCivilizations().then(setCivs).catch(() => {});
    fetchStories().then(setStories).catch(() => {});
    fetchCulture().then(setCulture).catch(() => {});
  }, [id]);

  if (!mod) return <div className="pt-32 text-center text-bone/40 overline">{t("common.loading")}</div>;

  const showCivs = id === "civilizations";
  const showStories = ["origins", "dispersal", "diaspora"].includes(id);
  const showCulture = ["culture", "impact"].includes(id);

  return (
    <div className="pt-32 pb-24 max-w-[1600px] mx-auto px-6 md:px-10" data-testid={`module-page-${id}`}>
      <p className="overline">Module {String(mod.order).padStart(2, "0")} · {mod.era}</p>
      <h1 className="font-serif text-5xl md:text-7xl text-bone mt-3 tracking-tight leading-[0.95]">{mod.title}</h1>
      <p className="text-bone/80 max-w-3xl mt-8 text-lg md:text-xl font-light leading-relaxed">{mod.blurb}</p>
      {mod.tone_note && (
        <p className="overline mt-8 text-gold/80">Note: {mod.tone_note}</p>
      )}

      {showCivs && (
        <div className="mt-16">
          <p className="overline">{t("module.featuredCivilizations")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {civs.map((c) => (
              <Link key={c.id} to={`/civilization/${c.id}`} className="museum-card p-6 group" data-testid={`module-civ-${c.id}`}>
                <p className="overline text-[0.65rem]">{t(`region.${c.region}`)}</p>
                <h3 className="font-serif text-2xl text-bone mt-2 group-hover:text-gold transition-colors">{c.name}</h3>
                <p className="text-bone/70 text-sm mt-3 line-clamp-2 font-light">{c.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {showStories && (
        <div className="mt-16">
          <p className="overline">{t("module.storiesFromEra")}</p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {stories.map((s) => (
              <Link key={s.id} to={`/story/${s.id}`} className="museum-card p-6 group" data-testid={`module-story-${s.id}`}>
                <p className="overline text-[0.65rem]">{s.era}</p>
                <h3 className="font-serif text-2xl text-bone mt-2 group-hover:text-gold transition-colors">{s.title}</h3>
                <p className="text-bone/70 text-sm mt-3 line-clamp-2 font-light">{s.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {showCulture && (
        <div className="mt-16">
          <p className="overline">{t("module.cultureLibrary")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {culture.slice(0, 9).map((i) => (
              <div key={i.id} className="museum-card p-6" data-testid={`module-culture-${i.id}`}>
                <p className="overline text-[0.65rem]">{i.category} · {i.region}</p>
                <h3 className="font-serif text-xl text-bone mt-2">{i.title}</h3>
                <p className="text-bone/70 text-sm mt-3 line-clamp-2 font-light">{i.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 flex gap-4 flex-wrap">
        <Link to="/atlas" className="px-6 py-3 bg-gold text-ebony text-xs uppercase tracking-[0.25em] hover:bg-bone transition-colors" data-testid="module-cta-atlas">Open the Atlas</Link>
        <Link to="/ask" className="px-6 py-3 border border-gold/40 text-gold text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-ebony transition-colors" data-testid="module-cta-ask">Ask Atlas about this</Link>
      </div>
    </div>
  );
};

export default ModulePage;
