const AbstractView = require('../abstract/view');
const template = require('./template.tpl');

require('./style');

module.exports = AbstractView.extend({
  template,
  events: { 'keyup filter': 'setFilter' },
  setFilter() {
    this.field.setValue(this.find('filter').value);
    this.app.syncItems();
    this.syncFilter();
  }
});
