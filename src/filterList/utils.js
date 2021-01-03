export function uniqValues(items, filterId) {
  return [...new Set(items.flatMap((item) => item[filterId]))];
}

// TODO Memoize this!
export function getLabel(key) {
  const label = key.replace(/\.?([A-Z]+)/g, (match, word) => ` ${word}`);

  return label[0].toUpperCase() + label.slice(1);
}
