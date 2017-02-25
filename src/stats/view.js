const template = require('./template.tpl');
const createElement = require('utils/createElement');
const statRange = require('./statRange');

require('./style');

const RANGE_TYPE = 2;

module.exports = function statsViewFactory(app, el = createElement('stat-list')) {
  return {
    el,
    render() {
      const { items, fields } = app.query();

      const stats = fields
        .filter((field) => field.type === RANGE_TYPE)
        .map((field) => ({
          label: field.label,
          items: statRange(items.map((item) => item[field.key]))
        }));

      el.innerHTML = template({ stats });

      return el;
    }
  };
};
