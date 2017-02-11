const ListView = require('core/base/listView');

module.exports = ListView.extend({
  className: 'item-list',
  tagName: 'main',
  initialize(app, ItemView) {
    ListView.prototype.initialize.apply(this, arguments);
    this.app = app;
    this.app.addCallback(this.render.bind(this));
    this.ItemView = ItemView;
  },
  getItems() {
    return this.app.items;
  },
  getSubview(item) {
    return new this.ItemView(item);
  }
});
