import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchHistoricalPolities,
  fetchDiaspora,
  fetchRoutes,
} from "../lib/api";
import { ATLAS_COLORS } from "../lib/designTokens";
import CountryMiniMap from "../components/CountryMiniMap";

// Country content — Gabon is the first fully-built model per the agreed
// approach (build one country completely, validate the format, THEN
// generalize). Other country ids simply show a "not yet available" state
// rather than fabricated content.
const COUNTRY_CONTENT = {
  gabon: {
    name: "Gabon",
    sections: [
      {
        heading: "Avant le contact européen",
        body: "L'estuaire du Gabon est habité par les Mpongwè (sous-groupe nord de l'ensemble myènè) depuis une tradition orale situant leur arrivée vers 1300, en provenance du Haut-Ivindo (Raponda-Walker). Selon l'historien Henry Bucher, un groupe contrôlait déjà l'embouchure du fleuve au plus tard au début du XVIIe siècle — le nom « Mpongwè » lui-même n'étant attesté que plus tard, à la fin du XVIIIe siècle. Aucune structure politique unifiée de type royaume n'a jamais existé chez les Mpongwè : Raponda-Walker lui-même décrit « une série de Patriarches, chefs de familles ou de clans », pas un chef unique.",
      },
      {
        heading: "Premier contact portugais (1472)",
        body: "En 1472, des navigateurs portugais atteignent l'estuaire et lui donnent le nom « Gabão » — d'après un vêtement marin portugais dont la forme évoquait celle de l'estuaire. L'Encyclopédie Universalis précise honnêtement qu'on ignore la motivation exacte de ce choix. Ce nom s'applique à l'estuaire et à la zone côtière, pas à un territoire administratif — aucune structure politique n'existait encore.",
      },
      {
        heading: "Traités français et fondation de Libreville (XIXe s.)",
        body: "Deux traités distincts et de nature juridique différente marquent le début de la présence française : le 9 février 1839, un traité avec le roi Denis (Antchouwé Kowé Rapontchombo, clan Asiga) sur la rive gauche, sans transfert de souveraineté explicite ; puis le 18 mars 1842, un traité séparé avec le roi Louis (Anguilé Ré-Dowé, clan Aguékaza) sur la rive droite, qui lui, stipule explicitement un transfert de souveraineté. Le Fort d'Aumale est construit en 1843 suite à ce second traité. La fondation de Libreville elle-même reste disputée entre les sources (1848, 1849 ou 1850 selon les récits — possiblement trois événements distincts : capture du navire négrier l'Elizia, libération des captifs, et adoption du nom).",
      },
      {
        heading: "Migration fang (XIXe siècle)",
        body: "Les Fang, alors en migration depuis le nord (traditions et hypothèses linguistiques situant une séparation fang/bulu/beti vers 1665), sont observés en migration vers 1856 par l'explorateur Paul du Chaillu et atteignent l'estuaire vers 1860, occupant progressivement le nord-ouest du Gabon à la fin du XIXe siècle. Fait notable : contrairement aux Orungu et Mpongwè côtiers, les Fang ont généralement refusé de participer à la traite négrière (Encyclopédie Universalis).",
      },
      {
        heading: "Colonisation et Afrique-Équatoriale française",
        body: "Le Gabon devient colonie distincte en 1886, avant plusieurs réorganisations administratives (fusion avec le Congo en 1888, séparations et re-fusions jusqu'en 1910). Le 15 janvier 1910, un décret crée le gouvernement général de l'Afrique-Équatoriale française (AEF), fédérant le Gabon avec le Moyen-Congo, l'Oubangui-Chari et le Tchad, avec Brazzaville pour capitale fédérale.",
      },
      {
        heading: "Indépendance et République gabonaise",
        body: "Le 28 novembre 1958, le Gabon devient État membre de la Communauté française et proclame la République gabonaise — un statut intermédiaire, pas encore une indépendance pleine. L'indépendance complète est proclamée le 17 août 1960 par Léon Mba.",
      },
    ],
    diasporaSections: [
      {
        heading: "Diaspora historique — traite atlantique (1760-1850)",
        body: "L'estuaire du Gabon et les embouchures de l'Ogooué furent des points actifs de la traite négrière transatlantique, en particulier entre 1760 et 1790 (traite française centrée à Ntsantome), puis illégalement après l'abolition française de 1815, jusqu'au milieu du XIXe siècle. Le royaume orungu du Cap Lopez organisait son pouvoir spécifiquement autour du contrôle de cette traite ; les Mpongwè de l'estuaire en profitaient comme intermédiaires. Contrairement au Kongo ou à l'Angola, aucune donnée quantitative fiable sur le nombre de personnes exportées ou leurs destinations précises n'a été trouvée — c'est une vraie lacune de recherche, pas une invention de notre part.",
      },
      {
        heading: "Diaspora contemporaine — la communauté gabonaise en France",
        body: "Une migration récente et volontaire, sans rapport avec la traite historique : les premiers immigrants gabonais arrivent en France dans les années 1970. Le recensement français de 2018 comptait environ 15 600 ressortissants gabonais, avec des estimations communautaires (incluant les descendants) dépassant 25 000 personnes, concentrées en Île-de-France. Les moteurs principaux sont l'éducation, l'emploi et le regroupement familial — en 2024, environ 5 600 étudiants gabonais étaient inscrits dans des universités et grandes écoles françaises.",
      },
    ],
    sources: [
      "Encyclopédie Universalis, 'Libreville'",
      "Doc. IRD (Sallée, citant Raponda-Walker, Notes d'histoire du Gabon, 1960)",
      "Henry Bucher (1977), 'The Settlement of the Mpongwe clans in the Gabon estuary', Revue française d'histoire d'outre-mer",
      "mjp.univ-perp.fr, citant le Journal officiel de la République française et de la Communauté",
      "Wikipédia, 'Gabonese people in France', citant l'INSEE",
    ],
  },
};

