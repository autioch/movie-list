const BaseView = require('../../base/view');
const template = require('./template.tpl');

require('./style');

module.exports = BaseView.extend({
  className: 'item',
  tagName: 'section',
  template,
  initialize(item) {
    this.item = item;
  },
  data() {
    return { video: this.item };
  }
});
