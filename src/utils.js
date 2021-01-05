export function uniqValues(items, filterId) {
  return [...new Set(items.flatMap((item) => item[filterId]))];
}

// TODO Memoize this!
export function getLabel(key) {
  const label = key.replace(/\.?([A-Z]+)/g, (match, word) => ` ${word}`);

  return label[0].toUpperCase() + label.slice(1);
}

export function getHiddenFields(schema) {
  return Object.fromEntries(Object.entries(schema)
    .filter(([key]) => key !== 'filters')
    .flatMap(([, fields]) => fields.map(({ key, hidden }) => [key, !!hidden])));
}
