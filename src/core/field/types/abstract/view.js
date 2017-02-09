const BaseView = require('core/base/view');

require('./style');

module.exports = BaseView.extend({
  className: 'field',
  events: {
    'click sort': 'setSort',
    'click reset': 'resetFilter'
  },
  initialize(field) {
    this.field = field;
  },
  data() {
    return { field: this.field };
  },
  render() {
    BaseView.prototype.render.apply(this, arguments);
    this.syncFilter();
  },
  setSort() {
    this.field.makeSort();
    this.render();
  },
  resetFilter() {
    this.field.resetValue();
    this.render();
  },
  syncFilter() {
    if (this.field.hasValue()) {
      this.el.classList.add('is-filter-active');
    } else {
      this.el.classList.remove('is-filter-active');
    }
  }
});
