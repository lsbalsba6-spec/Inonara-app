import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { INONARA_LOGO } from "../lib/brand";
import { useI18n } from "../i18n";

/**
 * INONARA — cinematic intro / gateway.
 * Renders the official logo, an ambient earthy-dark background with floating
 * dust + a slow gold halo, then transitions to the world selection hub.
 *
 * Transition triggers:
 *  - Auto-advance after 4.2s
 *  - Any click / keypress / scroll
 */
const DUST_COUNT = 28;

const Inonara = () => {
  const { t, lang, setLang } = useI18n();
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);

  // Pre-compute dust particle positions/durations once.
  const dust = useMemo(
    () => Array.from({ length: DUST_COUNT }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      delay: `${(Math.random() * 8).toFixed(2)}s`,
      duration: `${(8 + Math.random() * 12).toFixed(2)}s`,
      scale: 0.5 + Math.random() * 1.8,
      key: i,
    })),
    [],
  );

  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => navigate("/worlds"), 600);
  };

  useEffect(() => {
    const t1 = setTimeout(enter, 4200);
    const handler = () => enter();
    window.addEventListener("click", handler, { once: true });
    window.addEventListener("keydown", handler, { once: true });
    return () => {
      clearTimeout(t1);
      window.removeEventListener("click", handler);
      window.removeEventListener("keydown", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed inset-0 overflow-hidden inonara-bg transition-opacity duration-700 ${leaving ? "opacity-0" : "opacity-100"}`}
      data-testid="inonara-intro"
    >
      {/* Map texture wash */}
      <div className="inonara-map" />

      {/* Floating dust particles */}
      {dust.map((d) => (
        <span
          key={d.key}
          className="inonara-dust"
          style={{
            left: d.left,
            bottom: "-4vh",
            animationDelay: d.delay,
            animationDuration: d.duration,
            transform: `scale(${d.scale})`,
          }}
        />
      ))}

      {/* Slow golden halo */}
      <div className="inonara-halo" />

      {/* Horizon line */}
      <div className="inonara-horizon" />

      {/* Top-right language toggle (kept lightweight so the splash stays clean) */}
      <div className="absolute top-5 right-5 sm:top-6 sm:right-7 z-20 flex items-center gap-1 border border-[#3a2a1c] bg-black/30 backdrop-blur px-1.5 py-1" data-testid="inonara-lang">
        <button
          onClick={(e) => { e.stopPropagation(); setLang("en"); }}
          className={`px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] ${lang === "en" ? "bg-[#c89b54] text-[#1a120b]" : "text-bone/70 hover:text-[#e0c870]"}`}
          data-testid="inonara-lang-en"
        >EN</button>
        <button
          onClick={(e) => { e.stopPropagation(); setLang("fr"); }}
          className={`px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] ${lang === "fr" ? "bg-[#c89b54] text-[#1a120b]" : "text-bone/70 hover:text-[#e0c870]"}`}
          data-testid="inonara-lang-fr"
        >FR</button>
      </div>

      {/* Centered logo + tagline */}
      <div className="relative h-full w-full flex flex-col items-center justify-center px-6">
        <img
          src={INONARA_LOGO}
          alt="INONARA"
          className="w-[78vw] max-w-[520px] sm:max-w-[600px] md:max-w-[720px] h-auto object-contain inonara-fade-up drop-shadow-[0_0_45px_rgba(212,175,55,0.18)]"
          data-testid="inonara-logo"
        />

        <p
          className="mt-6 sm:mt-8 text-[#c89b54]/80 text-[0.65rem] sm:text-xs tracking-[0.5em] uppercase inonara-fade-up text-center"
          style={{ animationDelay: "0.6s" }}
          data-testid="inonara-tagline"
        >
          {t("inonara.tagline")}
        </p>

        <button
          onClick={(e) => { e.stopPropagation(); enter(); }}
          className="mt-10 sm:mt-14 px-6 sm:px-8 py-3 sm:py-3.5 border border-[#c89b54]/45 text-[#e0c870] text-[0.65rem] sm:text-xs uppercase tracking-[0.32em] hover:bg-[#c89b54] hover:text-[#1a120b] transition-all duration-500 inonara-fade-up"
          style={{ animationDelay: "1.4s" }}
          data-testid="inonara-enter"
        >
          {t("inonara.enter")}
        </button>

        <p
          className="absolute bottom-7 sm:bottom-9 left-0 right-0 text-center text-bone/30 text-[0.6rem] tracking-[0.3em] uppercase inonara-fade-up pointer-events-none"
          style={{ animationDelay: "2s" }}
        >
          {t("inonara.hint")}
        </p>
      </div>
    </div>
  );
};

export default Inonara;
