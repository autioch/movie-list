const { TYPES } = require('core/field/dicts');

function uniqArray(array) {
  const seen = {
    'undefined': 1,
    'N/A': 1
  };
  const items = [];
  let j = 0;

  for (let i = 0; i < array.length; i++) {
    const item = array[i];

    if (seen[item] !== 1) {
      seen[item] = 1;
      items[j++] = item;
    }
  }

  return items;
}

module.exports = function dictionary(fields, items) {
  const dict = fields
    .filter((field) => field.type === TYPES.DICTIONARY)
    .map((field) => ({
      key: field.key,
      values: [],
      field
    }));

  /* There's a lot more items than fields. */

  items.forEach((item) => {
    dict.forEach((key) => {
      key.values = key.values.concat(item[key.key]);
    });
  });

  dict.forEach((key) => {
    key.field.setOptions(uniqArray(key.values).sort());
    key.field = null;
    key.key = null;
    key.values = null;
  });
};
