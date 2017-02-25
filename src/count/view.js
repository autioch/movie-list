const template = require('./template.tpl');
const createElement = require('utils/createElement');

require('./style');

module.exports = function countViewFactory(app, el = createElement('count', 'section')) {
  return {
    el,
    render() {
      const { count, totalCount } = app.query();

      el.innerHTML = template({
        visible: count,
        filtered: totalCount - count
      });

      return el;
    }
  };
};
