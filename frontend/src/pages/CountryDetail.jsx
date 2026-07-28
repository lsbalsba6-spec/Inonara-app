import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchHistoricalPolities,
  fetchDiaspora,
  fetchRoutes,
  fetchAfricaOriginCountries,
  fetchAfricaOriginCountry,
} from "../lib/api";
import { ATLAS_COLORS } from "../lib/designTokens";
import CountryMiniMap from "../components/CountryMiniMap";

export function slugify(name) {
  return (name || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Bespoke, fully-researched country pages — Gabon is the first, built with
// dedicated research (Kongo/Loango/Mpongwè/Fang dossiers) beyond what the
// generic African-origin-country/diaspora data alone provides. Other
// countries render generically (see below) from data ALREADY sourced on
// the site, rather than fabricating new research for all 58+ countries at
// once.
const BESPOKE_COUNTRY_CONTENT = {
  gabon: {
    name: "Gabon",
    sections: [
      { heading: "Avant le contact européen", body: "L'estuaire du Gabon est habité par les Mpongwè (sous-groupe nord de l'ensemble myènè) depuis une tradition orale situant leur arrivée vers 1300, en provenance du Haut-Ivindo (Raponda-Walker). Selon l'historien Henry Bucher, un groupe contrôlait déjà l'embouchure du fleuve au plus tard au début du XVIIe siècle. Aucune structure politique unifiée de type royaume n'a jamais existé chez les Mpongwè." },
      { heading: "Premier contact portugais (1472)", body: "En 1472, des navigateurs portugais atteignent l'estuaire et lui donnent le nom « Gabão ». L'Encyclopédie Universalis précise qu'on ignore la motivation exacte de ce choix." },
      { heading: "Traités français et fondation de Libreville (XIXe s.)", body: "Le 9 février 1839, traité avec le roi Denis, sans transfert de souveraineté explicite ; le 18 mars 1842, traité séparé avec le roi Louis, qui stipule explicitement un transfert de souveraineté. La fondation de Libreville reste disputée entre les sources (1848, 1849 ou 1850)." },
      { heading: "Migration fang (XIXe siècle)", body: "Les Fang sont observés en migration vers 1856 par Paul du Chaillu et atteignent l'estuaire vers 1860. Contrairement aux Orungu et Mpongwè côtiers, ils ont généralement refusé de participer à la traite négrière." },
      { heading: "Colonisation et Afrique-Équatoriale française", body: "Colonie distincte en 1886. Le 15 janvier 1910, création de l'AEF, fédérant le Gabon avec le Moyen-Congo, l'Oubangui-Chari et le Tchad." },
      { heading: "Indépendance et République gabonaise", body: "Le 28 novembre 1958, État membre de la Communauté française. Indépendance complète le 17 août 1960 par Léon Mba." },
    ],
    diasporaSections: [
      { heading: "Diaspora historique — traite atlantique (1760-1850)", body: "L'estuaire du Gabon fut un point actif de la traite négrière transatlantique, surtout 1760-1790 puis illégalement après 1815. Contrairement au Kongo, aucune donnée quantitative fiable sur le nombre exporté n'a été trouvée." },
      { heading: "Diaspora contemporaine — communauté gabonaise en France", body: "Premiers immigrants dans les années 1970. Recensement 2018 : ~15 600 ressortissants, estimations communautaires dépassant 25 000, concentrés en Île-de-France." },
    ],
    sources: [
      "Encyclopédie Universalis, 'Libreville'",
      "Doc. IRD (Sallée, citant Raponda-Walker, 1960)",
      "Henry Bucher (1977), 'The Settlement of the Mpongwe clans in the Gabon estuary'",
      "mjp.univ-perp.fr, Journal officiel de la République française",
      "Wikipédia, 'Gabonese people in France', citant l'INSEE",
    ],
    polityIds: ["gabao-portuguese", "french-equatorial-africa-aef"],
    diasporaIds: ["afro-gabonese-atlantic", "gabonese-france"],
    routeIdPrefixes: ["diaspora-afro-gabonese-atlantic-", "diaspora-gabonese-france-"],
  },
};

export default function CountryDetail() {
  const { id } = useParams();
  const [polities, setPolities] = useState([]);
  const [allDiaspora, setAllDiaspora] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [originCountry, setOriginCountry] = useState(null);
  const [loadingGeneric, setLoadingGeneric] = useState(true);

  useEffect(() => {
    fetchHistoricalPolities().then(setPolities).catch(() => {});
    fetchDiaspora().then(setAllDiaspora).catch(() => {});
    fetchRoutes().then(setRoutes).catch(() => {});
  }, []);

  const bespoke = BESPOKE_COUNTRY_CONTENT[id];

  useEffect(() => {
    if (bespoke) {
      setLoadingGeneric(false);
      return;
    }
    let cancelled = false;
    fetchAfricaOriginCountries()
      .then((list) => {
        const match = list.find((c) => slugify(c.country) === id);
        if (!match) {
          if (!cancelled) setLoadingGeneric(false);
          return;
        }
        return fetchAfricaOriginCountry(match.country_iso2).then((full) => {
          if (!cancelled) {
            setOriginCountry(full);
            setLoadingGeneric(false);
          }
        });
      })
      .catch(() => setLoadingGeneric(false));
    return () => { cancelled = true; };
  }, [id, bespoke]);

  const genericDiasporaMatches = allDiaspora.filter((d) => slugify(d.country) === id);

  if (loadingGeneric) {
    return <div className="pt-[120px] text-center text-bone/50">Chargement…</div>;
  }

  if (!bespoke && !originCountry && genericDiasporaMatches.length === 0) {
    return (
      <div className="pt-[100px] px-6 max-w-2xl mx-auto text-center">
        <p className="font-serif text-2xl text-bone mb-4">Page pas encore disponible</p>
        <p className="text-bone/60">Aucune donnée trouvée pour « {id} ».</p>
        <Link to="/countries" className="inline-block mt-6 text-gold uppercase tracking-widest text-xs">← Voir tous les pays</Link>
      </div>
    );
  }

  if (bespoke) {
    const countryPolities = polities.filter((p) => bespoke.polityIds.includes(p.id));
    const countryDiaspora = allDiaspora.filter((d) => bespoke.diasporaIds.includes(d.id));
    const countryRoutes = routes.filter((r) => bespoke.routeIdPrefixes.some((prefix) => r.id.startsWith(prefix)));

    return (
      <div className="pt-[100px] pb-20 px-6 max-w-3xl mx-auto">
        <p className="overline text-gold mb-2">Pays · Afrique centrale</p>
        <h1 className="font-serif text-4xl text-bone mb-8">{bespoke.name}</h1>
        <CountryMiniMap polities={countryPolities} diasporaEntries={countryDiaspora} routes={countryRoutes} defaultYear={1900} />
        <div className="mt-10 space-y-8">
          {bespoke.sections.map((s, i) => (
            <div key={i}>
              <h2 className="font-serif text-xl text-gold mb-2">{s.heading}</h2>
              <p className="text-bone/80 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-[#2A2421]">
          <p className="overline mb-2" style={{ color: ATLAS_COLORS.deepRed }}>Diaspora</p>
          <div className="space-y-8 mt-4">
            {bespoke.diasporaSections.map((s, i) => (
              <div key={i}>
                <h2 className="font-serif text-xl text-bone mb-2">{s.heading}</h2>
                <p className="text-bone/80 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-[#2A2421]">
          <p className="overline text-bone/50 mb-2">Sources</p>
          {bespoke.sources.map((s, i) => <p key={i} className="text-bone/60 text-xs mb-1">{s}</p>)}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[100px] pb-20 px-6 max-w-3xl mx-auto">
      <p className="overline text-gold mb-2">{originCountry ? "Pays d'origine africaine" : "Diaspora"}</p>
      <h1 className="font-serif text-4xl text-bone mb-8">{originCountry?.country || genericDiasporaMatches[0]?.country}</h1>

      {originCountry && (
        <div className="space-y-6">
          <p className="text-bone/80 leading-relaxed">{originCountry.summary}</p>
          {originCountry.precolonial_history && (
            <div>
              <h2 className="font-serif text-xl text-gold mb-2">Histoire précoloniale</h2>
              <p className="text-bone/80 leading-relaxed">{originCountry.precolonial_history}</p>
            </div>
          )}
          {originCountry.colonial_period && (
            <div>
              <h2 className="font-serif text-xl text-gold mb-2">Période coloniale</h2>
              <p className="text-bone/80 leading-relaxed">
                {originCountry.colonial_period.colonizer} ({originCountry.colonial_period.start}–{originCountry.colonial_period.end}). {originCountry.colonial_period.notes}
              </p>
            </div>
          )}
          {originCountry.independence_year && (
            <p className="text-bone/70 text-sm">Indépendance : {originCountry.independence_year}</p>
          )}
          {originCountry.diaspora_notes && (
            <div>
              <h2 className="font-serif text-xl mb-2" style={{ color: ATLAS_COLORS.deepRed }}>Diaspora</h2>
              <p className="text-bone/80 leading-relaxed">{originCountry.diaspora_notes}</p>
            </div>
          )}
        </div>
      )}

      {genericDiasporaMatches.length > 0 && (
        <div className="mt-10 pt-8 border-t border-[#2A2421] space-y-8">
          <p className="overline" style={{ color: ATLAS_COLORS.deepRed }}>Communautés de la diaspora ici</p>
          {genericDiasporaMatches.map((d) => (
            <div key={d.id}>
              <h2 className="font-serif text-xl text-bone mb-2">{d.name}</h2>
              <p className="text-bone/80 leading-relaxed">{d.summary}</p>
              {d.story && <p className="text-bone/70 mt-2 text-sm">{d.story}</p>}
              <Link to={`/diaspora/${d.id}`} className="inline-block mt-2 text-gold uppercase tracking-widest text-xs">Voir la fiche complète →</Link>
            </div>
          ))}
        </div>
      )}

      {(originCountry?.sources || []).length > 0 && (
        <div className="mt-12 pt-6 border-t border-[#2A2421]">
          <p className="overline text-bone/50 mb-2">Sources</p>
          {originCountry.sources.map((s, i) => <p key={i} className="text-bone/60 text-xs mb-1">{s}</p>)}
        </div>
      )}

      <p className="text-bone/40 text-xs mt-10">
        Cette page utilise le contenu déjà validé du site. Le Gabon est pour l'instant le seul pays avec une page approfondie dédiée.
      </p>
    </div>
  );
}
