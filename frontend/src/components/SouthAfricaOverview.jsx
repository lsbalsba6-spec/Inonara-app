import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: {
    country: "Country",
    identity: "Country profile",
    atGlance: "at a glance",
    flagAlt: "Flag of",
    flag: "National flag",
    coatAlt: "Coat of arms of",
    coat: "National coat of arms",
    sourceLicense: "Source and license",
    visualRefs: "First visual references",
    sources: "Reference sources",
  },
  fr: {
    country: "Pays",
    identity: "Carte d’identité",
    atGlance: "en un regard",
    flagAlt: "Drapeau de",
    flag: "Drapeau national",
    coatAlt: "Armoiries de",
    coat: "Armoiries nationales",
    sourceLicense: "Source et licence",
    visualRefs: "Premiers repères visuels",
    sources: "Sources de référence",
  },
};

function FactCard({ label, value }) {
  const translatedLabel = useTranslated(label || "");
  const translatedValue = useTranslated(value || "");
  return (
    <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-4">
      <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{translatedLabel || label}</p>
      <p className="mt-2 text-sm leading-relaxed text-bone/85">{translatedValue || value}</p>
    </div>
  );
}

function TranslatedInline({ value }) {
  const translated = useTranslated(value || "");
  return translated || value;
}

function TranslatedText({ value, className = "" }) {
  const translated = useTranslated(value || "");
  if (!value) return null;
  return <p className={className}>{translated || value}</p>;
}

export function SouthAfricaOverview({ dossier, sourceMap }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const presentation = dossier.presentation || {};
  const countryName = dossier.name?.[lang] || dossier.name?.fr || dossier.name?.en || dossier.country || copy.country;
  const facts = presentation.facts || [];
  const gallery = (dossier.media_gallery || []).filter((item) => item.image_url).slice(0, 3);
  const overviewSources = (dossier.overview?.sources || []).map((id) => sourceMap.get(id)).filter(Boolean);
  const heading = presentation.heading || `${countryName} ${copy.atGlance}`;

  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] via-bone/[0.025] to-transparent p-6 md:p-8">
          <p className="overline text-gold">{copy.identity}</p>
          <h2 className="mt-3 font-serif text-3xl text-bone md:text-4xl"><TranslatedInline value={heading} /></h2>
          <TranslatedText value={dossier.overview?.summary} className="mt-4 max-w-3xl text-base leading-8 text-bone/75" />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {facts.map((item) => <FactCard key={item.label} label={item.label} value={item.value} />)}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {presentation.flag_url && (
            <figure className="flex min-h-[230px] flex-col items-center justify-center rounded-2xl border border-bone/10 bg-bone/[0.025] p-6">
              <img src={presentation.flag_url} alt={`${copy.flagAlt} ${countryName}`} className="w-full max-w-[320px] rounded-md shadow-2xl" />
              <figcaption className="mt-4 text-center">
                <p className="font-serif text-xl text-bone">{copy.flag}</p>
                {presentation.flag_source && <a href={presentation.flag_source} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-gold/80 underline">{copy.sourceLicense}</a>}
              </figcaption>
            </figure>
          )}

          {presentation.coat_url && (
            <figure className="flex min-h-[230px] flex-col items-center justify-center rounded-2xl border border-bone/10 bg-bone/[0.025] p-6">
              <img src={presentation.coat_url} alt={`${copy.coatAlt} ${countryName}`} className="max-h-44 w-auto" />
              <figcaption className="mt-4 text-center">
                <p className="font-serif text-xl text-bone">{copy.coat}</p>
                <TranslatedText value={presentation.coat_caption} className="mt-1 text-xs text-bone/45" />
                {presentation.coat_source && <a href={presentation.coat_source} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-gold/80 underline">{copy.sourceLicense}</a>}
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      {gallery.length > 0 && (
        <section>
          <p className="overline text-gold">{copy.visualRefs}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {gallery.map((item) => (
              <figure key={item.id || item.image_url} className="overflow-hidden rounded-xl border border-bone/10">
                <img src={item.image_url} alt={item.alt || item.title} className="h-56 w-full object-cover" />
                <figcaption className="p-4">
                  <TranslatedText value={item.title} className="font-serif text-lg text-bone" />
                  <TranslatedText value={item.caption} className="mt-1 text-xs text-bone/50" />
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-bone/10 bg-bone/[0.02] p-6">
        <p className="overline text-gold">{copy.sources}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {(presentation.source_links || []).map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="rounded-full border border-gold/30 px-4 py-2 text-xs text-gold">{link.label}</a>
          ))}
          {overviewSources.slice(0, 4).map((source) => (
            <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="rounded-full border border-bone/15 px-4 py-2 text-xs text-bone/65">{source.publisher}</a>
          ))}
        </div>
      </section>
    </div>
  );
}
