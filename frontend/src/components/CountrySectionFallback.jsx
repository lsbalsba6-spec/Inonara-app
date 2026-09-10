import { useI18n } from "../i18n";

const COPY = {
  en: {
    section: "Section",
    preparing: "Content in preparation",
    message: "Content is currently being expanded.",
  },
  fr: {
    section: "Section",
    preparing: "Contenu en préparation",
    message: "Contenu en cours d’enrichissement.",
  },
};

export default function CountrySectionFallback({ title, message }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  return (
    <div className="rounded-2xl border border-bone/10 bg-bone/[0.025] p-6">
      <p className="overline text-gold">{title || copy.section}</p>
      <h2 className="mt-2 font-serif text-2xl text-bone">{copy.preparing}</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-bone/60">{message || copy.message}</p>
    </div>
  );
}
