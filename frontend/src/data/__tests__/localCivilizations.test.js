import {
  CIVILIZATION_ENRICHMENT_BY_ID,
  LOCAL_CIVILIZATION_ENRICHMENTS,
  mergeCivilizationList,
  sanitizeCivilizationMedia,
} from "../localCivilizations";

const bilingualFields = [
  "name",
  "summary",
  "territory_and_expansion",
  "political_structure",
  "institutions",
  "economy_and_trade",
  "trade_networks",
  "science_and_knowledge",
  "art_and_culture",
  "legacy",
];

const relationFields = ["countryIds", "figureIds", "peopleIds", "timelineEventIds", "journeyIds"];

describe("local civilization editorial corpus", () => {
  test("uses unique stable ids", () => {
    const ids = LOCAL_CIVILIZATION_ENRICHMENTS.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(expect.arrayContaining(["mali", "songhai", "kush", "axum", "great-zimbabwe", "kongo", "swahili", "benin", "egypt", "asante", "zulu", "hausa", "ghana-wagadu", "kanem-bornu"]));
  });

  test.each(LOCAL_CIVILIZATION_ENRICHMENTS.map((item) => [item.id, item]))(
    "%s keeps equivalent French and English core fields",
    (_id, item) => {
      bilingualFields.forEach((field) => {
        expect(item[field]).toEqual(expect.objectContaining({ fr: expect.any(String), en: expect.any(String) }));
        expect(item[field].fr.trim().length).toBeGreaterThan(20);
        expect(item[field].en.trim().length).toBeGreaterThan(20);
      });
    },
  );

  test.each(LOCAL_CIVILIZATION_ENRICHMENTS.map((item) => [item.id, item]))(
    "%s exposes future relation fields and sources",
    (_id, item) => {
      relationFields.forEach((field) => expect(Array.isArray(item[field])).toBe(true));
      expect(item.sources?.length).toBeGreaterThan(0);
      expect(item.timeline?.length).toBeGreaterThan(0);
    },
  );

  test("merges enrichment over legacy API records without changing stable ids", () => {
    const merged = mergeCivilizationList([{ id: "mali", name: "Legacy Mali", image_url: "https://example.com/legacy.jpg" }]);
    const mali = merged.find((item) => item.id === "mali");
    expect(mali.id).toBe("mali");
    expect(mali.name.fr).toBe("Empire du Mali");
    expect(mali.image_url).toBeNull();
  });

  test("rejects legacy images without explicit rights metadata", () => {
    const unsafe = sanitizeCivilizationMedia({ id: "legacy", image_url: "https://example.com/a.jpg", image_credit: "Unknown" });
    expect(unsafe.image_url).toBeNull();
    const safe = sanitizeCivilizationMedia({
      id: "licensed",
      image_url: "https://example.com/a.jpg",
      image_credit: "Museum / Photographer",
      image_source_url: "https://example.com/source",
      image_license: "CC BY 4.0",
    });
    expect(safe.image_url).toBe("https://example.com/a.jpg");
  });

  test("id index resolves every enriched record", () => {
    LOCAL_CIVILIZATION_ENRICHMENTS.forEach((item) => expect(CIVILIZATION_ENRICHMENT_BY_ID[item.id]).toBe(item));
  });
});
