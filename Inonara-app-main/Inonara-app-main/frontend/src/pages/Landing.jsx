import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fetchModules } from "../lib/api";
import { useI18n } from "../i18n";
import { AFROATLAS_LOGO } from "../lib/brand";

const HERO = "https://static.prod-images.emergentagent.com/jobs/a030947e-7248-4eb4-a138-0bdb852bc956/images/93ff5b383007073565083c3bc14f190f580e257465262a1065ab0ed83a32cb37.png";
const ARTIFACT = "https://static.prod-images.emergentagent.com/jobs/a030947e-7248-4eb4-a138-0bdb852bc956/images/cd856dce9d4cf5c71b306fa79ba1420d7d918092d25fc78b85217b73ddb7e2bc.png";
const MALI = "https://static.prod-images.emergentagent.com/jobs/a030947e-7248-4eb4-a138-0bdb852bc956/images/3327733600bbae48c70dda8cc40686aada47907623da33062f2518a29af57ec5.png";

const moduleImage = {
  origins: "https://images.unsplash.com/photo-1732027198030-d9ead6d14d4f?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80",
  civilizations: MALI,
  dispersal: "https://images.unsplash.com/photo-1605007493699-af75e7d68bb3?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80",
  diaspora: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80",
  impact: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80",
  knowledge: ARTIFACT,
  culture: "https://images.unsplash.com/photo-1770750738052-6a7bd508ddab?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80",
  migration: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80",
};

const Landing = () => {
  const { t } = useI18n();
  const [modules, setModules] = useState([]);
  useEffect(() => { fetchModules().then(setModules).catch(() => setModules([])); }, []);

  return (
    <div data-testid="landing-page">
      {/* HERO */}
      <section className="relative min-h-[760px] sm:min-h-[700px] md:min-h-[640px] md:h-[95vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO} alt="Topographical map of Africa" className="w-full h-full object-cover animate-slow-zoom" />
          <div className="absolute inset-0 bg-gradient-to-b from-ebony/40 via-ebony/60 to-ebony" />
          <div className="absolute inset-0 bg-gradient-to-r from-ebony via-ebony/30 to-transparent" />
        </div>

        {/* Floating brand mark — top-center of hero */}
        <motion.img
          src={AFROATLAS_LOGO}
          alt="AfroAtlas"
          initial={{ opacity: 0, y: -10, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-20 sm:top-24 md:top-28 h-24 sm:h-32 md:h-52 lg:h-64 w-auto object-contain drop-shadow-[0_0_50px_rgba(212,175,55,0.22)] z-10 pointer-events-none"
          data-testid="hero-logo"
        />

        <div className="relative h-full max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-16 md:pb-24 pt-48 sm:pt-56 md:pt-0">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }} className="overline">
            {t("hero.overline")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.15 }}
            className="font-serif text-[2.25rem] sm:text-5xl md:text-7xl lg:text-8xl text-bone leading-[0.98] md:leading-[0.95] tracking-tight mt-3 md:mt-4 max-w-5xl"
          >
            {t("hero.title1")} <span className="italic text-gold">{t("hero.title2")}</span>, <br /> {t("hero.title3")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-bone/70 text-base md:text-lg mt-6 max-w-2xl font-light leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <Link
              to="/atlas"
              data-testid="cta-explore-atlas"
              className="px-7 py-4 bg-gold text-ebony text-xs uppercase tracking-[0.25em] hover:bg-bone transition-colors flex items-center gap-3"
            >
              {t("hero.cta1")} <ArrowRight size={14} />
            </Link>
            <Link
              to="/civilizations"
              data-testid="cta-browse-civilizations"
              className="px-7 py-4 border border-gold/40 text-gold text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-ebony transition-colors"
            >
              {t("hero.cta2")}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* MODULES BENTO */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-10 py-24" data-testid="modules-section">
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <p className="overline">{t("modules.overline")}</p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight mt-3 text-bone">{t("modules.title")}</h2>
          </div>
          <p className="text-bone/60 max-w-md font-light">
            {t("modules.copy")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-6 auto-rows-[220px]">
          {modules.map((m, idx) => {
            const layouts = [
              "md:col-span-5 lg:col-span-7 row-span-2",
              "md:col-span-3 lg:col-span-5 row-span-1",
              "md:col-span-4 lg:col-span-5 row-span-1",
              "md:col-span-4 lg:col-span-7 row-span-2",
              "md:col-span-4 lg:col-span-4 row-span-1",
              "md:col-span-4 lg:col-span-4 row-span-1",
              "md:col-span-4 lg:col-span-8 row-span-2",
              "md:col-span-4 lg:col-span-4 row-span-2",
            ];
            return (
              <Link
                to={`/module/${m.id}`}
                key={m.id}
                data-testid={`module-card-${m.id}`}
                className={`museum-card relative overflow-hidden group ${layouts[idx % layouts.length]}`}
              >
                <img src={moduleImage[m.id]} alt={m.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/60 to-transparent" />
                <div className="relative h-full p-6 flex flex-col justify-end">
                  <p className="overline text-[0.65rem]">{m.era}</p>
                  <h3 className="font-serif text-2xl md:text-3xl text-bone mt-2 leading-tight">{m.title}</h3>
                  <p className="text-bone/70 text-sm font-light mt-2 max-w-md line-clamp-2">{m.subtitle}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* INVITATION STRIP */}
      <section className="border-y border-[#2A2421] bg-[#12100E]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="overline">{t("landing.storyMode.overline")}</p>
            <h2 className="font-serif text-4xl md:text-5xl text-bone mt-3 leading-tight">
              {t("landing.storyMode.title1")} <span className="italic text-gold">{t("landing.storyMode.title2")}</span> {t("landing.storyMode.title3")}
            </h2>
            <p className="text-bone/70 mt-6 max-w-lg font-light leading-relaxed">
              {t("landing.storyMode.body")}
            </p>
            <Link
              to="/stories"
              data-testid="cta-stories"
              className="inline-flex items-center gap-3 mt-8 px-6 py-3 border border-gold/40 text-gold text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-ebony transition-colors"
            >
              {t("landing.storyMode.cta")} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <img src={MALI} alt="Mali architecture" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-ebony/60 to-transparent" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
