const AbstractView = require('../abstract/view');
const template = require('./template.tpl');

require('./style');

module.exports = AbstractView.extend({
  template,
  events: { 'change filter': 'selectValue' },
  initialize() {
    AbstractView.prototype.initialize.apply(this, arguments);
    this.field.addCallback(this.render.bind(this));
  },
  selectValue() {
    this.field.selectValue(this.find('filter').value);
    this.syncFilter();
  }
});
