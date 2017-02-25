const template = require('./template.tpl');
const createElement = require('createElement');

require('./style');

module.exports = function legendViewFactory(app, el = createElement('legend', 'section')) {
  return {
    el,
    render() {
      el.innerHTML = template();

      return el;
    }
  };
};
