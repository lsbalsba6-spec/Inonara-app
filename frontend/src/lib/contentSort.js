export const localizedText = (value) => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(localizedText).filter(Boolean).join(" ");
  if (typeof value === "object") {
    const preferred = [value.fr, value.en, value.text].map(localizedText).filter(Boolean);
    if (preferred.length) return preferred.join(" ");
    return Object.values(value).map(localizedText).filter(Boolean).join(" ");
  }
  return "";
};

export const searchableText = (...values) =>
  values.map(localizedText).filter(Boolean).join(" ").toLocaleLowerCase("fr");

export const sortLabel = (value) =>
  localizedText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLocaleLowerCase("fr");

export const sortAlphabetically = (items, field = "name") =>
  [...items].sort((a, b) =>
    sortLabel(a?.[field]).localeCompare(sortLabel(b?.[field]), "fr", {
      sensitivity: "base",
      numeric: true,
    }),
  );

export const firstHistoricalYear = (value, fallback = 999999999) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const match = localizedText(value).replace(/[−–—]/g, "-").match(/-?\d{1,9}/);
  return match ? Number(match[0]) : fallback;
};

export const sortChronologically = (items, yearField = "year", labelField = "title") =>
  [...items].sort(
    (a, b) =>
      firstHistoricalYear(a?.[yearField] ?? a?.era ?? a?.era_start) -
        firstHistoricalYear(b?.[yearField] ?? b?.era ?? b?.era_start) ||
      sortLabel(a?.[labelField] ?? a?.name).localeCompare(
        sortLabel(b?.[labelField] ?? b?.name),
        "fr",
        { sensitivity: "base", numeric: true },
      ),
  );
