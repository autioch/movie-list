function updateDict(dict, item) {
  if (dict.hasOwnProperty(item)) {
    dict[item]++;
  } else {
    dict[item] = 1;
  }
}

module.exports = function statDictionary(values) {
  const dict = {};

  values.sort().forEach((value) => updateDict(dict, value));

  return [{
    key: 'Variety',
    value: Object.keys(dict).length
  }];
};
