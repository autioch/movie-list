import baseModelFactory from './base';

export default function textModelFactory(attributes) {
  const { config, label } = baseModelFactory(attributes);

  let value;

  let regex = new RegExp('', 'i');

  let testFunction = testRegex;

  function hasValue() {
    return value !== undefined && value.length > 0;
  }

  function resetValue() {
    setValue(undefined);
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
    value = newValue || undefined;
    try {
      regex = new RegExp(value.replace(/ /g, '.?'), 'i');
      testFunction = testRegex;
    } catch (err) {
      testFunction = testString;
    }
  }

  function toState() {
    return {
      id: config.id,
      type: config.type,
      label,
      order: config.order,
      isApplied: value !== undefined,
      value
    };
  }

  return {
    setValue,
    resetValue,
    config,
    toState,
    hasValue,
    test,
    key: config.key
  };
}
