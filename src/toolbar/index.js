const Item = require('./item');
const $ = require('jquery');

require('./style');

function List(app) {
  this.app = app;
  this.el = document.createElement('div');
  this.el.className = 'm-toolbar';
  this.$el = $(this.el);
}

List.prototype = {
  render() {
    this.renderItems();
  },
  renderItems() {
    this.items = this.app.fields.map((field) => {
      const item = new Item(this.app, field);

      item.render();

      return item;
    });

    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }
    this.items.forEach((item) => this.el.appendChild(item.el));
  },
  removeItems() {
    this.items.forEach((item) => item.remove());
    this.items = [];
  },
  remove() {
    this.removeItems();
  }
};

module.exports = List;
