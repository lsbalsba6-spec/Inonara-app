import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAfricaOriginCountries, fetchDiaspora } from "../lib/api";
import { slugify } from "./CountryDetail";

export default function CountriesList() {
  const [origins, setOrigins] = useState([]);
  const [diasporaCountries, setDiasporaCountries] = useState([]);

  useEffect(() => {
    fetchAfricaOriginCountries().then(setOrigins).catch(() => {});
    fetchDiaspora().then((all) => {
      const seen = new Map();
      for (const d of all) {
        const slug = slugify(d.country);
        if (!seen.has(slug)) seen.set(slug, d.country);
      }
      setDiasporaCountries([...seen.entries()].sort((a, b) => a[1].localeCompare(b[1])));
    }).catch(() => {});
  }, []);

  return (
    <div className="pt-[100px] pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="font-serif text-4xl text-bone mb-2">Pays</h1>
      <p className="text-bone/60 mb-10">
        Chaque pays a sa propre page : histoire, diaspora, et sa mini-carte avec curseur temporel.
        Le Gabon est le premier construit en profondeur ; les autres utilisent le contenu déjà sourcé du site.
      </p>

      <h2 className="overline text-gold mb-4">Pays d'origine africaine ({origins.length})</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-12">
        {origins.map((c) => (
          <Link key={c.id} to={`/country/${slugify(c.country)}`} className="text-bone/80 hover:text-gold text-sm py-1">
            {c.country}
          </Link>
        ))}
      </div>

      <h2 className="overline mb-4" style={{ color: "#7B2D26" }}>Pays de la diaspora ({diasporaCountries.length})</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {diasporaCountries.map(([slug, name]) => (
          <Link key={slug} to={`/country/${slug}`} className="text-bone/80 hover:text-gold text-sm py-1">
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
}
