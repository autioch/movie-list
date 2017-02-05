const BaseView = require('../base/view');
const FieldView = require('./field/view');
const HeaderView = require('./header/view');

require('./style');

module.exports = BaseView.extend({
  tagName: 'aside',
  className: 'toolbar',
  initialize(app) {
    this.app = app;
    this.subviews = [];
    this.headerView = new HeaderView(app);
  },

  render() {
    this.removeSubviews();
    this.headerView.render();
    this.el.insertBefore(this.headerView.el, this.el.firstChild);
    const fragment = document.createElement('div');

    this.subviews = this.app.fields.map((field) => {
      const itemView = new FieldView(this.app, field);

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
    this.headerView.remove();
    this.removeSubviews();
  }
});
