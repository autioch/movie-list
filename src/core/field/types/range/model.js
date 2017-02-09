const AbstractModel = require('../abstract/model');
const stat = require('./stat');

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
    this.app.syncItems();
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
    this.app.syncItems();
  },
  setToValue(value) {
    if (value === null || value === '') {
      this.toValue = Infinity;
    } else {
      this.toValue = value;
    }
    this.app.syncItems();
  },
  getFromText() {
    return this.fromValue === -Infinity ? '' : this.fromValue;
  },
  getToText() {
    return this.toValue === Infinity ? '' : this.toValue;
  },
  getStats(items) {
    return stat(items.map((item) => item[this.key]));
  }
});