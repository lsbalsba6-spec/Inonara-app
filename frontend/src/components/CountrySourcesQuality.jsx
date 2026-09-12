import { useMemo, useState } from "react";
import { useI18n } from "../i18n";
import { localizedValue, searchableText } from "../lib/contentSort";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: {
    categories: {
      1: "Primary or institutional source",
      2: "Academic reference",
      3: "Specialized synthesis",
      4: "Complementary resource",
      A: "Archive, legal text or primary source",
      B: "Specialized academic publication",
      C: "Institution or specialized encyclopedia",
      D: "Press or institutional outreach",
      E: "General or secondary source",
    },
    category: "Category",
    unspecified: "unspecified",
    openSource: "Open source",
    noPublicLink: "Bibliographic reference with no public link provided.",
    histOverline: "Historiographical debates",
    histTitle: "What is established, debated or still uncertain",
    histIntro: "This section distinguishes widely established facts, competing interpretations and questions that remain open.",
    histEmpty: "No historiographical debate is documented yet.",
    gapsOverline: "To follow up",
    gapsTitle: "Topics to enrich or verify",
    gapsIntro: "Gaps are identified explicitly to avoid presenting incomplete content as definitive.",
    gapsBadge: "To follow up",
    gapsEmpty: "No pending research topic is currently documented.",
    sourcesOverline: "Sources",
    sourcesTitle: "Bibliography and dossier references",
    sourcesIntro: "References are classified by source level and should remain traceable to the claims they support.",
    search: "Search a title, organization or year…",
    all: "All",
    empty: "No source matches this search.",
  },
  fr: {
    categories: {
      1: "Source primaire ou institutionnelle",
      2: "Référence académique",
      3: "Synthèse spécialisée",
      4: "Ressource complémentaire",
      A: "Archive, texte juridique ou source primaire",
      B: "Publication académique spécialisée",
      C: "Institution ou encyclopédie spécialisée",
      D: "Presse ou vulgarisation institutionnelle",
      E: "Source générale ou secondaire",
    },
    category: "Catégorie",
    unspecified: "non indiquée",
    openSource: "Consulter la source",
    noPublicLink: "Référence bibliographique sans lien public renseigné.",
    histOverline: "Débats historiographiques",
    histTitle: "Ce qui est établi, discuté ou encore incertain",
    histIntro: "Cette section distingue les faits largement établis, les interprétations concurrentes et les questions encore ouvertes.",
    histEmpty: "Aucun débat historiographique n’est encore renseigné.",
    gapsOverline: "À suivre",
    gapsTitle: "Thèmes à enrichir ou vérifier",
    gapsIntro: "Les lacunes sont signalées explicitement pour éviter de présenter un contenu incomplet comme définitif.",
    gapsBadge: "À suivre",
    gapsEmpty: "Aucun thème en attente n’est actuellement renseigné.",
    sourcesOverline: "Sources",
    sourcesTitle: "Bibliographie et références du dossier",
    sourcesIntro: "Les références sont classées par niveau de source et doivent rester traçables jusqu’à l’assertion qu’elles soutiennent.",
    search: "Rechercher un titre, un organisme ou une année…",
    all: "Toutes",
    empty: "Aucune source ne correspond à cette recherche.",
  },
};

function TranslatedText({ value, className = "" }) {
  const { lang } = useI18n();
  const translated = useTranslated(value || "");
  if (!value) return null;
  return <p className={className}>{translated || localizedValue(value, lang)}</p>;
}

