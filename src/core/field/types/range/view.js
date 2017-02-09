const AbstractView = require('../abstract/view');
const template = require('./template.tpl');

require('./style');

module.exports = AbstractView.extend({
  template,
  events: {
    'keyup from': 'setFromValue',
    'keyup to': 'setToValue'
  },
  setFromValue() {
    this.field.setFromValue(this.find('from').value);
    this.syncFilter();
  },
  setToValue() {
    this.field.setToValue(this.find('to').value);
    this.syncFilter();
  }
});
