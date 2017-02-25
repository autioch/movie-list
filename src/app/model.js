const fieldTypes = require('filters/types');
const dictionary = require('./dictionary');
const sortsModelFactory = require('./sorts');

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

  const fields = schema.fields.map((field) => fieldTypes[field.type].modelFactory(field, api));

  let callbackFn = () => {};
  let currentItems = totalItems.slice(0);
  let currentCount = currentItems.length;

  function syncItems() {
    currentItems = sorts.applySorts(filterItems(totalItems.slice(0)));
    currentCount = currentItems.length;
    callbackFn();
  }

  function filterItems(items) {
    return fields
      .filter((field) => field.hasValue())
      .reduce((filteredItems, level) => filteredItems.filter((item) => level.test(item)), items);
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
      schema
    };
  }

  dictionary(fields, totalItems);

  return api;
};
