import { useMemo, useState } from "react";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: {
    capitals: "National capitals",
    capitalsIntro: "National functions and territorial organization are presented according to the country’s own institutional framework.",
    districts: "Provinces and administrative centres",
    districtsIntro: "Contemporary administrative divisions should not be projected onto earlier historical periods.",
    searchLabel: "Search a province or capital",
    searchPlaceholder: "Province or capital…",
    districtLabel: "Province",
    capitalLabel: "Capital",
    empty: "No results match this search.",
  },
  fr: {
    capitals: "Capitales nationales",
    capitalsIntro: "Les fonctions nationales et l’organisation territoriale sont présentées selon le cadre institutionnel propre au pays.",
    districts: "Provinces et centres administratifs",
    districtsIntro: "Les divisions administratives contemporaines ne doivent pas être projetées sur les périodes anciennes.",
    searchLabel: "Rechercher une province ou une capitale",
    searchPlaceholder: "Province ou capitale…",
    districtLabel: "Province",
    capitalLabel: "Capitale",
    empty: "Aucun résultat pour cette recherche.",
  },
};

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function TranslatedInline({ value }) {
  const translated = useTranslated(value || "");
  return translated || value;
}

export function SouthAfricaDistrictsCities({ dossier }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const [query, setQuery] = useState("");
  const institutions = dossier?.institutions || {};
  const provinces = useMemo(
    () => (Array.isArray(institutions.provinces) ? institutions.provinces : []),
    [institutions.provinces]
  );
  const capitalFunctions = useMemo(
    () => (Array.isArray(institutions.capital_functions) ? institutions.capital_functions : []),
    [institutions.capital_functions]
  );

  const filteredDistricts = useMemo(() => {
    const needle = normalize(query.trim());
    if (!needle) return provinces;
    return provinces.filter((province) =>
      normalize(`${province.name} ${province.capital}`).includes(needle)
    );
  }, [provinces, query]);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-serif text-3xl text-gold">{copy.capitals}</h2>
        <p className="mt-2 max-w-3xl text-bone/65 leading-relaxed">{copy.capitalsIntro}</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {capitalFunctions.map((item) => (
            <article key={`${item.city}-${item.function}`} className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
              <h3 className="font-serif text-xl text-bone">{item.city}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bone/65"><TranslatedInline value={item.function} /></p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-3xl text-gold">{copy.districts}</h2>
            <p className="mt-2 text-bone/60">{copy.districtsIntro}</p>
          </div>
          <label className="block min-w-0 sm:w-72">
            <span className="sr-only">{copy.searchLabel}</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.searchPlaceholder}
              className="w-full rounded-xl border border-bone/15 bg-bone/[0.03] px-4 py-2.5 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/60"
            />
          </label>
        </div>

        {filteredDistricts.length ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDistricts.map((province) => (
              <article key={province.name} className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-bone/40">{copy.districtLabel}</p>
                <h3 className="mt-1 font-serif text-xl text-bone">{province.name}</h3>
                <p className="mt-3 text-sm text-bone/60">
                  {copy.capitalLabel}: <strong className="font-medium text-gold">{province.capital}</strong>
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-5 rounded-xl border border-bone/10 p-5 text-bone/55">{copy.empty}</p>
        )}
      </section>
    </div>
  );
}
