/* eslint no-underscore-dangle: 0 */
const itemViewFactory = require('./itemView');
const tag = require('lean-tag');
const { empty, fragment } = require('utils');

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

    empty(el);
    el.appendChild(items.length ? getItemTags(items, schema) : noMatchEl);

    return el;
  }

  update();

  return {
    el,
    update
  };
};
