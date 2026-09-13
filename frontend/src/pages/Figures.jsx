import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, BookOpen, CalendarDays, ExternalLink, Filter, MapPin, RotateCcw } from "lucide-react";
import { fetchFigure, fetchFigures } from "../lib/api";
import { useI18n } from "../i18n";
import { SmartImage } from "../components/SmartImage";
import { FigurePlacesMap } from "../components/FigurePlacesMap";
import { localizedValue, searchableText, sortAlphabetically } from "../lib/contentSort";

const COPY = {
  en: {
    overline: "Figures · Biographical Atlas",
    title: "Lives inside African history",
    copy: "A bilingual, sourced biographical corpus connecting people to places, periods, works, debates and historical contexts. Uncertain information is labelled instead of presented as fact.",
    corpus: "Biographical corpus",
    corpusCopy: "profiles available",
    sourced: "Curated profiles",
    sourcedCopy: "rich FR/EN profiles with visible sources",
    places: "Connected places",
    placesCopy: "mapped biographical locations",
    search: "Search a name, alias, region, field, work or keyword…",
    filters: "Filters",
    region: "Region",
    period: "Period",
    domain: "Field",
    gender: "Gender",
    century: "Century",
    all: "All",
    reset: "Reset",
    oneResult: "profile",
    manyResults: "profiles",
    noResults: "No figure matches these filters.",
    enriched: "Enriched profile",
    basic: "Archive profile",
    approximate: "Approximate",
    uncertain: "Uncertain / debated",
    identity: "Identity",
    born: "Born",
    died: "Died",
    aliases: "Also known as",
    periodLabel: "Period",
    fields: "Fields",
    story: "Biography",
    context: "Historical context",
    contributions: "Contributions",
    debates: "Debates & historiography",
    legacy: "Legacy",
    works: "Works & achievements",
    chronology: "Personal chronology",
    links: "Future connections",
    countries: "Countries / territories",
    civilizations: "Civilizations",
    peoples: "Peoples",
    journeys: "Journeys",
    events: "Timeline events",
    pendingLinks: "Stable IDs are prepared for future cross-module links; no external module is required by this page.",
    media: "Media & rights",
    rights: "Rights / reuse note",
    sources: "Bibliography & sources",
    related: "Related figures",
    relatedCopy: "Suggested from shared regions and fields.",
    back: "All Figures",
    noDeath: "Living person / no death date",
    sourceOpen: "Open source",
    rightsOpen: "Open media reference",
  },
  fr: {
    overline: "Personnalités · Atlas biographique",
    title: "Des vies au cœur de l’histoire africaine",
    copy: "Un corpus biographique bilingue et sourcé qui relie les personnes aux lieux, périodes, œuvres, débats et contextes historiques. Les informations incertaines sont signalées au lieu d’être présentées comme des faits.",
    corpus: "Corpus biographique",
    corpusCopy: "fiches disponibles",
    sourced: "Fiches éditoriales",
    sourcedCopy: "profils riches FR/EN avec sources visibles",
    places: "Lieux reliés",
    placesCopy: "lieux biographiques cartographiés",
    search: "Rechercher un nom, une variante, une région, un domaine, une œuvre…",
    filters: "Filtres",
    region: "Région",
    period: "Période",
    domain: "Domaine",
    gender: "Genre",
    century: "Siècle",
    all: "Tous",
    reset: "Réinitialiser",
    oneResult: "fiche",
    manyResults: "fiches",
    noResults: "Aucune personnalité ne correspond à ces filtres.",
    enriched: "Fiche enrichie",
    basic: "Fiche d’archive",
    approximate: "Approximation",
    uncertain: "Incertain / débattu",
    identity: "Identité",
    born: "Naissance",
    died: "Décès",
    aliases: "Variantes de nom",
    periodLabel: "Période",
    fields: "Domaines",
    story: "Biographie",
    context: "Contexte historique",
    contributions: "Contributions",
    debates: "Débats & historiographie",
    legacy: "Héritage",
    works: "Œuvres & réalisations",
    chronology: "Chronologie personnelle",
    links: "Connexions futures",
    countries: "Pays / territoires",
    civilizations: "Civilisations",
    peoples: "Peuples",
    journeys: "Parcours",
    events: "Événements de chronologie",
    pendingLinks: "Les IDs stables préparent les futurs liens inter-modules ; cette page ne dépend directement d’aucun autre module.",
    media: "Médias & droits",
    rights: "Droits / note de réutilisation",
    sources: "Bibliographie & sources",
    related: "Fiches liées",
    relatedCopy: "Suggestions selon les régions et domaines partagés.",
    back: "Toutes les personnalités",
    noDeath: "Personne vivante / pas de date de décès",
    sourceOpen: "Ouvrir la source",
    rightsOpen: "Ouvrir la référence média",
  },
};

