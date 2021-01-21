export function uniqValues(items, filterId) {
  return [...new Set(items.flatMap((item) => item[filterId]))];
}

// TODO Memoize this!
export function getLabel(key) {
  const label = key.replace(/\.?([A-Z]+)/g, (match, word) => ` ${word}`);

  return label[0].toUpperCase() + label.slice(1);
}

function hiddenMapper(savedState) {
  return ({ key, hidden }) => [key, !!(savedState[key] ?? hidden)];
}

function notFilter([key]) {
  return key !== 'filters';
}

export function getHiddenFields(schema, savedState) {
  const mapper = hiddenMapper(savedState);

  const fieldGroups = Object.entries(schema).filter(notFilter);
  const fieldState = fieldGroups.flatMap(([, fields]) => fields.map(mapper));

  return Object.fromEntries(fieldState);
}

export function getHiddenFilters(schema, savedState) {
  const filterState = schema.filters.map(hiddenMapper(savedState));

  return Object.fromEntries(filterState);
}
