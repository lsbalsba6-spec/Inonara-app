import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCountries, fetchCountryDossiers } from "../lib/api";
import { slugify } from "./CountryDetail";
import { AFRICA_REGIONS, FRENCH_COUNTRY_NAMES } from "../data/africa-regions";

const collator = new Intl.Collator("fr", { sensitivity: "base" });

export default function CountriesList() {
  const [countries, setCountries] = useState([]);
  const [dossiers, setDossiers] = useState([]);

  useEffect(() => {
    Promise.allSettled([fetchCountries(), fetchCountryDossiers()]).then(([countryResult, dossierResult]) => {
      if (countryResult.status === "fulfilled") setCountries(countryResult.value);
      if (dossierResult.status === "fulfilled") setDossiers(dossierResult.value);
    });
  }, []);

  const byIso = useMemo(() => new Map(countries.map((country) => [country.iso2, country])), [countries]);
  const dossierByIso = useMemo(() => new Map(dossiers.map((dossier) => [dossier.iso2, dossier])), [dossiers]);
  const africanCodes = useMemo(() => new Set(AFRICA_REGIONS.flatMap((region) => region.iso2)), []);
  const rest = useMemo(
    () => countries.filter((country) => !africanCodes.has(country.iso2)).sort((a, b) => collator.compare(displayName(a), displayName(b))),
    [countries, africanCodes],
  );

  const displayName = (country) => FRENCH_COUNTRY_NAMES[country.iso2] || country.display_name;
  const countrySlug = (country) => dossierByIso.get(country.iso2)?.slug || slugify(country.display_name);

  return (
    <div className="pt-[100px] pb-20 px-6 max-w-5xl mx-auto">
      <h1 className="font-serif text-4xl text-bone mb-2">Pays et territoires</h1>
      <p className="text-bone/60 mb-10 max-w-3xl">
        Navigation géographique d&apos;INONARA. Chaque région est classée par ordre alphabétique. Les dossiers approfondis sont signalés et publiés progressivement sans inventer les informations manquantes.
      </p>

      <div className="space-y-10">
        {AFRICA_REGIONS.map((region) => {
          const entries = region.iso2
            .map((code) => byIso.get(code))
            .filter(Boolean)
            .sort((a, b) => collator.compare(displayName(a), displayName(b)));

          return (
            <section key={region.id} aria-labelledby={`region-${region.id}`}>
              <h2 id={`region-${region.id}`} className="font-serif text-2xl text-gold mb-4">{region.label}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {entries.map((country) => {
                  const dossier = dossierByIso.get(country.iso2);
                  return (
                    <Link
                      key={country.iso2}
                      to={`/country/${countrySlug(country)}`}
                      className="flex items-center justify-between gap-3 border border-bone/10 rounded px-3 py-2 text-bone/75 hover:border-gold/40 hover:text-gold"
                    >
                      <span>{displayName(country)}</span>
                      {dossier && (
                        <span className="shrink-0 text-[10px] uppercase tracking-wider text-gold">
                          Dossier
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section aria-labelledby="region-rest-world">
          <h2 id="region-rest-world" className="font-serif text-2xl text-gold mb-4">Diasporas majeures et reste du monde</h2>
          <p className="text-bone/50 text-sm mb-4">Ces pays et territoires seront classés plus finement par grands espaces diasporiques au fil de la documentation.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {rest.map((country) => {
              const dossier = dossierByIso.get(country.iso2);
              return (
                <Link key={country.iso2} to={`/country/${countrySlug(country)}`} className="flex items-center gap-2 text-bone/65 hover:text-gold text-sm py-1">
                  <span>{displayName(country)}</span>
                  {dossier && <span className="text-[9px] uppercase tracking-wider text-gold">Dossier</span>}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
