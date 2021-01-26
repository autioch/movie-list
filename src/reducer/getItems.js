import { EMPTY, TYPES, EQUAL, ITEM_1_LATER, ITEM_2_LATER } from '../consts';

const TEST_FN = {
  [TYPES.TEXT](value) {
    let testFn = (itemValues) => itemValues.some((itemValue) => itemValue.includes(value));

    try {
      const regex = new RegExp(value.replace(/ /g, '.?'), 'i');

      testFn = (itemValues) => itemValues.some((itemValue) => regex.test(itemValue));
    } catch (err) {}

    return testFn;
  },
  [TYPES.RANGE]({ fromValue, toValue }) {
    if (fromValue !== EMPTY && toValue !== EMPTY) {
      return (itemValues) => itemValues.some((itemValue) => itemValue >= fromValue && itemValue <= toValue);
    }
    if (fromValue !== EMPTY) {
      return (itemValues) => itemValues.some((itemValue) => itemValue >= fromValue);
    }
    if (toValue !== EMPTY) {
      return (itemValues) => itemValues.some((itemValue) => itemValue <= toValue);
    }

    return () => true;
  },
  [TYPES.DICTIONARY](value) {
    return (itemValues) => value.every((singleValue) => itemValues.includes(singleValue));
  },
  [TYPES.DATE]({ fromDate, toDate }) {
    if (fromDate !== EMPTY && toDate !== EMPTY) {
      return (itemValues) => itemValues.some((itemValue) => itemValue >= fromDate && itemValue <= toDate);
    }
    if (fromDate !== EMPTY) {
      return (itemValues) => itemValues.some((itemValue) => itemValue >= fromDate);
    }
    if (toDate !== EMPTY) {
      return (itemValues) => itemValues.some((itemValue) => itemValue <= toDate);
    }

    return () => true;
  }
};

function getTestFn(key, type, value) {
  const testFn = TEST_FN[type](value);

  testFn.key = key;

  return testFn;
}

function filterByTestFn(items, testFn) {
  return items.filter((item) => {
    const itemValue = item[testFn.key];

    return testFn(Array.isArray(itemValue) ? itemValue : [itemValue]);
  });
}

export default function getItems(allItems, schema, sortKeys, sortOrders, filterValues) { // eslint-disable-line max-params
  const filtered = schema.filters
    .filter((field) => filterValues[field.key] !== undefined)
    .map((field) => getTestFn(field.key, field.type, filterValues[field.key]))
    .reduce(filterByTestFn, allItems.slice(0));

  const sorted = filtered.sort((item1, item2) => {
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

  return sorted;
}
