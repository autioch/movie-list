const BaseView = require('base/view');
const { ORDER_ICON } = require('config');

require('./style');

module.exports = BaseView.extend({
  className: 'field',
  events: {
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
  setSort() {
    this.field.makeSort();
    this.render();
    this.app.syncItems();
  },
  resetFilter() {
    this.field.resetValue();
    this.render();
    this.app.syncItems();
  },
  syncFilter() {
    if (this.field.hasValue()) {
      this.el.classList.add('is-filter-active');
    } else {
      this.el.classList.remove('is-filter-active');
    }
  }
});
