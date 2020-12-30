import baseModelFactory from './base';

export default function textModelFactory(attributes, appModel) {
  const { config, hasSort, makeSort, label } = baseModelFactory(attributes, appModel);

  let selected = [];

  let options = [];

  function hasValue() {
    return selected.length > 0;
  }

  function resetValue() {
    selected = [];
    appModel.syncItems();
  }

  function test(item) { // eslint-disable-line no-shadow
    const value = item[config.key];

    if (typeof value === 'string') {
      return selected.indexOf(value) > -1;
    }
    if (Array.isArray(value)) {
      return selected.find((sel) => value.indexOf(sel) > -1);
    }

    return false;
  }

  function selectValue(value) {
    if (value === '') {
      resetValue();
    } else {
      selected = [value];
      appModel.syncItems();
    }
  }

  function query() {
    return {
      ...config,
      label,
      value: selected[0] || '',
      selected,
      options,
      hasValue: (selected[0] || '').length > 0
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
}
