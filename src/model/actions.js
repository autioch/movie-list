import rangeStats from './rangeStats';
import { EMPTY, TYPES, IGNORED } from './consts';

export const HAS_VALUE = {
  [TYPES.TEXT]: ({ value }) => value !== EMPTY,
  [TYPES.RANGE]: ({ fromValue, toValue }) => fromValue !== EMPTY || toValue !== EMPTY,
  [TYPES.DICTIONARY]: ({ value }) => value !== EMPTY,
  [TYPES.DATE]: ({ fromDate, toDate }) => fromDate !== EMPTY || toDate !== EMPTY
};

export const RESET_VALUE = {
  [TYPES.TEXT]: (state) => ({
    ...state,
    value: EMPTY
  }),
  [TYPES.RANGE]: (state) => ({
    ...state,
    fromValue: EMPTY,
    toValue: EMPTY
  }),
  [TYPES.DICTIONARY]: (state) => ({
    ...state,
    value: EMPTY
  }),
  [TYPES.DATE]: (state) => ({
    ...state,
    fromDate: EMPTY,
    toDate: EMPTY
  })
};

export const PREPARE_TEST = {
  [TYPES.TEXT]({ value, key }) {
    let testFn = (item) => item[key].includes(value);

    try {
      const regex = new RegExp(value.replace(/ /g, '.?'), 'i');

      testFn = (item) => regex.test(item[key]);
    } catch (err) {}

    return testFn;
  },
  [TYPES.RANGE]({ fromValue, toValue, key }) {
    if (fromValue !== EMPTY && toValue !== EMPTY) {
      return (item) => item[key] >= fromValue && item[key] <= toValue;
    }
    if (fromValue !== EMPTY) {
      return (item) => item[key] >= fromValue;
    }
    if (toValue !== EMPTY) {
      return (item) => item[key] <= toValue;
    }

    return () => true;
  },
  [TYPES.DICTIONARY]: ({ value, key }) => (item) => Array.isArray(item[key]) ? item[key].includes(value) : item[key] === value, // eslint-disable-line no-confusing-arrow, max-len
  [TYPES.DATE]({ fromDate, toDate, key }) {
    if (fromDate !== EMPTY && toDate !== EMPTY) {
      return (item) => item[key] >= fromDate && item[key] <= toDate;
    }
    if (fromDate !== EMPTY) {
      return (item) => item[key] >= fromDate;
    }
    if (toDate !== EMPTY) {
      return (item) => item[key] <= toDate;
    }

    return () => true;
  }
};

export const SET_VALUE = {
  [TYPES.TEXT]: (state, newValue) => ({
    ...state,
    value: newValue || EMPTY
  }),
  [TYPES.RANGE](state, newValue = {}) {
    let toValue = newValue.toValue;// eslint-disable-line prefer-destructuring

    if (newValue.toValue === null || newValue.toValue === '' || newValue.toValue === EMPTY) {
      toValue = EMPTY;
    }
    let fromValue = newValue.fromValue; // eslint-disable-line prefer-destructuring

    if (newValue.fromValue === null || newValue.fromValue === '' || newValue.fromValue === EMPTY) {
      fromValue = EMPTY;
    }

    return {
      ...state,
      fromValue,
      toValue
    };
  },
  [TYPES.DICTIONARY]: (state, newValue) => ({
    ...state,
    value: newValue || EMPTY
  }),
  [TYPES.DATE](state, newValue = {}) {
    let toDate = new Date(newValue.toValue);

    if (isNaN(toDate.getTime())) {
      toDate = EMPTY;
    } else {
      toDate = toDate.toISOString();
    }
    let fromDate = new Date(newValue.fromValue);

    if (isNaN(fromDate.getTime())) {
      fromDate = EMPTY;
    } else {
      fromDate = fromDate.toISOString();
    }

    return {
      ...state,
      fromDate,
      toDate
    };
  }
};

export const STATS = {
  [TYPES.TEXT]: () => EMPTY,
  [TYPES.RANGE]: ({ key, label }, items) => ({
    label,
    stats: rangeStats(items.map((item) => item[key]))
  }),
  [TYPES.DICTIONARY]: () => EMPTY,
  [TYPES.DATE]: () => EMPTY
};

export const EXTRAS = {
  [TYPES.TEXT]: (state) => state,
  [TYPES.RANGE]: (state) => state,
  [TYPES.DICTIONARY]: (state, items) => ({
    ...state,
    options: [...new Set(items.flatMap((item) => item[state.key]))].filter((val) => !IGNORED[val]).sort()
  }),
  [TYPES.DATE]: (state) => state
};
