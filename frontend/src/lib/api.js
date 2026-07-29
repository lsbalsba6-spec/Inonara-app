import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export const fetchCountries = () => api.get("/countries").then((r) => r.data);
export const fetchCountryDossier = (iso2) => api.get(`/country-dossiers/${iso2}`).then((r) => r.data);
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
export const search = (q) => api.get("/search", { params: { q } }).then((r) => r.data);
export const fetchDiaspora = () => api.get("/diaspora-communities").then((r) => r.data);
export const fetchDiasporaOne = (id) => api.get(`/diaspora-communities/${id}`).then((r) => r.data);
export const fetchAfricaOriginCountries = () => api.get("/africa/origin-countries").then((r) => r.data);
export const fetchAfricaOriginCountry = (iso2) => api.get(`/africa/origin-countries/${iso2}`).then((r) => r.data);
export const fetchPlaces = () => api.get("/places").then((r) => r.data);
export const fetchJourney = () => api.get("/journey").then((r) => r.data);
export const fetchEthnicGroups = () => api.get("/ethnic-groups").then((r) => r.data);
export const fetchEthnicGroup = (id) => api.get(`/ethnic-groups/${id}`).then((r) => r.data);
export const fetchCivilizationFigures = (id) => api.get(`/civilizations/${id}/figures`).then((r) => r.data);
export const narrate = (text) => api.post("/narrate", { text }).then((r) => r.data);
export const askAtlas = (payload) => api.post("/ask", payload).then((r) => r.data);
