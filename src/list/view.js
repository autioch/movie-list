const getItem = require('./getItem');
const tag = require('lean-tag');
const empty = require('utils/empty');
const fragment = require('utils/fragment');

require('./style');

module.exports = function listViewFactory(appModel, el = tag('main.item-list')) {
  const noMatchEl = tag('div.item-list__message', 'No items match filters.');

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
