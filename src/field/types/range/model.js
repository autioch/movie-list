const AbstractModel = require('../abstract/model');

module.exports = AbstractModel.extend({
  defaults() {
    return {
      fromValue: -Infinity,
      toValue: Infinity
    };
  },
  hasValue() {
    return this.fromValue !== -Infinity || this.toValue !== Infinity;
  },
  resetValue() {
    this.fromValue = -Infinity;
    this.toValue = Infinity;
  },
  test(item) {
    const value = item[this.key];

    return value >= this.fromValue && value <= this.toValue;
  },
  setFromValue(value) {
    if (value === null || value === '') {
      this.fromValue = -Infinity;
    } else {
      this.fromValue = value;
    }
  },
  setToValue(value) {
    if (value === null || value === '') {
      this.toValue = Infinity;
    } else {
      this.toValue = value;
    }
  },
  getFromText() {
    return this.fromValue === -Infinity ? '' : this.fromValue;
  },
  getToText() {
    return this.toValue === Infinity ? '' : this.toValue;
  }
});
