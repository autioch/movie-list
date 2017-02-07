const ListView = require('base/listView');
const ItemTypes = require('../types');

require('./style');

module.exports = ListView.extend({
  className: 'item-list',
  tagName: 'main',
  initialize(app) {
    ListView.prototype.initialize.apply(this, arguments);
    this.app = app;
    this.app.addCallback(this.render.bind(this));
  },
  getItems() {
    return this.app.items;
  },
  getSubview(item) {
    return new ItemTypes.Movie.View(item);
  }
});
