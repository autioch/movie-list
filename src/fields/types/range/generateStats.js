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
    dict[item]++; // eslint-disable-line no-plusplus
  } else {
    dict[item] = 1;
  }
}

const ROUND_AMOUNT = 1000;
const ROUND_VALUE = 1000000;

export default function generateStats(values) {
  const dict = {};

  let dividend = 0;

  let divider = 0;

  let keysSum = 0;

  let [min] = values;

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
    updateDict(dict, value === null || value === undefined ? 'null' : value.toString());
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

  const count = keys.length;

  const items = [{
    key: 'Average',
    value: count ? Math.round(keysSum / count) : 'N/A'
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
    value: count
  }, {
    key: 'Min',
    value: min || 0
  }];

  items.forEach((item) => {
    if (item.value > ROUND_VALUE) {
      item.value = Math.ceil(item.value / ROUND_AMOUNT);
      item.rounded = true;
    }
  });

  return items;
};