function SourceCard({ source, copy }) {
  const { lang } = useI18n();
  const translatedTitle = useTranslated(source?.title || "");
  const translatedPublisher = useTranslated(source?.publisher || "");
  const translatedLanguage = useTranslated(source?.language || "");
  const title = translatedTitle || localizedValue(source?.title, lang);
  const publisher = translatedPublisher || localizedValue(source?.publisher, lang);
  const sourceLanguage = translatedLanguage || localizedValue(source?.language, lang);

  return (
    <article className="rounded-2xl border border-bone/10 bg-bone/[0.025] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-gold">
            {copy.categories[source.category] || `${copy.category} ${localizedValue(source.category, lang) || copy.unspecified}`}
          </p>
          <h3 className="mt-2 font-serif text-xl text-bone">{title}</h3>
          {(publisher || source.year) && <p className="mt-1 text-xs text-bone/45">{publisher}{publisher && source.year ? " · " : ""}{source.year || ""}</p>}
        </div>
        {sourceLanguage && <span className="rounded-full border border-bone/15 px-2.5 py-1 text-[10px] uppercase tracking-wider text-bone/50">{sourceLanguage}</span>}
      </div>
      {source.note && <TranslatedText value={source.note} className="mt-4 text-sm leading-6 text-bone/65" />}
      {source.url ? (
        <a href={source.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border border-gold/30 px-3 py-1.5 text-xs text-gold hover:bg-gold/10">{copy.openSource}</a>
      ) : (
        <p className="mt-4 text-xs text-bone/45">{copy.noPublicLink}</p>
      )}
    </article>
  );
}

export function CountryHistoriography({ dossier }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const notes = dossier?.historiography || [];
  return (
    <div className="space-y-7">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">{copy.histOverline}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{copy.histTitle}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">{copy.histIntro}</p>
      </header>
      <div className="space-y-4">
        {notes.map((note, index) => (
          <article key={`${searchableText(note)}-${index}`} className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-5">
            <div className="flex gap-3"><span className="text-amber-300">⚠</span><TranslatedText value={note} className="text-sm leading-7 text-bone/75" /></div>
          </article>
        ))}
      </div>
      {!notes.length && <div className="rounded-xl border border-bone/10 p-5 text-bone/60">{copy.histEmpty}</div>}
    </div>
  );
}

export function CountryResearchGaps({ dossier }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const gaps = dossier?.research_gaps || [];
  return (
    <div className="space-y-7">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">{copy.gapsOverline}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{copy.gapsTitle}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">{copy.gapsIntro}</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {gaps.map((gap, index) => (
          <article key={`${searchableText(gap)}-${index}`} className="rounded-2xl border border-bone/10 bg-bone/[0.025] p-5">
            <div className="flex items-start justify-between gap-4">
              <TranslatedText value={gap} className="text-sm leading-7 text-bone/72" />
              <span className="shrink-0 rounded-full border border-bone/15 px-2.5 py-1 text-[10px] uppercase tracking-wider text-bone/50">{copy.gapsBadge}</span>
            </div>
          </article>
        ))}
      </div>
      {!gaps.length && <div className="rounded-xl border border-bone/10 p-5 text-bone/60">{copy.gapsEmpty}</div>}
    </div>
  );
}

export function CountrySources({ dossier }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const sources = useMemo(() => Array.isArray(dossier?.sources) ? dossier.sources.filter(Boolean) : [], [dossier?.sources]);
  const categories = useMemo(() => [...new Set(sources.map((source) => source.category).filter((value) => value !== undefined && value !== null))], [sources]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(lang === "fr" ? "fr" : "en");
    return sources.filter((source) => {
      const matchesCategory = category === "all" || String(source.category) === String(category);
      const haystack = searchableText(source.title, source.publisher, source.year, source.note, source.language);
      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [sources, query, category, lang]);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">{copy.sourcesOverline}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{copy.sourcesTitle}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">{copy.sourcesIntro}</p>
      </header>

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.search} aria-label={copy.search} className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50" />
        <div className="flex gap-2 overflow-x-auto">
          <button type="button" aria-pressed={category === "all"} onClick={() => setCategory("all")} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${category === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>{copy.all}</button>
          {categories.map((itemCategory) => (
            <button key={String(itemCategory)} type="button" aria-pressed={String(category) === String(itemCategory)} onClick={() => setCategory(itemCategory)} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${String(category) === String(itemCategory) ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>
              {copy.categories[itemCategory] || `${copy.category} ${localizedValue(itemCategory, lang)}`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {visible.map((source, index) => <SourceCard key={source.id || `${searchableText(source.title, source.publisher)}-${index}`} source={source} copy={copy} />)}
      </div>
      {!visible.length && <div className="rounded-xl border border-bone/10 p-5 text-bone/60">{copy.empty}</div>}
    </div>
  );
}