const REGION_LABELS = {
  "northeast-africa": { fr: "Afrique du Nord-Est", en: "Northeast Africa" },
  "north-africa": { fr: "Afrique du Nord", en: "North Africa" },
  "west-africa": { fr: "Afrique de l’Ouest", en: "West Africa" },
  sahel: { fr: "Sahel", en: "Sahel" },
  "central-africa": { fr: "Afrique centrale", en: "Central Africa" },
  "east-africa": { fr: "Afrique de l’Est", en: "East Africa" },
  "southern-africa": { fr: "Afrique australe", en: "Southern Africa" },
  diaspora: { fr: "Diaspora", en: "Diaspora" },
};

const PERIOD_LABELS = {
  ancient: { fr: "Antiquité", en: "Ancient" },
  medieval: { fr: "Médiéval", en: "Medieval" },
  "early-modern": { fr: "Époque moderne", en: "Early modern" },
  modern: { fr: "XIXe–XXe siècles", en: "19th–20th centuries" },
  contemporary: { fr: "Contemporain", en: "Contemporary" },
};

const DOMAIN_LABELS = {
  sovereignty: { fr: "Souveraineté", en: "Sovereignty" },
  politics: { fr: "Politique", en: "Politics" },
  architecture: { fr: "Architecture", en: "Architecture" },
  trade: { fr: "Commerce", en: "Trade" },
  religion: { fr: "Religion", en: "Religion" },
  patronage: { fr: "Mécénat", en: "Patronage" },
  diplomacy: { fr: "Diplomatie", en: "Diplomacy" },
  military: { fr: "Militaire", en: "Military" },
  resistance: { fr: "Résistance", en: "Resistance" },
  law: { fr: "Droit", en: "Law" },
  "human-rights": { fr: "Droits humains", en: "Human rights" },
  science: { fr: "Sciences", en: "Science" },
  environment: { fr: "Environnement", en: "Environment" },
  activism: { fr: "Activisme", en: "Activism" },
  history: { fr: "Histoire", en: "History" },
  anthropology: { fr: "Anthropologie", en: "Anthropology" },
  physics: { fr: "Physique", en: "Physics" },
  linguistics: { fr: "Linguistique", en: "Linguistics" },
  "political-thought": { fr: "Pensée politique", en: "Political thought" },
  literature: { fr: "Littérature", en: "Literature" },
  theatre: { fr: "Théâtre", en: "Theatre" },
  music: { fr: "Musique", en: "Music" },
  culture: { fr: "Culture", en: "Culture" },
  design: { fr: "Design", en: "Design" },
  education: { fr: "Éducation", en: "Education" },
};

const GENDER_LABELS = {
  female: { fr: "Femme", en: "Woman" },
  male: { fr: "Homme", en: "Man" },
  nonbinary: { fr: "Non-binaire", en: "Non-binary" },
};

const CATEGORY_LABELS = {
  queens: { fr: "Souveraines", en: "Queens & female rulers" },
  kings: { fr: "Souverains", en: "Kings & rulers" },
  rulers: { fr: "Dirigeants", en: "Rulers" },
  military: { fr: "Résistance & militaire", en: "Resistance & military" },
  scientists: { fr: "Scientifiques", en: "Scientists" },
  inventors: { fr: "Inventeurs", en: "Inventors" },
  civil_rights: { fr: "Droits civiques", en: "Civil rights" },
  intellectuals: { fr: "Penseurs", en: "Intellectuals" },
  artists: { fr: "Arts & culture", en: "Arts & culture" },
  athletes: { fr: "Sport", en: "Sport" },
};

function local(value, lang, fallback = "") {
  return localizedValue(value, lang, fallback);
}

