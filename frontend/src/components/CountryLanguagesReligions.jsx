import { useMemo, useState } from "react";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";
import { localizedValue, searchableText } from "../lib/contentSort";

function TranslatedInline({ value }) {
  const translated = useTranslated(value || "");
  return translated || localizedValue(value) || null;
}

function SourceLink({ source }) {
  const translatedPublisher = useTranslated(source?.publisher || "");
  const translatedTitle = useTranslated(source?.title || "");
  if (!source?.url) return null;
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noreferrer"
      className="rounded-full border border-gold/25 px-3 py-1 text-[11px] text-gold/85 hover:bg-gold/10"
    >
      {translatedPublisher || localizedValue(source.publisher)}: {translatedTitle || localizedValue(source.title) || source.id}
    </a>
  );
}

function SourceLinks({ ids = [], sourceMap }) {
  if (!ids.length || !sourceMap) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {ids.map((id) => {
        const source = sourceMap.get(id);
        return source ? <SourceLink key={id} source={source} /> : null;
      })}
    </div>
  );
}

function TranslatedNote({ text, className }) {
  const translated = useTranslated(text || "");
  if (!text) return null;
  return <p className={className}>{translated || localizedValue(text)}</p>;
}

function LanguageItem({ item, labels, lang }) {
  const translatedLanguage = useTranslated(item.language || "");
  const translatedNote = useTranslated(item.note || "");
  const percent = item.percent == null ? 0 : Number(item.percent);
  const languageLabel = translatedLanguage || localizedValue(item.language, lang);
  const note = translatedNote || localizedValue(item.note, lang);
  return (
    <article className="rounded-xl border border-bone/10 bg-bone/[0.025] p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h4 className="font-serif text-lg text-bone">{languageLabel}</h4>
          {item.note && <p className="mt-1 text-xs leading-relaxed text-bone/45">{note}</p>}
        </div>
        <strong className="text-gold">{item.percent == null ? labels.notSpecified : `${percent}%`}</strong>
      </div>
      {item.percent != null && (
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-bone/10">
          <div className="h-full rounded-full bg-gold/70" style={{ width: `${Math.min(100, percent)}%` }} />
        </div>
      )}
    </article>
  );
}

function ReligionItem({ item, total, locale, labels, lang }) {
  const translatedName = useTranslated(item.name || "");
  const translatedNote = useTranslated(item.note || "");
  const count = Number(item.count || 0);
  const share = total ? (count / total) * 100 : 0;
  const name = translatedName || localizedValue(item.name, lang);
  const note = translatedNote || localizedValue(item.note, lang);
  return (
    <article className="rounded-2xl border border-bone/10 bg-bone/[0.025] p-5">
      <h3 className="font-serif text-xl text-bone">{name}</h3>
      <p className="mt-2 font-serif text-2xl text-gold">{count.toLocaleString(locale)}</p>
      <p className="mt-1 text-xs text-bone/40">{share.toFixed(1)} % {labels.ofDisplayedTotal}</p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-bone/10">
        <div className="h-full rounded-full bg-gold/70" style={{ width: `${Math.min(100, share)}%` }} />
      </div>
      {item.note && <p className="mt-3 text-sm leading-6 text-bone/60">{note}</p>}
    </article>
  );
}

function datedCollection(container, prefix) {
  const entries = Object.entries(container || {})
    .filter(([key, value]) => key.startsWith(`${prefix}_`) && Array.isArray(value))
    .map(([key, value]) => ({ year: Number(key.slice(prefix.length + 1)) || null, value }))
    .sort((a, b) => (b.year || 0) - (a.year || 0));
  return entries[0] || { year: null, value: [] };
}

