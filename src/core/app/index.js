const applySorts = require('./applySorts');
const dictionary = require('./dictionary');
const FieldTypes = require('core/field/types');
const { TYPE_NAMES } = require('core/field/dicts');

/* Core class for holding items and fields. */
function App(ItemModel) {
  this.callbacks = [];
  this.items = [];
  this._items = [];
  this.count = 0;
  this._count = 0;
  this._sorts = [];
  this._fieldsLoading = true;
  this._itemsLoading = true;
  this.fields = [];
  this.ItemModel = ItemModel;
}

App.prototype = {
  constructor: App,

  /* Resets values for all filters. Does not modify sort. */
  resetFilters() {
    this.fields.forEach((field) => field.resetValue());
    this.syncItems();
  },

  /* Filters out passed array of items through fields. */
  filterItems(items) {
    return this.fields
      .filter((field) => field.hasValue())
      .reduce((filteredItems, level) => filteredItems.filter((item) => level.test(item)), items);
  },

  /* Removes sorting by given key. */
  removeSort(key) {
    this._sorts = this._sorts.filter((sort) => sort.key !== key);
    this.syncItems();
  },

  /* Adds or updates existing sort. */
  addSort(newSort) {
    const existing = this._sorts.find((sort) => sort.key === newSort.key);

    if (existing) {
      existing.order = newSort.order;
      existing.orderInverse = newSort.orderInverse;
    } else {
      this._sorts.push(newSort);
    }
    this.syncItems();
  },

  setFields(fields) {
    this._fieldsLoading = false;
    this.fields = fields.map((field) => new FieldTypes[TYPE_NAMES[field.type]].Model(field, this));
    this.syncItems();
  },

  /* Sets new array of items and syncs matching items. */
  setItems(items) {
    this._items.forEach((item) => item.remove());
    this._items = items.map((item) => new this.ItemModel(item));

    dictionary(this.fields, this._items);

    this._count = items.length;
    this._itemsLoading = false;
    this.syncItems();
  },

  /* Finds items that match current filters and sorts. */
  syncItems() {
    this.items = applySorts(this._sorts, this.filterItems(this._items.slice(0)));
    this.count = this.items.length;
    this.callbacks.forEach((callback) => callback());
  },

  /* Registers callback for when list of items changes. */
  addCallback(callback) {
    this.callbacks.push(callback);
  }
};

module.exports = App;
