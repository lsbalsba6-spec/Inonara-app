import { useRef, useEffect, useState, useMemo } from "react";
import { geoEqualEarth, geoPath } from "d3-geo";
import { zoom as d3zoom, zoomIdentity } from "d3-zoom";
import { select } from "d3-selection";
import { feature } from "topojson-client";
import worldTopo from "../data/world-countries-50m.json";
import countryContinentMap from "../data/country-continent-map.json";

// Brand palette, matching the rest of AfroAtlas (see Atlas.jsx / brand tokens).
const COLORS = {
  ocean: "#0A0908",
  landDefault: "#241C14",
  landDefaultBorder: "#4A3826",
  landAfrica: "#3D2E12",
  landAfricaBorder: "#D4AF37",
  graticule: "#1A1614",
};

/**
 * Real-world equal-area map (Equal Earth projection), replacing Mercator tile
 * layers so continent sizes are geometrically honest — Africa renders at its
 * true ~30.4M km² (roughly 14x Greenland, ~3x the continental USA), not the
 * shrunken Mercator-distorted version common on most web maps.
 *
 * Renders as a single SVG. Markers are passed in as projected children via
 * the `project(lat, lon)` helper exposed through the onProjectionReady callback,
 * so the parent (Atlas.jsx) can position civilizations/diaspora/places/polities
 * using the exact same projection and share the same pan/zoom transform.
 */
const WorldMap = ({ width = 1000, height = 560, onProjectionReady, highlightAfrica = true, children }) => {
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const [transform, setTransform] = useState(zoomIdentity);

  const projection = useMemo(
    () => geoEqualEarth().fitSize([width, height], { type: "Sphere" }).translate([width / 2, height / 2]),
    [width, height]
  );
  const pathGen = useMemo(() => geoPath(projection), [projection]);

  const countries = useMemo(() => {
    const geo = feature(worldTopo, worldTopo.objects.countries);
    return geo.features;
  }, []);

  useEffect(() => {
    const svg = select(svgRef.current);
    const zoomBehavior = d3zoom()
      .scaleExtent([1, 8])
      .on("zoom", (event) => setTransform(event.transform));
    svg.call(zoomBehavior);
    return () => svg.on(".zoom", null);
  }, []);

  useEffect(() => {
    if (onProjectionReady) {
      onProjectionReady((lat, lon) => {
        const p = projection([lon, lat]);
        if (!p) return null;
        return [transform.applyX(p[0]), transform.applyY(p[1])];
      });
    }
  }, [projection, transform, onProjectionReady]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full"
      style={{ background: COLORS.ocean, touchAction: "none" }}
      data-testid="world-map-svg"
    >
      <g ref={gRef} transform={transform.toString()}>
        {countries.map((c) => {
          const name = c.properties?.name || "";
          const isAfrica = highlightAfrica && countryContinentMap[name] === "Africa";
          return (
            <path
              key={c.id || name}
              d={pathGen(c)}
              fill={isAfrica ? COLORS.landAfrica : COLORS.landDefault}
              stroke={isAfrica ? COLORS.landAfricaBorder : COLORS.landDefaultBorder}
              strokeWidth={isAfrica ? 0.9 : 0.5}
              strokeOpacity={isAfrica ? 0.8 : 0.5}
            />
          );
        })}
        {children}
      </g>
    </svg>
  );
};

export default WorldMap;
export { COLORS as WORLD_MAP_COLORS };
