/**
 * Decides order of string fields containing floats.
 * @param  {String} value1 [description]
 * @param  {String} value2 [description]
 * @return {Number}   Order of the strings.
 */

function sortFloat(value1, value2) {
  const floatA = parseFloat(value1);
  const floatB = parseFloat(value2);

  if (floatA > floatB) {
    return 1;
  }

  return floatB > floatA ? -1 : 0;
}

function updateDict(dict, item) {
  if (dict.hasOwnProperty(item)) {
    dict[item]++;
  } else {
    dict[item] = 1;
  }
}

const ROUND_AMOUNT = 1000;
const ROUND_VALUE = 1000000;

module.exports = function statRange(values) {
  const dict = {};
  let dividend = 0;
  let divider = 0;
  let keysSum = 0;
  let min = values[0];
  let max = 0;
  let sum = 0;

  values.sort(sortFloat).forEach((value) => {
    const num = parseFloat(value, 10);

    if (!isNaN(num) && num !== null) {
      if (min > num) {
        min = num;
      }
      if (max < num) {
        max = num;
      }
      sum += num;
    }
    updateDict(dict, (value === null || value === undefined) ? 'null' : value.toString());
  });

  const keys = Object.keys(dict);

  keys.forEach((key) => {
    const parsed = parseFloat(key, 10);

    if (!isNaN(parsed)) {
      keysSum += parsed;
      dividend += parsed * dict[key];
    }
    divider += dict[key];
  });

  const items = [{
    key: 'Average',
    value: Math.round(keysSum / keys.length)
  }, {
    key: 'Sum',
    value: sum
  }, {
    key: 'Weighted',
    value: divider ? Math.round(dividend / divider) : 'N/A'
  }, {
    key: 'Max',
    value: max
  }, {
    key: 'Variety',
    value: keys.length
  }, {
    key: 'Min',
    value: min
  }];

  items.forEach((item) => {
    if (item.value > ROUND_VALUE) {
      item.value = Math.ceil(item.value / ROUND_AMOUNT);
      item.rounded = true;
    }
  });

  return items;
};
