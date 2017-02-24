const BaseView = require('base/view');

require('./style');

module.exports = BaseView.extend({
  className: 'field',
  tagName: 'section',
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
    requestAnimationFrame(() => {
      this.syncFilter();
      this.syncSort();
    });
  },
  setSort() {
    this.field.makeSort();
    this.syncSort();
  },
  resetFilter() {
    this.field.resetValue();
    this.render();
  },
  syncSort() {
    this.el.classList.remove('is-sort-1');
    this.el.classList.remove('is-sort--1');
    if (this.field.hasSort()) {
      this.el.classList.add(`is-sort-${this.field.order}`);
    }
  },
  syncFilter() {
    if (this.field.hasValue()) {
      this.el.classList.add('is-filter-active');
    } else {
      this.el.classList.remove('is-filter-active');
    }
  }
});
