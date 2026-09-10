import { useEffect, useMemo, useState } from "react";
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

const fallbackModules = {
  en: [
    { id: "origins", era: "Deep time", title: "Origins", subtitle: "Human origins, archaeology, environments and the evidence used to reconstruct deep history." },
    { id: "civilizations", era: "Antiquity → early modern", title: "Civilizations", subtitle: "Kingdoms, empires, city-states, trade networks and political formations across Africa." },
    { id: "dispersal", era: "Long-distance movement", title: "Dispersal", subtitle: "Trace population movements, exchanges, routes and the formation of connected worlds." },
    { id: "diaspora", era: "Africa & the world", title: "Diaspora", subtitle: "Explore communities of African descent, their histories, continuities and new cultural forms." },
    { id: "impact", era: "Global influence", title: "Impact", subtitle: "Follow African and diasporic influence across ideas, arts, resistance, politics and everyday life." },
    { id: "knowledge", era: "Knowledge systems", title: "Knowledge", subtitle: "Discover intellectual traditions, technologies, archives, scholarship and ways of knowing." },
    { id: "culture", era: "Living heritage", title: "Culture", subtitle: "Music, food, dress, languages, beliefs, visual arts and living traditions in context." },
    { id: "migration", era: "Routes & encounters", title: "Migrations", subtitle: "Connect places and periods through voluntary, forced and circular movements." },
  ],
  fr: [
    { id: "origins", era: "Temps profond", title: "Origines", subtitle: "Origines humaines, archéologie, environnements et indices utilisés pour reconstruire l’histoire ancienne." },
    { id: "civilizations", era: "Antiquité → époque moderne", title: "Civilisations", subtitle: "Royaumes, empires, cités, réseaux commerciaux et formations politiques à travers l’Afrique." },
    { id: "dispersal", era: "Mouvements de longue durée", title: "Dispersion", subtitle: "Suivre les mouvements de populations, les échanges, les routes et la formation de mondes connectés." },
    { id: "diaspora", era: "Afrique & monde", title: "Diaspora", subtitle: "Explorer les communautés d’ascendance africaine, leurs histoires, leurs continuités et leurs créations." },
    { id: "impact", era: "Influence mondiale", title: "Impact", subtitle: "Suivre les influences africaines et diasporiques dans les idées, les arts, les résistances et la vie quotidienne." },
    { id: "knowledge", era: "Systèmes de savoir", title: "Savoirs", subtitle: "Découvrir traditions intellectuelles, technologies, archives, recherches et manières de transmettre les connaissances." },
    { id: "culture", era: "Patrimoine vivant", title: "Culture", subtitle: "Musique, cuisine, vêtements, langues, croyances, arts visuels et traditions vivantes replacés dans leur contexte." },
    { id: "migration", era: "Routes & rencontres", title: "Migrations", subtitle: "Relier lieux et époques à travers les mobilités volontaires, forcées et circulaires." },
  ],
};

