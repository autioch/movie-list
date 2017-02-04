module.exports = function filterItems(fields, items) {
  return fields
    .filter((field) => field.hasValue())
    .reduce((filteredItems, level) => filteredItems.filter((item) => level.test(item)), items);
};
