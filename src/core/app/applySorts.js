module.exports = function applySorts(sorts, items) {
  let index;
  let field;
  let prop1;
  let prop2;

  if (!sorts.length) {
    return items;
  }

  return items.sort((item1, item2) => {
    for (index = 0; index < sorts.length; index++) {
      field = sorts[index];
      prop1 = item1[field.key];
      prop2 = item2[field.key];
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
