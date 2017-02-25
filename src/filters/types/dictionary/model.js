const baseModelFactory = require('../base/model');

module.exports = function textModelFactory(attributes, app) {
  const { config, hasSort, makeSort, label } = baseModelFactory(attributes, app);

  let selected = [];
  let options = [];

  function hasValue() {
    return selected.length > 0;
  }

  function resetValue() {
    selected = [];
    app.syncItems();
  }

  function test(item) {
    const value = item[config.key];

    if (typeof value === 'string') {
      return selected.indexOf(value) > -1;
    }
    if (Array.isArray(value)) {
      return selected.find((sel) => value.indexOf(sel) > -1);
    }
  }

  function selectValue(value) {
    if (value === '') {
      return resetValue();
    }
    selected = [value];
    app.syncItems();
  }

  function query() {
    return {
      label,
      order: config.order,
      selected,
      options
    };
  }

  function setOptions(newOptions) {
    options = newOptions;
    selected = [];
  }

  return {
    selectValue,
    resetValue,
    hasSort,
    makeSort,
    hasValue,
    setOptions,
    test,
    query,
    label,
    config,
    type: config.type,
    key: config.key
  };
};
