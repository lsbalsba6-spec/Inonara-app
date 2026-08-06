import { useEffect, useMemo, useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, Tooltip, useMap } from "react-leaflet";
import CountrySectionFallback from "./CountrySectionFallback";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function firstNonEmptyArray(...values) {
  return values.find((value) => Array.isArray(value) && value.length > 0) || [];
}

function normaliseCity(city, index) {
  const coordinates = Array.isArray(city?.coordinates) ? city.coordinates : null;
  const lon = Number(coordinates?.[0] ?? city?.lon ?? city?.lng ?? city?.longitude);
  const lat = Number(coordinates?.[1] ?? city?.lat ?? city?.latitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

  return {
    ...city,
    id: city.id || `${city.name || city.city || "city"}-${index}`,
    name: city.name || city.city || city.label || "Localité",
    lat,
    lon,
  };
}

function FitCountryBounds({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!points.length) return;
    if (points.length === 1) {
      map.setView([points[0].lat, points[0].lon], 6, { animate: false });
      return;
    }

    map.fitBounds(points.map((point) => [point.lat, point.lon]), {
      padding: [36, 36],
      animate: false,
    });
  }, [map, points]);

  return null;
}

function TerritoryCards({ dossier }) {
  const institutions = dossier?.institutions || {};
  const geography = dossier?.geography || {};
  const overview = dossier?.overview || {};

  const divisions = firstNonEmptyArray(
    institutions.provinces,
    institutions.districts,
    institutions.administrative_divisions,
    dossier?.administrative_divisions,
    dossier?.districts,
    dossier?.provinces,
  );

  const capitalFunctions = firstNonEmptyArray(
    institutions.capital_functions,
    institutions.capitals,
    dossier?.capital_functions,
  );

  const geographySections = firstNonEmptyArray(
    geography.sections,
    geography.regions,
    geography.landscapes,
    dossier?.territory_sections,
  );

  const capitalName =
    overview.capital ||
    dossier?.capital ||
    dossier?.identity?.capital ||
    dossier?.facts?.capital;

  const hasStructuredContent =
    capitalFunctions.length > 0 ||
    divisions.length > 0 ||
    geographySections.length > 0 ||
    Boolean(capitalName);

  return (
    <div className="space-y-10">
      {(capitalFunctions.length > 0 || capitalName) && (
        <section>
          <h2 className="font-serif text-3xl text-gold">Capitale et fonctions nationales</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {capitalFunctions.length > 0 ? (
              capitalFunctions.map((item, index) => (
                <article key={`${item.city || item.name || "capital"}-${index}`} className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
                  <h3 className="font-serif text-xl text-bone">{item.city || item.name || capitalName}</h3>
                  {(item.function || item.note || item.summary) && (
                    <p className="mt-2 text-sm leading-relaxed text-bone/65">{item.function || item.note || item.summary}</p>
                  )}
                </article>
              ))
            ) : (
              <article className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
                <h3 className="font-serif text-xl text-bone">{capitalName}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone/65">Capitale nationale actuellement renseignée dans le dossier.</p>
              </article>
            )}
          </div>
        </section>
      )}

      {divisions.length > 0 && (
        <section>
          <h2 className="font-serif text-3xl text-gold">Divisions administratives</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {divisions.map((division, index) => (
              <article key={division.id || division.name || division.title || index} className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
                <h3 className="font-serif text-xl text-bone">{division.name || division.title || division.label || "Division administrative"}</h3>
                {(division.capital || division.centre || division.center || division.seat) && (
                  <p className="mt-3 text-sm text-bone/60">
                    Centre administratif : <strong className="font-medium text-gold">{division.capital || division.centre || division.center || division.seat}</strong>
                  </p>
                )}
                {(division.note || division.summary || division.description) && (
                  <p className="mt-2 text-sm leading-relaxed text-bone/60">{division.note || division.summary || division.description}</p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {geographySections.length > 0 && (
        <section>
          <h2 className="font-serif text-3xl text-gold">Territoires et milieux</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {geographySections.map((section, index) => (
              <article key={section.id || section.title || section.name || index} className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
                <h3 className="font-serif text-xl text-bone">{section.title || section.name || section.label || "Milieu géographique"}</h3>
                {(section.summary || section.text || section.note || section.description) && (
                  <p className="mt-2 text-sm leading-relaxed text-bone/65">{section.summary || section.text || section.note || section.description}</p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {!hasStructuredContent && (
        <CountrySectionFallback
          title="Territoire"
          message="La structure territoriale de ce pays est publiée progressivement. La page reste accessible pendant l’enrichissement des divisions administratives, des villes et des milieux géographiques."
        />
      )}
    </div>
  );
}

export default function CountryTerritory({ dossier }) {
  const [mapReady, setMapReady] = useState(false);

  const rawCities = firstNonEmptyArray(
    dossier?.map_visuals?.cities,
    dossier?.cities,
    dossier?.territory?.cities,
    dossier?.geography?.cities,
    dossier?.institutions?.cities,
  );

  const cities = useMemo(
    () => asArray(rawCities).map(normaliseCity).filter(Boolean),
    [rawCities],
  );

  useEffect(() => setMapReady(true), []);

  return (
    <div className="space-y-10">
      {cities.length > 0 && mapReady && (
        <section>
          <h2 className="font-serif text-3xl text-gold">Carte des principaux centres</h2>
          <p className="mt-2 text-bone/60">{dossier?.map_visuals?.note || dossier?.territory?.map_note || "Repères contemporains du territoire."}</p>
          <div className="mt-5 overflow-hidden rounded-2xl border border-bone/10 bg-[#151210]">
            <MapContainer center={[cities[0].lat, cities[0].lon]} zoom={5} scrollWheelZoom className="h-[520px] w-full md:h-[620px]">
              <FitCountryBounds points={cities} />
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {cities.map((city) => (
                <CircleMarker key={city.id} center={[city.lat, city.lon]} radius={6} pathOptions={{ color: "#151210", weight: 2, fillColor: "#D4AF37", fillOpacity: 1 }}>
                  <Tooltip direction="top">{city.name}</Tooltip>
                  <Popup>
                    <strong>{city.name}</strong>
                    {(city.kind || city.type) ? <><br />{city.kind || city.type}</> : null}
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </section>
      )}

      <TerritoryCards dossier={dossier} />
    </div>
  );
}
