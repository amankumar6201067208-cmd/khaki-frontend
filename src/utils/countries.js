import { getNames } from "country-list";

// The country the audience mostly books from — pinned to the very top.
const TOP_COUNTRY = "India";

// Commonly-selected countries, surfaced right after India. These strings must
// match country-list's official names exactly (that's what gets submitted).
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

/**
 * Country names ordered as: India → popular countries → the rest (A→Z).
 * (country-list's default order is by country code, not name, so we sort the
 * remaining countries alphabetically for a proper dropdown.)
 */
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
