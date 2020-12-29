const DICT_TYPE = 3;

function uniq(array) {
  const seen = {
    undefined: true,
    'null': true,
    'N/A': true
  };
  const items = [];

  for (let index = 0; index < array.length; index++) {
    const item = array[index];

    if (!seen[item]) {
      seen[item] = true;
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
    key.field = key.key = key.values = null; // eslint-disable-line no-multi-assign
  });
};