function periodKey(figure) {
  const centuries = Array.isArray(figure.centuries) ? figure.centuries : [];
  if (centuries.some((c) => c < 0) || centuries.some((c) => c > 0 && c <= 5)) return "ancient";
  if (centuries.some((c) => c >= 6 && c <= 15)) return "medieval";
  if (centuries.some((c) => c >= 16 && c <= 18)) return "early-modern";
  if (centuries.includes(21)) return "contemporary";
  if (centuries.some((c) => c === 19 || c === 20)) return "modern";
  return "";
}

function centuryLabel(value, lang) {
  const n = Number(value);
  if (!Number.isFinite(n)) return String(value || "");
  if (n < 0) return lang === "fr" ? `${Math.abs(n)}e s. av. J.-C.` : `${Math.abs(n)}th c. BCE`;
  if (lang === "fr") return `${n}e siècle`;
  const suffix = n % 10 === 1 && n !== 11 ? "st" : n % 10 === 2 && n !== 12 ? "nd" : n % 10 === 3 && n !== 13 ? "rd" : "th";
  return `${n}${suffix} century`;
}

function certaintyBadge(certainty, copy) {
  if (certainty === "uncertain") return copy.uncertain;
  if (certainty === "approximate") return copy.approximate;
  return null;
}

function sourceLabel(source, lang) {
  return local(source?.title || source?.name || source, lang, "");
}

function FigureCard({ figure, lang, copy }) {
  const name = local(figure.name || figure.fullName, lang, figure.id);
  const summary = local(figure.summary, lang, "");
  const era = local(figure.era || figure.period, lang, "");
  const region = local(figure.region, lang, "");
  const enriched = Boolean(figure.figureId && (figure.biography || figure.historicalContext || figure.chronology));
  const domain = figure.domains?.[0];

  return (
    <Link
      to={`/figure/${figure.figureId || figure.id}`}
      data-testid={`figure-card-${figure.figureId || figure.id}`}
      className="museum-card group relative min-h-[420px] overflow-hidden"
    >
      <SmartImage
        src={figure.image_url}
        wikipediaTitle={enriched ? null : figure.wikipedia_title}
        alt={name}
        wrapperClassName="absolute inset-0"
        className="h-full w-full object-cover opacity-40 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-60"
        credit={figure.image_credit}
        sourceUrl={figure.image_source_url}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/85 to-ebony/30" />
      <div className="relative flex h-full min-h-[420px] flex-col justify-end p-6">
        <div className="mb-auto flex flex-wrap gap-2">
          <span className={`rounded-full border px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] ${enriched ? "border-gold/40 bg-gold/10 text-gold" : "border-bone/15 text-bone/45"}`}>
            {enriched ? copy.enriched : copy.basic}
          </span>
          {domain && <span className="rounded-full border border-bone/15 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-bone/55">{local(DOMAIN_LABELS[domain], lang, domain)}</span>}
        </div>
        <p className="overline text-[0.6rem]">{local(CATEGORY_LABELS[figure.category], lang, figure.category)}{region ? ` · ${region}` : ""}</p>
        <h3 className="mt-2 font-serif text-2xl leading-tight text-bone transition-colors group-hover:text-gold">{name}</h3>
        {era && <p className="mt-2 text-[0.7rem] uppercase tracking-[0.16em] text-gold">{era}</p>}
        {summary && <p className="mt-3 line-clamp-4 text-sm font-light leading-relaxed text-bone/70">{summary}</p>}
      </div>
    </Link>
  );
}

function SelectFilter({ label, value, onChange, options, lang, copy, testId }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-bone/45">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        data-testid={testId}
        className="w-full rounded-xl border border-bone/15 bg-ebony px-3 py-3 text-sm text-bone outline-none focus:border-gold/50"
      >
        <option value="">{copy.all}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{local(option.label, lang, option.value)}</option>
        ))}
      </select>
    </label>
  );
}

