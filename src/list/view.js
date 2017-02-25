const messageTemplate = require('./message.tpl');
const getItem = require('./getItem');
const createElement = require('utils/createElement');

require('./style');

module.exports = function listViewFactory(app, el = createElement('item-list', 'main')) {
  return {
    el,
    render() {
      const { items, schema } = app.query();

      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }

      if (items.length) {
        const fragment = document.createDocumentFragment();

        items.forEach((item) => fragment.appendChild(getItem(item, schema)));
        el.appendChild(fragment);
      } else {
        el.innerHTML = messageTemplate({ message: 'No items match filters.' });
      }

      return el;
    }
  };
};
