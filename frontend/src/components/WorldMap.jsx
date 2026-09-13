import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { geoEqualEarth, geoPath } from "d3-geo";
import { zoom as d3zoom, zoomIdentity } from "d3-zoom";
import { select } from "d3-selection";
import { feature } from "topojson-client";
import worldTopo from "../data/world-countries-50m.json";
import countryContinentMap from "../data/country-continent-map.json";
import { getAtlasCountryMetadata, getAtlasCountryLabel } from "../data/atlasCountryGeometry";
import { getPlateGroup, lerpTransform } from "../lib/plateGroups";
import { ATLAS_COLORS } from "../lib/designTokens";
import { selectNonOverlappingLabels } from "../lib/atlasDisplay";

const COLORS = {
  ocean: ATLAS_COLORS.ocean,
  landDefault: ATLAS_COLORS.landDefault,
  landDefaultBorder: ATLAS_COLORS.landDefaultBorder,
  landAfrica: ATLAS_COLORS.landAfrica,
  landAfricaBorder: ATLAS_COLORS.landAfricaBorder,
  geological: ATLAS_COLORS.landAfrica,
  geologicalBorder: ATLAS_COLORS.landAfricaBorder,
};

/**
 * Shared Equal Earth map engine used by the main Atlas.
 *
 * The projection remains the single source of truth for both country paths and
 * every overlay supplied through `children`. Country interaction is handled at
 * this level so Atlas features (search, selection and contextual panels) can
 * reuse the same geometry instead of maintaining a second hit layer.
 *
 * `onCountrySelect` receives a stable map descriptor:
 * { id, countryId, territoryId, name, label, continent, centroid, feature }.
 * `focusCountryName` accepts a Natural Earth name, localized label or stable
 * country/territory ID and zooms through the normal d3-zoom transform.
 */
