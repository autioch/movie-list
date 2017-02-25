const dictionary = require('./dictionary');
const sortsModelFactory = require('./sorts');
const statRange = require('./statRange');
const filterModelFactory = require('filters/types/model');

const RANGE_TYPE = 2;

module.exports = function appModelFactory(schema, totalItems) {
  const totalCount = totalItems.length;
  const sorts = sortsModelFactory();
  const api = {
    syncItems,
    addSort,
    removeSort,
    query,
    onChange
  };

  const fields = schema.fields.map((field) => filterModelFactory(field, api));

  let callbackFn = () => {};
  let currentItems = totalItems.slice(0);
  let currentCount = currentItems.length;
  let stats = [];

  function syncItems() {
    currentItems = sorts.applySorts(filterItems(totalItems.slice(0)));
    currentCount = currentItems.length;
    generateStats();
    callbackFn();
  }

  function filterItems(items) {
    return fields
      .filter((field) => field.hasValue())
      .reduce((filteredItems, level) => filteredItems.filter((item) => level.test(item)), items);
  }

  function generateStats() {
    stats = fields
      .filter((field) => field.type === RANGE_TYPE)
      .map((field) => ({
        label: field.label,
        items: statRange(currentItems.map((item) => item[field.key]))
      }));
  }

  function addSort(newSort) {
    sorts.addSort(newSort);
    syncItems();
  }

  function removeSort(key) {
    sorts.removeSort(key);
    syncItems();
  }

  function onChange(newCallbackFn) {
    callbackFn = newCallbackFn;
  }

  function query() {
    return {
      totalCount,
      count: currentCount,
      items: currentItems,
      fields,
      schema,
      stats
    };
  }

  dictionary(fields, totalItems);
  generateStats();

  return api;
};
