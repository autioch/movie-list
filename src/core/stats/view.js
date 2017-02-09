const BaseView = require('core/base/view');
const template = require('./template.tpl');

require('./style');

module.exports = BaseView.extend({
  className: 'aside',
  template,
  events: {},
  initialize(app) {
    this.app = app;
    this.app.addCallback(this.render.bind(this));
  },
  data() {
    const items = this.app.items;
    const stats = this.app.fields.filter((field) => field.stat).map((field) => ({
      label: field.label,
      items: field.getStats(items)
    }));

    return { stats };
  }
});
