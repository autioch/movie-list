const getItem = require('./getItem');
const dom = require('utils/dom');
const empty = require('utils/empty');
const fragment = require('utils/fragment');

require('./style');

module.exports = function listViewFactory(appModel, el = dom('div', 'stat-list')) {
  const noMatchEl = dom('div', 'item-list__message', 'No items match filters.');

  function update() {
    const { items, schema } = appModel.query();

    empty(el);
    if (items.length) {
      const frag = fragment();

      items.forEach((item) => frag.appendChild(getItem(item, schema)));

      el.appendChild(frag);
    } else {
      el.appendChild(noMatchEl);
    }

    return el;
  }

  update();

  return {
    el,
    update
  };
};
