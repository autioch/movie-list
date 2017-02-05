const applySorts = require('./applySorts');
const applyFilters = require('./applyFilters');
const Field = require('./field');

function App(items, fieldDefinitions) {
  this.callbacks = [];
  this.fields = fieldDefinitions.map((fieldDefinition) => new Field(fieldDefinition));
  this.items = items.slice(0);
  this._items = items;
  this.count = this.items.length;
  this._count = this._items.length;
}

App.prototype = {
  constructor: App,
  resetFilters() {
    this.fields.forEach((field) => field.resetValue());
  },
  setItems() {
    this.items = applySorts(this.fields, applyFilters(this.fields, this._items.slice(0)));
    this.count = this.items.length;
    this.callbacks.forEach((callback) => callback());
  },
  addCallback(callback) {
    this.callbacks.push(callback);
  }
};

module.exports = App;
