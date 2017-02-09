const AbstractModel = require('../abstract/model');
const stat = require('./stat');

module.exports = AbstractModel.extend({
  initialize() {
    AbstractModel.prototype.initialize.apply(this, arguments);
    this.callbacks = [];
  },
  defaults() {
    return {
      selected: [],
      options: []
    };
  },
  setOptions(options) {
    this.options = options;
    this.selected = [];
    this.callbacks.forEach((callback) => callback());
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
    this.selected = [value];
    this.app.syncItems();
  },

  /* Registers callback for when list of options changes. */
  addCallback(callback) {
    this.callbacks.push(callback);
  },
  getStats(items) {
    return stat(items.map((item) => item[this.key]));
  }
});
