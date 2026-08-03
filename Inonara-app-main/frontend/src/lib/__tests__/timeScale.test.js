import {
  TIME_ANCHORS,
  SLIDER_MIN,
  SLIDER_MAX,
  sliderToYear,
  yearToSlider,
  modeForYear,
  eraLabel,
  getTimelinePosition,
} from "../timeScale";

describe("timeScale: slider extremities", () => {
  test("SLIDER_MIN maps to the first anchor's year (Pangaea assembly)", () => {
    expect(sliderToYear(SLIDER_MIN)).toBe(TIME_ANCHORS[0][1]);
  });

  test("SLIDER_MAX maps to the last anchor's year (today)", () => {
    expect(sliderToYear(SLIDER_MAX)).toBe(TIME_ANCHORS[TIME_ANCHORS.length - 1][1]);
  });
});

describe("timeScale: all 11 anchor points round-trip exactly", () => {
  test.each(TIME_ANCHORS)("anchor fraction %f -> year %i", (fraction, year) => {
    const sliderValue = Math.round(fraction * SLIDER_MAX);
    expect(sliderToYear(sliderValue)).toBe(year);
  });
});

describe("timeScale: sliderToYear -> yearToSlider round trip", () => {
  test.each(TIME_ANCHORS)("round-trips anchor at fraction %f", (fraction) => {
    const sliderValue = Math.round(fraction * SLIDER_MAX);
    const year = sliderToYear(sliderValue);
    const backToSlider = yearToSlider(year);
    // Rounding through two piecewise-linear interpolations can be off by a
    // tiny amount; within 1 slider unit is an exact round-trip in practice.
    expect(Math.abs(backToSlider - sliderValue)).toBeLessThanOrEqual(1);
  });

  test("round-trips a handful of arbitrary in-range slider positions", () => {
    for (const sliderValue of [1, 50, 137, 400, 500, 619, 620, 621, 750, 999]) {
      const year = sliderToYear(sliderValue);
      const backToSlider = yearToSlider(year);
      expect(Math.abs(backToSlider - sliderValue)).toBeLessThanOrEqual(1);
    }
  });
});

describe("timeScale: transitions between geological, prehistoric, and historical", () => {
  test("modeForYear boundaries", () => {
    expect(modeForYear(-70001)).toBe("geological");
    expect(modeForYear(-70000)).toBe("prehistoric");
    expect(modeForYear(-3501)).toBe("prehistoric");
    expect(modeForYear(-3500)).toBe("historical");
    expect(modeForYear(2025)).toBe("historical");
  });

  test("getTimelinePosition reflects the correct mode at each anchor", () => {
    // Anchors up to and including -14,000,000 (index 6) are geological;
    // -70,000 and -10,000 (indices 7-8) are prehistoric; -3,500 and 2025
    // (indices 9-10) are historical.
    const expectedModes = [
      "geological", "geological", "geological", "geological",
      "geological", "geological", "geological",
      "prehistoric", "prehistoric",
      "historical", "historical", "historical", "historical", "historical", "historical",
    ];
    TIME_ANCHORS.forEach(([fraction], i) => {
      const sliderValue = Math.round(fraction * SLIDER_MAX);
      const pos = getTimelinePosition(sliderValue);
      expect(pos.mode).toBe(expectedModes[i]);
    });
  });

  test("visibleLayers and transitionStyle differ meaningfully by mode", () => {
    const geo = getTimelinePosition(yearToSlider(-300000000));
    const pre = getTimelinePosition(yearToSlider(-50000));
    const hist = getTimelinePosition(yearToSlider(1300));

    expect(geo.mode).toBe("geological");
    expect(geo.transitionStyle).toBe("interpolate");
    expect(geo.visibleLayers).toEqual(["tectonic-plates"]);

    expect(pre.mode).toBe("prehistoric");
    expect(pre.transitionStyle).toBe("interpolate");
    expect(pre.visibleLayers).toContain("land-bridges");

    expect(hist.mode).toBe("historical");
    expect(hist.transitionStyle).toBe("discrete");
    expect(hist.visibleLayers).toEqual(
      expect.arrayContaining(["polities", "civilizations", "diaspora"])
    );
  });
});

describe("timeScale: invalid or out-of-range values", () => {
  test("sliderToYear clamps values below SLIDER_MIN to the first anchor's year (regression test for the pre-PR1 bug)", () => {
    expect(sliderToYear(-1)).toBe(TIME_ANCHORS[0][1]);
    expect(sliderToYear(-999999)).toBe(TIME_ANCHORS[0][1]);
  });

  test("sliderToYear clamps values above SLIDER_MAX to the last anchor's year", () => {
    expect(sliderToYear(SLIDER_MAX + 1)).toBe(TIME_ANCHORS[TIME_ANCHORS.length - 1][1]);
    expect(sliderToYear(999999)).toBe(TIME_ANCHORS[TIME_ANCHORS.length - 1][1]);
  });

  test("yearToSlider clamps years before the first anchor to SLIDER_MIN", () => {
    expect(yearToSlider(-999999999999)).toBe(SLIDER_MIN);
  });

  test("yearToSlider clamps years after the last anchor to SLIDER_MAX", () => {
    expect(yearToSlider(999999)).toBe(SLIDER_MAX);
  });

  test("getTimelinePosition never throws and always clamps for NaN-adjacent or extreme input", () => {
    expect(() => getTimelinePosition(-1)).not.toThrow();
    expect(() => getTimelinePosition(SLIDER_MAX + 5000)).not.toThrow();
    expect(getTimelinePosition(-1).sliderValue).toBe(SLIDER_MIN);
    expect(getTimelinePosition(SLIDER_MAX + 5000).sliderValue).toBe(SLIDER_MAX);
  });

  test("eraLabel produces a non-empty string for extreme years", () => {
    expect(typeof eraLabel(-300000000)).toBe("string");
    expect(eraLabel(-300000000).length).toBeGreaterThan(0);
    expect(typeof eraLabel(2025)).toBe("string");
  });
});