const GABON_POLITY_IDS = ["gabao-portuguese", "french-equatorial-africa-aef"];
const GABON_DIASPORA_IDS = ["afro-gabonese-atlantic", "gabonese-france"];
const GABON_ROUTE_IDS_PREFIX = "diaspora-afro-gabonese-atlantic-";
const GABON_ROUTE_IDS_PREFIX_2 = "diaspora-gabonese-france-";

export default function CountryDetail() {
  const { id } = useParams();
  const [polities, setPolities] = useState([]);
  const [diaspora, setDiaspora] = useState([]);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetchHistoricalPolities().then(setPolities).catch(() => {});
    fetchDiaspora().then(setDiaspora).catch(() => {});
    fetchRoutes().then(setRoutes).catch(() => {});
  }, []);

  const content = COUNTRY_CONTENT[id];

  if (!content) {
    return (
      <div className="pt-[100px] px-6 max-w-2xl mx-auto text-center">
        <p className="font-serif text-2xl text-bone mb-4">Page pas encore disponible</p>
        <p className="text-bone/60">
          Ce pays n'a pas encore de page dédiée développée. Le Gabon est le premier pays construit
          selon ce format — dis-nous si tu veux qu'on continue avec un autre.
        </p>
        <Link to="/atlas" className="inline-block mt-6 text-gold uppercase tracking-widest text-xs">← Retour à l'Atlas</Link>
      </div>
    );
  }

  const countryPolities = polities.filter((p) => GABON_POLITY_IDS.includes(p.id));
  const countryDiaspora = diaspora.filter((d) => GABON_DIASPORA_IDS.includes(d.id));
  const countryRoutes = routes.filter(
    (r) => r.id.startsWith(GABON_ROUTE_IDS_PREFIX) || r.id.startsWith(GABON_ROUTE_IDS_PREFIX_2)
  );

  return (
    <div className="pt-[100px] pb-20 px-6 max-w-3xl mx-auto">
      <p className="overline text-gold mb-2">Pays · Afrique centrale</p>
      <h1 className="font-serif text-4xl text-bone mb-8">{content.name}</h1>

      <CountryMiniMap
        polities={countryPolities}
        diasporaEntries={countryDiaspora}
        routes={countryRoutes}
        defaultYear={1900}
      />

      <div className="mt-10 space-y-8">
        {content.sections.map((s, i) => (
          <div key={i}>
            <h2 className="font-serif text-xl text-gold mb-2">{s.heading}</h2>
            <p className="text-bone/80 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-[#2A2421]">
        <p className="overline text-gold mb-2" style={{ color: ATLAS_COLORS.deepRed }}>Diaspora gabonaise</p>
        <div className="space-y-8 mt-4">
          {content.diasporaSections.map((s, i) => (
            <div key={i}>
              <h2 className="font-serif text-xl text-bone mb-2">{s.heading}</h2>
              <p className="text-bone/80 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-[#2A2421]">
        <p className="overline text-bone/50 mb-2">Sources</p>
        {content.sources.map((s, i) => (
          <p key={i} className="text-bone/60 text-xs mb-1">{s}</p>
        ))}
      </div>
    </div>
  );
}
