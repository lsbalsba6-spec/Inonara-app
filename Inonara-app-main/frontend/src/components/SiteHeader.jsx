import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import HeaderSearch from "./HeaderSearch";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "../i18n";
import { AFROATLAS_LOGO } from "../lib/brand";

const links = [
  { to: "/afroatlas", key: "nav.home" },
  { to: "/atlas", key: "nav.atlas" },
  { to: "/journey", key: "nav.journey" },
  { to: "/civilizations", key: "nav.civilizations" },
  { to: "/figures", key: "nav.figures" },
  { to: "/timeline", key: "nav.timeline" },
  { to: "/countries", key: "nav.countries" },
  { to: "/diaspora", key: "nav.diaspora" },
  { to: "/people", key: "nav.peoples" },
  { to: "/stories", key: "nav.stories" },
  { to: "/culture", key: "nav.culture" },
  { to: "/ask", key: "nav.ask" },
];

export const SiteHeader = () => {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass" data-testid="site-header">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 py-3 md:py-4 flex items-center justify-between gap-3">
        <Link to="/afroatlas" className="flex items-center gap-3 group shrink-0 min-w-0" data-testid="logo-link" aria-label="AfroAtlas — home">
          <img
            src={AFROATLAS_LOGO}
            alt="AfroAtlas"
            className="h-9 sm:h-10 md:h-14 w-auto max-w-[140px] sm:max-w-[160px] md:max-w-none object-contain transition-transform duration-700 group-hover:scale-[1.04]"
            data-testid="brand-logo"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6 lg:gap-7">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-${l.key.split(".").pop()}`}
              className={({ isActive }) =>
                `text-[0.7rem] uppercase tracking-[0.2em] transition-colors ${
                  isActive ? "text-gold" : "text-bone/70 hover:text-gold"
                }`
              }
              end={l.to === "/afroatlas"}
            >
              {t(l.key)}
            </NavLink>
          ))}
          <HeaderSearch />
          <LanguageToggle />
          <Link
            to="/worlds"
            data-testid="nav-inonara"
            className="ml-2 hidden lg:inline-flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.22em] text-bone/55 hover:text-[#e0c870] transition-colors"
            title={t("siteHeader.backToInonara")}
          >
            ← INONARA
          </Link>
        </nav>
        <button
          className="md:hidden text-bone"
          onClick={() => setOpen((o) => !o)}
          aria-label="toggle menu"
          data-testid="mobile-menu-toggle"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#2A2421] bg-ebony/95 backdrop-blur-xl">
          <div className="flex flex-col px-6 py-4 gap-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-sm uppercase tracking-[0.2em] py-2 ${isActive ? "text-gold" : "text-bone/80"}`
                }
                end={l.to === "/afroatlas"}
                data-testid={`mobile-nav-${l.key.split(".").pop()}`}
              >
                {t(l.key)}
              </NavLink>
            ))}
            <div className="pt-3 border-t border-[#2A2421]"><LanguageToggle /></div>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
