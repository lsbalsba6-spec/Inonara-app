import { Link } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";
import { INONARA_LOGO, AFROATLAS_LOGO } from "../lib/brand";
import { useI18n } from "../i18n";

/**
 * INONARA — World selection hub.
 * Premium portfolio-style grid of worlds. Only AfroAtlas is active for now;
 * the remaining four worlds are placeholders for future expansion.
 *
 * Clicking AfroAtlas routes to /afroatlas which mounts the original AfroAtlas
 * Landing — and from there the entire existing AfroAtlas experience is reachable
 * via its own header/footer/routes. None of that experience is changed.
 */

const HERO_AFRO = "https://static.prod-images.emergentagent.com/jobs/a030947e-7248-4eb4-a138-0bdb852bc956/images/93ff5b383007073565083c3bc14f190f580e257465262a1065ab0ed83a32cb37.png";

const Worlds = () => {
  const { t, lang, setLang } = useI18n();

  const worlds = [
    {
      id: "afroatlas",
      to: "/afroatlas",
      name: "Afro Atlas",
      subtitleKey: "worlds.afroatlas.subtitle",
      regionKey: "worlds.region.africa",
      image: HERO_AFRO,
      mark: AFROATLAS_LOGO,
      active: true,
    },
    { id: "asia",     name: "Asia",     subtitleKey: "worlds.coming.asia",     regionKey: "worlds.region.asia",     active: false },
    { id: "europe",   name: "Europe",   subtitleKey: "worlds.coming.europe",   regionKey: "worlds.region.europe",   active: false },
    { id: "americas", name: "Americas", subtitleKey: "worlds.coming.americas", regionKey: "worlds.region.americas", active: false },
    { id: "oceania",  name: "Oceania",  subtitleKey: "worlds.coming.oceania",  regionKey: "worlds.region.oceania",  active: false },
  ];

  return (
    <div className="min-h-screen inonara-bg" data-testid="inonara-worlds">
      {/* Subtle texture + halo */}
      <div className="fixed inset-0 inonara-map opacity-30 pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="inonara-halo" style={{ opacity: 0.35 }} />
      </div>

      {/* Top bar */}
      <header className="relative z-10 max-w-[1500px] mx-auto px-5 sm:px-8 md:px-12 pt-7 pb-4 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-3 group" data-testid="worlds-brand-link" aria-label="INONARA — home">
          <img src={INONARA_LOGO} alt="INONARA" className="h-10 sm:h-12 md:h-14 w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-1 border border-[#3a2a1c] bg-black/30 backdrop-blur px-1.5 py-1" data-testid="worlds-lang">
          <button onClick={() => setLang("en")} className={`px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] ${lang === "en" ? "bg-[#c89b54] text-[#1a120b]" : "text-bone/70 hover:text-[#e0c870]"}`} data-testid="worlds-lang-en">EN</button>
          <button onClick={() => setLang("fr")} className={`px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] ${lang === "fr" ? "bg-[#c89b54] text-[#1a120b]" : "text-bone/70 hover:text-[#e0c870]"}`} data-testid="worlds-lang-fr">FR</button>
        </div>
      </header>

      {/* Hero copy */}
      <section className="relative z-10 max-w-[1500px] mx-auto px-5 sm:px-8 md:px-12 pt-10 sm:pt-14 pb-10 sm:pb-16 text-center inonara-fade-up">
        <p className="text-[#c89b54]/80 text-[0.6rem] sm:text-xs tracking-[0.45em] uppercase">{t("inonara.tagline")}</p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#f1e3c4] mt-4 sm:mt-5 tracking-tight leading-[1.05]" data-testid="worlds-heading">
          {t("worlds.heading.before")} <span className="italic text-[#e0c870]">{t("worlds.heading.world")}</span>
        </h1>
        <p className="max-w-2xl mx-auto mt-5 sm:mt-7 text-bone/65 text-sm sm:text-base font-light leading-relaxed">
          {t("worlds.lead")}
        </p>
      </section>

      {/* World grid */}
      <section className="relative z-10 max-w-[1500px] mx-auto px-5 sm:px-8 md:px-12 pb-24" data-testid="worlds-grid">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {/* Active world — AfroAtlas */}
          {worlds.filter((w) => w.active).map((w, i) => (
            <Link
              key={w.id}
              to={w.to}
              className="inonara-card relative overflow-hidden md:col-span-2 lg:col-span-2 aspect-[16/10] md:aspect-[16/9] lg:aspect-[16/8] group block inonara-fade-up"
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
              data-testid={`world-card-${w.id}`}
            >
              <img src={w.image} alt={w.name} className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:opacity-80 group-hover:scale-[1.04] transition-all duration-[1400ms]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0f0a06] via-[#0f0a06]/55 to-transparent" />
              <div className="relative h-full p-6 sm:p-8 md:p-10 flex flex-col justify-end">
                <p className="text-[#c89b54] text-[0.6rem] sm:text-xs tracking-[0.32em] uppercase">{t(w.regionKey)}</p>
                <div className="flex items-center gap-4 mt-3">
                  {w.mark && <img src={w.mark} alt="" aria-hidden className="h-10 sm:h-12 md:h-14 w-auto object-contain shrink-0 drop-shadow-[0_0_18px_rgba(212,175,55,0.25)]" />}
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f1e3c4] leading-[0.98] tracking-tight">{w.name}</h2>
                </div>
                <p className="text-bone/75 text-sm sm:text-base font-light mt-4 max-w-xl leading-relaxed">{t(w.subtitleKey)}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[#e0c870] text-[0.65rem] sm:text-xs uppercase tracking-[0.28em] group-hover:gap-3 transition-all duration-500" data-testid={`world-cta-${w.id}`}>
                  {t("worlds.cta.enter")} <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}

          {/* Inactive worlds — locked, coming soon */}
          {worlds.filter((w) => !w.active).map((w, i) => (
            <div
              key={w.id}
              className="relative overflow-hidden aspect-[4/5] sm:aspect-[3/4] inonara-fade-up border border-[#3a2a1c]/70 bg-gradient-to-br from-[#1a120b] to-[#0f0a06]"
              style={{ animationDelay: `${0.45 + i * 0.08}s` }}
              data-testid={`world-card-${w.id}`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <Lock size={18} className="text-[#c89b54]/55" />
                <p className="text-[#c89b54]/70 text-[0.6rem] sm:text-xs tracking-[0.35em] uppercase mt-5">{t(w.regionKey)}</p>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#f1e3c4]/85 mt-3 tracking-tight">{w.name}</h3>
                <p className="text-bone/45 text-xs sm:text-sm font-light mt-3 max-w-[18rem]">{t(w.subtitleKey)}</p>
                <span className="mt-6 inline-block text-[#c89b54]/60 text-[0.55rem] tracking-[0.32em] uppercase">{t("worlds.cta.comingSoon")}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 max-w-[1500px] mx-auto px-5 sm:px-8 md:px-12 pb-10 text-center">
        <p className="text-bone/35 text-[0.6rem] tracking-[0.3em] uppercase">{t("inonara.footer")}</p>
      </footer>
    </div>
  );
};

export default Worlds;
