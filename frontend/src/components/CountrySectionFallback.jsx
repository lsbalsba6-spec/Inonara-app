export default function CountrySectionFallback({
  title = "Section",
  message = "Contenu en cours d’enrichissement.",
}) {
  return (
    <div className="rounded-2xl border border-bone/10 bg-bone/[0.025] p-6">
      <p className="overline text-gold">{title}</p>
      <h2 className="mt-2 font-serif text-2xl text-bone">Contenu en préparation</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-bone/60">{message}</p>
    </div>
  );
}
