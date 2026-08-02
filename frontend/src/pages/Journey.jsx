import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fetchJourney } from "../lib/api";
import { useI18n } from "../i18n";

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
        {[...j.stops].sort((a, b) => {
          const year = (value) => {
            const match = String(value || "").match(/-?\d[\d,]*/);
            if (!match) return Number.MAX_SAFE_INTEGER;
            const number = Number(match[0].replace(/,/g, ""));
            return /BCE/i.test(value) ? -Math.abs(number) : number;
          };
          return year(a.era) - year(b.era);
        }).map((s, i) => (
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
              <Link
                to={s.link.to}
                className="inline-flex items-center gap-3 mt-8 px-6 py-3 border border-gold/40 text-gold text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-ebony transition-colors"
                data-testid={`journey-link-${s.id}`}
              >
                {s.link.label} <ArrowRight size={14} />
              </Link>
            </div>
            <div className={`relative aspect-[4/3] overflow-hidden ${i % 2 === 0 ? "" : "lg:order-1"}`}>
              <img src={s.image_url} alt={s.heading} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-ebony/70 to-transparent" />
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