export const FiguresList = () => {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState(() => searchParams.get("q") || "");
  const [region, setRegion] = useState("");
  const [period, setPeriod] = useState("");
  const [domain, setDomain] = useState("");
  const [gender, setGender] = useState("");
  const [century, setCentury] = useState("");

  useEffect(() => { fetchFigures().then(setItems).catch(() => setItems([])); }, []);
  useEffect(() => {
    const urlQuery = searchParams.get("q") || "";
    setQuery((current) => current === urlQuery ? current : urlQuery);
  }, [searchParams]);

  const updateQuery = (value) => {
    setQuery(value);
    const next = new URLSearchParams(searchParams);
    if (value.trim()) next.set("q", value);
    else next.delete("q");
    setSearchParams(next, { replace: true });
  };

  const regionOptions = useMemo(() => {
    const values = new Set(items.flatMap((item) => item.regions || []));
    return [...values].sort().map((value) => ({ value, label: REGION_LABELS[value] || value }));
  }, [items]);
  const domainOptions = useMemo(() => {
    const values = new Set(items.flatMap((item) => item.domains || []));
    return [...values].sort().map((value) => ({ value, label: DOMAIN_LABELS[value] || value }));
  }, [items]);
  const genderOptions = useMemo(() => {
    const values = new Set(items.map((item) => item.gender).filter(Boolean));
    return [...values].sort().map((value) => ({ value, label: GENDER_LABELS[value] || value }));
  }, [items]);
  const centuryOptions = useMemo(() => {
    const values = new Set(items.flatMap((item) => item.centuries || []));
    return [...values].sort((a, b) => Number(a) - Number(b)).map((value) => ({ value: String(value), label: centuryLabel(value, lang) }));
  }, [items, lang]);
  const periodOptions = Object.entries(PERIOD_LABELS).map(([value, label]) => ({ value, label }));

  const filtered = useMemo(() => {
    const needle = searchableText(query).trim();
    const result = items.filter((item) => {
      const haystack = searchableText(
        item.name, item.fullName, item.aliases, item.summary, item.region, item.regions,
        item.period, item.era, item.category, item.domains, item.biography, item.historicalContext,
        item.contributions, item.legacy, item.works, item.places
      );
      if (needle && !haystack.includes(needle)) return false;
      if (region && !(item.regions || []).includes(region)) return false;
      if (period && periodKey(item) !== period) return false;
      if (domain && !(item.domains || []).includes(domain)) return false;
      if (gender && item.gender !== gender) return false;
      if (century && !(item.centuries || []).map(String).includes(String(century))) return false;
      return true;
    });
    return sortAlphabetically(result, "name", lang);
  }, [items, query, region, period, domain, gender, century, lang]);

  const enrichedCount = items.filter((item) => item.figureId && item.biography).length;
  const placesCount = new Set(items.flatMap((item) => item.places || []).map((place) => place.id).filter(Boolean)).size;
  const resetFilters = () => {
    setRegion(""); setPeriod(""); setDomain(""); setGender(""); setCentury("");
  };

  return (
    <div className="mx-auto max-w-[1600px] px-6 pb-24 pt-32 md:px-10" data-testid="figures-page">
      <p className="overline">{copy.overline}</p>
      <h1 className="mt-3 max-w-4xl font-serif text-5xl tracking-tight text-bone md:text-7xl">{copy.title}</h1>
      <p className="mt-6 max-w-3xl font-light leading-relaxed text-bone/70">{copy.copy}</p>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gold/20 bg-gold/[0.05] p-5">
          <p className="overline text-gold">{copy.corpus}</p>
          <p className="mt-2 font-serif text-3xl text-bone">{items.length}</p>
          <p className="mt-1 text-xs text-bone/50">{copy.corpusCopy}</p>
        </div>
        <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
          <p className="overline">{copy.sourced}</p>
          <p className="mt-2 font-serif text-3xl text-bone">{enrichedCount}</p>
          <p className="mt-1 text-xs text-bone/50">{copy.sourcedCopy}</p>
        </div>
        <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
          <p className="overline">{copy.places}</p>
          <p className="mt-2 font-serif text-3xl text-bone">{placesCount}</p>
          <p className="mt-1 text-xs text-bone/50">{copy.placesCopy}</p>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-bone/10 bg-bone/[0.02] p-5" data-testid="figures-search-filters">
        <div className="flex items-center gap-2 text-bone/55"><Filter size={15} /><span className="text-[10px] uppercase tracking-[0.2em]">{copy.filters}</span></div>
        <input
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
          placeholder={copy.search}
          aria-label={copy.search}
          className="mt-4 w-full rounded-xl border border-bone/15 bg-ebony px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50"
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <SelectFilter label={copy.region} value={region} onChange={setRegion} options={regionOptions} lang={lang} copy={copy} testId="figures-region-filter" />
          <SelectFilter label={copy.period} value={period} onChange={setPeriod} options={periodOptions} lang={lang} copy={copy} testId="figures-period-filter" />
          <SelectFilter label={copy.domain} value={domain} onChange={setDomain} options={domainOptions} lang={lang} copy={copy} testId="figures-domain-filter" />
          <SelectFilter label={copy.gender} value={gender} onChange={setGender} options={genderOptions} lang={lang} copy={copy} testId="figures-gender-filter" />
          <SelectFilter label={copy.century} value={century} onChange={setCentury} options={centuryOptions} lang={lang} copy={copy} testId="figures-century-filter" />
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-bone/45">{filtered.length} {filtered.length === 1 ? copy.oneResult : copy.manyResults}</p>
          {(region || period || domain || gender || century) && (
            <button type="button" onClick={resetFilters} className="inline-flex items-center gap-2 text-xs text-gold hover:text-bone">
              <RotateCcw size={13} /> {copy.reset}
            </button>
          )}
        </div>
      </section>

      {filtered.length ? (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((figure) => <FigureCard key={figure.figureId || figure.id} figure={figure} lang={lang} copy={copy} />)}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-bone/10 p-12 text-center text-bone/50">{copy.noResults}</div>
      )}
    </div>
  );
};

