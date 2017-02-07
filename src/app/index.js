const applySorts = require('./applySorts');
const dictionary = require('./dictionary');
const ItemTypes = require('item/types');
const FieldTypes = require('field/types');
const { TYPE_NAMES } = require('config');

/* Core class for holding items and fields. */
function App(fields) {
  this.callbacks = [];
  this.fields = fields.map((field) => new FieldTypes[TYPE_NAMES[field.type]].Model(field));
  this.items = [];
  this._items = [];
  this.count = 0;
  this._count = 0;
}

App.prototype = {
  constructor: App,

  /* Resets values for all filters. Does not modify sort. */
  resetFilters() {
    this.fields.forEach((field) => field.resetValue());
  },

  /* Filters out passed array of items through fields. */
  filterItems(items) {
    return this.fields
      .filter((field) => field.hasValue())
      .reduce((filteredItems, level) => filteredItems.filter((item) => level.test(item)), items);
  },

  /* Sorts passed array of items with fields. */
  sortItems(items) {
    return applySorts(this.fields, items);
  },

  /* Sets new array of items and syncs matching items. */
  setItems(items) {
    this._items.forEach((item) => item.remove());
    this._items = items.map((item) => new ItemTypes.Movie.Model(item));

    dictionary(this.fields, this._items);

    this._count = items.length;
    this.syncItems();
  },

  /* Finds items that match current filters and sorts. */
  syncItems() {
    this.items = this.sortItems(this.filterItems(this._items.slice(0)));
    this.count = this.items.length;
    this.callbacks.forEach((callback) => callback());
  },

  /* Registers callback for when list of items changes. */
  addCallback(callback) {
    this.callbacks.push(callback);
  }
};

module.exports = App;
