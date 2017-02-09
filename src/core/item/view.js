const BaseView = require('core/base/view');

require('./style');

module.exports = BaseView.extend({
  className: 'item',
  tagName: 'section',
  initialize(item) {
    this.item = item;
  },
  data() {
    return { item: this.item };
  }
});
