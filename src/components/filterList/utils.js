export function uniqValues(items, filterId) {
  return [...new Set(items.flatMap((item) => item[filterId]))];
}