export function CountryLanguages({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const languages = useMemo(() => dossier.languages || {}, [dossier.languages]);
  const official = languages.official || [];
  const householdDataset = useMemo(() => datedCollection(languages, "household"), [languages]);
  const household = householdDataset.value;
  const censusYear = householdDataset.year;
  const [query, setQuery] = useState("");
  const labels = lang === "fr" ? {
    overline: "Langues",
    title: "Langues officielles, usages et transmission",
    intro: "Le statut officiel d’une langue ne signifie pas qu’elle est parlée de la même manière dans toutes les régions. Les chiffres ci-dessous concernent principalement la langue la plus parlée au foyer et doivent rester datés.",
    official: "Langues officielles",
    search: "Rechercher une langue",
    placeholder: "Rechercher une langue…",
    household: "Langue parlée au foyer",
    census: censusYear ? `Recensement ${censusYear}` : "Données de recensement",
    visibleTotal: "Total visible",
    notSpecified: "Non indiqué",
  } : {
    overline: "Languages",
    title: "Official languages, usage and transmission",
    intro: "Official status does not mean a language is spoken in the same way across every region. The figures below mainly describe the language most often spoken at home and should remain tied to their census date.",
    official: "Official languages",
    search: "Search for a language",
    placeholder: "Search for a language…",
    household: "Language spoken at home",
    census: censusYear ? `${censusYear} census` : "Census data",
    visibleTotal: "Visible total",
    notSpecified: "Not specified",
  };

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(lang === "fr" ? "fr" : "en");
    if (!needle) return household;
    return household.filter((item) => searchableText(item.language, item.note).includes(needle));
  }, [household, query, lang]);

  const totalKnown = visible.filter((item) => item.percent != null).reduce((sum, item) => sum + Number(item.percent), 0);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">{labels.overline}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{labels.title}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">{labels.intro}</p>
      </header>

      <section>
        <p className="overline text-gold">{labels.official}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {official.map((language, index) => (
            <span key={`${localizedValue(language, lang)}-${index}`} className="rounded-full border border-bone/15 bg-bone/[0.025] px-3 py-1.5 text-sm text-bone/75">
              <TranslatedInline value={language} />
            </span>
          ))}
        </div>
      </section>

      <label className="block">
        <span className="sr-only">{labels.search}</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.placeholder} aria-label={labels.search} className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50" />
      </label>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="overline text-gold">{labels.household}</p>
            <h3 className="mt-1 font-serif text-2xl text-bone">{labels.census}</h3>
          </div>
          {visible.some((item) => item.percent != null) && <p className="text-xs text-bone/40">{labels.visibleTotal} : {totalKnown.toFixed(1)} %</p>}
        </div>
        {visible.map((item, index) => <LanguageItem key={`${localizedValue(item.language, lang)}-${index}`} item={item} labels={labels} lang={lang} />)}
      </section>

      <TranslatedNote text={languages.note} className="rounded-xl border border-bone/10 bg-black/10 p-4 text-sm leading-6 text-bone/60" />
      <SourceLinks ids={languages.sources} sourceMap={sourceMap} />
    </div>
  );
}

export function CountryReligions({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const locale = lang === "fr" ? "fr-FR" : "en-US";
  const religions = useMemo(() => dossier.religions || {}, [dossier.religions]);
  const censusDataset = useMemo(() => datedCollection(religions, "census"), [religions]);
  const census = censusDataset.value;
  const censusYear = censusDataset.year;
  const [query, setQuery] = useState("");
  const labels = lang === "fr" ? {
    overline: "Religions & convictions",
    title: "Affiliations, pratiques et pluralité",
    intro: "Une affiliation déclarée dans un recensement ne décrit pas à elle seule la pratique, les croyances ou les appartenances multiples. Les traditions religieuses et spirituelles doivent être replacées dans leurs contextes historiques et communautaires.",
    search: "Rechercher une religion ou conviction",
    placeholder: "Rechercher une religion ou une conviction…",
    ofDisplayedTotal: censusYear ? `du total affiché · recensement ${censusYear}` : "du total affiché",
  } : {
    overline: "Religions & beliefs",
    title: "Affiliations, practices and plurality",
    intro: "A census affiliation does not by itself describe practice, belief or multiple forms of belonging. Religious and spiritual traditions should be understood within their historical and community contexts.",
    search: "Search for a religion or belief",
    placeholder: "Search for a religion or belief…",
    ofDisplayedTotal: censusYear ? `of displayed total · ${censusYear} census` : "of displayed total",
  };

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(lang === "fr" ? "fr" : "en");
    if (!needle) return census;
    return census.filter((item) => searchableText(item.name, item.note).includes(needle));
  }, [census, query, lang]);

  const total = census.reduce((sum, item) => sum + Number(item.count || 0), 0);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
        <p className="overline text-gold">{labels.overline}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{labels.title}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-bone/65">{labels.intro}</p>
      </header>

      <label className="block">
        <span className="sr-only">{labels.search}</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.placeholder} aria-label={labels.search} className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50" />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        {visible.map((item, index) => <ReligionItem key={`${localizedValue(item.name, lang)}-${index}`} item={item} total={total} locale={locale} labels={labels} lang={lang} />)}
      </div>

      <TranslatedNote text={religions.note} className="rounded-xl border border-bone/10 bg-black/10 p-4 text-sm leading-6 text-bone/60" />
      <SourceLinks ids={religions.sources} sourceMap={sourceMap} />
    </div>
  );
}