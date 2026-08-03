// Tests for lib/pilotV3Resolver.js and lib/pilotV3Adapter.js, using a
// realistic synthetic fixture matching the actual pilot corpus shape
// (mirrors backend/data/core_v3/pilot_gabon_central_africa's structure),
// covering the same demonstration dates verified in the backend's
// test_pilot_demo_dates.py.
import {
  resolveActiveNames,
  resolvePrimaryName,
  resolveActiveStatus,
  resolveActivePeriodInterpretation,
  resolveStyle,
} from "../pilotV3Resolver";
import { buildPilotV3Markers, buildFangProcessDisplay } from "../pilotV3Adapter";

const gabaoName = {
  id: "n1", value: "Gabão", validFrom: { year: 1472 }, validTo: null,
  confidence: "medium", integrationStatus: "ready", isPreferredDisplayName: false,
  sources: [{ category: "C", label: "Universalis" }],
};
const gabonName = {
  id: "n2", value: "Gabon", validFrom: { year: 1839, approximate: true }, validTo: null,
  confidence: "low", integrationStatus: "provisional", isPreferredDisplayName: false,
  sources: [{ category: "C", label: "Universalis" }],
};
const gabonRegion = { id: "place-gabon", category: "Place", names: [gabaoName, gabonName] };

const kongoPolity = {
  id: "polity-kongo", category: "Polity", names: [{ id: "n3", value: "Royaume du Kongo", validFrom: { year: 1390 }, validTo: null, confidence: "medium", integrationStatus: "ready", isPreferredDisplayName: true, sources: [] }],
  statuses: [],
  periodInterpretations: [
    { id: "pi1", label: "centralisation", period: { start: { year: 1483 }, end: { year: 1665 } }, confidence: "medium", integrationStatus: "ready" },
    { id: "pi2", label: "guerre-civile", period: { start: { year: 1665 }, end: { year: 1709 } }, confidence: "high", integrationStatus: "ready" },
    { id: "pi3", label: "restauration", period: { start: { year: 1709 }, end: { year: 1857 } }, confidence: "medium", integrationStatus: "ready" },
  ],
};

const republiqueGabonaise = {
  id: "polity-rg", category: "Polity",
  names: [{ id: "n4", value: "République gabonaise", validFrom: { year: 1958 }, validTo: null, confidence: "high", integrationStatus: "ready", isPreferredDisplayName: true, sources: [] }],
  statuses: [
    { id: "s1", value: "autonomous-region", validFrom: { year: 1958 }, validTo: { year: 1960 }, confidence: "high", integrationStatus: "ready" },
    { id: "s2", value: "sovereign", validFrom: { year: 1960 }, validTo: null, confidence: "high", integrationStatus: "ready" },
  ],
};

describe("pilotV3Resolver: name coexistence (Gabão/Gabon)", () => {
  test("at 1850, both Gabão and Gabon are active simultaneously — no instant replacement", () => {
    const active = resolveActiveNames(gabonRegion, 1850);
    const values = active.map((n) => n.value);
    expect(values).toContain("Gabão");
    expect(values).toContain("Gabon");
  });

  test("at 1400 (before Portuguese contact), no name is active", () => {
    expect(resolveActiveNames(gabonRegion, 1400)).toHaveLength(0);
  });

  test("each active name carries a resolved style reflecting its own confidence/status", () => {
    const active = resolveActiveNames(gabonRegion, 1850);
    const gabao = active.find((n) => n.value === "Gabão");
    const gabon = active.find((n) => n.value === "Gabon");
    expect(gabao.resolvedStyle.opacity).toBeGreaterThan(gabon.resolvedStyle.opacity);
    expect(gabon.resolvedStyle.warningBadge).toBe(true);
  });
});

