const AbstractView = require('../abstract/view');
const template = require('./template.tpl');

require('./style');

module.exports = AbstractView.extend({
  template,
  events: { 'change filter': 'selectValue' },
  selectValue() {
    this.field.selectValue(this.find('filter').value);
    this.syncFilter();
  }
});
