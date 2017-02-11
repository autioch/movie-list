const BaseView = require('core/base/view');
const template = require('./template.tpl');

require('./style');

module.exports = BaseView.extend({
  className: 'sort-list',
  template,
  events: {},
  initialize(app) {
    this.app = app;
    this.app.addCallback(this.render.bind(this));
  },
  render() {
    BaseView.prototype.render.apply(this, arguments);
    requestAnimationFrame(() => this.syncVisibility());
  },
  syncVisibility() {
    if (this.app._sorts.length) {
      this.el.classList.add('is-visible');
    } else {
      this.el.classList.remove('is-visible');
    }
  },
  data() {
    return { sorts: this.app._sorts };
  }
});
