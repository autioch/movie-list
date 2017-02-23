const applySorts = require('./applySorts');
const dictionary = require('./dictionary');
const FieldTypes = require('core/field/types');
const { parser, fields: fieldsUrl, data: itemsUrl } = require('../../movie');
const Store = require('./store');

/* Core class for holding items and fields. */
function App() {
  this.callbacks = [];
  this.fieldCallbacks = [];
  this.items = [];
  this.count = 0;
  this._count = 0;
  this._sorts = [];
  this.fields = [];
  const that = this;

  this.store = new Store([{
    key: 'items',
    url: itemsUrl,
    parser
  }, {
    key: 'fields',
    url: fieldsUrl,
    parser: (field) => new FieldTypes[field.type].Model(field, that)
  }]);

  Promise
    .all([this.store.get('fields'), this.store.get('items')])
    .then((values) => {
      const fields = values[0];
      const items = values[1];

      dictionary(fields, items);
      this.fields = fields;
      this.fieldCallbacks.forEach((callback) => callback());
      this._count = items.length;
      this._syncItems(items);
    });
}

App.prototype = {
  constructor: App,

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

  /* Finds items that match current filters and sorts. */
  syncItems() {
    this.store.get('items').then((items) => this._syncItems(items));
  },

  _syncItems(items) {
    this.items = applySorts(this._sorts, this.filterItems(items));
    this.count = this.items.length;
    this.callbacks.forEach((callback) => callback());
  },

  /* Registers callback for when list of items changes. */
  addCallback(callback) {
    this.callbacks.push(callback);
  }
};

module.exports = App;
