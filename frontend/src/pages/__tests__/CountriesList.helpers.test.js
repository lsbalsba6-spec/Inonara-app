import { buildCountrySlug, displayCountryName } from "../CountriesList";

describe("CountriesList helpers", () => {
  test("uses the French country name when available", () => {
    expect(displayCountryName({ iso2: "ZA", display_name: "South Africa" })).toBe("Afrique du Sud");
  });

  test("does not crash on malformed API entries", () => {
    expect(displayCountryName(null)).toBe("Pays inconnu");
    expect(displayCountryName({ iso2: "XX" })).toBe("XX");
  });

  test("uses the dossier slug when one exists", () => {
    const dossiers = new Map([["ZA", { slug: "south-africa" }]]);
    expect(buildCountrySlug({ iso2: "ZA", display_name: "South Africa" }, dossiers)).toBe("south-africa");
  });
});
