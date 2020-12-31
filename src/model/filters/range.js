import baseModelFactory from './base';
import generateStats from './generateStats';

export default function rangeModelFactory(attributes) {
  const { config, label } = baseModelFactory(attributes);

  let fromValue = -Infinity;

  let toValue = Infinity;

  function hasValue() {
    return fromValue !== -Infinity || toValue !== Infinity;
  }

  function resetValue() {
    fromValue = -Infinity;
    toValue = Infinity;
  }

  function test(item) { // eslint-disable-line no-shadow
    const value = item[config.key];

    return value >= fromValue && value <= toValue;
  }

  function toStats(items) {
    return {
      label,
      stats: generateStats(items.map((item) => item[config.key]))
    };
  }

  function toState() {
    const isApplied = fromValue.length > 0 || toValue.length > 0;

    return {
      id: config.id,
      type: config.type,
      label,
      order: config.order,
      isApplied: fromValue.length > 0 || toValue.length > 0,
      value: isApplied ? {
        fromValue: fromValue === -Infinity ? '' : fromValue,
        toValue: toValue === Infinity ? '' : toValue
      } : undefined
    };
  }

  function setValue(filterValue) {
    if (filterValue.toValue === null || filterValue.toValue === '') {
      toValue = -Infinity;
    } else {
      toValue = filterValue.toValue; // eslint-disable-line prefer-destructuring
    }
    if (filterValue.fromValue === null || filterValue.fromValue === '') {
      fromValue = -Infinity;
    } else {
      fromValue = filterValue.fromValue; // eslint-disable-line prefer-destructuring
    }
  }

  return {
    setValue,
    resetValue,
    config,
    toState,
    toStats,
    hasValue,
    test,
    key: config.key
  };
}
