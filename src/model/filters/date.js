import baseModelFactory from './base';
const EMPTY = undefined;

export default function dateModelFactory(attributes) {
  const { config, label } = baseModelFactory(attributes);

  let fromDate = EMPTY;

  let toDate = EMPTY;

  let testFunction = () => true;

  function hasValue() {
    return fromDate !== EMPTY || toDate !== EMPTY;
  }

  function resetValue() {
    fromDate = EMPTY;
    toDate = EMPTY;
  }

  function testFromDate(value) {
    return value >= fromDate;
  }

  function testToDate(value) {
    return value <= toDate;
  }

  function testFromAndTo(value) {
    return value >= fromDate && value <= toDate;
  }

  function test(item) { // eslint-disable-line no-shadow
    return testFunction(item[config.key]);
  }

  function setTestFunction() {
    if (fromDate !== EMPTY && toDate !== EMPTY) {
      testFunction = testFromAndTo;
    } else if (fromDate !== EMPTY) {
      testFunction = testFromDate;
    } else if (toDate !== EMPTY) { // eslint-disable-line no-negated-condition
      testFunction = testToDate;
    } else {
      testFunction = () => true;
    }
  }

  function toState() {
    const isApplied = fromDate !== EMPTY || toDate !== EMPTY;

    return {
      id: config.id,
      type: config.type,
      label,
      order: config.order,
      isApplied,
      value: isApplied ? {
        fromDate: fromDate === EMPTY ? '' : fromDate,
        toDate: toDate === EMPTY ? '' : toDate
      } : undefined
    };
  }

  function setValue(filterValue) {
    toDate = new Date(filterValue.toValue);
    if (isNaN(toDate.getTime())) {
      toDate = EMPTY;
    } else {
      toDate = fromDate.toISOString();
    }
    fromDate = new Date(filterValue.fromValue);
    if (isNaN(fromDate.getTime())) {
      fromDate = EMPTY;
    } else {
      fromDate = fromDate.toISOString();
    }
    setTestFunction();
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
