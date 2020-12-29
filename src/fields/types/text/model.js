const baseModelFactory = require('../base/model');

module.exports = function textModelFactory(attributes, appModel) {
  const { config, hasSort, makeSort, label } = baseModelFactory(attributes, appModel);

  let value = attributes.value || '';

  let regex = new RegExp('', 'i');

  let testFunction = testRegex;

  function hasValue() {
    return value.length > 0;
  }

  function resetValue() {
    value = '';
    appModel.syncItems();
  }

  function testRegex(text) {
    return regex.test(text);
  }

  function testString(text) {
    return text.indexOf(value) > -1;
  }

  function test(item) { // eslint-disable-line no-shadow
    return testFunction(item[config.key]);
  }

  function setValue(newValue) {
    value = newValue;
    try {
      regex = new RegExp(value.replace(/ /g, '.?'), 'i');
      testFunction = testRegex;
    } catch (err) {
      testFunction = testString;
    }
    appModel.syncItems();
  }

  function query() {
    return {
      id: config.key,
      label,
      value,
      order: config.order,
      setValue,
      setSort: makeSort
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
