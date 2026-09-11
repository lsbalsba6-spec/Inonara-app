import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCountries, fetchCountryDossiers } from "../lib/api";
import { slugify } from "./CountryDetail";
import { AFRICA_REGIONS, FRENCH_COUNTRY_NAMES } from "../data/africa-regions";
import { useI18n } from "../i18n";

const REGION_LABELS = {
  "southern-africa": { fr: "Afrique australe", en: "Southern Africa" },
  "central-africa": { fr: "Afrique centrale", en: "Central Africa" },
  "eastern-africa": { fr: "Afrique de l'Est et îles de l'océan Indien", en: "Eastern Africa and Indian Ocean islands" },
  "western-africa": { fr: "Afrique de l'Ouest", en: "West Africa" },
  "northern-africa": { fr: "Afrique du Nord", en: "North Africa" },
  "african-atlantic-territories": { fr: "Territoires africains de l'Atlantique", en: "African Atlantic territories" },
};

export function displayCountryName(country, lang = "fr") {
  if (!country || typeof country !== "object") return lang === "fr" ? "Pays inconnu" : "Unknown country";
  return (lang === "fr" ? FRENCH_COUNTRY_NAMES[country.iso2] : null) || country.display_name || country.name || country.iso2 || (lang === "fr" ? "Pays inconnu" : "Unknown country");
}

export function buildCountrySlug(country, dossierByIso = new Map()) {
  if (!country || typeof country !== "object") return "";
  return dossierByIso.get(country.iso2)?.slug || slugify(country.display_name || country.name || country.iso2 || "");
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export default function CountriesList() {
  const { t, lang } = useI18n();
  const [countries, setCountries] = useState([]);
  const [dossiers, setDossiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState("");
  const collator = useMemo(() => new Intl.Collator(lang === "fr" ? "fr" : "en", { sensitivity: "base" }), [lang]);

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
        setWarning(t("countries.warning.list"));
      } else if (dossierResult.status === "rejected") {
        setWarning(t("countries.warning.dossiers"));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [t]);

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
      .sort((a, b) => collator.compare(displayCountryName(a, lang), displayCountryName(b, lang))),
    [validCountries, africanCodes, lang, collator],
  );

  if (loading) {
    return <div className="pt-[120px] text-center text-bone/50">{t("countries.loading")}</div>;
  }

  return (
    <div className="pt-[100px] pb-20 px-6 max-w-5xl mx-auto">
      <h1 className="font-serif text-4xl text-bone mb-2">{t("countries.title")}</h1>
      <p className="text-bone/60 mb-6 max-w-3xl">
        {t("countries.copy")}
      </p>

      {warning && (
        <div className="mb-8 rounded border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-bone/75" role="status">
          {warning}
        </div>
      )}

      {validCountries.length === 0 ? (
        <div className="rounded border border-bone/10 px-4 py-8 text-center text-bone/60">
          {t("countries.empty")}
        </div>
      ) : (
        <div className="space-y-10">
          {AFRICA_REGIONS.map((region) => {
            const entries = region.iso2
              .map((code) => byIso.get(code))
              .filter(Boolean)
              .sort((a, b) => collator.compare(displayCountryName(a, lang), displayCountryName(b, lang)));
            const regionLabel = REGION_LABELS[region.id]?.[lang] || region.label;

            if (entries.length === 0) return null;

            return (
              <section key={region.id} aria-labelledby={`region-${region.id}`}>
                <h2 id={`region-${region.id}`} className="font-serif text-2xl text-gold mb-4">{regionLabel}</h2>
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
                        <span>{displayCountryName(country, lang)}</span>
                        {dossier && (
                          <span className="shrink-0 text-[10px] uppercase tracking-wider text-gold">{t("countries.dossier")}</span>
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
              <h2 id="region-rest-world" className="font-serif text-2xl text-gold mb-4">{t("countries.rest.title")}</h2>
              <p className="text-bone/50 text-sm mb-4">{t("countries.rest.copy")}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {rest.map((country) => {
                  const dossier = dossierByIso.get(country.iso2);
                  const slug = buildCountrySlug(country, dossierByIso);
                  return (
                    <Link key={country.iso2} to={`/country/${slug}`} className="flex items-center gap-2 text-bone/65 hover:text-gold text-sm py-1">
                      <span>{displayCountryName(country, lang)}</span>
                      {dossier && <span className="text-[9px] uppercase tracking-wider text-gold">{t("countries.dossier")}</span>}
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