const WorldMap = ({
  onProjectionReady,
  onGeoProjectionReady,
  onZoomChange,
  onCountrySelect,
  onCountriesReady,
  selectedCountryName = null,
  focusCountryName = null,
  lang = "en",
  highlightAfrica = true,
  geoFusion = null,
  children,
}) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const zoomBehaviorRef = useRef(null);
  const [size, setSize] = useState({ width: 1000, height: 560 });
  const [transform, setTransform] = useState(zoomIdentity);
  const [internalSelectedCountry, setInternalSelectedCountry] = useState(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setSize({ width: Math.round(rect.width), height: Math.round(rect.height) });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { width, height } = size;

  const projection = useMemo(
    () => geoEqualEarth().fitSize([width, height], { type: "Sphere" }).translate([width / 2, height / 2]),
    [width, height]
  );
  const pathGen = useMemo(() => geoPath(projection), [projection]);

  const countries = useMemo(() => {
    const geo = feature(worldTopo, worldTopo.objects.countries);
    return geo.features;
  }, []);

  const countryDescriptors = useMemo(
    () => countries.map((country) => {
      const name = country.properties?.name || "";
      const centroid = pathGen.centroid(country);
      const metadata = getAtlasCountryMetadata(name);
      return {
        id: String(country.id || name),
        countryId: metadata?.countryId || null,
        territoryId: metadata?.territoryId || null,
        kind: metadata?.kind || "country",
        name,
        label: getAtlasCountryLabel(name, lang),
        labels: metadata ? { fr: metadata.fr, en: metadata.en } : { fr: name, en: name },
        continent: countryContinentMap[name] || null,
        centroid,
        area: pathGen.area(country),
        feature: country,
      };
    }).filter((country) => country.name && country.centroid && !Number.isNaN(country.centroid[0]) && !Number.isNaN(country.centroid[1])),
    [countries, pathGen, lang]
  );

  const countryLookup = useMemo(() => {
    const lookup = new Map();
    for (const country of countryDescriptors) {
      const aliases = [
        country.name,
        country.label,
        country.labels?.fr,
        country.labels?.en,
        country.countryId,
        country.territoryId,
      ].filter(Boolean);
      for (const alias of aliases) lookup.set(String(alias).toLocaleLowerCase(), country);
    }
    return lookup;
  }, [countryDescriptors]);

  useEffect(() => {
    if (onCountriesReady) onCountriesReady(countryDescriptors);
  }, [countryDescriptors, onCountriesReady]);

  const groupedCountries = useMemo(() => {
    const groups = {};
    for (const c of countries) {
      const name = c.properties?.name || "";
      const group = getPlateGroup(name);
      if (!groups[group]) groups[group] = [];
      groups[group].push(c);
    }
    return groups;
  }, [countries]);

  const groupCentroids = useMemo(() => {
    const out = {};
    for (const [group, feats] of Object.entries(groupedCountries)) {
      let sx = 0, sy = 0, n = 0;
      for (const f of feats) {
        const c = pathGen.centroid(f);
        if (c && !Number.isNaN(c[0]) && !Number.isNaN(c[1])) {
          sx += c[0]; sy += c[1]; n++;
        }
      }
      out[group] = n > 0 ? [sx / n, sy / n] : [width / 2, height / 2];
    }
    return out;
  }, [groupedCountries, pathGen, width, height]);

  useEffect(() => {
    const svg = select(svgRef.current);
    const zoomBehavior = d3zoom()
      .scaleExtent([1, 8])
      .on("zoom", (event) => setTransform(event.transform));
    zoomBehaviorRef.current = zoomBehavior;
    svg.call(zoomBehavior);
    return () => {
      svg.on(".zoom", null);
      zoomBehaviorRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (onZoomChange) onZoomChange(transform.k);
  }, [transform, onZoomChange]);

  useEffect(() => {
    if (!focusCountryName || geoFusion !== null || !zoomBehaviorRef.current || !svgRef.current) return;
    const country = countryLookup.get(String(focusCountryName).toLocaleLowerCase());
    if (!country) return;
    const [cx, cy] = country.centroid;
    const targetScale = 3.6;
    const next = zoomIdentity
      .translate(width / 2, height / 2)
      .scale(targetScale)
      .translate(-cx, -cy);
    select(svgRef.current).call(zoomBehaviorRef.current.transform, next);
  }, [focusCountryName, countryLookup, geoFusion, height, width]);

  const projectRef = useRef(null);
  projectRef.current = useCallback(
    (lat, lon) => {
      const p = projection([lon, lat]);
      if (!p) return null;
      return [p[0], p[1]];
    },
    [projection]
  );

  useEffect(() => {
    if (onProjectionReady) onProjectionReady((lat, lon) => projectRef.current(lat, lon));
  }, [projection, onProjectionReady]);

  const geoProjectRef = useRef(null);
  geoProjectRef.current = useCallback(
    (group, lat, lon) => {
      const p = projection([lon, lat]);
      if (!p) return null;
      const lerped = lerpTransform(geoFusion ?? 0);
      const t = lerped[group] || { dxFrac: 0, dyFrac: 0, rotateDeg: 0 };
      const [cx, cy] = groupCentroids[group] || [width / 2, height / 2];
      const dx = t.dxFrac * width;
      const dy = t.dyFrac * height;
      const rad = (t.rotateDeg * Math.PI) / 180;
      const rx = p[0] - cx, ry = p[1] - cy;
      const rotX = rx * Math.cos(rad) - ry * Math.sin(rad);
      const rotY = rx * Math.sin(rad) + ry * Math.cos(rad);
      return [cx + rotX + dx, cy + rotY + dy];
    },
    [projection, geoFusion, groupCentroids, width, height]
  );

  useEffect(() => {
    if (onGeoProjectionReady) onGeoProjectionReady((group, lat, lon) => geoProjectRef.current(group, lat, lon));
  }, [projection, geoFusion, groupCentroids, onGeoProjectionReady]);

  const geoGroupTransformStr = useCallback(
    (group) => {
      const lerped = lerpTransform(geoFusion ?? 0);
      const t = lerped[group] || { dxFrac: 0, dyFrac: 0, rotateDeg: 0 };
      const [cx, cy] = groupCentroids[group] || [width / 2, height / 2];
      const dx = t.dxFrac * width;
      const dy = t.dyFrac * height;
      return `translate(${dx},${dy}) rotate(${t.rotateDeg} ${cx} ${cy})`;
    },
    [geoFusion, groupCentroids, width, height]
  );

  const activeCountryName = selectedCountryName || internalSelectedCountry;

  const visibleCountryLabels = useMemo(() => {
    if (geoFusion !== null || !highlightAfrica) return [];
    const maxLabels = transform.k < 1.35 ? 0 : transform.k < 1.8 ? 10 : transform.k < 2.6 ? 22 : transform.k < 4 ? 38 : 60;
    if (maxLabels === 0 && !activeCountryName) return [];

    const candidates = countryDescriptors
      .filter((country) => country.continent === "Africa")
      .sort((a, b) => b.area - a.area)
      .map((country) => ({
        id: country.countryId || country.territoryId || country.id,
        text: country.label,
        x: country.centroid[0],
        y: country.centroid[1],
        fontSizePx: country.name === activeCountryName ? 12 : 10,
        priority: (country.name === activeCountryName ? 100000 : 0) + country.area,
        active: country.name === activeCountryName,
      }));

    candidates.sort((a, b) => b.priority - a.priority);
    return selectNonOverlappingLabels(candidates, transform.k, { maxLabels: Math.max(maxLabels, activeCountryName ? 1 : 0), paddingPx: 5 });
  }, [activeCountryName, countryDescriptors, geoFusion, highlightAfrica, transform.k]);

  const activateCountry = useCallback((country) => {
    if (!country || country.continent !== "Africa" || geoFusion !== null) return;
    setInternalSelectedCountry(country.name);
    if (onCountrySelect) onCountrySelect(country);
  }, [geoFusion, onCountrySelect]);

  const handleCountryKeyDown = useCallback((event, country) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    activateCountry(country);
  }, [activateCountry]);

  const resetView = useCallback(() => {
    if (!zoomBehaviorRef.current || !svgRef.current) return;
    setInternalSelectedCountry(null);
    select(svgRef.current).call(zoomBehaviorRef.current.transform, zoomIdentity);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative" data-testid="world-map-container">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ background: COLORS.ocean, touchAction: "none", display: "block" }}
        data-testid="world-map-svg"
        role="img"
        aria-label={lang === "fr" ? "Carte interactive Equal Earth" : "Interactive Equal Earth map"}
      >
        <g transform={transform.toString()}>
          {geoFusion === null &&
            countryDescriptors.map((country) => {
              const isAfrica = highlightAfrica && country.continent === "Africa";
              const isInteractive = isAfrica;
              const isSelected = isInteractive && activeCountryName === country.name;
              return (
                <path
                  key={country.id}
                  d={pathGen(country.feature)}
                  fill={isAfrica ? COLORS.landAfrica : COLORS.landDefault}
                  stroke={isSelected ? ATLAS_COLORS.gold : isAfrica ? COLORS.landAfricaBorder : COLORS.landDefaultBorder}
                  strokeWidth={isSelected ? 2.2 : isAfrica ? 0.9 : 0.5}
                  strokeOpacity={isSelected ? 1 : isAfrica ? 0.8 : 0.5}
                  vectorEffect="non-scaling-stroke"
                  tabIndex={isInteractive ? 0 : undefined}
                  role={isInteractive ? "button" : undefined}
                  aria-label={isInteractive ? (lang === "fr" ? `Ouvrir ${country.label}` : `Open ${country.label}`) : undefined}
                  data-country-id={country.countryId || undefined}
                  data-territory-id={country.territoryId || undefined}
                  data-country-name={country.name}
                  data-continent={country.continent || undefined}
                  data-testid={isInteractive ? `atlas-country-${country.countryId || country.territoryId || country.id}` : undefined}
                  onClick={isInteractive ? () => activateCountry(country) : undefined}
                  onKeyDown={isInteractive ? (event) => handleCountryKeyDown(event, country) : undefined}
                  style={isInteractive ? { cursor: "pointer", outline: "none" } : undefined}
                >
                  <title>{country.label}</title>
                </path>
              );
            })}

          {geoFusion !== null &&
            (() => {
              const borderOpacity = Math.max(0, (0.9 - geoFusion) / 0.9) * 0.75;
              const borderWidth = borderOpacity > 0 ? 0.8 : 0;
              return Object.entries(groupedCountries).map(([group, feats]) => (
                <g key={group} transform={geoGroupTransformStr(group)}>
                  {feats.map((c) => (
                    <path
                      key={c.id || c.properties?.name}
                      d={pathGen(c)}
                      fill={COLORS.geological}
                      stroke={COLORS.geologicalBorder}
                      strokeWidth={borderWidth}
                      strokeOpacity={borderOpacity}
                    />
                  ))}
                </g>
              ));
            })()}

          {children}

          {geoFusion === null && visibleCountryLabels.map((label) => (
            <text
              key={`country-label-${label.id}`}
              x={label.x}
              y={label.y}
              fontSize={label.fontSizePx / transform.k}
              fill={label.active ? ATLAS_COLORS.gold : ATLAS_COLORS.textBone}
              textAnchor="middle"
              dominantBaseline="middle"
              paintOrder="stroke"
              stroke={ATLAS_COLORS.ocean}
              strokeWidth={3 / transform.k}
              strokeLinejoin="round"
              style={{ fontFamily: "serif", pointerEvents: "none" }}
              data-testid={`atlas-country-label-${label.id}`}
            >
              {label.text}
            </text>
          ))}
        </g>
      </svg>

      {geoFusion === null && transform.k > 1 && (
        <button
          type="button"
          onClick={resetView}
          className="absolute top-3 right-3 z-10 rounded border border-gold/30 bg-black/55 px-3 py-2 text-[0.65rem] uppercase tracking-[0.14em] text-gold backdrop-blur"
          data-testid="atlas-reset-view"
        >
          {lang === "fr" ? "Vue Afrique" : "Africa view"}
        </button>
      )}
    </div>
  );
};

export default WorldMap;
export { COLORS as WORLD_MAP_COLORS };
