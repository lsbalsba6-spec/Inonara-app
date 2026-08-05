import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCivilizations } from "../lib/api";
import { useI18n } from "../i18n";
import { sortChronologically } from "../lib/contentSort";
import { SmartImage } from "../components/SmartImage";

const fmt = (y) => (y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`);

const Civilizations = () => {
  const { t } = useI18n();
  const [civs, setCivs] = useState([]);
  useEffect(() => { fetchCivilizations().then(setCivs).catch(() => {}); }, []);

  return (
    <div className="pt-32 pb-24 max-w-[1600px] mx-auto px-6 md:px-10" data-testid="civilizations-page">
      <p className="overline">{t("page.civilizations.overline")}</p>
      <h1 className="font-serif text-5xl md:text-6xl text-bone mt-3 tracking-tight" data-testid="civilizations-title">{t("page.civilizations.title")}</h1>
      <p className="text-bone/70 max-w-2xl mt-6 font-light leading-relaxed">
        {t("page.civilizations.lead")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        {sortChronologically(civs, "era_start", "name").map((c) => (
          <Link
            key={c.id}
            to={`/civilization/${c.id}`}
            data-testid={`civ-card-${c.id}`}
            className="museum-card relative group overflow-hidden aspect-[4/5]"
          >
            <SmartImage src={c.image_url} wikipediaTitle={c.wikipedia_title} alt={c.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover opacity-55 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-75" credit={c.image_credit} sourceUrl={c.image_source_url} />
            <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/70 to-ebony/10" />
            <div className="relative h-full p-7 flex flex-col justify-end">
              <p className="overline text-[0.65rem]">{t(`region.${c.region}`)}</p>
              <h3 className="font-serif text-3xl text-bone mt-3 leading-tight">{c.name}</h3>
              <p className="text-gold text-xs uppercase tracking-[0.2em] mt-2">{fmt(c.era_start)} — {fmt(c.era_end)}</p>
              <p className="text-bone/70 text-sm font-light mt-4 line-clamp-3">{c.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Civilizations;
