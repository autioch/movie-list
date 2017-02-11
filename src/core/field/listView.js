const ListView = require('core/base/listView');
const { TYPE_NAMES } = require('./dicts');
const Types = require('./types');

module.exports = ListView.extend({
  className: 'field-list',
  tagName: 'div',
  initialize(app) {
    ListView.prototype.initialize.apply(this, arguments);
    this.app = app;
  },
  getItems() {
    return this.app.fields;
  },
  getSubview(field) {
    return new Types[TYPE_NAMES[field.type]].View(field);
  }
});
