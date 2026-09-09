import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fetchJourney } from "../lib/api";
import { useI18n } from "../i18n";
import { sortChronologically } from "../lib/contentSort";
import { SmartImage } from "../components/SmartImage";

const Journey = () => {
  const { t } = useI18n();
  const [j, setJ] = useState(null);
  useEffect(() => { fetchJourney().then(setJ).catch(() => {}); }, []);
  if (!j) return <div className="pt-32 text-center text-bone/40 overline">{t("common.loading")}</div>;

  return (
    <div data-testid="journey-page">
      <section className="pt-32 pb-16 max-w-4xl mx-auto px-6 text-center">
        <p className="overline">{t("journey.overline")}</p>
        <h1 className="font-serif text-5xl md:text-7xl text-bone mt-4 tracking-tight leading-[0.95]">{j.title}</h1>
        <p className="font-serif italic text-2xl text-gold mt-5">{j.subtitle}</p>
        <p className="text-bone/70 mt-8 font-light leading-relaxed max-w-2xl mx-auto">{j.blurb}</p>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
        <section className="grid gap-4 md:grid-cols-3 mb-10">
          <Link to="/timeline" className="rounded-xl border border-gold/20 bg-gold/[0.04] p-5 transition hover:border-gold/50">
            <p className="overline text-gold">Dans le temps</p>
            <p className="mt-2 font-serif text-xl text-bone">Chronologie complète</p>
            <p className="mt-2 text-xs leading-5 text-bone/50">Quitter le récit guidé pour explorer librement les périodes et événements.</p>
          </Link>
          <Link to="/atlas" className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5 transition hover:border-gold/40">
            <p className="overline">Dans l’espace</p>
            <p className="mt-2 font-serif text-xl text-bone">Atlas interactif</p>
            <p className="mt-2 text-xs leading-5 text-bone/50">Situer chaque étape, route, société et déplacement sur la carte Equal Earth.</p>
          </Link>
          <Link to="/civilizations" className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5 transition hover:border-gold/40">
            <p className="overline">Approfondir</p>
            <p className="mt-2 font-serif text-xl text-bone">Civilisations</p>
            <p className="mt-2 text-xs leading-5 text-bone/50">Explorer les formations historiques rencontrées dans le parcours.</p>
          </Link>
        </section>

        {sortChronologically(j.stops, "year", "heading").map((s, i) => (
          <motion.section
            key={s.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="grid lg:grid-cols-2 gap-12 items-center py-16 border-t border-[#2A2421]"
            data-testid={`journey-stop-${s.id}`}
          >
            <div className={i % 2 === 0 ? "" : "lg:order-2"}>
              <p className="font-serif text-7xl text-gold/30 leading-none">{s.heading.split(".")[0]}</p>
              <p className="overline mt-4">{s.era} · {s.place}</p>
              <h2 className="font-serif text-4xl md:text-5xl text-bone mt-4 leading-tight">{s.heading.split(".").slice(1).join(".").trim()}</h2>
              <p className="text-bone/80 mt-6 text-lg font-light leading-relaxed">{s.story}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.15em] text-bone/45">
                {s.era && <span className="rounded-full border border-bone/15 px-3 py-1">{s.era}</span>}
                {s.place && <span className="rounded-full border border-bone/15 px-3 py-1">{s.place}</span>}
                {Number.isFinite(s.year) && <span className="rounded-full border border-gold/20 px-3 py-1 text-gold/75">{s.year < 0 ? `${Math.abs(s.year)} av. J.-C.` : s.year}</span>}
              </div>
              <Link
                to={s.link.to}
                className="inline-flex items-center gap-3 mt-8 px-6 py-3 border border-gold/40 text-gold text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-ebony transition-colors"
                data-testid={`journey-link-${s.id}`}
              >
                {s.link.label} <ArrowRight size={14} />
              </Link>
            </div>
            <div className={`relative aspect-[4/3] overflow-hidden ${i % 2 === 0 ? "" : "lg:order-1"}`}>
              <SmartImage src={s.image_url} wikipediaTitle={s.wikipedia_title} alt={s.heading} wrapperClassName="absolute inset-0" className="h-full w-full object-cover" credit={s.image_credit} sourceUrl={s.image_source_url} />
              <div className="absolute inset-0 bg-gradient-to-tr from-ebony/70 to-transparent" />
              {(s.image_credit || s.image_source_url) && (
                <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-ebony/80 px-3 py-2 text-[10px] text-bone/55 backdrop-blur-sm">
                  {s.image_credit && <span>{s.image_credit}</span>}
                  {s.image_source_url && <a href={s.image_source_url} target="_blank" rel="noreferrer" className="ml-2 text-gold/85 underline underline-offset-2">source / droits</a>}
                </div>
              )}
            </div>
          </motion.section>
        ))}

        <div className="text-center mt-24">
          <p className="overline">{t("journey.continues")}</p>
          <h3 className="font-serif text-3xl text-bone mt-3">{t("journey.exploreDiaspora")}</h3>
          <Link to="/diaspora" className="inline-flex items-center gap-3 mt-6 px-7 py-4 bg-gold text-ebony text-xs uppercase tracking-[0.25em] hover:bg-bone transition-colors" data-testid="journey-cta-diaspora">
            {t("journey.meetCommunities")} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Journey;
