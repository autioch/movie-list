const template = require('./template.tpl');
const createElement = require('createElement');

require('./style');

module.exports = function countViewFactory(app, el = createElement('count', 'section')) {
  return {
    el,
    render() {
      el.innerHTML = template({
        visible: app.count,
        filtered: app._count - app.count
      });

      return el;
    }
  };
};
