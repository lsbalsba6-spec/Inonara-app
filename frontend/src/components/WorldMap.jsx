import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { geoEqualEarth, geoPath } from "d3-geo";
import { zoom as d3zoom, zoomIdentity } from "d3-zoom";
import { select } from "d3-selection";
import { feature } from "topojson-client";
import worldTopo from "../data/world-countries-50m.json";
import countryContinentMap from "../data/country-continent-map.json";
import { getPlateGroup, lerpTransform } from "../lib/plateGroups";

// Brand palette, matching the rest of AfroAtlas (see Atlas.jsx / brand tokens).
const COLORS = {
  ocean: "#0A0908",
  landDefault: "#241C14",
  landDefaultBorder: "#4A3826",
  landAfrica: "#3D2E12",
  landAfricaBorder: "#D4AF37",
  geological: "#3D2E12",
  geologicalBorder: "#D4AF37",
};

/**
 * Real-world equal-area map (Equal Earth projection) using ACTUAL modern
 * country coastlines throughout — including in "geological" mode, where the
 * real coastlines are grouped by continental plate and rigidly repositioned
 * (shifted + rotated) toward the classic Pangaea arrangement via `geoFusion`
 * (0 = modern position, 1 = fully-assembled Pangaea). This replaces an
 * earlier version that used hand-drawn schematic blob shapes — real
 * coastlines look far more authentic, the same technique textbook Pangaea
 * diagrams use. See lib/plateGroups.js for the transform math and its
 * honesty caveats (not a precise GPlates reconstruction).
 *
 * Fully responsive to the actual container size via ResizeObserver.
 */
const WorldMap = ({ onProjectionReady, onGeoProjectionReady, onZoomChange, highlightAfrica = true, geoFusion = null, children }) => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [size, setSize] = useState({ width: 1000, height: 560 });
  const [transform, setTransform] = useState(zoomIdentity);

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

  // Group countries by plate group for geological-mode rendering, and
  // precompute each group's own projected centroid (rotation pivot).
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
    svg.call(zoomBehavior);
    return () => svg.on(".zoom", null);
  }, []);

  useEffect(() => {
    if (onZoomChange) onZoomChange(transform.k);
  }, [transform, onZoomChange]);

  const projectRef = useRef(null);
  projectRef.current = useCallback(
    (lat, lon) => {
      const p = projection([lon, lat]);
      if (!p) return null;
      return [transform.applyX(p[0]), transform.applyY(p[1])];
    },
    [projection, transform]
  );

  useEffect(() => {
    if (onProjectionReady) onProjectionReady((lat, lon) => projectRef.current(lat, lon));
  }, [projection, transform, onProjectionReady]);

  // Geological-mode projection: applies a group's transform (translate+rotate
  // around its own centroid) to a modern lat/lon point, then the zoom transform.
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
      const fx = cx + rotX + dx;
      const fy = cy + rotY + dy;
      return [transform.applyX(fx), transform.applyY(fy)];
    },
    [projection, transform, geoFusion, groupCentroids, width, height]
  );

  useEffect(() => {
    if (onGeoProjectionReady) onGeoProjectionReady((group, lat, lon) => geoProjectRef.current(group, lat, lon));
  }, [projection, transform, geoFusion, groupCentroids, onGeoProjectionReady]);

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

  return (
    <div ref={containerRef} className="w-full h-full" data-testid="world-map-container">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ background: COLORS.ocean, touchAction: "none", display: "block" }}
        data-testid="world-map-svg"
      >
        <g transform={transform.toString()}>
          {geoFusion === null &&
            countries.map((c) => {
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

          {geoFusion !== null &&
            Object.entries(groupedCountries).map(([group, feats]) => (
              <g key={group} transform={geoGroupTransformStr(group)}>
                {feats.map((c) => (
                  <path
                    key={c.id || c.properties?.name}
                    d={pathGen(c)}
                    fill={COLORS.geological}
                    stroke={COLORS.geologicalBorder}
                    strokeWidth={0.8}
                    strokeOpacity={0.75}
                  />
                ))}
              </g>
            ))}

          {children}
        </g>
      </svg>
    </div>
  );
};

export default WorldMap;
export { COLORS as WORLD_MAP_COLORS };
