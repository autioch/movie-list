const { ORDER, ORDER_INVERSION } = require('./config');

function Field(key, value = '', order = ORDER.NONE) {
  this.key = key;
  this.order = order;
  this.orderInverse = ORDER_INVERSION[this.order];
  this.sortTimestamp = 0;
  this.firstSort = false;
  this.setValue(value);
}

Field.prototype = {
  constructor: Field,
  hasSort() {
    return this.order !== ORDER.NONE;
  },
  resetSort() {
    this.order = ORDER.NONE;
    this.orderInverse = ORDER.NONE;
  },
  makeSort() {
    if (this.firstSort && (this.order === ORDER.ASC)) {
      return this.resetSort();
    }
    this.invertSort();
  },
  invertSort() {
    this.order = ORDER_INVERSION[this.order];
    this.orderInverse = ORDER_INVERSION[this.order];
    this.sortTimestamp = performance.now();
  },
  hasValue() {
    return this.value.length > 0;
  },
  resetValue() {
    this.value = '';
    this.regex = new RegExp('', 'i');
  },
  setValue(value) {
    this.value = value;
    this.regex = new RegExp(value.split('').join('.?'), 'i');
  },
  test(item) {
    return this.value.test(item[this.key]);
  }
};

module.exports = Field;
