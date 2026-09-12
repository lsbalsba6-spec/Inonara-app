import axios from "axios";
import { LOCAL_COUNTRIES, LOCAL_COUNTRY_DOSSIERS, getLocalCountryDossier } from "../data/localCountryDossiers";
import { searchableText } from "./contentSort";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
export const API = BACKEND_URL ? `${BACKEND_URL}/api` : "/api";

export const api = axios.create({ baseURL: API });

function mergeByIso(remote = [], local = []) {
  const merged = new Map();
  [...local, ...(Array.isArray(remote) ? remote : [])].forEach((item) => {
    if (item?.iso2) merged.set(item.iso2, item);
  });
  return [...merged.values()];
}

export const fetchCountries = () => api.get("/countries")
  .then((r) => mergeByIso(r.data, LOCAL_COUNTRIES))
  .catch(() => LOCAL_COUNTRIES);

export const fetchCountryDossiers = () => api.get("/country-dossiers")
  .then((r) => mergeByIso(r.data, LOCAL_COUNTRY_DOSSIERS))
  .catch(() => LOCAL_COUNTRY_DOSSIERS);

export const fetchCountryDossier = (iso2) => {
  const local = getLocalCountryDossier(iso2);
  return api.get(`/country-dossiers/${iso2}`)
    .then((r) => r.data || local)
    .catch((error) => {
      if (local) return local;
      throw error;
    });
};

export const fetchModules = () => api.get("/modules").then((r) => r.data);
export const fetchCivilizations = () => api.get("/civilizations").then((r) => r.data);
export const fetchCivilization = (id) => api.get(`/civilizations/${id}`).then((r) => r.data);
export const fetchStories = () => api.get("/stories").then((r) => r.data);
export const fetchStory = (id) => api.get(`/stories/${id}`).then((r) => r.data);
export const fetchCulture = (params = {}) => api.get("/culture", { params }).then((r) => r.data);
export const fetchRoutes = () => api.get("/migration-routes").then((r) => r.data);
export const fetchHistoricalPolities = () => api.get("/historical-polities").then((r) => r.data);
export const fetchHistoricalEntitiesV2 = () => api.get("/historical-entities-v2").then((r) => r.data);
export const fetchPilotV3 = () => api.get("/pilot-v3-gabon-central-africa").then((r) => r.data);
export const fetchPaleoGeography = () => api.get("/paleo-geography").then((r) => r.data);
export const fetchPlateTectonics = () => api.get("/plate-tectonics").then((r) => r.data);
export const fetchDiaspora = () => api.get("/diaspora-communities").then((r) => r.data);
export const fetchDiasporaOne = (id) => api.get(`/diaspora-communities/${id}`).then((r) => r.data);
export const fetchAfricaOriginCountries = () => api.get("/africa/origin-countries").then((r) => r.data);
export const fetchAfricaOriginCountry = (iso2) => api.get(`/africa/origin-countries/${iso2}`).then((r) => r.data);
export const fetchPlaces = () => api.get("/places").then((r) => r.data);
export const fetchJourney = () => api.get("/journey").then((r) => r.data);
export const fetchEthnicGroups = () => api.get("/ethnic-groups").then((r) => r.data);
export const fetchEthnicGroup = (id) => api.get(`/ethnic-groups/${id}`).then((r) => r.data);
export const fetchFigures = () => api.get("/figures").then((r) => r.data);
export const fetchFigure = (id) => api.get(`/figures/${id}`).then((r) => r.data);
export const fetchFiguresTimeline = () => api.get("/figures-timeline").then((r) => r.data);
export const fetchCivilizationFigures = (id) => api.get(`/civilizations/${id}/figures`).then((r) => r.data);

export const search = async (q) => {
  const needle = (q || "").trim().toLocaleLowerCase("fr");
  const [remoteResult, countryResult, peopleResult] = await Promise.allSettled([
    api.get("/search", { params: { q } }).then((r) => r.data),
    fetchCountryDossiers(),
    fetchEthnicGroups(),
  ]);

  const remote = remoteResult.status === "fulfilled" ? remoteResult.value : { query: q, results: {} };
  const countries = countryResult.status === "fulfilled" ? countryResult.value : LOCAL_COUNTRY_DOSSIERS;
  const peoples = peopleResult.status === "fulfilled" ? peopleResult.value : [];
  const matches = (...values) => !needle || searchableText(...values).includes(needle);

  return {
    ...remote,
    query: q,
    results: {
      ...(remote.results || {}),
      countries: countries.filter((country) => matches(
        country.name,
        country.country,
        country.display_name,
        country.region,
        country.iso2,
        country.iso3,
        country.editorial_note,
      )),
      peoples: peoples.filter((people) => matches(
        people.name,
        people.region,
        people.regions,
        people.language,
        people.languages,
        people.language_family,
        people.summary,
        people.history,
        people.culture,
        people.modern_presence,
      )),
    },
  };
};

export const narrate = (text) => api.post("/narrate", { text }).then((r) => r.data);
export const askAtlas = (payload) => api.post("/ask", payload).then((r) => r.data);
