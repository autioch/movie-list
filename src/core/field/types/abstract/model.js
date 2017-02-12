const BaseModel = require('core/base/model');

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
      type: 1,
      order: ORDER.NONE
    };
  },
  initialize(attributes, app) {
    this.app = app;
    this.label = this.key.replace(/\.?([A-Z]+)/g, (x, y) => ` ${y}`);
    this.label = this.label[0].toUpperCase() + this.label.slice(1);
  },
  hasSort() {
    return this.order !== ORDER.NONE;
  },
  makeSort() {
    if (this.order === ORDER.ASC) {
      return this.resetSort();
    }
    this.invertSort();
  },
  resetSort() {
    this.order = ORDER.NONE;
    this.app.removeSort(this.key);
  },
  invertSort() {
    this.order = ORDER_INVERSION[this.order];
    this.app.addSort({
      key: this.key,
      order: this.order,
      orderInverse: ORDER_INVERSION[this.order],
      label: this.label
    });
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
