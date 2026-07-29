import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCountries } from "../lib/api";
import { slugify } from "./CountryDetail";
import { AFRICA_REGIONS, FRENCH_COUNTRY_NAMES } from "../data/africa-regions";

export default function CountriesList() {
  const [countries, setCountries] = useState([]);
  useEffect(() => { fetchCountries().then(setCountries).catch(() => {}); }, []);
  const byIso = useMemo(() => new Map(countries.map((c) => [c.iso2, c])), [countries]);
  const africanCodes = new Set(AFRICA_REGIONS.flatMap((r) => r.iso2));
  const rest = countries.filter((c) => !africanCodes.has(c.iso2)).sort((a, b) => a.display_name.localeCompare(b.display_name));

  const displayName = (c) => FRENCH_COUNTRY_NAMES[c.iso2] || c.display_name;
  const countrySlug = (c) => c.iso2 === "ZA" ? "south-africa" : slugify(c.display_name);

  return (
    <div className="pt-[100px] pb-20 px-6 max-w-5xl mx-auto">
      <h1 className="font-serif text-4xl text-bone mb-2">Pays et territoires</h1>
      <p className="text-bone/60 mb-10 max-w-3xl">Navigation géographique d'INONARA. Chaque région est classée par ordre alphabétique; les dossiers approfondis sont publiés progressivement sans inventer les informations manquantes.</p>

      <div className="space-y-10">
        {AFRICA_REGIONS.map((region) => {
          const entries = region.iso2.map((code) => byIso.get(code)).filter(Boolean).sort((a, b) => displayName(a).localeCompare(displayName(b), "fr"));
          return <section key={region.id}>
            <h2 className="font-serif text-2xl text-gold mb-4">{region.label}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {entries.map((c) => <Link key={c.iso2} to={`/country/${countrySlug(c)}`} className="flex items-center justify-between border border-bone/10 rounded px-3 py-2 text-bone/75 hover:border-gold/40 hover:text-gold">
                <span>{displayName(c)}</span>{c.iso2 === "ZA" && <span className="text-[10px] uppercase tracking-wider text-gold">Dossier V1</span>}
              </Link>)}
            </div>
          </section>;
        })}

        <section>
          <h2 className="font-serif text-2xl text-gold mb-4">Diasporas majeures et reste du monde</h2>
          <p className="text-bone/50 text-sm mb-4">Ces pays et territoires seront classés plus finement par grands espaces diasporiques au fil de la documentation.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {rest.map((c) => <Link key={c.iso2} to={`/country/${countrySlug(c)}`} className="text-bone/65 hover:text-gold text-sm py-1">{displayName(c)}</Link>)}
          </div>
        </section>
      </div>
    </div>
  );
}
