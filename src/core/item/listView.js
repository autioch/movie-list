const ListView = require('core/base/listView');
const template = require('./list.tpl');
const ItemView = require('./view');

module.exports = ListView.extend({
  className: 'item-list',
  tagName: 'main',
  initialize(app) {
    ListView.prototype.initialize.apply(this, arguments);
    this.app = app;
    this.app.addCallback(this.render.bind(this));
  },
  render() {
    this.removeSubviews();
    this.empty();
    if (!this.app.store.allLoaded()) {
      this.el.innerHTML = template({ message: 'Loading items...' });

      return;
    }
    if (!this.app.items.length) {
      this.el.innerHTML = template({ message: 'No items match filters.' });

      return;
    }
    ListView.prototype.render.apply(this, arguments);
  },
  getItems() {
    return this.app.items;
  },
  getSubview(item) {
    return new ItemView(item);
  }
});
