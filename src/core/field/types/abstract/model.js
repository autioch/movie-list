const BaseModel = require('core/base/model');
const { TYPES } = require('core/field/dicts');

const ORDER = {
  NONE: 0,
  DESC: 1,
  ASC: -1
};

const ORDER_INVERSION = {
  [ORDER.NONE]: ORDER.DESC,
  [ORDER.DESC]: ORDER.ASC,
  [ORDER.ASC]: ORDER.DESC
};

module.exports = BaseModel.extend({
  defaults() {
    return {
      key: '',
      type: TYPES.TEXT,
      order: ORDER.NONE
    };
  },
  initialize(attributes, app) {
    this.app = app;
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
    this.app.syncItems();
  },
  invertSort() {
    this.order = ORDER_INVERSION[this.order];
    this.orderInverse = ORDER_INVERSION[this.order];
    this._sortTimestamp = performance.now();
  },
  hasValue() {
    return false;
  },
  resetValue() {
    this.app.syncItems();
  },
  test() {
    return true;
  },
  getStats() {
    return [];
  }
});