describe("pilotV3Resolver: demonstration dates — Kongo phases", () => {
  test("1700 shows guerre-civile, NOT restauration", () => {
    const phase = resolveActivePeriodInterpretation(kongoPolity, 1700);
    expect(phase.label).toBe("guerre-civile");
    expect(phase.label).not.toBe("restauration");
  });

  test("1710 shows restauration", () => {
    const phase = resolveActivePeriodInterpretation(kongoPolity, 1710);
    expect(phase.label).toBe("restauration");
  });

  test("1700 and 1710 phases differ", () => {
    const p1700 = resolveActivePeriodInterpretation(kongoPolity, 1700);
    const p1710 = resolveActivePeriodInterpretation(kongoPolity, 1710);
    expect(p1700.label).not.toBe(p1710.label);
  });
});

describe("pilotV3Resolver: demonstration dates — République gabonaise status", () => {
  test("1959: autonomous-region, not sovereign", () => {
    const status = resolveActiveStatus(republiqueGabonaise, 1959);
    expect(status.value).toBe("autonomous-region");
  });

  test("1961 (independence proxy — year-level precision only): sovereign", () => {
    const status = resolveActiveStatus(republiqueGabonaise, 1961);
    expect(status.value).toBe("sovereign");
  });
});

describe("pilotV3Resolver: resolveStyle style mapping", () => {
  test("ready + high confidence: full opacity, no warning, no hachure", () => {
    const style = resolveStyle({ confidence: "high", integrationStatus: "ready" });
    expect(style.opacity).toBe(1.0);
    expect(style.warningBadge).toBe(false);
    expect(style.hachure).toBe(false);
  });

  test("disputed: warning badge AND hachure, regardless of confidence value", () => {
    const style = resolveStyle({ confidence: "medium", integrationStatus: "disputed" });
    expect(style.warningBadge).toBe(true);
    expect(style.hachure).toBe(true);
  });

  test("research-gap: warning badge and hachure", () => {
    const style = resolveStyle({ confidence: "unreviewed", integrationStatus: "research-gap" });
    expect(style.warningBadge).toBe(true);
    expect(style.hachure).toBe(true);
  });
});

describe("pilotV3Adapter: buildPilotV3Markers", () => {
  test("omits entities with no active name at the given year rather than fabricating one", () => {
    const markers = buildPilotV3Markers([gabonRegion], 1400);
    expect(markers).toHaveLength(0);
  });

  test("includes an entity once it has an active name", () => {
    const markers = buildPilotV3Markers([gabonRegion], 1850);
    expect(markers).toHaveLength(1);
    expect(markers[0].activeNames.length).toBeGreaterThanOrEqual(2);
  });

  test("every marker is flagged isApproximatePosition (honesty about missing real geometry)", () => {
    const markers = buildPilotV3Markers([gabonRegion], 1850);
    expect(markers[0].isApproximatePosition).toBe(true);
  });

  test("Event and Process entities are never turned into map markers directly", () => {
    const eventEntity = { id: "ev1", category: "Event", names: [] };
    const markers = buildPilotV3Markers([eventEntity], 1900);
    expect(markers).toHaveLength(0);
  });
});

describe("pilotV3Adapter: buildFangProcessDisplay never produces a single continuous arrow", () => {
  const fangProcess = {
    id: "proc1", processType: "migration",
    phases: [
      { label: "séparation linguistique fang/bulu/beti", period: "~1665" },
      { label: "arrivée dans l'estuaire", period: "~1860" },
    ],
    notes: "Représente un récit partiellement reconstruit.",
  };

  test("returns a phase list, never a route/trajectory field", () => {
    const display = buildFangProcessDisplay(fangProcess);
    expect(display.phases).toHaveLength(2);
    expect(display).not.toHaveProperty("route");
    expect(display).not.toHaveProperty("arrow");
    expect(display).not.toHaveProperty("trajectory");
  });

  test("always carries the warning note and a warningBadge style", () => {
    const display = buildFangProcessDisplay(fangProcess);
    expect(display.warningNote).toBeTruthy();
    expect(display.style.warningBadge).toBe(true);
  });

  test("returns null for a non-migration process (defensive)", () => {
    expect(buildFangProcessDisplay({ processType: "urbanization" })).toBeNull();
  });
});
