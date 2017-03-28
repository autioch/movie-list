const tag = require('lean-tag');
const empty = require('utils/empty');

module.exports = function statViewFactory(field, el = tag('section.stat')) {
  const ulEl = tag('ul.stat__item-list', field.query().stats.map(itemTag));

  function itemTag(item) {
    return tag('li.stat__item', [
      tag(`span.stat-item__value.t-value${item.rounded ? '.is-rounded' : ''}`, item.value),
      tag('span.stat-item__label.t-hint', item.key)
    ]);
  }

  el.appendChild(tag('header.stat__header.t-header', field.label));
  el.appendChild(ulEl);

  function update() {
    empty(ulEl);
    field.query().stats.map(itemTag).forEach((li) => ulEl.appendChild(li));
  }

  return {
    el,
    update
  };
};
