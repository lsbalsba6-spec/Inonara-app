import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fetchJourney } from "../lib/api";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";
import { localizedValue, sortChronologically } from "../lib/contentSort";
import { SmartImage } from "../components/SmartImage";

const COPY = {
  fr: {
    timeLabel: "Dans le temps",
    timeTitle: "Chronologie complète",
    timeCopy: "Quitter le récit guidé pour explorer librement les périodes et événements.",
    spaceLabel: "Dans l’espace",
    spaceTitle: "Atlas interactif",
    spaceCopy: "Situer chaque étape, route, société et déplacement sur la carte Equal Earth.",
    deepenLabel: "Approfondir",
    deepenTitle: "Civilisations",
    deepenCopy: "Explorer les formations historiques rencontrées dans le parcours.",
    sourceRights: "source / droits",
  },
  en: {
    timeLabel: "Across time",
    timeTitle: "Full timeline",
    timeCopy: "Leave the guided narrative and freely explore periods and events.",
    spaceLabel: "Across space",
    spaceTitle: "Interactive atlas",
    spaceCopy: "Locate each stage, route, society and movement on the Equal Earth map.",
    deepenLabel: "Go deeper",
    deepenTitle: "Civilizations",
    deepenCopy: "Explore the historical formations encountered along the journey.",
    sourceRights: "source / rights",
  },
};

const formatYear = (year, t) => year < 0 ? `${Math.abs(year)} ${t("date.bce")}` : `${year} ${t("date.ce")}`;

const JourneyStop = ({ stop, index, t, copy, lang }) => {
  const heading = useTranslated(stop.heading || "");
  const era = useTranslated(stop.era || "");
  const place = useTranslated(stop.place || "");
  const story = useTranslated(stop.story || "");
  const linkLabel = useTranslated(stop.link?.label || "");
  const displayedHeading = heading || localizedValue(stop.heading, lang);
  const displayEra = era || localizedValue(stop.era, lang);
  const displayPlace = place || localizedValue(stop.place, lang);
  const displayStory = story || localizedValue(stop.story, lang);
  const displayLinkLabel = linkLabel || localizedValue(stop.link?.label, lang);
  const credit = localizedValue(stop.image_credit, lang);
  const headingParts = displayedHeading.split(".");
  const stepNumber = headingParts.length > 1 ? headingParts[0] : String(index + 1).padStart(2, "0");
  const title = headingParts.length > 1 ? headingParts.slice(1).join(".").trim() : displayedHeading;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="grid lg:grid-cols-2 gap-12 items-center py-16 border-t border-[#2A2421]"
      data-testid={`journey-stop-${stop.id}`}
    >
      <div className={index % 2 === 0 ? "" : "lg:order-2"}>
        <p className="font-serif text-7xl text-gold/30 leading-none">{stepNumber}</p>
        {(displayEra || displayPlace) && <p className="overline mt-4">{displayEra}{displayEra && displayPlace ? " · " : ""}{displayPlace}</p>}
        <h2 className="font-serif text-4xl md:text-5xl text-bone mt-4 leading-tight">{title}</h2>
        {displayStory && <p className="text-bone/80 mt-6 text-lg font-light leading-relaxed">{displayStory}</p>}
        <div className="mt-5 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.15em] text-bone/45">
          {displayEra && <span className="rounded-full border border-bone/15 px-3 py-1">{displayEra}</span>}
          {displayPlace && <span className="rounded-full border border-bone/15 px-3 py-1">{displayPlace}</span>}
          {Number.isFinite(stop.year) && <span className="rounded-full border border-gold/20 px-3 py-1 text-gold/75">{formatYear(stop.year, t)}</span>}
        </div>
        {stop.link?.to && displayLinkLabel && (
          <Link
            to={stop.link.to}
            className="inline-flex items-center gap-3 mt-8 px-6 py-3 border border-gold/40 text-gold text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-ebony transition-colors"
            data-testid={`journey-link-${stop.id}`}
          >
            {displayLinkLabel} <ArrowRight size={14} />
          </Link>
        )}
      </div>
      <div className={`relative aspect-[4/3] overflow-hidden ${index % 2 === 0 ? "" : "lg:order-1"}`}>
        <SmartImage src={stop.image_url} wikipediaTitle={stop.wikipedia_title} alt={title || displayedHeading} wrapperClassName="absolute inset-0" className="h-full w-full object-cover" credit={credit} sourceUrl={stop.image_source_url} />
        <div className="absolute inset-0 bg-gradient-to-tr from-ebony/70 to-transparent" />
        {(credit || stop.image_source_url) && (
          <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-ebony/80 px-3 py-2 text-[10px] text-bone/55 backdrop-blur-sm">
            {credit && <span>{credit}</span>}
            {stop.image_source_url && <a href={stop.image_source_url} target="_blank" rel="noreferrer" className="ml-2 text-gold/85 underline underline-offset-2">{copy.sourceRights}</a>}
          </div>
        )}
      </div>
    </motion.section>
  );
};

