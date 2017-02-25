const getItem = require('./getItem');
const dom = require('utils/dom');
const empty = require('utils/empty');

require('./style');

module.exports = function listViewFactory(app, el = dom('div', 'stat-list')) {
  const noMatchEl = dom('div', 'item-list__message', 'No items match filters.');

  return {
    el,
    render() {
      const { items, schema } = app.query();

      empty(el);
      if (items.length) {
        const fragment = document.createDocumentFragment();

        items.forEach((item) => fragment.appendChild(getItem(item, schema)));

        el.appendChild(fragment);
      } else {
        el.appendChild(noMatchEl);
      }

      return el;
    }
  };
};
