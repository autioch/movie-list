const BaseView = require('../../base/view');

require('./style');

module.exports = BaseView.extend({
  className: 'top-btn',
  tagName: 'section',
  events: { 'click': 'scrollTop' },
  render() {
    this.el.setAttribute('title', 'Scroll to top');
  },
  scrollTop() {
    this.el.parentNode.scrollTop = 0;
  }
});
