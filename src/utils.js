export function uniqValues(items, filterId) {
  return [...new Set(items.flatMap((item) => item[filterId]))];
}

// Simple memoize
const LABEL_CACHE = {};
const UPPERCASE_REGEXP = /\.?([A-Z]+)/g;
const insertSpace = (match, word) => ` ${word}`;

export function getLabel(key) {
  if (!LABEL_CACHE[key]) {
    const label = key.replace(UPPERCASE_REGEXP, insertSpace);

    LABEL_CACHE[key] = label[0].toUpperCase() + label.slice(1);
  }

  return LABEL_CACHE[key];
}
