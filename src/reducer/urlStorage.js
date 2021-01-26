/* eslint-disable no-magic-numbers */

const notUndefined = (val) => val !== undefined;
const SEP = '/';

export function serializeToUrl(state) {
  const { filterValues, sortOrders, sortKeys, schema: { filters = [] } } = state;

  const arr = filters.map(({ key }) => [key, sortKeys[key], JSON.stringify(filterValues[key]), sortOrders[key]]);
  const used = arr
    .filter((values) => values.slice(1).some(notUndefined))
    .map((values) => values.map((value) => value === undefined ? '*' : value).join(SEP)) // eslint-disable-line no-confusing-arrow
    .join(SEP);

  const url = new URL(window.location);

  url.searchParams.set('filters1', used);

  window.history.replaceState(null, '', url);
}

export function readFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const filters = urlParams.get('filters1') ?? '';

  const items = filters.split(SEP).map((val) => val === '*' ? undefined : val);// eslint-disable-line no-confusing-arrow
  const size = 3;

  const fields = Array.from({
    length: Math.ceil(items.length / size)
  }, (value, index) => items.slice(index * size, (index * size) + size));

  return {
    filterValues: Object.fromEntries(fields.filter((field) => field[2] !== undefined).map((field) => [field[0], JSON.parse(field[2])])),
    sortOrders: Object.fromEntries(fields.map((field) => [field[0], field[3]])),
    sortKeys: fields.map((field) => field[1]).filter(notUndefined)
  };
}
