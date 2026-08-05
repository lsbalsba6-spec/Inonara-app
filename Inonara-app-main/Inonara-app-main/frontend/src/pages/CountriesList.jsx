import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCountries, fetchCountryDossiers } from "../lib/api";
import { slugify } from "./CountryDetail";
import { AFRICA_REGIONS, FRENCH_COUNTRY_NAMES } from "../data/africa-regions";

const collator = new Intl.Collator("fr", { sensitivity: "base" });

export function displayCountryName(country) {
  if (!country || typeof country !== "object") return "Pays inconnu";
  return FRENCH_COUNTRY_NAMES[country.iso2] || country.display_name || country.name || country.iso2 || "Pays inconnu";
}

export function buildCountrySlug(country, dossierByIso = new Map()) {
  if (!country || typeof country !== "object") return "";
  return dossierByIso.get(country.iso2)?.slug || slugify(country.display_name || country.name || country.iso2 || "");
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export default function CountriesList() {
  const [countries, setCountries] = useState([]);
  const [dossiers, setDossiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    let cancelled = false;

    Promise.allSettled([fetchCountries(), fetchCountryDossiers()]).then(([countryResult, dossierResult]) => {
      if (cancelled) return;

      const nextCountries = countryResult.status === "fulfilled" ? asArray(countryResult.value) : [];
      const nextDossiers = dossierResult.status === "fulfilled" ? asArray(dossierResult.value) : [];

      setCountries(nextCountries);
      setDossiers(nextDossiers);
      setLoading(false);

      if (countryResult.status === "rejected") {
        setWarning("La liste complète des pays n'a pas pu être chargée. Réessaie après le redéploiement du backend.");
      } else if (dossierResult.status === "rejected") {
        setWarning("Les pays sont disponibles, mais les badges des dossiers approfondis n'ont pas pu être chargés.");
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const validCountries = useMemo(
    () => countries.filter((country) => country && typeof country === "object" && country.iso2),
    [countries],
  );
  const validDossiers = useMemo(
    () => dossiers.filter((dossier) => dossier && typeof dossier === "object" && dossier.iso2),
    [dossiers],
  );

  const byIso = useMemo(() => new Map(validCountries.map((country) => [country.iso2, country])), [validCountries]);
  const dossierByIso = useMemo(() => new Map(validDossiers.map((dossier) => [dossier.iso2, dossier])), [validDossiers]);
  const africanCodes = useMemo(() => new Set(AFRICA_REGIONS.flatMap((region) => region.iso2)), []);
  const rest = useMemo(
    () => validCountries
      .filter((country) => !africanCodes.has(country.iso2))
      .sort((a, b) => collator.compare(displayCountryName(a), displayCountryName(b))),
    [validCountries, africanCodes],
  );

  if (loading) {
    return <div className="pt-[120px] text-center text-bone/50">Chargement des pays…</div>;
  }

  return (
    <div className="pt-[100px] pb-20 px-6 max-w-5xl mx-auto">
      <h1 className="font-serif text-4xl text-bone mb-2">Pays et territoires</h1>
      <p className="text-bone/60 mb-6 max-w-3xl">
        Navigation géographique d&apos;INONARA. Chaque région est classée par ordre alphabétique. Les dossiers approfondis sont signalés et publiés progressivement sans inventer les informations manquantes.
      </p>

      {warning && (
        <div className="mb-8 rounded border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-bone/75" role="status">
          {warning}
        </div>
      )}

      {validCountries.length === 0 ? (
        <div className="rounded border border-bone/10 px-4 py-8 text-center text-bone/60">
          Aucun pays n'a été reçu depuis l'API. La page reste affichée au lieu de planter.
        </div>
      ) : (
        <div className="space-y-10">
          {AFRICA_REGIONS.map((region) => {
            const entries = region.iso2
              .map((code) => byIso.get(code))
              .filter(Boolean)
              .sort((a, b) => collator.compare(displayCountryName(a), displayCountryName(b)));

            if (entries.length === 0) return null;

            return (
              <section key={region.id} aria-labelledby={`region-${region.id}`}>
                <h2 id={`region-${region.id}`} className="font-serif text-2xl text-gold mb-4">{region.label}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {entries.map((country) => {
                    const dossier = dossierByIso.get(country.iso2);
                    const slug = buildCountrySlug(country, dossierByIso);
                    return (
                      <Link
                        key={country.iso2}
                        to={`/country/${slug}`}
                        className="flex items-center justify-between gap-3 border border-bone/10 rounded px-3 py-2 text-bone/75 hover:border-gold/40 hover:text-gold"
                      >
                        <span>{displayCountryName(country)}</span>
                        {dossier && (
                          <span className="shrink-0 text-[10px] uppercase tracking-wider text-gold">Dossier</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {rest.length > 0 && (
            <section aria-labelledby="region-rest-world">
              <h2 id="region-rest-world" className="font-serif text-2xl text-gold mb-4">Diasporas majeures et reste du monde</h2>
              <p className="text-bone/50 text-sm mb-4">Ces pays et territoires seront classés plus finement par grands espaces diasporiques au fil de la documentation.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {rest.map((country) => {
                  const dossier = dossierByIso.get(country.iso2);
                  const slug = buildCountrySlug(country, dossierByIso);
                  return (
                    <Link key={country.iso2} to={`/country/${slug}`} className="flex items-center gap-2 text-bone/65 hover:text-gold text-sm py-1">
                      <span>{displayCountryName(country)}</span>
                      {dossier && <span className="text-[9px] uppercase tracking-wider text-gold">Dossier</span>}
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
