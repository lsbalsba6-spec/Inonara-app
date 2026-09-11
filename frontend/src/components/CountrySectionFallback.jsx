import { useI18n } from "../i18n";

const COPY = {
  en: {
    section: "Section",
    preparing: "Content in preparation",
    message: "Content is currently being expanded.",
    errorTitle: "Display temporarily unavailable",
    errorMessage: "This section contains data that is not yet compatible with the current display. The rest of the dossier remains available while it is being corrected.",
  },
  fr: {
    section: "Section",
    preparing: "Contenu en préparation",
    message: "Contenu en cours d’enrichissement.",
    errorTitle: "Affichage temporairement indisponible",
    errorMessage: "Cette section contient des données encore incompatibles avec l’affichage actuel. Le reste du dossier reste accessible pendant sa correction.",
  },
};

export default function CountrySectionFallback({ title, message, variant = "preparing" }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const isError = variant === "error";
  const heading = isError ? copy.errorTitle : copy.preparing;
  const body = message || (isError ? copy.errorMessage : copy.message);

  return (
    <div className="rounded-2xl border border-bone/10 bg-bone/[0.025] p-6">
      <p className="overline text-gold">{title || copy.section}</p>
      <h2 className="mt-2 font-serif text-2xl text-bone">{heading}</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-bone/60">{body}</p>
    </div>
  );
}
