const BaseView = require('./view');

module.exports = BaseView.extend({
  initialize() {
    this.subviews = [];
  },
  render() {
    this.removeSubviews();
    const fragment = document.createElement('div');

    this.subviews = this.getItems().map((item) => {
      const itemView = this.getSubview(item);

      itemView.render();
      fragment.appendChild(itemView.el);

      return itemView;
    });

    while (fragment.childNodes.length > 0) {
      this.el.appendChild(fragment.childNodes[0]);
    }
  },
  getItems() {
    return [];
  },
  getSubview(item) {
    return new BaseView(item);
  },
  removeSubviews() {
    this.subviews.forEach((subview) => subview.remove());
    this.subviews = [];
  },
  remove() {
    this.removeSubviews();
  }
});
