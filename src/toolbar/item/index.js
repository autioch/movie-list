const _ = require('lodash');
const template = require('./template.tpl');
const $ = require('jquery');

const filterDelay = 500;
const sortDelay = 500;

require('./style');

function Item(app, field) {
  this.app = app;
  this.field = field;
  this.el = document.createElement('div');
  this.el.className = 'm-toolbar-item';
  this.$el = $(this.el);
  this.$el
    .on('keyup', '.m-toolbar-item__filter', _.debounce(this.syncFilter.bind(this), filterDelay))
    .on('click', '.m-toolbar-item__sort', _.debounce(this.syncSort.bind(this), sortDelay));
}

Item.prototype = {
  render() {
    this.el.innerHTML = template({ field: this.field });
  },
  remove() {
    this.$el.off().remove();
  },
  syncFilter() {
    const value = this.$el.find('.m-toolbar-item__filter-input').val();

    this.app.setFilter(this.field.key, value);
  },
  syncSort() {
    this.app.setSort(this.field.key);
  }
};

module.exports = Item;