function Fact({ label, value, certainty, copy }) {
  if (!value) return null;
  const badge = certaintyBadge(certainty, copy);
  return (
    <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-4">
      <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-bone/80">{value}</p>
      {badge && <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-amber-200/70">{badge}</p>}
    </div>
  );
}

function IdGroup({ label, ids = [] }) {
  if (!ids.length) return null;
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {ids.map((id) => <span key={id} className="rounded-full border border-bone/10 bg-bone/[0.025] px-3 py-1 text-xs text-bone/60">{id}</span>)}
      </div>
    </div>
  );
}

export const FigureDetail = () => {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const { id } = useParams();
  const [figure, setFigure] = useState(null);
  const [allFigures, setAllFigures] = useState([]);

  useEffect(() => { fetchFigure(id).then(setFigure).catch(() => setFigure(null)); }, [id]);
  useEffect(() => { fetchFigures().then(setAllFigures).catch(() => setAllFigures([])); }, []);

  if (!figure) return <div className="pt-32 text-center text-bone/40 overline">Loading…</div>;

  const name = local(figure.name || figure.fullName, lang, id);
  const summary = local(figure.summary, lang, "");
  const era = local(figure.era || figure.period, lang, "");
  const region = local(figure.region, lang, "");
  const enriched = Boolean(figure.biography || figure.historicalContext || figure.chronology);
  const birth = figure.birth ? [local(figure.birth.dateLabel, lang, ""), local(figure.birth.place, lang, "")].filter(Boolean).join(" · ") : "";
  const death = figure.death ? [local(figure.death.dateLabel, lang, ""), local(figure.death.place, lang, "")].filter(Boolean).join(" · ") : enriched ? copy.noDeath : "";
  const biography = Array.isArray(figure.biography) ? figure.biography : figure.story ? [figure.story] : [];
  const contributions = Array.isArray(figure.contributions) ? figure.contributions : [];
  const controversies = Array.isArray(figure.controversies) ? figure.controversies : [];
  const works = Array.isArray(figure.works) ? figure.works : [];
  const chronology = Array.isArray(figure.chronology) ? [...figure.chronology].sort((a, b) => Number(a.year) - Number(b.year)) : [];

  const related = allFigures
    .filter((candidate) => (candidate.figureId || candidate.id) !== (figure.figureId || figure.id))
    .map((candidate) => {
      const sharedDomains = (candidate.domains || []).filter((value) => (figure.domains || []).includes(value)).length;
      const sharedRegions = (candidate.regions || []).filter((value) => (figure.regions || []).includes(value)).length;
      return { candidate, score: sharedDomains * 2 + sharedRegions };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.candidate);

  return (
    <div data-testid="figure-detail">
      <header className="relative min-h-[560px] overflow-hidden border-b border-bone/10">
        <SmartImage
          src={figure.image_url}
          wikipediaTitle={enriched ? null : figure.wikipedia_title}
          alt={name}
          wrapperClassName="absolute inset-0"
          className="h-full w-full object-cover opacity-35 animate-slow-zoom"
          credit={figure.image_credit}
          sourceUrl={figure.image_source_url}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/75 to-ebony/40" />
        <div className="relative mx-auto flex min-h-[560px] max-w-[1400px] flex-col justify-end px-6 pb-14 pt-32 md:px-10">
          <Link to="/figures" className="mb-8 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-bone/60 hover:text-gold" data-testid="back-to-figures">
            <ArrowLeft size={14} /> {copy.back}
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${enriched ? "border-gold/40 bg-gold/10 text-gold" : "border-bone/15 text-bone/50"}`}>
              {enriched ? copy.enriched : copy.basic}
            </span>
            {region && <span className="rounded-full border border-bone/15 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-bone/60">{region}</span>}
          </div>
          <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[0.95] tracking-tight text-bone md:text-7xl">{name}</h1>
          {era && <p className="mt-5 text-sm uppercase tracking-[0.22em] text-gold">{era}</p>}
          {summary && <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-bone/80">{summary}</p>}
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-14 px-6 py-16">
        {(birth || death || figure.aliases?.length || figure.period || figure.domains?.length) && (
          <section>
            <p className="overline text-gold">{copy.identity}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Fact label={copy.born} value={birth} certainty={figure.birth?.certainty} copy={copy} />
              <Fact label={copy.died} value={death} certainty={figure.death?.certainty} copy={copy} />
              {figure.aliases?.length ? <Fact label={copy.aliases} value={figure.aliases.join(" · ")} copy={copy} /> : null}
              {figure.period ? <Fact label={copy.periodLabel} value={local(figure.period, lang, "")} copy={copy} /> : null}
            </div>
            {figure.domains?.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {figure.domains.map((domain) => <span key={domain} className="rounded-full border border-gold/20 bg-gold/[0.04] px-3 py-1.5 text-xs text-gold/85">{local(DOMAIN_LABELS[domain], lang, domain)}</span>)}
              </div>
            ) : null}
          </section>
        )}

        {biography.length > 0 && (
          <section className="border-t border-[#2A2421] pt-10">
            <p className="overline">{copy.story}</p>
            <div className="mt-5 space-y-5 text-lg font-light leading-relaxed text-bone/85">
              {biography.map((paragraph, index) => <p key={index}>{local(paragraph, lang, "")}</p>)}
            </div>
          </section>
        )}

        {figure.historicalContext && (
          <section className="rounded-2xl border border-gold/20 bg-gold/[0.04] p-7">
            <p className="overline text-gold">{copy.context}</p>
            <p className="mt-4 text-base font-light leading-relaxed text-bone/80">{local(figure.historicalContext, lang, "")}</p>
          </section>
        )}

        {contributions.length > 0 && (
          <section className="border-t border-[#2A2421] pt-10">
            <p className="overline">{copy.contributions}</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {contributions.map((item, index) => (
                <div key={index} className="rounded-xl border border-bone/10 bg-bone/[0.02] p-5 text-sm leading-relaxed text-bone/75">
                  {local(item, lang, "")}
                </div>
              ))}
            </div>
          </section>
        )}

        {controversies.length > 0 && (
          <section className="border-t border-[#2A2421] pt-10" data-testid="figure-historiography">
            <p className="overline text-amber-200/80">{copy.debates}</p>
            <div className="mt-5 space-y-4">
              {controversies.map((item, index) => <p key={index} className="rounded-xl border border-amber-200/10 bg-amber-100/[0.025] p-5 text-sm leading-relaxed text-bone/75">{local(item, lang, "")}</p>)}
            </div>
          </section>
        )}

        {figure.legacy && (
          <section className="border-t border-[#2A2421] pt-10">
            <p className="overline">{copy.legacy}</p>
            <p className="mt-4 text-lg font-light leading-relaxed text-bone/85">{local(figure.legacy, lang, "")}</p>
          </section>
        )}

        {works.length > 0 && (
          <section className="border-t border-[#2A2421] pt-10">
            <div className="flex items-center gap-3"><BookOpen size={16} className="text-gold" /><p className="overline">{copy.works}</p></div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {works.map((work, index) => (
                <div key={`${local(work.title, lang, "work")}-${index}`} className="rounded-xl border border-bone/10 p-5">
                  <p className="font-serif text-lg text-bone">{local(work.title, lang, "")}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.15em] text-bone/45">{[work.type, work.date].filter(Boolean).join(" · ")}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {chronology.length > 0 && (
          <section className="border-t border-[#2A2421] pt-10" data-testid="figure-personal-timeline">
            <div className="flex items-center gap-3"><CalendarDays size={16} className="text-gold" /><p className="overline">{copy.chronology}</p></div>
            <div className="relative mt-7 border-l border-gold/20 pl-7">
              {chronology.map((event, index) => {
                const badge = certaintyBadge(event.certainty, copy);
                return (
                  <div key={`${event.year}-${index}`} className="relative pb-7 last:pb-0">
                    <span className="absolute -left-[31px] top-1 h-2 w-2 rounded-full bg-gold" />
                    <p className="text-xs font-medium uppercase tracking-[0.17em] text-gold">{event.year < 0 ? `${Math.abs(event.year)} BCE` : event.year}</p>
                    <p className="mt-2 text-sm leading-relaxed text-bone/80">{local(event.label, lang, "")}</p>
                    {badge && <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-amber-200/60">{badge}</p>}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <FigurePlacesMap places={figure.places || []} lang={lang} />

        {enriched && (
          <section className="border-t border-[#2A2421] pt-10" data-testid="figure-future-links">
            <div className="flex items-center gap-3"><MapPin size={16} className="text-gold" /><p className="overline">{copy.links}</p></div>
            <p className="mt-3 text-sm leading-relaxed text-bone/50">{copy.pendingLinks}</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <IdGroup label={copy.countries} ids={figure.countryIds} />
              <IdGroup label={copy.civilizations} ids={figure.civilizationIds} />
              <IdGroup label={copy.peoples} ids={figure.peopleIds} />
              <IdGroup label={copy.journeys} ids={figure.journeyIds} />
              <IdGroup label={copy.events} ids={figure.timelineEventIds} />
            </div>
          </section>
        )}

        {figure.media?.length > 0 && (
          <section className="border-t border-[#2A2421] pt-10">
            <p className="overline text-gold">{copy.media}</p>
            <div className="mt-5 space-y-3">
              {figure.media.map((media, index) => (
                <div key={`${media.sourceUrl}-${index}`} className="rounded-xl border border-bone/10 p-5">
                  <p className="font-serif text-lg text-bone">{local(media.title, lang, "")}</p>
                  {media.rights && <p className="mt-3 text-sm leading-relaxed text-bone/55"><span className="text-bone/35">{copy.rights}: </span>{local(media.rights, lang, "")}</p>}
                  {media.sourceUrl && <a href={media.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs text-gold underline underline-offset-2">{copy.rightsOpen} <ExternalLink size={12} /></a>}
                </div>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="border-t border-[#2A2421] pt-10">
            <p className="overline">{copy.related}</p>
            <p className="mt-2 text-sm text-bone/45">{copy.relatedCopy}</p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {related.map((candidate) => (
                <Link key={candidate.figureId || candidate.id} to={`/figure/${candidate.figureId || candidate.id}`} className="rounded-xl border border-bone/10 p-5 transition hover:border-gold/40">
                  <p className="font-serif text-lg text-bone">{local(candidate.name, lang, candidate.id)}</p>
                  <p className="mt-2 text-xs text-bone/45">{local(candidate.region, lang, "")}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {figure.sources?.length > 0 && (
          <section className="border-t border-[#2A2421] pt-10" data-testid="figure-sources">
            <p className="overline">{copy.sources}</p>
            <div className="mt-5 space-y-3">
              {figure.sources.map((source, index) => {
                const label = sourceLabel(source, lang);
                const metadata = [source.publisher || source.institution || source.author, source.year].filter(Boolean).join(" · ");
                const url = source.url || source.source_url;
                return (
                  <div key={`${label}-${index}`} className="rounded-xl border border-bone/10 bg-bone/[0.015] p-5">
                    <p className="text-sm text-bone/80">{label}</p>
                    {metadata && <p className="mt-1 text-xs text-bone/40">{metadata}</p>}
                    {url && <a href={url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-xs text-gold underline underline-offset-2">{copy.sourceOpen} <ExternalLink size={12} /></a>}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
