const { ORDER, ORDER_INVERSION, TYPE, SIZE } = require('../config');

function Field(definition) {
  const { key, size = SIZE, type = TYPE.STRING, value = '', order = ORDER.NONE } = definition;

  this.key = key;
  this.label = key.replace(/\.?([A-Z]+)/g, (x, y) => ` ${y}`);
  this.label = this.label[0].toUpperCase() + this.label.slice(1);
  this.type = type;
  this.size = size;
  this.order = order;
  this.orderInverse = ORDER_INVERSION[this.order];
  this._sortTimestamp = 0;
  this._firstSort = false;
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
    return this.regex.test(item[this.key]);
  }
};

module.exports = Field;
