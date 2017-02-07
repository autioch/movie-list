const ListView = require('base/listView');
const { TYPE_NAMES } = require('config');
const Types = require('../types');

require('./style');

module.exports = ListView.extend({
  tagName: 'section',
  className: 'field-list',
  initialize(app) {
    ListView.prototype.initialize.apply(this, arguments);
    this.app = app;
  },
  getItems() {
    return this.app.fields;
  },
  getSubview(field) {
    return new Types[TYPE_NAMES[field.type]].View(this.app, field);
  }
});
