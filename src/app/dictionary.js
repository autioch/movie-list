const DICT_TYPE = 3;

const uniq = require('utils/uniq')({
  'undefined': true,
  'null': true,
  'N/A': true
});

module.exports = function dictionary(fields, items) {
  const dict = fields
    .filter((field) => field.type === DICT_TYPE)
    .map((field) => ({
      key: field.key,
      values: [],
      field
    }));

  items.forEach((item) => {
    dict.forEach((key) => {
      key.values = key.values.concat(item[key.key]);
    });
  });

  dict.forEach((key) => {
    key.field.setOptions(uniq(key.values).sort());
    key.field = key.key = key.values = null;
  });
};
