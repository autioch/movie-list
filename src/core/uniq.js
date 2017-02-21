module.exports = function uniq(array) {
  const seen = {
    'undefined': 1,
    'null': 1,
    'N/A': 1
  };
  const items = [];
  const j = 0;

  for (let i = 0; i < array.length; i++) {
    const item = array[i];

    if (seen[item] !== 1) {
      seen[item] = 1;
      // items[j++] = item;
      items.push(item);
    }
  }

  return items;
};
