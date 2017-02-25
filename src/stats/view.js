const template = require('./template.tpl');
const createElement = require('createElement');

require('./style');

module.exports = function statsViewFactory(app, el = createElement('stat-list')) {
  return {
    el,
    render() {
      const { items, fields } = app;

      const stats = fields.filter((field) => field.stat).map((field) => ({
        label: field.label,
        items: field.getStats(items)
      }));

      el.innerHTML = template({ stats });

      return el;
    }
  };
};
