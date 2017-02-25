const messageTemplate = require('./message.tpl');
const getItem = require('./getItem');
const createElement = require('createElement');

require('./style');

module.exports = function listViewFactory(app, el = createElement('item-list', 'main')) {
  return {
    el,
    render() {
      const { items, store, schema } = app;

      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }

      if (!store.allLoaded()) {
        el.innerHTML = messageTemplate({ message: 'Loading items...' });
      } else if (items.length) {
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
