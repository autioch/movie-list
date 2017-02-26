const baseModelFactory = require('../base/model');
const generateStats = require('./generateStats');

module.exports = function rangeModelFactory(attributes, appModel) {
  const { config, hasSort, makeSort, label } = baseModelFactory(attributes, appModel);
  let stats = [];

  let fromValue = -Infinity;
  let toValue = Infinity;

  function hasValue() {
    return fromValue !== -Infinity || toValue !== Infinity;
  }

  function resetValue() {
    fromValue = -Infinity;
    toValue = Infinity;
    appModel.syncItems();
  }

  function test(item) {
    const value = item[config.key];

    return value >= fromValue && value <= toValue;
  }

  function setFromValue(value) {
    if (value === null || value === '') {
      fromValue = -Infinity;
    } else {
      fromValue = value;
    }
    appModel.syncItems();
  }

  function setToValue(value) {
    if (value === null || value === '') {
      toValue = Infinity;
    } else {
      toValue = value;
    }
    appModel.syncItems();
  }

  function stat(items) {
    stats = generateStats(items.map((item) => item[config.key]));
  }

  function query() {
    return {
      label,
      order: config.order,
      fromValue: fromValue === -Infinity ? '' : fromValue,
      toValue: toValue === Infinity ? '' : toValue,
      stats
    };
  }

  return {
    setFromValue,
    setToValue,
    resetValue,
    hasSort,
    makeSort,
    hasValue,
    test,
    stat,
    query,
    label,
    config,
    type: config.type,
    key: config.key
  };
};