const JourneyIntro = ({ journey, lang }) => {
  const title = useTranslated(journey.title || "");
  const subtitle = useTranslated(journey.subtitle || "");
  const blurb = useTranslated(journey.blurb || "");
  const { t } = useI18n();
  const displayTitle = title || localizedValue(journey.title, lang);
  const displaySubtitle = subtitle || localizedValue(journey.subtitle, lang);
  const displayBlurb = blurb || localizedValue(journey.blurb, lang);

  return (
    <section className="pt-32 pb-16 max-w-4xl mx-auto px-6 text-center">
      <p className="overline">{t("journey.overline")}</p>
      <h1 className="font-serif text-5xl md:text-7xl text-bone mt-4 tracking-tight leading-[0.95]">{displayTitle}</h1>
      {displaySubtitle && <p className="font-serif italic text-2xl text-gold mt-5">{displaySubtitle}</p>}
      {displayBlurb && <p className="text-bone/70 mt-8 font-light leading-relaxed max-w-2xl mx-auto">{displayBlurb}</p>}
    </section>
  );
};

const Journey = () => {
  const { t, lang } = useI18n();
  const [j, setJ] = useState(null);
  const copy = COPY[lang] || COPY.en;
  useEffect(() => { fetchJourney().then(setJ).catch(() => setJ({ stops: [] })); }, []);
  if (!j) return <div className="pt-32 text-center text-bone/40 overline">{t("common.loading")}</div>;

  return (
    <div data-testid="journey-page">
      <JourneyIntro journey={j} lang={lang} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
        <section className="grid gap-4 md:grid-cols-3 mb-10">
          <Link to="/timeline" className="rounded-xl border border-gold/20 bg-gold/[0.04] p-5 transition hover:border-gold/50">
            <p className="overline text-gold">{copy.timeLabel}</p>
            <p className="mt-2 font-serif text-xl text-bone">{copy.timeTitle}</p>
            <p className="mt-2 text-xs leading-5 text-bone/50">{copy.timeCopy}</p>
          </Link>
          <Link to="/atlas" className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5 transition hover:border-gold/40">
            <p className="overline">{copy.spaceLabel}</p>
            <p className="mt-2 font-serif text-xl text-bone">{copy.spaceTitle}</p>
            <p className="mt-2 text-xs leading-5 text-bone/50">{copy.spaceCopy}</p>
          </Link>
          <Link to="/civilizations" className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5 transition hover:border-gold/40">
            <p className="overline">{copy.deepenLabel}</p>
            <p className="mt-2 font-serif text-xl text-bone">{copy.deepenTitle}</p>
            <p className="mt-2 text-xs leading-5 text-bone/50">{copy.deepenCopy}</p>
          </Link>
        </section>

        {sortChronologically(j.stops || [], "year", "heading").map((stop, index) => (
          <JourneyStop key={stop.id || `${stop.year || "stop"}-${index}`} stop={stop} index={index} t={t} copy={copy} lang={lang} />
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
