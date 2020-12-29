import baseModelFactory from '../base/model';
const EMPTY = undefined;

export default function dateModelFactory(attributes, appModel) {
  const { config, hasSort, makeSort, label } = baseModelFactory(attributes, appModel);

  let fromDate = EMPTY;

  let toDate = EMPTY;

  let testFunction = () => true;

  function hasValue() {
    return fromDate !== EMPTY || toDate !== EMPTY;
  }

  function resetValue() {
    fromDate = EMPTY;
    toDate = EMPTY;
    appModel.syncItems();
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

  function setFromValue(value) {
    fromDate = new Date(value);
    if (isNaN(fromDate.getTime())) {
      fromDate = EMPTY;
    } else {
      fromDate = fromDate.toISOString();
    }
    setTestFunction();
    appModel.syncItems();
  }

  function setToValue(value) {
    toDate = new Date(value);
    if (isNaN(toDate.getTime())) {
      toDate = EMPTY;
    } else {
      toDate = fromDate.toISOString();
    }
    setTestFunction();
    appModel.syncItems();
  }

  function query() {
    return {
      id: config.key,
      label,
      order: config.order,
      value: {
        fromDate: fromDate === EMPTY ? '' : fromDate,
        toDate: toDate === EMPTY ? '' : toDate
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
    stat: config.stat,
    query,
    label,
    config,
    type: config.type,
    key: config.key
  };
}
