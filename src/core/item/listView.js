const ListView = require('core/base/listView');
const template = require('./template.tpl');

module.exports = ListView.extend({
  className: 'item-list',
  tagName: 'main',
  initialize(app, ItemView) {
    ListView.prototype.initialize.apply(this, arguments);
    this.app = app;
    this.app.addCallback(this.render.bind(this));
    this.ItemView = ItemView;
  },
  render() {
    this.removeSubviews();
    this.empty();
    if (this.app._fieldsLoading || this.app._itemsLoading) {
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
    return new this.ItemView(item);
  }
});
