import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, ExternalLink, MapPin, Network } from "lucide-react";
import { useI18n } from "../i18n";
import JourneyMap from "../components/JourneyMap";
import { JOURNEY_CATEGORIES, JOURNEY_DIMENSIONS, getLocalized, journeys } from "../data/journeys";

const COPY = {
  fr: {
    overline: "Parcours · Journey",
    heading: "Traverser l’histoire par étapes",
    intro: "Choisissez un parcours, puis avancez étape par étape. La carte, le contexte et les relations documentaires évoluent avec votre progression.",
    choose: "Choisir un parcours",
    stop: "Étape",
    of: "sur",
    previous: "Précédente",
    next: "Suivante",
    relatedEvent: "Événement lié",
    futureLinks: "Connexions préparées",
    futureLinksCopy: "Ces identifiants sont prêts pour relier plus tard cette étape aux pays, civilisations, peuples, personnalités et événements sans dépendre aujourd’hui de leurs branches.",
    sources: "Sources du parcours",
    sourcesCopy: "Les textes sont synthétisés et paraphrasés. Les sources servent à vérifier et approfondir le parcours.",
    completed: "Parcours terminé",
    restart: "Revenir au début",
    steps: "étapes",
    exploreBy: "Explorer par",
    region: "Région", periodFilter: "Période", theme: "Thème", people: "Peuple", clearFilters: "Effacer les filtres",
  },
  en: {
    overline: "Journey · Parcours",
    heading: "Move through history one stop at a time",
    intro: "Choose a journey, then progress stop by stop. The map, context and documentary relationships evolve as you move forward.",
    choose: "Choose a journey",
    stop: "Stop",
    of: "of",
    previous: "Previous",
    next: "Next",
    relatedEvent: "Related event",
    futureLinks: "Prepared connections",
    futureLinksCopy: "These identifiers are ready to connect this stop later to countries, civilizations, peoples, figures and timeline events without depending on their branches today.",
    sources: "Journey sources",
    sourcesCopy: "The texts are synthesized and paraphrased. Sources are provided for verification and further reading.",
    completed: "Journey complete",
    restart: "Return to the beginning",
    steps: "stops",
    exploreBy: "Explore by",
    region: "Region", periodFilter: "Period", theme: "Theme", people: "People", clearFilters: "Clear filters",
  },
};

const RelationPills = ({ stop }) => {
  const groups = [
    ["country", stop.countryIds],
    ["civilization", stop.civilizationIds],
    ["figure", stop.figureIds],
    ["people", stop.peopleIds],
    ["timeline", stop.timelineEventIds],
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {groups.flatMap(([type, ids]) => (ids || []).map((id) => (
        <span key={`${type}-${id}`} className="rounded-full border border-bone/10 bg-bone/[0.025] px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-bone/50">
          {type}: {id}
        </span>
      )))}
    </div>
  );
};

