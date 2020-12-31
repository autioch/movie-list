import baseModelFactory from './base';

const IGNORED = {
  undefined: true,
  'null': true,
  'N/A': true
};

export default function textModelFactory(attributes) {
  const { config, label } = baseModelFactory(attributes);

  let value;

  function hasValue() {
    return value !== undefined;
  }

  function resetValue() {
    value = undefined;
  }

  function test(item) { // eslint-disable-line no-shadow
    const itemValue = item[config.key];

    if (Array.isArray(itemValue)) {
      return itemValue.includes(value);
    }

    return itemValue === value;
  }

  function toState(items) {
    return {
      id: config.id,
      type: config.type,
      label,
      order: config.order,
      options: [...new Set(items.flatMap((item) => item[config.key]))].filter((val) => !IGNORED[val]).sort(),
      isApplied: value !== undefined,
      value
    };
  }

  function setValue(newValue) {
    value = newValue || undefined;
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
