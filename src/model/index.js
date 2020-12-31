import sortsModelFactory from './sorts';
import fieldModelFactory from './filters';

export default function appModelFactory(schema, totalItems) {
  const totalCount = totalItems.length;
  const sorts = sortsModelFactory();

  const fields = schema.fields.map(fieldModelFactory);

  function toState() {
    const items = totalItems.slice(0);
    const filtered = fields
      .filter((field) => field.hasValue())
      .reduce((filteredItems, field) => filteredItems.filter((item) => field.test(item)), items);

    const currentItems = sorts.applySorts(filtered);
    const stats = fields
      .filter((field) => field.toStats)
      .map((field) => field.toStats(currentItems));

    const filters = fields
      .filter((field) => !field.config.hidden)
      .map((field) => field.toState(currentItems));

    return {
      totalCount,
      count: currentItems.length,
      stats,
      filters,
      isLoading: false,
      items: currentItems,
      schema
    };
  }

  function setSort(filterId) {
    const field = fields.find((fiel) => fiel.key === filterId);

    field.config.order = sorts.setSort(filterId);
  }

  function resetFilter(filterId) {
    const field = fields.find((fiel) => fiel.key === filterId);

    field.resetValue();
  }

  function setFilterValue(filterId, filterValue) {
    const field = fields.find((fiel) => fiel.key === filterId);

    field.setValue(filterValue);
  }

  return {
    toState,
    setSort,
    resetFilter,
    setFilterValue
  };
}