const JourneyCard = ({ journey, active, onClick, lang, copy }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full rounded-xl border p-5 text-left transition-colors ${active ? "border-gold/60 bg-gold/[0.08]" : "border-bone/10 bg-bone/[0.02] hover:border-gold/30"}`}
    aria-pressed={active}
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-gold/80">{getLocalized(journey.period, lang)}</p>
        <h3 className="mt-2 font-serif text-2xl leading-tight text-bone">{getLocalized(journey.title, lang)}</h3>
        <p className="mt-2 text-sm leading-6 text-bone/55">{getLocalized(journey.subtitle, lang)}</p>
      </div>
      <span className="shrink-0 rounded-full border border-bone/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-bone/45">
        {journey.stops.length} {copy.steps}
      </span>
    </div>
  </button>
);

const Journey = () => {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const [category, setCategory] = useState("all");
  const [journeyId, setJourneyId] = useState(journeys[0].journeyId);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dimensionFilters, setDimensionFilters] = useState({ region: "all", period: "all", theme: "all", people: "all" });

  const filteredJourneys = useMemo(
    () => journeys.filter((journey) => {
      if (category !== "all" && journey.category !== category) return false;
      if (dimensionFilters.region !== "all" && !(journey.regionIds || []).includes(dimensionFilters.region)) return false;
      if (dimensionFilters.period !== "all" && !(journey.periodIds || []).includes(dimensionFilters.period)) return false;
      if (dimensionFilters.theme !== "all" && !(journey.themeIds || []).includes(dimensionFilters.theme)) return false;
      if (dimensionFilters.people !== "all" && !(journey.peopleIds || []).includes(dimensionFilters.people)) return false;
      return true;
    }),
    [category, dimensionFilters]
  );

  const activeJourney = journeys.find((journey) => journey.journeyId === journeyId) || filteredJourneys[0] || journeys[0];
  const stops = activeJourney.stops || [];
  const activeStop = stops[activeIndex] || stops[0];
  const progress = stops.length ? ((activeIndex + 1) / stops.length) * 100 : 0;

  useEffect(() => {
    if (!filteredJourneys.some((journey) => journey.journeyId === journeyId)) {
      setJourneyId(filteredJourneys[0]?.journeyId || journeys[0].journeyId);
      setActiveIndex(0);
    }
  }, [filteredJourneys, journeyId]);

  useEffect(() => {
    setActiveIndex(0);
  }, [journeyId]);

  const selectJourney = (id) => {
    setJourneyId(id);
    setActiveIndex(0);
  };

  const selectStop = (index) => {
    setActiveIndex(Math.max(0, Math.min(index, stops.length - 1)));
  };

  return (
    <div data-testid="journey-page" className="pb-24">
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-32 md:px-10 md:pt-36">
        <p className="overline text-gold">{copy.overline}</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] text-bone md:text-7xl">{copy.heading}</h1>
        <p className="mt-7 max-w-3xl text-base font-light leading-7 text-bone/65 md:text-lg">{copy.intro}</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 md:px-10" aria-labelledby="journey-picker-title">
        <div className="flex flex-col gap-5 border-y border-bone/10 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 id="journey-picker-title" className="font-serif text-2xl text-bone">{copy.choose}</h2>
            <div className="flex flex-wrap gap-2">
              {JOURNEY_CATEGORIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(item.id)}
                  className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.14em] transition-colors ${category === item.id ? "border-gold bg-gold text-ebony" : "border-bone/15 text-bone/55 hover:border-gold/40 hover:text-gold"}`}
                  aria-pressed={category === item.id}
                >
                  {getLocalized(item.label, lang)}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-bone/10 bg-bone/[0.015] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-bone/45">{copy.exploreBy}</p>
              <button type="button" onClick={() => setDimensionFilters({ region: "all", period: "all", theme: "all", people: "all" })} className="text-[10px] uppercase tracking-[0.12em] text-gold/70 hover:text-gold">{copy.clearFilters}</button>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["region", copy.region, JOURNEY_DIMENSIONS.regions],
                ["period", copy.periodFilter, JOURNEY_DIMENSIONS.periods],
                ["theme", copy.theme, JOURNEY_DIMENSIONS.themes],
                ["people", copy.people, Array.from(new Set(journeys.flatMap((journey) => journey.peopleIds || []))).map((id) => ({ id, label: { fr: id.replaceAll("-", " "), en: id.replaceAll("-", " ") } }))],
              ].map(([key, label, options]) => (
                <label key={key} className="text-[10px] uppercase tracking-[0.12em] text-bone/45">
                  {label}
                  <select value={dimensionFilters[key]} onChange={(event) => setDimensionFilters((current) => ({ ...current, [key]: event.target.value }))} className="mt-2 w-full rounded-lg border border-bone/10 bg-ebony px-3 py-2 text-xs normal-case tracking-normal text-bone/70 outline-none focus:border-gold/50">
                    <option value="all">{lang === "fr" ? "Tous" : "All"}</option>
                    {options.map((option) => <option key={option.id} value={option.id}>{getLocalized(option.label, lang)}</option>)}
                  </select>
                </label>
              ))}
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            {filteredJourneys.map((journey) => (
              <JourneyCard key={journey.journeyId} journey={journey} active={journey.journeyId === activeJourney.journeyId} onClick={() => selectJourney(journey.journeyId)} lang={lang} copy={copy} />
            ))}
          </div>
        </div>
      </section>

      <article className="mx-auto mt-12 max-w-6xl px-6 md:px-10" key={activeJourney.journeyId}>
        <header className="grid gap-8 lg:grid-cols-[1fr_0.34fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-gold/80">
              <span className="inline-flex items-center gap-2"><CalendarDays size={13} /> {getLocalized(activeJourney.period, lang)}</span>
              <span className="text-bone/20">•</span>
              <span>{stops.length} {copy.steps}</span>
            </div>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-bone md:text-5xl">{getLocalized(activeJourney.title, lang)}</h2>
            <p className="mt-3 font-serif text-xl italic text-gold/90">{getLocalized(activeJourney.subtitle, lang)}</p>
            <p className="mt-6 max-w-4xl text-sm leading-7 text-bone/65 md:text-base">{getLocalized(activeJourney.introduction, lang)}</p>
          </div>
          <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-4">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-bone/45">
              <span>{copy.stop} {activeIndex + 1} {copy.of} {stops.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-bone/10">
              <div className="h-full rounded-full bg-gold transition-[width] duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </header>

        <div className="mt-9">
          <JourneyMap journey={activeJourney} activeIndex={activeIndex} onSelectStop={selectStop} lang={lang} />
        </div>

        <nav className="mt-5 overflow-x-auto pb-2" aria-label={lang === "fr" ? "Étapes du parcours" : "Journey stops"}>
          <div className="flex min-w-max gap-2">
            {stops.map((stop, index) => (
              <button
                key={stop.stopId}
                type="button"
                onClick={() => selectStop(index)}
                className={`min-w-[180px] rounded-xl border px-4 py-3 text-left transition-colors ${index === activeIndex ? "border-gold/60 bg-gold/[0.08]" : index < activeIndex ? "border-gold/20 bg-gold/[0.025]" : "border-bone/10 bg-bone/[0.015]"}`}
                aria-current={index === activeIndex ? "step" : undefined}
              >
                <span className="text-[10px] uppercase tracking-[0.15em] text-gold/70">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-1 block max-w-[190px] truncate text-sm text-bone/75">{getLocalized(stop.place.name, lang)}</span>
              </button>
            ))}
          </div>
        </nav>

        {activeStop && (
          <section className="mt-7 grid gap-7 rounded-2xl border border-bone/10 bg-bone/[0.025] p-6 md:p-8 lg:grid-cols-[0.36fr_1fr]" data-testid={`journey-stop-${activeStop.stopId}`}>
            <aside className="border-b border-bone/10 pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-7">
              <p className="overline text-gold">{copy.stop} {activeIndex + 1}</p>
              <div className="mt-5 flex items-start gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-gold" />
                <div>
                  <p className="font-serif text-2xl text-bone">{getLocalized(activeStop.place.name, lang)}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-bone/40">{getLocalized(activeStop.period, lang)}</p>
                </div>
              </div>
              <div className="mt-6 rounded-xl border border-bone/10 p-4">
                <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-bone/45"><Network size={13} /> IDs</p>
                <p className="mt-2 break-all font-mono text-[11px] leading-5 text-gold/70">journeyId: {activeJourney.journeyId}</p>
                <p className="break-all font-mono text-[11px] leading-5 text-gold/70">stopId: {activeStop.stopId}</p>
              </div>
            </aside>

            <div>
              <h3 className="font-serif text-3xl leading-tight text-bone md:text-4xl">{getLocalized(activeStop.title, lang)}</h3>
              <p className="mt-5 text-base font-light leading-8 text-bone/75">{getLocalized(activeStop.context, lang)}</p>

              {(activeStop.linkedEvents || []).length > 0 && (
                <div className="mt-7 rounded-xl border border-gold/15 bg-gold/[0.035] p-5">
                  <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-gold"><BookOpen size={13} /> {copy.relatedEvent}</p>
                  <div className="mt-3 space-y-2">
                    {activeStop.linkedEvents.map((event, index) => <p key={index} className="text-sm text-bone/70">{getLocalized(event, lang)}</p>)}
                  </div>
                </div>
              )}

              <details className="mt-5 rounded-xl border border-bone/10 p-5">
                <summary className="cursor-pointer text-xs uppercase tracking-[0.15em] text-bone/65">{copy.futureLinks}</summary>
                <p className="mt-3 max-w-3xl text-xs leading-5 text-bone/45">{copy.futureLinksCopy}</p>
                <div className="mt-4"><RelationPills stop={activeStop} /></div>
              </details>
            </div>
          </section>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => selectStop(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-bone/15 px-5 py-3 text-xs uppercase tracking-[0.14em] text-bone/65 transition-colors hover:border-gold/40 hover:text-gold disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft size={15} /> {copy.previous}
          </button>

          {activeIndex < stops.length - 1 ? (
            <button
              type="button"
              onClick={() => selectStop(activeIndex + 1)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-xs uppercase tracking-[0.14em] text-ebony transition-colors hover:bg-bone"
            >
              {copy.next} <ArrowRight size={15} />
            </button>
          ) : (
            <div className="flex flex-wrap items-center justify-end gap-3">
              <span className="text-xs uppercase tracking-[0.14em] text-gold">{copy.completed}</span>
              <button type="button" onClick={() => selectStop(0)} className="rounded-full border border-gold/30 px-5 py-3 text-xs uppercase tracking-[0.14em] text-gold hover:bg-gold hover:text-ebony">
                {copy.restart}
              </button>
            </div>
          )}
        </div>

        <section className="mt-16 border-t border-bone/10 pt-8" aria-labelledby="journey-sources-title">
          <p className="overline text-gold">Documentation</p>
          <h3 id="journey-sources-title" className="mt-2 font-serif text-3xl text-bone">{copy.sources}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-bone/50">{copy.sourcesCopy}</p>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {activeJourney.sources.map((source) => (
              <a key={source.sourceId} href={source.url} target="_blank" rel="noreferrer" className="group rounded-xl border border-bone/10 bg-bone/[0.02] p-5 transition-colors hover:border-gold/35">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-gold/75">{source.publisher}</p>
                  <ExternalLink size={13} className="shrink-0 text-bone/35 group-hover:text-gold" />
                </div>
                <p className="mt-3 text-sm leading-6 text-bone/70">{source.title}</p>
              </a>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};

export default Journey;
