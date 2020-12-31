const EQUAL = 0;
const ITEM_1_LATER = 1;
const ITEM_2_LATER = -1;

const ORDER = {
  NONE: 0,
  DESC: 1,
  ASC: -1
};

const ORDER_INVERSION = {
  [ORDER.NONE]: ORDER.DESC,
  [ORDER.DESC]: ORDER.ASC,
  [ORDER.ASC]: ORDER.DESC
};

export default function sortsModelFactory() {
  let sorts = [];

  function setSort(key) {
    const existing = sorts.find((sort) => sort.key === key);

    if (!existing) {
      sorts.push({
        key,
        order: ORDER.DESC,
        orderInverse: ORDER_INVERSION[ORDER.DESC]
      });

      return ORDER.DESC;
    }

    if (existing.order === ORDER.DESC) {
      existing.order = ORDER.ASC;
      existing.orderInverse = ORDER_INVERSION[ORDER.ASC];

      return ORDER.ASC;
    }

    if (existing.order === ORDER.ASC) {
      sorts = sorts.filter((sort) => sort.key !== key);

      return ORDER.NONE;
    }

    throw Error(`Unexpected sort state for ${key}`);
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
    setSort,
    applySorts
  };
}
