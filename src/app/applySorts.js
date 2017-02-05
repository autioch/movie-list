function getSortableFields(fields) {
  fields.forEach((field) => {
    field._firstSort = false;
  });

  const sortableFields = fields
    .filter((availableField) => availableField.hasSort())
    .sort((field1, field2) => field2._sortTimestamp - field1._sortTimestamp);

  if (sortableFields.length > 0) {
    sortableFields[0]._firstSort = true;
  }

  return sortableFields;
}

module.exports = function sortItems(availableFields, items) {
  let index;
  let prop;
  let field;
  const fields = getSortableFields(availableFields);

  if (!fields.length) {
    return items;
  }

  return items.sort((item1, item2) => {
    for (index = 0; index < fields.length; index++) {
      field = fields[index];
      prop = field.key;
      if (!item1[prop] && !item2[prop]) {
        return 0;
      }
      if (!item1[prop]) {
        return 1;
      }
      if (!item2[prop]) {
        return -1;
      }
      if (item1[prop] < item2[prop]) {
        return field.order;
      }
      if (item1[prop] > item2[prop]) {
        return field.orderInverse;
      }
    }

    return 0;
  });
};
