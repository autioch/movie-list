const baseModelFactory = require('../base/model');

module.exports = function textModelFactory(attributes, appModel) {
  const { config, hasSort, makeSort, label } = baseModelFactory(attributes, appModel);

  let value = attributes.value || '';
  let regex = new RegExp('', 'i');

  function hasValue() {
    return value.length > 0;
  }

  function resetValue() {
    value = '';
    regex = new RegExp('', 'i');
    appModel.syncItems();
  }

  function test(item) {
    return regex.test(item[config.key]);
  }

  function setValue(newValue) {
    value = newValue;
    regex = new RegExp(value.split('').join('.?'), 'i');
    appModel.syncItems();
  }

  function query() {
    return {
      label,
      order: config.order,
      value
    };
  }

  return {
    setValue,
    resetValue,
    hasSort,
    makeSort,
    hasValue,
    test,
    query,
    label,
    config,
    type: config.type,
    key: config.key
  };
};
