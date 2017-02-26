const dom = require('utils/dom');
const empty = require('utils/empty');

module.exports = function statViewFactory(field, el = dom('section', 'stat')) {
  const ulEl = dom('ul', 'stat__item-list', field.query().stats.map(domStatItem));

  function domStatItem(item) {
    return dom('li', 'stat__item', [
      dom('span', `stat-item__value t-value ${item.rounded ? 'is-rounded' : ''}`, item.value),
      dom('span', 'stat-item__label t-hint', item.key)
    ]);
  }

  el.appendChild(dom('header', 'stat__header t-header', field.label));
  el.appendChild(ulEl);

  function update() {
    empty(ulEl);
    field.query().stats.map(domStatItem).forEach((li) => ulEl.appendChild(li));
  }

  return {
    el,
    update
  };
};
