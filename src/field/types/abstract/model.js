const BaseModel = require('base/model');
const { ORDER, ORDER_INVERSION, TYPES } = require('config');

module.exports = BaseModel.extend({
  defaults() {
    return {
      key: '',
      type: TYPES.TEXT,
      order: ORDER.NONE
    };
  },
  initialize() {
    this.label = this.key.replace(/\.?([A-Z]+)/g, (x, y) => ` ${y}`);
    this.label = this.label[0].toUpperCase() + this.label.slice(1);
    this.orderInverse = ORDER_INVERSION[this.order];
    this._sortTimestamp = 0;
    this._firstSort = false;
  },
  hasSort() {
    return this.order !== ORDER.NONE;
  },
  resetSort() {
    this.order = ORDER.NONE;
    this.orderInverse = ORDER.NONE;
  },
  makeSort() {
    if (this._firstSort && (this.order === ORDER.ASC)) {
      return this.resetSort();
    }
    this.invertSort();
  },
  invertSort() {
    this.order = ORDER_INVERSION[this.order];
    this.orderInverse = ORDER_INVERSION[this.order];
    this._sortTimestamp = performance.now();
  },
  hasValue() {
    return false;
  },
  resetValue() {},
  test() {
    return true;
  }
});
