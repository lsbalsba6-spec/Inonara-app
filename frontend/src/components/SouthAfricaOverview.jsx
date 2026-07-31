const FLAG_URL = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Flag_of_South_Africa.svg";
const FLAG_SOURCE = "https://commons.wikimedia.org/wiki/File:Flag_of_South_Africa.svg";
const COAT_URL = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Coat_of_arms_of_South_Africa.svg";
const COAT_SOURCE = "https://commons.wikimedia.org/wiki/File:Coat_of_arms_of_South_Africa.svg";

const FACTS = [
  ["Nom officiel", "République d’Afrique du Sud"],
  ["Président", "Cyril Ramaphosa"],
  ["Population", "63,1 millions (estimation mi-2025)"],
  ["Superficie", "1 221 037 km²"],
  ["Capitales", "Pretoria · Le Cap · Bloemfontein"],
  ["Monnaie", "Rand sud-africain (ZAR)"],
  ["Langues officielles", "12, dont la langue des signes sud-africaine"],
  ["Fuseau horaire", "UTC+2"],
];

function FactCard({ label, value }) {
  return (
    <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-4">
      <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-bone/85">{value}</p>
    </div>
  );
}

export function SouthAfricaOverview({ dossier, sourceMap }) {
  const gallery = (dossier.media_gallery || []).slice(0, 3);
  const overviewSources = (dossier.overview?.sources || [])
    .map((id) => sourceMap.get(id))
    .filter(Boolean);

  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] via-bone/[0.025] to-transparent p-6 md:p-8">
          <p className="overline text-gold">Carte d’identité</p>
          <h2 className="mt-3 font-serif text-3xl text-bone md:text-4xl">L’Afrique du Sud en un regard</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-bone/75">
            {dossier.overview?.summary || "Pays situé à l’extrémité australe du continent africain, l’Afrique du Sud réunit des histoires humaines, politiques, linguistiques et culturelles profondément diverses."}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {FACTS.map(([label, value]) => <FactCard key={label} label={label} value={value} />)}
          </div>

          <div className="mt-6 rounded-xl border border-bone/10 bg-black/10 p-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-bone/40">Chef de l’État</p>
            <p className="mt-2 font-serif text-2xl text-gold">Cyril Ramaphosa</p>
            <p className="mt-1 text-sm leading-relaxed text-bone/60">
              Président de la République. Cette information doit rester datée et contrôlée lors de chaque mise à jour du dossier.
            </p>
            <a
              href="https://www.thepresidency.gov.za/"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex text-xs text-gold/85 underline underline-offset-2"
            >
              Vérifier auprès de la Présidence sud-africaine
            </a>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <figure className="flex min-h-[230px] flex-col items-center justify-center rounded-2xl border border-bone/10 bg-bone/[0.025] p-6">
            <img src={FLAG_URL} alt="Drapeau actuel de l’Afrique du Sud" className="w-full max-w-[320px] rounded-md shadow-2xl" />
            <figcaption className="mt-4 text-center">
              <p className="font-serif text-xl text-bone">Drapeau national</p>
              <p className="mt-1 text-xs leading-relaxed text-bone/45">Utilisé depuis le 27 avril 1994.</p>
              <a href={FLAG_SOURCE} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-gold/80 underline underline-offset-2">Source et licence</a>
            </figcaption>
          </figure>

          <figure className="flex min-h-[230px] flex-col items-center justify-center rounded-2xl border border-bone/10 bg-bone/[0.025] p-6">
            <img src={COAT_URL} alt="Armoiries nationales de l’Afrique du Sud" className="max-h-44 w-auto" />
            <figcaption className="mt-4 text-center">
              <p className="font-serif text-xl text-bone">Armoiries nationales</p>
              <p className="mt-1 text-xs leading-relaxed text-bone/45">Devise : !ke e: /xarra //ke — « Des peuples divers s’unissent ».</p>
              <a href={COAT_SOURCE} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-gold/80 underline underline-offset-2">Source et licence</a>
            </figcaption>
          </figure>
        </div>
      </section>

      {gallery.length > 0 && (
        <section>
          <div className="mb-4">
            <p className="overline text-gold">Premiers repères visuels</p>
            <h2 className="mt-2 font-serif text-3xl text-bone">Paysages, patrimoine et mémoire</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {gallery.map((item) => (
              <figure key={item.id} className="overflow-hidden rounded-xl border border-bone/10 bg-bone/[0.025]">
                <a href={item.source_page} target="_blank" rel="noreferrer" className="block overflow-hidden bg-black/20">
                  <img src={item.image_url} alt={item.alt} loading="lazy" className="h-56 w-full object-cover transition duration-500 hover:scale-[1.03]" />
                </a>
                <figcaption className="p-4">
                  <p className="font-serif text-lg text-bone">{item.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-bone/50">{item.caption}</p>
                  <p className="mt-2 text-[10px] text-bone/35">{item.author} · {item.license}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-bone/10 bg-bone/[0.02] p-6">
        <p className="overline text-gold">Sources de référence</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="https://www.gov.za/about-sa/south-africa-glance" target="_blank" rel="noreferrer" className="rounded-full border border-gold/30 px-4 py-2 text-xs text-gold hover:bg-gold/10">Gouvernement sud-africain</a>
          <a href="https://www.statssa.gov.za/?p=18613" target="_blank" rel="noreferrer" className="rounded-full border border-gold/30 px-4 py-2 text-xs text-gold hover:bg-gold/10">Population 2025 · Stats SA</a>
          <a href="https://www.gov.za/about-sa/south-africas-people" target="_blank" rel="noreferrer" className="rounded-full border border-gold/30 px-4 py-2 text-xs text-gold hover:bg-gold/10">Langues et population</a>
          {overviewSources.slice(0, 4).map((source) => (
            <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="rounded-full border border-bone/15 px-4 py-2 text-xs text-bone/65 hover:text-bone">
              {source.publisher}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
