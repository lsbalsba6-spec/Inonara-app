import { getMigrationVisualStyle, selectNonOverlappingLabels } from "../atlasDisplay";

describe("migration visual styles", () => {
  test("voluntary routes are green, never forced red", () => {
    expect(getMigrationVisualStyle("voluntary").color).toBe("#4ade80");
    expect(getMigrationVisualStyle("voluntary").color).not.toBe(getMigrationVisualStyle("forced").color);
  });

  test("each supported type has one consistent style", () => {
    expect(getMigrationVisualStyle("forced").dasharray).toBeUndefined();
    expect(getMigrationVisualStyle("mixed").color).toBeTruthy();
    expect(getMigrationVisualStyle("conquest").dasharray).toBe("12 4");
    expect(getMigrationVisualStyle("unknown").label).toBe("Type à confirmer");
  });
});

describe("label collision filter", () => {
  test("keeps the higher-priority label when two labels overlap", () => {
    const result = selectNonOverlappingLabels([
      { id: "high", text: "High priority", x: 100, y: 100, priority: 10, fontSizePx: 12 },
      { id: "low", text: "Low priority", x: 102, y: 101, priority: 1, fontSizePx: 12 },
    ], 1);
    expect(result.map((item) => item.id)).toEqual(["high"]);
  });

  test("allows labels that are separated and reveals more at higher zoom", () => {
    const candidates = Array.from({ length: 50 }, (_, index) => ({
      id: String(index), text: `Label ${index}`, x: index * 100, y: 100, priority: 50 - index, fontSizePx: 10,
    }));
    expect(selectNonOverlappingLabels(candidates, 1).length).toBeLessThan(
      selectNonOverlappingLabels(candidates, 4).length
    );
  });
});
