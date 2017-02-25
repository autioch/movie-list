module.exports = function uniqFactory(seen = {}) {
  return function uniq(array) {
    const items = [];

    for (let i = 0; i < array.length; i++) {
      const item = array[i];

      if (!seen[item]) {
        seen[item] = true;
        items.push(item);
      }
    }

    return items;
  };
};
