import { EMPTY, TYPES, EQUAL, ITEM_1_LATER, ITEM_2_LATER } from './consts';

const TEST_FN = {
  [TYPES.TEXT](value) {
    let testFn = (itemValue) => itemValue.includes(value);

    try {
      const regex = new RegExp(value.replace(/ /g, '.?'), 'i');

      testFn = (itemValue) => regex.test(itemValue);
    } catch (err) {}

    return testFn;
  },
  [TYPES.RANGE]({ fromValue, toValue }) {
    if (fromValue !== EMPTY && toValue !== EMPTY) {
      return (itemValue) => itemValue >= fromValue && itemValue <= toValue;
    }
    if (fromValue !== EMPTY) {
      return (itemValue) => itemValue >= fromValue;
    }
    if (toValue !== EMPTY) {
      return (itemValue) => itemValue <= toValue;
    }

    return () => true;
  },
  [TYPES.DICTIONARY]: (value) => (itemValue) => itemValue === value,
  [TYPES.DATE]({ fromDate, toDate }) {
    if (fromDate !== EMPTY && toDate !== EMPTY) {
      return (itemValue) => itemValue >= fromDate && itemValue <= toDate;
    }
    if (fromDate !== EMPTY) {
      return (itemValue) => itemValue >= fromDate;
    }
    if (toDate !== EMPTY) {
      return (itemValue) => itemValue <= toDate;
    }

    return () => true;
  }
};

function getTestFn(id, type, value) {
  const testFn = TEST_FN[type](value);

  testFn.filterId = id;

  return testFn;
}

function filterByTestFn(items, testFn) {
  return items.filter((item) => {
    const itemValue = item[testFn.filterId];

    return Array.isArray(itemValue) ? itemValue.some(testFn) : testFn(itemValue);
  });
}

export default function getItems(allItems, filters, sortKeys, sortOrders, filterValues) { // eslint-disable-line max-params
  return filters
    .filter((field) => filterValues[field.id] !== undefined)
    .map((field) => getTestFn(field.id, field.type, filterValues[field.id]))
    .reduce(filterByTestFn, allItems.slice(0))
    .sort((item1, item2) => {
      for (let index = 0; index < sortKeys.length; index++) {
        const sortKey = sortKeys[index];
        const prop1 = item1[sortKey];
        const prop2 = item2[sortKey];

        if (!prop1 && !prop2) {
          return EQUAL;
        }
        if (!prop1) {
          return ITEM_1_LATER;
        }
        if (!prop2) {
          return ITEM_2_LATER;
        }

        return sortOrders[sortKey] * (prop1 < prop2 ? 1 : -1);
      }

      return EQUAL;
    });
}
