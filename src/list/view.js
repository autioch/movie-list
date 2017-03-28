/* eslint no-underscore-dangle: 0 */
const itemViewFactory = require('./itemView');
const tag = require('lean-tag');
const fragment = require('utils/fragment');

require('./style');

function getItemTags(items, schema) {
  const frag = fragment();

  items.forEach((item) => {
    item.__el = item.__el || itemViewFactory(item, schema);
    frag.appendChild(item.__el);
  });

  return frag;
}

module.exports = function listViewFactory(appModel, el) {
  const noMatchEl = tag('div.item-list__message', 'No items match filters.');

  function update() {
    const { items, schema } = appModel.query();

    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    el.appendChild(items.length ? getItemTags(items, schema) : noMatchEl);

    return el;
  }

  update();

  return {
    el,
    update
  };
};
