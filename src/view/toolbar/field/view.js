const BaseView = require('../../base/view');
const { ORDER_ICON } = require('../../../config');
const template = require('./template.tpl');

require('./style');

module.exports = BaseView.extend({
  template,
  className: 'field',
  events: {
    'keyup filter': 'setFilter',
    'click sort': 'setSort',
    'click reset': 'resetFilter'
  },
  initialize(app, field) {
    this.app = app;
    this.field = field;
  },
  data() {
    return {
      field: this.field,
      icons: ORDER_ICON
    };
  },
  render() {
    BaseView.prototype.render.apply(this, arguments);
    this.syncFilter();
  },
  resetFilter() {
    this.field.resetValue();
    this.render();
    this.app.setItems();
  },
  setFilter() {
    this.field.setValue(this.find('filter').value);
    this.app.setItems();
    this.syncFilter();
  },
  syncFilter() {
    if (this.field.hasValue()) {
      this.el.classList.add('is-filter-active');
    } else {
      this.el.classList.remove('is-filter-active');
    }
  },
  setSort() {
    this.field.makeSort();
    this.render();
    this.app.setItems();
  }
});
