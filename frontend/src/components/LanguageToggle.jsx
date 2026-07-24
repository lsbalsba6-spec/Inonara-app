import { useI18n } from "../i18n";

export const LanguageToggle = () => {
  const { lang, setLang } = useI18n();
  return (
    <div className="flex items-center gap-1 border border-[#2A2421] px-1.5 py-1" data-testid="lang-toggle">
      <button
        onClick={() => setLang("en")}
        className={`px-2 py-1 text-[10px] uppercase tracking-[0.18em] transition-colors ${lang === "en" ? "bg-gold text-ebony" : "text-bone/60 hover:text-gold"}`}
        aria-label="Switch to English"
        data-testid="lang-en"
      >
        <span className="mr-1">🇬🇧</span>EN
      </button>
      <button
        onClick={() => setLang("fr")}
        className={`px-2 py-1 text-[10px] uppercase tracking-[0.18em] transition-colors ${lang === "fr" ? "bg-gold text-ebony" : "text-bone/60 hover:text-gold"}`}
        aria-label="Passer en français"
        data-testid="lang-fr"
      >
        <span className="mr-1">🇫🇷</span>FR
      </button>
    </div>
  );
};

export default LanguageToggle;
