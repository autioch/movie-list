const BaseView = require('core/base/view');

module.exports = BaseView.extend({
  className: 'item t-box',
  tagName: 'section',
  initialize(item) {
    this.item = item;
  },
  data() {
    return { item: this.item };
  }
});
