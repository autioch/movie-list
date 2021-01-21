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
