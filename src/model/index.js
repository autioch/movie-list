import dictionary from './dictionary';
import sortsModelFactory from './sorts';
import fieldModelFactory from './filters';

export default function appModelFactory(schema, totalItems) {
  const totalCount = totalItems.length;
  const sorts = sortsModelFactory();
  const api = {
    syncItems,
    addSort,
    removeSort,
    query,
    onChange,
    toState
  };

  const fields = schema.fields.map((field) => fieldModelFactory(field, api));

  let callbackFn = () => {};

  let currentItems = totalItems.slice(0);

  let currentCount = currentItems.length;

  function filterItems(items) {
    return fields
      .filter((field) => field.hasValue())
      .reduce((filteredItems, level) => filteredItems.filter((item) => level.test(item)), items);
  }

  function generateStats() {
    fields.forEach((field) => field.stat && field.getStats(currentItems));
  }

  function syncItems() {
    currentItems = sorts.applySorts(filterItems(totalItems.slice(0)));
    currentCount = currentItems.length;
    generateStats();
    callbackFn();
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
      isLoading: false
    };
  }

  dictionary(fields, totalItems);
  generateStats();

  function toState() {
    const { count, isLoading, items } = query();

    const stats = fields
      .filter((field) => field.stat)
      .map((field) => ({
        label: field.label,
        stats: field.query().stats
      }));

    const filters = fields
      .filter((field) => !field.config.hidden)
      .map((field) => {
        const { id, label, value, type, options, order, setValue, setSort } = field.query();

        return {
          id,
          label,
          value,
          type,
          options,
          order,
          setValue,
          setSort
        };
      });

    return {
      totalCount,
      count,
      stats,
      filters,
      isLoading,
      items,
      schema
    };
  }

  return api;
}
