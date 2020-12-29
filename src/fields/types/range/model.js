import baseModelFactory from '../base/model';
import generateStats from './generateStats';

export default function rangeModelFactory(attributes, appModel) {
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

  function test(item) { // eslint-disable-line no-shadow
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

  function getStats(items) {
    stats = generateStats(items.map((item) => item[config.key]));
  }

  function query() {
    return {
      id: config.key,
      label,
      value: {
        fromValue: fromValue === -Infinity ? '' : fromValue,
        toValue: toValue === Infinity ? '' : toValue
      },
      order: config.order,
      fromValue: fromValue === -Infinity ? '' : fromValue,
      toValue: toValue === Infinity ? '' : toValue,
      stats,
      setValue(id, {
        fromValue, // eslint-disable-line no-shadow
        toValue // eslint-disable-line no-shadow
      }) {
        setToValue(toValue);
        setFromValue(fromValue);
      }
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
    getStats,
    stat: config.stat,
    query,
    label,
    config,
    type: config.type,
    key: config.key
  };
}
