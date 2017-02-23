const BaseView = require('./view');

module.exports = BaseView.extend({
  initialize() {
    this.subviews = [];
  },
  render() {
    const fragment = document.createElement('div');

    this.subviews = this.getItems().map((item) => {
      const itemView = this.getSubview(item);

      itemView.render();
      fragment.appendChild(itemView.el);

      return itemView;
    });

    this.el.appendChild(fragment);
  },
  getItems() {
    return [];
  },
  getSubview(item) {
    return new BaseView(item);
  }
});
