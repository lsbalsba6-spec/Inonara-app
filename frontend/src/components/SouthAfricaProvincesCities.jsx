import { useMemo, useState } from "react";

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function SouthAfricaProvincesCities({ dossier }) {
  const [query, setQuery] = useState("");
  const institutions = dossier?.institutions || {};
  const provinces = Array.isArray(institutions.provinces) ? institutions.provinces : [];
  const capitalFunctions = Array.isArray(institutions.capital_functions)
    ? institutions.capital_functions
    : [];

  const filteredProvinces = useMemo(() => {
    const needle = normalize(query.trim());
    if (!needle) return provinces;
    return provinces.filter((province) =>
      normalize(`${province.name} ${province.capital}`).includes(needle)
    );
  }, [provinces, query]);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-serif text-3xl text-gold">Capitales nationales</h2>
        <p className="mt-2 max-w-3xl text-bone/65 leading-relaxed">
          L’Afrique du Sud répartit plusieurs fonctions nationales entre différentes villes.
          Cette organisation ne doit pas être confondue avec les capitales des neuf provinces.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {capitalFunctions.map((item) => (
            <article
              key={`${item.city}-${item.function}`}
              className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5"
            >
              <h3 className="font-serif text-xl text-bone">{item.city}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bone/65">{item.function}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-3xl text-gold">Provinces et capitales provinciales</h2>
            <p className="mt-2 text-bone/60">
              Les provinces actuelles datent de la réorganisation territoriale de 1994 ; elles
              ne doivent pas être projetées sur les périodes anciennes.
            </p>
          </div>
          <label className="block min-w-0 sm:w-72">
            <span className="sr-only">Rechercher une province ou une capitale</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Province ou capitale…"
              className="w-full rounded-xl border border-bone/15 bg-bone/[0.03] px-4 py-2.5 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/60"
            />
          </label>
        </div>

        {filteredProvinces.length ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProvinces.map((province) => (
              <article
                key={province.name}
                className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-bone/40">
                  Province
                </p>
                <h3 className="mt-1 font-serif text-xl text-bone">{province.name}</h3>
                <p className="mt-3 text-sm text-bone/60">
                  Capitale : <strong className="font-medium text-gold">{province.capital}</strong>
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-5 rounded-xl border border-bone/10 p-5 text-bone/55">
            Aucun résultat pour cette recherche.
          </p>
        )}
      </section>
    </div>
  );
}