const explorationCopy = {
  en: {
    overline: "Explore across the atlas",
    title: "One history, many ways in.",
    body: "Move from places to people, from long timelines to individual lives, and follow the links between Africa and its diasporas.",
    imageAlt: "Topographical map of Africa",
    maliAlt: "Architecture in Mali",
    links: [
      ["/countries", "Countries", "Open country dossiers and connect territory, history, peoples and sources."],
      ["/timeline", "Timeline", "Place figures, civilizations and turning points in a shared chronology."],
      ["/people", "Peoples", "Explore communities, languages, movements and cultural continuities."],
      ["/figures", "Figures", "Meet the people who shaped political, intellectual and cultural history."],
      ["/diaspora", "Diaspora", "Follow communities of African descent, routes, continuities and new cultures."],
      ["/stories", "Stories", "Enter source-grounded narrative journeys through places and periods."],
      ["/compare", "Compare", "Read civilizations side by side without flattening differences in time or place."],
      ["/atlas", "Atlas", "Explore the spatial connections between territories, routes and historical formations."],
    ],
  },
  fr: {
    overline: "Explorer tout l’Atlas",
    title: "Une histoire, plusieurs portes d’entrée.",
    body: "Passe des lieux aux peuples, des longues chronologies aux trajectoires individuelles, et suis les liens entre l’Afrique et ses diasporas.",
    imageAlt: "Carte topographique de l’Afrique",
    maliAlt: "Architecture au Mali",
    links: [
      ["/countries", "Pays", "Ouvre les dossiers pays et relie territoire, histoire, peuples et sources."],
      ["/timeline", "Chronologie", "Replace personnalités, civilisations et tournants dans une chronologie commune."],
      ["/people", "Peuples", "Explore communautés, langues, mouvements et continuités culturelles."],
      ["/figures", "Personnalités", "Découvre les personnes qui ont marqué l’histoire politique, intellectuelle et culturelle."],
      ["/diaspora", "Diaspora", "Suis les communautés d’ascendance africaine, leurs routes, continuités et créations."],
      ["/stories", "Histoires", "Entre dans des récits documentés qui relient lieux, périodes et sources."],
      ["/compare", "Comparer", "Lis les civilisations côte à côte sans effacer leurs différences de temps et d’espace."],
      ["/atlas", "Atlas", "Explore les connexions spatiales entre territoires, routes et formations historiques."],
    ],
  },
};

const Landing = () => {
  const { t, lang } = useI18n();
  const [modules, setModules] = useState([]);
  const [modulesReady, setModulesReady] = useState(false);
  const explore = explorationCopy[lang] || explorationCopy.en;

  useEffect(() => {
    let active = true;
    fetchModules()
      .then((data) => {
        if (active) setModules(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (active) setModules([]);
      })
      .finally(() => {
        if (active) setModulesReady(true);
      });
    return () => { active = false; };
  }, []);

  const displayModules = useMemo(() => {
    if (modules.length) return modules;
    return fallbackModules[lang] || fallbackModules.en;
  }, [modules, lang]);

  return (
    <div data-testid="landing-page">
      {/* HERO */}
      <section className="relative min-h-[760px] sm:min-h-[700px] md:min-h-[640px] md:h-[95vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO} alt={explore.imageAlt} className="w-full h-full object-cover animate-slow-zoom" />
          <div className="absolute inset-0 bg-gradient-to-b from-ebony/40 via-ebony/60 to-ebony" />
          <div className="absolute inset-0 bg-gradient-to-r from-ebony via-ebony/30 to-transparent" />
        </div>

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
          {displayModules.map((m, idx) => {
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
                <img src={moduleImage[m.id] || ARTIFACT} alt={m.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-1000" />
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

        {!modulesReady && (
          <p className="sr-only" aria-live="polite">{t("common.loading")}</p>
        )}
      </section>

      {/* CROSS-MODULE EXPLORATION */}
      <section className="border-y border-[#2A2421] bg-[#100e0c]" data-testid="exploration-routes">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-20 md:py-24">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="overline">{explore.overline}</p>
              <h2 className="font-serif text-4xl md:text-5xl text-bone mt-3 leading-tight">{explore.title}</h2>
              <p className="text-bone/65 mt-5 max-w-lg font-light leading-relaxed">{explore.body}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-px bg-bone/10 border border-bone/10">
              {explore.links.map(([to, title, body], index) => (
                <Link
                  key={to}
                  to={to}
                  className="group min-h-[180px] bg-ebony p-6 md:p-7 flex flex-col justify-between hover:bg-[#17130f] transition-colors"
                  data-testid={`explore-route-${index}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-gold/45 text-[10px] tracking-[0.25em]">{String(index + 1).padStart(2, "0")}</span>
                    <ArrowRight size={15} className="text-gold/55 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="mt-8">
                    <h3 className="font-serif text-2xl text-bone group-hover:text-gold transition-colors">{title}</h3>
                    <p className="text-sm text-bone/55 mt-2 leading-relaxed font-light">{body}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INVITATION STRIP */}
      <section className="border-b border-[#2A2421] bg-[#12100E]">
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
            <img src={MALI} alt={explore.maliAlt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-ebony/60 to-transparent" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
