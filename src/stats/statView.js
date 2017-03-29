const tag = require('lean-tag');
const { empty } = require('utils');

function getStatItems(field) {
  return field.query().stats.map((item) => tag('li.stat__item', [
    tag(`span.stat-item__value.t-value${item.rounded ? '.is-rounded' : ''}`, item.value),
    tag('span.stat-item__label.t-hint', item.key)
  ]));
}

module.exports = function statViewFactory(field) {
  const listEl = tag('ul.stat__item-list', getStatItems(field));

  const el = tag('section.stat', [
    tag('header.stat__header.t-header', field.label),
    listEl
  ]);

  function update() {
    empty(listEl);
    getStatItems(field).forEach((li) => listEl.appendChild(li));
  }

  return {
    el,
    update
  };
};
