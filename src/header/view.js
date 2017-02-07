const BaseView = require('base/view');
const template = require('./template.tpl');

require('./style');

module.exports = BaseView.extend({
  className: 'header',
  template,
  events: {},
  initialize(app) {
    this.app = app;
    this.app.addCallback(this.render.bind(this));
  },
  data() {
    const { count, _count } = this.app;

    return {
      visible: count,
      filtered: _count - count
    };
  }
});
