import { getNames } from "country-list";

const TOP_COUNTRY = "India";

const POPULAR_COUNTRIES = [
  "United States of America (the)",
  "United Kingdom of Great Britain and Northern Ireland (the)",
  "United Arab Emirates (the)",
  "Australia",
  "Canada",
  "Singapore",
  "Germany",
  "France",
];

export const getOrderedCountries = () => {
  const all = getNames();
  const prioritized = [TOP_COUNTRY, ...POPULAR_COUNTRIES].filter((c) =>
    all.includes(c),
  );
  const prioritizedSet = new Set(prioritized);
  const rest = all
    .filter((c) => !prioritizedSet.has(c))
    .sort((a, b) => a.localeCompare(b));
  return [...prioritized, ...rest];
};
