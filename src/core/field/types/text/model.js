const AbstractModel = require('../abstract/model');

module.exports = AbstractModel.extend({
  defaults() {
    return { value: '' };
  },
  initialize() {
    AbstractModel.prototype.initialize.apply(this, arguments);
    this.regex = new RegExp('', 'i');
  },
  hasValue() {
    return this.value.length > 0;
  },
  resetValue() {
    this.value = '';
    this.regex = new RegExp('', 'i');
    this.app.syncItems();
  },
  test(item) {
    return this.regex.test(item[this.key]);
  },
  setValue(value) {
    this.value = value;
    this.regex = new RegExp(value.split('').join('.?'), 'i');
    this.app.syncItems();
  }
});
