import { AFROATLAS_LOGO } from "../lib/brand";
import { useI18n } from "../i18n";

const COPY = {
  en: {
    description:
      "A cinematic, map-driven learning platform tracing African origins, empires, diaspora formation, and global cultural influence — grounded in scholarship.",
    notice: "Content for educational purposes. Sources cited in each entry.",
  },
  fr: {
    description:
      "Une plateforme d’apprentissage cinématographique guidée par la cartographie, pour explorer les origines africaines, les empires, la formation des diasporas et les influences culturelles mondiales — avec un ancrage académique.",
    notice: "Contenus à vocation éducative. Les sources sont citées dans chaque entrée.",
  },
};

export const SiteFooter = () => {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;

  return (
    <footer className="border-t border-[#2A2421] mt-24" data-testid="site-footer">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={AFROATLAS_LOGO}
            alt="AfroAtlas"
            className="h-16 w-auto object-contain shrink-0"
            data-testid="footer-logo"
          />
          <p className="text-bone/60 text-sm max-w-md font-light">
            {copy.description}
          </p>
        </div>
        <p className="text-bone/40 text-xs">
          {copy.notice}
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
