const EQUAL = 0;
const ITEM_1_LATER = 1;
const ITEM_2_LATER = -1;

module.exports = function sortsModelFactory() {
  let sorts = [];

  function addSort(newSort) {
    const existing = sorts.find((sort) => sort.key === newSort.key);

    if (existing) {
      existing.order = newSort.order;
      existing.orderInverse = newSort.orderInverse;
    } else {
      sorts.push(newSort);
    }
  }

  function removeSort(key) {
    sorts = sorts.filter((sort) => sort.key !== key);
  }

  function applySorts(items) {
    if (!sorts.length) {
      return items;
    }

    return items.sort((item1, item2) => {
      for (let index = 0; index < sorts.length; index++) {
        const field = sorts[index];
        const prop1 = item1[field.key];
        const prop2 = item2[field.key];

        if (!prop1 && !prop2) {
          return EQUAL;
        }
        if (!prop1) {
          return ITEM_1_LATER;
        }
        if (!prop2) {
          return ITEM_2_LATER;
        }
        if (prop1 < prop2) {
          return field.order;
        }
        if (prop1 > prop2) {
          return field.orderInverse;
        }
      }

      return EQUAL;
    });
  }

  return {
    addSort,
    removeSort,
    applySorts
  };
};
