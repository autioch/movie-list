const ListView = require('core/base/listView');
const Types = require('./types');

module.exports = ListView.extend({
  className: 'field-list',
  tagName: 'div',
  initialize(app) {
    ListView.prototype.initialize.apply(this, arguments);
    this.app = app;
  },
  getItems() {
    return this.app.fields.filter((field) => !field.hidden);
  },
  getSubview(field) {
    return new Types[field.type].View(field);
  }
});
