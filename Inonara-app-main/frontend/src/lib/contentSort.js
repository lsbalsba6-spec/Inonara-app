export const sortLabel = (value) =>
  String(value || "")
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
  const match = String(value || "").replace(/[−–—]/g, "-").match(/-?\d{1,9}/);
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
