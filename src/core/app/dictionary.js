const uniq = require('../uniq');
const DICT_TYPE = 3;

module.exports = function dictionary(fields, items) {
  const dict = fields
    .filter((field) => field.type === DICT_TYPE)
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
    key.field.setOptions(uniq(key.values).sort());
    key.field = null;
    key.key = null;
    key.values = null;
  });
};
