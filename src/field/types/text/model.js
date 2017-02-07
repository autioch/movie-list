const AbstractModel = require('../abstract/model');

module.exports = AbstractModel.extend({
  defaults() {
    return { value: '' };
  },
  initialize() {
    AbstractModel.prototype.initialize.apply(this, arguments);
    this.setValue(this.value);
  },
  hasValue() {
    return this.value.length > 0;
  },
  resetValue() {
    this.value = '';
    this.regex = new RegExp('', 'i');
  },
  test(item) {
    return this.regex.test(item[this.key]);
  },
  setValue(value) {
    this.value = value;
    this.regex = new RegExp(value.split('').join('.?'), 'i');
  }
});
