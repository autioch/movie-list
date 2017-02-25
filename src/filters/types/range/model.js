const baseModelFactory = require('../base/model');

module.exports = function rangeModelFactory(attributes, app) {
  const { config, hasSort, makeSort, label } = baseModelFactory(attributes, app);

  let fromValue = -Infinity;
  let toValue = Infinity;

  function hasValue() {
    return fromValue !== -Infinity || toValue !== Infinity;
  }

  function resetValue() {
    fromValue = -Infinity;
    toValue = Infinity;
    app.syncItems();
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
    app.syncItems();
  }

  function setToValue(value) {
    if (value === null || value === '') {
      toValue = Infinity;
    } else {
      toValue = value;
    }
    app.syncItems();
  }

  function query() {
    return {
      label,
      order: config.order,
      fromText: fromValue === -Infinity ? '' : fromValue,
      toText: toValue === Infinity ? '' : toValue
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
    query,
    label,
    type: config.type,
    key: config.key
  };
};
