const AbstractModel = require('../abstract/model');
const stat = require('./stat');

module.exports = AbstractModel.extend({
  defaults() {
    return {
      selected: [],
      options: []
    };
  },
  setOptions(options) {
    this.options = options;
    this.selected = [];
  },
  hasValue() {
    return this.selected.length > 0;
  },
  resetValue() {
    this.selected = [];
    this.app.syncItems();
  },
  test(item) {
    const value = item[this.key];

    if (typeof value === 'string') {
      return this.selected.indexOf(value) > -1;
    }
    if (Array.isArray(value)) {
      return this.selected.find((sel) => value.indexOf(sel) > -1);
    }
  },
  selectValue(value) {
    if (value === '') {
      return this.resetValue();
    }
    this.selected = [value];
    this.app.syncItems();
  },
  getStats(items) {
    return stat(items.map((item) => item[this.key]));
  }
});
