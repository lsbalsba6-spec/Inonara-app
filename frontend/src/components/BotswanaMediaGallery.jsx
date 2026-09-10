import { useState } from "react";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: {
    overline: "Documentary gallery",
    title: "Botswana in images",
    intro: "Images are accompanied by their credit, source page and license whenever that information is available.",
    close: "Close",
    source: "View source and license",
  },
  fr: {
    overline: "Galerie documentaire",
    title: "Le Botswana en images",
    intro: "Les images sont accompagnées de leur crédit, de leur page source et de leur licence lorsque ces informations sont disponibles.",
    close: "Fermer",
    source: "Voir la source et la licence",
  },
};

function TranslatedInline({ value }) {
  const translated = useTranslated(value || "");
  return translated || value;
}

function TranslatedText({ value, className = "" }) {
  const translated = useTranslated(value || "");
  if (!value) return null;
  return <p className={className}>{translated || value}</p>;
}

export function BotswanaMediaGallery({ dossier }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const items = dossier?.media_gallery || [];
  const [active, setActive] = useState(null);
  if (!items.length) return null;
  return (
    <section className="space-y-5">
      <header>
        <p className="overline text-gold">{copy.overline}</p>
        <h2 className="mt-2 font-serif text-3xl text-bone">{copy.title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-bone/55">{copy.intro}</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <button key={item.id || index} type="button" onClick={() => setActive(item)}
            className="group overflow-hidden rounded-2xl border border-bone/10 bg-bone/[0.025] text-left">
            <div className="aspect-[4/3] overflow-hidden bg-black/20">
              <img src={item.image_url} alt={item.caption || item.title} loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="p-4">
              <h3 className="font-serif text-xl text-bone"><TranslatedInline value={item.title} /></h3>
              <TranslatedText value={item.caption} className="mt-2 text-sm leading-6 text-bone/60" />
              {item.credit && <p className="mt-3 text-[10px] uppercase tracking-[.16em] text-gold/75">{item.credit}</p>}
            </div>
          </button>
        ))}
      </div>
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0" aria-label={copy.close} onClick={() => setActive(null)} />
          <div className="relative max-h-[92vh] w-full max-w-5xl overflow-auto rounded-2xl border border-bone/15 bg-[#101716] p-4">
            <button onClick={() => setActive(null)} className="absolute right-4 top-4 rounded-full border border-bone/20 bg-black/40 px-3 py-1 text-sm text-bone">{copy.close}</button>
            <img src={active.image_url} alt={active.caption || active.title} className="max-h-[70vh] w-full rounded-xl object-contain" />
            <div className="p-3">
              <h3 className="font-serif text-2xl text-bone"><TranslatedInline value={active.title} /></h3>
              <TranslatedText value={active.caption} className="mt-2 text-sm text-bone/65" />
              {active.source_url && (
                <a href={active.source_url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs text-gold underline">
                  {copy.source}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
