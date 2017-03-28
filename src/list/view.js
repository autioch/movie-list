/* eslint no-underscore-dangle: 0 */
const itemViewFactory = require('./itemView');
const tag = require('lean-tag');
const fragment = require('utils/fragment');

require('./style');

module.exports = function listViewFactory(appModel, el) {
  const noMatchEl = tag('div.item-list__message', 'No items match filters.');

  function update() {
    const { items, schema } = appModel.query();

    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    if (items.length) {
      const frag = fragment();

      items.forEach((item) => {
        item.__el = item.__el || itemViewFactory(item, schema);
        frag.appendChild(item.__el);
      });

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
