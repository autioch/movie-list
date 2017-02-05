const BaseView = require('../base/view');
const ItemView = require('./item/view');
// const TopView = require('./top/view');

require('./style');

module.exports = BaseView.extend({
  className: 'list',
  tagName: 'main',
  initialize(app) {
    this.app = app;
    this.app.addCallback(this.render.bind(this));
    this.subviews = [];
    // this.topView = new TopView();
  },
  render() {
    this.removeSubviews();
    // this.topView.render();
    // this.el.appendChild(this.topView.el);
    const fragment = document.createElement('div');

    this.subviews = this.app.items.map((item) => {
      const itemView = new ItemView(item);

      itemView.render();
      fragment.appendChild(itemView.el);

      return itemView;
    });

    while (fragment.childNodes.length > 0) {
      this.el.appendChild(fragment.childNodes[0]);
    }
  },
  removeSubviews() {
    this.subviews.forEach((subview) => subview.remove());
    this.subviews = [];
  },
  remove() {
    this.removeSubviews();
    // this.topView.remove();
  }
});
