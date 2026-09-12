import { useI18n } from "../i18n";
import { localizedValue } from "../lib/contentSort";

const COPY = {
  fr: {
    eyebrow: "Sources",
    heading: "Sources documentaires",
    intro: "Les sources sont conservées au niveau du dossier et peuvent être reliées à chaque chapitre. Les pages d’images indiquent séparément leur crédit et leur licence.",
    institutional: "Institutionnel",
    academic: "Académique / spécialisé",
    media: "Images & médias",
  },
  en: {
    eyebrow: "Sources",
    heading: "Documentary sources",
    intro: "Sources are kept at dossier level and can be linked to each chapter. Image pages list their credit and licence separately.",
    institutional: "Institutional",
    academic: "Academic / specialist",
    media: "Images & media",
  },
};

export function CountrySources({ dossier = {} }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const sources = dossier.sources || [];
  const grouped = sources.reduce((acc, source) => {
    const key = source.category === 1 ? "institutional" : source.category === 2 ? "academic" : "media";
    (acc[key] ||= []).push(source);
    return acc;
  }, {});

  const groupLabels = {
    institutional: copy.institutional,
    academic: copy.academic,
    media: copy.media,
  };

  return (
    <section className="space-y-5">
      <header>
        <p className="overline text-gold">{copy.eyebrow}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{copy.heading}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-bone/55">{copy.intro}</p>
      </header>
      {Object.entries(grouped).map(([group, items]) => (
        <div key={group} className="rounded-2xl border border-bone/10 bg-bone/[.025] p-5">
          <h3 className="font-serif text-xl text-bone">{groupLabels[group] || group}</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {items.map((source, index) => {
              const publisher = localizedValue(source.publisher, lang);
              const title = localizedValue(source.title, lang);
              const note = localizedValue(source.note, lang);
              return (
                <a
                  key={source.id || source.url || `${group}-${index}`}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-bone/10 p-4 hover:border-gold/30 hover:bg-gold/[.03]"
                >
                  {publisher && <p className="text-[10px] uppercase tracking-[.15em] text-gold/75">{publisher}</p>}
                  {title && <h4 className="mt-1 text-sm text-bone">{title}</h4>}
                  {note && <p className="mt-2 text-xs leading-5 text-bone/50">{note}</p>}
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
