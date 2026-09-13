import { ATLAS_COLORS } from "./designTokens";

/**
 * One registry for every Atlas layer, independent from language and renderer.
 *
 * This file is intentionally data-only. It does not import Civilizations,
 * Journey, Figures or country modules, which keeps those feature branches free
 * to evolve independently. Future branches only need to emit records carrying
 * one or more of the relation keys declared below.
 */
export const ATLAS_RELATION_KEYS = Object.freeze([
  "countryId",
  "civilizationId",
  "figureId",
  "journeyId",
  "peopleId",
  "eventId",
  "placeId",
]);

const layer = (config) => Object.freeze({
  defaultVisible: false,
  minZoom: 1,
  maxZoom: 8,
  geometry: "mixed",
  status: "prepared",
  relationKeys: ATLAS_RELATION_KEYS,
  ...config,
});

export const ATLAS_LAYERS = Object.freeze({
  countries: layer({
    id: "countries",
    labels: { fr: "Pays", en: "Countries" },
    defaultVisible: true,
    minZoom: 1,
    geometry: "polygon",
    status: "active",
    relationKeys: ["countryId"],
    color: ATLAS_COLORS.landAfrica,
  }),
  territories: layer({
    id: "territories",
    labels: { fr: "Territoires", en: "Territories" },
    defaultVisible: true,
    minZoom: 1.4,
    geometry: "polygon",
    relationKeys: ["countryId", "placeId"],
  }),
  peoples: layer({
    id: "peoples",
    labels: { fr: "Peuples", en: "Peoples" },
    minZoom: 2,
    geometry: "polygon-point",
    relationKeys: ["peopleId", "countryId", "placeId"],
  }),
  civilizations: layer({
    id: "civilizations",
    labels: { fr: "Civilisations", en: "Civilizations" },
    defaultVisible: true,
    minZoom: 1.4,
    geometry: "polygon-point",
    status: "active",
    relationKeys: ["civilizationId", "countryId", "peopleId", "placeId"],
    color: ATLAS_COLORS.gold,
  }),
  migrations: layer({
    id: "migrations",
    labels: { fr: "Migrations", en: "Migrations" },
    defaultVisible: true,
    minZoom: 1,
    geometry: "line",
    status: "active",
    relationKeys: ["journeyId", "peopleId", "countryId", "eventId", "placeId"],
  }),
  tradeRoutes: layer({
    id: "tradeRoutes",
    labels: { fr: "Routes commerciales", en: "Trade routes" },
    minZoom: 1.5,
    geometry: "line",
    relationKeys: ["journeyId", "civilizationId", "countryId", "placeId", "eventId"],
  }),
  diasporas: layer({
    id: "diasporas",
    labels: { fr: "Diasporas", en: "Diasporas" },
    defaultVisible: true,
    minZoom: 1,
    geometry: "point-line",
    status: "active",
    relationKeys: ["countryId", "peopleId", "journeyId", "placeId"],
    color: ATLAS_COLORS.deepRed,
  }),
  heritage: layer({
    id: "heritage",
    labels: { fr: "Patrimoine", en: "Heritage" },
    defaultVisible: true,
    minZoom: 1.8,
    geometry: "point-polygon",
    status: "active",
    relationKeys: ["placeId", "countryId", "civilizationId", "peopleId"],
    color: ATLAS_COLORS.amber,
  }),
  figures: layer({
    id: "figures",
    labels: { fr: "Personnalités", en: "Figures" },
    minZoom: 2.6,
    geometry: "point",
    relationKeys: ["figureId", "countryId", "civilizationId", "peopleId", "placeId", "eventId"],
  }),
  events: layer({
    id: "events",
    labels: { fr: "Événements", en: "Events" },
    minZoom: 2,
    geometry: "point-polygon",
    relationKeys: ["eventId", "countryId", "civilizationId", "peopleId", "placeId", "journeyId"],
  }),
  languages: layer({
    id: "languages",
    labels: { fr: "Langues", en: "Languages" },
    minZoom: 2.2,
    geometry: "polygon-point",
    relationKeys: ["countryId", "peopleId", "placeId"],
  }),
  religions: layer({
    id: "religions",
    labels: { fr: "Religions et spiritualités", en: "Religions and spiritualities" },
    minZoom: 2.2,
    geometry: "polygon-point",
    relationKeys: ["countryId", "peopleId", "civilizationId", "placeId", "figureId"],
  }),
  environment: layer({
    id: "environment",
    labels: { fr: "Environnement", en: "Environment" },
    minZoom: 1.8,
    geometry: "polygon-point",
    relationKeys: ["countryId", "placeId"],
  }),
});

export const ATLAS_LAYER_ORDER = Object.freeze([
  "countries",
  "territories",
  "peoples",
  "civilizations",
  "migrations",
  "tradeRoutes",
  "diasporas",
  "heritage",
  "figures",
  "events",
  "languages",
  "religions",
  "environment",
]);

export function getAtlasLayer(layerId) {
  return ATLAS_LAYERS[layerId] || null;
}

export function getAtlasLayerLabel(layerId, lang = "en") {
  const config = getAtlasLayer(layerId);
  if (!config) return layerId;
  return config.labels[lang === "fr" ? "fr" : "en"] || config.labels.en || layerId;
}

export function layerVisibleAtZoom(layerId, zoomScale) {
  const config = getAtlasLayer(layerId);
  if (!config) return false;
  return zoomScale >= config.minZoom && zoomScale <= config.maxZoom;
}

export function pickAtlasRelations(record = {}) {
  return Object.fromEntries(
    ATLAS_RELATION_KEYS
      .filter((key) => record?.[key] !== undefined && record?.[key] !== null)
      .map((key) => [key, record[key]])
  );
}
