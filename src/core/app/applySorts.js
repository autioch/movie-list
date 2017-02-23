module.exports = function applySorts(sorts, items) {
  if (!sorts.length) {
    return items;
  }

  return items.sort((item1, item2) => {
    for (let index = 0; index < sorts.length; index++) {
      const field = sorts[index];
      const prop1 = item1[field.key];
      const prop2 = item2[field.key];

      if (!prop1 && !prop2) {
        return 0;
      }
      if (!prop1) {
        return 1;
      }
      if (!prop2) {
        return -1;
      }
      if (prop1 < prop2) {
        return field.order;
      }
      if (prop1 > prop2) {
        return field.orderInverse;
      }
    }

    return 0;
  });
};
