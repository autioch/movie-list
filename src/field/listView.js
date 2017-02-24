const ListView = require('base/listView');
const Types = require('./types');

module.exports = ListView.extend({
  className: 'field-list',
  tagName: 'div',
  initialize(app) {
    ListView.prototype.initialize.apply(this, arguments);
    this.app = app;
    this.app.fieldCallbacks.push(this.render.bind(this));
  },
  getItems() {
    return this.app.fields.filter((field) => !field.hidden);
  },
  getSubview(field) {
    return new Types[field.type].View(field);
  }
});
