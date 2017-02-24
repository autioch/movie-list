const DICT_TYPE = 3;

function uniq(array) {
  const seen = {
    'undefined': 1,
    'null': 1,
    'N/A': 1
  };
  const items = [];

  for (let i = 0; i < array.length; i++) {
    const item = array[i];

    if (seen[item] !== 1) {
      seen[item] = 1;
      items.push(item);
    }
  }

  return items;
}

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
